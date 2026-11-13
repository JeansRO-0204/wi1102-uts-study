// Older papers of the predecessor course KU1102 Pengenalan Komputasi (2018, 2019, 2021) + Latihan Soal 2019.
// Prefixes: k18- (UTS 2018), k19- (UTS 2019), k21- (UTS 2021), kls- (Latihan Soal 2019).
// Items outside the WI1102 syllabus (hardware/network, matrices, online-lecture tools) carry outOfScope: true.
import type { BankFile, En, LineNote, Problem, Provenance, Rep, RubricRow, SyntaxId } from '../types'

const r = String.raw

const S18 = 'UTS_KU1102_2018'
const S19 = 'UTS_KU1102_2019'
const S21 = 'UTS_KU1102_2021'
const SLS = 'KU1102_LatihanSoal_2019'

const prov = (src: string, label: string, pages: number[], year: number, oos = false): Provenance =>
  ({ kind: 'older' as const, lang: 'id' as const, src, label, pages, official: true, year, ...(oos ? { outOfScope: true } : {}) })

/** Line notes located by anchor text (first line containing `anchor`; optional `end` anchor for a block). */
const N = (code: string, items: [string, string, SyntaxId?, string?][]): LineNote[] => items.map(([a, note, syntax, end]) => {
  const lines = code.split('\n')
  const i = lines.findIndex((l) => l.includes(a))
  if (i < 0) throw new Error('lineNote anchor not found: ' + a)
  let j = i
  if (end) { j = lines.findIndex((l, k) => k >= i && l.includes(end)); if (j < 0) throw new Error('lineNote end anchor not found: ' + end) }
  return { line: (i === j ? i + 1 : [i + 1, j + 1]) as number | [number, number], note, ...(syntax ? { syntax } : {}) }
})

const nl = (n: number, f: (i: number) => number | string): string[] => Array.from({ length: n }, (_, i) => String(f(i)))
const mat = (m: number[][]): string[] => [String(m.length), String(m[0].length), ...m.flat().map(String)]

const openRubric: RubricRow[] = [
  { score: 4, desc: 'Jawaban benar dan lengkap, argumen jelas, dan ada contoh/penerapan yang relevan', descEn: 'The answer is correct and complete, the argument is clear, and there is a relevant example/application' },
  { score: 3.5, desc: 'Jawaban benar dengan argumen cukup jelas; ada kekurangan kecil (mis. contoh kurang tepat)', descEn: 'The answer is correct with a reasonably clear argument; a small shortcoming (e.g. a not quite fitting example)' },
  { score: 3, desc: 'Inti jawaban benar, tetapi penjelasan/argumen kurang lengkap', descEn: 'The core of the answer is correct, but the explanation/argument is incomplete' },
  { score: 2, desc: 'Hanya sebagian jawaban yang benar atau argumennya lemah', descEn: 'Only part of the answer is correct or the argument is weak' },
  { score: 1, desc: 'Ada aspek yang benar, tetapi sebagian besar tidak menjawab pertanyaan', descEn: 'Some aspect is correct, but most of it does not answer the question' },
  { score: 0, desc: 'Tidak mengerjakan atau jawaban sama sekali salah', descEn: 'Did not attempt or the answer is entirely wrong' },
]
const progRubric: RubricRow[] = [
  { score: 4, desc: 'Program benar untuk semua kasus (termasuk kasus batas), struktur dan notasi sesuai yang diajarkan di kelas', descEn: 'The program is correct for all cases (including boundary cases), and the structure and notation follow what is taught in class' },
  { score: 3.5, desc: 'Program hampir benar; ada kesalahan kecil (mis. satu kondisi batas, konversi tipe, atau str())', descEn: 'The program is almost correct; a small error (e.g. one boundary condition, type conversion, or str())' },
  { score: 3, desc: 'Logika utama benar, tetapi ada kesalahan yang mengubah hasil pada sebagian kasus', descEn: 'The main logic is right, but an error changes the result in some cases' },
  { score: 2, desc: 'Hanya sebagian langkah benar (mis. input/output benar, tetapi perhitungan atau percabangan keliru)', descEn: 'Only some steps are correct (e.g. input/output right, but the computation or branching is wrong)' },
  { score: 1, desc: 'Ada aspek yang benar, tetapi program tidak menyelesaikan masalah', descEn: 'Some aspect is correct, but the program does not solve the problem' },
  { score: 0, desc: 'Tidak mengerjakan atau program sama sekali salah', descEn: 'Did not attempt or the program is entirely wrong' },
]

/* ----------------------------- judges (Python source) ----------------------------- */

/** Compare the sequence of numbers (tolerance 0.01 or 1e-4 relative): for outputs whose number of decimals is free. */
const numJudge = r`import re
def judge(stdin, out, ref_out):
    f = lambda s: [float(x) for x in re.findall(r'(?<![A-Za-z0-9])-?\d+(?:\.\d+)?|\d+(?:\.\d+)?', s)]
    a, b = f(out), f(ref_out)
    if len(a) != len(b):
        return "The count of numbers in the output (" + str(len(a)) + ") differs from the expected count (" + str(len(b)) + ")."
    for x, y in zip(a, b):
        if abs(x - y) > max(0.01, abs(y) * 1e-4):
            return "The value " + str(x) + " is wrong; it should be about " + str(y) + "."
    return None`

/** Output is a single class letter A-F (or the 'Tidak memenuhi kualifikasi' message); surrounding words are free. */
const classJudge = r`import re
def judge(stdin, out, ref_out):
    if 'tidak' in ref_out.lower():
        return None if 'tidak' in out.lower() else "A body weight below 45 kg must produce the message 'Tidak memenuhi kualifikasi'."
    a = re.findall(r'\b[A-F]\b', out)
    b = re.findall(r'\b[A-F]\b', ref_out)
    return None if a == b else "The class shown is wrong (it should be " + ''.join(b) + ")."`

const armJudge = r`def judge(stdin, out, ref_out):
    neg = lambda s: ('bukan' in s.lower()) or ('tidak' in s.lower())
    want_arm = not neg(ref_out)
    if want_arm:
        return None if ('armstrong' in out.lower() and not neg(out)) else "This is an Armstrong number; the output must say so."
    return None if neg(out) else "This is not an Armstrong number; the output must say 'bukan'."`

const bloodJudge = r`import re
def judge(stdin, out, ref_out):
    f = lambda s: re.findall(r'\b(?:AB|A|B|O)\b', s)
    return None if f(out) == f(ref_out) else "The blood type shown is wrong (it should be " + ''.join(f(ref_out)) + ")."`

const negJudge = r`def judge(stdin, out, ref_out):
    neg = lambda s: ('tidak' in s.lower()) or ('bukan' in s.lower())
    if not out.strip():
        return "No output."
    return None if neg(out) == neg(ref_out) else "The conclusion in the output is the opposite of what it should be."`

const weightJudge = r`import re
def judge(stdin, out, ref_out):
    T = [int(s) for s in stdin[:50]]
    X = int(stdin[50])
    big = [t for t in T if t > X]
    exp = [max(T), len(big)] + big
    got = [int(x) for x in re.findall(r'-?\d+', out)]
    it = iter(got)
    if all(e in it for e in exp):
        return None
    return "Make sure the output is in order: the largest weight, the number of students with weight > X, then (if any) the list of weights > X. It should contain: " + str(exp)`

/* ================================== PROBLEMS ================================== */

const problems: Problem[] = []

/* ---------------------------------- UTS 2018 ---------------------------------- */

problems.push({
  id: 'k18-s1', archetype: 'concept', title: 'Soal 1 – Pengantar Berpikir Komputasional, Sistem Computing, dan Jaringan Komputer',
  source: prov(S18, 'Soal 1', [2], 2018), paperWeight: 0.3,
  intro: 'Tuliskan jawaban secara singkat, padat, tapi dengan argumen yang jelas. Gunakan Bahasa Indonesia yang baik dan benar.',
  en: { title: 'Q1 – Intro to computational thinking, computing systems and networks' },
  parts: [
    {
      id: 'k18-s1a', kind: 'open', label: 'a', decks: ['D01'], topic: 'Why CT matters',
      stem: 'Jelaskan mengapa kemampuan berpikir komputasional menjadi salah satu skill yang penting di abad 21.',
      answer: 'Berpikir komputasional (CT) adalah proses berpikir untuk memformulasikan masalah dan mengekspresikan solusinya sedemikian rupa sehingga dapat dijalankan oleh komputer (manusia atau mesin). Penting di abad 21 karena:\n- Hampir semua bidang (sains, teknik, bisnis, kesehatan, seni) kini bergantung pada data dan komputasi, sehingga setiap orang perlu bisa merumuskan masalah secara terstruktur.\n- CT melatih empat keterampilan: dekomposisi (memecah masalah), pengenalan pola, abstraksi (membuang detail tak relevan), dan berpikir algoritmik (menyusun langkah solusi). Keterampilan ini berlaku untuk masalah apa pun, bukan hanya pemrograman.\n- Otomasi dan AI mengubah pekerjaan; orang yang bisa memecahkan masalah secara sistematis dan memanfaatkan komputer akan lebih adaptif dan produktif.\n\nCatatan: banyak jawaban yang valid asalkan menghubungkan CT dengan kebutuhan abad 21 dan disertai argumen/contoh.',
      keyPoints: ['Definisi singkat CT (formulasi masalah + ekspresi solusi)', 'Empat pilar: dekomposisi, pola, abstraksi, algoritma', 'Relevan lintas bidang, bukan hanya programmer', 'Argumen abad 21: data, otomasi, AI, pekerjaan yang berubah'],
      rubric: openRubric, difficulty: 1,
      explanation: 'Jawaban terbuka: definisikan CT, sebut pilar-pilarnya, lalu kaitkan dengan kebutuhan abad 21 (data, otomasi, lintas bidang).',
      refs: [{ src: S18, page: 2 }],
      en: { stem: "Explain why computational thinking ability has become one of the important skills in the 21st century." },
    },
    {
      id: 'k18-s1b', kind: 'open', label: 'b', decks: ['D11'], topic: 'Ethics: software piracy',
      stem: 'Untuk menyelesaikan tugas kuliah, dibutuhkan perangkat lunak yang berbayar yang cukup mahal. Kampus menyediakan perangkat lunak tersebut di laboratorium komputer, tetapi Anda harus berbagi dengan mahasiswa lain dan tidak dapat menggunakannya setiap saat. Anda tahu bahwa Anda dapat membeli versi bajakan dari perangkat lunak tersebut dengan cukup murah dan *crack* juga mudah didapatkan di internet. Apa yang akan Anda lakukan?',
      answer: 'Saya tidak akan memakai versi bajakan. Alasannya:\n- Melanggar hak cipta (UU Hak Cipta) dan etika/kode etik akademik; merugikan pengembang.\n- Berisiko: *crack* sering mengandung malware, tidak ada pembaruan keamanan.\n- Alternatif yang sah: menjadwalkan waktu pemakaian di lab (mis. di luar jam padat), memakai lisensi pendidikan/*student license*/versi *trial*, atau perangkat lunak *open source* yang setara (dan mengerjakan sebagian tugas di sana), serta bertanya kepada dosen/asisten tentang akses jarak jauh ke lab.\n\nCatatan: jawaban dinilai dari sikap etis yang jelas + argumen + alternatif realistis.',
      keyPoints: ['Menolak pembajakan', 'Alasan hukum/etika (hak cipta)', 'Risiko keamanan (malware)', 'Alternatif legal (lab terjadwal, lisensi pelajar, open source)'],
      rubric: openRubric, difficulty: 1,
      explanation: 'Ini soal etika computing: pembajakan melanggar hak cipta. Jawaban baik menolak, beralasan, dan menawarkan alternatif legal.',
      refs: [{ src: S18, page: 2 }],
      en: { stem: "To finish a coursework assignment, you need expensive paid software. The campus provides that software in the computer laboratory, but you have to share it with other students and cannot use it at any time. You know that you can buy a pirated version of that software fairly cheaply and that a *crack* is also easy to find on the internet. What would you do?" },
    },
    {
      id: 'k18-s1c', kind: 'open', label: 'c', decks: ['D11'], topic: 'Ethics: accessing others\' accounts, cyber-bullying',
      stem: 'Suatu hari saat akan praktikum PTI, Anda menemukan komputer yang akan digunakan masih hidup dan pada *browser*, masih terlihat aplikasi media sosial terbuka. Anda mengenal pemilik akun yang sedang aktif pada aplikasi tersebut dan dia kebetulan adalah orang yang sangat tidak Anda sukai. Orang tersebut sering menggunakan akun media sosial ini untuk melakukan perundungan (*cyber-bullying*) kepada orang lain, termasuk Anda. Anda berpikir, jika Anda melakukan sesuatu pada akun tersebut, misalnya mengirimkan pesan yang tidak pantas, menghapus *file* dan gambar, dll., banyak orang yang akan merasa senang, bahkan berterima kasih pada Anda. Lagipula salah dia sendiri tidak *log-out* dengan baik dari aplikasi tersebut di komputer umum. Apa yang akan Anda lakukan?',
      answer: 'Saya tidak akan memakai atau mengubah apa pun pada akun tersebut. Saya hanya akan *log-out* (atau memberi tahu asisten/pemiliknya) agar akun aman. Alasannya:\n- Mengakses/mengubah akun orang lain tanpa izin adalah akses ilegal dan manipulasi data, melanggar UU ITE (Pasal 30 dan Pasal 32) dan etika.\n- Membalas perundungan dengan tindakan serupa tidak membenarkan perbuatan saya (dua kesalahan tidak menghasilkan kebenaran) dan dapat membuat saya sendiri dipidana/disanksi.\n- Cara yang benar untuk perundungan: kumpulkan bukti (tangkapan layar), laporkan ke platform, ke pihak kampus/dosen, atau ke pihak berwenang.\n\nCatatan: yang dinilai adalah sikap etis, dasar hukum/etika, dan tindakan alternatif yang tepat.',
      keyPoints: ['Tidak menyalahgunakan akun (akses tanpa izin)', 'Dasar hukum/etika: UU ITE, privasi', 'Log-out / beri tahu pemilik atau asisten', 'Laporkan perundungan lewat jalur resmi dengan bukti'],
      rubric: openRubric, difficulty: 2,
      explanation: 'Akses tanpa izin ke akun orang lain tetap salah walau pemiliknya pelaku perundungan. Jawaban baik: tidak bertindak, mengamankan akun, dan melapor lewat jalur resmi.',
      refs: [{ src: S18, page: 2 }],
      en: { stem: "One day, when about to start a PTI practicum, you find that the computer you will use is still on and, in the *browser*, a social media application is still open. You know the owner of the account that is active in the application, and he happens to be someone you really dislike. This person often uses this social media account to bully others (*cyber-bullying*), including you. You think that if you did something to that account, for example sending inappropriate messages, deleting *files* and pictures, etc., many people would be happy, even thank you. Besides, it is his own fault that he did not *log out* properly from the application on a public computer. What would you do?" },
    },
  ],
})

const k18_2a = r`# Program Hypotenuse
# Menghitung sisi miring c = sqrt(a^2 + b^2) dari dua bilangan riil a dan b (a > 0, b > 0)
# DECLARATIONS
# a, b, c : float
# ALGORITHM
a = float(input())
b = float(input())
c = (a ** 2 + b ** 2) ** 0.5
print(c)`

const k18_2b = r`# Program KelasAtlit
# Menentukan kelas pertandingan dari berat badan atlit (bilangan bulat, kg)
# DECLARATIONS
# bb : int
# ALGORITHM
bb = int(input())
if (bb < 45):
    print("Tidak memenuhi kualifikasi")
elif (bb <= 50):
    print("Kelas A")
elif (bb <= 55):
    print("Kelas B")
elif (bb <= 60):
    print("Kelas C")
elif (bb <= 65):
    print("Kelas D")
elif (bb <= 70):
    print("Kelas E")
else:
    print("Kelas F")`

const k18_2c = r`# Program DeretPangkat
# Menghitung f(x) = 1 + x + x^2 + ... + x^n, dengan -1 < x < 1 dan n > 1
# DECLARATIONS
# x, f : float
# n, i : int
# ALGORITHM
x = float(input())
n = int(input())
f = 1.0
for i in range(1, n + 1):
    f = f + x ** i
print(f)`

const k18_2d = r`# Program CountPosGenap
# Menghitung banyaknya bilangan positif dan genap dalam array of integer T
# DECLARATIONS
# N : int
# T : array [0..N-1] of int
# i, count : int
# ALGORITHM
N = int(input())
T = [0 for i in range(N)]
for i in range(N):
    T[i] = int(input())
count = 0
for i in range(N):
    if (T[i] > 0 and T[i] % 2 == 0):
        count = count + 1
print(count)`

const k18_3a = r`# Program TinggiRataRata
# Menghitung tinggi rata-rata siswa; data valid 100..200 cm; input berakhir pada -999 (tidak diproses)
# DECLARATIONS
# t, count, sum : int
# rata : float
# ALGORITHM
sum = 0
count = 0
t = int(input())
while (t != -999):
    if (t >= 100 and t <= 200):
        sum = sum + t
        count = count + 1
    t = int(input())
if (count > 0):
    rata = sum / count
    print(rata)
else:
    print("Tidak ada data")`

const k18_3b = r`# Program BeratBadanSiswa
# Membaca 50 berat badan siswa; menampilkan yang terbesar, lalu banyaknya dan daftar berat badan di atas X
# DECLARATIONS
# T : array [0..49] of int
# i, maks, X, count : int
# ALGORITHM
T = [0 for i in range(50)]
for i in range(50):
    T[i] = int(input())
maks = T[0]
for i in range(1, 50):
    if (T[i] > maks):
        maks = T[i]
print("Berat badan terbesar = " + str(maks))
X = int(input())
count = 0
for i in range(50):
    if (T[i] > X):
        count = count + 1
print("Banyaknya siswa dengan berat > " + str(X) + " = " + str(count))
if (count > 0):
    print("Daftar berat badan > " + str(X) + " =")
    for i in range(50):
        if (T[i] > X):
            print(T[i])`

const w18 = nl(50, (i) => 40 + (i * 7) % 45); w18[10] = '70'; w18[49] = '99'

