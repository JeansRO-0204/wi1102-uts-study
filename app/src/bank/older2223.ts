// Older papers of the predecessor course KU1102 Pengenalan Komputasi: UTS 2022 (ku22-) and UTS 2023 (ku23-).
// Hardware/network/impact-of-computing essays (Bagian A) carry outOfScope: true; programming, robot, algorithms are in scope.
import type { BankFile, FlowBlock, LineNote, Problem, Provenance, RubricRow, SyntaxId } from '../types'

const r = String.raw

const S22 = 'UTS_KU1102_2022'
const S23 = 'UTS_KU1102_2023'

const prov = (src: string, label: string, pages: number[], year: number, oos = false): Provenance =>
  ({ kind: 'older' as const, lang: 'id' as const, src, label, pages, official: true, year, ...(oos ? { outOfScope: true } : {}) })

/** Line notes located by anchor text: [anchor, note (id), note (en), syntax?, end anchor?]. */
const N = (code: string, items: [string, string, string, SyntaxId?, string?][]): LineNote[] => items.map(([a, note, en, syntax, end]) => {
  const lines = code.split('\n')
  const i = lines.findIndex((l) => l.includes(a))
  if (i < 0) throw new Error('lineNote anchor not found: ' + a)
  let j = i
  if (end) { j = lines.findIndex((l, k) => k >= i && l.includes(end)); if (j < 0) throw new Error('lineNote end anchor not found: ' + end) }
  return { line: (i === j ? i + 1 : [i + 1, j + 1]) as number | [number, number], note, en, ...(syntax ? { syntax } : {}) }
})

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
const robotRubric: RubricRow[] = [
  { score: 4, desc: 'Urutan perintah menghasilkan bentuk yang tepat untuk semua nilai N (termasuk N = 1)', descEn: 'The command sequence draws the exact shape for every value of N (including N = 1)' },
  { score: 3.5, desc: 'Ada kesalahan kecil (mis. hitungan ulangan N-1 vs N atau arah akhir) pada sebagian nilai N', descEn: 'A small error (e.g. repeat count N-1 vs N, or the final heading) for some values of N' },
  { score: 3, desc: 'Bentuk benar tetapi perintah yang berulang ditulis berjajar tanpa Repeat, atau hanya benar untuk N tertentu', descEn: 'The shape is right but the repeated commands are written out without Repeat, or it is only right for particular N' },
  { score: 2, desc: 'Hanya sebagian bentuk yang benar (mis. satu sisi atau satu anak tangga)', descEn: 'Only part of the shape is right (e.g. one side or one step)' },
  { score: 1, desc: 'Ada aspek yang benar, tetapi bentuk secara umum salah', descEn: 'Some aspect is correct, but the shape is wrong overall' },
  { score: 0, desc: 'Tidak mengerjakan', descEn: 'Did not attempt' },
]

/* ----------------------------- judges (Python source) ----------------------------- */

/** Free output format: exactly one line saying prime / not prime (Indonesian or English wording accepted). */
const primeJudge = r`def judge(stdin, out, ref_out):
    lines = [l for l in out.strip().splitlines() if l.strip()]
    if len(lines) != 1:
        return "Print exactly one line stating whether the number is prime."
    o = lines[0].lower()
    want_not = any(w in ref_out.lower() for w in ['bukan', 'not', 'tidak'])
    got_not = any(w in o for w in ['bukan', 'not', 'tidak'])
    if want_not and not got_not:
        return "The number is not prime, but the output does not say so."
    if (not want_not) and got_not:
        return "The number is prime, but the output says it is not."
    if (not want_not) and not ('prima' in o or 'prime' in o):
        return "The output must say the number is prime."
    return None`

/** The last number printed is the answer (per-day lines before it are allowed). */
const lastNumJudge = r`import re
def judge(stdin, out, ref_out):
    f = lambda s: [float(x) for x in re.findall(r'\d+(?:\.\d+)?', s.replace(',', ''))]
    a, b = f(out), f(ref_out)
    if not a:
        return "No number was printed."
    if abs(a[-1] - b[-1]) > max(0.01, abs(b[-1]) * 1e-4):
        return "The final amount " + str(a[-1]) + " is wrong; it should be about " + str(b[-1]) + "."
    return None`

const problems: Problem[] = []

/* ================================== UTS 2022 ================================== */

const A22 = 'Bagian A. Computing System, Network, and Impact of Computing. Untuk soal 1 s.d. 3, tuliskan jawaban secara singkat, padat, tapi dengan jelas. Gunakan Bahasa Indonesia yang baik dan benar.'

problems.push({
  id: 'ku22-s1', archetype: 'concept', title: 'Soal 1 – Kecanduan game', source: prov(S22, 'Soal 1', [2], 2022, true),
  intro: A22,
  en: { title: 'Q1 – Game addiction', intro: 'Part A. Computing Systems, Networks, and Impact of Computing. For questions 1 to 3, write short, concise but clear answers. Use good and correct Indonesian.' },
  parts: [{
    id: 'ku22-s1a', kind: 'open', decks: ['D11'], topic: 'Technology addiction',
    stem: 'Kecanduan game adalah salah satu problem remaja masa kini. Sebutkan (minimal 3) cara atau kiat untuk menghindari kecanduan game.',
    answer: 'Banyak jawaban valid. Contoh: (1) batasi waktu bermain dengan jadwal dan pengatur waktu (alarm); (2) utamakan kewajiban (kuliah, tugas, tidur) sebelum bermain; (3) cari kegiatan pengganti seperti olahraga, organisasi, atau bertemu teman; (4) jangan bermain sebelum tidur dan matikan notifikasi; (5) hindari game yang mendorong belanja dalam aplikasi berlebihan; (6) minta teman/keluarga mengingatkan, dan cari bantuan profesional bila sudah mengganggu kehidupan.',
    keyPoints: ['Minimal 3 kiat yang konkret', 'Pembatasan waktu / jadwal', 'Kegiatan pengganti atau pengelolaan prioritas', 'Dukungan lingkungan atau bantuan profesional'],
    rubric: openRubric,
    explanation: 'Soal terbuka tentang dampak teknologi (di luar silabus WI1102). Jawaban dinilai dari jumlah dan kekonkretan kiat yang diberikan.',
    refs: [{ src: S22, page: 2 }],
    en: {
      stem: 'Game addiction is one of the problems of today\'s teenagers. List (at least 3) ways or tips to avoid game addiction.',
      answer: 'Many answers are valid. Examples: (1) limit playing time with a schedule and a timer (alarm); (2) put obligations (lectures, assignments, sleep) before gaming; (3) find replacement activities such as sports, student organisations, or meeting friends; (4) do not play right before sleep and turn off notifications; (5) avoid games that push heavy in-app spending; (6) ask friends/family to remind you, and seek professional help if it already disrupts your life.',
      keyPoints: ['At least 3 concrete tips', 'Time limits / a schedule', 'Replacement activities or managing priorities', 'Support from the environment or professional help'],
      explanation: 'An open question on the impact of technology (outside the WI1102 syllabus). It is marked on the number and concreteness of the tips given.',
    },
  }],
})

problems.push({
  id: 'ku22-s2', archetype: 'concept', title: 'Soal 2 – Aplikasi berbasis web untuk bidang keilmuan', source: prov(S22, 'Soal 2', [2], 2022, true),
  en: { title: 'Q2 – Web-based applications for your field of study' },
  parts: [{
    id: 'ku22-s2a', kind: 'open', decks: ['D11'], topic: 'Web applications',
    stem: 'Dengan perkembangan teknologi dalam jaringan komputer, banyak aplikasi yang dikembangkan saat ini berbasis web. Sebutkan dua aplikasi berbasis web yang bisa digunakan untuk mendukung kerja dalam bidang keilmuan Fakultas/ Sekolah Anda, dan jelaskan dengan singkat bagaimana aplikasi tersebut mendukung kerja.',
    answer: 'Banyak jawaban valid, tergantung fakultas/sekolah. Contoh untuk STEI: (1) GitHub/GitLab: menyimpan kode di server, mengatur versi, dan memungkinkan kerja sama tim lewat browser; (2) Google Colab atau Overleaf: menjalankan program Python atau menulis laporan LaTeX secara kolaboratif tanpa memasang perangkat lunak di komputer sendiri. Contoh untuk bidang lain: Google Earth Engine (FITB), Desmos/GeoGebra (FMIPA).',
    keyPoints: ['Dua aplikasi web yang berbeda dan nyata', 'Penjelasan konkret cara aplikasi mendukung pekerjaan di bidang tersebut', 'Aplikasi diakses melalui browser lewat jaringan'],
    rubric: openRubric,
    explanation: 'Soal terbuka (di luar silabus WI1102): dua aplikasi web yang relevan dengan bidang Anda, masing-masing dengan penjelasan dukungannya.',
    refs: [{ src: S22, page: 2 }],
    en: {
      stem: 'With the development of computer-network technology, many applications today are web-based. Name two web-based applications that can support work in the field of your Faculty/School, and briefly explain how each supports the work.',
      answer: 'Many answers are valid, depending on the faculty/school. Examples for STEI: (1) GitHub/GitLab: store code on a server, keep versions, and let a team collaborate through the browser; (2) Google Colab or Overleaf: run Python programs or write LaTeX reports collaboratively without installing software on your own computer. Examples for other fields: Google Earth Engine (FITB), Desmos/GeoGebra (FMIPA).',
      keyPoints: ['Two different, real web applications', 'A concrete explanation of how each supports work in the field', 'The applications are reached through a browser over the network'],
      explanation: 'An open question (outside the WI1102 syllabus): two web applications relevant to your field, each with an explanation of how it helps.',
    },
  }],
})

problems.push({
  id: 'ku22-s3', archetype: 'concept', title: 'Soal 3 – Akun media sosial yang lupa di-log-out', source: prov(S22, 'Soal 3', [2], 2022, true),
  en: { title: 'Q3 – A social-media account left logged in' },
  parts: [{
    id: 'ku22-s3a', kind: 'open', decks: ['D11'], topic: 'Ethics and law',
    stem: 'Suatu hari saat akan praktikum Pengenalan Komputasi, Anda menemukan komputer yang akan digunakan masih hidup dan pada browser, masih terlihat aplikasi media sosial terbuka. Anda mengenal pemilik akun yang sedang aktif pada aplikasi tersebut dan dia kebetulan adalah orang yang sangat tidak Anda sukai. Orang tersebut sering menggunakan akun media sosial ini untuk menyebarkan berita bohong (hoax). Anda berpikir, jika Anda melakukan sesuatu pada akun tersebut, misalnya mengirimkan pesan yang tidak pantas, menghapus file dan gambar, dan lain-lain., banyak orang yang akan merasa senang, bahkan berterima kasih pada Anda ☺Lagipula salah dia sendiri tidak log-out dengan baik dari aplikasi tersebut di komputer umum. Apa yang akan Anda lakukan?',
    answer: 'Jawaban yang diharapkan: tidak menyalahgunakan akun tersebut. Cukup log-out (tutup sesi) akun itu tanpa membaca atau mengubah apa pun, dan bila perlu beri tahu pemiliknya atau asisten/pengawas lab agar ia mengganti kata sandi. Argumen: (1) mengakses dan mengubah akun orang lain tanpa izin melanggar etika dan hukum (UU ITE, akses ilegal dan manipulasi data), walaupun pemiliknya lalai; (2) kesalahan orang lain (menyebarkan hoax) tidak membenarkan kita berbuat salah; hoax ditangani dengan melaporkannya lewat jalur resmi; (3) tindakan kita bisa menimbulkan konsekuensi hukum bagi diri sendiri.',
    keyPoints: ['Tidak menyalahgunakan akun (tidak mengirim pesan / menghapus data)', 'Log-out atau beri tahu pemilik/pengawas', 'Argumen etika dan hukum (akses tanpa izin, UU ITE)', 'Kesalahan orang lain tidak membenarkan tindakan sendiri; laporkan hoax lewat jalur resmi'],
    rubric: openRubric,
    explanation: 'Soal etika (di luar silabus WI1102). Pilihan yang benar sudah jelas; nilai ditentukan oleh kualitas argumen.',
    refs: [{ src: S22, page: 2 }],
    en: {
      stem: 'One day, before a Pengenalan Komputasi practicum, you find that the computer you are going to use is still on and a social-media application is still open in the browser. You know the owner of the active account, and he happens to be someone you strongly dislike. This person often uses this account to spread false news (hoaxes). You think that if you did something to the account, for example sending inappropriate messages or deleting files and pictures, many people would be happy and even thank you ☺ Besides, it is his own fault for not logging out properly from the application on a public computer. What would you do?',
      answer: 'Expected answer: do not misuse the account. Simply log out (close the session) without reading or changing anything and, if needed, tell the owner or the lab assistant/proctor so that he changes his password. Arguments: (1) accessing and changing someone else\'s account without permission violates ethics and the law (the ITE Law: illegal access and data manipulation), even if the owner was careless; (2) someone else\'s wrongdoing (spreading hoaxes) does not justify our own; hoaxes are dealt with by reporting them through official channels; (3) our action could have legal consequences for ourselves.',
      keyPoints: ['Do not misuse the account (no messages sent, no data deleted)', 'Log out or tell the owner/proctor', 'Ethical and legal arguments (unauthorised access, ITE Law)', 'Another person\'s wrongdoing does not justify ours; report hoaxes through official channels'],
      explanation: 'An ethics question (outside the WI1102 syllabus). The right choice is clear; the mark depends on the quality of the argument.',
    },
  }],
})

