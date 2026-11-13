// Student-made mock UTS papers (unofficial): Acads FTI 25 ('mfti-'), Gemini-generated ('mgem-'), Pengkom/KU1102 stream ('mpk-').
// Keys of the mocks were checked against the slides (D01-D11); disagreements are flagged "Catatan:" in the explanation.
import type { BankFile, DeckId, En, Paper, Problem, Question, RubricRow, PageRef } from '../types'

const r = String.raw

/* ------------------------------- helpers ------------------------------- */

const mcqProblem = (o: {
  src: string; pre: string; n: number; label: string; pages: number[]; decks: DeckId[]; topic: string
  stem: string; options: string[]; ans: number; explanation: string; why?: string[]; figures?: PageRef[]; out?: boolean
}): Problem => {
  const pid = `${o.pre}-a-${String(o.n).padStart(2, '0')}`
  const part: Question = {
    id: pid + '-1', kind: 'mcq', decks: o.decks, topic: o.topic, stem: o.stem, options: o.options, answer: [o.ans],
    explanation: o.explanation, refs: o.pages.map((page) => ({ src: o.src, page })),
    ...(o.why ? { why: o.why } : {}), ...(o.figures ? { figures: o.figures } : {}),
  }
  return {
    id: pid, archetype: 'concept', title: `${o.label} – ${o.topic}`,
    source: { kind: 'mock' as const, lang: 'id' as const, src: o.src, label: o.label, pages: o.pages, official: false, ...(o.out ? { outOfScope: true } : {}) },
    parts: [part],
  }
}

/** Generic 0-4 rubric in the official style; `full` is what a score-4 answer contains. */
const R3 = 'Hampir lengkap, tetapi ada satu kesalahan kecil atau satu bagian yang kurang'
const R2 = 'Hanya sebagian jawaban yang benar'
const R1 = 'Jawaban kurang tepat, tetapi masih ada hal yang benar'
const rub = (full: string, three = R3, two = R2, one = R1): RubricRow[] => [
  { score: 4, desc: full },
  { score: 3, desc: three, ...(three === R3 ? { descEn: 'Almost complete, but there is one small error or one missing part' } : {}) },
  { score: 2, desc: two, ...(two === R2 ? { descEn: 'Only part of the answer is correct' } : {}) },
  { score: 1, desc: one, ...(one === R1 ? { descEn: 'The answer is not quite right, but something correct remains' } : {}) },
  { score: 0, desc: 'Tidak menjawab atau jawaban sama sekali salah', descEn: 'No answer or completely wrong answer' },
]
const rubProg = (what: string): RubricRow[] => [
  { score: 4, desc: `Program ${what} dan menghasilkan keluaran yang benar untuk semua kasus (termasuk kasus batas)` },
  { score: 3.5, desc: 'Ada kesalahan kecil (mis. tanda baca, str(), atau satu kasus batas) yang menyebabkan solusi tidak sempurna', descEn: 'Minor error (e.g. punctuation, str(), or one boundary case) that makes the solution imperfect' },
  { score: 3, desc: 'Logika utama benar tetapi ada satu kesalahan logika pada kasus tertentu', descEn: 'Main logic is correct but there is one logic error in a particular case' },
  { score: 2, desc: 'Hanya sebagian logika yang benar; program tidak menghasilkan keluaran yang diharapkan', descEn: 'Only part of the logic is correct; the program does not produce the expected output' },
  { score: 1, desc: 'Program tidak tepat, tetapi masih ada potongan yang benar (mis. input/output)', descEn: 'The program is not correct, but some correct pieces remain (e.g. input/output)' },
  { score: 0, desc: 'Tidak mengerjakan atau jawaban sama sekali salah', descEn: 'No attempt or completely wrong answer' },
]

/* =============================================================================
   1. Mock Acads FTI 25  (mfti-)
   ============================================================================= */

const FTI = 'Mock_AcadsFTI25'
const fa = (n: number, pages: number[], topic: string, stem: string, options: string[], ans: number, explanation: string, figures?: PageRef[]) =>
  mcqProblem({ src: FTI, pre: 'mfti', n, label: `Bagian A no. ${n}`, pages, decks: ['D11'], topic, stem, options, ans, explanation, figures })

const ftiMcq: Problem[] = [
  fa(1, [2], 'Netiquette', 'Berikut ini yang termasuk ke dalam *netiquette and messaging etiquette* adalah, kecuali:',
    ['*Keep it short*', '*Keep your cool*', '*Assume you are anonymous*', '*Say what you mean*'], 2,
    'Slide D11 (h26) menyebut: *say what you mean*, *keep it short*, *keep your cool*, dan *don\'t assume you are anonymous*. Jadi "Assume you are anonymous" justru kebalikan dari aturan (jangan menganggap diri anonim). Kunci mock (C) benar.'),
  fa(2, [2], 'Factory automation', 'Perhatikan gambar berikut (pabrik penuh lengan robot tanpa pekerja). Gambar berikut merupakan salah satu dampak dari *automation* yang disebut…',
    ['*Humanless factory*', '*AI factory*', '*Dark factory*', '*24-hour factory*'], 2,
    '*Dark factory* (*lights-out factory*) adalah pabrik yang sepenuhnya otomatis sehingga tidak perlu lampu/pekerja. Catatan: istilah ini tidak ada di slide D11 (h32 hanya membahas "The Automated Factory": robot untuk pengecatan, pengelasan, perakitan berulang); "Humanless factory" bukan istilah baku. Kunci mock (C) diikuti sebagai istilah umum.',
    [{ src: FTI, page: 2 }]),
  fa(3, [2], 'Software piracy', 'Negara dengan *software piracy rate* tertinggi adalah…', ['Libya', 'Sri Lanka', 'Venezuela', 'Bolivia'], 1,
    'Catatan: kunci mock menyebut Sri Lanka, tetapi fakta ini tidak ada di slide D11 (2026) dan angkanya bergantung pada tahun survei (BSA), sehingga tidak dapat diverifikasi dari slide. Soal tipe hafalan statistik seperti ini sangat kecil kemungkinannya muncul di UTS; fokuskan waktu pada konsep HAKI/lisensi. Kunci mock (B) dicatat apa adanya.'),
  fa(4, [2], 'Intellectual property', 'Fungsi utama dari HAKI (Hak atas Kekayaan Intelektual) adalah',
    ['Melindungi simbol, gambar, suara, warna, dan bau', 'Melindungi buku, lagu, penampilan panggung, lukisan, foto, dan film', 'Melindungi rahasia-rahasia perdagangan', 'Hasil aktivitas intelektual dalam bidang seni, sains, dan industri'], 3,
    'Opsi A = merek, B = hak cipta, C = rahasia dagang; masing-masing hanya satu jenis HAKI. Opsi D merumuskan cakupan HAKI secara umum (hasil intelektual di seni, sains, industri). Catatan: topik HAKI tidak ada di slide D11 (2026) sehingga tidak bisa diverifikasi; kunci mock (D) diikuti karena paling umum.'),
  fa(5, [2, 3], 'UU ITE', 'Undang-undang yang membahas tentang kebebasan untuk berbicara di media sosial dengan bertanggung jawab adalah…',
    ['UU ITE No. 22 tahun 2012', 'UU ITE No. 11 tahun 2008', 'UU ITE No. 33 tahun 2019', 'UU ITE No. 01 tahun 2021'], 1,
    'Slide D11 (h27, *Freedom vs. Social Responsibility*): UU No. 11 Tahun 2008 tentang ITE. Perubahannya adalah UU No. 19/2016 dan UU No. 1/2024 (bukan "No. 01 tahun 2021"). Kunci mock (B) benar.'),
  fa(6, [3], 'Software licences', 'Berikut pernyataan yang tepat antara *proprietary software* dan *free software* adalah…',
    ['*Proprietary software* tidak gratis digunakan dan tidak bebas dimodifikasi, sedangkan *free software* gratis digunakan namun tidak bebas dimodifikasi', '*Proprietary software* gratis digunakan namun tidak bebas dimodifikasi, sedangkan *free software* tidak gratis digunakan dan tidak bebas dimodifikasi', '*Proprietary software* gratis digunakan namun tidak bebas dimodifikasi, sedangkan *free software* gratis digunakan dan bebas dimodifikasi', '*Proprietary* dan *free software* bebas dimodifikasi dan gratis digunakan'], 0,
    'Catatan: soal ini cacat. Secara definisi *free software* justru bebas dimodifikasi (opsi A salah di paruh kedua), tetapi *proprietary software* tidak gratis (opsi C salah di paruh pertama). Karena paruh pertama A benar dan C salah, kunci mock (A) diikuti sebagai "yang paling mendekati". Topik ini tidak ada di slide D11 (2026).'),
  fa(7, [3], 'Social engineering & fraud', 'Perhatikan *terms* serta definisnya: A. *Social engineering*, B. *Spoofing*, C. *Phishing*; 1. Berpura-pura menjadi orang lain dan melakukan tindakan-tindakan yang bersifat mengganggu; 2. Mendapatkan cara-cara penipuan untuk mendapatkan informasi yang bersifat sensitif dari orang lain; 3. Mendapatkan informasi penting dengan berpura-pura menjadi suatu pihak yang terpercaya secara *online*. Pasangan yang tepat adalah:',
    ['A1, B2, C3', 'A2, B3, C1', 'A2, B1, C3', 'A3, B1, C2'], 2,
    '*Social engineering* = memanipulasi orang untuk membocorkan informasi sensitif (2); *spoofing* = menyamar sebagai pihak lain (1); *phishing* = menyamar sebagai pihak tepercaya untuk mencuri informasi (3). Pasangan: A2, B1, C3. Kunci mock (C) benar menurut definisi umum (istilah ini tidak dibahas di slide D11 2026).'),
  fa(8, [3], 'Computer viruses', 'Berikut ini yang merupakan jenis virus yang menyerang dengan menginstruksikan pengguna untuk meng-klik tautan dan menyerang dokumen JPEG, JPG, dan dokumen sejenis, bernama…',
    ['Iloveyou', 'Ransomware', 'Code Red', 'CryptoLocker'], 0,
    'Worm ILOVEYOU (2000) menyebar lewat email "I LOVE YOU" yang meminta korban membuka lampiran, lalu menimpa berkas gambar (JPG/JPEG) dan lainnya. Ransomware/CryptoLocker mengenkripsi berkas untuk tebusan; Code Red menyerang server web. Kunci mock (A) sesuai fakta umum; tidak ada di slide D11 (2026).'),
  fa(9, [3, 4], 'Technology & politics', 'Bentuk gerakan politik, yang umumnya dilakukan menjelang pemilu, dengan menggunakan teknologi untuk membentuk opini publik disebut dengan…',
    ['*Gerrymandering*', '*Grassroot movement*', 'Serangan fajar', '*Black campaign*'], 3,
    '*Black campaign* (kampanye hitam) menyebarkan informasi negatif/palsu lewat media digital untuk membentuk opini publik. *Gerrymandering* = pengaturan batas daerah pemilihan; serangan fajar = politik uang; *grassroot movement* = gerakan akar rumput dari bawah. Catatan: istilah ini tidak ada di slide D11 (2026); kunci mock (D) diikuti.'),
  fa(10, [4], 'AI definitions', '"*Computational intelligence is the study of the design of intelligence agents*", definisi diatas merupakan definisi AI melalui pendekatan…',
    ['*Thinking humanly*', '*Acting humanly*', '*Thinking rationally*', '*Acting rationally*'], 3,
    'Slide D11 (h39) memuat 8 definisi dalam 4 pendekatan. Definisi "design of intelligent agents" (Poole dkk.) termasuk pendekatan *acting rationally* (agen yang bertindak untuk mencapai hasil terbaik). Kunci mock (D) benar.'),
  fa(11, [4], 'Computer security', 'Konsep dari *firewall* sebagai teknologi keamanan komputer adalah dengan…',
    ['Mendeteksi potensi kebocoran keamanan', 'Memantau dan menyimpan transaksi komputer sehingga dapat diketahui jejak aktivitasnya', 'Bentuk transmisi data dalam bentuk acak untuk mengamankan dalam proses pengiriman', 'Menjaga akses tidak terautorisasi terhadap jaringan internal'], 3,
    '*Firewall* memfilter lalu lintas jaringan dan mencegah akses tanpa izin ke jaringan internal. Opsi A = IDS, B = *audit log*, C = enkripsi. Kunci mock (D) benar (tidak ada di slide D11 2026).'),
  fa(12, [4], 'AI in traffic', 'Perhatikan gambar (peta Google dengan lapisan *Typical traffic*, Jumat 16.20). Gambar diatas merupakan pemanfaatan AI yang disebut sebagai…',
    ['*Traffic pattern*', '*Path finding*', '*Fastest route determination*', '*Time estimation*'], 0,
    'Slide D11 (h48, *AI in Life: AI in Traffic*) memberi label *Path finding / Direction* untuk peta rute, dan *Traffic pattern* untuk peta warna kepadatan lalu lintas "Typical traffic" seperti pada gambar soal. Kunci mock (A) benar.',
    [{ src: FTI, page: 4 }]),
  fa(13, [4, 5], 'Addiction & online violence', 'Berikut ini salah satu cara menghindari kecanduan dan kekerasan di media sosial adalah…',
    ['Membicarakan masalah secara langsung dan tidak di sosial media', 'Memutus hubungan dengan keluarga dan teman', 'Menghabiskan 25 jam per minggu untuk media digital', 'Mengurangi kegiatan-kegiatan sosial seperti unit kegiatan, himpunan, *club*, dan sebagainya'], 0,
    'Slide D11 (h15, *Avoiding Addiction & Violence*): jika ada masalah, bicarakan langsung (tatap muka); jaga hubungan dengan keluarga/teman; ikut kegiatan sosial seperti UKM/himpunan; batasi waktu layar. B, C, D bertentangan dengan anjuran itu. Kunci mock (A) benar.'),
  fa(14, [5], 'History of AI', 'Berdasarkan sejarah AI, salah satu hal yang terjadi ketika periode *The First Burst* adalah…',
    ['Munculnya sistem bernama XCON yang dibuat oleh Carnegie Mellon University', '*Deep blue* milik IBM yang bisa mengalahkan manusia dalam pertandingan catur', 'Berkembangnya Apple Siri, Google Driverless, dan Alpha Go', 'Munculnya robot humanoid biasa yang dapat memainkan musik'], 3,
    'Catatan: istilah "The First Burst" tidak dipakai di slide D11 (2026), yang memakai linimasa (h40) dengan sistem pakar 1980-an, Deep Blue 1997, asisten pribadi 2011-2014, AlphaGo 2016. Opsi A (XCON, sistem pakar awal 1980-an), B (1997), dan C (2010-an) jelas bukan periode awal, sehingga kunci mock (D) diterima secara eliminasi.'),
  fa(15, [5], 'AI in games', 'Bentuk pemanfaatan OpenAI pada Dota 2 adalah sebagai…',
    ['Platform untuk mengotomatisasi pembuatan *item* dan *script cheat* dalam Dota 2 supaya pemain bisa menang lebih mudah', 'Penyedia server publik bagi pemain Dota 2 supaya dapat bermain secara bersama dengan algoritma AI', 'Bot yang dilatih melalui *reinforcement learning* untuk bermain Dota 2 yang mampu menghadapi dan bahkan mengalahkan pemain manusia', '*Editor* peta (*map editor*) alternatif agar komunitas dapat membuat peta baru untuk Dota 2'], 2,
    'Slide D11 (h44): *OpenAI Five* bermain Dota 2 melawan pemain manusia (menang 99,4% pada kompetitif) dan juga bermain kooperatif bersama manusia. Jadi bot yang dilatih dengan *reinforcement learning*. Kunci mock (C) benar.'),
]

const ftiB1: Problem = {
  id: 'mfti-b-1', archetype: 'program', title: 'Bagian B no. 1 – Luas kamar kos trapesium',
  source: { kind: 'mock' as const, lang: 'id' as const, src: FTI, label: 'Bagian B no. 1', pages: [6], official: false },
  parts: [{
    id: 'mfti-b-1a', kind: 'program', decks: ['D04'], topic: 'Formulas & input/output', patterns: ['sequence-io', 'type-conversion'], misconceptions: ['input-is-str', 'int-vs-float-div'],
    stem: 'Buatlah kode pemrograman Python untuk membantu Rafa menentukan luas sebuah kamar kos berbentuk trapesium sama sisi dengan diketahui panjang sisi sejajar!',
    reps: ['python', 'pseudo', 'flow'], match: 'numbers',
    solution: {
      python: r`# Program Luas_Trapesium
# Menghitung luas trapesium sama kaki: sisi sejajar a dan b, tinggi t
# DECLARATIONS
# a, b, t : float
# luas : float
# ALGORITHM
a = float(input())
b = float(input())
t = float(input())
luas = (a + b) * t / 2
print(luas)`,
    },
    tests: [{ stdin: ['4', '6', '3'] }, { stdin: ['10', '10', '5'], edge: 'a = b (persegi panjang)' }, { stdin: ['2.5', '3.5', '2'], edge: 'bilangan desimal' }, { stdin: ['1', '1', '1'] }],
    wrong: [
      { code: 'a = float(input())\nb = float(input())\nt = float(input())\nprint((a + b) * t)', msg: 'Rumus luas trapesium = (a + b) × t / 2; kamu lupa dibagi 2.', tag: 'int-vs-float-div' },
      { code: 'a = float(input())\nb = float(input())\nt = float(input())\nprint(a + b * t / 2)', msg: 'Prioritas operator: perkalian/pembagian dikerjakan lebih dulu. Tambahkan kurung: (a + b) * t / 2.' },
      { code: 'a = int(input())\nb = int(input())\nt = int(input())\nprint((a + b) * t / 2)', msg: 'Ukuran kamar bisa desimal; gunakan float(input()), bukan int(input()).', tag: 'input-is-str' },
    ],
    hints: ['Soal tidak menyebut data lain selain sisi sejajar. Apa lagi yang dibutuhkan rumus luas trapesium?', 'Luas trapesium = jumlah sisi sejajar × tinggi / 2.'],
    plan: 'baca a, b, t (desimal); luas ← (a + b) × t / 2; tampilkan luas',
    syntax: ['program-template', 'input', 'type-conversion', 'operators'],
    lineNotes: [
      { line: [1, 6], note: 'Kerangka program gaya kuliah: judul, spesifikasi, KAMUS sebagai komentar, lalu ALGORITMA.', syntax: 'program-template' },
      { line: [7, 9], note: '`input()` menghasilkan string, jadi dibungkus `float(...)`. Dipakai float (bukan int) karena ukuran kamar bisa desimal.', syntax: 'type-conversion' },
      { line: 10, note: 'Kurung `(a + b)` wajib: tanpa kurung, `b * t / 2` dikerjakan lebih dulu dan hasilnya salah. Bagi dengan `2` menghasilkan float.', syntax: 'operators' },
      { line: 11, note: 'Cukup `print(luas)`; tidak ada string yang digabung sehingga tidak perlu `str()`.' },
    ],
    explanation: 'Catatan: soal kurang data. Luas trapesium sama kaki membutuhkan tinggi t (atau panjang kaki, dari mana t = √(kaki² − ((a−b)/2)²)). Solusi ini membaca a, b, dan t. Jika soal asli bermaksud memberi kaki k, hitung t dulu dengan `math.sqrt`. Rumus: L = (a + b) × t / 2.',
    refs: [{ src: FTI, page: 6 }], rubric: rubProg('membaca data, memakai rumus luas trapesium yang benar'),
  }],
}

const ftiB2: Problem = {
  id: 'mfti-b-2', archetype: 'program', title: 'Bagian B no. 2 – Angka 1 sampai 50 dan jumlahnya',
  source: { kind: 'mock' as const, lang: 'id' as const, src: FTI, label: 'Bagian B no. 2', pages: [6], official: false },
  parts: [{
    id: 'mfti-b-2a', kind: 'program', decks: ['D05'], topic: 'For loop', patterns: ['for-count', 'accumulate-sum'], misconceptions: ['off-by-one', 'init-in-loop'],
    stem: 'Buatlah kode pemrograman Python untuk menampilkan angka 1 hingga 50 dan juga menghitung hasil penjumlahan angka dari 1 hingga 50 (1+2+3+.....+49+50)!',
    reps: ['python', 'pseudo', 'flow'], match: 'lenient',
    solution: {
      python: r`# Program Jumlah_1_sampai_50
# Menampilkan 1..50 (satu per baris), lalu jumlahnya
# DECLARATIONS
# i, total : int
# ALGORITHM
total = 0
for i in range(1, 51):
    print(i)
    total = total + i
print(total)`,
    },
    tests: [{ name: 'no input', edge: 'no input' }],
    wrong: [
      { code: 'total = 0\nfor i in range(1, 50):\n    print(i)\n    total = total + i\nprint(total)', msg: '`range(1, 50)` berhenti di 49. Batas atas tidak ikut, gunakan `range(1, 51)`.', tag: 'off-by-one' },
      { code: 'for i in range(1, 51):\n    total = 0\n    print(i)\n    total = total + i\nprint(total)', msg: '`total = 0` ada di dalam loop sehingga di-reset tiap iterasi. Inisialisasi sebelum loop.', tag: 'init-in-loop' },
      { code: 'total = 0\nfor i in range(1, 51):\n    total = total + i\nprint(total)', msg: 'Soal meminta menampilkan angka 1 sampai 50 juga, bukan hanya jumlahnya.' },
    ],
    plan: 'total ← 0; untuk i dari 1 sampai 50: tampilkan i, total ← total + i; tampilkan total',
    skeleton: 'total = ___\nfor i in range(___, ___):\n    print(i)\n    total = ___\nprint(total)',
    hints: ['Batas atas `range` tidak ikut diproses.', 'Akumulator harus diinisialisasi sebelum loop.'],
    syntax: ['for-range', 'indentation'],
    lineNotes: [
      { line: [1, 5], note: 'Judul, spesifikasi, dan KAMUS (i, total).', syntax: 'program-template' },
      { line: 6, note: '`total = 0` sebelum loop: kalau di dalam loop, nilainya ter-reset tiap iterasi.' },
      { line: 7, note: '`range(1, 51)` menghasilkan 1..50. Batas atas tidak ikut, jadi 51.', syntax: 'for-range' },
      { line: [8, 9], note: 'Badan loop (menjorok): cetak i lalu tambahkan ke total.', syntax: 'indentation' },
      { line: 10, note: 'Tidak menjorok, dijalankan sekali setelah loop. Hasil yang benar: 1275.' },
    ],
    explanation: 'Gunakan `for i in range(1, 51)`; di dalamnya cetak `i` dan akumulasikan ke `total`; cetak `total` (1275) setelah loop.',
    refs: [{ src: FTI, page: 6 }], rubric: rubProg('menampilkan 1..50 dan menghitung jumlah 1275 dengan perulangan'),
  }],
}

const ftiB3: Problem = {
  id: 'mfti-b-3', archetype: 'trace', title: 'Bagian B no. 3 – Output rata-rata dari list',
  source: { kind: 'mock' as const, lang: 'id' as const, src: FTI, label: 'Bagian B no. 3', pages: [6], official: false },
  parts: [{
    id: 'mfti-b-3a', kind: 'trace', decks: ['D05', 'D06'], topic: 'Accumulation & average', patterns: ['accumulate-sum', 'average'], misconceptions: ['int-vs-float-div'],
    ask: 'output',
    stem: 'Tentukan output dari program Python berikut:',
    code: r`numbers = list(range(1, 11))
total = 0
count = 0
for n in numbers:
   total += n
   count += 1
b = total / count
print(b)`,
    lineNotes: [
      { line: 1, note: '`range(1, 11)` = 1..10 (11 tidak ikut); `list(...)` membuatnya menjadi list 10 elemen.' },
      { line: [2, 3], note: 'Dua akumulator diinisialisasi sebelum loop.' },
      { line: [4, 6], note: '`+=` adalah singkatan `total = total + n`. Setelah loop: total = 55, count = 10.' },
      { line: 7, note: 'Operator `/` selalu menghasilkan float di Python 3, jadi hasilnya `5.5`, bukan 5.' },
      { line: 8, note: 'Mencetak nilai float b.' },
    ],
    explanation: 'Jumlah 1..10 = 55, banyak = 10, rata-rata 55 / 10 = 5.5. Karena `/` menghasilkan float, keluarannya `5.5`.',
    refs: [{ src: FTI, page: 6 }],
  }],
}

const ftiB4: Problem = {
  id: 'mfti-b-4', archetype: 'trace', title: 'Bagian B no. 4 – Output dengan masukan 9',
  source: { kind: 'mock' as const, lang: 'id' as const, src: FTI, label: 'Bagian B no. 4', pages: [6], official: false },
  parts: [{
    id: 'mfti-b-4a', kind: 'trace', decks: ['D05'], topic: 'Tracing a while loop', patterns: ['while-counter'], misconceptions: ['off-by-one'],
    ask: 'table', watch: ['count', 'r', 'k'], stdin: ['9'],
    stem: 'Tentukan output dari program berikut apabila user memasukkan angka 9!',
    code: r`n = int(input("Enter the number: "))

r=0
k=1
count = 1

while count < n:
  a=r+k
  r=k
  k=a
  count += 1

print(k)`,
    lineNotes: [
      { line: 1, note: '`input("...")` menampilkan prompt (bukan bagian keluaran program yang dinilai) dan mengembalikan string; `int(...)` mengubahnya menjadi 9.' },
      { line: [3, 5], note: 'Nilai awal: r = 0, k = 1, count = 1. Pasangan (r, k) = dua suku Fibonacci berurutan.' },
      { line: 7, note: 'Loop berjalan selama count < n, yaitu count = 1..8, sehingga 8 iterasi (bukan 9).' },
      { line: [8, 10], note: 'Tiga baris ini menggeser pasangan: a = r + k adalah suku berikutnya, r mengambil k lama, k mengambil a. Urutan penugasan penting: `a` dihitung dulu sebelum r dan k ditimpa.' },
      { line: 11, note: 'count bertambah 1 per iterasi; kalau lupa, loop tak pernah berhenti.' },
      { line: 13, note: 'Setelah loop, k memegang suku Fibonacci ke-9.' },
    ],
    explanation: 'Deret k: 1, 1, 2, 3, 5, 8, 13, 21, 34 (suku ke-1 sampai ke-9). Loop berjalan 8 kali sehingga k akhir = 34. Program ini menghitung Fibonacci ke-n.',
    refs: [{ src: FTI, page: 6 }],
  }],
}

