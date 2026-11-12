"""Execution harness shared by the browser (Pyodide worker) and the build verifier (CPython).

ONE implementation on purpose: the expected answers baked by build/verify.ts and the learner's live checks
run through exactly the same code, so they can never disagree.

Request (JSON) -> Response (JSON):
  {"op": "run",   "code": str, "stdin": [str], "max_steps": int?}
      -> {"stdout": str, "error": str|None, "error_line": int|None, "timeout": bool, "steps": int, "prompts": [str]}
  {"op": "trace", "code": str, "stdin": [str], "watch": [str]?, "max_steps": int?}
      -> run fields + {"trace": [{"line": int, "fn": str, "depth": int, "vars": {name: repr}, "out": int}]}
  {"op": "call",  "code": str, "fn": str, "args": [any]}      # constraint check(ans), program judge(stdin, out, ref)
      -> {"value": any, "error": str|None}
  {"op": "static", "code": str}                               # structural facts for mustUse checks
      -> {"defs": [{"name", "returns_value": bool}], "uses": {"for","while","if","list","list_index"}: bool, "syntax_error": str|None}

Rules that mirror the exam/course conventions:
  * input(prompt) consumes the next stdin line; the prompt is NOT written to stdout (recorded in "prompts").
    Running out of input raises EOFError with an English message.
  * Infinite loops are stopped deterministically by a line-step budget (default 200k), reported as timeout.
"""
import ast
import builtins
import io
import json
import sys
import traceback

FILENAME = "<program>"
DEFAULT_STEPS = 200_000
MAX_TRACE = 4000
MAX_REPR = 120
MAX_OUT = 20_000


class _StepLimit(BaseException):
    pass


def _short_repr(v):
    try:
        r = repr(v)
    except Exception:  # noqa: BLE001
        r = "<?>"
    return r if len(r) <= MAX_REPR else r[: MAX_REPR - 1] + "…"


def _user_vars(ns):
    out = {}
    for k, v in ns.items():
        if k.startswith("__") or k in ("input", "print"):
            continue
        if callable(v) or type(v).__name__ == "module":
            continue
        out[k] = _short_repr(v)
    return out


def _format_error(exc):
    """'NameError: name 'rata' is not defined', line number inside the learner's program (or None)."""
    line = None
    tb = exc.__traceback__
    while tb is not None:
        if tb.tb_frame.f_code.co_filename == FILENAME:
            line = tb.tb_lineno
        tb = tb.tb_next
    if isinstance(exc, SyntaxError) and exc.filename == FILENAME:
        line = exc.lineno
        return f"SyntaxError: {exc.msg}", line
    return "".join(traceback.format_exception_only(type(exc), exc)).strip(), line