problems.push({
  id: 'k18-s2', archetype: 'program', title: 'Soal 2 – Algoritma dan Pemrograman 1', source: prov(S18, 'Soal 2', [3, 4], 2018), paperWeight: 0.4,
  en: { title: 'Q2 – Algorithms and programming 1' },
  parts: [
    {
      id: 'k18-s2a', kind: 'program', label: 'a', decks: ['D04'], topic: 'Pythagorean formula', patterns: ['sequence-io', 'type-conversion', 'operators'], misconceptions: ['input-is-str'],
      stem: 'Buatlah program untuk menghitung sisi miring sebuah segitiga siku-siku dengan rumus Pythagoras. Program membaca input 2 buah bilangan riil, misalnya $a$ (alas segitiga) dan $b$ (tinggi segitiga) dan menuliskan ke layar hasil perhitungan sisi miring $c$ yang dihitung dengan rumus sbb.: $c = \\sqrt{a^2 + b^2}$. Asumsikan $a > 0$ dan $b > 0$. Untuk menghitung $x^2$ gunakan `x ** 2` dan untuk $\\sqrt{x}$ gunakan `x ** 0.5`.',
      reps: ['python'], match: 'judge', judge: numJudge, rubric: progRubric,
      solution: { python: k18_2a },
      tests: [{ stdin: ['3', '4'] }, { stdin: ['1', '1'] }, { stdin: ['5.5', '2.5'] }, { stdin: ['0.5', '12'] }],
      wrong: [
        { code: 'a = float(input())\nb = float(input())\nc = a ** 2 + b ** 2\nprint(c)', msg: 'Akar belum diambil: hasil a² + b² adalah c², bukan c. Pangkatkan dengan 0.5.', tag: 'str-concat' },
        { code: 'a = float(input())\nb = float(input())\nc = a ** 2 + b ** 2 ** 0.5\nprint(c)', msg: 'Operator `**` dievaluasi sebelum `+`, dan `b ** 2 ** 0.5` berarti b ** (2 ** 0.5). Beri tanda kurung: `(a ** 2 + b ** 2) ** 0.5`.' },
      ],
      plan: 'baca a, b (riil); c ← akar(a² + b²); tampilkan c',
      skeleton: 'a = ___(input())\nb = ___(input())\nc = (a ** 2 + b ** ___) ** ___\nprint(c)',
      hints: ['Tipe masukan apa yang dipakai untuk bilangan riil?', 'Akar kuadrat dengan operator pangkat: pangkat berapa?', 'Hati-hati prioritas operator: apa yang harus dalam kurung sebelum dipangkatkan 0.5?'],
      work: ['Baca a dan b dengan `float(input())` karena bilangan riil.', 'Jumlahkan kuadratnya: `a ** 2 + b ** 2`.', 'Akarkan seluruh jumlah dengan `** 0.5` (beri kurung).', 'Tampilkan hasilnya dengan `print(c)`.'],
      syntax: ['program-template', 'input', 'type-conversion', 'operators'],
      lineNotes: N(k18_2a, [
        ['# Program', 'Judul + spesifikasi program, lalu KAMUS (DECLARATIONS) sebagai komentar `# nama : tipe`.', 'program-template', '# ALGORITHM'],
        ['a = float', '`input()` selalu menghasilkan string, dibungkus `float(...)` karena a bilangan riil.', 'input'],
        ['b = float', 'Sama untuk b.', 'type-conversion'],
        ['c = (a', 'Kurung wajib: `**` lebih kuat daripada `+`. `(...) ** 0.5` adalah akar kuadrat.', 'operators'],
        ['print(c)', 'Keluaran berupa bilangan riil (banyak angka di belakang koma bebas).'],
      ]),
      explanation: 'c = (a ** 2 + b ** 2) ** 0.5. Kunci: kurung di sekitar jumlah kuadrat sebelum dipangkatkan 0.5, dan masukan dibaca sebagai `float`.',
      refs: [{ src: S18, page: 3 }],
    },
    {
      id: 'k18-s2b', kind: 'program', label: 'b', decks: ['D05'], topic: 'Multi-case branching', patterns: ['if-elif'], misconceptions: ['off-by-one'],
      stem: 'Kelas pertandingan seorang atlit pertandingan bela diri ditentukan berdasarkan berat badannya sbb:\n- 45 kg ≤ berat badan ≤ 50 kg : kelas A\n- 50 kg < berat badan ≤ 55 kg : kelas B\n- 55 kg < berat badan ≤ 60 kg : kelas C\n- 60 kg < berat badan ≤ 65 kg : kelas D\n- 65 kg < berat badan ≤ 70 kg : kelas E\n- berat badan > 70 kg : kelas F\n\nBuatlah sebuah program yang menerima berat badan seorang atlit (bilangan bulat) dan menuliskan kelas pertandingan atlit yang bersangkutan. Jika berat badan atlit < 45 kg, tuliskan “Tidak memenuhi kualifikasi”.',
      reps: ['python'], match: 'judge', judge: classJudge, rubric: progRubric,
      solution: { python: k18_2b },
      tests: [{ stdin: ['30'] }, { stdin: ['44'], edge: 'tepat di bawah 45' }, { stdin: ['45'], edge: 'batas bawah kelas A' }, { stdin: ['50'], edge: 'batas A/B' }, { stdin: ['51'] }, { stdin: ['60'], edge: 'batas C/D' }, { stdin: ['70'], edge: 'batas E/F' }, { stdin: ['71'] }],
      wrong: [
        { code: 'bb = int(input())\nif (bb < 50):\n    print("Kelas A")\nelif (bb < 55):\n    print("Kelas B")\nelif (bb < 60):\n    print("Kelas C")\nelif (bb < 65):\n    print("Kelas D")\nelif (bb < 70):\n    print("Kelas E")\nelse:\n    print("Kelas F")', msg: 'Batas atas tiap kelas termasuk (≤). Dengan `<`, berat 50, 55, 60, 65, 70 masuk kelas di atasnya. Gunakan `<=`.', tag: 'off-by-one' },
        { code: 'bb = int(input())\nif (bb <= 50):\n    print("Kelas A")\nelif (bb <= 55):\n    print("Kelas B")\nelif (bb <= 60):\n    print("Kelas C")\nelif (bb <= 65):\n    print("Kelas D")\nelif (bb <= 70):\n    print("Kelas E")\nelse:\n    print("Kelas F")', msg: 'Kasus bb < 45 (tidak memenuhi kualifikasi) belum ditangani; berat 30 kg jadi kelas A. Tambahkan cabang pertama untuk bb < 45.' },
      ],
      plan: 'baca bb; jika bb < 45: pesan tidak memenuhi; selain itu cek berurutan bb <= 50, <= 55, <= 60, <= 65, <= 70; sisanya kelas F',
      skeleton: 'bb = int(input())\nif (bb ___ 45):\n    print("Tidak memenuhi kualifikasi")\nelif (bb <= ___):\n    print("Kelas A")\n___ (bb <= 55):\n    print("Kelas B")\n# ... lanjutkan sampai kelas F dengan else',
      hints: ['Ada berapa kasus yang saling lepas? Mana yang harus dicek paling dulu?', 'Dengan `elif` berurutan, cukup tulis batas atas tiap kelas.', 'Perhatikan: batas atas termasuk (≤) atau tidak (<)?'],
      work: ['Baca bb sebagai int.', 'Cek kasus di bawah kualifikasi lebih dulu: `bb < 45`.', 'Lanjutkan `elif` dengan batas atas 50, 55, 60, 65, 70 memakai `<=`.', '`else` untuk bb > 70: kelas F.'],
      syntax: ['if-elif', 'relational-logical'],
      lineNotes: N(k18_2b, [
        ['bb = int', 'Berat badan bilangan bulat: `int(input())`.', 'input'],
        ['if (bb < 45)', 'Cabang pertama: di bawah kualifikasi. Harus dicek lebih dulu agar tidak jatuh ke kelas A.', 'if-elif'],
        ['elif (bb <= 50)', 'Karena bb ≥ 45 sudah pasti di cabang ini, cukup batas atas ≤ 50 (45 termasuk kelas A).', 'if-elif'],
        ['elif (bb <= 55)', '`elif` hanya dicek bila cabang di atasnya salah, jadi batas bawah (>50) tidak perlu ditulis. Batas atas ≤ (termasuk).', 'relational-logical', 'elif (bb <= 70)'],
        ['else:', 'Sisa kasus: bb > 70, kelas F. `else` menutup semua kasus komplementer.'],
      ]),
      explanation: 'Satu rantai `if-elif-else`: urutkan dari kasus bb < 45, lalu batas atas ≤ 50, 55, 60, 65, 70, dan sisanya kelas F.',
      refs: [{ src: S18, page: 3 }],
    },
    {
      id: 'k18-s2c', kind: 'program', label: 'c', decks: ['D05'], topic: 'Series with loops', patterns: ['for-count', 'accumulate-sum'], misconceptions: ['off-by-one', 'init-in-loop'],
      stem: 'Diketahui sebuah deret sebagai berikut: $f(x) = 1 + x + x^2 + x^3 + \\cdots + x^n$. Buatlah program digunakan untuk menuliskan ke layar hasil $f(x)$ berdasarkan masukan nilai $x$ (bilangan riil) dan $n$ (bilangan bulat) dari pengguna dengan menggunakan deret di atas. Asumsikan: $-1 < x < 1$ dan $n > 1$. Untuk menghitung $x^y$, gunakan `x ** y`.\n\n(Urutan masukan: x lalu n. Deret harus dihitung dengan pengulangan.)',
      reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: numJudge, rubric: progRubric,
      solution: { python: k18_2c },
      tests: [{ stdin: ['0.5', '3'] }, { stdin: ['-0.5', '2'], edge: 'negative x, n = 2' }, { stdin: ['0.9', '10'] }, { stdin: ['0', '5'], edge: 'x = 0' }, { stdin: ['-0.9', '7'] }],
      wrong: [
        { code: 'x = float(input())\nn = int(input())\nf = 1.0\nfor i in range(1, n):\n    f = f + x ** i\nprint(f)', msg: '`range(1, n)` berhenti di n−1, suku x^n tidak ikut. Gunakan `range(1, n + 1)`.', tag: 'off-by-one' },
        { code: 'x = float(input())\nn = int(input())\nf = 0.0\nfor i in range(1, n + 1):\n    f = f + x ** i\nprint(f)', msg: 'Suku pertama deret adalah 1 (= x⁰). Inisialisasi f = 1, bukan 0.' },
      ],
      plan: 'baca x, n; f ← 1; untuk i dari 1 sampai n: f ← f + x^i; tampilkan f',
      skeleton: 'x = float(input())\nn = int(input())\nf = ___\nfor i in range(___, n + 1):\n    f = f + x ___ i\nprint(f)',
      hints: ['Suku ke-0 adalah 1. Dari mana akumulator dimulai?', 'Pola apa: jumlah suku yang banyaknya diketahui (n)?', 'Batas atas `range` tidak ikut diproses.'],
      work: ['Baca x (float) dan n (int).', 'Inisialisasi f = 1 (suku x⁰) sebelum loop.', 'Loop i = 1..n: tambahkan `x ** i`.', 'Tampilkan f setelah loop.'],
      syntax: ['for-range', 'operators', 'input'],
      lineNotes: N(k18_2c, [
        ['x = float', 'x bilangan riil → `float(input())`.', 'input'],
        ['n = int', 'n bilangan bulat → `int(input())` (dipakai di `range`).', 'type-conversion'],
        ['f = 1.0', 'Akumulator diisi suku pertama (x⁰ = 1) **sebelum** loop. Jika dimulai 0, hasil kurang 1.'],
        ['for i in range(1, n + 1)', '`range(1, n + 1)` memproses i = 1..n; batas atas tidak ikut, jadi +1 agar x^n masuk.', 'for-range'],
        ['f = f + x ** i', 'Tambahkan suku x^i. `**` adalah pangkat.', 'operators'],
        ['print(f)', 'Tidak menjorok: dijalankan sekali setelah loop (terminasi).'],
      ]),
      explanation: 'f = 1, lalu untuk i = 1..n tambahkan x**i. Pastikan `range(1, n+1)` dan f dimulai dari 1.',
      refs: [{ src: S18, page: 3 }],
    },
    {
      id: 'k18-s2d', kind: 'program', label: 'd', decks: ['D06'], topic: 'Counting array elements with a condition', patterns: ['array-populate', 'count-if'], misconceptions: ['index-range'],
      stem: 'Buatlah sebuah program yang menuliskan ke layar banyaknya bilangan yang merupakan bilangan bulat positif dan sekaligus genap dari sejumlah N buah bilangan yang tersimpan dalam *array of integer* `T` berukuran N. Tuliskan program Anda dalam template berikut:\n\n```\n# Program CountPosGenap\n# Menghitung banyaknya bilangan positif dan genap dari sebuah array of integer\n# KAMUS\n# N : int\n# T : array [0..N-1] of int\n# ALGORITMA\nN = int(input())\nT = [0 for i in range(N)]\n… # pengisian array T diasumsikan sudah ada, tidak diminta dibuat\n# Tuliskan: program untuk menghitung ada berapa banyak bilangan integer\n# yang positif dan genap dalam array T dan menampilkan hasilnya ke layar\n```\n\n(Pada latihan ini pengisian T dilakukan dengan membaca N bilangan dari masukan.)',
      reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['array'], rubric: progRubric,
      solution: { python: k18_2d },
      tests: [{ stdin: ['5', '1', '2', '3', '4', '6'] }, { stdin: ['5', '-2', '-4', '0', '4', '5'], edge: 'negative evens and 0 are not counted' }, { stdin: ['1', '2'], edge: 'N = 1, positive even' }, { stdin: ['1', '-2'], edge: 'N = 1, negative even' }, { stdin: ['4', '1', '3', '5', '7'], edge: 'all odd' }],
      wrong: [
        { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(N):\n    T[i] = int(input())\ncount = 0\nfor i in range(N):\n    if (T[i] % 2 == 0):\n        count = count + 1\nprint(count)', msg: 'Syarat "positif" terlewat: -2, -4 dan 0 ikut terhitung. Tambahkan `T[i] > 0`.' },
        { code: 'N = int(input())\nT = [0 for i in range(N)]\nfor i in range(N):\n    T[i] = int(input())\ncount = 0\nfor i in range(N):\n    if (T[i] >= 0 and T[i] % 2 == 0):\n        count = count + 1\nprint(count)', msg: '0 bukan bilangan positif. Gunakan `> 0`, bukan `>= 0`.', tag: 'off-by-one' },
      ],
      plan: 'isi T; count ← 0; untuk setiap i dari 0 sampai N−1: jika T[i] > 0 dan genap, count ← count + 1; tampilkan count',
      skeleton: 'count = ___\nfor i in range(___):\n    if (T[i] ___ 0 and T[i] % ___ == 0):\n        count = ___\nprint(count)',
      hints: ['Pola: hitung elemen array yang memenuhi syarat (count-if).', 'Syaratnya dua sekaligus: gunakan operator logika yang tepat.', 'Bilangan genap: sisa bagi 2 sama dengan berapa?'],
      work: ['Siapkan `count = 0` sebelum loop.', 'Telusuri semua indeks: `for i in range(N)`.', 'Hitung bila `T[i] > 0 and T[i] % 2 == 0`.', 'Tampilkan count setelah loop.'],
      syntax: ['list-init', 'list-index', 'for-range', 'relational-logical'],
      lineNotes: N(k18_2d, [
        ['T = [0 for', 'Array N elemen, indeks 0..N−1.', 'list-init'],
        ['T[i] = int(input())', 'Pengisian array (diasumsikan sudah ada pada soal): baca tiap elemen.', 'list-index'],
        ['count = 0', 'Penghitung diinisialisasi sebelum loop.'],
        ['if (T[i] > 0', 'Dua syarat sekaligus dengan `and`: positif (> 0, nol tidak termasuk) dan genap (sisa bagi 2 = 0).', 'relational-logical'],
        ['count = count + 1', 'Increment hanya saat syarat terpenuhi.'],
        ['print(count)', 'Setelah loop, tampilkan banyaknya.'],
      ]),
      explanation: 'Telusuri seluruh elemen dan hitung yang memenuhi `T[i] > 0 and T[i] % 2 == 0`; nol dan negatif tidak dihitung.',
      refs: [{ src: S18, page: 4 }],
    },
  ],
})

problems.push({
  id: 'k18-s3', archetype: 'program', title: 'Soal 3 – Algoritma dan Pemrograman 2', source: prov(S18, 'Soal 3', [5, 6], 2018), paperWeight: 0.3,
  en: { title: 'Q3 – Algorithms and programming 2' },
  parts: [
    {
      id: 'k18-s3a', kind: 'program', label: 'a', decks: ['D05'], topic: 'Average with sentinel and filter', patterns: ['while-sentinel', 'average', 'accumulate-sum', 'count-if'], misconceptions: ['sentinel-counted', 'while-no-next'],
      stem: '**Tinggi Rata-Rata Siswa.** Kepala Sekolah sebuah SMA ingin mendapatkan rata-rata tinggi badan siswa di suatu kelas. Untuk itu, dia memanggil semua siswa di kelas itu dan mengumpulkannya di ruang UKS untuk diukur tinggi badannya satu per satu. Karena tidak tahu banyaknya siswa dalam kelas, Kepala Sekolah berniat menghitungnya sambil mengukur tinggi badan siswa. Tinggi badan siswa diukur dalam satuan cm dan dengan pengamatan sekilas, bisa diketahui bahwa tidak ada siswa yang tingginya kurang dari 100 cm atau lebih dari 200 cm.\n\nSeorang guru membantu Kepala Sekolah mengukur tinggi badan dan mencatatnya. Guru ini agak ceroboh sehingga sering memasukkan data yang salah. Data yang salah, yaitu kurang dari 100 cm atau lebih besar dari 200 cm, tidak digunakan untuk menghitung tinggi rata-rata.\n\nBuatlah program yang membantu Kepala Sekolah untuk menghitung tinggi rata-rata siswa di kelas. Program menerima input sejumlah bilangan bulat yang mewakili tinggi siswa. Pembacaan input diakhiri dengan memasukkan nilai -999 (tidak termasuk diproses). Selanjutnya program menuliskan tinggi rata-rata siswa di kelas berdasarkan data yang diinputkan, tanpa memperhitungkan data yang salah input (yaitu jika nilai < 100 cm atau > 200 cm). Jika tidak ada data yang bisa digunakan untuk menghitung tinggi rata-rata, tuliskan pesan “Tidak ada data”.\n\nContoh (jumlah angka di belakang koma bebas):\n\n| Input (satu per baris) | Output | Keterangan |\n|---|---|---|\n| 120, 145, 150, -999 | 138.3333 | |\n| 120, 78, 167, 150, 201, -999 | 145.6667 | 78 dan 201 tidak dihitung karena 78 < 100 dan 201 > 200 |\n| -999 | Tidak ada data | langsung memasukkan -999 di awal |\n| 78, 201, -999 | Tidak ada data | tidak ada data yang valid |',
      reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: numJudge, rubric: progRubric,
      solution: { python: k18_3a },
      tests: [{ stdin: ['120', '145', '150', '-999'] }, { stdin: ['120', '78', '167', '150', '201', '-999'], edge: 'some invalid data' }, { stdin: ['-999'], edge: 'sentinel di awal' }, { stdin: ['78', '201', '-999'], edge: 'no valid data' }, { stdin: ['100', '200', '-999'], edge: 'exactly at the limits 100 and 200' }, { stdin: ['99', '-999'], edge: 'tepat di bawah 100' }],
      wrong: [
        { code: 'sum = 0\ncount = 0\nt = int(input())\nwhile (t != -999):\n    if (t > 100 and t < 200):\n        sum = sum + t\n        count = count + 1\n    t = int(input())\nif (count > 0):\n    print(sum / count)\nelse:\n    print("Tidak ada data")', msg: 'Batas 100 dan 200 termasuk data valid (hanya < 100 atau > 200 yang salah). Gunakan `>=` dan `<=`.', tag: 'off-by-one' },
        { code: 'sum = 0\ncount = 0\nt = int(input())\nwhile (t != -999):\n    if (t >= 100 and t <= 200):\n        sum = sum + t\n    count = count + 1\n    t = int(input())\nif (count > 0):\n    print(sum / count)\nelse:\n    print("Tidak ada data")', msg: 'Penghitung `count` bertambah untuk semua data, termasuk yang tidak valid. Naikkan hanya untuk data valid (di dalam `if`).' },
        { code: 'sum = 0\ncount = 0\nt = int(input())\nwhile (t != -999):\n    if (t >= 100 and t <= 200):\n        sum = sum + t\n        count = count + 1\n    t = int(input())\nprint(sum / count)', msg: 'Jika tidak ada data valid, count = 0 sehingga terjadi pembagian dengan nol. Periksa `count > 0` sebelum membagi.' },
      ],
      plan: 'sum ← 0; count ← 0; baca t; selama t ≠ −999: jika 100 ≤ t ≤ 200 maka sum ← sum + t, count ← count + 1; baca t berikutnya; setelah loop: jika count > 0 tampilkan sum/count, selain itu "Tidak ada data"',
      skeleton: 'sum = 0\ncount = ___\nt = int(input())\nwhile (t != ___):\n    if (t >= ___ and t <= ___):\n        sum = sum + t\n        count = ___\n    t = ___\nif (count > 0):\n    print(sum / count)\nelse:\n    print("Tidak ada data")',
      hints: ['Banyaknya masukan tidak diketahui: pola apa yang dipakai?', 'Baca elemen pertama sebelum loop dan elemen berikutnya di akhir badan loop.', 'Rata-rata = jumlah / banyaknya. Apa yang terjadi bila banyaknya 0?'],
      work: ['Inisialisasi sum = 0 dan count = 0.', 'Baca t pertama (First-Element) sebelum loop.', 'Loop selama t ≠ −999: bila valid, tambahkan ke sum dan count.', 'Di akhir badan loop baca t berikutnya (Next-Element).', 'Setelah loop: bila count > 0 cetak sum / count; selain itu cetak pesan.'],
      syntax: ['while', 'sentinel', 'if-else'],
      lineNotes: N(k18_3a, [
        ['sum = 0', 'Akumulator jumlah dan penghitung diinisialisasi sebelum loop.'],
        ['t = int(input())', 'First-Element: baca data pertama sebelum loop agar -999 langsung bisa menghentikan.', 'sentinel'],
        ['while (t != -999)', 'Kondisi mengulang: selama bukan sentinel. -999 tidak ikut diproses.', 'while'],
        ['if (t >= 100', 'Filter data valid dengan batas termasuk (100 dan 200 valid).', 'relational-logical'],
        ['sum = sum + t', 'Jumlah dan banyak data hanya dinaikkan untuk data valid.', undefined, 'count = count + 1'],
        ['    t = int(input())', 'Next-Element di akhir badan loop (di luar `if`!). Jika terlewat, loop tak pernah berhenti.', 'while'],
        ['if (count > 0)', 'Cegah pembagian dengan nol bila tidak ada data valid.', 'if-else'],
        ['rata = sum / count', '`/` menghasilkan bilangan riil (rata-rata).'],
        ['print("Tidak ada data")', 'Kasus komplementer: tidak ada satu pun data valid.'],
      ]),
      explanation: 'Pola sentinel: baca pertama, loop sampai -999, filter 100–200 (inklusif), hitung jumlah dan banyaknya data valid, lalu bagi hanya bila banyaknya > 0.',
      refs: [{ src: S18, page: 5 }],
    },
    {
      id: 'k18-s3b', kind: 'program', label: 'b', decks: ['D06'], topic: 'Array: maximum, count and display > X', patterns: ['array-populate', 'max-min', 'count-if'], misconceptions: ['max-init-zero', 'off-by-one'],
      stem: '**Berat Badan Siswa.** Kepala Sekolah ingin mendapatkan beberapa informasi terkait berat badan siswa. Sekarang sudah diketahui ada 50 siswa di kelas. Daftar 50 baris berat badan siswa (bilangan bulat, selalu > 0, tidak ada yang salah) dicatat oleh seorang guru yang kompeten.\n\nBuatlah program yang menerima masukan data berat badan 50 siswa dan:\n- tampilkan nilai berat badan yang terbesar dari seluruh data berat badan siswa.\n- baca sebuah nilai X dari masukan pengguna dan:\n  - tuliskan berapa banyak siswa yang memiliki berat badan di atas X kg.\n  - tampilkan data berat badan yang di atas X kg (ditampilkan hanya jika banyaknya siswa dengan berat badan di atas X kg > 0).\n\nContoh (sebagian data dipersingkat):\n```\nBerat badan terbesar = 89\nMasukkan berat badan = 70\nBanyaknya siswa dengan berat > 70 = 10\nDaftar berat badan > 70 =\n78\n…\n89\n```\natau, bila tidak ada: `Banyaknya siswa dengan berat > 80 = 0` (tanpa daftar).',
      reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: weightJudge, mustUse: ['array'], rubric: progRubric,
      solution: { python: k18_3b },
      tests: [{ stdin: [...w18, '70'], edge: 'a weight equals X; maximum at the last element' }, { stdin: [...w18, '100'], edge: 'none above X' }, { stdin: [...nl(50, () => 60), '60'], edge: 'all equal to X' }, { stdin: [...w18, '10'], edge: 'all above X' }],
      wrong: [
        { code: 'T = [0 for i in range(50)]\nfor i in range(50):\n    T[i] = int(input())\nmaks = T[0]\nfor i in range(1, 50):\n    if (T[i] > maks):\n        maks = T[i]\nprint("Berat badan terbesar = " + str(maks))\nX = int(input())\ncount = 0\nfor i in range(50):\n    if (T[i] >= X):\n        count = count + 1\nprint("Banyaknya siswa dengan berat > " + str(X) + " = " + str(count))\nif (count > 0):\n    for i in range(50):\n        if (T[i] >= X):\n            print(T[i])', msg: '"Di atas X" berarti > X; berat yang sama dengan X tidak dihitung. Gunakan `>` bukan `>=`.' },
        { code: 'T = [0 for i in range(50)]\nfor i in range(50):\n    T[i] = int(input())\nmaks = T[0]\nfor i in range(1, 49):\n    if (T[i] > maks):\n        maks = T[i]\nprint("Berat badan terbesar = " + str(maks))\nX = int(input())\ncount = 0\nfor i in range(50):\n    if (T[i] > X):\n        count = count + 1\nprint("Banyaknya siswa dengan berat > " + str(X) + " = " + str(count))\nif (count > 0):\n    for i in range(50):\n        if (T[i] > X):\n            print(T[i])', msg: '`range(1, 49)` melewatkan indeks terakhir (49). Gunakan `range(1, 50)`.', tag: 'off-by-one' },
      ],
      plan: 'isi T[0..49]; maks ← T[0]; telusuri i = 1..49 untuk memperbarui maks; tampilkan maks; baca X; hitung dan tampilkan banyaknya T[i] > X; jika banyaknya > 0 tampilkan setiap T[i] > X',
      skeleton: 'maks = T[___]\nfor i in range(___, 50):\n    if (T[i] ___ maks):\n        maks = ___\nX = int(input())\ncount = 0\nfor i in range(50):\n    if (T[i] > ___):\n        count = ___',
      hints: ['Cari nilai ekstrim: dari mana nilai awal maks diambil?', 'Dua pass terpisah: pertama untuk maksimum, kedua untuk menghitung dan menampilkan yang > X.', 'Daftar hanya ditampilkan bila banyaknya > 0.'],
      work: ['Isi array T dengan 50 masukan.', 'maks = T[0]; loop i = 1..49 memperbarui maks bila T[i] > maks.', 'Baca X.', 'Loop pertama: hitung berapa T[i] > X.', 'Cetak banyaknya; bila > 0, loop lagi dan cetak setiap T[i] > X.'],
      syntax: ['list-init', 'list-index', 'for-range', 'print-str'],
      lineNotes: N(k18_3b, [
        ['T = [0 for', 'Array 50 elemen (indeks 0..49).', 'list-init'],
        ['T[i] = int(input())', 'Isi array dari masukan, satu elemen per baris.', 'list-index'],
        ['maks = T[0]', 'Nilai awal maksimum = elemen pertama, bukan 0 (aman bila nilai berubah ke negatif).'],
        ['for i in range(1, 50)', 'Mulai dari indeks 1 karena T[0] sudah dipakai; batas atas 50 tidak ikut, jadi indeks terakhir 49 diproses.', 'for-range'],
        ['print("Berat badan terbesar', '`str()` wajib saat digabung dengan `+`.', 'print-str'],
        ['X = int(input())', 'X dibaca setelah 50 data.'],
        ['if (T[i] > X)', '"di atas X" = `>` (tidak termasuk X).', 'relational-logical', 'count = count + 1'],
        ['if (count > 0)', 'Daftar hanya ditampilkan bila ada yang di atas X.', 'if'],
        ['print(T[i])', 'Telusuri lagi array dan cetak elemen yang > X.'],
      ]),
      explanation: 'Maksimum dengan nilai awal T[0]; hitung dan cetak yang > X dengan satu loop penghitung dan satu loop pencetak (hanya bila banyaknya > 0).',
      refs: [{ src: S18, page: 6 }],
    },
  ],
})

/* ---------------------------------- UTS 2019 ---------------------------------- */

const mcq19 = (
  id: string, n: number, page: number, stem: string, options: string[], ans: number, why: string[], explanation: string,
  decks: ('D01' | 'D02' | 'D03' | 'D11')[], topic: string, extra: Record<string, unknown> = {},
) => ({
  id, kind: 'mcq' as const, label: String(n), decks, topic, stem, options, answer: [ans], why, explanation,
  refs: [{ src: S19, page }], ...extra,
})

problems.push({
  id: 'k19-s1a', archetype: 'concept', title: 'Soal 1.A – Computing System, Network, and Impact (pilihan ganda)',
  source: prov(S19, 'Soal 1.A', [2], 2019, true),
  intro: 'Untuk pernyataan-pernyataan di bawah ini, berikan tanda silang (X) pada 1 (satu) saja pilihan jawaban yang benar. (Materi sistem computing/jaringan: di luar silabus WI1102.)',
  en: { title: 'Q1.A – Computing systems, networks (single-answer MCQ)' },
  parts: [
    mcq19('k19-s1a-01', 1, 2, 'Peranti di bawah ini yang merupakan peranti computing adalah:', ['Elevator', 'Microwave ovens', 'Lemari pendingin', 'Smartphone'], 3,
      ['Elevator memang punya pengendali tetapi bukan perangkat computing umum.', 'Oven mikrowave: peralatan rumah tangga, bukan perangkat computing.', 'Lemari pendingin: bukan perangkat computing.', 'Smartphone adalah komputer genggam: menerima input, memproses, menyimpan, menampilkan.'],
      'Smartphone adalah perangkat computing (punya CPU, memori, OS, dan aplikasi). Pilihan lain adalah peralatan non-komputasi umum.', ['D11'], 'Computing devices', { en: { stem: "The device below that is a computing device is:" } }),
    mcq19('k19-s1a-02', 2, 2, 'Di bawah ini yang bukan merupakan contoh hardware adalah:', ['Motherboard', 'CPU', 'RAM', 'Operating System'], 3,
      ['Perangkat keras.', 'Perangkat keras.', 'Perangkat keras.', 'Sistem operasi adalah perangkat lunak (software).'],
      'Motherboard, CPU, dan RAM adalah hardware; *Operating System* adalah software.', ['D11'], 'Hardware vs software', { en: { stem: 'Which of these is NOT an example of hardware?' } }),
    mcq19('k19-s1a-03', 3, 2, 'Windows, Linux, dan MacOS adalah contoh dari:', ['Operating system', 'Application', 'Browser', 'Hardware'], 0,
      ['Ketiganya sistem operasi.', 'Aplikasi berjalan di atas OS, bukan OS itu sendiri.', 'Browser adalah aplikasi.', 'Bukan perangkat keras.'],
      'Windows, Linux, dan macOS adalah sistem operasi.', ['D11'], 'Operating systems', { en: { stem: 'Windows, Linux and macOS are examples of:' } }),
    mcq19('k19-s1a-04', 4, 2, 'Operasi dasar yang dilakukan oleh CPU adalah:', ['Menerima input dari pengguna', 'Memroses informasi', 'Menampilkan output', 'Menyimpan data'], 1,
      ['Input dilakukan perangkat masukan (keyboard, mouse).', 'CPU memproses informasi (eksekusi instruksi, operasi aritmatika dan logika).', 'Output dilakukan perangkat keluaran (layar, printer).', 'Penyimpanan dilakukan memori/storage.'],
      'CPU adalah unit pemroses: mengeksekusi instruksi dan melakukan operasi aritmatika/logika. Input, output, dan penyimpanan ditangani komponen lain.', ['D11'], 'CPU', { en: { stem: 'The basic operation performed by the CPU is:' } }),
    mcq19('k19-s1a-05', 5, 2, 'Perangkat utilitas digunakan untuk hal berikut, kecuali:', ['Kompresi file sehingga memakan tempat yang lebih kecil', 'Melakukan manipulasi aritmatika dan lojik terhadap data', 'Mengkopi file antar media penyimpanan', 'Memperbaiki file yang rusak'], 1,
      ['Fungsi utilitas.', 'Operasi aritmatika dan logika dilakukan CPU (ALU), bukan perangkat utilitas.', 'Fungsi utilitas.', 'Fungsi utilitas.'],
      'Utilitas mengurusi pemeliharaan (kompresi, salin, perbaikan file). Aritmatika dan logika adalah tugas CPU.', ['D11'], 'Utility software', { en: { stem: 'Utility software is used for all of the following, except:' } }),
    mcq19('k19-s1a-06', 6, 2, 'Di bawah ini yang bukan contoh perangkat jaringan:', ['Antivirus', 'Network Interface Card (NIC)', 'Switch', 'Modem'], 0,
      ['Antivirus adalah perangkat lunak keamanan, bukan perangkat jaringan.', 'Perangkat jaringan.', 'Perangkat jaringan.', 'Perangkat jaringan.'],
      'NIC, switch, dan modem adalah perangkat keras jaringan; antivirus adalah software keamanan.', ['D11'], 'Network devices', { en: { stem: 'Which of these is NOT a network device?' } }),
    mcq19('k19-s1a-07', 7, 2, 'Teknologi yang menghubungkan perangkat elektronik ke internet sehingga dapat berkomunikasi dan bertukar data disebut sebagai:', ['Internet', 'Artificial intelligence', 'Internet of things', 'Augmented reality'], 2,
      ['Internet adalah jaringannya, bukan teknologi penghubung perangkat sehari-hari.', 'AI: kecerdasan buatan.', '*Internet of Things* (IoT) menghubungkan perangkat elektronik ke internet agar saling bertukar data.', 'AR: realitas tertambah.'],
      'Definisi IoT: perangkat sehari-hari yang terhubung ke internet dan saling bertukar data.', ['D11'], 'Internet of Things', { en: { stem: 'The technology that connects electronic devices to the internet so they can communicate and exchange data is called:' } }),
    mcq19('k19-s1a-08', 8, 2, 'Berikut adalah keuntungan internet, kecuali:', ['Mengurangi waktu untuk mengembangkan program komputer', 'Saling berbagi sumber daya hardware komputer.', 'Berbagi data dan perangkat lunak.', 'Berkomunikasi dan bekerja bersama.'], 0,
      ['Bukan keuntungan internet yang khas: waktu pengembangan program tidak otomatis berkurang karena internet.', 'Keuntungan jaringan/internet.', 'Keuntungan internet.', 'Keuntungan internet.'],
      'Berbagi sumber daya, data/perangkat lunak, dan kolaborasi adalah keuntungan internet. "Mengurangi waktu mengembangkan program" bukan keuntungan yang melekat pada internet. Catatan: kunci resmi tidak tersedia; jawaban ini disimpulkan dari konteks.', ['D11'], 'Benefits of the internet', { en: { stem: 'The following are advantages of the internet, except:' } }),
  ],
})

problems.push({
  id: 'k19-s1b', archetype: 'concept', title: 'Soal 1.B – Uraian (keamanan data dan netiquette)',
  source: prov(S19, 'Soal 1.B', [2], 2019),
  intro: 'Tuliskan jawaban secara singkat, padat, tapi dengan jelas. Gunakan Bahasa Indonesia yang baik dan benar.',
  en: { title: 'Q1.B – Essays (data security and netiquette)' },
  parts: [
    {
      id: 'k19-s1b-1', kind: 'open', label: '1', decks: ['D11'], topic: 'Data-security threats on social media',
      stem: 'Jelaskan 1 (satu) contoh ancaman terhadap keamanan data Anda di media sosial dan jelaskan bagaimana mencegah/mengatasinya.',
      answer: 'Contoh: **pencurian akun/*phishing***. Penyerang mengirim tautan atau halaman login palsu sehingga pengguna memasukkan kata sandi; akun diambil alih, data pribadi dan kontak disalahgunakan.\nPencegahan/penanganan: jangan mengklik tautan mencurigakan, cek alamat situs, gunakan kata sandi kuat dan unik, aktifkan autentikasi dua faktor, atur privasi akun; bila akun sudah diambil alih, ganti kata sandi, keluarkan sesi lain, laporkan ke platform.\n\nCatatan: contoh lain yang valid: kebocoran data pribadi karena unggahan berlebihan (*oversharing*), *malware* dari aplikasi pihak ketiga, penyalahgunaan data oleh platform.',
      keyPoints: ['Satu ancaman konkret dijelaskan', 'Dampak terhadap data pengguna', 'Cara pencegahan (kata sandi kuat, 2FA, privasi, waspada tautan)', 'Cara mengatasi bila terjadi'],
      rubric: openRubric, difficulty: 1,
      explanation: 'Pilih satu ancaman (mis. phishing), jelaskan mekanismenya, lalu beri pencegahan dan penanganan.',
      refs: [{ src: S19, page: 2 }],
      en: { stem: "Explain 1 (one) example of a threat to the security of your data on social media and explain how to prevent/overcome it." },
    },
    {
      id: 'k19-s1b-2', kind: 'open', label: '2', decks: ['D11'], topic: 'Netiquette',
      stem: 'Jelaskan apa itu netiquette dan mengapa netiquette penting? Berikan 1 (satu) contoh penerapannya.',
      answer: '*Netiquette* (*network etiquette*) adalah tata krama/etika berinteraksi dan berkomunikasi di dunia maya (email, media sosial, forum, *chat*). Penting karena komunikasi daring tanpa tatap muka mudah disalahpahami dan memicu perundungan, ujaran kebencian, dan hoaks; netiquette menjaga rasa hormat, keamanan, dan kenyamanan bersama serta reputasi diri.\nContoh penerapan: tidak menulis dengan huruf kapital semua (dianggap berteriak), tidak menyebarkan berita sebelum memverifikasi, menggunakan bahasa sopan di grup kelas, tidak membagikan data pribadi orang lain tanpa izin.',
      keyPoints: ['Definisi netiquette (etika/tata krama berinternet)', 'Alasan penting (hormat, hindari perundungan/hoaks, reputasi)', 'Satu contoh penerapan konkret'],
      rubric: openRubric, difficulty: 1,
      explanation: 'Definisikan netiquette, alasannya (komunikasi daring rawan salah paham dan merugikan), lalu satu contoh konkret.',
      refs: [{ src: S19, page: 2 }],
      en: { stem: "Explain what netiquette is and why netiquette is important. Give 1 (one) example of its application." },
    },
  ],
})

problems.push({
  id: 'k19-s2a', archetype: 'concept', title: 'Soal 2.A – Berpikir Komputasional (pilihan ganda)',
  source: prov(S19, 'Soal 2.A', [3, 4], 2019),
  intro: 'Untuk pernyataan-pernyataan di bawah ini, berikan tanda silang (X) pada 1 (satu) pilihan jawaban yang benar.',
  en: { title: 'Q2.A – Computational thinking (single-answer MCQ)' },
  parts: [
    mcq19('k19-s2a-01', 1, 3, 'Manakah yang benar terkait konsep berpikir komputasional?', ['Teknik berpikir komputasional terdiri atas dekomposisi, pengenalan pola, abstraksi, dan penyusunan algoritma.', 'Berpikir komputasional hanya berkaitan dengan pengembangan program atau aplikasi untuk komputer.', 'Berpikir komputasional melibatkan proses untuk memformulasi masalah dan mengekspresikan solusinya.', 'Berpikir komputasional dapat dipelajari tanpa harus menggunakan mesin.'], 0,
      ['Benar: empat pilar CT di kuliah.', 'Salah: CT berlaku untuk semua bidang, bukan hanya pemrograman.', 'Pernyataan ini juga benar (definisi CT di slide), tetapi soal meminta satu jawaban.', 'Pernyataan ini juga benar (slide: orang dapat belajar CT tanpa mesin), tetapi soal meminta satu jawaban.'],
      'Pilihan a adalah definisi teknik CT yang paling khas di kuliah. Catatan: kunci sumber tidak tersedia; pilihan c dan d juga merupakan pernyataan yang benar menurut slide D01 (definisi CT; CT bisa dipelajari tanpa mesin), jadi soal ini ambigu. Pilih a bila hanya boleh satu.', ['D01'], 'CT concepts',
      { refs: [{ src: S19, page: 3 }], en: { stem: 'Which statement about computational thinking is correct?' } }),
    mcq19('k19-s2a-02', 2, 3, 'Salah satu proses dalam membuat emoticon smiley adalah dengan menghilangkan semua fitur pada wajah kecuali mata dan mulut. Proses ini disebut sebagai:', ['abstraksi', 'generalisasi', 'pengenalan pola', 'dekomposisi'], 0,
      ['Abstraksi: membuang detail yang tidak relevan dan menyisakan yang penting (mata dan mulut).', 'Generalisasi: merumuskan solusi/aturan umum.', 'Pengenalan pola: mencari kesamaan/keteraturan.', 'Dekomposisi: memecah masalah menjadi bagian kecil.'],
      'Menghilangkan fitur wajah yang tak penting dan menyisakan yang esensial adalah abstraksi. (Pada lembar soal opsi terakhir berlabel "e", seharusnya "d".)', ['D03'], 'Abstraction', { refs: [{ src: S19, page: 3 }], en: { stem: "One of the processes in making a smiley emoticon is removing all the features of the face except the eyes and the mouth. This process is called:" } }),
    mcq19('k19-s2a-03', 3, 3, 'Mengenali berbagai persamaan dan perbedaan karakteristik dari berbagai jenis data dapat dikategorikan sebagai kegiatan berpikir komputasional sbb.', ['abstraksi', 'generalisasi', 'pengenalan pola', 'dekomposisi'], 2,
      ['Abstraksi membuang detail.', 'Generalisasi merumuskan aturan umum.', 'Pengenalan pola = menemukan persamaan dan perbedaan/keteraturan pada data.', 'Dekomposisi memecah masalah.'],
      'Mengenali persamaan dan perbedaan (kemiripan, keteraturan) adalah pengenalan pola.', ['D01'], 'Pattern recognition', { refs: [{ src: S19, page: 3 }], en: { stem: "Recognising the various similarities and differences in the characteristics of various kinds of data can be categorised as the following computational thinking activity." } }),
    mcq19('k19-s2a-04', 4, 3, 'Manakah yang bukan merupakan perintah control flow pada algoritma?', ['Repetisi/pengulangan', 'Selection/pilihan', 'Perintah/instruksi', 'Sequence/urutan'], 2,
      ['Control flow: pengulangan.', 'Control flow: percabangan.', 'Perintah/instruksi tunggal bukan struktur kendali alur.', 'Control flow: urutan.'],
      'Struktur kendali alur ada tiga: urutan (sequence), pilihan (selection), dan pengulangan (repetition). Instruksi tunggal bukan control flow.', ['D02'], 'Control flow', { refs: [{ src: S19, page: 3 }], en: { stem: "Which of the following is not a control flow command in an algorithm?" } }),
    mcq19('k19-s2a-05', 5, 3, 'Diberikan flowchart/pseudocode di bawah ini. Jika temperatur air adalah 80°C, apa langkah berikutnya?\n\n```\nPut the pan on the stove\nTurn on the stove\nPour water on the pan\nBoil water for 3 minutes\nMeasure water temperature\nwhile Temperature more than 90°C = No do\n    Boil water for 3 minutes\n    Measure water temperature\n{ Temperature more than 90°C = Yes }\nTurn off the stove\n```',
      ['Turn off the stove', 'Increase the fire', 'Boil water for 3 minutes', 'Measure water temperature'], 2,
      ['Hanya dilakukan setelah suhu > 90°C.', 'Tidak ada langkah ini pada algoritma.', 'Suhu 80°C belum > 90°C (jawaban "No"), jadi badan loop dijalankan: langkah pertama adalah merebus air 3 menit.', 'Pengukuran adalah langkah kedua dalam badan loop, setelah merebus.'],
      'Setelah mengukur 80°C, kondisi "lebih dari 90°C" bernilai No, sehingga masuk loop: pertama *Boil water for 3 minutes*, baru *Measure water temperature*.', ['D02'], 'Reading a flowchart/pseudocode',
      { refs: [{ src: S19, page: 3 }], figures: [{ src: S19, page: 3 }], en: { stem: 'Given the flowchart/pseudocode, if the water temperature is 80°C, what is the next step?' } }),
    mcq19('k19-s2a-06', 6, 4, 'Jika diberikan X = 6, apakah hasil dari algoritma (dalam flowchart/pseudocode) berikut.\n\n```\ni ← 0\nSum ← 0\ninput (X)\nwhile (i < X) do\n    i ← i + 1\n    Sum ← Sum + i\n{ i >= X }\noutput (Sum)\n```',
      ['6', '15', '21', 'Tidak ada output'], 2,
      ['6 adalah X, bukan jumlahnya.', '15 = 0+1+2+3+4+5 (menjumlahkan sampai i = 5).', 'Sum = 1+2+3+4+5+6 = 21.', 'Ada `output (Sum)` setelah loop.'],
      'Loop berjalan untuk i = 0..5; di tiap iterasi i dinaikkan dulu lalu ditambahkan: Sum = 1+2+3+4+5+6 = 21.', ['D02'], 'Tracing an algorithm',
      { refs: [{ src: S19, page: 4 }], figures: [{ src: S19, page: 4 }], en: { stem: 'Given X = 6, what is the result of the following algorithm?' } }),
    mcq19('k19-s2a-07', 7, 4, 'Algoritma pada soal 6 merepresentasikan persoalan:', ['Penjumlahan X dengan i.', 'Penjumlahan X buah bilangan pertama dari 0.', 'Penjumlahan i sebanyak X buah.', 'Penjumlahan X sebanyak i kali.'], 2,
      ['X tidak dijumlahkan dengan i.', 'Yang dijumlahkan 1..X (bukan mulai dari 0 dan berhenti di X−1); lagi pula penjumlahan 0 tidak mengubah apa pun, tetapi rumusan ini paling tidak tepat.', 'Variabel i (1, 2, …, X) dijumlahkan, sebanyak X suku.', 'X tidak dikalikan/dijumlahkan sebanyak i kali.'],
      'Algoritma menjumlahkan nilai i yang bertambah satu-satu sebanyak X kali (1 + 2 + … + X). Catatan: kunci sumber tidak tersedia; opsi b berbunyi "X buah bilangan pertama dari 0" yang secara harfiah berarti 0..X−1 (tidak cocok dengan hasil 21), sehingga c dipilih.', ['D02'], 'Meaning of algorithm',
      { refs: [{ src: S19, page: 4 }], en: { stem: 'The algorithm in question 6 represents the problem of:' } }),
    mcq19('k19-s2a-08', 8, 4, 'Robot mini dapat menjalankan perintah berikut:\n- V: satu langkah maju\n- L (sudut): rotasi ke sudut yang diberikan dalam kurung ke kiri\n- R (sudut): rotasi ke sudut yang diberikan di dalam kurung ke kanan\n\nPerintah dapat dirangkai dengan "+" (mis. "V + L (20) + V + R (2)"), dan diulang dengan "*" (mis. "20 * (V)" = 20 langkah maju; "180 * (V + L (1))" menggambar setengah lingkaran). Pada awalnya robot diposisikan pada titik A dan menghadap arah B (A kiri-bawah, B kanan-bawah, C kanan-atas, D kiri-atas sebuah persegi).\n\nManakah dari kombinasi perintah di bawah ini yang akan membawa robot mini dari A ke C sepanjang jalur melengkung seperti pada gambar (bentuk huruf S: melengkung ke atas lalu mendatar lagi di C)?',
      ['90 *(V+ L(1) +V+ R(1))', '90 *(V+ L(1) ) + 90 * (V+ R(1))', '90 *(V+ L(1) ) + R(30)+ 90 * (V+ R(1))', 'L(90) + 90*(V+ L(1) ) + R(90)+ 90 * (V+ R(1))'], 1,
      ['Belok kiri 1° lalu kanan 1° saling meniadakan: robot berjalan lurus ke arah B.', '90 langkah dengan belok kiri 1° tiap langkah = seperempat lingkaran ke kiri (menghadap atas), lalu 90 langkah belok kanan 1° tiap langkah = kembali menghadap B. Jejaknya berbentuk S dari A ke C.', 'Ada belokan kanan 30° ekstra yang membuat arah akhir tidak tepat.', 'L(90) awal membuat robot menghadap ke atas sehingga lengkungan berikutnya ke kiri menuju luar bidang, bukan ke C.'],
      'Jalur S terdiri atas dua seperempat lingkaran: pertama belok kiri (90 × (V + L(1))) sehingga menghadap utara, lalu belok kanan (90 × (V + R(1))) sehingga kembali menghadap timur. Itu pilihan b.', ['D02'], 'Robot / commands and loops',
      { refs: [{ src: S19, page: 4 }], figures: [{ src: S19, page: 4 }], en: { stem: 'Which command sequence takes the mini robot from A to C along the S-shaped curve in the figure?' } }),
  ],
})

problems.push({
  id: 'k19-s2b', archetype: 'robot', title: 'Soal 2.B – Ladybug (uraian)',
  source: prov(S19, 'Soal 2.B', [5], 2019),
  intro: 'Ladybug (kepik) adalah robot dan dapat dikendalikan oleh perintah-perintah ini:\n- `Forward N`: Kepik bergerak N langkah (N ≥ 1) maju ke arah yang dituju.\n- `Left`: Kepik menghadap ke kiri tanpa bergerak ke depan.\n- `Right`: Kepik menghadap ke kanan tanpa bergerak ke depan.\n- `Repeat R (beberapa perintah)`: Ladybug mengulangi perintah dalam tanda kurung R kali jika R ≥ 1. Jika R < 1, perintah dalam tanda kurung tidak dijalankan sama sekali.\n\nSetiap gerakan maju dari Ladybug melukiskan sebuah trek (garis lurus) di lantai di mana ia bergerak.',
  figures: [{ src: S19, page: 5 }],
  en: { title: 'Q2.B – Ladybug (essay)' },
  parts: [
    {
      id: 'k19-s2b-1', kind: 'open', label: '1', decks: ['D02'], topic: 'Tracing robot commands',
      stem: 'Diberikan urutan perintah sebagai berikut kepada Ladybug (setiap perintah dipisahkan oleh koma):\n\n`Repeat 2 (Forward 1, Right, Forward 1, Left), Repeat 2 (Forward 1, Right), Forward 2, Right, Forward 1, Left, Forward 1, Right, Forward 2, Right`\n\nGambarkan trek yang dilalui oleh Ladybug yang dimulai pada posisi yang ditampilkan pada gambar (kisi 5 kolom × 5 baris; kepik di titik sudut satu kotak di atas dasar, satu kotak dari tepi kiri, menghadap ke atas). Jelaskan trek dengan menuliskan koordinat titik-titiknya.',
      figures: [{ src: S19, page: 5 }],
      answer: 'Ambil titik awal (0,0), x ke kanan, y ke atas, kepik menghadap atas.\n\n1. `Repeat 2 (Forward 1, Right, Forward 1, Left)`: (0,0) → (0,1) → (1,1) → (1,2) → (2,2) → (2,3) → (3,3), hadap atas (dua anak tangga ke kanan-atas).\n2. `Repeat 2 (Forward 1, Right)`: atas ke (3,4), hadap kanan; kanan ke (4,4), hadap bawah.\n3. `Forward 2`: turun ke (4,2). `Right` → hadap kiri. `Forward 1` → (3,2). `Left` → hadap bawah. `Forward 1` → (3,1). `Right` → hadap kiri. `Forward 2` → (1,1). `Right` → hadap atas.\n\nTrek: (1,1) → (1,2) → (2,2) → (2,3) → (3,3) → (3,4) → (4,4) → (4,2) → (3,2) → (3,1) → (1,1). Hasilnya berupa lintasan tertutup yang kembali ke titik awal, berbentuk tangga naik, turun tegak, lalu berbelok masuk dan kembali ke awal. (Koordinat relatif terhadap kepik di titik (1,1) pada kisi gambar.)',
      keyPoints: ['Posisi dan arah awal diperhitungkan (menghadap atas)', 'Left/Right memutar 90° tanpa bergerak', 'Repeat dijabarkan sesuai jumlah ulangan', 'Trek akhir kembali ke titik awal'],
      rubric: [
        { score: 4, desc: 'Trek tergambar tepat sesuai semua perintah' },
        { score: 3, desc: 'Sebagian besar trek benar, ada satu segmen yang salah arah/panjang' },
        { score: 2, desc: 'Hanya sebagian awal trek benar' },
        { score: 1, desc: 'Ada aspek yang benar tetapi trek secara umum salah' },
        { score: 0, desc: 'Tidak mengerjakan' },
      ],
      explanation: 'Jabarkan perintah satu per satu sambil mencatat posisi dan arah: tangga naik dua kali, dua langkah ke atas-kanan, turun 2, lalu masuk ke kiri dan kembali ke titik awal. Catatan: arah awal kepik (menghadap atas) disimpulkan dari gambar contoh X = 1..5.',
      refs: [{ src: S19, page: 5 }],
      en: { stem: 'Draw the track left by the Ladybug for the given command sequence, starting at the position shown.' },
    },
    {
      id: 'k19-s2b-2', kind: 'robot', label: '2', decks: ['D02'], topic: 'Robot repeat (pyramid)', dialect: 'ladybug', param: 'X', nValues: [1, 2, 3, 4, 5],
      stem: 'Diberikan X (bilangan bulat ≥ 1), tuliskan urutan perintah untuk membuat trek berbentuk piramida dengan ketinggian X dari posisi awal Ladybug (lihat contoh). Asumsikan selalu ada ruang yang cukup untuk menggambar piramida dari posisi mana pun. Contoh pada gambar: X = 1 (persegi 1×1), X = 2, dan X = 5. Trek mencakup sisi kiri yang menaik seperti tangga, puncak datar satu kotak, sisi kanan menurun seperti tangga, lalu garis dasar kembali ke titik awal.',
      figures: [{ src: S19, page: 5 }],
      solution: 'Forward 1, Repeat X-1 (Right, Forward 1, Left, Forward 1), Right, Forward 1, Right, Forward 1, Repeat X-1 (Left, Forward 1, Right, Forward 1), Right, Repeat X-1 (Forward 2), Forward 1',
      rubric: [
        { score: 4, desc: 'Urutan perintah menghasilkan bentuk yang tepat untuk semua nilai X' },
        { score: 3.5, desc: 'Ada kesalahan kecil (mis. hitungan ulangan X atau panjang dasar) pada sebagian nilai X' },
        { score: 3, desc: 'Bentuk benar tetapi perintah yang berulang ditulis berjajar tanpa Repeat, atau hanya benar untuk X tertentu' },
        { score: 2, desc: 'Hanya sebagian bentuk (mis. sisi naik) yang benar' },
        { score: 1, desc: 'Ada aspek yang benar tetapi bentuk secara umum salah' },
        { score: 0, desc: 'Tidak mengerjakan' },
      ],
      hints: ['Gambar X = 1, 2, 3. Bagian apa yang berulang sebanyak X−1 kali?', 'Sisi naik dan sisi turun adalah anak tangga (belok, maju 1, belok, maju 1); garis dasar panjangnya 2X−1.', 'Untuk X = 1, `Repeat 0` tidak menjalankan apa pun: periksa bahwa programmu tetap benar.'],
      work: ['Naik 1 langkah dari titik awal.', 'Tangga naik: ulangi X−1 kali (belok kanan, maju 1, belok kiri, maju 1).', 'Puncak: belok kanan, maju 1 (datar), lalu belok kanan dan maju 1 (turun pertama).', 'Tangga turun: ulangi X−1 kali (belok kiri, maju 1, belok kanan, maju 1).', 'Dasar: belok kanan, maju 2X−1 langkah (ditulis Repeat X−1 (Forward 2) + Forward 1) kembali ke titik awal.'],
      explanation: 'Pola per X: sisi kiri menaik X langkah dengan X−1 anak tangga, puncak mendatar 1, sisi kanan menurun X langkah, dasar sepanjang 2X−1. Semua bagian berulang dinyatakan dengan `Repeat X-1`; saat X = 1 ulangan = 0 sehingga hanya persegi tersisa. Catatan: jawaban lain yang menghasilkan trek sama juga benar.',
      refs: [{ src: S19, page: 5 }],
      en: { stem: 'Given X (integer ≥ 1), write the commands that draw a pyramid-shaped track of height X from the Ladybug\'s starting position.' },
    },
  ],
})

/* ---- UTS 2019 Soal 3: programs ---- */

const k19_31 = r`# Program VolumeBola
# Menghitung volume bola V = 4/3 * pi * r^3 dengan pi = 3.1416
# DECLARATIONS
# PI : float
# r, V : float
# ALGORITHM
PI = 3.1416
r = float(input())
V = 4 / 3 * PI * r ** 3
print(V)`
const k19_31p = r`Program VolumeBola
{ Menghitung volume bola: V = 4/3 * pi * r^3, pi = 3.1416 }
KAMUS
  PI, r, V : real
ALGORITMA
  PI ← 3.1416
  input(r)
  V ← 4 / 3 * PI * r ** 3
  output(V)`

const k19_32 = r`# Program AngkaArmstrong
# Memeriksa apakah bilangan 3 digit n adalah angka Armstrong (jumlah pangkat tiga digit = n)
# DECLARATIONS
# n, ratusan, puluhan, satuan : int
# ALGORITHM
n = int(input())
ratusan = n // 100
puluhan = (n // 10) % 10
satuan = n % 10
if (ratusan ** 3 + puluhan ** 3 + satuan ** 3 == n):
    print(str(n) + " adalah bilangan Armstrong")
else:
    print(str(n) + " bukan bilangan Armstrong")`
const k19_32p = r`Program AngkaArmstrong
{ Memeriksa apakah bilangan 3 digit n adalah angka Armstrong }
KAMUS
  n, ratusan, puluhan, satuan : integer
ALGORITMA
  input(n)
  ratusan ← n div 100
  puluhan ← (n div 10) mod 10
  satuan ← n mod 10
  if ratusan ** 3 + puluhan ** 3 + satuan ** 3 = n then
    output(n + " adalah bilangan Armstrong")
  else
    output(n + " bukan bilangan Armstrong")`

const k19_33 = r`# Program NilaiKuliah
# Menghitung nilai akhir dan indeks untuk N mahasiswa
# nilai akhir = 0.2 * praktikum + 0.4 * uts + 0.4 * uas
# DECLARATIONS
# N, i : int
# nama : str
# prak, uts, uas : int
# akhir : float
# indeks : str
# ALGORITHM
N = int(input())
print("nama | praktikum | uts | uas | akhir | indeks")
for i in range(N):
    nama = input()
    prak = int(input())
    uts = int(input())
    uas = int(input())
    akhir = 0.2 * prak + 0.4 * uts + 0.4 * uas
    if (akhir >= 85):
        indeks = "A"
    elif (akhir >= 75):
        indeks = "AB"
    elif (akhir >= 70):
        indeks = "B"
    elif (akhir >= 60):
        indeks = "BC"
    elif (akhir >= 50):
        indeks = "C"
    elif (akhir >= 40):
        indeks = "D"
    else:
        indeks = "E"
    print(nama + " | " + str(prak) + " | " + str(uts) + " | " + str(uas) + " | " + str(akhir) + " | " + indeks)`
const k19_33p = r`Program NilaiKuliah
{ Menghitung nilai akhir dan indeks N mahasiswa }
KAMUS
  N, i, prak, uts, uas : integer
  nama, indeks : string
  akhir : real
ALGORITMA
  input(N)
  output("nama | praktikum | uts | uas | akhir | indeks")
  i traversal [1..N]
    input(nama)
    input(prak)
    input(uts)
    input(uas)
    akhir ← 0.2 * prak + 0.4 * uts + 0.4 * uas
    if akhir >= 85 then
      indeks ← "A"
    else
      if akhir >= 75 then
        indeks ← "AB"
      else
        if akhir >= 70 then
          indeks ← "B"
        else
          if akhir >= 60 then
            indeks ← "BC"
          else
            if akhir >= 50 then
              indeks ← "C"
            else
              if akhir >= 40 then
                indeks ← "D"
              else
                indeks ← "E"
    output(nama, " | ", prak, " | ", uts, " | ", uas, " | ", akhir, " | ", indeks)`

const k19_34 = r`# Program DeviasiStandar
# Menghitung deviasi standar sampel tinggi 50 mahasiswa: s = sqrt( sum((xi - rata)^2) / (N - 1) )
# DECLARATIONS
# N : int
# T : array [0..49] of int
# i : int
# total, jumlah, rata, s : float
# ALGORITHM
N = 50
T = [0 for i in range(N)]
for i in range(N):
    T[i] = int(input())
total = 0
for i in range(N):
    total = total + T[i]
rata = total / N
jumlah = 0
for i in range(N):
    jumlah = jumlah + (T[i] - rata) ** 2
s = (jumlah / (N - 1)) ** 0.5
print(s)`
const k19_34p = r`Program DeviasiStandar
{ Deviasi standar sampel tinggi 50 mahasiswa }
KAMUS
  N, i : integer
  T : array [0..49] of integer
  total, jumlah, rata, s : real
ALGORITMA
  N ← 50
  i traversal [0..N-1]
    input(T[i])
  total ← 0
  i traversal [0..N-1]
    total ← total + T[i]
  rata ← total / N
  jumlah ← 0
  i traversal [0..N-1]
    jumlah ← jumlah + (T[i] - rata) ** 2
  s ← (jumlah / (N - 1)) ** 0.5
  output(s)`

const h19 = nl(50, (i) => 150 + (i * 13) % 40)
const gradeRows = (vals: number[]): string[] => [String(vals.length), ...vals.flatMap((v, i) => ['mhs' + (i + 1), String(v), String(v), String(v)])]

problems.push({
  id: 'k19-s3-1', archetype: 'program', title: 'Soal 3.1 – Volume Bola', source: prov(S19, 'Soal 3.1', [6], 2019), paperWeight: 0.125,
  intro: 'Untuk soal 3.1 s.d. 3.4: (a) Buatlah program dalam bahasa pemrograman Python sesuai dengan yang diajarkan di kelas. (b) Bonus: buatlah flowchart/pseudocode untuk persoalan tersebut (pilih salah satu).',
  en: { title: 'Q3.1 – Sphere volume' },
  parts: [{
    id: 'k19-s3-1a', kind: 'program', decks: ['D04'], topic: 'Formulas and constants', patterns: ['sequence-io', 'type-conversion', 'operators'], misconceptions: ['int-vs-float-div', 'input-is-str'],
    stem: 'Diketahui sebuah bola dengan jari-jari $r$. Volume bola adalah $V_{bola} = \\frac{4}{3}\\pi r^3$. Buatlah program yang menerima masukan jari-jari bola dan menampilkan volume bola. Untuk konstanta $\\pi$, gunakan 3,1416 (di Python: `3.1416`).',
    reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: numJudge, rubric: progRubric,
    solution: { python: k19_31, pseudo: k19_31p },
    tests: [{ stdin: ['1'] }, { stdin: ['2'] }, { stdin: ['0.5'] }, { stdin: ['10'] }],
    wrong: [
      { code: 'r = float(input())\nV = 4 // 3 * 3.1416 * r ** 3\nprint(V)', msg: '`4 // 3` adalah pembagian bulat (= 1), bukan 1,333…. Gunakan `4 / 3`.', tag: 'int-vs-float-div' },
      { code: 'r = float(input())\nV = 4 / 3 * 3.1416 * r * 3\nprint(V)', msg: 'r³ ditulis `r ** 3`, bukan `r * 3`.' },
    ],
    plan: 'PI ← 3.1416; baca r; V ← 4/3 × PI × r³; tampilkan V',
    skeleton: 'PI = ___\nr = ___(input())\nV = 4 ___ 3 * PI * r ___ 3\nprint(V)',
    hints: ['Jari-jari boleh bilangan riil: tipe apa untuk `input`?', 'Pangkat tiga dengan operator apa di Python?', 'Pastikan 4/3 tidak menjadi pembagian bulat.'],
    work: ['Simpan konstanta PI = 3.1416.', 'Baca r dengan `float(input())`.', 'Hitung V = 4 / 3 * PI * r ** 3.', 'Tampilkan V.'],
    syntax: ['program-template', 'input', 'operators'],
    lineNotes: N(k19_31, [
      ['PI = 3.1416', 'Konstanta π sesuai soal diberi nama sendiri agar mudah dibaca.'],
      ['r = float', 'Masukan riil: `float(input())`.', 'input'],
      ['V = 4 / 3', '`/` di Python 3 menghasilkan bilangan riil, sehingga 4/3 = 1.333…; `**` adalah pangkat.', 'operators'],
      ['print(V)', 'Tampilkan volume (jumlah desimal bebas).'],
    ]),
    pseudoNotes: N(k19_31p, [
      ['KAMUS', 'Deklarasi: semua bertipe real karena memuat pecahan.'],
      ['PI ← 3.1416', 'Penugasan memakai ←.'],
      ['V ← 4 / 3', 'Rumus volume bola; `**` adalah pangkat.'],
    ]),
    explanation: 'V = 4 / 3 * PI * r ** 3 dengan r dibaca sebagai `float`; pastikan pembagian riil.',
    refs: [{ src: S19, page: 6 }],
  }],
})

problems.push({
  id: 'k19-s3-2', archetype: 'program', title: 'Soal 3.2 – Angka Armstrong', source: prov(S19, 'Soal 3.2', [6], 2019), paperWeight: 0.125,
  en: { title: 'Q3.2 – Armstrong number' },
  parts: [{
    id: 'k19-s3-2a', kind: 'program', decks: ['D05'], topic: 'Number digits and branching', patterns: ['operators', 'if-else'], misconceptions: ['off-by-one'],
    stem: 'Angka Armstrong dari 3 (tiga) digit bilangan adalah bilangan bulat sehingga jumlah pangkat tiga dari masing-masing digitnya sama dengan angka itu sendiri. Misalnya, 371 adalah angka Armstrong karena $3^3 + 7^3 + 1^3 = 371$. Buatlah program yang meminta *user* masukan bilangan bulat ratusan (3 digit), lalu menampilkan ke layar apakah bilangan tersebut adalah bilangan Armstrong atau bukan.',
    reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: armJudge, rubric: progRubric,
    solution: { python: k19_32, pseudo: k19_32p },
    tests: [{ stdin: ['371'] }, { stdin: ['153'] }, { stdin: ['407'] }, { stdin: ['100'], edge: 'smallest 3-digit number' }, { stdin: ['123'] }, { stdin: ['999'] }],
    wrong: [
      { code: 'n = int(input())\na = n // 100\nb = (n // 10) % 10\nc = n % 10\nif (a ** 2 + b ** 2 + c ** 2 == n):\n    print("Armstrong")\nelse:\n    print("Bukan Armstrong")', msg: 'Yang dijumlahkan adalah pangkat tiga digit (`** 3`), bukan pangkat dua.' },
      { code: 'n = int(input())\na = n // 100\nb = n // 10\nc = n % 10\nif (a ** 3 + b ** 3 + c ** 3 == n):\n    print("Armstrong")\nelse:\n    print("Bukan Armstrong")', msg: '`n // 10` bukan digit puluhan (itu dua digit pertama, mis. 37 untuk 371). Ambil digit puluhan dengan `(n // 10) % 10`.' },
    ],
    plan: 'baca n; ratusan ← n div 100; puluhan ← (n div 10) mod 10; satuan ← n mod 10; jika jumlah pangkat tiga digit = n: Armstrong, selain itu bukan',
    skeleton: 'n = int(input())\nratusan = n // ___\nputuhan = (n // ___) % ___\nsatuan = n % ___\nif (ratusan ** 3 + puluhan ** ___ + satuan ** 3 ___ n):\n    print("Armstrong")\nelse:\n    print("Bukan Armstrong")',
    hints: ['Bagaimana mengambil tiap digit dari bilangan 3 digit dengan operasi bagi dan sisa?', 'Digit puluhan: bagi dulu dengan 10, lalu ambil sisa bagi 10.', 'Bandingkan jumlah pangkat tiga dengan n dengan `==`, bukan `=`.'],
    work: ['Baca n sebagai int.', 'ratusan = n // 100; puluhan = (n // 10) % 10; satuan = n % 10.', 'Hitung jumlah pangkat tiga ketiga digit.', 'Bandingkan dengan n; cetak Armstrong atau bukan.'],
    syntax: ['operators', 'if-else', 'relational-logical'],
    lineNotes: N(k19_32, [
      ['n = int', 'n bilangan bulat 3 digit.', 'input'],
      ['ratusan = n // 100', '`//` pembagian bulat: 371 // 100 = 3.', 'operators'],
      ['puluhan = (n // 10) % 10', '371 // 10 = 37, lalu % 10 = 7: digit tengah. Kurung penting.', 'operators'],
      ['satuan = n % 10', 'Sisa bagi 10 = digit terakhir.', 'operators'],
      ['if (ratusan ** 3', 'Perbandingan memakai `==` (bukan `=` yang penugasan).', 'relational-logical'],
      ['print(str(n) + " adalah', '`str(n)` wajib agar bisa digabung dengan string.', 'print-str'],
    ]),
    pseudoNotes: N(k19_32p, [
      ['ratusan ← n div 100', '`div` dan `mod` adalah pembagian bulat dan sisa bagi di notasi kuliah.'],
      ['if ratusan', 'Perbandingan sama dengan memakai `=` pada pseudocode.'],
    ]),
    explanation: 'Ekstrak ketiga digit dengan `//` dan `%`, jumlahkan pangkat tiganya, dan bandingkan dengan n.',
    refs: [{ src: S19, page: 6 }],
  }],
})

problems.push({
  id: 'k19-s3-3', archetype: 'program', title: 'Soal 3.3 – Nilai Kuliah', source: prov(S19, 'Soal 3.3', [6], 2019), paperWeight: 0.125,
  en: { title: 'Q3.3 – Course grades' },
  parts: [{
    id: 'k19-s3-3a', kind: 'program', decks: ['D05'], topic: 'Loop over N data + multi-case branching', patterns: ['for-count', 'if-elif'], misconceptions: ['off-by-one'],
    stem: 'Dosen ingin mengolah nilai kuliah yang diikuti oleh N orang mahasiswa (N > 0). Program tersebut menerima masukan nama, nilai praktikum, nilai uts dan nilai uas sebanyak jumlah mahasiswa (setiap nilai dalam skala 0 s.d. 100). Untuk setiap mahasiswa, dihitung nilai akhir dengan rumus sbb:\n\nnilai akhir = 0,2 * nilai praktikum + 0,4 * nilai uts + 0,4 * nilai uas\n\nSelanjutnya, berdasarkan nilai akhir tersebut, ditentukan indeks akhir mata kuliah yang didapat oleh setiap mahasiswa dengan aturan: A ≥ 85, 85 > AB ≥ 75, 75 > B ≥ 70, 70 > BC ≥ 60, 60 > C ≥ 50, 50 > D ≥ 40, dan sisanya E.\n\nProgram kemudian mencetak nama, setiap komponen nilai, nilai akhir, dan indeks untuk tiap mahasiswa. Berikut contoh tampilan outputnya (setiap detil nilai dipisahkan oleh spasi dan *vertical bar*, N = 2).\n\n```\nnama | praktikum | uts | uas | akhir | indeks\nUdin | 50 | 50 | 50 | 50 | C\nAsep | 90 | 70 | 70 | 80 | AB\n```\n\n(Urutan masukan pada latihan ini: N, lalu per mahasiswa: nama, praktikum, uts, uas, masing-masing satu baris.)',
    reps: ['python', 'pseudo', 'flow'], match: 'lenient', rubric: progRubric,
    solution: { python: k19_33, pseudo: k19_33p },
    tests: [
      { stdin: ['2', 'Udin', '50', '50', '50', 'Asep', '90', '70', '70'] },
      { stdin: gradeRows([85, 75, 70, 60, 50, 40, 39]), edge: 'tepat di setiap batas indeks' },
      { stdin: ['1', 'Budi', '100', '100', '100'], edge: 'N = 1, maximum value' },
      { stdin: ['1', 'Cici', '0', '0', '0'], edge: 'minimum value' },
    ],
    wrong: [
      { code: 'N = int(input())\nfor i in range(N):\n    nama = input()\n    p = int(input())\n    u = int(input())\n    s = int(input())\n    a = 0.2 * p + 0.4 * u + 0.4 * s\n    if (a > 85):\n        k = "A"\n    elif (a > 75):\n        k = "AB"\n    elif (a > 70):\n        k = "B"\n    elif (a > 60):\n        k = "BC"\n    elif (a > 50):\n        k = "C"\n    elif (a > 40):\n        k = "D"\n    else:\n        k = "E"\n    print(nama + " | " + str(p) + " | " + str(u) + " | " + str(s) + " | " + str(a) + " | " + k)', msg: 'Batas bawah tiap indeks termasuk (≥). Dengan `>`, nilai 85, 75, 70, … jatuh ke indeks di bawahnya.', tag: 'off-by-one' },
      { code: 'N = int(input())\nfor i in range(N):\n    nama = input()\n    p = int(input())\n    u = int(input())\n    s = int(input())\n    a = 0.2 * p + 0.4 * u + 0.4 * s\n    if (a >= 85):\n        k = "A"\n    if (a >= 75):\n        k = "AB"\n    if (a >= 70):\n        k = "B"\n    if (a >= 60):\n        k = "BC"\n    if (a >= 50):\n        k = "C"\n    if (a >= 40):\n        k = "D"\n    else:\n        k = "E"\n    print(nama + " | " + str(p) + " | " + str(u) + " | " + str(s) + " | " + str(a) + " | " + k)', msg: 'Rangkaian `if` terpisah (bukan `elif`) tidak saling lepas: nilai 85 memenuhi semua kondisi dan indeks tertimpa menjadi yang terakhir. Pakai `elif`.' },
    ],
    plan: 'baca N; cetak header; ulangi N kali: baca nama dan tiga nilai; akhir ← 0.2p + 0.4u + 0.4s; tentukan indeks dengan rantai if-elif dari A sampai E; cetak satu baris',
    skeleton: 'N = int(input())\nprint("nama | praktikum | uts | uas | akhir | indeks")\nfor i in range(___):\n    nama = input()\n    prak = ___(input())\n    ...\n    akhir = 0.2 * prak + ___ * uts + ___ * uas\n    if (akhir >= ___):\n        indeks = "A"\n    ___ (akhir >= 75):\n        indeks = "AB"\n    # lanjutkan ...',
    hints: ['Pola apa untuk "sebanyak N mahasiswa"? Pengulangan berdasarkan pencacah.', 'Indeks ditentukan dari rentang nilai: pakai rantai `if-elif-else`, dari yang tertinggi.', 'Batas bawah tiap indeks termasuk, jadi pakai `>=`.'],
    work: ['Baca N dan cetak baris header.', 'Loop N kali: baca nama, praktikum, uts, uas.', 'Hitung nilai akhir dengan bobot 0.2/0.4/0.4.', 'Tentukan indeks dengan `if-elif` dari A (≥ 85) turun sampai D (≥ 40), else E.', 'Cetak nama | nilai-nilai | akhir | indeks.'],
    syntax: ['for-range', 'if-elif', 'print-str'],
    lineNotes: N(k19_33, [
      ['N = int', 'Banyaknya mahasiswa (N > 0).', 'input'],
      ['print("nama |', 'Header tabel dicetak sekali sebelum loop.'],
      ['for i in range(N)', 'Pengulangan berdasarkan pencacah: i = 0..N−1, tepat N kali.', 'for-range'],
      ['nama = input()', 'Nama tetap string (tanpa konversi); nilai dikonversi `int`.', 'input'],
      ['akhir = 0.2', 'Rumus nilai akhir dengan bobot 0,2 / 0,4 / 0,4.'],
      ['if (akhir >= 85)', 'Rantai `if-elif` dari indeks tertinggi: tiap `elif` hanya dicek bila yang sebelumnya salah. Batas bawah termasuk (`>=`).', 'if-elif', 'indeks = "E"'],
      ['print(nama + " | "', 'Semua komponen non-string dibungkus `str()` agar bisa digabung dengan `+`.', 'print-str'],
    ]),
    pseudoNotes: N(k19_33p, [
      ['i traversal [1..N]', 'Pengulangan N kali; pada pseudocode rentang inklusif.'],
      ['if akhir >= 85 then', 'Rantai kasus ditulis bersarang di cabang `else`.'],
      ['output(nama', 'Beberapa nilai dalam satu `output`.'],
    ]),
    explanation: 'Loop N kali; hitung akhir = 0.2p + 0.4u + 0.4s; tentukan indeks dengan `if-elif-else` memakai `>=`; cetak per mahasiswa. Catatan: contoh pada soal menulis akhir 80 dan indeks AB untuk (90, 70, 70), padahal 0.2·90 + 0.4·70 + 0.4·70 = 74 (indeks B); angka contoh pada lembar soal tampaknya keliru.',
    refs: [{ src: S19, page: 6 }],
  }],
})

problems.push({
  id: 'k19-s3-4', archetype: 'program', title: 'Soal 3.4 – Deviasi Standar', source: prov(S19, 'Soal 3.4', [7], 2019), paperWeight: 0.125,
  en: { title: 'Q3.4 – Standard deviation' },
  parts: [{
    id: 'k19-s3-4a', kind: 'program', decks: ['D06'], topic: 'Array: average and standard deviation', patterns: ['array-populate', 'accumulate-sum', 'average'], misconceptions: ['init-in-loop'],
    stem: 'Dalam statistik, deviasi standar adalah salah satu ukuran persebaran data. Deviasi standar untuk N buah sampel data dihitung dengan rumus:\n\n$$s = \\sqrt{\\frac{1}{N-1}\\sum_{i=1}^{N}(x_i - \\bar{x})^2}$$\n\ndengan $s$ = deviasi standar sampel, $N$ = banyaknya data sampel, $x_i$ = nilai data ke-i, $\\bar{x}$ = rata-rata nilai seluruh sampel data.\n\nSuatu program menggunakan formula di atas untuk mengukur persebaran data tinggi mahasiswa di suatu universitas. Digunakan sampel data mahasiswa 1 kelas yang terdiri atas 50 mahasiswa. Program menerima masukan tinggi dari 50 mahasiswa (data tinggi adalah integer > 0) dan menyimpannya dalam suatu *array of integer*. Selanjutnya, dituliskan ke layar deviasi standar dari tinggi mahasiswa yang dihitung berdasarkan formula di atas.\n\nPetunjuk: sebelum memulai perhitungan deviasi standar, hitung terlebih dahulu rata-rata nilai seluruh sampel data $\\bar{x}$.',
    reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: numJudge, mustUse: ['array'], rubric: progRubric,
    solution: { python: k19_34, pseudo: k19_34p },
    tests: [{ stdin: h19 }, { stdin: nl(50, (i) => 100 + i) , edge: 'data menaik' }, { stdin: nl(50, () => 170), edge: 'all equal: s = 0' }, { stdin: nl(50, (i) => (i % 2 ? 190 : 150)) }],
    wrong: [
      { code: 'N = 50\nT = [0 for i in range(N)]\nfor i in range(N):\n    T[i] = int(input())\ntotal = 0\nfor i in range(N):\n    total = total + T[i]\nrata = total / N\njumlah = 0\nfor i in range(N):\n    jumlah = jumlah + (T[i] - rata) ** 2\nprint((jumlah / N) ** 0.5)', msg: 'Rumus sampel membagi dengan N − 1, bukan N.' },
      { code: 'N = 50\nT = [0 for i in range(N)]\nfor i in range(N):\n    T[i] = int(input())\ntotal = 0\nfor i in range(N):\n    total = total + T[i]\nrata = total / N\njumlah = 0\nfor i in range(N):\n    jumlah = jumlah + (T[i] - rata) ** 2\nprint(jumlah / (N - 1))', msg: 'Akar kuadrat belum diambil: yang dihitung baru variansi. Tambahkan `** 0.5`.' },
      { code: 'N = 50\nT = [0 for i in range(N)]\nfor i in range(N):\n    T[i] = int(input())\ntotal = 0\nfor i in range(N):\n    total = total + T[i]\nrata = total / N\njumlah = 0\nfor i in range(N):\n    jumlah = jumlah + (T[i] - rata)\nprint((abs(jumlah) / (N - 1)) ** 0.5)', msg: 'Selisih belum dikuadratkan; jumlah selisih terhadap rata-rata selalu ≈ 0. Gunakan `(T[i] - rata) ** 2`.' },
    ],
    plan: 'isi T[0..49]; total ← jumlah semua T[i]; rata ← total/N; jumlah ← Σ (T[i] − rata)²; s ← akar(jumlah/(N−1)); tampilkan s',
    skeleton: 'total = ___\nfor i in range(N):\n    total = total + ___\nrata = total / ___\njumlah = 0\nfor i in range(N):\n    jumlah = jumlah + (T[i] - ___) ** ___\ns = (jumlah / (N - ___)) ** ___\nprint(s)',
    hints: ['Ikuti petunjuk: hitung dulu rata-rata (satu pass), baru jumlah selisih kuadrat (pass kedua).', 'Akumulator dimulai 0 sebelum loop masing-masing.', 'Rumus sampel membagi dengan N − 1, lalu diakarkan.'],
    work: ['Isi array T (50 elemen).', 'Pass 1: total = Σ T[i]; rata = total / N.', 'Pass 2: jumlah = Σ (T[i] − rata)².', 's = (jumlah / (N−1)) ** 0.5.', 'Tampilkan s.'],
    syntax: ['list-init', 'list-index', 'for-range', 'operators'],
    lineNotes: N(k19_34, [
      ['T = [0 for', 'Array 50 elemen untuk menyimpan data tinggi.', 'list-init'],
      ['T[i] = int(input())', 'Isi array dari masukan.', 'list-index'],
      ['total = 0', 'Akumulator diinisialisasi sebelum loop.'],
      ['rata = total / N', 'Rata-rata dihitung **dulu** (petunjuk soal) karena rumus butuh x̄ sebelum menjumlah selisih.'],
      ['jumlah = jumlah + (T[i] - rata) ** 2', 'Jumlah kuadrat selisih; kuadrat mencegah selisih positif dan negatif saling meniadakan.', 'operators'],
      ['s = (jumlah / (N - 1))', 'Dibagi N−1 (sampel), lalu `** 0.5` = akar kuadrat. Kurung wajib.'],
      ['print(s)', 'Tampilkan s (jumlah desimal bebas).'],
    ]),
    pseudoNotes: N(k19_34p, [
      ['i traversal [0..N-1]', 'Indeks array 0..N−1 (inklusif di pseudocode).'],
      ['rata ← total / N', 'Rata-rata sebelum menghitung selisih kuadrat.'],
      ['s ← (jumlah', 'Variansi sampel dibagi N−1, lalu akar.'],
    ]),
    explanation: 'Dua pass: rata-rata, lalu jumlah (xi − rata)² dibagi (N − 1) dan diakarkan.',
    refs: [{ src: S19, page: 7 }],
  }],
})

/* ---------------------------------- UTS 2021 ---------------------------------- */


problems.push({
  id: 'k21-s1', archetype: 'concept', title: 'Soal 1 – Green computing', source: prov(S21, 'Soal 1', [2], 2021),
  intro: 'Bagian A. Computing System, Network, and Impact of Computing (30 menit). Untuk soal 1 s.d. 3, tuliskan jawaban secara singkat, padat, tapi dengan jelas. Gunakan Bahasa Indonesia yang baik dan benar.',
  en: { title: 'Q1 – Green computing' },
  parts: [{
    id: 'k21-s1a', kind: 'open', decks: ['D11'], topic: 'Environmental impact of computing: green computing',
    stem: 'Jelaskan apa yang disebut sebagai *green computing* dan jelaskan 2 (dua) contoh aplikasi dari *green computing*.',
    answer: '*Green computing* adalah praktik merancang, memproduksi, menggunakan, dan membuang perangkat computing (komputer, server, jaringan) secara ramah lingkungan dan hemat energi, untuk menekan konsumsi energi, limbah elektronik, dan jejak karbon.\nContoh aplikasi:\n1. Penghematan energi: mode *sleep*/hibernasi otomatis, perangkat berstandar Energy Star, penggunaan CPU/GPU hemat daya.\n2. Virtualisasi dan *cloud computing*: satu server fisik menjalankan banyak mesin virtual sehingga jumlah perangkat dan listrik berkurang.\n(Contoh valid lain: daur ulang/penggunaan ulang perangkat elektronik, pusat data berenergi terbarukan, mengurangi kertas dengan dokumen digital.)',
    keyPoints: ['Definisi: computing ramah lingkungan dan hemat energi', 'Contoh 1 + penjelasannya', 'Contoh 2 + penjelasannya', 'Dampak: energi/limbah/jejak karbon berkurang'],
    rubric: openRubric, difficulty: 1,
    explanation: 'Definisikan green computing (efisiensi energi dan pengurangan limbah elektronik), lalu dua contoh konkret dengan penjelasan manfaatnya.',
    refs: [{ src: S21, page: 2 }],
    en: { stem: "Explain what is called *green computing* and explain 2 (two) example applications of *green computing*." },
  }],
})

problems.push({
  id: 'k21-s2', archetype: 'concept', title: 'Soal 2 – Perangkat lunak untuk kuliah online', source: prov(S21, 'Soal 2', [2], 2021, true),
  en: { title: 'Q2 – Software supporting online lectures' },
  parts: [{
    id: 'k21-s2a', kind: 'open', decks: ['D11'], topic: 'Software for online classes',
    stem: 'Sebutkan 2 (dua) contoh software/perangkat lunak, baik yang tersedia online (berbentuk aplikasi web atau mobile) maupun yang offline (aplikasi desktop) yang mendukung pelaksanaan kuliah online. Untuk masing-masing contoh, jelaskan bagaimana perangkat lunak tersebut mendukung Anda dalam melaksanakan kuliah online.',
    answer: 'Banyak jawaban valid. Contoh:\n1. **Zoom/Google Meet/MS Teams** (aplikasi web/desktop/mobile): kuliah tatap muka daring secara langsung (video, suara, berbagi layar, papan tulis, rekaman).\n2. **LMS (mis. Moodle/Edunex/Google Classroom)**: mengunduh materi, mengumpulkan tugas, mengikuti kuis, forum diskusi dan pengumuman.\n(Alternatif: Google Docs/Drive untuk kerja kelompok; Visual Studio Code/Jupyter/Colab untuk praktikum pemrograman.)',
    keyPoints: ['Dua perangkat lunak yang relevan (online/offline)', 'Penjelasan fungsi untuk kuliah online masing-masing'],
    rubric: openRubric, difficulty: 1,
    explanation: 'Soal terbuka tentang perangkat lunak pendukung kuliah daring; di luar silabus WI1102 (dianggap pengetahuan umum).',
    refs: [{ src: S21, page: 2 }],
    en: { stem: "Name 2 (two) examples of software, both those available online (in the form of a web or mobile application) and offline (desktop applications), that support the conduct of online lectures. For each example, explain how the software supports you in carrying out online lectures." },
  }],
})

problems.push({
  id: 'k21-s3', archetype: 'concept', title: 'Soal 3 – Ancaman terhadap privasi', source: prov(S21, 'Soal 3', [2], 2021),
  en: { title: 'Q3 – Threats to privacy' },
  parts: [{
    id: 'k21-s3a', kind: 'open', decks: ['D11'], topic: 'Privacy and computing technology',
    stem: 'Sebutkan dan jelaskan 2 (dua) contoh ancaman terhadap privasi karena perkembangan teknologi *computing* dan untuk masing-masing contoh, berikan 1 (satu) contoh tindakan yang dapat dilakukan oleh pribadi untuk menghindari/mengatasinya.',
    answer: 'Banyak jawaban valid. Contoh:\n1. **Pengumpulan dan penjualan data pribadi oleh aplikasi/platform** (pelacakan lokasi, riwayat browsing, iklan tertarget). Tindakan pribadi: batasi izin aplikasi (lokasi, kontak, kamera), tinjau pengaturan privasi, hapus aplikasi yang meminta izin berlebihan.\n2. **Kebocoran data / pencurian identitas / *phishing***: data diri (NIK, nomor telepon, kata sandi) dicuri dan disalahgunakan. Tindakan pribadi: kata sandi unik dan kuat, autentikasi dua faktor, tidak membagikan data pribadi di situs/tautan yang tidak tepercaya.\n(Lain-lain: pengawasan kamera dan pengenalan wajah, jejak digital permanen, *oversharing* di media sosial. Rujukan UU PDP bisa menambah nilai.)',
    keyPoints: ['Dua ancaman privasi berbeda dijelaskan', 'Satu tindakan pribadi untuk tiap ancaman', 'Tindakan realistis dan sesuai ancaman'],
    rubric: openRubric, difficulty: 1,
    explanation: 'Dua ancaman privasi (mis. pelacakan/pengumpulan data dan kebocoran/phishing) masing-masing dengan satu tindakan pribadi yang konkret.',
    refs: [{ src: S21, page: 2 }],
    en: { stem: "Name and explain 2 (two) examples of threats to privacy due to the development of *computing* technology and, for each example, give 1 (one) example of an action that can be taken by an individual to avoid/overcome it." },
  }],
})

problems.push({
  id: 'k21-s4', archetype: 'robot', title: 'Soal 4 – Robot mini: pola huruf S berulang', source: prov(S21, 'Soal 4', [3, 4], 2021),
  intro: 'Bagian B. Berpikir Komputasional (20 menit). Robot mini menggambarkan jejak gerakan di atas media gambar. Untuk melakukannya, dia dapat menjalankan perintah-perintah berikut:\n- `forward`: maju 1 langkah\n- `turn L/R d`: berputar/rotasi sebesar d derajat ke kiri jika L/R bernilai L, dan ke kanan jika L/R bernilai R. Asumsikan: L/R bernilai L dan R, sedangkan 0 ≤ d ≤ 360. Jika d = 0 atau 360, maka robot tidak berubah arah.\n- `repeat n (perintah)`: mengulang perintah sebanyak n kali. Asumsikan n ≥ 0. Jika n = 0, perintah tidak dilakukan sama sekali.\n- `ifelse(ekspresi)(perintah-1)(perintah-2)`: jika ekspresi bernilai true, perintah-1 dijalankan; jika false, perintah-2 dijalankan. Ekspresi adalah ekspresi boolean seperti yang diajarkan di kelas (boleh memakai cara penulisan Python/Matlab).\n\nAsumsi: di awal, robot berada di posisi A dan menghadap ke kanan/timur. Perintah dipisahkan koma (kecuali yang terakhir) dan boleh ditulis ke bawah dengan indentasi. Parameter `repeat` dan `ifelse` dapat terdiri atas lebih dari 1 perintah.\n\nContoh: `forward, turn L 45, forward, turn R 45` (maju 1, kiri 45°, maju 1, kanan 45°); `repeat 180 (forward, turn L 1)` menggambar setengah lingkaran.',
  figures: [{ src: S21, page: 3 }, { src: S21, page: 4 }],
  en: { title: 'Q4 – Mini robot: repeated S pattern' },
  parts: [{
    id: 'k21-s4a', kind: 'open', decks: ['D02'], topic: 'Robot repeat / if-else (S pattern)',
    stem: 'Diberikan x (bilangan bulat ≥ 1), tuliskan urutan perintah untuk membuat jejak robot dari posisi A ke posisi terakhir untuk membentuk pola huruf S berulang seperti pada contoh x = 1, x = 2, dan x = 5 (lihat gambar). Asumsikan selalu ada ruang yang cukup untuk menggambar dari posisi mana pun. Gambar hanyalah contoh; generalisasikan bagaimana pola gambar jika x bernilai lain.',
    figures: [{ src: S21, page: 4 }],
    answer: 'Amati: x = 1 adalah dua seperempat lingkaran (naik ke kiri 90°, lalu kembali mendatar). Tiap tambahan x menambah satu setengah lingkaran bergantian (lengkung atas dan lengkung bawah), sehingga ada x − 1 setengah lingkaran. Jejak berakhir di atas bila x ganjil, di bawah bila x genap.\n\nContoh jawaban:\n```\nrepeat 90 (forward, turn L 1),\nrepeat (x - 1) // 2 (\n    repeat 180 (forward, turn R 1),\n    repeat 180 (forward, turn L 1)\n),\nifelse (x % 2 == 1)\n    (repeat 90 (forward, turn R 1))\n    (repeat 180 (forward, turn R 1), repeat 90 (forward, turn L 1))\n```\nPengecekan: x = 1: kiri 90° (menghadap utara), 0 pasangan, ganjil → kanan 90° (menghadap timur). x = 2: kiri 90°, tidak ada pasangan, genap → kanan 180° (menghadap selatan), kiri 90° (menghadap timur), berakhir di bawah. x = 5: kiri 90°, 2 pasangan (lengkung atas-bawah-atas-bawah), ganjil → kanan 90°.\n\nCatatan: jawaban lain yang menghasilkan jejak sama juga benar (mis. memakai dua ifelse atau pengulangan dengan syarat berbeda).',
    keyPoints: ['Satu seperempat lingkaran awal (turn L, 90 × (forward, turn L 1))', 'Setengah lingkaran bergantian R/L sebanyak x − 1', 'Penanganan akhir yang bergantung ganjil/genap (ifelse)', 'Menggeneralisasi dengan repeat yang dihitung dari x'],
    rubric: [
      { score: 4, desc: 'Urutan perintah menghasilkan pola S yang tepat untuk semua nilai x (termasuk perbedaan ganjil/genap)' },
      { score: 3.5, desc: 'Pola benar, ada kesalahan kecil (mis. jumlah ulangan off-by-one atau arah akhir salah pada sebagian x)' },
      { score: 3, desc: 'Benar untuk sebagian nilai x saja (mis. hanya x ganjil) atau perintah yang berulang ditulis berjajar' },
      { score: 2, desc: 'Hanya satu S (x = 1) atau sebagian lengkungan yang benar' },
      { score: 1, desc: 'Ada aspek yang benar, tetapi jejak secara umum salah' },
      { score: 0, desc: 'Tidak mengerjakan' },
    ],
    explanation: 'Pola dibangun dari seperempat lingkaran awal, (x − 1) setengah lingkaran bergantian, dan seperempat lingkaran penutup. Paritas x menentukan arah belokan terakhir, sehingga dipakai `ifelse`.',
    refs: [{ src: S21, page: 3 }, { src: S21, page: 4 }],
    en: { stem: 'Given x (integer ≥ 1), write the commands for the robot to draw a repeated S pattern as in the examples x = 1, 2 and 5.' },
  }],
})

const k21_5 = r`# Program NilaiRataRata
# Menghitung Nilai Rata-rata (NR) mahasiswa dalam satu semester dari banyaknya SKS bernilai A, B, C, D, E
# NR = (NA*4 + NB*3 + NC*2 + ND) / (NA + NB + NC + ND + NE)
# DECLARATIONS
# NA, NB, NC, ND, NE : int
# NR : float
# ALGORITHM
NA = int(input())
NB = int(input())
NC = int(input())
ND = int(input())
NE = int(input())
NR = (NA * 4 + NB * 3 + NC * 2 + ND) / (NA + NB + NC + ND + NE)
print(NR)`
const k21_5p = r`Program NilaiRataRata
{ Menghitung NR = (NA*4 + NB*3 + NC*2 + ND) / (NA + NB + NC + ND + NE) }
KAMUS
  NA, NB, NC, ND, NE : integer
  NR : real
ALGORITMA
  input(NA)
  input(NB)
  input(NC)
  input(ND)
  input(NE)
  NR ← (NA * 4 + NB * 3 + NC * 2 + ND) / (NA + NB + NC + ND + NE)
  output(NR)`

const k21_6 = r`# Program GolonganDarah
# Menentukan golongan darah anak dari alel ibu (Ix) dan alel ayah (Iy) pada sistem ABO
# DECLARATIONS
# ibu, ayah : str
# gol : str
# ALGORITHM
ibu = input()
ayah = input()
if (ibu == "IO" and ayah == "IO"):
    gol = "O"
elif ((ibu == "IA" and ayah == "IB") or (ibu == "IB" and ayah == "IA")):
    gol = "AB"
elif (ibu == "IB" or ayah == "IB"):
    gol = "B"
else:
    gol = "A"
print("Golongan darah anak = " + gol)`
const k21_6p = r`Program GolonganDarah
{ Golongan darah anak dari alel ibu dan ayah (sistem ABO) }
KAMUS
  ibu, ayah, gol : string
ALGORITMA
  input(ibu)
  input(ayah)
  if ibu = "IO" and ayah = "IO" then
    gol ← "O"
  else
    if (ibu = "IA" and ayah = "IB") or (ibu = "IB" and ayah = "IA") then
      gol ← "AB"
    else
      if ibu = "IB" or ayah = "IB" then
        gol ← "B"
      else
        gol ← "A"
  output("Golongan darah anak = " + gol)`

const k21_7 = r`# Program FungsiDeret
# Menghitung f(x) = (sum i=1..n dari a * x^i) + b. Asumsi: n > 0
# DECLARATIONS
# a, b, x, jumlah, f : float
# n, i : int
# ALGORITHM
a = float(input())
b = float(input())
x = float(input())
n = int(input())
jumlah = 0.0
for i in range(1, n + 1):
    jumlah = jumlah + a * x ** i
f = jumlah + b
print(f)`
const k21_7p = r`Program FungsiDeret
{ f(x) = (sum i=1..n a*x^i) + b }
KAMUS
  a, b, x, jumlah, f : real
  n, i : integer
ALGORITMA
  input(a)
  input(b)
  input(x)
  input(n)
  jumlah ← 0
  i traversal [1..n]
    jumlah ← jumlah + a * x ** i
  f ← jumlah + b
  output(f)`

problems.push({
  id: 'k21-s5', archetype: 'program', title: 'Soal 5 – Nilai Rata-rata semester', source: prov(S21, 'Soal 5', [4, 5], 2021),
  intro: 'Bagian C. Algoritma dan Pemrograman (30 menit). Untuk soal 5 s.d. 7: buatlah program dalam bahasa pemrograman sesuai dengan yang diajarkan di kelas. Bonus (hanya dinilai jika program dibuat): buatlah flowchart/pseudocode untuk persoalan tersebut (pilih salah satu).',
  en: { title: 'Q5 – Semester grade average' },
  parts: [{
    id: 'k21-s5a', kind: 'program', decks: ['D04'], topic: 'Formula with real division', patterns: ['sequence-io', 'type-conversion', 'average'], misconceptions: ['int-vs-float-div'],
    stem: 'Jika NA = banyaknya SKS mata kuliah yang mendapat nilai A, NB = banyaknya SKS mata kuliah yang mendapat nilai B, NC = ... nilai C, ND = ... nilai D, NE = ... nilai E, maka Nilai Rata-rata (NR) seorang mahasiswa dalam suatu semester dihitung sbb.\n\n$$NR = \\frac{NA \\cdot 4 + NB \\cdot 3 + NC \\cdot 2 + ND}{NA + NB + NC + ND + NE}$$\n\nBuatlah program yang menerima masukan NA, NB, NC, ND, dan NE (seluruhnya bertype integer) serta menampilkan NR ke layar. NR bertype float (jumlah angka di belakang koma bebas). (Urutan masukan: NA, NB, NC, ND, NE, satu per baris.)',
    reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: numJudge, rubric: progRubric,
    solution: { python: k21_5, pseudo: k21_5p },
    tests: [{ stdin: ['3', '2', '1', '0', '0'] }, { stdin: ['0', '0', '0', '0', '5'], edge: 'all grades E: NR = 0' }, { stdin: ['1', '0', '0', '0', '0'], edge: 'only one A' }, { stdin: ['2', '2', '2', '2', '2'] }, { stdin: ['5', '1', '0', '2', '1'] }],
    wrong: [
      { code: 'NA = int(input())\nNB = int(input())\nNC = int(input())\nND = int(input())\nNE = int(input())\nNR = NA * 4 + NB * 3 + NC * 2 + ND / NA + NB + NC + ND + NE\nprint(NR)', msg: 'Tanpa kurung, pembagian hanya mengenai `ND`, bukan seluruh pembilang/penyebut. Beri kurung pada pembilang dan penyebut.' },
      { code: 'NA = int(input())\nNB = int(input())\nNC = int(input())\nND = int(input())\nNE = int(input())\nNR = (NA * 4 + NB * 3 + NC * 2 + ND) // (NA + NB + NC + ND + NE)\nprint(NR)', msg: '`//` adalah pembagian bulat; NR harus float. Gunakan `/`.', tag: 'int-vs-float-div' },
    ],
    plan: 'baca NA..NE (int); NR ← (4·NA + 3·NB + 2·NC + ND) / (NA+NB+NC+ND+NE); tampilkan NR',
    skeleton: 'NA = ___(input())\n# ... NB, NC, ND, NE\nNR = (NA * ___ + NB * ___ + NC * ___ + ND) ___ (NA + NB + NC + ND + NE)\nprint(NR)',
    hints: ['Berapa kali `input()` diperlukan, dan bertipe apa?', 'Pembilang dan penyebut masing-masing perlu tanda kurung.', 'Agar hasil berupa bilangan riil, operator bagi mana yang dipakai?'],
    work: ['Baca kelima SKS dengan `int(input())`.', 'Hitung pembilang dalam kurung.', 'Bagi dengan jumlah semua SKS (kurung) memakai `/`.', 'Tampilkan NR.'],
    syntax: ['input', 'type-conversion', 'operators'],
    lineNotes: N(k21_5, [
      ['NA = int', 'Lima masukan integer, satu per baris; masing-masing `int(input())`.', 'input', 'NE = int'],
      ['NR = (NA * 4', 'Kurung di sekitar pembilang dan penyebut: tanpa kurung, `/` hanya membagi suku terakhir. `/` menghasilkan float.', 'operators'],
      ['print(NR)', 'Tampilkan NR (jumlah desimal bebas).'],
    ]),
    pseudoNotes: N(k21_5p, [
      ['input(NA)', 'Lima masukan berurutan.'],
      ['NR ←', 'Rumus lengkap dengan kurung pada pembilang dan penyebut.'],
    ]),
    explanation: 'NR = (NA*4 + NB*3 + NC*2 + ND) / (NA+NB+NC+ND+NE) dengan kurung yang tepat dan pembagian riil `/`. Asumsi: jumlah SKS > 0.',
    refs: [{ src: S21, page: 5 }],
  }],
})

problems.push({
  id: 'k21-s6', archetype: 'program', title: 'Soal 6 – Golongan darah sistem ABO', source: prov(S21, 'Soal 6', [5], 2021),
  en: { title: 'Q6 – ABO blood type' },
  parts: [{
    id: 'k21-s6a', kind: 'program', decks: ['D05'], topic: 'Branching from a combination table', patterns: ['if-elif', 'nested-if'], misconceptions: ['constraint-missed'],
    stem: 'Salah satu sistem yang biasa digunakan untuk menentukan golongan darah manusia adalah sistem ABO. Menurut sistem ABO, golongan darah manusia dikontrol oleh 3 macam alel, yaitu alel IA, IB, dan IO.\n\nSeseorang mewarisi satu alel dari ayah dan satu alel dari ibu dan kombinasi dari alel warisan dari ayah dan ibu menentukan golongan darahnya. Tabel berikut berisi kriteria pembentukan alel ganda pada anak berdasarkan alel yang diwarisi dari kedua orang tuanya dan golongan darah anak berdasarkan alel gandanya.\n\n| Orang Tua-1 | Orang Tua-2 | Alel ganda anak | Golongan darah |\n|---|---|---|---|\n| IA | IA | IAIA | A |\n| IA | IB | IAIB | AB |\n| IA | IO | IAIO | A |\n| IB | IB | IBIB | B |\n| IB | IO | IBIO | B |\n| IO | IO | IOIO | O |\n\nBuatlah program yang menerima masukan alel yang diwarisi dari ibu, misalnya Ix, dan alel yang diwarisi dari ayah, misalnya Iy, dan menuliskan ke layar golongan darah anak berdasarkan informasi di atas. Asumsikan masukan alel selalu benar seperti ketentuan di atas.\n\nContoh: (IA, IA) → A; (IO, IB) → B; (IB, IA) → AB; (IO, IO) → O. (Masukan: Ix lalu Iy, satu per baris.)',
    reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: bloodJudge, rubric: progRubric,
    solution: { python: k21_6, pseudo: k21_6p },
    tests: [{ stdin: ['IA', 'IA'] }, { stdin: ['IO', 'IB'] }, { stdin: ['IB', 'IA'], edge: 'AB (urutan terbalik)' }, { stdin: ['IO', 'IO'] }, { stdin: ['IA', 'IB'], edge: 'AB' }, { stdin: ['IA', 'IO'] }, { stdin: ['IO', 'IA'], edge: 'A (urutan terbalik)' }, { stdin: ['IB', 'IB'] }],
    wrong: [
      { code: 'ibu = input()\nayah = input()\nif (ibu == "IO" and ayah == "IO"):\n    print("O")\nelif (ibu == "IB" or ayah == "IB"):\n    print("B")\nelse:\n    print("A")', msg: 'Kombinasi IA + IB harus AB, tetapi cabang `B` memintasnya. Cek dulu kasus AB (IA dengan IB, dua urutan) sebelum kasus B.' },
      { code: 'ibu = input()\nayah = input()\nif (ibu == "IO" and ayah == "IO"):\n    print("O")\nelif (ibu == "IA" and ayah == "IB"):\n    print("AB")\nelif (ibu == "IB" or ayah == "IB"):\n    print("B")\nelse:\n    print("A")', msg: 'Kombinasi AB bisa muncul dalam dua urutan: (IA, IB) dan (IB, IA). Tangani keduanya.' },
    ],
    plan: 'baca ibu, ayah; jika keduanya IO → O; jika {IA, IB} (dua urutan) → AB; jika salah satunya IB → B; selain itu → A',
    skeleton: 'ibu = input()\nayah = input()\nif (ibu == "___" and ayah == "___"):\n    gol = "O"\nelif ((ibu == "IA" and ayah == "IB") ___ (ibu == "IB" and ayah == "IA")):\n    gol = "___"\nelif (ibu == "IB" ___ ayah == "IB"):\n    gol = "B"\nelse:\n    gol = "A"',
    hints: ['Ada 9 kombinasi berurutan dari tabel 6 baris. Kombinasi mana yang muncul dalam dua urutan?', 'Urutkan pengecekan: kasus paling spesifik (O, AB) dulu, baru yang umum.', 'Setelah O dan AB tersingkir, apa ciri golongan B? dan sisanya?'],
    work: ['Baca alel ibu dan ayah sebagai string.', 'Kasus (IO, IO) → O.', 'Kasus {IA, IB} (dua urutan) → AB.', 'Bila salah satu IB (AB sudah tersingkir) → B.', 'Sisanya (IA dengan IA atau IO) → A.', 'Cetak golongan darah.'],
    syntax: ['if-elif', 'relational-logical', 'input'],
    lineNotes: N(k21_6, [
      ['ibu = input()', 'Alel berupa string; tidak perlu konversi. Dua baris masukan: ibu lalu ayah.', 'input'],
      ['if (ibu == "IO"', 'Kasus O hanya (IO, IO).', 'if-elif'],
      ['elif ((ibu == "IA"', 'AB muncul dalam dua urutan: (IA, IB) dan (IB, IA). Dicek **sebelum** kasus B agar tidak tertelan.', 'relational-logical'],
      ['elif (ibu == "IB" or', 'Setelah AB tersingkir, kombinasi lain yang mengandung IB (IB-IB, IB-IO, IO-IB) adalah B.'],
      ['else:', 'Sisa: IA-IA, IA-IO, IO-IA, semuanya A.'],
      ['print("Golongan', 'Gabungan string dengan `+`; `gol` sudah string, tidak perlu `str()`.', 'print-str'],
    ]),
    pseudoNotes: N(k21_6p, [
      ['if ibu = "IO"', 'Kasus O.'],
      ['if (ibu = "IA"', 'Kasus AB (dua urutan) lebih dulu daripada B.'],
      ['output("Golongan', 'Hasil dicetak setelah rantai kasus selesai.'],
    ]),
    explanation: 'Urutkan pengecekan dari yang paling spesifik: O (IO, IO), AB (IA dan IB dalam dua urutan), lalu B (ada IB), dan sisanya A.',
    refs: [{ src: S21, page: 5 }],
  }],
})

problems.push({
  id: 'k21-s7', archetype: 'program', title: 'Soal 7 – Fungsi dengan penjumlahan (Σ)', source: prov(S21, 'Soal 7', [5], 2021),
  en: { title: 'Q7 – Function with a summation' },
  parts: [{
    id: 'k21-s7a', kind: 'program', decks: ['D05'], topic: 'Series/sigma with loops', patterns: ['for-count', 'accumulate-sum'], misconceptions: ['off-by-one', 'init-in-loop'],
    stem: 'Diketahui sebuah fungsi sebagai berikut:\n\n$$f(x) = \\sum_{i=1}^{n} a x^i + b$$\n\nBuatlah program digunakan untuk menuliskan ke layar hasil $f(x)$ berdasarkan masukan nilai $a$, $b$, dan $x$ (masing-masing bilangan riil) serta $n$ (bilangan bulat > 0) dari pengguna.\nPetunjuk: gunakan pengulangan.\n\n(Urutan masukan: a, b, x, n. Rumus dibaca sebagai $\\left(\\sum_{i=1}^{n} a x^i\\right) + b$.)',
    reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: numJudge, rubric: progRubric,
    solution: { python: k21_7, pseudo: k21_7p },
    tests: [{ stdin: ['2', '1', '3', '2'] }, { stdin: ['1.5', '-2', '0.5', '3'] }, { stdin: ['4', '0', '2', '1'], edge: 'n = 1' }, { stdin: ['3', '5', '0', '4'], edge: 'x = 0: f = b' }, { stdin: ['-1', '2.5', '-2', '5'] }],
    wrong: [
      { code: 'a = float(input())\nb = float(input())\nx = float(input())\nn = int(input())\njumlah = 0.0\nfor i in range(n):\n    jumlah = jumlah + a * x ** i\nprint(jumlah + b)', msg: '`range(n)` menghasilkan i = 0..n−1; yang diminta i = 1..n. Gunakan `range(1, n + 1)`.', tag: 'off-by-one' },
      { code: 'a = float(input())\nb = float(input())\nx = float(input())\nn = int(input())\njumlah = 0.0\nfor i in range(1, n + 1):\n    jumlah = jumlah + a * x * i\nprint(jumlah + b)', msg: '$x^i$ adalah pangkat (`x ** i`), bukan perkalian `x * i`.' },
    ],
    plan: 'baca a, b, x, n; jumlah ← 0; untuk i dari 1 sampai n: jumlah ← jumlah + a·x^i; f ← jumlah + b; tampilkan f',
    skeleton: 'a = float(input())\n# ... b, x, n\njumlah = ___\nfor i in range(___, ___):\n    jumlah = jumlah + a * x ___ i\nf = jumlah + ___\nprint(f)',
    hints: ['Apa pola untuk menjumlahkan suku-suku sebanyak n? Pengulangan dengan akumulator.', 'Variabel i berjalan 1..n: berapa batas atas `range`?', 'Di mana b ditambahkan: di dalam atau di luar sigma?'],
    work: ['Baca a, b, x sebagai float dan n sebagai int.', 'jumlah = 0 sebelum loop.', 'Loop i = 1..n: jumlah += a * x ** i.', 'f = jumlah + b.', 'Tampilkan f.'],
    syntax: ['for-range', 'operators', 'input'],
    lineNotes: N(k21_7, [
      ['a = float', 'a, b, x riil → `float`; n bulat → `int` (dipakai pada `range`).', 'input', 'n = int'],
      ['jumlah = 0.0', 'Akumulator dimulai 0 **sebelum** loop.'],
      ['for i in range(1, n + 1)', 'i = 1..n: batas atas `range` tidak ikut sehingga ditulis n + 1.', 'for-range'],
      ['jumlah = jumlah + a * x ** i', 'Tambahkan suku a·xⁱ; `**` adalah pangkat.', 'operators'],
      ['f = jumlah + b', 'b ditambahkan satu kali setelah loop (di luar Σ).'],
      ['print(f)', 'Tampilkan f(x).'],
    ]),
    pseudoNotes: N(k21_7p, [
      ['jumlah ← 0', 'Inisialisasi akumulator.'],
      ['i traversal [1..n]', 'Rentang inklusif 1..n.'],
      ['f ← jumlah + b', 'b di luar sigma.'],
    ]),
    explanation: 'Akumulasi a·x^i untuk i = 1..n di dalam loop, lalu tambahkan b sekali. Catatan: tata letak rumus pada lembar soal ambigu (b dalam atau di luar Σ); di sini dibaca b di luar Σ (Σ a·xⁱ, lalu + b). Bila b dimaksudkan di dalam Σ, tambahkan b di setiap iterasi (hasil bertambah n·b − b).',
    refs: [{ src: S21, page: 5 }],
  }],
})

/* ---- UTS 2021 Soal 8 ---- */

const k21_8a = r`# Program Faktorial
# Menghitung n! = 1*2*3*...*n untuk n >= 1
# DECLARATIONS
# n, i : int
# fakt : int
# ALGORITHM
n = int(input())
fakt = 1
for i in range(1, n + 1):
    fakt = fakt * i
print(fakt)`
const k21_8ap = r`Program Faktorial
{ Menghitung n! = 1*2*...*n, n >= 1 }
KAMUS
  n, i, fakt : integer
ALGORITMA
  input(n)
  fakt ← 1
  i traversal [1..n]
    fakt ← fakt * i
  output(fakt)`

const k21_8b = r`# Program PopulasiKotaA
# Memperkirakan populasi kota A pada tahun ke-1..x: P(t) = P0 * e^(k*t),
# dengan e dihampiri deret 1 + 1/1! + 1/2! + ... + 1/100!
# DECLARATIONS
# x, t, i, j : int
# P0, k, e, fakt, P : float
# ALGORITHM
x = int(input())
P0 = 1.2
k = 0.015
e = 1.0
for i in range(1, 101):
    fakt = 1
    for j in range(1, i + 1):
        fakt = fakt * j
    e = e + 1 / fakt
print("Perkiraan populasi penduduk kota A")
for t in range(1, x + 1):
    P = P0 * e ** (k * t)
    print("Tahun ke-" + str(t) + " : " + str(P) + " juta")`
const k21_8bp = r`Program PopulasiKotaA
{ P(t) = P0 * e^(k*t), e dihampiri deret sampai suku ke-100 }
KAMUS
  x, t, i, j : integer
  P0, k, e, fakt, P : real
ALGORITMA
  input(x)
  P0 ← 1.2
  k ← 0.015
  e ← 1
  i traversal [1..100]
    fakt ← 1
    j traversal [1..i]
      fakt ← fakt * j
    e ← e + 1 / fakt
  output("Perkiraan populasi penduduk kota A")
  t traversal [1..x]
    P ← P0 * e ** (k * t)
    output("Tahun ke-" + t + " : " + P + " juta")`

problems.push({
  id: 'k21-s8', archetype: 'program', title: 'Soal 8 – Bilangan Euler dan populasi kota A', source: prov(S21, 'Soal 8', [6], 2021),
  intro: 'Bagian D. Algoritma dan Pemrograman (20 menit). Bilangan Euler $e$ didefinisikan sebagai jumlah tak berhingga dari deret $e = 1 + \\frac{1}{1!} + \\frac{1}{2!} + \\frac{1}{3!} + \\frac{1}{4!} + \\cdots$. Bilangan tersebut dapat digunakan untuk memperkirakan populasi penduduk atau organisme di suatu tempat.\n\nPerkiraan populasi penduduk di suatu kota A pada tahun ke-$t$ dimodelkan dengan $P(t) = P_0 e^{kt}$ dengan $P_0 = 1.2$ (dalam juta) adalah jumlah penduduk pada tahun ke-0 dan $k = 0.015$ adalah konstanta pertumbuhan. Hampiran bilangan Euler $e$ didapatkan dengan menjumlahkan deret di atas sampai dengan suku ke-100, atau: $e = 1 + \\frac{1}{1!} + \\frac{1}{2!} + \\cdots + \\frac{1}{100!}$.',
  en: { title: 'Q8 – Euler\'s number and the population of city A' },
  parts: [
    {
      id: 'k21-s8a', kind: 'program', label: 'a', decks: ['D05'], topic: 'Factorial with loops (flowchart/pseudocode)', patterns: ['for-count', 'accumulate-sum'], misconceptions: ['off-by-one', 'init-in-loop'],
      stem: 'Perhitungan hampiran bilangan Euler membutuhkan perhitungan faktorial bilangan. Buatlah flowchart/pseudocode (pilih salah satu sesuai yang ditekankan di kelas) untuk melakukan perhitungan faktorial terhadap n atau n!. Nilai faktorial dihitung berdasarkan rumus: 1! = 1; n! = 1·2·3·…·n.\nAsumsikan: n ≥ 1 dan sudah diketahui nilainya (tidak perlu ditangani inputnya); Anda hanya perlu membuat proses perhitungan faktorial (tanpa penanganan input/output).\n\n(Pada latihan ini, n dibaca dari masukan dan hasilnya ditampilkan agar dapat diuji; pada ujian cukup prosesnya.)',
      reps: ['pseudo', 'flow', 'python'], match: 'lenient', rubric: progRubric,
      solution: {
        python: k21_8a, pseudo: k21_8ap,
        flow: { title: 'Faktorial', blocks: [
          { t: 'io', dir: 'in', text: 'input(n)' },
          { t: 'process', text: 'fakt ← 1' },
          { t: 'process', text: 'i ← 1' },
          { t: 'while', cond: 'i <= n', body: [{ t: 'process', text: 'fakt ← fakt * i' }, { t: 'process', text: 'i ← i + 1' }] },
          { t: 'io', dir: 'out', text: 'output(fakt)' },
        ] },
      },
      tests: [{ stdin: ['1'], edge: 'n = 1: 1! = 1' }, { stdin: ['5'] }, { stdin: ['10'] }, { stdin: ['3'] }],
      wrong: [
        { code: 'n = int(input())\nfakt = 1\nfor i in range(1, n):\n    fakt = fakt * i\nprint(fakt)', msg: '`range(1, n)` berhenti di n−1, sehingga n tidak ikut dikalikan. Gunakan `range(1, n + 1)`.', tag: 'off-by-one' },
        { code: 'n = int(input())\nfakt = 0\nfor i in range(1, n + 1):\n    fakt = fakt * i\nprint(fakt)', msg: 'Hasil kali harus diinisialisasi 1 (identitas perkalian), bukan 0, kalau tidak hasilnya selalu 0.' },
      ],
      plan: 'fakt ← 1; untuk i dari 1 sampai n: fakt ← fakt × i; hasil: fakt',
      skeleton: 'fakt = ___\nfor i in range(___, n + 1):\n    fakt = fakt ___ i\nprint(fakt)',
      hints: ['Akumulasi perkalian, bukan penjumlahan: dari nilai awal berapa?', 'i berjalan 1 sampai n (n ikut).'],
      work: ['Inisialisasi fakt = 1.', 'Ulangi i = 1..n.', 'Kalikan fakt dengan i pada setiap iterasi.', 'Hasil akhir fakt = n!.'],
      syntax: ['for-range', 'operators'],
      lineNotes: N(k21_8a, [
        ['n = int', 'Pada soal n sudah diketahui; di latihan ini dibaca agar bisa diuji.', 'input'],
        ['fakt = 1', 'Elemen identitas perkalian; kalau 0 hasilnya selalu 0.'],
        ['for i in range(1, n + 1)', 'i = 1..n (n ikut karena +1).', 'for-range'],
        ['fakt = fakt * i', 'Akumulasi perkalian.'],
        ['print(fakt)', 'Hasil n! (hanya untuk keperluan uji).'],
      ]),
      pseudoNotes: N(k21_8ap, [
        ['fakt ← 1', 'Inisialisasi 1.'],
        ['i traversal [1..n]', 'Rentang inklusif 1..n.'],
        ['fakt ← fakt * i', 'Akumulasi perkalian.'],
      ]),
      explanation: 'fakt ← 1; ulangi i = 1..n dengan fakt ← fakt × i. Pada flowchart: inisialisasi, kondisi i ≤ n, proses kali dan i ← i + 1, kembali ke kondisi.',
      refs: [{ src: S21, page: 6 }],
    },
    {
      id: 'k21-s8b', kind: 'program', label: 'b', decks: ['D05'], topic: 'Series with factorial and nested loops', patterns: ['nested-loop', 'accumulate-sum'], misconceptions: ['off-by-one', 'init-in-loop'],
      stem: 'Tuliskan program yang menerima masukan banyaknya tahun, misalnya x (bilangan bulat > 0) dan menuliskan ke layar perkiraan populasi penduduk kota A dari tahun ke-1 s.d. tahun ke-x (dalam juta) berdasarkan rumus di atas. Program ini harus mengandung perhitungan hampiran bilangan Euler dan juga perhitungan faktorial (yang sesuai dengan flowchart/pseudocode yang dituliskan pada butir a).\n\nFormat keluaran:\n```\nPerkiraan populasi penduduk kota A\nTahun ke-1 : … juta\nTahun ke-2 : … juta\n:\nTahun ke-x : … juta\n```\nCatatan: tidak boleh menggunakan array atau fungsi/prosedur.',
      reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: numJudge, rubric: progRubric,
      solution: { python: k21_8b, pseudo: k21_8bp },
      tests: [{ stdin: ['1'], edge: 'x = 1' }, { stdin: ['3'] }, { stdin: ['5'] }, { stdin: ['10'] }],
      wrong: [
        { code: 'x = int(input())\ne = 0.0\nfor i in range(1, 101):\n    fakt = 1\n    for j in range(1, i + 1):\n        fakt = fakt * j\n    e = e + 1 / fakt\nprint("Perkiraan populasi penduduk kota A")\nfor t in range(1, x + 1):\n    print("Tahun ke-" + str(t) + " : " + str(1.2 * e ** (0.015 * t)) + " juta")', msg: 'Deret dimulai dari suku 1 (sebelum 1/1!): e = 1 + 1/1! + …. Inisialisasi e = 1, bukan 0.' },
        { code: 'x = int(input())\ne = 1.0\nfor i in range(1, 101):\n    fakt = 1\n    for j in range(1, i + 1):\n        fakt = fakt * j\n    e = e + 1 / fakt\nprint("Perkiraan populasi penduduk kota A")\nfor t in range(1, x + 1):\n    print("Tahun ke-" + str(t) + " : " + str(1.2 * e * 0.015 * t) + " juta")', msg: 'Model populasinya eksponensial: P(t) = P0 · e^(k·t), bukan P0 · e · k · t. Gunakan `e ** (k * t)`.' },
        { code: 'x = int(input())\ne = 1.0\nfor i in range(1, 101):\n    fakt = 1\n    for j in range(1, i + 1):\n        fakt = fakt * j\n    e = e + 1 / fakt\nprint("Perkiraan populasi penduduk kota A")\nfor t in range(0, x):\n    print("Tahun ke-" + str(t) + " : " + str(1.2 * e ** (0.015 * t)) + " juta")', msg: 'Tahun harus 1..x, bukan 0..x−1. Gunakan `range(1, x + 1)`.', tag: 'off-by-one' },
      ],
      plan: 'baca x; e ← 1; untuk i = 1..100: hitung fakt = i! dengan loop dalam; e ← e + 1/fakt; lalu untuk t = 1..x: P ← P0 × e^(k·t) dan cetak',
      skeleton: 'e = ___\nfor i in range(1, ___):\n    fakt = ___\n    for j in range(1, ___):\n        fakt = fakt * j\n    e = e + ___ / fakt\nfor t in range(1, x + 1):\n    P = 1.2 * e ** (___ * t)\n    print("Tahun ke-" + str(t) + " : " + str(P) + " juta")',
      hints: ['Tanpa fungsi/array: faktorial dihitung dengan loop di dalam loop deret.', 'Hitung e sekali (di luar loop tahun), lalu pakai untuk semua tahun.', 'Suku terakhir deret adalah 1/100!, jadi i berjalan sampai 100.'],
      work: ['Baca x.', 'e = 1; untuk i = 1..100: fakt = 1; untuk j = 1..i: fakt *= j; e += 1/fakt.', 'Cetak judul.', 'Untuk t = 1..x: P = 1.2 * e ** (0.015 * t); cetak baris tahun ke-t.'],
      syntax: ['for-range', 'operators', 'print-str'],
      lineNotes: N(k21_8b, [
        ['x = int', 'Banyaknya tahun, bilangan bulat > 0.', 'input'],
        ['P0 = 1.2', 'Konstanta soal: populasi awal (juta) dan konstanta pertumbuhan.', undefined, 'k = 0.015'],
        ['e = 1.0', 'Suku pertama deret (1) dimasukkan sejak awal; suku 1/1! dan seterusnya ditambahkan di loop.'],
        ['for i in range(1, 101)', 'Suku ke-1 sampai ke-100: batas atas 101 karena tidak ikut.', 'for-range'],
        ['fakt = 1', 'Faktorial dihitung ulang untuk setiap i, jadi diinisialisasi **di dalam** loop luar (sebelum loop dalam).'],
        ['for j in range(1, i + 1)', 'Loop dalam: fakt = 1·2·…·i (sesuai butir a).', 'for-range', 'fakt = fakt * j'],
        ['e = e + 1 / fakt', 'Tambahkan suku 1/i!. `/` menghasilkan float (1 / bilangan besar tetap benar).'],
        ['print("Perkiraan', 'Judul dicetak sekali, sebelum loop tahun.'],
        ['for t in range(1, x + 1)', 'Tahun ke-1 sampai ke-x.', 'for-range'],
        ['P = P0', 'P(t) = P0 · e^(k·t): `**` pangkat dengan eksponen dalam kurung.', 'operators'],
        ['print("Tahun ke-"', '`str()` untuk t dan P karena digabung dengan `+`.', 'print-str'],
      ]),
      pseudoNotes: N(k21_8bp, [
        ['e ← 1', 'Suku awal deret.'],
        ['j traversal [1..i]', 'Loop dalam menghitung i!.'],
        ['e ← e + 1 / fakt', 'Tambah suku 1/i!.'],
        ['t traversal [1..x]', 'Tahun 1..x.'],
      ]),
      explanation: 'Hitung e sekali dengan loop bersarang (faktorial di loop dalam, tanpa fungsi/array), lalu cetak P0·e^(k·t) untuk t = 1..x. Catatan: format desimal bebas; keluaran dinilai berdasarkan angka.',
      refs: [{ src: S21, page: 6 }],
    },
  ],
})

/* ---------------------------------- Latihan Soal 2019 ---------------------------------- */

const kls1 = k18_2a
const kls1p = r`Program Hypotenuse
{ Menghitung sisi miring c = sqrt(a^2 + b^2), a > 0, b > 0 }
KAMUS
  a, b, c : real
ALGORITMA
  input(a)
  input(b)
  c ← (a ** 2 + b ** 2) ** 0.5
  output(c)`

const kls2 = r`# Program Kuadran
# Menentukan kuadran titik (x, y); bila di sumbu atau origin, kuadran tidak bisa dihitung
# DECLARATIONS
# x, y : int
# ALGORITHM
x = int(input())
y = int(input())
if (x > 0 and y > 0):
    print(1)
elif (x < 0 and y > 0):
    print(2)
elif (x < 0 and y < 0):
    print(3)
elif (x > 0 and y < 0):
    print(4)
else:
    print("Kuadran tidak bisa dihitung")`
const kls2p = r`Program Kuadran
{ Kuadran titik (x, y); di sumbu/origin: tidak bisa dihitung }
KAMUS
  x, y : integer
ALGORITMA
  input(x)
  input(y)
  if x > 0 and y > 0 then
    output(1)
  else
    if x < 0 and y > 0 then
      output(2)
    else
      if x < 0 and y < 0 then
        output(3)
      else
        if x > 0 and y < 0 then
          output(4)
        else
          output("Kuadran tidak bisa dihitung")`

const kls3 = r`# Program KonversiSuhu
# Mengonversi suhu Celcius TC ke Fahrenheit (F), Reamur (R), atau Kelvin (K) sesuai kode
# DECLARATIONS
# TC, hasil : float
# kode : str
# ALGORITHM
TC = float(input())
kode = input()
if (kode == "F"):
    hasil = 9 / 5 * TC + 32
elif (kode == "R"):
    hasil = 4 / 5 * TC
else:
    hasil = TC + 273
print(hasil)`
const kls3p = r`Program KonversiSuhu
{ Konversi TC ke Fahrenheit, Reamur, atau Kelvin menurut kode }
KAMUS
  TC, hasil : real
  kode : string
ALGORITMA
  input(TC)
  input(kode)
  if kode = "F" then
    hasil ← 9 / 5 * TC + 32
  else
    if kode = "R" then
      hasil ← 4 / 5 * TC
    else
      hasil ← TC + 273
  output(hasil)`

const kls4 = r`# Program UrutTigaBilangan
# Menuliskan tiga bilangan berbeda a, b, c dari yang terbesar ke yang terkecil (tanpa array)
# DECLARATIONS
# a, b, c : int
# ALGORITHM
a = int(input())
b = int(input())
c = int(input())
if (a > b):
    if (b > c):
        print(str(a) + " " + str(b) + " " + str(c))
    elif (a > c):
        print(str(a) + " " + str(c) + " " + str(b))
    else:
        print(str(c) + " " + str(a) + " " + str(b))
else:
    if (a > c):
        print(str(b) + " " + str(a) + " " + str(c))
    elif (b > c):
        print(str(b) + " " + str(c) + " " + str(a))
    else:
        print(str(c) + " " + str(b) + " " + str(a))`
const kls4p = r`Program UrutTigaBilangan
{ Menuliskan a, b, c (berbeda) dari terbesar ke terkecil, tanpa array }
KAMUS
  a, b, c : integer
ALGORITMA
  input(a)
  input(b)
  input(c)
  if a > b then
    if b > c then
      output(a, " ", b, " ", c)
    else
      if a > c then
        output(a, " ", c, " ", b)
      else
        output(c, " ", a, " ", b)
  else
    if a > c then
      output(b, " ", a, " ", c)
    else
      if b > c then
        output(b, " ", c, " ", a)
      else
        output(c, " ", b, " ", a)`

const kls5 = r`# Program HitungKelipatan
# Menghitung banyaknya bilangan kelipatan X pada rentang a s.d. b (a dan b ikut), a < b
# DECLARATIONS
# X, a, b, i, count : int
# ALGORITHM
X = int(input())
a = int(input())
b = int(input())
count = 0
for i in range(a, b + 1):
    if (i % X == 0):
        count = count + 1
print(count)`
const kls5p = r`Program HitungKelipatan
{ Banyaknya kelipatan X pada a s.d. b (inklusif) }
KAMUS
  X, a, b, i, count : integer
ALGORITMA
  input(X)
  input(a)
  input(b)
  count ← 0
  i traversal [a..b]
    if i mod X = 0 then
      count ← count + 1
  output(count)`

const kls6 = r`# Program SemuaPositif
# Memeriksa apakah semua elemen array TI (100 elemen) bernilai positif
# DECLARATIONS
# TI : array [0..99] of int
# i : int
# found : bool
# ALGORITHM
TI = [0 for i in range(100)]
for i in range(100):
    TI[i] = int(input())
found = False
i = 0
while (i < 100 and not found):
    if (TI[i] <= 0):
        found = True
    else:
        i = i + 1
if (found):
    print("Tidak semua elemen array positif")
else:
    print("Semua elemen array positif")`
const kls6p = r`Program SemuaPositif
{ Memeriksa apakah semua elemen TI[0..99] positif }
KAMUS
  TI : array [0..99] of integer
  i : integer
  found : boolean
ALGORITMA
  i traversal [0..99]
    input(TI[i])
  found ← false
  i ← 0
  while i < 100 and not found do
    if TI[i] <= 0 then
      found ← true
    else
      i ← i + 1
  if found then
    output("Tidak semua elemen array positif")
  else
    output("Semua elemen array positif")`

const kls7 = r`# Program MaksMinPilihan
# Menampilkan maksimum dan/atau minimum array TI (100 elemen) sesuai pilihan 0, 1, atau 2
# DECLARATIONS
# TI : array [0..99] of int
# i, pilihan, maks, mini : int
# ALGORITHM
TI = [0 for i in range(100)]
for i in range(100):
    TI[i] = int(input())
pilihan = int(input())
maks = TI[0]
mini = TI[0]
for i in range(1, 100):
    if (TI[i] > maks):
        maks = TI[i]
    if (TI[i] < mini):
        mini = TI[i]
if (pilihan == 0):
    print("Maksimum = " + str(maks))
    print("Minimum = " + str(mini))
elif (pilihan == 1):
    print("Maksimum = " + str(maks))
else:
    print("Minimum = " + str(mini))`
const kls7p = r`Program MaksMinPilihan
{ Maks/min array TI[0..99] sesuai pilihan 0, 1, 2 }
KAMUS
  TI : array [0..99] of integer
  i, pilihan, maks, mini : integer
ALGORITMA
  i traversal [0..99]
    input(TI[i])
  input(pilihan)
  maks ← TI[0]
  mini ← TI[0]
  i traversal [1..99]
    if TI[i] > maks then
      maks ← TI[i]
    if TI[i] < mini then
      mini ← TI[i]
  if pilihan = 0 then
    output("Maksimum = ", maks)
    output("Minimum = ", mini)
  else
    if pilihan = 1 then
      output("Maksimum = ", maks)
    else
      output("Minimum = ", mini)`

const kls8a = r`# Subprogram BacaArray
# Membaca 100 bilangan bulat dari masukan dan mengembalikannya sebagai array of integer
# DECLARATIONS
# T : array [0..99] of int
# i : int
def BacaArray():
    # Membaca 100 integer; mengembalikan array of integer berukuran 100
    T = [0 for i in range(100)]
    for i in range(100):
        T[i] = int(input())
    return T`

const kls8b = r`# Program ArraySama
# Memeriksa apakah array T1 dan T2 (masing-masing 100 elemen) sama: T1[i] = T2[i] untuk setiap i
# DECLARATIONS
# T1, T2 : array [0..99] of int
# i : int
# sama : bool
# ALGORITHM
def BacaArray():
    # Membaca 100 integer; mengembalikan array of integer berukuran 100
    T = [0 for i in range(100)]
    for i in range(100):
        T[i] = int(input())
    return T

T1 = BacaArray()
T2 = BacaArray()
sama = True
i = 0
while (i < 100 and sama):
    if (T1[i] != T2[i]):
        sama = False
    else:
        i = i + 1
if (sama):
    print("Array sama")
else:
    print("Array tidak sama")`
const kls8bp = r`Program ArraySama
{ Memeriksa apakah T1 dan T2 (100 elemen) sama }
KAMUS
  T1, T2 : array [0..99] of integer
  i : integer
  sama : boolean
ALGORITMA
  T1 ← BacaArray()
  T2 ← BacaArray()
  sama ← true
  i ← 0
  while i < 100 and sama do
    if T1[i] <> T2[i] then
      sama ← false
    else
      i ← i + 1
  if sama then
    output("Array sama")
  else
    output("Array tidak sama")

function BacaArray() → array [0..99] of integer
{ Membaca 100 integer; mengembalikan array of integer }
KAMUS LOKAL
  T : array [0..99] of integer
  i : integer
ALGORITMA
  i traversal [0..99]
    input(T[i])
  → T`

const kls9 = r`# Program MatriksSama
# Memeriksa apakah matriks M1 (NBrs1 x NKol1) dan M2 (NBrs2 x NKol2) sama
# DECLARATIONS
# NBrs1, NKol1, NBrs2, NKol2, i, j : int
# M1, M2 : matriks of int
# sama : bool
# ALGORITHM
NBrs1 = int(input())
NKol1 = int(input())
M1 = [[0 for j in range(NKol1)] for i in range(NBrs1)]
for i in range(NBrs1):
    for j in range(NKol1):
        M1[i][j] = int(input())
NBrs2 = int(input())
NKol2 = int(input())
M2 = [[0 for j in range(NKol2)] for i in range(NBrs2)]
for i in range(NBrs2):
    for j in range(NKol2):
        M2[i][j] = int(input())
sama = (NBrs1 == NBrs2 and NKol1 == NKol2)
i = 0
while (i < NBrs1 and sama):
    j = 0
    while (j < NKol1 and sama):
        if (M1[i][j] != M2[i][j]):
            sama = False
        j = j + 1
    i = i + 1
if (sama):
    print("Matriks sama")
else:
    print("Matriks tidak sama")`

const kls10 = r`# Program SegitigaAtas
# Memeriksa apakah matriks M (NBrs x NKol) adalah matriks segitiga atas:
# bujur sangkar, elemen di segitiga atas (termasuk diagonal) tidak nol, elemen di bawah diagonal nol
# DECLARATIONS
# NBrs, NKol, i, j : int
# M : matriks of int
# ok : bool
# ALGORITHM
NBrs = int(input())
NKol = int(input())
M = [[0 for j in range(NKol)] for i in range(NBrs)]
for i in range(NBrs):
    for j in range(NKol):
        M[i][j] = int(input())
ok = (NBrs == NKol)
i = 0
while (i < NBrs and ok):
    j = 0
    while (j < NKol and ok):
        if (i <= j and M[i][j] == 0):
            ok = False
        elif (i > j and M[i][j] != 0):
            ok = False
        j = j + 1
    i = i + 1
if (ok):
    print("Matriks segitiga atas")
else:
    print("Bukan matriks segitiga atas")`

const lsIntro = 'Latihan Soal KU1102 (2019). Untuk semua soal (jika memungkinkan), buatlah flowchart/pseudocode dan kode program dengan bahasa pemrograman yang diajarkan di kelas.'
const lsRef = (p: number) => [{ src: SLS, page: p }]
const posAll = nl(100, (i) => 1 + (i * 7) % 50)
const withAt = (arr: string[], idx: number, v: string): string[] => arr.map((x, i) => (i === idx ? v : x))
const arrA = nl(100, (i) => 10 + (i * 37) % 91)
const negArr = nl(100, (i) => -1 - (i * 11) % 80)
const t1 = nl(100, (i) => (i * 13) % 17)
const t2diff = withAt(t1, 99, '99')
const t2diff0 = withAt(t1, 0, '-5')
const t2mid = withAt(t1, 50, '1000')

const reps3: Rep[] = ['python', 'pseudo', 'flow']

problems.push({
  id: 'kls-s1', archetype: 'program', title: 'Soal 1 – Sisi miring segitiga siku-siku', source: prov(SLS, 'Soal 1', [3], 2019), intro: lsIntro,
  en: { title: 'Q1 – Hypotenuse of a right triangle' },
  parts: [{
    id: 'kls-s1a', kind: 'program', decks: ['D04'], topic: 'Pythagorean formula', patterns: ['sequence-io', 'type-conversion', 'operators'], misconceptions: ['input-is-str'],
    stem: 'Buatlah program untuk menghitung sisi miring sebuah segitiga siku-siku dengan rumus Pythagoras. Program membaca input 2 buah bilangan riil, misalnya $a$ (alas segitiga) dan $b$ (tinggi segitiga) dan menuliskan ke layar hasil perhitungan sisi miring $c$ yang dihitung dengan rumus $c = \\sqrt{a^2 + b^2}$. Asumsikan $a > 0$ dan $b > 0$.',
    reps: reps3, match: 'judge', judge: numJudge, rubric: progRubric,
    solution: { python: kls1, pseudo: kls1p },
    tests: [{ stdin: ['3', '4'] }, { stdin: ['1', '1'] }, { stdin: ['5.5', '2.5'] }, { stdin: ['0.5', '12'] }],
    wrong: [
      { code: 'a = float(input())\nb = float(input())\nprint(a ** 2 + b ** 2)', msg: 'Akar belum diambil: a² + b² adalah c², bukan c. Pangkatkan dengan 0.5.' },
      { code: 'a = float(input())\nb = float(input())\nprint(a ** 2 + b ** 2 ** 0.5)', msg: 'Prioritas operator: `b ** 2 ** 0.5` bukan akar dari jumlah. Beri kurung: `(a ** 2 + b ** 2) ** 0.5`.' },
    ],
    plan: 'baca a, b; c ← akar(a² + b²); tampilkan c',
    skeleton: 'a = ___(input())\nb = ___(input())\nc = (a ** 2 + b ** 2) ** ___\nprint(c)',
    hints: ['Tipe masukan untuk bilangan riil?', 'Akar kuadrat = pangkat 0.5; apa yang harus dalam kurung?'],
    work: ['Baca a dan b sebagai float.', 'Hitung jumlah kuadrat.', 'Akarkan dengan `** 0.5`.', 'Tampilkan c.'],
    syntax: ['input', 'operators'],
    lineNotes: N(kls1, [
      ['a = float', '`float(input())` untuk bilangan riil.', 'input'],
      ['c = (a', 'Kurung di sekitar jumlah kuadrat sebelum dipangkatkan 0.5 (akar).', 'operators'],
      ['print(c)', 'Tampilkan sisi miring.'],
    ]),
    pseudoNotes: N(kls1p, [['c ←', 'Rumus Pythagoras dengan `**` pangkat.']]),
    explanation: 'c = (a ** 2 + b ** 2) ** 0.5 dengan a dan b dibaca sebagai float.',
    refs: lsRef(3),
  }],
})

problems.push({
  id: 'kls-s2', archetype: 'program', title: 'Soal 2 – Kuadran sebuah titik', source: prov(SLS, 'Soal 2', [4], 2019), intro: lsIntro,
  en: { title: 'Q2 – Quadrant of a point' },
  parts: [{
    id: 'kls-s2a', kind: 'program', decks: ['D05'], topic: 'Multi-case branching', patterns: ['if-elif'], misconceptions: ['off-by-one'],
    stem: 'Buatlah program yang membaca sebuah point 2 dimensi yang terdiri atas pasangan nilai (x, y). x dan y bertype integer. Jika P tidak terletak di sumbu x atau sumbu y atau di titik origin (0,0), maka tuliskan ke layar kuadran di mana P terletak. Kuadran point (x, y) adalah sbb:\n- Jika x > 0 dan y > 0, maka kuadran = 1\n- Jika x < 0 dan y > 0, maka kuadran = 2\n- Jika x < 0 dan y < 0, maka kuadran = 3\n- Jika x > 0 dan y < 0, maka kuadran = 4\n\nJika P terletak di sumbu x, atau sumbu y, atau di titik origin, tuliskan “Kuadran tidak bisa dihitung”. (Masukan: x lalu y.)',
    reps: reps3, match: 'lenient', rubric: progRubric,
    solution: { python: kls2, pseudo: kls2p },
    tests: [{ stdin: ['3', '4'] }, { stdin: ['-3', '4'] }, { stdin: ['-3', '-4'] }, { stdin: ['3', '-4'] }, { stdin: ['0', '5'], edge: 'di sumbu y' }, { stdin: ['5', '0'], edge: 'di sumbu x' }, { stdin: ['0', '0'], edge: 'origin' }],
    wrong: [
      { code: 'x = int(input())\ny = int(input())\nif (x >= 0 and y >= 0):\n    print(1)\nelif (x < 0 and y >= 0):\n    print(2)\nelif (x < 0 and y < 0):\n    print(3)\nelif (x >= 0 and y < 0):\n    print(4)\nelse:\n    print("Kuadran tidak bisa dihitung")', msg: 'Titik di sumbu (x = 0 atau y = 0) tidak punya kuadran. Gunakan `>` / `<` murni, bukan `>=`.', tag: 'off-by-one' },
      { code: 'x = int(input())\ny = int(input())\nif (x > 0 and y > 0):\n    print(1)\nelif (x < 0 and y > 0):\n    print(2)\nelif (x < 0 and y < 0):\n    print(3)\nelse:\n    print(4)', msg: 'Kasus "di sumbu/origin" terlewat: `else` menganggap semua sisanya kuadran 4. Cek x > 0 dan y < 0 secara eksplisit dan letakkan pesan di `else`.' },
    ],
    plan: 'baca x, y; jika x>0 dan y>0 → 1; x<0 dan y>0 → 2; x<0 dan y<0 → 3; x>0 dan y<0 → 4; selain itu pesan tidak bisa dihitung',
    skeleton: 'x = int(input())\ny = int(input())\nif (x ___ 0 and y ___ 0):\n    print(1)\nelif (x < 0 and y ___ 0):\n    print(2)\n# ... kuadran 3 dan 4\nelse:\n    print("___")',
    hints: ['Ada 5 kasus saling lepas (4 kuadran + sisanya).', 'Kuadran memakai ketaksamaan murni (> atau <). Kasus mana yang ditangkap `else`?'],
    work: ['Baca x dan y sebagai int.', 'Cek empat kombinasi tanda yang eksplisit.', '`else`: titik di sumbu atau origin → pesan.'],
    syntax: ['if-elif', 'relational-logical'],
    lineNotes: N(kls2, [
      ['x = int', 'Koordinat bertipe integer.', 'input', 'y = int'],
      ['if (x > 0 and y > 0)', 'Kuadran 1. Ketaksamaan murni: 0 berada di sumbu, bukan di kuadran.', 'relational-logical'],
      ['elif (x < 0 and y > 0)', 'Tiap kuadran dicek eksplisit dengan dua syarat memakai `and`.', 'if-elif', 'print(4)'],
      ['else:', 'Sisa kasus: x = 0 atau y = 0 (sumbu/origin).'],
    ]),
    pseudoNotes: N(kls2p, [['if x > 0 and y > 0', 'Empat kasus kuadran bersarang pada cabang `else`.'], ['output("Kuadran', 'Kasus komplementer terakhir.']]),
    explanation: 'Empat pengecekan eksplisit dengan `>` dan `<`, dan `else` menampung titik di sumbu/origin.',
    refs: lsRef(4),
  }],
})

problems.push({
  id: 'kls-s3', archetype: 'program', title: 'Soal 3 – Konversi suhu', source: prov(SLS, 'Soal 3', [5], 2019), intro: lsIntro,
  en: { title: 'Q3 – Temperature conversion' },
  parts: [{
    id: 'kls-s3a', kind: 'program', decks: ['D05'], topic: 'Branching on code and formula', patterns: ['if-elif', 'type-conversion'], misconceptions: ['int-vs-float-div'],
    stem: 'Sebuah program menerima masukan suhu dalam derajat celcius, misalnya TC, dan sebuah kode konversi dalam huruf ‘F’, ‘R’, ‘K’ dan menuliskan ke layar konversi TC:\n- Jika kode konversi = ‘F’, maka TC dikonversi ke derajat fahrenheit dengan rumus = (9/5 * TC) + 32\n- Jika kode konversi = ‘R’, maka TC dikonversi ke derajat reamur dengan rumus = 4/5 * TC\n- Jika kode konversi = ‘K’, maka TC dikonversi ke derajat kelvin dengan rumus = TC + 273\n\nSemua masukan diasumsikan valid, sehingga tidak perlu diperiksa. (Masukan: TC lalu kode.)',
    reps: reps3, match: 'judge', judge: numJudge, rubric: progRubric,
    solution: { python: kls3, pseudo: kls3p },
    tests: [{ stdin: ['100', 'F'] }, { stdin: ['100', 'R'] }, { stdin: ['100', 'K'] }, { stdin: ['0', 'F'], edge: '0 °C' }, { stdin: ['-40', 'F'], edge: 'negative' }, { stdin: ['36.5', 'R'] }],
    wrong: [
      { code: 'TC = float(input())\nkode = input()\nif (kode == "F"):\n    print(9 // 5 * TC + 32)\nelif (kode == "R"):\n    print(4 / 5 * TC)\nelse:\n    print(TC + 273)', msg: '`9 // 5` adalah pembagian bulat (= 1), bukan 1,8. Gunakan `/`.', tag: 'int-vs-float-div' },
      { code: 'TC = float(input())\nkode = input()\nif (kode == "F"):\n    print(9 / 5 * TC + 32)\nelif (kode == "R"):\n    print(5 / 4 * TC)\nelse:\n    print(TC + 273)', msg: 'Rumus reamur adalah 4/5 × TC, bukan 5/4.' },
    ],
    plan: 'baca TC dan kode; jika F: 9/5·TC + 32; jika R: 4/5·TC; selain itu: TC + 273; tampilkan hasil',
    skeleton: 'TC = ___(input())\nkode = input()\nif (kode == "F"):\n    hasil = 9 / 5 * TC + ___\nelif (kode == "___"):\n    hasil = ___ / 5 * TC\nelse:\n    hasil = TC + ___\nprint(hasil)',
    hints: ['Ada tiga kasus berdasarkan kode: pakai rantai `if-elif`.', 'Pastikan 9/5 bukan pembagian bulat.'],
    work: ['Baca TC (float) dan kode (string).', 'F: 9/5 * TC + 32.', 'R: 4/5 * TC.', 'K (sisanya): TC + 273.', 'Tampilkan hasil.'],
    syntax: ['if-elif', 'input', 'operators'],
    lineNotes: N(kls3, [
      ['TC = float', 'Suhu riil → `float(input())`.', 'input'],
      ['kode = input()', 'Kode berupa string (huruf); tanpa konversi.'],
      ['if (kode == "F")', 'Pembanding string memakai `==`.', 'if-elif'],
      ['hasil = 9 / 5', '`/` menghasilkan 1.8 (riil), sedangkan `//` akan menghasilkan 1.', 'operators'],
      ['else:', 'Masukan valid, jadi sisanya pasti ‘K’.'],
    ]),
    pseudoNotes: N(kls3p, [['if kode = "F"', 'Tiga kasus berdasarkan kode.'], ['output(hasil)', 'Satu keluaran di akhir.']]),
    explanation: 'Tiga cabang berdasarkan kode: Fahrenheit, Reamur, Kelvin; pastikan pembagian riil.',
    refs: lsRef(5),
  }],
})

problems.push({
  id: 'kls-s4', archetype: 'program', title: 'Soal 4 – Mengurutkan tiga bilangan', source: prov(SLS, 'Soal 4', [6], 2019), intro: lsIntro,
  en: { title: 'Q4 – Sorting three numbers' },
  parts: [{
    id: 'kls-s4a', kind: 'program', decks: ['D05'], topic: 'Nested branching (ordering three numbers)', patterns: ['nested-if'], misconceptions: ['constraint-missed'],
    stem: 'Buatlah program yang menerima 3 buah integer, misalnya a, b, c, yang berbeda-beda dan menuliskan ke-3 integer terurut dari paling tinggi ke paling rendah.\n\nContoh input/output (dari slide; lihat catatan):\n\n| a | b | c | Keluaran |\n|---|---|---|---|\n| 3 | 4 | -1 | 3 2 -1 |\n| 4 | 10 | 11 | 11 10 4 |\n| 35 | -90 | 100 | -90 35 100 |\n\nCatatan: harus menggunakan kondisional saja (tidak diperkenankan menggunakan array).\n\n(Perhatian: contoh pada slide tampak keliru, mis. (3, 4, −1) seharusnya menghasilkan "4 3 -1", dan (35, −90, 100) menghasilkan "100 35 -90" bila urutan menurun. Latihan ini mengikuti teks soal: dari paling tinggi ke paling rendah. Masukan: a, b, c satu per baris.)',
    reps: reps3, match: 'lenient', rubric: progRubric,
    solution: { python: kls4, pseudo: kls4p },
    tests: [{ stdin: ['3', '4', '-1'] }, { stdin: ['4', '3', '-1'] }, { stdin: ['3', '-1', '4'] }, { stdin: ['-1', '3', '4'] }, { stdin: ['4', '-1', '3'] }, { stdin: ['-1', '4', '3'] }, { stdin: ['35', '-90', '100'] }],
    wrong: [
      { code: 'a = int(input())\nb = int(input())\nc = int(input())\nif (a < b):\n    if (b < c):\n        print(str(a) + " " + str(b) + " " + str(c))\n    elif (a < c):\n        print(str(a) + " " + str(c) + " " + str(b))\n    else:\n        print(str(c) + " " + str(a) + " " + str(b))\nelse:\n    if (a < c):\n        print(str(b) + " " + str(a) + " " + str(c))\n    elif (b < c):\n        print(str(b) + " " + str(c) + " " + str(a))\n    else:\n        print(str(c) + " " + str(b) + " " + str(a))', msg: 'Urutannya terbalik (menaik). Yang diminta dari paling tinggi ke paling rendah.' },
      { code: 'a = int(input())\nb = int(input())\nc = int(input())\nif (a > b):\n    if (b > c):\n        print(str(a) + " " + str(b) + " " + str(c))\n    else:\n        print(str(a) + " " + str(c) + " " + str(b))\nelse:\n    if (a > c):\n        print(str(b) + " " + str(a) + " " + str(c))\n    elif (b > c):\n        print(str(b) + " " + str(c) + " " + str(a))\n    else:\n        print(str(c) + " " + str(b) + " " + str(a))', msg: 'Pada cabang a > b dan b < c, c bisa lebih besar dari a, sehingga urutan "a c b" belum tentu benar. Bandingkan juga a dengan c.' },
    ],
    plan: 'bandingkan a dan b; di tiap cabang bandingkan dengan c untuk menentukan posisi c; cetak urutan menurun. 6 kemungkinan urutan = 6 daun pohon keputusan',
    skeleton: 'if (a > b):\n    if (b > c):\n        print(a, b, c)\n    elif (a ___ c):\n        print(a, c, b)\n    else:\n        print(___)\nelse:\n    # b > a: bandingkan a dengan c ...',
    hints: ['Tiga bilangan berbeda punya 6 urutan. Gambar pohon keputusan dengan dua level perbandingan.', 'Bandingkan dulu a dan b, lalu geser c ke posisi yang tepat.', 'Tidak boleh array/sort: hanya `if`.'],
    work: ['Jika a > b: cek b > c → a b c; selain itu cek a > c → a c b; selain itu c a b.', 'Jika a < b: cek a > c → b a c; selain itu cek b > c → b c a; selain itu c b a.', 'Cetak dengan spasi.'],
    syntax: ['if-elif', 'print-str'],
    lineNotes: N(kls4, [
      ['if (a > b)', 'Level 1: bandingkan dua bilangan pertama. Cabang `else` berarti b > a (semua berbeda).', 'if'],
      ['if (b > c)', 'Cabang a > b: bila b > c maka a > b > c.'],
      ['elif (a > c)', 'b < c: c bisa di antara atau paling atas; bandingkan a dengan c.'],
      ['print(str(c) + " " + str(a)', 'c paling besar: c a b.', 'print-str'],
      ['    if (a > c)', 'Cabang b > a: b pasti lebih besar dari a. Tinggal posisi c.', 'if'],
      ['print(str(c) + " " + str(b)', 'c terbesar, lalu b, lalu a.', 'print-str'],
    ]),
    pseudoNotes: N(kls4p, [['if a > b then', 'Dua level percabangan memberi enam daun (urutan).'], ['output(a, " "', 'Cetak tiga nilai dipisah spasi.']]),
    explanation: 'Pohon keputusan: bandingkan a dan b, lalu c terhadap keduanya; ada 6 daun untuk 6 urutan.',
    refs: lsRef(6),
  }],
})

problems.push({
  id: 'kls-s5', archetype: 'program', title: 'Soal 5 – Banyaknya kelipatan X antara a dan b', source: prov(SLS, 'Soal 5', [7], 2019), intro: lsIntro,
  en: { title: 'Q5 – Count the multiples of X between a and b' },
  parts: [{
    id: 'kls-s5a', kind: 'program', decks: ['D05'], topic: 'Loop and conditional counting', patterns: ['for-count', 'count-if'], misconceptions: ['off-by-one'],
    stem: 'Hitunglah ada berapa banyak bilangan kelipatan X antara a s.d. b. X, a, b adalah input dari pengguna. Asumsikan: X, a, b bertype integer positif; a < b.\n\nContoh:\n\n| X | a | b | Keluaran | Keterangan |\n|---|---|---|---|---|\n| 3 | 1 | 5 | 1 | {3} |\n| 2 | 3 | 15 | 5 | {4,6,8,10,12} |\n| 2 | 6 | 10 | 0 | {} |\n\n(Catatan: contoh baris 2 dan 3 pada slide tidak konsisten dengan "a s.d. b" (kelipatan 2 pada 3..15 adalah 4,6,…,14 = 6 bilangan; pada 6..10 ada 6, 8, 10). Latihan ini mengikuti teks "a s.d. b" dengan a dan b ikut dihitung. Masukan: X, a, b satu per baris.)',
    reps: reps3, match: 'lenient', rubric: progRubric,
    solution: { python: kls5, pseudo: kls5p },
    tests: [{ stdin: ['3', '1', '5'] }, { stdin: ['3', '3', '9'], edge: 'a and b themselves are multiples of X' }, { stdin: ['5', '6', '9'], edge: 'no multiples' }, { stdin: ['1', '1', '10'], edge: 'X = 1' }, { stdin: ['2', '3', '15'] }],
    wrong: [
      { code: 'X = int(input())\na = int(input())\nb = int(input())\ncount = 0\nfor i in range(a, b):\n    if (i % X == 0):\n        count = count + 1\nprint(count)', msg: '`range(a, b)` tidak menyertakan b. Gunakan `range(a, b + 1)` bila b ikut diperiksa.', tag: 'off-by-one' },
      { code: 'X = int(input())\na = int(input())\nb = int(input())\ncount = 0\nfor i in range(a, b + 1):\n    if (i % X == 1):\n        count = count + 1\nprint(count)', msg: 'Kelipatan X adalah bilangan dengan sisa bagi 0 (`i % X == 0`).' },
    ],
    plan: 'count ← 0; untuk i dari a sampai b: jika i habis dibagi X, count ← count + 1; tampilkan count',
    skeleton: 'count = ___\nfor i in range(___, b + 1):\n    if (i % ___ == ___):\n        count = ___\nprint(count)',
    hints: ['Pola: telusuri rentang a..b dan hitung yang memenuhi syarat.', 'Bagaimana memeriksa bahwa i kelipatan X dengan sisa bagi?', 'Apakah b ikut diperiksa? `range` tidak menyertakan batas atas.'],
    work: ['Baca X, a, b.', 'count = 0.', 'Untuk i = a..b: jika i % X == 0, count += 1.', 'Tampilkan count.'],
    syntax: ['for-range', 'operators', 'if'],
    lineNotes: N(kls5, [
      ['X = int', 'Tiga masukan integer.', 'input', 'b = int'],
      ['count = 0', 'Penghitung diinisialisasi sebelum loop.'],
      ['for i in range(a, b + 1)', 'i = a..b; +1 karena batas atas tidak ikut.', 'for-range'],
      ['if (i % X == 0)', 'i kelipatan X bila sisa baginya 0.', 'operators'],
      ['print(count)', 'Setelah loop.'],
    ]),
    pseudoNotes: N(kls5p, [['i traversal [a..b]', 'Rentang inklusif a..b.'], ['if i mod X = 0 then', '`mod` = sisa bagi.']]),
    explanation: 'Loop i dari a sampai b (inklusif), hitung yang `i % X == 0`.',
    refs: lsRef(7),
  }],
})

problems.push({
  id: 'kls-s6', archetype: 'program', title: 'Soal 6 – Apakah semua elemen array positif?', source: prov(SLS, 'Soal 6', [8], 2019), intro: lsIntro,
  en: { title: 'Q6 – Are all array elements positive?' },
  parts: [{
    id: 'kls-s6a', kind: 'program', decks: ['D06'], topic: 'Searching with a found flag', patterns: ['search-flag', 'array-populate'], misconceptions: ['off-by-one', 'index-range'],
    stem: 'Diketahui sebuah *array of integer* `TI` dengan elemen sebanyak 100 buah. Asumsikan bahwa sudah ada bagian program yang akan mengisi seluruh elemen TI dengan nilai-nilai integer (tidak perlu dibuat). Buatlah program yang memeriksa apakah seluruh elemen TI bernilai positif. Jika benar, tuliskan ke layar: “Semua elemen array positif”. Jika tidak, tuliskan ke layar “Tidak semua elemen array positif”.\n\nPetunjuk: ada beberapa cara: (1) menghitung berapa banyak yang positif dan bukan positif; (2) menggunakan algoritma *searching*.\n\n(Pada latihan ini TI diisi dengan membaca 100 bilangan dari masukan, satu per baris.)',
    reps: reps3, match: 'lenient', mustUse: ['array'], rubric: progRubric,
    solution: { python: kls6, pseudo: kls6p },
    tests: [{ stdin: posAll, edge: 'all positive' }, { stdin: withAt(posAll, 0, '-3'), edge: 'non-positive at the first element' }, { stdin: withAt(posAll, 99, '-1'), edge: 'non-positive at the last element' }, { stdin: withAt(posAll, 50, '0'), edge: '0 is not positive' }],
    wrong: [
      { code: 'TI = [0 for i in range(100)]\nfor i in range(100):\n    TI[i] = int(input())\nfound = False\ni = 0\nwhile (i < 100 and not found):\n    if (TI[i] < 0):\n        found = True\n    else:\n        i = i + 1\nif (found):\n    print("Tidak semua elemen array positif")\nelse:\n    print("Semua elemen array positif")', msg: '0 bukan bilangan positif. Elemen non-positif adalah yang ≤ 0, jadi gunakan `<= 0`.', tag: 'off-by-one' },
      { code: 'TI = [0 for i in range(100)]\nfor i in range(100):\n    TI[i] = int(input())\nif (TI[0] > 0):\n    print("Semua elemen array positif")\nelse:\n    print("Tidak semua elemen array positif")', msg: 'Hanya elemen pertama yang diperiksa. Telusuri seluruh elemen (searching) sampai ada yang tidak positif atau semua habis.' },
    ],
    plan: 'found ← false; i ← 0; selama i < 100 dan belum found: jika TI[i] ≤ 0 maka found ← true, selain itu i ← i + 1; jika found: "Tidak semua…", selain itu "Semua…"',
    skeleton: 'found = ___\ni = 0\nwhile (i < ___ and not ___):\n    if (TI[i] ___ 0):\n        found = ___\n    else:\n        i = ___\nif (found):\n    print("Tidak semua elemen array positif")\nelse:\n    print("Semua elemen array positif")',
    hints: ['Cari satu saja elemen yang **tidak** positif (pola searching dengan flag).', 'Berhenti begitu ketemu: kondisi loop memuat `not found`.', 'Hati-hati: nol tidak positif.'],
    work: ['Isi TI (100 elemen).', 'found = False; i = 0.', 'Loop selama i < 100 dan not found: bila TI[i] ≤ 0 → found = True; selain itu i += 1.', 'Cetak pesan sesuai found.'],
    syntax: ['while', 'list-index', 'if-else', 'relational-logical'],
    lineNotes: N(kls6, [
      ['TI = [0 for', 'Array 100 elemen, indeks 0..99.', 'list-init'],
      ['TI[i] = int(input())', 'Pengisian array (diasumsikan ada pada soal).', 'list-index'],
      ['found = False', 'Flag: belum ditemukan elemen non-positif.'],
      ['while (i < 100 and not found)', 'Berhenti saat semua diperiksa atau ketemu. Urutan `i < 100` dulu agar `TI[i]` tidak keluar indeks.', 'while'],
      ['if (TI[i] <= 0)', 'Non-positif = ≤ 0 (nol ikut). Ketemu → found = True.', 'relational-logical'],
      ['i = i + 1', 'Increment hanya di `else`: saat ketemu, loop berhenti dan i menunjuk elemen itu.'],
      ['if (found)', 'Setelah loop, hasil ditentukan oleh flag.', 'if-else'],
    ]),
    pseudoNotes: N(kls6p, [['found ← false', 'Inisialisasi flag.'], ['while i < 100 and not found do', 'Kondisi loop: masih ada elemen dan belum ketemu.'], ['i ← i + 1', 'Maju hanya bila belum ketemu.']]),
    explanation: 'Searching dengan flag `found` untuk elemen ≤ 0; semua positif bila tidak ditemukan.',
    refs: lsRef(8),
  }],
})

problems.push({
  id: 'kls-s7', archetype: 'program', title: 'Soal 7 – Maksimum dan/atau minimum array sesuai pilihan', source: prov(SLS, 'Soal 7', [9], 2019), intro: lsIntro,
  en: { title: 'Q7 – Maximum and/or minimum of an array by choice' },
  parts: [{
    id: 'kls-s7a', kind: 'program', decks: ['D06'], topic: 'Array max/min in one loop + choice', patterns: ['max-min', 'array-populate', 'if-elif'], misconceptions: ['max-init-zero'],
    stem: 'Diketahui sebuah *array of integer* `TI` dengan elemen sebanyak 100 buah. Asumsikan bahwa sudah ada bagian program yang akan mengisi seluruh elemen TI dengan nilai-nilai integer (tidak perlu dibuat). Buatlah program yang menerima masukan sebuah pilihan angka 0, 1, atau 2 dari pengguna (asumsikan pilihan selalu benar).\n- Pilihan 0: tuliskan nilai maksimum dan minimum dari elemen array\n- Pilihan 1: tuliskan nilai maksimum saja\n- Pilihan 2: tuliskan nilai minimum saja\n\nPetunjuk: pencarian nilai maksimum dan minimum harus dilakukan dalam 1 buah loop.\n\n(Pada latihan ini TI diisi dengan 100 bilangan dari masukan, lalu pilihan dibaca.)',
    reps: reps3, match: 'numbers', mustUse: ['array'], rubric: progRubric,
    solution: { python: kls7, pseudo: kls7p },
    tests: [{ stdin: [...arrA, '0'] }, { stdin: [...arrA, '1'] }, { stdin: [...arrA, '2'] }, { stdin: [...negArr, '1'], edge: 'all negative' }, { stdin: [...negArr, '2'], edge: 'all negative, minimum' }, { stdin: [...nl(100, () => 7), '0'], edge: 'all equal' }],
    wrong: [
      { code: 'TI = [0 for i in range(100)]\nfor i in range(100):\n    TI[i] = int(input())\npilihan = int(input())\nmaks = 0\nmini = 1000\nfor i in range(100):\n    if (TI[i] > maks):\n        maks = TI[i]\n    if (TI[i] < mini):\n        mini = TI[i]\nif (pilihan == 0):\n    print("Maksimum = " + str(maks))\n    print("Minimum = " + str(mini))\nelif (pilihan == 1):\n    print("Maksimum = " + str(maks))\nelse:\n    print("Minimum = " + str(mini))', msg: 'Nilai awal `maks = 0` (dan `mini = 1000`) salah bila semua elemen negatif. Mulai dari `TI[0]`.', tag: 'max-init-zero' },
      { code: 'TI = [0 for i in range(100)]\nfor i in range(100):\n    TI[i] = int(input())\npilihan = int(input())\nmaks = TI[0]\nmini = TI[0]\nfor i in range(1, 100):\n    if (TI[i] > maks):\n        maks = TI[i]\n    if (TI[i] < mini):\n        mini = TI[i]\nprint("Maksimum = " + str(maks))\nprint("Minimum = " + str(mini))', msg: 'Pilihan belum dipakai: pilihan 1 hanya maksimum dan pilihan 2 hanya minimum.' },
    ],
    plan: 'isi TI; baca pilihan; maks ← mini ← TI[0]; satu loop i = 1..99 memperbarui maks dan mini; tampilkan sesuai pilihan (0: keduanya, 1: maks, 2: min)',
    skeleton: 'maks = TI[___]\nmini = TI[___]\nfor i in range(___, 100):\n    if (TI[i] > maks):\n        maks = ___\n    if (TI[i] ___ mini):\n        mini = TI[i]\nif (pilihan == 0):\n    # keduanya\nelif (pilihan == ___):\n    # hanya maks',
    hints: ['Inisialisasi maks dan mini dari mana, agar benar untuk data negatif?', 'Satu loop cukup: dua `if` terpisah (bukan `elif`) di dalamnya.', 'Pilihan diperiksa setelah loop.'],
    work: ['Isi TI, baca pilihan.', 'maks = mini = TI[0].', 'Loop i = 1..99: perbarui maks dan mini.', 'Cetak sesuai pilihan.'],
    syntax: ['list-index', 'for-range', 'if-elif'],
    lineNotes: N(kls7, [
      ['TI[i] = int(input())', 'Isi array 100 elemen.', 'list-index'],
      ['pilihan = int(input())', 'Pilihan 0/1/2 dibaca setelah array.', 'input'],
      ['maks = TI[0]', '`TI[0]`, bukan 0: tidak gagal bila semua negatif.'],
      ['for i in range(1, 100)', 'Satu loop untuk maks dan mini sekaligus (syarat soal). Mulai 1 karena TI[0] sudah jadi nilai awal.', 'for-range'],
      ['if (TI[i] > maks)', 'Dua `if` terpisah (bukan `elif`): satu elemen bisa saja memperbarui keduanya pada iterasi awal.', 'if', 'mini = TI[i]'],
      ['if (pilihan == 0)', 'Cabang pilihan: 0 keduanya, 1 maksimum, selain itu (2) minimum.', 'if-elif'],
    ]),
    pseudoNotes: N(kls7p, [['maks ← TI[0]', 'Nilai awal dari elemen pertama.'], ['i traversal [1..99]', 'Indeks 1..99 inklusif; satu loop untuk keduanya.'], ['if pilihan = 0 then', 'Cabang pilihan setelah loop.']]),
    explanation: 'Satu loop yang memperbarui maks dan mini dari `TI[0]`, lalu cetak sesuai pilihan.',
    refs: lsRef(9),
  }],
})

problems.push({
  id: 'kls-s8', archetype: 'program', title: 'Soal 8 – Membandingkan dua array dengan subprogram', source: prov(SLS, 'Soal 8a, 8b', [10, 11], 2019), intro: lsIntro,
  en: { title: 'Q8 – Compare two arrays with a subprogram' },
  parts: [
    {
      id: 'kls-s8a', kind: 'open', label: 'a', decks: ['D10', 'D06'], topic: 'Subprogram BacaArray',
      stem: 'Diketahui sebuah *array of integer* `T1` dan `T2` dengan masing-masing elemen sebanyak 100 buah. Akan dilakukan pemeriksaan apakah T1 dan T2 adalah array yang sama atau tidak (lihat soal 8b). Pada program tersebut, buatlah sebuah prosedur/fungsi `BacaArray` yang digunakan untuk mengisi *array of integer* dengan elemen sebanyak 100 buah dengan masukan dari pengguna dan menyimpan hasil pembacaan di suatu *array of integer*.',
      answer: kls8a + '\n\nCatatan: bisa juga berupa prosedur yang menerima array sebagai parameter (`def BacaArray(T): for i in range(100): T[i] = int(input())`) karena list dimodifikasi di tempat. Versi fungsi (mengembalikan array) lebih disarankan.',
      keyPoints: ['Subprogram didefinisikan dengan def dan diberi nama BacaArray', 'Array lokal 100 elemen dibuat di dalam fungsi', 'Loop 100 kali memakai int(input())', 'Fungsi mengembalikan array (return T)'],
      rubric: progRubric, difficulty: 2,
      explanation: 'Fungsi tanpa parameter yang membuat array 100 elemen, mengisinya lewat `int(input())`, dan mengembalikannya. Dipakai di 8b.',
      refs: lsRef(10),
      en: { stem: "Given an *array of integer* `T1` and `T2`, each with 100 elements. A check will be made of whether T1 and T2 are the same array or not (see question 8b). In that program, write a procedure/function `BacaArray` that is used to fill an *array of integer* with 100 elements from the user's input and to store the result of the reading in an *array of integer*." },
    },
    {
      id: 'kls-s8b', kind: 'program', label: 'b', decks: ['D10', 'D06'], topic: 'Are two arrays equal? with a subprogram', patterns: ['function-def-call', 'array-compare', 'search-flag'], misconceptions: ['scope-local', 'return-vs-print'],
      stem: 'Dari soal 8a, buatlah program utama yang:\n- Menerima masukan array T1 dan T2 dengan memanggil prosedur/fungsi `BacaArray`.\n- Memeriksa apakah T1 dan T2 adalah array yang sama. Kedua array disebut sama jika $\\forall i$, T1[i] = T2[i].\n- Jika kedua array sama, tuliskan pesan “Array sama”. Jika tidak, tuliskan pesan “Array tidak sama”.\n\nCara untuk menentukan elemen yang sama: (1) menghitung berapa banyak elemen kedua array yang sama; (2) menggunakan algoritma *searching*.\n\n(Masukan: 100 bilangan untuk T1, lalu 100 bilangan untuk T2.)',
      reps: reps3, match: 'lenient', mustUse: ['subprogram', 'array'], rubric: progRubric,
      solution: { python: kls8b, pseudo: kls8bp },
      tests: [{ stdin: [...t1, ...t1], edge: 'equal' }, { stdin: [...t1, ...t2diff0], edge: 'beda di elemen pertama' }, { stdin: [...t1, ...t2diff], edge: 'beda di elemen terakhir' }, { stdin: [...t1, ...t2mid], edge: 'beda di tengah' }],
      wrong: [
        { code: 'def BacaArray():\n    T = [0 for i in range(100)]\n    for i in range(100):\n        T[i] = int(input())\n    return T\n\nT1 = BacaArray()\nT2 = BacaArray()\nif (T1[0] == T2[0]):\n    print("Array sama")\nelse:\n    print("Array tidak sama")', msg: 'Hanya elemen pertama yang dibandingkan. Dua array sama bila **semua** pasangan elemen sama (searching: cari satu pasangan yang berbeda).' },
        { code: 'def BacaArray():\n    T = [0 for i in range(100)]\n    for i in range(100):\n        T[i] = int(input())\n    return T\n\nT1 = BacaArray()\nT2 = BacaArray()\nsama = False\nfor i in range(100):\n    if (T1[i] == T2[i]):\n        sama = True\nif (sama):\n    print("Array sama")\nelse:\n    print("Array tidak sama")', msg: 'Logikanya terbalik: cukup satu pasangan sama membuat flag True. Yang dicari adalah pasangan yang **berbeda**; semua sama berarti tidak ada yang berbeda.' },
      ],
      plan: 'fungsi BacaArray: buat array 100, isi dari input, return; utama: T1 ← BacaArray(); T2 ← BacaArray(); sama ← true; telusuri i: bila T1[i] ≠ T2[i] maka sama ← false; cetak sesuai sama',
      skeleton: 'def BacaArray():\n    T = [0 for i in range(100)]\n    for i in range(100):\n        T[i] = int(input())\n    return ___\n\nT1 = ___()\nT2 = ___()\nsama = ___\ni = 0\nwhile (i < 100 and ___):\n    if (T1[i] ___ T2[i]):\n        sama = False\n    else:\n        i = i + 1',
      hints: ['Gunakan kembali `BacaArray` dua kali: bagaimana fungsi menyerahkan array ke pemanggilnya?', 'Pola searching: cari **pasangan yang berbeda**; kalau tidak ada, array sama.', 'Berhenti segera setelah ketemu pasangan yang berbeda (flag dalam kondisi loop).'],
      work: ['Definisikan `BacaArray()` (dari 8a).', 'T1 = BacaArray(); T2 = BacaArray().', 'sama = True; i = 0.', 'Loop: bila T1[i] != T2[i] → sama = False; selain itu i += 1.', 'Cetak "Array sama" atau "Array tidak sama".'],
      syntax: ['def-function', 'return', 'call', 'while', 'list-index'],
      lineNotes: N(kls8b, [
        ['def BacaArray', 'Subprogram (fungsi): didefinisikan sebelum dipakai; dua kali dipanggil di program utama.', 'def-function'],
        ['T = [0 for', 'Array lokal 100 elemen dalam fungsi.', 'list-init'],
        ['return T', 'Fungsi mengembalikan array (return, bukan print) agar dipakai oleh pemanggil.', 'return'],
        ['T1 = BacaArray()', 'Pemanggilan fungsi; hasilnya disimpan ke T1 (dan T2 pada baris berikut).', 'call'],
        ['sama = True', 'Flag: diasumsikan sama sampai ditemukan pasangan berbeda.'],
        ['while (i < 100 and sama)', 'Berhenti saat semua diperiksa atau pasangan berbeda ditemukan.', 'while'],
        ['if (T1[i] != T2[i])', 'Pasangan berbeda ditemukan → sama = False (loop berhenti).'],
        ['i = i + 1', 'Increment hanya di `else`: lanjut ke pasangan berikutnya bila masih sama.'],
        ['if (sama)', 'Hasil akhir dari flag.', 'if-else'],
      ]),
      pseudoNotes: N(kls8bp, [['function BacaArray', 'Definisi subprogram setelah program utama: spesifikasi dalam { }, variabel lokal di KAMUS LOKAL, hasil dikembalikan dengan →.'], ['T1 ← BacaArray()', 'Panggil fungsi, simpan hasilnya.'], ['while i < 100 and sama do', 'Searching pasangan berbeda.']]),
      explanation: 'Panggil `BacaArray()` dua kali, lalu cari pasangan elemen yang berbeda dengan flag; tidak ketemu → "Array sama".',
      refs: lsRef(11),
    },
  ],
})

problems.push({
  id: 'kls-s9', archetype: 'program', title: 'Soal 9 – Dua matriks sama?', source: prov(SLS, 'Soal 9', [12], 2019, true), intro: lsIntro + ' (Matriks: di luar silabus WI1102.)',
  en: { title: 'Q9 – Are two matrices equal?' },
  parts: [{
    id: 'kls-s9a', kind: 'program', decks: ['D06'], topic: 'Matrix: equality of two matrices', patterns: ['array-compare', 'nested-loop', 'search-flag'], misconceptions: ['index-range'],
    stem: 'Buatlah program yang menerima masukan 2 buah matriks *of integer*, misalnya M1 (nilai efektif NBrs1 dan NKol1) dan M2 (nilai efektif NBrs2 dan NKol2). Asumsikan bagian program untuk mengisi kedua matriks sudah dibuat. Tentukan apakah kedua matriks adalah matriks yang sama atau tidak dan tuliskan hasilnya ke layar (format bebas). Matriks yang sama adalah matriks yang ukuran baris dan kolom efektifnya sama dan isi setiap elemen sama, yaitu: M1[i][j] = M2[i][j].\n\n(Pada latihan ini matriks dibaca dari masukan: NBrs, NKol, lalu elemen per baris, berurutan untuk M1 lalu M2.)',
    reps: ['python'], match: 'judge', judge: negJudge, rubric: progRubric,
    solution: { python: kls9 },
    tests: [{ stdin: [...mat([[1, 2], [3, 4]]), ...mat([[1, 2], [3, 4]])] }, { stdin: [...mat([[1, 2, 3], [4, 5, 6]]), ...mat([[1, 4], [2, 5], [3, 6]])], edge: 'ukuran berbeda' }, { stdin: [...mat([[1, 2], [3, 4]]), ...mat([[1, 2], [3, 5]])], edge: 'beda di elemen terakhir' }, { stdin: [...mat([[7]]), ...mat([[7]])], edge: '1×1 equal' }],
    wrong: [
      { code: 'NBrs1 = int(input())\nNKol1 = int(input())\nM1 = [[0 for j in range(NKol1)] for i in range(NBrs1)]\nfor i in range(NBrs1):\n    for j in range(NKol1):\n        M1[i][j] = int(input())\nNBrs2 = int(input())\nNKol2 = int(input())\nM2 = [[0 for j in range(NKol2)] for i in range(NBrs2)]\nfor i in range(NBrs2):\n    for j in range(NKol2):\n        M2[i][j] = int(input())\nif (NBrs1 == NBrs2 and NKol1 == NKol2):\n    print("Matriks sama")\nelse:\n    print("Matriks tidak sama")', msg: 'Ukuran sama belum cukup: isi setiap elemen juga harus sama (M1[i][j] = M2[i][j]).' },
      { code: 'NBrs1 = int(input())\nNKol1 = int(input())\nM1 = [[0 for j in range(NKol1)] for i in range(NBrs1)]\nfor i in range(NBrs1):\n    for j in range(NKol1):\n        M1[i][j] = int(input())\nNBrs2 = int(input())\nNKol2 = int(input())\nM2 = [[0 for j in range(NKol2)] for i in range(NBrs2)]\nfor i in range(NBrs2):\n    for j in range(NKol2):\n        M2[i][j] = int(input())\nif (M1[0][0] == M2[0][0]):\n    print("Matriks sama")\nelse:\n    print("Matriks tidak sama")', msg: 'Hanya elemen pertama yang dibandingkan, dan ukuran tidak diperiksa. Periksa ukuran lalu seluruh elemen.' },
    ],
    plan: 'sama ← (ukuran baris dan kolom sama); bila sama telusuri semua i, j: bila M1[i][j] ≠ M2[i][j] maka sama ← false; cetak hasil',
    skeleton: 'sama = (NBrs1 ___ NBrs2 and NKol1 ___ NKol2)\ni = 0\nwhile (i < NBrs1 and ___):\n    j = 0\n    while (j < NKol1 and ___):\n        if (M1[i][j] ___ M2[i][j]):\n            sama = ___\n        j = j + 1\n    i = i + 1',
    hints: ['Dua syarat: ukuran sama, lalu isi sama. Mana yang diperiksa lebih dulu, dan mengapa?', 'Telusuri matriks dengan dua loop bersarang; cari pasangan elemen yang berbeda.', 'Jangan mengakses M2[i][j] bila ukuran berbeda.'],
    work: ['Baca kedua matriks.', 'sama = ukuran identik.', 'Bila sama: loop baris dan kolom, tandai False bila ada elemen berbeda.', 'Cetak hasil.'],
    syntax: ['while', 'list-index'],
    lineNotes: N(kls9, [
      ['M1 = [[0 for j', 'Matriks sebagai list of list: NBrs1 baris × NKol1 kolom.', 'list-init'],
      ['sama = (NBrs1 == NBrs2', 'Ukuran diperiksa lebih dulu: bila berbeda, `sama` False dan loop tidak mengakses M2 di luar batas.'],
      ['while (i < NBrs1 and sama)', 'Loop baris berhenti begitu ketemu perbedaan.', 'while'],
      ['while (j < NKol1 and sama)', 'Loop kolom bersarang di dalam loop baris; `j = 0` diulang tiap baris.', 'while'],
      ['if (M1[i][j] != M2[i][j])', 'Pasangan elemen berbeda → matriks tidak sama.', 'list-index'],
      ['print("Matriks tidak sama")', 'Format keluaran bebas.'],
    ]),
    explanation: 'Ukuran harus sama dan semua elemen sama; gunakan flag dan dua loop bersarang yang berhenti saat ada perbedaan. (Matriks: di luar silabus WI1102.)',
    refs: lsRef(12),
  }],
})

const sq = (n: number, f: (i: number, j: number) => number): number[][] => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => f(i, j)))
problems.push({
  id: 'kls-s10', archetype: 'program', title: 'Soal 10 – Matriks segitiga atas', source: prov(SLS, 'Soal 10', [13, 14], 2019, true), intro: lsIntro + ' (Matriks: di luar silabus WI1102.)',
  en: { title: 'Q10 – Upper triangular matrix' },
  parts: [{
    id: 'kls-s10a', kind: 'program', decks: ['D06'], topic: 'Upper triangular matrix', patterns: ['array-compare', 'nested-loop', 'search-flag'], misconceptions: ['index-range', 'constraint-missed'],
    stem: 'Buatlah program yang menerima masukan sebuah matriks *of integer* `M` dengan nilai efektif baris `NBrs` dan nilai efektif kolom `NKol`. Asumsikan bagian program untuk mengisi matriks sudah dibuat. Tentukan apakah matriks tersebut adalah matriks segitiga atas atau bukan.\n\nMatriks segitiga atas adalah matriks bujur sangkar (NBrs = NKol) dan memiliki nilai ≠ 0 pada semua elemen di bagian segitiga atas matriks. Contoh:\n\n- Contoh-1 (segitiga atas, NBrs = NKol = 4): `[1 2 3 4; 0 5 6 7; 0 0 8 9; 0 0 0 10]`\n- Contoh-2 (bukan; ada yang bukan 0 di bawah): `[5 0 0 0; 4 5 0 0; 3 4 5 0; 2 3 4 5]`\n- Contoh-3 (bukan; NBrs ≠ NKol): matriks 4 baris × 5 kolom `[1 2 3 4 5; 0 6 7 8 9; 0 0 10 11 12; 0 0 0 13 14]`\n- Contoh-4 (bukan; isi tidak tepat): `[1 2 3 0; 0 5 4 7; 0 0 8 9; 0 0 0 10]`\n\n(Dari contoh: elemen di atas dan pada diagonal harus ≠ 0, elemen di bawah diagonal harus 0. Pada latihan ini matriks dibaca dari masukan: NBrs, NKol, lalu elemen per baris.)',
    figures: [{ src: SLS, page: 14 }],
    reps: ['python'], match: 'judge', judge: negJudge, rubric: progRubric,
    solution: { python: kls10 },
    tests: [
      { stdin: mat([[1, 2, 3, 4], [0, 5, 6, 7], [0, 0, 8, 9], [0, 0, 0, 10]]) },
      { stdin: mat([[5, 0, 0, 0], [4, 5, 0, 0], [3, 4, 5, 0], [2, 3, 4, 5]]), edge: 'segitiga bawah' },
      { stdin: mat([[1, 2, 3, 4, 5], [0, 6, 7, 8, 9], [0, 0, 10, 11, 12], [0, 0, 0, 13, 14]]), edge: 'bukan bujur sangkar' },
      { stdin: mat([[1, 2, 3, 0], [0, 5, 4, 7], [0, 0, 8, 9], [0, 0, 0, 10]]), edge: 'ada 0 pada segitiga atas' },
      { stdin: mat([[5]]), edge: '1×1 non-zero' },
      { stdin: mat(sq(3, (i, j) => (i <= j ? i + j + 1 : 0))) },
    ],
    wrong: [
      { code: 'NBrs = int(input())\nNKol = int(input())\nM = [[0 for j in range(NKol)] for i in range(NBrs)]\nfor i in range(NBrs):\n    for j in range(NKol):\n        M[i][j] = int(input())\nok = True\nfor i in range(NBrs):\n    for j in range(NKol):\n        if (i > j and M[i][j] != 0):\n            ok = False\nif (ok):\n    print("Matriks segitiga atas")\nelse:\n    print("Bukan matriks segitiga atas")', msg: 'Yang diperiksa baru bagian bawah. Elemen di atas dan pada diagonal juga harus ≠ 0, dan matriks harus bujur sangkar (NBrs = NKol).' },
      { code: 'NBrs = int(input())\nNKol = int(input())\nM = [[0 for j in range(NKol)] for i in range(NBrs)]\nfor i in range(NBrs):\n    for j in range(NKol):\n        M[i][j] = int(input())\nok = (NBrs == NKol)\nfor i in range(NBrs):\n    for j in range(NKol):\n        if (i > j and M[i][j] != 0):\n            ok = False\nif (ok):\n    print("Matriks segitiga atas")\nelse:\n    print("Bukan matriks segitiga atas")', msg: 'Elemen segitiga atas (i ≤ j) harus ≠ 0; contoh-4 punya 0 di atas diagonal sehingga bukan segitiga atas.' },
    ],
    plan: 'ok ← (NBrs = NKol); telusuri semua i, j: bila i ≤ j dan M[i][j] = 0 → ok ← false; bila i > j dan M[i][j] ≠ 0 → ok ← false; cetak hasil',
    skeleton: 'ok = (NBrs ___ NKol)\ni = 0\nwhile (i < NBrs and ___):\n    j = 0\n    while (j < NKol and ___):\n        if (i ___ j and M[i][j] == 0):\n            ok = False\n        elif (i ___ j and M[i][j] != 0):\n            ok = False\n        j = j + 1\n    i = i + 1',
    hints: ['Tiga syarat: bujur sangkar; atas/diagonal ≠ 0; bawah = 0. Mana yang bisa dicek paling awal?', 'Elemen (i, j) berada di segitiga atas bila i ≤ j.', 'Gunakan flag dan hentikan loop saat salah satu syarat gagal.'],
    work: ['Baca M, NBrs, NKol.', 'ok = (NBrs == NKol).', 'Telusuri semua (i, j): cek syarat sesuai posisi (i ≤ j atau i > j).', 'Cetak hasil.'],
    syntax: ['while', 'list-index', 'relational-logical'],
    lineNotes: N(kls10, [
      ['M = [[0 for j', 'Matriks NBrs × NKol sebagai list of list.', 'list-init'],
      ['ok = (NBrs == NKol)', 'Syarat bujur sangkar diperiksa pertama; bila gagal, loop tidak berjalan.'],
      ['while (i < NBrs and ok)', 'Loop baris berhenti saat ada pelanggaran.', 'while'],
      ['while (j < NKol and ok)', 'Loop kolom bersarang; `j = 0` di setiap baris.', 'while'],
      ['if (i <= j and M[i][j] == 0)', 'Segitiga atas termasuk diagonal (i ≤ j): elemen harus ≠ 0.', 'relational-logical'],
      ['elif (i > j and M[i][j] != 0)', 'Di bawah diagonal (i > j): elemen harus 0.', 'if-elif'],
      ['print("Bukan matriks', 'Format keluaran bebas.'],
    ]),
    explanation: 'Syarat: bujur sangkar, elemen i ≤ j tidak nol, elemen i > j nol. Flag dan dua loop bersarang yang berhenti saat melanggar. (Matriks: di luar silabus WI1102.)',
    refs: lsRef(13),
  }],
})