const ftiB5: Problem = {
  id: 'mfti-b-5', archetype: 'program', title: 'Bagian B no. 5 – Flowchart rata-rata tinggi badan',
  source: { kind: 'mock' as const, lang: 'id' as const, src: FTI, label: 'Bagian B no. 5', pages: [6, 7], official: false },
  intro: 'Kepala Sekolah sebuah SMA ingin mendapatkan rata-rata tinggi badan siswa di suatu kelas. Untuk itu, dia memanggil semua siswa di kelas itu dan mengumpulkannya di ruang UKS untuk diukur tinggi badannya satu per satu. Karena tidak tahu banyaknya siswa dalam kelas, Kepala Sekolah berniat menghitungnya sambil mengukur tinggi badan siswa. Tinggi badan siswa diukur dalam satuan cm dan dengan pengamatan sekilas, bisa diketahui bahwa tidak ada siswa yang tingginya kurang dari 100 cm atau lebih dari 200 cm.\n\nSeorang guru membantu Kepala Sekolah mengukur tinggi badan dan mencatatnya. Guru ini agak ceroboh sehingga sering memasukkan data yang salah. Data berat badan yang salah, yaitu kurang dari 100 cm atau lebih besar dari 200 cm, tidak digunakan untuk menghitung tinggi rata-rata.',
  parts: [{
    id: 'mfti-b-5a', kind: 'program', decks: ['D02', 'D05'], topic: 'Flowchart: sentinel + filter + average', patterns: ['while-sentinel', 'average', 'count-if', 'accumulate-sum'], misconceptions: ['sentinel-counted', 'init-in-loop'],
    stem: 'Buatlah flowchart yang membantu Kepala Sekolah sebagai panduan untuk menghitung tinggi rata-rata siswa di kelas, dimana diketahui input adalah sejumlah bilangan bulat yang mewakili tinggi mahasiswa. Pembacaan input diakhiri dengan memasukkan nilai -999 (tidak termasuk diproses). Selanjutnya hasil merupakan tinggi rata-rata siswa di kelas berdasarkan data yang diinputkan, tanpa memperhitungkan data yang salah input (yaitu jika nilai < 100 cm atau > 200 cm). Jika tidak ada data yang bisa digunakan untuk menghitung tinggi rata-rata, buat pesan "Tidak ada data".',
    reps: ['python', 'pseudo', 'flow'], required: 'flow', match: 'lenient',
    solution: {
      python: r`# Program Rata2_Tinggi_Siswa
# Membaca tinggi (cm) sampai -999; hanya data 100..200 yang dihitung.
# Mencetak rata-rata, atau "Tidak ada data" bila tidak ada data valid.
# DECLARATIONS
# tinggi, jumlah, banyak : int
# rata : float
# ALGORITHM
jumlah = 0
banyak = 0
tinggi = int(input())
while (tinggi != -999):
    if (tinggi >= 100 and tinggi <= 200):
        jumlah = jumlah + tinggi
        banyak = banyak + 1
    tinggi = int(input())
if (banyak == 0):
    print("Tidak ada data")
else:
    rata = jumlah / banyak
    print(rata)`,
      pseudo: r`Program Rata2_Tinggi_Siswa
{ Membaca tinggi sampai -999; hanya 100..200 dihitung }
KAMUS
  tinggi, jumlah, banyak : integer
  rata : real
ALGORITMA
  jumlah ← 0
  banyak ← 0
  input(tinggi)
  while (tinggi ≠ -999) do
    if (tinggi ≥ 100 and tinggi ≤ 200) then
      jumlah ← jumlah + tinggi
      banyak ← banyak + 1
    input(tinggi)
  if (banyak = 0) then
    output("Tidak ada data")
  else
    rata ← jumlah / banyak
    output(rata)`,
      flow: {
        title: 'Rata-rata tinggi siswa',
        blocks: [
          { t: 'process', text: 'jumlah ← 0' },
          { t: 'process', text: 'banyak ← 0' },
          { t: 'io', dir: 'in', text: 'input(tinggi)' },
          { t: 'while', cond: 'tinggi ≠ -999', body: [
            { t: 'if', cond: 'tinggi ≥ 100 and tinggi ≤ 200', then: [
              { t: 'process', text: 'jumlah ← jumlah + tinggi' },
              { t: 'process', text: 'banyak ← banyak + 1' },
            ] },
            { t: 'io', dir: 'in', text: 'input(tinggi)' },
          ] },
          { t: 'if', cond: 'banyak = 0', then: [{ t: 'io', dir: 'out', text: 'output("Tidak ada data")' }], else: [
            { t: 'process', text: 'rata ← jumlah / banyak' },
            { t: 'io', dir: 'out', text: 'output(rata)' },
          ] },
        ],
      },
    },
    tests: [
      { stdin: ['160', '170', '-999'] },
      { stdin: ['-999'], edge: 'no data at all' },
      { stdin: ['50', '250', '-999'], edge: 'all data invalid' },
      { stdin: ['100', '200', '99', '201', '-999'], edge: '100 and 200 valid; 99 and 201 not' },
      { stdin: ['170', '90', '180', '-999'], edge: 'data salah di tengah' },
    ],
    wrong: [
      { code: 'jumlah = 0\nbanyak = 0\ntinggi = int(input())\nwhile (tinggi != -999):\n    jumlah = jumlah + tinggi\n    banyak = banyak + 1\n    tinggi = int(input())\nif (banyak == 0):\n    print("Tidak ada data")\nelse:\n    print(jumlah / banyak)', msg: 'Data di luar 100..200 ikut dihitung. Tambahkan percabangan: hanya proses jika 100 ≤ tinggi ≤ 200.' },
      { code: 'jumlah = 0\nbanyak = 0\ntinggi = int(input())\nwhile (tinggi != -999):\n    if (tinggi > 100 and tinggi < 200):\n        jumlah = jumlah + tinggi\n        banyak = banyak + 1\n    tinggi = int(input())\nif (banyak == 0):\n    print("Tidak ada data")\nelse:\n    print(jumlah / banyak)', msg: 'Data salah adalah < 100 atau > 200, jadi 100 dan 200 sendiri valid. Gunakan ≥ dan ≤.' },
      { code: 'jumlah = 0\nbanyak = 0\ntinggi = int(input())\nwhile (tinggi != -999):\n    if (tinggi >= 100 and tinggi <= 200):\n        jumlah = jumlah + tinggi\n    banyak = banyak + 1\n    tinggi = int(input())\nif (banyak == 0):\n    print("Tidak ada data")\nelse:\n    print(jumlah / banyak)', msg: '`banyak` bertambah untuk data salah juga, sehingga pembagi terlalu besar. Naikkan banyak hanya untuk data valid.' },
      { code: 'jumlah = 0\nbanyak = 0\ntinggi = int(input())\nwhile (tinggi != -999):\n    if (tinggi >= 100 and tinggi <= 200):\n        jumlah = jumlah + tinggi\n        banyak = banyak + 1\n    tinggi = int(input())\nprint(jumlah / banyak)', msg: 'Jika tidak ada data valid, banyak = 0 dan terjadi pembagian dengan nol. Periksa banyak = 0 dan cetak "Tidak ada data".' },
    ],
    plan: 'jumlah ← 0, banyak ← 0; baca tinggi; selama tinggi ≠ -999: jika 100 ≤ tinggi ≤ 200 maka tambah jumlah dan banyak; baca tinggi berikutnya; setelah loop: jika banyak = 0 cetak "Tidak ada data", jika tidak cetak jumlah / banyak',
    skeleton: 'jumlah = 0\nbanyak = 0\ntinggi = int(input())\nwhile (tinggi != ___):\n    if (tinggi >= ___ and tinggi <= ___):\n        jumlah = ___\n        banyak = ___\n    tinggi = int(input())\nif (banyak == ___):\n    print("Tidak ada data")\nelse:\n    print(___)',
    hints: ['Pola apa yang dipakai: banyak data tidak diketahui, diakhiri nilai khusus. Pola sentinel: baca pertama, loop, baca berikutnya di akhir badan loop.', 'Ada dua penghitung: jumlah dan banyak data VALID. Keduanya hanya naik di dalam if rentang.', 'Setelah loop, cek dulu banyak = 0 sebelum membagi.'],
    syntax: ['sentinel', 'while', 'if-else', 'relational-logical'],
    lineNotes: [
      { line: [1, 7], note: 'Judul, spesifikasi, dan KAMUS. `rata : float` karena hasil pembagian.', syntax: 'program-template' },
      { line: [8, 9], note: 'Dua akumulator diinisialisasi sebelum loop (bukan di dalam).' },
      { line: 10, note: 'Pembacaan pertama sebelum loop: pola sentinel. Kalau pengguna langsung mengetik -999, loop tak pernah berjalan.', syntax: 'sentinel' },
      { line: 11, note: 'Kondisi `!= -999`: nilai sentinel tidak diproses.', syntax: 'while' },
      { line: 12, note: 'Filter data: valid jika 100 ≤ tinggi ≤ 200. Batas 100 dan 200 sendiri valid (yang salah hanya < 100 atau > 200). Pakai `and`, bukan `or`.', syntax: 'relational-logical' },
      { line: [13, 14], note: 'Hanya data valid yang dijumlahkan dan dihitung.' },
      { line: 15, note: 'Pembacaan berikutnya di akhir badan loop (sejajar dengan `if`, bukan di dalamnya); kalau lupa, loop tak berhenti.' },
      { line: [16, 17], note: 'Kasus tidak ada data valid: cek banyak = 0 sebelum membagi, agar tidak ZeroDivisionError.', syntax: 'if-else' },
      { line: [18, 20], note: '`/` menghasilkan float; rata-rata hanya dihitung bila banyak > 0.' },
    ],
    pseudoNotes: [
      { line: [1, 2], note: 'Judul dan spesifikasi dalam `{ komentar }`.' },
      { line: [3, 5], note: 'KAMUS: tipe tiap variabel; `real` untuk rata-rata.' },
      { line: [7, 9], note: 'Inisialisasi dan pembacaan pertama sebelum `while`.' },
      { line: 10, note: '`while (tinggi ≠ -999) do`: sentinel tidak ikut diproses.' },
      { line: [11, 13], note: 'Filter rentang valid; hanya data valid mengubah jumlah dan banyak.' },
      { line: 14, note: 'Pembacaan berikutnya, sejajar dengan `if` di dalam badan loop.' },
      { line: [15, 19], note: 'Cabang akhir: tidak ada data valid → pesan; selain itu rata-rata.' },
    ],
    explanation: 'Pola: baca-sentinel + hitung-jika (filter) + rata-rata dengan penjaga pembagian nol. Pada flowchart: terminator Mulai → inisialisasi jumlah, banyak → jajaran input tinggi → belah ketupat "tinggi ≠ -999?" (ya: belah ketupat "100 ≤ tinggi ≤ 200?" → ya: proses jumlah, banyak; lalu input tinggi lagi dan kembali ke atas; tidak: lanjut) → belah ketupat "banyak = 0?" → output "Tidak ada data" / hitung rata dan output → Selesai.',
    refs: [{ src: FTI, page: 6 }, { src: FTI, page: 7 }], rubric: [
      { score: 4, desc: 'Flowchart lengkap dan benar: inisialisasi, pembacaan sentinel, filter 100..200, penjumlahan dan penghitungan data valid, penanganan "Tidak ada data", dan rata-rata' },
      { score: 3.5, desc: 'Ada kesalahan kecil (mis. batas 100/200 terbalik, atau simbol keliru) yang menyebabkan solusi tidak sempurna' },
      { score: 3, desc: 'Logika utama benar tetapi satu bagian hilang (mis. kasus "Tidak ada data" atau filter)' },
      { score: 2, desc: 'Hanya sebagian alur benar (mis. hanya membaca dan menjumlahkan tanpa filter/sentinel)' },
      { score: 1, desc: 'Flowchart tidak tepat tetapi masih ada elemen yang benar (input/output)' },
      { score: 0, desc: 'Tidak mengerjakan atau jawaban sama sekali salah' },
    ],
  }],
}

const ftiB6: Problem = {
  id: 'mfti-b-6', archetype: 'concept', title: 'Bagian B no. 6 – Pentingnya berpikir komputasional',
  source: { kind: 'mock' as const, lang: 'id' as const, src: FTI, label: 'Bagian B no. 6', pages: [7], official: false },
  parts: [{
    id: 'mfti-b-6a', kind: 'open', decks: ['D01'], topic: 'Benefits of CT',
    stem: 'Jelaskan mengapa kemampuan berpikir komputasional merupakan skill yang penting utamanya di abad 21!',
    answer: 'Banyak jawaban valid. Contoh: Abad 21 ditandai dunia digital dan masalah yang kompleks serta berbasis data. Berpikir komputasional (dekomposisi, pengenalan pola, abstraksi, algoritma) melatih kita memecah masalah besar menjadi bagian kecil, mencari pola, memfokuskan pada hal penting, dan menyusun langkah solusi yang jelas. Kemampuan ini tidak terbatas pada programmer: berguna di semua bidang (sains, bisnis, kesehatan, seni), membantu bekerja sama dengan komputer/AI, mengambil keputusan berbasis data, dan menyelesaikan masalah baru secara sistematis.',
    rubric: rub('Menjelaskan alasan dengan jelas: (1) relevansi abad 21 (digital, kompleks, data) dan (2) kaitan dengan pilar CT (dekomposisi, pengenalan pola, abstraksi, algoritma) disertai contoh atau manfaat'),
    keyPoints: ['Menyebut konteks abad 21 (teknologi/digital, masalah kompleks, data besar)', 'Menyebut pilar CT dan fungsinya', 'Manfaat lintas bidang, bukan hanya pemrograman', 'Contoh konkret'],
    explanation: 'Jawaban esai bebas; nilai berdasarkan rubrik. Kaitkan ke slide D01: dekomposisi, pengenalan pola, abstraksi, algoritma.',
    refs: [{ src: FTI, page: 7 }],
  }],
}

const ftiProblems: Problem[] = [...ftiMcq, ftiB1, ftiB2, ftiB3, ftiB4, ftiB5, ftiB6]

/* =============================================================================
   2. Mock Gemini  (mgem-)
   ============================================================================= */

const GEM = 'Mock_Gemini'
const ga = (n: number, pages: number[], topic: string, stem: string, options: string[], ans: number, explanation: string, decks: DeckId[] = ['D11']) =>
  mcqProblem({ src: GEM, pre: 'mgem', n, label: `Bagian A no. ${n}`, pages, decks, topic, stem, options, ans, explanation })

const gemMcq: Problem[] = [
  ga(1, [1], 'Edutainment', 'Sebuah sekolah ingin menerapkan metode pembelajaran di mana siswa belajar melalui video game sejarah yang interaktif. Konsep ini dikenal sebagai...',
    ['*Digital Classroom*', '*Gamification / Edutainment*', '*Remote Learning*', '*Social Engineering*'], 1,
    'Slide D11 (h4): *Edutainment* menggabungkan pendidikan dengan hiburan. Belajar sejarah lewat game interaktif = edutainment/gamifikasi. *Remote learning* = belajar jarak jauh; *social engineering* adalah penipuan.'),
  ga(2, [1], 'Impact of automation on the workforce', 'Analisislah dampak otomatisasi industri berikut. Manakah pernyataan yang paling tepat menggambarkan pergeseran tren tenaga kerja akibat *Artificial Intelligence*?',
    ['Jumlah pekerjaan meningkat karena mesin membutuhkan lebih banyak operator manual.', 'Pekerjaan rutin dan repetitif berkurang, namun permintaan untuk *skill* analisis dan kreatif meningkat.', 'Semua pekerjaan manusia akan digantikan oleh robot dalam 5 tahun ke depan.', 'Industri akan kembali ke metode manual karena biaya AI terlalu mahal.'], 1,
    'Slide D11 (h5, h32, h34): otomasi mengambil alih tugas berulang (pengecatan, pengelasan, perakitan) namun membuka pekerjaan baru dan "membuka" kreativitas. C dan D ekstrem dan tidak didukung slide; A bertentangan dengan arah otomasi.'),
  ga(3, [1], 'Identity theft', 'Seseorang menggunakan foto dan data pribadi orang lain untuk membuat akun media sosial palsu dan melakukan penipuan. Tindakan kriminal ini dikategorikan sebagai...',
    ['*Cyberbullying*', '*Identity Theft* (Pencurian Identitas)', '*Digital Divide*', 'Plagiarisme'], 1,
    'Slide D11 (h17): *identity theft* termasuk memakai akun/data orang lain untuk menyebar fitnah atau ancaman; di sini data pribadi dipakai untuk penipuan. *Cyberbullying* adalah perundungan; *digital divide* adalah kesenjangan akses.'),
  ga(4, [1], 'Social media ethics', 'Menurut UU ITE dan etika siber, apa langkah pertama yang harus dilakukan jika Anda menemukan berita yang provokatif dan belum jelas kebenarannya di grup WhatsApp keluarga?',
    ['Langsung meneruskannya (*forward*) ke grup lain agar orang waspada.', 'Membiarkannya saja agar tidak terjadi konflik.', 'Melakukan verifikasi kebenaran (*fact-checking*) sebelum memutuskan untuk membagikan atau meluruskannya.', 'Menyimpannya sebagai arsip pribadi.'], 2,
    'Slide D11 (h29): *Think before you post*; UU ITE Pasal 28 melarang menyebar berita bohong dan menyesatkan. Langkah pertama yang tepat adalah memverifikasi, bukan meneruskan.'),
  ga(5, [2], 'Generative AI ethics', 'Dalam konteks *Generative AI* (seperti ChatGPT atau Midjourney), isu etika apa yang paling sering diperdebatkan terkait hak cipta?',
    ['AI tidak bisa bekerja tanpa listrik.', 'AI menggunakan data karya seniman/penulis asli sebagai data latih tanpa izin atau kompensasi.', 'Hasil karya AI selalu lebih jelek daripada manusia.', 'AI akan mengambil alih dunia militer.'], 1,
    'Slide D11 (h56): model generatif belajar dari pola data latihnya. Isu hak cipta muncul karena karya asli dipakai sebagai data latih tanpa izin/kompensasi. Opsi lain bukan isu hak cipta.'),
  ga(6, [2], 'Netiquette', 'Apa fungsi utama dari *Netiquette* dalam komunikasi digital?',
    ['Sebagai hukum formal yang mengikat secara pidana.', 'Sebagai panduan tata krama tidak tertulis untuk menjaga kenyamanan dan kesopanan di ruang digital.', 'Untuk meningkatkan kecepatan koneksi internet.', 'Untuk membatasi kebebasan berpendapat secara total.'], 1,
    'Slide D11 (h24, h26): norma dan etika hanyalah "pedoman" yang berkaitan dengan moral, berbeda dengan aturan/hukum yang punya sanksi. *Netiquette* termasuk norma/etika.'),
  ga(7, [2], 'Smart Grid', 'Teknologi *Smart Grid* dalam sistem tenaga listrik merupakan contoh penerapan komputasi untuk...',
    ['Mengganti semua kabel listrik dengan nirkabel.', 'Mengelola distribusi daya secara efisien dan otomatis berdasarkan data *real-time*.', 'Menurunkan tegangan listrik secara permanen.', 'Menghapus kebutuhan akan pembangkit listrik.'], 1,
    '*Smart grid* memakai sensor dan komputasi untuk memantau dan mengatur distribusi listrik secara otomatis dan efisien. Catatan: contoh ini tidak ada di slide D11 (2026); jawaban mengikuti definisi umum.'),
  ga(8, [2], 'Characteristics of CT', 'Manakah yang bukan merupakan karakteristik dari *Computational Thinking*?',
    ['Mampu memecah masalah besar menjadi bagian-bagian kecil.', 'Mampu berpikir seperti komputer (biner 0 dan 1) secara harfiah.', 'Mampu mengenali pola dari masalah yang pernah diselesaikan sebelumnya.', 'Mampu mengabstraksi detail yang tidak perlu.'], 1,
    'Slide D01: empat pilar CT = dekomposisi, pengenalan pola, abstraksi, algoritma. A = dekomposisi, C = pengenalan pola, D = abstraksi. Berpikir biner secara harfiah bukan karakteristik CT.', ['D01']),
  ga(9, [2], 'AI definitions', 'Dalam pendekatan AI, mesin yang dirancang untuk bertindak sebaik mungkin untuk mencapai tujuan tertentu (optimalisasi hasil) dikategorikan sebagai...',
    ['*Thinking Humanly*', '*Acting Humanly*', '*Thinking Rationally*', '*Acting Rationally*'], 3,
    'Slide D11 (h39): empat pendekatan AI. Agen yang bertindak untuk memperoleh hasil terbaik = *acting rationally* (*rational agent*).'),
  ga(10, [2], 'Impact of social media algorithms', 'Salah satu dampak negatif dari algoritma media sosial yang terlalu personal (*personalized feed*) adalah terciptanya *Echo Chamber*. Apa maksudnya?',
    ['Pengguna hanya terpapar pada informasi yang membenarkan opini mereka sendiri, sehingga menutup pandangan terhadap perspektif lain.', 'Pengguna mendengar suara gema saat memutar video.', 'Pengguna mendapatkan terlalu banyak iklan.', 'Pengguna kehilangan data pribadi mereka.'], 0,
    '*Echo chamber* = ruang gema: rekomendasi (lihat *recommender system*, D11 h47) hanya menampilkan konten yang selaras dengan opini pengguna. Istilah ini tidak disebut eksplisit di slide, tetapi definisinya jelas dari opsi A.'),
  ga(11, [3], 'Grooming', 'Praktik *Grooming* di internet biasanya menargetkan korban yang...',
    ['Memiliki keamanan siber yang kuat.', 'Berusia muda atau dalam kondisi rentan secara emosional.', 'Tidak memiliki akun media sosial.', 'Menggunakan perangkat lunak bajakan.'], 1,
    'Slide D11 (h11): *grooming* adalah upaya predator membangun hubungan dengan individu muda atau rentan lewat teknologi untuk eksploitasi.'),
  ga(12, [3], 'Computing in geophysics', 'Dalam bidang Geofisika, komputasi digunakan untuk memproses data *Remote Sensing*. Apa tujuannya?',
    ['Membuat peta manual dengan tangan.', 'Memantau perubahan lingkungan, cuaca, dan potensi bencana dari jarak jauh menggunakan data satelit/sensor.', 'Mengontrol pergerakan lempeng bumi.', 'Mengirim astronaut ke bulan.'], 1,
    '*Remote sensing* = pengindraan jauh dengan satelit/sensor untuk memantau lingkungan, cuaca, dan bencana. Catatan: contoh bidang ini tidak ada di slide D11 (2026), tetapi sejalan dengan "Computing Technology in Daily Lives".'),
  ga(13, [3], 'UU PDP', 'Undang-Undang No. 27 Tahun 2022 di Indonesia secara spesifik mengatur tentang...',
    ['Hak Cipta Digital.', 'Transaksi *E-Commerce*.', 'Pelindungan Data Pribadi (PDP).', 'Kejahatan Perbankan.'], 2,
    'Slide D11 (h21): *Law No. 27 of 2022 concerning Personal Data Protection*.'),
  ga(14, [3], 'Algorithmic bias', 'Apa yang dimaksud dengan *Algorithmic Bias* (Bias Algoritma)?',
    ['Algoritma yang berjalan sangat lambat.', 'Kesalahan sistematis dalam sistem komputer yang menciptakan hasil yang tidak adil bagi kelompok orang tertentu (misal: ras atau gender).', 'Algoritma yang hanya bisa memproses angka genap.', 'Bias tegangan pada rangkaian listrik komputer.'], 1,
    'Slide D11 (h58, *AI Dangers*): *Bias and Inaccuracies*, sistem AI dapat memperkuat bias bila data latihnya cacat atau bias.'),
  ga(15, [3], 'Internet of Things', 'Manakah contoh penerapan *Internet of Things* (IoT) di rumah tangga?',
    ['Menggunakan Excel untuk mencatat keuangan.', 'Kulkas pintar yang bisa mendeteksi stok makanan habis dan mengirim notifikasi ke HP pemiliknya.', 'Bermain game *offline* di PC.', 'Menonton TV melalui antena analog.'], 1,
    'IoT = perangkat fisik yang terhubung ke internet, mengindra lingkungan, dan berkomunikasi. Kulkas pintar yang mengirim notifikasi adalah contohnya. Catatan: IoT tidak dibahas rinci di slide D11 (2026).'),
]

