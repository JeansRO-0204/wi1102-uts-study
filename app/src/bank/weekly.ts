// Weekly practice sheets: D04 "Latihan Python Minggu-4" (4 numbered Soal) and D06 "Array dan Pemrosesannya" (PR-1, PR-2).
// Both sheets are Indonesian and print no answers: every solution was written for this site (house style).
// Input/output formats are free in the sheets, so the stems keep the verbatim text and the tests assume
// one value per input line; free-format outputs are checked by a judge (meaning, not wording).
import type { BankFile } from '../types'

const r = String.raw

const D04 = 'D04_LatihanPython'
const D06 = 'D06_ArrayExercises'
const prov04 = (n: number) => ({ kind: 'latihan' as const, lang: 'id' as const, src: D04, label: `Soal ${n}`, pages: [n + 2], official: true, year: 2025 })
const prov06 = (n: number, page: number) => ({ kind: 'latihan' as const, lang: 'id' as const, src: D06, label: `PR-${n}`, pages: [page], official: true, year: 2025 })

// Judge for the cashier: the last line must state the right case (change / shortfall) and the right amount.
const JUDGE_CASHIER = r`import re
def judge(stdin, out, ref_out):
    pat = r'(?<![A-Za-z])-?\d+'
    lines = [l for l in out.strip().splitlines() if l.strip()]
    ref_lines = [l for l in ref_out.strip().splitlines() if l.strip()]
    if not lines:
        return "No output."
    last = lines[-1].replace('.', '').lower()
    ref = ref_lines[-1].replace('.', '').lower()
    kind = 'kembali' if 'kembali' in ref else 'kurang'
    other = 'kurang' if kind == 'kembali' else 'kembali'
    if kind not in last or other in last:
        return "The last line should show the " + ("change" if kind == 'kembali' else "shortfall") + " (the money is " + ("enough" if kind == 'kembali' else "not enough") + ")."
    got = re.findall(pat, last)
    want = re.findall(pat, ref)
    if not got or got[-1] != want[-1]:
        return "The amount shown is wrong; it should be " + want[-1] + "."
    return None`

// Judge for the array searches: same numbers (value / index) when found, no number when not found.
const JUDGE_SEARCH = r`import re
def judge(stdin, out, ref_out):
    pat = r'(?<![A-Za-z])-?\d+'
    if not out.strip():
        return "No output."
    got = re.findall(pat, out)
    ref = re.findall(pat, ref_out)
    if got != ref:
        if ref:
            return "The numbers shown should be " + ", ".join(ref) + " (the value / index found)."
        return "Nothing is found, so show only a message without numbers."
    return None`