/* ============================ ENGLISH MIRRORS ============================ */
// Indonesian sources keep their verbatim main fields above; the English versions live here and are merged in below.
// Arrays (rubric / lineNotes / pseudoNotes / wrong) are positional: they must match the source arrays one to one.

interface Tr {
  intro?: string
  en?: En
  rubric?: string[]
  lineNotes?: string[]
  pseudoNotes?: string[]
  wrong?: string[]
}

const TR: Record<string, Tr> = {
  'k18-s1': { intro: 'Write your answer briefly and concisely, but with clear arguments. Use good and correct Indonesian.' },
  'k18-s1a': { en: {
    answer: 'Computational thinking (CT) is the thought process of formulating a problem and expressing its solution so that a computer (human or machine) can carry it out. It matters in the 21st century because:\n- Almost every field (science, engineering, business, health, the arts) now depends on data and computation, so everyone needs to be able to formulate problems in a structured way.\n- CT trains four skills: decomposition (breaking a problem down), pattern recognition, abstraction (dropping irrelevant detail) and algorithmic thinking (writing the steps of a solution). These apply to any problem, not only programming.\n- Automation and AI are changing jobs; people who can solve problems systematically and make use of computers are more adaptable and productive.\n\nNote: many answers are valid as long as they connect CT to the needs of the 21st century and give arguments/examples.',
    keyPoints: ['A short definition of CT (formulate the problem + express the solution)', 'The four pillars: decomposition, patterns, abstraction, algorithms', 'Relevant across fields, not only for programmers', '21st-century argument: data, automation, AI, changing jobs'],
    explanation: 'Open answer: define CT, name its pillars, then link it to 21st-century needs (data, automation, use across fields).' } },
  'k18-s1b': { en: {
    answer: 'I would not use the pirated version. Reasons:\n- It violates copyright law and academic ethics, and it harms the developer.\n- It is risky: cracks often contain malware, and pirated copies get no security updates.\n- Legitimate alternatives: schedule lab time (e.g. outside peak hours), use an educational/student licence or a trial version, or an equivalent open-source program (and do part of the work there), and ask the lecturer/assistant about remote access to the lab.\n\nNote: the answer is marked on a clear ethical stance + arguments + realistic alternatives.',
    keyPoints: ['Refuses piracy', 'Legal/ethical reason (copyright)', 'Security risk (malware)', 'Legal alternatives (scheduled lab time, student licence, open source)'],
    explanation: 'This is a computing-ethics question: piracy violates copyright. A good answer refuses, gives reasons and offers legal alternatives.' } },
  'k18-s1c': { en: {
    answer: 'I would not use or change anything on that account. I would only log out (or tell the lab assistant/the owner) so the account is safe. Reasons:\n- Accessing or changing someone else\'s account without permission is illegal access and data manipulation. It violates the ITE Law (Articles 30 and 32) and ethics.\n- Answering bullying with similar acts does not justify what I did (two wrongs do not make a right) and could get me prosecuted or sanctioned.\n- The right way to deal with bullying: collect evidence (screenshots) and report it to the platform, the campus/lecturer, or the authorities.\n\nNote: what is marked is the ethical stance, the legal/ethical basis, and the right alternative action.',
    keyPoints: ['Does not misuse the account (unauthorised access)', 'Legal/ethical basis: ITE Law, privacy', 'Logs out / tells the owner or assistant', 'Reports the bullying through official channels with evidence'],
    explanation: 'Unauthorised access to someone else\'s account is still wrong even if the owner is a bully. A good answer: take no action on the account, secure it, and report through official channels.' } },
  'k18-s2a': { en: {
    stem: "Write a program to compute the hypotenuse of a right triangle using the Pythagorean formula. The program reads input of 2 real numbers, for example $a$ (the base of the triangle) and $b$ (the height of the triangle), and prints to the screen the computed hypotenuse $c$, calculated with the following formula: $c = \\sqrt{a^2 + b^2}$. Assume $a > 0$ and $b > 0$. To compute $x^2$ use `x ** 2` and for $\\sqrt{x}$ use `x ** 0.5`.",
    explanation: 'c = (a ** 2 + b ** 2) ** 0.5. The key points: parentheses around the sum of squares before raising to 0.5, and reading the inputs as `float`.',
    hints: ['Which input type is used for real numbers?', 'Square root with the power operator: which exponent?', 'Watch operator precedence: what must be in parentheses before raising to 0.5?'],
    work: ['Read a and b with `float(input())` because they are real numbers.', 'Add their squares: `a ** 2 + b ** 2`.', 'Take the root of the whole sum with `** 0.5` (use parentheses).', 'Print the result with `print(c)`.'],
    plan: 'read a, b (real); c ← sqrt(a² + b²); output c' },
    lineNotes: ['Title + program specification, then the DECLARATIONS as a comment `# name : type`.', '`input()` always returns a string, wrapped in `float(...)` because a is a real number.', 'Same for b.', 'The parentheses are required: `**` binds tighter than `+`. `(...) ** 0.5` is the square root.', 'The output is a real number (the number of decimals is free).'],
    wrong: ['The root has not been taken: a² + b² gives c², not c. Raise it to the power 0.5.', 'The operator `**` is evaluated before `+`, and `b ** 2 ** 0.5` means b ** (2 ** 0.5). Add parentheses: `(a ** 2 + b ** 2) ** 0.5`.'] },
  'k18-s2b': { en: {
    stem: 'The competition class of a martial-arts athlete is determined by body weight as follows:\n- 45 kg ≤ weight ≤ 50 kg : class A\n- 50 kg < weight ≤ 55 kg : class B\n- 55 kg < weight ≤ 60 kg : class C\n- 60 kg < weight ≤ 65 kg : class D\n- 65 kg < weight ≤ 70 kg : class E\n- weight > 70 kg : class F\n\nWrite a program that reads an athlete\'s weight (an integer) and prints the athlete\'s competition class. If the weight is < 45 kg, print “Tidak memenuhi kualifikasi” (does not meet the qualification).',
    explanation: 'One `if-elif-else` chain: first the case bb < 45, then the upper bounds ≤ 50, 55, 60, 65, 70, and the rest is class F. (The output strings are Indonesian as the paper specifies.)',
    hints: ['How many mutually exclusive cases are there? Which must be checked first?', 'With sequential `elif`, it is enough to write the upper bound of each class.', 'Note: is the upper bound included (≤) or not (<)?'],
    work: ['Read bb as an int.', 'Check the below-qualification case first: `bb < 45`.', 'Continue with `elif` using upper bounds 50, 55, 60, 65, 70 with `<=`.', '`else` for bb > 70: class F.'],
    plan: 'read bb; if bb < 45: not-qualified message; otherwise check in order bb <= 50, <= 55, <= 60, <= 65, <= 70; the rest is class F' },
    lineNotes: ['Weight is an integer: `int(input())`.', 'First branch: below the qualification. It must be checked first so it does not fall into class A.', 'Since bb ≥ 45 is certain in this branch, only the upper bound ≤ 50 is needed (45 belongs to class A).', '`elif` is only checked when the branch above is false, so the lower bound (>50) need not be written. The upper bound is ≤ (inclusive).', 'Remaining case: bb > 70, class F. `else` covers all complementary cases.'],
    wrong: ['The upper bound of each class is included (≤). With `<`, weights 50, 55, 60, 65, 70 fall into the next class up. Use `<=`.', 'The case bb < 45 (not qualified) is not handled; 30 kg becomes class A. Add a first branch for bb < 45.'] },
  'k18-s2c': { en: {
    stem: "A series is given as follows: $f(x) = 1 + x + x^2 + x^3 + \\cdots + x^n$. Write a program used to print to the screen the result of $f(x)$ based on the input values $x$ (a real number) and $n$ (an integer) from the user, using the series above. Assume: $-1 < x < 1$ and $n > 1$. To compute $x^y$, use `x ** y`.\n\n(Input order: x then n. The series must be computed with a loop.)",
    explanation: 'f = 1, then for i = 1..n add x**i. Make sure to use `range(1, n+1)` and start f at 1.',
    hints: ['Term 0 is 1. Where does the accumulator start?', 'Which pattern: summing a number of terms known in advance (n)?', 'The upper bound of `range` is not processed.'],
    work: ['Read x (float) and n (int).', 'Initialise f = 1 (the x⁰ term) before the loop.', 'Loop i = 1..n: add `x ** i`.', 'Print f after the loop.'],
    plan: 'read x, n; f ← 1; for i from 1 to n: f ← f + x^i; output f' },
    lineNotes: ['x is a real number → `float(input())`.', 'n is an integer → `int(input())` (used in `range`).', 'The accumulator holds the first term (x⁰ = 1) **before** the loop. If it starts at 0, the result is short by 1.', '`range(1, n + 1)` processes i = 1..n; the upper bound is excluded, so +1 makes x^n included.', 'Add the term x^i. `**` is the power operator.', 'Not indented: it runs once after the loop (termination).'],
    wrong: ['`range(1, n)` stops at n−1, so the term x^n is left out. Use `range(1, n + 1)`.', 'The first term of the series is 1 (= x⁰). Initialise f = 1, not 0.'] },
  'k18-s2d': { en: {
    stem: 'Write a program that prints how many of N numbers, stored in an *array of integer* `T` of size N, are positive integers and even at the same time. Write your program in the following template:\n\n```\n# Program CountPosGenap\n# Menghitung banyaknya bilangan positif dan genap dari sebuah array of integer\n# KAMUS\n# N : int\n# T : array [0..N-1] of int\n# ALGORITMA\nN = int(input())\nT = [0 for i in range(N)]\n… # pengisian array T diasumsikan sudah ada, tidak diminta dibuat\n# Tuliskan: program untuk menghitung ada berapa banyak bilangan integer\n# yang positif dan genap dalam array T dan menampilkan hasilnya ke layar\n```\n\n(Filling the array T is assumed to exist and is not asked for; in this exercise T is filled by reading N numbers from the input.)',
    explanation: 'Traverse all elements and count those satisfying `T[i] > 0 and T[i] % 2 == 0`; zero and negatives are not counted.',
    hints: ['Pattern: count the array elements that satisfy a condition (count-if).', 'The condition has two parts at once: use the right logical operator.', 'Even number: the remainder on division by 2 equals what?'],
    work: ['Prepare `count = 0` before the loop.', 'Traverse all indices: `for i in range(N)`.', 'Count when `T[i] > 0 and T[i] % 2 == 0`.', 'Print count after the loop.'],
    plan: 'fill T; count ← 0; for each i from 0 to N−1: if T[i] > 0 and T[i] is even, count ← count + 1; output count' },
    lineNotes: ['An array of N elements, indices 0..N−1.', 'Filling the array (assumed to exist in the problem): read each element.', 'The counter is initialised before the loop.', 'Two conditions at once with `and`: positive (> 0, zero excluded) and even (remainder 0 on division by 2).', 'Increment only when the condition holds.', 'After the loop, print the count.'],
    wrong: ['The "positive" condition is missing: -2, -4 and 0 are counted too. Add `T[i] > 0`.', '0 is not a positive number. Use `> 0`, not `>= 0`.'] },
  'k18-s3a': { en: {
    stem: "**Average Height of Students.** The principal of a senior high school wants to get the average height of the students in a class. For that, he calls all the students in the class and gathers them in the school health room to have their height measured one by one. Because he does not know the number of students in the class, the principal intends to count them while measuring the students' heights. The students' height is measured in cm, and by a quick observation it can be known that there is no student whose height is less than 100 cm or more than 200 cm.\n\nA teacher helps the principal measure the heights and record them. This teacher is rather careless, so he often enters wrong data. Wrong data, that is, less than 100 cm or greater than 200 cm, is not used to compute the average height.\n\nWrite a program that helps the principal compute the average height of the students in the class. The program receives as input a number of integers representing the students' heights. Reading input ends by entering the value -999 (not processed). Next, the program prints the average height of the students in the class based on the data entered, without taking into account the wrongly entered data (that is, if the value is < 100 cm or > 200 cm). If there is no data that can be used to compute the average height, print the message “Tidak ada data” (no data).\n\nExamples (the number of digits after the decimal point is free):\n\n| Input (one per line) | Output | Note |\n|---|---|---|\n| 120, 145, 150, -999 | 138.3333 | |\n| 120, 78, 167, 150, 201, -999 | 145.6667 | 78 and 201 are not counted because 78 < 100 and 201 > 200 |\n| -999 | Tidak ada data | -999 entered right at the start |\n| 78, 201, -999 | Tidak ada data | no valid data |",
    explanation: 'Sentinel pattern: read first, loop until -999, filter 100–200 (inclusive), count the sum and the number of valid data, then divide only if the count > 0. The message "Tidak ada data" means "no data".',
    hints: ['The number of inputs is unknown: which pattern is used?', 'Read the first element before the loop and the next element at the end of the loop body.', 'Average = sum / count. What happens when the count is 0?'],
    work: ['Initialise sum = 0 and count = 0.', 'Read the first t (First-Element) before the loop.', 'Loop while t ≠ −999: if valid, add it to sum and count.', 'At the end of the loop body read the next t (Next-Element).', 'After the loop: if count > 0 print sum / count; otherwise print the message.'],
    plan: 'sum ← 0; count ← 0; read t; while t ≠ −999: if 100 ≤ t ≤ 200 then sum ← sum + t, count ← count + 1; read the next t; after the loop: if count > 0 output sum/count, otherwise "Tidak ada data"' },
    lineNotes: ['The sum accumulator and the counter are initialised before the loop.', 'First-Element: read the first value before the loop so -999 can stop it immediately.', 'Loop condition: continue while it is not the sentinel. -999 is not processed.', 'Filter valid data with inclusive bounds (100 and 200 are valid).', 'The sum and the count are incremented only for valid data.', 'Next-Element at the end of the loop body (outside the `if`!). If it is missed, the loop never ends.', 'Prevents division by zero when there is no valid data.', '`/` yields a real number (the average).', 'Complementary case: there is no valid data at all.'],
    wrong: ['The bounds 100 and 200 are valid data (only < 100 or > 200 is wrong). Use `>=` and `<=`.', 'The counter `count` increases for all data, including invalid. Increase it only for valid data (inside the `if`).', 'If there is no valid data, count = 0 so a division by zero occurs. Check `count > 0` before dividing.'] },
  'k18-s3b': { en: {
    stem: '**Student weights.** The principal wants some information about student weights. It is now known that there are 50 students in the class. A list of 50 lines of student weights (integers, always > 0, none wrong) was recorded by a competent teacher.\n\nWrite a program that reads the weight data of the 50 students and:\n- prints the largest weight among all the students\' weights.\n- reads a value X from the user and:\n  - prints how many students weigh more than X kg.\n  - prints the weights above X kg (shown only if the number of students above X kg is > 0).\n\nExample (some data shortened):\n```\nBerat badan terbesar = 89\nMasukkan berat badan = 70\nBanyaknya siswa dengan berat > 70 = 10\nDaftar berat badan > 70 =\n78\n…\n89\n```\nor, if there are none: `Banyaknya siswa dengan berat > 80 = 0` (without the list).\n\n(The output text is Indonesian as the paper gives it: "Berat badan terbesar" = largest weight, "Banyaknya siswa dengan berat" = number of students with weight, "Daftar berat badan" = list of weights.)',
    explanation: 'Maximum with initial value T[0]; count and print those > X with one counting loop and one printing loop (only when the count > 0).',
    hints: ['Finding an extreme value: where does the initial maks value come from?', 'Two separate passes: the first for the maximum, the second to count and print those > X.', 'The list is shown only when the count > 0.'],
    work: ['Fill the array T with the 50 inputs.', 'maks = T[0]; loop i = 1..49 updating maks when T[i] > maks.', 'Read X.', 'First loop: count how many T[i] > X.', 'Print the count; if > 0, loop again and print each T[i] > X.'],
    plan: 'fill T[0..49]; maks ← T[0]; traverse i = 1..49 to update maks; output maks; read X; count and output the number of T[i] > X; if the count > 0 output every T[i] > X' },
    lineNotes: ['An array of 50 elements (indices 0..49).', 'Fill the array from the input, one element per line.', 'The initial maximum = the first element, not 0 (safe even if values become negative).', 'Start at index 1 because T[0] is already used; the upper bound 50 is excluded, so the last index 49 is processed.', '`str()` is required when joining with `+`.', 'X is read after the 50 data values.', '"above X" = `>` (X not included).', 'The list is shown only if some are above X.', 'Traverse the array again and print the elements > X.'],
    wrong: ['"Above X" means > X; a weight equal to X is not counted. Use `>` not `>=`.', '`range(1, 49)` skips the last index (49). Use `range(1, 50)`.'] },
  'k19-s1a-01': { en: { options: ['Elevator', 'Microwave ovens', 'Refrigerator', 'Smartphone'],
    why: ['An elevator does have a controller, but it is not a general computing device.', 'A microwave oven is a household appliance, not a computing device.', 'A refrigerator is not a computing device.', 'A smartphone is a handheld computer: it accepts input, processes, stores and displays.'],
    explanation: 'A smartphone is a computing device (it has a CPU, memory, an OS and applications). The other options are ordinary non-computing appliances.' } },
  'k19-s1a-02': { en: { options: ['Motherboard', 'CPU', 'RAM', 'Operating System'],
    why: ['Hardware.', 'Hardware.', 'Hardware.', 'An operating system is software.'],
    explanation: 'The motherboard, CPU and RAM are hardware; the *operating system* is software.' } },
  'k19-s1a-03': { en: { options: ['Operating system', 'Application', 'Browser', 'Hardware'],
    why: ['All three are operating systems.', 'Applications run on top of an OS; they are not the OS itself.', 'A browser is an application.', 'They are not hardware.'],
    explanation: 'Windows, Linux and macOS are operating systems.' } },
  'k19-s1a-04': { en: { options: ['Accepting input from the user', 'Processing information', 'Displaying output', 'Storing data'],
    why: ['Input is done by input devices (keyboard, mouse).', 'The CPU processes information (executes instructions, arithmetic and logic operations).', 'Output is done by output devices (screen, printer).', 'Storage is done by memory/storage.'],
    explanation: 'The CPU is the processing unit: it executes instructions and performs arithmetic/logic operations. Input, output and storage are handled by other components.' } },
  'k19-s1a-05': { en: { options: ['Compressing files so they take less space', 'Performing arithmetic and logic manipulation on data', 'Copying files between storage media', 'Repairing damaged files'],
    why: ['A utility function.', 'Arithmetic and logic operations are done by the CPU (ALU), not by utility software.', 'A utility function.', 'A utility function.'],
    explanation: 'Utilities handle maintenance (compressing, copying, repairing files). Arithmetic and logic are the CPU\'s job.' } },
  'k19-s1a-06': { en: { options: ['Antivirus', 'Network Interface Card (NIC)', 'Switch', 'Modem'],
    why: ['Antivirus is security software, not a network device.', 'A network device.', 'A network device.', 'A network device.'],
    explanation: 'A NIC, switch and modem are network hardware; antivirus is security software.' } },
  'k19-s1a-07': { en: { options: ['Internet', 'Artificial intelligence', 'Internet of things', 'Augmented reality'],
    why: ['The internet is the network itself, not the technology that connects everyday devices.', 'AI: artificial intelligence.', 'The *Internet of Things* (IoT) connects electronic devices to the internet so they exchange data.', 'AR: augmented reality.'],
    explanation: 'Definition of IoT: everyday devices connected to the internet that exchange data with each other.' } },
  'k19-s1a-08': { en: { options: ['Reducing the time to develop computer programs', 'Sharing computer hardware resources.', 'Sharing data and software.', 'Communicating and working together.'],
    why: ['Not a typical advantage of the internet: program development time does not automatically shrink because of the internet.', 'An advantage of networks/the internet.', 'An advantage of the internet.', 'An advantage of the internet.'],
    explanation: 'Sharing resources, data/software and collaboration are advantages of the internet. "Reducing program development time" is not an advantage inherent to the internet. Note: no official key is available; this answer is inferred from context.' } },
  'k19-s1b': { intro: 'Write your answer briefly and concisely, but clearly. Use good and correct Indonesian.' },
  'k19-s1a': { intro: 'For the statements below, mark with a cross (X) only 1 (one) correct answer option. (Computing-system/network material: outside the WI1102 syllabus.)' },
  'k19-s1b-1': { en: {
    answer: 'Example: **account theft/*phishing***. The attacker sends a link or a fake login page so the user enters their password; the account is taken over and personal data and contacts are misused.\nPrevention/handling: do not click suspicious links, check the site address, use strong and unique passwords, enable two-factor authentication, set account privacy; if the account has already been taken over, change the password, sign out other sessions, and report it to the platform.\n\nNote: other valid examples: leaking personal data through over-posting (*oversharing*), *malware* from third-party apps, misuse of data by the platform.',
    keyPoints: ['One concrete threat is explained', 'Its impact on the user\'s data', 'How to prevent it (strong password, 2FA, privacy, wary of links)', 'How to handle it if it happens'],
    explanation: 'Pick one threat (e.g. phishing), explain the mechanism, then give prevention and handling.' } },
  'k19-s1b-2': { en: {
    answer: '*Netiquette* (*network etiquette*) is the manners/ethics of interacting and communicating online (email, social media, forums, *chat*). It matters because online communication without face-to-face contact is easily misunderstood and can trigger bullying, hate speech and hoaxes; netiquette maintains mutual respect, safety and comfort, and one\'s own reputation.\nExample of applying it: not writing in ALL CAPS (seen as shouting), not spreading news before verifying it, using polite language in the class group, not sharing other people\'s personal data without permission.',
    keyPoints: ['Definition of netiquette (ethics/manners on the internet)', 'Why it matters (respect, avoiding bullying/hoaxes, reputation)', 'One concrete example of applying it'],
    explanation: 'Define netiquette, give the reason (online communication is prone to misunderstanding and harm), then one concrete example.' } },
  'k19-s2a': { intro: 'For the statements below, mark with a cross (X) 1 (one) correct answer option.' },
  'k19-s2a-01': { en: { options: ['Computational thinking techniques consist of decomposition, pattern recognition, abstraction, and algorithm design.', 'Computational thinking is only related to developing programs or applications for computers.', 'Computational thinking involves the process of formulating a problem and expressing its solution.', 'Computational thinking can be learned without having to use a machine.'],
    why: ['Correct: the four pillars of CT in the course.', 'Wrong: CT applies to all fields, not only programming.', 'This statement is also correct (the CT definition on the slides), but the question asks for one answer.', 'This statement is also correct (slides: people can learn CT without a machine), but the question asks for one answer.'],
    explanation: 'Option a is the most typical statement of the CT techniques in the course. Note: the source key is not available; options c and d are also true statements according to slide D01 (the CT definition; CT can be learned without a machine), so this question is ambiguous. Choose a if only one is allowed.' } },
  'k19-s2a-02': { en: { stem: "One of the processes in making a smiley emoticon is removing all the features of the face except the eyes and the mouth. This process is called:", options: ['abstraction', 'generalisation', 'pattern recognition', 'decomposition'],
    why: ['Abstraction: dropping irrelevant detail and keeping what is important (eyes and mouth).', 'Generalisation: formulating a general solution/rule.', 'Pattern recognition: looking for similarities/regularities.', 'Decomposition: breaking a problem into small parts.'],
    explanation: 'Removing the unimportant facial features and keeping the essential ones is abstraction. (On the paper the last option is labelled "e"; it should be "d".)' } },
  'k19-s2a-03': { en: { options: ['abstraction', 'generalisation', 'pattern recognition', 'decomposition'],
    why: ['Abstraction drops detail.', 'Generalisation formulates a general rule.', 'Pattern recognition = finding similarities and differences/regularities in data.', 'Decomposition breaks a problem down.'],
    explanation: 'Recognising similarities and differences (resemblance, regularity) is pattern recognition.' } },
  'k19-s2a-04': { en: { options: ['Repetition/loop', 'Selection/choice', 'Command/instruction', 'Sequence/order'],
    why: ['Control flow: repetition.', 'Control flow: branching.', 'A single command/instruction is not a flow-control structure.', 'Control flow: sequence.'],
    explanation: 'There are three flow-control structures: sequence, selection and repetition. A single instruction is not control flow.' } },
  'k19-s2a-05': { en: { stem: 'Given the flowchart/pseudocode below. If the water temperature is 80°C, what is the next step?\n\n```\nPut the pan on the stove\nTurn on the stove\nPour water on the pan\nBoil water for 3 minutes\nMeasure water temperature\nwhile Temperature more than 90°C = No do\n    Boil water for 3 minutes\n    Measure water temperature\n{ Temperature more than 90°C = Yes }\nTurn off the stove\n```',
    options: ['Turn off the stove', 'Increase the fire', 'Boil water for 3 minutes', 'Measure water temperature'],
    why: ['Only done after the temperature is > 90°C.', 'There is no such step in the algorithm.', '80°C is not yet > 90°C (answer "No"), so the loop body runs: its first step is boiling the water for 3 minutes.', 'Measuring is the second step in the loop body, after boiling.'],
    explanation: 'After measuring 80°C, the condition "more than 90°C" is No, so we enter the loop: first *Boil water for 3 minutes*, only then *Measure water temperature*.' } },
  'k19-s2a-06': { en: { stem: 'Given X = 6, what is the result of the following algorithm (in flowchart/pseudocode)?\n\n```\ni ← 0\nSum ← 0\ninput (X)\nwhile (i < X) do\n    i ← i + 1\n    Sum ← Sum + i\n{ i >= X }\noutput (Sum)\n```',
    options: ['6', '15', '21', 'No output'],
    why: ['6 is X, not the sum.', '15 = 0+1+2+3+4+5 (summing up to i = 5).', 'Sum = 1+2+3+4+5+6 = 21.', 'There is an `output (Sum)` after the loop.'],
    explanation: 'The loop runs for i = 0..5; in each iteration i is incremented first and then added: Sum = 1+2+3+4+5+6 = 21.' } },
  'k19-s2a-07': { en: { options: ['Adding X and i.', 'Adding the first X numbers starting from 0.', 'Adding i, X times.', 'Adding X, i times.'],
    why: ['X is not added to i.', 'What is summed is 1..X (not starting at 0 and stopping at X−1); besides, adding 0 changes nothing, but this wording is the least accurate.', 'The variable i (1, 2, …, X) is summed, X terms in all.', 'X is not multiplied/added i times.'],
    explanation: 'The algorithm sums the value of i, which grows one by one, X times (1 + 2 + … + X). Note: the source key is not available; option b reads "the first X numbers starting from 0", which literally means 0..X−1 (not matching the result 21), so c is chosen.' } },
  'k19-s2a-08': { en: { stem: 'A mini robot can execute the following commands:\n- V: one step forward\n- L (angle): rotate left by the angle given in parentheses\n- R (angle): rotate right by the angle given in parentheses\n\nCommands can be chained with "+" (e.g. "V + L (20) + V + R (2)") and repeated with "*" (e.g. "20 * (V)" = 20 steps forward; "180 * (V + L (1))" draws a half circle). Initially the robot is placed at point A, facing direction B (A bottom-left, B bottom-right, C top-right, D top-left of a square).\n\nWhich of the command combinations below takes the mini robot from A to C along a curved path as in the figure (an S shape: curving upward and then level again at C)?',
    options: ['90 *(V+ L(1) +V+ R(1))', '90 *(V+ L(1) ) + 90 * (V+ R(1))', '90 *(V+ L(1) ) + R(30)+ 90 * (V+ R(1))', 'L(90) + 90*(V+ L(1) ) + R(90)+ 90 * (V+ R(1))'],
    why: ['Turning left 1° then right 1° cancel out: the robot walks straight toward B.', '90 steps with a 1° left turn each step = a quarter circle to the left (facing up), then 90 steps with a 1° right turn each step = facing B again. The trail is an S from A to C.', 'There is an extra 30° right turn that makes the final direction wrong.', 'The initial L(90) makes the robot face up so the next left curve goes outside the area, not to C.'],
    explanation: 'The S path consists of two quarter circles: first turning left (90 × (V + L(1))) so it faces north, then turning right (90 × (V + R(1))) so it faces east again. That is option b.' } },
  'k19-s2b': { intro: 'Ladybug is a robot and can be controlled by these commands:\n- `Forward N`: the Ladybug moves N steps (N ≥ 1) forward in the direction it is facing.\n- `Left`: the Ladybug turns to face left without moving forward.\n- `Right`: the Ladybug turns to face right without moving forward.\n- `Repeat R (some commands)`: the Ladybug repeats the commands in parentheses R times if R ≥ 1. If R < 1, the commands in parentheses are not executed at all.\n\nEvery forward move of the Ladybug draws a track (a straight line) on the floor where it moves.' },
  'k19-s2b-1': { en: {
    stem: 'The following sequence of commands is given to the Ladybug (commands separated by commas):\n\n`Repeat 2 (Forward 1, Right, Forward 1, Left), Repeat 2 (Forward 1, Right), Forward 2, Right, Forward 1, Left, Forward 1, Right, Forward 2, Right`\n\nDraw the track traversed by the Ladybug starting from the position shown in the figure (a grid of 5 columns × 5 rows; the ladybug at a grid corner one square above the bottom, one square from the left edge, facing up). Describe the track by writing the coordinates of its points.',
    answer: 'Take the starting point as (0,0), x to the right, y up, the ladybug facing up.\n\n1. `Repeat 2 (Forward 1, Right, Forward 1, Left)`: (0,0) → (0,1) → (1,1) → (1,2) → (2,2) → (2,3) → (3,3), facing up (two stairs going up-right).\n2. `Repeat 2 (Forward 1, Right)`: up to (3,4), facing right; right to (4,4), facing down.\n3. `Forward 2`: down to (4,2). `Right` → facing left. `Forward 1` → (3,2). `Left` → facing down. `Forward 1` → (3,1). `Right` → facing left. `Forward 2` → (1,1). `Right` → facing up.\n\nTrack: (1,1) → (1,2) → (2,2) → (2,3) → (3,3) → (3,4) → (4,4) → (4,2) → (3,2) → (3,1) → (1,1). The result is a closed path that returns to the starting point: a staircase going up, a vertical drop, then a turn inward and back to the start. (Coordinates are relative to the ladybug at point (1,1) on the figure\'s grid.)',
    keyPoints: ['The starting position and direction are taken into account (facing up)', 'Left/Right turn 90° without moving', 'Repeat is expanded according to the number of repetitions', 'The final track returns to the starting point'],
    explanation: 'Expand the commands one by one while noting position and direction: a staircase up twice, two steps up-right, down 2, then in to the left and back to the starting point. Note: the ladybug\'s initial direction (facing up) is inferred from the example figures X = 1..5.' },
    rubric: ['The track is drawn exactly according to all the commands', 'Most of the track is correct, one segment has the wrong direction/length', 'Only the first part of the track is correct', 'Some aspect is correct but the track is generally wrong', 'Did not attempt'] },
  'k19-s2b-2': { en: {
    stem: 'Given X (an integer ≥ 1), write the sequence of commands that makes a pyramid-shaped track of height X from the Ladybug\'s starting position (see the examples). Assume there is always enough room to draw the pyramid from any position. Examples in the figure: X = 1 (a 1×1 square), X = 2, and X = 5. The track consists of a left side rising like stairs, a flat top one square wide, a right side descending like stairs, and then a base line back to the starting point.',
    explanation: 'Pattern per X: the left side rises X steps with X−1 stairs, the flat top is 1, the right side descends X steps, and the base is 2X−1 long. All repeated parts are expressed with `Repeat X-1`; when X = 1 the repetition count is 0, so only the square remains. Note: other answers that produce the same track are also correct.',
    hints: ['Draw X = 1, 2, 3. Which part repeats X−1 times?', 'The rising and descending sides are stairs (turn, forward 1, turn, forward 1); the base line is 2X−1 long.', 'For X = 1, `Repeat 0` executes nothing: check that your program is still correct.'],
    work: ['Go up 1 step from the starting point.', 'Rising stairs: repeat X−1 times (turn right, forward 1, turn left, forward 1).', 'Top: turn right, forward 1 (flat), then turn right and forward 1 (first step down).', 'Descending stairs: repeat X−1 times (turn left, forward 1, turn right, forward 1).', 'Base: turn right, forward 2X−1 steps (written as Repeat X−1 (Forward 2) + Forward 1) back to the starting point.'] },
    rubric: ['The command sequence produces exactly the right shape for every X', 'A small error (e.g. repetition count X or the base length) for some values of X', 'The shape is right but the repeated commands are written side by side without Repeat, or it is only right for certain X', 'Only part of the shape (e.g. the rising side) is correct', 'Some aspect is correct but the shape is generally wrong', 'Did not attempt'] },
  'k19-s3-1': { intro: 'For questions 3.1 to 3.4: (a) Write a program in Python as taught in class. (b) Bonus: write a flowchart/pseudocode for the problem (choose one).' },
  'k19-s3-1a': { en: {
    stem: 'A sphere with radius $r$ is given. The volume of a sphere is $V_{sphere} = \\frac{4}{3}\\pi r^3$. Write a program that reads the sphere\'s radius and prints the volume. For the constant $\\pi$ use 3.1416 (in Python: `3.1416`).',
    explanation: 'V = 4 / 3 * PI * r ** 3 with r read as `float`; make sure the division is real division.',
    hints: ['The radius may be a real number: which type for `input`?', 'Cube with which operator in Python?', 'Make sure 4/3 does not become integer division.'],
    work: ['Store the constant PI = 3.1416.', 'Read r with `float(input())`.', 'Compute V = 4 / 3 * PI * r ** 3.', 'Print V.'],
    plan: 'PI ← 3.1416; read r; V ← 4/3 × PI × r³; output V' },
    lineNotes: ['The constant π from the problem is given a name of its own for readability.', 'Real input: `float(input())`.', '`/` in Python 3 yields a real number, so 4/3 = 1.333…; `**` is the power operator.', 'Print the volume (the number of decimals is free).'],
    pseudoNotes: ['Declaration: all are real because they hold fractions.', 'Assignment uses ←.', 'The sphere-volume formula; `**` is the power operator.'],
    wrong: ['`4 // 3` is integer division (= 1), not 1.333…. Use `4 / 3`.', 'r³ is written `r ** 3`, not `r * 3`.'] },
  'k19-s3-2a': { en: {
    stem: "An Armstrong number of 3 (three) digits is an integer such that the sum of the cubes of each of its digits equals the number itself. For example, 371 is an Armstrong number because $3^3 + 7^3 + 1^3 = 371$. Write a program that asks the *user* for a hundreds integer (3 digits), then displays on the screen whether that number is an Armstrong number or not.",
    explanation: 'Extract the three digits with `//` and `%`, add up their cubes, and compare with n. (The output strings "adalah bilangan Armstrong" / "bukan bilangan Armstrong" mean "is an Armstrong number" / "is not an Armstrong number".)',
    hints: ['How do you take each digit of a 3-digit number using division and remainder?', 'Tens digit: first divide by 10, then take the remainder on division by 10.', 'Compare the sum of cubes with n using `==`, not `=`.'],
    work: ['Read n as an int.', 'ratusan = n // 100; puluhan = (n // 10) % 10; satuan = n % 10.', 'Compute the sum of the cubes of the three digits.', 'Compare with n; print Armstrong or not.'],
    plan: 'read n; hundreds ← n div 100; tens ← (n div 10) mod 10; ones ← n mod 10; if the sum of the cubes of the digits = n: Armstrong, otherwise not' },
    lineNotes: ['n is a 3-digit integer.', '`//` is integer division: 371 // 100 = 3.', '371 // 10 = 37, then % 10 = 7: the middle digit. The parentheses matter.', 'The remainder on division by 10 = the last digit.', 'Comparison uses `==` (not `=`, which is assignment).', '`str(n)` is required so it can be joined to a string.'],
    pseudoNotes: ['`div` and `mod` are integer division and remainder in the course notation.', 'Comparison uses `=` in pseudocode.'],
    wrong: ['What is summed is the cube of each digit (`** 3`), not the square.', '`n // 10` is not the tens digit (it is the first two digits, e.g. 37 for 371). Take the tens digit with `(n // 10) % 10`.'] },
  'k19-s3-3a': { en: {
    stem: 'A lecturer wants to process the grades of a course taken by N students (N > 0). The program reads the name, practicum score, midterm (uts) score and final (uas) score for each student (every score on a scale of 0 to 100). For every student the final score is computed as follows:\n\nfinal score = 0.2 * practicum score + 0.4 * uts score + 0.4 * uas score\n\nThen, based on this final score, the final course index each student receives is determined with the rule: A ≥ 85, 85 > AB ≥ 75, 75 > B ≥ 70, 70 > BC ≥ 60, 60 > C ≥ 50, 50 > D ≥ 40, and the rest E.\n\nThe program then prints the name, each score component, the final score and the index for every student. Here is an example of the output (each detail separated by spaces and a *vertical bar*, N = 2).\n\n```\nnama | praktikum | uts | uas | akhir | indeks\nUdin | 50 | 50 | 50 | 50 | C\nAsep | 90 | 70 | 70 | 80 | AB\n```\n\n(Input order in this exercise: N, then per student: name, practicum, uts, uas, each on its own line. The header words are Indonesian: nama = name, akhir = final, indeks = index.)',
    explanation: 'Loop N times; compute akhir = 0.2p + 0.4u + 0.4s; determine the index with `if-elif-else` using `>=`; print per student. Note: the example in the problem shows a final score of 80 and index AB for (90, 70, 70), but 0.2·90 + 0.4·70 + 0.4·70 = 74 (index B); the example figures on the paper appear to be wrong.',
    hints: ['Which pattern for "for N students"? Counter-controlled repetition.', 'The index is determined from score ranges: use an `if-elif-else` chain, from the highest.', 'The lower bound of each index is included, so use `>=`.'],
    work: ['Read N and print the header line.', 'Loop N times: read name, practicum, uts, uas.', 'Compute the final score with weights 0.2/0.4/0.4.', 'Determine the index with `if-elif` from A (≥ 85) down to D (≥ 40), else E.', 'Print name | scores | final | index.'],
    plan: 'read N; print the header; repeat N times: read the name and three scores; akhir ← 0.2p + 0.4u + 0.4s; determine the index with an if-elif chain from A to E; print one line' },
    lineNotes: ['The number of students (N > 0).', 'The table header is printed once before the loop.', 'Counter-controlled repetition: i = 0..N−1, exactly N times.', 'The name stays a string (no conversion); the scores are converted with `int`.', 'The final-score formula with weights 0.2 / 0.4 / 0.4.', 'An `if-elif` chain from the highest index: each `elif` is only checked if the previous one is false. The lower bound is included (`>=`).', 'All non-string components are wrapped in `str()` so they can be joined with `+`.'],
    pseudoNotes: ['Repetition N times; in pseudocode the range is inclusive.', 'The chain of cases is written nested in the `else` branch.', 'Several values in one `output`.'],
    wrong: ['The lower bound of each index is included (≥). With `>`, scores 85, 75, 70, … fall to the index below.', 'Separate `if`s (not `elif`) are not mutually exclusive: 85 satisfies every condition and the index is overwritten by the last one. Use `elif`.'] },
  'k19-s3-4a': { en: {
    stem: 'In statistics, the standard deviation is a measure of how spread out data is. The standard deviation of N sample data points is computed with the formula:\n\n$$s = \\sqrt{\\frac{1}{N-1}\\sum_{i=1}^{N}(x_i - \\bar{x})^2}$$\n\nwhere $s$ = the sample standard deviation, $N$ = the number of sample data points, $x_i$ = the i-th data value, $\\bar{x}$ = the mean of all the sample data.\n\nA program uses the formula above to measure how spread out the heights of students at a university are. The sample is one class of 50 students. The program reads the heights of the 50 students (height data are integers > 0) and stores them in an *array of integer*. Then it prints the standard deviation of the students\' heights, computed with the formula above.\n\nHint: before computing the standard deviation, first compute the mean $\\bar{x}$ of all the sample data.',
    explanation: 'Two passes: the mean, then the sum of (xi − mean)² divided by (N − 1) and square-rooted.',
    hints: ['Follow the hint: compute the mean first (one pass), then the sum of squared differences (second pass).', 'Each accumulator starts at 0 before its own loop.', 'The sample formula divides by N − 1, then takes the root.'],
    work: ['Fill the array T (50 elements).', 'Pass 1: total = Σ T[i]; rata = total / N.', 'Pass 2: jumlah = Σ (T[i] − rata)².', 's = (jumlah / (N−1)) ** 0.5.', 'Print s.'],
    plan: 'fill T[0..49]; total ← sum of all T[i]; mean ← total/N; sum ← Σ (T[i] − mean)²; s ← sqrt(sum/(N−1)); output s' },
    lineNotes: ['A 50-element array to store the height data.', 'Fill the array from the input.', 'The accumulator is initialised before the loop.', 'The mean is computed **first** (the problem\'s hint) because the formula needs x̄ before summing the differences.', 'The sum of squared differences; squaring prevents positive and negative differences from cancelling.', 'Divided by N−1 (sample), then `** 0.5` = square root. The parentheses are required.', 'Print s (the number of decimals is free).'],
    pseudoNotes: ['Array indices 0..N−1 (inclusive in pseudocode).', 'The mean before computing the squared differences.', 'The sample variance divided by N−1, then the root.'],
    wrong: ['The sample formula divides by N − 1, not N.', 'The square root has not been taken: only the variance has been computed. Add `** 0.5`.', 'The differences have not been squared; the sum of differences from the mean is always ≈ 0. Use `(T[i] - rata) ** 2`.'] },
  'k21-s1': { intro: 'Part A. Computing System, Network, and Impact of Computing (30 minutes). For questions 1 to 3, write your answer briefly and concisely, but clearly. Use good and correct Indonesian.' },
  'k21-s1a': { en: {
    answer: '*Green computing* is the practice of designing, producing, using and disposing of computing devices (computers, servers, networks) in an environmentally friendly and energy-efficient way, to reduce energy consumption, electronic waste and the carbon footprint.\nExample applications:\n1. Saving energy: automatic *sleep*/hibernate mode, Energy Star-rated devices, power-efficient CPUs/GPUs.\n2. Virtualisation and *cloud computing*: one physical server runs many virtual machines so fewer devices and less electricity are needed.\n(Other valid examples: recycling/reusing electronic devices, data centres powered by renewable energy, using less paper through digital documents.)',
    keyPoints: ['Definition: environmentally friendly, energy-efficient computing', 'Example 1 + its explanation', 'Example 2 + its explanation', 'Impact: less energy/waste/carbon footprint'],
    explanation: 'Define green computing (energy efficiency and reduced electronic waste), then two concrete examples with an explanation of their benefit.' } },
  'k21-s2a': { en: {
    answer: 'Many answers are valid. Examples:\n1. **Zoom/Google Meet/MS Teams** (web/desktop/mobile app): live online lectures (video, audio, screen sharing, whiteboard, recording).\n2. **An LMS (e.g. Moodle/Edunex/Google Classroom)**: download materials, submit assignments, take quizzes, discussion forums and announcements.\n(Alternatives: Google Docs/Drive for group work; Visual Studio Code/Jupyter/Colab for programming practicals.)',
    keyPoints: ['Two relevant software tools (online/offline)', 'An explanation of the function of each for online lectures'],
    explanation: 'An open question about software that supports online lectures; outside the WI1102 syllabus (treated as general knowledge).' } },
  'k21-s3a': { en: {
    answer: 'Many answers are valid. Examples:\n1. **Collection and sale of personal data by apps/platforms** (location tracking, browsing history, targeted ads). Personal action: limit app permissions (location, contacts, camera), review privacy settings, remove apps that ask for excessive permissions.\n2. **Data leaks / identity theft / *phishing***: personal data (national ID number, phone number, password) is stolen and misused. Personal action: unique and strong passwords, two-factor authentication, not sharing personal data on untrusted sites/links.\n(Others: camera surveillance and face recognition, a permanent digital footprint, *oversharing* on social media. Referring to the Personal Data Protection Law (UU PDP) can add credit.)',
    keyPoints: ['Two different privacy threats are explained', 'One personal action for each threat', 'The actions are realistic and fit the threat'],
    explanation: 'Two privacy threats (e.g. tracking/data collection and leaks/phishing), each with one concrete personal action.' } },
  'k21-s4': { intro: 'Part B. Computational Thinking (20 minutes). A mini robot draws a trail of its movement on a drawing surface. To do so, it can execute the following commands:\n- `forward`: move forward 1 step\n- `turn L/R d`: rotate by d degrees to the left if L/R is L, and to the right if L/R is R. Assume: L/R is L or R, and 0 ≤ d ≤ 360. If d = 0 or 360, the robot does not change direction.\n- `repeat n (commands)`: repeat the commands n times. Assume n ≥ 0. If n = 0, the commands are not executed at all.\n- `ifelse(expression)(command-1)(command-2)`: if the expression is true, command-1 is executed; if false, command-2 is executed. The expression is a boolean expression as taught in class (Python/Matlab notation is allowed).\n\nAssumption: at the start, the robot is at position A facing right/east. Commands are separated by commas (except the last) and may be written on separate lines with indentation. The parameters of `repeat` and `ifelse` may consist of more than 1 command.\n\nExample: `forward, turn L 45, forward, turn R 45` (forward 1, left 45°, forward 1, right 45°); `repeat 180 (forward, turn L 1)` draws a half circle.' },
  'k21-s4a': { en: {
    stem: 'Given x (an integer ≥ 1), write the sequence of commands that makes the robot draw a trail from position A to the final position, forming a repeated S pattern as in the examples x = 1, x = 2 and x = 5 (see the figure). Assume there is always enough room to draw from any position. The figure is only an example; generalise how the pattern looks for other values of x.',
    answer: 'Observe: x = 1 is two quarter circles (rising to the left by 90°, then back to level). Each increase of x adds one alternating half circle (an upper curve and a lower curve), so there are x − 1 half circles. The trail ends at the top if x is odd, at the bottom if x is even.\n\nExample answer:\n```\nrepeat 90 (forward, turn L 1),\nrepeat (x - 1) // 2 (\n    repeat 180 (forward, turn R 1),\n    repeat 180 (forward, turn L 1)\n),\nifelse (x % 2 == 1)\n    (repeat 90 (forward, turn R 1))\n    (repeat 180 (forward, turn R 1), repeat 90 (forward, turn L 1))\n```\nCheck: x = 1: left 90° (facing north), 0 pairs, odd → right 90° (facing east). x = 2: left 90°, no pairs, even → right 180° (facing south), left 90° (facing east), ending at the bottom. x = 5: left 90°, 2 pairs (upper-lower-upper-lower curves), odd → right 90°.\n\nNote: other answers that produce the same trail are also correct (e.g. using two ifelse or repetition with different conditions).',
    keyPoints: ['One initial quarter circle (turn L, 90 × (forward, turn L 1))', 'Alternating R/L half circles, x − 1 of them', 'The ending depends on odd/even (ifelse)', 'Generalising with a repeat count computed from x'],
    explanation: 'The pattern is built from an initial quarter circle, (x − 1) alternating half circles, and a closing quarter circle. The parity of x determines the direction of the last turn, hence the `ifelse`.',
    },
    rubric: ['The command sequence produces exactly the right S pattern for all x (including the odd/even difference)', 'The pattern is right with a small error (e.g. an off-by-one repetition count or the wrong final direction for some x)', 'Right for only some values of x (e.g. only odd x) or the repeated commands are written side by side', 'Only one S (x = 1) or part of the curves is correct', 'Some aspect is correct, but the trail is generally wrong', 'Did not attempt'] },
  'k21-s5': { intro: 'Part C. Algorithms and Programming (30 minutes). For questions 5 to 7: write a program in the programming language as taught in class. Bonus (marked only if the program is written): write a flowchart/pseudocode for the problem (choose one).' },
  'k21-s5a': { en: {
    stem: 'Let NA = the number of credit units (SKS) of courses that received grade A, NB = the number of SKS with grade B, NC = ... grade C, ND = ... grade D, NE = ... grade E. Then a student\'s Average Grade (NR, Nilai Rata-rata) in a semester is computed as follows.\n\n$$NR = \\frac{NA \\cdot 4 + NB \\cdot 3 + NC \\cdot 2 + ND}{NA + NB + NC + ND + NE}$$\n\nWrite a program that reads NA, NB, NC, ND and NE (all of type integer) and prints NR to the screen. NR is of type float (the number of decimals is free). (Input order: NA, NB, NC, ND, NE, one per line.)',
    explanation: 'NR = (NA*4 + NB*3 + NC*2 + ND) / (NA+NB+NC+ND+NE) with the right parentheses and real division `/`. Assumption: the total SKS > 0.',
    hints: ['How many `input()` calls are needed, and of which type?', 'The numerator and the denominator each need parentheses.', 'To get a real number as the result, which division operator is used?'],
    work: ['Read the five SKS values with `int(input())`.', 'Compute the numerator in parentheses.', 'Divide by the total of all SKS (in parentheses) using `/`.', 'Print NR.'],
    plan: 'read NA..NE (int); NR ← (4·NA + 3·NB + 2·NC + ND) / (NA+NB+NC+ND+NE); output NR' },
    lineNotes: ['Five integer inputs, one per line; each `int(input())`.', 'Parentheses around the numerator and the denominator: without them `/` only divides the last term. `/` yields a float.', 'Print NR (the number of decimals is free).'],
    pseudoNotes: ['Five inputs in sequence.', 'The full formula with parentheses around the numerator and the denominator.'],
    wrong: ['Without parentheses, the division only affects `ND`, not the whole numerator/denominator. Put parentheses around the numerator and denominator.', '`//` is integer division; NR must be a float. Use `/`.'] },
  'k21-s6a': { en: {
    stem: 'One system commonly used to determine human blood type is the ABO system. According to the ABO system, human blood type is controlled by 3 kinds of alleles, namely the alleles IA, IB and IO.\n\nA person inherits one allele from the father and one allele from the mother, and the combination of the alleles inherited from the father and mother determines the blood type. The following table gives the criteria for forming the child\'s paired alleles from the alleles inherited from both parents, and the child\'s blood type based on the paired alleles.\n\n| Parent-1 | Parent-2 | Child\'s paired alleles | Blood type |\n|---|---|---|---|\n| IA | IA | IAIA | A |\n| IA | IB | IAIB | AB |\n| IA | IO | IAIO | A |\n| IB | IB | IBIB | B |\n| IB | IO | IBIO | B |\n| IO | IO | IOIO | O |\n\nWrite a program that reads the allele inherited from the mother, say Ix, and the allele inherited from the father, say Iy, and prints the child\'s blood type based on the information above. Assume the allele inputs are always valid as specified above.\n\nExamples: (IA, IA) → A; (IO, IB) → B; (IB, IA) → AB; (IO, IO) → O. (Input: Ix then Iy, one per line.)',
    explanation: 'Order the checks from the most specific: O (IO, IO), AB (IA and IB in either order), then B (there is an IB), and the rest A. (The output "Golongan darah anak = " means "The child\'s blood type = ".)',
    hints: ['The 6-row table gives 9 ordered combinations. Which combination appears in two orders?', 'Order the checks: the most specific cases (O, AB) first, then the general ones.', 'Once O and AB are ruled out, what characterises type B? And the rest?'],
    work: ['Read the mother\'s and the father\'s allele as strings.', 'Case (IO, IO) → O.', 'Case {IA, IB} (either order) → AB.', 'If either is IB (AB is already excluded) → B.', 'The rest (IA with IA or IO) → A.', 'Print the blood type.'],
    plan: 'read ibu (mother), ayah (father); if both are IO → O; if {IA, IB} (either order) → AB; if either is IB → B; otherwise → A' },
    lineNotes: ['An allele is a string; no conversion is needed. Two input lines: mother then father.', 'Type O is only (IO, IO).', 'AB appears in two orders: (IA, IB) and (IB, IA). It is checked **before** the B case so it is not swallowed.', 'Once AB is excluded, the other combinations containing IB (IB-IB, IB-IO, IO-IB) are B.', 'The rest: IA-IA, IA-IO, IO-IA, all A.', 'Strings are joined with `+`; `gol` is already a string, so no `str()` is needed.'],
    pseudoNotes: ['Case O.', 'Case AB (either order) comes before B.', 'The result is printed after the chain of cases is done.'],
    wrong: ['The combination IA + IB must be AB, but the `B` branch intercepts it. Check the AB case first (IA with IB, both orders) before the B case.', 'The AB combination can appear in two orders: (IA, IB) and (IB, IA). Handle both.'] },
  'k21-s7a': { en: {
    stem: "A function is given as follows:\n\n$$f(x) = \\sum_{i=1}^{n} a x^i + b$$\n\nWrite a program used to print to the screen the result of $f(x)$ based on the input values $a$, $b$, and $x$ (each a real number) and $n$ (an integer > 0) from the user.\nHint: use a loop.\n\n(Input order: a, b, x, n. The formula is read as $\\left(\\sum_{i=1}^{n} a x^i\\right) + b$.)",
    explanation: 'Accumulate a·x^i for i = 1..n inside the loop, then add b once. Note: the layout of the formula on the paper is ambiguous (b inside or outside Σ); here b is read as outside Σ (Σ a·xⁱ, then + b). If b was meant to be inside Σ, add b in every iteration (the result grows by n·b − b).',
    hints: ['What is the pattern for summing n terms? A loop with an accumulator.', 'The variable i runs 1..n: what is the upper bound of `range`?', 'Where is b added: inside or outside the sigma?'],
    work: ['Read a, b, x as float and n as int.', 'jumlah = 0 before the loop.', 'Loop i = 1..n: jumlah += a * x ** i.', 'f = jumlah + b.', 'Print f.'],
    plan: 'read a, b, x, n; sum ← 0; for i from 1 to n: sum ← sum + a·x^i; f ← sum + b; output f' },
    lineNotes: ['a, b, x are real → `float`; n is an integer → `int` (used in `range`).', 'The accumulator starts at 0 **before** the loop.', 'i = 1..n: the upper bound of `range` is excluded so n + 1 is written.', 'Add the term a·xⁱ; `**` is the power operator.', 'b is added once after the loop (outside Σ).', 'Print f(x).'],
    pseudoNotes: ['Initialise the accumulator.', 'The inclusive range 1..n.', 'b is outside the sigma.'],
    wrong: ['`range(n)` gives i = 0..n−1; what is asked is i = 1..n. Use `range(1, n + 1)`.', '$x^i$ is a power (`x ** i`), not the product `x * i`.'] },
  'k21-s8': { intro: 'Part D. Algorithms and Programming (20 minutes). Euler\'s number $e$ is defined as the infinite sum of the series $e = 1 + \\frac{1}{1!} + \\frac{1}{2!} + \\frac{1}{3!} + \\frac{1}{4!} + \\cdots$. It can be used to estimate the population of people or organisms in a place.\n\nThe estimated population of a city A in year $t$ is modelled by $P(t) = P_0 e^{kt}$ where $P_0 = 1.2$ (in millions) is the population in year 0 and $k = 0.015$ is the growth constant. An approximation of Euler\'s number $e$ is obtained by summing the series above up to the 100th term, i.e. $e = 1 + \\frac{1}{1!} + \\frac{1}{2!} + \\cdots + \\frac{1}{100!}$.' },
  'k21-s8a': { en: {
    stem: 'Approximating Euler\'s number requires computing factorials. Write a flowchart/pseudocode (choose one, as emphasised in class) that computes the factorial of n, or n!. The factorial is computed by the formula: 1! = 1; n! = 1·2·3·…·n.\nAssume: n ≥ 1 and its value is already known (its input need not be handled); you only need to write the factorial computation process (no input/output handling).\n\n(In this exercise, n is read from the input and the result is printed so it can be tested; in the exam only the process is needed.)',
    explanation: 'fakt ← 1; repeat i = 1..n with fakt ← fakt × i. In the flowchart: initialisation, the condition i ≤ n, the multiply process and i ← i + 1, back to the condition.',
    hints: ['Accumulating a product, not a sum: from which initial value?', 'i runs from 1 to n (n included).'],
    work: ['Initialise fakt = 1.', 'Repeat i = 1..n.', 'Multiply fakt by i in each iteration.', 'The final fakt = n!.'],
    plan: 'fakt ← 1; for i from 1 to n: fakt ← fakt × i; result: fakt' },
    lineNotes: ['In the problem n is already known; in this exercise it is read so it can be tested.', 'The multiplicative identity; if it is 0 the result is always 0.', 'i = 1..n (n is included thanks to the +1).', 'Accumulating the product.', 'The result n! (for testing only).'],
    pseudoNotes: ['Initialise to 1.', 'The inclusive range 1..n.', 'Accumulating the product.'],
    wrong: ['`range(1, n)` stops at n−1, so n is not multiplied in. Use `range(1, n + 1)`.', 'The product must be initialised to 1 (the multiplicative identity), not 0; otherwise the result is always 0.'] },
  'k21-s8b': { en: {
    stem: 'Write a program that reads the number of years, say x (an integer > 0), and prints the estimated population of city A from year 1 to year x (in millions) based on the formula above. This program must contain the approximation of Euler\'s number and also the factorial computation (matching the flowchart/pseudocode written in part a).\n\nOutput format:\n```\nPerkiraan populasi penduduk kota A\nTahun ke-1 : … juta\nTahun ke-2 : … juta\n:\nTahun ke-x : … juta\n```\n(The text means "Estimated population of city A", "Year 1 : … million".) Note: arrays and functions/procedures may not be used.',
    explanation: 'Compute e once with nested loops (the factorial in the inner loop, no function/array), then print P0·e^(k·t) for t = 1..x. Note: the decimal format is free; the output is judged by its numbers.',
    hints: ['Without functions/arrays: the factorial is computed with a loop inside the series loop.', 'Compute e once (outside the year loop), then use it for all years.', 'The last term of the series is 1/100!, so i runs up to 100.'],
    work: ['Read x.', 'e = 1; for i = 1..100: fakt = 1; for j = 1..i: fakt *= j; e += 1/fakt.', 'Print the title.', 'For t = 1..x: P = 1.2 * e ** (0.015 * t); print the line for year t.'],
    plan: 'read x; e ← 1; for i = 1..100: compute fakt = i! with an inner loop; e ← e + 1/fakt; then for t = 1..x: P ← P0 × e^(k·t) and print' },
    lineNotes: ['The number of years, an integer > 0.', 'The problem\'s constants: the initial population (millions) and the growth constant.', 'The first term of the series (1) is put in from the start; the terms 1/1! and onwards are added in the loop.', 'Terms 1 to 100: the upper bound is 101 because it is excluded.', 'The factorial is recomputed for every i, so it is initialised **inside** the outer loop (before the inner loop).', 'Inner loop: fakt = 1·2·…·i (as in part a).', 'Add the term 1/i!. `/` yields a float (1 / a huge number is still correct).', 'The title is printed once, before the year loop.', 'Year 1 to year x.', 'P(t) = P0 · e^(k·t): `**` power with the exponent in parentheses.', '`str()` for t and P because they are joined with `+`.'],
    pseudoNotes: ['The first term of the series.', 'The inner loop computes i!.', 'Add the term 1/i!.', 'Years 1..x.'],
    wrong: ['The series starts from the term 1 (before 1/1!): e = 1 + 1/1! + …. Initialise e = 1, not 0.', 'The population model is exponential: P(t) = P0 · e^(k·t), not P0 · e · k · t. Use `e ** (k * t)`.', 'The years must be 1..x, not 0..x−1. Use `range(1, x + 1)`.'] },
  'kls-s1a': { en: {
    stem: "Write a program to compute the hypotenuse of a right triangle using the Pythagorean formula. The program reads input of 2 real numbers, for example $a$ (the base of the triangle) and $b$ (the height of the triangle), and prints to the screen the computed hypotenuse $c$, calculated with the formula $c = \\sqrt{a^2 + b^2}$. Assume $a > 0$ and $b > 0$.",
    explanation: 'c = (a ** 2 + b ** 2) ** 0.5 with a and b read as float.',
    hints: ['Which input type for real numbers?', 'Square root = power 0.5; what must go in parentheses?'],
    work: ['Read a and b as float.', 'Compute the sum of squares.', 'Take the root with `** 0.5`.', 'Print c.'],
    plan: 'read a, b; c ← sqrt(a² + b²); output c' },
    lineNotes: ['`float(input())` for real numbers.', 'Parentheses around the sum of squares before raising to 0.5 (the root).', 'Print the hypotenuse.'],
    pseudoNotes: ['The Pythagorean formula with `**` as the power.'],
    wrong: ['The root has not been taken: a² + b² is c², not c. Raise it to the power 0.5.', 'Operator precedence: `b ** 2 ** 0.5` is not the root of the sum. Add parentheses: `(a ** 2 + b ** 2) ** 0.5`.'] },
  'kls-s2a': { en: {
    stem: 'Write a program that reads a 2-dimensional point consisting of a pair of values (x, y). x and y are of type integer. If P does not lie on the x-axis or the y-axis or at the origin (0,0), print the quadrant in which P lies. The quadrant of point (x, y) is as follows:\n- If x > 0 and y > 0, then quadrant = 1\n- If x < 0 and y > 0, then quadrant = 2\n- If x < 0 and y < 0, then quadrant = 3\n- If x > 0 and y < 0, then quadrant = 4\n\nIf P lies on the x-axis, or the y-axis, or at the origin, print “Kuadran tidak bisa dihitung” (the quadrant cannot be computed). (Input: x then y.)',
    explanation: 'Four explicit checks with `>` and `<`, and `else` catches points on an axis/the origin.',
    hints: ['There are 5 mutually exclusive cases (4 quadrants + the rest).', 'Quadrants use strict inequalities (> or <). Which case does `else` catch?'],
    work: ['Read x and y as int.', 'Check the four sign combinations explicitly.', '`else`: a point on an axis or the origin → the message.'],
    plan: 'read x, y; if x>0 and y>0 → 1; x<0 and y>0 → 2; x<0 and y<0 → 3; x>0 and y<0 → 4; otherwise the "cannot be computed" message' },
    lineNotes: ['The coordinates are of type integer.', 'Quadrant 1. Strict inequalities: 0 lies on an axis, not in a quadrant.', 'Each quadrant is checked explicitly with two conditions joined by `and`.', 'Remaining case: x = 0 or y = 0 (axis/origin).'],
    pseudoNotes: ['The four quadrant cases nested in the `else` branch.', 'The last complementary case.'],
    wrong: ['A point on an axis (x = 0 or y = 0) has no quadrant. Use pure `>` / `<`, not `>=`.', 'The "on an axis/origin" case is missed: `else` treats everything left as quadrant 4. Check x > 0 and y < 0 explicitly and put the message in `else`.'] },
  'kls-s3a': { en: {
    stem: 'A program reads a temperature in degrees Celsius, say TC, and a conversion code as a letter ‘F’, ‘R’, ‘K’, and prints the conversion of TC:\n- If the conversion code = ‘F’, TC is converted to degrees Fahrenheit with the formula = (9/5 * TC) + 32\n- If the conversion code = ‘R’, TC is converted to degrees Réaumur with the formula = 4/5 * TC\n- If the conversion code = ‘K’, TC is converted to kelvin with the formula = TC + 273\n\nAll inputs are assumed valid, so they need not be checked. (Input: TC then the code.)',
    explanation: 'Three branches based on the code: Fahrenheit, Réaumur, Kelvin; make sure the division is real division.',
    hints: ['There are three cases based on the code: use an `if-elif` chain.', 'Make sure 9/5 is not integer division.'],
    work: ['Read TC (float) and the code (string).', 'F: 9/5 * TC + 32.', 'R: 4/5 * TC.', 'K (the rest): TC + 273.', 'Print the result.'],
    plan: 'read TC and the code; if F: 9/5·TC + 32; if R: 4/5·TC; otherwise: TC + 273; output the result' },
    lineNotes: ['A real temperature → `float(input())`.', 'The code is a string (a letter); no conversion.', 'String comparison uses `==`.', '`/` gives 1.8 (real), whereas `//` would give 1.', 'The input is valid, so the rest must be ‘K’.'],
    pseudoNotes: ['Three cases based on the code.', 'One output at the end.'],
    wrong: ['`9 // 5` is integer division (= 1), not 1.8. Use `/`.', 'The Réaumur formula is 4/5 × TC, not 5/4.'] },
  'kls-s4a': { en: {
    stem: "Write a program that receives 3 different integers, for example a, b, c, and prints the 3 integers sorted from highest to lowest.\n\nExample input/output (from the slide; see the note):\n\n| a | b | c | Output |\n|---|---|---|---|\n| 3 | 4 | -1 | 3 2 -1 |\n| 4 | 10 | 11 | 11 10 4 |\n| 35 | -90 | 100 | -90 35 100 |\n\nNote: only conditionals must be used (arrays are not allowed).\n\n(Attention: the examples on the slide appear to be wrong, e.g. (3, 4, −1) should produce \"4 3 -1\", and (35, −90, 100) produces \"100 35 -90\" if the order is descending. This exercise follows the problem text: from highest to lowest. Input: a, b, c, one per line.)",
    explanation: 'A decision tree: compare a and b, then c against both; there are 6 leaves for the 6 orders.',
    hints: ['Three distinct numbers have 6 orders. Draw a decision tree with two levels of comparison.', 'Compare a and b first, then slot c into the right position.', 'No array/sort allowed: only `if`.'],
    work: ['If a > b: check b > c → a b c; otherwise check a > c → a c b; otherwise c a b.', 'If a < b: check a > c → b a c; otherwise check b > c → b c a; otherwise c b a.', 'Print separated by spaces.'],
    plan: 'compare a and b; in each branch compare with c to place c; print in descending order. 6 possible orders = 6 leaves of the decision tree' },
    lineNotes: ['Level 1: compare the first two numbers. The `else` branch means b > a (all are distinct).', 'Branch a > b: if b > c then a > b > c.', 'b < c: c may be in between or at the top; compare a with c.', 'c is the largest: c a b.', 'Branch b > a: b is certainly larger than a. Only c\'s position is left.', 'c is the largest, then b, then a.'],
    pseudoNotes: ['Two levels of branching give six leaves (orders).', 'Print three values separated by spaces.'],
    wrong: ['The order is reversed (ascending). What is asked is from highest to lowest.', 'In the branch a > b and b < c, c may be larger than a, so the order "a c b" is not necessarily right. Compare a with c too.'] },
  'kls-s5a': { en: {
    stem: 'Count how many multiples of X there are between a and b. X, a, b are input from the user. Assume: X, a, b are positive integers; a < b.\n\nExamples:\n\n| X | a | b | Output | Note |\n|---|---|---|---|---|\n| 3 | 1 | 5 | 1 | {3} |\n| 2 | 3 | 15 | 5 | {4,6,8,10,12} |\n| 2 | 6 | 10 | 0 | {} |\n\n(Note: the examples in rows 2 and 3 on the slide are inconsistent with "a to b" (the multiples of 2 in 3..15 are 4,6,…,14 = 6 numbers; in 6..10 there are 6, 8, 10). This exercise follows the text "a to b" with a and b themselves counted. Input: X, a, b one per line.)',
    explanation: 'Loop i from a to b (inclusive), count those with `i % X == 0`.',
    hints: ['Pattern: traverse the range a..b and count those that satisfy the condition.', 'How do you check that i is a multiple of X using the remainder?', 'Is b checked too? `range` does not include the upper bound.'],
    work: ['Read X, a, b.', 'count = 0.', 'For i = a..b: if i % X == 0, count += 1.', 'Print count.'],
    plan: 'count ← 0; for i from a to b: if i is divisible by X, count ← count + 1; output count' },
    lineNotes: ['Three integer inputs.', 'The counter is initialised before the loop.', 'i = a..b; +1 because the upper bound is excluded.', 'i is a multiple of X when its remainder is 0.', 'After the loop.'],
    pseudoNotes: ['The inclusive range a..b.', '`mod` = remainder.'],
    wrong: ['`range(a, b)` does not include b. Use `range(a, b + 1)` if b is checked too.', 'A multiple of X is a number with remainder 0 (`i % X == 0`).'] },
  'kls-s6a': { en: {
    stem: 'Given an *array of integer* `TI` with 100 elements. Assume there is already a part of the program that fills all elements of TI with integer values (it need not be written). Write a program that checks whether all elements of TI are positive. If so, print “Semua elemen array positif” (all array elements are positive). If not, print “Tidak semua elemen array positif” (not all array elements are positive).\n\nHint: there are several ways: (1) count how many are positive and how many are not; (2) use a *searching* algorithm.\n\n(In this exercise TI is filled by reading 100 numbers from the input, one per line.)',
    explanation: 'Searching with a `found` flag for an element ≤ 0; all are positive if none is found.',
    hints: ['Look for just one element that is **not** positive (the searching pattern with a flag).', 'Stop as soon as one is found: the loop condition contains `not found`.', 'Careful: zero is not positive.'],
    work: ['Fill TI (100 elements).', 'found = False; i = 0.', 'Loop while i < 100 and not found: if TI[i] ≤ 0 → found = True; otherwise i += 1.', 'Print the message according to found.'],
    plan: 'found ← false; i ← 0; while i < 100 and not found: if TI[i] ≤ 0 then found ← true, otherwise i ← i + 1; if found: "Tidak semua…", otherwise "Semua…"' },
    lineNotes: ['An array of 100 elements, indices 0..99.', 'Filling the array (assumed to exist in the problem).', 'Flag: no non-positive element found yet.', 'Stops when all are checked or one is found. `i < 100` comes first so `TI[i]` does not go out of range.', 'Non-positive = ≤ 0 (zero included). Found → found = True.', 'The increment is only in `else`: when found, the loop stops and i points at that element.', 'After the loop, the flag decides the result.'],
    pseudoNotes: ['Initialise the flag.', 'Loop condition: elements remain and nothing found yet.', 'Advance only if not found yet.'],
    wrong: ['0 is not a positive number. A non-positive element is one that is ≤ 0, so use `<= 0`.', 'Only the first element is checked. Traverse all elements (searching) until one is not positive or all are exhausted.'] },
  'kls-s7a': { en: {
    stem: 'Given an *array of integer* `TI` with 100 elements. Assume there is already a part of the program that fills all elements of TI with integer values (it need not be written). Write a program that reads a choice of 0, 1 or 2 from the user (assume the choice is always valid).\n- Choice 0: print the maximum and the minimum value of the array elements\n- Choice 1: print the maximum value only\n- Choice 2: print the minimum value only\n\nHint: the search for the maximum and minimum must be done in 1 loop.\n\n(In this exercise TI is filled with 100 numbers from the input, then the choice is read.)',
    explanation: 'One loop that updates maks and mini starting from `TI[0]`, then print according to the choice. (The output labels "Maksimum" and "Minimum" mean maximum and minimum.)',
    hints: ['Where do maks and mini start from, so that it is correct for negative data?', 'One loop is enough: two separate `if`s (not `elif`) inside it.', 'The choice is checked after the loop.'],
    work: ['Fill TI, read the choice.', 'maks = mini = TI[0].', 'Loop i = 1..99: update maks and mini.', 'Print according to the choice.'],
    plan: 'fill TI; read the choice; maks ← mini ← TI[0]; one loop i = 1..99 updates maks and mini; output according to the choice (0: both, 1: max, 2: min)' },
    lineNotes: ['Fill the 100-element array.', 'The choice 0/1/2 is read after the array.', '`TI[0]`, not 0: it does not fail if all are negative.', 'One loop for both max and min (the problem\'s requirement). Start at 1 because TI[0] is already the initial value.', 'Two separate `if`s (not `elif`): one element may update both in early iterations.', 'Choice branches: 0 both, 1 maximum, otherwise (2) minimum.'],
    pseudoNotes: ['The initial value comes from the first element.', 'Indices 1..99 inclusive; one loop for both.', 'The choice branches after the loop.'],
    wrong: ['The initial value `maks = 0` (and `mini = 1000`) is wrong if all elements are negative. Start from `TI[0]`.', 'The choice has not been used: choice 1 is the maximum only and choice 2 the minimum only.'] },
  'kls-s8a': { en: {
    stem: "Given an *array of integer* `T1` and `T2`, each with 100 elements. A check will be made of whether T1 and T2 are the same array or not (see question 8b). In that program, write a procedure/function `BacaArray` that is used to fill an *array of integer* with 100 elements from the user's input and to store the result of the reading in an *array of integer*.",
    answer: kls8a + '\n\nNote: it can also be a procedure that takes the array as a parameter (`def BacaArray(T): for i in range(100): T[i] = int(input())`) since the list is modified in place. The function version (returning the array) is preferred.',
    keyPoints: ['A subprogram is defined with def and named BacaArray', 'A local 100-element array is created inside the function', 'A loop of 100 iterations uses int(input())', 'The function returns the array (return T)'],
    explanation: 'A function without parameters that creates a 100-element array, fills it via `int(input())`, and returns it. It is used in 8b.' },
    rubric: ['The program is correct for all cases (including boundary cases), and the structure and notation follow what is taught in class', 'The program is almost correct; a small error (e.g. one boundary condition, type conversion, or str())', 'The main logic is right, but an error changes the result in some cases', 'Only some steps are correct (e.g. input/output right, but the computation or branching is wrong)', 'Some aspect is correct, but the program does not solve the problem', 'Did not attempt'] },
  'kls-s8b': { en: {
    stem: 'From question 8a, write a main program that:\n- Reads the arrays T1 and T2 by calling the procedure/function `BacaArray`.\n- Checks whether T1 and T2 are the same array. The two arrays are called the same if $\\forall i$, T1[i] = T2[i].\n- If both arrays are the same, print the message “Array sama” (arrays are the same). Otherwise, print the message “Array tidak sama” (arrays are not the same).\n\nWays to determine the equal elements: (1) count how many elements of both arrays are the same; (2) use a *searching* algorithm.\n\n(Input: 100 numbers for T1, then 100 numbers for T2.)',
    explanation: 'Call `BacaArray()` twice, then look for a pair of different elements with a flag; none found → "Array sama".',
    hints: ['Reuse `BacaArray` twice: how does a function hand the array back to its caller?', 'The searching pattern: look for a **differing pair**; if there is none, the arrays are the same.', 'Stop as soon as a differing pair is found (the flag in the loop condition).'],
    work: ['Define `BacaArray()` (from 8a).', 'T1 = BacaArray(); T2 = BacaArray().', 'sama = True; i = 0.', 'Loop: if T1[i] != T2[i] → sama = False; otherwise i += 1.', 'Print "Array sama" or "Array tidak sama".'],
    plan: 'function BacaArray: create a 100-element array, fill from input, return; main: T1 ← BacaArray(); T2 ← BacaArray(); sama ← true; traverse i: if T1[i] ≠ T2[i] then sama ← false; print according to sama' },
    lineNotes: ['A subprogram (function): defined before use; called twice in the main program.', 'A local 100-element array inside the function.', 'The function returns the array (return, not print) so the caller can use it.', 'A function call; the result is stored in T1 (and T2 on the next line).', 'Flag: assumed the same until a differing pair is found.', 'Stops when all are checked or a differing pair is found.', 'A differing pair is found → sama = False (the loop stops).', 'The increment is only in `else`: move on to the next pair if still the same.', 'The final result from the flag.'],
    pseudoNotes: ['The subprogram definition after the main program: the specification in { }, local variables in the local DECLARATIONS (KAMUS LOKAL), the result returned with →.', 'Call the function and store the result.', 'Searching for a differing pair.'],
    wrong: ['Only the first elements are compared. Two arrays are the same if **all** element pairs are the same (searching: look for one differing pair).', 'The logic is reversed: a single equal pair sets the flag to True. What we look for is a **differing** pair; all equal means none differ.'] },
  'kls-s9a': { en: {
    stem: 'Write a program that reads 2 matrices *of integer*, say M1 (effective sizes NBrs1 and NKol1) and M2 (effective sizes NBrs2 and NKol2). Assume the part of the program that fills both matrices has been written. Determine whether the two matrices are the same or not and print the result (free format). Equal matrices are those whose effective row and column sizes are the same and every element is the same, i.e. M1[i][j] = M2[i][j].\n\n(In this exercise the matrices are read from the input: NBrs, NKol, then the elements row by row, for M1 and then M2 in order.)',
    explanation: 'The sizes must be equal and all elements equal; use a flag and two nested loops that stop when a difference is found. (Matrices: outside the WI1102 syllabus.)',
    hints: ['Two conditions: equal sizes, then equal contents. Which is checked first, and why?', 'Traverse the matrix with two nested loops; look for a pair of differing elements.', 'Do not access M2[i][j] if the sizes differ.'],
    work: ['Read both matrices.', 'sama = identical sizes.', 'If so: loop over rows and columns, mark False if any element differs.', 'Print the result.'],
    plan: 'sama ← (row and column sizes equal); if so traverse all i, j: if M1[i][j] ≠ M2[i][j] then sama ← false; print the result' },
    lineNotes: ['A matrix as a list of lists: NBrs1 rows × NKol1 columns.', 'The sizes are checked first: if they differ, `sama` is False and the loop does not access M2 out of bounds.', 'The row loop stops as soon as a difference is found.', 'The column loop is nested inside the row loop; `j = 0` is repeated for each row.', 'A differing pair of elements → the matrices are not equal.', 'The output format is free.'],
    wrong: ['Equal sizes are not enough: the content of every element must be equal too (M1[i][j] = M2[i][j]).', 'Only the first element is compared, and the sizes are not checked. Check the sizes and then all elements.'] },
  'kls-s10a': { en: {
    stem: 'Write a program that reads an integer matrix `M` *of integer* with effective row size `NBrs` and effective column size `NKol`. Assume the part of the program that fills the matrix has been written. Determine whether the matrix is an upper triangular matrix or not.\n\nAn upper triangular matrix is a square matrix (NBrs = NKol) with values ≠ 0 at all elements in the upper-triangle part of the matrix. Examples:\n\n- Example-1 (upper triangular, NBrs = NKol = 4): `[1 2 3 4; 0 5 6 7; 0 0 8 9; 0 0 0 10]`\n- Example-2 (not; there is a non-0 below): `[5 0 0 0; 4 5 0 0; 3 4 5 0; 2 3 4 5]`\n- Example-3 (not; NBrs ≠ NKol): a matrix of 4 rows × 5 columns `[1 2 3 4 5; 0 6 7 8 9; 0 0 10 11 12; 0 0 0 13 14]`\n- Example-4 (not; the content is not right): `[1 2 3 0; 0 5 4 7; 0 0 8 9; 0 0 0 10]`\n\n(From the examples: elements above and on the diagonal must be ≠ 0, elements below the diagonal must be 0. In this exercise the matrix is read from the input: NBrs, NKol, then the elements row by row.)',
    explanation: 'Conditions: square, elements with i ≤ j non-zero, elements with i > j zero. A flag and two nested loops that stop on a violation. (Matrices: outside the WI1102 syllabus.)',
    hints: ['Three conditions: square; above/diagonal ≠ 0; below = 0. Which can be checked first?', 'Element (i, j) is in the upper triangle if i ≤ j.', 'Use a flag and stop the loop when one condition fails.'],
    work: ['Read M, NBrs, NKol.', 'ok = (NBrs == NKol).', 'Traverse all (i, j): check the condition according to the position (i ≤ j or i > j).', 'Print the result.'],
    plan: 'ok ← (NBrs = NKol); traverse all i, j: if i ≤ j and M[i][j] = 0 → ok ← false; if i > j and M[i][j] ≠ 0 → ok ← false; print the result' },
    lineNotes: ['An NBrs × NKol matrix as a list of lists.', 'The square condition is checked first; if it fails, the loops do not run.', 'The row loop stops on a violation.', 'The nested column loop; `j = 0` in each row.', 'The upper triangle includes the diagonal (i ≤ j): the element must be ≠ 0.', 'Below the diagonal (i > j): the element must be 0.', 'The output format is free.'],
    wrong: ['Only the lower part is checked. Elements above and on the diagonal must be ≠ 0 too, and the matrix must be square (NBrs = NKol).', 'Upper-triangle elements (i ≤ j) must be ≠ 0; example-4 has a 0 above the diagonal so it is not upper triangular.'] },
}