problems.push({
  id: 'ku22-s4', archetype: 'robot', title: 'Soal 4 – Robot mini: lintasan A ke B pada denah', source: prov(S22, 'Soal 4', [3, 4], 2022),
  intro: 'Bagian B. Berpikir Komputasional & Algoritmik. Sebuah robot mini bergerak dari titik A menuju titik B pada lintasan yang telah disediakan. Berikut adalah daftar perintah yang dapat dilakukan oleh robot.\n\n| Perintah | Arti |\n|---|---|\n| `Forward` | Maju 1 langkah |\n| `TurnLeft d` | Berputar/rotasi sebesar d derajat ke kiri. Asumsi 0 <= d <= 360. Jika d = 0 atau 360, maka robot tidak berubah arah. |\n| `TurnRight d` | Berputar/rotasi sebesar d derajat ke kanan. Asumsi 0 <= d <= 360. Jika d = 0 atau 360, maka robot tidak berubah arah. |\n| `Repeat n (perintah)` | Mengulang perintah sebanyak n kali. Asumsikan: n >= 0. Jika n = 0, maka perintah tidak dilakukan sama sekali. |\n\nBeberapa informasi tambahan:\n- Asumsi: Di awal, robot berada di posisi A dan robot menghadap ke kanan/timur (perhatikan gambar).\n- Lintasan yang dibentuk/dilewati oleh robot hanya boleh berada di dalam area denah saja.\n- Jika robot harus melalui lintasan dengan penghalang/obstacle, maka robot harus melewatinya dengan membentuk lintasan parabolik.\n- Robot menerima rangkaian perintah yang dituliskan dalam urutan yang masing-masing dipisahkan sebuah koma (kecuali untuk perintah terakhir). Rangkaian perintah dapat dituliskan menyamping, atau dapat juga dituliskan ke bawah, dan dapat juga dikombinasikan dengan spasi dan indentasi untuk memperjelas penulisan.\n- Parameter perintah pada perintah repeat terdiri atas perintah-perintah yang bisa dijalankan oleh robot dan bisa terdiri atas lebih dari 1 perintah.\n\nContoh 1: `forward, turn L 45, forward, turn R 45` (maju 1 langkah ke kanan, berputar kiri 45 derajat, maju 1 langkah, berputar kanan 45 derajat; setiap segmen garis diasumsikan 1 satuan gerakan). Contoh 2: `repeat 180 (forward, turn L 1)` (robot menggambar setengah lingkaran).',
  figures: [{ src: S22, page: 3 }, { src: S22, page: 4 }],
  en: {
    title: 'Q4 – Mini robot: path from A to B on a map',
    intro: 'Part B. Computational and Algorithmic Thinking. A mini robot moves from point A to point B along a prepared track. The commands the robot can perform are listed below.\n\n| Command | Meaning |\n|---|---|\n| `Forward` | Move forward 1 step |\n| `TurnLeft d` | Rotate d degrees to the left. Assume 0 <= d <= 360. If d = 0 or 360, the robot does not change direction. |\n| `TurnRight d` | Rotate d degrees to the right. Assume 0 <= d <= 360. If d = 0 or 360, the robot does not change direction. |\n| `Repeat n (command)` | Repeat the command n times. Assume n >= 0. If n = 0, the command is not executed at all. |\n\nAdditional information:\n- Assumption: at the start, the robot is at position A and faces right/east (see the figure).\n- The path formed/travelled by the robot may only lie inside the map area.\n- If the robot has to cross a path with an obstacle, it must pass it by forming a parabolic path.\n- The robot receives a sequence of commands written in order, each separated by a comma (except the last). The sequence can be written sideways or downwards, and combined with spaces and indentation for clarity.\n- The parameter of the repeat command consists of commands the robot can execute and may contain more than 1 command.\n\nExample 1: `forward, turn L 45, forward, turn R 45` (forward 1 step to the right, rotate left 45 degrees, forward 1 step, rotate right 45 degrees; every line segment is assumed to be 1 unit of movement). Example 2: `repeat 180 (forward, turn L 1)` (the robot draws a half circle).',
  },
  parts: [
    {
      id: 'ku22-s4a', kind: 'open', label: 'a', decks: ['D02'], topic: 'Shortest route on a map with constraints',
      stem: 'Gambarkan lintasan terpendek yang mungkin dilewati robot untuk begerak dari titik A ke B.',
      figures: [{ src: S22, page: 3 }],
      answer: 'Baca denah sebagai kisi 3 x 3 (A di pojok kiri bawah, B di pojok kanan atas, arah U = atas). Tanda "No Enter" tidak boleh dilalui; balok hitam (obstacle) boleh dilalui hanya dengan lintasan parabolik. Dengan koordinat (x, y), A = (0,0) dan B = (3,3):\n\n- Dari (0,0) maju ke kanan melewati obstacle ke (1,0) (parabola), lalu lurus ke (2,0).\n- Dari (2,0) naik ke (2,1), lalu ke kanan melewati obstacle ke (3,1) (parabola). (Alternatif sama panjang: dari (2,0) lurus ke (3,0), lalu naik melewati obstacle ke (3,1).)\n- Naik lurus dari (3,1) ke (3,2).\n- Dari (3,2) ke kiri melewati obstacle ke (2,2) (parabola), lalu lurus ke (1,2).\n- Dari (1,2) naik melewati obstacle ke (1,3) (parabola).\n- Dari (1,3) ke kanan lurus melalui (2,3) ke B = (3,3).\n\nTotal 10 satuan segmen dengan 4 lompatan obstacle. Rute ini praktis satu-satunya yang tidak melewati tanda No Enter: satu-satunya segmen vertikal bebas pada ketinggian 1 sampai 2 adalah di kolom paling kanan, dan satu-satunya cara naik ke baris paling atas adalah lewat obstacle di kolom kedua. Catatan: letak ikon pada gambar dibaca dari gambar halaman 3; Anda boleh berasumsi lain asal dituliskan (soal meminta asumsi ditulis).',
      keyPoints: ['Lintasan tidak melewati tanda No Enter', 'Setiap obstacle dilewati dengan busur parabola', 'Lintasan tetap di dalam denah', 'Lintasan berakhir di B dan terpendek menurut asumsi yang ditulis'],
      rubric: [
        { score: 4, desc: 'Lintasan terpendek yang valid: tidak melewati No Enter, obstacle dilewati dengan parabola, berakhir di B', descEn: 'A valid shortest path: avoids No Enter, obstacles crossed with a parabola, ends at B' },
        { score: 3.5, desc: 'Lintasan valid dan hampir terpendek; ada kesalahan kecil (mis. satu parabola tidak digambar)', descEn: 'A valid, nearly shortest path; a small error (e.g. one parabola not drawn)' },
        { score: 3, desc: 'Lintasan valid tetapi bukan yang terpendek', descEn: 'A valid path but not the shortest' },
        { score: 2, desc: 'Lintasan melanggar satu aturan (No Enter, keluar denah, atau obstacle tanpa parabola)', descEn: 'The path breaks one rule (No Enter, leaves the map, or an obstacle without a parabola)' },
        { score: 1, desc: 'Ada aspek yang benar, tetapi lintasan tidak sampai ke B atau melanggar banyak aturan', descEn: 'Some aspect is correct, but the path does not reach B or breaks many rules' },
        { score: 0, desc: 'Tidak mengerjakan', descEn: 'Did not attempt' },
      ],
      hints: ['Tandai dulu semua ruas yang tidak boleh dilalui (No Enter). Dari A, ruas mana yang masih terbuka?', 'Cari ruas mana saja yang bisa dipakai untuk naik dari ketinggian 1 ke 2, dan dari 2 ke 3.', 'Hitung jumlah segmen total, lalu bandingkan dua rute yang sama panjang.'],
      work: ['Tandai ruas No Enter (tidak boleh) dan ruas obstacle (boleh, dengan parabola).', 'Dari A, satu-satunya cara maju adalah ke kanan; sampai di (3,1) lewat bawah.', 'Naik ke (3,2) lewat ruas bebas.', 'Dari (3,2) ke kiri sampai (1,2), naik lewat obstacle ke (1,3).', 'Ke kanan lurus sampai B.'],
      explanation: 'Ini soal pencarian rute dengan batasan: ruas No Enter dilarang, obstacle hanya boleh dilewati dengan parabola. Jawaban cukup berupa gambar; di sini ditulis sebagai urutan titik. Jawaban lain yang valid dan sama panjang juga benar.',
      refs: [{ src: S22, page: 3 }],
      en: {
        stem: 'Draw the shortest possible path the robot can take to move from point A to B.',
        answer: 'Read the map as a 3 x 3 grid (A at the bottom-left corner, B at the top-right corner, U = up). "No Enter" signs may not be crossed; black blocks (obstacles) may only be passed with a parabolic path. With coordinates (x, y), A = (0,0) and B = (3,3):\n\n- From (0,0) go right over the obstacle to (1,0) (parabola), then straight to (2,0).\n- From (2,0) go up to (2,1), then right over the obstacle to (3,1) (parabola). (An equally long alternative: from (2,0) straight to (3,0), then up over the obstacle to (3,1).)\n- Go straight up from (3,1) to (3,2).\n- From (3,2) go left over the obstacle to (2,2) (parabola), then straight to (1,2).\n- From (1,2) go up over the obstacle to (1,3) (parabola).\n- From (1,3) go straight right through (2,3) to B = (3,3).\n\nA total of 10 unit segments with 4 obstacle hops. This is practically the only route that avoids the No Enter signs: the only free vertical segment between heights 1 and 2 is in the rightmost column, and the only way up to the top row is over the obstacle in the second column. Note: the icon positions were read from the figure on page 3; you may assume otherwise as long as you write down your assumption (the question asks for assumptions to be stated).',
        keyPoints: ['The path does not cross any No Enter sign', 'Every obstacle is crossed with a parabolic arc', 'The path stays inside the map', 'The path ends at B and is the shortest under the stated assumptions'],
        hints: ['First mark every segment that may not be crossed (No Enter). Which segments are still open from A?', 'Find which segments can be used to go up from height 1 to 2, and from 2 to 3.', 'Count the total number of segments, then compare two routes of equal length.'],
        work: ['Mark the No Enter segments (forbidden) and the obstacle segments (allowed, with a parabola).', 'From A the only way forward is right; reach (3,1) along the bottom.', 'Go up to (3,2) along the free segment.', 'From (3,2) go left to (1,2), then up over the obstacle to (1,3).', 'Go straight right to B.'],
        explanation: 'This is a route-finding problem with constraints: No Enter segments are forbidden and obstacles may only be crossed with a parabola. A drawing is enough as the answer; here it is written as a sequence of points. Another valid route of the same length is also correct.',
      },
    },
    {
      id: 'ku22-s4b', kind: 'open', label: 'b', decks: ['D02'], topic: 'Robot command sequence',
      stem: 'Tuliskan urutan perintah untuk membuat lintasan robot pada soal (a).',
      figures: [{ src: S22, page: 3 }],
      answer: 'Banyak jawaban valid. Satu lompatan parabola dapat ditulis sebagai busur dua segmen (jika lengkung halus diperlukan, gunakan `repeat k (forward, turn L 1)` seperti pada Contoh 2). Definisikan LOMPAT = `TurnLeft 45, Forward, TurnRight 90, Forward, TurnLeft 45` (naik miring lalu turun miring, arah akhir sama dengan arah awal). Dengan robot menghadap timur di A:\n\n```\nLOMPAT,                      // melewati obstacle (0,0)->(1,0)\nForward,                     // (1,0)->(2,0)\nTurnLeft 90, Forward,        // naik ke (2,1)\nTurnRight 90, LOMPAT,        // ke kanan melewati obstacle ke (3,1)\nTurnLeft 90, Forward,        // naik ke (3,2)\nTurnLeft 90, LOMPAT,         // ke kiri melewati obstacle ke (2,2)\nForward,                     // ke (1,2)\nTurnRight 90, LOMPAT,        // naik melewati obstacle ke (1,3)\nTurnRight 90,\nRepeat 2 (Forward)           // ke B\n```\n\nSetiap LOMPAT diganti dengan lima perintah di atas bila ditulis lengkap. Catatan: ukuran lengkungan tidak ditentukan soal; yang dinilai adalah urutan belokan, banyak langkah, dan penggunaan Repeat.',
      keyPoints: ['Perintah sesuai lintasan pada (a) dan konsisten dengan arah awal (timur)', 'Belok 90 derajat tepat pada perubahan arah', 'Obstacle dilewati dengan rangkaian belok miring (parabola)', 'Pengulangan dengan Repeat bila ada langkah berurutan'],
      rubric: [
        { score: 4, desc: 'Urutan perintah sesuai lintasan pada (a), arah dan jumlah langkah benar, obstacle dilewati dengan parabola, memakai Repeat bila relevan', descEn: 'The commands match the path in (a), headings and step counts are right, obstacles are crossed with a parabola, Repeat is used where relevant' },
        { score: 3.5, desc: 'Hampir benar; ada kesalahan kecil (mis. satu belokan atau satu langkah)', descEn: 'Almost correct; a small error (e.g. one turn or one step)' },
        { score: 3, desc: 'Urutan benar untuk sebagian besar lintasan, tetapi satu bagian (mis. satu parabola) salah', descEn: 'Right for most of the path, but one part (e.g. one parabola) is wrong' },
        { score: 2, desc: 'Hanya sebagian lintasan yang benar', descEn: 'Only part of the path is right' },
        { score: 1, desc: 'Ada aspek yang benar, tetapi urutan secara umum salah', descEn: 'Some aspect is correct, but the sequence is wrong overall' },
        { score: 0, desc: 'Tidak mengerjakan', descEn: 'Did not attempt' },
      ],
      hints: ['Mulailah dari arah awal (timur). Setiap perubahan arah butuh TurnLeft atau TurnRight.', 'Tulis dulu satu "lompatan" parabola sebagai potongan perintah yang bisa dipakai ulang.', 'Dua Forward berurutan boleh ditulis Repeat 2 (Forward).'],
      work: ['Tentukan potongan LOMPAT (arah akhir sama dengan arah awal).', 'Terjemahkan lintasan (a) ruas demi ruas, lacak arah robot.', 'Pastikan setiap belokan memakai sudut 90 derajat.', 'Ringkas langkah berurutan dengan Repeat.'],
      explanation: 'Setiap ruas pada (a) diterjemahkan menjadi Forward atau LOMPAT; belokan 90 derajat dipakai saat berubah arah. Karena lengkung tidak ditentukan ukurannya, jawaban yang menghasilkan lintasan yang sama secara logis dianggap benar.',
      refs: [{ src: S22, page: 3 }, { src: S22, page: 4 }],
      en: {
        stem: 'Write the sequence of commands that makes the robot follow the path in (a).',
        answer: 'Many answers are valid. One parabolic hop can be written as a two-segment arc (if a smooth curve is needed, use `repeat k (forward, turn L 1)` as in Example 2). Define HOP = `TurnLeft 45, Forward, TurnRight 90, Forward, TurnLeft 45` (up diagonally then down diagonally; the final heading equals the starting heading). With the robot facing east at A:\n\n```\nHOP,                         // over the obstacle (0,0)->(1,0)\nForward,                     // (1,0)->(2,0)\nTurnLeft 90, Forward,        // up to (2,1)\nTurnRight 90, HOP,           // right over the obstacle to (3,1)\nTurnLeft 90, Forward,        // up to (3,2)\nTurnLeft 90, HOP,            // left over the obstacle to (2,2)\nForward,                     // to (1,2)\nTurnRight 90, HOP,           // up over the obstacle to (1,3)\nTurnRight 90,\nRepeat 2 (Forward)           // to B\n```\n\nWrite each HOP out as the five commands above. Note: the size of the arc is not specified by the question; what is marked is the order of turns, the number of steps, and the use of Repeat.',
        keyPoints: ['Commands match the path in (a) and are consistent with the starting heading (east)', 'Exactly 90-degree turns at the changes of direction', 'Obstacles are crossed with a sequence of diagonal turns (parabola)', 'Repeat used where steps repeat in a row'],
        hints: ['Start from the initial heading (east). Every change of direction needs TurnLeft or TurnRight.', 'First write one parabolic "hop" as a reusable block of commands.', 'Two Forwards in a row may be written as Repeat 2 (Forward).'],
        work: ['Fix the HOP block (final heading equals the starting heading).', 'Translate the path from (a) segment by segment, tracking the robot\'s heading.', 'Make sure every turn uses a 90-degree angle.', 'Compress consecutive steps with Repeat.'],
        explanation: 'Every segment in (a) becomes a Forward or a HOP; 90-degree turns are used when the direction changes. Because the size of the arc is not specified, an answer that logically produces the same path counts as correct.',
      },
    },
  ],
})

const C22 = 'Bagian C. Algoritma dan Pemrograman. Untuk soal Bagian C: buatlah program dalam bahasa pemrograman sesuai dengan yang diajarkan di kelas. Bonus (hanya dinilai jika program dibuat, tidak perlu dibuat jika beresiko kehabisan waktu): buatlah flowchart/pseudocode untuk persoalan tersebut (pilih salah satu saja sesuai yang ditekankan di kelas).'
const C22en = 'Part C. Algorithms and Programming. For the Part C questions: write the program in the programming language taught in class. Bonus (only marked if the program is written; skip it if you risk running out of time): write a flowchart/pseudocode for the problem (choose only one, according to what was emphasised in class).'

/* ---- Soal 5: warna spektrum ---- */

const k22_5 = r`# Program WarnaSpektrum
# Menentukan warna dari panjang gelombang w (nm, integer); di luar 380-750 -> "Warna tidak terdefinisi"
# DECLARATIONS
# w : int
# ALGORITHM
w = int(input())
if (w < 380 or w > 750):
    print("Warna tidak terdefinisi")
elif (w <= 450):
    print("Ungu")
elif (w <= 495):
    print("Biru")
elif (w <= 570):
    print("Hijau")
elif (w <= 590):
    print("Kuning")
elif (w <= 620):
    print("Jingga")
else:
    print("Merah")`
const k22_5p = r`Program WarnaSpektrum
{ Menentukan warna dari panjang gelombang w (nm); di luar 380-750 -> "Warna tidak terdefinisi" }
KAMUS
  w : integer
ALGORITMA
  input(w)
  if w < 380 or w > 750 then
    output("Warna tidak terdefinisi")
  else
    if w <= 450 then
      output("Ungu")
    else
      if w <= 495 then
        output("Biru")
      else
        if w <= 570 then
          output("Hijau")
        else
          if w <= 590 then
            output("Kuning")
          else
            if w <= 620 then
              output("Jingga")
            else
              output("Merah")`
const chain = (cs: [string, string][], last: string): FlowBlock => ({
  t: 'if', cond: cs[0][0], then: [{ t: 'io', dir: 'out', text: `output("${cs[0][1]}")` }],
  else: cs.length > 1 ? [chain(cs.slice(1), last)] : [{ t: 'io', dir: 'out', text: `output("${last}")` }],
})
const k22_5flow: FlowBlock[] = [
  { t: 'io', dir: 'in', text: 'input(w)' },
  chain([['w < 380 or w > 750', 'Warna tidak terdefinisi'], ['w <= 450', 'Ungu'], ['w <= 495', 'Biru'], ['w <= 570', 'Hijau'], ['w <= 590', 'Kuning'], ['w <= 620', 'Jingga']], 'Merah'),
]
const k22_5w = (rest: string) => 'w = int(input())\n' + rest