const gemB1: Problem = {
  id: 'mgem-b-1', archetype: 'concept', title: 'Bagian B no. 1 – Lampu Lalu Lintas Cerdas',
  source: { kind: 'mock' as const, lang: 'id' as const, src: GEM, label: 'Bagian B no. 1', pages: [4], official: false },
  intro: 'Bayangkan Anda diminta merancang sistem "Lampu Lalu Lintas Cerdas" di sebuah persimpangan empat arah yang sering macet. Lampu tidak lagi sekadar menggunakan timer tetap (merah 60 detik, hijau 30 detik), tetapi harus adaptif.',
  parts: [
    {
      id: 'mgem-b-1a', kind: 'open', label: 'a', weight: 0.5, decks: ['D01'], topic: 'Decomposition',
      stem: 'Gunakan Dekomposisi untuk memecah masalah ini menjadi 3 sub-komponen utama.',
      answer: 'Banyak jawaban valid. Contoh: (1) Pengindraan/pengumpulan data: kamera atau sensor berat di tiap arah menghitung jumlah dan jenis kendaraan yang menunggu. (2) Pengambilan keputusan: algoritma yang menentukan arah mana mendapat hijau dan berapa lama berdasarkan data (mis. antrean terpanjang, prioritas ambulans, batas waktu maksimum supaya adil). (3) Pengendali lampu: mengubah lampu merah-kuning-hijau, termasuk jeda keselamatan antarfase dan mode cadangan bila sensor rusak.',
      rubric: rub('Memecah masalah menjadi tepat 3 sub-komponen yang jelas, saling terpisah, dan lengkap menyusun sistem (mis. sensor/data, logika keputusan, pengendali lampu)', 'Tiga sub-komponen ada, tetapi ada yang tumpang tindih atau kurang jelas', 'Hanya 1-2 sub-komponen yang tepat', 'Sub-komponen tidak tepat, tetapi masih ada ide yang benar'),
      keyPoints: ['Tiga sub-komponen yang jelas', 'Setiap komponen punya fungsi berbeda (tidak tumpang tindih)', 'Gabungan komponen menyelesaikan masalah utama'],
      explanation: 'Dekomposisi (slide D01 h19): membagi masalah besar menjadi sub-masalah kecil yang diselesaikan terpisah.',
    },
    {
      id: 'mgem-b-1b', kind: 'open', label: 'b', weight: 0.5, decks: ['D01'], topic: 'Abstraction',
      stem: 'Gunakan Abstraksi untuk menentukan data apa saja yang penting diambil oleh sensor (misal: kamera/sensor berat) dan data apa yang harus diabaikan agar sistem efisien.',
      answer: 'Penting: jumlah kendaraan (panjang antrean) di tiap arah, lama menunggu, ada tidaknya kendaraan prioritas (ambulans, pemadam), kondisi lampu saat ini dan waktu sejak terakhir hijau. Diabaikan: merek, warna, dan plat nomor kendaraan, wajah/identitas pengemudi, penumpang, latar belakang gambar, cuaca detail. Alasan: yang mempengaruhi keputusan hanya beban lalu lintas dan prioritas, sisanya menambah beban data tanpa mengubah keputusan (dan membahayakan privasi).',
      rubric: rub('Menyebut data yang penting beserta alasannya DAN data yang diabaikan beserta alasannya (efisiensi, relevansi keputusan)', 'Data penting dan diabaikan disebut, tetapi alasan kurang jelas atau ada satu yang keliru', 'Hanya menyebut data penting saja atau hanya yang diabaikan', 'Jawaban kurang tepat, tetapi ada satu data yang relevan'),
      keyPoints: ['Data penting terkait keputusan (jumlah kendaraan, waktu tunggu, prioritas)', 'Data tidak relevan diabaikan (merek, warna, plat)', 'Alasan abstraksi: efisiensi dan relevansi'],
      explanation: 'Abstraksi (slide D01 h20): menyingkirkan bagian tidak penting dari masalah, mempertahankan yang menentukan solusi.',
    },
  ],
}

const gemB2: Problem = {
  id: 'mgem-b-2', archetype: 'program', title: 'Bagian B no. 2 – Flowchart ATM Sederhana',
  source: { kind: 'mock' as const, lang: 'id' as const, src: GEM, label: 'Bagian B no. 2', pages: [4], official: false },
  intro: 'Buatlah Flowchart untuk sistem ATM Sederhana dengan logika sebagai berikut:\n\n(a) Pengguna memasukkan PIN. Jika salah, beri kesempatan ulang maksimal 3 kali total. Jika 3 kali salah, kartu diblokir dan selesai.\n(b) Jika PIN benar, tampilkan menu: (1) Cek Saldo, (2) Tarik Tunai, (3) Keluar.\n(c) Pada menu Tarik Tunai: Cek apakah saldo mencukupi? Jika ya, kurangi saldo dan keluarkan uang. Jika tidak, tampilkan "Saldo Tidak Cukup".',
  parts: [{
    id: 'mgem-b-2a', kind: 'program', decks: ['D02', 'D05'], topic: 'Flowchart: limited attempts + repeated menu', patterns: ['while-condition', 'game-rules', 'nested-if'], misconceptions: ['while-no-next', 'off-by-one'],
    stem: 'Gambarkan alur percabangan (*decision*) dan pengulangan (*looping*) dengan jelas. (Asumsi untuk pengujian: PIN yang benar adalah 1234 dan saldo awal 1.000.000; PIN, pilihan menu, dan jumlah tarikan dibaca dari input.)',
    reps: ['python', 'pseudo', 'flow'], required: 'flow', match: 'lenient',
    solution: {
      python: r`# Program ATM_Sederhana
# PIN benar = 1234, saldo awal = 1000000. PIN: maksimal 3 kali percobaan.
# Menu: 1 = Cek Saldo, 2 = Tarik Tunai, 3 = Keluar
# DECLARATIONS
# pin_benar, saldo, percobaan, pin, pilihan, jumlah : int
# benar : bool
# ALGORITHM
pin_benar = 1234
saldo = 1000000
percobaan = 0
benar = False
while (percobaan < 3 and benar == False):
    pin = int(input())
    if (pin == pin_benar):
        benar = True
    else:
        percobaan = percobaan + 1
if (benar == False):
    print("Kartu diblokir")
else:
    pilihan = 0
    while (pilihan != 3):
        pilihan = int(input())
        if (pilihan == 1):
            print(saldo)
        elif (pilihan == 2):
            jumlah = int(input())
            if (saldo >= jumlah):
                saldo = saldo - jumlah
                print("Silakan ambil uang Anda")
            else:
                print("Saldo Tidak Cukup")`,
      pseudo: r`Program ATM_Sederhana
{ PIN benar = 1234, saldo awal = 1000000, PIN maksimal 3 percobaan }
KAMUS
  pin_benar, saldo, percobaan, pin, pilihan, jumlah : integer
  benar : boolean
ALGORITMA
  pin_benar ← 1234
  saldo ← 1000000
  percobaan ← 0
  benar ← false
  while (percobaan < 3 and benar = false) do
    input(pin)
    if (pin = pin_benar) then
      benar ← true
    else
      percobaan ← percobaan + 1
  if (benar = false) then
    output("Kartu diblokir")
  else
    pilihan ← 0
    while (pilihan ≠ 3) do
      input(pilihan)
      if (pilihan = 1) then
        output(saldo)
      else if (pilihan = 2) then
        input(jumlah)
        if (saldo ≥ jumlah) then
          saldo ← saldo - jumlah
          output("Silakan ambil uang Anda")
        else
          output("Saldo Tidak Cukup")`,
      flow: {
        title: 'ATM sederhana',
        blocks: [
          { t: 'process', text: 'pin_benar ← 1234' },
          { t: 'process', text: 'saldo ← 1000000' },
          { t: 'process', text: 'percobaan ← 0' },
          { t: 'process', text: 'benar ← false' },
          { t: 'while', cond: 'percobaan < 3 and benar = false', body: [
            { t: 'io', dir: 'in', text: 'input(pin)' },
            { t: 'if', cond: 'pin = pin_benar', then: [{ t: 'process', text: 'benar ← true' }], else: [{ t: 'process', text: 'percobaan ← percobaan + 1' }] },
          ] },
          { t: 'if', cond: 'benar = false', then: [{ t: 'io', dir: 'out', text: 'output("Kartu diblokir")' }], else: [
            { t: 'process', text: 'pilihan ← 0' },
            { t: 'while', cond: 'pilihan ≠ 3', body: [
              { t: 'io', dir: 'in', text: 'input(pilihan)' },
              { t: 'if', cond: 'pilihan = 1', then: [{ t: 'io', dir: 'out', text: 'output(saldo)' }], else: [
                { t: 'if', cond: 'pilihan = 2', then: [
                  { t: 'io', dir: 'in', text: 'input(jumlah)' },
                  { t: 'if', cond: 'saldo ≥ jumlah', then: [
                    { t: 'process', text: 'saldo ← saldo - jumlah' },
                    { t: 'io', dir: 'out', text: 'output("Silakan ambil uang Anda")' },
                  ], else: [{ t: 'io', dir: 'out', text: 'output("Saldo Tidak Cukup")' }] },
                ] },
              ] },
            ] },
          ] },
        ],
      },
    },
    tests: [
      { stdin: ['1234', '1', '3'], edge: 'PIN benar pada percobaan pertama' },
      { stdin: ['1111', '2222', '3333'], edge: '3 kali salah: kartu diblokir' },
      { stdin: ['1111', '2222', '1234', '3'], edge: 'benar tepat pada percobaan ke-3' },
      { stdin: ['1234', '2', '200000', '1', '3'], edge: 'tarik tunai lalu cek saldo' },
      { stdin: ['1234', '2', '2000000', '3'], edge: 'insufficient balance' },
      { stdin: ['1234', '2', '1000000', '1', '3'], edge: 'withdraw exactly the whole balance (balance = amount)' },
    ],
    wrong: [
      { code: 'pin_benar = 1234\nsaldo = 1000000\npercobaan = 0\nbenar = False\nwhile (percobaan <= 3 and benar == False):\n    pin = int(input())\n    if (pin == pin_benar):\n        benar = True\n    else:\n        percobaan = percobaan + 1\nif (benar == False):\n    print("Kartu diblokir")\nelse:\n    pilihan = 0\n    while (pilihan != 3):\n        pilihan = int(input())\n        if (pilihan == 1):\n            print(saldo)\n        elif (pilihan == 2):\n            jumlah = int(input())\n            if (saldo >= jumlah):\n                saldo = saldo - jumlah\n                print("Silakan ambil uang Anda")\n            else:\n                print("Saldo Tidak Cukup")', msg: '`percobaan <= 3` memberi 4 kesempatan. Maksimal 3 kali total: gunakan `percobaan < 3`.', tag: 'off-by-one' },
      { code: 'pin_benar = 1234\nsaldo = 1000000\npercobaan = 0\nbenar = False\nwhile (percobaan < 3 and benar == False):\n    pin = int(input())\n    if (pin == pin_benar):\n        benar = True\n    else:\n        percobaan = percobaan + 1\nif (benar == False):\n    print("Kartu diblokir")\nelse:\n    pilihan = 0\n    while (pilihan != 3):\n        pilihan = int(input())\n        if (pilihan == 1):\n            print(saldo)\n        elif (pilihan == 2):\n            jumlah = int(input())\n            if (saldo >= jumlah):\n                print("Silakan ambil uang Anda")\n            else:\n                print("Saldo Tidak Cukup")', msg: 'Saldo tidak dikurangi setelah tarik tunai. Tambahkan `saldo = saldo - jumlah`.' },
      { code: 'pin_benar = 1234\nsaldo = 1000000\npercobaan = 0\nbenar = False\nwhile (percobaan < 3 and benar == False):\n    pin = int(input())\n    if (pin == pin_benar):\n        benar = True\n    else:\n        percobaan = percobaan + 1\nif (benar == False):\n    print("Kartu diblokir")\nelse:\n    pilihan = 0\n    while (pilihan != 3):\n        pilihan = int(input())\n        if (pilihan == 1):\n            print(saldo)\n        elif (pilihan == 2):\n            jumlah = int(input())\n            if (saldo > jumlah):\n                saldo = saldo - jumlah\n                print("Silakan ambil uang Anda")\n            else:\n                print("Saldo Tidak Cukup")', msg: '"Saldo mencukupi" berarti saldo ≥ jumlah; dengan `>` penarikan tepat sebesar saldo ditolak.' },
    ],
    plan: 'percobaan ← 0, benar ← false; ulangi selama percobaan < 3 dan belum benar: baca PIN, jika cocok benar ← true, jika tidak percobaan + 1; jika tidak benar: "Kartu diblokir"; jika benar: ulangi sampai pilihan = 3: baca pilihan; 1 → tampilkan saldo; 2 → baca jumlah, jika saldo ≥ jumlah kurangi dan keluarkan uang, jika tidak "Saldo Tidak Cukup"',
    hints: ['Ada dua loop terpisah: loop PIN (maksimal 3 kali) dan loop menu (sampai pilih 3).', 'Loop PIN berhenti oleh dua sebab: PIN benar atau percobaan sudah 3. Gunakan flag `benar`.', 'Setelah loop PIN, cek flag untuk memutuskan blokir atau menu.'],
    syntax: ['while', 'if-elif', 'relational-logical'],
    lineNotes: [
      { line: [1, 7], note: 'Spesifikasi dan KAMUS. PIN benar dan saldo awal dibuat tetap hanya agar program dapat diuji.', syntax: 'program-template' },
      { line: [8, 11], note: 'Inisialisasi sebelum loop: penghitung percobaan = 0 dan flag `benar = False`.' },
      { line: 12, note: 'Loop berhenti jika sudah 3 kali salah atau PIN sudah benar. `percobaan < 3` menghasilkan tepat 3 kesempatan (0, 1, 2).', syntax: 'while' },
      { line: [13, 17], note: 'Baca PIN. Cocok → set flag; tidak cocok → percobaan naik. `percobaan` naik hanya di cabang salah.' },
      { line: [18, 19], note: 'Setelah loop PIN: flag salah berarti 3 kali gagal, kartu diblokir dan program selesai.' },
      { line: [21, 22], note: '`pilihan = 0` memberi nilai awal agar loop menu bisa dimasukkan; menu berulang sampai pengguna memilih 3 (Keluar).', syntax: 'while' },
      { line: [23, 25], note: 'Menu 1 hanya menampilkan saldo; tidak mengubahnya.', syntax: 'if-elif' },
      { line: [26, 28], note: 'Menu 2: baca jumlah, lalu periksa kecukupan dengan `>=` supaya menarik tepat seluruh saldo diperbolehkan.' },
      { line: [29, 32], note: 'Cukup → saldo dikurangi dan uang dikeluarkan; tidak cukup → pesan. Pilihan 3 tidak diproses apa pun: loop berhenti di pengecekan berikutnya.' },
    ],
    pseudoNotes: [
      { line: [1, 5], note: 'Judul, spesifikasi, KAMUS (nilai boolean untuk flag `benar`).' },
      { line: [7, 10], note: 'Inisialisasi sebelum loop PIN.' },
      { line: [11, 16], note: 'Loop PIN: berhenti jika benar atau 3 kali gagal.' },
      { line: [17, 18], note: 'Tiga kali salah: blokir.' },
      { line: [20, 31], note: 'Loop menu dengan percabangan tersarang; penarikan memeriksa saldo ≥ jumlah.' },
    ],
    explanation: 'Dua loop berurutan: (1) loop PIN dengan syarat ganda (percobaan < 3 dan belum benar), lalu percabangan blokir/menu; (2) loop menu sampai Keluar, dengan percabangan 1/2 dan keputusan "saldo cukup?" di dalam pilihan 2. Gambarkan belah ketupat untuk tiap `if` dan panah balik untuk tiap loop. Catatan: flowchart bergaya bebas; yang dinilai alur logisnya.',
    refs: [{ src: GEM, page: 4 }],
    rubric: [
      { score: 4, desc: 'Flowchart benar dan lengkap: loop PIN maksimal 3 kali, blokir, menu berulang, cek saldo, tarik tunai dengan cek kecukupan' },
      { score: 3.5, desc: 'Ada kesalahan kecil (mis. jumlah kesempatan tepat 3 keliru atau saldo tidak dikurangi) yang menyebabkan solusi tidak sempurna' },
      { score: 3, desc: 'Alur utama benar tetapi satu bagian hilang (mis. menu tidak berulang atau tidak ada pilihan Keluar)' },
      { score: 2, desc: 'Hanya sebagian alur benar (mis. PIN tanpa batas percobaan atau tidak ada menu)' },
      { score: 1, desc: 'Flowchart tidak tepat, tetapi masih ada elemen yang benar' },
      { score: 0, desc: 'Tidak mengerjakan atau jawaban sama sekali salah' },
    ],
  }],
}

const gemB3: Problem = {
  id: 'mgem-b-3', archetype: 'trace', title: 'Bagian B no. 3 – Debugging rata-rata nilai',
  source: { kind: 'mock' as const, lang: 'id' as const, src: GEM, label: 'Bagian B no. 3', pages: [4], official: false },
  parts: [{
    id: 'mgem-b-3a', kind: 'bug', decks: ['D04', 'D05'], topic: 'Debugging: input data type', patterns: ['type-conversion', 'average'], misconceptions: ['input-is-str', 'str-concat'],
    stem: 'Perhatikan potongan kode Python berikut yang bertujuan menghitung rata-rata dari sekumpulan nilai yang diinput pengguna. Kode ini memiliki dua kesalahan logika/runtime (bukan sekadar *syntax error*). Temukan kesalahannya, jelaskan penyebabnya, dan tuliskan perbaikannya!',
    code: r`jumlah_data = input (" Masukkan jumlah data: ")
total = 0

for i in range ( jumlah_data ):
    nilai = input (" Masukkan nilai ke -" + str(i+1) + ": ")
    total = total + nilai

rata_rata = total / jumlah_data
print ("Rata -rata adalah : " + rata_rata )`,
    badLines: [1, 5, 9],
    fixed: r`jumlah_data = int(input("Masukkan jumlah data: "))
total = 0

for i in range(jumlah_data):
    nilai = float(input("Masukkan nilai ke-" + str(i+1) + ": "))
    total = total + nilai

rata_rata = total / jumlah_data
print("Rata-rata adalah : " + str(rata_rata))`,
    lineNotes: [
      { line: 1, note: 'Kesalahan 1 (akar): `input()` selalu mengembalikan string, jadi `jumlah_data` bertipe str. Perbaikan: `int(input(...))`.', syntax: 'type-conversion' },
      { line: 2, note: 'Akumulator diinisialisasi sebelum loop: sudah benar.' },
      { line: 4, note: '`range(jumlah_data)` dengan string menghasilkan TypeError (`str` tidak bisa menjadi bilangan bulat); akibat langsung dari baris 1. Setelah baris 1 diperbaiki, baris ini benar (0 sampai jumlah_data−1 = jumlah_data kali).' },
      { line: 5, note: 'Kesalahan 1 (lagi): `nilai` juga string. Gunakan `float(input(...))` (atau `int` bila nilai bulat). `str(i+1)` pada prompt sudah benar karena i bertipe int.', syntax: 'type-conversion' },
      { line: 6, note: 'Gejala: `total + nilai` menggabungkan int dengan string, TypeError. Akan benar setelah baris 5 diperbaiki.' },
      { line: 8, note: '`/` menghasilkan float. Bila jumlah_data = 0, terjadi ZeroDivisionError; untuk program ujian cukup disebut sebagai catatan tambahan.' },
      { line: 9, note: 'Kesalahan 2: `+` antara string dan float menghasilkan TypeError. Bungkus dengan `str(rata_rata)`.', syntax: 'print-str' },
    ],
    explanation: 'Dua jenis kesalahan: (1) data dari `input()` tidak dikonversi ke angka: baris 1 (`int`) dan baris 5 (`float`), akibatnya `range()` dan `total + nilai` TypeError; (2) baris 9 menggabungkan string dengan angka tanpa `str()`. Opsional: tangani `jumlah_data = 0` agar tidak ada pembagian nol.',
    refs: [{ src: GEM, page: 4 }],
  }],
}

const gemB4: Problem = {
  id: 'mgem-b-4', archetype: 'program', title: 'Bagian B no. 4 – Biaya Parkir Progresif',
  source: { kind: 'mock' as const, lang: 'id' as const, src: GEM, label: 'Bagian B no. 4', pages: [4], official: false },
  intro: 'Buatlah program Python untuk menghitung Biaya Parkir Progresif di sebuah mall dengan aturan:\n\n- Biaya 1 jam pertama: Rp 5.000.\n- Biaya jam berikutnya (jam ke-2 s.d jam ke-5): Rp 3.000 per jam.\n- Biaya jam ke-6 dan seterusnya: Rp 2.000 per jam.\n- Jika total parkir lebih dari 12 jam, dikenakan denda tambahan Rp 50.000.\n- Maksimal biaya parkir per hari (sebelum denda) adalah Rp 100.000.',
  parts: [{
    id: 'mgem-b-4a', kind: 'program', decks: ['D05'], topic: 'Multi-level branching + loops', patterns: ['if-elif', 'for-count', 'accumulate-sum'], misconceptions: ['off-by-one', 'index-range'],
    stem: 'Input: Durasi parkir (integer jam). Output: Total biaya.',
    reps: ['python', 'pseudo', 'flow'], match: 'numbers',
    solution: {
      python: r`# Program Biaya_Parkir
# Menghitung biaya parkir progresif. Asumsi: durasi >= 1 jam.
# Jam 1: 5000; jam 2-5: 3000/jam; jam >= 6: 2000/jam.
# Maksimal 100000 (sebelum denda); denda 50000 jika durasi > 12 jam.
# DECLARATIONS
# jam, i, biaya : int
# ALGORITHM
jam = int(input())
biaya = 5000
for i in range(2, jam+1):
    if (i <= 5):
        biaya = biaya + 3000
    else:
        biaya = biaya + 2000
if (biaya > 100000):
    biaya = 100000
if (jam > 12):
    biaya = biaya + 50000
print(biaya)`,
    },
    tests: [
      { stdin: ['1'], edge: '1 hour: only the first-hour fee' },
      { stdin: ['5'], edge: 'batas jam ke-5 (tarif 3000)' },
      { stdin: ['6'], edge: 'jam ke-6 mulai tarif 2000' },
      { stdin: ['12'], edge: 'tepat 12 jam: belum kena denda' },
      { stdin: ['13'], edge: '13 jam: denda' },
      { stdin: ['47'], edge: 'exceeds the 100.000 cap and incurs a fine: the cap is applied before the fine' },
    ],
    wrong: [
      { code: 'jam = int(input())\nbiaya = 5000\nfor i in range(2, jam+1):\n    if (i <= 5):\n        biaya = biaya + 3000\n    else:\n        biaya = biaya + 2000\nif (jam > 12):\n    biaya = biaya + 50000\nprint(biaya)', msg: 'Batas maksimal Rp 100.000 belum diterapkan.' },
      { code: 'jam = int(input())\nbiaya = 5000\nfor i in range(2, jam+1):\n    if (i <= 5):\n        biaya = biaya + 3000\n    else:\n        biaya = biaya + 2000\nif (jam >= 12):\n    biaya = biaya + 50000\nif (biaya > 100000):\n    biaya = 100000\nprint(biaya)', msg: 'Denda hanya untuk "lebih dari 12 jam" (> 12), bukan ≥ 12; dan batas 100.000 berlaku SEBELUM denda, bukan sesudahnya.', tag: 'off-by-one' },
      { code: 'jam = int(input())\nbiaya = 5000\nfor i in range(2, jam):\n    if (i <= 5):\n        biaya = biaya + 3000\n    else:\n        biaya = biaya + 2000\nif (biaya > 100000):\n    biaya = 100000\nif (jam > 12):\n    biaya = biaya + 50000\nprint(biaya)', msg: '`range(2, jam)` melewatkan jam terakhir. Batas atas tidak ikut: gunakan `range(2, jam+1)`.', tag: 'off-by-one' },
    ],
    plan: 'biaya ← 5000; untuk jam ke-2 sampai jam ke-durasi: jika jam ≤ 5 tambah 3000, jika tidak tambah 2000; biaya ← min(biaya, 100000); jika durasi > 12 tambah 50000; tampilkan biaya',
    skeleton: 'jam = int(input())\nbiaya = ___\nfor i in range(___, ___):\n    if (i <= ___):\n        biaya = biaya + ___\n    else:\n        biaya = biaya + ___\nif (biaya > ___):\n    biaya = ___\nif (jam > ___):\n    biaya = biaya + ___\nprint(biaya)',
    hints: ['Jam pertama berbeda dari jam lain; mulailah dari biaya jam pertama lalu proses jam ke-2 dan seterusnya.', 'Urutan penting: batasi 100.000 dulu, baru tambahkan denda.'],
    syntax: ['for-range', 'if-else', 'relational-logical'],
    lineNotes: [
      { line: [1, 6], note: 'Spesifikasi, asumsi (durasi ≥ 1), dan KAMUS.', syntax: 'program-template' },
      { line: 8, note: '`int(input())` karena durasi adalah bilangan bulat.', syntax: 'input' },
      { line: 9, note: 'Biaya jam pertama langsung masuk di inisialisasi (sebelum loop).' },
      { line: 10, note: '`range(2, jam+1)` memproses jam ke-2 hingga jam ke-`jam`; batas atas tidak ikut sehingga +1. Untuk jam = 1 loop tidak berjalan.', syntax: 'for-range' },
      { line: [11, 14], note: 'Tarif tergantung nomor jam: jam 2-5 → 3000; jam ≥ 6 → 2000.', syntax: 'if-else' },
      { line: [15, 16], note: 'Batas maksimal 100.000 diterapkan SEBELUM denda (soal: "sebelum denda").' },
      { line: [17, 18], note: 'Denda hanya jika lebih dari 12 jam: `> 12`, bukan `>= 12`. Denda ditambahkan setelah batas, sehingga biaya bisa 150.000.' },
      { line: 19, note: 'Satu `print` akhir dengan angka saja; tidak perlu `str()`.' },
    ],
    explanation: 'Hitung bertahap per jam, terapkan batas 100.000, lalu denda. Contoh: 13 jam = 5.000 (jam 1) + 4 × 3.000 (jam 2-5) + 8 × 2.000 (jam 6-13) = 33.000; karena > 12 jam, ditambah denda 50.000 = 83.000. Untuk 47 jam: 101.000 → dibatasi 100.000 → +50.000 = 150.000. Catatan: soal tidak menyebut durasi 0; diasumsikan ≥ 1.',
    refs: [{ src: GEM, page: 4 }], rubric: rubProg('menghitung tarif bertingkat, batas maksimal, dan denda dengan urutan yang benar'),
  }],
}