def _execute(code, stdin, max_steps, watch=None, want_trace=False):
    stdin = list(stdin or [])
    out = io.StringIO()
    prompts = []
    steps = [0]
    trace = []

    def fake_input(prompt=""):
        prompts.append(str(prompt))
        if not stdin:
            raise EOFError("input() was called but there is no more input data")
        return str(stdin.pop(0))

    def fake_print(*args, sep=" ", end="\n", file=None, flush=False):
        if file is not None and file not in (sys.stdout, sys.stderr):
            return builtins.print(*args, sep=sep, end=end, file=file, flush=flush)
        out.write((sep if sep is not None else " ").join(str(a) for a in args) + (end if end is not None else "\n"))
        if out.tell() > MAX_OUT:
            raise _StepLimit()

    def local_tracer(frame, event, arg):
        if event == "line":
            steps[0] += 1
            if steps[0] > max_steps:
                raise _StepLimit()
            if want_trace and len(trace) < MAX_TRACE:
                depth, f = 0, frame.f_back
                while f is not None:
                    if f.f_code.co_filename == FILENAME:
                        depth += 1
                    f = f.f_back
                ns = frame.f_locals
                vars_ = _user_vars(ns)
                if watch:
                    vars_ = {k: v for k, v in vars_.items() if k in watch}
                trace.append({"line": frame.f_lineno, "fn": frame.f_code.co_name, "depth": depth, "vars": vars_, "out": len(out.getvalue())})
        return local_tracer

    def global_tracer(frame, event, arg):
        if frame.f_code.co_filename == FILENAME:
            return local_tracer
        return None

    g = {"__name__": "__main__", "__builtins__": builtins, "input": fake_input, "print": fake_print}
    res = {"stdout": "", "error": None, "error_line": None, "timeout": False, "steps": 0, "prompts": prompts}
    try:
        compiled = compile(code, FILENAME, "exec")
    except SyntaxError as e:
        res["error"], res["error_line"] = _format_error(e)
        return res, trace
    old = sys.gettrace()
    sys.settrace(global_tracer)
    try:
        exec(compiled, g)  # noqa: S102 - this is the point of the harness
    except _StepLimit:
        res["timeout"] = True
        res["error"] = f"Program stopped: more than {max_steps} steps (the loop probably never ends)"
    except BaseException as e:  # noqa: BLE001 - report everything, incl. SystemExit/KeyboardInterrupt from learner code
        res["error"], res["error_line"] = _format_error(e)
    finally:
        sys.settrace(old)
    res["stdout"] = out.getvalue()
    res["steps"] = steps[0]
    if want_trace and trace:
        # snapshot of the final state (after the last line ran)
        trace.append({"line": 0, "fn": "<end>", "depth": 0, "vars": ({k: v for k, v in _user_vars(g).items() if not watch or k in watch}), "out": len(res["stdout"])})
    return res, trace


def _call(code, fn, args):
    g = {"__name__": "__bank__", "__builtins__": builtins}
    try:
        exec(compile(code, "<bank>", "exec"), g)  # noqa: S102
        return {"value": g[fn](*args), "error": None}
    except BaseException as e:  # noqa: BLE001
        return {"value": None, "error": "".join(traceback.format_exception_only(type(e), e)).strip()}


def _static(code):
    res = {"defs": [], "uses": {"for": False, "while": False, "if": False, "list": False, "list_index": False}, "syntax_error": None}
    try:
        tree = ast.parse(code)
    except SyntaxError as e:
        res["syntax_error"] = f"{e.msg} (baris {e.lineno})"
        return res
    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            returns_value = any(isinstance(n, ast.Return) and n.value is not None for n in ast.walk(node))
            res["defs"].append({"name": node.name, "returns_value": returns_value})
        elif isinstance(node, ast.For):
            res["uses"]["for"] = True
        elif isinstance(node, ast.While):
            res["uses"]["while"] = True
        elif isinstance(node, ast.If):
            res["uses"]["if"] = True
        elif isinstance(node, (ast.List, ast.ListComp)):
            res["uses"]["list"] = True
        elif isinstance(node, ast.Subscript):
            res["uses"]["list_index"] = True
    return res


def handle(req_json):
    req = json.loads(req_json)
    op = req.get("op", "run")
    if op in ("run", "trace"):
        res, trace = _execute(req["code"], req.get("stdin"), int(req.get("max_steps") or DEFAULT_STEPS), req.get("watch"), op == "trace")
        if op == "trace":
            res["trace"] = trace
        return json.dumps(res)
    if op == "call":
        return json.dumps(_call(req["code"], req["fn"], req.get("args", [])), default=str)
    if op == "static":
        return json.dumps(_static(req["code"]))
    return json.dumps({"error": f"unknown op {op}"})


if __name__ == "__main__":
    # CLI for build/verify.ts: one JSON request per line on stdin, one JSON response per line on stdout.
    real_stdout = sys.stdout
    for raw in sys.stdin:
        raw = raw.strip()
        if raw:
            real_stdout.write(handle(raw) + "\n")
            real_stdout.flush()