export const bank: BankFile = {
  problems: [
    /* ===================== D04 Latihan Python Minggu-4 ===================== */
    {
      id: 'w04-s1', archetype: 'program', title: 'Soal 1: Beli kelereng',
      source: prov04(1),
      figures: [{ src: D04, page: 3 }],
      en: { title: 'Problem 1: Buying marbles' },
      parts: [{
        id: 'w04-s1a', kind: 'program', decks: ['D04'], topic: 'Basic program structure', patterns: ['sequence-io', 'operators'], misconceptions: ['input-is-str'],
        stem: 'Sebuah toko menjual kelereng. Tabel harga kelereng berdasarkan warnanya (harga 1 butir dalam ratusan rupiah):\n\n| Warna kelereng | Harga 1 butir (dalam ratusan rupiah) |\n|---|---|\n| Merah | 10 |\n| Hijau | 15 |\n| Kuning | 20 |\n\nSeorang anak membeli kelereng sejumlah m kelereng merah, h kelereng hijau, dan k kelereng kuning. Asumsikan m >= 0, h >= 0, k >= 0. Hitunglah berapa yang harus dibayarkan anak itu.',
        figures: [{ src: D04, page: 3 }],
        reps: ['python', 'pseudo', 'flow'], match: 'numbers',
        solution: {
          python: r`# Program Beli_Kelereng
# Menghitung total bayar m kelereng merah, h hijau, k kuning (harga dalam ratusan rupiah). Asumsi: m, h, k >= 0
# DECLARATIONS
# m, h, k : int
# total : int
# ALGORITHM
m = int(input())
h = int(input())
k = int(input())
total = (m * 10 + h * 15 + k * 20) * 100   # ratusan rupiah -> rupiah
print("Total bayar: Rp " + str(total))`,
          pseudo: r`Program Beli_Kelereng
{ Menghitung total bayar m kelereng merah, h hijau, k kuning. Harga dalam ratusan rupiah. Asumsi: m, h, k >= 0 }
KAMUS
  m, h, k, total : integer
ALGORITMA
  input(m)
  input(h)
  input(k)
  total ← (m * 10 + h * 15 + k * 20) * 100
  output("Total bayar: Rp ", total)`,
          flow: { title: 'Beli kelereng', blocks: [
            { t: 'io', dir: 'in', text: 'input(m)' },
            { t: 'io', dir: 'in', text: 'input(h)' },
            { t: 'io', dir: 'in', text: 'input(k)' },
            { t: 'process', text: 'total ← (m * 10 + h * 15 + k * 20) * 100' },
            { t: 'io', dir: 'out', text: 'output("Total bayar: Rp ", total)' },
          ] },
        },
        tests: [{ stdin: ['2', '3', '1'] }, { stdin: ['0', '0', '0'], edge: 'buys nothing' }, { stdin: ['1', '0', '0'], edge: 'one colour only' }, { stdin: ['5', '4', '3'] }],
        wrong: [
          { code: 'm = int(input())\nh = int(input())\nk = int(input())\ntotal = m * 10 + h * 15 + k * 20\nprint(total)', msg: 'Harga dalam **ratusan** rupiah: hasil harus dikali 100 agar menjadi rupiah.', msgEn: 'Prices are in **hundreds** of rupiah: multiply the result by 100 to get rupiah.' },
          { code: 'm = int(input())\nh = int(input())\nk = int(input())\ntotal = (m * 10 + h * 20 + k * 15) * 100\nprint(total)', msg: 'Harga hijau dan kuning tertukar: hijau 15, kuning 20.', msgEn: 'The prices of green and yellow are swapped: green is 15, yellow is 20.' },
        ],
        plan: 'baca m, h, k; total ← (m*10 + h*15 + k*20) * 100; tampilkan total',
        skeleton: 'm = int(input())\nh = ___\nk = ___\ntotal = (m * ___ + h * ___ + k * ___) * ___\nprint("Total bayar: Rp " + str(___))',
        hints: ['Jumlah tiap warna dikali harga satuannya, lalu semuanya dijumlahkan.', 'Perhatikan satuan harga di tabel: "dalam ratusan rupiah".'],
        work: ['Baca tiga masukan: m, h, k (bilangan bulat).', 'Hitung 10m + 15h + 20k (dalam ratusan rupiah).', 'Kalikan 100 untuk mengubah ke rupiah.', 'Tampilkan hasilnya.'],
        syntax: ['program-template', 'input', 'type-conversion', 'operators', 'print-str'],
        lineNotes: [
          { line: [1, 6], note: 'Kerangka program gaya kuliah: judul, spesifikasi, DECLARATIONS (`# nama : tipe`), lalu ALGORITHM.', en: 'Lecture-style skeleton: title, specification, DECLARATIONS (`# name : type`), then ALGORITHM.', syntax: 'program-template' },
          { line: [7, 9], note: '`input()` selalu menghasilkan string, dibungkus `int(...)` supaya bisa dikalikan.', en: '`input()` always returns a string, so it is wrapped in `int(...)` to allow multiplication.', syntax: 'input' },
          { line: 10, note: 'Jumlah × harga per warna, dijumlahkan. Tabel dalam **ratusan** rupiah, jadi dikali 100 untuk jawaban dalam rupiah.', en: 'Count × unit price per colour, summed. The table is in **hundreds** of rupiah, so multiply by 100 for an answer in rupiah.', syntax: 'operators' },
          { line: 11, note: '`str(total)` wajib saat digabung dengan string memakai `+`.', en: '`str(total)` is required when joining with a string using `+`.', syntax: 'print-str' },
        ],
        pseudoNotes: [
          { line: [1, 5], note: 'Judul, spesifikasi sebagai komentar `{ }`, KAMUS berisi semua variabel bertipe integer.', en: 'Title, specification as a `{ }` comment, KAMUS (declarations) lists all variables as integer.' },
          { line: [6, 8], note: 'Tiga masukan dibaca dengan `input`.', en: 'Three inputs are read with `input`.' },
          { line: 9, note: 'Penugasan memakai `←`; hasil dikali 100 karena harga dalam ratusan rupiah.', en: 'Assignment uses `←`; multiplied by 100 because prices are in hundreds of rupiah.' },
          { line: 10, note: '`output` dengan beberapa argumen menampilkan teks lalu nilai.', en: '`output` with several arguments prints the text then the value.' },
        ],
        explanation: 'Urutan sederhana: masukan → hitung → keluaran. Total = (10m + 15h + 20k) × 100 rupiah. Catatan: soal tidak menetapkan format masukan/keluaran; di sini diasumsikan tiga baris masukan (m, h, k) dan hasil dalam rupiah.',
        refs: [{ src: D04, page: 3 }],
        en: {
          stem: 'A shop sells marbles. The price table by colour (price of 1 marble in hundreds of rupiah):\n\n| Marble colour | Price of 1 marble (in hundreds of rupiah) |\n|---|---|\n| Red | 10 |\n| Green | 15 |\n| Yellow | 20 |\n\nA child buys m red marbles, h green marbles and k yellow marbles. Assume m >= 0, h >= 0, k >= 0. Compute how much the child has to pay.',
          explanation: 'A simple sequence: input → compute → output. Total = (10m + 15h + 20k) × 100 rupiah. Note: the sheet does not fix the input/output format; here three input lines (m, h, k) are assumed and the result is in rupiah.',
          hints: ['Multiply each colour\'s count by its unit price, then add everything up.', 'Check the unit of the price in the table: "in hundreds of rupiah".'],
          work: ['Read three inputs: m, h, k (integers).', 'Compute 10m + 15h + 20k (in hundreds of rupiah).', 'Multiply by 100 to convert to rupiah.', 'Print the result.'],
          plan: 'read m, h, k; total ← (m*10 + h*15 + k*20) * 100; print total',
        },
      }],
    },
    {
      id: 'w04-s2', archetype: 'program', title: 'Soal 2: Tagihan listrik',
      source: prov04(2),
      figures: [{ src: D04, page: 4 }],
      en: { title: 'Problem 2: Electricity bill' },
      parts: [{
        id: 'w04-s2a', kind: 'program', decks: ['D04'], topic: 'Basic program structure', patterns: ['sequence-io', 'operators', 'type-conversion'], misconceptions: ['input-is-str'],
        stem: 'Pak Dani menggunakan listrik di rumahnya dengan daya 1300 watt. Dalam sebulan, ia mencatat total penggunaan listrik sebesar x kWh (kilowatt-jam). Biaya listrik dikenakan sebesar Rp. 1.444,70 per kWh. Buatlah program untuk menghitung total tagihan listrik Pak Dani dalam sebulan.\n\nCatatan konversi:\n- 1 kWh = penggunaan daya 1000 watt selama 1 jam\n- Input: jumlah kWh per bulan\n- Output: total tagihan listrik',
        figures: [{ src: D04, page: 4 }],
        reps: ['python', 'pseudo', 'flow'], match: 'numbers',
        solution: {
          python: r`# Program Tagihan_Listrik
# Menghitung tagihan listrik sebulan dari x kWh dengan tarif Rp 1444,70 per kWh (daya 1300 watt tidak dipakai)
# DECLARATIONS
# x : float
# tarif, total : float
# ALGORITHM
x = float(input())
tarif = 1444.70
total = x * tarif
print("Total tagihan: Rp " + str(total))`,
          pseudo: r`Program Tagihan_Listrik
{ Menghitung tagihan listrik sebulan: x kWh dengan tarif Rp 1444,70 per kWh }
KAMUS
  x, tarif, total : real
ALGORITMA
  input(x)
  tarif ← 1444.70
  total ← x * tarif
  output("Total tagihan: Rp ", total)`,
          flow: { title: 'Tagihan listrik', blocks: [
            { t: 'io', dir: 'in', text: 'input(x)' },
            { t: 'process', text: 'tarif ← 1444.70' },
            { t: 'process', text: 'total ← x * tarif' },
            { t: 'io', dir: 'out', text: 'output("Total tagihan: Rp ", total)' },
          ] },
        },
        tests: [{ stdin: ['100'] }, { stdin: ['0'], edge: 'no usage' }, { stdin: ['1'], edge: 'exactly 1 kWh' }, { stdin: ['250'] }],
        wrong: [
          { code: 'x = float(input())\ntotal = x * 1.3 * 1444.70\nprint(total)', msg: 'Daya 1300 watt hanya pengecoh: input sudah dalam kWh, jadi cukup x × tarif.', msgEn: 'The 1300 watt rating is a distractor: the input is already in kWh, so x × tariff is enough.' },
          { code: 'x = float(input())\ntotal = x * 1444\nprint(total)', msg: 'Tarif ditulis 1444: bagian desimal ,70 hilang. Tarifnya 1444,70 (titik desimal Python: 1444.70).', msgEn: 'The tariff was written as 1444: the ,70 is lost. It is 1444,70 (Python decimal point: 1444.70).' },
        ],
        plan: 'baca x (kWh); total ← x * 1444.70; tampilkan total',
        skeleton: 'x = ___(input())\ntarif = ___\ntotal = ___ * ___\nprint("Total tagihan: Rp " + str(___))',
        hints: ['Informasi mana yang benar-benar dibutuhkan untuk menghitung tagihan?', 'Gunakan tipe yang menampung pecahan untuk tarif (dan mungkin kWh).'],
        work: ['Abstraksi: yang dipakai hanya jumlah kWh dan tarif per kWh; daya 1300 watt tidak perlu.', 'Baca x sebagai float.', 'total = x × 1444,70 (ditulis 1444.70).', 'Tampilkan total.'],
        syntax: ['program-template', 'input', 'type-conversion', 'operators', 'print-str'],
        lineNotes: [
          { line: [1, 6], note: 'Kerangka program: judul, spesifikasi, DECLARATIONS, ALGORITHM. Variabel bertipe `float` karena tarif berbentuk pecahan.', en: 'Program skeleton: title, specification, DECLARATIONS, ALGORITHM. Variables are `float` because the tariff is fractional.', syntax: 'program-template' },
          { line: 7, note: '`float(input())`: kWh bisa berupa pecahan; `int(...)` akan error untuk "12.5".', en: '`float(input())`: kWh may be fractional; `int(...)` would fail on "12.5".', syntax: 'type-conversion' },
          { line: 8, note: 'Titik desimal Python (`1444.70`), bukan koma Indonesia dan bukan pemisah ribuan.', en: 'Python decimal point (`1444.70`), not the Indonesian comma and no thousands separator.' },
          { line: 9, note: 'Tagihan = kWh × tarif. Daya 1300 watt tidak dipakai (pengecoh).', en: 'Bill = kWh × tariff. The 1300 watt rating is not used (distractor).', syntax: 'operators' },
          { line: 10, note: '`str(total)` wajib saat `+` dengan string.', en: '`str(total)` is required when `+` is used with a string.', syntax: 'print-str' },
        ],
        pseudoNotes: [
          { line: [3, 4], note: 'Tipe `real` untuk bilangan pecahan.', en: 'Type `real` for fractional numbers.' },
          { line: [6, 9], note: 'Baca x, tetapkan tarif, hitung total dengan `←`, lalu tampilkan.', en: 'Read x, set the tariff, compute the total with `←`, then print.' },
        ],
        explanation: 'Abstraksi: informasi daya 1300 watt tidak memengaruhi tagihan, karena input sudah dalam kWh. Total = x × 1444,70. Catatan: format keluaran tidak ditetapkan; hanya angkanya yang dibandingkan.',
        refs: [{ src: D04, page: 4 }],
        en: {
          stem: 'Pak Dani uses electricity at home with a 1300 watt power rating. In one month he records a total usage of x kWh (kilowatt-hours). Electricity costs Rp. 1,444.70 per kWh. Write a program to compute Pak Dani\'s total electricity bill for the month.\n\nConversion notes:\n- 1 kWh = using 1000 watts for 1 hour\n- Input: the number of kWh per month\n- Output: the total electricity bill',
          explanation: 'Abstraction: the 1300 watt rating does not affect the bill because the input is already in kWh. Total = x × 1444.70. Note: the output format is not fixed; only the number is compared.',
          hints: ['Which information is really needed to compute the bill?', 'Use a type that holds fractions for the tariff (and possibly the kWh).'],
          work: ['Abstraction: only the kWh and the tariff per kWh are used; the 1300 watt rating is not needed.', 'Read x as a float.', 'total = x × 1444,70 (written 1444.70).', 'Print the total.'],
          plan: 'read x (kWh); total ← x * 1444.70; print total',
        },
      }],
    },
    {
      id: 'w04-s3', archetype: 'program', title: 'Soal 3: Konversi Waktu',
      source: prov04(3),
      figures: [{ src: D04, page: 5 }],
      en: { title: 'Problem 3: Time conversion' },
      parts: [{
        id: 'w04-s3a', kind: 'program', decks: ['D04'], topic: 'Basic program structure', patterns: ['sequence-io', 'operators'], misconceptions: ['input-is-str'],
        stem: 'Seseorang ingin menghitung total durasi dari beberapa kegiatan yang berlangsung selama jam, menit, dan detik. Buatlah program yang menerima masukan dalam satuan jam, menit, dan detik, kemudian mengubahnya ke dalam total detik.\n\nContoh:\nInput: 1 jam, 45 menit, 30 detik → Output: 6330 detik',
        figures: [{ src: D04, page: 5 }],
        reps: ['python', 'pseudo', 'flow'], match: 'numbers',
        solution: {
          python: r`# Program Konversi_Waktu
# Mengubah jam, menit, detik menjadi total detik
# DECLARATIONS
# jam, menit, detik : int
# total : int
# ALGORITHM
jam = int(input())
menit = int(input())
detik = int(input())
total = jam * 3600 + menit * 60 + detik
print("Total durasi: " + str(total) + " detik")`,
          pseudo: r`Program Konversi_Waktu
{ Mengubah jam, menit, detik menjadi total detik }
KAMUS
  jam, menit, detik, total : integer
ALGORITMA
  input(jam)
  input(menit)
  input(detik)
  total ← jam * 3600 + menit * 60 + detik
  output("Total durasi: ", total, " detik")`,
          flow: { title: 'Konversi waktu', blocks: [
            { t: 'io', dir: 'in', text: 'input(jam)' },
            { t: 'io', dir: 'in', text: 'input(menit)' },
            { t: 'io', dir: 'in', text: 'input(detik)' },
            { t: 'process', text: 'total ← jam * 3600 + menit * 60 + detik' },
            { t: 'io', dir: 'out', text: 'output("Total durasi: ", total, " detik")' },
          ] },
        },
        tests: [{ stdin: ['1', '45', '30'], edge: 'sheet example: 6330' }, { stdin: ['0', '0', '0'], edge: 'zero duration' }, { stdin: ['0', '0', '59'], edge: 'seconds only' }, { stdin: ['2', '0', '0'], edge: 'hours only' }, { stdin: ['0', '10', '5'] }],
        wrong: [
          { code: 'jam = int(input())\nmenit = int(input())\ndetik = int(input())\ntotal = jam * 360 + menit * 60 + detik\nprint(total)', msg: '1 jam = 60 × 60 = 3600 detik, bukan 360.', msgEn: '1 hour = 60 × 60 = 3600 seconds, not 360.' },
          { code: 'jam = int(input())\nmenit = int(input())\ndetik = int(input())\ntotal = jam * 60 + menit * 60 + detik\nprint(total)', msg: 'Jam harus dikali 3600 (bukan 60) untuk menjadi detik.', msgEn: 'Hours must be multiplied by 3600 (not 60) to become seconds.' },
        ],
        plan: 'baca jam, menit, detik; total ← jam*3600 + menit*60 + detik; tampilkan total',
        skeleton: 'jam = int(input())\nmenit = ___\ndetik = ___\ntotal = jam * ___ + menit * ___ + ___\nprint("Total durasi: " + str(___) + " detik")',
        hints: ['Berapa detik dalam 1 menit? Dalam 1 jam?', 'Jumlahkan ketiga bagian setelah masing-masing diubah ke detik.'],
        work: ['1 menit = 60 detik; 1 jam = 3600 detik.', 'Baca jam, menit, detik.', 'total = jam × 3600 + menit × 60 + detik.', 'Tampilkan total (contoh: 1, 45, 30 → 6330).'],
        syntax: ['program-template', 'input', 'type-conversion', 'operators', 'print-str'],
        lineNotes: [
          { line: [1, 6], note: 'Kerangka program: judul, spesifikasi, DECLARATIONS, ALGORITHM.', en: 'Program skeleton: title, specification, DECLARATIONS, ALGORITHM.', syntax: 'program-template' },
          { line: [7, 9], note: 'Tiga baris masukan, masing-masing dibungkus `int(...)` karena `input()` menghasilkan string.', en: 'Three input lines, each wrapped in `int(...)` because `input()` returns a string.', syntax: 'input' },
          { line: 10, note: 'Konversi satuan: 1 jam = 3600 detik, 1 menit = 60 detik. Contoh: 1·3600 + 45·60 + 30 = 6330.', en: 'Unit conversion: 1 hour = 3600 s, 1 minute = 60 s. Example: 1·3600 + 45·60 + 30 = 6330.', syntax: 'operators' },
          { line: 11, note: '`str(total)` wajib agar bisa digabung dengan teks.', en: '`str(total)` is required to join it with text.', syntax: 'print-str' },
        ],
        pseudoNotes: [
          { line: [6, 8], note: 'Tiga masukan dibaca berurutan (jam, menit, detik).', en: 'Three inputs are read in order (hours, minutes, seconds).' },
          { line: 9, note: 'Konversi semua ke detik dengan satu ekspresi.', en: 'Convert everything to seconds in one expression.' },
        ],
        explanation: 'Total detik = jam × 3600 + menit × 60 + detik. Untuk 1 jam 45 menit 30 detik: 3600 + 2700 + 30 = 6330 detik. Catatan: format masukan dianggap tiga baris.',
        refs: [{ src: D04, page: 5 }],
        en: {
          stem: 'Someone wants to compute the total duration of several activities lasting some hours, minutes and seconds. Write a program that takes input in hours, minutes and seconds, then converts it to total seconds.\n\nExample:\nInput: 1 hour, 45 minutes, 30 seconds → Output: 6330 seconds',
          explanation: 'Total seconds = hours × 3600 + minutes × 60 + seconds. For 1 h 45 min 30 s: 3600 + 2700 + 30 = 6330 seconds. Note: the input is assumed to be three lines.',
          hints: ['How many seconds are in 1 minute? In 1 hour?', 'Add the three parts after converting each to seconds.'],
          work: ['1 minute = 60 s; 1 hour = 3600 s.', 'Read hours, minutes, seconds.', 'total = hours × 3600 + minutes × 60 + seconds.', 'Print total (example: 1, 45, 30 → 6330).'],
          plan: 'read hours, minutes, seconds; total ← hours*3600 + minutes*60 + seconds; print total',
        },
      }],
    },
    {
      id: 'w04-s4', archetype: 'program', title: 'Soal 4: Kasir sederhana',
      source: prov04(4),
      figures: [{ src: D04, page: 6 }],
      en: { title: 'Problem 4: Simple cashier' },
      parts: [{
        id: 'w04-s4a', kind: 'program', decks: ['D04', 'D05'], topic: 'Basic program structure', patterns: ['sequence-io', 'if-else', 'operators'], misconceptions: ['input-is-str'],
        stem: 'Sebuah warung makan menyediakan tiga jenis menu:\n\n- Nasi Goreng – Rp 18.000\n- Mie Goreng – Rp 15.000\n- Es Teh Manis – Rp 5.000\n\nBuatlah program kasir sederhana yang:\n\n- Meminta jumlah pesanan untuk setiap menu\n- Menghitung total harga pesanan\n- Meminta input uang pembayaran dari pembeli\n- Menentukan apakah uang cukup atau tidak\n- Jika cukup, tampilkan kembaliannya\n- Jika tidak cukup, tampilkan jumlah kekurangannya',
        figures: [{ src: D04, page: 6 }],
        reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: JUDGE_CASHIER, mustUse: ['if'],
        solution: {
          python: r`# Program Kasir_Sederhana
# Menghitung total pesanan 3 menu, lalu kembalian bila uang cukup atau kekurangan bila tidak
# DECLARATIONS
# nasi, mie, teh, total, bayar : int
# ALGORITHM
nasi = int(input())
mie = int(input())
teh = int(input())
total = nasi * 18000 + mie * 15000 + teh * 5000
print("Total harga: " + str(total))
bayar = int(input())
if (bayar >= total):
    print("Kembalian: " + str(bayar - total))
else:
    print("Kekurangan: " + str(total - bayar))`,
          pseudo: r`Program Kasir_Sederhana
{ Menghitung total pesanan 3 menu, lalu kembalian bila uang cukup atau kekurangan bila tidak }
KAMUS
  nasi, mie, teh, total, bayar : integer
ALGORITMA
  input(nasi)
  input(mie)
  input(teh)
  total ← nasi * 18000 + mie * 15000 + teh * 5000
  output("Total harga: ", total)
  input(bayar)
  if bayar ≥ total then
    output("Kembalian: ", bayar - total)
  else { bayar < total }
    output("Kekurangan: ", total - bayar)`,
          flow: { title: 'Kasir sederhana', blocks: [
            { t: 'io', dir: 'in', text: 'input(nasi)' },
            { t: 'io', dir: 'in', text: 'input(mie)' },
            { t: 'io', dir: 'in', text: 'input(teh)' },
            { t: 'process', text: 'total ← nasi * 18000 + mie * 15000 + teh * 5000' },
            { t: 'io', dir: 'out', text: 'output("Total harga: ", total)' },
            { t: 'io', dir: 'in', text: 'input(bayar)' },
            { t: 'if', cond: 'bayar >= total', then: [{ t: 'io', dir: 'out', text: 'output("Kembalian: ", bayar - total)' }], else: [{ t: 'io', dir: 'out', text: 'output("Kekurangan: ", total - bayar)' }] },
          ] },
        },
        tests: [{ stdin: ['1', '1', '1', '50000'], edge: 'enough money' }, { stdin: ['2', '0', '0', '30000'], edge: 'not enough money' }, { stdin: ['1', '1', '1', '38000'], edge: 'exact payment (change 0)' }, { stdin: ['0', '0', '0', '0'], edge: 'no order' }, { stdin: ['0', '0', '3', '10000'], edge: 'short by 5000' }],
        wrong: [
          { code: 'nasi = int(input())\nmie = int(input())\nteh = int(input())\ntotal = nasi * 18000 + mie * 15000 + teh * 5000\nprint("Total harga: " + str(total))\nbayar = int(input())\nif (bayar > total):\n    print("Kembalian: " + str(bayar - total))\nelse:\n    print("Kekurangan: " + str(total - bayar))', msg: 'Uang pas (bayar = total) dianggap kurang. Uang cukup bila `bayar >= total`.', msgEn: 'Paying exactly (bayar = total) is treated as insufficient. Money is enough when `bayar >= total`.' },
          { code: 'nasi = int(input())\nmie = int(input())\nteh = int(input())\ntotal = nasi * 15000 + mie * 18000 + teh * 5000\nprint("Total harga: " + str(total))\nbayar = int(input())\nif (bayar >= total):\n    print("Kembalian: " + str(bayar - total))\nelse:\n    print("Kekurangan: " + str(total - bayar))', msg: 'Harga Nasi Goreng dan Mie Goreng tertukar (18.000 dan 15.000).', msgEn: 'The prices of Nasi Goreng and Mie Goreng are swapped (18,000 and 15,000).' },
          { code: 'nasi = int(input())\nmie = int(input())\nteh = int(input())\ntotal = nasi * 18000 + mie * 15000 + teh * 5000\nprint("Total harga: " + str(total))\nbayar = int(input())\nif (bayar >= total):\n    print("Kembalian: " + str(bayar - total))\nelse:\n    print("Kekurangan: " + str(bayar - total))', msg: 'Kekurangan = total − bayar (bernilai positif); kamu menghitung kebalikannya sehingga negatif.', msgEn: 'Shortfall = total − bayar (positive); you computed the opposite so it came out negative.' },
        ],
        plan: 'baca jumlah tiap menu; total ← jumlah × harga dijumlahkan; tampilkan total; baca bayar; jika bayar ≥ total tampilkan bayar − total, selain itu tampilkan total − bayar',
        skeleton: 'nasi = int(input())\nmie = ___\nteh = ___\ntotal = nasi * ___ + mie * ___ + teh * ___\nprint("Total harga: " + str(total))\nbayar = int(input())\nif (bayar ___ total):\n    print("Kembalian: " + str(___))\nelse:\n    print("Kekurangan: " + str(___))',
        hints: ['Hitung total dulu sebelum meminta uang pembayaran.', 'Dua kemungkinan hasil: cukup atau tidak. Struktur apa yang cocok?', 'Bagaimana jika uang pas sama dengan total? Kembaliannya 0, jadi termasuk cukup.'],
        work: ['Baca jumlah Nasi Goreng, Mie Goreng, Es Teh Manis.', 'total = 18000·nasi + 15000·mie + 5000·teh; tampilkan.', 'Baca uang pembayaran.', 'Jika bayar ≥ total: tampilkan bayar − total (kembalian).', 'Selain itu: tampilkan total − bayar (kekurangan).'],
        syntax: ['program-template', 'input', 'type-conversion', 'operators', 'relational-logical', 'if-else', 'print-str'],
        lineNotes: [
          { line: [1, 5], note: 'Kerangka program: judul, spesifikasi, DECLARATIONS (semua `int`), ALGORITHM.', en: 'Program skeleton: title, specification, DECLARATIONS (all `int`), ALGORITHM.', syntax: 'program-template' },
          { line: [6, 8], note: 'Jumlah pesanan tiap menu, masing-masing `int(input())`.', en: 'The quantity ordered for each menu item, each `int(input())`.', syntax: 'input' },
          { line: 9, note: 'Total = jumlah × harga per menu, dijumlahkan.', en: 'Total = quantity × price per item, summed.', syntax: 'operators' },
          { line: 10, note: '`str(total)` wajib saat digabung dengan teks.', en: '`str(total)` is required when joining with text.', syntax: 'print-str' },
          { line: 11, note: 'Uang pembayaran dibaca **setelah** total ditampilkan, sesuai urutan di soal.', en: 'The payment is read **after** the total is shown, following the order in the sheet.', syntax: 'input' },
          { line: 12, note: '`>=` bukan `>`: uang pas (selisih 0) tetap cukup dan kembaliannya 0.', en: '`>=` not `>`: paying exactly (difference 0) is still enough and the change is 0.', syntax: 'if-else' },
          { line: 13, note: 'Cabang cukup: kembalian = bayar − total.', en: 'Enough branch: change = bayar − total.' },
          { line: [14, 15], note: 'Cabang tidak cukup: kekurangan = total − bayar (urutan dibalik agar positif).', en: 'Not-enough branch: shortfall = total − bayar (order reversed so it is positive).' },
        ],
        pseudoNotes: [
          { line: [6, 8], note: 'Tiga masukan jumlah pesanan.', en: 'Three inputs: the quantities ordered.' },
          { line: 9, note: 'Total harga pesanan.', en: 'Total price of the order.' },
          { line: [12, 15], note: '`if … then … else`: `≥` (cukup) versus `<` (kurang); dua keluaran berbeda.', en: '`if … then … else`: `≥` (enough) versus `<` (short); two different outputs.' },
        ],
        explanation: 'Urutan: baca pesanan → hitung total → baca uang → percabangan if-else. Syarat cukup adalah bayar ≥ total (uang pas termasuk cukup, kembalian 0). Catatan: format masukan/keluaran bebas; keluaran diperiksa berdasarkan maknanya (kata kembalian/kekurangan dan jumlahnya di baris terakhir).',
        refs: [{ src: D04, page: 6 }],
        en: {
          stem: 'A food stall offers three menu items:\n\n- Nasi Goreng (fried rice) – Rp 18,000\n- Mie Goreng (fried noodles) – Rp 15,000\n- Es Teh Manis (sweet iced tea) – Rp 5,000\n\nWrite a simple cashier program that:\n\n- Asks for the quantity ordered of each item\n- Computes the total price of the order\n- Asks for the customer\'s payment\n- Determines whether the money is enough\n- If enough, shows the change\n- If not enough, shows the shortfall',
          explanation: 'Order: read the order → compute the total → read the payment → if-else. Enough means bayar ≥ total (paying exactly counts, change 0). Note: the input/output format is free; the output is judged by meaning (the word for change/shortfall and its amount on the last line).',
          hints: ['Compute the total before asking for the payment.', 'Two possible outcomes: enough or not. Which structure fits?', 'What if the payment equals the total? The change is 0, so it counts as enough.'],
          work: ['Read the quantities of Nasi Goreng, Mie Goreng, Es Teh Manis.', 'total = 18000·nasi + 15000·mie + 5000·teh; print it.', 'Read the payment.', 'If bayar ≥ total: print bayar − total (change).', 'Otherwise: print total − bayar (shortfall).'],
          plan: 'read quantity of each item; total ← sum of quantity × price; print total; read bayar; if bayar ≥ total print bayar − total, otherwise print total − bayar',
        },
      }],
    },

    /* ===================== D06 Array dan Pemrosesannya: Latihan (PR) ===================== */
    {
      id: 'w06-pr1', archetype: 'program', title: 'PR-1: Mencari Huruf dalam Array',
      source: prov06(1, 3),
      figures: [{ src: D06, page: 3 }],
      en: { title: 'PR-1: Searching for a letter in an array' },
      parts: [{
        id: 'w06-pr1a', kind: 'program', decks: ['D06'], topic: 'Searching', patterns: ['search-flag', 'array-populate'], misconceptions: ['off-by-one', 'index-range'],
        stem: 'Judul: Mencari Huruf dalam Array\n\nSebuah array huruf dengan nama variable "alfabet" diisi berdasarkan masukan sebanyak N kali. Kemudian lakukan input untuk mencari suatu huruf dalam array alfabet tersebut. Buat program untuk mencari apakah huruf yang dimasukkan user ada di array atau tidak.\n\nRecc: Gunakan pencarian dengan while loop.\n\n- Jika huruf ada → tampilkan indeks kemunculannya.\n- Jika huruf tidak ada → tampilkan pesan bahwa huruf tidak termuat pada array.\n\nContoh array panjang 7: alfabet = [\'A\',\'B\',\'C\',\'D\',\'E\',\'F\',\'G\']. Akan dicari huruf "C", maka keluar informasi bahwa huruf C pada array alfabet ada pada indeks ke-2.\n\n(Untuk uji di situs ini: masukan N, lalu N huruf (satu per baris), lalu huruf yang dicari.)',
        figures: [{ src: D06, page: 3 }],
        reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: JUDGE_SEARCH, mustUse: ['array', 'while'],
        solution: {
          python: r`# Program Cari_Huruf
# Mengisi array alfabet sebanyak N huruf, lalu mencari indeks pertama sebuah huruf (pencarian dengan while dan flag found)
# DECLARATIONS
# N, i : int
# alfabet : array [0..N-1] of str
# cari : str
# found : bool
# ALGORITHM
N = int(input())
alfabet = ['' for i in range(N)]
for i in range(0, N):
    alfabet[i] = input()
cari = input()
i = 0
found = False
while (i < N and found == False):
    if (alfabet[i] == cari):
        found = True
    else:
        i = i + 1
if (found == True):
    print("Huruf " + cari + " pada array alfabet ada pada indeks ke-" + str(i))
else:
    print("Huruf " + cari + " tidak termuat pada array alfabet")`,
          pseudo: r`Program Cari_Huruf
{ Mengisi array alfabet sebanyak N huruf, lalu mencari indeks pertama sebuah huruf }
KAMUS
  N, i : integer
  alfabet : array [0..N-1] of character
  cari : character
  found : boolean
ALGORITMA
  input(N)
  i traversal [0..N-1]
    input(alfabet[i])
  input(cari)
  i ← 0
  found ← false
  while (i < N) and (found = false) do
    if (alfabet[i] = cari) then
      found ← true
    else { alfabet[i] ≠ cari }
      i ← i + 1
  { i = N atau found = true }
  if (found = true) then
    output("Huruf " + cari + " pada array alfabet ada pada indeks ke-" + i)
  else
    output("Huruf " + cari + " tidak termuat pada array alfabet")`,
        },
        tests: [
          { stdin: ['7', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'C'], edge: 'sheet example: index 2' },
          { stdin: ['7', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A'], edge: 'at index 0' },
          { stdin: ['7', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'G'], edge: 'at the last index' },
          { stdin: ['7', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'Z'], edge: 'not found' },
          { stdin: ['1', 'X', 'X'], edge: 'N = 1' },
          { stdin: ['4', 'A', 'B', 'C', 'B', 'B'], edge: 'appears twice: first index' },
        ],
        wrong: [
          { code: 'N = int(input())\nalfabet = [\'\' for i in range(N)]\nfor i in range(0, N):\n    alfabet[i] = input()\ncari = input()\ni = 0\nfound = False\nwhile (i < N and found == False):\n    if (alfabet[i] == cari):\n        found = True\n    i = i + 1\nif (found == True):\n    print("Huruf " + cari + " pada indeks ke-" + str(i))\nelse:\n    print("Huruf " + cari + " tidak termuat pada array")', msg: '`i = i + 1` dijalankan juga saat huruf ditemukan, sehingga indeks yang dilaporkan lebih besar 1. Naikkan i hanya di `else`.', msgEn: '`i = i + 1` also runs when the letter is found, so the reported index is one too large. Increment i only in the `else`.', tag: 'off-by-one' },
          { code: 'N = int(input())\nalfabet = [\'\' for i in range(N)]\nfor i in range(0, N):\n    alfabet[i] = input()\ncari = input()\ni = 0\nfound = False\nwhile (i <= N and found == False):\n    if (alfabet[i] == cari):\n        found = True\n    else:\n        i = i + 1\nif (found == True):\n    print("Huruf " + cari + " pada indeks ke-" + str(i))\nelse:\n    print("Huruf " + cari + " tidak termuat pada array")', msg: '`i <= N` melewati batas: indeks valid hanya 0..N−1, jadi saat huruf tidak ada terjadi IndexError. Gunakan `i < N`.', msgEn: '`i <= N` goes out of bounds: valid indices are only 0..N−1, so an IndexError occurs when the letter is absent. Use `i < N`.', tag: 'index-range' },
          { code: 'N = int(input())\nalfabet = [\'\' for i in range(N)]\nfor i in range(0, N):\n    alfabet[i] = input()\ncari = input()\nhasil = -1\nfor i in range(0, N):\n    if (alfabet[i] == cari):\n        hasil = i\nif (hasil >= 0):\n    print("Huruf " + cari + " pada indeks ke-" + str(hasil))\nelse:\n    print("Huruf " + cari + " tidak termuat pada array")', msg: 'Program ini menghasilkan indeks **terakhir**; pencarian harus berhenti pada kemunculan pertama (while dengan flag).', msgEn: 'This produces the **last** index; the search must stop at the first occurrence (while with a flag).' },
        ],
        plan: 'isi alfabet dari N masukan; baca cari; i ← 0, found ← false; selama i < N dan belum found: jika alfabet[i] = cari maka found ← true, selain itu i ← i + 1; jika found tampilkan i, selain itu tampilkan pesan tidak ada',
        skeleton: 'N = int(input())\nalfabet = [\'\' for i in range(N)]\nfor i in range(0, N):\n    alfabet[i] = ___\ncari = input()\ni = 0\nfound = ___\nwhile (i < N and found == ___):\n    if (alfabet[i] == ___):\n        found = ___\n    else:\n        i = ___\nif (found == True):\n    print("Huruf " + cari + " pada array alfabet ada pada indeks ke-" + str(___))\nelse:\n    print("Huruf " + cari + " tidak termuat pada array alfabet")',
        hints: ['Pola pencarian: perlu flag untuk membedakan "ditemukan" dan "tidak ada".', 'Kapan i boleh bertambah? Hanya bila elemen ini bukan yang dicari.', 'Tulis `i < N` sebelum `and` agar `alfabet[i]` tidak pernah di luar batas.'],
        work: ['Baca N, isi array alfabet dengan N huruf (indeks 0..N−1).', 'Baca huruf yang dicari.', 'i = 0, found = False.', 'Selama i < N dan belum found: jika alfabet[i] sama dengan huruf → found = True; selain itu i = i + 1.', 'Setelah loop: jika found tampilkan i, selain itu tampilkan pesan huruf tidak termuat.'],
        syntax: ['program-template', 'list-init', 'list-index', 'for-range', 'while', 'relational-logical', 'if-else', 'print-str'],
        lineNotes: [
          { line: [1, 8], note: 'Kerangka program: judul + spesifikasi, DECLARATIONS (array huruf, flag `found`), lalu ALGORITHM.', en: 'Program skeleton: title + specification, DECLARATIONS (the letter array, the `found` flag), then ALGORITHM.', syntax: 'program-template' },
          { line: [9, 10], note: 'Baca N lalu buat array berukuran N dengan `[... for i in range(N)]`; indeks 0..N−1.', en: 'Read N, then create an array of size N with `[... for i in range(N)]`; indices 0..N−1.', syntax: 'list-init' },
          { line: [11, 12], note: 'Mengisi array: `range(0, N)` mengunjungi indeks 0..N−1 (batas atas tidak ikut). Huruf tidak perlu `int(...)`.', en: 'Filling the array: `range(0, N)` visits indices 0..N−1 (the upper bound is excluded). Letters need no `int(...)`.', syntax: 'for-range' },
          { line: 13, note: 'Huruf yang dicari dibaca **setelah** array terisi, sesuai urutan di soal.', en: 'The letter to search is read **after** the array is filled, following the sheet.', syntax: 'input' },
          { line: [14, 15], note: 'Inisialisasi pencarian: mulai dari indeks 0, flag `found = False` (belum ditemukan).', en: 'Search initialization: start at index 0 and the flag `found = False` (not found yet).' },
          { line: 16, note: 'Berhenti bila indeks habis **atau** sudah ketemu. `i < N` ditulis lebih dulu agar `alfabet[i]` tidak pernah di luar batas.', en: 'Stop when the indices run out **or** the letter is found. `i < N` comes first so `alfabet[i]` is never out of bounds.', syntax: 'while' },
          { line: [17, 18], note: 'Ketemu: set flag dan **jangan** ubah i, agar i menunjuk kemunculan pertama.', en: 'Found: set the flag and do **not** change i, so i points to the first occurrence.' },
          { line: [19, 20], note: 'Increment hanya di `else`: kalau tidak, indeks yang dilaporkan lebih besar 1.', en: 'Increment only in the `else`: otherwise the reported index is off by one.' },
          { line: [21, 24], note: 'Keputusan keluaran berdasarkan `found`, bukan nilai i (i = N juga mungkin berarti tidak ada). `str(i)` wajib saat digabung dengan teks.', en: 'The output decision uses `found`, not the value of i (i = N could also mean absent). `str(i)` is required when joining with text.', syntax: 'print-str' },
        ],
        pseudoNotes: [
          { line: [3, 7], note: 'KAMUS: array karakter dan `found` bertipe boolean.', en: 'KAMUS (declarations): a character array and a boolean `found`.' },
          { line: [10, 11], note: '`i traversal [0..N-1]`: mengisi seluruh array.', en: '`i traversal [0..N-1]`: fills the whole array.' },
          { line: [15, 19], note: '`while ... do` dengan dua syarat; `i ← i + 1` hanya di bagian `else`.', en: '`while ... do` with two conditions; `i ← i + 1` only in the `else` part.' },
          { line: [21, 24], note: 'Setelah loop, pilih keluaran berdasarkan flag `found`.', en: 'After the loop, choose the output from the `found` flag.' },
        ],
        explanation: 'Pola pencarian dengan flag (D06): while berhenti saat indeks habis atau huruf ditemukan; i hanya naik di else; keputusan akhir berdasar `found`. Catatan: sheet tidak menetapkan format masukan; di sini N, N huruf, lalu huruf yang dicari. Keluaran diperiksa berdasar maknanya (indeks bila ada; pesan tanpa angka bila tidak ada).',
        refs: [{ src: D06, page: 3 }],
        en: {
          stem: 'Title: Searching for a letter in an array\n\nAn array of letters named "alfabet" is filled from N inputs. Then read a letter to search for in that array. Write a program that finds whether the letter entered by the user is in the array or not.\n\nRecommendation: use a search with a while loop.\n\n- If the letter exists → show its index of occurrence.\n- If the letter does not exist → show a message that the letter is not contained in the array.\n\nExample with an array of length 7: alfabet = [\'A\',\'B\',\'C\',\'D\',\'E\',\'F\',\'G\']. If the letter "C" is searched, the output says that letter C is in array alfabet at index 2.\n\n(For testing on this site: input N, then N letters (one per line), then the letter to search for.)',
          explanation: 'The search pattern with a flag (D06): the while loop stops when the indices run out or the letter is found; i increases only in the else; the final decision uses `found`. Note: the sheet does not fix the input format; here N, then N letters, then the letter to search. The output is judged by meaning (the index when found; a message without numbers when absent).',
          hints: ['Search pattern: you need a flag to tell "found" from "absent".', 'When may i increase? Only if this element is not the one searched.', 'Write `i < N` before `and` so `alfabet[i]` is never out of bounds.'],
          work: ['Read N, fill array alfabet with N letters (indices 0..N−1).', 'Read the letter to search for.', 'i = 0, found = False.', 'While i < N and not found: if alfabet[i] equals the letter → found = True; otherwise i = i + 1.', 'After the loop: if found print i, otherwise print the message that the letter is not contained.'],
          plan: 'fill alfabet from N inputs; read cari; i ← 0, found ← false; while i < N and not found: if alfabet[i] = cari then found ← true, else i ← i + 1; if found print i, else print the not-found message',
        },
      }],
    },
    {
      id: 'w06-pr2', archetype: 'program', title: 'PR-2: Mencari Nilai Ganjil Pertama',
      source: prov06(2, 4),
      figures: [{ src: D06, page: 4 }],
      en: { title: 'PR-2: Finding the first odd value' },
      parts: [{
        id: 'w06-pr2a', kind: 'program', decks: ['D06'], topic: 'Searching', patterns: ['search-flag', 'array-populate'], misconceptions: ['index-range'],
        stem: 'Judul: Mencari Nilai Ganjil Pertama\n\nDiberikan sebuah array nilai = [12, 24, 18, 21, 36, 45, …]. Buat program Python untuk mencari **elemen pertama yang ganjil** beserta indeksnya. Hasilnya "Angka ganjil pertama Adalah 21 pada indeks ke-3". Jika tidak ada angka ganjil, cetak pesan bahwa tidak ada nilai ganjil.\n\nCatt: Pada soal ini, silahkan definisikan array-nya sendiri dengan panjang 12.\n\n(Untuk uji di situs ini: array diisi dari 12 masukan, satu nilai per baris.)',
        figures: [{ src: D06, page: 4 }],
        reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: JUDGE_SEARCH, mustUse: ['array'],
        solution: {
          python: r`# Program Ganjil_Pertama
# Mengisi array nilai (12 elemen), lalu mencari elemen ganjil pertama beserta indeksnya
# DECLARATIONS
# nilai : array [0..11] of int
# i : int
# found : bool
# ALGORITHM
nilai = [0 for i in range(12)]
for i in range(0, 12):
    nilai[i] = int(input())
i = 0
found = False
while (i < 12 and found == False):
    if (nilai[i] % 2 != 0):
        found = True
    else:
        i = i + 1
if (found == True):
    print("Angka ganjil pertama adalah " + str(nilai[i]) + " pada indeks ke-" + str(i))
else:
    print("Tidak ada nilai ganjil")`,
          pseudo: r`Program Ganjil_Pertama
{ Mengisi array nilai (12 elemen), lalu mencari elemen ganjil pertama beserta indeksnya }
KAMUS
  nilai : array [0..11] of integer
  i : integer
  found : boolean
ALGORITMA
  i traversal [0..11]
    input(nilai[i])
  i ← 0
  found ← false
  while (i < 12) and (found = false) do
    if (nilai[i] mod 2 ≠ 0) then
      found ← true
    else { nilai[i] genap }
      i ← i + 1
  { i = 12 atau found = true }
  if (found = true) then
    output("Angka ganjil pertama adalah " + nilai[i] + " pada indeks ke-" + i)
  else
    output("Tidak ada nilai ganjil")`,
        },
        tests: [
          { stdin: ['12', '24', '18', '21', '36', '45', '8', '10', '14', '16', '20', '22'], edge: 'sheet example: 21 at index 3' },
          { stdin: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '24'], edge: 'no odd value' },
          { stdin: ['7', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22'], edge: 'odd at index 0' },
          { stdin: ['2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22', '9'], edge: 'odd at the last index (11)' },
          { stdin: ['4', '6', '-3', '8', '10', '12', '14', '16', '18', '20', '22', '24'], edge: 'negative odd value' },
        ],
        wrong: [
          { code: 'nilai = [0 for i in range(12)]\nfor i in range(0, 12):\n    nilai[i] = int(input())\ni = 0\nfound = False\nwhile (i < 12 and found == False):\n    if (nilai[i] % 2 == 0):\n        found = True\n    else:\n        i = i + 1\nif (found == True):\n    print("Angka ganjil pertama adalah " + str(nilai[i]) + " pada indeks ke-" + str(i))\nelse:\n    print("Tidak ada nilai ganjil")', msg: 'Syarat terbalik: `% 2 == 0` mencari bilangan **genap**. Ganjil: `% 2 != 0`.', msgEn: 'The condition is reversed: `% 2 == 0` finds an **even** number. Odd: `% 2 != 0`.' },
          { code: 'nilai = [0 for i in range(12)]\nfor i in range(0, 12):\n    nilai[i] = int(input())\ni = 1\nfound = False\nwhile (i < 12 and found == False):\n    if (nilai[i] % 2 != 0):\n        found = True\n    else:\n        i = i + 1\nif (found == True):\n    print("Angka ganjil pertama adalah " + str(nilai[i]) + " pada indeks ke-" + str(i))\nelse:\n    print("Tidak ada nilai ganjil")', msg: 'Pencarian dimulai dari indeks 1, sehingga elemen pertama (indeks 0) terlewat. Indeks array dimulai dari 0.', msgEn: 'The search starts at index 1, so the first element (index 0) is skipped. Array indices start at 0.', tag: 'index-range' },
          { code: 'nilai = [0 for i in range(12)]\nfor i in range(0, 12):\n    nilai[i] = int(input())\nhasil = -1\nfor i in range(0, 12):\n    if (nilai[i] % 2 != 0):\n        hasil = i\nif (hasil >= 0):\n    print("Angka ganjil pertama adalah " + str(nilai[hasil]) + " pada indeks ke-" + str(hasil))\nelse:\n    print("Tidak ada nilai ganjil")', msg: 'Program ini menemukan ganjil **terakhir**: loop tidak berhenti pada ganjil pertama. Gunakan while dengan flag.', msgEn: 'This finds the **last** odd value: the loop does not stop at the first odd one. Use a while loop with a flag.' },
        ],
        plan: 'isi nilai dari 12 masukan; i ← 0, found ← false; selama i < 12 dan belum found: jika nilai[i] ganjil maka found ← true, selain itu i ← i + 1; jika found tampilkan nilai[i] dan i, selain itu tampilkan pesan tidak ada ganjil',
        skeleton: 'nilai = [0 for i in range(12)]\nfor i in range(0, 12):\n    nilai[i] = ___\ni = 0\nfound = ___\nwhile (i < ___ and found == ___):\n    if (nilai[i] % 2 ___ 0):\n        found = ___\n    else:\n        i = ___\nif (found == True):\n    print("Angka ganjil pertama adalah " + str(nilai[___]) + " pada indeks ke-" + str(___))\nelse:\n    print("Tidak ada nilai ganjil")',
        hints: ['Bilangan ganjil: sisa bagi 2 tidak sama dengan 0.', 'Ini pola pencarian: berhenti pada elemen ganjil pertama dengan flag `found`.', 'Setelah loop, bedakan "ditemukan" dan "tidak ada ganjil" dengan flag, bukan dengan nilai i.'],
        work: ['Definisikan array nilai berukuran 12 (di sini diisi dari 12 masukan).', 'i = 0, found = False.', 'Selama i < 12 dan belum found: jika nilai[i] % 2 != 0 → found = True; selain itu i = i + 1.', 'Jika found: tampilkan nilai[i] dan i; selain itu tampilkan pesan tidak ada nilai ganjil.'],
        syntax: ['program-template', 'list-init', 'list-index', 'for-range', 'while', 'relational-logical', 'if-else', 'print-str'],
        lineNotes: [
          { line: [1, 7], note: 'Kerangka program: judul + spesifikasi, DECLARATIONS (array 12 elemen, flag `found`), ALGORITHM.', en: 'Program skeleton: title + specification, DECLARATIONS (12-element array, the `found` flag), ALGORITHM.', syntax: 'program-template' },
          { line: [8, 10], note: 'Array 12 elemen (indeks 0..11) dibuat lalu diisi. `range(0, 12)` berhenti di 11: batas atas tidak ikut.', en: 'A 12-element array (indices 0..11) is created and filled. `range(0, 12)` stops at 11: the upper bound is excluded.', syntax: 'list-init' },
          { line: [11, 12], note: 'Inisialisasi pencarian: mulai dari indeks 0 dan flag `found = False`.', en: 'Search initialization: start at index 0 and the flag `found = False`.' },
          { line: 13, note: 'Berhenti bila indeks habis atau ketemu; `i < 12` ditulis lebih dulu agar `nilai[i]` tidak di luar batas.', en: 'Stop when the indices run out or a value is found; `i < 12` comes first so `nilai[i]` is never out of bounds.', syntax: 'while' },
          { line: 14, note: '`% 2 != 0`: sisa bagi 2 bukan nol berarti ganjil (juga benar untuk bilangan negatif di Python).', en: '`% 2 != 0`: a remainder other than zero when divided by 2 means odd (also correct for negative numbers in Python).', syntax: 'relational-logical' },
          { line: 15, note: 'Ketemu: set flag; i tidak diubah sehingga menunjuk ganjil pertama.', en: 'Found: set the flag; i is unchanged so it points to the first odd value.' },
          { line: [16, 17], note: 'Increment hanya di `else`, agar i berhenti di elemen yang ditemukan.', en: 'Increment only in the `else`, so i stops at the element found.' },
          { line: [18, 19], note: 'Ditemukan: tampilkan nilai dan indeksnya; `str()` wajib untuk `+` dengan teks.', en: 'Found: print the value and its index; `str()` is required for `+` with text.', syntax: 'print-str' },
          { line: [20, 21], note: 'Tidak ada ganjil: tampilkan pesan, bukan nilai i (i = 12 bukan indeks).', en: 'No odd value: print the message, not the value of i (i = 12 is not an index).' },
        ],
        pseudoNotes: [
          { line: [4, 6], note: 'Array 12 elemen bertipe integer dan flag boolean.', en: 'A 12-element integer array and a boolean flag.' },
          { line: [8, 9], note: 'Mengisi array dengan traversal 0..11.', en: 'Fill the array with a traversal 0..11.' },
          { line: [12, 16], note: '`mod` memberi sisa bagi; `≠ 0` berarti ganjil. `i ← i + 1` hanya di `else`.', en: '`mod` gives the remainder; `≠ 0` means odd. `i ← i + 1` only in the `else`.' },
        ],
        explanation: 'Pola pencarian elemen pertama yang memenuhi syarat: while dengan flag, berhenti pada ganjil pertama. Syarat ganjil `nilai[i] % 2 != 0`. Untuk contoh [12, 24, 18, 21, …] hasilnya 21 pada indeks 3. Catatan: sheet meminta array didefinisikan sendiri (panjang 12); di situs array diisi dari 12 masukan agar bisa diuji. Keluaran diperiksa berdasar maknanya (nilai dan indeks).',
        refs: [{ src: D06, page: 4 }],
        en: {
          stem: 'Title: Finding the first odd value\n\nGiven an array nilai = [12, 24, 18, 21, 36, 45, …]. Write a Python program that finds the **first odd element** and its index. The result is "Angka ganjil pertama Adalah 21 pada indeks ke-3" (the first odd number is 21 at index 3). If there is no odd number, print a message that there is no odd value.\n\nNote: in this problem, define the array yourself with length 12.\n\n(For testing on this site: the array is filled from 12 inputs, one value per line.)',
          explanation: 'The pattern of searching for the first element that satisfies a condition: a while loop with a flag, stopping at the first odd value. Odd condition: `nilai[i] % 2 != 0`. For [12, 24, 18, 21, …] the result is 21 at index 3. Note: the sheet asks you to define the array yourself (length 12); on this site it is filled from 12 inputs so it can be tested. The output is judged by meaning (the value and the index).',
          hints: ['An odd number: the remainder when divided by 2 is not 0.', 'This is the search pattern: stop at the first odd element with the `found` flag.', 'After the loop, tell "found" from "no odd value" with the flag, not with the value of i.'],
          work: ['Define the array nilai with 12 elements (here filled from 12 inputs).', 'i = 0, found = False.', 'While i < 12 and not found: if nilai[i] % 2 != 0 → found = True; otherwise i = i + 1.', 'If found: print nilai[i] and i; otherwise print the message that there is no odd value.'],
          plan: 'fill nilai from 12 inputs; i ← 0, found ← false; while i < 12 and not found: if nilai[i] is odd then found ← true, else i ← i + 1; if found print nilai[i] and i, else print the no-odd message',
        },
      }],
    },
  ],
  flashcards: [],
}