const gemB5: Problem = {
  id: 'mgem-b-5', archetype: 'program', title: 'Bagian B no. 5 – Pola Jam Pasir (Hourglass)',
  source: { kind: 'mock' as const, lang: 'id' as const, src: GEM, label: 'Bagian B no. 5', pages: [4, 5], official: false },
  intro: 'Buatlah program Python yang menerima input bilangan ganjil N (misal N = 5). Program harus mencetak pola Jam Pasir (*Hourglass*) menggunakan karakter bintang \'*\'.\n\nContoh jika Input N = 5:\n\n```\n*****\n ***\n  *\n ***\n*****\n```',
  parts: [{
    id: 'mgem-b-5a', kind: 'program', decks: ['D05'], topic: 'Nested loop: patterns', patterns: ['nested-loop', 'string-processing'], misconceptions: ['off-by-one', 'index-range'],
    stem: 'Gunakan nested loop (for di dalam for).',
    reps: ['python', 'pseudo', 'flow'], match: 'exact',
    solution: {
      python: r`# Program Jam_Pasir
# Mencetak pola jam pasir untuk N ganjil.
# DECLARATIONS
# N, mid, i, j, sp : int
# baris : str
# ALGORITHM
N = int(input())
mid = N // 2
for i in range(N):
    if (i <= mid):
        sp = i
    else:
        sp = N - 1 - i
    baris = ""
    for j in range(sp):
        baris = baris + " "
    for j in range(N - 2 * sp):
        baris = baris + "*"
    print(baris)`,
    },
    tests: [{ stdin: ['5'] }, { stdin: ['1'], edge: 'N = 1: satu bintang' }, { stdin: ['3'] }, { stdin: ['7'] }],
    wrong: [
      { code: 'N = int(input())\nfor i in range(N):\n    baris = ""\n    for j in range(N - 2 * i):\n        baris = baris + "*"\n    print(baris)', msg: 'Pola belum simetris dan tanpa spasi di depan; N - 2*i juga bisa negatif. Pada paruh bawah, jumlah spasi berkurang lagi (sp = N - 1 - i).' },
      { code: 'N = int(input())\nmid = N // 2\nfor i in range(N):\n    if (i <= mid):\n        sp = i\n    else:\n        sp = N - 1 - i\n    baris = ""\n    for j in range(N - 2 * sp):\n        baris = baris + "*"\n    print(baris)', msg: 'Bintang sudah benar tetapi belum ada spasi di depan, sehingga pola rata kiri. Tambahkan loop spasi sebanyak sp sebelum bintang.' },
    ],
    plan: 'untuk tiap baris i dari 0 sampai N−1: spasi di depan sp = i (paruh atas, sampai tengah) atau N−1−i (paruh bawah); bintang sebanyak N − 2·sp; cetak baris',
    hints: ['Gambar pola untuk N = 5 dan tulis jumlah spasi dan bintang tiap baris: spasi 0,1,2,1,0 dan bintang 5,3,1,3,5.', 'Spasi naik sampai baris tengah lalu turun; bintang = N − 2 × spasi.'],
    syntax: ['for-range', 'if-else'],
    lineNotes: [
      { line: [1, 6], note: 'Spesifikasi dan KAMUS; `baris` adalah string yang dirangkai.', syntax: 'program-template' },
      { line: 7, note: '`int(input())`; N dijamin ganjil.', syntax: 'input' },
      { line: 8, note: '`N // 2` (pembagian bulat) = indeks baris tengah. Untuk N = 5 hasilnya 2.' },
      { line: 9, note: 'Loop luar: satu iterasi per baris, i = 0..N−1.', syntax: 'for-range' },
      { line: [10, 13], note: 'Jumlah spasi `sp`: naik 0,1,2 sampai baris tengah, lalu turun 1,0 (N−1−i). Pola ini membuat hasilnya simetris.' },
      { line: 14, note: 'Baris dikosongkan di setiap iterasi luar; kalau diinisialisasi di luar loop, baris akan menumpuk.' },
      { line: [15, 16], note: 'Loop dalam pertama: `sp` spasi di depan.' },
      { line: [17, 18], note: 'Loop dalam kedua: jumlah bintang N − 2·sp (5, 3, 1, 3, 5). Menggunakan `j` lagi aman karena loop sebelumnya sudah selesai.' },
      { line: 19, note: 'Cetak satu baris utuh. Spasi di depan penting; di ujian tulis jangan lupa menggeser bintang.' },
    ],
    explanation: 'Gunakan loop luar per baris dan dua loop dalam (spasi lalu bintang). Spasi: 0,1,2,1,0; bintang: 5,3,1,3,5 untuk N = 5. Rumus: sp = min(i, N−1−i), bintang = N − 2·sp.',
    refs: [{ src: GEM, page: 4 }, { src: GEM, page: 5 }], rubric: rubProg('mencetak pola jam pasir simetris dengan nested loop'),
  }],
}

const gemB6: Problem = {
  id: 'mgem-b-6', archetype: 'program', title: 'Bagian B no. 6 – AnalisisBelanja (termahal dan termahal kedua)',
  source: { kind: 'mock' as const, lang: 'id' as const, src: GEM, label: 'Bagian B no. 6', pages: [5], official: false },
  intro: 'Anda memiliki sebuah array yang berisi daftar harga barang di keranjang belanja:\n`harga = [15000, 50000, 2500, 50000, 30000, 15000, 10000]`\nBuatlah sebuah fungsi bernama `AnalisisBelanja(arr)` yang mengembalikan dua informasi:\n\n(a) Harga barang termahal (jika ada kembar, ambil salah satu).\n(b) Barang termahal kedua (*Second Largest*). Hati-hati jika angka termahal muncul dua kali, barang termahal kedua haruslah angka yang lebih kecil dari barang termahal utama.',
  parts: [{
    id: 'mgem-b-6a', kind: 'program', decks: ['D06', 'D10'], topic: 'Function + array: two largest values', patterns: ['max-min', 'function-def-call', 'array-populate'], misconceptions: ['max-init-zero', 'return-vs-print', 'not-complete'],
    stem: 'Dilarang menggunakan fungsi built-in seperti `sort()`, `max()`, atau `set()`. Gunakan algoritma iterasi manual. (Untuk pengujian, program membaca N lalu N harga dari input, memanggil fungsi, lalu mencetak termahal dan termahal kedua; jika tidak ada angka yang lebih kecil dari termahal, kedua = -1.)',
    reps: ['python', 'pseudo'], match: 'numbers', mustUse: ['function', 'array'],
    solution: {
      python: r`# Program Analisis_Belanja
# Membaca N harga, lalu mencetak harga termahal dan termahal kedua (lebih kecil dari termahal).
# DECLARATIONS
# N, i, terbesar, kedua : int
# harga : array [0..N-1] of int

def AnalisisBelanja(arr):
    # Mengembalikan (termahal, termahal kedua yang lebih kecil dari termahal); kedua = -1 bila tidak ada
    # LOCAL DECLARATIONS
    # i, t1, t2 : int
    # ALGORITHM
    t1 = arr[0]
    t2 = -1
    for i in range(1, len(arr)):
        if (arr[i] > t1):
            t2 = t1
            t1 = arr[i]
        elif (arr[i] < t1 and arr[i] > t2):
            t2 = arr[i]
    return t1, t2

# ALGORITHM
N = int(input())
harga = [0 for i in range(N)]
for i in range(N):
    harga[i] = int(input())
terbesar, kedua = AnalisisBelanja(harga)
print(terbesar)
print(kedua)`,
    },
    tests: [
      { stdin: ['7', '15000', '50000', '2500', '50000', '30000', '15000', '10000'], edge: 'data soal: termahal kembar (50000)' },
      { stdin: ['1', '5'], edge: 'N = 1: there is no second value' },
      { stdin: ['3', '3', '3', '3'], edge: 'all equal' },
      { stdin: ['3', '1', '2', '3'], edge: 'menaik: termahal baru terus muncul' },
      { stdin: ['3', '9', '5', '1'], edge: 'menurun' },
      { stdin: ['3', '9', '9', '5'], edge: 'termahal kembar di awal' },
    ],
    wrong: [
      { code: 'def AnalisisBelanja(arr):\n    t1 = arr[0]\n    t2 = -1\n    for i in range(1, len(arr)):\n        if (arr[i] > t1):\n            t2 = t1\n            t1 = arr[i]\n        elif (arr[i] > t2):\n            t2 = arr[i]\n    return t1, t2\nN = int(input())\nharga = [0 for i in range(N)]\nfor i in range(N):\n    harga[i] = int(input())\na, b = AnalisisBelanja(harga)\nprint(a)\nprint(b)', msg: 'Tanpa syarat `arr[i] < t1`, nilai kembar dari termahal ikut menjadi "kedua". Kedua harus lebih kecil dari termahal.', tag: 'not-disjoint' },
      { code: 'def AnalisisBelanja(arr):\n    t1 = arr[0]\n    t2 = -1\n    for i in range(1, len(arr)):\n        if (arr[i] > t1):\n            t1 = arr[i]\n        elif (arr[i] < t1 and arr[i] > t2):\n            t2 = arr[i]\n    return t1, t2\nN = int(input())\nharga = [0 for i in range(N)]\nfor i in range(N):\n    harga[i] = int(input())\na, b = AnalisisBelanja(harga)\nprint(a)\nprint(b)', msg: 'Saat menemukan termahal baru, termahal lama harus diturunkan menjadi kedua (`t2 = t1`) sebelum t1 diganti.' },
      { code: 'def AnalisisBelanja(arr):\n    t1 = 0\n    t2 = 0\n    for i in range(len(arr)):\n        if (arr[i] > t1):\n            t2 = t1\n            t1 = arr[i]\n        elif (arr[i] < t1 and arr[i] > t2):\n            t2 = arr[i]\n    return t1, t2\nN = int(input())\nharga = [0 for i in range(N)]\nfor i in range(N):\n    harga[i] = int(input())\na, b = AnalisisBelanja(harga)\nprint(a)\nprint(b)', msg: 'Inisialisasi t2 = 0 membuat "tidak ada kedua" terbaca sebagai 0; gunakan penanda -1 yang tidak mungkin menjadi harga.' },
    ],
    plan: 'fungsi: t1 ← arr[0], t2 ← -1; untuk i dari 1 sampai akhir: jika arr[i] > t1 maka t2 ← t1, t1 ← arr[i]; jika tidak, jika arr[i] < t1 dan arr[i] > t2 maka t2 ← arr[i]; kembalikan t1, t2',
    hints: ['Simpan dua variabel: yang terbesar dan yang terbesar kedua, dalam satu kali lintas array.', 'Saat ketemu nilai lebih besar dari t1, t1 lama menjadi calon kedua.', 'Nilai yang SAMA dengan t1 tidak boleh menjadi t2: gunakan `<` bukan `<=`.'],
    syntax: ['def-function', 'return', 'list-index', 'for-range', 'if-elif'],
    lineNotes: [
      { line: [1, 4], note: 'Spesifikasi dan KAMUS program utama.', syntax: 'program-template' },
      { line: 7, note: 'Definisi fungsi dengan parameter `arr`; fungsi mengembalikan nilai (bukan `print`) sesuai soal "mengembalikan dua informasi".', syntax: 'def-function' },
      { line: [8, 11], note: 'Spesifikasi fungsi dan deklarasi lokal. Variabel di dalam fungsi hanya dikenal di dalam fungsi.' },
      { line: 12, note: '`t1 = arr[0]`, bukan 0: aman walau semua harga kecil/negatif (pola max-min).' },
      { line: 13, note: '`t2 = -1` sebagai penanda "belum ada yang kedua"; harga barang tidak mungkin negatif.' },
      { line: 14, note: '`range(1, len(arr))` mulai dari indeks 1 karena indeks 0 sudah jadi nilai awal; `len(arr)` aman dipakai karena bukan fungsi yang dilarang.', syntax: 'for-range' },
      { line: [15, 17], note: 'Termahal baru: yang lama turun jadi kedua (`t2 = t1`) SEBELUM `t1` diganti; urutannya penting.' },
      { line: [18, 19], note: 'Kedua harus lebih kecil dari termahal (`arr[i] < t1`) tetapi lebih besar dari kedua sementara. Kembaran termahal (50000 lagi) tidak lolos syarat pertama.', syntax: 'if-elif' },
      { line: 20, note: '`return t1, t2` mengembalikan dua nilai (tuple), diambil dengan `terbesar, kedua = ...`.', syntax: 'return' },
      { line: [22, 26], note: 'Program utama: membuat array `[0 for i in range(N)]` lalu mengisinya dari input.', syntax: 'list-init' },
      { line: [27, 29], note: 'Memanggil fungsi dan mencetak kedua hasilnya.', syntax: 'call' },
    ],
    explanation: 'Satu lintasan dengan dua variabel (t1, t2). Untuk contoh soal hasilnya (50000, 30000): 50000 kembar tidak boleh jadi "kedua", sehingga kedua = 30000. Catatan: soal tidak menentukan nilai bila tidak ada angka yang lebih kecil; di sini dipakai -1.',
    refs: [{ src: GEM, page: 5 }], rubric: rubProg('berupa fungsi yang mengembalikan termahal dan termahal kedua (strictly lebih kecil) tanpa sort/max/set'),
  }],
}

const gemProblems: Problem[] = [...gemMcq, gemB1, gemB2, gemB3, gemB4, gemB5, gemB6]

/* =============================================================================
   3. Mock Pengkom  (mpk-)  - "UTS Pengenalan Komputasi - Stream Pemrograman" (KU1102, 27 April 2024)
   ============================================================================= */

const PK = 'Mock_Pengkom'
type PkRow = [n: number, pages: number[], topic: string, stem: string, options: string[], ans: number, explanation: string, deck: DeckId, out: boolean]
const pkRows: PkRow[] = [
  [1, [3], 'Computing device', 'Perangkat yang termasuk dalam kategori *computing device* adalah ...', ['Lampu', 'Kulkas', 'Smartphone', 'AC'], 2, 'Smartphone memproses data (punya CPU, memori, program). Lampu, kulkas, dan AC biasa bukan perangkat komputasi (kecuali versi "pintar").', 'D11', true],
  [2, [3], 'Operating systems', 'Perangkat lunak yang berfungsi sebagai antarmuka antara pengguna dan perangkat keras adalah ...', ['*Word processor*', '*Web browser*', 'Sistem operasi', '*Spreadsheet*'], 2, 'Sistem operasi menjembatani pengguna/aplikasi dengan perangkat keras. Opsi lain adalah aplikasi.', 'D11', true],
  [3, [3], 'Input devices', 'Berikut ini yang bukan merupakan contoh *input device* adalah ...', ['*Keyboard*', '*Mouse*', '*Scanner*', 'Monitor'], 3, 'Monitor adalah perangkat output.', 'D11', true],
  [4, [3], 'Hardware', 'Perangkat keras yang bertugas melakukan operasi aritmatika dan logika adalah ...', ['*Hard disk*', 'RAM', 'CPU', '*Motherboard*'], 2, 'CPU (ALU di dalamnya) mengerjakan operasi aritmatika dan logika.', 'D11', true],
  [5, [3], 'Malware', 'Software yang dirancang untuk merusak sistem komputer disebut ...', ['*Malware*', '*Firmware*', '*Freeware*', '*Shareware*'], 0, '*Malware* (*malicious software*) dirancang merusak atau menyusup ke sistem. *Firmware* = perangkat lunak tertanam; *freeware* gratis; *shareware* coba-gratis.', 'D11', true],
  [6, [3], 'Web protocols', 'Protokol yang digunakan untuk mengakses *website* adalah ...', ['HTTP', 'FTP', 'SMTP', 'TCP/IP'], 0, 'HTTP (HTTPS) dipakai browser untuk mengakses web. FTP untuk transfer berkas, SMTP untuk email, TCP/IP adalah rangkaian protokol dasar internet.', 'D11', true],
  [7, [4], 'Computer networks', 'Jaringan komputer yang cakupannya terbatas pada area geografis yang kecil disebut ...', ['LAN', 'MAN', 'WAN', 'Internet'], 0, 'LAN = *Local Area Network* (gedung/kampus kecil); MAN = kota; WAN = wilayah luas.', 'D11', true],
  [8, [4], 'Privacy threats', 'Berikut ini yang merupakan ancaman terhadap privasi di dunia digital adalah ...', ['*Phishing*', '*Spam*', '*Cyberbullying*', 'Semua jawaban benar'], 3, 'Slide D11 membahas ancaman di dunia digital: pencurian identitas, ancaman privasi (h17-h20), dan kekerasan lewat internet seperti *cyberbullying* (h11). Soal ini versi lama yang longgar; opsi "semua benar" dipilih mengikuti kunci yang paling masuk akal.', 'D11', false],
  [9, [4], 'Green computing', '*Green computing* adalah ...', ['Konsep penggunaan teknologi komputasi yang ramah lingkungan', 'Penggunaan komputer untuk mempelajari lingkungan', 'Penggunaan komputer untuk bertani', 'Software untuk mengelola limbah'], 0, '*Green computing* = penggunaan komputasi yang hemat energi dan ramah lingkungan. Topik ini tidak ada di slide D11 (2026) (hanya diskusi dampak lingkungan AI di h61).', 'D11', true],
  [10, [4], 'Copyright', 'Hak cipta termasuk dalam kategori ...', ['HAKI', 'HAM', 'UU ITE', 'Hak Paten'], 0, 'Hak cipta adalah salah satu jenis HAKI (Hak atas Kekayaan Intelektual), selain paten dan merek.', 'D11', true],
  [11, [4], 'Open-source software', 'Perangkat lunak yang kode sumbernya terbuka dan dapat dimodifikasi disebut ...', ['*Proprietary software*', '*Freeware*', '*Open-source software*', '*Shareware*'], 2, '*Open-source* = kode sumber terbuka dan boleh dimodifikasi. *Freeware* gratis tetapi kode tertutup.', 'D11', true],
  [12, [4], 'Output devices', 'Berikut ini yang bukan merupakan contoh *output device* adalah ...', ['Monitor', '*Printer*', '*Speaker*', '*Keyboard*'], 3, '*Keyboard* adalah perangkat input.', 'D11', true],
  [13, [4, 5], 'Cybersecurity', '*Cybersecurity* adalah ...', ['Keamanan dalam berselancar di dunia maya', 'Perlindungan sistem komputer dan jaringan dari serangan digital', '*Software* antivirus', '*Firewall*'], 1, '*Cybersecurity* = perlindungan sistem dan jaringan dari serangan digital. Antivirus dan firewall hanyalah alat di dalamnya.', 'D11', true],
  [14, [5], 'CT pillars', 'Berikut ini yang bukan merupakan pilar berpikir komputasional adalah ...', ['Dekomposisi', 'Abstraksi', 'Pengenalan pola', 'Pemrograman'], 3, 'Slide D01 (h7): 4 pilar CT = dekomposisi, pengenalan pola, abstraksi, algoritma. Pemrograman adalah cara menerapkannya, bukan pilar.', 'D01', false],
  [15, [5], 'Decomposition', 'Membagi masalah besar menjadi sub-masalah yang lebih kecil disebut ...', ['Abstraksi', 'Dekomposisi', 'Algoritma', 'Generalisasi'], 1, 'Slide D01 (h19): dekomposisi = membagi masalah menjadi sub-masalah yang diselesaikan terpisah.', 'D01', false],
  [16, [5], 'Pattern recognition', 'Mengidentifikasi persamaan karakteristik dari berbagai masalah disebut ...', ['Abstraksi', 'Dekomposisi', 'Algoritma', 'Pengenalan pola'], 3, 'Pengenalan pola = menemukan kemiripan/pola pada masalah (slide D01 h14 dst.).', 'D01', false],
  [17, [5], 'Abstraction', 'Menyederhanakan suatu masalah dengan menghilangkan detail yang tidak penting disebut ...', ['Abstraksi', 'Dekomposisi', 'Algoritma', 'Generalisasi'], 0, 'Slide D01 (h20): abstraksi = menyingkirkan bagian masalah yang tidak penting.', 'D01', false],
  [18, [5], 'Generalization', 'Menemukan solusi umum yang dapat diterapkan pada berbagai masalah sejenis disebut ...', ['Abstraksi', 'Dekomposisi', 'Algoritma', 'Generalisasi'], 3, 'Slide D01 (h20): abstraksi untuk memperoleh solusi umum bagi masalah serupa disebut generalisasi.', 'D01', false],
  [19, [5, 6], 'Algorithm', 'Rangkaian instruksi langkah-demi-langkah untuk menyelesaikan suatu masalah disebut ...', ['Abstraksi', 'Dekomposisi', 'Algoritma', 'Generalisasi'], 2, 'Definisi algoritma: urutan langkah yang jelas dan berhingga untuk menyelesaikan masalah.', 'D02', false],
  [20, [6], 'Flowchart', '*Flowchart* adalah ...', ['Representasi grafis dari suatu algoritma', 'Bahasa pemrograman', 'Sistem operasi', 'Software aplikasi'], 0, '*Flowchart* menggambarkan algoritma dengan simbol dan panah (slide D02).', 'D02', false],
  [21, [6], 'Pseudocode', '*Pseudocode* adalah ...', ['Representasi teks dari suatu algoritma', 'Bahasa pemrograman', 'Sistem operasi', 'Software aplikasi'], 0, '*Pseudocode* adalah tulisan algoritma dalam bahasa semi-formal (notasi Liem di kuliah), bukan bahasa pemrograman sungguhan.', 'D02', false],
  [22, [6], 'Sequence', '*Sequence* dalam algoritma berarti ...', ['Pengulangan instruksi', 'Pemilihan instruksi', 'Urutan instruksi', 'Pengelompokkan instruksi'], 2, '*Sequence* = urutan; *selection* = pemilihan (if); *iteration* = pengulangan (loop).', 'D02', false],
  [23, [6], 'Selection', '*Selection* dalam algoritma berarti ...', ['Pengulangan instruksi', 'Pemilihan instruksi', 'Urutan instruksi', 'Pengelompokkan instruksi'], 1, '*Selection* = pemilihan instruksi berdasarkan kondisi (`if`).', 'D02', false],
  [24, [6], 'Iteration', '*Iteration* dalam algoritma berarti ...', ['Pengulangan instruksi', 'Pemilihan instruksi', 'Urutan instruksi', 'Pengelompokkan instruksi'], 0, '*Iteration* = pengulangan instruksi (`for`, `while`).', 'D02', false],
  [25, [6], 'Array', 'Struktur data yang menyimpan sekumpulan elemen dengan tipe data yang sama adalah ...', ['*Array*', '*List*', '*Tuple*', '*Dictionary*'], 0, 'Array = kumpulan elemen bertipe sama yang diakses lewat indeks (slide D06). Di Python, array direalisasikan dengan `list`; `list` Python sebenarnya boleh bercampur tipe, sehingga "tipe sama" menunjuk ke array.', 'D06', false],
  [26, [7], 'Array index', 'Setiap elemen dalam *array* diakses menggunakan ...', ['Nama variabel', 'Indeks', 'Tipe data', 'Nilai elemen'], 1, 'Elemen diakses lewat indeks: `T[i]`, dimulai dari 0.', 'D06', false],
  [27, [7], 'Nested loop', '*Nested loop* adalah ...', ['*Loop* di dalam *loop*', '*Loop* yang berulang sebanyak 2 kali', '*Loop* yang tidak pernah berhenti', '*Loop* yang menggunakan *array*'], 0, '*Nested loop* = loop yang berada di dalam badan loop lain.', 'D05', false],
  [28, [7], 'Searching', 'Proses pencarian suatu elemen dalam *array* disebut ...', ['*Sorting*', '*Searching*', '*Indexing*', '*Looping*'], 1, 'Slide D06: *searching* (pencarian) elemen dalam array, memakai pola `found` flag.', 'D06', false],
  [29, [7], 'Sorting', 'Proses mengurutkan elemen dalam *array* disebut ...', ['*Sorting*', '*Searching*', '*Indexing*', '*Looping*'], 0, '*Sorting* = pengurutan elemen.', 'D06', false],
  [30, [7], 'Function', '*Function* dalam pemrograman adalah ...', ['Blok kode yang dapat digunakan kembali', 'Variabel', 'Tipe data', '*Loop*'], 0, 'Slide D10: subprogram (fungsi/prosedur) adalah blok kode bernama yang dapat dipakai ulang; fungsi mengembalikan nilai lewat `return`.', 'D10', false],
  [31, [7], 'Procedure', '*Procedure* dalam pemrograman adalah ...', ['Blok kode yang dapat digunakan kembali', 'Variabel', 'Tipe data', '*Loop*'], 0, 'Prosedur juga blok kode yang dapat dipakai ulang; bedanya dengan fungsi: prosedur tidak mengembalikan nilai (slide D10). Opsi lain jelas salah.', 'D10', false],
  [32, [7, 8], 'Programming languages', 'Berikut ini yang bukan merupakan bahasa pemrograman adalah ...', ['Python', 'HTML', 'Java', 'C++'], 1, 'HTML adalah *markup language* (penanda tampilan web), bukan bahasa pemrograman.', 'D04', true],
  [33, [8], 'Interpreter', '*Interpreter* adalah ...', ['*Software* yang menerjemahkan kode program baris demi baris', '*Software* yang menerjemahkan seluruh kode program sekaligus', 'Bahasa pemrograman', 'Sistem operasi'], 0, '*Interpreter* menerjemahkan dan menjalankan kode baris demi baris (mis. Python); compiler menerjemahkan seluruhnya sekaligus.', 'D04', true],
  [34, [8], 'Compiler', '*Compiler* adalah ...', ['*Software* yang menerjemahkan kode program baris demi baris', '*Software* yang menerjemahkan seluruh kode program sekaligus', 'Bahasa pemrograman', 'Sistem operasi'], 1, '*Compiler* menerjemahkan seluruh program menjadi kode mesin sekaligus sebelum dijalankan.', 'D04', true],
  [35, [8], 'OOP paradigm', 'Paradigma pemrograman yang berfokus pada objek dan interaksinya disebut ...', ['Pemrograman prosedural', 'Pemrograman berorientasi objek', 'Pemrograman fungsional', 'Pemrograman logika'], 1, 'Pemrograman berorientasi objek (OOP). Di luar silabus WI1102.', 'D04', true],
  [36, [8], 'Functional paradigm', 'Paradigma pemrograman yang berfokus pada fungsi dan komposisinya disebut ...', ['Pemrograman prosedural', 'Pemrograman berorientasi objek', 'Pemrograman fungsional', 'Pemrograman logika'], 2, 'Pemrograman fungsional. Di luar silabus WI1102.', 'D04', true],
  [37, [8], 'Visual programming', 'Pemrograman yang menggunakan representasi visual untuk membangun program disebut ...', ['Pemrograman visual', 'Pemrograman prosedural', 'Pemrograman berorientasi objek', 'Pemrograman fungsional'], 0, 'Pemrograman visual (mis. Scratch): blok/diagram untuk menyusun program.', 'D04', true],
  [38, [8], 'Spreadsheet', '*Software* yang dirancang untuk mengolah angka dan melakukan perhitungan disebut ...', ['*Word processor*', '*Spreadsheet*', '*Database*', '*Presentation software*'], 1, '*Spreadsheet* (Excel) untuk mengolah angka dan perhitungan.', 'D11', true],
  [39, [9], 'Database', '*Software* yang dirancang untuk mengelola dan mengorganisir data disebut ...', ['*Word processor*', '*Spreadsheet*', '*Database*', '*Presentation software*'], 2, '*Database* (DBMS) mengelola dan mengorganisir data.', 'D11', true],
  [40, [9], 'Presentation software', '*Software* yang dirancang untuk membuat presentasi visual disebut ...', ['*Word processor*', '*Spreadsheet*', '*Database*', '*Presentation software*'], 3, '*Presentation software* (PowerPoint, Slides).', 'D11', true],
]
const pkMcq: Problem[] = pkRows.map(([n, pages, topic, stem, options, ans, explanation, deck, out]) =>
  mcqProblem({ src: PK, pre: 'mpk', n, label: `Bagian A no. ${n}`, pages, decks: [deck], topic, stem, options, ans, explanation, out }))

