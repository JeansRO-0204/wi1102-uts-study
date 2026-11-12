// Plain-language explanations of the errors py/harness.py can return (CPython 3.11+ / Pyodide message wording).
// English by default; Indonesian when lang === 'id'.
// explainError(err, line, code, lang = 'en'): err is the harness `error` string ("NameError: name 'rata' is not defined"), line the
// 1-based line inside the learner's program (or null), code the program text (used to quote the offending line and to
// spot typos). Returns null only for an empty error.
export interface ErrorExplain { title: string; why: string; fix: string; line?: number }

function lev(a: string, b: string): number {
  const m = a.length, n = b.length
  const d: number[][] = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)])
  for (let j = 1; j <= n; j++) d[0][j] = j
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1))
  return d[m][n]
}
const PY_WORDS = new Set(['if', 'elif', 'else', 'for', 'while', 'in', 'range', 'def', 'return', 'print', 'input', 'int', 'float', 'str', 'len', 'and', 'or', 'not', 'True', 'False', 'None', 'import', 'from', 'pass', 'break', 'continue', 'chr', 'ord', 'round', 'abs', 'max', 'min', 'sum', 'bool', 'list', 'type'])
const MATH_FNS = new Set(['sqrt', 'sin', 'cos', 'tan', 'pow', 'floor', 'ceil', 'log', 'exp', 'pi', 'fabs', 'factorial', 'gcd', 'radians'])
const PSEUDO_WORDS = new Set(['endif', 'endwhile', 'endfor', 'then', 'do', 'output', 'traversal', 'repeat', 'until', 'mod', 'div', 'integer', 'real', 'boolean', 'string', 'true', 'false', 'depend'])