problems.push({
  id: 'ku22-s5', archetype: 'program', title: 'Soal 5 – Warna dari panjang gelombang', source: prov(S22, 'Soal 5', [5], 2022),
  intro: C22,
  en: { title: 'Q5 – Colour from wavelength', intro: C22en },
  parts: [{
    id: 'ku22-s5a', kind: 'program', decks: ['D05'], topic: 'Range branching with if-elif', patterns: ['if-elif'], misconceptions: ['off-by-one', 'not-complete'],
    stem: 'Spektrum optik adalah spektrum yang kontinyu sehingga tidak ada batas yang jelas antara satu warna dengan warna yang lainnya. Meskipun demikian, manusia dapat memberikan batas kira-kira untuk warna-warna spektrum yang berbeda-beda. Tabel berikut memberikan rentang panjang gelombang dari suatu warna yang dilihat oleh mata manusia normal. Data disesuaikan untuk kepentingan soal.\n\n| Warna | Panjang gelombang (dalam nm) |\n|---|---|\n| Ungu | 380 - 450 |\n| Biru | 451 - 495 |\n| Hijau | 496 - 570 |\n| Kuning | 571 - 590 |\n| Jingga | 591 - 620 |\n| Merah | 621 - 750 |\n\nBuatlah sebuah program yang menerima masukan berupa panjang gelombang dalam nm (bertipe integer) dan menuliskan ke layar warna sesuai dengan panjang gelombangnya sesuai dengan deskripsi di atas. Jika masukan di luar rentang yang telah didefinisikan, dituliskan pesan kesalahan "Warna tidak terdefinisi".\n\nContoh masukan dan keluaran:\n\n| Masukan Panjang Gelombang | Keluaran |\n|---|---|\n| 495 | Biru |\n| 250 | Warna tidak terdefinisi |',
    reps: ['python', 'pseudo', 'flow'], match: 'lenient', rubric: progRubric,
    solution: { python: k22_5, pseudo: k22_5p, flow: { title: 'WarnaSpektrum', blocks: k22_5flow } },
    tests: [{ stdin: ['495'] }, { stdin: ['250'], edge: 'below 380: undefined' }, { stdin: ['380'], edge: 'lower bound of Ungu' }, { stdin: ['450'], edge: 'Ungu/Biru border' }, { stdin: ['451'], edge: 'Biru/Ungu border' }, { stdin: ['621'], edge: 'lower bound of Merah' }, { stdin: ['751'], edge: 'above 750: undefined' }],
    wrong: [
      { code: k22_5w('if (w < 380 or w > 750):\n    print("Warna tidak terdefinisi")\nelif (w < 450):\n    print("Ungu")\nelif (w < 495):\n    print("Biru")\nelif (w < 570):\n    print("Hijau")\nelif (w < 590):\n    print("Kuning")\nelif (w < 620):\n    print("Jingga")\nelse:\n    print("Merah")'), msg: 'Batas atas tiap rentang termasuk dalam warnanya (450 masih Ungu, 495 masih Biru). Gunakan `<=`, bukan `<`.', msgEn: 'The upper bound of each range belongs to its colour (450 is still Ungu, 495 is still Biru). Use `<=`, not `<`.', tag: 'off-by-one' },
      { code: k22_5w('if (w <= 450):\n    print("Ungu")\nelif (w <= 495):\n    print("Biru")\nelif (w <= 570):\n    print("Hijau")\nelif (w <= 590):\n    print("Kuning")\nelif (w <= 620):\n    print("Jingga")\nelse:\n    print("Merah")'), msg: 'Masukan di luar 380-750 belum ditangani: 250 menjadi "Ungu" dan 751 menjadi "Merah". Periksa rentang yang valid lebih dulu.', msgEn: 'Input outside 380-750 is not handled: 250 becomes "Ungu" and 751 becomes "Merah". Test the valid range first.', tag: 'not-complete' },
      { code: k22_5w('if (w >= 380 and w <= 450):\n    print("Ungu")\nelif (w > 451 and w <= 495):\n    print("Biru")\nelif (w > 495 and w <= 570):\n    print("Hijau")\nelif (w > 570 and w <= 590):\n    print("Kuning")\nelif (w > 590 and w <= 620):\n    print("Jingga")\nelif (w > 620 and w <= 750):\n    print("Merah")\nelse:\n    print("Warna tidak terdefinisi")'), msg: 'Rentang Biru dimulai dari 451 (termasuk). Dengan `w > 451` nilai 451 jatuh ke "Warna tidak terdefinisi". Gunakan `>= 451` atau batas atas elif sebelumnya.', msgEn: 'The Biru range starts at 451 (inclusive). With `w > 451`, 451 falls into "Warna tidak terdefinisi". Use `>= 451` or rely on the previous elif.', tag: 'off-by-one' },
    ],
    plan: 'baca w; jika w di luar 380..750: tulis pesan; selain itu, periksa batas atas dari kecil ke besar: <=450 Ungu, <=495 Biru, <=570 Hijau, <=590 Kuning, <=620 Jingga, selebihnya Merah',
    skeleton: 'w = int(input())\nif (w < ___ or w > ___):\n    print("Warna tidak terdefinisi")\nelif (w <= ___):\n    print("Ungu")\n# ... Biru, Hijau, Kuning, Jingga\nelse:\n    print("___")',
    hints: ['Rentang valid hanya 380 sampai 750. Bagian mana yang sebaiknya diperiksa lebih dulu?', 'Karena rentangnya berurutan tanpa celah (450 lalu 451), cukup periksa batas atas dari yang terkecil dengan elif.', 'Perhatikan batas yang termasuk: 450 Ungu, 451 Biru. Pakai `<=`.'],
    work: ['Baca w dengan `int(input())`.', 'Jika w < 380 atau w > 750 tulis "Warna tidak terdefinisi".', 'Selain itu periksa dengan elif: <= 450 Ungu, <= 495 Biru, <= 570 Hijau, <= 590 Kuning, <= 620 Jingga.', 'Sisanya (621..750) adalah Merah.'],
    syntax: ['input', 'if-elif', 'relational-logical'],
    lineNotes: N(k22_5, [
      ['w = int', 'Panjang gelombang bertipe integer, jadi `int(input())`.', 'The wavelength is an integer, so `int(input())`.', 'input'],
      ['if (w < 380', 'Periksa dulu masukan di luar rentang valid; `or` karena salah satu sisi cukup membuatnya tidak valid.', 'Test the invalid input first; `or` because either side alone makes it invalid.', 'relational-logical'],
      ['elif (w <= 450', 'Karena w sudah pasti 380..750, cukup periksa batas atas; 450 termasuk Ungu sehingga `<=`.', 'Since w is already known to be 380..750, only the upper bound needs checking; 450 is Ungu, hence `<=`.', 'if-elif'],
      ['elif (w <= 495', 'Sampai di sini w >= 451, jadi rentang Biru 451-495 otomatis terpenuhi.', 'Reaching here means w >= 451, so the Biru range 451-495 is satisfied automatically.'],
      ['elif (w <= 570', 'Hijau 496-570 dengan alasan yang sama.', 'Hijau 496-570 for the same reason.'],
      ['elif (w <= 590', 'Kuning 571-590.', 'Kuning 571-590.'],
      ['elif (w <= 620', 'Jingga 591-620.', 'Jingga 591-620.'],
      ['else:', 'Sisanya 621..750 adalah Merah (751 ke atas sudah tertangkap di cabang pertama).', 'The rest, 621..750, is Merah (751 and above was caught in the first branch).'],
    ]),
    pseudoNotes: N(k22_5p, [
      ['if w < 380', 'Cabang pertama: di luar rentang valid.', 'First branch: outside the valid range.'],
      ['if w <= 450', 'Rantai percabangan bersarang: tiap else berisi pengujian batas atas berikutnya.', 'A chain of nested branches: each else holds the next upper-bound test.'],
      ['output("Merah")', 'Cabang terakhir tanpa kondisi: 621..750.', 'The last branch needs no condition: 621..750.'],
    ]),
    explanation: 'Rentang warna berurutan tanpa celah, jadi cukup satu rantai if-elif yang memeriksa batas atas dari kecil ke besar setelah memastikan w berada di 380..750. Kesalahan klasik: `<` bukan `<=` pada batas (450, 495, ...), dan lupa menangani masukan di luar rentang. Keluaran "Warna tidak terdefinisi" adalah pesan yang ditetapkan soal.',
    refs: [{ src: S22, page: 5 }],
    en: {
      stem: 'The optical spectrum is continuous, so there is no clear boundary between one colour and another. Even so, humans can give approximate boundaries for the different spectral colours. The following table gives the wavelength range of a colour as seen by a normal human eye. The data is adjusted for the purposes of this question.\n\n| Colour | Wavelength (in nm) |\n|---|---|\n| Ungu (violet) | 380 - 450 |\n| Biru (blue) | 451 - 495 |\n| Hijau (green) | 496 - 570 |\n| Kuning (yellow) | 571 - 590 |\n| Jingga (orange) | 591 - 620 |\n| Merah (red) | 621 - 750 |\n\nWrite a program that reads a wavelength in nm (integer) and prints the colour matching that wavelength according to the description above. If the input is outside the defined ranges, print the error message "Warna tidak terdefinisi" ("colour not defined").\n\nSample input and output:\n\n| Wavelength input | Output |\n|---|---|\n| 495 | Biru |\n| 250 | Warna tidak terdefinisi |',
      plan: 'read w; if w is outside 380..750: print the message; otherwise test the upper bounds from small to large: <=450 Ungu, <=495 Biru, <=570 Hijau, <=590 Kuning, <=620 Jingga, otherwise Merah',
      hints: ['The valid range is only 380 to 750. Which part should be tested first?', 'Because the ranges are consecutive with no gaps (450 then 451), it is enough to test the upper bound from the smallest with elif.', 'Watch which end is included: 450 is Ungu, 451 is Biru. Use `<=`.'],
      work: ['Read w with `int(input())`.', 'If w < 380 or w > 750 print "Warna tidak terdefinisi".', 'Otherwise test with elif: <= 450 Ungu, <= 495 Biru, <= 570 Hijau, <= 590 Kuning, <= 620 Jingga.', 'The rest (621..750) is Merah.'],
      explanation: 'The colour ranges are consecutive with no gaps, so a single if-elif chain that tests the upper bounds from small to large is enough, after making sure w lies in 380..750. Classic errors: `<` instead of `<=` at the boundaries (450, 495, ...), and forgetting the out-of-range input. The output "Warna tidak terdefinisi" is the message fixed by the question.',
    },
  }],
})

/* ---- Soal 6: bilangan prima ---- */

const k22_6 = r`# Program CekPrima
# Memeriksa apakah bilangan bulat n (n > 1) prima: tidak ada pembagi selain 1 dan n
# DECLARATIONS
# n, i : int
# found : bool
# ALGORITHM
n = int(input())
found = False
for i in range(2, n):
    if (n % i == 0):
        found = True
if (found):
    print(str(n) + " bukan bilangan prima")
else:
    print(str(n) + " adalah bilangan prima")`
const k22_6p = r`Program CekPrima
{ Memeriksa apakah n (n > 1) prima: tidak ada pembagi selain 1 dan n }
KAMUS
  n, i : integer
  found : boolean
ALGORITMA
  input(n)
  found ← false
  i traversal [2..n-1]
    if n mod i = 0 then
      found ← true
  if found then
    output(n + " bukan bilangan prima")
  else
    output(n + " adalah bilangan prima")`
const k22_6flow: FlowBlock[] = [
  { t: 'io', dir: 'in', text: 'input(n)' },
  { t: 'process', text: 'found ← false' },
  { t: 'process', text: 'i ← 2' },
  { t: 'while', cond: 'i < n', body: [
    { t: 'if', cond: 'n mod i = 0', then: [{ t: 'process', text: 'found ← true' }] },
    { t: 'process', text: 'i ← i + 1' },
  ] },
  { t: 'if', cond: 'found', then: [{ t: 'io', dir: 'out', text: 'output(n + " bukan bilangan prima")' }], else: [{ t: 'io', dir: 'out', text: 'output(n + " adalah bilangan prima")' }] },
]

problems.push({
  id: 'ku22-s6', archetype: 'program', title: 'Soal 6 – Bilangan prima', source: prov(S22, 'Soal 6', [6], 2022),
  en: { title: 'Q6 – Prime numbers' },
  parts: [{
    id: 'ku22-s6a', kind: 'program', decks: ['D05'], topic: 'Divisor search with a flag', patterns: ['for-count', 'search-flag'], misconceptions: ['off-by-one', 'init-in-loop'],
    stem: 'Salah satu cara sederhana untuk memeriksa apakah sebuah bilangan bulat positif ( > 1 ) merupakan bilangan prima atau bukan adalah dengan membagi bilangan tersebut dengan bilangan 1 hingga bilangan itu sendiri. Jika bilangan tersebut habis dibagi dengan bilangan selain 1 dan bilangan itu sendiri, maka bilangan tersebut bukan bilangan prima. Sebaliknya jika bilangan tersebut tidak habis dibagi dengan bilangan selain 1 dan bilangan itu sendiri, maka termasuk bilangan prima.\n\nBuatlah program yang menerima input sebuah bilangan bulat positif (misal n, dengan asumsi n > 1), kemudian program memeriksa apakah bilang tersebut prima atau bukan dengan menggunakan pengulangan pada program. Jika bilangan tersebut prima, maka ditampilkan ke layar bahwa bilangan tersebut prima; jika bukan maka ditampilkan ke layar bahwa bilangan tersebut bukan prima. Format tampilan pada layar bebas.\n\nContoh masukan dan keluaran:\n\n| Masukan | Keluaran |\n|---|---|\n| 4 | 4 bukan bilangan prima |\n| 2 | 2 adalah bilangan prima |\n| 307 | 307 adalah bilangan prima |',
    reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: primeJudge, rubric: progRubric,
    solution: { python: k22_6, pseudo: k22_6p, flow: { title: 'CekPrima', blocks: k22_6flow } },
    tests: [{ stdin: ['4'] }, { stdin: ['2'], edge: 'n = 2: no divisor to test' }, { stdin: ['307'] }, { stdin: ['9'], edge: 'odd composite' }, { stdin: ['3'], edge: 'smallest odd prime' }],
    wrong: [
      { code: 'n = int(input())\nfound = False\nfor i in range(2, n + 1):\n    if (n % i == 0):\n        found = True\nif (found):\n    print(str(n) + " bukan bilangan prima")\nelse:\n    print(str(n) + " adalah bilangan prima")', msg: '`range(2, n + 1)` ikut menguji n itu sendiri, dan n habis dibagi n: semua bilangan jadi "bukan prima". Pembagi harus 2 sampai n−1: `range(2, n)`.', msgEn: '`range(2, n + 1)` also tests n itself, and n is divisible by n: every number becomes "not prime". Divisors must run from 2 to n−1: `range(2, n)`.', tag: 'off-by-one' },
      { code: 'n = int(input())\nfor i in range(2, n):\n    if (n % i == 0):\n        print(str(n) + " bukan bilangan prima")\n    else:\n        print(str(n) + " adalah bilangan prima")', msg: 'Keputusan diambil di dalam loop pada setiap pembagi, sehingga pesan tercetak berulang dan bisa saling bertentangan. Kumpulkan hasil dengan flag, lalu cetak sekali setelah loop.', msgEn: 'The decision is made inside the loop for every divisor, so the message prints repeatedly and can contradict itself. Collect the result in a flag, then print once after the loop.' },
      { code: 'n = int(input())\nfound = (n % 2 == 0 and n != 2)\nif (found):\n    print(str(n) + " bukan bilangan prima")\nelse:\n    print(str(n) + " adalah bilangan prima")', msg: 'Hanya menguji pembagi 2. Bilangan ganjil seperti 9 juga bisa bukan prima; ulangi untuk semua pembagi 2..n−1.', msgEn: 'This only tests the divisor 2. Odd numbers such as 9 can be non-prime too; loop over all divisors 2..n−1.' },
    ],
    plan: 'baca n; found ← false; untuk i dari 2 sampai n−1: jika n habis dibagi i maka found ← true; setelah loop: jika found tulis "bukan prima" selain itu "prima"',
    skeleton: 'n = int(input())\nfound = ___\nfor i in range(___, ___):\n    if (n % i == ___):\n        found = ___\nif (found):\n    print(str(n) + " bukan bilangan prima")\nelse:\n    print(str(n) + " adalah bilangan prima")',
    hints: ['Bilangan prima tidak punya pembagi selain 1 dan dirinya. Pembagi mana yang perlu diuji?', 'Gunakan sebuah flag untuk "ketemu pembagi" dan baru memutuskan setelah semua pembagi dicoba.', 'n = 2 tidak punya pembagi untuk diuji (range kosong): pastikan hasilnya tetap "prima".'],
    work: ['Baca n; found = False.', 'Ulangi i dari 2 sampai n−1 (`range(2, n)`).', 'Jika n % i == 0, set found = True.', 'Setelah loop: found True berarti bukan prima, selain itu prima.'],
    syntax: ['for-range', 'operators', 'if-else'],
    lineNotes: N(k22_6, [
      ['n = int', 'Masukan integer n > 1.', 'The input is an integer n > 1.', 'input'],
      ['found = False', 'Flag "ditemukan pembagi" diinisialisasi sebelum loop (bukan di dalamnya).', 'The "divisor found" flag is initialised before the loop (not inside it).'],
      ['for i in range(2, n)', 'Pembagi 2..n−1: batas atas tidak ikut, jadi n sendiri tidak diuji (n % n selalu 0). Untuk n = 2 rentangnya kosong.', 'Divisors 2..n−1: the upper bound is excluded, so n itself is not tested (n % n is always 0). For n = 2 the range is empty.', 'for-range'],
      ['if (n % i == 0)', 'Habis dibagi i berarti i adalah pembagi selain 1 dan n.', 'Divisible by i means i is a divisor other than 1 and n.', 'operators'],
      ['found = True', 'Cukup menandai; keputusan baru diambil setelah loop.', 'It is enough to mark it; the decision is made after the loop.'],
      ['if (found)', 'Cetak sekali: str(n) wajib untuk digabung dengan string.', 'Print once: `str(n)` is required to join with a string.', 'print-str', 'adalah bilangan prima'],
    ]),
    pseudoNotes: N(k22_6p, [
      ['found ← false', 'Inisialisasi flag sebelum pengulangan.', 'Initialise the flag before the loop.'],
      ['i traversal [2..n-1]', 'Rentang inklusif 2..n−1.', 'An inclusive range 2..n−1.'],
      ['if n mod i = 0', 'mod = sisa bagi; 0 berarti habis dibagi.', 'mod is the remainder; 0 means divisible.'],
      ['if found then', 'Keputusan setelah semua pembagi dicoba.', 'The decision comes after every divisor has been tried.'],
    ]),
    explanation: 'Uji pembagi 2..n−1; bila ada yang habis membagi n, n bukan prima. Gunakan flag lalu cetak sekali setelah loop. Format keluaran bebas: yang diperiksa adalah arti pesannya (prima / bukan prima). Catatan: deskripsi soal menyebut membagi dengan 1 sampai n, tetapi 1 dan n tidak perlu diuji karena selalu membagi.',
    refs: [{ src: S22, page: 6 }],
    en: {
      stem: 'A simple way to check whether a positive integer ( > 1 ) is a prime number or not is to divide it by the numbers from 1 up to the number itself. If the number is divisible by a number other than 1 and itself, then it is not a prime. Conversely, if it is not divisible by any number other than 1 and itself, it is a prime.\n\nWrite a program that reads a positive integer (say n, assuming n > 1), then checks whether it is prime or not using a loop. If the number is prime, display on screen that it is prime; if not, display that it is not prime. The display format is free.\n\nSample input and output:\n\n| Input | Output |\n|---|---|\n| 4 | 4 bukan bilangan prima (4 is not a prime number) |\n| 2 | 2 adalah bilangan prima (2 is a prime number) |\n| 307 | 307 adalah bilangan prima (307 is a prime number) |',
      plan: 'read n; found ← false; for i from 2 to n−1: if n is divisible by i then found ← true; after the loop: if found print "not prime" otherwise "prime"',
      hints: ['A prime has no divisor other than 1 and itself. Which divisors need testing?', 'Use a flag for "divisor found" and decide only after all divisors have been tried.', 'n = 2 has no divisor to test (empty range): make sure the result is still "prime".'],
      work: ['Read n; found = False.', 'Loop i from 2 to n−1 (`range(2, n)`).', 'If n % i == 0, set found = True.', 'After the loop: found True means not prime, otherwise prime.'],
      explanation: 'Test the divisors 2..n−1; if any divides n, n is not prime. Use a flag and print once after the loop. The output format is free: what is checked is the meaning of the message (prime / not prime). Note: the question says to divide by 1 up to n, but 1 and n need not be tested since they always divide.',
    },
  }],
})