/** Bagian B "Isian singkat" open items: older-course (KU1102) style, answered in a few lines. */
const pkOpen = (n: number, topic: string, stem: string, answer: string, keyPoints: string[], deck: DeckId, out = false): Problem => ({
  id: `mpk-b-${n}`, archetype: 'concept', title: `Bagian B no. ${n} – ${topic}`,
  source: { kind: 'mock' as const, lang: 'id' as const, src: PK, label: `Bagian B no. ${n}`, pages: [10], official: false, ...(out ? { outOfScope: true } : {}) },
  parts: [{
    id: `mpk-b-${n}a`, kind: 'open', decks: [deck], topic, stem, answer, keyPoints,
    rubric: rub('Jawaban lengkap dan tepat sesuai yang diminta (jumlah butir dan contoh bila diminta)'),
    explanation: 'Jawaban singkat; periksa terhadap model jawaban dan poin kunci.', refs: [{ src: PK, page: 10 }],
  }],
})

const pkB1 = pkOpen(1, 'Python data types', 'Sebutkan 3 (tiga) tipe data dasar dalam Python dan berikan masing-masing 1 (satu) contoh.',
  '`int` (bilangan bulat): `42`; `float` (bilangan pecahan): `3.14`; `str` (teks): `"halo"`; `bool`: `True`. Cukup tiga di antaranya.', ['Tiga tipe benar (int, float, str, bool)', 'Masing-masing disertai contoh nilai yang sesuai'], 'D04')
const pkB2 = pkOpen(2, 'Python operators', 'Sebutkan 2 (dua) jenis operator dalam Python dan berikan masing-masing 1 (satu) contoh.',
  'Operator aritmatika: `+`, `-`, `*`, `/`, `//`, `%`, `**` (mis. `7 % 2`). Operator relasional: `==`, `!=`, `<`, `>`, `<=`, `>=` (mis. `a > b`). Operator logika: `and`, `or`, `not` (mis. `x > 0 and x < 10`). Operator penugasan: `=`, `+=`. Cukup dua jenis dengan contoh.', ['Dua jenis operator yang benar', 'Contoh ekspresi untuk masing-masing'], 'D04')
const pkB3 = pkOpen(3, 'input() and print()', 'Jelaskan fungsi dari perintah `input()` dan `print()` dalam Python.',
  '`input()` membaca masukan dari pengguna (keyboard) dan mengembalikannya sebagai string, sehingga perlu `int()`/`float()` untuk angka. `print()` menampilkan nilai atau teks ke layar (keluaran); untuk menggabung string dengan angka gunakan `str()`.', ['input: membaca masukan, hasilnya string', 'print: menampilkan keluaran', 'Disebutkan konversi tipe (opsional tapi baik)'], 'D04')
const pkB4 = pkOpen(4, 'if-else syntax', 'Tuliskan sintaks percabangan `if-else` dalam Python.',
  '```\nif (kondisi):\n    # aksi bila kondisi benar\nelse:\n    # aksi bila kondisi salah\n```\nDengan lebih dari dua cabang: `if (k1): ... elif (k2): ... else: ...`. Perhatikan titik dua (`:`) dan menjorok (indentasi).', ['if (kondisi): lalu blok menjorok', 'else: lalu blok menjorok', 'Titik dua dan indentasi benar'], 'D05')
const pkB5 = pkOpen(5, 'for syntax', 'Tuliskan sintaks perulangan `for` dalam Python.',
  '```\nfor i in range(awal, akhir+1):\n    # badan loop\n```\n`range(a, b)` menghasilkan a, a+1, …, b−1 (batas atas tidak ikut). Contoh: `for i in range(1, N+1):` memproses 1..N.', ['for variabel in range(...):', 'Badan loop menjorok', 'Batas atas range tidak ikut'], 'D05')
const pkB6 = pkOpen(6, 'while syntax', 'Tuliskan sintaks perulangan `while` dalam Python.',
  '```\nwhile (kondisi):\n    # badan loop\n    # ubah variabel kondisi agar loop berhenti\n```\nContoh: `i = 1` lalu `while (i <= N): print(i); i = i + 1`. Lupa mengubah `i` membuat loop tak berhenti.', ['while (kondisi): lalu blok menjorok', 'Ada pembaruan variabel kondisi agar berhenti'], 'D05')
const pkB7 = pkOpen(7, 'Compiler vs interpreter', 'Jelaskan perbedaan antara compiler dan interpreter.',
  '*Compiler* menerjemahkan seluruh program sumber menjadi kode mesin sekaligus sebelum dijalankan (mis. C, C++); kesalahan ketahuan sebelum eksekusi dan hasilnya biasanya lebih cepat. *Interpreter* menerjemahkan dan menjalankan kode baris demi baris (mis. Python); mudah dicoba dan didebug, tetapi umumnya lebih lambat.', ['Compiler: seluruh program sekaligus', 'Interpreter: baris demi baris', 'Contoh bahasa (opsional)'], 'D04', true)
const pkB8 = pkOpen(8, 'Programming paradigms', 'Sebutkan 2 (dua) paradigma pemrograman selain pemrograman prosedural.',
  'Pemrograman berorientasi objek (OOP) dan pemrograman fungsional. Alternatif lain yang diterima: pemrograman logika, pemrograman deklaratif, pemrograman visual.', ['Dua paradigma yang valid selain prosedural'], 'D04', true)

const pkB9: Problem = {
  id: 'mpk-b-9', archetype: 'program', title: 'Bagian B no. 9 – Luas persegi panjang 5 cm × 3 cm',
  source: { kind: 'mock' as const, lang: 'id' as const, src: PK, label: 'Bagian B no. 9', pages: [10], official: false },
  parts: [{
    id: 'mpk-b-9a', kind: 'program', decks: ['D04'], topic: 'Sequence: variables and calculation', patterns: ['sequence-io', 'operators'],
    stem: 'Tuliskan kode program Python untuk menghitung luas persegi panjang dengan panjang 5 cm dan lebar 3 cm.',
    reps: ['python', 'pseudo', 'flow'], match: 'numbers',
    solution: {
      python: r`# Program Luas_Persegi_Panjang
# Menghitung luas persegi panjang 5 cm x 3 cm
# DECLARATIONS
# panjang, lebar, luas : int
# ALGORITHM
panjang = 5
lebar = 3
luas = panjang * lebar
print(luas)`,
    },
    tests: [{ name: 'no input', edge: 'fixed values 5 and 3' }],
    wrong: [
      { code: 'panjang = 5\nlebar = 3\nprint(2 * (panjang + lebar))', msg: 'Itu rumus keliling (16). Luas = panjang × lebar.' },
      { code: 'panjang = 5\nlebar = 3\nprint(panjang + lebar)', msg: 'Luas dihitung dengan perkalian, bukan penjumlahan.' },
    ],
    hints: ['Luas persegi panjang = panjang × lebar. Simpan keduanya dalam variabel dahulu.'],
    syntax: ['program-template', 'assign', 'operators'],
    lineNotes: [
      { line: [1, 5], note: 'Judul, spesifikasi, dan KAMUS.', syntax: 'program-template' },
      { line: [6, 7], note: 'Penugasan nilai (`=`): panjang dan lebar disimpan di variabel, bukan ditulis langsung di rumus agar mudah diubah.', syntax: 'assign' },
      { line: 8, note: '`*` adalah perkalian; hasil 15 bertipe int.', syntax: 'operators' },
      { line: 9, note: 'Tampilkan hasilnya. Cukup `print(luas)`: tidak ada penggabungan string.' },
    ],
    explanation: 'Luas = 5 × 3 = 15 (cm²).',
    refs: [{ src: PK, page: 10 }], rubric: rubProg('menghitung dan menampilkan luas 15'),
  }],
}

const pkB10: Problem = {
  id: 'mpk-b-10', archetype: 'program', title: 'Bagian B no. 10 – Genap atau ganjil',
  source: { kind: 'mock' as const, lang: 'id' as const, src: PK, label: 'Bagian B no. 10', pages: [10], official: false },
  parts: [{
    id: 'mpk-b-10a', kind: 'program', decks: ['D05'], topic: 'If-else with modulo', patterns: ['if-else', 'operators'], misconceptions: ['assign-vs-eq'],
    stem: 'Tuliskan kode program Python untuk menentukan apakah suatu bilangan genap atau ganjil.',
    reps: ['python', 'pseudo', 'flow'], match: 'lenient',
    solution: {
      python: r`# Program Genap_Ganjil
# Menentukan apakah bilangan bulat N genap atau ganjil
# DECLARATIONS
# N : int
# ALGORITHM
N = int(input())
if (N % 2 == 0):
    print("Genap")
else:
    print("Ganjil")`,
    },
    tests: [{ stdin: ['4'] }, { stdin: ['7'] }, { stdin: ['0'], edge: '0 adalah genap' }, { stdin: ['-3'], edge: 'negative odd number' }],
    wrong: [
      { code: 'N = int(input())\nif (N % 2 == 0):\n    print("Ganjil")\nelse:\n    print("Genap")', msg: 'Hasil terbalik: sisa bagi 0 berarti genap.' },
      { code: 'N = int(input())\nif (N / 2 == 0):\n    print("Genap")\nelse:\n    print("Ganjil")', msg: 'Gunakan `%` (sisa bagi), bukan `/` (hasil bagi).' },
      { code: 'N = int(input())\nif (N % 2 = 0):\n    print("Genap")\nelse:\n    print("Ganjil")', msg: '`=` adalah penugasan; perbandingan memakai `==`.', tag: 'assign-vs-eq' },
    ],
    plan: 'baca N; jika N mod 2 = 0 tampilkan "Genap", jika tidak "Ganjil"',
    hints: ['Bilangan genap habis dibagi 2. Operator apa yang memberi sisa bagi?'],
    syntax: ['input', 'if-else', 'operators'],
    lineNotes: [
      { line: [1, 5], note: 'Judul, spesifikasi, dan KAMUS.', syntax: 'program-template' },
      { line: 6, note: '`int(input())` agar N berupa bilangan.', syntax: 'input' },
      { line: 7, note: '`N % 2 == 0`: `%` = sisa bagi, `==` = perbandingan (bukan `=`). Berlaku juga untuk 0 dan bilangan negatif.', syntax: 'operators' },
      { line: [8, 10], note: 'Dua cabang yang saling lepas dan lengkap: sisa 0 → Genap, selain itu → Ganjil.', syntax: 'if-else' },
    ],
    explanation: 'N genap jika `N % 2 == 0`; selain itu ganjil. Di Python, `-3 % 2` bernilai 1 sehingga negatif ganjil juga terdeteksi benar.',
    refs: [{ src: PK, page: 10 }], rubric: rubProg('menentukan genap/ganjil dengan benar'),
  }],
}

const pkC = (n: number, title: string, deck: DeckId, q: Omit<Extract<Question, { kind: 'program' }>, 'id' | 'kind' | 'refs' | 'decks' | 'label'>): Problem => ({
  id: `mpk-c-${n}`, archetype: 'program', title: `Bagian C no. ${n} – ${title}`,
  source: { kind: 'mock' as const, lang: 'id' as const, src: PK, label: `Bagian C no. ${n}`, pages: [10], official: false },
  parts: [{ id: `mpk-c-${n}a`, kind: 'program', decks: [deck], refs: [{ src: PK, page: 10 }], ...q }],
})

const pkC1 = pkC(1, 'Luas lingkaran', 'D04', {
  topic: 'Float input and formula', patterns: ['sequence-io', 'type-conversion'], misconceptions: ['input-is-str'],
  stem: 'Buatlah program untuk menghitung luas lingkaran dengan jari-jari yang diinput oleh pengguna.\n\n- Gunakan nilai pi = 3.14159.\n- Tampilkan luas lingkaran ke layar.',
  reps: ['python', 'pseudo', 'flow'], match: 'numbers',
  solution: {
    python: r`# Program Luas_Lingkaran
# Menghitung luas lingkaran dari jari-jari r, pi = 3.14159
# DECLARATIONS
# pi, r, luas : float
# ALGORITHM
pi = 3.14159
r = float(input())
luas = pi * r * r
print(luas)`,
  },
  tests: [{ stdin: ['1'] }, { stdin: ['2'] }, { stdin: ['10'] }, { stdin: ['0.5'], edge: 'jari-jari desimal' }],
  wrong: [
    { code: 'pi = 3.14159\nr = float(input())\nprint(2 * pi * r)', msg: 'Itu rumus keliling. Luas = π × r × r.' },
    { code: 'pi = 3.14159\nr = int(input())\nprint(pi * r * r)', msg: 'Jari-jari bisa desimal; gunakan float(input()).', tag: 'input-is-str' },
    { code: 'pi = 3.14159\nr = float(input())\nprint(pi * r * 2)', msg: 'Kuadrat berarti r × r, bukan r × 2.' },
  ],
  hints: ['Luas lingkaran = π × r². Simpan π dalam variabel.', 'Jari-jari bisa pecahan, jadi konversi dengan float.'],
  syntax: ['input', 'type-conversion', 'operators'],
  lineNotes: [
    { line: [1, 5], note: 'Judul, spesifikasi, dan KAMUS.', syntax: 'program-template' },
    { line: 6, note: 'π disimpan di variabel `pi` (diberikan 3.14159), bukan `math.pi`, sesuai soal.' },
    { line: 7, note: '`float(input())`: input() menghasilkan string; float agar jari-jari desimal diterima.', syntax: 'type-conversion' },
    { line: 8, note: 'r² ditulis `r * r` (bisa juga `r ** 2`). Jangan `r * 2`.', syntax: 'operators' },
    { line: 9, note: 'Menampilkan luas; tidak ada string yang digabung.' },
  ],
  explanation: 'L = π r². Dengan r = 2: 3.14159 × 4 = 12.56636.', rubric: rubProg('membaca jari-jari, memakai π = 3.14159, dan menampilkan luas'),
})

const pkC2 = pkC(2, 'Bilangan terbesar dari 3 bilangan', 'D05', {
  topic: 'Maximum of three numbers', patterns: ['max-min', 'if-elif'], misconceptions: ['max-init-zero'],
  stem: 'Buatlah program untuk menentukan bilangan terbesar dari 3 (tiga) bilangan yang diinput oleh pengguna.',
  reps: ['python', 'pseudo', 'flow'], match: 'numbers',
  solution: {
    python: r`# Program Max3
# Mencetak yang terbesar dari tiga bilangan
# DECLARATIONS
# A, B, C, maks : int
# ALGORITHM
A = int(input())
B = int(input())
C = int(input())
maks = A
if (B > maks):
    maks = B
if (C > maks):
    maks = C
print(maks)`,
  },
  tests: [{ stdin: ['3', '7', '5'] }, { stdin: ['9', '2', '4'] }, { stdin: ['1', '2', '8'] }, { stdin: ['-5', '-2', '-9'], edge: 'all negative' }, { stdin: ['4', '4', '4'], edge: 'all equal' }],
  wrong: [
    { code: 'A = int(input())\nB = int(input())\nC = int(input())\nmaks = 0\nif (A > maks):\n    maks = A\nif (B > maks):\n    maks = B\nif (C > maks):\n    maks = C\nprint(maks)', msg: '`maks = 0` salah bila semua bilangan negatif. Mulai dari salah satu bilangan (A).', tag: 'max-init-zero' },
    { code: 'A = int(input())\nB = int(input())\nC = int(input())\nif (A > B):\n    print(A)\nelse:\n    print(B)', msg: 'Bilangan ketiga (C) tidak ikut dibandingkan.', tag: 'not-complete' },
    { code: 'A = int(input())\nB = int(input())\nC = int(input())\nif (A > B):\n    maks = A\nelse:\n    maks = B\nif (A > C):\n    maks = A\nelse:\n    maks = C\nprint(maks)', msg: 'Perbandingan kedua membandingkan A dengan C, bukan maks sementara dengan C; B yang paling besar bisa terlewat.', tag: 'not-complete' },
  ],
  plan: 'baca A, B, C; maks ← A; jika B > maks maka maks ← B; jika C > maks maka maks ← C; tampilkan maks',
  hints: ['Pola maksimum: anggap yang pertama terbesar, lalu bandingkan satu per satu.'],
  syntax: ['input', 'if'],
  lineNotes: [
    { line: [1, 5], note: 'Judul, spesifikasi, dan KAMUS.', syntax: 'program-template' },
    { line: [6, 8], note: 'Tiga masukan, masing-masing satu baris, dikonversi ke int.', syntax: 'input' },
    { line: 9, note: '`maks = A`, bukan 0: gagal kalau semua bilangan negatif.' },
    { line: [10, 13], note: 'Dua `if` terpisah (bukan if-else): setiap bilangan dibandingkan dengan maksimum sementara, jadi urutan input tidak masalah.', syntax: 'if' },
    { line: 14, note: 'Setelah kedua perbandingan, `maks` adalah yang terbesar.' },
  ],
  explanation: 'Pola cari-maksimum: inisialisasi dengan bilangan pertama, lalu perbarui bila ada yang lebih besar. Boleh juga memakai if-elif bertingkat dengan `and`.', rubric: rubProg('mencetak yang terbesar untuk semua kombinasi termasuk negatif dan sama'),
})

const pkC3 = pkC(3, 'Faktorial', 'D05', {
  topic: 'Factorial (product accumulation)', patterns: ['for-count', 'accumulate-sum'], misconceptions: ['off-by-one', 'init-in-loop'],
  stem: 'Buatlah program untuk menghitung faktorial dari suatu bilangan yang diinput oleh pengguna.',
  reps: ['python', 'pseudo', 'flow'], match: 'numbers',
  solution: {
    python: r`# Program Faktorial
# Menghitung N! (0! = 1). Asumsi: N >= 0
# DECLARATIONS
# N, i, hasil : int
# ALGORITHM
N = int(input())
hasil = 1
for i in range(1, N+1):
    hasil = hasil * i
print(hasil)`,
  },
  tests: [{ stdin: ['5'] }, { stdin: ['0'], edge: '0! = 1' }, { stdin: ['1'] }, { stdin: ['10'] }],
  wrong: [
    { code: 'N = int(input())\nhasil = 0\nfor i in range(1, N+1):\n    hasil = hasil * i\nprint(hasil)', msg: 'Akumulator perkalian harus dimulai dari 1, bukan 0 (hasilnya selalu 0).' },
    { code: 'N = int(input())\nhasil = 1\nfor i in range(1, N):\n    hasil = hasil * i\nprint(hasil)', msg: '`range(1, N)` tidak memproses N; gunakan `range(1, N+1)`.', tag: 'off-by-one' },
    { code: 'N = int(input())\nfor i in range(1, N+1):\n    hasil = 1\n    hasil = hasil * i\nprint(hasil)', msg: '`hasil = 1` di dalam loop mengulang nilai awal di tiap iterasi.', tag: 'init-in-loop' },
  ],
  plan: 'baca N; hasil ← 1; untuk i dari 1 sampai N: hasil ← hasil × i; tampilkan hasil',
  hints: ['Mirip penjumlahan 1..N, tetapi operasinya perkalian. Nilai awal akumulator perkalian apa?'],
  skeleton: 'N = int(input())\nhasil = ___\nfor i in range(___, ___):\n    hasil = ___\nprint(hasil)',
  syntax: ['for-range'],
  lineNotes: [
    { line: [1, 5], note: 'Judul, spesifikasi, dan KAMUS.', syntax: 'program-template' },
    { line: 6, note: '`int(input())`; N bilangan bulat tak negatif.', syntax: 'input' },
    { line: 7, note: '`hasil = 1` (elemen identitas perkalian). Kalau 0, semua hasil kali menjadi 0. Juga membuat 0! = 1 benar karena loop tidak berjalan.' },
    { line: 8, note: '`range(1, N+1)` agar N ikut; batas atas tidak ikut.', syntax: 'for-range' },
    { line: 9, note: 'Akumulasi perkalian: `hasil = hasil * i`.' },
    { line: 10, note: 'Dicetak sekali setelah loop selesai.' },
  ],
  explanation: 'N! = 1 × 2 × … × N, dan 0! = 1. 5! = 120.', rubric: rubProg('menghitung N! benar termasuk N = 0'),
})

const fibJudge = r`def judge(stdin, out, ref_out):
    n = int(stdin[0])
    nums = [int(x) for x in out.replace(',', ' ').split() if x.lstrip('-').isdigit()]
    a = [0, 1]
    b = [1, 1]
    while len(a) < n:
        a.append(a[-1] + a[-2])
    while len(b) < n:
        b.append(b[-1] + b[-2])
    if nums == a[:n] or nums == b[:n]:
        return None
    return "Deret Fibonacci hingga suku ke-" + str(n) + " tidak sesuai (0, 1, 1, 2, ... atau 1, 1, 2, 3, ...)."`

const pkC4 = pkC(4, 'Deret Fibonacci hingga suku ke-n', 'D05', {
  topic: 'Fibonacci (two shifting variables)', patterns: ['for-count', 'accumulate-sum'], misconceptions: ['off-by-one'],
  stem: 'Buatlah program untuk mencetak deret Fibonacci hingga suku ke-n, dengan n diinput oleh pengguna.',
  reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: fibJudge,
  solution: {
    python: r`# Program Fibonacci
# Mencetak n suku pertama deret Fibonacci (0, 1, 1, 2, 3, ...), satu per baris
# DECLARATIONS
# n, i, a, b, c : int
# ALGORITHM
n = int(input())
a = 0
b = 1
for i in range(n):
    print(a)
    c = a + b
    a = b
    b = c`,
  },
  tests: [{ stdin: ['1'], edge: 'n = 1' }, { stdin: ['2'] }, { stdin: ['5'] }, { stdin: ['10'] }],
  wrong: [
    { code: 'n = int(input())\na = 0\nb = 1\nfor i in range(n+1):\n    print(a)\n    c = a + b\n    a = b\n    b = c', msg: 'Mencetak n+1 suku. `range(n)` sudah menghasilkan n iterasi.', tag: 'off-by-one' },
    { code: 'n = int(input())\na = 1\nb = 2\nfor i in range(n):\n    print(a)\n    c = a + b\n    a = b\n    b = c', msg: 'Dua suku awal Fibonacci adalah (0, 1) atau (1, 1), bukan (1, 2).' },
    { code: 'n = int(input())\na = 0\nb = 1\nfor i in range(n):\n    print(a)\n    a = b\n    b = a + b', msg: 'Urutan penugasan salah: setelah `a = b`, nilai a lama hilang. Simpan jumlah di variabel sementara dulu (`c = a + b`).' },
  ],
  plan: 'baca n; a ← 0, b ← 1; ulangi n kali: tampilkan a; c ← a + b; a ← b; b ← c',
  hints: ['Setiap suku adalah jumlah dua suku sebelumnya. Simpan dua suku terakhir.', 'Saat menggeser, hati-hati urutan penugasan: butuh variabel sementara.'],
  syntax: ['for-range', 'assign'],
  lineNotes: [
    { line: [1, 5], note: 'Judul, spesifikasi, dan KAMUS. Soal tidak menetapkan apakah deret dimulai dari 0 atau 1; di sini dimulai 0, 1, 1, 2, …', syntax: 'program-template' },
    { line: 6, note: 'n = banyak suku yang dicetak.', syntax: 'input' },
    { line: [7, 8], note: 'Dua suku pertama: a = 0, b = 1.' },
    { line: 9, note: '`range(n)` = tepat n iterasi, satu iterasi per suku.', syntax: 'for-range' },
    { line: 10, note: 'Cetak suku saat ini (a) sebelum digeser.' },
    { line: [11, 13], note: 'Pergeseran: hitung c = a + b, a ← b lama, b ← c. Urutan ini menjaga nilai lama; menulis `a = b` lalu `b = a + b` salah.' },
  ],
  explanation: 'Dua variabel (a, b) menyimpan dua suku terakhir. Deret bisa diawali 0,1 atau 1,1; penilai menerima keduanya (soal tidak merinci). Catatan: output n = 5 → 0 1 1 2 3.', rubric: rubProg('mencetak tepat n suku Fibonacci'),
})