const lsIntroEn = 'KU1102 Practice Problems (2019). For all problems (where possible), write a flowchart/pseudocode and program code in the programming language taught in class.'

for (const p of problems) {
  const pt = TR[p.id]
  if (pt?.intro) p.en = { ...p.en, intro: pt.intro }
  else if (p.intro?.startsWith(lsIntro)) p.en = { ...p.en, intro: lsIntroEn + p.intro.slice(lsIntro.length).replace('(Matriks: di luar silabus WI1102.)', '(Matrices: outside the WI1102 syllabus.)') }
  for (const part of p.parts) {
    const t = TR[part.id]
    if (!t) continue
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const q = part as any
    const zip = <T extends object>(arr: T[] | undefined, texts: string[] | undefined, key: string, what: string): void => {
      if (!texts) return
      if (!arr || arr.length !== texts.length) throw new Error(`${part.id}: ${what} count mismatch (${arr?.length} vs ${texts.length})`)
      arr.forEach((o, i) => { (o as Record<string, unknown>)[key] = texts[i] })
    }
    if (t.en) q.en = { ...q.en, ...t.en }
    if (t.rubric) q.rubric = (q.rubric as RubricRow[]).map((row) => ({ ...row }))
    zip(q.rubric, t.rubric, 'descEn', 'rubric')
    zip(q.lineNotes, t.lineNotes, 'en', 'lineNotes')
    zip(q.pseudoNotes, t.pseudoNotes, 'en', 'pseudoNotes')
    zip(q.wrong, t.wrong, 'msgEn', 'wrong')
  }
}