/* ---- Soal 7: TP/TN/FP/FN ---- */

const k22_7 = r`# Program Konfusi
# Membandingkan array observasi D1 dan prediksi D2 (elemen -1 atau 1): hitung TP, TN, FP, FN dan akurasi
# DECLARATIONS
# N, i : int
# D1, D2 : array [0..N-1] of int
# TP, TN, FP, FN : int
# akurasi : float
# ALGORITHM
N = int(input())
D1 = [0 for i in range(N)]
D2 = [0 for i in range(N)]
for i in range(N):
    D1[i] = int(input())
for i in range(N):
    D2[i] = int(input())
TP = 0
TN = 0
FP = 0
FN = 0
for i in range(N):
    if (D1[i] == 1 and D2[i] == 1):
        TP = TP + 1
    elif (D1[i] == -1 and D2[i] == -1):
        TN = TN + 1
    elif (D1[i] == -1 and D2[i] == 1):
        FP = FP + 1
    else:
        FN = FN + 1
akurasi = (TP + TN) / (TP + TN + FP + FN)
print("TP = " + str(TP))
print("TN = " + str(TN))
print("FP = " + str(FP))
print("FN = " + str(FN))
print("Akurasi = " + str(akurasi))`
const k22_7p = r`Program Konfusi
{ Membandingkan observasi D1 dan prediksi D2 (elemen -1 atau 1): TP, TN, FP, FN, akurasi }
KAMUS
  N, i : integer
  D1, D2 : array [0..N-1] of integer
  TP, TN, FP, FN : integer
  akurasi : real
ALGORITMA
  input(N)
  i traversal [0..N-1]
    input(D1[i])
  i traversal [0..N-1]
    input(D2[i])
  TP ← 0
  TN ← 0
  FP ← 0
  FN ← 0
  i traversal [0..N-1]
    if D1[i] = 1 and D2[i] = 1 then
      TP ← TP + 1
    else
      if D1[i] = -1 and D2[i] = -1 then
        TN ← TN + 1
      else
        if D1[i] = -1 and D2[i] = 1 then
          FP ← FP + 1
        else
          FN ← FN + 1
  akurasi ← (TP + TN) / (TP + TN + FP + FN)
  output("TP = " + TP)
  output("TN = " + TN)
  output("FP = " + FP)
  output("FN = " + FN)
  output("Akurasi = " + akurasi)`
const k22_7pre = 'N = int(input())\nD1 = [0 for i in range(N)]\nD2 = [0 for i in range(N)]\nfor i in range(N):\n    D1[i] = int(input())\nfor i in range(N):\n    D2[i] = int(input())\n'
const k22_7out = 'print("TP = " + str(TP))\nprint("TN = " + str(TN))\nprint("FP = " + str(FP))\nprint("FN = " + str(FN))\nprint("Akurasi = " + str(akurasi))'
const k22_7ex = ['10', '1', '-1', '-1', '1', '-1', '1', '1', '-1', '-1', '1', '1', '-1', '1', '-1', '1', '-1', '1', '-1', '-1', '1']

problems.push({
  id: 'ku22-s7', archetype: 'program', title: 'Soal 7 – TP, TN, FP, FN dan akurasi', source: prov(S22, 'Soal 7', [7], 2022),
  en: { title: 'Q7 – TP, TN, FP, FN and accuracy' },
  parts: [{
    id: 'ku22-s7a', kind: 'program', decks: ['D06'], topic: 'Comparing two arrays element by element', patterns: ['array-populate', 'array-compare', 'count-if'], misconceptions: ['init-in-loop', 'index-range'],
    stem: 'Terdapat dua buah array of integer D1 dan D2. Himpunan domain nilai pada tiap elemen D1 dan D2 adalah {-1,1}. D1 adalah data hasil observasi, dan D2 adalah data hasil prediksi, dan keduanya memiliki jumlah elemen yang sama. Buatlah program yang meminta masukan dari pengguna banyaknya elemen array berupa bilangan bulat positif (misal N, asumsi N > 0), kemudian program akan meminta pengguna mengisi array D1 dan array D2 sejumlah N elemen, dengan setiap elemen pasti berisi -1 atau 1 (asumsi masukan pengguna selalu benar). Indeks elemen array mulai dari 0 (nol). Program akan menghitung:\n\na. TP: banyaknya elemen D1 indeks ke-i yang bernilai 1 dan banyaknya elemen D2 indeks ke-i yang juga bernilai 1 (D1[i] = D2[i] = 1)\nb. TN: banyaknya elemen D1 indeks ke-i yang bernilai -1 dan banyaknya elemen D2 indeks ke-i yang juga bernilai -1 (D1[i] = D2[i] = -1)\nc. FP: banyaknya elemen D1 indeks ke-i yang bernilai -1 dan banyaknya elemen D2 indeks ke-i yang bernilai 1 (D1[i] = -1 dan D2[i] = 1)\nd. FN: banyaknya elemen D1 indeks ke-i yang bernilai 1 dan banyaknya elemen D2 indeks ke-i yang bernilai -1 (D1[i] = 1 dan D2[i] = -1)\ne. Nilai akurasi dengan formula: $Akurasi = \\frac{TP + TN}{TP + TN + FP + FN}$\n\nProgram akan menampilkan nilai TP, TN, FP, FN, dan akurasi ke layar. Contoh masukan dan keluaran:\n\n| Masukan | Keluaran |\n|---|---|\n| N = 10<br>D1 = [1, -1, -1, 1, -1, 1, 1, -1, -1, 1]<br>D2 = [1, -1, 1, -1, 1, -1, 1, -1, -1, 1] | TP = 3<br>TN = 3<br>FP = 2<br>FN = 2<br>Akurasi = 0.6 |\n\nCatatan: elemen array yang dibandingkan antara D1 dan D2 selalu elemen dengan indeks yang sama.\n\n(Urutan masukan pada latihan ini: N, lalu N elemen D1 satu per baris, lalu N elemen D2 satu per baris.)',
    reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['array'], rubric: progRubric,
    solution: { python: k22_7, pseudo: k22_7p },
    tests: [{ stdin: k22_7ex }, { stdin: ['1', '1', '1'], edge: 'N = 1, one TP' }, { stdin: ['3', '1', '1', '1', '-1', '-1', '-1'], edge: 'every element is FN' }, { stdin: ['4', '-1', '-1', '1', '1', '-1', '1', '-1', '1'], edge: 'mixed, TN/FP/FN/TP once each' }, { stdin: ['2', '-1', '1', '1', '-1'], edge: 'accuracy 0' }],
    wrong: [
      { code: k22_7pre + 'TP = 0\nTN = 0\nFP = 0\nFN = 0\nfor i in range(N):\n    if (D1[i] == 1 and D2[i] == 1):\n        TP = TP + 1\n    elif (D1[i] == -1 and D2[i] == -1):\n        TN = TN + 1\n    elif (D1[i] == -1 and D2[i] == 1):\n        FN = FN + 1\n    else:\n        FP = FP + 1\nakurasi = (TP + TN) / (TP + TN + FP + FN)\n' + k22_7out, msg: 'FP dan FN tertukar. FP: observasi D1 = -1 tetapi prediksi D2 = 1. FN: observasi D1 = 1 tetapi prediksi D2 = -1.', msgEn: 'FP and FN are swapped. FP: observed D1 = -1 but predicted D2 = 1. FN: observed D1 = 1 but predicted D2 = -1.' },
      { code: k22_7pre + 'TP = 0\nTN = 0\nFP = 0\nFN = 0\nfor i in range(N):\n    if (D1[i] == 1):\n        TP = TP + 1\n    elif (D1[i] == -1 and D2[i] == -1):\n        TN = TN + 1\n    elif (D1[i] == -1 and D2[i] == 1):\n        FP = FP + 1\n    else:\n        FN = FN + 1\nakurasi = (TP + TN) / (TP + TN + FP + FN)\n' + k22_7out, msg: 'TP menghitung semua D1[i] = 1 tanpa melihat D2[i]. TP harus D1[i] = 1 dan D2[i] = 1 sekaligus.', msgEn: 'TP counts every D1[i] = 1 without looking at D2[i]. TP needs D1[i] = 1 and D2[i] = 1 at the same time.' },
      { code: k22_7pre + 'TP = 0\nTN = 0\nFP = 0\nFN = 0\nfor i in range(N):\n    if (D1[i] == 1 and D2[i] == 1):\n        TP = TP + 1\n    elif (D1[i] == -1 and D2[i] == -1):\n        TN = TN + 1\n    elif (D1[i] == -1 and D2[i] == 1):\n        FP = FP + 1\n    else:\n        FN = FN + 1\nakurasi = (TP + TN) / (TP + TN + FP)\n' + k22_7out, msg: 'Penyebut akurasi harus jumlah keempat kategori: TP + TN + FP + FN (= N). FN terlewat.', msgEn: 'The accuracy denominator must be the sum of all four categories: TP + TN + FP + FN (= N). FN was left out.' },
    ],
    plan: 'baca N; isi D1 lalu D2 (N elemen); TP, TN, FP, FN ← 0; untuk tiap i: bandingkan D1[i] dan D2[i] dan tambahkan salah satu penghitung; akurasi ← (TP+TN)/(TP+TN+FP+FN); tulis kelima nilai',
    skeleton: 'N = int(input())\nD1 = [0 for i in range(___)]\nD2 = [0 for i in range(___)]\n# isi D1 lalu D2 dengan loop\nTP = 0\n# TN, FP, FN = 0\nfor i in range(N):\n    if (D1[i] == ___ and D2[i] == ___):\n        TP = TP + 1\n    # ... TN, FP\n    else:\n        FN = FN + 1\nakurasi = (TP + TN) / (___)',
    hints: ['Dua array dibaca satu per satu: berapa loop untuk pengisian, dan berapa untuk perhitungan (boleh digabung)?', 'Tiap pasangan (D1[i], D2[i]) tepat masuk ke salah satu dari empat kategori: gunakan if-elif.', 'Empat penghitung diinisialisasi 0 sebelum loop; penyebut akurasi adalah TP+TN+FP+FN.'],
    work: ['Baca N, buat D1 dan D2 berukuran N, isi keduanya dengan `int(input())`.', 'Inisialisasi TP, TN, FP, FN = 0.', 'Untuk i = 0..N−1: tentukan kategori dari D1[i] dan D2[i], tambah penghitung yang sesuai.', 'Hitung akurasi dengan pembagian riil `/` dan tampilkan kelima nilai.'],
    syntax: ['list-init', 'list-index', 'for-range', 'if-elif'],
    lineNotes: N(k22_7, [
      ['N = int', 'Banyaknya elemen, integer positif.', 'The number of elements, a positive integer.', 'input'],
      ['D1 = [0', 'Array berukuran N dibuat dulu dengan `[0 for i in range(N)]`, baru diisi lewat indeks.', 'The N-element array is created first with `[0 for i in range(N)]`, then filled by index.', 'list-init'],
      ['D1[i] = int', 'Pengisian elemen ke-i; indeks 0..N−1 (`range(N)`).', 'Filling element i; indexes 0..N−1 (`range(N)`).', 'list-index'],
      ['TP = 0', 'Keempat penghitung diinisialisasi 0 sebelum loop (bukan di dalamnya).', 'All four counters are initialised to 0 before the loop (not inside it).', 'assign', 'FN = 0'],
      ['if (D1[i] == 1 and D2[i] == 1)', 'TP: observasi 1 dan prediksi 1, pada indeks yang sama.', 'TP: observed 1 and predicted 1, at the same index.', 'if-elif'],
      ['elif (D1[i] == -1 and D2[i] == -1)', 'TN: keduanya −1.', 'TN: both are −1.'],
      ['elif (D1[i] == -1 and D2[i] == 1)', 'FP: observasi −1 tetapi diprediksi 1.', 'FP: observed −1 but predicted 1.'],
      ['else:', 'Sisanya pasti FN (D1 = 1, D2 = −1) karena domain elemen hanya {−1, 1}.', 'The only case left is FN (D1 = 1, D2 = −1), since the element domain is just {−1, 1}.'],
      ['akurasi =', 'Pembagian riil `/` dengan kurung pada pembilang dan penyebut; penyebut sama dengan N.', 'Real division `/` with parentheses around numerator and denominator; the denominator equals N.', 'operators'],
      ['print("TP', 'Keluaran sesuai contoh; `str()` wajib saat digabung dengan string.', 'Output as in the example; `str()` is required when joining with a string.', 'print-str', 'print("Akurasi'],
    ]),
    pseudoNotes: N(k22_7p, [
      ['i traversal [0..N-1]', 'Pengisian array dan perhitungan memakai traversal indeks 0..N−1.', 'Filling and counting both traverse indexes 0..N−1.'],
      ['TP ← 0', 'Penghitung diinisialisasi sebelum traversal.', 'The counters are initialised before the traversal.'],
      ['if D1[i] = 1 and D2[i] = 1', 'Bersarang: tiap pasangan masuk ke tepat satu kategori.', 'Nested: every pair falls into exactly one category.'],
      ['akurasi ←', 'Akurasi = (TP+TN)/(TP+TN+FP+FN).', 'Accuracy = (TP+TN)/(TP+TN+FP+FN).'],
    ]),
    explanation: 'Satu loop menelusuri indeks yang sama pada D1 dan D2 dan mengklasifikasikan tiap pasangan ke TP/TN/FP/FN. Akurasi = (TP+TN)/N. Pada contoh: TP = 3, TN = 3, FP = 2, FN = 2, akurasi 0.6. Catatan: format masukan tidak dirinci pada soal; di sini N dibaca dulu, lalu elemen D1 satu per baris, lalu elemen D2.',
    refs: [{ src: S22, page: 7 }],
    en: {
      stem: 'There are two arrays of integer, D1 and D2. The value domain of each element of D1 and D2 is {-1,1}. D1 is observed data and D2 is predicted data, and both have the same number of elements. Write a program that asks the user for the number of array elements as a positive integer (say N, assume N > 0), then asks the user to fill array D1 and array D2 with N elements each, every element being either -1 or 1 (assume the user input is always correct). Array indexes start from 0 (zero). The program computes:\n\na. TP: the number of indexes i where D1[i] is 1 and D2[i] is also 1 (D1[i] = D2[i] = 1)\nb. TN: the number of indexes i where D1[i] is -1 and D2[i] is also -1 (D1[i] = D2[i] = -1)\nc. FP: the number of indexes i where D1[i] is -1 and D2[i] is 1 (D1[i] = -1 and D2[i] = 1)\nd. FN: the number of indexes i where D1[i] is 1 and D2[i] is -1 (D1[i] = 1 and D2[i] = -1)\ne. The accuracy with the formula: $Accuracy = \\frac{TP + TN}{TP + TN + FP + FN}$\n\nThe program displays TP, TN, FP, FN and the accuracy on screen. Sample input and output:\n\n| Input | Output |\n|---|---|\n| N = 10<br>D1 = [1, -1, -1, 1, -1, 1, 1, -1, -1, 1]<br>D2 = [1, -1, 1, -1, 1, -1, 1, -1, -1, 1] | TP = 3<br>TN = 3<br>FP = 2<br>FN = 2<br>Akurasi = 0.6 |\n\nNote: the array elements compared between D1 and D2 are always the elements with the same index.\n\n(Input order in this practice: N, then the N elements of D1 one per line, then the N elements of D2 one per line.)',
      plan: 'read N; fill D1 then D2 (N elements); TP, TN, FP, FN ← 0; for each i: compare D1[i] and D2[i] and increment one of the counters; accuracy ← (TP+TN)/(TP+TN+FP+FN); print the five values',
      hints: ['Two arrays are read one element at a time: how many loops for filling and how many for counting (they may be merged)?', 'Each pair (D1[i], D2[i]) falls into exactly one of four categories: use if-elif.', 'The four counters are initialised to 0 before the loop; the accuracy denominator is TP+TN+FP+FN.'],
      work: ['Read N, create D1 and D2 of size N, fill both with `int(input())`.', 'Initialise TP, TN, FP, FN = 0.', 'For i = 0..N−1: decide the category from D1[i] and D2[i], increment the matching counter.', 'Compute the accuracy with real division `/` and print the five values.'],
      explanation: 'One loop walks the same index in D1 and D2 and classifies each pair as TP/TN/FP/FN. Accuracy = (TP+TN)/N. In the example: TP = 3, TN = 3, FP = 2, FN = 2, accuracy 0.6. Note: the input format is not detailed by the question; here N is read first, then the D1 elements one per line, then the D2 elements.',
    },
  }],
})

