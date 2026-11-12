// UTS WI1102 Berpikir Komputasional, 29 Nov 2025 (scan of a real student's marked attempt; page 1 / cover is missing).
// Bagian I: 10 multiple-correct MCQs. Bagian II: Soal 1-5. Student answers are anonymised (no name / NIM).
// Scan page map: 001-002 = paper pp.2-3 (Bagian I), 003-004 = S1, 005 = S2, 006 = S3, 007-008 = S4, 009 = S5.
import type { BankFile, MCQMulti, RubricRow } from '../types'

const r = String.raw
const withEn = (rows: RubricRow[], en: string[]): RubricRow[] => rows.map((row, i) => ({ ...row, descEn: en[i] }))
const SRC = 'UTS2025_attempt_scan'
const ref = (page: number) => ({ src: SRC, page })

/* ------------------------------------------------------------------ rubrics (official 2024 wording, adapted to the item) */
// The 2025 grading guide is not available; rubrics follow the official 2024 Petunjuk Penilaian format (0-4, AB = 3.5).
const RB_CONSTRAINT_A: RubricRow[] = withEn([
  { score: 4, desc: 'Konfigurasi yang diberikan tepat memenuhi semua constraint' },
  { score: 3, desc: 'Konfigurasi yang diberikan memenuhi hanya sebagian besar constraint (satu constraint dilanggar)' },
  { score: 2, desc: 'Konfigurasi yang diberikan memenuhi hanya salah satu constraint' },
  { score: 1, desc: 'Konfigurasi yang diberikan tidak memenuhi constraint yang ditetapkan, tapi masih ada aspek yang benar.' },
  { score: 0, desc: 'Tidak mengerjakan atau jawaban sama sekali salah.' },
], [
  "The configuration given satisfies all constraints exactly",
  "The configuration given satisfies most constraints (one constraint is violated)",
  "The configuration given satisfies only one of the constraints",
  "The configuration given does not satisfy the stated constraints, but some aspects are still correct.",
  "Not attempted, or the answer is entirely wrong.",
])
const RB_CT_EXPLAIN: RubricRow[] = withEn([
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
const RB_CLASS_A: RubricRow[] = withEn([
  { score: 4, desc: 'Sistem klasifikasi hierarkis benar (menunjukkan klasifikasi dan ada hierarki yang benar dan jelas terdefinisi)' },
  { score: 3, desc: 'Sistem klasifikasi hierarkis secara umum benar, tetapi ada satu aspek yang salah.' },
  { score: 2, desc: 'Memberikan klasifikasi berdasarkan satu kolom tertentu, tetapi tidak ada hierarki. Membuat klasifikasi yang hierarkis, tetapi berdasarkan kolom yang tidak tepat karena nilai-nilai kolomnya sangat berbeda satu sama lain sehingga kurang tepat untuk klasifikasi.' },
  { score: 1, desc: 'Masih ada aspek yang tepat dari jawaban, tetapi secara umum jawaban tidak tepat.' },
  { score: 0, desc: 'Tidak menjawab atau jawaban salah total.' },
], [
  "The hierarchical classification system is correct (it shows a classification and the hierarchy is correct and clearly defined)",
  "The hierarchical classification system is generally correct, but one aspect is wrong.",
  "Gives a classification based on one particular column, but there is no hierarchy. Or builds a hierarchical classification, but on an unsuitable column because its values differ so much from one another that it is a poor basis for classification.",
  "Some aspects of the answer are still correct, but in general the answer is not correct.",
  "No answer, or the answer is wrong entirely.",
])
const RB_CLASS_B: RubricRow[] = withEn([
  { score: 4, desc: 'Klasifikasi pada soal (a) minimum bernilai 3 dan penjelasan lengkap dan benar.' },
  { score: 3, desc: 'Klasifikasi pada soal (a) minimum bernilai 3, penjelasan ada, tetapi ada kesalahan pada penjelasan.' },
  { score: 2, desc: 'Klasifikasi pada soal (a) bernilai 1 atau 2, tetapi penjelasan tepat dan baik. Penjelasan tepat dan baik, tapi tidak sesuai dengan klasifikasi yang disebutkan di soal (a) atau soal (a) tidak menjawab.' },
  { score: 1, desc: 'Penjelasan tidak lengkap, tetapi masih ada yang benar.' },
  { score: 0, desc: 'Tidak menjawab atau jawaban sama sekali salah.' },
], [
  "The classification in part (a) is worth at least 3 and the explanation is complete and correct.",
  "The classification in part (a) is worth at least 3 and an explanation is given, but the explanation contains errors.",
  "The classification in part (a) is worth 1 or 2, but the explanation is correct and good. Or the explanation is correct and good but does not match the classification given in part (a), or part (a) was not answered.",
  "The explanation is incomplete, but some of it is still correct.",
  "No answer, or the answer is entirely wrong.",
])
const RB_CLASS_C: RubricRow[] = withEn([
  { score: 4, desc: 'Kode yang diberikan seluruhnya benar, boleh ada kesalahan minor (karena kurang teliti) dan sesuai dengan pola yang ditetapkan pada soal (a) dan (b)' },
  { score: 3, desc: 'Kode secara umum benar, tetapi sebagian kecil tidak mengikuti pola yang ditetapkan pada soal (a) dan (b)' },
  { score: 2, desc: 'Kode yang diberikan mengikuti pola tertentu dengan benar, tapi tidak sesuai dengan pola klasifikasi hierarki pada soal (a) dan (b). Cara membuat kode, sebagian sesuai dengan pola pada soal (a) dan (b) tetapi sebagian lagi tidak.' },
  { score: 1, desc: 'Masih ada bagian kode yang benar, tapi sebagian besar salah' },
  { score: 0, desc: 'Tidak menjawab atau jawaban salah total.' },
], [
  "The codes given are entirely correct (minor errors from carelessness are allowed) and follow the pattern defined in parts (a) and (b)",
  "The codes are generally correct, but a small part does not follow the pattern defined in parts (a) and (b)",
  "The codes follow some pattern correctly, but not the hierarchical classification pattern of parts (a) and (b). Or the way the codes are made partly follows the pattern of parts (a) and (b) and partly does not.",
  "Some parts of the codes are correct, but most are wrong",
  "No answer, or the answer is wrong entirely.",
])
const RB_ROBOT: RubricRow[] = withEn([
  { score: 4, desc: 'Urutan langkah dapat digunakan untuk menggambarkan bentuk dengan tepat sesuai instruksi' },
  { score: 3.5, desc: 'Ada kesalahan kecil yang menyebabkan solusi tidak sempurna' },
  { score: 3, desc: 'Urutan langkah kurang, tapi secara umum masih akan menghasilkan bentuk yang diharapkan walaupun tidak sempurna, Ada perintah-perintah yang seharusnya bisa diulang (dengan perintah repeat) tapi dituliskan berjajar, namun hasil eksekusi benar.' },
  { score: 2, desc: 'Hanya sebagian urutan langkah akan menghasilkan sebagian bentuk yang diharapkan. Termasuk jika terjadi sebuah kesalahan (walaupun hanya 1 langkah) yang menyebabkan bentuk tidak tergambar dengan benar, tetapi sebenarnya masih mengarah ke bentuk yang diharapkan.' },
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
const RB_ROBOT_EXPLAIN: RubricRow[] = withEn([
  { score: 4, desc: 'Penjelasan mencakup keempat konsep (abstraksi, dekomposisi, pengenalan pola, berpikir algoritmik) dan konsisten dengan program pada (a)' },
  { score: 3, desc: 'Penjelasan mencakup sebagian besar konsep dengan benar, tetapi ada satu konsep yang kurang tepat atau tidak disebut' },
  { score: 2, desc: 'Penjelasan benar hanya untuk separuh konsep, atau tidak dikaitkan dengan program pada (a)' },
  { score: 1, desc: 'Penjelasan umumnya tidak tepat, tetapi masih ada hal benar' },
  { score: 0, desc: 'Tidak menjawab atau jawaban sama sekali salah.' },
], [
  "The explanation covers all four concepts (abstraction, decomposition, pattern recognition, algorithmic thinking) and is consistent with the program in (a)",
  "The explanation covers most of the concepts correctly, but one concept is inaccurate or not mentioned",
  "The explanation is correct for only half of the concepts, or is not linked to the program in (a)",
  "The explanation is generally incorrect, but some correct points remain",
  "No answer, or the answer is entirely wrong.",
])
const RB_PROGRAM: RubricRow[] = withEn([
  { score: 4, desc: 'Program lengkap dan secara umum tepat, masih boleh ada kesalahan minor' },
  { score: 3.5, desc: 'Program sebagian besar benar, tetapi ada 1 kesalahan minor pada program' },
  { score: 3, desc: 'Ada kesalahan pada sebagian kecil bagian program' },
  { score: 2, desc: 'Secara umum hanya setengah bagian dari program yang tepat' },
  { score: 1, desc: 'Hanya ada sebagian kecil jawaban yang benar' },
  { score: 0, desc: 'Tidak dikerjakan atau jawaban salah total.' },
], [
  "The program is complete and generally correct; minor errors are still allowed",
  "The program is mostly correct, but has 1 minor error",
  "There are errors in a small part of the program",
  "In general only half of the program is correct",
  "Only a small part of the answer is correct",
  "Not attempted, or the answer is entirely wrong.",
])
const RB_FLOW: RubricRow[] = withEn([
  { score: 4, desc: 'Flowchart lengkap, simbol dan alur benar (masukan, pengulangan dengan syarat henti, percabangan, keluaran), secara umum tepat; masih boleh ada kesalahan minor' },
  { score: 3.5, desc: 'Flowchart sebagian besar benar, tetapi ada 1 kesalahan minor' },
  { score: 3, desc: 'Ada kesalahan pada sebagian kecil bagian flowchart' },
  { score: 2, desc: 'Secara umum hanya setengah bagian dari flowchart yang tepat, atau alur sulit diikuti' },
  { score: 1, desc: 'Hanya ada sebagian kecil jawaban yang benar' },
  { score: 0, desc: 'Tidak dikerjakan atau jawaban salah total.' },
], [
  "The flowchart is complete, with correct symbols and flow (input, repetition with a stop condition, branching, output), generally correct; minor errors are still allowed",
  "The flowchart is mostly correct, but has 1 minor error",
  "There are errors in a small part of the flowchart",
  "In general only half of the flowchart is correct, or the flow is hard to follow",
  "Only a small part of the answer is correct",
  "Not attempted, or the answer is entirely wrong.",
])

/* ------------------------------------------------------------------ Bagian I */
const MCQ_EXPL_EN: Record<number, string> = {
  1: "Slide D11 (The Digital World as a Source of Lifelong Learning): learning materials are easy to access (b), the internet provides many kinds of learning media (c), and education may be combined with entertainment (*edutainment*), so (d) is false. Option (a) is a true sentence but not a reason why the digital world is a source of learning; the key on the marked sheet treats it as false. Note: the key is not published; (a) = false is inferred from the score of 2 and the red mark on option (a) on the student's sheet (circling a, b, c and crossing d gives 2 only if exactly one mark is wrong). Student's sheet: ○a ○b ○c ✗d, score 2. Lesson: answer the *question*, not merely whether the sentence is true.",
  2: "Keyword \"negative\": rule violations and dishonesty (a, d). (b) and (c) are ordinary, legitimate uses. Student's sheet: ○a ✗b ✗c ○d → 4.",
  3: "Slide D11 p.15 (Avoiding Addiction & Violence): physical and social activity in the real world, talk about problems directly with parents, teachers or doctors, limit gadget time, delete unneeded apps. Student's sheet: ○a ✗b ✗c ○d → 4.",
  4: "Definitions (a), (b), (c) match slide D11 (p.11-12). (d) swaps *doxxing* with *trolling* (provoking emotions with inflammatory or off-topic content). Doxxing = exposing and spreading a person's private information. Student's sheet: ○a ○b ○c ✗d → 4.",
  5: "Slide D11 p.24-26: norms and ethics = moral guidelines (violating them causes shame), regulations = operational rules with sanctions, so (b) is false. Netiquette: \"Don't assume you are anonymous\", so (d) is false. Student's sheet: ○a ✗b ○c ✗d → 4.",
  6: "Slide D11 p.19: personal data stored on servers spreads easily, employee monitoring, CCTV, wiretapping. Two-factor authentication is a *protection*. Student's sheet: ○a ○b ✗c ○d → 4.",
  7: "ITE Law = Law No. 11/2008 (slide D11 p.27). Slide D11 p.30: Article 27(3) (insult/defamation) and Article 45(1) (imprisonment of up to 6 years). Law No. 27/2022 is the PDP (Personal Data Protection) Law, so (b) and (c) are not about the ITE Law. Student's sheet: apparently ✗a, ○b, ○c, ○d, score −2 (a −1, b −1, c −1, d +1), so the key [a true, b false, c false, d true] is consistent with the score of −2. Lesson: when in doubt, do not mark; one wrong mark cancels one correct mark. Note: Law 1/2024 changed the criminal penalty; follow slide D11 for the exam.",
  8: "Impacts of computing in the world of work (slide D11 p.5, p.31-34): efficiency and automation (displacing manual work), globalisation and outsourcing. (b) and (d) are not caused by computing technology. Student's sheet: ○a ✗b ○c ✗d → 4.",
  9: "Slide D11 p.39: 8 definitions, 4 approaches (Russell & Norvig). Thinking rationally = the study of the computations that make perceiving, reasoning and acting possible. Acting humanly = how to make computers do things at which, at the moment, people are better. The question swaps the approach labels on the same definitions. Student's sheet: ✗a ○b ✗c ○d → 4.",
  10: "Positive impacts: efficiency in warehouses and manufacturing (p.51, p.53), route finding / traffic (p.48). Plagiarism and job loss are negative impacts. Student's sheet: ○a ✗b ✗c ○d → 4 (option d is printed with the label \"a.\" on the paper; this is a printing glitch).",
}
function mcq(
  n: number, topic: string, stem: string, options: string[], correct: boolean[], why: string[], explanation: string,
  en: { stem: string; options: string[]; why: string[] }, page: number, extra?: Partial<MCQMulti>,
): MCQMulti {
  return {
    id: `uts25-i-${String(n).padStart(2, '0')}`, kind: 'mcq-multi', label: String(n), decks: ['D11'], topic, stem, options, correct, why, explanation,
    refs: [ref(page)], difficulty: 1, en: { ...en, explanation: MCQ_EXPL_EN[n] }, ...extra,
  }
}

const bagianI = [
  mcq(1, 'Digital world & lifelong learning',
    'Mana sajakah yang **benar** terkait dunia digital sebagai sumber belajar seumur hidup?',
    ['Teknologi komputer sudah menjadi bagian dari kehidupan sehari-hari.', 'Di internet, berbagai bahan belajar tersedia dapat dapat diakses dengan mudah.', 'Internet menyediakan berbagai pilihan media untuk belajar, mulai dari blog, forum, website, bahkan media sosial.', 'Pendidikan dan hiburan tidak dapat digabungkan karena saling bertolak belakang.'],
    [false, true, true, false],
    ['Pernyataan ini benar sebagai fakta umum, tetapi tidak menjawab pertanyaan (dunia digital sebagai *sumber belajar*). Pada lembar yang dinilai, pilihan ini ditandai salah oleh pemeriksa.', 'Slide D11: bahan ajar tersedia dan mudah diakses secara digital.', 'Slide D11: internet menawarkan blog, forum, website, dan beragam media untuk belajar apa saja, di mana saja.', 'Salah: slide D11 justru menyebut *edutainment*, yaitu gabungan pendidikan dan hiburan.'],
    'Slide D11 (Dunia Digital sebagai Sumber Belajar Seumur Hidup): materi belajar mudah diakses (b), internet menyediakan berbagai media belajar (c), dan pendidikan boleh digabung dengan hiburan (*edutainment*), sehingga (d) salah. Pilihan (a) benar sebagai kalimat tetapi bukan alasan dunia digital menjadi sumber belajar; kunci pada lembar yang dinilai menganggapnya salah. Catatan: kunci tidak dipublikasikan; (a) = salah disimpulkan dari nilai 2 dan coretan merah pada pilihan (a) di lembar mahasiswa (lingkari a, b, c, silang d memberi 2 hanya jika satu tanda salah). Lembar mahasiswa: ○a ○b ○c ✗d, nilai 2. Pelajaran: jawab sesuai *pertanyaan*, bukan sekadar kebenaran kalimat.',
    { stem: 'Which of the following are **true** about the digital world as a source of lifelong learning?', options: ['Computer technology has become part of everyday life.', 'On the internet, many learning materials are available and easy to access.', 'The internet offers many media for learning, from blogs and forums to websites and even social media.', 'Education and entertainment cannot be combined because they are opposites.'], why: ['True as a general fact, but it does not answer the question; the marker crossed it as wrong.', 'D11: materials are readily accessible.', 'D11: blogs, forums, websites and more.', 'False: D11 presents edutainment.'] }, 1),
  mcq(2, 'Negative impact on campus',
    'Contoh mana saja yang menunjukkan penggunaan teknologi computing secara negatif dalam kegiatan akademik dan kemahasiswaan.',
    ['Mahasiswa menggunakan sosial media untuk memberikan jawaban ujian online-nya kepada temannya yang kesulitan dengan materi ujian tersebut walaupun hal tersebut tidak diperbolehkan pengawas.', 'Dengan menggunakan search engine di internet, mahasiswa bisa memperoleh berbagai makalah yang relevan untuk tugas akhirnya.', 'Mahasiswa berkolaborasi dengan mahasiswa lain dalam projek PKM dengan memanfaatkan media sosial sebagai platform untuk berkomunikasi dan bekerja sama.', 'Mahasiswa menggunakan Chat GPT untuk men-generate kode program dalam praktikum walaupun hal tersebut dilarang oleh pengelola praktikum dan membuatnya tidak belajar membuat kode program dengan baik'],
    [true, false, false, true],
    ['Berbagi jawaban ujian yang dilarang pengawas = kecurangan akademik.', 'Mencari referensi relevan adalah penggunaan positif.', 'Kolaborasi lewat media sosial untuk PKM adalah penggunaan positif.', 'Melanggar aturan praktikum dan menghilangkan proses belajar = penggunaan negatif.'],
    'Kata kunci "negatif": pelanggaran aturan/ketidakjujuran (a, d). (b) dan (c) adalah pemanfaatan wajar. Lembar mahasiswa: ○a ✗b ✗c ○d → 4.',
    { stem: 'Which examples show a NEGATIVE use of computing in academic and student life?', options: ['A student shares online exam answers over social media although the proctor forbids it.', 'A student finds relevant papers for the thesis with a search engine.', 'Students collaborate on a PKM project using social media to communicate.', 'A student uses ChatGPT to generate code in a practicum although the practicum rules forbid it, so they fail to learn to code.'], why: ['Cheating.', 'Positive use.', 'Positive use.', 'Rule violation and lost learning.'] }, 1),
  mcq(3, 'Preventing addiction & violence',
    'Apa saja tindakan yang tepat untuk mencegah kekerasan dan kecanduan di internet?',
    ['Lebih banyak melakukan aktivitas fisik yang tidak memanfaatkan gadget, seperti berolahraga dan bermain dengan teman di tempat rekreasi.', 'Mencari informasi tentang keresahan diri di internet, tidak merasa perlu berkonsultasi dengan ahli kejiwaan atau keluarga.', 'Men-download aplikasi game sebanyak-banyaknya untuk kepuasan diri.', 'Membicarakan kegalauan jiwa dengan orang tua.'],
    [true, false, false, true],
    ['Slide D11 "Avoiding Addiction & Violence": aktivitas fisik, bermain, olahraga, rekreasi.', 'Salah: slide menyarankan *tidak* mencari semua jawaban sendiri lewat internet; bicarakan dengan orang tua/guru/dokter.', 'Salah: menambah paparan game justru memperbesar risiko kecanduan.', 'Benar: bicarakan masalah dengan orang tua, guru, atau dokter.'],
    'Slide D11 h15 (Avoiding Addiction & Violence): aktivitas fisik dan sosial di dunia nyata, bicarakan masalah langsung dengan orang tua/guru/dokter, batasi waktu gadget, hapus aplikasi tak perlu. Lembar mahasiswa: ○a ✗b ✗c ○d → 4.',
    { stem: 'Which actions are appropriate to prevent violence and addiction on the internet?', options: ['More physical activity without gadgets, such as sports and playing with friends at recreation spots.', 'Searching the internet for information about one\'s worries, not feeling the need to consult a mental-health professional or family.', 'Downloading as many game apps as possible for self-satisfaction.', 'Talking about one\'s troubles with parents.'], why: ['D11: more physical activity.', 'False: do not try to find all answers online alone.', 'False: more exposure.', 'True.'] }, 1),
  mcq(4, 'Online-violence terms',
    'Mana sajakah istilah yang tepat berkaitan dengan kekerasan di internet:',
    ['Cyberbullying adalah bentuk kekerasan verbal atau psikologis yang dilakukan melalui platform digital, seperti media sosial, pesan instan, atau forum daring.', 'Cyberviolence is penggunaan sistem komputer untuk menyebabkan, memfasilitasi, atau mengancam kekerasan terhadap individu yang mengakibatkan, atau mungkin mengakibatkan, kerugian atau penderitaan fisik, seksual, psikologis atau ekonomi dan dapat mencakup eksploitasi keadaan, karakteristik atau kerentanan individu tersebut.', 'Grooming adalah upaya oleh predator untuk membangun hubungan dengan individu muda atau rentan melalui teknologi untuk tujuan eksploitasi atau kekerasan.', 'Doxxing adalah suatu bentuk gangguan daring di mana seseorang secara sengaja mengeposkan informasi yang bersifat menghasut, tidak sesuai topik, atau salah untuk memancing respons emosional.'],
    [true, true, true, false],
    ['Sesuai definisi slide D11 h11.', 'Sesuai definisi Council of Europe di slide D11 h12.', 'Sesuai definisi slide D11 h11.', 'Salah: itu definisi *trolling*. *Doxxing* adalah menyebarkan data pribadi seseorang tanpa izin.'],
    'Definisi (a), (b), (c) sama dengan slide D11 (h11-h12). (d) menukar *doxxing* dengan *trolling* (memancing emosi dengan konten menghasut/di luar topik). Doxxing = membuka dan menyebarkan informasi pribadi seseorang. Lembar mahasiswa: ○a ○b ○c ✗d → 4.',
    { stem: 'Which terms are correctly defined with respect to violence on the internet?', options: ['Cyberbullying: verbal or psychological abuse through digital platforms such as social media, instant messaging, or forums.', 'Cyberviolence: use of computer systems to cause, facilitate or threaten violence against individuals, resulting in physical, sexual, psychological or economic harm.', 'Grooming: a predator\'s attempt to build a relationship with a young or vulnerable person through technology in order to exploit or abuse them.', 'Doxxing: deliberately posting inflammatory, off-topic or false information to provoke an emotional response.'], why: ['Matches D11.', 'Matches D11.', 'Matches D11.', 'False: that describes trolling; doxxing is exposing private information.'] }, 1),
  mcq(5, 'Norms, ethics, netiquette',
    'Mana sajakah yang tepat terkait norma dan etika beraktivitas di internet atau menggunakan teknologi computing?',
    ['Dalam etika menggunakan teknologi computing, kita diharapkan memahami hukum dengan baik.', 'Norma dan etika pada dasarnya sama dengan regulasi.', 'Memahami etika mengirimkan pesan di internet berarti memahami bagaimana cara berkomunikasi di internet yang bisa jadi berbeda dengan cara berkomunikasi secara langsung.', 'Kita bisa melakukan apa pun di internet asalkan kita bisa anonymous.'],
    [true, false, true, false],
    ['Slide D11 "Computer Ethics": know the rules and the law.', 'Salah: norma/etika adalah pedoman moral (rasa malu); regulasi bersifat operasional dengan sanksi.', 'Benar: netiquette, "learn the nonverbal language of the Net".', 'Salah: netiquette justru "Don\'t assume you are anonymous".'],
    'Slide D11 h24-h26: norma dan etika = pedoman moral (pelanggaran menimbulkan rasa malu), regulasi = aturan operasional dengan sanksi, sehingga (b) salah. Netiquette: "Don\'t assume you are anonymous", sehingga (d) salah. Lembar mahasiswa: ○a ✗b ○c ✗d → 4.',
    { stem: 'Which statements about norms and ethics on the internet or when using computing technology are correct?', options: ['In computing ethics, we are expected to understand the law well.', 'Norms and ethics are basically the same as regulations.', 'Understanding the ethics of sending messages online means understanding that communication online may differ from face-to-face communication.', 'We can do anything online as long as we are anonymous.'], why: ['D11: know the rules and the law.', 'False: norms are moral guidelines, regulations carry sanctions.', 'True: netiquette.', 'False: don\'t assume you are anonymous.'] }, 2),
  mcq(6, 'Privacy threats',
    'Mana sajakah penggunaan teknologi computing yang dapat mengancam privasi seseorang:',
    ['Data pribadi yang diletakkan di internet tersimpan di database server memungkinkan diolah oleh perusahaan untuk kepentingan perusahaan tersebut.', 'Dewasa ini, di tempat-tempat kerja (kantor) banyak dipasang surveilans (misalnya CCTV) yang digunakan untuk memantau pergerakan para karyawan.', 'Teknologi two-factor authentication pada beberapa social media dibuat sedemikian rupa sehingga tidak mudah mengakses akun seseorang.', 'Negara memanfaatkan perusahaan-perusahaan teknologi informasi dapat memasang mekanisme untuk menyadap komunikasi warga negaranya.'],
    [true, true, false, true],
    ['Slide D11 "Threats to Privacy": data di server database, dipakai e-commerce untuk iklan dsb.', 'Slide D11: pemantauan ketat karyawan di tempat kerja.', 'Salah: 2FA *melindungi* privasi/akun, bukan mengancamnya.', 'Slide D11: surveilans/penyadapan atas individu, organisasi, bahkan negara.'],
    'Slide D11 h19: data pribadi tersimpan di server dan mudah menyebar, pemantauan karyawan, CCTV, penyadapan. Two-factor authentication adalah *perlindungan*. Lembar mahasiswa: ○a ○b ✗c ○d → 4.',
    { stem: 'Which uses of computing technology can threaten a person\'s privacy?', options: ['Personal data placed online is stored in a server database and can be processed by a company for its own interests.', 'Workplaces increasingly install surveillance (e.g. CCTV) to monitor employees\' movements.', 'Two-factor authentication on some social media makes it harder to access someone\'s account.', 'A state uses IT companies to install mechanisms for wiretapping its citizens\' communications.'], why: ['Threat.', 'Threat.', 'Protection, not a threat.', 'Threat.'] }, 2),
  mcq(7, 'UU ITE & UU PDP',
    'Mana sajakah yang benar mengenai undang-undang informasi dan transaksi elektronik?',
    ['UU No. 11 tahun 2008', 'UU No. 27 tahun 2022', 'Dalam pasal 65 dinyatakan bahwa setiap orang dilarang secara melawan hukum mengungkapkan data pribadi yang bukan miliknya.', 'Dalam undang-undang tersebut dinyatakan, setiap orang dengan sengaja dan tanpa hak mendistribusikan dan/atau mentransmisikan dan/atau membuat dapat diaksesnya Informasi Elektronik dan/atau Dokumen Elektronik yang memiliki muatan penghinaan dan/atau pencemaran nama baik dapat dipidana dengan pidana penjara paling lama 6 (enam) tahun.'],
    [true, false, false, true],
    ['Benar: UU ITE = UU No. 11 Tahun 2008 (diubah UU 19/2016 dan UU 1/2024).', 'Salah: UU No. 27 Tahun 2022 adalah UU Pelindungan Data Pribadi (PDP), bukan UU ITE.', 'Salah: pasal tentang mengungkapkan data pribadi milik orang lain ada di UU PDP, bukan UU ITE.', 'Benar menurut slide: Pasal 27 ayat (3) jo. Pasal 45 ayat (1), pidana penjara paling lama 6 tahun.'],
    'UU ITE = UU No. 11/2008 (slide D11 h27). Slide D11 h30: Pasal 27 ayat (3) (penghinaan/pencemaran nama baik) dan Pasal 45 ayat (1) (penjara paling lama 6 tahun). UU No. 27/2022 adalah UU PDP, sehingga (b) dan (c) bukan tentang UU ITE. Lembar mahasiswa: tampaknya ✗a, ○b, ○c, ○d, nilai −2 (a −1, b −1, c −1, d +1), jadi kunci [a benar, b salah, c salah, d benar] konsisten dengan nilai −2. Pelajaran: bila ragu, jangan tandai; satu tanda salah menghapus satu tanda benar. Catatan: UU 1/2024 mengubah ancaman pidana; ikuti slide D11 untuk ujian.',
    { stem: 'Which statements are true about the electronic information and transactions law?', options: ['Law No. 11 of 2008', 'Law No. 27 of 2022', 'Article 65 states that everyone is forbidden to unlawfully disclose personal data that is not theirs.', 'The law states that anyone who intentionally and without right distributes/transmits/makes accessible electronic information with insulting or defamatory content may be imprisoned for up to 6 years.'], why: ['True: the ITE law.', 'False: that is the Personal Data Protection law.', 'False: Article 65 is in the PDP law.', 'True per slides: Article 27(3) with Article 45(1).'] }, 2),
  mcq(8, 'Impact on work',
    'Mana saja yang merupakan dampak teknologi computing di dunia kerja?',
    ['Otomasi dengan teknologi computing dapat menggeser pekerjaan yang dulunya harus dilakukan secara fisik dengan tenaga manusia.', 'Peningkatan efisiensi di industri manufaktur (pabrik) dengan menyewa tenaga ahli dengan kemampuan tinggi.', 'Dimungkinkan outsourcing tenaga kerja dari luar negeri tanpa harus mendatangkan secara fisik karena dapat bekerja remote melalui internet.', 'Pembelian material yang berkualitas tinggi dalam rangka mendapatkan produk yang lebih unggul.'],
    [true, false, true, false],
    ['Slide D11 h34: otomasi dapat mengancam pekerjaan yang digantikan mesin.', 'Salah: efisiensi di pabrik karena computing berasal dari otomasi/robot/komputer, bukan dari menyewa tenaga ahli.', 'Slide D11: globalisasi dan outsourcing, pekerja global.', 'Salah: membeli material bagus tidak ada hubungannya dengan teknologi computing.'],
    'Dampak computing di dunia kerja (slide D11 h5, h31-h34): efisiensi dan otomasi (menggeser pekerjaan manual), globalisasi dan outsourcing. (b) dan (d) tidak disebabkan oleh teknologi computing. Lembar mahasiswa: ○a ✗b ○c ✗d → 4.',
    { stem: 'Which are impacts of computing technology in the world of work?', options: ['Automation can displace work that used to be done physically by people.', 'Higher efficiency in manufacturing by hiring highly skilled experts.', 'Outsourcing of foreign labour is possible without bringing them in physically, because they can work remotely over the internet.', 'Buying high-quality materials to get a better product.'], why: ['D11: automation threatens replaceable jobs.', 'Not caused by computing.', 'D11: globalisation and outsourcing.', 'Unrelated to computing.'] }, 2),
  mcq(9, 'AI definitions',
    'Mana saja yang tepat terkait definisi intelejensi buatan (artificial intelligence)?',
    ['Thinking humanly: The study of the computations that make it possible to perceive, reason, and act', 'Thinking rationally: The study of the computations that make it possible to perceive, reason, and act', 'Acting rationally: The study of how to make computers do things at which, at the moment, people are better', 'Acting humanly: The study of how to make computers do things at which, at the moment, people are better'],
    [false, true, false, true],
    ['Salah: kalimat ini adalah definisi *thinking rationally* (Winston), bukan *thinking humanly*.', 'Benar: "The study of the computations that make it possible to perceive, reason, and act" = thinking rationally.', 'Salah: kalimat ini adalah definisi *acting humanly* (Rich & Knight), bukan *acting rationally*.', 'Benar: "The study of how to make computers do things at which, at the moment, people are better" = acting humanly.'],
    'Slide D11 h39: 8 definisi, 4 pendekatan (Russell & Norvig). Thinking rationally = studi komputasi yang memungkinkan persepsi, penalaran, tindakan. Acting humanly = bagaimana membuat komputer melakukan hal yang saat ini lebih baik dikerjakan manusia. Soal menukar label pendekatan pada definisi yang sama. Lembar mahasiswa: ✗a ○b ✗c ○d → 4.',
    { stem: 'Which are correctly matched definitions of artificial intelligence?', options: ['Thinking humanly: The study of the computations that make it possible to perceive, reason, and act', 'Thinking rationally: The study of the computations that make it possible to perceive, reason, and act', 'Acting rationally: The study of how to make computers do things at which, at the moment, people are better', 'Acting humanly: The study of how to make computers do things at which, at the moment, people are better'], why: ['False: that wording is thinking rationally.', 'True.', 'False: that wording is acting humanly.', 'True.'] }, 2),
  mcq(10, 'Positive impact of AI',
    'Mana sajakah yang merupakan dampak positif penggunaan teknologi AI (artificial intelligence)?',
    ['Teknologi robot digunakan untuk membantu pengelolaan gudang pabrik secara efisien.', 'Penggunaan generative AI untuk memplagiasi karya seni.', 'Penggunaan AI dapat menghapus kebutuhan tenaga manusia pada beberapa lapangan pekerjaan.', 'Penggunaan algoritma pencarian rute terpendek untuk aplikasi pengantaran (delivery) barang.'],
    [true, false, false, true],
    ['Slide D11: robot gudang otonom (Proteus), manufaktur.', 'Salah: plagiasi adalah dampak negatif.', 'Salah: menghilangkan pekerjaan adalah dampak negatif.', 'Slide D11: AI di lalu lintas (path finding).'],
    'Dampak positif: efisiensi gudang dan manufaktur (h51, h53), pencarian rute/lalu lintas (h48). Plagiasi dan hilangnya pekerjaan adalah dampak negatif. Lembar mahasiswa: ○a ✗b ✗c ○d → 4 (pilihan d tercetak berlabel "a." pada soal; ini glitch cetak).',
    { stem: 'Which are positive impacts of AI?', options: ['Robots used to manage factory warehouses efficiently.', 'Using generative AI to plagiarise artworks.', 'AI can remove the need for human labour in some fields.', 'Shortest-route search algorithms for goods delivery apps.'], why: ['Positive.', 'Negative.', 'Negative.', 'Positive.'] }, 2),
]

/* ------------------------------------------------------------------ Soal 1: Penugasan Proyek */
const S1_CHECK = r`def check(ans):
    # data karyawan: divisi, pengalaman (tahun), minat proyek
    data = {
        'Asep': ('Keuangan', 13, ['P2', 'P3']),
        'Bakir': ('Keuangan', 14, ['P3', 'P4']),
        'Cica': ('Pemasaran', 8, ['P2']),
        'Dudi': ('Humas', 5, ['P3', 'P4', 'P5']),
        'Euis': ('Pemasaran', 8, ['P4']),
        'Fahri': ('Keuangan', 16, ['P2', 'P3', 'P5']),
        'Gugun': ('Humas', 8, ['P2', 'P3']),
        'Hendra': ('Humas', 10, ['P4', 'P5']),
    }
    projects = ['P1', 'P2', 'P3', 'P4', 'P5']
    errs = []
    members = {p: [] for p in projects}
    for nama in data:
        p = ans.get(nama)
        if p is None or p == '':
            errs.append([nama + " belum ditugaskan ke proyek mana pun (setiap orang harus ditempatkan di suatu proyek).", nama + " has not been assigned to any project (everyone must be placed in a project)."])
        elif p not in members:
            errs.append([nama + ": proyek " + str(p) + " tidak dikenal.", nama + ": unknown project " + str(p) + "."])
        else:
            members[p].append(nama)
    for p in projects:
        n = len(members[p])
        if n < 1 or n > 3:
            errs.append(["Proyek " + p + " harus mendapat minimum 1 dan maksimum 3 orang (sekarang " + str(n) + ").", "Project " + p + " must get at least 1 and at most 3 people (currently " + str(n) + ")."])
    for nama in members['P1']:
        if data[nama][0] != 'Pemasaran':
            errs.append([nama + " di P1, padahal P1 membutuhkan staf Pemasaran (" + nama + " dari " + data[nama][0] + ").", nama + " is in P1, but P1 needs Marketing staff (" + nama + " is from " + data[nama][0] + ")."])
    for nama in members['P2']:
        if data[nama][0] not in ('Pemasaran', 'Humas'):
            errs.append([nama + " di P2, padahal P2 membutuhkan staf Pemasaran atau Humas (" + nama + " dari " + data[nama][0] + ").", nama + " is in P2, but P2 needs Marketing or PR staff (" + nama + " is from " + data[nama][0] + ")."])
    for nama in members['P3']:
        if 'P3' not in data[nama][2]:
            errs.append([nama + " di P3 tetapi tidak berminat pada P3.", nama + " is in P3 but is not interested in P3."])
        if data[nama][1] < 10:
            errs.append([nama + " di P3 tetapi pengalaman kerjanya " + str(data[nama][1]) + " tahun (minimum 10 tahun).", nama + " is in P3 but has " + str(data[nama][1]) + " years of experience (minimum 10 years)."])
    for nama in members['P4']:
        if data[nama][0] != 'Humas':
            errs.append([nama + " di P4, padahal P4 membutuhkan staf Humas (" + nama + " dari " + data[nama][0] + ").", nama + " is in P4, but P4 needs PR staff (" + nama + " is from " + data[nama][0] + ")."])
        if 'P4' not in data[nama][2]:
            errs.append([nama + " di P4 tetapi tidak berminat pada P4.", nama + " is in P4 but is not interested in P4."])
    for nama in members['P5']:
        if data[nama][0] != 'Keuangan':
            errs.append([nama + " di P5, padahal P5 membutuhkan staf Keuangan (" + nama + " dari " + data[nama][0] + ").", nama + " is in P5, but P5 needs Finance staff (" + nama + " is from " + data[nama][0] + ")."])
        if 'P5' not in data[nama][2]:
            errs.append([nama + " di P5 tetapi tidak berminat pada P5.", nama + " is in P5 but is not interested in P5."])
    return errs`

/* ------------------------------------------------------------------ Soal 4: Suit */
const S4_PY = r`# Suit_Gunting_Batu_Kertas
# Dua pemain bermain paling banyak 10 ronde; berhenti setelah 5 ronde tidak seri.
# Kode isyarat: G = Gunting, K = Kertas, B = Batu. Ronde seri tidak dihitung.
# DECLARATIONS
# ronde, valid, menang1, menang2 : int
# p1, p2 : str
# ALGORITHM
ronde = 0
valid = 0
menang1 = 0
menang2 = 0
while (valid < 5 and ronde < 10):
    p1 = input()
    p2 = input()
    ronde = ronde + 1
    if (p1 == p2):
        print("Seri")
    else:
        valid = valid + 1
        if ((p1 == "G" and p2 == "K") or (p1 == "K" and p2 == "B") or (p1 == "B" and p2 == "G")):
            print("Pemain 1")
            menang1 = menang1 + 1
        else:
            print("Pemain 2")
            menang2 = menang2 + 1
if (valid < 5):
    print("Pemenang tidak dapat ditentukan")
elif (menang1 > menang2):
    print("Pemain 1 menang")
else:
    print("Pemain 2 menang")`

const S4_PSEUDO = r`Program SuitGuntingBatuKertas
{ Dua pemain, maks. 10 ronde, berhenti setelah 5 ronde tidak seri. G = Gunting, K = Kertas, B = Batu }
KAMUS
  ronde, valid, menang1, menang2 : integer
  p1, p2 : string
ALGORITMA
  ronde ← 0
  valid ← 0
  menang1 ← 0
  menang2 ← 0
  while (valid < 5 and ronde < 10) do
    input(p1)
    input(p2)
    ronde ← ronde + 1
    if (p1 = p2) then
      output("Seri")
    else
      valid ← valid + 1
      if ((p1 = "G" and p2 = "K") or (p1 = "K" and p2 = "B") or (p1 = "B" and p2 = "G")) then
        output("Pemain 1")
        menang1 ← menang1 + 1
      else
        output("Pemain 2")
        menang2 ← menang2 + 1
  if (valid < 5) then
    output("Pemenang tidak dapat ditentukan")
  else
    if (menang1 > menang2) then
      output("Pemain 1 menang")
    else
      output("Pemain 2 menang")`

const S4_TESTS = [
  { name: 'Example 1', stdin: ['G', 'K', 'G', 'K', 'G', 'B', 'K', 'G', 'G', 'G', 'B', 'G'] },
  { name: 'Example 2', stdin: ['K', 'K', 'B', 'B', 'K', 'B', 'K', 'B', 'G', 'G', 'K', 'K', 'B', 'K', 'G', 'G', 'B', 'B', 'K', 'K'], edge: 'only 2 non-draw rounds in 10 rounds' },
  { name: 'Player 2 wins 5-0, extra input', stdin: ['K', 'G', 'B', 'K', 'G', 'B', 'K', 'G', 'B', 'K', 'G', 'G', 'K', 'B'], edge: 'berhenti tepat setelah ronde sah ke-5' },
  { name: 'Ronde sah ke-5 jatuh di ronde 10', stdin: ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'G', 'K', 'G', 'K', 'G', 'B', 'G', 'B', 'G', 'K'], edge: '10-round limit: round 10 is still played and decides the winner' },
  { name: 'Only 4 valid rounds', stdin: ['B', 'B', 'B', 'B', 'K', 'K', 'G', 'G', 'G', 'K', 'K', 'B', 'G', 'B', 'K', 'G', 'B', 'K', 'B', 'B'], edge: '4 non-draw rounds + 6 draws = cannot be determined' },
  { name: 'Pemain 1 menang 5-0', stdin: ['G', 'K', 'K', 'B', 'B', 'G', 'G', 'K', 'K', 'B'], edge: '5 ronde berturut-turut tanpa seri' },
]



/* ------------------------------------------------------------------ Soal 5: Penjualan Tiket */
const S5_PY = r`# Penjualan_Tiket
# Membaca penjualan tiket 12 bulan di Surabaya (SBY) dan Bandung (BDG) ke dalam dua array,
# membandingkan per bulan (selisih < 100 dianggap sama), lalu menampilkan kota yang lebih menguntungkan.
# DECLARATIONS
# SBY, BDG : array of int
# i, jmlSBY, jmlBDG : int
# ALGORITHM

def BacaData(N):
    # BacaData(N : int) -> array of int
    # Membaca N bilangan bulat dari input dan mengembalikannya sebagai array (N > 0)
    T = [0 for i in range(N)]
    for i in range(N):
        T[i] = int(input())
    return T

def Banding(a, b):
    # Banding(a, b : int) -> int
    # Membandingkan dua penjualan: 0 jika sama (selisih < 100), 1 jika a lebih besar, 2 jika b lebih besar
    if (abs(a - b) < 100):
        return 0
    elif (a > b):
        return 1
    else:
        return 2

def JumlahLebih(A, B, N, kode):
    # JumlahLebih(A, B : array of int, N, kode : int) -> int
    # Menghitung banyak bulan yang hasil Banding-nya sama dengan kode (1 = A lebih besar, 2 = B lebih besar)
    jml = 0
    for i in range(N):
        if (Banding(A[i], B[i]) == kode):
            jml = jml + 1
    return jml

SBY = BacaData(12)
BDG = BacaData(12)
for i in range(12):
    h = Banding(SBY[i], BDG[i])
    if (h == 0):
        print("Bulan " + str(i + 1) + ": Sama")
    elif (h == 1):
        print("Bulan " + str(i + 1) + ": Surabaya lebih besar")
    else:
        print("Bulan " + str(i + 1) + ": Bandung lebih besar")
jmlSBY = JumlahLebih(SBY, BDG, 12, 1)
jmlBDG = JumlahLebih(SBY, BDG, 12, 2)
print("Jml. SBY lebih besar = " + str(jmlSBY))
print("Jml. BDG lebih besar = " + str(jmlBDG))
if (jmlSBY > jmlBDG):
    print("Kota yang lebih menguntungkan: Surabaya")
elif (jmlBDG > jmlSBY):
    print("Kota yang lebih menguntungkan: Bandung")
else:
    print("Kedua kota sama menguntungkan")`

const S5_PSEUDO = r`Program Penjualan_Tiket
{ Membandingkan penjualan tiket SBY dan BDG per bulan (selisih < 100 dianggap sama) }
KAMUS
  SBY, BDG : array [0..11] of integer
  i, h, jmlSBY, jmlBDG : integer
  function BacaData (N : integer) → array of integer
  function Banding (a, b : integer) → integer
  function JumlahLebih (A, B : array of integer, N, kode : integer) → integer

function BacaData (N : integer) → array of integer
  { membaca N bilangan dari input, mengembalikannya sebagai array }
  KAMUS LOKAL
    T : array [0..N-1] of integer
    i : integer
  ALGORITMA
    i traversal [0..N-1]
      input(T[i])
    → T

function Banding (a, b : integer) → integer
  { 0 jika sama (selisih < 100), 1 jika a lebih besar, 2 jika b lebih besar }
  if (abs(a - b) < 100) then
    → 0
  else
    if (a > b) then
      → 1
    else
      → 2

function JumlahLebih (A, B : array of integer, N, kode : integer) → integer
  { banyak bulan dengan Banding(A[i], B[i]) = kode }
  KAMUS LOKAL
    jml, i : integer
  ALGORITMA
    jml ← 0
    i traversal [0..N-1]
      if (Banding(A[i], B[i]) = kode) then
        jml ← jml + 1
    → jml

ALGORITMA
  SBY ← BacaData(12)
  BDG ← BacaData(12)
  i traversal [0..11]
    h ← Banding(SBY[i], BDG[i])
    if (h = 0) then
      output("Bulan " + str(i + 1) + ": Sama")
    else
      if (h = 1) then
        output("Bulan " + str(i + 1) + ": Surabaya lebih besar")
      else
        output("Bulan " + str(i + 1) + ": Bandung lebih besar")
  jmlSBY ← JumlahLebih(SBY, BDG, 12, 1)
  jmlBDG ← JumlahLebih(SBY, BDG, 12, 2)
  output("Jml. SBY lebih besar = " + str(jmlSBY))
  output("Jml. BDG lebih besar = " + str(jmlBDG))
  if (jmlSBY > jmlBDG) then
    output("Kota yang lebih menguntungkan: Surabaya")
  else
    if (jmlBDG > jmlSBY) then
      output("Kota yang lebih menguntungkan: Bandung")
    else
      output("Kedua kota sama menguntungkan")`

const S5_JUDGE = r`def judge(stdin, out, ref_out):
    n = 12
    s = [int(x) for x in stdin[:n]]
    b = [int(x) for x in stdin[n:2 * n]]
    cs = sum(1 for i in range(n) if s[i] - b[i] >= 100)
    cb = sum(1 for i in range(n) if b[i] - s[i] >= 100)
    lines = [l.strip().lower() for l in out.strip().split('\n') if l.strip()]
    if not lines:
        return "No output."
    last = lines[-1]
    ps = min([last.find(k) for k in ('surabaya', 'sby') if k in last], default=-1)
    pb = min([last.find(k) for k in ('bandung', 'bdg') if k in last], default=-1)
    if cs > cb:
        if ps < 0 or (pb >= 0 and pb < ps):
            return "Wrong final conclusion: Surabaya is ahead (" + str(cs) + " months vs " + str(cb) + " months). Show the more profitable city on the last line."
    elif cb > cs:
        if pb < 0 or (ps >= 0 and ps < pb):
            return "Wrong final conclusion: Bandung is ahead (" + str(cb) + " months vs " + str(cs) + " months). Show the more profitable city on the last line."
    else:
        if not any(k in last for k in ('sama', 'seri', 'imbang')):
            return "The number of winning months is equal (" + str(cs) + " vs " + str(cb) + "); the conclusion should be that both cities are equally profitable."
    return None`

function tiket(sby: number[], bdg: number[], name: string, edge?: string) {
  return { name, stdin: [...sby, ...bdg].map(String), edge }
}

const S5_TESTS = [
  tiket([3456, 2494, 5779, 6394, 9866, 4331, 4133, 2171, 584, 8120, 8369, 6469], [9146, 2483, 8035, 6394, 3043, 7268, 4525, 8632, 5428, 8144, 9546, 3793], 'Example from the problem (BDG 7, SBY 2)'),
  tiket([900, 800, 700, 600, 500, 400, 300, 200, 100, 100, 100, 100], [100, 100, 100, 100, 100, 100, 100, 100, 300, 300, 100, 150], 'Surabaya ahead', 'a difference of exactly 100 in month 8 must count as different'),
  tiket([1000, 2000, 3000, 1000, 1000, 1000, 500, 500, 500, 500, 500, 500], [500, 1500, 2500, 1500, 2500, 3500, 550, 599, 520, 450, 501, 500], 'Draw 3-3 with six equal months', 'equal number of winning months = both cities equal'),
  tiket([1100, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500], [1000, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450], 'Difference of exactly 100 once', 'a difference of 100 counts as different (>= 100), a difference of 50 as equal'),
  tiket([1099, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500], [1000, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500], 'Difference of 99 in all months (equal)', 'a difference of 99 still counts as equal'),
  tiket([10000, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100], [100, 300, 300, 300, 100, 100, 100, 100, 100, 100, 100, 100], 'Large total but few winning months', 'the number of months is counted, not the number of tickets'),
]

const S5_WRONG = [
  { code: S5_PY.replace('abs(a - b) < 100', 'abs(a - b) <= 100'), msg: 'Selisih tepat 100 dianggap sama. Soal: selisih **di bawah** 100 dianggap sama, jadi selisih 100 sudah berbeda. Gunakan `< 100` untuk "sama".', msgEn: "A difference of exactly 100 is treated as equal. The problem says a difference **below** 100 counts as equal, so a difference of 100 is already different. Use `< 100` for \"equal\".", tag: 'off-by-one' as const },
  { code: S5_PY.replace('abs(a - b) < 100', 'abs(a - b) < 0'), msg: 'Batas toleransi 100 tiket tidak diterapkan: selisih kecil (mis. 24 atau 99) harus dianggap sama.', msgEn: "The 100-ticket tolerance is not applied: small differences (e.g. 24 or 99) must be treated as equal." },
  { code: S5_PY.replace('if (jmlSBY > jmlBDG):', 'if (sum(SBY) > sum(BDG)):').replace('elif (jmlBDG > jmlSBY):', 'elif (sum(BDG) > sum(SBY)):'), msg: 'Kota yang lebih menguntungkan ditentukan dari **jumlah bulan** yang penjualannya lebih besar, bukan dari total tiket setahun.', msgEn: "The more profitable city is decided by the **number of months** with larger sales, not by the total tickets of the year." },
  { code: S5_PY.replace('elif (jmlBDG > jmlSBY):', 'else:').replace('print("Kota yang lebih menguntungkan: Bandung")\nelse:\n    print("Kedua kota sama menguntungkan")', 'print("Kota yang lebih menguntungkan: Bandung")'), msg: 'Kasus jumlah bulan sama tidak ditangani: harus disimpulkan "kedua kota sama menguntungkan".', msgEn: "The case of equal numbers of months won is not handled: the conclusion must be \"both cities equally profitable\"." },
]

/* ------------------------------------------------------------------ the bank */
export const bank: BankFile = {
  problems: [
    /* ---------------- Bagian I ---------------- */
    {
      id: 'uts25-i', archetype: 'mcq-multi', title: 'Bagian I. Dampak Pemanfaatan Teknologi Computing (Pilihan Ganda, Multiple Correct Answer)',
      source: { kind: 'uts' as const, lang: 'id' as const, src: SRC, label: 'Bagian I', pages: [1, 2], official: true, year: 2025 },
      intro: [
        '**Petunjuk Pengerjaan:**',
        '- Berikan tanda **lingkaran** (O) pada huruf pilihan jawaban yang menurut Anda **sesuai** dan berikan tanda **silang** (X) untuk pilihan yang menurut Anda **tidak sesuai** dengan pertanyaan/pernyataan yang diberikan. Minimum ada 1 (satu) jawaban sesuai untuk tiap soal.',
        '- Nilai per pilihan jawaban: pilihan jawaban benar = 1; pilihan jawaban salah = -1; tidak memilih = 0. Total nilai per soal jika semua pilihan jawaban benar = 4.',
        '',
        '**Contoh pengerjaan:**',
        '*Tools* yang termasuk *generative* AI adalah:',
        '- ○ a. GPT-4',
        '- ✗ b. Scratch',
        '- ✗ c. MS Word',
        '- ○ d. Copilot',
        '',
        'Catatan penyalin: halaman sampul (hlm. 1 dari 8) tidak ada di pindaian. Tanda merah di lembar adalah nilai per soal dari pemeriksa (1: 2, 2-6: 4, 7: -2, 8-10: 4; total 32 dari 40).',
      ].join('\n'),
      parts: bagianI,
      en: {
        title: 'Part I. Impact of Computing Technology (multiple-correct MCQ)',
        intro: 'Instructions: circle (O) every option you consider correct and cross (X) every option you consider incorrect; at least one option per question is correct. Scoring per option: correct mark = +1, wrong mark = -1, left blank = 0; a question with all options marked correctly = 4. (Cover page missing from the scan.) The red numbers on the sheet are the marker\'s score per question.',
      },
    },

    /* ---------------- Soal 1 ---------------- */
    {
      id: 'uts25-s1', archetype: 'constraint', title: 'Soal 1 – Penugasan Proyek',
      source: { kind: 'uts' as const, lang: 'id' as const, src: SRC, label: 'Soal 1', pages: [3, 4], official: true, year: 2025 },
      intro: [
        'Perusahaan RichDigi akan menugaskan sejumlah karyawan divisi keuangan, pemasaran, dan humas, yaitu Asep, Bakir, Cica, Dudi, Euis, Fahri, Gugun, dan Hendra ke 5 (lima) buah proyek pengembangan produk digital yang sedang dikerjakan oleh perusahaan, sebut saja proyek P1, P2, P3, P4, dan P5 (nama proyek dirahasiakan).',
        'Beberapa informasi penting:',
        '- Proyek P1 masih membutuhkan bantuan untuk menyusun strategi pemasaran yang baik sehingga sangat membutuhkan staf pemasaran.',
        '- Proyek P2 membutuhkan staf dari divisi pemasaran atau humas untuk menguatkan strategi pemasaran dan publikasi proyek ini.',
        '- Proyek P3 dapat menggunakan staf dari divisi mana pun yang penting memiliki minat pada proyek P3 dan penting bagi staf tersebut untuk memiliki pengalaman kerja minimum 10 tahun.',
        '- Proyek P4 sudah memiliki staf keuangan dan pemasaran yang cukup, hanya butuh staf humas untuk menguatkan publikasi, sehingga proyek ini membutuhkan orang yang dari divisi humas dan penting sekali berminat di proyek P4.',
        '- Proyek P5 sangat membutuhkan staf keuangan untuk mengelola keuangan proyek. Penting juga bahwa staf tersebut memiliki minat pada proyek P5.',
        '- Setiap orang harus ditempatkan di suatu proyek dan setiap proyek harus mendapatkan minimum 1 (satu) orang dan maksimum 3 (tiga) orang.',
        '',
        'Berikut beberapa data yang berkaitan dengan para karyawan baru yang diperoleh saat rekrutmen:',
        '',
        '| Nama | Umur | Divisi | Pengalaman Kerja | Minat Proyek |',
        '|---|---|---|---|---|',
        '| Asep | 30 | Keuangan | 13 | P2, P3 |',
        '| Bakir | 40 | Keuangan | 14 | P3, P4 |',
        '| Cica | 31 | Pemasaran | 8 | P2 |',
        '| Dudi | 28 | Humas | 5 | P3, P4, P5 |',
        '| Euis | 28 | Pemasaran | 8 | P4 |',
        '| Fahri | 26 | Keuangan | 16 | P2, P3, P5 |',
        '| Gugun | 20 | Humas | 8 | P2, P3 |',
        '| Hendra | 29 | Humas | 10 | P4, P5 |',
      ].join('\n'),
      parts: [
        {
          id: 'uts25-s1a', kind: 'constraint', label: 'a', decks: ['D01'], topic: 'Constraint assignment', patterns: ['game-rules'], misconceptions: ['constraint-missed'], shape: 'assign',
          stem: 'Bantulah perusahaan untuk mendapatkan 1 (satu) saja konfigurasi penempatan karyawan baru yang sesuai dengan persyaratan di atas. Tuliskan dalam format: <nama karyawan> - <kode proyek>. Contoh (belum tentu benar): Dudi – P5.',
          entities: ['Asep', 'Bakir', 'Cica', 'Dudi', 'Euis', 'Fahri', 'Gugun', 'Hendra'], slots: ['P1', 'P2', 'P3', 'P4', 'P5'],
          check: S1_CHECK,
          solution: { Asep: 'P3', Bakir: 'P3', Cica: 'P1', Dudi: 'P4', Euis: 'P2', Fahri: 'P5', Gugun: 'P2', Hendra: 'P4' },
          rubric: RB_CONSTRAINT_A,
          hints: [
            'Daftar dulu syarat tiap proyek. Mana yang paling ketat? Siapa yang hanya cocok untuk satu proyek?',
            'P5 butuh staf keuangan **dan** berminat P5: lihat tabel, siapa saja yang memenuhi keduanya? Lakukan hal yang sama untuk P4 (humas + minat P4) dan P3 (pengalaman ≥ 10 + minat P3).',
            'Setelah proyek yang paling ketat terisi, sisa orang (mis. Gugun, Cica, Euis) tinggal dicocokkan dengan P1 dan P2. Periksa terakhir: tiap proyek 1 sampai 3 orang.',
          ],
          work: [
            'Syarat: P1 = pemasaran; P2 = pemasaran atau humas; P3 = minat P3 dan pengalaman ≥ 10; P4 = humas dan minat P4; P5 = keuangan dan minat P5; tiap orang tepat 1 proyek, tiap proyek 1 sampai 3 orang.',
            'P5: keuangan yang berminat P5 hanya Fahri, jadi Fahri → P5.',
            'P3: pengalaman ≥ 10 dan minat P3: Asep (13), Bakir (14) (Fahri sudah di P5), jadi Asep dan Bakir → P3.',
            'P4: humas dengan minat P4: Dudi dan Hendra, jadi keduanya → P4.',
            'Sisa: Gugun (humas) → P2; Cica dan Euis (pemasaran): Cica → P1, Euis → P2 (P2 menerima pemasaran).',
            'Cek: P1 {Cica}, P2 {Euis, Gugun}, P3 {Asep, Bakir}, P4 {Dudi, Hendra}, P5 {Fahri}: semua syarat dan batas 1 sampai 3 orang terpenuhi.',
          ],
          explanation: 'Jawaban tidak tunggal. Salah satu konfigurasi yang valid: Cica – P1; Euis – P2; Gugun – P2; Asep – P3; Bakir – P3; Dudi – P4; Hendra – P4; Fahri – P5. Fahri praktis terkunci di P5 (satu-satunya staf keuangan berminat P5), Dudi dan Hendra adalah satu-satunya humas berminat P4, Gugun (humas, pengalaman 8) tidak bisa di P3 (butuh 10 tahun) maupun P4 (tidak berminat) sehingga ke P2. Catatan: minat hanya disyaratkan untuk P3, P4, P5; umur tidak relevan.',
          samples: [{
            answer: 'Cica – P1, Euis – P2, Gugun – P2, Asep – P3, Bakir – P3, Hendra – P4, Dudi – P4, Fahri – P5 (tabel P1: Cica; P2: Euis, Gugun; P3: Asep, Bakir; P4: Hendra, Dudi; P5: Fahri)',
            score: 4,
            note: 'Konfigurasi memenuhi semua syarat dan batas 1 sampai 3 orang per proyek. Nilai tertulis: 4.',
            noteEn: "The configuration satisfies all requirements and the limit of 1 to 3 people per project. Mark on paper: 4.",
          }],
          refs: [ref(3)],
          en: { stem: 'Help the company find ONE configuration of staff placements that satisfies the requirements above. Write it as <employee name> - <project code>. Example (not necessarily correct): Dudi – P5.', explanation: "The answer is not unique. One valid configuration: Cica – P1; Euis – P2; Gugun – P2; Asep – P3; Bakir – P3; Dudi – P4; Hendra – P4; Fahri – P5. Fahri is practically locked into P5 (the only Finance staff interested in P5), Dudi and Hendra are the only PR staff interested in P4, and Gugun (PR, 8 years' experience) can go neither to P3 (needs 10 years) nor to P4 (not interested), so he goes to P2. Note: interest is only required for P3, P4, P5; age is irrelevant.", hints: ["First list each project's requirements. Which is the strictest? Who fits only one project?", "P5 needs Finance staff **and** interest in P5: look at the table, who satisfies both? Do the same for P4 (PR + interest in P4) and P3 (experience ≥ 10 + interest in P3).", "Once the strictest projects are filled, match the remaining people (e.g. Gugun, Cica, Euis) with P1 and P2. Check last: every project has 1 to 3 people."], work: ["Requirements: P1 = Marketing; P2 = Marketing or PR; P3 = interest in P3 and experience ≥ 10; P4 = PR and interest in P4; P5 = Finance and interest in P5; each person in exactly 1 project, each project 1 to 3 people.", "P5: the only Finance staff interested in P5 is Fahri, so Fahri → P5.", "P3: experience ≥ 10 and interest in P3: Asep (13), Bakir (14) (Fahri is already in P5), so Asep and Bakir → P3.", "P4: PR staff interested in P4: Dudi and Hendra, so both → P4.", "Remaining: Gugun (PR) → P2; Cica and Euis (Marketing): Cica → P1, Euis → P2 (P2 accepts Marketing).", "Check: P1 {Cica}, P2 {Euis, Gugun}, P3 {Asep, Bakir}, P4 {Dudi, Hendra}, P5 {Fahri}: all requirements and the 1-to-3 people limit are met."] },
        },
        {
          id: 'uts25-s1b', kind: 'open', label: 'b', decks: ['D01', 'D02'], topic: 'CT principles: abstraction, decomposition, patterns, algorithms',
          stem: 'Berikan penjelasan yang singkat dan jelas yang menunjukkan penalaran Anda dalam menentukan konfigurasi tersebut berdasarkan prinsip-prinsip berpikir komputasional untuk menyelesaikan masalah ini: **abstraksi, dekomposisi masalah, pengenalan pola, dan berpikir algoritmik.**',
          answer: [
            'Jawaban tidak tunggal; yang dinilai adalah penerapan keempat prinsip:',
            '- **Abstraksi**: ambil hanya informasi penting (divisi, pengalaman kerja, minat proyek, syarat tiap proyek, batas 1 sampai 3 orang per proyek) dan abaikan yang tidak relevan (umur, nama proyek yang dirahasiakan).',
            '- **Dekomposisi**: pecah menjadi syarat per proyek (P1 pemasaran; P2 pemasaran/humas; P3 pengalaman ≥ 10 dan minat P3; P4 humas dan minat P4; P5 keuangan dan minat P5) ditambah syarat umum (setiap orang di satu proyek; tiap proyek 1 sampai 3 orang).',
            '- **Pengenalan pola**: tiap proyek berupa filter atas atribut (divisi / pengalaman / minat); kandidat tiap proyek dapat dicari dengan cara yang sama.',
            '- **Berpikir algoritmik**: urutkan langkah: tulis kandidat tiap proyek, tempatkan proyek/orang dengan pilihan paling sedikit lebih dulu (Fahri → P5, Dudi dan Hendra → P4, Asep dan Bakir → P3), lalu sisanya; akhirnya periksa semua syarat.',
          ].join('\n'),
          rubric: RB_CT_EXPLAIN,
          keyPoints: [
            'Menyebut informasi yang penting dan yang diabaikan (mis. umur)',
            'Merumuskan syarat tiap proyek **dan** batas 1 sampai 3 orang per proyek serta "setiap orang ditempatkan"',
            'Pola: tiap proyek = filter atas divisi/pengalaman/minat',
            'Algoritma: tempatkan yang paling terbatas dulu, lalu cek semua syarat',
          ],
          samples: [{
            answer: [
              '**Dekomposisi:** 1. melihat kebutuhan masing-masing proyek; 2. mengidentifikasi prasyarat masing-masing proyek; 3. mengategorikan divisi, pengalaman kerja, dan minat proyek; 4. menugaskan para karyawan berdasarkan ketentuan dan jumlah ketersediaan (dari yang paling sedikit ditugaskan terlebih dahulu).',
              '**Pengenalan pola:** Proyek 1 hanya membutuhkan staf pemasaran; Proyek 2 membutuhkan staf pemasaran atau humas; Proyek 3 membutuhkan divisi mana pun dengan pengalaman kerja minimal 10 tahun dan minat Proyek 3; Proyek 4 membutuhkan divisi humas dan berminat dengan Proyek 4; Proyek 5 membutuhkan staf keuangan dan minat pada Proyek 5.',
              '**Abstraksi:** mengabaikan umur karyawan; memfokuskan pada divisi seseorang tanpa melihat minat dan pengalaman untuk Proyek 1 dan 2; mengabaikan divisi dan fokus pada pengalaman kerja 10 tahun dan minat Proyek 3; mengabaikan pengalaman untuk Proyek 4 dan 5.',
              '**Algoritma:** 1. mendaftar kebutuhan tiap proyek dan batasannya; 2. mendaftar list orang tiap divisi beserta minatnya dan pengalaman; 3. menugaskan karyawan dari divisi pemasaran terlebih dahulu (karena jumlah paling sedikit dan paling minim restriksi); 4. menugaskan karyawan humas ke proyek yang membutuhkan humas, sesuaikan dengan minatnya; 5. memasukkan karyawan dengan pengalaman tinggi ke Proyek 3; 6. menugaskan sisanya ke proyek yang membutuhkan staf keuangan dan minatnya.',
            ].join('\n\n'),
            score: 3.5,
            note: 'Keempat prinsip disebut dan benar, lengkap dengan daftar syarat per proyek dan urutan penugasan. Catatan merah pemeriksa pada lembar: "Tiap proyek berapa?", yaitu batas minimum 1 dan maksimum 3 orang per proyek tidak dirumuskan sebagai constraint. Nilai tertulis: 3,5.',
            noteEn: "All four principles are named and correct, complete with the list of requirements per project and the order of assignment. The marker's red note on the sheet reads \"How many per project?\": the minimum of 1 and maximum of 3 people per project was not formulated as a constraint. Mark on paper: 3.5.",
          }],
          explanation: 'Tulis keempat prinsip dengan label jelas, dan rumuskan **semua** constraint, termasuk yang mudah terlewat (batas 1 sampai 3 orang per proyek dan setiap orang harus ditempatkan). Lembar mahasiswa kehilangan 0,5 poin karena constraint jumlah anggota per proyek tidak disebut.',
          refs: [ref(3), ref(4)],
          en: { stem: 'Give a short, clear explanation showing your reasoning, based on the computational-thinking principles for this problem: abstraction, problem decomposition, pattern recognition and algorithmic thinking.', explanation: "Write all four principles with clear labels, and state **all** the constraints, including the easily missed ones (the limit of 1 to 3 people per project and that everyone must be placed). The student's sheet lost 0.5 points because the constraint on the number of members per project was not mentioned.", answer: "The answer is not unique; what is marked is the application of the four principles:\n- **Abstraction**: keep only the important information (division, work experience, project interest, each project's requirements, the limit of 1 to 3 people per project) and ignore what is irrelevant (age, the confidential project names).\n- **Decomposition**: break it into per-project requirements (P1 Marketing; P2 Marketing/PR; P3 experience ≥ 10 and interest in P3; P4 PR and interest in P4; P5 Finance and interest in P5) plus the general requirements (everyone in one project; each project 1 to 3 people).\n- **Pattern recognition**: each project is a filter on attributes (division / experience / interest); the candidates for each project can be found in the same way.\n- **Algorithmic thinking**: order the steps: write down each project's candidates, place the projects/people with the fewest options first (Fahri → P5, Dudi and Hendra → P4, Asep and Bakir → P3), then the rest; finally check all the requirements.", keyPoints: ["Names the important information and what is ignored (e.g. age)", "States each project's requirements **and** the limit of 1 to 3 people per project as well as \"everyone is placed\"", "Pattern: each project = a filter on division/experience/interest", "Algorithm: place the most constrained first, then check all the requirements"] },
        },
      ],
      en: { title: 'Problem 1 – Project assignment', intro: 'RichDigi is placing 8 staff (Finance, Marketing, PR) into 5 projects P1-P5 with the stated per-project requirements; every person goes to a project and every project gets 1 to 3 people.' },
    },

    /* ---------------- Soal 2 ---------------- */
    {
      id: 'uts25-s2', archetype: 'classify', title: 'Soal 2 – Katalog Acara Drama',
      source: { kind: 'uts' as const, lang: 'id' as const, src: SRC, label: 'Soal 2', pages: [5], official: true, year: 2025 },
      intro: [
        'MyFlix adalah penyedia media *streaming-on-demand* yang telah mendistribusikan sejumlah acara televisi mulai dari drama, miniseri, dokumenter, *variety show*, dan film. MyFlix tidak hanya menyediakan layanan acara-acara orisinalnya, tetapi juga memiliki lisensi untuk menayangkan konten yang diproduksi oleh jaringan lain atau konten-konten yang telah dibatalkan.',
        '',
        'Katalog acara televisi khususnya yang berjenis drama yang dimiliki oleh MyFlix telah mencapai ribuan judul dari berbagai genre. Katalog ini memiliki metadata yang mencakup: Judul Acara, Genre, Tahun Premiere, Jumlah Season, dan Jumlah Episode. Kode Acara digunakan untuk mengidentifikasi setiap acara secara unik dan ini akan digunakan untuk mengembangkan sistem rekomendasi dan pencarian cepat terhadap acara.',
        '',
        'Berikut diberikan contoh beberapa acara drama yang tersedia di MyFlix.',
        '',
        '| No | Judul Acara | Genre | Tahun Premier | Jml. Season | Jml. Episode | Kode Acara |',
        '|---|---|---|---|---|---|---|',
        '| 1 | Softer Things | Science fiction | 2016 | 4 | 34 | |',
        '| 2 | Forever Young | Romantic | 2019 | 6 | 64 | |',
        '| 3 | The Digger | Fantasy | 2019 | 4 | 32 | |',
        '| 4 | Kings of Dreams | Fantasy | 2020 | 4 | 40 | |',
        '| 5 | The Rough Agent | Thriller | 2023 | 2 | 20 | |',
        '| 6 | The Embassy | Thriller | 2023 | 3 | 22 | |',
        '| 7 | My Life with the Boys | Romantic | 2023 | 2 | 20 | |',
        '| 8 | The Problems | Science fiction | 2024 | 1 | 10 | |',
        '| 9 | Frozen River | Thriller | 2024 | 1 | 10 | |',
        '| 10 | Forever Young | Teen | 2025 | 1 | 8 | |',
      ].join('\n'),
      parts: [
        {
          id: 'uts25-s2a', kind: 'open', label: 'a', decks: ['D01', 'D03'], topic: 'Hierarchical classification', patterns: [], misconceptions: ['unique-column-class'],
          stem: 'Buat dan jelaskan sistem klasifikasi hierarkis untuk katalog acara tersebut tersebut.',
          answer: [
            'Tidak ada jawaban tunggal; yang penting: ada **tingkat-tingkat** yang jelas, dipilih dari kolom yang nilainya **berulang** (cocok untuk mengelompokkan), dan siap menampung acara baru. Contoh:',
            '- Tingkat 1: **Genre** (Sci, Rom, Fan, Thr, Teen): sedikit nilai, banyak acara per genre.',
            '- Tingkat 2: **Tahun premier**.',
            '- Tingkat 3: **Jumlah season** (opsional).',
            '- Tingkat 4: **nomor urut** acara dalam kelompok yang sama (membedakan acara berkelompok sama, mis. dua Thriller 2023).',
            'Pola kode: `<kode genre>-<tahun premier>-<jml season>-<nomor urut>`, mis. `Thr-2023-2-001`. Kolom Judul Acara **tidak** cocok sebagai tingkat klasifikasi (hampir semua nilainya unik; "Forever Young" bahkan muncul dua kali).',
          ].join('\n'),
          rubric: RB_CLASS_A,
          keyPoints: ['Tingkat dipilih dari kolom yang nilainya berulang (genre, tahun, season)', 'Ada hierarki yang jelas (tingkat 1 → 2 → 3)', 'Ada nomor urut untuk keunikan', 'Siap menampung acara baru'],
          samples: [{
            answer: 'Sistem hierarkis: Tingkat 1 (paling atas): Genre. Tingkat 2: Tahun premier. Tingkat 3: Jumlah season. Tingkat 4: kode input (sesuai urutan). Sistem klasifikasi: <kode genre> – <tahun premier> – <Jml Season> – <Nomor urut judul dalam sebuah genre pada suatu tahun>.',
            score: 3,
            note: 'Hierarki bertingkat dengan atribut yang tepat (genre, tahun, season) dan pola kode jelas. Nilai tertulis: 3; kemungkinan alasan: tingkat 4 ("kode input") bukan atribut klasifikasi melainkan nomor urut, dan jumlah season hanya sedikit membedakan.',
            noteEn: "A multi-level hierarchy on suitable attributes (genre, year, season) with a clear code pattern. Mark on paper: 3; likely reason: level 4 (\"input code\") is not a classification attribute but a sequence number, and the number of seasons only slightly differentiates shows.",
          }],
          explanation: 'Pilih atribut yang membagi data jadi kelompok-kelompok bermakna: genre (5 nilai), tahun (sebagian berulang), season. Hindari kolom yang hampir unik (judul). Tambahkan nomor urut agar kode unik walaupun genre, tahun, dan season sama.',
          refs: [ref(5)],
          en: { stem: 'Create and explain a hierarchical classification system for the catalogue.', explanation: "Choose attributes that divide the data into meaningful groups: genre (5 values), year (partly repeated), season. Avoid nearly unique columns (title). Add a sequence number so the code is unique even when genre, year and season are all the same.", answer: "There is no single answer; what matters: clear **levels**, chosen from columns whose values **repeat** (suitable for grouping), and room for new shows. Example:\n- Level 1: **Genre** (Sci, Rom, Fan, Thr, Teen): few values, many shows per genre.\n- Level 2: **Premiere year**.\n- Level 3: **Number of seasons** (optional).\n- Level 4: **sequence number** of the show within the same group (distinguishes shows in the same group, e.g. two 2023 Thrillers).\nCode pattern: `<genre code>-<premiere year>-<no. of seasons>-<sequence number>`, e.g. `Thr-2023-2-001`. The Title column is **not** suitable as a classification level (almost all its values are unique; \"Forever Young\" even appears twice).", keyPoints: ["Levels chosen from columns with repeating values (genre, year, season)", "A clear hierarchy (level 1 → 2 → 3)", "A sequence number for uniqueness", "Room to add new shows"] },
        },
        {
          id: 'uts25-s2b', kind: 'open', label: 'b', decks: ['D01', 'D03'], topic: 'Hierarchical classification',
          stem: 'Jelaskan penalaran Anda dalam menentukan klasifikasi tersebut.',
          answer: 'Justifikasi pemilihan tiap tingkat: genre paling umum dan memuat judul dari berbagai tahun (mudah dicari pengguna); tahun premier mengelompokkan per tahun; jumlah season memudahkan pengelolaan; nomor urut membedakan acara yang genre, tahun, dan season-nya sama. Sebut bahwa sistem dapat menampung acara baru (nomor urut bertambah), dan jelaskan mengapa Judul tidak dipakai (hampir unik, tidak mengelompokkan).',
          rubric: RB_CLASS_B,
          keyPoints: ['Alasan memilih tiap tingkat', 'Mengapa nomor urut diperlukan', 'Konsisten dengan sistem pada (a)'],
          samples: [{
            answer: 'Saya mengklasifikasikan menjadi 4 tingkat, yaitu genre, tahun premier, jumlah season, dan nomor urut judul dalam sebuah genre pada sebuah tahun. Tingkat pertama saya pilih genre karena genre merupakan salah satu pengategorian paling umum dalam masalah ini. Genre juga dapat memuat banyak judul dari berbagai tahun. Kemudian tingkat 2, saya memilih tahun agar film tersebut dapat diklasifikasikan per tahun. Kemudian tingkat 3, saya memilih jumlah season agar memudahkan pengguna maupun developer dalam menyortir banyak season. Terakhir, tingkat 4 yaitu nomor urut. Nomor urut akan di-assign sesuai dengan tanggal atau urutan masuk berdasarkan genre dan tahun dalam sebuah list. Contoh: Thr-2023-2-001; masukan ke-2: Thr-2023-3-002 (jml season tidak berpengaruh).',
            score: 4,
            note: 'Setiap tingkat dijustifikasi dan konsisten dengan sistem pada (a), termasuk alasan nomor urut dan contoh kode. Nilai tertulis: 4.',
            noteEn: "Every level is justified and consistent with the system in (a), including the reason for the sequence number and an example code. Mark on paper: 4.",
          }],
          explanation: 'Penjelasan harus (1) menjustifikasi tiap tingkat, (2) menjelaskan nomor urut sebagai pembeda, dan (3) cocok dengan jawaban (a).',
          refs: [ref(5)],
          en: { stem: 'Explain your reasoning for the classification.', explanation: "The explanation must (1) justify each level, (2) explain the sequence number as the distinguishing element, and (3) match the answer to (a).", answer: "Justify the choice of each level: genre is the most general and holds titles from many years (easy for users to search); premiere year groups by year; number of seasons eases management; the sequence number distinguishes shows with the same genre, year and number of seasons. State that the system can accommodate new shows (the sequence number grows), and explain why Title is not used (almost unique, does not group).", keyPoints: ["The reason for choosing each level", "Why a sequence number is needed", "Consistent with the system in (a)"] },
        },
        {
          id: 'uts25-s2c', kind: 'classify', label: 'c', decks: ['D01', 'D03'], topic: 'Hierarchical unique codes', misconceptions: ['not-disjoint', 'not-complete'],
          stem: 'Buat kode unik untuk setiap acara berdasarkan klasifikasi yang Anda buat, dan isikan pada kolom tambahan "Kode Acara" pada tabel di atas berdasarkan sistem klasifikasi Anda.',
          columns: ['No', 'Judul Acara', 'Genre', 'Tahun Premier', 'Jml. Season', 'Jml. Episode'],
          rows: [
            [1, 'Softer Things', 'Science fiction', 2016, 4, 34],
            [2, 'Forever Young', 'Romantic', 2019, 6, 64],
            [3, 'The Digger', 'Fantasy', 2019, 4, 32],
            [4, 'Kings of Dreams', 'Fantasy', 2020, 4, 40],
            [5, 'The Rough Agent', 'Thriller', 2023, 2, 20],
            [6, 'The Embassy', 'Thriller', 2023, 3, 22],
            [7, 'My Life with the Boys', 'Romantic', 2023, 2, 20],
            [8, 'The Problems', 'Science fiction', 2024, 1, 10],
            [9, 'Frozen River', 'Thriller', 2024, 1, 10],
            [10, 'Forever Young', 'Teen', 2025, 1, 8],
          ],
          codeColumn: 'Kode Acara',
          model: {
            levels: [
              { attr: 'Genre', codes: { 'Science fiction': 'Sci', Romantic: 'Rom', Fantasy: 'Fan', Thriller: 'Thr', Teen: 'Teen' } },
              { attr: 'Tahun Premier' },
              { attr: 'Jml. Season' },
              { attr: 'Nomor urut dalam genre dan tahun yang sama' },
            ],
            pattern: '<kode genre>-<tahun premier>-<jml season>-<nomor urut 3 digit>',
            codes: ['Sci-2016-4-001', 'Rom-2019-6-001', 'Fan-2019-4-001', 'Fan-2020-4-001', 'Thr-2023-2-001', 'Thr-2023-3-002', 'Rom-2023-2-001', 'Sci-2024-1-001', 'Thr-2024-1-001', 'Teen-2025-1-001'],
          },
          rubric: RB_CLASS_C,
          samples: [{
            answer: 'Sci-2016-4-001; Rom-2019-6-001; Fan-2019-4-001; Fan-2020-4-001; Thr-2023-2-001; Thr-2023-3-002; Rom-2023-?-001 (angka season pada baris 7 sulit dibaca di pindaian); Sci-2024-1-001; Thr-2024-1-001; Teen-2025-1-001',
            score: 4,
            note: 'Semua kode mengikuti pola <genre>-<tahun>-<season>-<nomor urut> dan unik; nomor urut 002 dipakai untuk Thriller 2023 kedua. Nilai tertulis: 4.',
            noteEn: "Every code follows the pattern <genre>-<year>-<season>-<sequence number> and is unique; sequence number 002 is used for the second 2023 Thriller (the season digit on row 7 is hard to read in the scan). Mark on paper: 4.",
          }],
          explanation: 'Kode unik karena kombinasi genre-tahun-season-nomor urut unik per acara. Perhatikan jebakan: "Forever Young" muncul dua kali (baris 2 dan 10) dengan genre berbeda, jadi judul tidak boleh jadi dasar keunikan; dua Thriller 2023 (baris 5 dan 6) hanya dibedakan oleh season dan nomor urut. Kode pada model: `Thr-2023-2-001` dan `Thr-2023-3-002`.',
          refs: [ref(5)],
          en: { stem: 'Create a unique code for every show based on your classification and fill the "Kode Acara" column.', explanation: "The code is unique because the combination genre-year-season-sequence number is unique for each show. Watch out for the traps: \"Forever Young\" appears twice (rows 2 and 10) with different genres, so the title must not be the basis of uniqueness; the two 2023 Thrillers (rows 5 and 6) are distinguished only by season and sequence number. Codes in the model: `Thr-2023-2-001` and `Thr-2023-3-002`." },
        },
      ],
      en: { title: 'Problem 2 – Drama catalogue', intro: 'MyFlix streams drama shows with metadata: title, genre, premiere year, number of seasons and episodes. A unique show code is needed for a recommendation and fast-search system.' },
    },

    /* ---------------- Soal 3 ---------------- */
    {
      id: 'uts25-s3', archetype: 'robot', title: 'Soal 3 – Robot Ladybug',
      source: { kind: 'uts' as const, lang: 'id' as const, src: SRC, label: 'Soal 3', pages: [6], official: true, year: 2025 },
      intro: [
        'Ladybug adalah robot berbentuk kepik yang akan terbang mengikuti pola yang diperintahkan. Berikut beberapa perintah yang dapat diikuti oleh Ladybug.',
        '',
        'a. `Forward N` - Ladybug bergerak N meter (N ≥ 1) maju ke arah yang dituju.',
        'b. `Left` - Ladybug menghadap ke kiri tanpa bergerak ke depan.',
        'c. `Right` - Ladybug menghadap ke kanan tanpa bergerak ke depan.',
        'd. `Repeat N (beberapa perintah)` - Ladybug mengulangi *beberapa perintah* N kali jika N ≥ 1. Jika N < 1, maka perintah dalam tanda kurung tidak dijalankan sama sekali.',
        '',
        'Berikut adalah contoh-contoh pola yang akan dibuat oleh robot Ladybug jika diberikan sebuah bilangan N dengan N >= 1. Harap diingat, masih dimungkinkan diberikan N yang lain.',
      ].join('\n'),
      parts: [
        {
          id: 'uts25-s3a', kind: 'robot', label: 'a', decks: ['D02'], topic: 'Robot repeat', patterns: [], misconceptions: ['repeat-count'], dialect: 'ladybug', param: 'N', nValues: [1, 2, 3, 4, 5],
          stem: 'Jika diberikan sebuah bilangan N, tuliskan perintah untuk membuat Ladybug mengikuti pola seperti contoh di atas.',
          solution: [
            'Repeat N-1 (',
            '  Forward 1',
            '  Right',
            '  Forward 1',
            '  Left',
            ')',
            'Forward 1',
            'Right',
            'Repeat N-1 (',
            '  Forward 1',
            '  Right',
            '  Forward 1',
            '  Left',
            ')',
            'Forward 1',
            'Right',
            'Forward 1',
          ].join('\n'),
          rubric: RB_ROBOT,
          hints: [
            'Gambar jalur untuk N = 1, 2, 3 dengan Ladybug menghadap atas. Tulis perintahnya sebagai huruf (F, R, L) dan cari bagian yang berulang.',
            'Naik satu anak tangga = maju 1, belok kanan, maju 1, belok kiri (menghadap atas lagi). Berapa anak tangga penuh yang diulang untuk N = 1, 2, 3? Ingat bagian puncak dan bagian turun.',
            'Kerangka: `Repeat N-1 ( ... )` untuk naik, satu langkah puncak, `Repeat N-1 ( ... )` untuk turun, dan penutup. Cek N = 1: apakah hasilnya `F R F R F`?',
          ],
          work: [
            'N = 1: Forward 1, Right, Forward 1, Right, Forward 1 (kepik menghadap atas, jalur berbentuk ∩).',
            'N = 2: tambah satu anak tangga naik dan satu anak tangga turun: F R F L F R F R F L F R F.',
            'Bagian naik: unit "F R F L" (maju, belok kanan, maju, belok kiri) diulang N−1 kali. Setelah unit, Ladybug kembali menghadap atas.',
            'Puncak: `Forward 1`, `Right` (menghadap kanan). Bagian turun: unit yang sama (maju, kanan, maju, kiri) diulang N−1 kali; Ladybug kembali menghadap kanan.',
            'Penutup: `Forward 1`, `Right`, `Forward 1` (maju ke kanan, belok ke bawah, turun terakhir).',
            'Uji: N = 1 → repeat 0 kali, hasil `F R F R F` sesuai gambar; N = 3 → dua kali naik dan dua kali turun.',
          ],
          explanation: 'Program: `Repeat N-1 (Forward 1, Right, Forward 1, Left)`, `Forward 1`, `Right`, `Repeat N-1 (Forward 1, Right, Forward 1, Left)`, `Forward 1`, `Right`, `Forward 1`. Untuk N = 1 kedua `Repeat 0` tidak dijalankan sehingga hasilnya `F R F R F` seperti gambar. Penting: kata "N ≥ 1" pada Forward dan aturan "jika N < 1 tidak dijalankan" membuat `Repeat N-1` aman untuk N = 1. Ada banyak program setara (mis. memecah unit lain); yang dinilai adalah hasil gambar untuk semua N.',
          samples: [{
            answer: [
              'Repeat N-1 ( Forward 1',
              '             Right',
              '             Forward 1',
              '             Left )',
              'Forward 1',
              'Right',
              'Repeat N-1 ( Forward 1',
              '             Right',
              '             Forward 1',
              '             Left )',
              'Forward 1',
              'Right',
              'Forward 1',
            ].join('\n'),
            score: 4,
            note: 'Pola naik dan turun tepat (N−1 kali), puncak dan penutup benar; mahasiswa juga menguji string perintah untuk N = 1, 2, 3 di margin. Nilai tertulis: 4. (Transkripsi tulisan tangan; ada coretan merah kecil di sebelah blok kedua yang tidak mengubah nilai.)',
            noteEn: "The ascending and descending pattern (N−1 times), the top and the ending are all correct; the student also tested the command string for N = 1, 2, 3 in the margin. Mark on paper: 4. (Transcription of handwriting; there is a small red scribble next to the second block that does not change the mark.)",
          }],
          refs: [ref(6)],
          en: { stem: 'Given a number N, write the commands that make Ladybug follow the pattern shown above.', explanation: "Program: `Repeat N-1 (Forward 1, Right, Forward 1, Left)`, `Forward 1`, `Right`, `Repeat N-1 (Forward 1, Right, Forward 1, Left)`, `Forward 1`, `Right`, `Forward 1`. For N = 1 both `Repeat 0` blocks are not executed, so the result is `F R F R F` as in the figure. Important: the \"N ≥ 1\" in Forward and the rule \"if N < 1 it is not executed\" make `Repeat N-1` safe for N = 1. Many equivalent programs exist (e.g. splitting the unit differently); what is marked is the drawn result for all N.", hints: ["Draw the path for N = 1, 2, 3 with Ladybug facing up. Write the commands as letters (F, R, L) and look for the repeating part.", "Climbing one step = forward 1, turn right, forward 1, turn left (facing up again). How many full steps are repeated for N = 1, 2, 3? Remember the top part and the descending part.", "Skeleton: `Repeat N-1 ( ... )` for climbing, one top step, `Repeat N-1 ( ... )` for descending, and the ending. Check N = 1: is the result `F R F R F`?"], work: ["N = 1: Forward 1, Right, Forward 1, Right, Forward 1 (the ladybug faces up, the path is shaped like ∩).", "N = 2: add one ascending step and one descending step: F R F L F R F R F L F R F.", "Ascending part: the unit \"F R F L\" (forward, turn right, forward, turn left) repeated N−1 times. After the unit, Ladybug faces up again.", "Top: `Forward 1`, `Right` (now facing right). Descending part: the same unit (forward, right, forward, left) repeated N−1 times; Ladybug faces right again.", "Ending: `Forward 1`, `Right`, `Forward 1` (forward to the right, turn downward, final step down).", "Test: N = 1 → repeat 0 times, result `F R F R F` matches the figure; N = 3 → two ascents and two descents."] },
        },
        {
          id: 'uts25-s3b', kind: 'open', label: 'b', decks: ['D01', 'D02'], topic: 'CT principles: abstraction, decomposition, patterns, algorithms',
          stem: 'Jelaskan bagaimana konsep berpikir komputasional digunakan dalam persoalan ini, yaitu: **abstraksi, dekomposisi masalah, pengenalan pola, dan berpikir algoritmik.**',
          answer: [
            '- **Dekomposisi**: pecah jalur menjadi bagian naik, puncak, bagian turun, dan penutup; gambar N = 1, 2, 3 untuk melihat tiap bagian.',
            '- **Pengenalan pola**: bagian naik dan turun tersusun dari unit yang sama "F R F L" yang berulang N−1 kali; N bertambah 1 = satu anak tangga naik + satu turun lagi.',
            '- **Abstraksi**: abaikan bentuk kepik dan ukuran gambar; hanya jarak (1 meter) dan arah hadap yang penting.',
            '- **Algoritma**: rangkai urutan perintah: naik (repeat N−1), puncak, turun (repeat N−1), penutup; uji dengan N = 1, 2, 3.',
          ].join('\n'),
          rubric: RB_ROBOT_EXPLAIN,
          keyPoints: ['Dekomposisi: bagian-bagian jalur', 'Pola: unit berulang N−1 kali', 'Abstraksi: abaikan gambar kepik, jarak dan arah saja', 'Algoritma: urutan perintah dan pengujian N kecil'],
          samples: [{
            answer: [
              '**Dekomposisi:** mengidentifikasi perintah yang memungkinkan dijalankan; membuat daftar perintah yang perlu dilakukan Ladybug mulai dari N = 1, N = 2, dan N = 3.',
              '**Pengenalan pola:** dalam program ini terdapat berupa (Fr FL) sebanyak N−1 [sudah sampai puncak], lalu (Fr FL) sebanyak N−1 kali dan ditutup dengan Fr F.',
              '**Abstraksi:** mengabaikan jarak tempuh untuk Forward (di sini saya menganggap Forward dari 1 node ke node lain 1 meter).',
              '**Algoritma:** pahami perintah yang dapat dilakukan; identifikasi perintah masing-masing N; identifikasi pola; buat kode perintah.',
            ].join('\n'),
            score: 4,
            note: 'Keempat konsep disebut dengan isi yang tepat dan konsisten dengan program (a). Nilai tertulis: 4.',
            noteEn: "All four concepts are named with correct content and consistent with program (a). Mark on paper: 4.",
          }],
          explanation: 'Untuk soal CT: sebut keempat prinsip secara eksplisit, isi masing-masing dengan hal **spesifik** dari soal (bukan definisi umum), dan kaitkan dengan program pada (a).',
          refs: [ref(6)],
          en: { stem: 'Explain how the computational-thinking concepts are used in this problem: abstraction, decomposition, pattern recognition, algorithmic thinking.', explanation: "For CT questions: name all four principles explicitly, fill each with something **specific** from the problem (not a general definition), and link them to the program in (a).", answer: "- **Decomposition**: break the path into an ascending part, a top, a descending part and an ending; draw N = 1, 2, 3 to see each part.\n- **Pattern recognition**: the ascending and descending parts are built from the same unit \"F R F L\" repeated N−1 times; N growing by 1 = one more ascending step + one more descending step.\n- **Abstraction**: ignore the ladybug's shape and the size of the drawing; only the distance (1 metre) and facing direction matter.\n- **Algorithm**: chain the commands in order: ascend (repeat N−1), top, descend (repeat N−1), ending; test with N = 1, 2, 3.", keyPoints: ["Decomposition: the parts of the path", "Pattern: a unit repeated N−1 times", "Abstraction: ignore the ladybug picture, only distance and direction", "Algorithm: command order and testing small N"] },
        },
      ],
      en: { title: 'Problem 3 – Ladybug robot', intro: 'Ladybug flies a pattern using Forward N, Left, Right, Repeat N ( ... ). Write commands that draw the staircase shape for any N >= 1.' },
    },

    /* ---------------- Soal 4 ---------------- */
    {
      id: 'uts25-s4', archetype: 'program', title: 'Soal 4 – Suit Gunting-Batu-Kertas',
      source: { kind: 'uts' as const, lang: 'id' as const, src: SRC, label: 'Soal 4', pages: [7, 8], official: true, year: 2025 },
      intro: [
        'Sebuah *game* suit gunting-batu-kertas dimainkan oleh 2 (dua) pemain yang bertujuan untuk mendapatkan pemenang dari 5 (lima) ronde permainan suit yang hasilnya tidak seri. Program menerima masukan isyarat yang dikeluarkan oleh kedua pemain pada tiap ronde dan menampilkan ke layar nama pemain yang menang pada ronde yang bersangkutan menggunakan aturan permainan yang sudah familiar: (1) gunting menang melawan kertas; (2) kertas menang melawan batu; (3) batu menang melawan gunting, atau menampilkan pesan "Seri" jika hasil ronde tersebut seri, yaitu jika kedua pemain memberikan isyarat yang sama.',
        '',
        'Permainan dihentikan jika telah terjadi 5 (lima) ronde permainan yang tidak seri dan ditampilkan siapa pemenangnya berdasarkan jumlah ronde yang dimenangkan seorang pemain. Ronde yang menghasilkan seri tidak dihitung. Jika sampai 10 ronde tidak tercapai sejumlah 5 (lima) ronde yang tidak seri, pertandingan dihentikan dan ditampilkan pesan "Pemenang tidak dapat ditentukan".',
        '',
        'Untuk menyederhanakan program, gunakan kode "G" untuk Gunting, "K" untuk Kertas, dan "B" untuk Batu dan nama pemain 1 adalah "Pemain 1" dan nama pemain 2 adalah "Pemain 2".',
        '',
        '**Contoh-1:**',
        '',
        '| Ronde | Pemain 1 | Pemain 2 | Pemenang |',
        '|---|---|---|---|',
        '| 1 | G | K | Pemain 1 |',
        '| 2 | G | K | Pemain 1 |',
        '| 3 | G | B | Pemain 2 |',
        '| 4 | K | G | Pemain 2 |',
        '| 5 | G | G | Seri |',
        '| 6 | B | G | Pemain 1 |',
        '',
        'Output: Pemain 1 menang',
        '',
        '**Contoh-2:**',
        '',
        '| Ronde | Pemain 1 | Pemain 2 | Pemenang |',
        '|---|---|---|---|',
        '| 1 | K | K | Seri |',
        '| 2 | B | B | Seri |',
        '| 3 | K | B | Pemain 1 |',
        '| 4 | K | B | Pemain 1 |',
        '| 5 | G | G | Seri |',
        '| 6 | K | K | Seri |',
        '| 7 | B | K | Pemain 2 |',
        '| 8 | G | G | Seri |',
        '| 9 | B | B | Seri |',
        '| 10 | K | K | Seri |',
        '',
        'Output: Pemenang tidak dapat ditentukan',
        '',
        'Catatan penyalin: pada Contoh-1 keluaran akhir adalah "Pemain 1 menang" (3 ronde menang untuk Pemain 1 dari 5 ronde tidak seri).',
      ].join('\n'),
      parts: [
        {
          id: 'uts25-s4a', kind: 'program', label: 'a', decks: ['D02', 'D05'], topic: 'Flowchart: loop with a double stopping condition', patterns: ['while-condition', 'game-rules', 'count-if'], misconceptions: ['sentinel-counted', 'init-in-loop'],
          stem: 'Buatlah *flowchart* untuk permainan tersebut.',
          reps: ['flow'], required: 'flow', match: 'lenient',
          solution: {
            python: S4_PY,
            pseudo: S4_PSEUDO,
            flow: {
              title: 'Suit Gunting-Batu-Kertas',
              blocks: [
                { t: 'process', text: 'ronde ← 0' },
                { t: 'process', text: 'valid ← 0' },
                { t: 'process', text: 'menang1 ← 0' },
                { t: 'process', text: 'menang2 ← 0' },
                {
                  t: 'while', cond: 'valid < 5 and ronde < 10', body: [
                    { t: 'io', dir: 'in', text: 'input(p1)' },
                    { t: 'io', dir: 'in', text: 'input(p2)' },
                    { t: 'process', text: 'ronde ← ronde + 1' },
                    {
                      t: 'if', cond: 'p1 == p2',
                      then: [{ t: 'io', dir: 'out', text: 'output("Seri")' }],
                      else: [
                        { t: 'process', text: 'valid ← valid + 1' },
                        {
                          t: 'if', cond: '(p1 == "G" and p2 == "K") or (p1 == "K" and p2 == "B") or (p1 == "B" and p2 == "G")',
                          then: [{ t: 'io', dir: 'out', text: 'output("Pemain 1")' }, { t: 'process', text: 'menang1 ← menang1 + 1' }],
                          else: [{ t: 'io', dir: 'out', text: 'output("Pemain 2")' }, { t: 'process', text: 'menang2 ← menang2 + 1' }],
                        },
                      ],
                    },
                  ],
                },
                {
                  t: 'if', cond: 'valid < 5',
                  then: [{ t: 'io', dir: 'out', text: 'output("Pemenang tidak dapat ditentukan")' }],
                  else: [{
                    t: 'if', cond: 'menang1 > menang2',
                    then: [{ t: 'io', dir: 'out', text: 'output("Pemain 1 menang")' }],
                    else: [{ t: 'io', dir: 'out', text: 'output("Pemain 2 menang")' }],
                  }],
                },
              ],
            },
          },
          tests: S4_TESTS,
          wrong: [
            {
              code: S4_PY.replace('    else:\n        valid = valid + 1\n        if', '    else:\n        if').replace('    ronde = ronde + 1\n', '    ronde = ronde + 1\n    valid = valid + 1\n'),
              msg: 'Ronde seri ikut terhitung sebagai ronde sah, jadi permainan berhenti terlalu cepat. Hanya ronde **tidak seri** yang menambah penghitung ronde sah.', msgEn: "A draw round is also counted as a valid round, so the game stops too early. Only **non-draw** rounds increase the valid-round counter.", tag: 'sentinel-counted',
            },
            {
              code: S4_PY.replace('while (valid < 5 and ronde < 10):', 'while (valid < 5):'),
              msg: 'Batas 10 ronde tidak diperiksa: pengulangan tidak berhenti walau 10 ronde sudah dimainkan. Syarat lanjut harus `valid < 5` **dan** `ronde < 10`.', msgEn: "The 10-round limit is not checked: the loop does not stop even after 10 rounds have been played. The continue condition must be `valid < 5` **and** `ronde < 10`.",
            },
            {
              code: S4_PY.replace('ronde < 10', 'ronde < 9'),
              msg: 'Batas ronde off-by-one: ronde ke-10 masih harus dimainkan. Pakai `ronde < 10` (ronde dimulai dari 0 dan dinaikkan di dalam loop).', msgEn: "Off-by-one on the round limit: round 10 must still be played. Use `ronde < 10` (ronde starts at 0 and is incremented inside the loop).", tag: 'off-by-one',
            },
            {
              code: S4_PY.replace('if (valid < 5):\n    print("Pemenang tidak dapat ditentukan")\nelif (menang1 > menang2):', 'if (menang1 + menang2 < 3):\n    print("Pemenang tidak dapat ditentukan")\nelif (menang1 > menang2):'),
              msg: 'Pesan "Pemenang tidak dapat ditentukan" hanya boleh muncul jika ronde sah kurang dari 5, bukan kurang dari 3.', msgEn: "The message \"Pemenang tidak dapat ditentukan\" (winner cannot be determined) may only appear when there are fewer than 5 valid rounds, not fewer than 3.",
            },
          ],
          plan: [
            'ronde, valid, menang1, menang2 ← 0',
            'selama valid < 5 dan ronde < 10:',
            '  baca isyarat p1 dan p2; ronde ← ronde + 1',
            '  jika sama: tampilkan Seri',
            '  jika tidak: valid ← valid + 1; tentukan pemenang dengan 3 aturan; tampilkan dan tambah penghitung pemenang',
            'setelah loop: jika valid < 5: "tidak dapat ditentukan"; jika tidak: bandingkan menang1 dan menang2',
          ].join('\n'),
          skeleton: [
            'ronde = ___; valid = ___; menang1 = ___; menang2 = ___',
            'while (valid < ___ and ronde < ___):',
            '    p1 = input()',
            '    p2 = input()',
            '    ronde = ___',
            '    if (p1 == p2):',
            '        print("Seri")',
            '    else:',
            '        valid = ___',
            '        if ((p1 == "G" and p2 == "K") or (___) or (___)):',
            '            print("Pemain 1"); menang1 = menang1 + 1',
            '        else:',
            '            print("Pemain 2"); menang2 = menang2 + 1',
            'if (valid < ___):',
            '    print("Pemenang tidak dapat ditentukan")',
            'elif (menang1 > menang2):',
            '    print("Pemain 1 menang")',
            'else:',
            '    print("Pemain 2 menang")',
          ].join('\n'),
          hints: [
            'Ada dua hal yang dihitung: berapa ronde sudah dimainkan dan berapa ronde yang tidak seri. Dua penghitung berbeda, dua syarat henti.',
            'Perulangan berhenti jika ronde sah sudah 5 **atau** ronde sudah 10; jadi syarat *lanjut* memakai `and`. Seri tidak menambah ronde sah.',
            'Setelah loop, bedakan dua kasus dengan satu variabel: ronde sah < 5 (tidak dapat ditentukan) atau = 5 (bandingkan kemenangan).',
          ],
          work: [
            'Siapkan penghitung: ronde (semua ronde), valid (ronde tidak seri), menang1, menang2; semua 0 sebelum loop.',
            'Syarat lanjut: `valid < 5 and ronde < 10` (berhenti jika salah satu terpenuhi).',
            'Dalam loop: baca p1 dan p2, naikkan ronde. Jika p1 = p2 tampilkan "Seri" dan jangan naikkan valid.',
            'Jika beda: naikkan valid; Pemain 1 menang jika (G,K), (K,B), atau (B,G); selain itu Pemain 2. Tampilkan dan naikkan penghitung yang sesuai.',
            'Setelah loop: valid < 5 → "Pemenang tidak dapat ditentukan"; selain itu bandingkan menang1 dan menang2 (tidak mungkin seri karena 5 ronde sah).',
          ],
          syntax: ['while', 'if-else', 'relational-logical', 'input', 'print-str'],
          lineNotes: [
            { line: [1, 7], note: 'Kerangka program gaya kuliah: judul, spesifikasi, KAMUS (`# nama : tipe`) sebagai komentar, lalu ALGORITMA.', syntax: 'program-template', en: "Lecture-style program template: title, specification, DECLARATIONS (`# name : type`) as comments, then ALGORITHM." },
            { line: [8, 11], note: 'Empat penghitung diinisialisasi **sebelum** loop: ronde (semua ronde), valid (ronde tidak seri), dan jumlah kemenangan tiap pemain. Jika di dalam loop, nilainya ter-reset tiap ronde.', en: "The four counters are initialised **before** the loop: ronde (all rounds), valid (non-draw rounds), and each player's win count. Inside the loop they would be reset every round." },
            { line: 12, note: 'Syarat lanjut memakai `and`: berhenti begitu **salah satu** syarat henti terpenuhi, yaitu 5 ronde sah **atau** 10 ronde. `ronde < 10` menjaga agar ronde ke-10 masih dimainkan (ronde 0..9 di dalam loop).', syntax: 'while', en: "The continue condition uses `and`: stop as soon as **either** stop condition is met, i.e. 5 valid rounds **or** 10 rounds. `ronde < 10` makes sure round 10 is still played (rounds 0..9 inside the loop)." },
            { line: [13, 14], note: 'Dua `input()` per ronde, isyarat pemain 1 dulu, lalu pemain 2. `input()` mengembalikan string, jadi `"G"`, `"K"`, `"B"` dibandingkan sebagai string; tidak perlu `int()`.', syntax: 'input', en: "Two `input()` calls per round, player 1's gesture first, then player 2's. `input()` returns a string, so `\"G\"`, `\"K\"`, `\"B\"` are compared as strings; no `int()` needed." },
            { line: 15, note: 'Setiap iterasi memainkan satu ronde, jadi `ronde` selalu naik (termasuk ronde seri). Tanpa ini loop bisa tidak berhenti pada batas 10 ronde.', en: "Each iteration plays one round, so `ronde` always increases (including draws). Without this the loop might not stop at the 10-round limit." },
            { line: [16, 17], note: 'Hasil seri bila kedua isyarat sama. Ronde seri **tidak** menaikkan `valid`, itulah arti "ronde seri tidak dihitung".', syntax: 'if-else', en: "A draw when both gestures are equal. A draw does **not** increase `valid`; that is what \"draw rounds are not counted\" means." },
            { line: [18, 19], note: 'Ronde tidak seri: naikkan `valid` di sini (hanya di cabang tidak seri), bukan sebelum if. Jebakan umum: menaikkan valid untuk semua ronde.', en: "Non-draw round: increment `valid` here (only in the non-draw branch), not before the if. Common trap: incrementing valid for every round." },
            { line: 20, note: 'Tiga kasus Pemain 1 menang ditulis eksplisit dengan `or`: gunting > kertas (G,K), kertas > batu (K,B), batu > gunting (B,G). Setiap kondisi diberi tanda kurung agar `and`/`or` tidak salah prioritas.', syntax: 'relational-logical', en: "The three cases where Player 1 wins are written explicitly with `or`: scissors beat paper (G,K), paper beats rock (K,B), rock beats scissors (B,G). Each condition is parenthesised so `and`/`or` precedence cannot go wrong." },
            { line: [21, 22], note: 'Pemain 1 menang: tampilkan nama pemenang ronde, tambah penghitung kemenangannya.', en: "Player 1 wins: print the round winner's name, increment their win counter." },
            { line: [23, 25], note: 'Kasus lain (isyarat berbeda dan bukan salah satu dari tiga di atas) pasti kemenangan Pemain 2, jadi cukup `else`: tidak perlu menulis 3 kasus lagi. Tampilkan dan tambah penghitungnya.', en: "The other case (different gestures and not one of the three above) is necessarily a Player 2 win, so a plain `else` suffices: no need to write 3 more cases. Print it and increment the counter." },
            { line: [26, 27], note: 'Setelah loop (tidak menjorok, sekali saja): jika `valid < 5` berarti loop berhenti karena batas 10 ronde, bukan karena 5 ronde sah.', en: "After the loop (not indented, executed once): if `valid < 5` the loop stopped because of the 10-round limit, not because of 5 valid rounds." },
            { line: [28, 31], note: 'Ada 5 ronde sah, jumlah ganjil, jadi tidak pernah seri: cukup bandingkan `menang1 > menang2`, sisanya Pemain 2.', en: "There are 5 valid rounds, an odd number, so no tie is possible: just compare `menang1 > menang2`, otherwise Player 2." },
          ],
          pseudoNotes: [
            { line: [7, 10], note: 'Inisialisasi penghitung dengan `←` sebelum perulangan.', en: "Initialise the counters with `←` before the loop." },
            { line: 11, note: '`while ... do` dengan syarat lanjut (`and`): berhenti jika 5 ronde sah **atau** 10 ronde tercapai.', en: "`while ... do` with a continue condition (`and`): stops when 5 valid rounds **or** 10 rounds are reached." },
            { line: [12, 14], note: 'Masukan dua isyarat dan naikkan ronde (ronde seri tetap menaikkan ronde).', en: "Input the two gestures and increment ronde (a draw round still increments ronde)." },
            { line: [15, 17], note: 'Seri: hanya tampilkan pesan; valid tidak bertambah.', en: "Draw: only print the message; valid does not increase." },
            { line: [18, 24], note: 'Bukan seri: valid bertambah, lalu tiga kasus Pemain 1 menang, selain itu Pemain 2.', en: "Not a draw: valid increases, then the three Player 1 win cases, otherwise Player 2." },
            { line: [25, 31], note: 'Setelah perulangan: pesan "tidak dapat ditentukan" bila ronde sah < 5; selain itu bandingkan kemenangan.', en: "After the loop: print \"cannot be determined\" if valid rounds < 5; otherwise compare the wins." },
          ],
          rubric: RB_FLOW,
          samples: [{
            answer: 'Flowchart tulisan tangan: kotak inisialisasi (list pemenang, Pemain 1, Pemain 2, m1, m2, i, count valid), diamond "count valid < 5 and i < 10", input pemain 1 dan 2, deretan diamond bersarang untuk tiap pasangan isyarat (P1 = "G" / "K" / "B" lalu P2 = ...), kotak penyimpanan "list pemenang[count valid] = 1 atau 2" dan "count valid + 1", lalu di bagian bawah penghitungan m1 dan m2 untuk memilih "P1 win", "P2 win", atau "seri". (Panah menyilang-nyilang; sulit ditelusuri dari pindaian.)',
            score: 2,
            note: 'Nilai tertulis 2,5 (skala resmi memakai 0, 1, 2, 3, 3,5, 4; dicatat di sini sebagai 2). Logika aturan dan syarat henti ada, tetapi alurnya sulit diikuti: banyak panah menyilang dan percabangan bersarang per pasangan isyarat (6 kasus) sehingga tidak ringkas; pemisahan perulangan pertama dan penghitungan akhir (m1, m2) tidak rapi. Pelajaran: gunakan satu cabang `seri` lalu satu ekspresi gabungan untuk pemenang, dan susun flowchart rapi tanpa panah menyilang.',
            noteEn: "Mark on paper 2.5 (the official scale has no 2.5; recorded here as 2). The rules and stop conditions are present, but the flow is hard to follow: many crossing arrows and nested branches per gesture pair (6 cases), so it is not concise; the separation of the first loop and the final tally (m1, m2) is untidy. Lesson: use one `draw` branch and one combined expression for the winner, and lay out the flowchart neatly without crossing arrows.",
          }],
          explanation: 'Gunakan satu loop dengan syarat `valid < 5 and ronde < 10`, satu cabang untuk seri, dan satu kondisi gabungan untuk Pemain 1 menang (3 pasangan); sisanya Pemain 2. Setelah loop: bandingkan. Flowchart harus **konsisten** dengan program Python pada (b). Flowchart dinilai pada kelengkapan alur (masukan, perulangan dengan dua syarat henti, percabangan seri / pemenang / tidak ada pemenang, keluaran) dan keterbacaannya.',
          refs: [ref(7)],
          en: { stem: 'Draw a flowchart for the game.', explanation: "Use one loop with the condition `valid < 5 and ronde < 10`, one branch for a draw, and one combined condition for Player 1 winning (3 pairs); everything else is Player 2. After the loop: compare. The flowchart must be **consistent** with the Python program in (b). The flowchart is marked on the completeness of the flow (input, repetition with two stop conditions, branching for draw / winner / no winner, output) and on its readability.", hints: ["Two things are counted: how many rounds have been played and how many rounds were not draws. Two different counters, two stop conditions.", "The loop stops when the valid rounds reach 5 **or** the rounds reach 10; so the *continue* condition uses `and`. A draw does not increase the valid rounds.", "After the loop, tell two cases apart with one variable: valid rounds < 5 (cannot be determined) or = 5 (compare wins)."], work: ["Prepare the counters: ronde (all rounds), valid (non-draw rounds), menang1, menang2; all 0 before the loop.", "Continue condition: `valid < 5 and ronde < 10` (stop when either one is reached).", "In the loop: read p1 and p2, increment ronde. If p1 = p2 print \"Seri\" (draw) and do not increment valid.", "If different: increment valid; Player 1 wins if (G,K), (K,B) or (B,G); otherwise Player 2. Print and increment the matching counter.", "After the loop: valid < 5 → \"Pemenang tidak dapat ditentukan\" (winner cannot be determined); otherwise compare menang1 and menang2 (a tie is impossible because there are 5 valid rounds)."], plan: "ronde, valid, menang1, menang2 ← 0\nwhile valid < 5 and ronde < 10:\n  read gestures p1 and p2; ronde ← ronde + 1\n  if equal: print Seri (draw)\n  otherwise: valid ← valid + 1; decide the winner with the 3 rules; print it and increment the winner's counter\nafter the loop: if valid < 5: \"cannot be determined\"; otherwise compare menang1 and menang2" },
        },
        {
          id: 'uts25-s4b', kind: 'program', label: 'b', decks: ['D02', 'D05'], topic: 'Python: loop with a double stopping condition', patterns: ['while-condition', 'game-rules', 'count-if'], misconceptions: ['sentinel-counted', 'init-in-loop'],
          stem: 'Tuliskan program Python untuk permainan tersebut dan pastikan program ini selaras dengan *flowchart* terkait.',
          reps: ['python'], required: 'python', match: 'lenient',
          solution: { python: S4_PY },
          tests: S4_TESTS,
          wrong: [
            { code: S4_PY.replace('    else:\n        valid = valid + 1\n        if', '    else:\n        if').replace('    ronde = ronde + 1\n', '    ronde = ronde + 1\n    valid = valid + 1\n'), msg: 'Ronde seri ikut terhitung sebagai ronde sah. Hanya ronde tidak seri yang menaikkan penghitung ronde sah.', msgEn: "A draw round is also counted as a valid round. Only non-draw rounds increase the valid-round counter.", tag: 'sentinel-counted' },
            { code: S4_PY.replace('while (valid < 5 and ronde < 10):', 'while (valid < 5):'), msg: 'Batas 10 ronde tidak diperiksa.', msgEn: "The 10-round limit is not checked." },
            { code: S4_PY.replace('ronde < 10', 'ronde < 9'), msg: 'Off-by-one pada batas 10 ronde.', msgEn: "Off-by-one on the 10-round limit.", tag: 'off-by-one' },
          ],
          hints: ['Salin struktur dari flowchart (a): loop, cabang seri, cabang pemenang, lalu keputusan akhir.', 'Pastikan nama variabel dan urutan pengecekan sama dengan flowchart Anda.'],
          syntax: ['while', 'if-else', 'relational-logical', 'input'],
          lineNotes: [
            { line: [8, 11], note: 'Inisialisasi empat penghitung sebelum loop.', en: "Initialise the four counters before the loop." },
            { line: 12, note: 'Dua syarat henti dalam satu kondisi lanjut (`and`).', syntax: 'while', en: "Two stop conditions in one continue condition (`and`)." },
            { line: [13, 15], note: 'Baca dua isyarat dan naikkan `ronde` (termasuk ronde seri).', en: "Read the two gestures and increment `ronde` (including draw rounds)." },
            { line: [16, 17], note: 'Seri: tidak mengubah `valid`.', en: "Draw: `valid` does not change." },
            { line: [18, 25], note: 'Bukan seri: `valid` naik; tiga pasangan kemenangan Pemain 1 digabung dengan `or`, sisanya Pemain 2.', en: "Not a draw: `valid` increases; the three Player 1 winning pairs are combined with `or`, everything else is Player 2." },
            { line: [26, 31], note: 'Setelah loop: ronde sah < 5 berarti batas 10 ronde tercapai; selain itu bandingkan kemenangan.', en: "After the loop: fewer than 5 valid rounds means the 10-round limit was reached; otherwise compare the wins." },
          ],
          rubric: RB_PROGRAM,
          samples: [{
            answer: [
              '# (Kamus dibiarkan kosong)',
              'list_pemenang = [0 for i in range(5)]',
              'Pemain1 = ""; Pemain2 = ""; i = 0; count_valid = 0',
              'while count_valid < 5 and i < 10:',
              '    print(f"ronde {i+1}")',
              '    Pemain1 = input("masukkan B/G/K : ")',
              '    Pemain2 = input("masukkan B/G/K : ")',
              '    if Pemain1 == "B":',
              '        if Pemain2 == "G": print("Pemain 1 menang"); list_pemenang[count_valid] = 1; count_valid += 1; i += 1',
              '        elif Pemain2 == "K": print("Pemain 2 menang"); list_pemenang[count_valid] = 2; count_valid += 1; i += 1',
              '        elif Pemain2 == "B": print("seri"); i += 1',
              '    elif Pemain1 == "G": ... (G,G seri; G,B Pemain 2; G,K Pemain 1, masing-masing menaikkan count_valid dan i)',
              '    elif Pemain1 == "K": ... (K,G Pemain 2; K,B Pemain 1; K,K seri)',
              'm1 = 0; m2 = 0',
              'for j in range(5):',
              '    if list_pemenang[j] == 1: m1 += 1',
              '    elif list_pemenang[j] == 2: m2 += 1',
              'if m1 + m2 < 5: print("Pemenang tidak dapat ditentukan")',
              'else:',
              '    if m1 > m2: print("Pemain 1 menang")',
              '    else: print("Pemain 2 menang")',
            ].join('\n'),
            score: 3,
            note: 'Transkripsi ringkas (tulisan tangan; bagian G dan K diringkas). Logika benar: aturan 6 pasangan, syarat henti ganda, pesan akhir. Nilai tertulis: 3. Pengurangan kemungkinan karena: bagian Kamus dikosongkan (catatan merah "tidak ada isi!"), larik `list_pemenang` dan loop kedua tidak perlu (cukup dua penghitung), 9 cabang bersarang yang panjang, dan keluaran tiap ronde "Pemain 1 menang" alih-alih sekadar nama pemain; selaras dengan flowchart (a) yang juga rumit.',
            noteEn: "Abridged transcription of the handwriting (the G and K parts are summarised). The logic is correct: the rules for the 6 pairs, the double stop condition, the final message. Mark on paper: 3. Likely deductions: the Kamus (declarations) part was left empty (red note \"nothing here!\"), the `list_pemenang` array and the second loop are unnecessary (two counters suffice), 9 long nested branches, and per-round output \"Pemain 1 menang\" instead of just the player's name; consistent with flowchart (a), which is also convoluted.",
          }],
          explanation: 'Solusi ringkas: dua penghitung kemenangan dan satu penghitung ronde sah, tanpa larik. Program harus selaras dengan flowchart (a): struktur dan nama variabel yang sama.',
          refs: [ref(7), ref(8)],
          en: { stem: 'Write the Python program for the game and make sure it is consistent with the flowchart.', explanation: "Concise solution: two win counters and one valid-round counter, no array. The program must be consistent with flowchart (a): same structure and variable names.", hints: ["Copy the structure from flowchart (a): loop, draw branch, winner branch, then the final decision.", "Make sure the variable names and order of checks are the same as in your flowchart."] },
        },
      ],
      en: { title: 'Problem 4 – Rock-paper-scissors', intro: 'Two players play up to 10 rounds; the game stops after 5 non-draw rounds and the player with more round wins is the winner; if 10 rounds pass without 5 decisive ones, print "Pemenang tidak dapat ditentukan". Codes: G scissors, K paper, B rock.' },
    },

    /* ---------------- Soal 5 ---------------- */
    {
      id: 'uts25-s5', archetype: 'program', title: 'Soal 5 – Penjualan Tiket',
      source: { kind: 'uts' as const, lang: 'id' as const, src: SRC, label: 'Soal 5', pages: [9], official: true, year: 2025 },
      intro: [
        'TicketKonser.com melayani penjualan tiket konser artis-artis dunia yang menangani outlet penjualan dari berbagai kota di Indonesia, seperti Jakarta, Bandung, Surabaya, dan Denpasar. Perusahaan ingin membandingkan tren penjualan tiket di dua kota besar di Indonesia yaitu Surabaya (SBY) dan Bandung (BDG).',
        '',
        'Sebuah program digunakan menyimpan data jumlah penjualan tiket di Surabaya dan Bandung per bulan selama 1 tahun dan selanjutnya melakukan perbandingan penjualan per bulan, apakah penjualan dari kedua kota yang sama atau berbeda dan jika berbeda, kota manakah yang lebih besar. Perlu dicatat, jika selisih penjualan tiket masih di bawah 100 tiket, maka tingkat penjualan antar kedua kota dianggap sama.',
        '',
        'Selanjutnya dilakukan analisis kota mana yang lebih menguntungkan yaitu yang pada analisis per bulan lebih banyak memiliki jumlah penjualan yang lebih besar. Jika tidak ada yang lebih besar, maka berarti penjualan kedua kota adalah sama menguntungkan.',
        '',
        'Berikut contoh data Surabaya dan Bandung serta proses analisisnya:',
        '',
        '| Bulan | SBY | BDG | Selisih | Catatan |',
        '|---|---|---|---|---|',
        '| 1 | 3456 | 9146 | 5690 | Bandung lebih besar |',
        '| 2 | 2494 | 2483 | 11 | Sama |',
        '| 3 | 5779 | 8035 | 2256 | Bandung lebih besar |',
        '| 4 | 6394 | 6394 | 0 | Sama |',
        '| 5 | 9866 | 3043 | 6823 | Surabaya lebih besar |',
        '| 6 | 4331 | 7268 | 2937 | Bandung lebih besar |',
        '| 7 | 4133 | 4525 | 392 | Bandung lebih besar |',
        '| 8 | 2171 | 8632 | 6461 | Bandung lebih besar |',
        '| 9 | 584 | 5428 | 4844 | Bandung lebih besar |',
        '| 10 | 8120 | 8144 | 24 | Sama |',
        '| 11 | 8369 | 9546 | 1177 | Bandung lebih besar |',
        '| 12 | 6469 | 3793 | 2676 | Surabaya lebih besar |',
        '',
        'Jml. BDG lebih besar = 7; Jml. SBY lebih besar = 2. Jadi, BDG lebih menguntungkan karena lebih banyak memiliki jumlah penjualan per bulan yang lebih besar.',
        '',
        '**Tugas Anda:** Tuliskan sebuah program Python yang melakukan hal sebagai berikut:',
        '1. Menerima input data penjualan kota Surabaya (SBY) selama 12 bulan dan data penjualan kota Bandung (BDG), masing-masing dalam 12 bulan, dan masing-masing disimpan dalam array (list) yang berbeda.',
        '2. Melakukan perbandingan masing-masing bulan pada data kedua kota berdasarkan data yang tersimpan di di array (list) data kota Surabaya dan Bandung.',
        '3. Menampilkan kota mana yang lebih menguntungkan sesuai definisi di atas.',
        '',
        '**Ketentuan untuk diperhatikan:**',
        '- Anda diwajibkan membuat dan menggunakan subprogram (fungsi/prosedur) untuk minimum salah satu persoalan berikut ini.',
        '  - Menerima input data penjualan 12 bulan dan menyimpannya ke sebuah array.',
        '  - Berdasarkan 2 (dua) data penjualan per bulan, menentukan mana penjualan yang lebih besar atau apakah kedua penjualan sama.',
        '  - Menentukan kota mana yang lebih menguntungkan berdasarkan data array kota Surabaya dan Bandung.',
        '- Tampilan input dan output bebas.',
        '',
        'Catatan: pada pengujian di situs ini, masukan dibaca berurutan: 12 angka SBY lalu 12 angka BDG, satu per baris.',
      ].join('\n'),
      parts: [{
        id: 'uts25-s5a', kind: 'program', decks: ['D06', 'D10'], topic: 'Array + subprogram: comparing two arrays', patterns: ['array-populate', 'array-compare', 'function-def-call', 'count-if'], misconceptions: ['off-by-one', 'not-complete'],
        stem: 'Tuliskan sebuah program Python yang (1) menerima data penjualan SBY dan BDG masing-masing 12 bulan ke dalam dua array, (2) membandingkan tiap bulan (selisih di bawah 100 tiket dianggap sama), dan (3) menampilkan kota yang lebih menguntungkan. Wajib memakai subprogram minimal untuk salah satu persoalan di atas. Tampilan input dan output bebas.',
        reps: ['python', 'pseudo'], match: 'judge', judge: S5_JUDGE,
        mustUse: ['subprogram', 'array'],
        solution: { python: S5_PY, pseudo: S5_PSEUDO },
        tests: S5_TESTS,
        wrong: S5_WRONG,
        plan: [
          'fungsi BacaData(N): array N elemen, isi dari input',
          'fungsi Banding(a, b): 0 jika |a−b| < 100, 1 jika a lebih besar, 2 jika b lebih besar',
          'fungsi JumlahLebih(A, B, N, kode): hitung bulan yang Banding-nya = kode',
          'program utama: baca SBY dan BDG; hitung jmlSBY dan jmlBDG; tampilkan kota dengan jumlah bulan unggul lebih besar atau "sama"',
        ].join('\n'),
        skeleton: [
          'def BacaData(N):',
          '    T = [0 for i in range(N)]',
          '    for i in range(___):',
          '        T[i] = int(___)',
          '    return ___',
          '',
          'def Banding(a, b):',
          '    if (abs(a - b) ___ 100):',
          '        return 0',
          '    elif (a > b):',
          '        return ___',
          '    else:',
          '        return 2',
          '# ... JumlahLebih(A, B, N, kode) menghitung bulan dengan Banding(...) == kode',
        ].join('\n'),
        hints: [
          'Pecah masalah (dekomposisi): baca data, bandingkan satu bulan, hitung bulan unggul, putuskan pemenang. Tiga di antaranya cocok jadi subprogram.',
          'Satu fungsi kecil yang mengembalikan 0/1/2 untuk satu bulan membuat sisanya sederhana. Perhatikan: selisih **di bawah** 100 = sama, jadi selisih tepat 100 sudah berbeda.',
          'Yang dihitung adalah **jumlah bulan** yang lebih besar untuk tiap kota, bukan total tiket. Jangan lupa kasus jumlah sama (kedua kota sama).',
        ],
        work: [
          'Tulis BacaData(N): buat array `[0 for i in range(N)]`, isi dengan `int(input())`, kembalikan array.',
          'Tulis Banding(a, b): `abs(a - b) < 100` → 0; selain itu a > b → 1 atau 2.',
          'Tulis JumlahLebih(A, B, N, kode): for i in range(N) hitung Banding(A[i], B[i]) == kode.',
          'Program utama: SBY dan BDG dibaca dengan BacaData(12); tampilkan hasil tiap bulan (opsional).',
          'Hitung jmlSBY dan jmlBDG; bandingkan: SBY lebih besar → Surabaya, BDG lebih besar → Bandung, sama → kedua kota sama menguntungkan.',
        ],
        syntax: ['def-function', 'return', 'call', 'list-init', 'list-index', 'for-range', 'if-elif'],
        lineNotes: [
          { line: [1, 7], note: 'Kerangka program gaya kuliah: judul, spesifikasi, KAMUS sebagai komentar.', syntax: 'program-template', en: "Lecture-style program template: title, specification, DECLARATIONS as comments." },
          { line: [9, 15], note: '**Subprogram 1** (fungsi): menerima N, membaca N bilangan, mengembalikan array. Spesifikasi ditulis sebagai komentar di bawah `def`. Array dibuat dengan `[0 for i in range(N)]` lalu diisi per indeks 0..N−1.', syntax: 'def-function', en: "**Subprogram 1** (function): takes N, reads N numbers, returns an array. The specification is written as a comment under `def`. The array is created with `[0 for i in range(N)]` and filled by index 0..N−1." },
          { line: 14, note: '`int(input())` per elemen: `input()` selalu string. Tiap bilangan satu baris sesuai format uji; pada ujian tulis format input bebas.', syntax: 'input', en: "`int(input())` per element: `input()` is always a string. One number per line to match the test format; in the written exam the input format is free." },
          { line: 15, note: '`return T` mengembalikan array ke pemanggil (bukan `print`): hasilnya dipakai lagi oleh program utama.', syntax: 'return', en: "`return T` returns the array to the caller (not `print`): the main program uses the result again." },
          { line: [17, 25], note: '**Subprogram 2**: membandingkan **satu bulan**. `abs(a - b) < 100` menangani selisih positif atau negatif sekaligus; selisih tepat 100 **tidak** sama (`<`, bukan `<=`). Mengembalikan kode 0/1/2 supaya pemanggil yang memutuskan tampilan.', syntax: 'if-elif', en: "**Subprogram 2**: compares **one month**. `abs(a - b) < 100` handles positive and negative differences at once; a difference of exactly 100 is **not** equal (`<`, not `<=`). It returns a code 0/1/2 so the caller decides how to display it." },
          { line: [27, 34], note: '**Subprogram 3**: menghitung banyak bulan dengan hasil perbandingan = `kode`. `for i in range(N)` menelusuri indeks 0..N−1 sehingga A[i] dan B[i] adalah bulan yang sama. Penghitung `jml = 0` di luar loop.', syntax: 'for-range', en: "**Subprogram 3**: counts the months whose comparison result = `kode`. `for i in range(N)` traverses indices 0..N−1 so A[i] and B[i] are the same month. The counter `jml = 0` is outside the loop." },
          { line: [36, 45], note: 'Program utama: dua array dibaca dengan fungsi yang sama (reuse). Loop 12 bulan menampilkan hasil per bulan (opsional; format bebas) lewat `Banding`.', syntax: 'call', en: "Main program: both arrays are read with the same function (reuse). The 12-month loop prints each month's result (optional; free format) via `Banding`." },
          { line: [46, 49], note: 'Dua pemanggilan `JumlahLebih` dengan kode berbeda; hasilnya dipakai untuk simpulan.', en: "Two calls to `JumlahLebih` with different codes; the results are used for the conclusion." },
          { line: [50, 55], note: 'Keputusan akhir ditentukan dari **jumlah bulan unggul**: SBY lebih banyak → Surabaya; BDG lebih banyak → Bandung; sama → kedua kota sama menguntungkan (jangan lupa kasus ini).', en: "The final decision is based on the **number of months won**: more SBY → Surabaya; more BDG → Bandung; equal → both cities equally profitable (don't forget this case)." },
        ],
        pseudoNotes: [
          { line: [3, 8], note: 'KAMUS global: dua array, penghitung, dan signatur tiga fungsi (nama, parameter, tipe hasil).', en: "Global DECLARATIONS: two arrays, counters, and the signatures of the three functions (name, parameters, result type)." },
          { line: [10, 39], note: 'Definisi ketiga subprogram sebelum program utama. Spesifikasi di dalam `{ }`, variabel lokal di KAMUS LOKAL, nilai dikembalikan dengan `→`.', en: "Definitions of the three subprograms before the main program. The specification goes in `{ }`, local variables in LOCAL DECLARATIONS, and the value is returned with `→`." },
          { line: [42, 43], note: 'Array diisi dengan memanggil fungsi `BacaData`: nilai kembalian ditampung langsung ke array.', en: "The arrays are filled by calling the function `BacaData`: the returned value is stored directly into the array." },
          { line: [44, 52], note: 'Traversal 0..11; tiap bulan dibandingkan lewat `Banding`.', en: "Traversal 0..11; each month is compared through `Banding`." },
          { line: [53, 62], note: 'Hitung bulan unggul tiap kota, lalu tentukan kota yang lebih menguntungkan atau "sama".', en: "Count each city's months won, then decide which city is more profitable, or \"equal\"." },
        ],
        rubric: RB_PROGRAM,
        samples: [{
          answer: [
            'SBY = [0 for i in range(12)]',
            'BDG = [0 for i in range(12)]',
            'min = [0 for i in range(12)]',
            'for i in range(12):',
            '    SBY[i] = int(input())',
            '    BDG[i] = int(input())',
            '    min[i] = abs(BDG[i] - SBY[i])',
            'for i in range(12):',
            '    if SBY[i] > BDG[i]:',
            '        if min[i] < 100: print(...)  # sama',
            '        else: sby_besar += 1',
            '    elif SBY[i] < BDG[i]:',
            '        if min[i] < 100: print(...)',
            '        else: bdg_besar += 1',
            'if sby_besar > bdg_besar: print(...)',
            'elif sby_besar < bdg_besar: ...  (jawaban berlanjut di halaman berikutnya, tidak ada di pindaian)',
          ].join('\n'),
          score: 3,
          note: 'Transkripsi ringkas (tulisan tangan, halaman terpotong di bawah). Nilai tertulis di lembar: "a = 3, b = 0". Pengurangan pada a: sebagian kecil (pemrosesan data dan perbandingan per bulan benar dengan ambang < 100, tetapi masukan SBY dan BDG diselang-seling dan hasil per bulan tidak jelas). b = 0 kemungkinan karena syarat wajib subprogram tidak dipenuhi (catatan merah di sebelah kiri bawah terbaca seperti "spek tak ada"; arti kolom b pada kertas tidak tertulis dan ini hanya dugaan). Pelajaran: baca ketentuan "wajib membuat subprogram" dan penuhi, sekecil apa pun.',
          noteEn: "Abridged transcription of the handwriting (the page is cut off at the bottom). Marks on the sheet: \"a = 3, b = 0\". The deduction on a is small (the data processing and the monthly comparison are correct with threshold < 100, but SBY and BDG inputs are interleaved and the monthly result is unclear). b = 0 is probably because the mandatory subprogram requirement was not met (the red note at the lower left reads roughly \"spec not met\"; what column b means on the paper is not written, so this is only a guess). Lesson: read the requirement \"must create a subprogram\" and satisfy it, however small.",
        }],
        explanation: 'Syarat khusus soal: (1) **dua array** terpisah, (2) **subprogram wajib** minimal untuk satu dari tiga hal, (3) selisih **di bawah 100** dianggap sama (tepat 100 berbeda), (4) pemenang ditentukan dari **jumlah bulan** unggul, bukan total tiket, (5) hasil seri jika jumlah bulan unggul sama. Tampilan input/output bebas, sehingga pemeriksa di situs ini hanya memeriksa kesimpulan akhir (nama kota atau "sama") pada baris terakhir keluaran.',
        refs: [ref(9)],
        en: { stem: 'Write a Python program that reads SBY and BDG monthly ticket sales (12 months each) into two arrays, compares each month (a gap below 100 tickets counts as equal) and prints which city is more profitable. You must write and use a subprogram for at least one of the listed tasks. Input/output format is free.', explanation: "Special requirements of the problem: (1) **two separate arrays**, (2) a **mandatory subprogram** for at least one of the three tasks, (3) a difference **below 100** counts as equal (exactly 100 is different), (4) the winner is decided by the **number of months** won, not the total tickets, (5) the result is a tie if the number of months won is the same. Input/output format is free, so the checker on this site only examines the final conclusion (the city name or \"sama\" = equal) on the last line of output.", hints: ["Break the problem down (decomposition): read data, compare one month, count the months won, decide the winner. Three of these suit subprograms.", "One small function that returns 0/1/2 for one month makes the rest simple. Note: a difference **below** 100 = equal, so a difference of exactly 100 is already different.", "What is counted is the **number of months** that are larger for each city, not the total tickets. Don't forget the case of equal counts (both cities equally profitable)."], work: ["Write BacaData(N): create the array `[0 for i in range(N)]`, fill it with `int(input())`, return the array.", "Write Banding(a, b): `abs(a - b) < 100` → 0; otherwise a > b → 1 or 2.", "Write JumlahLebih(A, B, N, kode): `for i in range(N)` count Banding(A[i], B[i]) == kode.", "Main program: read SBY and BDG with BacaData(12); print each month's result (optional).", "Compute jmlSBY and jmlBDG; compare: SBY larger → Surabaya, BDG larger → Bandung, equal → both cities equally profitable."], plan: "function BacaData(N): an array of N elements, filled from input\nfunction Banding(a, b): 0 if |a−b| < 100, 1 if a is larger, 2 if b is larger\nfunction JumlahLebih(A, B, N, kode): count the months whose Banding = kode\nmain program: read SBY and BDG; compute jmlSBY and jmlBDG; print the city with more months won, or \"equal\"" },
      }],
      en: { title: 'Problem 5 – Ticket sales', intro: 'Compare monthly ticket sales of Surabaya and Bandung over a year; a difference below 100 is treated as equal; the more profitable city is the one that is larger in more months.' },
    },
  ],
  papers: [
    {
      id: 'uts2025', title: 'UTS WI1102 Berpikir Komputasional, Sem 1 2025/2026', year: 2025, date: '2025-11-29', kind: 'uts' as const, lang: 'id' as const,
      note: "Scan of a real student's marked answer sheet (anonymised): the cover page is missing; the red marks are the marker's scores. The Part I key is inferred from the per-question scores and the D11 slides; the essay rubrics follow the official UTS 2024 format (the 2025 rubric is not available).",
      noteId: 'Pindaian lembar jawab mahasiswa yang sudah dinilai (anonim): halaman sampul tidak ada; tanda merah adalah nilai pemeriksa. Kunci Bagian I disimpulkan dari nilai per soal dan slide D11; rubrik essay mengikuti format resmi UTS 2024 (rubrik 2025 tidak tersedia).',
      problems: ['uts25-i', 'uts25-s1', 'uts25-s2', 'uts25-s3', 'uts25-s4', 'uts25-s5'],
    },
  ],
  flashcards: [],
}
