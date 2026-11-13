// OFFICIAL grading guide ("Petunjuk Penilaian") for UTS WI1102 Berpikir Komputasional, 16 Nov 2024, Bagian II, Soal 1-6.
// Questions, "Alternatif Jawaban" and every "Rubrik Penilaian" are transcribed from the guide (UTS2024_PetunjukPenilaian_BagII, 12 pp).
// Weights from "Cara Penilaian" are part weights; paper weights S1 20%, S2 20%, S3-S6 15%.
// Note: TraceQ has no `rubric` field, so the official rubric rows for the reading items (S5a/b, S6a-c) are given as a table in `explanation`.
import type { BankFile, RubricRow } from '../types'

const r = String.raw
const withEn = (rows: RubricRow[], en: string[]): RubricRow[] => rows.map((row, i) => ({ ...row, descEn: en[i] }))
const SRC = 'UTS2024_PetunjukPenilaian_BagII'
const ref = (page: number) => ({ src: SRC, page })

/* ------------------------------------------------------------------ official rubrics, verbatim */
const RB_1A: RubricRow[] = withEn([
  { score: 4, desc: 'Kombinasi yang diberikan tepat memenuhi semua constraint' },
  { score: 3, desc: 'Kombinasi yang diberikan memenuhi hanya dua constraint, misalnya jumlahnya enam dan semua hidangan muncul maksimum 2 kali, tapi ukurannya untuk hidangan yang sama ada ukurannya yang sama' },
  { score: 2, desc: 'Kombinasi yang diberikan memenuhi hanya salah satu constraint' },
  { score: 1, desc: 'Kombinasi yang diberikan tidak memenuhi constraint yang ditetapkan, tapi masih ada aspek yang benar.' },
  { score: 0, desc: 'Tidak mengerjakan atau jawaban sama sekali salah.' },
], [
  "The combination given satisfies all constraints exactly",
  "The combination given satisfies only two constraints, for example the total is six and every dish appears at most 2 times, but for the same dish there are entries with the same size",
  "The combination given satisfies only one of the constraints",
  "The combination given does not satisfy the stated constraints, but some aspects are still correct.",
  "Not attempted, or the answer is entirely wrong.",
])
const RB_1B: RubricRow[] = withEn([
  { score: 4, desc: 'Penjelasan mengandung aspek abstraksi (menentukan hal penting) dan dekomposisi (merumuskan constraints) sesuai deskripsi jawaban di atas.' },
  { score: 3, desc: 'Penjelasan mengandung aspek abstraksi dan dekomposisi sesuai deskripsi jawaban di atas, tetapi ada satu buah kesalahan, misalnya: pada dekomposisi ada aturan tambahan yang ditetapkan (tidak sesuai dengan soal atau bukan hal penting) atau ada hal penting yang didefinisikan padahal tidak tepat atau tidak sesuai soal.' },
  { score: 2, desc: 'Penjelasan yang benar hanya untuk salah satu aspek saja (dekomposisi/abstraksi).' },
  { score: 1, desc: 'Secara umum penjelasan untuk dekomposisi dan abstraksi tidak tepat, tetapi masih ada hal benar dalam statement jawaban.' },
  { score: 0, desc: 'Tidak menjawab atau jawaban sama sekali salah.' },
], [
  "The explanation contains the aspects of abstraction (determining what is important) and decomposition (formulating the constraints) as described in the answer description above.",
  "The explanation contains the aspects of abstraction and decomposition as described in the answer description above, but with one error, for example: in the decomposition an extra rule is imposed (not in the problem or not important), or something is defined as important although it is incorrect or does not fit the problem.",
  "The explanation is correct for only one aspect (decomposition or abstraction).",
  "In general the explanation of decomposition and abstraction is not correct, but the answer still contains some correct statements.",
  "No answer, or the answer is entirely wrong.",
])
const RB_2A: RubricRow[] = withEn([
  { score: 4, desc: 'Sistem klasifikasi hierarkis benar (menunjukkan klasifikasi dan ada hierarki yang benar dan jelas terdefinisi)' },
  { score: 3, desc: 'Sistem klasifikasi hierarkis secara umum benar, tetapi ada satu aspek yang salah.' },
  { score: 2, desc: 'Memberikan klasifikasi berdasarkan satu kolom tertentu, tetapi tidak ada hierarki. Membuat klasifikasi yang hierarkis, tetapi berdasarkan kolom yang tidak tepat karena nilai-nilai kolomnya sangat berbeda satu sama lain sehingga kurang tepat untuk klasifikasi, misalnya tingkat 1 berdasarkan Judul Buku, tingkat 2 berdasarkan tahun terbit.' },
  { score: 1, desc: 'Masih ada aspek yang tepat dari jawaban, tetapi secara umum jawaban tidak tepat.' },
  { score: 0, desc: 'Tidak menjawab atau jawaban salah total.' },
], [
  "The hierarchical classification system is correct (it shows a classification and the hierarchy is correct and clearly defined)",
  "The hierarchical classification system is generally correct, but one aspect is wrong.",
  "Gives a classification based on one particular column, but there is no hierarchy. Or builds a hierarchical classification, but on an unsuitable column because its values differ so much from one another that it is a poor basis for classification, for example level 1 based on Book Title, level 2 based on year of publication.",
  "Some aspects of the answer are still correct, but in general the answer is not correct.",
  "No answer, or the answer is wrong entirely.",
])
const RB_2B: RubricRow[] = withEn([
  { score: 4, desc: 'Klasifikasi pada soal 2.a. minimum bernilai 3 dan penjelasan lengkap dan benar.' },
  { score: 3, desc: 'Klasifikasi pada soal 2.a. minimum bernilai 3, penjelasan ada, tetapi ada kesalahan pada penjelasan.' },
  { score: 2, desc: 'Klasifikasi pada soal 2.a. bernilai 1 atau 2, tetapi penjelasan tepat dan baik. Penjelasan tepat dan baik, tapi tidak sesuai dengan klasifikasi yang disebutkan di soal 2.a atau soal 2.a. tidak menjawab.' },
  { score: 1, desc: 'Penjelasan tidak lengkap, tetapi masih ada yang benar.' },
  { score: 0, desc: 'Tidak menjawab atau jawaban sama sekali salah.' },
], [
  "The classification in question 2.a is worth at least 3 and the explanation is complete and correct.",
  "The classification in question 2.a is worth at least 3 and an explanation is given, but the explanation contains errors.",
  "The classification in question 2.a is worth 1 or 2, but the explanation is correct and good. Or the explanation is correct and good but does not match the classification stated in question 2.a, or question 2.a was not answered.",
  "The explanation is incomplete, but some of it is still correct.",
  "No answer, or the answer is entirely wrong.",
])
const RB_2C: RubricRow[] = withEn([
  { score: 4, desc: 'Kode yang diberikan seluruhnya benar, boleh ada kesalahan minor (karena kurang teliti) dan sesuai dengan pola yang ditetapkan pada soal 2.a dan 2.b' },
  { score: 3, desc: 'Kode secara umum benar, tetapi sebagian kecil tidak mengikuti pola yang ditetapkan pada soal 2.a dan 2.b' },
  { score: 2, desc: 'Kode yang diberikan mengikuti pola tertentu dengan benar, tapi tidak sesuai dengan pola klasifikasi hierarki pada soal 2.a dan 2.b. Cara membuat kode, sebagian sesuai dengan pola pada soal 2.a dan 2.b tetapi sebagian lagi tidak.' },
  { score: 1, desc: 'Masih ada bagian kode yang benar, tapi sebagian besar salah' },
  { score: 0, desc: 'Tidak menjawab atau jawaban salah total.' },
], [
  "The codes given are entirely correct (minor errors from carelessness are allowed) and follow the pattern defined in questions 2.a and 2.b",
  "The codes are generally correct, but a small part does not follow the pattern defined in questions 2.a and 2.b",
  "The codes follow some pattern correctly, but not the hierarchical classification pattern of questions 2.a and 2.b. Or the way the codes are made partly follows the pattern of questions 2.a and 2.b and partly does not.",
  "Some parts of the codes are correct, but most are wrong",
  "No answer, or the answer is wrong entirely.",
])
const RB_3: RubricRow[] = withEn([
  { score: 4, desc: 'Urutan langkah dapat digunakan untuk menggambarkan bentuk dengan tepat sesuai instruksi' },
  { score: 3.5, desc: 'Ada kesalahan kecil yang menyebabkan solusi tidak sempurna' },
  { score: 3, desc: 'Urutan langkah kurang, tapi secara umum masih akan menghasilkan bentuk yang diharapkan walaupun tidak sempurna, Ada perintah-perintah yang seharusnya bisa diulang (dengan perintah repeat) tapi dituliskan berjajar, namun hasil eksekusi benar.' },
  { score: 2, desc: 'Hanya sebagian urutan langkah akan menghasilkan sebagian bentuk yang diharapkan. Termasuk jika tejadi sebuah kesalahan (walaupun hanya 1 langkah) yang menyebabkan bentuk tidak tergambar dengan benar, tetapi sebenarnya masih mengarah ke bentuk yang yang diharapkan.' },
  { score: 1, desc: 'Hanya sebagian kecil dari urutan langkah menghasilkan bentuk yang benar.' },
  { score: 0, desc: 'Salah total, atau tidak mengerjakan.' },
], [
  "The sequence of steps draws the shape exactly as instructed",
  "A minor error makes the solution imperfect",
  "The sequence of steps is lacking, but in general would still produce the expected shape, though imperfectly. Some commands that could have been repeated (with repeat) are written out one after another, but the execution result is correct.",
  "Only part of the sequence of steps would produce part of the expected shape. This includes the case where a single error (even one step) means the shape is not drawn correctly, although it still clearly heads toward the expected shape.",
  "Only a small part of the sequence of steps produces the correct shape.",
  "Completely wrong, or not attempted.",
])
const RB_4: RubricRow[] = withEn([
  { score: 4, desc: 'Program lengkap dan secara umum tepat, masih boleh ada kesalahan minor' },
  { score: 3.5, desc: 'Program sebagian besar benar, tetapi ada 1 kesalahan minor pada program' },
  { score: 3, desc: 'Ada kesalahan pada sebagian kecil bagian program' },
  { score: 2, desc: 'Secara umum hanya setengah bagian dari program yang tepat' },
  { score: 1, desc: 'Hanya ada sebagian kecil jawaban yang benar' },
  { score: 0, desc: 'Tidak dikerjakan atau jawaban' },
], [
  "The program is complete and generally correct; minor errors are still allowed",
  "The program is mostly correct, but has 1 minor error",
  "There are errors in a small part of the program",
  "In general only half of the program is correct",
  "Only a small part of the answer is correct",
  "Not attempted, or the answer (the source text is cut off here; presumably \"is entirely wrong\")",
])
const RB_5C: RubricRow[] = withEn([
  { score: 4, desc: 'Jawaban benar' },
  { score: 3, desc: 'Jawaban secara umum benar, tapi ada sebagian kecil aspek salah' },
  { score: 2, desc: 'Hanya setengah jawaban benar' },
  { score: 1, desc: 'Hanya sebagian kecil jawaban benar' },
  { score: 0, desc: 'Tidak menjawab, atau tidak ada jawaban yang benar' },
], [
  "The answer is correct",
  "The answer is generally correct, but a small part of it is wrong",
  "Only half of the answer is correct",
  "Only a small part of the answer is correct",
  "No answer, or no correct answer",
])
const RB_5AB_TABLE = [
  '**Rubrik Penilaian Soal 5.a dan 5.b (resmi, verbatim):**',
  '',
  '| Nilai | Deskripsi | Indeks |',
  '|---|---|---|',
  '| 4 | C1 dan C2 benar | A |',
  '| 2 | C1 atau C2 saja yang benar | C |',
  '| 0 | Tidak ada jawaban benar | E |',
].join('\n')
const RB_6_TABLE = [
  '**Rubrik Penilaian untuk soal 6.a, 6.b, dan 6.c (resmi, verbatim):**',
  '',
  '| Nilai | Deskripsi | Indeks |',
  '|---|---|---|',
  '| 4 | Output program benar dan penjelasan tepat | A |',
  '| 3 | Output program benar, tetapi ada kesalahan pada bagian penjelasan | B |',
  '| 2 | Output program benar, tapi tidak menjelaskan jawaban atau penjelasan salah total. | C |',
  '| 1 | Masih ada bagian jawaban yang tepat, tapi sebagian besar salah. | D |',
  '| 0 | Tidak dikerjakan atau jawaban salah total. | E |',
].join('\n')