/* ================================== UTS 2023 ================================== */

const A23 = 'Bagian A. Computing System, Network, and Impact of Computing (25%). Untuk soal 1 s.d. 3, tuliskan jawaban secara singkat, padat, tapi dengan jelas dan dengan argumen yang jelas. Gunakan Bahasa Indonesia yang baik dan benar.'

problems.push({
  id: 'ku23-s1', archetype: 'concept', title: 'Soal 1 – Green computing', source: prov(S23, 'Soal 1', [1], 2023, true),
  intro: A23,
  en: { title: 'Q1 – Green computing', intro: 'Part A. Computing Systems, Networks, and Impact of Computing (25%). For questions 1 to 3, write short, concise but clear answers with clear arguments. Use good and correct Indonesian.' },
  parts: [{
    id: 'ku23-s1a', kind: 'open', decks: ['D11'], topic: 'Green computing',
    stem: 'Jelaskan apa yang disebut green computing. Berikan 2 (dua) contoh perilaku kebiasaan yang mendukung green computing yang dapat Anda lakukan sebagai mahasiswa.',
    answer: 'Green computing adalah penggunaan komputer dan sumber daya komputasi secara efisien dan ramah lingkungan: merancang, memproduksi, menggunakan, dan membuang perangkat dengan meminimalkan konsumsi energi dan limbah elektronik. Contoh kebiasaan mahasiswa: (1) mematikan atau men-sleep-kan laptop/komputer dan mematikan layar saat tidak dipakai, serta mengatur mode hemat daya; (2) memakai perangkat selama mungkin, memperbaikinya, dan mendaur ulang e-waste, serta mengurangi cetak dokumen (membaca dan mengumpulkan tugas secara digital).',
    keyPoints: ['Definisi: komputasi hemat energi dan ramah lingkungan sepanjang daur hidup perangkat', 'Contoh 1 yang konkret (hemat energi)', 'Contoh 2 yang konkret (mengurangi limbah/kertas/e-waste)'],
    rubric: openRubric,
    explanation: 'Soal konsep dampak komputasi (di luar silabus WI1102): definisi singkat ditambah dua perilaku konkret.',
    refs: [{ src: S23, page: 1 }],
    en: {
      stem: 'Explain what is meant by green computing. Give 2 (two) examples of habits that support green computing which you can do as a student.',
      answer: 'Green computing is the efficient and environmentally friendly use of computers and computing resources: designing, producing, using and disposing of devices while minimising energy consumption and electronic waste. Examples of student habits: (1) turning off or sleeping the laptop/computer and switching off the screen when not in use, and enabling power-saving mode; (2) using a device for as long as possible, repairing it, and recycling e-waste, and printing less (reading and submitting assignments digitally).',
      keyPoints: ['Definition: energy-efficient, environmentally friendly computing across the device life cycle', 'A concrete example 1 (saving energy)', 'A concrete example 2 (reducing waste/paper/e-waste)'],
      explanation: 'A concept question on the impact of computing (outside the WI1102 syllabus): a short definition plus two concrete habits.',
    },
  }],
})

problems.push({
  id: 'ku23-s2', archetype: 'concept', title: 'Soal 2 – Aplikasi web dan mobile', source: prov(S23, 'Soal 2', [1], 2023, true),
  intro: 'Perkembangan teknologi jaringan komputer menyebabkan munculnya berbagai aplikasi baik yang berbasis web (web application) maupun berbasis mobile (mobile application).',
  en: { title: 'Q2 – Web and mobile applications', intro: 'The development of computer-network technology has led to various applications, both web-based (web applications) and mobile-based (mobile applications).' },
  parts: [
    {
      id: 'ku23-s2a', kind: 'open', label: 'a', decks: ['D11'], topic: 'Web versus mobile applications',
      stem: 'Jelaskan perbedaan aplikasi web dan mobile dalam aspek cara pengaksesan aplikasi.',
      answer: 'Aplikasi web diakses melalui browser dengan alamat URL; tidak perlu dipasang (di-install) dan dijalankan di server, sehingga membutuhkan koneksi internet dan dapat dibuka dari perangkat apa pun yang punya browser. Aplikasi mobile dipasang (di-download dari toko aplikasi) pada perangkat bergerak (ponsel/tablet) dan diakses lewat ikon aplikasi; sebagian fiturnya dapat berjalan offline serta memakai fitur perangkat (kamera, GPS, notifikasi).',
      keyPoints: ['Web: lewat browser/URL, tanpa instalasi', 'Mobile: dipasang dari toko aplikasi dan dibuka dari ikon', 'Perbedaan ketergantungan jaringan/perangkat'],
      rubric: openRubric,
      explanation: 'Perbedaan inti ada pada cara akses: browser + URL (web) versus instalasi pada perangkat (mobile).',
      refs: [{ src: S23, page: 1 }],
      en: {
        stem: 'Explain the difference between web and mobile applications in terms of how the application is accessed.',
        answer: 'A web application is accessed through a browser using a URL; it needs no installation and runs on a server, so it needs an internet connection and can be opened from any device that has a browser. A mobile application is installed (downloaded from an app store) on a mobile device (phone/tablet) and accessed through the app icon; some features can work offline and use device features (camera, GPS, notifications).',
        keyPoints: ['Web: through a browser/URL, no installation', 'Mobile: installed from an app store and opened from an icon', 'The difference in network/device dependence'],
        explanation: 'The core difference lies in how it is accessed: browser + URL (web) versus installation on the device (mobile).',
      },
    },
    {
      id: 'ku23-s2b', kind: 'open', label: 'b', decks: ['D11'], topic: 'Applications that support studying',
      stem: 'Sebutkan masing-masing 1 (satu) contoh aplikasi web dan aplikasi mobile yang dapat digunakan untuk mendukung pelaksanaan kegiatan perkuliahan atau kegiatan mahasiswa dan jelaskan bagaimana bentuk dukungannya.',
      answer: 'Banyak jawaban valid. Contoh: aplikasi web, Google Colab atau LMS kampus (Moodle/Edunex): mengumpulkan tugas, mengakses materi, dan menjalankan kode lewat browser tanpa instalasi. Aplikasi mobile, Google Calendar atau aplikasi catatan: mengatur jadwal kuliah/tugas dengan pengingat dan notifikasi di ponsel.',
      keyPoints: ['Satu contoh aplikasi web yang nyata', 'Satu contoh aplikasi mobile yang nyata', 'Penjelasan bentuk dukungan untuk kegiatan kuliah/mahasiswa'],
      rubric: openRubric,
      explanation: 'Soal terbuka: dua contoh nyata (satu web, satu mobile) dengan penjelasan manfaatnya.',
      refs: [{ src: S23, page: 1 }],
      en: {
        stem: 'Give 1 (one) example each of a web application and a mobile application that can be used to support lectures or student activities, and explain how it supports them.',
        answer: 'Many answers are valid. Examples: a web application, Google Colab or the campus LMS (Moodle/Edunex): submit assignments, access materials, and run code through the browser without installation. A mobile application, Google Calendar or a note-taking app: organise the lecture/assignment schedule with reminders and notifications on the phone.',
        keyPoints: ['One real web application example', 'One real mobile application example', 'An explanation of how it supports lectures/student activities'],
        explanation: 'An open question: two real examples (one web, one mobile) with an explanation of the benefit.',
      },
    },
  ],
})

problems.push({
  id: 'ku23-s3', archetype: 'concept', title: 'Soal 3 – Etika penggunaan ChatGPT', source: prov(S23, 'Soal 3', [1], 2023, true),
  en: { title: 'Q3 – Ethics of using ChatGPT' },
  parts: [{
    id: 'ku23-s3a', kind: 'open', decks: ['D11'], topic: 'AI and academic ethics',
    stem: 'Saat ini ChatGPT sebagai implementasi Artificial Intelligence telah menjadi perangkat yang sering digunakan, termasuk oleh mahasiswa, misalnya untuk memberikan jawaban atas pertanyaan untuk tugas atau membuat tulisan tentang suatu topik tertentu. Jelaskan apakah batasan penggunaan ChatGPT yang etis dalam konteks etika sebagai mahasiswa akademisi.',
    answer: 'Penggunaan etis: ChatGPT dipakai sebagai alat bantu belajar (menjelaskan konsep, memberi contoh, memeriksa tata bahasa, ide awal) dengan tetap memahami dan memverifikasi hasilnya, serta mengungkapkan penggunaannya bila diwajibkan dosen. Tidak etis: menyalin jawaban/tulisan secara mentah dan mengaku sebagai karya sendiri (plagiarisme dan kecurangan akademik), menggunakannya pada ujian/tugas yang melarangnya, atau memakai hasil tanpa memeriksa kebenaran (AI dapat keliru). Batas utamanya: kejujuran akademik, karya yang diserahkan harus mencerminkan pemahaman sendiri, dan mengikuti aturan mata kuliah/institusi.',
    keyPoints: ['Boleh sebagai alat bantu belajar dan wajib diverifikasi', 'Tidak boleh menyalin mentah dan mengaku karya sendiri (plagiarisme)', 'Ikuti aturan dosen/institusi dan jujur menyebut penggunaannya', 'Alasan: kejujuran akademik dan tanggung jawab atas karya sendiri'],
    rubric: openRubric,
    explanation: 'Soal etika (di luar silabus WI1102): jelaskan batas antara membantu belajar dan kecurangan akademik, dengan argumen.',
    refs: [{ src: S23, page: 1 }],
    en: {
      stem: 'Today ChatGPT, as an implementation of Artificial Intelligence, has become a frequently used tool, including by students, for example to give answers to assignment questions or to write about a particular topic. Explain what the ethical limits of using ChatGPT are, in the context of ethics for a student as an academic.',
      answer: 'Ethical use: ChatGPT as a learning aid (explaining concepts, giving examples, checking grammar, initial ideas) while still understanding and verifying the output, and disclosing its use where the lecturer requires it. Unethical: copying answers/text verbatim and claiming them as one\'s own work (plagiarism and academic dishonesty), using it on exams/assignments that forbid it, or using output without checking its correctness (AI can be wrong). The main limits: academic honesty, the submitted work must reflect one\'s own understanding, and following the course/institution rules.',
      keyPoints: ['Allowed as a learning aid and must be verified', 'Not allowed to copy verbatim and claim as one\'s own (plagiarism)', 'Follow lecturer/institution rules and honestly state its use', 'Reason: academic honesty and responsibility for one\'s own work'],
      explanation: 'An ethics question (outside the WI1102 syllabus): explain the line between a learning aid and academic dishonesty, with arguments.',
    },
  }],
})

// The site simulator only knows 90-degree Left / Right, so TurnLeft 90 / TurnRight 90 are written Left / Right here.
const k23_4 = r`Repeat 3 (
    Repeat N-1 (Forward, Left, Forward, Right),
    Forward,
    Right
)
Repeat N-1 (Forward, Left, Forward, Right),
Left`