/* ================================== PAPERS ================================== */

export const bank: BankFile = {
  problems,
  papers: [
    {
      id: 'ku1102-2018', title: 'UTS KU1072/Pengenalan Teknologi Informasi B 2018 (predecessor course)', year: 2018, date: '2018-11-03', minutes: 120, kind: 'older' as const, lang: 'id' as const,
      note: 'Predecessor course of WI1102 (Python). Weights: Q1 30%, Q2 40%, Q3 30%. No official key is available; the answers were written by us.',
      noteId: 'Mata kuliah pendahulu WI1102 (Python). Bobot: Soal 1 30%, Soal 2 40%, Soal 3 30%. Kunci resmi tidak tersedia; jawaban disusun sendiri.',
      problems: ['k18-s1', 'k18-s2', 'k18-s3'],
    },
    {
      id: 'ku1102-2019', title: 'UTS KU1102 Pengenalan Komputasi 2019 (Stream Pemrograman)', year: 2019, date: '2019-10-26', minutes: 120, kind: 'older' as const, lang: 'id' as const,
      note: 'Predecessor course of WI1102. Weights: Q1 25%, Q2 25%, Q3 50%. Q1.A (computing systems/networks) is outside the syllabus. No official key is available.',
      noteId: 'Mata kuliah pendahulu WI1102. Bobot: Soal 1 25%, Soal 2 25%, Soal 3 50%. Soal 1.A (sistem computing/jaringan) di luar silabus. Kunci resmi tidak tersedia.',
      problems: ['k19-s1a', 'k19-s1b', 'k19-s2a', 'k19-s2b', 'k19-s3-1', 'k19-s3-2', 'k19-s3-3', 'k19-s3-4'],
    },
    {
      id: 'ku1102-2021', title: 'UTS KU1102 Pengenalan Komputasi 2021 (Stream Pemrograman)', year: 2021, date: '2021-10-30', minutes: 100, kind: 'older' as const, lang: 'id' as const,
      note: 'Predecessor course of WI1102 (Python/Matlab, online). Q2 (software for online lectures) is outside the syllabus. No official key is available.',
      noteId: 'Mata kuliah pendahulu WI1102 (Python/Matlab, daring). Soal 2 (perangkat lunak kuliah online) di luar silabus. Kunci resmi tidak tersedia.',
      problems: ['k21-s1', 'k21-s2', 'k21-s3', 'k21-s4', 'k21-s5', 'k21-s6', 'k21-s7', 'k21-s8'],
    },
    {
      id: 'ku1102-ls2019', title: 'KU1102 Latihan Soal 2019', year: 2019, kind: 'older' as const, lang: 'id' as const,
      note: 'Practice problems of the predecessor course. Q9 and Q10 (matrices) are outside the syllabus. Some input/output examples on the slides are inconsistent (Q4 and Q5); see the notes on the problems.',
      noteId: 'Soal latihan mata kuliah pendahulu. Soal 9 dan 10 (matriks) di luar silabus. Beberapa contoh masukan/keluaran pada slide tidak konsisten (Soal 4 dan 5); lihat catatan pada soal.',
      problems: ['kls-s1', 'kls-s2', 'kls-s3', 'kls-s4', 'kls-s5', 'kls-s6', 'kls-s7', 'kls-s8', 'kls-s9', 'kls-s10'],
    },
  ],
}