const pkC5 = pkC(5, 'Mencari bilangan dalam array', 'D06', {
  topic: 'Searching an array (found flag)', patterns: ['search-flag', 'array-populate'], misconceptions: ['index-range', 'not-complete'],
  stem: 'Buatlah program untuk mencari suatu bilangan dalam array yang diinput oleh pengguna.\n\n- Jika bilangan ditemukan, tampilkan indeksnya.\n- Jika tidak ditemukan, tampilkan pesan "Bilangan tidak ditemukan".\n\n(Masukan untuk pengujian: N, lalu N bilangan elemen array, lalu bilangan yang dicari. Jika ada kembar, tampilkan indeks pertama.)',
  reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['array'],
  solution: {
    python: r`# Program Cari_Bilangan
# Mencari X di array T (N elemen), mencetak indeks pertama atau pesan
# DECLARATIONS
# N, i, X : int
# T : array [0..N-1] of int
# found : bool
# ALGORITHM
N = int(input())
T = [0 for i in range(N)]
for i in range(N):
    T[i] = int(input())
X = int(input())
i = 0
found = False
while (i < N and found == False):
    if (T[i] == X):
        found = True
    else:
        i = i + 1
if (found):
    print(i)
else:
    print("Bilangan tidak ditemukan")`,
  },
  tests: [
    { stdin: ['6', '5', '3', '8', '1', '9', '8', '8'], edge: 'ada kembar: indeks pertama (2)' },
    { stdin: ['4', '5', '3', '8', '1', '7'], edge: 'not found' },
    { stdin: ['1', '4', '4'], edge: 'N = 1, found' },
    { stdin: ['3', '6', '2', '4', '6'], edge: 'di elemen pertama' },
    { stdin: ['3', '6', '2', '4', '4'], edge: 'di elemen terakhir' },
  ],
  wrong: [
    { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(N):\n    T[i] = int(input())\nX = int(input())\nfound = False\nidx = -1\nfor i in range(N):\n    if (T[i] == X):\n        found = True\n        idx = i\nif (found):\n    print(idx)\nelse:\n    print("Bilangan tidak ditemukan")', msg: 'Loop berjalan sampai akhir dan idx tertimpa, sehingga yang dicetak indeks TERAKHIR. Berhenti pada kemunculan pertama (while dengan flag).' },
    { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(N):\n    T[i] = int(input())\nX = int(input())\ni = 0\nfound = False\nwhile (i < N and found == False):\n    if (T[i] == X):\n        found = True\n    else:\n        i = i + 1\nprint(i)', msg: 'Bila tidak ditemukan, i sama dengan N (di luar array) dan pesan tidak tercetak. Cek flag `found` sebelum mencetak.' },
    { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(N):\n    T[i] = int(input())\nX = int(input())\ni = 0\nfound = False\nwhile (i < N and found == False):\n    if (T[i] == X):\n        found = True\n    else:\n        i = i + 1\nif (found):\n    print(i + 1)\nelse:\n    print("Bilangan tidak ditemukan")', msg: 'Indeks array dimulai dari 0; jangan menambah 1.', tag: 'index-range' },
  ],
  plan: 'baca N dan isi T; baca X; i ← 0, found ← false; selama i < N dan belum found: jika T[i] = X maka found ← true, jika tidak i ← i + 1; jika found tampilkan i, jika tidak tampilkan pesan',
  hints: ['Pola pencarian: lintasi array dengan flag `found`; berhenti saat ketemu.', 'Penambahan i hanya di cabang else agar i menunjuk elemen yang ditemukan.'],
  skeleton: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(N):\n    T[i] = int(input())\nX = int(input())\ni = 0\nfound = ___\nwhile (i < ___ and found == ___):\n    if (T[i] == ___):\n        found = ___\n    else:\n        i = ___\nif (found):\n    print(___)\nelse:\n    print("Bilangan tidak ditemukan")',
  syntax: ['list-init', 'list-index', 'while', 'sentinel'],
  lineNotes: [
    { line: [1, 7], note: 'Judul, spesifikasi, dan KAMUS (array T dan flag found).', syntax: 'program-template' },
    { line: [8, 11], note: 'Membaca N, membuat array `[0 for i in range(N)]`, lalu mengisinya dari input. Indeks 0..N−1.', syntax: 'list-init' },
    { line: 12, note: 'X adalah bilangan yang dicari.' },
    { line: [13, 14], note: 'Inisialisasi: mulai dari elemen pertama dan flag found = False (belum ditemukan).' },
    { line: 15, note: 'Kondisi ganda: `i < N` mencegah indeks keluar rentang, `found == False` menghentikan loop begitu ditemukan.', syntax: 'while' },
    { line: [16, 17], note: 'Jika cocok, set flag; i tidak dinaikkan sehingga tetap menunjuk elemen ditemukan.' },
    { line: [18, 19], note: 'i naik hanya di `else` (tidak cocok); kalau naik di kedua cabang, indeks yang dicetak bergeser satu.' },
    { line: [20, 23], note: 'Keluar loop karena ketemu atau habis; cek flag untuk menentukan keluaran. Kalau tidak ditemukan i = N (bukan indeks yang valid).' },
  ],
  explanation: 'Pencarian linear dengan flag. Hasil berupa indeks (dari 0) kemunculan pertama.', rubric: rubProg('menampilkan indeks bila ditemukan dan pesan bila tidak'),
})

const pkProblems: Problem[] = [...pkMcq, pkB1, pkB2, pkB3, pkB4, pkB5, pkB6, pkB7, pkB8, pkB9, pkB10, pkC1, pkC2, pkC3, pkC4, pkC5]

/* ------------------------------- English mirrors (this file's sources are Indonesian) ------------------------------- */

type PartEn = En & { rubric?: string[]; rub4?: string; notes?: string[]; pnotes?: string[]; wrong?: string[] }
const EN: Record<string, PartEn> = {}
const PEN: Record<string, { title: string; intro?: string }> = {}
/** single-answer MCQ problem `<id>` (part id = `<id>-1`) */
const mc = (id: string, title: string, stem: string, options: string[], explanation: string) => {
  PEN[id] = { title }
  EN[id + '-1'] = { stem, options, explanation }
}

/* ---- mfti ---- */
mc('mfti-a-01', 'Part A no. 1 – Netiquette', "The following are included in *netiquette and messaging etiquette*, except:",
  ['*Keep it short*', '*Keep your cool*', '*Assume you are anonymous*', '*Say what you mean*'],
  'Slide D11 (slide 26) lists: *say what you mean*, *keep it short*, *keep your cool*, and *don\'t assume you are anonymous*. So "Assume you are anonymous" is the opposite of the rule (do not assume you are anonymous). The mock\'s key (C) is correct.')
mc('mfti-a-02', 'Part A no. 2 – Factory automation', "Look at the following picture (a factory full of robot arms and no workers). The following picture is one of the impacts of *automation*, called…",
  ['*Humanless factory*', '*AI factory*', '*Dark factory*', '*24-hour factory*'],
  'A *dark factory* (*lights-out factory*) is fully automated, so it needs neither lights nor workers. Note: this term is not in slide D11 (slide 32 only covers "The Automated Factory": robots for painting, welding and repetitive assembly); "Humanless factory" is not a standard term. The mock\'s key (C) is followed as the common term.')
mc('mfti-a-03', 'Part A no. 3 – Software piracy', 'The country with the highest *software piracy rate* is…', ['Libya', 'Sri Lanka', 'Venezuela', 'Bolivia'],
  'Note: the mock\'s key says Sri Lanka, but this fact is not in slide D11 (2026) and the figures depend on the survey year (BSA), so it cannot be verified from the slides. Statistics-recall questions like this are very unlikely to appear in the UTS; spend your time on IPR/licensing concepts. The mock\'s key (B) is recorded as is.')
mc('mfti-a-04', 'Part A no. 4 – IPR', 'The main function of IPR (Intellectual Property Rights) is',
  ['Protecting symbols, images, sounds, colours and smells', 'Protecting books, songs, stage performances, paintings, photos and films', 'Protecting trade secrets', 'The results of intellectual activity in art, science and industry'],
  'Option A = trademarks, B = copyright, C = trade secrets; each covers only one kind of IPR. Option D states the scope of IPR in general (the results of intellectual work in art, science and industry). Note: IPR is not in slide D11 (2026), so it cannot be verified; the mock\'s key (D) is followed because it is the most general.')
mc('mfti-a-05', 'Part A no. 5 – ITE Law', "The law that discusses freedom of speech on social media, exercised responsibly, is…",
  ['ITE Law No. 22 of 2012', 'ITE Law No. 11 of 2008', 'ITE Law No. 33 of 2019', 'ITE Law No. 01 of 2021'],
  'Slide D11 (slide 27, *Freedom vs. Social Responsibility*): Law No. 11 of 2008 on ITE. Its amendments are Law No. 19/2016 and Law No. 1/2024 (not "No. 01 of 2021"). The mock\'s key (B) is correct.')
mc('mfti-a-06', 'Part A no. 6 – Software licences', "The correct statement about *proprietary software* and *free software* is…",
  ['*Proprietary software* is not free to use and not free to modify, while *free software* is free to use but not free to modify', '*Proprietary software* is free to use but not free to modify, while *free software* is not free to use and not free to modify', '*Proprietary software* is free to use but not free to modify, while *free software* is free to use and free to modify', 'Both *proprietary* and *free software* are free to modify and free to use'],
  'Note: this question is flawed. By definition *free software* is free to modify (so option A is wrong in its second half), but *proprietary software* is not free of charge (so option C is wrong in its first half). Because the first half of A is correct and C is wrong, the mock\'s key (A) is followed as "closest". This topic is not in slide D11 (2026).')
mc('mfti-a-07', 'Part A no. 7 – Social engineering & fraud', "Look at the *terms* and their definitions: A. *Social engineering*, B. *Spoofing*, C. *Phishing*; 1. Pretending to be someone else and carrying out disruptive actions; 2. Obtaining deceptive ways to get sensitive information from other people; 3. Obtaining important information by pretending to be a trusted party *online*. The correct pairing is:",
  ['A1, B2, C3', 'A2, B3, C1', 'A2, B1, C3', 'A3, B1, C2'],
  '*Social engineering* = manipulating people into revealing sensitive information (2); *spoofing* = impersonating someone else (1); *phishing* = posing as a trusted party to steal information (3). Pairing: A2, B1, C3. The mock\'s key (C) is correct by the usual definitions (these terms are not covered in slide D11 2026).')
mc('mfti-a-08', 'Part A no. 8 – Computer viruses', "The type of virus that attacks by instructing users to click a link and attacks JPEG, JPG, and similar documents is named…",
  ['Iloveyou', 'Ransomware', 'Code Red', 'CryptoLocker'],
  'The ILOVEYOU worm (2000) spread through an "I LOVE YOU" email asking the victim to open an attachment, then overwrote image files (JPG/JPEG) and others. Ransomware/CryptoLocker encrypt files for ransom; Code Red attacked web servers. The mock\'s key (A) matches common knowledge; it is not in slide D11 (2026).')
mc('mfti-a-09', 'Part A no. 9 – Technology & politics', "A form of political movement, generally carried out ahead of elections, that uses technology to shape public opinion is called…",
  ['*Gerrymandering*', '*Grassroot movement*', 'Dawn raid (*serangan fajar*)', '*Black campaign*'],
  'A *black campaign* spreads negative/false information through digital media to shape public opinion. *Gerrymandering* = manipulating electoral district boundaries; *serangan fajar* = vote buying; a *grassroot movement* = a bottom-up movement from ordinary people. Note: this term is not in slide D11 (2026); the mock\'s key (D) is followed.')
mc('mfti-a-10', 'Part A no. 10 – Definition of AI', '"*Computational intelligence is the study of the design of intelligence agents*": this definition of AI belongs to the approach…',
  ['*Thinking humanly*', '*Acting humanly*', '*Thinking rationally*', '*Acting rationally*'],
  'Slide D11 (slide 39) gives 8 definitions in 4 approaches. The "design of intelligent agents" definition (Poole et al.) belongs to the *acting rationally* approach (agents that act to achieve the best outcome). The mock\'s key (D) is correct.')
mc('mfti-a-11', 'Part A no. 11 – Computer security', 'The concept of a *firewall* as a computer security technology is to…',
  ['Detect potential security breaches', 'Monitor and store computer transactions so that the trail of activity can be traced', "A form of data transmission in scrambled form to secure it during the sending process", 'Prevent unauthorised access to the internal network'],
  'A *firewall* filters network traffic and prevents unauthorised access to the internal network. Option A = IDS, B = *audit log*, C = encryption. The mock\'s key (D) is correct (not in slide D11 2026).')
mc('mfti-a-12', 'Part A no. 12 – AI in traffic', 'Look at the picture (a Google map with the *Typical traffic* layer, Friday 16:20). The picture shows an application of AI called…',
  ['*Traffic pattern*', '*Path finding*', '*Fastest route determination*', '*Time estimation*'],
  'Slide D11 (slide 48, *AI in Life: AI in Traffic*) labels route maps as *Path finding / Direction*, and the colour-coded congestion map "Typical traffic", as in the picture, as *Traffic pattern*. The mock\'s key (A) is correct.')
mc('mfti-a-13', 'Part A no. 13 – Addiction & digital violence', "The following is one way to avoid addiction and violence on social media…",
  ['Discussing problems face to face rather than on social media', 'Cutting off contact with family and friends', 'Spending 25 hours per week on digital media', 'Reducing social activities such as student activity units, student associations, clubs and so on'],
  'Slide D11 (slide 15, *Avoiding Addiction & Violence*): if there is a problem, talk about it directly (face to face); keep up relationships with family and friends; join social activities such as student clubs/associations; limit screen time. B, C and D contradict this advice. The mock\'s key (A) is correct.')
mc('mfti-a-14', 'Part A no. 14 – History of AI', 'According to the history of AI, one thing that happened during the period called *The First Burst* was…',
  ['The emergence of a system called XCON, built by Carnegie Mellon University', "IBM's *Deep Blue*, which could defeat humans in a chess match", 'The rise of Apple Siri, Google Driverless and AlphaGo', 'The emergence of an ordinary humanoid robot that can play music'],
  'Note: the term "The First Burst" is not used in slide D11 (2026), which uses a timeline (slide 40) with expert systems in the 1980s, Deep Blue in 1997, personal assistants in 2011-2014, and AlphaGo in 2016. Options A (XCON, an early-1980s expert system), B (1997) and C (2010s) are clearly not the earliest period, so the mock\'s key (D) is accepted by elimination.')
mc('mfti-a-15', 'Part A no. 15 – AI in games', 'OpenAI\'s use in Dota 2 is as…',
  ["A platform to automate the creation of *items* and *cheat scripts* in Dota 2 so that players can win more easily", "A public server provider for Dota 2 players so that they can play together with AI algorithms", "A bot trained through *reinforcement learning* to play Dota 2 that is able to face and even defeat human players", "An alternative *editor* for maps (*map editor*) so that the community can create new maps for Dota 2"],
  'Slide D11 (slide 44): *OpenAI Five* plays Dota 2 against human players (winning 99.4% in competitive play) and also plays cooperatively alongside humans. So it is a bot trained with *reinforcement learning*. The mock\'s key (C) is correct.')

PEN['mfti-b-1'] = { title: 'Part B no. 1 – Area of a trapezoid-shaped boarding-house room' }
EN['mfti-b-1a'] = {
  stem: 'Write Python code to help Rafa determine the area of an isosceles-trapezoid-shaped boarding-house room, given the lengths of the parallel sides!',
  hints: ['The problem gives no data other than the parallel sides. What else does the trapezoid area formula need?', 'Trapezoid area = (sum of the parallel sides) × height / 2.'],
  plan: 'read a, b, t (decimals); area ← (a + b) × t / 2; display area',
  wrong: [
    'The trapezoid area formula is (a + b) × t / 2; you forgot to divide by 2.',
    'Operator precedence: multiplication/division are done first. Add parentheses: (a + b) * t / 2.',
    'Room measurements can be decimals; use float(input()), not int(input()).',
  ],
  notes: [
    'Lecture-style program skeleton: title, specification, DECLARATIONS as comments, then ALGORITHM.',
    '`input()` returns a string, so it is wrapped in `float(...)`. float (not int) is used because room measurements can be decimals.',
    'The parentheses `(a + b)` are required: without them `b * t / 2` is evaluated first and the result is wrong. Dividing by `2` gives a float.',
    'A plain `print(luas)` is enough; no strings are joined, so `str()` is not needed.',
  ],
  explanation: 'Note: the question is missing data. The area of an isosceles trapezoid needs the height t (or the leg length, from which t = √(leg² − ((a−b)/2)²)). This solution reads a, b and t. If the original question meant to give the leg k, compute t first with `math.sqrt`. Formula: A = (a + b) × t / 2.',
  rub4: 'The program reads the data and uses the correct trapezoid area formula, and produces the correct output for all cases (including boundary cases)',
}
PEN['mfti-b-2'] = { title: 'Part B no. 2 – Numbers 1 to 50 and their sum' }
EN['mfti-b-2a'] = {
  stem: "Write Python programming code to display the numbers 1 to 50 and also compute the result of adding up the numbers from 1 to 50 (1+2+3+.....+49+50)!",
  wrong: [
    '`range(1, 50)` stops at 49. The upper bound is not included; use `range(1, 51)`.',
    '`total = 0` is inside the loop, so it is reset every iteration. Initialise before the loop.',
    'The question also asks you to display the numbers 1 to 50, not just the sum.',
  ],
  plan: 'total ← 0; for i from 1 to 50: display i, total ← total + i; display total',
  hints: ['The upper bound of `range` is not processed.', 'The accumulator must be initialised before the loop.'],
  notes: [
    'Title, specification and DECLARATIONS (i, total).',
    '`total = 0` before the loop: if it were inside the loop, the value would be reset every iteration.',
    '`range(1, 51)` produces 1..50. The upper bound is not included, hence 51.',
    'Loop body (indented): print i, then add it to total.',
    'Not indented, so it runs once after the loop. The correct result: 1275.',
  ],
  explanation: 'Use `for i in range(1, 51)`; inside, print `i` and accumulate it into `total`; print `total` (1275) after the loop.',
  rub4: 'The program displays 1..50 and computes the sum 1275 using a loop',
}
PEN['mfti-b-3'] = { title: 'Part B no. 3 – Output of the list average' }
EN['mfti-b-3a'] = {
  stem: 'Determine the output of the following Python program:',
  notes: [
    '`range(1, 11)` = 1..10 (11 is not included); `list(...)` turns it into a 10-element list.',
    'Two accumulators are initialised before the loop.',
    '`+=` is shorthand for `total = total + n`. After the loop: total = 55, count = 10.',
    'The `/` operator always produces a float in Python 3, so the result is `5.5`, not 5.',
    'Prints the float value b.',
  ],
  explanation: 'The sum of 1..10 = 55, the count = 10, so the average is 55 / 10 = 5.5. Because `/` produces a float, the output is `5.5`.',
}
PEN['mfti-b-4'] = { title: 'Part B no. 4 – Output when the input is 9' }
EN['mfti-b-4a'] = {
  stem: 'Determine the output of the following program if the user enters the number 9!',
  notes: [
    '`input("...")` displays a prompt (not part of the graded program output) and returns a string; `int(...)` turns it into 9.',
    'Initial values: r = 0, k = 1, count = 1. The pair (r, k) = two consecutive Fibonacci terms.',
    'The loop runs while count < n, i.e. count = 1..8, so 8 iterations (not 9).',
    'These three lines shift the pair: a = r + k is the next term, r takes the old k, k takes a. The order of assignments matters: `a` is computed first, before r and k are overwritten.',
    'count increases by 1 per iteration; if forgotten, the loop never ends.',
    'After the loop, k holds the 9th Fibonacci term.',
  ],
  explanation: 'The sequence of k: 1, 1, 2, 3, 5, 8, 13, 21, 34 (terms 1 to 9). The loop runs 8 times, so the final k = 34. This program computes the n-th Fibonacci number.',
}
PEN['mfti-b-5'] = {
  title: 'Part B no. 5 – Flowchart for average height',
  intro: 'The principal of a high school wants to find the average height of the students in a class. To do so, he calls all the students in that class and gathers them in the school health room to have their heights measured one by one. Because he does not know how many students are in the class, the principal intends to count them while measuring. Heights are measured in cm, and from a quick look it is clear that no student is shorter than 100 cm or taller than 200 cm.\n\nA teacher helps the principal measure the heights and record them. This teacher is rather careless and often enters wrong data. Wrong data (the problem says "weight", but it means height), i.e. less than 100 cm or greater than 200 cm, is not used to compute the average height.',
}
EN['mfti-b-5a'] = {
  stem: "Draw a flowchart that helps the Principal as a guide for computing the average height of the students in the class, where the input is a number of integers representing the students' heights. Reading input ends by entering the value -999 (not processed). Next, the result is the average height of the students in the class based on the data entered, without taking into account the wrongly entered data (that is, if the value is < 100 cm or > 200 cm). If there is no data that can be used to compute the average height, make the message \"Tidak ada data\" (no data).",
  wrong: [
    'Data outside 100..200 is also counted. Add a conditional: only process if 100 ≤ tinggi ≤ 200.',
    'Wrong data is < 100 or > 200, so 100 and 200 themselves are valid. Use ≥ and ≤.',
    '`banyak` is incremented for wrong data too, so the divisor is too large. Increment banyak only for valid data.',
    'If there is no valid data, banyak = 0 and a division by zero occurs. Check banyak = 0 and print "Tidak ada data".',
  ],
  plan: 'jumlah ← 0, banyak ← 0; read tinggi; while tinggi ≠ -999: if 100 ≤ tinggi ≤ 200 then add to jumlah and banyak; read the next tinggi; after the loop: if banyak = 0 print "Tidak ada data", otherwise print jumlah / banyak',
  hints: ['Which pattern applies: the amount of data is unknown and ends with a special value. The sentinel pattern: read first, loop, read the next at the end of the loop body.', 'There are two counters: the sum and the number of VALID data. Both only increase inside the range `if`.', 'After the loop, check banyak = 0 first before dividing.'],
  notes: [
    'Title, specification and DECLARATIONS. `rata : float` because it is the result of a division.',
    'Two accumulators are initialised before the loop (not inside it).',
    'First read before the loop: the sentinel pattern. If the user types -999 straight away, the loop never runs.',
    'The condition `!= -999`: the sentinel value is not processed.',
    'Data filter: valid if 100 ≤ tinggi ≤ 200. The bounds 100 and 200 themselves are valid (only < 100 or > 200 is wrong). Use `and`, not `or`.',
    'Only valid data is summed and counted.',
    'The next read is at the end of the loop body (aligned with the `if`, not inside it); if forgotten, the loop never stops.',
    'No valid data case: check banyak = 0 before dividing to avoid a ZeroDivisionError.',
    '`/` produces a float; the average is computed only when banyak > 0.',
  ],
  pnotes: [
    'Title and specification in `{ comment }`.',
    'KAMUS (DECLARATIONS): the type of each variable; `real` for the average.',
    'Initialisation and the first read before the `while`.',
    '`while (tinggi ≠ -999) do`: the sentinel is not processed.',
    'Valid-range filter; only valid data changes jumlah and banyak.',
    'The next read, aligned with the `if` inside the loop body.',
    'Final branch: no valid data → message; otherwise the average.',
  ],
  explanation: 'Pattern: read-until-sentinel + count-if (filter) + average with a division-by-zero guard. In the flowchart: Start terminator → initialise jumlah, banyak → input parallelogram for tinggi → diamond "tinggi ≠ -999?" (yes: diamond "100 ≤ tinggi ≤ 200?" → yes: process jumlah, banyak; then input tinggi again and go back up; no: continue) → diamond "banyak = 0?" → output "Tidak ada data" / compute rata and output → End.',
  rubric: [
    'Complete and correct flowchart: initialisation, sentinel reading, 100..200 filter, summing and counting valid data, handling of "Tidak ada data", and the average',
    'Minor error (e.g. the 100/200 bounds reversed, or a wrong symbol) that makes the solution imperfect',
    'Main logic is correct but one part is missing (e.g. the "Tidak ada data" case or the filter)',
    'Only part of the flow is correct (e.g. only reads and sums without the filter/sentinel)',
    'Flowchart is incorrect but some correct elements remain (input/output)',
    'No attempt or completely wrong answer',
  ],
}
PEN['mfti-b-6'] = { title: 'Part B no. 6 – Why computational thinking matters' }
EN['mfti-b-6a'] = {
  stem: "Explain why computational thinking ability is an important skill, especially in the 21st century!",
  answer: 'Many answers are valid. Example: the 21st century is marked by a digital world and by complex, data-driven problems. Computational thinking (decomposition, pattern recognition, abstraction, algorithms) trains us to break big problems into small parts, look for patterns, focus on what matters, and write clear solution steps. This ability is not limited to programmers: it is useful in every field (science, business, health, the arts), helps us work with computers/AI, make data-driven decisions, and solve new problems systematically.',
  rub4: 'Explains the reasons clearly: (1) relevance to the 21st century (digital, complex, data) and (2) the link to the CT pillars (decomposition, pattern recognition, abstraction, algorithms), with an example or benefit',
  keyPoints: ['Mentions the 21st-century context (technology/digital, complex problems, big data)', 'Mentions the CT pillars and their function', 'Benefits across fields, not just programming', 'A concrete example'],
  explanation: 'Free-form essay answer; mark against the rubric. Link it to slide D01: decomposition, pattern recognition, abstraction, algorithms.',
}

/* ---- mgem ---- */
mc('mgem-a-01', 'Part A no. 1 – Edutainment', 'A school wants to apply a teaching method in which students learn through interactive history video games. This concept is known as...',
  ['*Digital Classroom*', '*Gamification / Edutainment*', '*Remote Learning*', '*Social Engineering*'],
  'Slide D11 (slide 4): *Edutainment* combines education with entertainment. Learning history through an interactive game = edutainment/gamification. *Remote learning* = learning from a distance; *social engineering* is a form of fraud.')
mc('mgem-a-02', 'Part A no. 2 – Impact of automation on labour', 'Analyse the following impact of industrial automation. Which statement best describes the shift in labour trends caused by *Artificial Intelligence*?',
  ['The number of jobs increases because machines need more manual operators.', 'Routine and repetitive jobs decrease, but demand for analytical and creative *skills* increases.', 'All human jobs will be replaced by robots within the next 5 years.', 'Industry will return to manual methods because AI is too expensive.'],
  'Slide D11 (slides 5, 32, 34): automation takes over repetitive tasks (painting, welding, assembly) but opens up new jobs and "frees up" creativity. C and D are extreme and not supported by the slides; A contradicts the direction of automation.')
mc('mgem-a-03', 'Part A no. 3 – Identity theft', 'Someone uses another person\'s photo and personal data to create a fake social media account and commit fraud. This criminal act is categorised as...',
  ['*Cyberbullying*', '*Identity Theft*', '*Digital Divide*', 'Plagiarism'],
  'Slide D11 (slide 17): *identity theft* includes using someone else\'s account/data to spread slander or threats; here personal data is used for fraud. *Cyberbullying* is harassment; the *digital divide* is the gap in access.')
mc('mgem-a-04', 'Part A no. 4 – Social media ethics', 'According to the ITE Law and cyber ethics, what is the first step you should take if you find a provocative news item of unclear truth in the family WhatsApp group?',
  ['Immediately *forward* it to other groups so people stay alert.', 'Leave it alone to avoid conflict.', "Performing verification of the truth (*fact-checking*) before deciding to share or correct it.", 'Save it as a personal archive.'],
  'Slide D11 (slide 29): *Think before you post*; ITE Law Article 28 prohibits spreading false and misleading news. The right first step is to verify, not to forward.')
mc('mgem-a-05', 'Part A no. 5 – Generative AI ethics', 'In the context of *Generative AI* (such as ChatGPT or Midjourney), which ethical issue is most often debated regarding copyright?',
  ['AI cannot work without electricity.', 'AI uses the works of original artists/writers as training data without permission or compensation.', 'AI output is always worse than human work.', 'AI will take over the military world.'],
  'Slide D11 (slide 56): generative models learn from patterns in their training data. The copyright issue arises because original works are used as training data without permission/compensation. The other options are not copyright issues.')
mc('mgem-a-06', 'Part A no. 6 – Netiquette', 'What is the main function of *Netiquette* in digital communication?',
  ['As a formal law that is criminally binding.', "As an unwritten guide to manners for maintaining comfort and politeness in the digital space.", 'To increase internet connection speed.', 'To restrict freedom of expression completely.'],
  'Slide D11 (slides 24, 26): norms and ethics are only "guidelines" related to morality, unlike rules/laws, which carry sanctions. *Netiquette* is a norm/ethic.')
mc('mgem-a-07', 'Part A no. 7 – Smart Grid', '*Smart Grid* technology in power systems is an example of applying computing to...',
  ['Replace all electric cables with wireless ones.', 'Manage power distribution efficiently and automatically based on *real-time* data.', 'Permanently lower the electric voltage.', 'Remove the need for power plants.'],
  'A *smart grid* uses sensors and computing to monitor and regulate electricity distribution automatically and efficiently. Note: this example is not in slide D11 (2026); the answer follows the general definition.')
mc('mgem-a-08', 'Part A no. 8 – Characteristics of computational thinking', 'Which of the following is NOT a characteristic of *Computational Thinking*?',
  ['Being able to break a big problem into small parts.', 'Being able to think like a computer (binary 0s and 1s) literally.', 'Being able to recognise patterns from problems solved before.', 'Being able to abstract away unnecessary details.'],
  'Slide D01: the four CT pillars = decomposition, pattern recognition, abstraction, algorithms. A = decomposition, C = pattern recognition, D = abstraction. Thinking in binary literally is not a characteristic of CT.')
mc('mgem-a-09', 'Part A no. 9 – Definition of AI', 'In the AI approaches, a machine designed to act as well as possible to achieve a given goal (optimising the outcome) is categorised as...',
  ['*Thinking Humanly*', '*Acting Humanly*', '*Thinking Rationally*', '*Acting Rationally*'],
  'Slide D11 (slide 39): the four AI approaches. An agent that acts to obtain the best outcome = *acting rationally* (*rational agent*).')
mc('mgem-a-10', 'Part A no. 10 – Impact of social media algorithms', 'One negative impact of overly personalised social media algorithms (the *personalized feed*) is the creation of an *Echo Chamber*. What does this mean?',
  ['Users are exposed only to information that confirms their own opinions, closing their view to other perspectives.', 'Users hear an echo when playing videos.', 'Users get too many ads.', 'Users lose their personal data.'],
  'An *echo chamber*: recommendations (see the *recommender system*, D11 slide 47) show only content that matches the user\'s opinions. The term is not explicitly in the slides, but its definition is clear from option A.')
mc('mgem-a-11', 'Part A no. 11 – Grooming', '*Grooming* practices on the internet usually target victims who...',
  ['Have strong cybersecurity.', 'Are young or emotionally vulnerable.', 'Do not have a social media account.', 'Use pirated software.'],
  'Slide D11 (slide 11): *grooming* is a predator\'s effort to build a relationship with young or vulnerable individuals through technology for exploitation.')
mc('mgem-a-12', 'Part A no. 12 – Computing in geophysics', "In the field of Geophysics, computing is used to process *Remote Sensing* data. What is its purpose?",
  ['Making maps by hand.', 'Monitoring environmental change, weather and potential disasters remotely using satellite/sensor data.', 'Controlling the movement of tectonic plates.', 'Sending astronauts to the moon.'],
  '*Remote sensing* uses satellites/sensors to monitor the environment, weather and disasters. Note: this field example is not in slide D11 (2026), but it is consistent with "Computing Technology in Daily Lives".')
mc('mgem-a-13', 'Part A no. 13 – PDP Law', "Law No. 27 of 2022 in Indonesia specifically regulates about...",
  ['Digital Copyright.', '*E-Commerce* transactions.', 'Personal Data Protection (PDP).', 'Banking crime.'],
  'Slide D11 (slide 21): *Law No. 27 of 2022 concerning Personal Data Protection*.')
mc('mgem-a-14', 'Part A no. 14 – Algorithmic bias', "What is meant by *Algorithmic Bias* (Bias Algoritma)?",
  ['An algorithm that runs very slowly.', 'A systematic error in a computer system that creates unfair outcomes for certain groups of people (e.g. race or gender).', 'An algorithm that can only process even numbers.', 'Voltage bias in a computer\'s electric circuits.'],
  'Slide D11 (slide 58, *AI Dangers*): *Bias and Inaccuracies*; AI systems can reinforce bias when their training data is flawed or biased.')
mc('mgem-a-15', 'Part A no. 15 – Internet of Things', 'Which is an example of the *Internet of Things* (IoT) in a household?',
  ['Using Excel to record finances.', 'A smart fridge that detects when food stock runs out and sends a notification to the owner\'s phone.', 'Playing *offline* games on a PC.', 'Watching TV through an analogue antenna.'],
  'IoT = physical devices that are connected to the internet, sense their environment and communicate. A smart fridge that sends notifications is an example. Note: IoT is not covered in detail in slide D11 (2026).')

PEN['mgem-b-1'] = {
  title: 'Part B no. 1 – Smart Traffic Light',
  intro: 'Imagine you are asked to design a "Smart Traffic Light" system at a four-way intersection that is often congested. The light no longer just uses a fixed timer (red 60 seconds, green 30 seconds) but must be adaptive.',
}
EN['mgem-b-1a'] = {
  stem: "Use Decomposition to break this problem down into 3 main sub-components.",
  answer: 'Many answers are valid. Example: (1) Sensing/data collection: cameras or weight sensors on each approach count the number and type of waiting vehicles. (2) Decision making: an algorithm that decides which direction gets green and for how long based on the data (e.g. the longest queue, ambulance priority, a maximum time limit for fairness). (3) Light controller: switches the red-yellow-green lights, including safety gaps between phases and a backup mode if a sensor fails.',
  rubric: [
    'Breaks the problem into exactly 3 clear sub-components that are separate from each other and together make up the whole system (e.g. sensor/data, decision logic, light controller)',
    'Three sub-components are present, but some overlap or are unclear',
    'Only 1-2 sub-components are correct',
    'Sub-components are not correct, but some correct ideas remain',
    'No answer or completely wrong answer',
  ],
  keyPoints: ['Three clear sub-components', 'Each component has a different function (no overlap)', 'The components together solve the main problem'],
  explanation: 'Decomposition (slide D01 slide 19): dividing a big problem into small sub-problems that are solved separately.',
}
EN['mgem-b-1b'] = {
  stem: 'Use Abstraction to decide which data are important for the sensor (e.g. camera/weight sensor) to collect and which data should be ignored so the system is efficient.',
  answer: 'Important: the number of vehicles (queue length) on each approach, waiting time, whether a priority vehicle (ambulance, fire engine) is present, the current light state and the time since it was last green. Ignored: vehicle make, colour and licence plate, the driver\'s face/identity, passengers, the image background, detailed weather. Reason: only traffic load and priority affect the decision; the rest adds data load without changing the decision (and endangers privacy).',
  rubric: [
    'Names the important data with reasons AND the ignored data with reasons (efficiency, relevance to the decision)',
    'Important and ignored data are named, but the reasons are unclear or one item is wrong',
    'Names only the important data or only the ignored data',
    'Answer is not quite right, but one relevant data item is given',
    'No answer or completely wrong answer',
  ],
  keyPoints: ['Important data related to the decision (number of vehicles, waiting time, priority)', 'Irrelevant data is ignored (make, colour, plate)', 'Reason for abstraction: efficiency and relevance'],
  explanation: 'Abstraction (slide D01 slide 20): removing the unimportant parts of a problem and keeping what determines the solution.',
}

PEN['mgem-b-2'] = {
  title: 'Part B no. 2 – Simple ATM flowchart',
  intro: 'Draw a Flowchart for a Simple ATM system with the following logic:\n\n(a) The user enters a PIN. If it is wrong, give another chance, up to a maximum of 3 attempts in total. If it is wrong 3 times, the card is blocked and the process ends.\n(b) If the PIN is correct, show the menu: (1) Check Balance, (2) Withdraw Cash, (3) Exit.\n(c) In the Withdraw Cash menu: check whether the balance is sufficient. If yes, reduce the balance and dispense the cash. If not, display "Saldo Tidak Cukup" (insufficient balance).',
}
EN['mgem-b-2a'] = {
  stem: 'Draw the decision flow (*decision*) and repetition (*looping*) clearly. (Assumptions for testing: the correct PIN is 1234 and the initial balance is 1,000,000; the PIN, menu choices and withdrawal amount are read from input.)',
  wrong: [
    '`percobaan <= 3` gives 4 chances. A maximum of 3 attempts in total: use `percobaan < 3`.',
    'The balance is not reduced after a cash withdrawal. Add `saldo = saldo - jumlah`.',
    '"Balance is sufficient" means saldo ≥ jumlah; with `>` a withdrawal of exactly the whole balance is rejected.',
  ],
  plan: 'percobaan ← 0, benar ← false; repeat while percobaan < 3 and not yet benar: read the PIN, if it matches benar ← true, otherwise percobaan + 1; if not benar: "Kartu diblokir" (card blocked); if benar: repeat until pilihan = 3: read pilihan; 1 → show the balance; 2 → read jumlah, if saldo ≥ jumlah subtract it and dispense the cash, otherwise "Saldo Tidak Cukup"',
  hints: ['There are two separate loops: the PIN loop (at most 3 times) and the menu loop (until 3 is chosen).', 'The PIN loop stops for two reasons: the PIN is correct or the attempts have reached 3. Use a `benar` flag.', 'After the PIN loop, check the flag to decide between blocking and the menu.'],
  notes: [
    'Specification and DECLARATIONS. The correct PIN and initial balance are fixed only so the program can be tested.',
    'Initialisation before the loop: the attempt counter = 0 and the flag `benar = False`.',
    'The loop stops when there have been 3 wrong attempts or the PIN is already correct. `percobaan < 3` gives exactly 3 chances (0, 1, 2).',
    'Read the PIN. Match → set the flag; no match → percobaan increases. `percobaan` increases only in the wrong branch.',
    'After the PIN loop: a false flag means 3 failures, so the card is blocked and the program ends.',
    '`pilihan = 0` gives an initial value so the menu loop can be entered; the menu repeats until the user chooses 3 (Exit).',
    'Menu 1 only displays the balance; it does not change it.',
    'Menu 2: read the amount, then check sufficiency with `>=` so that withdrawing exactly the whole balance is allowed.',
    'Sufficient → balance reduced and cash dispensed; insufficient → message. Choice 3 is not processed at all: the loop stops at the next check.',
  ],
  pnotes: [
    'Title, specification, DECLARATIONS (a boolean value for the `benar` flag).',
    'Initialisation before the PIN loop.',
    'PIN loop: stops when correct or after 3 failures.',
    'Three wrong attempts: block.',
    'Menu loop with nested conditionals; a withdrawal checks saldo ≥ jumlah.',
  ],
  explanation: 'Two loops in sequence: (1) the PIN loop with a compound condition (percobaan < 3 and not yet benar), followed by a block/menu decision; (2) the menu loop until Exit, with a 1/2 branch and a "balance sufficient?" decision inside choice 2. Draw a diamond for each `if` and a return arrow for each loop. Note: the flowchart style is free; what is graded is the logical flow.',
  rubric: [
    'Correct and complete flowchart: PIN loop with at most 3 attempts, blocking, repeating menu, balance check, cash withdrawal with a sufficiency check',
    'Minor error (e.g. the exact number of 3 chances is wrong, or the balance is not reduced) that makes the solution imperfect',
    'Main flow is correct but one part is missing (e.g. the menu does not repeat or there is no Exit choice)',
    'Only part of the flow is correct (e.g. a PIN with no attempt limit, or no menu)',
    'Flowchart is incorrect, but some correct elements remain',
    'No attempt or completely wrong answer',
  ],
}

PEN['mgem-b-3'] = { title: 'Part B no. 3 – Debugging an average of scores' }
EN['mgem-b-3a'] = {
  stem: 'Look at the following Python code fragment, which aims to compute the average of a set of values entered by the user. The code has two logic/runtime errors (not just a *syntax error*). Find the errors, explain their cause, and write the fix!',
  notes: [
    'Error 1 (root cause): `input()` always returns a string, so `jumlah_data` is a str. Fix: `int(input(...))`.',
    'The accumulator is initialised before the loop: correct.',
    '`range(jumlah_data)` with a string raises a TypeError (a `str` cannot be an integer); a direct consequence of line 1. Once line 1 is fixed, this line is correct (0 to jumlah_data−1 = jumlah_data times).',
    'Error 1 (again): `nilai` is also a string. Use `float(input(...))` (or `int` if the values are whole numbers). `str(i+1)` in the prompt is already correct because i is an int.',
    'Symptom: `total + nilai` joins an int with a string, a TypeError. It becomes correct once line 5 is fixed.',
    '`/` produces a float. If jumlah_data = 0, a ZeroDivisionError occurs; for an exam program it is enough to mention this as an extra note.',
    'Error 2: `+` between a string and a float raises a TypeError. Wrap it with `str(rata_rata)`.',
  ],
  explanation: 'Two kinds of error: (1) data from `input()` is not converted to numbers: line 1 (`int`) and line 5 (`float`), so `range()` and `total + nilai` raise a TypeError; (2) line 9 joins a string with a number without `str()`. Optional: handle `jumlah_data = 0` so there is no division by zero.',
}

PEN['mgem-b-4'] = {
  title: 'Part B no. 4 – Progressive Parking Fee',
  intro: 'Write a Python program to compute a Progressive Parking Fee at a mall with these rules:\n\n- Fee for the first hour: Rp 5,000.\n- Fee for subsequent hours (hour 2 to hour 5): Rp 3,000 per hour.\n- Fee from hour 6 onwards: Rp 2,000 per hour.\n- If the total parking time is more than 12 hours, an additional fine of Rp 50,000 applies.\n- The maximum parking fee per day (before the fine) is Rp 100,000.',
}
EN['mgem-b-4a'] = {
  stem: 'Input: parking duration (integer hours). Output: total fee.',
  wrong: [
    'The maximum of Rp 100,000 is not applied yet.',
    'The fine applies only for "more than 12 hours" (> 12), not ≥ 12; and the 100,000 cap applies BEFORE the fine, not after it.',
    '`range(2, jam)` skips the last hour. The upper bound is not included: use `range(2, jam+1)`.',
  ],
  plan: 'biaya ← 5000; for hour 2 up to hour duration: if hour ≤ 5 add 3000, otherwise add 2000; biaya ← min(biaya, 100000); if duration > 12 add 50000; display biaya',
  hints: ['The first hour differs from the other hours; start from the first-hour fee, then process hour 2 onwards.', 'The order matters: cap at 100,000 first, then add the fine.'],
  notes: [
    'Specification, assumption (duration ≥ 1) and DECLARATIONS.',
    '`int(input())` because the duration is an integer.',
    'The first-hour fee goes directly into the initialisation (before the loop).',
    '`range(2, jam+1)` processes hour 2 up to hour `jam`; the upper bound is not included, hence the +1. For jam = 1 the loop does not run.',
    'The rate depends on the hour number: hours 2-5 → 3000; hour ≥ 6 → 2000.',
    'The maximum of 100,000 is applied BEFORE the fine (the question says "before the fine").',
    'The fine applies only if it is more than 12 hours: `> 12`, not `>= 12`. The fine is added after the cap, so the fee can be 150,000.',
    'A single final `print` with just the number; `str()` is not needed.',
  ],
  explanation: 'Compute hour by hour, apply the 100,000 cap, then the fine. Example: 13 hours = 5,000 (hour 1) + 4 × 3,000 (hours 2-5) + 8 × 2,000 (hours 6-13) = 33,000; because it is > 12 hours, add the 50,000 fine = 83,000. For 47 hours: 101,000 → capped at 100,000 → +50,000 = 150,000. Note: the question does not mention a duration of 0; it is assumed to be ≥ 1.',
  rub4: 'computes the tiered rates, the maximum cap and the fine in the correct order',
}

PEN['mgem-b-5'] = {
  title: 'Part B no. 5 – Hourglass pattern',
  intro: 'Write a Python program that takes an odd integer N as input (e.g. N = 5). The program must print an Hourglass pattern using the star character \'*\'.\n\nExample if the input N = 5:\n\n```\n*****\n ***\n  *\n ***\n*****\n```',
}
EN['mgem-b-5a'] = {
  stem: 'Use a nested loop (a for inside a for).',
  wrong: [
    'The pattern is not symmetric and has no leading spaces; N - 2*i can also be negative. In the lower half, the number of spaces decreases again (sp = N - 1 - i).',
    'The stars are right but there are no leading spaces, so the pattern is left-aligned. Add a loop for sp spaces before the stars.',
  ],
  plan: 'for each row i from 0 to N−1: leading spaces sp = i (upper half, up to the middle) or N−1−i (lower half); stars N − 2·sp; print the row',
  hints: ['Draw the pattern for N = 5 and write the number of spaces and stars for each row: spaces 0,1,2,1,0 and stars 5,3,1,3,5.', 'Spaces increase up to the middle row and then decrease; stars = N − 2 × spaces.'],
  notes: [
    'Specification and DECLARATIONS; `baris` is a string that gets built up.',
    '`int(input())`; N is guaranteed to be odd.',
    '`N // 2` (integer division) = the index of the middle row. For N = 5 it is 2.',
    'Outer loop: one iteration per row, i = 0..N−1.',
    'The number of spaces `sp`: goes up 0,1,2 to the middle row, then down 1,0 (N−1−i). This pattern makes the result symmetric.',
    'The row is cleared at every outer iteration; if it were initialised outside the loop, the rows would pile up.',
    'First inner loop: `sp` leading spaces.',
    'Second inner loop: the number of stars N − 2·sp (5, 3, 1, 3, 5). Reusing `j` is safe because the previous loop has finished.',
    'Print one whole row. The leading spaces matter; in a written exam, don\'t forget to shift the stars.',
  ],
  explanation: 'Use an outer loop per row and two inner loops (spaces, then stars). Spaces: 0,1,2,1,0; stars: 5,3,1,3,5 for N = 5. Formula: sp = min(i, N−1−i), stars = N − 2·sp.',
  rub4: 'prints a symmetric hourglass pattern with nested loops',
}

PEN['mgem-b-6'] = {
  title: 'Part B no. 6 – AnalisisBelanja (most expensive and second most expensive)',
  intro: 'You have an array containing the prices of items in a shopping cart:\n`harga = [15000, 50000, 2500, 50000, 30000, 15000, 10000]`\nWrite a function named `AnalisisBelanja(arr)` that returns two pieces of information:\n\n(a) The highest item price (if there are ties, take any one).\n(b) The second most expensive item (*Second Largest*). Be careful if the highest number appears twice: the second most expensive must be a number smaller than the main highest.',
}
EN['mgem-b-6a'] = {
  stem: 'Built-in functions such as `sort()`, `max()` or `set()` are forbidden. Use a manual iteration algorithm. (For testing, the program reads N and then N prices from input, calls the function, then prints the highest and the second highest; if there is no number smaller than the highest, the second = -1.)',
  wrong: [
    'Without the condition `arr[i] < t1`, a duplicate of the highest also becomes the "second". The second must be smaller than the highest.',
    'When a new highest is found, the old highest must be demoted to second (`t2 = t1`) before t1 is replaced.',
    'Initialising t2 = 0 makes "no second" read as 0; use a marker -1 that can never be a price.',
  ],
  plan: 'function: t1 ← arr[0], t2 ← -1; for i from 1 to the end: if arr[i] > t1 then t2 ← t1, t1 ← arr[i]; otherwise, if arr[i] < t1 and arr[i] > t2 then t2 ← arr[i]; return t1, t2',
  hints: ['Keep two variables: the largest and the second largest, in a single pass over the array.', 'When a value larger than t1 is found, the old t1 becomes the candidate for second.', "A value that is EQUAL to t1 must not become t2: use `<` instead of `<=`."],
  notes: [
    'Specification and DECLARATIONS of the main program.',
    'Function definition with the parameter `arr`; the function returns values (not `print`), as the question says "returns two pieces of information".',
    'Function specification and local declarations. Variables inside a function are known only inside it.',
    '`t1 = arr[0]`, not 0: safe even if all the prices are small/negative (max-min pattern).',
    '`t2 = -1` as a marker for "no second yet"; an item price cannot be negative.',
    '`range(1, len(arr))` starts at index 1 because index 0 is already the initial value; `len(arr)` is safe to use because it is not one of the forbidden functions.',
    'New highest: the old one drops to second (`t2 = t1`) BEFORE `t1` is replaced; the order matters.',
    'The second must be smaller than the highest (`arr[i] < t1`) but larger than the current second. A duplicate of the highest (another 50000) fails the first condition.',
    '`return t1, t2` returns two values (a tuple), received with `terbesar, kedua = ...`.',
    'Main program: creates the array `[0 for i in range(N)]` and fills it from input.',
    'Calls the function and prints both results.',
  ],
  explanation: 'One pass with two variables (t1, t2). For the example in the question the result is (50000, 30000): the duplicate 50000 must not become the "second", so the second = 30000. Note: the question does not say what to return when there is no smaller number; here -1 is used.',
  rub4: 'is a function that returns the highest and the second highest (strictly smaller) without sort/max/set',
}

/* ---- mpk: Part A ---- */
const pkA: [number, string, string, string[], string][] = [
  [1, 'Computing device', "The device that falls into the category of *computing device* is ...", ['Lamp', 'Refrigerator', 'Smartphone', 'Air conditioner'], 'A smartphone processes data (it has a CPU, memory and programs). An ordinary lamp, refrigerator or air conditioner is not a computing device (unless it is a "smart" version).'],
  [2, 'Operating system', "Software that functions as the interface between the user and the hardware is ...", ['*Word processor*', '*Web browser*', 'Operating system', '*Spreadsheet*'], 'The operating system mediates between the user/applications and the hardware. The other options are applications.'],
  [3, 'Input device', 'Which of the following is NOT an example of an *input device*?', ['*Keyboard*', '*Mouse*', '*Scanner*', 'Monitor'], 'A monitor is an output device.'],
  [4, 'Hardware', "The hardware whose task is to perform arithmetic and logic operations is ...", ['*Hard disk*', 'RAM', 'CPU', '*Motherboard*'], 'The CPU (the ALU inside it) performs arithmetic and logic operations.'],
  [5, 'Malware', 'Software designed to damage a computer system is called ...', ['*Malware*', '*Firmware*', '*Freeware*', '*Shareware*'], '*Malware* (*malicious software*) is designed to damage or infiltrate systems. *Firmware* = embedded software; *freeware* is free; *shareware* is try-before-you-buy.'],
  [6, 'Web protocol', 'The protocol used to access a *website* is ...', ['HTTP', 'FTP', 'SMTP', 'TCP/IP'], 'HTTP (HTTPS) is used by browsers to access the web. FTP is for file transfer, SMTP for email, and TCP/IP is the basic suite of internet protocols.'],
  [7, 'Computer networks', 'A computer network whose coverage is limited to a small geographic area is called ...', ['LAN', 'MAN', 'WAN', 'Internet'], 'LAN = *Local Area Network* (a building/small campus); MAN = a city; WAN = a wide area.'],
  [8, 'Digital privacy threats', "The following is a threat to privacy in the digital world ...", ['*Phishing*', '*Spam*', '*Cyberbullying*', 'All of the answers are correct'], 'Slide D11 covers threats in the digital world: identity theft, privacy threats (slides 17-20), and violence through the internet such as *cyberbullying* (slide 11). This question is a loose older version; the "all correct" option is chosen following the most plausible key.'],
  [9, 'Green computing', '*Green computing* is ...', ['The concept of using computing technology in an environmentally friendly way', 'Using computers to study the environment', 'Using computers for farming', 'Software for managing waste'], '*Green computing* = using computing in an energy-efficient and environmentally friendly way. This topic is not in slide D11 (2026) (only the discussion of AI\'s environmental impact on slide 61).'],
  [10, 'Copyright', 'Copyright falls into the category of ...', ['IPR', 'Human rights', 'ITE Law', 'Patent rights'], 'Copyright is one type of IPR (Intellectual Property Rights), besides patents and trademarks.'],
  [11, 'Open-source software', 'Software whose source code is open and can be modified is called ...', ['*Proprietary software*', '*Freeware*', '*Open-source software*', '*Shareware*'], '*Open-source* = the source code is open and may be modified. *Freeware* is free of charge but its code is closed.'],
  [12, 'Output device', 'Which of the following is NOT an example of an *output device*?', ['Monitor', '*Printer*', '*Speaker*', '*Keyboard*'], 'A *keyboard* is an input device.'],
  [13, 'Cybersecurity', '*Cybersecurity* is ...', ['Safety when surfing in cyberspace', 'Protection of computer systems and networks from digital attacks', 'Antivirus *software*', '*Firewall*'], '*Cybersecurity* = protecting systems and networks from digital attacks. Antivirus and firewalls are only tools within it.'],
  [14, 'CT pillars', "The following is not a pillar of computational thinking ...", ['Decomposition', 'Abstraction', 'Pattern recognition', 'Programming'], 'Slide D01 (slide 7): the 4 CT pillars = decomposition, pattern recognition, abstraction, algorithms. Programming is a way to apply them, not a pillar.'],
  [15, 'Decomposition', 'Dividing a big problem into smaller sub-problems is called ...', ['Abstraction', 'Decomposition', 'Algorithm', 'Generalisation'], 'Slide D01 (slide 19): decomposition = dividing a problem into sub-problems that are solved separately.'],
  [16, 'Pattern recognition', 'Identifying shared characteristics among various problems is called ...', ['Abstraction', 'Decomposition', 'Algorithm', 'Pattern recognition'], 'Pattern recognition = finding similarities/patterns in problems (slide D01 slide 14 onwards).'],
  [17, 'Abstraction', "Simplifying a problem by removing details that are not important is called ...", ['Abstraction', 'Decomposition', 'Algorithm', 'Generalisation'], 'Slide D01 (slide 20): abstraction = removing the unimportant parts of a problem.'],
  [18, 'Generalisation', 'Finding a general solution that can be applied to many similar problems is called ...', ['Abstraction', 'Decomposition', 'Algorithm', 'Generalisation'], 'Slide D01 (slide 20): abstraction used to obtain a general solution for similar problems is called generalisation.'],
  [19, 'Algorithm', 'A series of step-by-step instructions for solving a problem is called ...', ['Abstraction', 'Decomposition', 'Algorithm', 'Generalisation'], 'Definition of an algorithm: a clear, finite sequence of steps for solving a problem.'],
  [20, 'Flowchart', 'A *flowchart* is ...', ['A graphical representation of an algorithm', 'A programming language', 'An operating system', 'Application software'], 'A *flowchart* depicts an algorithm with symbols and arrows (slide D02).'],
  [21, 'Pseudocode', '*Pseudocode* is ...', ['A text representation of an algorithm', 'A programming language', 'An operating system', 'Application software'], '*Pseudocode* is an algorithm written in a semi-formal language (Liem notation in lectures), not a real programming language.'],
  [22, 'Sequence', '*Sequence* in an algorithm means ...', ['Repetition of instructions', 'Selection of instructions', 'Order of instructions', 'Grouping of instructions'], '*Sequence* = order; *selection* = choosing (if); *iteration* = repetition (loop).'],
  [23, 'Selection', '*Selection* in an algorithm means ...', ['Repetition of instructions', 'Selection of instructions', 'Order of instructions', 'Grouping of instructions'], '*Selection* = choosing instructions based on a condition (`if`).'],
  [24, 'Iteration', '*Iteration* in an algorithm means ...', ['Repetition of instructions', 'Selection of instructions', 'Order of instructions', 'Grouping of instructions'], '*Iteration* = repetition of instructions (`for`, `while`).'],
  [25, 'Array', 'The data structure that stores a collection of elements of the same data type is ...', ['*Array*', '*List*', '*Tuple*', '*Dictionary*'], 'An array = a collection of elements of the same type accessed by index (slide D06). In Python, an array is realised with a `list`; a Python `list` may actually mix types, so "same type" points to the array.'],
  [26, 'Array index', 'Each element in an *array* is accessed using ...', ['The variable name', 'The index', 'The data type', 'The element value'], 'Elements are accessed by index: `T[i]`, starting from 0.'],
  [27, 'Nested loop', 'A *nested loop* is ...', ['A *loop* inside a *loop*', 'A *loop* that repeats 2 times', 'A *loop* that never stops', 'A *loop* that uses an *array*'], 'A *nested loop* = a loop that sits inside the body of another loop.'],
  [28, 'Searching', 'The process of looking for an element in an *array* is called ...', ['*Sorting*', '*Searching*', '*Indexing*', '*Looping*'], 'Slide D06: *searching* for an element in an array, using the `found` flag pattern.'],
  [29, 'Sorting', 'The process of ordering the elements in an *array* is called ...', ['*Sorting*', '*Searching*', '*Indexing*', '*Looping*'], '*Sorting* = ordering the elements.'],
  [30, 'Function', 'A *function* in programming is ...', ['A reusable block of code', 'A variable', 'A data type', 'A *loop*'], 'Slide D10: a subprogram (function/procedure) is a named block of code that can be reused; a function returns a value through `return`.'],
  [31, 'Procedure', 'A *procedure* in programming is ...', ['A reusable block of code', 'A variable', 'A data type', 'A *loop*'], 'A procedure is also a reusable block of code; unlike a function, a procedure does not return a value (slide D10). The other options are clearly wrong.'],
  [32, 'Programming languages', "The following is not a programming language ...", ['Python', 'HTML', 'Java', 'C++'], 'HTML is a *markup language* (it marks up how a web page is displayed), not a programming language.'],
  [33, 'Interpreter', 'An *interpreter* is ...', ['*Software* that translates program code line by line', '*Software* that translates the whole program code at once', 'A programming language', 'An operating system'], 'An *interpreter* translates and runs code line by line (e.g. Python); a compiler translates the whole thing at once.'],
  [34, 'Compiler', 'A *compiler* is ...', ['*Software* that translates program code line by line', '*Software* that translates the whole program code at once', 'A programming language', 'An operating system'], 'A *compiler* translates the entire program into machine code at once before it runs.'],
  [35, 'OOP paradigm', 'The programming paradigm that focuses on objects and their interactions is called ...', ['Procedural programming', 'Object-oriented programming', 'Functional programming', 'Logic programming'], 'Object-oriented programming (OOP). Outside the WI1102 syllabus.'],
  [36, 'Functional paradigm', 'The programming paradigm that focuses on functions and their composition is called ...', ['Procedural programming', 'Object-oriented programming', 'Functional programming', 'Logic programming'], 'Functional programming. Outside the WI1102 syllabus.'],
  [37, 'Visual programming', 'Programming that uses visual representations to build programs is called ...', ['Visual programming', 'Procedural programming', 'Object-oriented programming', 'Functional programming'], 'Visual programming (e.g. Scratch): blocks/diagrams are used to assemble programs.'],
  [38, 'Spreadsheet', '*Software* designed for processing numbers and performing calculations is called ...', ['*Word processor*', '*Spreadsheet*', '*Database*', '*Presentation software*'], 'A *spreadsheet* (Excel) is for processing numbers and calculations.'],
  [39, 'Database', '*Software* designed for managing and organising data is called ...', ['*Word processor*', '*Spreadsheet*', '*Database*', '*Presentation software*'], 'A *database* (DBMS) manages and organises data.'],
  [40, 'Presentation software', '*Software* designed for creating visual presentations is called ...', ['*Word processor*', '*Spreadsheet*', '*Database*', '*Presentation software*'], '*Presentation software* (PowerPoint, Slides).'],
]
for (const [n, topic, stem, options, expl] of pkA) mc(`mpk-a-${String(n).padStart(2, '0')}`, `Part A no. ${n} – ${topic}`, stem, options, expl)

/* ---- mpk: Part B (short answers) ---- */
const pkOpenEn = (n: number, topic: string, stem: string, answer: string, keyPoints: string[]) => {
  PEN[`mpk-b-${n}`] = { title: `Part B no. ${n} – ${topic}` }
  EN[`mpk-b-${n}a`] = {
    stem, answer, keyPoints, explanation: 'A short answer; check it against the model answer and the key points.',
    rub4: 'Complete and correct answer as asked (the number of items and examples, if requested)',
  }
}
pkOpenEn(1, 'Python data types', "Name 3 (three) basic data types in Python and give 1 (one) example of each.",
  '`int` (whole number): `42`; `float` (fractional number): `3.14`; `str` (text): `"halo"`; `bool`: `True`. Any three of these are enough.', ['Three correct types (int, float, str, bool)', 'Each with a suitable example value'])
pkOpenEn(2, 'Python operators', 'Name 2 (two) kinds of operators in Python and give 1 (one) example of each.',
  'Arithmetic operators: `+`, `-`, `*`, `/`, `//`, `%`, `**` (e.g. `7 % 2`). Relational operators: `==`, `!=`, `<`, `>`, `<=`, `>=` (e.g. `a > b`). Logical operators: `and`, `or`, `not` (e.g. `x > 0 and x < 10`). Assignment operators: `=`, `+=`. Two kinds with examples are enough.', ['Two correct kinds of operators', 'An example expression for each'])
pkOpenEn(3, 'input() and print()', 'Explain the function of the `input()` and `print()` commands in Python.',
  '`input()` reads input from the user (keyboard) and returns it as a string, so `int()`/`float()` is needed for numbers. `print()` displays a value or text on the screen (output); to join a string with a number use `str()`.', ['input: reads input, the result is a string', 'print: displays output', 'Type conversion is mentioned (optional but good)'])
pkOpenEn(4, 'if-else syntax', 'Write the syntax of the `if-else` conditional in Python.',
  '```\nif (kondisi):\n    # action if the condition is true\nelse:\n    # action if the condition is false\n```\nWith more than two branches: `if (k1): ... elif (k2): ... else: ...`. Note the colon (`:`) and the indentation.', ['if (condition): followed by an indented block', 'else: followed by an indented block', 'Colon and indentation are correct'])
pkOpenEn(5, 'for syntax', 'Write the syntax of the `for` loop in Python.',
  '```\nfor i in range(awal, akhir+1):\n    # loop body\n```\n`range(a, b)` produces a, a+1, …, b−1 (the upper bound is not included). Example: `for i in range(1, N+1):` processes 1..N.', ['for variable in range(...):', 'The loop body is indented', 'The upper bound of range is not included'])
pkOpenEn(6, 'while syntax', 'Write the syntax of the `while` loop in Python.',
  '```\nwhile (kondisi):\n    # loop body\n    # change the condition variable so the loop stops\n```\nExample: `i = 1` then `while (i <= N): print(i); i = i + 1`. Forgetting to change `i` makes the loop never stop.', ['while (condition): followed by an indented block', 'The condition variable is updated so the loop stops'])
pkOpenEn(7, 'Compiler vs interpreter', 'Explain the difference between a compiler and an interpreter.',
  'A *compiler* translates the whole source program into machine code at once before it runs (e.g. C, C++); errors are found before execution and the result is usually faster. An *interpreter* translates and runs the code line by line (e.g. Python); it is easy to try and debug, but generally slower.', ['Compiler: the whole program at once', 'Interpreter: line by line', 'Example languages (optional)'])
pkOpenEn(8, 'Programming paradigms', 'Name 2 (two) programming paradigms other than procedural programming.',
  'Object-oriented programming (OOP) and functional programming. Other accepted alternatives: logic programming, declarative programming, visual programming.', ['Two valid paradigms other than procedural'])

/* ---- mpk: Part B no. 9, 10 ---- */
PEN['mpk-b-9'] = { title: 'Part B no. 9 – Area of a 5 cm × 3 cm rectangle' }
EN['mpk-b-9a'] = {
  stem: 'Write Python program code to compute the area of a rectangle with a length of 5 cm and a width of 3 cm.',
  wrong: ['That is the perimeter formula (16). Area = length × width.', 'Area is computed with multiplication, not addition.'],
  hints: ["Area of a rectangle = length × width. Store both in variables first."],
  notes: [
    'Title, specification and DECLARATIONS.',
    'Value assignment (`=`): the length and width are stored in variables rather than written directly in the formula so they are easy to change.',
    '`*` is multiplication; the result 15 is an int.',
    'Display the result. A plain `print(luas)` is enough: no strings are joined.',
  ],
  explanation: 'Area = 5 × 3 = 15 (cm²).',
  rub4: 'computes and displays the area 15',
}
PEN['mpk-b-10'] = { title: 'Part B no. 10 – Even or odd' }
EN['mpk-b-10a'] = {
  stem: "Write Python program code to determine whether a number is even or odd.",
  wrong: ['The result is reversed: a remainder of 0 means even.', 'Use `%` (remainder), not `/` (quotient).', '`=` is assignment; comparison uses `==`.'],
  plan: 'read N; if N mod 2 = 0 display "Genap" (even), otherwise "Ganjil" (odd)',
  hints: ['Even numbers are divisible by 2. Which operator gives the remainder?'],
  notes: [
    'Title, specification and DECLARATIONS.',
    '`int(input())` so that N is a number.',
    '`N % 2 == 0`: `%` = remainder, `==` = comparison (not `=`). This also holds for 0 and negative numbers.',
    'Two mutually exclusive and complete branches: remainder 0 → Genap (even), otherwise → Ganjil (odd).',
  ],
  explanation: 'N is even if `N % 2 == 0`; otherwise it is odd. In Python, `-3 % 2` is 1, so negative odd numbers are also detected correctly.',
  rub4: 'determines even/odd correctly',
}

/* ---- mpk: Part C ---- */
PEN['mpk-c-1'] = { title: 'Part C no. 1 – Area of a circle' }
EN['mpk-c-1a'] = {
  stem: 'Write a program to compute the area of a circle whose radius is entered by the user.\n\n- Use the value pi = 3.14159.\n- Display the area of the circle on the screen.',
  wrong: ['That is the circumference formula. Area = π × r × r.', 'The radius can be a decimal; use float(input()).', 'Squared means r × r, not r × 2.'],
  hints: ['Area of a circle = π × r². Store π in a variable.', 'The radius can be a fraction, so convert with float.'],
  notes: [
    'Title, specification and DECLARATIONS.',
    'π is stored in the variable `pi` (given as 3.14159), not `math.pi`, as the question specifies.',
    '`float(input())`: input() produces a string; float so that a decimal radius is accepted.',
    'r² is written `r * r` (`r ** 2` also works). Not `r * 2`.',
    'Displays the area; no strings are joined.',
  ],
  explanation: 'A = π r². With r = 2: 3.14159 × 4 = 12.56636.',
  rub4: 'reads the radius, uses π = 3.14159, and displays the area',
}
PEN['mpk-c-2'] = { title: 'Part C no. 2 – Largest of 3 numbers' }
EN['mpk-c-2a'] = {
  stem: "Write a program to determine the largest number among 3 (three) numbers entered by the user.",
  wrong: [
    '`maks = 0` is wrong if all the numbers are negative. Start from one of the numbers (A).',
    'The third number (C) is not compared.',
    'The second comparison compares A with C, not the running maximum with C; B, the largest, can be missed.',
  ],
  plan: 'read A, B, C; maks ← A; if B > maks then maks ← B; if C > maks then maks ← C; display maks',
  hints: ['Maximum pattern: assume the first is the largest, then compare one by one.'],
  notes: [
    'Title, specification and DECLARATIONS.',
    'Three inputs, one per line, each converted to int.',
    '`maks = A`, not 0: it fails if all the numbers are negative.',
    'Two separate `if`s (not if-else): each number is compared with the running maximum, so the input order does not matter.',
    'After both comparisons, `maks` is the largest.',
  ],
  explanation: 'The find-maximum pattern: initialise with the first number, then update whenever a larger one appears. A nested if-elif chain with `and` is also acceptable.',
  rub4: 'prints the largest for every combination, including negatives and ties',
}
PEN['mpk-c-3'] = { title: 'Part C no. 3 – Factorial' }
EN['mpk-c-3a'] = {
  stem: "Write a program to compute the factorial of a number that is entered by the user.",
  wrong: [
    'The multiplication accumulator must start at 1, not 0 (the result is always 0).',
    '`range(1, N)` does not process N; use `range(1, N+1)`.',
    '`hasil = 1` inside the loop resets the initial value on every iteration.',
  ],
  plan: 'read N; hasil ← 1; for i from 1 to N: hasil ← hasil × i; display hasil',
  hints: ['Similar to summing 1..N, but the operation is multiplication. What is the initial value of a multiplication accumulator?'],
  notes: [
    'Title, specification and DECLARATIONS.',
    '`int(input())`; N is a non-negative integer.',
    '`hasil = 1` (the identity element of multiplication). If it were 0, every product would become 0. It also makes 0! = 1 correct because the loop does not run.',
    '`range(1, N+1)` so that N is included; the upper bound is not included.',
    'Multiplicative accumulation: `hasil = hasil * i`.',
    'Printed once after the loop finishes.',
  ],
  explanation: 'N! = 1 × 2 × … × N, and 0! = 1. 5! = 120.',
  rub4: 'computes N! correctly, including N = 0',
}
PEN['mpk-c-4'] = { title: 'Part C no. 4 – Fibonacci series up to the n-th term' }
EN['mpk-c-4a'] = {
  stem: 'Write a program to print the Fibonacci series up to the n-th term, where n is entered by the user.',
  wrong: [
    'Prints n+1 terms. `range(n)` already gives n iterations.',
    'The first two Fibonacci terms are (0, 1) or (1, 1), not (1, 2).',
    'Wrong order of assignments: after `a = b`, the old value of a is lost. Store the sum in a temporary variable first (`c = a + b`).',
  ],
  plan: 'read n; a ← 0, b ← 1; repeat n times: display a; c ← a + b; a ← b; b ← c',
  hints: ['Each term is the sum of the two previous terms. Keep the last two terms.', 'When shifting, watch the order of assignments: you need a temporary variable.'],
  notes: [
    'Title, specification and DECLARATIONS. The question does not say whether the series starts from 0 or 1; here it starts 0, 1, 1, 2, …',
    'n = the number of terms to print.',
    'The first two terms: a = 0, b = 1.',
    '`range(n)` = exactly n iterations, one per term.',
    'Print the current term (a) before shifting.',
    'The shift: compute c = a + b, a ← the old b, b ← c. This order preserves the old values; writing `a = b` and then `b = a + b` is wrong.',
  ],
  explanation: 'Two variables (a, b) hold the last two terms. The series can start 0,1 or 1,1; the checker accepts both (the question does not specify). Note: output for n = 5 → 0 1 1 2 3.',
  rub4: 'prints exactly n Fibonacci terms',
}
PEN['mpk-c-5'] = { title: 'Part C no. 5 – Searching for a number in an array' }
EN['mpk-c-5a'] = {
  stem: 'Write a program to search for a number in an array entered by the user.\n\n- If the number is found, display its index.\n- If it is not found, display the message "Bilangan tidak ditemukan" (number not found).\n\n(Input for testing: N, then the N array elements, then the number to search for. If there are duplicates, display the first index.)',
  wrong: [
    'The loop runs to the end and idx gets overwritten, so the LAST index is printed. Stop at the first occurrence (a while with a flag).',
    'If it is not found, i equals N (outside the array) and the message is not printed. Check the `found` flag before printing.',
    'Array indices start from 0; do not add 1.',
  ],
  plan: 'read N and fill T; read X; i ← 0, found ← false; while i < N and not yet found: if T[i] = X then found ← true, otherwise i ← i + 1; if found display i, otherwise display the message',
  hints: ['Search pattern: traverse the array with a `found` flag; stop when found.', 'Increase i only in the else branch so that i points to the element that was found.'],
  notes: [
    'Title, specification and DECLARATIONS (the array T and the flag found).',
    'Read N, create the array `[0 for i in range(N)]`, then fill it from input. Indices 0..N−1.',
    'X is the number to search for.',
    'Initialisation: start from the first element and the flag found = False (not found yet).',
    'Compound condition: `i < N` prevents an out-of-range index, `found == False` stops the loop as soon as it is found.',
    'If it matches, set the flag; i is not incremented, so it still points to the element found.',
    'i increases only in the `else` (no match); if it increased in both branches, the printed index would be off by one.',
    'Leaving the loop because it was found or the array ran out; check the flag to decide the output. If not found, i = N (not a valid index).',
  ],
  explanation: 'Linear search with a flag. The result is the index (from 0) of the first occurrence.',
  rub4: 'displays the index if found and the message if not',
}

const applyEn = (ps: Problem[]) => {
  for (const p of ps) {
    const pe = PEN[p.id]
    if (!pe) throw new Error('no EN title for ' + p.id)
    p.en = pe.intro ? { title: pe.title, intro: pe.intro } : { title: pe.title }
    for (const q of p.parts) {
      const e = EN[q.id]
      if (!e) throw new Error('no EN for ' + q.id)
      const { rubric, rub4, notes, pnotes, wrong, ...rest } = e
      q.en = rest
      const chk = (what: string, a: unknown[] | undefined, b: unknown[] | undefined) => {
        if ((a?.length ?? 0) !== (b?.length ?? 0)) throw new Error(`${q.id}: ${what} length mismatch`)
      }
      if ('lineNotes' in q) { chk('lineNotes', q.lineNotes, notes); q.lineNotes?.forEach((n, i) => { n.en = notes![i] }) }
      if (q.kind === 'program') {
        chk('pseudoNotes', q.pseudoNotes, pnotes); q.pseudoNotes?.forEach((n, i) => { n.en = pnotes![i] })
        chk('wrong', q.wrong, wrong); q.wrong?.forEach((w, i) => { w.msgEn = wrong![i] })
      }
      if ('rubric' in q && q.rubric) {
        if (rubric) { chk('rubric', q.rubric, rubric); q.rubric.forEach((r, i) => { r.descEn = rubric[i] }) }
        if (rub4) q.rubric[0].descEn = rub4
      }
    }
  }
}
applyEn([...ftiProblems, ...gemProblems, ...pkProblems])

/* ------------------------------- papers ------------------------------- */

const papers: Paper[] = [
  {
    id: 'mock-fti25', title: 'Mock Up UTS WI1102 (Acads FTI 25)', kind: 'mock' as const, lang: 'id' as const,
    note: 'Student-made (Acads FTI 25), unofficial. The mock\'s multiple-choice keys were checked against slide D11; some questions (nos. 3, 4, 6, 9, 14) are not in the 2026 slides and are flagged. Essay question no. 1 is missing data (the trapezoid\'s height).',
    noteId: 'Buatan mahasiswa (Acads FTI 25), tidak resmi. Kunci pilihan ganda mock sudah dicek dengan slide D11; beberapa soal (no. 3, 4, 6, 9, 14) tidak ada di slide 2026 dan dicatat. Soal esai no. 1 kekurangan data (tinggi trapesium).',
    problems: ftiProblems.map((p) => p.id),
  },
  {
    id: 'mock-gemini', title: 'Mock Up UTS WI1102 (dibuat Gemini)', kind: 'mock' as const, lang: 'id' as const,
    note: 'Generated by AI from the slides, unofficial; no key (answered and checked against the slides). Question no. 3 (debugging) says "two errors": it is really two kinds of error across three lines.',
    noteId: 'Dibuat oleh AI dari slide, tidak resmi; tanpa kunci (dijawab dan dicek ke slide). Soal no. 3 (debugging) menyebut "dua kesalahan": sebenarnya dua jenis kesalahan di tiga baris.',
    problems: gemProblems.map((p) => p.id),
  },
  {
    id: 'mock-pengkom', title: 'Mock Up UTS Pengkom (KU1102 Stream Pemrograman, 27 April 2024)', kind: 'mock' as const, lang: 'id' as const, minutes: 120, year: 2024,
    note: 'A mock from the older course "Pengenalan Komputasi" (KU1102): many items on hardware, networks and paradigms are outside the WI1102 syllabus (marked out-of-scope). No key: answered by hand and checked against slides D01/D02/D05/D06/D10.',
    noteId: 'Mock dari mata kuliah lama "Pengenalan Komputasi" (KU1102): banyak butir perangkat keras, jaringan, dan paradigma di luar silabus WI1102 (ditandai out-of-scope). Tanpa kunci: dijawab sendiri dan dicek ke slide D01/D02/D05/D06/D10.',
    problems: pkProblems.map((p) => p.id),
  },
]

export const bank: BankFile = {
  problems: [...ftiProblems, ...gemProblems, ...pkProblems],
  papers,
  flashcards: [],
}