problems.push({
  id: 'ku23-s4', archetype: 'robot', title: 'Soal 4 – Robot Dorami menggambar bentuk', source: prov(S23, 'Soal 4', [2, 3], 2023),
  intro: 'Bagian B. Berpikir Komputasional & Algoritmik (25%). Robot Dorami mendapat tugas dari Doraemon menggambar bentuk-bentuk yang menarik di taman. Salah satu bentuk yang harus dibuatnya adalah seperti yang di bawah ini (lihat gambar untuk N = 1, 2, 3, dan 6). Doraemon akan memberikan sebuah bilangan bulat N, dan Dorami harus membuat bentuk yang sesuai seperti contoh berikut. N > 0, jadi Dorami bisa membuat bentuk-bentuk dengan pola yang sama yang lain, tidak hanya terbatas pada contoh-contoh di bawah ini (pikirkan bagaimana pola untuk nilai N lain).\n\nBerikut adalah perintah-perintah yang bisa dilakukan Dorami.\n\n| Perintah | Arti |\n|---|---|\n| `Forward` | Maju 1 langkah sekaligus menggambar sebuah segmen garis. Asumsi segmen garis panjangnya sama. |\n| `TurnLeft d` | Berputar arah sebesar d derajat ke kiri. Asumsi 0 <= d <= 360. Jika d = 0 atau 360, maka robot tidak berubah arah. Saat berputar, tidak ada yang digambar. |\n| `TurnRight d` | Berputar arah sebesar d derajat ke kanan. Asumsi 0 <= d <= 360. Jika d = 0 atau 360, maka robot tidak berubah arah. Saat berputar, tidak ada yang digambar. |\n| `Repeat n (perintah)` | Mengulangi perintah sebanyak n kali. Asumsikan: n >= 0. Jika n = 0, maka perintah tidak dilakukan sama sekali. |\n\nTugas Anda: Jika diberikan sebuah N, tuliskan rangkaian perintah yang harus dilakukan Dorami untuk membuat bentuk di atas.\n\nBeberapa informasi tambahan yang harus diperhatikan:\n- Asumsi: Di awal, Dorami menghadap ke kanan pada posisi a (seperti gambar di atas). Bentuk dibuat mulai posisi a ke posisi b.\n- Rangkaian perintah dituliskan dalam urutan yang masing-masing dipisahkan sebuah koma (kecuali untuk perintah terakhir). Rangkaian perintah dapat dituliskan menyamping, dapat juga dituliskan ke bawah, dan dapat dikombinasikan dengan spasi dan indentasi untuk memperjelas penulisan. Lihat contoh di bawah.\n- Parameter perintah pada perintah repeat terdiri atas perintah-perintah yang bisa dijalankan oleh robot dan bisa terdiri atas lebih dari 1 perintah.\n\nContoh: `Forward, TurnLeft 45, Forward, TurnRight 45` (maju 1 langkah ke kanan, berputar kiri 45 derajat, maju 1 langkah, berputar kanan 45 derajat).',
  figures: [{ src: S23, page: 2 }, { src: S23, page: 3 }],
  en: {
    title: 'Q4 – Robot Dorami draws a shape',
    intro: 'Part B. Computational and Algorithmic Thinking (25%). Robot Dorami is given a task by Doraemon: draw interesting shapes in the park. One of the shapes it must make is the one below (see the figure for N = 1, 2, 3 and 6). Doraemon gives an integer N, and Dorami must draw the matching shape as in the examples. N > 0, so Dorami can make other shapes with the same pattern, not only the examples below (think about the pattern for other values of N).\n\nThe commands Dorami can perform are:\n\n| Command | Meaning |\n|---|---|\n| `Forward` | Move forward 1 step while drawing a line segment. Assume all segments have the same length. |\n| `TurnLeft d` | Turn d degrees to the left. Assume 0 <= d <= 360. If d = 0 or 360, the robot does not change direction. Nothing is drawn while turning. |\n| `TurnRight d` | Turn d degrees to the right. Assume 0 <= d <= 360. If d = 0 or 360, the robot does not change direction. Nothing is drawn while turning. |\n| `Repeat n (command)` | Repeat the command n times. Assume n >= 0. If n = 0, the command is not executed at all. |\n\nYour task: given an N, write the sequence of commands Dorami must perform to draw the shape above.\n\nAdditional information:\n- Assumption: at the start, Dorami faces right at position a (as in the figure above). The shape is drawn from position a to position b.\n- The commands are written in order, each separated by a comma (except the last). They can be written sideways or downwards, and combined with spaces and indentation for clarity. See the example below.\n- The parameter of the repeat command consists of commands the robot can execute and may contain more than 1 command.\n\nExample: `Forward, TurnLeft 45, Forward, TurnRight 45` (forward 1 step to the right, turn left 45 degrees, forward 1 step, turn right 45 degrees).',
  },
  parts: [{
    id: 'ku23-s4a', kind: 'robot', decks: ['D02'], topic: 'Robot repeat (stepped diamond)', misconceptions: ['repeat-count'], dialect: 'generic', param: 'N', nValues: [1, 2, 3, 4, 5],
    stem: 'Jika diberikan sebuah N (N > 0), tuliskan rangkaian perintah yang harus dilakukan Dorami untuk membuat bentuk pada gambar, mulai dari posisi a (menghadap ke kanan) sampai posisi b.',
    figures: [{ src: S23, page: 2 }],
    solution: k23_4,
    rubric: robotRubric,
    hints: ['Gambar N = 1, 2, 3. Bagian apa yang berulang N−1 kali? (satu anak tangga: maju, belok kiri, maju, belok kanan)', 'Bentuknya terdiri dari empat sisi berundak yang sama. Satu sisi = N−1 anak tangga + satu langkah lurus, lalu belok.', 'Untuk N = 1, `Repeat 0` tidak menjalankan apa pun: pastikan tetap benar.'],
    work: ['Satu anak tangga: Forward, TurnLeft 90, Forward, TurnRight 90.', 'Satu sisi berundak: ulangi anak tangga N−1 kali, lalu Forward, TurnRight 90.', 'Ulangi sisi itu 3 kali (tiga sisi pertama).', 'Sisi terakhir: ulangi anak tangga N−1 kali lalu TurnLeft 90 untuk menutup bentuk di b.'],
    explanation: 'Pembahasan resmi (halaman 3): `Repeat 3 (Repeat N-1 (Forward, TurnLeft 90, Forward, TurnRight 90), Forward, TurnRight 90)`, lalu `Repeat N-1 (Forward, TurnLeft 90, Forward, TurnRight 90), TurnLeft 90`. Untuk N = 2: (FLFR FR) - (FLFR FR) - (FLFR FR) - (FLFR). Catatan dari pembahasan: ada banyak cara, ini hanya salah satunya. Di situs ini `TurnLeft 90` / `TurnRight 90` boleh ditulis persis seperti di soal (atau singkat `Left` / `Right`). Simulator menganggap robot awalnya menghadap atas, jadi gambarnya hanya terputar dan tidak memengaruhi penilaian.',
    refs: [{ src: S23, page: 2 }, { src: S23, page: 3 }],
    en: {
      stem: 'Given an N (N > 0), write the sequence of commands Dorami must perform to draw the shape in the figure, from position a (facing right) to position b.',
      hints: ['Draw N = 1, 2, 3. What part repeats N−1 times? (one step: forward, turn left, forward, turn right)', 'The shape consists of four identical stepped sides. One side = N−1 steps + one straight segment, then a turn.', 'For N = 1, `Repeat 0` runs nothing: make sure it is still correct.'],
      work: ['One step: Forward, TurnLeft 90, Forward, TurnRight 90.', 'One stepped side: repeat the step N−1 times, then Forward, TurnRight 90.', 'Repeat that side 3 times (the first three sides).', 'The last side: repeat the step N−1 times then TurnLeft 90 to close the shape at b.'],
      explanation: 'The official discussion (page 3): `Repeat 3 (Repeat N-1 (Forward, TurnLeft 90, Forward, TurnRight 90), Forward, TurnRight 90)`, then `Repeat N-1 (Forward, TurnLeft 90, Forward, TurnRight 90), TurnLeft 90`. For N = 2: (FLFR FR) - (FLFR FR) - (FLFR FR) - (FLFR). The discussion notes that there are many ways and this is only one of them. On this site you can write `TurnLeft 90` / `TurnRight 90` exactly as in the paper (or just `Left` / `Right`). The simulator assumes the robot starts facing up, so the drawing is only rotated, which does not affect the check.',
    },
  }],
})

const C23 = 'Bagian C. Algoritma dan Pemrograman (50% + bonus 10%).'
const C23en = 'Part C. Algorithms and Programming (50% + 10% bonus).'

/* ---- Soal 5: tagihan listrik ---- */

const k23_5 = r`# Program TagihanListrik
# Menghitung tagihan listrik bulanan dari kelompok ekonomi (rendah/sedang/tinggi) dan KWH
# Tarif dan subsidi ditentukan oleh rentang KWH; subsidi bergantung pada kelompok ekonomi
# DECLARATIONS
# kelompok : str
# kwh, subsidi : int
# tarif, total : int / float
# ALGORITHM
kelompok = input()
kwh = int(input())
if (kwh > 1000):
    tarif = 250
    subsidi = 10
elif (kwh > 500):
    tarif = 200
    subsidi = 5
elif (kwh > 250):
    tarif = 150
    subsidi = 5
else:
    tarif = 100
    subsidi = 0
total = kwh * tarif
if (kelompok == "rendah"):
    total = total - total * subsidi / 100
elif (kelompok == "sedang" and kwh > 1000):
    total = total - total * subsidi / 100
print(total)`
const k23_5p = r`Program TagihanListrik
{ Tagihan listrik bulanan dari kelompok ekonomi dan KWH; subsidi bergantung pada kelompok }
KAMUS
  kelompok : string
  kwh, subsidi, tarif : integer
  total : real
ALGORITMA
  input(kelompok)
  input(kwh)
  if kwh > 1000 then
    tarif ← 250
    subsidi ← 10
  else
    if kwh > 500 then
      tarif ← 200
      subsidi ← 5
    else
      if kwh > 250 then
        tarif ← 150
        subsidi ← 5
      else
        tarif ← 100
        subsidi ← 0
  total ← kwh * tarif
  if kelompok = "rendah" then
    total ← total - total * subsidi / 100
  else
    if kelompok = "sedang" and kwh > 1000 then
      total ← total - total * subsidi / 100
  output(total)`
const k23_5flow: FlowBlock[] = [
  { t: 'io', dir: 'in', text: 'input(kelompok)' },
  { t: 'io', dir: 'in', text: 'input(kwh)' },
  { t: 'if', cond: 'kwh > 1000', then: [{ t: 'process', text: 'tarif ← 250' }, { t: 'process', text: 'subsidi ← 10' }], else: [
    { t: 'if', cond: 'kwh > 500', then: [{ t: 'process', text: 'tarif ← 200' }, { t: 'process', text: 'subsidi ← 5' }], else: [
      { t: 'if', cond: 'kwh > 250', then: [{ t: 'process', text: 'tarif ← 150' }, { t: 'process', text: 'subsidi ← 5' }], else: [{ t: 'process', text: 'tarif ← 100' }, { t: 'process', text: 'subsidi ← 0' }] },
    ] },
  ] },
  { t: 'process', text: 'total ← kwh * tarif' },
  { t: 'if', cond: 'kelompok = "rendah"', then: [{ t: 'process', text: 'total ← total - total * subsidi / 100' }], else: [
    { t: 'if', cond: 'kelompok = "sedang" and kwh > 1000', then: [{ t: 'process', text: 'total ← total - total * subsidi / 100' }] },
  ] },
  { t: 'io', dir: 'out', text: 'output(total)' },
]
const k23_5head = 'kelompok = input()\nkwh = int(input())\n'
const k23_5tier = (ge: string) => `if (kwh > 1000):\n    tarif = 250\n    subsidi = 10\nelif (kwh ${ge} 500):\n    tarif = 200\n    subsidi = 5\nelif (kwh ${ge} 250):\n    tarif = 150\n    subsidi = 5\nelse:\n    tarif = 100\n    subsidi = 0\ntotal = kwh * tarif\n`