/* ------------------------------------------------------------------ Soal 1: checker */
const S1_CHECK = r`def check(ans):
    # ans: daftar sel [baris, kolom] yang dicentang; baris = genre, kolom = kemasan
    cells = set((r, c) for r, c in ans)
    errs = []
    if len(cells) != 6:
        errs.append(["Harus tepat 6 buku di sel yang berbeda (sekarang " + str(len(cells)) + ").", "There must be exactly 6 books in different cells (currently " + str(len(cells)) + ")."])
    kemasan = ['Buku saku', 'Hardcover', 'E-book']
    genre = ['Fiksi', 'Seni', 'Sejarah', 'Sains']
    for c in range(3):
        n = sum(1 for r, cc in cells if cc == c)
        if n != 2:
            errs.append(["Kemasan " + kemasan[c] + " harus tepat 2 buku (sekarang " + str(n) + ").", "Packaging " + kemasan[c] + " must have exactly 2 books (currently " + str(n) + ")."])
    for r in range(4):
        n = sum(1 for rr, c in cells if rr == r)
        if n < 1 or n > 2:
            errs.append(["Genre " + genre[r] + " harus muncul 1 atau 2 kali dengan kemasan berbeda (sekarang " + str(n) + ").", "Genre " + genre[r] + " must appear 1 or 2 times with different packaging (currently " + str(n) + ")."])
    return errs`

/* ------------------------------------------------------------------ Soal 4: suhu */
const S4_PY = r`# Data_Suhu_Udara
# Menerima suhu harian 7 hari terakhir ke dalam array, menentukan tren (NAIK / TURUN / STABIL)
# berdasarkan banyak kenaikan dan penurunan antarhari, dan menghitung rerata suhu.
# DECLARATIONS
# T : array of int
# i, naik, turun, total : int
# rerata : float
# tren : str
# ALGORITHM
T = [0 for i in range(7)]
for i in range(7):
    T[i] = int(input("Masukkan suhu hari-" + str(6 - i) + ": "))
naik = 0
turun = 0
total = T[0]
for i in range(1, 7):
    if (T[i] > T[i - 1]):
        naik = naik + 1
    elif (T[i] < T[i - 1]):
        turun = turun + 1
    total = total + T[i]
if (naik > turun):
    tren = "NAIK"
elif (turun > naik):
    tren = "TURUN"
else:
    tren = "STABIL"
rerata = total / 7
print("Tren suhu harian " + tren)
print("Rerata suhu harian " + str(rerata))`

const S4_JUDGE = r`def judge(stdin, out, ref_out):
    import re
    t = [int(x) for x in stdin[:7]]
    naik = sum(1 for i in range(1, 7) if t[i] > t[i - 1])
    turun = sum(1 for i in range(1, 7) if t[i] < t[i - 1])
    tren = 'naik' if naik > turun else ('turun' if turun > naik else 'stabil')
    avg = sum(t) / 7
    low = out.lower()
    found = [w for w in ('naik', 'turun', 'stabil') if w in low]
    if found != [tren]:
        return "The daily temperature trend should be " + tren.upper() + " (" + str(naik) + " rises, " + str(turun) + " falls)."
    nums = [float(x) for x in re.findall(r'-?\d+(?:[.,]\d+)?', low.replace(',', '.'))]
    if not any(abs(x - avg) < 0.01 for x in nums):
        return "The daily average temperature should be about " + str(round(avg, 4)) + "."
    return None`

const S4_TESTS = [
  { name: 'Example: DOWN trend', stdin: ['25', '26', '24', '23', '22', '20', '23'] },
  { name: 'Example: UP trend', stdin: ['27', '27', '28', '31', '29', '28', '30'] },
  { name: 'Example: STABLE trend', stdin: ['28', '28', '29', '28', '26', '26', '28'], edge: 'number of rises = number of falls → STABLE' },
  { name: 'Only the last pair rises', stdin: ['20', '20', '20', '20', '20', '20', '25'], edge: 'the pair (day before, today) must also be compared (index 6)' },
  { name: 'All temperatures equal', stdin: ['30', '30', '30', '30', '30', '30', '30'], edge: 'no rise/fall → STABLE' },
  { name: 'Negative temperatures', stdin: ['-3', '-5', '-8', '-6', '-9', '-12', '-10'], edge: 'temperatures below zero: negative average' },
]

/* ------------------------------------------------------------------ Soal 6: program pajak */
const pajak = (pend: number, anak: number, sumb: number) => [
  '# input:',
  '# - pendapatan dalam setahun',
  '# - jumlah anak',
  '# - sumbangan wajib dalam setahun (misal zakat)',
  `pendapatan = ${pend}       # ganti nilai input sesuai pertanyaan di bawah`,
  `jumlah_anak = ${anak}      # ganti nilai input sesuai pertanyaan di bawah`,
  `sumbangan_wajib = ${sumb} # ganti nilai input sesuai pertanyaan di bawah`,
  '',
  '# pendapatan tidak kena pajak (ptkp) berdasarkan jumlah anak',
  'ptkp = [60, 70, 80, 90]',
  'if jumlah_anak > 3:',
  '  jumlah_anak = 3',
  '',
  '# tarif pajak progresif',
  'tarif = [0.1, 0.2, 0.3, 0.4]',
  'batas_bawah_tarif = [0, 60, 250, 1000]',
  '',
  '# hitung pajak progresif berdasarkan pendapatan kena pajak (pkp)',
  '',
  'pkp = pendapatan - sumbangan_wajib - ptkp[jumlah_anak]',
  'index_tarif = 0',
  'total_pajak = 0',
  'total_pkp_progresif = 0',
  '',
  'while index_tarif < len(tarif) and pkp > batas_bawah_tarif[index_tarif]:',
  '  if index_tarif == len(tarif)-1 or pkp < batas_bawah_tarif[index_tarif+1]:',
  '    pkp_or_batas_atas = pkp',
  '  else:',
  '    pkp_or_batas_atas = batas_bawah_tarif[index_tarif+1]',
  '',
  '  pkp_progresif = pkp_or_batas_atas - batas_bawah_tarif[index_tarif]',
  '  pajak_progresif = pkp_progresif * tarif[index_tarif]',
  '  total_pajak = total_pajak + pajak_progresif',
  '  index_tarif += 1',
  '',
  'print("Pajak Penghasilan (PPh) = Rp. " + str(total_pajak) + " juta")',
].join('\n')

const S6_NOTES = [
  { line: [1, 7] as [number, number], note: 'Tiga masukan program: pendapatan, jumlah anak, sumbangan wajib (semua uang dalam jutaan rupiah). Pada soal, "..." diganti nilai dari tiap butir (a, b, c).', en: "Three inputs to the program: income, number of children, mandatory donation (all money in millions of rupiah). In the problem, \"...\" is replaced by the value for each part (a, b, c)." },
  { line: [10, 12] as [number, number], note: '`ptkp` adalah larik penghasilan tidak kena pajak, diindeks oleh jumlah anak 0..3. Jumlah anak lebih dari 3 dipotong menjadi 3, sehingga indeks `ptkp[jumlah_anak]` selalu valid.', en: "`ptkp` is an array of non-taxable income, indexed by the number of children 0..3. A number of children above 3 is capped at 3, so the index `ptkp[jumlah_anak]` is always valid." },
  { line: [15, 16] as [number, number], note: 'Dua larik paralel: `tarif[k]` berlaku untuk bagian pkp mulai dari `batas_bawah_tarif[k]`. Jadi 10% untuk 0 sampai 60, 20% untuk 60 sampai 250, 30% untuk 250 sampai 1000, 40% di atas 1000.', en: "Two parallel arrays: `tarif[k]` applies to the part of pkp starting at `batas_bawah_tarif[k]`. So 10% for 0 to 60, 20% for 60 to 250, 30% for 250 to 1000, 40% above 1000." },
  { line: 20, note: '`pkp` = pendapatan kena pajak = pendapatan − sumbangan − ptkp. Bisa negatif; maka while di baris 25 langsung gagal dan pajak 0.', en: "`pkp` = taxable income = income − donation − ptkp. It can be negative; then the while at line 25 fails immediately and the tax is 0." },
  { line: [21, 23] as [number, number], note: 'Inisialisasi penghitung **sebelum** loop: indeks bracket, total pajak, dan total pkp progresif (yang terakhir tidak dipakai lagi).', en: "Initialise the counters **before** the loop: bracket index, total tax, and total progressive pkp (the last is not used again)." },
  { line: 25, note: 'Loop per bracket: lanjut selama masih ada bracket (`index_tarif < len(tarif)`) **dan** pkp melewati batas bawah bracket itu. Urutan syarat penting agar tidak mengakses indeks di luar larik.', en: "Loop per bracket: continue while there are brackets left (`index_tarif < len(tarif)`) **and** pkp exceeds that bracket's lower bound. The order of the conditions matters so no index outside the array is accessed." },
  { line: [26, 29] as [number, number], note: 'Batas atas bagian ini: jika ini bracket terakhir atau pkp lebih kecil dari batas bawah bracket berikutnya, bagian ini berhenti di `pkp`; selain itu penuh sampai batas bawah bracket berikutnya.', en: "The upper bound of this slice: if this is the last bracket or pkp is smaller than the next bracket's lower bound, this slice stops at `pkp`; otherwise it is full up to the next bracket's lower bound." },
  { line: [31, 33] as [number, number], note: 'Bagian pkp di bracket ini = batas atas − batas bawah; pajak bagian ini = bagian × tarif; dijumlahkan ke `total_pajak` (progresif: tiap bagian dikali tarif bracket-nya sendiri).', en: "The slice of pkp in this bracket = upper bound − lower bound; the tax on this slice = slice × rate; added to `total_pajak` (progressive: each slice is multiplied by its own bracket's rate)." },
  { line: 34, note: 'Pindah ke bracket berikutnya. Tanpa baris ini loop tidak pernah berakhir.', en: "Move on to the next bracket. Without this line the loop never ends." },
  { line: 36, note: '`str(total_pajak)` wajib karena `+` dengan string. Hasil bisa tampil `0` (int, bila loop tidak jalan) atau `42.0` (float, bila ada pajak).', syntax: 'print-str' as const, en: "`str(total_pajak)` is required because of `+` with a string. The result may print as `0` (int, if the loop did not run) or `42.0` (float, if there is tax)." },
]