function identifiers(code: string): string[] {
  const noStr = code.replace(/(["'])(?:\\.|(?!\1).)*\1/g, '""').replace(/#.*$/gm, '')
  return Array.from(new Set(noStr.match(/[A-Za-z_][A-Za-z_0-9]*/g) ?? []))
}
function codeLine(code: string | undefined, line: number | null | undefined): string | null {
  if (!code || !line) return null
  const l = code.split('\n')[line - 1]
  return l === undefined ? null : l.trim()
}
const q = (s: string) => '`' + s + '`'

function explainId(err: string, line?: number | null, code?: string): ErrorExplain | null {
  if (!err || !err.trim()) return null
  const text = err.trim()
  const ln = line ?? undefined
  const src = codeLine(code, line)
  const at = src ? `Pada baris ${line}: ${q(src)}. ` : ln ? `Pada baris ${ln}. ` : ''
  const mk = (title: string, why: string, fix: string): ErrorExplain => ({ title, why: at + why, fix, line: ln })

  /* ---- step limit / infinite loop ---- */
  if (/^Program (dihentikan|stopped)/.test(text)) {
    const hasWhile = !code || /\bwhile\b/.test(code)
    return {
      title: 'Perulangan tidak berhenti',
      why: 'Program dihentikan karena menjalankan terlalu banyak langkah. Hampir pasti ada `while` yang kondisinya tidak pernah menjadi False: variabel yang diuji tidak diubah di dalam badan loop (Next-Element hilang), atau diubah ke arah yang salah.' + (hasWhile ? '' : ' Periksa juga rekursi tanpa kasus dasar.'),
      fix: 'Tulis ulang kerangka: Initialization → First-Element → `while (kondisi):` aksi → Next-Element. Pastikan Next-Element (mis. `i = i + 1` atau `X = int(input())`) ada di DALAM loop dan menggerakkan kondisi menuju False.',
    }
  }

  const m = text.match(/^([A-Za-z]*(?:Error|Exception|Exit)?)\s*:\s*([\s\S]*)$/)
  const kind = m ? m[1] : ''
  const msg = (m ? m[2] : text).trim()

  /* ---- EOFError ---- */
  if (kind === 'EOFError' || /data masukan sudah habis|no more input data/.test(msg)) {
    return mk('Masukan habis', '`input()` dipanggil lagi padahal semua data masukan sudah terbaca. Program meminta lebih banyak masukan daripada yang diberikan.',
      'Periksa jumlah pemanggilan `input()`: apakah loop membaca satu kali terlalu banyak? Untuk pola sentinel, baca elemen pertama sebelum loop dan elemen berikutnya di akhir badan loop. Atau lengkapi data masukan (satu nilai per baris).')
  }

  /* ---- SyntaxError family (harness strips the class: the message starts after "SyntaxError: ") ---- */
  if (kind === 'SyntaxError' || kind === 'IndentationError' || kind === 'TabError') {
    if (/expected an indented block/.test(msg)) {
      const what = (msg.match(/after '?([a-z ]+?)'? statement/) ?? msg.match(/after (function definition)/))?.[1] ?? 'baris sebelumnya'
      return mk('Indentasi: badan blok kosong', `Setelah ${q(':')} (${what}) Python mengharapkan baris yang menjorok, tetapi baris berikutnya sejajar dengan induknya.`, 'Jorokkan semua baris badan blok dengan 4 spasi, sejajar satu sama lain.')
    }
    if (/unexpected indent/.test(msg)) return mk('Indentasi: menjorok tanpa alasan', 'Baris ini menjorok padahal baris sebelumnya tidak membuka blok (tidak diakhiri `:`).', 'Sejajarkan baris dengan baris sebelumnya, atau tambahkan `:` pada baris induknya bila memang itu blok baru.')
    if (/unindent does not match/.test(msg)) return mk('Indentasi: tingkat tidak cocok', 'Baris ini menjorok kembali ke tingkat yang tidak pernah dipakai oleh blok mana pun. Biasanya jumlah spasi dalam satu blok tidak konsisten (mis. 4 dan 2).', 'Pakai kelipatan 4 spasi yang sama untuk semua baris dalam satu blok; keluar dari blok dengan kembali ke jorokan blok induk.')
    if (/inconsistent use of tabs/.test(msg)) return mk('Indentasi: tab dan spasi bercampur', 'Satu blok memakai tab sekaligus spasi.', 'Pakai spasi saja (4 spasi per tingkat).')
    if (/expected ':'/.test(msg)) {
      if (src && /^\s*else\s+if\b/.test(src)) return mk('`else if` bukan Python', 'Python menulis `elif`, bukan `else if` (itu notasi pseudocode).', 'Ganti menjadi `elif (kondisi):`.')
      const kw = src?.match(/^\s*(if|elif|else|for|while|def)\b/)?.[1]
      return mk('Titik dua `:` hilang', `Baris ${kw ? q(kw) : 'pembuka blok'} harus diakhiri dengan titik dua.`, 'Tambahkan `:` di akhir baris, lalu jorokkan badan di bawahnya.')
    }
    if (/Maybe you meant '=='/.test(msg) || /cannot assign to (?:literal|function call|expression|comparison)/.test(msg)) {
      const inCond = src && /^\s*(if|elif|while)\b/.test(src)
      return mk(inCond ? 'Pakai `==` untuk membandingkan' : 'Sisi kiri `=` harus variabel', inCond ? '`=` adalah pemberian nilai (assignment), sedangkan di dalam kondisi yang dimaksud perbandingan.' : 'Di sisi kiri `=` harus ada nama variabel (bukan angka atau pemanggilan fungsi). Mungkin yang dimaksud perbandingan `==`.', inCond ? 'Ganti `=` dengan `==` (mis. `if x == 5:`).' : 'Tulis `variabel = nilai`; untuk membandingkan gunakan `==`.')
    }
    if (/was never closed/.test(msg)) { const br = msg.match(/'(.)'/)?.[1] ?? '('; return mk(`Kurung ${br} belum ditutup`, `Ada ${q(br)} yang dibuka tetapi tidak ditutup, sering kali Python baru menyadarinya di baris yang sama atau sesudahnya.`, 'Hitung pasangan kurung/kurung siku; tambahkan penutup yang kurang.') }
    if (/unmatched '/.test(msg)) return mk('Kurung penutup kelebihan', 'Ada kurung penutup yang tidak punya pasangan pembuka.', 'Hapus kurung yang berlebih atau tambahkan pembukanya.')
    if (/unterminated (triple-quoted )?string/.test(msg)) return mk('Tanda kutip belum ditutup', 'String dibuka dengan tanda kutip tetapi tidak ditutup di baris yang sama.', 'Tutup string dengan tanda kutip yang sama (`"..."` atau `\'...\'`).')
    if (/invalid character/.test(msg)) {
      const ch = msg.match(/'(.)'/)?.[1]
      return mk('Karakter tidak dikenal Python', `Karakter ${ch ? q(ch) : 'ini'} tidak boleh ada di kode Python. Notasi pseudocode seperti ← ≠ ≤ ≥ ÷ tidak berlaku di Python.`, 'Ganti: `←` → `=`, `≠` → `!=`, `≤` → `<=`, `≥` → `>=`, `÷` → `/` atau `//`.')
    }
    if (/'return' outside function/.test(msg)) return mk('return di luar function', '`return` hanya boleh di dalam `def`.', 'Pindahkan ke dalam function, atau hapus `return` dari program utama.')
    if (/leading zeros/.test(msg) || /invalid decimal literal/.test(msg)) return mk('Penulisan bilangan tidak valid', 'Bilangan ditulis dengan awalan 0 atau menempel dengan huruf.', 'Tulis bilangan biasa (mis. `7`, bukan `007`) dan beri operator di antara bilangan dan nama variabel (`3 * a`).')
    if (/invalid syntax/.test(msg) || msg === '') {
      if (src) {
        if (/&&|\|\|/.test(src)) return mk('`&&` / `||` bukan Python', 'Operator logika Python adalah kata `and`, `or`, `not`.', 'Ganti `&&` → `and`, `||` → `or`, `!x` → `not x`.')
        if (/^\s*else\s+if\b/.test(src)) return mk('`else if` bukan Python', 'Python menulis `elif`, bukan `else if`.', 'Ganti menjadi `elif (kondisi):`.')
        if (/\b(then|endif|endwhile)\b/.test(src)) return mk('Itu notasi pseudocode', '`then`, `endif`, dan sejenisnya hanya ada di pseudocode.', 'Di Python: akhiri dengan `:` dan tandai blok dengan indentasi (tanpa `then`/`endif`).')
        if (/\+\+|--\s*$/.test(src)) return mk('Tidak ada `++`/`--` di Python', 'Python tidak punya operator penambah/pengurang satu.', 'Tulis `i = i + 1` atau `i += 1`.')
        if (/^\s*else\s*\(/.test(src)) return mk('`else` tidak memakai kondisi', '`else` menangani semua kasus sisa dan tidak diikuti kondisi.', 'Tulis `else:` saja, atau gunakan `elif (kondisi):`.')
        if (/^\s*elif\s*:/.test(src)) return mk('`elif` butuh kondisi', '`elif` harus diikuti kondisi sebelum titik dua.', 'Tulis `elif (kondisi):` atau `else:` bila tidak ada kondisi.')
        if (/\bif\b.*[^=!<>]=[^=]/.test(src)) return mk('Pakai `==` untuk membandingkan', 'Di dalam kondisi dipakai `=` (pemberian nilai).', 'Ganti dengan `==`.')
      }
      return mk('Penulisan tidak sesuai aturan Python', 'Python tidak dapat membaca baris ini. Penyebab umum: operator/kata kunci notasi pseudocode, tanda baca atau kurung salah, atau baris sebelumnya belum lengkap.', 'Periksa baris itu dan satu baris sebelumnya: titik dua, kurung, tanda kutip, dan kata kunci (`elif`, `and`, `or`).')
    }
    return mk('Kesalahan penulisan (SyntaxError)', `Python menolak penulisan kode: ${msg}.`, 'Periksa baris yang ditunjuk dan baris sebelumnya.')
  }

  /* ---- NameError / UnboundLocalError ---- */
  if (kind === 'UnboundLocalError') {
    const name = msg.match(/variable '(\w+)'/)?.[1] ?? 'variabel itu'
    return mk(`Variabel lokal ${name} dipakai sebelum diberi nilai`, `Di dalam function, ${q(name)} diberi nilai di suatu tempat sehingga dianggap variabel LOKAL, tetapi dibaca sebelum sempat diisi (atau hanya diisi di salah satu cabang if). Variabel global tidak otomatis terbaca/diubah.`,
      `Kirim ${q(name)} sebagai parameter lalu kembalikan hasilnya (\`${name} = f(${name})\`), atau beri nilai awal pada semua jalur sebelum dipakai (mis. sebelum \`if\`).`)
  }
  if (kind === 'NameError') {
    const name = msg.match(/name '([^']+)'/)?.[1] ?? ''
    if (name === 'true' || name === 'false') return mk(`${name} harus ${name === 'true' ? 'True' : 'False'}`, 'Konstanta boolean Python diawali huruf besar. Huruf kecil `true`/`false` hanya ada di pseudocode.', `Tulis ${q(name === 'true' ? 'True' : 'False')}.`)
    if (name === 'sqrt' || MATH_FNS.has(name)) return mk(`${name} belum diimpor`, `${q(name)} berasal dari pustaka math dan belum diimpor.`, 'Tambahkan `from math import *` di awal program.')
    if (PSEUDO_WORDS.has(name)) return mk('Kata pseudocode dipakai di Python', `${q(name)} adalah kata pseudocode dan tidak dikenal di Python.`, 'Tulis dalam Python: `output(x)` → `print(x)`, `endif` dihapus (pakai indentasi), `mod` → `%`, `div` → `//`.')
    const ids = code ? identifiers(code).filter((x) => x !== name && !PY_WORDS.has(x)) : []
    const lower = ids.find((x) => x.toLowerCase() === name.toLowerCase())
    if (lower) return mk(`Nama ${name} tidak dikenal (besar/kecil huruf)`, `Python membedakan huruf besar dan kecil: ${q(name)} dan ${q(lower)} adalah dua nama berbeda.`, `Tulis konsisten, mis. ${q(lower)}.`)
    const typo = ids.map((x) => ({ x, d: lev(x, name) })).filter((o) => o.d <= (name.length > 4 ? 2 : 1)).sort((a, b) => a.d - b.d)[0]
    if (typo) return mk(`Nama ${name} tidak dikenal (salah ketik?)`, `${q(name)} belum pernah diberi nilai. Mirip dengan variabel ${q(typo.x)} di programmu.`, `Ganti dengan ${q(typo.x)} bila itu yang dimaksud. Nama variabel harus persis sama.`)
    if (code && ln) {
      const later = code.split('\n').findIndex((l, i) => i + 1 > ln && new RegExp('^\\s*' + name + '\\s*(=|\\+=|-=)(?!=)').test(l))
      if (later >= 0) return mk(`${name} dipakai sebelum diberi nilai`, `${q(name)} baru diisi di baris ${later + 1}, sesudah baris yang memakainya. Python menjalankan baris dari atas ke bawah.`, `Pindahkan pengisian ${q(name)} (atau input) ke atas baris yang memakainya.`)
    }
    return mk(`Nama ${name || 'itu'} tidak dikenal`, `${name ? q(name) : 'Nama ini'} belum pernah diberi nilai. Penyebab umum: salah ketik, huruf besar/kecil berbeda, atau variabel dipakai tanpa pernah diisi (contoh di slide D05: \`str(rata)\` padahal variabelnya \`avg\`). String tanpa kutip juga dianggap nama variabel.`, 'Pastikan setiap variabel diberi nilai (assignment atau input) sebelum dipakai dan ditulis persis sama. Teks harus diberi tanda kutip.')
  }

  /* ---- TypeError ---- */
  if (kind === 'TypeError') {
    if (/can only concatenate str \(not "(\w+)"\) to str/.test(msg)) {
      const t = msg.match(/not "(\w+)"/)?.[1]
      return mk('String tidak bisa digabung dengan ' + t, `Operator ${q('+')} di antara string dan ${t} tidak diizinkan. Sering terjadi saat ${q('print("Total: " + total)')} atau saat nilai dari ${q('input()')} (selalu string) dijumlah dengan angka.`, 'Ubah angka menjadi string: `"Total: " + str(total)`, atau ubah string menjadi angka: `int(input())`; atau pisahkan dengan koma di print.')
    }
    if (/unsupported operand type\(s\) for ([^:]+): '(\w+)' and '(\w+)'/.test(msg)) {
      const mm = msg.match(/for ([^:]+): '(\w+)' and '(\w+)'/)!
      if (mm[2] === 'NoneType' || mm[3] === 'NoneType') return mk('Hasil function bernilai None', 'Salah satu operand adalah None: function yang dipanggil tidak punya `return nilai` (atau hanya mencetak), sehingga hasilnya None.', 'Tambahkan `return hasil` di function (jangan hanya `print`) dan pastikan semua cabang mengembalikan nilai.')
      if (mm[2] === 'str' || mm[3] === 'str') return mk('Operasi antara string dan angka', `Operator ${q(mm[1])} tidak bisa dipakai pada ${mm[2]} dan ${mm[3]}. Biasanya nilai dari ${q('input()')} lupa dikonversi.`, 'Konversi dengan `int(...)` / `float(...)` sebelum dihitung.')
      return mk('Tipe operand tidak cocok', `Operator ${q(mm[1])} tidak bisa dipakai pada ${mm[2]} dan ${mm[3]}.`, 'Samakan tipe kedua operand lewat konversi.')
    }
    if (/'(\S+)' not supported between instances of '(\w+)' and '(\w+)'/.test(msg)) {
      const mm = msg.match(/'(\S+)' not supported between instances of '(\w+)' and '(\w+)'/)!
      if (mm[2] === 'NoneType' || mm[3] === 'NoneType') return mk('Membandingkan dengan None', 'Salah satu sisi adalah None (function tanpa `return`).', 'Pastikan function mengembalikan nilai di semua jalur.')
      return mk(`Tidak bisa membandingkan ${mm[2]} dengan ${mm[3]}`, `Operator ${q(mm[1])} tidak berlaku antara ${mm[2]} dan ${mm[3]}. Hampir selalu karena ${q('input()')} menghasilkan string yang belum dikonversi.`, 'Ubah dengan `int(input())` atau `float(input())` sebelum dibandingkan.')
    }
    if (/missing (\d+) required positional argument/.test(msg)) {
      const fn = msg.match(/^(\w+)\(\)/)?.[1] ?? 'function'
      return mk(`Argumen kurang saat memanggil ${fn}`, `${q(fn)} memerlukan lebih banyak argumen daripada yang dikirim: jumlah argumen aktual harus sama dengan parameter formal.`, `Lengkapi pemanggilan ${q(fn + '(...)')} sesuai daftar parameter di definisinya.`)
    }
    if (/takes (\d+) positional arguments? but (\d+) (?:was|were) given/.test(msg)) {
      const mm = msg.match(/^(\w+)\(\) takes (\d+) positional arguments? but (\d+)/)
      return mk(`Argumen berlebih saat memanggil ${mm?.[1] ?? 'function'}`, `${mm ? `${q(mm[1])} menerima ${mm[2]} argumen, tetapi dipanggil dengan ${mm[3]}` : 'Jumlah argumen tidak sama dengan parameter'}. Jumlah (dan urutan) argumen harus sama dengan parameter.`, 'Sesuaikan pemanggilan dengan definisi `def`, atau ubah definisi bila memang perlu parameter lain.')
    }
    if (/can't multiply sequence by non-int/.test(msg)) return mk('String dikalikan angka desimal', 'Nilai dari `input()` masih string, sehingga `*` dianggap pengulangan string dan butuh bilangan bulat.', 'Konversi dulu: `x = float(input())`.')
    if (/'float' object cannot be interpreted as an integer/.test(msg)) return mk('range() butuh bilangan bulat', '`range(...)` tidak menerima float. Mungkin dari `/` (selalu float) atau `float(input())`.', 'Gunakan `//` atau `int(...)`: `range(int(N))`.')
    if (/'str' object cannot be interpreted as an integer/.test(msg)) return mk('range() menerima string', 'Nilai dari `input()` belum diubah menjadi angka.', '`N = int(input())` sebelum `range(N)`.')
    if (/list indices must be integers/.test(msg)) return mk('Indeks list harus bilangan bulat', 'Indeks array harus int, bukan float/string. Mungkin hasil `/` (float) atau nilai input yang belum dikonversi.', 'Pakai `//` atau `int(...)` pada indeks.')
    if (/'(\w+)' object is not callable/.test(msg)) return mk('Memanggil sesuatu yang bukan function', 'Nama yang diikuti `(...)` berisi nilai biasa. Mungkin kamu menamai variabel sama dengan function (mis. `sum`, `max`) atau lupa operator `*` (`2(x+1)`).', 'Ganti nama variabelnya, atau tambahkan operator `*`.')
    if (/'(\w+)' object is not subscriptable/.test(msg)) return mk('Bukan array', 'Tanda `[ ]` dipakai pada nilai yang bukan list/string (mis. int).', 'Pastikan variabel itu array dan sudah dibuat dengan `[0 for i in range(N)]`.')
    if (/object of type '(\w+)' has no len/.test(msg)) return mk('len() butuh array atau string', 'len() dipanggil pada bilangan.', 'Gunakan `len(T)` pada list; untuk ukuran, simpan N.')
    if (/does not support item assignment/.test(msg)) return mk('String tidak bisa diubah per huruf', 'String bersifat tetap; `s[0] = "x"` tidak diizinkan.', 'Buat string baru, mis. `s = "x" + s[1:]`.')
    if (/int\(\) argument must be/.test(msg)) return mk('int() pada nilai yang tidak sesuai', 'int() hanya menerima string angka atau bilangan.', 'Konversi elemen satu per satu, bukan list utuh.')
    return mk('Tipe data tidak cocok', `Operasi dipakai pada tipe yang salah (${msg}).`, 'Periksa tipe tiap variabel: `input()` selalu string, `/` selalu float.')
  }

  /* ---- ValueError ---- */
  if (kind === 'ValueError') {
    const lit = msg.match(/invalid literal for int\(\) with base 10: '(.*)'/)
    if (lit) {
      const v = lit[1]
      if (v === '') return mk('int() pada string kosong', '`int(input())` menerima baris kosong. Mungkin data masukan kosong atau urutan masukan tidak sesuai dengan yang dibaca program.', 'Periksa data masukan dan jumlah/urutan pemanggilan `input()`.')
      if (/^-?\d*\.\d+$/.test(v)) return mk(`int() tidak menerima "${v}"`, `Masukan ${q(v)} berbentuk bilangan desimal, padahal \`int()\` pada string hanya menerima bilangan bulat.`, 'Pakai `float(input())` bila masukan bisa desimal (atau `int(float(...))` untuk memotong).')
      return mk(`"${v}" bukan bilangan bulat`, `Isi masukan ${q(v)} tidak dapat dikonversi menjadi int (bukan angka, ada spasi/huruf).`, 'Periksa masukan; urutan `input()` mungkin tertukar (membaca nama padahal diharapkan angka).')
    }
    if (/could not convert string to float/.test(msg)) return mk('float() pada teks bukan angka', `Teks ${q(msg.match(/: '(.*)'/)?.[1] ?? '')} bukan bilangan.`, 'Periksa data masukan dan urutan `input()`.')
    if (/math domain error|expected a nonnegative/.test(msg)) return mk('Di luar domain fungsi matematika', 'Fungsi (mis. `sqrt`) dipanggil dengan nilai yang tidak diizinkan (negatif).', 'Pastikan argumennya ≥ 0, atau tangani dengan `if` sebelum memanggil.')
    if (/not enough values to unpack|too many values to unpack/.test(msg)) return mk('Jumlah nilai tidak sama', 'Jumlah variabel di kiri tidak sama dengan jumlah nilai di kanan.', 'Samakan jumlahnya.')
    if (/range\(\) arg 3 must not be zero/.test(msg)) return mk('Langkah range() tidak boleh 0', 'Argumen ketiga `range` (langkah) bernilai 0.', 'Gunakan 1 untuk naik atau -1 untuk turun.')
    return mk('Nilai tidak sesuai (ValueError)', `Tipe benar tetapi nilainya tidak boleh: ${msg}.`, 'Periksa nilai yang dikonversi atau dihitung.')
  }

  /* ---- IndexError / KeyError ---- */
  if (kind === 'IndexError') {
    if (/assignment index out of range/.test(msg)) return mk('Mengisi indeks di luar array', 'Array hanya punya indeks 0..N−1; elemen dengan indeks itu tidak ada, sehingga tidak bisa diisi.', 'Buat array dulu `[0 for i in range(N)]`, dan batasi loop `range(0, N)` (atau `range(N)`).')
    if (/string index out of range/.test(msg)) return mk('Indeks di luar string', 'Indeks lebih besar dari panjang string − 1 (atau string kosong).', 'Batasi indeks `0 .. len(s)-1`.')
    return mk('Indeks di luar batas array', 'Array berukuran N hanya punya indeks 0 sampai N−1. Indeks yang dipakai lebih besar (biasanya N itu sendiri) atau array kosong. Hati-hati dengan `range(1, N+1)` pada array.', 'Batasi indeks: loop `for i in range(0, N)`; elemen terakhir `T[N-1]`. Untuk kasus `i+1`, hentikan satu langkah lebih awal.')
  }
  if (kind === 'KeyError') return mk('Kunci tidak ditemukan', `Kunci ${msg} tidak ada.`, 'Periksa kunci yang diakses.')

  /* ---- ZeroDivisionError ---- */
  if (kind === 'ZeroDivisionError') {
    return mk('Pembagian dengan nol', 'Pembagi bernilai 0. Bisa dari `/`, `//` maupun `%`. Pada rata-rata, penyebabnya sering kasus tanpa data (count = 0).', 'Cek pembagi dulu: `if (count > 0): ... else: print("No data processed")`.')
  }

  /* ---- misc ---- */
  if (kind === 'RecursionError') return mk('Rekursi tanpa akhir', 'Function memanggil dirinya terus tanpa kasus dasar.', 'Tambahkan kondisi berhenti (kasus dasar) sebelum pemanggilan rekursif.')
  if (kind === 'ModuleNotFoundError' || kind === 'ImportError') return mk('Pustaka tidak ditemukan', `${msg}.`, 'Periksa ejaan: `from math import *`.')
  if (kind === 'AttributeError') return mk('Nama tidak ada di pustaka/objek', `${msg}.`, 'Periksa ejaan nama fungsi (mis. `sqrt`, bukan `sqroot`).')
  if (kind === 'OverflowError') return mk('Bilangan terlalu besar', msg + '.', 'Periksa rumus atau loop yang membuat nilai terus membesar.')
  return { title: kind || 'Kesalahan', why: at + msg, fix: 'Baca pesan di atas, temukan barisnya, dan periksa nama, tipe, serta indeks pada baris itu.', line: ln }
}

/* ===================================================== English ===================================================== */
function explainEn(err: string, line?: number | null, code?: string): ErrorExplain | null {
  if (!err || !err.trim()) return null
  const text = err.trim()
  const ln = line ?? undefined
  const src = codeLine(code, line)
  const at = src ? `At line ${line}: ${q(src)}. ` : ln ? `At line ${ln}. ` : ''
  const mk = (title: string, why: string, fix: string): ErrorExplain => ({ title, why: at + why, fix, line: ln })

  /* ---- step limit / infinite loop ---- */
  if (/^Program (dihentikan|stopped)/.test(text)) {
    const hasWhile = !code || /\bwhile\b/.test(code)
    return {
      title: 'The loop never ends',
      why: 'The program was stopped because it ran too many steps. Almost certainly a `while` condition never becomes False: the variable being tested is not changed inside the loop body (the Next-Element is missing), or it is changed in the wrong direction.' + (hasWhile ? '' : ' Also check for recursion without a base case.'),
      fix: 'Rewrite the skeleton: Initialization → First-Element → `while (condition):` action → Next-Element. Make sure the Next-Element (e.g. `i = i + 1` or `X = int(input())`) is INSIDE the loop and moves the condition towards False.',
    }
  }

  const m = text.match(/^([A-Za-z]*(?:Error|Exception|Exit)?)\s*:\s*([\s\S]*)$/)
  const kind = m ? m[1] : ''
  const msg = (m ? m[2] : text).trim()

  /* ---- EOFError ---- */
  if (kind === 'EOFError' || /no more input data|data masukan sudah habis/.test(msg)) {
    return mk('Input ran out', '`input()` was called again although all the input data had already been read. The program asks for more input than was provided.',
      'Check how many times `input()` is called: does a loop read one time too many? For the sentinel pattern, read the first element before the loop and the next element at the end of the loop body. Or complete the input data (one value per line).')
  }

  /* ---- SyntaxError family ---- */
  if (kind === 'SyntaxError' || kind === 'IndentationError' || kind === 'TabError') {
    if (/expected an indented block/.test(msg)) {
      const what = (msg.match(/after '?([a-z ]+?)'? statement/) ?? msg.match(/after (function definition)/))?.[1] ?? 'the previous line'
      return mk('Indentation: empty block body', `After ${q(':')} (${what}) Python expects an indented line, but the next line is aligned with its parent.`, 'Indent every line of the block body by 4 spaces, lined up with each other.')
    }
    if (/unexpected indent/.test(msg)) return mk('Indentation: indented for no reason', 'This line is indented although the previous line did not open a block (it does not end with `:`).', 'Align the line with the previous one, or add `:` to the parent line if this really is a new block.')
    if (/unindent does not match/.test(msg)) return mk('Indentation: level does not match', 'This line returns to an indentation level that no block has used. Usually the number of spaces within one block is inconsistent (e.g. 4 and 2).', 'Use the same multiple of 4 spaces for all lines in a block; leave a block by going back to the parent block\'s indentation.')
    if (/inconsistent use of tabs/.test(msg)) return mk('Indentation: tabs and spaces mixed', 'One block uses both tabs and spaces.', 'Use spaces only (4 spaces per level).')
    if (/expected ':'/.test(msg)) {
      if (src && /^\s*else\s+if\b/.test(src)) return mk('`else if` is not Python', 'Python writes `elif`, not `else if` (that is pseudocode notation).', 'Change it to `elif (condition):`.')
      const kw = src?.match(/^\s*(if|elif|else|for|while|def)\b/)?.[1]
      return mk('Missing colon `:`', `The ${kw ? q(kw) : 'block-opening'} line must end with a colon.`, 'Add `:` at the end of the line, then indent the body below it.')
    }
    if (/Maybe you meant '=='/.test(msg) || /cannot assign to (?:literal|function call|expression|comparison)/.test(msg)) {
      const inCond = src && /^\s*(if|elif|while)\b/.test(src)
      return mk(inCond ? 'Use `==` to compare' : 'The left side of `=` must be a variable', inCond ? '`=` is assignment, but inside a condition you mean a comparison.' : 'The left side of `=` must be a variable name (not a number or a function call). You may have meant the comparison `==`.', inCond ? 'Replace `=` with `==` (e.g. `if x == 5:`).' : 'Write `variable = value`; to compare use `==`.')
    }
    if (/was never closed/.test(msg)) { const br = msg.match(/'(.)'/)?.[1] ?? '('; return mk(`Bracket ${br} is not closed`, `A ${q(br)} was opened but never closed; Python often only notices on the same line or a later one.`, 'Count the pairs of parentheses/brackets and add the missing closing one.') }
    if (/unmatched '/.test(msg)) return mk('Extra closing bracket', 'A closing bracket has no matching opening one.', 'Remove the extra bracket or add its opening partner.')
    if (/unterminated (triple-quoted )?string/.test(msg)) return mk('Quote is not closed', 'A string was opened with a quote but not closed on the same line.', 'Close the string with the same quote (`"..."` or `\'...\'`).')
    if (/invalid character/.test(msg)) {
      const ch = msg.match(/'(.)'/)?.[1]
      return mk('Character not known to Python', `The character ${ch ? q(ch) : 'here'} may not appear in Python code. Pseudocode notation such as ← ≠ ≤ ≥ ÷ does not work in Python.`, 'Replace: `←` → `=`, `≠` → `!=`, `≤` → `<=`, `≥` → `>=`, `÷` → `/` or `//`.')
    }
    if (/'return' outside function/.test(msg)) return mk('return outside a function', '`return` is only allowed inside a `def`.', 'Move it into the function, or remove `return` from the main program.')
    if (/leading zeros/.test(msg) || /invalid decimal literal/.test(msg)) return mk('Invalid number', 'A number is written with a leading 0 or stuck to letters.', 'Write ordinary numbers (e.g. `7`, not `007`) and put an operator between a number and a variable name (`3 * a`).')
    if (/invalid syntax/.test(msg) || msg === '') {
      if (src) {
        if (/&&|\|\|/.test(src)) return mk('`&&` / `||` is not Python', 'The Python logical operators are the words `and`, `or`, `not`.', 'Replace `&&` → `and`, `||` → `or`, `!x` → `not x`.')
        if (/^\s*else\s+if\b/.test(src)) return mk('`else if` is not Python', 'Python writes `elif`, not `else if`.', 'Change it to `elif (condition):`.')
        if (/\b(then|endif|endwhile)\b/.test(src)) return mk('That is pseudocode notation', '`then`, `endif` and similar words exist only in pseudocode.', 'In Python: end the line with `:` and mark blocks by indentation (no `then`/`endif`).')
        if (/\+\+|--\s*$/.test(src)) return mk('No `++`/`--` in Python', 'Python has no increment/decrement operator.', 'Write `i = i + 1` or `i += 1`.')
        if (/^\s*else\s*\(/.test(src)) return mk('`else` takes no condition', '`else` handles all remaining cases and is not followed by a condition.', 'Write just `else:`, or use `elif (condition):`.')
        if (/^\s*elif\s*:/.test(src)) return mk('`elif` needs a condition', '`elif` must be followed by a condition before the colon.', 'Write `elif (condition):` or `else:` if there is no condition.')
        if (/\bif\b.*[^=!<>]=[^=]/.test(src)) return mk('Use `==` to compare', 'The condition uses `=` (assignment).', 'Replace it with `==`.')
      }
      return mk('Not valid Python', 'Python cannot read this line. Common causes: pseudocode operators/keywords, wrong punctuation or brackets, or an incomplete previous line.', 'Check that line and the one before it: colons, brackets, quotes and keywords (`elif`, `and`, `or`).')
    }
    return mk('Syntax error', `Python rejected the way the code is written: ${msg}.`, 'Check the indicated line and the one before it.')
  }

  /* ---- NameError / UnboundLocalError ---- */
  if (kind === 'UnboundLocalError') {
    const name = msg.match(/variable '(\w+)'/)?.[1] ?? 'that variable'
    return mk(`Local variable ${name} used before it has a value`, `Inside the function, ${q(name)} is assigned somewhere, so it counts as a LOCAL variable, but it is read before it was filled (or it is only filled in one branch of an if). Global variables are not automatically read/changed.`,
      `Pass ${q(name)} as a parameter and return the result (\`${name} = f(${name})\`), or give it an initial value on every path before it is used (e.g. before the \`if\`).`)
  }
  if (kind === 'NameError') {
    const name = msg.match(/name '([^']+)'/)?.[1] ?? ''
    if (name === 'true' || name === 'false') return mk(`${name} must be ${name === 'true' ? 'True' : 'False'}`, 'Python boolean constants start with a capital letter. Lower-case `true`/`false` exist only in pseudocode.', `Write ${q(name === 'true' ? 'True' : 'False')}.`)
    if (name === 'sqrt' || MATH_FNS.has(name)) return mk(`${name} is not imported`, `${q(name)} comes from the math library and has not been imported.`, 'Add `from math import *` at the start of the program.')
    if (PSEUDO_WORDS.has(name)) return mk('Pseudocode word used in Python', `${q(name)} is a pseudocode word and is not known in Python.`, 'Write it in Python: `output(x)` → `print(x)`, drop `endif` (use indentation), `mod` → `%`, `div` → `//`.')
    const ids = code ? identifiers(code).filter((x) => x !== name && !PY_WORDS.has(x)) : []
    const lower = ids.find((x) => x.toLowerCase() === name.toLowerCase())
    if (lower) return mk(`Name ${name} not known (upper/lower case)`, `Python is case-sensitive: ${q(name)} and ${q(lower)} are two different names.`, `Write it consistently, e.g. ${q(lower)}.`)
    const typo = ids.map((x) => ({ x, d: lev(x, name) })).filter((o) => o.d <= (name.length > 4 ? 2 : 1)).sort((a, b) => a.d - b.d)[0]
    if (typo) return mk(`Name ${name} not known (typo?)`, `${q(name)} has never been given a value. It looks like the variable ${q(typo.x)} in your program.`, `Replace it with ${q(typo.x)} if that is what you meant. Variable names must match exactly.`)
    if (code && ln) {
      const later = code.split('\n').findIndex((l, i) => i + 1 > ln && new RegExp('^\\s*' + name + '\\s*(=|\\+=|-=)(?!=)').test(l))
      if (later >= 0) return mk(`${name} used before it has a value`, `${q(name)} is only assigned at line ${later + 1}, after the line that uses it. Python runs lines from top to bottom.`, `Move the assignment (or input) of ${q(name)} above the line that uses it.`)
    }
    return mk(`Name ${name || 'that'} not known`, `${name ? q(name) : 'This name'} has never been given a value. Common causes: a typo, different upper/lower case, or a variable used without ever being filled (example in slide D05: \`str(rata)\` while the variable is \`avg\`). A string without quotes is also read as a variable name.`, 'Make sure every variable is given a value (assignment or input) before it is used and is spelled exactly the same. Text must be in quotes.')
  }

  /* ---- TypeError ---- */
  if (kind === 'TypeError') {
    if (/can only concatenate str \(not "(\w+)"\) to str/.test(msg)) {
      const t = msg.match(/not "(\w+)"/)?.[1]
      return mk('A string cannot be joined with ' + t, `The ${q('+')} operator between a string and ${t} is not allowed. Common with ${q('print("Total: " + total)')} or when a value from ${q('input()')} (always a string) is added to a number.`, 'Turn the number into a string: `"Total: " + str(total)`, or turn the string into a number: `int(input())`; or separate the items with a comma in print.')
    }
    if (/unsupported operand type\(s\) for ([^:]+): '(\w+)' and '(\w+)'/.test(msg)) {
      const mm = msg.match(/for ([^:]+): '(\w+)' and '(\w+)'/)!
      if (mm[2] === 'NoneType' || mm[3] === 'NoneType') return mk('Function result is None', 'One operand is None: the function that was called has no `return value` (or only prints), so its result is None.', 'Add `return result` to the function (do not just `print`) and make sure every branch returns a value.')
      if (mm[2] === 'str' || mm[3] === 'str') return mk('Operation between a string and a number', `The operator ${q(mm[1])} cannot be used on ${mm[2]} and ${mm[3]}. Usually a value from ${q('input()')} was not converted.`, 'Convert with `int(...)` / `float(...)` before calculating.')
      return mk('Operand types do not match', `The operator ${q(mm[1])} cannot be used on ${mm[2]} and ${mm[3]}.`, 'Make both operands the same type through conversion.')
    }
    if (/'(\S+)' not supported between instances of '(\w+)' and '(\w+)'/.test(msg)) {
      const mm = msg.match(/'(\S+)' not supported between instances of '(\w+)' and '(\w+)'/)!
      if (mm[2] === 'NoneType' || mm[3] === 'NoneType') return mk('Comparing with None', 'One side is None (a function without `return`).', 'Make sure the function returns a value on every path.')
      return mk(`Cannot compare ${mm[2]} with ${mm[3]}`, `The operator ${q(mm[1])} does not work between ${mm[2]} and ${mm[3]}. Almost always because ${q('input()')} gives a string that was not converted.`, 'Convert with `int(input())` or `float(input())` before comparing.')
    }
    if (/missing (\d+) required positional argument/.test(msg)) {
      const fn = msg.match(/^(\w+)\(\)/)?.[1] ?? 'function'
      return mk(`Missing argument when calling ${fn}`, `${q(fn)} needs more arguments than were passed: the number of actual arguments must equal the number of formal parameters.`, `Complete the call ${q(fn + '(...)')} to match the parameter list in its definition.`)
    }
    if (/takes (\d+) positional arguments? but (\d+) (?:was|were) given/.test(msg)) {
      const mm = msg.match(/^(\w+)\(\) takes (\d+) positional arguments? but (\d+)/)
      return mk(`Too many arguments when calling ${mm?.[1] ?? 'function'}`, `${mm ? `${q(mm[1])} accepts ${mm[2]} argument(s) but was called with ${mm[3]}` : 'The number of arguments differs from the parameters'}. The number (and order) of arguments must match the parameters.`, 'Match the call to the `def` definition, or change the definition if it really needs other parameters.')
    }
    if (/can't multiply sequence by non-int/.test(msg)) return mk('String multiplied by a decimal', 'The value from `input()` is still a string, so `*` is read as string repetition and needs an integer.', 'Convert first: `x = float(input())`.')
    if (/'float' object cannot be interpreted as an integer/.test(msg)) return mk('range() needs an integer', '`range(...)` does not accept a float. Perhaps from `/` (always a float) or `float(input())`.', 'Use `//` or `int(...)`: `range(int(N))`.')
    if (/'str' object cannot be interpreted as an integer/.test(msg)) return mk('range() received a string', 'The value from `input()` has not been turned into a number.', '`N = int(input())` before `range(N)`.')
    if (/list indices must be integers/.test(msg)) return mk('List index must be an integer', 'An array index must be an int, not a float/string. Perhaps the result of `/` (a float) or an unconverted input value.', 'Use `//` or `int(...)` on the index.')
    if (/'(\w+)' object is not callable/.test(msg)) return mk('Calling something that is not a function', 'A name followed by `(...)` holds an ordinary value. Perhaps you named a variable the same as a function (e.g. `sum`, `max`) or forgot the `*` operator (`2(x+1)`).', 'Rename the variable, or add the `*` operator.')
    if (/'(\w+)' object is not subscriptable/.test(msg)) return mk('Not an array', 'The `[ ]` brackets were used on a value that is not a list/string (e.g. an int).', 'Make sure the variable is an array created with `[0 for i in range(N)]`.')
    if (/object of type '(\w+)' has no len/.test(msg)) return mk('len() needs an array or string', 'len() was called on a number.', 'Use `len(T)` on a list; for the size, store N.')
    if (/does not support item assignment/.test(msg)) return mk('A string cannot be changed letter by letter', 'Strings are immutable; `s[0] = "x"` is not allowed.', 'Build a new string, e.g. `s = "x" + s[1:]`.')
    if (/int\(\) argument must be/.test(msg)) return mk('int() on an unsuitable value', 'int() only accepts a numeric string or a number.', 'Convert the elements one at a time, not the whole list.')
    return mk('Data types do not match', `An operation was used on the wrong types (${msg}).`, 'Check the type of each variable: `input()` is always a string, `/` is always a float.')
  }

  /* ---- ValueError ---- */
  if (kind === 'ValueError') {
    const lit = msg.match(/invalid literal for int\(\) with base 10: '(.*)'/)
    if (lit) {
      const v = lit[1]
      if (v === '') return mk('int() on an empty string', '`int(input())` received an empty line. Perhaps the input data is empty or its order does not match what the program reads.', 'Check the input data and the number/order of `input()` calls.')
      if (/^-?\d*\.\d+$/.test(v)) return mk(`int() does not accept "${v}"`, `The input ${q(v)} is a decimal number, but \`int()\` on a string only accepts whole numbers.`, 'Use `float(input())` when the input can be a decimal (or `int(float(...))` to truncate).')
      return mk(`"${v}" is not a whole number`, `The input ${q(v)} cannot be converted to an int (not a number, or it contains spaces/letters).`, 'Check the input; the order of `input()` calls may be swapped (reading a name where a number is expected).')
    }
    if (/could not convert string to float/.test(msg)) return mk('float() on non-numeric text', `The text ${q(msg.match(/: '(.*)'/)?.[1] ?? '')} is not a number.`, 'Check the input data and the order of `input()` calls.')
    if (/math domain error|expected a nonnegative/.test(msg)) return mk('Outside the domain of a math function', 'A function (e.g. `sqrt`) was called with a value it does not allow (negative).', 'Make sure the argument is ≥ 0, or handle it with an `if` before the call.')
    if (/not enough values to unpack|too many values to unpack/.test(msg)) return mk('Number of values differs', 'The number of variables on the left differs from the number of values on the right.', 'Make the counts equal.')
    if (/range\(\) arg 3 must not be zero/.test(msg)) return mk('range() step must not be 0', 'The third argument of `range` (the step) is 0.', 'Use 1 to count up or -1 to count down.')
    return mk('Invalid value (ValueError)', `The type is right but the value is not allowed: ${msg}.`, 'Check the value being converted or calculated.')
  }

  /* ---- IndexError / KeyError ---- */
  if (kind === 'IndexError') {
    if (/assignment index out of range/.test(msg)) return mk('Assigning to an index outside the array', 'The array only has indices 0..N−1; an element with that index does not exist, so it cannot be filled.', 'Create the array first `[0 for i in range(N)]`, and bound the loop `range(0, N)` (or `range(N)`).')
    if (/string index out of range/.test(msg)) return mk('Index outside the string', 'The index is greater than the string length − 1 (or the string is empty).', 'Keep the index within `0 .. len(s)-1`.')
    return mk('Index outside the array bounds', 'An array of size N only has indices 0 to N−1. The index used is larger (usually N itself) or the array is empty. Be careful with `range(1, N+1)` on arrays.', 'Bound the index: loop `for i in range(0, N)`; the last element is `T[N-1]`. For `i+1` cases, stop one step earlier.')
  }
  if (kind === 'KeyError') return mk('Key not found', `The key ${msg} does not exist.`, 'Check the key being accessed.')

  /* ---- ZeroDivisionError ---- */
  if (kind === 'ZeroDivisionError') {
    return mk('Division by zero', 'The divisor is 0. It can come from `/`, `//` or `%`. For averages, the cause is often the no-data case (count = 0).', 'Check the divisor first: `if (count > 0): ... else: print("No data processed")`.')
  }

  /* ---- misc ---- */
  if (kind === 'RecursionError') return mk('Recursion never ends', 'The function keeps calling itself without a base case.', 'Add a stopping condition (base case) before the recursive call.')
  if (kind === 'ModuleNotFoundError' || kind === 'ImportError') return mk('Library not found', `${msg}.`, 'Check the spelling: `from math import *`.')
  if (kind === 'AttributeError') return mk('Name not in the library/object', `${msg}.`, 'Check the spelling of the function name (e.g. `sqrt`, not `sqroot`).')
  if (kind === 'OverflowError') return mk('Number too large', msg + '.', 'Check the formula or the loop that keeps making the value bigger.')
  return { title: kind || 'Error', why: at + msg, fix: 'Read the message above, find its line, and check the names, types and indices on that line.', line: ln }
}

export function explainError(err: string, line?: number | null, code?: string, lang: 'en' | 'id' = 'en'): ErrorExplain | null {
  return lang === 'id' ? explainId(err, line, code) : explainEn(err, line, code)
}