problems.push({
  id: 'ku23-s5', archetype: 'program', title: 'Soal 5 – Tagihan listrik bulanan', source: prov(S23, 'Soal 5', [4], 2023),
  intro: C23,
  en: { title: 'Q5 – Monthly electricity bill', intro: C23en },
  parts: [{
    id: 'ku23-s5a', kind: 'program', decks: ['D05'], topic: 'Tiered rate with conditional discount', patterns: ['if-elif', 'nested-if', 'game-rules'], misconceptions: ['off-by-one', 'constraint-missed'],
    stem: 'Tuliskan program untuk menghitung dan mencetak tagihan listrik bulanan pelanggan sebuah perusahaan listrik. Program menerima masukan kelompok ekonomi pelanggan (string) dan jumlah unit penggunaan listrik (dalam KWH, bilangan bulat >= 0) yang ditagihkan untuk bulan tersebut dan menampilkan total tagihan listrik yang harus dibayarkan pelanggan. Ada 3 (tiga) jenis kelompok ekonomi pelanggan, yaitu rendah, sedang, tinggi. Tagihan listrik dihitung berdasarkan tabel biaya berikut:\n\n| Jumlah unit penggunaan listrik (dalam KWH) | Biaya per KWH (dalam Rp) | Subsidi (dalam %) |\n|---|---|---|\n| 0 s.d. 250 | 100 | 0 |\n| 251 s.d. 500 | 150 | 5 |\n| 501 s.d. 1000 | 200 | 5 |\n| > 1000 | 250 | 10 |\n\nSubsidi adalah pengurangan yang diberikan terhadap total biaya tagihan yang diberikan sebesar x% dari total tagihan tanpa subsidi. Kelompok ekonomi rendah mendapatkan subsidi pada setiap kelompok biaya di atas, kelompok ekonomi sedang hanya mendapatkan subsidi untuk penggunaan listrik > 1000 KWH, sedangkan kelompok ekonomi tinggi tidak mendapatkan subsidi apa pun.\n\nContoh input-output:\n\n| Kelompok ekonomi | Jumlah penggunaan (KWH) | Total Biaya Tagihan |\n|---|---|---|\n| rendah | 250 | 25000 |\n| rendah | 900 | 171000 |\n| sedang | 900 | 180000 |\n| sedang | 2000 | 450000 |\n| tinggi | 2000 | 500000 |\n\n(Urutan masukan: kelompok ekonomi, lalu jumlah KWH, satu per baris.)',
    reps: ['python', 'pseudo', 'flow'], match: 'lenient', rubric: progRubric,
    solution: { python: k23_5, pseudo: k23_5p, flow: { title: 'TagihanListrik', blocks: k23_5flow } },
    tests: [{ stdin: ['rendah', '250'], edge: '250 KWH: still the first tier' }, { stdin: ['rendah', '900'] }, { stdin: ['sedang', '900'], edge: 'middle group, no subsidy up to 1000' }, { stdin: ['sedang', '2000'], edge: 'middle group, subsidy above 1000' }, { stdin: ['tinggi', '2000'], edge: 'high group never gets subsidy' }, { stdin: ['rendah', '501'], edge: 'start of the third tier' }, { stdin: ['rendah', '0'], edge: '0 KWH' }, { stdin: ['sedang', '1000'], edge: '1000 KWH: not above 1000' }],
    wrong: [
      { code: k23_5head + k23_5tier('>=') .replace('elif (kwh >= 500)', 'elif (kwh >= 501)').replace('elif (kwh >= 250)', 'elif (kwh >= 251)').replace('if (kwh > 1000)', 'if (kwh >= 1000)') + 'if (kelompok == "rendah"):\n    total = total - total * subsidi / 100\nelif (kelompok == "sedang" and kwh >= 1000):\n    total = total - total * subsidi / 100\nprint(total)', msg: 'Batas tarif keliru: "> 1000" berarti 1001 ke atas, jadi 1000 KWH masih tarif 200 tanpa subsidi sedang. Gunakan `> 1000`, bukan `>= 1000`.', msgEn: 'The tier boundary is wrong: "> 1000" means 1001 and above, so 1000 KWH is still the rate 200 with no subsidy for the middle group. Use `> 1000`, not `>= 1000`.', tag: 'off-by-one' },
      { code: k23_5head + k23_5tier('>') + 'if (kelompok != "tinggi"):\n    total = total - total * subsidi / 100\nprint(total)', msg: 'Kelompok sedang hanya mendapat subsidi bila KWH > 1000. Pada 900 KWH, sedang tidak disubsidi.', msgEn: 'The middle group only gets the subsidy when KWH > 1000. At 900 KWH the middle group gets no subsidy.', tag: 'constraint-missed' },
      { code: k23_5head + k23_5tier('>') + 'if (kelompok == "rendah" or kelompok == "sedang" or kwh > 1000):\n    total = total - total * subsidi / 100\nprint(total)', msg: 'Kelompok tinggi tidak pernah mendapat subsidi, berapa pun KWH-nya. Kondisi `or kwh > 1000` salah memberi subsidi pada kelompok tinggi.', msgEn: 'The high group never gets a subsidy, whatever the KWH. The `or kwh > 1000` condition wrongly gives the high group a subsidy.', tag: 'constraint-missed' },
    ],
    plan: 'baca kelompok dan kwh; tentukan tarif dan persen subsidi dari rentang kwh; total ← kwh × tarif; jika rendah: kurangi subsidi%; jika sedang dan kwh > 1000: kurangi subsidi%; tinggi: tanpa subsidi; tulis total',
    skeleton: 'kelompok = input()\nkwh = int(input())\nif (kwh > ___):\n    tarif = ___\n    subsidi = ___\nelif (kwh > ___):\n    tarif = 200\n    subsidi = 5\n# ... rentang lain\ntotal = kwh * tarif\nif (kelompok == "rendah"):\n    total = total - total * ___ / 100\nelif (kelompok == "sedang" and kwh ___ 1000):\n    total = total - total * subsidi / 100\nprint(total)',
    hints: ['Ada dua keputusan terpisah: (1) tarif dan persen subsidi menurut rentang KWH, (2) apakah kelompok ini berhak atas subsidi itu.', 'Seluruh KWH dikali satu tarif (bukan berjenjang): cek dengan contoh rendah 900 KWH = 900 × 200 − 5% = 171000.', 'Subsidi: rendah selalu, sedang hanya jika KWH > 1000, tinggi tidak pernah.'],
    work: ['Baca kelompok (string) dan kwh (int).', 'Pilih tarif dan subsidi dari rentang kwh (periksa dari batas atas: > 1000, > 500, > 250, selain itu).', 'total = kwh × tarif.', 'Kurangi subsidi% bila rendah, atau sedang dengan kwh > 1000.', 'Tampilkan total.'],
    syntax: ['input', 'type-conversion', 'if-elif', 'relational-logical'],
    lineNotes: N(k23_5, [
      ['kelompok = input()', 'Kelompok ekonomi adalah string, tidak perlu konversi.', 'The economic group is a string, so no conversion is needed.', 'input'],
      ['kwh = int', 'KWH bilangan bulat >= 0: `int(input())`.', 'KWH is an integer >= 0: `int(input())`.', 'type-conversion'],
      ['if (kwh > 1000)', 'Rentang diperiksa dari yang terbesar. "> 1000" berarti mulai 1001, sehingga `>` bukan `>=`.', 'The ranges are tested from the largest. "> 1000" means from 1001, so `>` not `>=`.', 'if-elif'],
      ['elif (kwh > 500)', '501..1000: tarif 200, subsidi 5%. Sampai di sini kwh <= 1000 sehingga cukup `> 500`.', '501..1000: rate 200, subsidy 5%. Reaching here means kwh <= 1000, so `> 500` is enough.'],
      ['elif (kwh > 250)', '251..500: tarif 150, subsidi 5%.', '251..500: rate 150, subsidy 5%.'],
      ['else:', '0..250: tarif 100, tanpa subsidi (termasuk 0 KWH).', '0..250: rate 100, no subsidy (including 0 KWH).'],
      ['total = kwh * tarif', 'Seluruh KWH dihitung dengan satu tarif sesuai rentangnya (sesuai contoh: 900 × 200 = 180000).', 'All KWH are charged at one rate according to the range (as in the example: 900 × 200 = 180000).'],
      ['if (kelompok == "rendah")', 'Kelompok rendah: subsidi pada semua rentang.', 'Low group: the subsidy applies in every range.'],
      ['elif (kelompok == "sedang"', 'Kelompok sedang: subsidi hanya bila kwh > 1000. Kelompok tinggi tidak masuk cabang mana pun: tanpa subsidi.', 'Middle group: subsidy only if kwh > 1000. The high group enters no branch: no subsidy.'],
      ['total = total - total * subsidi / 100', 'Subsidi = x% dari total tanpa subsidi; `/ 100` menghasilkan float (mis. 35767.5).', 'Subsidy = x% of the total without subsidy; `/ 100` gives a float (e.g. 35767.5).', 'operators', 'total = total - total * subsidi / 100'],
      ['print(total)', 'Tampilkan total tagihan.', 'Print the total bill.'],
    ]),
    pseudoNotes: N(k23_5p, [
      ['if kwh > 1000', 'Rantai percabangan bersarang dari rentang terbesar.', 'A nested chain of branches from the largest range.'],
      ['total ← kwh * tarif', 'Satu tarif untuk seluruh KWH.', 'One rate for all KWH.'],
      ['if kelompok = "rendah"', 'Rendah selalu bersubsidi; sedang hanya bila kwh > 1000.', 'Low always gets the subsidy; middle only when kwh > 1000.'],
    ]),
    explanation: 'Tarif dan persen subsidi ditentukan oleh rentang KWH (seluruh KWH memakai satu tarif, sesuai contoh), lalu subsidi diterapkan menurut kelompok: rendah selalu, sedang hanya bila KWH > 1000, tinggi tidak pernah. Pada 251 KWH rendah, total = 37650 × 0.95 = 35767.5, jadi hasil bisa pecahan. Catatan: soal tidak menyebut format angka; keluaran yang sama secara numerik diterima.',
    refs: [{ src: S23, page: 4 }],
    en: {
      stem: 'Write a program to calculate and print the monthly electricity bill of a customer of an electricity company. The program receives the customer\'s economic group (string) and the number of electricity units used (in KWH, an integer >= 0) billed for that month, and displays the total electricity bill the customer must pay. There are 3 (three) economic groups: rendah (low), sedang (middle), tinggi (high). The bill is computed from the following cost table:\n\n| Units of electricity used (KWH) | Cost per KWH (Rp) | Subsidy (%) |\n|---|---|---|\n| 0 to 250 | 100 | 0 |\n| 251 to 500 | 150 | 5 |\n| 501 to 1000 | 200 | 5 |\n| > 1000 | 250 | 10 |\n\nThe subsidy is a reduction given on the total bill, equal to x% of the total bill without subsidy. The low economic group gets the subsidy in every cost group above, the middle group only gets the subsidy for usage > 1000 KWH, and the high group gets no subsidy at all.\n\nSample input-output:\n\n| Economic group | Usage (KWH) | Total bill |\n|---|---|---|\n| rendah | 250 | 25000 |\n| rendah | 900 | 171000 |\n| sedang | 900 | 180000 |\n| sedang | 2000 | 450000 |\n| tinggi | 2000 | 500000 |\n\n(Input order: economic group, then KWH, one per line.)',
      plan: 'read the group and kwh; choose the rate and subsidy percentage from the kwh range; total ← kwh × rate; if rendah: subtract subsidy%; if sedang and kwh > 1000: subtract subsidy%; tinggi: no subsidy; print total',
      hints: ['There are two separate decisions: (1) the rate and subsidy percentage by KWH range, (2) whether this group is entitled to that subsidy.', 'All KWH are multiplied by a single rate (not tiered): check with the example rendah 900 KWH = 900 × 200 − 5% = 171000.', 'Subsidy: rendah always, sedang only if KWH > 1000, tinggi never.'],
      work: ['Read the group (string) and kwh (int).', 'Pick the rate and subsidy from the kwh range (test from the upper bound: > 1000, > 500, > 250, otherwise).', 'total = kwh × rate.', 'Subtract the subsidy% if rendah, or sedang with kwh > 1000.', 'Print total.'],
      explanation: 'The rate and subsidy percentage are set by the KWH range (all KWH use one rate, as the examples show), then the subsidy is applied by group: rendah always, sedang only when KWH > 1000, tinggi never. For 251 KWH rendah, total = 37650 × 0.95 = 35767.5, so the result can be fractional. Note: the question does not state the number format; numerically equal output is accepted.',
    },
  }],
})

/* ---- Soal 6: pinjol (bunga berbunga) ---- */

const k23_6 = r`# Program PinjamanBunga
# Menghitung jumlah yang harus dibayar saat jatuh tempo dengan bunga berbunga per hari
# total = pinjaman * (1 + bunga/100) ^ hari
# DECLARATIONS
# pinjaman, bunga, hari, total : float
# ALGORITHM
pinjaman = float(input())
bunga = float(input())
hari = float(input())
total = pinjaman * (1 + bunga / 100) ** hari
print(total)`
const k23_6p = r`Program PinjamanBunga
{ total = pinjaman * (1 + bunga/100) ^ hari: bunga berbunga per hari }
KAMUS
  pinjaman, bunga, hari, total : real
ALGORITMA
  input(pinjaman)
  input(bunga)
  input(hari)
  total ← pinjaman * (1 + bunga / 100) ** hari
  output(total)`
const k23_6in = 'pinjaman = float(input())\nbunga = float(input())\nhari = float(input())\n'

problems.push({
  id: 'ku23-s6', archetype: 'program', title: 'Soal 6 – Pinjaman online dengan bunga berbunga', source: prov(S23, 'Soal 6', [5], 2023),
  en: { title: 'Q6 – Online loan with compound interest' },
  parts: [{
    id: 'ku23-s6a', kind: 'program', decks: ['D04'], topic: 'Compound interest', patterns: ['sequence-io', 'type-conversion', 'accumulate-sum'], misconceptions: ['int-vs-float-div'],
    stem: 'Sebuah perusahaan Fintech "Pilus Aja" (Pinjam Dulu Saja) menawarkan jasa peminjaman finansial dengan "bunga ringan". Sebagai pemerhati pinjol (pinjaman online), Anda menemukan fakta bahwa bunga yang ditawarkan bersifat compound interest atau bunga berbunga, per hari. Untuk melakukan analisa pinjol itu, buatlah sebuah program yang digunakan untuk menghitung dan menampilkan berapa besar uang pinjaman (dalam rupiah) yang harus dibayarkan pada saat jatuh tempo, dengan masukan berupa pinjaman awal (dalam rupiah), bunga (dalam persen), dan lama pinjaman (dalam hari). Asumsikan besaran uang, hari, dan bunga adalah bilangan riil positif.\n\nContoh: pinjaman awal = 1000 rupiah, bunga = 10% per hari, dan lama pinjaman = 10 hari, maka\n\nHari ke-1: bunga 10% dari 1000 rupiah = 100 rupiah, total pinjaman = 1100 rupiah\nHari ke-2: bunga 10% dari 1100 rupiah = 110 rupiah, total pinjaman = 1210 rupiah\n\n(Urutan masukan: pinjaman awal, bunga (%), lama (hari), satu per baris. Format keluaran bebas.)',
    reps: ['python', 'pseudo', 'flow'], match: 'judge', judge: lastNumJudge, rubric: progRubric,
    solution: { python: k23_6, pseudo: k23_6p, flow: { title: 'PinjamanBunga', blocks: [
      { t: 'io', dir: 'in', text: 'input(pinjaman)' }, { t: 'io', dir: 'in', text: 'input(bunga)' }, { t: 'io', dir: 'in', text: 'input(hari)' },
      { t: 'process', text: 'total ← pinjaman * (1 + bunga / 100) ** hari' },
      { t: 'io', dir: 'out', text: 'output(total)' },
    ] } },
    tests: [{ stdin: ['1000', '10', '10'] }, { stdin: ['1000', '5', '1'], edge: 'one day: a single interest step' }, { stdin: ['2500.5', '0.5', '30'], edge: 'real-valued amount and rate' }, { stdin: ['100', '100', '3'], edge: '100% per day doubles daily' }],
    wrong: [
      { code: k23_6in + 'total = pinjaman * (1 + bunga * hari / 100)\nprint(total)', msg: 'Ini bunga tunggal (bunga dihitung dari pinjaman awal terus). Bunga berbunga: tiap hari bunga dihitung dari total hari sebelumnya, jadi faktor (1 + bunga/100) dipangkatkan hari.', msgEn: 'This is simple interest (interest always taken on the original loan). Compound interest: each day the interest is taken on the previous day\'s total, so the factor (1 + bunga/100) is raised to the power of the days.' },
      { code: k23_6in + 'total = pinjaman * (1 + bunga) ** hari\nprint(total)', msg: 'Bunga dalam persen harus dibagi 100: 10% berarti faktor 1,10, bukan 11.', msgEn: 'A percentage must be divided by 100: 10% means a factor of 1.10, not 11.' },
      { code: k23_6in + 'total = pinjaman * (1 + bunga / 100) ** (hari - 1)\nprint(total)', msg: 'Jumlah hari berbunga sama dengan lama pinjaman (10 hari = 10 kali bunga). Pangkat adalah hari, bukan hari−1.', msgEn: 'The number of interest days equals the loan duration (10 days = 10 interest steps). The exponent is hari, not hari−1.', tag: 'off-by-one' },
    ],
    plan: 'baca pinjaman, bunga (%), hari (real); total ← pinjaman × (1 + bunga/100) pangkat hari; tulis total',
    skeleton: 'pinjaman = float(input())\nbunga = float(input())\nhari = float(input())\ntotal = pinjaman * (1 + bunga / ___) ** ___\nprint(total)',
    hints: ['Hari ke-1: total × 1.10; hari ke-2: dikali 1.10 lagi. Apa pola setelah hari ke-n?', 'Faktor harian adalah 1 + bunga/100; berapa kali faktor itu dikalikan?', 'Semua masukan riil: gunakan `float(input())`. Pangkat riil boleh dengan `**`.'],
    work: ['Baca pinjaman, bunga, hari dengan `float(input())`.', 'Faktor harian = 1 + bunga/100.', 'total = pinjaman × faktor^hari.', 'Tampilkan total.'],
    syntax: ['input', 'type-conversion', 'operators'],
    lineNotes: N(k23_6, [
      ['pinjaman = float', 'Besaran uang, bunga, dan hari adalah bilangan riil, maka `float(input())`.', 'The amount, rate, and days are real numbers, hence `float(input())`.', 'type-conversion', 'hari = float'],
      ['total = pinjaman', 'Bunga berbunga: faktor harian (1 + bunga/100) dikali hari kali. Persen dibagi 100; `**` melayani pangkat riil.', 'Compound interest: the daily factor (1 + bunga/100) is applied hari times. The percentage is divided by 100; `**` handles real exponents.', 'operators'],
      ['print(total)', 'Tampilkan jumlah akhir (format bebas).', 'Print the final amount (free format).'],
    ]),
    pseudoNotes: N(k23_6p, [
      ['input(pinjaman)', 'Tiga masukan real.', 'Three real inputs.'],
      ['total ←', 'Rumus bunga berbunga dalam satu pernyataan.', 'The compound-interest formula in a single statement.'],
    ]),
    explanation: 'Tiap hari total dikali (1 + bunga/100), sehingga setelah h hari total = pinjaman × (1 + bunga/100)^h. Pada contoh: 1000 × 1.1^10 = 2593.74. Alternatif tanpa pangkat: loop sebanyak hari kali dengan `total = total + total * bunga / 100` (valid bila hari bilangan bulat; di sini hari dibaca sebagai bilangan riil, sehingga rumus pangkat dipilih). Catatan: soal menyebut hari bilangan riil positif, tanpa aturan untuk hari pecahan.',
    refs: [{ src: S23, page: 5 }],
    en: {
      stem: 'A Fintech company "Pilus Aja" (Pinjam Dulu Saja, "borrow first") offers financial loans with "light interest". As an observer of pinjol (online loans), you find that the interest offered is compound interest, per day. To analyse this loan, write a program that calculates and displays how much money (in rupiah) must be repaid at maturity, with input of the initial loan (in rupiah), the interest (in percent), and the loan duration (in days). Assume the amounts, days, and interest are positive real numbers.\n\nExample: initial loan = 1000 rupiah, interest = 10% per day, and loan duration = 10 days, then\n\nDay 1: 10% interest of 1000 rupiah = 100 rupiah, total loan = 1100 rupiah\nDay 2: 10% interest of 1100 rupiah = 110 rupiah, total loan = 1210 rupiah\n\n(Input order: initial loan, interest (%), duration (days), one per line. Output format is free.)',
      plan: 'read loan, interest (%), days (real); total ← loan × (1 + interest/100) to the power of days; print total',
      hints: ['Day 1: total × 1.10; day 2: multiplied by 1.10 again. What is the pattern after day n?', 'The daily factor is 1 + interest/100; how many times is it multiplied?', 'All inputs are real: use `float(input())`. A real exponent works with `**`.'],
      work: ['Read loan, interest, days with `float(input())`.', 'Daily factor = 1 + interest/100.', 'total = loan × factor^days.', 'Print total.'],
      explanation: 'Each day the total is multiplied by (1 + interest/100), so after h days total = loan × (1 + interest/100)^h. In the example: 1000 × 1.1^10 = 2593.74. An alternative without a power: loop days times with `total = total + total * interest / 100` (valid when days is a whole number; here days is read as a real number, so the power formula was chosen). Note: the question says days is a positive real number, with no rule for fractional days.',
    },
  }],
})

/* ---- Soal 7: undian kupon ---- */

const k23_7 = r`# Program UndianKupon
# Menampilkan kupon (nomor kupon dan nomor identitas) yang nomor identitasnya dalam rentang X-Y s.d. X+Y
# DECLARATIONS
# N, i, X, Y : int
# ID : array [0..N-1] of int
# ada : bool
# ALGORITHM
N = int(input())
ID = [0 for i in range(N)]
for i in range(N):
    ID[i] = int(input())
X = int(input())
Y = int(input())
ada = False
for i in range(N):
    if (ID[i] >= X - Y and ID[i] <= X + Y):
        print(str(i) + " " + str(ID[i]))
        ada = True
if (not ada):
    print("Tidak ada pemenang undian")`