/* ------------------------------------------------------------------ the bank */
export const bank: BankFile = {
  problems: [
    /* ---------------- Soal 1: Koleksi Buku ---------------- */
    {
      id: 'g24-s1', archetype: 'constraint', title: 'Soal 1 – Koleksi Buku',
      source: { kind: 'guide' as const, lang: 'id' as const, src: SRC, label: 'Soal 1', pages: [1, 2, 3], official: true, year: 2024 },
      paperWeight: 0.2,
      intro: [
        'Sarah adalah seorang pustakawan yang sedang menyiapkan koleksi buku rekomendasi untuk sebuah acara komunitas di perpustakaan. Koleksi tersebut akan terdiri dari empat genre utama: Fiksi, Seni, Sejarah, dan Sains. Buku-buku pada setiap genre tersedia dalam tiga jenis kemasan: buku saku, hardcover, dan e-book.',
        '',
        'Genre Fiksi mencakup novel-novel populer dengan berbagai tema seperti petualangan, romansa, dan misteri. Genre Seni mencakup buku-buku tentang karya seni serta biografi para seniman. Buku dengan genre Sejarah mencakup topik mulai dari sejarah kuno hingga modern, dan biasanya dilengkapi dengan ilustrasi. Buku-buku Sains menjelaskan konsep-konsep ilmiah dan penemuan terbaru. Beberapa buku Sains populer hadir dalam edisi khusus dengan ilustrasi warna.',
        '',
        'Sarah memiliki beberapa syarat khusus untuk koleksi buku yang akan ditampilkannya. Koleksi tersebut harus berjumlah tepat enam buku, dengan dua buku dari setiap jenis kemasan: dua buku saku, dua hardcover, dan dua e-book. Untuk memastikan variasi, setiap genre hanya boleh muncul satu atau dua kali dalam koleksi. Jika ada dua buku dari genre yang sama, jenis kemasannya harus berbeda. Misalnya, jika ada satu buku saku fiksi, maka buku fiksi lainnya hanya boleh hardcover atau e-book. Sarah tidak mempermasalahkan penulis atau tahun terbit, tetapi koleksi harus mencakup berbagai topik untuk menarik minat para pengunjung.',
        '',
        '**Petunjuk:** Gunakan prinsip-prinsip berpikir komputasional untuk menyelesaikan masalah ini. Ingatlah untuk menerapkan prinsip abstraksi dengan fokus pada informasi penting, dan dekomposisi untuk menyederhanakan permasalahan.',
      ].join('\n'),
      figures: [ref(1)],
      parts: [
        {
          id: 'g24-s1a', kind: 'constraint', label: 'a', weight: 0.4, decks: ['D01'], topic: 'Constraint assignment', misconceptions: ['constraint-missed'], shape: 'grid',
          entities: ['Fiksi', 'Seni', 'Sejarah', 'Sains'], slots: ['Buku saku', 'Hardcover', 'E-book'],
          stem: 'Bantulah Sarah untuk menentukan koleksi buku rekomendasi yang memenuhi syarat yang diinginkannya. Cukup sebutkan daftar enam jenis buku dari koleksi yang Anda usulkan, misalnya "1) Fiksi – buku saku, 2) Seni – hardcover, 3) ..."',
          check: S1_CHECK,
          solution: [[0, 0], [0, 2], [1, 0], [2, 1], [2, 2], [3, 1]],
          rubric: RB_1A,
          hints: [
            'Tuliskan dulu semua syarat. Ada berapa constraint? Mana yang soal jumlah total, mana yang soal kemasan, mana yang soal genre?',
            'Bayangkan tabel 4 genre × 3 kemasan. Berapa centang total, berapa per kolom, dan berapa per baris?',
            'Isi kolom (kemasan) dua-dua dulu, lalu periksa tiap baris: boleh 1 atau 2 centang, dan dua buku genre sama otomatis berkemasan beda karena selnya beda.',
          ],
          work: [
            'Constraint 1: tepat 6 buku. Constraint 2: tepat 2 buku untuk tiap kemasan (saku, hardcover, e-book). Constraint 3: tiap genre muncul 1 atau 2 kali, jika 2 kali kemasannya beda.',
            'Sebagai tabel: tepat 6 centang di sel berbeda, tiap kolom tepat 2 centang, tiap baris 1 atau 2 centang.',
            'Pilih untuk buku saku: Fiksi dan Seni; hardcover: Sejarah dan Sains; e-book: Fiksi dan Sejarah.',
            'Cek baris: Fiksi 2 (saku, e-book), Seni 1, Sejarah 2 (hardcover, e-book), Sains 1: semua 1 atau 2 dan pasangan genre sama berkemasan beda. Selesai.',
          ],
          explanation: [
            '**Alternatif Jawaban (resmi):** Soal ini tidak memiliki jawaban tunggal. Ada banyak kemungkinan kombinasi benar yang memenuhi aturan koleksi buku di atas. Prinsip utama dari soal ini adalah bagaimana mahasiswa mampu melakukan abstraksi, yaitu menggunakan hanya informasi yang penting. Hal penting dari cerita kasus tsb adalah adanya genre buku, kemasan buku, dan syarat-syarat yang harus dipenuhi dalam menyusun koleksi buku.',
            '',
            'Dari informasi penting tersebut, mahasiswa harus mampu mendekomposisi dan merumuskan constraint yang harus dipenuhi. Kemudian setelah merumuskan constraint tersebut, mahasiswa harus mampu menyusun satu kemungkinan kombinasi hidangan yang memenuhi constraint tersebut.',
            '',
            'Secara umum ada tiga constraint yang harus dipenuhi: (1) Ada tepat enam buku dalam koleksi; (2) Ada dua genre dari setiap kemasan (kecil, sedang, besar); (3) Setiap genre hanya boleh muncul satu atau dua kali dengan kemasan yang berbeda.',
            '',
            'Tips resmi: jika direpresentasikan dalam bentuk tabel, 3 constraint di atas dapat diterjemahkan sebagai berikut: di tabel harus ada total tepat 6 checkmark di cell yang berbeda, tiap kolom harus ada tepat 2 checkmark, dan tiap baris harus memiliki 1 atau 2 checkmark.',
            '',
            'Contoh kombinasi resmi (✔ = dicentang): #1 Fiksi: saku, e-book; Seni: saku; Sejarah: hardcover, e-book; Sains: hardcover. #2 Fiksi: saku, e-book; Seni: hardcover; Sejarah: saku; Sains: hardcover, e-book. #3 Fiksi: hardcover, e-book; Seni: saku; Sejarah: hardcover, e-book; Sains: saku. #4 Fiksi: saku, e-book; Seni: saku; Sejarah: hardcover, e-book; Sains: hardcover. (Catatan: #4 di panduan identik dengan #1. Constraint 2 di panduan tertulis "dua genre dari setiap kemasan (kecil, sedang, besar)" dan rubrik 3 menyebut "hidangan": sisa dari versi soal lain; maksudnya dua buku untuk setiap kemasan dan buku.)',
          ].join('\n'),
          refs: [ref(1), ref(2)],
          en: { stem: 'Help Sarah determine a recommended book collection that meets her requirements. Just list the six kinds of books in your proposed collection, e.g. "1) Fiction – pocket book, 2) Art – hardcover, 3) ..."', explanation: "**Alternative answer (official):** This question has no single answer. Many correct combinations satisfy the book-collection rules above. The main principle is whether students can apply abstraction, i.e. use only the information that matters. What matters in the case story is the book genres, the book packaging, and the requirements that must be met when building the collection.\n\nFrom that important information, students must be able to decompose and formulate the constraints that have to be met. After formulating the constraints, students must be able to construct one possible combination of dishes that satisfies those constraints.\n\nIn general there are three constraints: (1) there are exactly six books in the collection; (2) there are two genres of each packaging (small, medium, large); (3) each genre may appear only once or twice, with different packaging.\n\nOfficial tip: if represented as a table, the 3 constraints above translate as follows: the table must have exactly 6 checkmarks in different cells, each column must have exactly 2 checkmarks, and each row must have 1 or 2 checkmarks.\n\nOfficial example combinations (✔ = ticked): #1 Fiction: pocket, e-book; Art: pocket; History: hardcover, e-book; Science: hardcover. #2 Fiction: pocket, e-book; Art: hardcover; History: pocket; Science: hardcover, e-book. #3 Fiction: hardcover, e-book; Art: pocket; History: hardcover, e-book; Science: pocket. #4 Fiction: pocket, e-book; Art: pocket; History: hardcover, e-book; Science: hardcover. (Note: #4 in the guide is identical to #1. Constraint 2 in the guide reads \"two genres of each packaging (small, medium, large)\" and rubric 3 mentions \"dishes\": leftovers from another version of the question; what is meant is two books for each packaging, and books.)", hints: ["First write down all the requirements. How many constraints are there? Which concerns the total, which the packaging, which the genre?", "Picture a table of 4 genres × 3 packagings. How many checkmarks in total, how many per column, and how many per row?", "Fill the columns (packagings) two at a time first, then check each row: 1 or 2 checkmarks are allowed, and two books of the same genre automatically have different packaging because their cells differ."], work: ["Constraint 1: exactly 6 books. Constraint 2: exactly 2 books for each packaging (pocket, hardcover, e-book). Constraint 3: each genre appears 1 or 2 times, and if 2 times the packaging differs.", "As a table: exactly 6 checkmarks in different cells, exactly 2 checkmarks per column, 1 or 2 checkmarks per row.", "Choose for pocket books: Fiction and Art; hardcover: History and Science; e-book: Fiction and History.", "Check the rows: Fiction 2 (pocket, e-book), Art 1, History 2 (hardcover, e-book), Science 1: all 1 or 2 and the pairs of the same genre have different packaging. Done."] },
        },
        {
          id: 'g24-s1b', kind: 'open', label: 'b', weight: 0.6, decks: ['D01'], topic: 'CT principles: abstraction & decomposition',
          stem: 'Berikan penjelasan yang singkat dan jelas yang menunjukkan penalaran Anda dalam menentukan koleksi tersebut.',
          answer: [
            'Tidak ada jawaban tunggal; yang dinilai adalah **abstraksi** dan **dekomposisi**.',
            '- Abstraksi: hanya genre buku, kemasan buku, dan syarat koleksi yang penting; penulis, tahun terbit, dan detail isi diabaikan.',
            '- Dekomposisi: rumuskan constraint: (1) tepat enam buku; (2) tepat dua buku untuk tiap kemasan; (3) tiap genre muncul satu atau dua kali, bila dua kali kemasannya berbeda.',
            '- Lalu susun satu kombinasi yang memenuhi ketiganya (mis. tabel genre × kemasan dengan 6 centang, 2 per kolom, 1 atau 2 per baris) dan periksa tiap constraint.',
          ].join('\n'),
          rubric: RB_1B,
          keyPoints: ['Informasi penting: genre, kemasan, syarat (penulis/tahun diabaikan)', 'Ketiga constraint dirumuskan eksplisit, tanpa aturan tambahan', 'Cara menyusun kombinasi dari constraint'],
          explanation: 'Cara Penilaian resmi: Nilai Soal 1 = Nilai Soal 1.a. × 40% + Nilai Soal 1.b × 60%. Hati-hati di rubrik 3: menambah aturan yang tidak ada di soal (mis. "harus ada dua genre berbeda per kemasan") dianggap satu kesalahan.',
          refs: [ref(2), ref(3)],
          en: { stem: 'Give a short, clear explanation showing your reasoning for choosing the collection.', explanation: "Official grading method: Problem 1 score = score of 1.a × 40% + score of 1.b × 60%. Be careful with rubric 3: adding a rule that is not in the problem (e.g. \"there must be two different genres per packaging\") counts as one error.", answer: "There is no single answer; what is marked is **abstraction** and **decomposition**.\n- Abstraction: only the book genre, book packaging and the collection requirements matter; author, publication year and content details are ignored.\n- Decomposition: formulate the constraints: (1) exactly six books; (2) exactly two books for each packaging; (3) each genre appears once or twice, and if twice the packaging differs.\n- Then construct one combination that satisfies all three (e.g. a genre × packaging table with 6 checkmarks, 2 per column, 1 or 2 per row) and check each constraint.", keyPoints: ["Important information: genre, packaging, requirements (author/year ignored)", "All three constraints stated explicitly, with no extra rules", "How the combination is built from the constraints"] },
        },
      ],
      en: { title: 'Problem 1 – Book collection', intro: "Sarah is a librarian preparing a recommended book collection for a community event at the library. The collection will consist of four main genres: Fiction, Art, History, and Science. The books in each genre are available in three kinds of packaging: pocket book, hardcover, and e-book.\n\nThe Fiction genre includes popular novels with various themes such as adventure, romance, and mystery. The Art genre includes books about works of art and biographies of artists. Books in the History genre cover topics from ancient to modern history, and are usually equipped with illustrations. Science books explain scientific concepts and the latest discoveries. Some popular Science books come in a special edition with colour illustrations.\n\nSarah has some special requirements for the book collection she will display. The collection must consist of exactly six books, with two books of each packaging: two pocket books, two hardcovers, and two e-books. To ensure variety, each genre may appear only once or twice in the collection. If there are two books of the same genre, their packaging must differ. For example, if there is one fiction pocket book, then the other fiction book may only be a hardcover or an e-book. Sarah does not care about the author or the year of publication, but the collection must cover a variety of topics to attract visitors' interest.\n\n**Hint:** Use the principles of computational thinking to solve this problem. Remember to apply the principle of abstraction by focusing on the important information, and decomposition to simplify the problem." },
    },

    /* ---------------- Soal 2: Taman Botani ---------------- */
    {
      id: 'g24-s2', archetype: 'classify', title: 'Soal 2 – Taman Botani',
      source: { kind: 'guide' as const, lang: 'id' as const, src: SRC, label: 'Soal 2', pages: [3, 4, 5], official: true, year: 2024 },
      paperWeight: 0.2,
      intro: [
        'Sebuah taman botani sedang mengklasifikasikan koleksi tanamannya untuk memudahkan pengunjung dalam mempelajari berbagai jenis tanaman. Saat ini, taman botani tersebut memiliki data tanaman sebagai berikut:',
        '',
        '| No | Nama Tanaman | Asal Daerah | Tahun Ditemukan | Tinggi Tanaman (cm) | Warna Daun | Kode Tanaman |',
        '|---|---|---|---|---|---|---|',
        '| 1 | Anggrek Bulan | Jawa | 1859 | 45 | Hijau | |',
        '| 2 | Apel Ceri | Sumatera | 1870 | 1600 | Hijau | |',
        '| 3 | Kaktus Mini | Kalimantan | 1925 | 15 | - | |',
        '| 4 | Teratai Putih | Papua | 1900 | 25 | Hijau Muda | |',
        '| 5 | Mangga Bali | Bali | 1815 | 2400 | Hijau | |',
        '| 6 | Bambu Hitam | Sulawesi | 1905 | 300 | Hijau Tua | |',
        '| 7 | Pakis Hutan | Sumatera | 1800 | 120 | Hijau | |',
        '| 8 | Pohon Jati | Jawa | 1850 | 3500 | Hijau Tua | |',
        '| 9 | Anggrek Hitam | Kalimantan | 1880 | 55 | Hijau Tua | |',
        '| 10 | Pohon Cemara | Papua | 1920 | 800 | Hijau | |',
        '| 11 | Anggrek Merah | Bali | 1930 | 50 | Hijau | |',
        '| 12 | Apel Malang | Jawa | 1901 | 1650 | Hijau | |',
        '| 13 | Kaktus Berduri | Nusa Tenggara | 1950 | 20 | - | |',
        '| 14 | Teratai Biru | Sumatera | 1915 | 30 | Hijau Muda | |',
        '| 15 | Melati Gambir | Jawa | 1830 | 35 | Hijau | |',
        '| 16 | Bambu Kuning | Kalimantan | 1885 | 250 | Hijau | |',
        '| 17 | Pakis Tanduk Rusa | Papua | 1805 | 90 | Hijau | |',
        '| 18 | Pohon Meranti | Sumatera | 1865 | 2600 | Hijau Tua | |',
        '| 19 | Mangga Kweni | Sulawesi | 1890 | 1700 | Hijau Tua | |',
        '| 20 | Pohon Beringin | Jawa | 1825 | 3800 | Hijau | |',
        '',
        'Taman botani ini berencana mengelompokkan tanaman-tanaman tersebut secara hierarkis berdasarkan kriteria tertentu agar lebih mudah dikelola, dengan mempertimbangkan kemungkinan adanya tanaman baru di masa yang akan datang. Pengelompokan tersebut juga akan mencakup pemberian kode unik untuk setiap tanaman, yang akan mencerminkan hierarki kelompok masing-masing tanaman. Bantulah taman botani ini membuat pengelompokan hierarkis tanaman berdasarkan data yang sudah ada di atas, sembari tetap memperhatikan kemungkinan tanaman baru yang akan ditambahkan di masa yang akan datang.',
        '',
        '**Petunjuk:** Anda dapat menggunakan pengetahuan umum untuk mengidentifikasi kesamaan karakter dari item-item di atas dalam melakukan pengelompokan.',
      ].join('\n'),
      figures: [ref(3)],
      parts: [
        {
          id: 'g24-s2a', kind: 'open', label: 'a', weight: 0.3, decks: ['D01', 'D03'], topic: 'Hierarchical classification', misconceptions: ['unique-column-class'],
          stem: 'Tuliskan sistem klasifikasi hierarkis yang Anda rancang.',
          answer: [
            'Soal ini tidak memiliki jawaban tunggal. Ada banyak kemungkinan sistem klasifikasi hirarkis yang bisa digunakan. Hal penting yang harus dapat ditunjukkan mahasiswa adalah:',
            '1. **Identifikasi pola**: bagaimana menemukan kesamaan pola untuk melakukan klasifikasi hirarkis. Misalnya, dibuat klasifikasi dua tingkat sebagai berikut:',
            '   a. Tingkat 1: jenis tanaman. Mahasiswa bisa menemukan pola dari nama tanaman dan menentukan kodenya, misal: pohon berkayu (KAYU), tanaman bunga hias (HIAS), tanaman buah (BUAH), dan lainnya (LAIN)',
            '   b. Tingkat 2: tahun ditemukan',
            'Penentuan pola klasifikasi juga dimungkinkan berdasarkan kesamaan atribut yang lain (misal asal daerah dan klasifikasi tinggi), selama mahasiswa memberikan justifikasi yang masuk akal.',
          ].join('\n'),
          rubric: RB_2A,
          keyPoints: ['Tingkat dipilih dari atribut yang berulang dan bermakna (jenis tanaman, tahun, asal daerah, kelas tinggi)', 'Hierarki jelas: tingkat 1 → tingkat 2 (→ nomor urut)', 'Bukan dari kolom hampir-unik seperti nama tanaman'],
          explanation: 'Nama tanaman tidak cocok sebagai tingkat klasifikasi: nilainya hampir semuanya berbeda. Jenis tanaman dapat diperoleh dari nama (Anggrek → hias, Apel/Mangga → buah, Pohon … → kayu), sehingga pengetahuan umum diperbolehkan.',
          refs: [ref(4)],
          en: { stem: 'Write the hierarchical classification system you designed.', explanation: "Plant name is not suitable as a classification level: almost all its values are different. The plant type can be derived from the name (Anggrek → ornamental, Apel/Mangga → fruit, Pohon … → timber), so general knowledge is allowed.", answer: "This question has no single answer. Many hierarchical classification systems are possible. The important things students must show are:\n1. **Pattern identification**: how to find similar patterns to build a hierarchical classification. For example, a two-level classification as follows:\n   a. Level 1: plant type. Students can find a pattern in the plant names and determine its code, e.g. woody trees (KAYU), ornamental flowering plants (HIAS), fruit plants (BUAH), and others (LAIN)\n   b. Level 2: year of discovery\nA classification pattern may also be based on similarity in other attributes (e.g. region of origin and a height class), as long as students give a reasonable justification.", keyPoints: ["Levels chosen from attributes that repeat and are meaningful (plant type, year, region of origin, height class)", "A clear hierarchy: level 1 → level 2 (→ sequence number)", "Not from an almost-unique column such as plant name"] },
        },
        {
          id: 'g24-s2b', kind: 'open', label: 'b', weight: 0.4, decks: ['D01', 'D03'], topic: 'Hierarchical classification',
          stem: 'Berikan penjelasan yang singkat dan jelas yang menjelaskan penalaran Anda dalam menentukan klasifikasi tersebut.',
          answer: [
            '2. **Penalaran penentuan klasifikasi dan kode**, misalnya:',
            '   a. Justifikasi penentuan klasifikasi, misal bagaimana penentuan klasifikasi dapat memudahkan pengunjung dan menunjukkan keunikan item yang diklasifikasikan',
            '   b. Perlu diberikan no urut untuk membedakan tanaman yang, misalnya, memiliki jenis yang sama dan tahun ditemukan yang juga sama',
            '   c. Cara penulisan kode sesuai dengan skema yang sudah ditetapkan, misalnya, tanaman no 1 di atas dapat diberi kode "HIAS-1859-001"',
          ].join('\n'),
          rubric: RB_2B,
          keyPoints: ['Alasan memilih tiap tingkat (mudah bagi pengunjung)', 'Mengapa nomor urut diperlukan (tanaman baru dengan jenis dan tahun sama)', 'Konsisten dengan sistem pada (a)'],
          explanation: 'Nilai 2.b bergantung pada 2.a: penjelasan sempurna tetapi klasifikasi 2.a bernilai 1 atau 2 hanya mendapat 2.',
          refs: [ref(4), ref(5)],
          en: { stem: 'Give a short, clear explanation of your reasoning for the classification.', explanation: "The score of 2.b depends on 2.a: a perfect explanation but a 2.a classification worth 1 or 2 only earns 2.", answer: "2. **Reasoning for the classification and the code**, for example:\n   a. Justification of the classification, e.g. how the classification makes it easier for visitors and shows the uniqueness of the items classified\n   b. A sequence number is needed to distinguish plants that, for example, have the same type and also the same year of discovery\n   c. The way the code is written follows the scheme that was set, e.g. plant no. 1 above can be given the code \"HIAS-1859-001\"", keyPoints: ["The reason for choosing each level (easy for visitors)", "Why a sequence number is needed (new plants with the same type and year)", "Consistent with the system in (a)"] },
        },
        {
          id: 'g24-s2c', kind: 'classify', label: 'c', weight: 0.3, decks: ['D01', 'D03'], topic: 'Hierarchical unique codes', misconceptions: ['not-disjoint', 'not-complete'],
          stem: 'Berdasarkan klasifikasi tersebut, berikan kode unik untuk setiap tanaman (tuliskan langsung di kolom kode tanaman di atas).',
          columns: ['No', 'Nama Tanaman', 'Asal Daerah', 'Tahun Ditemukan', 'Tinggi Tanaman (cm)', 'Warna Daun'],
          rows: [
            [1, 'Anggrek Bulan', 'Jawa', 1859, 45, 'Hijau'],
            [2, 'Apel Ceri', 'Sumatera', 1870, 1600, 'Hijau'],
            [3, 'Kaktus Mini', 'Kalimantan', 1925, 15, '-'],
            [4, 'Teratai Putih', 'Papua', 1900, 25, 'Hijau Muda'],
            [5, 'Mangga Bali', 'Bali', 1815, 2400, 'Hijau'],
            [6, 'Bambu Hitam', 'Sulawesi', 1905, 300, 'Hijau Tua'],
            [7, 'Pakis Hutan', 'Sumatera', 1800, 120, 'Hijau'],
            [8, 'Pohon Jati', 'Jawa', 1850, 3500, 'Hijau Tua'],
            [9, 'Anggrek Hitam', 'Kalimantan', 1880, 55, 'Hijau Tua'],
            [10, 'Pohon Cemara', 'Papua', 1920, 800, 'Hijau'],
            [11, 'Anggrek Merah', 'Bali', 1930, 50, 'Hijau'],
            [12, 'Apel Malang', 'Jawa', 1901, 1650, 'Hijau'],
            [13, 'Kaktus Berduri', 'Nusa Tenggara', 1950, 20, '-'],
            [14, 'Teratai Biru', 'Sumatera', 1915, 30, 'Hijau Muda'],
            [15, 'Melati Gambir', 'Jawa', 1830, 35, 'Hijau'],
            [16, 'Bambu Kuning', 'Kalimantan', 1885, 250, 'Hijau'],
            [17, 'Pakis Tanduk Rusa', 'Papua', 1805, 90, 'Hijau'],
            [18, 'Pohon Meranti', 'Sumatera', 1865, 2600, 'Hijau Tua'],
            [19, 'Mangga Kweni', 'Sulawesi', 1890, 1700, 'Hijau Tua'],
            [20, 'Pohon Beringin', 'Jawa', 1825, 3800, 'Hijau'],
          ],
          codeColumn: 'Kode Tanaman',
          model: {
            levels: [
              { attr: 'Jenis tanaman', codes: { 'Pohon berkayu': 'KAYU', 'Tanaman bunga hias': 'HIAS', 'Tanaman buah': 'BUAH', Lainnya: 'LAIN' } },
              { attr: 'Tahun ditemukan' },
              { attr: 'Nomor urut dalam jenis dan tahun yang sama' },
            ],
            pattern: '<jenis>-<tahun ditemukan>-<nomor urut 3 digit>',
            codes: [
              'HIAS-1859-001', 'BUAH-1870-001', 'LAIN-1925-001', 'HIAS-1900-001', 'BUAH-1815-001',
              'LAIN-1905-001', 'LAIN-1800-001', 'KAYU-1850-001', 'HIAS-1880-001', 'KAYU-1920-001',
              'HIAS-1930-001', 'BUAH-1901-001', 'LAIN-1950-001', 'HIAS-1915-001', 'HIAS-1830-001',
              'LAIN-1885-001', 'LAIN-1805-001', 'KAYU-1865-001', 'BUAH-1890-001', 'KAYU-1825-001',
            ],
          },
          rubric: RB_2C,
          explanation: [
            'Contoh model (satu dari banyak jawaban benar) mengikuti alternatif resmi: tingkat 1 jenis tanaman (KAYU/HIAS/BUAH/LAIN), tingkat 2 tahun ditemukan; contoh resmi: tanaman no 1 = **HIAS-1859-001**. Pada data ini semua tahun berbeda sehingga semua nomor urut 001, tetapi nomor urut tetap diperlukan untuk tanaman baru yang jenis dan tahunnya sama. Kunci: kode **unik**, mengikuti pola yang sama untuk semua baris, dan cocok dengan klasifikasi di (a).',
            '',
            '**Cara Penilaian resmi:** Nilai Soal 2 = Nilai Soal 2.a. × 30% + Nilai Soal 2.b × 40% + Nilai Soal 2.c × 30%.',
          ].join('\n'),
          refs: [ref(4), ref(5)],
          en: { stem: 'Based on that classification, give a unique code for each plant (write it directly in the plant code column above).', explanation: "The model example (one of many correct answers) follows the official alternative: level 1 plant type (KAYU/HIAS/BUAH/LAIN), level 2 year of discovery; official example: plant no. 1 = **HIAS-1859-001**. In this data all years are different so every sequence number is 001, but the sequence number is still needed for new plants of the same type and year. Key: the code is **unique**, follows the same pattern for every row, and matches the classification in (a).\n\n**Official grading method:** Problem 2 score = score of 2.a × 30% + score of 2.b × 40% + score of 2.c × 30%." },
        },
      ],
      en: { title: 'Problem 2 – Botanical garden', intro: "A botanical garden is classifying its plant collection to make it easier for visitors to learn about the various types of plants. At present, the botanical garden has the following plant data:\n\n| No | Plant Name | Region of Origin | Year Discovered | Plant Height (cm) | Leaf Colour | Plant Code |\n|---|---|---|---|---|---|---|\n| 1 | Anggrek Bulan | Jawa | 1859 | 45 | Hijau | |\n| 2 | Apel Ceri | Sumatera | 1870 | 1600 | Hijau | |\n| 3 | Kaktus Mini | Kalimantan | 1925 | 15 | - | |\n| 4 | Teratai Putih | Papua | 1900 | 25 | Hijau Muda | |\n| 5 | Mangga Bali | Bali | 1815 | 2400 | Hijau | |\n| 6 | Bambu Hitam | Sulawesi | 1905 | 300 | Hijau Tua | |\n| 7 | Pakis Hutan | Sumatera | 1800 | 120 | Hijau | |\n| 8 | Pohon Jati | Jawa | 1850 | 3500 | Hijau Tua | |\n| 9 | Anggrek Hitam | Kalimantan | 1880 | 55 | Hijau Tua | |\n| 10 | Pohon Cemara | Papua | 1920 | 800 | Hijau | |\n| 11 | Anggrek Merah | Bali | 1930 | 50 | Hijau | |\n| 12 | Apel Malang | Jawa | 1901 | 1650 | Hijau | |\n| 13 | Kaktus Berduri | Nusa Tenggara | 1950 | 20 | - | |\n| 14 | Teratai Biru | Sumatera | 1915 | 30 | Hijau Muda | |\n| 15 | Melati Gambir | Jawa | 1830 | 35 | Hijau | |\n| 16 | Bambu Kuning | Kalimantan | 1885 | 250 | Hijau | |\n| 17 | Pakis Tanduk Rusa | Papua | 1805 | 90 | Hijau | |\n| 18 | Pohon Meranti | Sumatera | 1865 | 2600 | Hijau Tua | |\n| 19 | Mangga Kweni | Sulawesi | 1890 | 1700 | Hijau Tua | |\n| 20 | Pohon Beringin | Jawa | 1825 | 3800 | Hijau | |\n\nThis botanical garden plans to group these plants hierarchically based on certain criteria so that they are easier to manage, taking into account the possibility of new plants in the future. The grouping will also include assigning a unique code to each plant, which will reflect the hierarchy of the group of each plant. Help this botanical garden create a hierarchical grouping of plants based on the data above, while still paying attention to the possibility of new plants being added in the future.\n\n**Hint:** You may use general knowledge to identify similar characteristics among the items above when doing the grouping." },
    },

    /* ---------------- Soal 3: Robot Rody ---------------- */
    {
      id: 'g24-s3', archetype: 'robot', title: 'Soal 3 – Petualangan Robot Rody',
      source: { kind: 'guide' as const, lang: 'id' as const, src: SRC, label: 'Soal 3', pages: [5, 6], official: true, year: 2024 },
      paperWeight: 0.15,
      intro: [
        'Robot Rody ditugaskan untuk pergi ke rumah teman-teman Eddie, seperti Pororo. Untuk mencapai tempat-tempat itu, Rody harus menempuh berbagai terrain (medan) dan bergerak mengikuti terrain ini. Untuk melakukan hal tersebut, Rody dilengkapi dengan sejumlah perintah berikut.',
        '',
        '| Perintah | Arti |',
        '|---|---|',
        '| `up` | Bergerak ke atas 1 langkah |',
        '| `down` | Bergerak ke bawah 1 langkah |',
        '| `walk` | Berjalan ke depan 1 langkah |',
        '| `repeat n` *perintah* | Mengulang perintah sebanyak n kali. Asumsikan: n >= 0. Jika n = 0, maka perintah tidak dilakukan sama sekali. Parameter perintah pada perintah repeat terdiri atas perintah-perintah yang bisa dijalankan oleh robot dan bisa terdiri atas lebih dari 1 perintah. |',
        '',
        'Misalnya untuk menempuh terrain di samping, untuk berpindah dari posisi kiri ke kanan, Rody harus melakukan urutan perintah berikut (asumsi daerah berarsir tidak bisa dilewati Rody): `walk`, `down`, `walk`, `up`, `walk`.',
        '',
        'Bentuk terrain ditentukan oleh kedalaman terrain yang dinyatakan dengan bilangan n (n > 0). Berikut adalah beberapa contoh terrain yang dibentuk oleh kedalamannya (n = 1, n = 2, n = 4: lubang berbentuk tangga turun lalu naik; lihat gambar). Harap diingat, masih dimungkinkan nilai n yang lain.',
        '',
        'Rangkaian perintah dituliskan dalam urutan dituliskan ke bawah, dan dapat dikombinasikan dengan indentasi untuk memperjelas penulisan. Lihat contoh di atas.',
      ].join('\n'),
      parts: [{
        id: 'g24-s3a', kind: 'robot', decks: ['D02'], topic: 'Robot repeat', misconceptions: ['repeat-count'], dialect: 'rody', param: 'n', nValues: [1, 2, 3, 4, 5],
        stem: 'Jika diberikan nilai n dengan n > 0 yang menyatakan kedalaman terrain yang harus ditempuh Rody dalam perjalanannya, tuliskan perintah yang harus dilakukan Rody untuk melewati terrain dari sisi kiri terrain ke sisi kanannya.',
        solution: 'repeat n\n  walk\n  down\nwalk\nrepeat n\n  up\n  walk',
        rubric: RB_3,
        hints: ['Gambar jalur untuk n = 1, 2, 3. Rody turun n anak tangga lalu naik n anak tangga: bagian mana yang berulang sebanyak n kali?', 'Satu anak tangga turun = walk lalu down. Di dasar ada satu walk. Satu anak tangga naik = up lalu walk (urutan berbeda dari turun!).'],
        work: ['Turun: ulangi n kali (walk, down).', 'Dasar: satu walk di bagian terdalam.', 'Naik: ulangi n kali (up, walk).', 'Uji n = 1: walk down walk up walk, sama dengan contoh di soal.'],
        explanation: [
          '**Alternatif Jawaban (resmi):**',
          '```',
          'repeat n',
          '      walk',
          '      down',
          'walk',
          'repeat n',
          '      up',
          '      walk',
          '```',
          '**Cara Penilaian resmi:** Nilai Soal 3 dinilai berdasarkan rubrik penilaian. Perhatikan nilai 3 pada rubrik: perintah yang bisa diulang dengan `repeat` tetapi dituliskan berjajar masih bernilai 3 bila hasil eksekusinya benar.',
        ].join('\n'),
        refs: [ref(5), ref(6)],
        en: { stem: 'If given a value n with n > 0 that states the depth of the terrain that Rody must cross on his journey, write the commands that Rody must perform to cross the terrain from the left side of the terrain to its right side.', explanation: "**Alternative answer (official):**\n```\nrepeat n\n      walk\n      down\nwalk\nrepeat n\n      up\n      walk\n```\n**Official grading method:** the score for Problem 3 is based on the grading rubric. Note score 3 in the rubric: commands that could be repeated with `repeat` but are written out one after another still earn 3 if the execution result is correct.", hints: ["Draw the path for n = 1, 2, 3. Rody goes down n steps then up n steps: which part repeats n times?", "One step down = walk then down. At the bottom there is one walk. One step up = up then walk (a different order from going down!)."], work: ["Going down: repeat n times (walk, down).", "Bottom: a single walk at the deepest part.", "Going up: repeat n times (up, walk).", "Test n = 1: walk down walk up walk, the same as the example in the problem."] },
      }],
      en: { title: 'Problem 3 – Robot Rody\'s adventure', intro: "Robot Rody is assigned to go to the homes of Eddie's friends, such as Pororo. To reach those places, Rody must cross various terrains and move following these terrains. To do this, Rody is equipped with the following commands.\n\n| Command | Meaning |\n|---|---|\n| `up` | Move up 1 step |\n| `down` | Move down 1 step |\n| `walk` | Walk forward 1 step |\n| `repeat n` *command* | Repeat the command n times. Assume: n >= 0. If n = 0, then the command is not executed at all. The parameter of the repeat command consists of commands that the robot can execute and may consist of more than 1 command. |\n\nFor example, to cross the terrain beside, to move from the left position to the right, Rody must perform the following sequence of commands (assume the shaded area cannot be passed by Rody): `walk`, `down`, `walk`, `up`, `walk`.\n\nThe shape of the terrain is determined by the depth of the terrain, expressed by the number n (n > 0). Below are some examples of terrains formed by their depth (n = 1, n = 2, n = 4: a pit shaped like a staircase going down and then up; see the figure). Keep in mind that other values of n are still possible.\n\nA sequence of commands is written in order, written downwards, and can be combined with indentation to make the writing clearer. See the example above." },
    },

    /* ---------------- Soal 4: Data Suhu Udara ---------------- */
    {
      id: 'g24-s4', archetype: 'program', title: 'Soal 4 – Data Suhu Udara',
      source: { kind: 'guide' as const, lang: 'id' as const, src: SRC, label: 'Soal 4', pages: [7, 8], official: true, year: 2024 },
      paperWeight: 0.15,
      intro: [
        'Agus adalah seorang pembawa acara prakiraan cuaca di sebuah stasiun televisi. Setiap hari, Agus memperoleh data suhu harian (dalam celcius) di setiap kota dari sebuah stasiun cuaca. Dalam presentasi di acaranya, Agus ingin menampilkan rerata suhu harian selama seminggu terakhir pada tiap kota. Agus juga ingin menyampaikan kepada audiens nya, apakah tren suhu harian selama seminggu terakhir tersebut cenderung menaik atau menurun.',
        '',
        'Tren suhu harian dikatakan naik, jika dalam seminggu terakhir lebih banyak terjadi kenaikan suhu harian ketimbang penurunan, dimana kenaikan dan penurunan ditentukan dengan cara membandingkan suhu harian hari tertentu dengan hari sebelumnya. Jika jumlah kenaikan dan penurunan pada seminggu terakhir sama, maka dikatakan tren suhu harian adalah stabil.',
        '',
        'Berikut ini adalah contoh data suhu harian selama seminggu untuk kasus tren turun, naik, maupun stabil, beserta rerata suhu hariannya.',
        '',
        '| Indeks Array | Hari | Suhu (TURUN) | Naik/Turun | Suhu (NAIK) | Naik/Turun | Suhu (STABIL) | Naik/Turun |',
        '|---|---|---|---|---|---|---|---|',
        '| 0 | H minus 6 | 25 | | 27 | | 28 | |',
        '| 1 | H minus 5 | 26 | naik | 27 | stabil | 28 | stabil |',
        '| 2 | H minus 4 | 24 | turun | 28 | naik | 29 | naik |',
        '| 3 | H minus 3 | 23 | turun | 31 | naik | 28 | turun |',
        '| 4 | H minus 2 | 22 | turun | 29 | turun | 26 | turun |',
        '| 5 | H minus 1 | 20 | turun | 28 | turun | 26 | stabil |',
        '| 6 | Hari ini | 23 | naik | 30 | naik | 28 | naik |',
        '| | Rerata suhu harian seminggu terakhir | 23.28 | | 28.57 | | 27.57 | |',
        '',
        'Bantulah Agus menyelesaikan masalah ini. Tulislah sebuah program Python yang melakukan hal sebagai berikut:',
        '1. Menerima input dari pengguna berupa suhu harian selama 7 hari terakhir dan memasukkan ke dalam sebuah array of integer.',
        '2. Menentukan tren suhu harian (naik, turun, atau stabil) dan menampilkan ke layar.',
        '3. Menghitung rerata suhu harian dan menampilkan ke layar.',
        '',
        'Contoh tampilan program:',
        '```',
        'Masukkan suhu hari-6: 25',
        'Masukkan suhu hari-5: 26',
        'Masukkan suhu hari-4: 24',
        'Masukkan suhu hari-3: 23',
        'Masukkan suhu hari-2: 22',
        'Masukkan suhu hari-1: 20',
        'Masukkan suhu hari-0: 23',
        '',
        'Tren suhu harian TURUN',
        'Rerata suhu harian 23.2857143',
        '```',
        '',
        'Catatan: pada pengujian di situs ini, masukan adalah 7 bilangan bulat, satu per baris. Pemeriksa hanya memeriksa kata tren dan nilai rerata (jumlah desimal bebas).',
      ].join('\n'),
      figures: [ref(7)],
      parts: [{
        id: 'g24-s4a', kind: 'program', decks: ['D06', 'D05'], topic: 'Array: trend and average', patterns: ['array-populate', 'array-compare', 'count-if', 'average'], misconceptions: ['off-by-one', 'index-range', 'int-vs-float-div'],
        stem: 'Tulislah sebuah program Python yang (1) menerima suhu harian 7 hari terakhir ke dalam array of integer, (2) menentukan tren suhu harian (naik, turun, atau stabil) dan menampilkannya ke layar, dan (3) menghitung rerata suhu harian dan menampilkannya ke layar.',
        reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: S4_JUDGE,
        solution: { python: S4_PY },
        tests: S4_TESTS,
        wrong: [
          { code: S4_PY.replace('for i in range(1, 7):', 'for i in range(1, 6):'), msg: '`range(1, 6)` berhenti di indeks 5: pasangan hari-1 dan hari ini (indeks 6) tidak dibandingkan, dan suhu terakhir tidak masuk rerata. Dengan 7 data, gunakan `range(1, 7)`.', msgEn: "`range(1, 6)` stops at index 5: the pair day-1 and today (index 6) is not compared, and the last temperature does not enter the mean. With 7 data points use `range(1, 7)`.", tag: 'off-by-one' },
          { code: S4_PY.replace('total / 7', 'total / 6'), msg: 'Rerata dibagi 6, padahal ada 7 data suhu. Bagi dengan banyak data.', msgEn: "The mean is divided by 6 although there are 7 temperature values. Divide by the number of values.", tag: 'off-by-one' },
          { code: S4_PY.replace('if (naik > turun):', 'if (naik >= turun):'), msg: 'Jumlah kenaikan sama dengan jumlah penurunan harus STABIL. `>=` membuat kasus sama menjadi NAIK.', msgEn: "An equal number of increases and decreases must be STABIL. `>=` turns the equal case into NAIK." },
          { code: S4_PY.replace('total = T[0]\nfor i in range(1, 7):', 'total = 0\nfor i in range(1, 7):'), msg: 'Suhu hari-6 (T[0]) tidak ikut dijumlahkan: loop pembanding mulai dari indeks 1, jadi total harus diawali T[0], bukan 0.', msgEn: "The temperature of day-6 (T[0]) is not added: the comparison loop starts at index 1, so the total must start at T[0], not 0.", tag: 'init-in-loop' },
        ],
        plan: 'baca 7 suhu ke array T; naik ← 0, turun ← 0, total ← T[0]; untuk i dari 1 sampai 6: bandingkan T[i] dengan T[i−1], tambah naik atau turun, tambahkan T[i] ke total; tren = NAIK jika naik > turun, TURUN jika turun > naik, selain itu STABIL; rerata = total / 7',
        skeleton: [
          'T = [0 for i in range(7)]',
          'for i in range(7):',
          '    T[i] = int(input())',
          'naik = ___; turun = ___; total = T[___]',
          'for i in range(___, ___):',
          '    if (T[i] > T[___]):',
          '        naik = naik + 1',
          '    elif (T[i] < T[___]):',
          '        turun = ___',
          '    total = total + T[i]',
          'if (naik > turun):',
          '    tren = "NAIK"',
          '...',
          'rerata = total / ___',
        ].join('\n'),
        hints: [
          'Ada dua pekerjaan atas satu array: membandingkan hari berurutan (tren) dan menjumlah semua suhu (rerata). Keduanya bisa di satu loop.',
          'Pasangan yang dibandingkan adalah (hari i, hari i−1). Dengan 7 data ada berapa pasangan? Indeks mana yang awal dan akhir loop?',
          'Tren ditentukan dari **banyak** kenaikan vs penurunan, bukan dari selisih suhu. Jangan lupa kasus sama = STABIL.',
        ],
        work: [
          'Baca 7 suhu ke array T: `T[i] = int(input(...))` untuk i = 0..6.',
          'Siapkan penghitung naik = 0, turun = 0, total = T[0].',
          'Loop i = 1..6: jika T[i] > T[i−1] naik+1; jika T[i] < T[i−1] turun+1; selalu tambahkan T[i] ke total.',
          'Tentukan tren: naik > turun → NAIK; turun > naik → TURUN; selain itu STABIL.',
          'Rerata = total / 7 (pembagian `/` menghasilkan float). Tampilkan tren dan rerata.',
        ],
        syntax: ['list-init', 'list-index', 'for-range', 'if-elif', 'input', 'print-str'],
        lineNotes: [
          { line: [1, 9], note: 'Kerangka gaya kuliah: judul, spesifikasi, KAMUS sebagai komentar, ALGORITMA.', syntax: 'program-template', en: "Lecture-style template: title, specification, DECLARATIONS as comments, ALGORITHM." },
          { line: 10, note: 'Array 7 elemen dibuat dengan `[0 for i in range(7)]`: indeks 0..6 (indeks 0 = hari ke-6 sebelum hari ini).', syntax: 'list-init', en: "A 7-element array is created with `[0 for i in range(7)]`: indices 0..6 (index 0 = 6 days before today)." },
          { line: [11, 12], note: 'Isi array per indeks. `int(...)` karena `input()` string. Prompt di dalam `input("...")` memakai `str(6 - i)` agar urutan hari-6 sampai hari-0 sesuai contoh tampilan; prompt bukan bagian dari keluaran yang diperiksa.', syntax: 'input', en: "Fill the array by index. `int(...)` because `input()` returns a string. The prompt inside `input(\"...\")` uses `str(6 - i)` so the order day-6 to day-0 matches the sample display; the prompt is not part of the output that is checked." },
          { line: [13, 15], note: 'Penghitung diinisialisasi **sebelum** loop. `total = T[0]` karena loop berikutnya mulai dari indeks 1 dan T[0] juga harus ikut dijumlahkan.', en: "The counters are initialised **before** the loop. `total = T[0]` because the following loop starts at index 1 and T[0] must also be summed." },
          { line: 16, note: '`range(1, 7)` menghasilkan 1..6: tepat 6 pasangan hari berurutan untuk 7 data. Mulai dari 1 agar `T[i - 1]` tidak keluar array (indeks −1 diam-diam mengambil elemen terakhir).', syntax: 'for-range', en: "`range(1, 7)` yields 1..6: exactly 6 pairs of consecutive days for 7 data points. Start at 1 so `T[i - 1]` does not leave the array (index −1 silently takes the last element)." },
          { line: [17, 20], note: 'Bandingkan dengan hari sebelumnya. `elif` (bukan `if`): kenaikan, penurunan, atau sama (tidak dihitung). Suhu sama tidak menambah keduanya.', syntax: 'if-elif', en: "Compare with the previous day. `elif` (not `if`): an increase, a decrease, or equal (not counted). Equal temperatures increase neither counter." },
          { line: 21, note: 'Total dijumlahkan di loop yang sama (menghemat satu loop); sejajar dengan if (menjorok sama), jadi dijalankan setiap iterasi.', en: "The total is summed in the same loop (saves one loop); aligned with the if (same indentation), so it runs on every iteration." },
          { line: [22, 27], note: 'Tren dari **jumlah** kenaikan vs penurunan. `else` mencakup kasus sama (STABIL), yang jebakan jika memakai `>=`.', en: "The trend comes from the **number** of increases vs decreases. `else` covers the equal case (STABIL), which is a trap if you use `>=`." },
          { line: 28, note: '`/` selalu menghasilkan float di Python 3: 163 / 7 = 23.2857…. `//` akan membuang pecahan.', en: "`/` always produces a float in Python 3: 163 / 7 = 23.2857…. `//` would discard the fraction." },
          { line: [29, 30], note: '`str(rerata)` wajib saat digabung dengan string lewat `+`.', syntax: 'print-str', en: "`str(rerata)` is required when joining with a string using `+`." },
        ],
        rubric: RB_4,
        explanation: [
          '**Alternatif Jawaban (resmi):** contoh program yang benar:',
          '```python',
          '# Menerima input suhu harian selama 7 hari terakhir',
          'suhu_harian = []',
          'for i in range(7):',
          '    suhu = int(input(f"Masukkan suhu hari-{6 - i}: "))',
          '    suhu_harian.append(suhu)',
          '',
          '# Menentukan tren suhu harian',
          'naik = 0',
          'turun = 0',
          'for i in range(1, 7):',
          '    if suhu_harian[i] > suhu_harian[i - 1]:',
          '        naik += 1',
          '    elif suhu_harian[i] < suhu_harian[i - 1]:',
          '        turun += 1',
          '',
          'if naik > turun:',
          '    tren = "NAIK"',
          'elif turun > naik:',
          '    tren = "TURUN"',
          'else:',
          '    tren = "STABIL"',
          '',
          '# Menghitung rerata suhu harian',
          'rerata = sum(suhu_harian) / len(suhu_harian)',
          '',
          '# Menampilkan hasil',
          'print(f"Tren suhu harian {tren}")',
          'print(f"Rerata suhu harian {rerata}")',
          '```',
          'Cara Penilaian resmi: Nilai Soal 4 dinilai berdasarkan rubrik penilaian. Solusi gaya kuliah di atas setara; kunci: loop `range(1, 7)`, tiga kasus tren, dan rerata dengan pembagian `/`.',
        ].join('\n'),
        refs: [ref(7), ref(8)],
        en: { stem: 'Write a Python program that (1) receives the daily temperature of the last 7 days into an array of integers, (2) determines the daily temperature trend (rising, falling, or stable) and displays it on the screen, and (3) calculates the mean daily temperature and displays it on the screen.', explanation: "**Alternative answer (official):** an example of a correct program:\n```python\n# Menerima input suhu harian selama 7 hari terakhir\nsuhu_harian = []\nfor i in range(7):\n    suhu = int(input(f\"Masukkan suhu hari-{6 - i}: \"))\n    suhu_harian.append(suhu)\n\n# Menentukan tren suhu harian\nnaik = 0\nturun = 0\nfor i in range(1, 7):\n    if suhu_harian[i] > suhu_harian[i - 1]:\n        naik += 1\n    elif suhu_harian[i] < suhu_harian[i - 1]:\n        turun += 1\n\nif naik > turun:\n    tren = \"NAIK\"\nelif turun > naik:\n    tren = \"TURUN\"\nelse:\n    tren = \"STABIL\"\n\n# Menghitung rerata suhu harian\nrerata = sum(suhu_harian) / len(suhu_harian)\n\n# Menampilkan hasil\nprint(f\"Tren suhu harian {tren}\")\nprint(f\"Rerata suhu harian {rerata}\")\n```\n(The comments above are the official Indonesian ones: receive the daily temperature for the last 7 days; determine the daily temperature trend; compute the mean daily temperature; display the result.)\nOfficial grading method: the score for Problem 4 is based on the grading rubric. The lecture-style solution above is equivalent; the keys: the loop `range(1, 7)`, three trend cases, and the mean using `/` division.", hints: ["There are two jobs on one array: comparing consecutive days (trend) and summing all temperatures (mean). Both can be done in one loop.", "The pairs compared are (day i, day i−1). With 7 data points, how many pairs are there? Which indices are the start and end of the loop?", "The trend is decided by the **number** of increases vs decreases, not by the temperature difference. Don't forget the equal case = STABIL."], work: ["Read 7 temperatures into array T: `T[i] = int(input(...))` for i = 0..6.", "Prepare counters naik = 0, turun = 0, total = T[0].", "Loop i = 1..6: if T[i] > T[i−1] naik+1; if T[i] < T[i−1] turun+1; always add T[i] to total.", "Determine the trend: naik > turun → NAIK; turun > naik → TURUN; otherwise STABIL.", "Mean = total / 7 (the `/` division gives a float). Print the trend and the mean."], plan: "read 7 temperatures into array T; naik ← 0, turun ← 0, total ← T[0]; for i from 1 to 6: compare T[i] with T[i−1], increment naik or turun, add T[i] to total; trend = NAIK if naik > turun, TURUN if turun > naik, otherwise STABIL; mean = total / 7" },
      }],
      en: { title: 'Problem 4 – Air temperature data', intro: "Agus is a weather forecast presenter at a television station. Every day, Agus obtains daily temperature data (in Celsius) for each city from a weather station. In his presentation on the show, Agus wants to display the mean daily temperature over the last week for each city. Agus also wants to tell his audience whether the trend of the daily temperature over the last week tends to rise or fall.\n\nThe daily temperature trend is said to be rising if, in the last week, there were more daily temperature increases than decreases, where an increase and a decrease are determined by comparing the daily temperature of a certain day with the day before. If the number of increases and decreases in the last week is the same, then the daily temperature trend is said to be stable.\n\nBelow is an example of daily temperature data over a week for the cases of a falling, rising, and stable trend, along with their mean daily temperature.\n\n| Array Index | Day | Temperature (FALLING) | Rise/Fall | Temperature (RISING) | Rise/Fall | Temperature (STABLE) | Rise/Fall |\n|---|---|---|---|---|---|---|---|\n| 0 | D minus 6 | 25 | | 27 | | 28 | |\n| 1 | D minus 5 | 26 | rise | 27 | stable | 28 | stable |\n| 2 | D minus 4 | 24 | fall | 28 | rise | 29 | rise |\n| 3 | D minus 3 | 23 | fall | 31 | rise | 28 | fall |\n| 4 | D minus 2 | 22 | fall | 29 | fall | 26 | fall |\n| 5 | D minus 1 | 20 | fall | 28 | fall | 26 | stable |\n| 6 | Today | 23 | rise | 30 | rise | 28 | rise |\n| | Mean daily temperature over the last week | 23.28 | | 28.57 | | 27.57 | |\n\nHelp Agus solve this problem. Write a Python program that does the following:\n1. Receives input from the user in the form of the daily temperature for the last 7 days and stores it in an array of integers.\n2. Determines the daily temperature trend (rising, falling, or stable) and displays it on the screen.\n3. Calculates the mean daily temperature and displays it on the screen.\n\nExample program display:\n```\nMasukkan suhu hari-6: 25\nMasukkan suhu hari-5: 26\nMasukkan suhu hari-4: 24\nMasukkan suhu hari-3: 23\nMasukkan suhu hari-2: 22\nMasukkan suhu hari-1: 20\nMasukkan suhu hari-0: 23\n\nTren suhu harian TURUN\nRerata suhu harian 23.2857143\n```\n(Masukkan suhu hari-N = Enter the temperature of day-N; Tren suhu harian TURUN = Daily temperature trend FALLING; Rerata suhu harian = Mean daily temperature.)\n\nNote: in the tests on this site, the input is 7 integers, one per line. The checker only checks the trend word and the mean value (the number of decimals is free)." },
    },

    /* ---------------- Soal 5: Membaca Flowchart ---------------- */
    {
      id: 'g24-s5', archetype: 'trace', title: 'Soal 5 – Membaca Flowchart',
      source: { kind: 'guide' as const, lang: 'id' as const, src: SRC, label: 'Soal 5', pages: [9, 10], official: true, year: 2024 },
      paperWeight: 0.15,
      intro: 'Diketahui sebuah flowchart seperti di samping (lihat gambar): input N; C1 = 0, C2 = 0, i = 1; selama tidak (i > N): input P1 dan P2; jika P1 > P2 maka C1 = C1 + 1, jika tidak, jika P1 < P2 maka C2 = C2 + 1; i = i + 1; setelah selesai output (C1, C2). Tuliskan nilai akhir C1 dan C2 jika diberikan input N dan pasangan nilai P1 dan P2 seperti pada butir a, b, c berikut. **Cara Penilaian resmi:** Nilai Soal 5 = Nilai Soal 5a × 30% + Nilai Soal 5.b × 30% + Nilai Soal 5.b × 40% (tertulis demikian di panduan; yang dimaksud: 5a 30%, 5b 30%, 5c 40%).',
      parts: [
        {
          id: 'g24-s5a', kind: 'trace', label: 'a', weight: 0.3, decks: ['D02', 'D05'], topic: 'Reading a flowchart: two counters', patterns: ['count-if', 'while-counter'], ask: 'final', watch: ['C1', 'C2'],
          stem: 'Tuliskan nilai akhir C1 dan C2 jika N = 10 dan pasangan (P1, P2) yang dimasukkan berurutan: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1), (1,6), (2,5), (3,4), (4,3).',
          flow: {
            title: 'Membaca flowchart (UTS 2024, Soal 5)',
            blocks: [
              { t: 'io', dir: 'in', text: 'input(N)' },
              { t: 'process', text: 'C1 ← 0' },
              { t: 'process', text: 'C2 ← 0' },
              { t: 'process', text: 'i ← 1' },
              {
                t: 'while', cond: 'i <= N', body: [
                  { t: 'io', dir: 'in', text: 'input(P1)' },
                  { t: 'io', dir: 'in', text: 'input(P2)' },
                  {
                    t: 'if', cond: 'P1 > P2',
                    then: [{ t: 'process', text: 'C1 ← C1 + 1' }],
                    else: [{ t: 'if', cond: 'P1 < P2', then: [{ t: 'process', text: 'C2 ← C2 + 1' }] }],
                  },
                  { t: 'process', text: 'i ← i + 1' },
                ],
              },
              { t: 'io', dir: 'out', text: 'output(C1, C2)' },
            ],
          },
          stdin: ['10', '1', '6', '2', '5', '3', '4', '4', '3', '5', '2', '6', '1', '1', '6', '2', '5', '3', '4', '4', '3'],
          lineNotes: [
            { line: 1, note: 'Blok 1: `input(N)`, banyak pasangan nilai yang akan dibaca (bukan banyak data total).', en: "Block 1: `input(N)`, the number of pairs of values to be read (not the total number of data items)." },
            { line: [2, 4], note: 'Blok 2: inisialisasi dua penghitung C1, C2 = 0 dan pencacah i = 1 **sebelum** perulangan.', en: "Block 2: initialise the two counters C1, C2 = 0 and the counter i = 1 **before** the loop." },
            { line: 5, note: 'Blok 3 (belah ketupat `i > N`): jalur *true* keluar dari loop menuju output; jalur *false* masuk badan loop. Jadi badan loop dijalankan selama i ≤ N: N kali bila i mulai dari 1.', en: "Block 3 (the `i > N` diamond): the *true* path leaves the loop towards the output; the *false* path enters the loop body. So the body runs while i ≤ N: N times if i starts at 1." },
            { line: [6, 7], note: 'Setiap iterasi membaca **sepasang** nilai: P1 lalu P2.', en: "Each iteration reads a **pair** of values: P1 then P2." },
            { line: 8, note: 'Cabang `P1 > P2`: C1 bertambah. Jika tidak, cabang kedua `P1 < P2`: C2 bertambah. Jika P1 = P2 tidak ada yang bertambah.', en: "Branch `P1 > P2`: C1 increases. Otherwise, the second branch `P1 < P2`: C2 increases. If P1 = P2 nothing increases." },
            { line: 9, note: '`i ← i + 1` ada di luar if (semua jalur bertemu di sini); tanpa ini loop tidak berhenti.', en: "`i ← i + 1` is outside the if (all paths meet here); without it the loop does not stop." },
            { line: 10, note: 'Output (C1, C2) setelah loop berhenti: dicetak sekali.', en: "Output (C1, C2) after the loop stops: printed once." },
          ],
          explanation: [
            'Jawaban resmi: **C1 = 4, C2 = 6**. Pasangan dengan P1 > P2: (4,3), (5,2), (6,1), (4,3) = 4; pasangan dengan P1 < P2: (1,6), (2,5), (3,4), (1,6), (2,5), (3,4) = 6.',
            '',
            RB_5AB_TABLE,
          ].join('\n'),
          refs: [ref(9)],
          en: { stem: 'Write the final values of C1 and C2 if N = 10 and the (P1, P2) pairs entered in order are: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1), (1,6), (2,5), (3,4), (4,3).', explanation: "Official answer: **C1 = 4, C2 = 6**. Pairs with P1 > P2: (4,3), (5,2), (6,1), (4,3) = 4; pairs with P1 < P2: (1,6), (2,5), (3,4), (1,6), (2,5), (3,4) = 6.\n\n**Grading rubric for Problems 5.a and 5.b (official):**\n\n| Score | Description | Grade |\n|---|---|---|\n| 4 | C1 and C2 are correct | A |\n| 2 | Only C1 or only C2 is correct | C |\n| 0 | No correct answer | E |" },
        },
        {
          id: 'g24-s5b', kind: 'trace', label: 'b', weight: 0.3, decks: ['D02', 'D05'], topic: 'Reading a flowchart: two counters', patterns: ['count-if', 'while-counter'], ask: 'final', watch: ['C1', 'C2'],
          stem: 'Tuliskan nilai akhir C1 dan C2 jika N = 4 dan pasangan (P1, P2) yang dimasukkan berurutan: (2,1), (2,1), (1,2), (1,2).',
          flow: {
            title: 'Membaca flowchart (UTS 2024, Soal 5)',
            blocks: [
              { t: 'io', dir: 'in', text: 'input(N)' },
              { t: 'process', text: 'C1 ← 0' },
              { t: 'process', text: 'C2 ← 0' },
              { t: 'process', text: 'i ← 1' },
              {
                t: 'while', cond: 'i <= N', body: [
                  { t: 'io', dir: 'in', text: 'input(P1)' },
                  { t: 'io', dir: 'in', text: 'input(P2)' },
                  {
                    t: 'if', cond: 'P1 > P2',
                    then: [{ t: 'process', text: 'C1 ← C1 + 1' }],
                    else: [{ t: 'if', cond: 'P1 < P2', then: [{ t: 'process', text: 'C2 ← C2 + 1' }] }],
                  },
                  { t: 'process', text: 'i ← i + 1' },
                ],
              },
              { t: 'io', dir: 'out', text: 'output(C1, C2)' },
            ],
          },
          stdin: ['4', '2', '1', '2', '1', '1', '2', '1', '2'],
          lineNotes: [
            { line: 1, note: 'N = 4: empat pasangan akan dibaca.', en: "N = 4: four pairs will be read." },
            { line: [2, 4], note: 'C1 = C2 = 0, i = 1 sebelum loop.', en: "C1 = C2 = 0, i = 1 before the loop." },
            { line: 5, note: 'Loop berjalan untuk i = 1, 2, 3, 4 (selama i ≤ N).', en: "The loop runs for i = 1, 2, 3, 4 (while i ≤ N)." },
            { line: [6, 7], note: 'Satu pasangan per iterasi: (2,1), (2,1), (1,2), (1,2).', en: "One pair per iteration: (2,1), (2,1), (1,2), (1,2)." },
            { line: 8, note: 'Dua pasangan pertama P1 > P2 → C1 = 2; dua pasangan terakhir P1 < P2 → C2 = 2.', en: "The first two pairs have P1 > P2 → C1 = 2; the last two pairs have P1 < P2 → C2 = 2." },
            { line: 9, note: 'i bertambah di setiap iterasi, apa pun cabangnya.', en: "i increases in every iteration, whichever branch is taken." },
            { line: 10, note: 'Output C1 dan C2 setelah i = 5 (5 > 4).', en: "Output C1 and C2 after i = 5 (5 > 4)." },
          ],
          explanation: ['Jawaban resmi: **C1 = 2, C2 = 2**.', '', RB_5AB_TABLE].join('\n'),
          refs: [ref(9)],
          en: { stem: 'Write the final values of C1 and C2 if N = 4 and the (P1, P2) pairs entered in order are: (2,1), (2,1), (1,2), (1,2).', explanation: "Official answer: **C1 = 2, C2 = 2**.\n\n**Grading rubric for Problems 5.a and 5.b (official):**\n\n| Score | Description | Grade |\n|---|---|---|\n| 4 | C1 and C2 are correct | A |\n| 2 | Only C1 or only C2 is correct | C |\n| 0 | No correct answer | E |" },
        },
        {
          id: 'g24-s5c', kind: 'open', label: 'c', weight: 0.4, decks: ['D02', 'D05'], topic: 'Reading a flowchart: boundary case N = 0',
          stem: 'Apa yang terjadi jika N diberikan nilai 0? Jelaskan.',
          answer: 'Jika N = 0, maka setelah assignment i = 1, pada pemeriksaan i > N didapatkan 1 > 0 → true sehingga tidak akan masuk ke body loop dan langsung output C1 = 0 dan C2 = 0',
          rubric: RB_5C,
          keyPoints: ['Pemeriksaan i > N dilakukan sebelum badan loop (1 > 0 benar)', 'Badan loop tidak pernah dijalankan; tidak ada input P1/P2', 'Output C1 = 0 dan C2 = 0'],
          explanation: 'Pemeriksaan kondisi ada di **atas** loop (while), sehingga jika kondisi henti sudah benar sejak awal, badan loop dilewati. Ini sama dengan "N < 1 tidak menjalankan perintah" pada banyak soal repeat.',
          refs: [ref(9), ref(10)],
          en: { stem: 'What happens if N is 0? Explain.', explanation: "The condition check is at the **top** of the loop (while), so if the stop condition is already true at the start, the loop body is skipped. This is the same as \"N < 1 does not execute the command\" in many repeat problems.", answer: "If N = 0, then after the assignment i = 1, the check i > N gives 1 > 0 → true, so the loop body is not entered and the program immediately outputs C1 = 0 and C2 = 0", keyPoints: ["The check i > N is made before the loop body (1 > 0 is true)", "The loop body never runs; no P1/P2 is read", "Output C1 = 0 and C2 = 0"] },
        },
      ],
      en: { title: 'Problem 5 – Reading a flowchart', intro: "Given a flowchart as beside (see the figure): input N; C1 = 0, C2 = 0, i = 1; while not (i > N): input P1 and P2; if P1 > P2 then C1 = C1 + 1, otherwise, if P1 < P2 then C2 = C2 + 1; i = i + 1; after finishing, output (C1, C2). Write the final values of C1 and C2 given the input N and the pairs of values P1 and P2 as in items a, b, c below. **Official grading method:** Problem 5 score = score of Problem 5a × 30% + score of Problem 5.b × 30% + score of Problem 5.b × 40% (written like this in the guide; what is meant: 5a 30%, 5b 30%, 5c 40%)." },
    },

    /* ---------------- Soal 6: Membaca Program Python ---------------- */
    {
      id: 'g24-s6', archetype: 'trace', title: 'Soal 6 – Membaca Program Python',
      source: { kind: 'guide' as const, lang: 'id' as const, src: SRC, label: 'Soal 6', pages: [10, 11, 12], official: true, year: 2024 },
      paperWeight: 0.15,
      intro: [
        'Sebuah biro konsultan pajak membuat sebuah program kalkulator pajak sederhana untuk membantu pelanggannya menghitung pajak penghasilan (PPh) progresif. Program tersebut ditulis dengan bahasa Python (lihat listing pada tiap butir; nilai `...` pada baris 5 sampai 7 diganti nilai masukan butir tersebut).',
        '',
        'Sebutkan luaran program jika input program adalah sebagai berikut. Berikan penjelasan singkat mengapa luarannya seperti yang Anda sebutkan.',
        '',
        'Catatan:',
        '- Untuk memudahkan perhitungan, semua nilai uang adalah dalam jutaan rupiah.',
        '- Program sudah dipastikan berjalan dengan benar tanpa error.',
        '',
        '**Cara Penilaian resmi:** Nilai Soal 6 = (Nilai Soal 6.a + Nilai Soal 6.b + Nilai Soal 6.c) / 3.',
      ].join('\n'),
      figures: [ref(10)],
      parts: [
        {
          id: 'g24-s6a', kind: 'trace', label: 'a', weight: 1 / 3, decks: ['D05', 'D06'], topic: 'Reading a program: progressive tax (list, while)', patterns: ['while-counter', 'array-map'], ask: 'output',
          stem: 'Sebutkan luaran program jika pendapatan = 80, jumlah_anak = 3, sumbangan_wajib = 2. Berikan penjelasan singkat mengapa luarannya seperti itu.',
          code: pajak(80, 3, 2),
          lineNotes: S6_NOTES,
          syntax: ['list-index', 'while', 'if-else', 'print-str'],
          explanation: [
            'Jawaban resmi: `Pajak Penghasilan (PPh) = Rp. 0 juta`. Penjelasan resmi: pajak penghasilan dihitung progresif dengan tarif berbeda pada tiap rentang (bracket): 0 sampai 60 jt 10%, 60 sampai 250 jt 20%, 250 jt sampai 1 M 30%, di atas 1 M 40%. Sebelum tarif dihitung, perlu dihitung penghasilan kena pajak (pkp) = penghasilan − sumbangan wajib − ptkp (tergantung jumlah anak). Panduan menulis pkp = 80 − 2 − 80 = −2 (dianggap 0, belum wajib pajak); menurut listing, `ptkp[3]` = 90 sehingga pkp = −12. Kedua cara bernilai negatif, jadi `while` tidak pernah dijalankan dan total pajak tetap 0 (integer, tercetak `0`).',
            '',
            'Catatan: kunci sumber memakai nilai ptkp 50/60/70/80 pada ringkasan perhitungannya, sedangkan listing pada soal memuat `ptkp = [60, 70, 80, 90]`; menurut kode, hasil butir a tetap 0, tetapi butir b dan c berbeda (lihat di bawah). Ikuti kode.',
            '',
            RB_6_TABLE,
          ].join('\n'),
          refs: [ref(10), ref(11)],
          en: { stem: 'State the program output if pendapatan = 80, jumlah_anak = 3, sumbangan_wajib = 2. Give a short explanation of why the output is like that.', explanation: "Official answer: `Pajak Penghasilan (PPh) = Rp. 0 juta` (income tax = Rp. 0 million). Official explanation: income tax is calculated progressively with a different rate in each bracket: 0 to 60 million 10%, 60 to 250 million 20%, 250 million to 1 billion 30%, above 1 billion 40%. Before applying the rates, the taxable income (pkp) must be computed = income − mandatory donation − ptkp (depending on the number of children). The guide writes pkp = 80 − 2 − 80 = −2 (treated as 0, not yet a taxpayer); according to the listing, `ptkp[3]` = 90 so pkp = −12. Both are negative, so the `while` never runs and the total tax stays 0 (an integer, printed as `0`).\n\nNote: the source key uses ptkp values 50/60/70/80 in its calculation summary, whereas the listing in the problem contains `ptkp = [60, 70, 80, 90]`; according to the code, the result of part a is still 0, but parts b and c differ (see below). Follow the code.\n\n**Grading rubric for Problems 6.a, 6.b and 6.c (official):**\n\n| Score | Description | Grade |\n|---|---|---|\n| 4 | The program output is correct and the explanation is accurate | A |\n| 3 | The program output is correct, but the explanation contains errors | B |\n| 2 | The program output is correct, but the answer is not explained or the explanation is entirely wrong. | C |\n| 1 | Some parts of the answer are correct, but most are wrong. | D |\n| 0 | Not attempted, or the answer is entirely wrong. | E |" },
        },
        {
          id: 'g24-s6b', kind: 'trace', label: 'b', weight: 1 / 3, decks: ['D05', 'D06'], topic: 'Reading a program: progressive tax (list, while)', patterns: ['while-counter', 'array-map'], ask: 'output',
          stem: 'Sebutkan luaran program jika pendapatan = 300, jumlah_anak = 0, sumbangan_wajib = 10. Berikan penjelasan singkat mengapa luarannya seperti itu.',
          code: pajak(300, 0, 10),
          lineNotes: S6_NOTES,
          syntax: ['list-index', 'while', 'if-else', 'print-str'],
          explanation: [
            'Kunci resmi: `Pajak Penghasilan (PPh) = Rp. 42.0 juta` (pkp = 300 − 10 − 50 = 240; bracket 1: 60 × 10% = 6; bracket 2: 180 × 20% = 36; total 42). **Catatan: kunci sumber menyebut 42.0; menurut kode pada soal** `ptkp[0]` = 60, sehingga pkp = 300 − 10 − 60 = 230, pajak = 60 × 10% + 170 × 20% = 6 + 34 = **40.0**. Kunci memakai ptkp 50 yang tidak ada di listing; jangan dipelajari sebagai fakta. Pada ujian, ikuti kode yang dicetak di kertas soal dan tunjukkan perhitungan bracket.',
            '',
            RB_6_TABLE,
          ].join('\n'),
          refs: [ref(11)],
          en: { stem: 'State the program output if pendapatan = 300, jumlah_anak = 0, sumbangan_wajib = 10. Give a short explanation of why the output is like that.', explanation: "Official key: `Pajak Penghasilan (PPh) = Rp. 42.0 juta` (pkp = 300 − 10 − 50 = 240; bracket 1: 60 × 10% = 6; bracket 2: 180 × 20% = 36; total 42). **Note: the source key says 42.0; according to the code in the problem** `ptkp[0]` = 60, so pkp = 300 − 10 − 60 = 230, tax = 60 × 10% + 170 × 20% = 6 + 34 = **40.0**. The key uses a ptkp of 50 that is not in the listing; do not learn it as fact. In the exam, follow the code printed on the question paper and show the bracket calculation.\n\n**Grading rubric for Problems 6.a, 6.b and 6.c (official):**\n\n| Score | Description | Grade |\n|---|---|---|\n| 4 | The program output is correct and the explanation is accurate | A |\n| 3 | The program output is correct, but the explanation contains errors | B |\n| 2 | The program output is correct, but the answer is not explained or the explanation is entirely wrong. | C |\n| 1 | Some parts of the answer are correct, but most are wrong. | D |\n| 0 | Not attempted, or the answer is entirely wrong. | E |" },
        },
        {
          id: 'g24-s6c', kind: 'trace', label: 'c', weight: 1 / 3, decks: ['D05', 'D06'], topic: 'Reading a program: progressive tax (list, while)', patterns: ['while-counter', 'array-map'], ask: 'output',
          stem: 'Sebutkan luaran program jika pendapatan = 1100, jumlah_anak = 3, sumbangan_wajib = 30. Berikan penjelasan singkat mengapa luarannya seperti itu.',
          code: pajak(1100, 3, 30),
          lineNotes: S6_NOTES,
          syntax: ['list-index', 'while', 'if-else', 'print-str'],
          explanation: [
            'Kunci resmi: `Pajak Penghasilan (PPh) = Rp. 266.0 juta` (pkp = 1100 − 30 − 80 = 990; 60 × 10% = 6; 190 × 20% = 38; 740 × 30% = 222; total 266). **Catatan: kunci sumber menyebut 266.0; menurut kode pada soal** `ptkp[3]` = 90, pkp = 1100 − 30 − 90 = 980; bracket 1: 60 × 10% = 6; bracket 2: (250 − 60) × 20% = 38; bracket 3: (980 − 250) × 30% = 219; bracket 4 tidak tercapai (980 < 1000); total ≈ **263.0**. Perbedaan 3 berasal dari ptkp 80 (kunci) versus 90 (listing). Ikuti kode.',
            '',
            RB_6_TABLE,
          ].join('\n'),
          refs: [ref(11), ref(12)],
          en: { stem: 'State the program output if pendapatan = 1100, jumlah_anak = 3, sumbangan_wajib = 30. Give a short explanation of why the output is like that.', explanation: "Official key: `Pajak Penghasilan (PPh) = Rp. 266.0 juta` (pkp = 1100 − 30 − 80 = 990; 60 × 10% = 6; 190 × 20% = 38; 740 × 30% = 222; total 266). **Note: the source key says 266.0; according to the code in the problem** `ptkp[3]` = 90, pkp = 1100 − 30 − 90 = 980; bracket 1: 60 × 10% = 6; bracket 2: (250 − 60) × 20% = 38; bracket 3: (980 − 250) × 30% = 219; bracket 4 is not reached (980 < 1000); total ≈ **263.0**. The difference of 3 comes from a ptkp of 80 (key) versus 90 (listing). Follow the code.\n\n**Grading rubric for Problems 6.a, 6.b and 6.c (official):**\n\n| Score | Description | Grade |\n|---|---|---|\n| 4 | The program output is correct and the explanation is accurate | A |\n| 3 | The program output is correct, but the explanation contains errors | B |\n| 2 | The program output is correct, but the answer is not explained or the explanation is entirely wrong. | C |\n| 1 | Some parts of the answer are correct, but most are wrong. | D |\n| 0 | Not attempted, or the answer is entirely wrong. | E |" },
        },
      ],
      en: { title: 'Problem 6 – Reading a Python program', intro: "A tax consulting firm created a simple tax calculator program to help its customers calculate progressive income tax (PPh). The program is written in Python (see the listing in each item; replace the `...` values on lines 5 to 7 with the input values of that item).\n\nState the output of the program if the program input is as follows. Give a short explanation of why the output is as you state.\n\nNotes:\n- To make the calculation easier, all monetary values are in millions of rupiah.\n- The program is guaranteed to run correctly without errors.\n\n**Official grading method:** Problem 6 score = (Problem 6.a score + Problem 6.b score + Problem 6.c score) / 3." },
    },
  ],
  papers: [
    {
      id: 'guide2024', title: 'Petunjuk Penilaian UTS WI1102 Berpikir Komputasional, Bagian II (16 Nov 2024)', year: 2024, date: '2024-11-16', kind: 'guide' as const, lang: 'id' as const,
      note: "Official grading guide: the questions, model answers and rubrics scored 0 to 4 (3.5 = AB). UTS score weights: S1 20%, S2 20%, S3 to S6 15% each. Part I (Bagian I) is not in this guide.",
      noteId: 'Panduan penilaian resmi: soal, alternatif jawaban, dan rubrik 0 sampai 4 (3,5 = AB). Bobot Nilai UTS: S1 20%, S2 20%, S3 sampai S6 masing-masing 15%. Bagian I tidak ada di panduan ini.',
      problems: ['g24-s1', 'g24-s2', 'g24-s3', 'g24-s4', 'g24-s5', 'g24-s6'],
    },
  ],
  flashcards: [],
}