const k23_7p = r`Program UndianKupon
{ Menampilkan pasangan (nomor kupon, nomor identitas) dengan identitas dalam rentang X-Y s.d. X+Y }
KAMUS
  N, i, X, Y : integer
  ID : array [0..N-1] of integer
  ada : boolean
ALGORITMA
  input(N)
  i traversal [0..N-1]
    input(ID[i])
  input(X)
  input(Y)
  ada ← false
  i traversal [0..N-1]
    if ID[i] >= X - Y and ID[i] <= X + Y then
      output(i + " " + ID[i])
      ada ← true
  if not ada then
    output("Tidak ada pemenang undian")`
const k23_7pre = 'N = int(input())\nID = [0 for i in range(N)]\nfor i in range(N):\n    ID[i] = int(input())\nX = int(input())\nY = int(input())\n'
const coupons = ['5', '9827', '1944', '5052', '2011', '1234']
const k23_7t = (x: string, y: string, edge?: string) => ({ stdin: [...coupons, x, y], ...(edge ? { edge } : {}) })

problems.push({
  id: 'ku23-s7', archetype: 'program', title: 'Soal 7 – Undian kupon', source: prov(S23, 'Soal 7', [5, 6], 2023),
  en: { title: 'Q7 – Coupon lottery' },
  parts: [{
    id: 'ku23-s7a', kind: 'program', decks: ['D06'], topic: 'Range filter over an array with a flag', patterns: ['array-populate', 'array-map', 'search-flag'], misconceptions: ['index-range', 'init-in-loop'],
    stem: 'Sebuah program digunakan untuk pengundian pemenang hadiah sebuah acara hiburan. Pertama-tama disimpan dulu data kupon. Ditemukan ada sejumlah N kupon (N > 0) dan setiap kupon diberi nomor 0 s.d. N-1. Contoh N = 50 buah kupon, ada kupon nomor 0 s.d. 49. Dikarenakan kupon telah dibagikan ke setiap orang, untuk setiap kupon disimpan nomor identitas pemiliknya. Contoh kupon no. 1 dimiliki orang dengan nomor identitas 1234, kupon no. 10 dimiliki orang dengan nomor identitas 9827. Dipastikan setiap kupon dimiliki oleh orang yang berbeda dan nomor identitas tidak terurut sesuai dengan urutan nomor kupon.\n\nPenarikan undian dilakukan dengan cara yang tidak biasa. Pembawa acara hiburan akan menyebutkan 2 (dua) buah angka, misalnya X dan Y, dan pemenang undian adalah semua orang dengan nomor identitas dalam rentang X-Y s.d. X+Y. Selanjutnya ditampilkan pasangan nomor kupon dan nomor identitas setiap orang yang memenangkan undian secara berderet ke bawah. Jika tidak ada pemenang undian, maka diberikan pesan "Tidak ada pemenang undian".\n\nContoh data kupon: N = 5\n\n| No Identitas | 9827 | 1944 | 5052 | 2011 | 1234 |\n|---|---|---|---|---|---|\n| No Kupon | 0 | 1 | 2 | 3 | 4 |\n\nContoh:\n\n| X | Y | Pemenang Undian | Keterangan |\n|---|---|---|---|\n| 2000 | 100 | 1 1944 3 2011 | X-Y = 1900; X+Y = 2100 |\n| 1000 | 500 | 4 1234 | X-Y = 500; X+Y = 1500 |\n| 1000 | 50 | Tidak ada pemenang undian | X-Y = 950; X+Y = 1050 |\n| 1000 | 0 | Tidak ada pemenang undian | X-Y = 1000; X+Y = 1000 |\n\nBuatlah program di atas. Program menerima masukan N kupon (asumsikan N > 0, tidak perlu diperiksa) dan selanjutnya program menerima N buah data nomor identitas pemilik kupon (asumsikan masing-masing adalah integer > 0). Program kemudian menerima masukan nilai X dan Y (asumsikan masing-masing integer >= 0) dan selanjutnya menuliskan daftar kupon dan nomor identitas pemenang undian seperti deskripsi di atas.\n\nPetunjuk: daftar kupon dan nomor identitas pemilik disimpan sebagai array of integer dengan ukuran N.\n\n(Urutan masukan: N, lalu N nomor identitas satu per baris, lalu X, lalu Y.)',
    figures: [{ src: S23, page: 6 }],
    reps: ['python', 'pseudo', 'flow'], match: 'lenient', mustUse: ['array'], rubric: progRubric,
    solution: { python: k23_7, pseudo: k23_7p },
    tests: [k23_7t('2000', '100'), k23_7t('1000', '500'), k23_7t('1000', '50', 'no winner: message'), k23_7t('1000', '0', 'empty range X = Y... range is a single point, nobody'), k23_7t('1734', '500', 'lower bound X-Y equals an identity (inclusive)'), k23_7t('1000', '944', 'upper bound X+Y equals an identity (inclusive)'), { stdin: ['1', '5', '5', '0'], edge: 'N = 1, range is exactly the single id' }],
    wrong: [
      { code: k23_7pre + 'ada = False\nfor i in range(N):\n    if (ID[i] > X - Y and ID[i] < X + Y):\n        print(str(i) + " " + str(ID[i]))\n        ada = True\nif (not ada):\n    print("Tidak ada pemenang undian")', msg: 'Rentang X-Y s.d. X+Y termasuk kedua ujungnya. Gunakan `>=` dan `<=`, bukan `>` dan `<` (identitas tepat di X−Y atau X+Y juga menang).', msgEn: 'The range X-Y to X+Y includes both ends. Use `>=` and `<=`, not `>` and `<` (an identity exactly at X−Y or X+Y also wins).', tag: 'off-by-one' },
      { code: k23_7pre + 'for i in range(N):\n    if (ID[i] >= X - Y and ID[i] <= X + Y):\n        print(str(i) + " " + str(ID[i]))\n    else:\n        print("Tidak ada pemenang undian")', msg: 'Pesan "Tidak ada pemenang undian" dicetak untuk setiap kupon yang tidak menang. Pesan itu hanya muncul sekali, bila tidak ada satu pun pemenang: pakai flag lalu periksa setelah loop.', msgEn: 'The message "Tidak ada pemenang undian" is printed for every non-winning coupon. It must appear once, only when there is no winner at all: use a flag and check it after the loop.' },
      { code: k23_7pre + 'ada = False\nfor i in range(N):\n    if (ID[i] >= X - Y and ID[i] <= X + Y):\n        print(str(ID[i]) + " " + str(i))\n        ada = True\nif (not ada):\n    print("Tidak ada pemenang undian")', msg: 'Urutan pasangan terbalik: tampilkan nomor kupon dulu, baru nomor identitas.', msgEn: 'The pair is the wrong way round: print the coupon number first, then the identity number.' },
    ],
    plan: 'baca N; isi ID (N elemen); baca X, Y; ada ← false; untuk tiap i: jika ID[i] antara X−Y dan X+Y (inklusif) tulis i dan ID[i], ada ← true; setelah loop: jika tidak ada tulis pesan',
    skeleton: 'N = int(input())\nID = [0 for i in range(___)]\nfor i in range(N):\n    ID[i] = int(input())\nX = int(input())\nY = int(input())\nada = ___\nfor i in range(N):\n    if (ID[i] ___ X - Y and ID[i] ___ X + Y):\n        print(str(i) + " " + str(ID[i]))\n        ada = ___\nif (not ada):\n    print("Tidak ada pemenang undian")',
    hints: ['Nomor kupon adalah indeks array, nomor identitas adalah isinya. Apa yang harus dicetak untuk tiap pemenang?', 'Seorang pemenang memenuhi X−Y ≤ ID[i] ≤ X+Y: periksa kedua ujung sekaligus dan ujungnya ikut.', 'Pesan "tidak ada pemenang" hanya sekali, setelah semua kupon diperiksa: perlu flag.'],
    work: ['Baca N, buat array ID berukuran N dan isi lewat loop.', 'Baca X dan Y; ada = False.', 'Untuk i = 0..N−1: jika X−Y ≤ ID[i] ≤ X+Y, cetak i dan ID[i], set ada = True.', 'Setelah loop: bila ada masih False, cetak "Tidak ada pemenang undian".'],
    syntax: ['list-init', 'list-index', 'for-range', 'if'],
    lineNotes: N(k23_7, [
      ['N = int', 'Banyaknya kupon, bilangan bulat positif.', 'The number of coupons, a positive integer.', 'input'],
      ['ID = [0', 'Array berukuran N: indeks = nomor kupon 0..N−1, isi = nomor identitas.', 'An N-element array: index = coupon number 0..N−1, value = identity number.', 'list-init'],
      ['ID[i] = int', 'Isi array dari masukan dengan loop `range(N)` (indeks 0..N−1).', 'Fill the array from input with a `range(N)` loop (indexes 0..N−1).', 'list-index', 'ID[i] = int'],
      ['X = int', 'X dan Y dibaca setelah seluruh data kupon.', 'X and Y are read after all the coupon data.', 'input', 'Y = int'],
      ['ada = False', 'Flag "sudah ada pemenang", diinisialisasi sebelum loop.', 'The "a winner exists" flag, initialised before the loop.'],
      ['if (ID[i] >= X - Y', 'Rentang tertutup X−Y..X+Y: `>=` dan `<=` agar kedua ujung ikut menang.', 'The closed range X−Y..X+Y: `>=` and `<=` so both ends win.', 'relational-logical'],
      ['print(str(i)', 'Cetak pasangan nomor kupon (indeks i) lalu identitas; satu pasangan per baris; `str()` wajib saat digabung.', 'Print the pair coupon number (index i) then identity; one pair per line; `str()` is required when joining.', 'print-str'],
      ['ada = True', 'Tandai bahwa ada pemenang; tidak ada break karena semua pemenang harus dicetak.', 'Mark that there is a winner; no break because every winner must be printed.'],
      ['if (not ada)', 'Pesan dicetak sekali setelah loop, hanya bila tidak ada pemenang.', 'The message is printed once after the loop, only when there is no winner.'],
    ]),
    pseudoNotes: N(k23_7p, [
      ['i traversal [0..N-1]', 'Traversal indeks (nomor kupon) 0..N−1 untuk mengisi array.', 'Traverse indexes (coupon numbers) 0..N−1 to fill the array.'],
      ['ada ← false', 'Flag sebelum traversal pencarian.', 'The flag before the search traversal.'],
      ['if ID[i] >= X - Y', 'Rentang tertutup: kedua ujung ikut.', 'A closed range: both ends included.'],
      ['if not ada', 'Pesan sekali setelah traversal.', 'The message once after the traversal.'],
    ]),
    explanation: 'Satu loop atas indeks (nomor kupon) memfilter elemen ID yang berada di rentang tertutup [X−Y, X+Y], mencetak "kupon identitas" per baris, dan sebuah flag menentukan apakah pesan "Tidak ada pemenang undian" perlu dicetak. Contoh X = 1000, Y = 0: rentang 1000..1000 tidak berisi identitas mana pun sehingga tidak ada pemenang. Catatan: tabel contoh di soal menuliskan pasangan pada satu baris ("1 1944 3 2011") karena ruang tabel; teks soal meminta berderet ke bawah. Penilaian membandingkan isinya tanpa memedulikan pemisah baris.',
    refs: [{ src: S23, page: 5 }, { src: S23, page: 6 }],
    en: {
      stem: 'A program is used to draw the winners of a prize in an entertainment event. First, the coupon data is stored. There are N coupons (N > 0) and each coupon is numbered 0 to N-1. For example with N = 50 coupons there are coupons numbered 0 to 49. Because the coupons have been handed out to everyone, the identity number of its owner is stored for each coupon. For example coupon no. 1 is owned by the person with identity number 1234, coupon no. 10 by the person with identity number 9827. It is guaranteed that every coupon is owned by a different person and the identity numbers are not sorted in the order of the coupon numbers.\n\nThe draw is done in an unusual way. The host names 2 (two) numbers, say X and Y, and the winners are all people whose identity number lies in the range X-Y to X+Y. Then the coupon-number and identity-number pair of every winner is displayed one below another. If there is no winner, the message "Tidak ada pemenang undian" ("no lottery winner") is given.\n\nSample coupon data: N = 5\n\n| Identity no. | 9827 | 1944 | 5052 | 2011 | 1234 |\n|---|---|---|---|---|---|\n| Coupon no. | 0 | 1 | 2 | 3 | 4 |\n\nExamples:\n\n| X | Y | Lottery winners | Remark |\n|---|---|---|---|\n| 2000 | 100 | 1 1944 3 2011 | X-Y = 1900; X+Y = 2100 |\n| 1000 | 500 | 4 1234 | X-Y = 500; X+Y = 1500 |\n| 1000 | 50 | Tidak ada pemenang undian | X-Y = 950; X+Y = 1050 |\n| 1000 | 0 | Tidak ada pemenang undian | X-Y = 1000; X+Y = 1000 |\n\nWrite the program above. The program receives the number of coupons N (assume N > 0, no need to check) and then N identity numbers of the coupon owners (assume each is an integer > 0). The program then receives the values X and Y (assume each is an integer >= 0) and then writes the list of coupons and identity numbers of the winners as described above.\n\nHint: the list of coupons and owner identity numbers is stored as an array of integer of size N.\n\n(Input order: N, then the N identity numbers one per line, then X, then Y.)',
      plan: 'read N; fill ID (N elements); read X, Y; found ← false; for each i: if ID[i] lies between X−Y and X+Y (inclusive) print i and ID[i], found ← true; after the loop: if none, print the message',
      hints: ['The coupon number is the array index and the identity number is the value. What must be printed for each winner?', 'A winner satisfies X−Y ≤ ID[i] ≤ X+Y: test both ends together, and the ends count.', 'The "no winner" message appears once, after all coupons are checked: a flag is needed.'],
      work: ['Read N, create the array ID of size N and fill it in a loop.', 'Read X and Y; found = False.', 'For i = 0..N−1: if X−Y ≤ ID[i] ≤ X+Y, print i and ID[i], set found = True.', 'After the loop: if found is still False, print "Tidak ada pemenang undian".'],
      explanation: 'One loop over the indexes (coupon numbers) filters the ID elements that lie in the closed range [X−Y, X+Y], printing "coupon identity" per line, and a flag decides whether the message "Tidak ada pemenang undian" must be printed. Example X = 1000, Y = 0: the range 1000..1000 contains no identity, so there is no winner. Note: the example table in the question writes the pairs on one line ("1 1944 3 2011") because of table space; the question text asks for one below another. Marking compares the content regardless of the line separators.',
    },
  }],
})

/* ================================== PAPERS ================================== */

export const bank: BankFile = {
  problems,
  papers: [
    {
      id: 'ku1102-2022', title: 'UTS KU1102 Pengenalan Komputasi 2022 (Stream Pemrograman)', year: 2022, date: '2022-11-05', minutes: 120, kind: 'older' as const, lang: 'id' as const,
      note: 'Predecessor course of WI1102 (Python). Part A (Q1-Q3, computing systems/networks/impact) is outside the syllabus. No official key or weights are printed; the answers were written by us. The paper header misprints the semester as "2022/2022" and the date as "202".',
      noteId: 'Mata kuliah pendahulu WI1102 (Python). Bagian A (Soal 1-3, sistem computing/jaringan/dampak) di luar silabus. Kunci dan bobot resmi tidak dicetak; jawaban disusun sendiri. Kepala soal salah cetak semester "2022/2022" dan tanggal "202".',
      problems: ['ku22-s1', 'ku22-s2', 'ku22-s3', 'ku22-s4', 'ku22-s5', 'ku22-s6', 'ku22-s7'],
    },
    {
      id: 'ku1102-2023', title: 'UTS KU1102 Pengenalan Komputasi 2023 (Stream Pemrograman)', year: 2023, date: '2023-10-25', minutes: 120, kind: 'older' as const, lang: 'id' as const,
      note: 'Predecessor course of WI1102 (Python). Weights: Part A 25%, Part B 25%, Part C 50% + 10% bonus. Part A (Q1-Q3) is outside the syllabus. Q4 comes with an official worked solution (page 3); the other answers were written by us. The header misprints the semester as "2013/2024".',
      noteId: 'Mata kuliah pendahulu WI1102 (Python). Bobot: Bagian A 25%, Bagian B 25%, Bagian C 50% + bonus 10%. Bagian A (Soal 1-3) di luar silabus. Soal 4 disertai pembahasan resmi (halaman 3); jawaban lain disusun sendiri. Kepala soal salah cetak semester "2013/2024".',
      problems: ['ku23-s1', 'ku23-s2', 'ku23-s3', 'ku23-s4', 'ku23-s5', 'ku23-s6', 'ku23-s7'],
    },
  ],
}
