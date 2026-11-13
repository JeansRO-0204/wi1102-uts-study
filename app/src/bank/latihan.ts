// Latihan-1 (Bebras-style CT tasks), Latihan-2 (UTS-style essays) and TUBAY STEI'25 (student tutors' practice problems).
// Keys: Latihan-1/-2 print no answers, so every key below was computed/verified by us (see each `explanation`).
// TUBAY STEI'25 turned out to be a typeset PDF (not a scan) with five one-paragraph problem statements and no keys or
// input/output formats; the I/O format in each TUBAY stem is an explicit assumption added by this site.
import type { BankFile, RubricRow } from '../types'

const r = String.raw

const L1 = 'Latihan-1'
const L2 = 'Latihan-2'
const TB = 'TUBAY_STEI25'

/* ------------------------------ rubrics (official 2024 wording, adapted to the item) ------------------------------ */

const RUB_CONSTRAINT_A: RubricRow[] = [
  { score: 4, desc: 'Kombinasi yang diberikan tepat memenuhi semua constraint', descEn: 'The combination satisfies every constraint.' },
  { score: 3, desc: 'Kombinasi yang diberikan memenuhi hanya dua constraint, misalnya jumlahnya enam dan semua hidangan muncul maksimum 2 kali, tapi ukurannya untuk hidangan yang sama ada ukurannya yang sama', descEn: 'Only two constraints are satisfied, e.g. six items and each type at most twice, but two items of the same type share a size.' },
  { score: 2, desc: 'Kombinasi yang diberikan memenuhi hanya salah satu constraint', descEn: 'Only one constraint is satisfied.' },
  { score: 1, desc: 'Kombinasi yang diberikan tidak memenuhi constraint yang ditetapkan, tapi masih ada aspek yang benar.', descEn: 'No constraint is satisfied, but some aspect is right.' },
  { score: 0, desc: 'Tidak mengerjakan atau jawaban sama sekali salah.', descEn: 'No answer, or entirely wrong.' },
]
const RUB_CONSTRAINT_B: RubricRow[] = [
  { score: 4, desc: 'Penjelasan mengandung aspek abstraksi (menentukan hal penting) dan dekomposisi (merumuskan constraints) sesuai deskripsi jawaban di atas.', descEn: 'The explanation contains abstraction (identifying what matters) and decomposition (stating the constraints).' },
  { score: 3, desc: 'Penjelasan mengandung aspek abstraksi dan dekomposisi sesuai deskripsi jawaban di atas, tetapi ada satu buah kesalahan, misalnya: pada dekomposisi ada aturan tambahan yang ditetapkan (tidak sesuai dengan soal atau bukan hal penting) atau ada hal penting yang didefinisikan padahal tidak tepat atau tidak sesuai soal.', descEn: 'Both aspects are present but with one error, e.g. an extra rule that is not in the problem, or a wrongly defined key fact.' },
  { score: 2, desc: 'Penjelasan yang benar hanya untuk salah satu aspek saja (dekomposisi/abstraksi).', descEn: 'Correct for only one aspect (decomposition or abstraction).' },
  { score: 1, desc: 'Secara umum penjelasan untuk dekomposisi dan abstraksi tidak tepat, tetapi masih ada hal benar dalam statement jawaban.', descEn: 'Generally incorrect, but the answer still contains something right.' },
  { score: 0, desc: 'Tidak menjawab atau jawaban sama sekali salah.', descEn: 'No answer, or entirely wrong.' },
]
const RUB_CLASS_A: RubricRow[] = [
  { score: 4, desc: 'Sistem klasifikasi hierarkis benar (menunjukkan klasifikasi dan ada hierarki yang benar dan jelas terdefinisi)', descEn: 'A correct hierarchical system: the classes and a clearly defined hierarchy are shown.' },
  { score: 3, desc: 'Sistem klasifikasi hierarkis secara umum benar, tetapi ada satu aspek yang salah.', descEn: 'Generally correct, with one wrong aspect.' },
  { score: 2, desc: 'Memberikan klasifikasi berdasarkan satu kolom tertentu, tetapi tidak ada hierarki. Membuat klasifikasi yang hierarkis, tetapi berdasarkan kolom yang tidak tepat karena nilai-nilai kolomnya sangat berbeda satu sama lain sehingga kurang tepat untuk klasifikasi, misalnya tingkat 1 berdasarkan Judul Buku, tingkat 2 berdasarkan tahun terbit.', descEn: 'Classification by a single column with no hierarchy, or a hierarchy on unsuitable columns whose values all differ (e.g. level 1 = book title).' },
  { score: 1, desc: 'Masih ada aspek yang tepat dari jawaban, tetapi secara umum jawaban tidak tepat.', descEn: 'Some aspect is right but the answer is generally wrong.' },
  { score: 0, desc: 'Tidak menjawab atau jawaban salah total.', descEn: 'No answer, or entirely wrong.' },
]
const RUB_CLASS_B: RubricRow[] = [
  { score: 4, desc: 'Klasifikasi pada soal 2.a. minimum bernilai 3 dan penjelasan lengkap dan benar.', descEn: 'Part (a) scores at least 3 and the explanation is complete and correct.' },
  { score: 3, desc: 'Klasifikasi pada soal 2.a. minimum bernilai 3, penjelasan ada, tetapi ada kesalahan pada penjelasan.', descEn: 'Part (a) scores at least 3; the explanation exists but contains an error.' },
  { score: 2, desc: 'Klasifikasi pada soal 2.a. bernilai 1 atau 2, tetapi penjelasan tepat dan baik. Penjelasan tepat dan baik, tapi tidak sesuai dengan klasifikasi yang disebutkan di soal 2.a atau soal 2.a. tidak menjawab.', descEn: 'Part (a) scores 1 or 2 but the explanation is good; or the explanation does not match part (a).' },
  { score: 1, desc: 'Penjelasan tidak lengkap, tetapi masih ada yang benar.', descEn: 'The explanation is incomplete but partly right.' },
  { score: 0, desc: 'Tidak menjawab atau jawaban sama sekali salah.', descEn: 'No answer, or entirely wrong.' },
]
const RUB_CLASS_C: RubricRow[] = [
  { score: 4, desc: 'Kode yang diberikan seluruhnya benar, boleh ada kesalahan minor (karena kurang teliti) dan sesuai dengan pola yang ditetapkan pada soal 2.a dan 2.b', descEn: 'All codes are correct (minor slips allowed) and follow the pattern from (a) and (b).' },
  { score: 3, desc: 'Kode secara umum benar, tetapi sebagian kecil tidak mengikuti pola yang ditetapkan pada soal 2.a dan 2.b', descEn: 'Codes are generally correct but a few do not follow the pattern.' },
  { score: 2, desc: 'Kode yang diberikan mengikuti pola tertentu dengan benar, tapi tidak sesuai dengan pola klasifikasi hierarki pada soal 2.a dan 2.b. Cara membuat kode, sebagian sesuai dengan pola pada soal 2.a dan 2.b tetapi sebagian lagi tidak.', descEn: 'Codes follow some pattern but not the hierarchy of (a) and (b); or only partly consistent.' },
  { score: 1, desc: 'Masih ada bagian kode yang benar, tapi sebagian besar salah', descEn: 'Some codes are right but most are wrong.' },
  { score: 0, desc: 'Tidak menjawab atau jawaban salah total.', descEn: 'No answer, or entirely wrong.' },
]
const RUB_ROBOT: RubricRow[] = [
  { score: 4, desc: 'Urutan langkah dapat digunakan untuk menggambarkan bentuk dengan tepat sesuai instruksi', descEn: 'The sequence draws the shape exactly as instructed.' },
  { score: 3.5, desc: 'Ada kesalahan kecil yang menyebabkan solusi tidak sempurna', descEn: 'A small error makes the solution imperfect.' },
  { score: 3, desc: 'Urutan langkah kurang, tapi secara umum masih akan menghasilkan bentuk yang diharapkan walaupun tidak sempurna, Ada perintah-perintah yang seharusnya bisa diulang (dengan perintah repeat) tapi dituliskan berjajar, namun hasil eksekusi benar.', descEn: 'Steps are lacking but the shape is roughly produced; or commands that should use repeat are written out one by one, yet execution is correct.' },
  { score: 2, desc: 'Hanya sebagian urutan langkah akan menghasilkan sebagian bentuk yang diharapkan. Termasuk jika tejadi sebuah kesalahan (walaupun hanya 1 langkah) yang menyebabkan bentuk tidak tergambar dengan benar, tetapi sebenarnya masih mengarah ke bentuk yang yang diharapkan.', descEn: 'Only part of the sequence yields part of the shape, including a single-step slip that breaks the drawing.' },
  { score: 1, desc: 'Hanya sebagian kecil dari urutan langkah menghasilkan bentuk yang benar.', descEn: 'Only a small part of the sequence is correct.' },
  { score: 0, desc: 'Salah total, atau tidak mengerjakan.', descEn: 'Entirely wrong, or no answer.' },
]
const RUB_PROG: RubricRow[] = [
  { score: 4, desc: 'Program lengkap dan secara umum tepat, masih boleh ada kesalahan minor', descEn: 'A complete, generally correct program; minor errors allowed.' },
  { score: 3.5, desc: 'Program sebagian besar benar, tetapi ada 1 kesalahan minor pada program', descEn: 'Mostly correct with one minor error.' },
  { score: 3, desc: 'Ada kesalahan pada sebagian kecil bagian program', descEn: 'A small part of the program is wrong.' },
  { score: 2, desc: 'Secara umum hanya setengah bagian dari program yang tepat', descEn: 'Roughly half of the program is right.' },
  { score: 1, desc: 'Hanya ada sebagian kecil jawaban yang benar', descEn: 'Only a small part is right.' },
  { score: 0, desc: 'Tidak dikerjakan atau jawaban salah total.', descEn: 'Not attempted, or entirely wrong.' },
]

const KEY_NOTE = 'Catatan: sumber tidak mencantumkan kunci; jawaban ini dihitung dan diverifikasi sendiri.'

export const bank: BankFile = {
  problems: [
    /* ======================================================= LATIHAN-1 ======================================================= */
    {
      id: 'lat1-s1', archetype: 'concept', title: '1. Daur Ulang', en: { title: '1. Recycling' },
      source: { kind: 'latihan' as const, lang: 'id' as const, src: L1, label: '1. Daur Ulang', pages: [1], official: true },
      parts: [{
        id: 'lat1-s1a', kind: 'mcq', decks: ['D01'], topic: 'Simple optimisation', difficulty: 2,
        stem: "Berang-berang tidak suka sampah. Mereka suka menggunakan barang-barang lama yang sudah usang sebagai bahan untuk membuat barang baru yang bermanfaat. Ini disebut daur ulang. Bahan yang dibutuhkan:\n\n- **Roda** = Ban + Batang Besi\n- **Sepeda** = 2 Roda + Batang Besi\n- **Gerobak Dorong** = Ban + Batang Kayu\n- **Sepeda Roda Tiga** = Roda + Sepeda\n\nHarga jual di pasar: Roda Rp 100.000; Sepeda Rp 1000.000; Gerobak Dorong Rp 500.000; Sepeda Roda Tiga Rp 1500.000.\n\n**Pertanyaan:** Dirga memiliki bahan-bahan berikut: 6 ban, 6 batang besi, dan 2 potong kayu. Berapa uang paling banyak yang dapat diperolehnya dari mendaur ulang jika ia menjual barang-barang yang dibuatnya?",
        options: ['Rp 2500.000', 'Rp 2600.000', 'Rp 3000.000', 'Rp 4000.000'], answer: [2],
        why: ['Terlalu rendah: masih ada kombinasi yang lebih menguntungkan.', 'Ini hasil bila kayu dipakai untuk 2 gerobak, 3 ban sisanya jadi sepeda roda tiga dan 1 roda (1000 + 1500 + 100 = 2600 ribu): ban terbuang untuk roda murah.', 'Benar: 2 gerobak (1.000.000) + 2 sepeda (2.000.000).', 'Mustahil: nilai tertinggi per ban hanya Rp 500.000 dan hanya ada 6 ban.'],
        hints: ['Hitung nilai jual per ban untuk tiap barang. Barang mana yang paling "menguntungkan" per ban?', 'Roda saja bernilai rendah per ban. Dua barang lain bernilai sama per ban; periksa persediaan batang besi dan kayu.'],
        explanation: "Nilai per ban: roda 100 ribu, sepeda 500 ribu (2 ban), gerobak 500 ribu (1 ban), sepeda roda tiga 500 ribu (3 ban). Jadi batas atas = 6 ban × 500 ribu = Rp 3.000.000, dan batas itu dicapai bila tidak ada ban yang jadi roda lepas.\n\nCara mencapainya: 2 gerobak memakai 2 ban + 2 kayu (Rp 1.000.000). Sisa 4 ban + 6 besi: 4 roda (4 besi), lalu 2 sepeda dari 2 pasang roda + 2 besi (Rp 2.000.000). Total besi 6, tepat cukup. Total **Rp 3.000.000** (C). " + KEY_NOTE,
        refs: [{ src: L1, page: 1 }], figures: [{ src: L1, page: 1 }],
        en: { stem: "Beavers do not like garbage. They like to use old, worn-out items as materials to make new, useful things. This is called recycling. The materials needed:\n\n- **Wheel** = Tyre + Iron Rod\n- **Bicycle** = 2 Wheels + Iron Rod\n- **Wheelbarrow** = Tyre + Wooden Log\n- **Tricycle** = Wheel + Bicycle\n\nSelling prices at the market: Wheel Rp 100,000; Bicycle Rp 1,000,000; Wheelbarrow Rp 500,000; Tricycle Rp 1,500,000.\n\n**Question:** Dirga has the following materials: 6 tyres, 6 iron rods, and 2 pieces of wood. What is the most money he can obtain from recycling if he sells the items he makes?", options: ['Rp 2,500,000','Rp 2,600,000','Rp 3,000,000','Rp 4,000,000'], explanation: "Value per tyre: wheel 100 thousand, bicycle 500 thousand (2 tyres), wheelbarrow 500 thousand (1 tyre), tricycle 500 thousand (3 tyres). So the upper bound = 6 tyres × 500 thousand = Rp 3,000,000, and that bound is reached if no tyre becomes a loose wheel.\n\nHow to reach it: 2 wheelbarrows use 2 tyres + 2 logs (Rp 1,000,000). The remaining 4 tyres + 6 rods: 4 wheels (4 rods), then 2 bicycles from 2 pairs of wheels + 2 rods (Rp 2,000,000). Total rods 6, exactly enough. Total **Rp 3,000,000** (C). " },
      }],
    },
    {
      id: 'lat1-s2', archetype: 'concept', title: '2. Konter Toko', en: { title: '2. Shop Counters' },
      source: { kind: 'latihan' as const, lang: 'id' as const, src: L1, label: '2. Konter Toko', pages: [1, 2], official: true },
      parts: [{
        id: 'lat1-s2a', kind: 'mcq', decks: ['D02'], topic: 'Queue simulation', difficulty: 3,
        stem: "Sebuah toko memiliki empat loket penagihan yang diberi nomor 1, 2, 3, 4. Setiap loket dapat memiliki antrean maksimal 4 pelanggan, termasuk pelanggan yang dilayani. Setiap loket dapat melayani satu pelanggan dalam satu waktu. Diperlukan waktu 2 menit untuk melayani satu pelanggan. Awalnya, hanya loket 1 yang buka.\n\nKetika seorang pelanggan ingin membayar tagihan, ia bergabung dengan antrean terakhir di loket pertama yang antreannya belum penuh. Ia pertama-tama mencoba loket 1, lalu loket 2, dst.\n\nJika tidak ada ruang yang tersedia di salah satu loket yang saat ini buka, loket baru dibuka dan pelanggan bergabung dengan antrean di sana. Namun, diperlukan waktu 1 menit untuk menyiapkan loket, jadi diperlukan waktu 3 menit untuk melayani pelanggan pertama di loket yang baru dibuka.\n\nSetiap pelanggan berikutnya akan dilayani dalam waktu 2 menit seperti biasa. Pada waktu tertentu, jika ada pelanggan yang meninggalkan antrean setelah dilayani dan pelanggan baru yang ingin bergabung dalam antrean, Anda dapat mengasumsikan bahwa pelanggan yang dilayani akan meninggalkan antrean terlebih dahulu dan membuat ruang kosong di antrean mereka tempat pelanggan baru dapat bergabung.\n\n**Pertanyaan:** 12 pelanggan datang ke loket, dua orang setiap menit (dua pelanggan datang pada awalnya, dua lagi setelah 1 menit, dst.). Berapa lama waktu yang dibutuhkan untuk melayani mereka semua?",
        options: ['12 menit', '11 menit', '13 menit', '8 menit'], answer: [2],
        why: ['Terlalu lama dibanding hasil simulasi per menit.', 'Loket 2 baru selesai di menit ke-13 karena memuat 5 pelanggan.', 'Benar: loket 2 selesai paling akhir pada menit ke-13.', '8 menit hanya waktu selesai loket 3 (pelanggan tunggal), bukan semuanya.'],
        hints: ['Simulasikan menit demi menit: kapan tiap pelanggan datang, ke loket mana ia masuk, dan kapan loket itu selesai melayaninya?', 'Perhatikan urutan dalam satu menit: pelanggan yang selesai dilayani pergi lebih dulu sebelum pelanggan baru masuk.'],
        explanation: "Pelanggan datang di menit 0–5 (2 per menit).\n\n| Menit | Datang | Masuk ke |\n|---|---|---|\n| 0 | P1, P2 | loket 1 |\n| 1 | P3, P4 | loket 1 (kini penuh: P1–P4) |\n| 2 | P5, P6 | P1 selesai (menit 2) → P5 masuk loket 1; P6 → loket 2 baru (siap menit 2–3, dilayani selesai menit 5) |\n| 3 | P7, P8 | loket 1 penuh → loket 2 |\n| 4 | P9, P10 | P2 selesai (menit 4) → P9 masuk loket 1; P10 → loket 2 (penuh: P6, P7, P8, P10) |\n| 5 | P11, P12 | P6 selesai (menit 5) → P11 masuk loket 2; P12: loket 1 dan 2 penuh → loket 3 baru |\n\nSelesai: loket 1: P1 2, P2 4, P3 6, P4 8, P5 10, P9 12. Loket 2: P6 5, P7 7, P8 9, P10 11, P11 13. Loket 3: P12 menit 8. Terakhir selesai pada menit **13** (C). " + KEY_NOTE,
        refs: [{ src: L1, page: 1 }, { src: L1, page: 2 }], figures: [{ src: L1, page: 2 }],
        en: { stem: "A shop has four billing counters numbered 1, 2, 3, 4. Each counter can have a queue of at most 4 customers, including the customer being served. Each counter can serve one customer at a time. It takes 2 minutes to serve one customer. Initially, only counter 1 is open.\n\nWhen a customer wants to pay a bill, he or she joins the end of the queue at the first counter whose queue is not yet full. He or she tries counter 1 first, then counter 2, and so on.\n\nIf there is no space available at any of the counters that are currently open, a new counter is opened and the customer joins the queue there. However, it takes 1 minute to set up the counter, so it takes 3 minutes to serve the first customer at the newly opened counter.\n\nEach subsequent customer is served in 2 minutes as usual. At any given time, if there is a customer leaving the queue after being served and a new customer who wants to join the queue, you may assume that the served customer leaves the queue first and makes an empty space in their queue where the new customer can join.\n\n**Question:** 12 customers come to the counters, two every minute (two customers arrive at the start, two more after 1 minute, and so on). How long does it take to serve all of them?", options: ['12 minutes','11 minutes','13 minutes','8 minutes'] },
      }],
    },
    {
      id: 'lat1-s3', archetype: 'concept', title: '3. Lompatan si-Jack', en: { title: "3. Jack's Jumps" },
      source: { kind: 'latihan' as const, lang: 'id' as const, src: L1, label: '3. Lompatan si-Jack', pages: [2], official: true },
      parts: [{
        id: 'lat1-s3a', kind: 'short', decks: ['D01'], topic: 'Graphs / longest path', difficulty: 3,
        stem: "Jack adalah seekor monyet yang tinggal di taman. Dari satu pohon, ia dapat melompat ke pohon lain jika pohon tersebut berjarak dua sel secara horizontal atau vertikal, atau satu sel secara diagonal, seperti yang ditunjukkan pada diagram.\n\nJack memainkan permainan di mana ia melompat ke sebanyak mungkin pohon yang berbeda tanpa menyentuh tanah. Ia dapat memulai dari pohon mana pun yang ada di taman.\n\nPeta taman (11 × 11 sel; `T` = pohon, baris 1 paling atas, kolom 1 paling kiri):\n\n```\n. . T T . . . . . . .\nT . . . T . . . T . .\n. T . . T . T . . T .\n. . T . . . . . T . T\n. T . . . T T . . T .\n. . T . . T . . . . .\n. . . . . . . . . . T\n. T . . . . . . . . T\nT . T . T . . T . . .\nT . . . . T . . . . T\n. T . . . . . . T . T\n```\n\n**Pertanyaan:** Berapa jumlah pohon berbeda terbanyak yang dapat ia kunjungi dalam sehari?",
        blanks: [{ label: 'Jumlah pohon', type: 'number', accept: ['5'], placeholder: 'bilangan bulat' }],
        hints: ['Anggap tiap pohon sebagai simpul; dua pohon terhubung bila selisihnya (0, ±2), (±2, 0) atau (±1, ±1).', 'Banyak pohon terpisah dari yang lain. Cari gugus yang saling terhubung, lalu jalur terpanjang di tiap gugus tanpa mengulang pohon.'],
        explanation: "Ubah peta menjadi graf: pohon = simpul, lompatan yang diizinkan = sisi (selisih baris/kolom (0,±2), (±2,0) atau (±1,±1)). Dari 31 pohon, banyak yang terisolasi atau hanya berada di gugus kecil; gugus terbesar hanya berisi 5 pohon. Jalur terpanjang tanpa mengulang pohon (jalur sederhana) dicari dengan penelusuran semua kemungkinan; hasil terbaik **5 pohon**. " + KEY_NOTE + " Dihitung dengan DFS atas transkripsi peta di atas.",
        refs: [{ src: L1, page: 2 }], figures: [{ src: L1, page: 2 }],
        en: { stem: "Jack is a monkey who lives in a park. From one tree, he can jump to another tree if that tree is two cells away horizontally or vertically, or one cell away diagonally, as shown in the diagram.\n\nJack plays a game in which he jumps to as many different trees as possible without touching the ground. He can start from any tree in the park.\n\nPark map (11 × 11 cells; `T` = tree, row 1 at the top, column 1 at the far left):\n\n```\n. . T T . . . . . . .\nT . . . T . . . T . .\n. T . . T . T . . T .\n. . T . . . . . T . T\n. T . . . T T . . T .\n. . T . . T . . . . .\n. . . . . . . . . . T\n. T . . . . . . . . T\nT . T . T . . T . . .\nT . . . . T . . . . T\n. T . . . . . . T . T\n```\n\n**Question:** What is the greatest number of different trees he can visit in one day?" },
      }],
    },
    {
      id: 'lat1-s4', archetype: 'concept', title: '4. Film Favorit', en: { title: '4. Favourite Film' },
      source: { kind: 'latihan' as const, lang: 'id' as const, src: L1, label: '4. Film Favorit', pages: [3], official: true },
      parts: [{
        id: 'lat1-s4a', kind: 'short', decks: ['D01'], topic: 'Table analysis', difficulty: 2,
        stem: "Sekelompok teman harus memilih salah satu dari tujuh film yang akan ditonton. Setiap teman memberi peringkat pada setiap film seperti yang ditunjukkan.\n\n| | 1 | 2 | 3 | 4 | 5 | 6 | 7 |\n|---|---|---|---|---|---|---|---|\n| Andi | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |\n| Nani | ● | ✓ | ✓ | ● | ● | ✓ | ✓ |\n| Niko | ✗ | ✗ | ✗ | ● | ✗ | ✗ | ✗ |\n| Goldi | ✗ | ● | ● | ● | ✗ | ● | ✗ |\n| Edi | ✓ | ● | ✗ | ✗ | ● | ✓ | ✓ |\n| Rosa | ● | ✗ | ● | ✗ | ✓ | ● | ● |\n\nPeringkat dari yang terbaik hingga yang terburuk adalah: ✓, ●, ✗.\n\nSebuah film disebut “film favorit”, jika semua teman memberikan peringkat terbaik mereka. Misalnya Film 1 bukan film favorit karena Niko memberikan peringkat terbaiknya pada Film 4.\n\n**Pertanyaan:** Berapa jumlah peringkat terkecil yang perlu diubah sehingga akan ada film favorit?",
        blanks: [{ label: 'Jumlah peringkat', type: 'number', accept: ['2'], placeholder: 'bilangan bulat' }],
        hints: ['Tentukan dulu peringkat terbaik yang dipakai tiap teman (ada teman yang tidak punya ✓).', 'Untuk setiap film, hitung berapa teman yang BELUM memberi peringkat terbaik mereka pada film itu. Ambil yang terkecil.'],
        explanation: "Peringkat terbaik tiap teman: Andi ✓ (semua film); Nani ✓ (film 2, 3, 6, 7); Niko ● (hanya film 4); Goldi ● (film 2, 3, 4, 6); Edi ✓ (film 1, 6, 7); Rosa ✓ (hanya film 5).\n\nBanyak teman yang perlu diubah peringkatnya agar film f jadi favorit = teman yang peringkat terbaiknya belum ada di film f: film 1 → 4, film 2 → 3, film 3 → 3, film 4 → 3, film 5 → 4, **film 6 → 2** (Niko dan Rosa), film 7 → 3. Minimum **2**. " + KEY_NOTE,
        refs: [{ src: L1, page: 3 }], figures: [{ src: L1, page: 3 }],
        en: { stem: "A group of friends has to choose one of seven films to watch. Each friend rated each film as shown.\n\n| | 1 | 2 | 3 | 4 | 5 | 6 | 7 |\n|---|---|---|---|---|---|---|---|\n| Andi | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |\n| Nani | ● | ✓ | ✓ | ● | ● | ✓ | ✓ |\n| Niko | ✗ | ✗ | ✗ | ● | ✗ | ✗ | ✗ |\n| Goldi | ✗ | ● | ● | ● | ✗ | ● | ✗ |\n| Edi | ✓ | ● | ✗ | ✗ | ● | ✓ | ✓ |\n| Rosa | ● | ✗ | ● | ✗ | ✓ | ● | ● |\n\nThe ratings from best to worst are: ✓, ●, ✗.\n\nA film is called a “favourite film” if all friends gave it their best rating. For example, Film 1 is not a favourite film because Niko gave his best rating to Film 4.\n\n**Question:** What is the smallest number of ratings that need to be changed so that there will be a favourite film?" },
      }],
    },
    {
      id: 'lat1-s5', archetype: 'concept', title: '5. Kereta Api', en: { title: '5. Trains' },
      source: { kind: 'latihan' as const, lang: 'id' as const, src: L1, label: '5. Kereta Api', pages: [3], official: true },
      parts: [{
        id: 'lat1-s5a', kind: 'mcq', decks: ['D02'], topic: 'Stack/queue simulation', difficulty: 3,
        stem: "Yono memiliki 7 kereta mainan (bernomor 1 hingga 7) dan 3 depo mainan, D1, D2, dan D3. Saat ini kereta diparkir di depo seperti pada gambar: **D1**: 5; **D2** (kiri ke kanan): 2, 7, 1; **D3** (kiri ke kanan): 4, 3, 6. Jalur utama kosong (maksimal 3 kereta).\n\nYono dapat melakukan gerakan berikut:\n\n- `out(X)` : memindahkan kereta paling kanan di depo X ke luar dan ke dalam jalur utama, sejauh yang dapat ditempuh.\n- `in(X)` : memindahkan kereta paling kiri di jalur utama ke dalam dan ke dalam depo X, sejauh yang dapat ditempuh.\n\nTidak boleh ada lebih dari 3 kereta di jalur utama atau di depo pada saat yang bersamaan.\n\n**Pertanyaan:** Rangkaian gerakan mana yang diakhiri dengan kereta bernomor 1, 2, 3 dari kiri ke kanan di D1?",
        options: [
          'out(1) out(2) in(1) out(2) out(2) in(1) out(3)',
          'out(1) out(2) in(1) out(2) out(2) in(1) out(3) in(2) out(3) in(1)',
          'out(1) out(2) in(1) out(2) in(1) out(3) in(2) out(3) in(1)',
          'out(1) out(2) in(1) out(2) out(2) in(1) out(3) in(2) out(3) in(1)',
        ],
        answer: [1, 3],
        why: ['Berhenti sebelum kereta 3 masuk: D1 hanya berisi 1, 2.', 'Benar: D1 berakhir 1, 2, 3. (Teks opsi B persis sama dengan D di berkas sumber.)', 'Salah: in(1) kedua memasukkan kereta 7, bukan 2; D1 = 1, 7, 3.', 'Benar: sama persis dengan B di berkas sumber (kemungkinan salah ketik; keduanya benar).'],
        hints: ['Model: jalur utama bekerja seperti tumpukan: kereta yang baru keluar berada paling kiri, dan in(X) mengambil yang paling kiri.', 'Simulasikan tiap opsi dari kondisi awal dan catat isi D1, D2, D3 serta jalur utama setelah setiap gerakan.'],
        explanation: "Simulasi opsi B/D (jalur utama ditulis kiri→kanan; kereta yang baru keluar masuk di paling kiri):\n\n| Gerakan | Jalur utama | D1 | D2 | D3 |\n|---|---|---|---|---|\n| awal | – | 5 | 2 7 1 | 4 3 6 |\n| out(1) | 5 | – | 2 7 1 | 4 3 6 |\n| out(2) | 1 5 | – | 2 7 | 4 3 6 |\n| in(1) | 5 | 1 | 2 7 | 4 3 6 |\n| out(2) | 7 5 | 1 | 2 | 4 3 6 |\n| out(2) | 2 7 5 | 1 | – | 4 3 6 |\n| in(1) | 7 5 | 1 2 | – | 4 3 6 |\n| out(3) | 6 7 5 | 1 2 | – | 4 3 |\n| in(2) | 7 5 | 1 2 | 6 | 4 3 |\n| out(3) | 3 7 5 | 1 2 | 6 | 4 |\n| in(1) | 7 5 | **1 2 3** | 6 | 4 |\n\nOpsi A berhenti dengan D1 = 1 2; opsi C memasukkan kereta 7 ke D1. Dalam berkas sumber, opsi **B dan D identik** (kemungkinan salah ketik); keduanya benar. " + KEY_NOTE,
        refs: [{ src: L1, page: 3 }], figures: [{ src: L1, page: 3 }],
        en: { stem: "Yono has 7 toy trains (numbered 1 to 7) and 3 toy depots, D1, D2, and D3. Currently the trains are parked in the depots as in the picture: **D1**: 5; **D2** (left to right): 2, 7, 1; **D3** (left to right): 4, 3, 6. The main track is empty (maximum 3 trains).\n\nYono can make the following moves:\n\n- `out(X)` : moves the rightmost train in depot X out and onto the main track, as far as it can go.\n- `in(X)` : moves the leftmost train on the main track in and into depot X, as far as it can go.\n\nThere must not be more than 3 trains on the main track or in a depot at the same time.\n\n**Question:** Which sequence of moves ends with the trains numbered 1, 2, 3 from left to right in D1?", explanation: "Simulation of option B/D (the main track is written left→right; a train that has just come out enters at the far left):\n\n| Move | Main track | D1 | D2 | D3 |\n|---|---|---|---|---|\n| start | – | 5 | 2 7 1 | 4 3 6 |\n| out(1) | 5 | – | 2 7 1 | 4 3 6 |\n| out(2) | 1 5 | – | 2 7 | 4 3 6 |\n| in(1) | 5 | 1 | 2 7 | 4 3 6 |\n| out(2) | 7 5 | 1 | 2 | 4 3 6 |\n| out(2) | 2 7 5 | 1 | – | 4 3 6 |\n| in(1) | 7 5 | 1 2 | – | 4 3 6 |\n| out(3) | 6 7 5 | 1 2 | – | 4 3 |\n| in(2) | 7 5 | 1 2 | 6 | 4 3 |\n| out(3) | 3 7 5 | 1 2 | 6 | 4 |\n| in(1) | 7 5 | **1 2 3** | 6 | 4 |\n\nOption A stops with D1 = 1 2; option C puts train 7 into D1. In the source file, options **B and D are identical** (probably a typo); both are correct. " },
      }],
    },
    {
      id: 'lat1-s6', archetype: 'concept', title: '6. Menara Balok', en: { title: '6. Block Towers' },
      source: { kind: 'latihan' as const, lang: 'id' as const, src: L1, label: '6. Menara Balok', pages: [4], official: true },
      parts: [{
        id: 'lat1-s6a', kind: 'short', decks: ['D01'], topic: 'Cost optimisation', difficulty: 3,
        stem: "Sam, si berang-berang kecil, sedang bermain dengan balok mainannya. Setiap balok memiliki tinggi yang sama, tetapi berbeda lebarnya. Dia membangun sembilan menara yang indah, masing-masing dibuat dengan balok dengan lebar yang sama.\n\n| Menara | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |\n|---|---|---|---|---|---|---|---|---|---|\n| Lebar | 1 | 2 | 4 | 2 | 1 | 3 | 4 | 5 | 3 |\n| Jumlah balok (tinggi) | 7 | 5 | 3 | 4 | 2 | 4 | 6 | 1 | 2 |\n\nUntuk mengubah ketinggian menara, Sam dapat menambahkan balok yang bentuknya sama ke balok paling atas suatu menara (tidak harus dari balok yang ada di tumpukan-tumpukan tersebut), atau menghilangkan satu atau beberapa balok yang paling atas pada suatu menara. Perlu diperhatikan bahwa, energi untuk mengubah ketinggian menara sebanding dengan lebar dan jumlah balok. Misalnya: menghilangkan 2 balok dari menara dengan lebar 1 harganya 2 × 1 = 2 unit energi; dan menambahkan 4 balok ke menara dengan lebar 3 biaya 4 × 3 = 12 unit energi. Sam ingin semua menara memiliki ketinggian yang sama, dan dia ingin menghabiskan total energi yang sesedikit mungkin.\n\n**Pertanyaan:** Berapa total energi yang minimum untuk mendapatkan menara yang tingginya sama? Asumsikan Sam memiliki tak hingga banyaknya persediaan balok untuk setiap ukuran.",
        blanks: [{ label: 'Total energi', type: 'number', accept: ['39'], placeholder: 'bilangan bulat' }],
        hints: ['Biaya menara i untuk target tinggi h adalah lebar_i × |h − tinggi_i|. Jumlahkan untuk semua menara dan cari h terbaik.', 'Ini median berbobot: tinggi target adalah titik di mana separuh total lebar ada di bawahnya dan separuh di atasnya.'],
        explanation: "Total energi untuk target tinggi h: E(h) = Σ lebar × |h − tinggi|. Biaya adalah jumlah selisih berbobot lebar, jadi minimumnya di median berbobot (separuh dari total lebar 25 berada di tinggi ≤ h dan separuh di tinggi ≥ h), dan selalu jatuh pada salah satu tinggi yang ada. Hasilnya: E(1) = 61, E(2) = 46, **E(3) = 39**, E(4) = 40, E(5) = 51. Minimum **39** pada h = 3. " + KEY_NOTE + " Nilai tinggi menara dibaca dari gambar (tinggi: 7, 5, 3, 4, 2, 4, 6, 1, 2).",
        refs: [{ src: L1, page: 4 }], figures: [{ src: L1, page: 4 }],
        en: { stem: "Sam, the little beaver, is playing with his toy blocks. Each block has the same height, but the widths differ. He built nine beautiful towers, each made of blocks of the same width.\n\n| Tower | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |\n|---|---|---|---|---|---|---|---|---|---|\n| Width | 1 | 2 | 4 | 2 | 1 | 3 | 4 | 5 | 3 |\n| Number of blocks (height) | 7 | 5 | 3 | 4 | 2 | 4 | 6 | 1 | 2 |\n\nTo change the height of a tower, Sam can add blocks of the same shape on top of the topmost block of a tower (they do not have to come from the blocks in those stacks), or remove one or more of the topmost blocks of a tower. Note that the energy to change the height of a tower is proportional to the width and the number of blocks. For example: removing 2 blocks from a tower of width 1 costs 2 × 1 = 2 units of energy; and adding 4 blocks to a tower of width 3 costs 4 × 3 = 12 units of energy. Sam wants all the towers to have the same height, and he wants to spend as little total energy as possible.\n\n**Question:** What is the minimum total energy to get towers of equal height? Assume Sam has an infinite supply of blocks of every size." },
      }],
    },
    {
      id: 'lat1-s7', archetype: 'concept', title: '7. Bongkar Muat', en: { title: '7. Unloading' },
      source: { kind: 'latihan' as const, lang: 'id' as const, src: L1, label: '7. Bongkar Muat', pages: [4], official: true },
      parts: [{
        id: 'lat1-s7a', kind: 'short', decks: ['D02'], topic: 'Round simulation', difficulty: 2,
        stem: "Kereta barang memiliki gerbong, masing-masing dengan kotak bernomor. Satu derek digunakan untuk membongkar muatan. Derek berada pada posisi tetap. Untuk membongkar muatan, kotak harus diposisikan tepat di bawah derek.\n\nKotak-kotak harus dibongkar secara berurutan mulai dari 1. Kereta hanya dapat bergerak maju. Kereta berada di jalur melingkar, sehingga dapat berputar di jalur tersebut dan kembali sehingga lebih banyak kotak dapat dibongkar oleh derek.\n\nDalam contoh (kotak berurutan dari depan: 4, 1, 3, 2), kotak-kotak harus dibongkar dalam urutan 1, 2, 3, 4.\n\n- Putaran 1: Kereta melewati kotak 4, membongkar kotak 1, melewati kotak 3, dan membongkar kotak 2.\n- Putaran 2: Kereta melewati kotak 4, membongkar kotak 3.\n- Putaran 3: Kereta membongkar kotak terakhir, kotak 4.\n\n**Pertanyaan:** Berapa kali kereta berikut harus datang ke derek untuk membongkar semua kotak? (Kotak-kotak harus dibongkar dalam urutan: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.)\n\nKereta (urutan kotak dari depan): **10, 3, 9, 7, 1, 6, 2, 8, 5, 4**",
        blanks: [{ label: 'Jumlah putaran', type: 'number', accept: ['7'], placeholder: 'bilangan bulat' }],
        hints: ['Dalam satu putaran, kereta lewat sekali dari depan ke belakang. Kotak mana yang bisa dibongkar jika angka berikutnya yang dibutuhkan terus naik?', 'Mulai putaran baru setiap kali angka yang dibutuhkan berikutnya sudah terlewat (posisinya lebih depan).'],
        explanation: "Tiap putaran memindai daftar dari depan; kotak dibongkar bila nomornya sama dengan nomor yang sedang dibutuhkan.\n\n| Putaran | Dibongkar | Sisa |\n|---|---|---|\n| 1 | 1, 2 | 10 3 9 7 6 8 5 4 |\n| 2 | 3, 4 | 10 9 7 6 8 5 |\n| 3 | 5 | 10 9 7 6 8 |\n| 4 | 6 | 10 9 7 8 |\n| 5 | 7, 8 | 10 9 |\n| 6 | 9 | 10 |\n| 7 | 10 | – |\n\nJadi **7** putaran. Ini sama dengan banyaknya “penurunan” posisi: tiap kali nomor k+1 berada lebih depan daripada nomor k, putaran baru dimulai. " + KEY_NOTE,
        refs: [{ src: L1, page: 4 }], figures: [{ src: L1, page: 4 }],
        en: { stem: "A freight train has wagons, each with a numbered box. One crane is used to unload the cargo. The crane is at a fixed position. To unload, a box must be positioned exactly under the crane.\n\nThe boxes must be unloaded in order starting from 1. The train can only move forward. The train is on a circular track, so it can go around the track and come back so that more boxes can be unloaded by the crane.\n\nIn the example (boxes in order from the front: 4, 1, 3, 2), the boxes must be unloaded in the order 1, 2, 3, 4.\n\n- Round 1: The train passes box 4, unloads box 1, passes box 3, and unloads box 2.\n- Round 2: The train passes box 4, unloads box 3.\n- Round 3: The train unloads the last box, box 4.\n\n**Question:** How many times must the following train come to the crane to unload all the boxes? (The boxes must be unloaded in the order: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.)\n\nTrain (order of boxes from the front): **10, 3, 9, 7, 1, 6, 2, 8, 5, 4**" },
      }],
    },
    {
      id: 'lat1-s8', archetype: 'concept', title: '8. Bepergian Naik Kereta Api', en: { title: '8. Travelling by Train' },
      source: { kind: 'latihan' as const, lang: 'id' as const, src: L1, label: '8. Bepergian Naik Kereta Api', pages: [5], official: true },
      parts: [{
        id: 'lat1-s8a', kind: 'short', decks: ['D01'], topic: 'Assignment with capacity', difficulty: 3,
        stem: "Delapan keluarga bebras ingin bepergian dengan kereta api. Berikut ini adalah daftar keluarga-keluarga itu (A sampai H) dengan jumlah anggota keluarga dan berat bagasi yang dibawanya.\n\n| Keluarga | Jumlah Anggota | Berat Bagasi |\n|---|---|---|\n| Avsec (A) | 3 | 50 |\n| Bizjak (B) | 4 | 80 |\n| Cerar (C) | 5 | 110 |\n| Dolenc (D) | 4 | 80 |\n| Erjavec (E) | 2 | 40 |\n| Furlan (F) | 3 | 70 |\n| Gabric (G) | 6 | 130 |\n| Hacin (H) | 5 | 100 |\n\nPerusahaan Kereta Api mempunyai gerbong-gerbong dengan aneka kapasitas penumpang dan kapasitas bagasi: gerbong 1 (6 penumpang, 160 KG), gerbong 2 (10 penumpang, 200 KG), gerbong 3 (15 penumpang, 300 KG).\n\nKe-8 keluarga Bebras ini selalu bepergian dengan aturan:\n\n- setiap bebras harus duduk di satu kursi\n- seluruh anggota satu keluarga harus bepergian dalam gerbong yang sama,\n- bagasi harus dibawa dalam gerbong yang sama dengan bebras pemiliknya, dan\n- berat bagasinya yang diangkut gerbong tidak boleh lebih dari kapasitas bagasi gerbong tersebut.\n\n**Tantangan:** Berapa keluarga paling banyak dapat bepergian dengan pengaturan gerbong di atas?",
        blanks: [{ label: 'Jumlah keluarga', type: 'number', accept: ['7'], placeholder: 'bilangan bulat' }],
        hints: ['Total anggota 32 sedangkan total kursi 31: paling banyak 7 keluarga bila satu keluarga kecil ditinggal. Coba tentukan keluarga mana yang tidak ikut.', 'Pecah per gerbong: pilih himpunan keluarga yang jumlah anggotanya ≤ kapasitas penumpang dan bagasinya ≤ kapasitas bagasi.'],
        explanation: "Total kursi 6 + 10 + 15 = 31, total anggota 3+4+5+4+2+3+6+5 = 32, jadi 8 keluarga mustahil; paling banyak 7. Tujuh keluarga memang mungkin: tinggalkan A, lalu gerbong 1 (6 kursi/160 kg) = B + E (6 orang, 120 kg), gerbong 2 (10/200) = C + D (9 orang, 190 kg), gerbong 3 (15/300) = F + G + H (14 orang, 300 kg). Maksimum **7** keluarga. " + KEY_NOTE + " Dipastikan dengan pencarian lengkap atas semua penugasan keluarga → gerbong (4^8 kemungkinan); 8 keluarga tidak ada yang memenuhi.",
        refs: [{ src: L1, page: 5 }], figures: [{ src: L1, page: 5 }],
        en: { stem: "Eight beaver families want to travel by train. Below is the list of the families (A to H) with the number of family members and the weight of the luggage they bring.\n\n| Family | Number of Members | Luggage Weight |\n|---|---|---|\n| Avsec (A) | 3 | 50 |\n| Bizjak (B) | 4 | 80 |\n| Cerar (C) | 5 | 110 |\n| Dolenc (D) | 4 | 80 |\n| Erjavec (E) | 2 | 40 |\n| Furlan (F) | 3 | 70 |\n| Gabric (G) | 6 | 130 |\n| Hacin (H) | 5 | 100 |\n\nThe Railway Company has carriages with various passenger capacities and luggage capacities: carriage 1 (6 passengers, 160 KG), carriage 2 (10 passengers, 200 KG), carriage 3 (15 passengers, 300 KG).\n\nThe 8 Beaver families always travel under these rules:\n\n- every beaver must sit in one seat\n- all members of a family must travel in the same carriage,\n- luggage must be carried in the same carriage as the beaver who owns it, and\n- the weight of the luggage carried by a carriage must not exceed the luggage capacity of that carriage.\n\n**Challenge:** What is the greatest number of families that can travel with the carriage arrangement above?" },
      }],
    },
    {
      id: 'lat1-s9', archetype: 'concept', title: '9. Deteksi Kesalahan', en: { title: '9. Fault Detection' },
      source: { kind: 'latihan' as const, lang: 'id' as const, src: L1, label: '9. Deteksi Kesalahan', pages: [5], official: true },
      parts: [{
        id: 'lat1-s9a', kind: 'short', decks: ['D01'], topic: 'Graphs / reasoning', difficulty: 3,
        stem: "Di Kota Bebras, listrik dihasilkan oleh kincir angin di perbukitan dan disalurkan ke rumah-rumah melalui jaringan kabel yang digambar pada halaman sumber (delapan rumah; dua di antaranya gelap).\n\nNamun, beberapa sambungan rusak: dua rumah yang lampunya mati tidak lagi memiliki listrik! Semua rumah lainnya memilikinya. Listrik dapat disalurkan dari rumah ke rumah ke segala arah.\n\n**Pertanyaan:** Setidaknya berapa banyak sambungan antar rumah yang perlu mereka periksa untuk mengetahui dan memastikan bahwa semua sambungan lainnya berfungsi?",
        blanks: [{ label: 'Jumlah sambungan', type: 'number', accept: ['4'], placeholder: 'bilangan bulat' }],
        hints: ['Rumah yang gelap tidak punya listrik: apa artinya untuk semua kabel yang menyentuh rumah itu, mengingat tetangganya menyala?', 'Setelah kabel yang pasti rusak dicoret, kabel mana yang pasti berfungsi (jembatan: satu-satunya jalur ke sebuah rumah menyala) dan mana yang statusnya tidak bisa disimpulkan?'],
        explanation: "Beri nama rumah: sumber (kincir) → P; atas-tengah Q; kiri R; atas-kanan S; tengah-gelap T; kanan U; kanan-bawah V; bawah-tengah W; kiri-bawah-gelap X. Kabel: kincir–Q, Q–S, Q–R, Q–T, T–S, T–V, S–V, S–U, R–V, R–X, X–W, W–V (12 kabel).\n\n1. Rumah gelap T dan X dikelilingi tetangga yang menyala. Bila ada kabel T–tetangga atau X–tetangga yang berfungsi, T/X akan menyala. Jadi kelima kabel yang menyentuh T dan X (Q–T, T–S, T–V, R–X, X–W) **pasti rusak**: tidak perlu diperiksa.\n2. Kabel kincir–Q, S–U dan W–V adalah satu-satunya jalur ke rumah menyala (jembatan) → **pasti berfungsi**.\n3. Sisa empat kabel membentuk siklus Q–S–V–R–Q (Q–S, S–V, V–R, R–Q). Rumah S, V, R tetap menyala meski satu kabel siklus rusak, jadi statusnya tidak dapat disimpulkan dari lampu: harus diperiksa langsung. Untuk memastikan semuanya berfungsi, keempatnya diperiksa.\n\nJawaban: **4**. Catatan: sumber tidak mencantumkan kunci dan gambar jaringan hanya berupa gambar; kunci ini diturunkan dari penalaran di atas dan sebaiknya dianggap kurang pasti.",
        refs: [{ src: L1, page: 5 }], figures: [{ src: L1, page: 5 }],
        en: { stem: "In Beaver City, electricity is generated by wind turbines in the hills and distributed to houses through a network of cables drawn on the source page (eight houses; two of them are dark).\n\nHowever, some connections are broken: the two houses whose lamps are off no longer have electricity! All the other houses have it. Electricity can be passed from house to house in any direction.\n\n**Question:** At least how many connections between houses do they need to inspect in order to know and make sure that all the other connections work?" },
      }],
    },
    {
      id: 'lat1-s10', archetype: 'trace', title: '10. Mesin Matematika', en: { title: '10. Math Machine' },
      source: { kind: 'latihan' as const, lang: 'id' as const, src: L1, label: '10. Mesin Matematika', pages: [6], official: true },
      parts: [{
        id: 'lat1-s10a', kind: 'mcq', decks: ['D02'], topic: 'Tracing an algorithm', difficulty: 2,
        stem: "Bebras si berang-berang menciptakan Mesin Matematika. Mesin itu menerima sebuah bilangan sebagai input, dan menghasilkan bilangan lain sebagai output.\n\nDi dalam mesin ada komponen-komponen. Setiap komponen bekerja dengan cara yang sama. Setiap komponen menerima 3 bilangan sebagai input: B1, B2, dan B3. Komponen memproses input sebagai berikut:\n\n- Jika B1 bernilai 1, maka langsung B3 dijadikan output untuk mesin dan selesai.\n- Jika B1 bukan 1:\n  - Kurangi B1 dengan 1 dan hasilnya menjadi B1 yang baru.\n  - Tambahkan B2 dengan 2, dan hasilnya menjadi B2 yang baru.\n  - Tambahkan B2 yang baru di atas, pada B3, dan hasilnya menjadi B3 yang baru.\n  - Teruskan B1 baru, B2 baru, B3 baru menjadi input untuk komponen berikutnya yang akan memproses dengan aturan yang sama.\n\nMesin Matematika menerima satu bilangan bulat sebagai input, bilangan itu menjadi B1 untuk komponen pertama. Sementara, B2 dan B3 untuk komponen pertama ini 1. (Contoh pada gambar: input 2 → komponen 1 mengeluarkan (1, 3, 4) → komponen 2 mengeluarkan output 4.)\n\n**Tantangan:** Mesin Matematika memproses input bernilai 4. Berapa output yang dihasilkan?",
        options: ['7', '10', '16', '62'], answer: [2],
        why: ['7 adalah nilai B2 pada komponen terakhir, bukan B3 (output).', 'Tidak muncul sebagai nilai B3 pada komponen mana pun (B3: 1, 4, 9, 16).', 'Benar: (4,1,1) → (3,3,4) → (2,5,9) → (1,7,16) → output 16.', '62 tidak diperoleh dari aturan mana pun.'],
        hints: ['Tulis triple (B1, B2, B3) tiap komponen dalam tabel. Mulai dari (4, 1, 1).', 'Berhenti begitu B1 = 1 dan keluarkan B3, bukan B2.'],
        explanation: "Awal (B1, B2, B3) = (4, 1, 1).\n\n| Komponen | B1 | B2 | B3 |\n|---|---|---|---|\n| 1 (masuk) | 4 | 1 | 1 |\n| 2 | 3 | 3 | 4 |\n| 3 | 2 | 5 | 9 |\n| 4 | 1 | 7 | 16 |\n\nPada komponen ke-4 B1 = 1, jadi output mesin = B3 = **16** (C). Pola: B2 adalah bilangan ganjil, B3 adalah jumlah bilangan ganjil pertama = kuadrat: output = n² (4² = 16; contoh input 2 → 4). " + KEY_NOTE,
        refs: [{ src: L1, page: 6 }], figures: [{ src: L1, page: 6 }],
        en: { stem: "Bebras the beaver created a Math Machine. The machine accepts a number as input, and produces another number as output.\n\nInside the machine there are components. Each component works in the same way. Each component accepts 3 numbers as input: B1, B2, and B3. The component processes the input as follows:\n\n- If B1 has the value 1, then B3 is immediately made the output of the machine and it finishes.\n- If B1 is not 1:\n  - Subtract 1 from B1 and the result becomes the new B1.\n  - Add 2 to B2, and the result becomes the new B2.\n  - Add the new B2 above to B3, and the result becomes the new B3.\n  - Pass the new B1, new B2, new B3 on as input to the next component, which will process them with the same rules.\n\nThe Math Machine accepts one integer as input; that number becomes B1 for the first component. Meanwhile, B2 and B3 for this first component are 1. (Example in the picture: input 2 → component 1 outputs (1, 3, 4) → component 2 outputs output 4.)\n\n**Challenge:** The Math Machine processes an input with the value 4. What output is produced?", options: ['7','10','16','62'] },
      }],
    },

    /* ======================================================= LATIHAN-2 ======================================================= */
    {
      id: 'lat2-s1', archetype: 'constraint', title: 'Soal 1 – Hidangan Pembuka', en: { title: 'Problem 1 – Starter Platter' },
      source: { kind: 'latihan' as const, lang: 'id' as const, src: L2, label: 'Soal 1', pages: [1], official: true },
      intro: "Sofi sedang merencanakan acara special untuk teman-temannya dan ingin memesan nampan besar berisi hidangan pembuka spesial dari warung makanan favoritnya. Warung tersebut menawarkan empat jenis hidangan pembuka: Pisang Goreng, Risoles, Perkedel, dan Martabak Mini. Setiap jenis hidangan memiliki cita rasa unik dan tersedia dalam tiga ukuran: kecil, sedang, dan besar.\n\nPisang Goreng bisa disajikan dengan pilihan taburan gula halus atau parutan keju. Risoles dibalut dengan tepung yang renyah dan diisi dengan sayuran serta daging cincang. Perkedel dibuat dari kentang yang lembut dengan campuran daging cincang, beraroma bawang putih. Martabak Mini memiliki isian bisa berupa telur atau daging sapi cincang, ditambah taburan daun bawang.\n\nSofi memiliki beberapa syarat khusus untuk nampan hidangan pembuka yang diinginkannya agar pas untuk para tamunya. Nampan tersebut harus terdiri dari **tepat enam hidangan pembuka**, dengan **dua hidangan dari setiap ukuran**: dua ukuran kecil, dua ukuran sedang, dan dua ukuran besar. Sofi menginginkan variasi, sehingga **setiap jenis hidangan hanya boleh muncul sekali atau dua kali dalam nampan**. Selain itu, **tidak boleh ada dua hidangan dari jenis yang sama dalam ukuran yang sama**, misalnya, jika ada dua Risoles, satu harus berukuran kecil dan yang lain besar (atau sedang). Sofi tidak terlalu mempermasalahkan taburan gula, keju, isian, atau taburan tambahan.",
      figures: [{ src: L2, page: 1 }], paperWeight: undefined, minutes: 20,
      parts: [
        {
          id: 'lat2-s1a', kind: 'constraint', label: 'a', weight: 0.4, decks: ['D01'], topic: 'Constraint', shape: 'grid', difficulty: 1,
          entities: ['Pisang Goreng', 'Risoles', 'Perkedel', 'Martabak Mini'], slots: ['Kecil', 'Sedang', 'Besar'],
          stem: "Bantulah Sofi untuk menentukan kombinasi enam hidangan pembuka yang memenuhi syarat nampan yang diinginkannya. Cukup sebutkan kombinasi enam hidangan yang Anda usulkan, misalnya “1) Pisang goreng – kecil, 2) Risoles – sedang, 3) ...” (centang sel jenis × ukuran).",
          check: r`def check(ans):
    cells = {(r, c) for r, c in ans}
    errs = []
    if len(cells) != 6:
        errs.append([f"Harus tepat 6 hidangan (sekarang {len(cells)}).", f"There must be exactly 6 items (now {len(cells)})."])
    nama_ukuran = ["kecil", "sedang", "besar"]
    en_ukuran = ["small", "medium", "large"]
    for c in range(3):
        n = sum(1 for r, cc in cells if cc == c)
        if n != 2:
            errs.append([f"Ukuran {nama_ukuran[c]} harus tepat 2 hidangan (sekarang {n}).", f"Size {en_ukuran[c]} must have exactly 2 items (now {n})."])
    nama_jenis = ["Pisang Goreng", "Risoles", "Perkedel", "Martabak Mini"]
    for r in range(4):
        n = sum(1 for rr, c in cells if rr == r)
        if n not in (1, 2):
            errs.append([f"{nama_jenis[r]} harus muncul 1 atau 2 kali (sekarang {n}).", f"{nama_jenis[r]} must appear 1 or 2 times (now {n})."])
    return errs`,
          solution: [[0, 0], [0, 1], [1, 2], [2, 0], [2, 2], [3, 1]],
          rubric: RUB_CONSTRAINT_A,
          hints: ['Tulis tiga syarat sebagai angka: total, per ukuran, per jenis. Tabel jenis × ukuran memudahkan.', 'Tidak boleh dua hidangan sejenis berukuran sama = tiap sel tabel paling banyak satu centang. Jadi cukup periksa baris (1 atau 2 centang) dan kolom (tepat 2 centang).'],
          explanation: "Soal ini tidak memiliki jawaban tunggal. Contoh (tabel): Pisang Goreng – kecil & sedang; Risoles – besar; Perkedel – kecil & besar; Martabak Mini – sedang. Periksa: total 6; tiap ukuran tepat 2 (kecil: PG, Perkedel; sedang: PG, MM; besar: Risoles, Perkedel); tiap jenis 1 atau 2 kali dengan ukuran berbeda.",
          refs: [{ src: L2, page: 1 }],
        en: { stem: "Help Sofi to determine a combination of six starters that meets the conditions of the platter she wants. Just state the combination of six dishes that you propose, for example “1) Fried banana – small, 2) Risoles – medium, 3) ...” (tick the cells of the type × size table)." },
        },
        {
          id: 'lat2-s1b', kind: 'open', label: 'b', weight: 0.6, decks: ['D01'], topic: 'Constraint', difficulty: 1,
          stem: "Berikan penjelasan yang singkat dan jelas yang menunjukkan penalaran Anda dalam menentukan kombinasi tersebut.\n\n*Petunjuk: Gunakan prinsip-prinsip berpikir komputasional untuk menyelesaikan masalah ini. Ingatlah untuk menerapkan prinsip abstraksi dengan fokus pada informasi penting, dan dekomposisi untuk menyederhanakan permasalahan.*",
          answer: "Abstraksi: informasi penting hanya jenis hidangan (4), ukuran (3), dan syarat nampan; taburan, isian, dan cita rasa diabaikan (Sofi tidak mempermasalahkannya). Dekomposisi: rumuskan tiga constraint: (1) tepat enam hidangan; (2) dua hidangan untuk tiap ukuran; (3) tiap jenis muncul 1 atau 2 kali, dan jika dua kali, ukurannya harus berbeda. Dalam tabel jenis × ukuran: tepat 6 centang di sel yang berbeda, tiap kolom tepat 2 centang, tiap baris 1 atau 2 centang. Lalu susun satu kombinasi yang memenuhi ketiganya dan periksa satu per satu. Banyak jawaban lain yang juga benar.",
          rubric: RUB_CONSTRAINT_B,
          keyPoints: ['Menyebut informasi penting (jenis, ukuran, syarat) dan hal yang diabaikan (taburan, isian)', 'Merumuskan ketiga constraint secara eksplisit', 'Menjelaskan cara menyusun kombinasi dan memeriksanya'],
          explanation: 'Lihat jawaban alternatif dan rubrik (format resmi UTS 2024 Soal 1b).',
          refs: [{ src: L2, page: 1 }],
        },
      ],
    },
    {
      id: 'lat2-s2', archetype: 'classify', title: 'Soal 2 – Perpustakaan Mini', en: { title: 'Problem 2 – Mini Library' },
      source: { kind: 'latihan' as const, lang: 'id' as const, src: L2, label: 'Soal 2', pages: [2], official: true },
      intro: "Sebuah Rukun Tetangga (RT) berinisiatif untuk membangun sebuah perpustakaan mini untuk warganya. Sejauh ini RT tersebut telah menerima sumbangan buku-buku sebagai berikut (tabel pada halaman sumber).\n\nDi masa yang akan datang, diharapkan akan semakin banyak warga yang menyumbangkan buku. Untuk memudahkan para pengguna perpustakaan mencari buku, buku-buku tersebut akan dikelompokkan berdasarkan kriteria-kriteria tertentu secara hierarkis. Setelah dikelompokkan, setiap buku akan diberikan kode unik yang juga mencerminkan hierarki kelompok buku tersebut. Bantulah perpustakaan ini untuk membuat pengelompokan hierarkis buku berdasarkan buku-buku yang sudah dimiliki di atas, sembari tetap memperhatikan kemungkinan buku baru di masa yang akan datang.",
      figures: [{ src: L2, page: 2 }], minutes: 25,
      parts: [
        {
          id: 'lat2-s2a', kind: 'classify', label: 'a', weight: 0.3, decks: ['D03'], topic: 'Hierarchical classification', difficulty: 2,
          stem: "Tuliskan sistem klasifikasi hierarkis yang Anda rancang. (Bagian c meminta kode unik tiap buku; model jawaban di bawah memuatnya.)\n\n*Petunjuk: Anda dapat menggunakan pengetahuan umum untuk mengidentifikasi kesamaan karakter dari item-item di atas dalam melakukan pengelompokan.*",
          columns: ['No', 'Judul', 'Penulis', 'Penerbit', 'Tahun Terbit', 'Jml. Hal.', 'Warna Sampul'],
          rows: [
            [1, 'Bunga di Balik Senja', 'Taufik Wijaya', 'Penerbit Merah Putih', 2020, 210, 'Merah'],
            [2, 'Misteri Pulau Terlarang', 'Budi Santoso', 'Pustaka Utama', 2024, 205, 'Oranye'],
            [3, 'Saat Cinta Berbisik', 'Taufik Wijaya', 'Sastra Sejati', 2019, 270, 'Ungu'],
            [4, 'Peti Misterius di Bawah Tangga', 'Budi Santoso', 'Pustaka Utama', 2020, 180, 'Merah'],
            [5, 'Kisah Laskar Bintang', 'Dewi Lara', 'Sastra Sejati', 2018, 150, 'Ungu'],
            [6, 'Fisika Sederhana', 'R. Ambarwati', 'Matahari Pustaka', 2017, 160, 'Oranye'],
            [7, 'Biologi Ekosistem Tropis', 'A. Suryawan', 'Pustaka Cemerlang', 2019, 140, 'Merah'],
            [8, 'Kimia Lingkungan & Solusinya', 'A. Suryawan', 'Matahari Pustaka', 2017, 310, 'Hijau'],
            [9, 'Astronomi untuk Pemula', 'Bambang P.', 'Pustaka Cemerlang', 2020, 190, 'Ungu'],
            [10, 'Pengantar Berpikir Komputasional', 'M. Rian', 'Matahari Pustaka', 2019, 175, 'Oranye'],
            [11, 'Ekologi dan Keberlanjutan', 'A. Suryawan', 'Ilmu Nusantara', 2020, 340, 'Merah'],
            [12, 'Inovasi Seni dan Teknologi', 'R. Ambarwati', 'Pustaka Cemerlang', 2018, 360, 'Merah'],
            [13, 'Musik Tradisional Jawa', 'Diah Lestari', 'Harmoni Publishing', 2017, 320, 'Oranye'],
            [14, 'Fotografi Modern Indonesia', 'Rizky Fauzan', 'Pustaka Cemerlang', 2019, 210, 'Ungu'],
            [15, 'Teater Kontemporer', 'S. Nugraha', 'Harmoni Publishing', 2018, 250, 'Merah'],
            [16, 'Tekstil Tradisional Indonesia', 'Diah Lestari', 'Ilmu Nusantara', 2018, 280, 'Oranye'],
            [17, 'Sejarah Seni Kriya Sunda', 'Diah Lestari', 'Harmoni Publishing', 2020, 390, 'Hijau'],
            [18, 'Kerajaan-Kerajaan Maritim Nusantara', 'Agus S.', 'Ilmu Nusantara', 2017, 420, 'Hijau'],
            [19, 'Linimasa Perjuangan Rakyat Palestina', 'Abdullah S.', 'Pustaka Cemerlang', 2024, 435, 'Oranye'],
            [20, 'Detik-Detik Kemerdekaan Indonesia', 'Bambang P.', 'Ilmu Nusantara', 2019, 410, 'Oranye'],
          ],
          codeColumn: 'Kode Buku',
          model: {
            levels: [
              { attr: 'Kategori subjek (disimpulkan dari Judul)', codes: { Fiksi: 'FIK', Sains: 'SNS', Seni: 'SNI', Sejarah: 'SJR' } },
              { attr: 'Tahun Terbit' },
            ],
            pattern: 'KATEGORI-TAHUN-NOMORURUT, contoh FIK-2020-001',
            codes: ['FIK-2020-001', 'FIK-2024-001', 'FIK-2019-001', 'FIK-2020-002', 'FIK-2018-001', 'SNS-2017-001', 'SNS-2019-001', 'SNS-2017-002', 'SNS-2020-001', 'SNS-2019-002', 'SNS-2020-002', 'SNI-2018-001', 'SNI-2017-001', 'SNI-2019-001', 'SNI-2018-002', 'SNI-2018-003', 'SNI-2020-001', 'SJR-2017-001', 'SJR-2024-001', 'SJR-2019-001'],
          },
          rubric: RUB_CLASS_A,
          hints: ['Kolom mana yang nilainya berulang antarbuku (cocok jadi tingkat atas) dan mana yang unik di tiap baris (tidak cocok, seperti Judul)?', 'Subjek buku bisa disimpulkan dari Judul (pengetahuan umum): fiksi, sains, seni, sejarah. Tingkat berikutnya: Tahun Terbit. Tambahkan nomor urut agar kode unik.'],
          explanation: "Soal ini tidak memiliki jawaban tunggal. Model: tingkat 1 = kategori subjek (Fiksi, Sains, Seni, Sejarah: bisa bertambah untuk buku baru, mis. Teknologi), tingkat 2 = tahun terbit, lalu nomor urut 3 digit agar kode unik: **KATEGORI-TAHUN-NNN**. Alternatif yang juga valid: tingkat 1 = penerbit atau penulis (nilainya berulang), tingkat 2 = tahun. Kolom Judul tidak cocok untuk tingkat klasifikasi (semua nilai berbeda). Kasus ambigu: buku 17 *Sejarah Seni Kriya Sunda* bisa Seni atau Sejarah; buku 10 bisa Sains atau Teknologi: yang penting konsisten dan dijustifikasi.",
          refs: [{ src: L2, page: 2 }],
        en: { stem: "Write down the hierarchical classification system that you designed. (Part c asks for a unique code for each book; the model answer below includes it.)\n\n*Hint: You may use general knowledge to identify similar characteristics of the items above when grouping them.*", explanation: "This problem does not have a single answer. Model: level 1 = subject category (Fiction, Science, Art, History: it can grow for new books, e.g. Technology), level 2 = year of publication, then a 3-digit sequence number so that the code is unique: **CATEGORY-YEAR-NNN**. Alternatives that are also valid: level 1 = publisher or author (their values repeat), level 2 = year. The Title column is not suitable as a classification level (all values are different). Ambiguous cases: book 17 *Sejarah Seni Kriya Sunda* (History of Sundanese Craft Art) can be Art or History; book 10 can be Science or Technology: what matters is being consistent and justified." },
        },
        {
          id: 'lat2-s2b', kind: 'open', label: 'b', weight: 0.4, decks: ['D03'], topic: 'Hierarchical classification', difficulty: 2,
          stem: 'Berikan penjelasan yang singkat dan jelas yang menjelaskan penalaran Anda dalam menentukan klasifikasi tersebut.',
          answer: "Contoh: Saya memilih kategori subjek sebagai tingkat 1 karena pengguna mencari buku berdasarkan topik, nilainya berulang (banyak buku per kategori) dan mudah ditambah untuk buku baru. Tingkat 2 adalah tahun terbit karena nilainya berulang dan memperkecil kelompok. Judul tidak dipakai sebagai tingkat karena nilainya berbeda untuk setiap buku. Karena dua buku bisa punya kategori dan tahun yang sama (mis. FIK-2020), ditambahkan nomor urut agar kode unik. Dengan skema ini buku baru tinggal diberi kategori, tahun, dan nomor urut berikutnya.",
          rubric: RUB_CLASS_B,
          keyPoints: ['Alasan memilih kolom/atribut tiap tingkat (nilai berulang, memudahkan pencarian)', 'Mengapa kolom unik (Judul) tidak dipakai', 'Perlunya nomor urut agar kode unik', 'Skema tetap berlaku untuk buku baru'],
          explanation: 'Lihat jawaban contoh dan rubrik (format resmi UTS 2024 Soal 2b).',
          refs: [{ src: L2, page: 2 }],
        },
        {
          id: 'lat2-s2c', kind: 'open', label: 'c', weight: 0.3, decks: ['D03'], topic: 'Unique codes', difficulty: 2,
          stem: 'Berdasarkan klasifikasi tersebut, berikan kode unik untuk setiap buku (tuliskan langsung di kolom kode buku pada tabel).',
          answer: "Sesuai model pada bagian a (pola KATEGORI-TAHUN-NNN), nomor urut dihitung per kombinasi kategori dan tahun:\n\n1 FIK-2020-001; 2 FIK-2024-001; 3 FIK-2019-001; 4 FIK-2020-002; 5 FIK-2018-001; 6 SNS-2017-001; 7 SNS-2019-001; 8 SNS-2017-002; 9 SNS-2020-001; 10 SNS-2019-002; 11 SNS-2020-002; 12 SNI-2018-001; 13 SNI-2017-001; 14 SNI-2019-001; 15 SNI-2018-002; 16 SNI-2018-003; 17 SNI-2020-001; 18 SJR-2017-001; 19 SJR-2024-001; 20 SJR-2019-001.\n\nKode lain yang konsisten dengan klasifikasi Anda sendiri juga benar.",
          rubric: RUB_CLASS_C,
          keyPoints: ['Setiap kode unik', 'Tiap kode mengikuti pola yang sama dan mencerminkan hierarki', 'Kode sesuai dengan klasifikasi di bagian a dan b'],
          explanation: 'Kode harus konsisten dengan pola Anda; periksa keunikan dan urutan tingkat yang sama untuk semua baris.',
          refs: [{ src: L2, page: 2 }],
        },
      ],
    },
    {
      id: 'lat2-s3', archetype: 'robot', title: 'Soal 3 – Petualangan Robot Rody', en: { title: 'Problem 3 – Robot Rody’s Adventure' },
      source: { kind: 'latihan' as const, lang: 'id' as const, src: L2, label: 'Soal 3', pages: [3], official: true },
      intro: "Robot Rody ditugaskan untuk pergi ke rumah teman-teman Eddie, seperti Pororo. Untuk mencapai tempat-tempat itu, Rody harus menempuh berbagai terrain (medan) dan bergerak mengikuti terrain ini. Untuk melakukan hal tersebut, Rody dilengkapi dengan sejumlah perintah berikut.\n\n| Perintah | Arti |\n|---|---|\n| `up` | Bergerak ke atas 1 langkah |\n| `down` | Bergerak ke bawah 1 langkah |\n| `walk` | Berjalan ke depan 1 langkah |\n| `repeat n` *perintah* | Mengulang *perintah* sebanyak n kali. Asumsikan: n >= 0. Jika n = 0, maka perintah tidak dilakukan sama sekali. Parameter *perintah* pada perintah repeat terdiri atas perintah-perintah yang bisa dijalankan oleh robot dan bisa terdiri atas lebih dari 1 perintah. |\n\nMisalnya untuk menempuh terrain berupa satu balok setinggi 1 (gambar), untuk berpindah dari posisi kiri ke kanan, Rody harus melakukan urutan perintah berikut (asumsi daerah berarsir tidak bisa dilewati Rody):\n\n```\nup\nwalk\ndown\n```\n\nBentuk terrain ditentukan oleh ketinggian terrain yang dinyatakan dengan bilangan n (n > 0). Gambar menunjukkan contoh untuk n = 1 (satu balok), n = 2 (tiga sel: tinggi 1, 2, 1) dan n = 5 (sembilan sel: tinggi 1, 2, 3, 4, 5, 4, 3, 2, 1). Harap diingat, masih dimungkinkan nilai n yang lain.",
      figures: [{ src: L2, page: 3 }], minutes: 15,
      parts: [{
        id: 'lat2-s3a', kind: 'robot', decks: ['D02'], topic: 'Robot repeat', dialect: 'rody', param: 'n', nValues: [1, 2, 3, 4, 5], difficulty: 2,
        stem: "**Tugas Anda:** Jika diberikan nilai n dengan n > 0 yang menyatakan ketinggian terrain yang harus ditempuh Rody dalam perjalanannya, tuliskan perintah yang harus dilakukan Rody untuk melewati terrain (asumsi terrain tidak bisa ditembus) dari sisi kiri terrain ke sisi kanannya.\n\nRangkaian perintah dituliskan dalam urutan dituliskan ke bawah, dan dapat dikombinasikan dengan indentasi untuk memperjelas penulisan. Lihat contoh di atas.",
        figures: [{ src: L2, page: 3 }],
        solution: 'repeat n\n  up\n  walk\nrepeat n-1\n  down\n  walk\ndown',
        rubric: RUB_ROBOT,
        hints: ['Gambar jalur untuk n = 1, 2, 3. Bagian mana yang berulang? Perhatikan sisi naik dan sisi turun secara terpisah.', 'Sisi naik: (up, walk) sebanyak n kali sampai di puncak. Sisi turun: puncak sudah di sel ke-n, jadi berapa kali (down, walk) yang tersisa, dan apa langkah terakhir?'],
        work: ['n = 1: `up walk down` (contoh di soal).', 'n = 2: `up walk up walk down walk down`.', 'Pola naik: `repeat n (up, walk)`, berakhir di sel puncak.', 'Pola turun: `repeat n-1 (down, walk)` melewati sel-sel yang menurun, lalu satu `down` terakhir ke tanah di sisi kanan.', 'Cek n = 1: repeat 0 tidak berjalan → up walk down ✓.'],
        explanation: "Jawaban contoh (jawaban lain yang menghasilkan jalur sama juga benar):\n\n```\nrepeat n\n  up\n  walk\nrepeat n-1\n  down\n  walk\ndown\n```\n\nSisi naik n kali (up, walk); sisi turun n−1 kali (down, walk) lalu satu `down`. Jangan `repeat n (down, walk)`: robot akan berjalan satu langkah ekstra di luar terrain. Untuk n = 1, `repeat n-1` tidak melakukan apa pun karena n−1 = 0 (n = 0 diizinkan oleh aturan repeat).",
        refs: [{ src: L2, page: 3 }],
        en: { stem: "**Your task:** Given a value n with n > 0 that represents the height of the terrain Rody has to traverse on his journey, write the commands that Rody must perform to cross the terrain (assume the terrain cannot be penetrated) from the left side of the terrain to its right side.\n\nThe sequence of commands is written in order from top to bottom, and can be combined with indentation to make the writing clearer. See the example above." },
      }],
    },
    {
      id: 'lat2-s4', archetype: 'program', title: 'Soal 4 – Tiket Taman Hiburan', en: { title: 'Problem 4 – Amusement Park Tickets' },
      source: { kind: 'latihan' as const, lang: 'id' as const, src: L2, label: 'Soal 4', pages: [4], official: true },
      intro: "Pak Omar sedang merencanakan perjalanan sekolah ke sebuah taman hiburan. Taman hiburan tersebut memiliki harga tiket yang berbeda untuk siswa (umur 17 atau lebih muda) dan dewasa. Harga tiket siswa adalah Rp. 100.000, sedangkan harga tiket dewasa adalah Rp. 150.000. Jika total biaya tiket lebih dari Rp. 1.000.000, pengelola taman hiburan tersebut akan memberikan potongan harga sebesar 10%. Pengelola taman hiburan juga memiliki ketentuan bahwa setiap rombongan siswa harus didampingi minimal satu orang dewasa.\n\nPak Omar memiliki daftar umur semua peserta, tapi perlu bantuan untuk menghitung berapa total biaya tiket dan untuk memeriksa apakah ada minimal satu orang dewasa sebagai pendamping.",
      figures: [{ src: L2, page: 4 }], minutes: 25,
      parts: [{
        id: 'lat2-s4a', kind: 'program', decks: ['D06'], topic: 'Array: count & search', difficulty: 2,
        patterns: ['array-populate', 'accumulate-sum', 'if-else', 'search-flag'], misconceptions: ['init-in-loop', 'off-by-one'],
        stem: "Bantulah Pak Omar dalam merencanakan perjalanan ke taman hiburan tersebut. Tulislah sebuah program Python yang melakukan hal-hal berikut:\n\n1. Menerima input umur peserta dari pengguna dan memasukkan ke sebuah array (list) of integer. Untuk menyederhanakan, peserta selalu berjumlah 10.\n2. Menghitung dan menampilkan total biaya tiket.\n3. Melakukan pemeriksaan apakah ada minimal satu orang peserta dewasa. Jika ada, tampilkan pesan “Ada pendamping orang dewasa”. Jika tidak ada, tampilkan “Tidak ada pendamping orang dewasa”.\n\nContoh tampilan program:\n\n```\nMasukkan umur peserta ke-1: 12\nMasukkan umur peserta ke-2: 21\nMasukkan umur peserta ke-3: 10\nMasukkan umur peserta ke-4: 18\nMasukkan umur peserta ke-5: 13\nMasukkan umur peserta ke-6: 9\nMasukkan umur peserta ke-7: 11\nMasukkan umur peserta ke-8: 15\nMasukkan umur peserta ke-9: 10\nMasukkan umur peserta ke-10: 12\n\nTotal biaya tiket: Rp. 990000\nAda pendamping orang dewasa\n```\n\n*(Di situs ini, 10 umur dibaca satu per baris; prompt `input()` tidak dihitung sebagai keluaran.)*",
        reps: ['python', 'pseudo'], match: 'lenient', mustUse: ['array'],
        solution: {
          python: r`# Program Tiket_Taman_Hiburan
# Menerima umur 10 peserta, menghitung total biaya tiket (siswa <= 17 tahun Rp 100.000,
# dewasa Rp 150.000, diskon 10% bila total > Rp 1.000.000) dan memeriksa ada tidaknya
# minimal satu orang dewasa sebagai pendamping.
# DECLARATIONS
# N : int
# umur : array [0..N-1] of int
# i, total : int
# found : boolean
# ALGORITHM
N = 10
umur = [0 for i in range(N)]
for i in range(N):
    umur[i] = int(input())
total = 0
found = False
for i in range(N):
    if (umur[i] <= 17):
        total = total + 100000
    else:
        total = total + 150000
        found = True
if (total > 1000000):
    total = total - total // 10
print("Total biaya tiket: Rp. " + str(total))
if (found):
    print("Ada pendamping orang dewasa")
else:
    print("Tidak ada pendamping orang dewasa")`,
          pseudo: r`Program Tiket_Taman_Hiburan
{ Menghitung total biaya tiket 10 peserta dan memeriksa adanya pendamping dewasa }
KAMUS
  N, i, total : integer
  umur : array [0..9] of integer
  found : boolean
ALGORITMA
  N ← 10
  i traversal [0..N-1]
    input(umur[i])
  total ← 0
  found ← false
  i traversal [0..N-1]
    if (umur[i] <= 17) then
      total ← total + 100000
    else
      total ← total + 150000
      found ← true
  if (total > 1000000) then
    total ← total - total div 10
  output("Total biaya tiket: Rp. ", total)
  if (found) then
    output("Ada pendamping orang dewasa")
  else
    output("Tidak ada pendamping orang dewasa")`,
        },
        tests: [
          { name: 'example from the problem', stdin: ['12', '21', '10', '18', '13', '9', '11', '15', '10', '12'] },
          { name: 'all aged 17', stdin: ['17', '17', '17', '17', '17', '17', '17', '17', '17', '17'], edge: 'total exactly Rp 1.000.000: no discount, 17 = student, no companion' },
          { name: 'all adults', stdin: ['18', '18', '18', '18', '18', '18', '18', '18', '18', '18'], edge: '18 = dewasa; total 1.500.000 → diskon' },
          { name: 'adult only in the last element', stdin: ['5', '6', '7', '8', '9', '10', '11', '12', '13', '40'], edge: 'dewasa di indeks terakhir' },
          { name: 'adult only in the first element', stdin: ['35', '5', '6', '7', '8', '9', '10', '11', '12', '13'], edge: 'dewasa di indeks 0' },
          { name: 'lima siswa lima dewasa', stdin: ['20', '10', '30', '11', '40', '12', '50', '13', '60', '14'] },
        ],
        wrong: [
          { code: 'N = 10\numur = [0 for i in range(N)]\nfor i in range(N):\n    umur[i] = int(input())\ntotal = 0\nfound = False\nfor i in range(N):\n    if (umur[i] <= 17):\n        total = total + 100000\n    else:\n        total = total + 150000\n        found = True\nif (total >= 1000000):\n    total = total - total // 10\nprint("Total biaya tiket: Rp. " + str(total))\nif (found):\n    print("Ada pendamping orang dewasa")\nelse:\n    print("Tidak ada pendamping orang dewasa")', msg: 'Diskon hanya bila total *lebih dari* Rp 1.000.000: gunakan `>` bukan `>=`. Total tepat 1.000.000 tidak mendapat diskon.', tag: 'off-by-one' },
          { code: 'N = 10\numur = [0 for i in range(N)]\nfor i in range(N):\n    umur[i] = int(input())\ntotal = 0\nfound = False\nfor i in range(N):\n    if (umur[i] < 17):\n        total = total + 100000\n    else:\n        total = total + 150000\n        found = True\nif (total > 1000000):\n    total = total - total // 10\nprint("Total biaya tiket: Rp. " + str(total))\nif (found):\n    print("Ada pendamping orang dewasa")\nelse:\n    print("Tidak ada pendamping orang dewasa")', msg: 'Siswa adalah umur 17 atau lebih muda: kondisinya `umur <= 17`. Umur 17 tidak boleh dihitung dewasa.', tag: 'off-by-one' },
          { code: 'N = 10\numur = [0 for i in range(N)]\nfor i in range(N):\n    umur[i] = int(input())\ntotal = 0\nfor i in range(N):\n    found = False\n    if (umur[i] <= 17):\n        total = total + 100000\n    else:\n        total = total + 150000\n        found = True\nif (total > 1000000):\n    total = total - total // 10\nprint("Total biaya tiket: Rp. " + str(total))\nif (found):\n    print("Ada pendamping orang dewasa")\nelse:\n    print("Tidak ada pendamping orang dewasa")', msg: '`found = False` ada di dalam loop, sehingga hanya elemen terakhir yang menentukan hasil. Inisialisasi flag sebelum loop.', tag: 'init-in-loop' },
        ],
        plan: 'N ← 10; baca 10 umur ke array; total ← 0, found ← false; untuk tiap elemen: bila umur ≤ 17 tambah 100000, selain itu tambah 150000 dan found ← true; bila total > 1000000 kurangi 10%; tampilkan total; tampilkan pesan sesuai found',
        skeleton: 'N = 10\numur = [0 for i in range(N)]\nfor i in range(N):\n    umur[i] = int(___)\ntotal = ___\nfound = ___\nfor i in range(N):\n    if (umur[i] ___ 17):\n        total = total + ___\n    else:\n        total = total + ___\n        found = ___\nif (total ___ 1000000):\n    total = total - total // 10\nprint("Total biaya tiket: Rp. " + str(___))',
        hints: ['Pola apa yang dipakai? Mengisi array (traversal) lalu menjumlah dengan syarat dan mencari ada/tidaknya sesuatu (flag).', 'Dua bagian terpisah: (1) hitung total + diskon setelah semua umur diproses; (2) flag `found` dimulai False sebelum loop dan hanya diubah menjadi True.'],
        work: ['Baca 10 umur ke dalam array `umur` dengan loop `for i in range(N)`.', 'Siapkan `total = 0` dan `found = False` sebelum loop.', 'Loop: umur ≤ 17 → +100000; selain itu → +150000 dan `found = True`.', 'Setelah loop: bila `total > 1000000`, kurangi 10% (`total - total // 10`, bilangan bulat).', 'Cetak total, lalu pesan sesuai `found`.'],
        explanation: "Total contoh: dewasa = 21 dan 18 (2 × 150.000 = 300.000), siswa = 8 × 100.000 = 800.000 → 1.100.000 > 1.000.000 → diskon 10% → 990.000. Karena total selalu kelipatan 50.000, 10% selalu bilangan bulat, sehingga `total - total // 10` tepat. Alternatif `total * 0.9` menghasilkan `990000.0` (pecahan) dan sebaiknya dihindari; periksa apakah format yang diminta bilangan bulat.\n\nTrap: diskon hanya bila total *lebih dari* 1.000.000 (sepuluh siswa 17 tahun = 1.000.000, tanpa diskon); siswa = umur ≤ 17.",
        syntax: ['program-template', 'list-init', 'list-index', 'for-range', 'if-else', 'print-str'],
        lineNotes: [
          { line: [1, 10], note: 'Kerangka program gaya kuliah: judul + spesifikasi, KAMUS sebagai komentar `# nama : tipe` (array dengan rentang indeks), lalu ALGORITHM.', syntax: 'program-template' },
          { line: 11, note: 'Banyak peserta tetap 10, disimpan di `N` agar tidak ada angka ajaib di loop.' },
          { line: 12, note: 'Array 10 elemen diinisialisasi 0 dengan list comprehension: bentuk standar kuliah.', syntax: 'list-init' },
          { line: [13, 14], note: 'Traversal indeks 0..N−1: `range(N)` berhenti di N−1, indeks terakhir yang sah. `int(input())` wajib karena `input()` menghasilkan string.', syntax: 'for-range' },
          { line: [15, 16], note: '`total` dan flag `found` diinisialisasi **sebelum** loop; kalau di dalam loop, nilainya ter-reset tiap iterasi (hanya elemen terakhir yang menentukan).' },
          { line: 17, note: 'Satu loop kedua memproses array yang sudah terisi: menjumlah sekaligus mencari pendamping.', syntax: 'for-range' },
          { line: [18, 19], note: 'Siswa = umur **≤ 17** (17 atau lebih muda): batas inklusif, jadi `<=` bukan `<`.', syntax: 'if-else' },
          { line: [20, 22], note: 'Selain itu dewasa: tambah 150000 dan naikkan flag `found`. Flag tidak pernah diturunkan lagi, sehingga cukup satu dewasa pun membuatnya True.' },
          { line: [23, 24], note: 'Diskon dihitung **setelah** semua tiket dijumlah, dan hanya bila total *lebih dari* 1.000.000 (`>` bukan `>=`). `total - total // 10` memotong 10% dengan bilangan bulat.' },
          { line: 25, note: '`str(total)` wajib saat `+` dengan string; tanpanya muncul TypeError.', syntax: 'print-str' },
          { line: [26, 29], note: 'Pesan dipilih dari flag, bukan dihitung ulang dari array.', syntax: 'if-else' },
        ],
        pseudoNotes: [
          { line: [3, 6], note: 'KAMUS: array 10 elemen berindeks 0..9, plus flag boolean `found`.' },
          { line: [8, 10], note: 'Mengisi array: `i traversal [0..N-1]` memproses i = 0, 1, …, N−1 (batas atas ikut).' },
          { line: [11, 12], note: 'Inisialisasi `total` dan `found` sebelum perulangan.' },
          { line: [13, 18], note: 'Siswa (umur ≤ 17) Rp 100.000; selain itu dewasa Rp 150.000 dan `found ← true`.' },
          { line: [19, 20], note: 'Diskon 10% hanya bila total > 1.000.000; `div` adalah pembagian bilangan bulat.' },
          { line: [21, 25], note: 'Keluaran: total, lalu pesan sesuai `found`.' },
        ],
        rubric: RUB_PROG,
        refs: [{ src: L2, page: 4 }],
        en: { stem: "Help Mr. Omar plan the trip to the amusement park. Write a Python program that does the following:\n\n1. Accepts the participants' ages as input from the user and puts them into an array (list) of integers. To simplify, the number of participants is always 10.\n2. Calculates and displays the total ticket cost.\n3. Checks whether there is at least one adult participant. If there is, display the message “Ada pendamping orang dewasa” (There is an adult chaperone). If not, display “Tidak ada pendamping orang dewasa” (There is no adult chaperone).\n\nExample program display:\n\n```\nMasukkan umur peserta ke-1: 12\nMasukkan umur peserta ke-2: 21\nMasukkan umur peserta ke-3: 10\nMasukkan umur peserta ke-4: 18\nMasukkan umur peserta ke-5: 13\nMasukkan umur peserta ke-6: 9\nMasukkan umur peserta ke-7: 11\nMasukkan umur peserta ke-8: 15\nMasukkan umur peserta ke-9: 10\nMasukkan umur peserta ke-10: 12\n\nTotal biaya tiket: Rp. 990000\nAda pendamping orang dewasa\n```\n\n*(On this site, the 10 ages are read one per line; the `input()` prompt is not counted as output.)*" },
      }],
    },

    /* ======================================================= TUBAY STEI'25 ======================================================= */
    {
      id: 'tubay-1', archetype: 'program', title: "1. 'Mpruy", en: { title: "1. 'Mpruy numbers" },
      source: { kind: 'tubay' as const, lang: 'id' as const, src: TB, label: "1. 'Mpruy", pages: [3], official: false },
      figures: [{ src: TB, page: 3 }],
      parts: [{
        id: 'tubay-1a', kind: 'program', decks: ['D05'], topic: 'Digits & loops', difficulty: 2,
        patterns: ['while-condition', 'accumulate-sum', 'operators'], misconceptions: ['init-in-loop'],
        stem: "Suatu bilangan disebut ”’Mpruy” jika bilangan tersebut habis dibagi jumlah dari digit-digit bilangan itu sendiri!\n\n**Tugas (disusun situs ini; soal asli hanya definisi di atas):** tulis program yang membaca satu bilangan bulat N (N > 0), lalu menampilkan `Ya` bila N adalah bilangan ’Mpruy, atau `Tidak` bila bukan.\n\n*Format masukan/keluaran adalah asumsi situs ini; sumber tidak menetapkannya.*",
        reps: ['python', 'pseudo'], match: 'lenient',
        solution: {
          python: r`# Program Mpruy
# Menentukan apakah N habis dibagi jumlah digit-digitnya. Asumsi: N > 0
# DECLARATIONS
# N, sisa, jumlah : int
# ALGORITHM
N = int(input())
sisa = N
jumlah = 0
while (sisa > 0):
    jumlah = jumlah + sisa % 10
    sisa = sisa // 10
if (N % jumlah == 0):
    print("Ya")
else:
    print("Tidak")`,
          pseudo: r`Program Mpruy
{ Menentukan apakah N habis dibagi jumlah digit-digitnya. Asumsi: N > 0 }
KAMUS
  N, sisa, jumlah : integer
ALGORITMA
  input(N)
  sisa ← N
  jumlah ← 0
  while (sisa > 0) do
    jumlah ← jumlah + (sisa mod 10)
    sisa ← sisa div 10
  if (N mod jumlah = 0) then
    output("Ya")
  else
    output("Tidak")`,
        },
        tests: [
          { name: '12', stdin: ['12'], edge: '12 / 3 = 4, habis dibagi' },
          { name: '13', stdin: ['13'] },
          { name: '1', stdin: ['1'], edge: 'N satu digit' },
          { name: '10', stdin: ['10'], edge: 'digit count 1; contains digit 0' },
          { name: '11', stdin: ['11'], edge: 'bukan: 11 mod 2 = 1' },
          { name: '19', stdin: ['19'], edge: 'digit count 10 (two digits)' },
          { name: '111', stdin: ['111'], edge: '111 / 3 = 37' },
        ],
        wrong: [
          { code: 'N = int(input())\njumlah = 0\nwhile (N > 0):\n    jumlah = jumlah + N % 10\n    N = N // 10\nif (N % jumlah == 0):\n    print("Ya")\nelse:\n    print("Tidak")', msg: 'N dimodifikasi di dalam loop sehingga pada akhirnya N = 0 dan `0 % jumlah` selalu 0. Salin N ke variabel lain (`sisa`) untuk dipotong digitnya.' },
          { code: 'N = int(input())\njumlah = N % 10\nif (jumlah != 0 and N % jumlah == 0):\n    print("Ya")\nelse:\n    print("Tidak")', msg: 'Hanya digit terakhir yang dipakai. Jumlahkan semua digit dengan loop: `% 10` mengambil digit terakhir, `// 10` membuangnya.' },
        ],
        plan: 'baca N; salin ke sisa; jumlah ← 0; selama sisa > 0: tambahkan digit terakhir (sisa mod 10) ke jumlah, buang digit terakhir (sisa div 10); jika N habis dibagi jumlah tampilkan Ya, selain itu Tidak',
        skeleton: 'N = int(input())\nsisa = ___\njumlah = ___\nwhile (sisa ___ 0):\n    jumlah = jumlah + sisa ___ 10\n    sisa = sisa ___ 10\nif (N % jumlah == ___):\n    print("Ya")\nelse:\n    print("Tidak")',
        hints: ['Bagaimana mengambil digit terakhir sebuah bilangan? Dan bagaimana membuangnya?', 'Jangan ubah N itu sendiri; Anda masih membutuhkannya untuk pengecekan habis dibagi di akhir.'],
        work: ['Baca N; salin ke `sisa` agar N utuh.', 'Loop selama `sisa > 0`: tambahkan `sisa % 10` ke `jumlah`, lalu `sisa = sisa // 10`.', 'Setelah loop `jumlah` = jumlah digit (≥ 1 karena N > 0).', 'Bandingkan `N % jumlah == 0` lalu cetak Ya/Tidak.'],
        explanation: "Contoh: 12 → digit 1 + 2 = 3, 12 mod 3 = 0 → Ya. 13 → 1 + 3 = 4, 13 mod 4 = 1 → Tidak. Kunci ini dibuat sendiri (TUBAY tidak menyertakan jawaban). Bilangan ’Mpruy dalam matematika dikenal sebagai bilangan Harshad/Niven.",
        syntax: ['input', 'while', 'operators', 'if-else'],
        lineNotes: [
          { line: [1, 5], note: 'Kerangka: judul, spesifikasi (termasuk asumsi N > 0), KAMUS.', syntax: 'program-template' },
          { line: 6, note: '`int(input())`: masukan selalu string, perlu dikonversi.', syntax: 'input' },
          { line: 7, note: 'Salinan `sisa` yang akan "dikikis" digit demi digit. N dibiarkan utuh karena dipakai lagi di akhir.' },
          { line: 8, note: '`jumlah` diinisialisasi 0 **sebelum** loop (akumulator).' },
          { line: [9, 11], note: '`sisa % 10` = digit terakhir; `sisa // 10` membuang digit itu. Loop berhenti saat semua digit habis (`sisa` = 0), dan `sisa` berubah tiap iterasi sehingga tidak loop tak hingga.', syntax: 'while' },
          { line: [12, 15], note: 'Bilangan habis dibagi jumlah digit bila sisa bagi `N % jumlah` = 0. `jumlah` tidak nol karena N > 0.', syntax: 'if-else' },
        ],
        pseudoNotes: [
          { line: [3, 4], note: 'KAMUS: semua variabel bertipe integer.' },
          { line: [7, 8], note: 'Salin N ke `sisa` dan inisialisasi `jumlah`.' },
          { line: [9, 11], note: '`mod` = sisa bagi (digit terakhir), `div` = pembagian bulat (membuang digit).' },
          { line: [12, 15], note: 'Keputusan akhir: `N mod jumlah = 0` berarti habis dibagi.' },
        ],
        refs: [{ src: TB, page: 3 }],
        en: { stem: "A number is called ”’Mpruy” if it is divisible by the sum of the digits of the number itself!\n\n**Task (written by this site; the original problem is only the definition above):** write a program that reads one integer N (N > 0), then displays `Ya` (yes) if N is an ’Mpruy number, or `Tidak` (no) if it is not.\n\n*The input/output format is an assumption of this site; the source does not specify it.*" },
      }],
    },
    {
      id: 'tubay-2', archetype: 'program', title: '2. Palindrom', en: { title: '2. Palindrome' },
      source: { kind: 'tubay' as const, lang: 'id' as const, src: TB, label: '2. Palindrom', pages: [4], official: false },
      figures: [{ src: TB, page: 4 }],
      parts: [{
        id: 'tubay-2a', kind: 'program', decks: ['D05'], topic: 'String & flag', difficulty: 2,
        patterns: ['string-processing', 'search-flag', 'for-count'], misconceptions: ['index-range', 'init-in-loop'],
        stem: "Diberikan suatu kata, tentukan apakah kata tersebut merupakan palindrom!\n\n**Tugas (disusun situs ini):** baca satu kata (huruf kecil, tanpa spasi, panjang ≥ 1), lalu tampilkan `Palindrom` bila kata tersebut sama dibaca dari depan maupun dari belakang, atau `Bukan palindrom` bila tidak.\n\n*Format masukan/keluaran adalah asumsi situs ini; sumber tidak menetapkannya.*",
        reps: ['python'], match: 'lenient',
        solution: {
          python: r`# Program Palindrom
# Menentukan apakah sebuah kata (huruf kecil, tanpa spasi) merupakan palindrom
# DECLARATIONS
# kata : str
# N, i : int
# palindrom : boolean
# ALGORITHM
kata = input()
N = len(kata)
palindrom = True
for i in range(N // 2):
    if (kata[i] != kata[N - 1 - i]):
        palindrom = False
if (palindrom):
    print("Palindrom")
else:
    print("Bukan palindrom")`,
        },
        tests: [
          { name: 'katak', stdin: ['katak'] },
          { name: 'kata', stdin: ['kata'] },
          { name: 'satu huruf', stdin: ['a'], edge: 'N = 1: loop does not run' },
          { name: 'genap', stdin: ['abba'], edge: 'panjang genap' },
          { name: 'unequal only on the outside', stdin: ['cabbad'], edge: 'outer pair differs, inner pair equal' },
          { name: 'unequal in the middle', stdin: ['abcdba'], edge: 'outer pair equal, middle differs' },
        ],
        wrong: [
          { code: 'kata = input()\nN = len(kata)\npalindrom = False\nfor i in range(N // 2):\n    if (kata[i] == kata[N - 1 - i]):\n        palindrom = True\n    else:\n        palindrom = False\nif (palindrom):\n    print("Palindrom")\nelse:\n    print("Bukan palindrom")', msg: 'Flag di-set ulang pada setiap pasangan sehingga hanya pasangan terakhir yang menentukan (dan kata satu huruf tak pernah True). Mulai dari True dan hanya turunkan ke False saat ada pasangan yang beda.', tag: 'init-in-loop' },
          { code: 'kata = input()\nN = len(kata)\npalindrom = True\nfor i in range(N // 2):\n    if (kata[i] != kata[N - i]):\n        palindrom = False\nif (palindrom):\n    print("Palindrom")\nelse:\n    print("Bukan palindrom")', msg: 'Indeks pasangan dari belakang adalah `N - 1 - i`, bukan `N - i` (indeks terakhir adalah N-1; `kata[N]` di luar jangkauan).', tag: 'index-range' },
          { code: 'kata = input()\nN = len(kata)\nif (kata[0] == kata[N - 1]):\n    print("Palindrom")\nelse:\n    print("Bukan palindrom")', msg: 'Hanya huruf pertama dan terakhir yang dibandingkan. Semua pasangan simetris harus dibandingkan dengan loop.' },
        ],
        plan: 'baca kata; N ← panjang kata; palindrom ← benar; untuk i dari 0 sampai N div 2 − 1: jika kata[i] ≠ kata[N−1−i] maka palindrom ← salah; tampilkan hasil',
        skeleton: 'kata = input()\nN = ___\npalindrom = ___\nfor i in range(___):\n    if (kata[i] != kata[___]):\n        palindrom = ___\nif (palindrom):\n    print("Palindrom")\nelse:\n    print("Bukan palindrom")',
        hints: ['Huruf ke-i dari depan harus sama dengan huruf ke-i dari belakang. Berapa pasangan yang perlu dibandingkan?', 'Indeks huruf ke-i dari belakang pada string berpanjang N adalah N − 1 − i. Pakai flag yang dimulai True dan hanya dapat menjadi False.'],
        work: ['Baca `kata`, simpan panjangnya `N`.', 'Flag `palindrom = True` sebelum loop.', 'Loop `i` dari 0 sampai `N//2 - 1` (cukup separuh): bandingkan `kata[i]` dengan `kata[N-1-i]`.', 'Bila ada beda, `palindrom = False` (jangan di-set True lagi).', 'Cetak hasil dari flag.'],
        explanation: "Cukup membandingkan separuh pertama dengan separuh kedua yang dibalik; huruf tengah (panjang ganjil) tidak perlu dibandingkan. Kunci ini dibuat sendiri (TUBAY tidak menyertakan jawaban). Cara lain `kata == kata[::-1]` bekerja di Python tetapi memakai slicing yang tidak diajarkan di kuliah.",
        syntax: ['input', 'for-range', 'list-index', 'if-else'],
        lineNotes: [
          { line: [1, 7], note: 'Kerangka: judul, spesifikasi, KAMUS.', syntax: 'program-template' },
          { line: 8, note: '`input()` sudah string, tidak perlu konversi.', syntax: 'input' },
          { line: 9, note: '`len(kata)` = banyak huruf; indeks sah 0..N−1.' },
          { line: 10, note: 'Flag dimulai True: kata dianggap palindrom sampai ditemukan pasangan yang berbeda. Diinisialisasi **sebelum** loop.' },
          { line: 11, note: '`range(N // 2)` hanya separuh pertama; pasangan simetris tidak perlu diulang, dan huruf tengah tidak dibandingkan dengan dirinya sendiri. Untuk N = 1 loop kosong → tetap True.', syntax: 'for-range' },
          { line: [12, 13], note: 'Pasangan dari belakang: `N - 1 - i` (bukan `N - i`: itu di luar jangkauan). Flag hanya diturunkan ke False, tidak pernah dinaikkan lagi.', syntax: 'list-index' },
          { line: [14, 17], note: 'Keputusan diambil setelah semua pasangan diperiksa.', syntax: 'if-else' },
        ],
        refs: [{ src: TB, page: 4 }],
        en: { stem: "Given a word, determine whether the word is a palindrome!\n\n**Task (written by this site):** read one word (lowercase letters, no spaces, length ≥ 1), then display `Palindrom` if the word is the same read from the front and from the back, or `Bukan palindrom` (not a palindrome) if not.\n\n*The input/output format is an assumption of this site; the source does not specify it.*" },
      }],
    },
    {
      id: 'tubay-3', archetype: 'program', title: '3. Empat Titik', en: { title: '3. Four Points' },
      source: { kind: 'tubay' as const, lang: 'id' as const, src: TB, label: '3. Empat Titik', pages: [5], official: false },
      figures: [{ src: TB, page: 5 }],
      parts: [{
        id: 'tubay-3a', kind: 'program', decks: ['D06'], topic: 'Array & geometry', difficulty: 3,
        patterns: ['array-populate', 'nested-loop', 'max-min', 'count-if'], misconceptions: ['max-init-zero', 'not-complete'],
        stem: "Terdapat 4 titik koordinat pada suatu bidang kartesius, tentukan apakah keempat titik tersebut membentuk suatu persegi!\n\n**Tugas (disusun situs ini):** baca koordinat bulat empat titik: untuk setiap titik, satu baris x lalu satu baris y (total 8 baris; urutan titik sembarang, tidak harus berurutan mengelilingi persegi). Tampilkan `Ya` bila keempatnya membentuk persegi (sisi tidak harus sejajar sumbu), selain itu `Tidak`.\n\n*Format masukan/keluaran adalah asumsi situs ini; sumber tidak menetapkannya.*",
        reps: ['python'], match: 'lenient',
        solution: {
          python: r`# Program Empat_Titik
# Menentukan apakah 4 titik (urutan sembarang) membentuk persegi.
# Dari 6 jarak kuadrat antar titik: jarak terkecil (>0) muncul tepat 4 kali (sisi)
# dan 2 sisanya (diagonal) sama dengan 2 kali jarak terkecil.
# DECLARATIONS
# X, Y : array [0..3] of int
# D : array [0..5] of int
# i, j, idx, kecil, banyakSisi, banyakDiagonal : int
# ALGORITHM
X = [0 for i in range(4)]
Y = [0 for i in range(4)]
for i in range(4):
    X[i] = int(input())
    Y[i] = int(input())
D = [0 for i in range(6)]
idx = 0
for i in range(4):
    for j in range(i + 1, 4):
        D[idx] = (X[i] - X[j]) ** 2 + (Y[i] - Y[j]) ** 2
        idx = idx + 1
kecil = D[0]
for idx in range(1, 6):
    if (D[idx] < kecil):
        kecil = D[idx]
banyakSisi = 0
banyakDiagonal = 0
for idx in range(6):
    if (D[idx] == kecil):
        banyakSisi = banyakSisi + 1
    elif (D[idx] == 2 * kecil):
        banyakDiagonal = banyakDiagonal + 1
if (kecil > 0 and banyakSisi == 4 and banyakDiagonal == 2):
    print("Ya")
else:
    print("Tidak")`,
        },
        tests: [
          { name: 'persegi satuan berurutan', stdin: ['0', '0', '1', '0', '1', '1', '0', '1'] },
          { name: 'persegi, urutan acak', stdin: ['0', '0', '1', '1', '0', '1', '1', '0'], edge: 'points not in perimeter order' },
          { name: 'persegi miring', stdin: ['0', '0', '1', '1', '0', '2', '-1', '1'], edge: 'sides not parallel to the axes' },
          { name: 'belah ketupat', stdin: ['0', '0', '-6', '-5', '-6', '5', '-12', '0'], edge: 'four equal sides (square 61), diagonals 100 and 144 ≠ 2×61' },
          { name: 'persegi panjang', stdin: ['0', '0', '2', '0', '2', '1', '0', '1'], edge: 'sides not equal' },
          { name: 'four identical points', stdin: ['3', '3', '3', '3', '3', '3', '3', '3'], edge: 'jarak 0' },
          { name: 'segaris', stdin: ['0', '0', '1', '0', '2', '0', '3', '0'], edge: 'jarak 1 muncul 3 kali' },
        ],
        wrong: [
          { code: 'X = [0 for i in range(4)]\nY = [0 for i in range(4)]\nfor i in range(4):\n    X[i] = int(input())\n    Y[i] = int(input())\ndef d(a, b):\n    return (X[a] - X[b]) ** 2 + (Y[a] - Y[b]) ** 2\nif (d(0, 1) > 0 and d(0, 1) == d(1, 2) and d(1, 2) == d(2, 3) and d(2, 3) == d(3, 0) and d(0, 2) == d(1, 3)):\n    print("Ya")\nelse:\n    print("Tidak")', msg: 'Titik diasumsikan berurutan mengelilingi persegi, padahal urutan masukan sembarang. Bandingkan semua 6 pasangan jarak, bukan hanya pasangan berurutan.', tag: 'not-complete' },
          { code: 'X = [0 for i in range(4)]\nY = [0 for i in range(4)]\nfor i in range(4):\n    X[i] = int(input())\n    Y[i] = int(input())\nD = [0 for i in range(6)]\nidx = 0\nfor i in range(4):\n    for j in range(i + 1, 4):\n        D[idx] = (X[i] - X[j]) ** 2 + (Y[i] - Y[j]) ** 2\n        idx = idx + 1\nkecil = D[0]\nfor idx in range(1, 6):\n    if (D[idx] < kecil):\n        kecil = D[idx]\nbanyakSisi = 0\nfor idx in range(6):\n    if (D[idx] == kecil):\n        banyakSisi = banyakSisi + 1\nif (kecil > 0 and banyakSisi == 4):\n    print("Ya")\nelse:\n    print("Tidak")', msg: 'Empat sisi sama belum cukup (belah ketupat juga). Periksa pula bahwa kedua diagonal sama dan bernilai 2 kali kuadrat sisi.', tag: 'not-complete' },
        ],
        plan: 'baca 4 titik ke dua array X, Y; hitung 6 jarak kuadrat antar pasangan (i<j) ke array D; cari yang terkecil; hitung berapa kali muncul dan berapa yang sama dengan 2× terkecil; persegi bila terkecil > 0, muncul 4 kali, dan 2 sisanya 2× terkecil',
        hints: ['Persegi punya tepat dua jenis jarak antartitik: sisi (4 pasang) dan diagonal (2 pasang). Berapa perbandingan kuadrat keduanya?', 'Jangan bergantung pada urutan titik: hitung jarak kuadrat semua 6 pasangan, simpan di array, lalu cari terkecil dan hitung kemunculannya.'],
        work: ['Baca X[i], Y[i] untuk i = 0..3.', 'Dua loop bersarang `i < j` mengisi D[0..5] dengan jarak kuadrat (hindari akar).', 'Cari `kecil` dengan pola nilai minimum (mulai dari D[0]).', 'Hitung banyak D yang sama dengan `kecil` dan banyak yang sama dengan `2*kecil`.', 'Ya bila `kecil > 0`, 4 sisi, dan 2 diagonal.'],
        explanation: "Memakai jarak kuadrat menghindari akar dan pembulatan: untuk persegi bersisi s, enam jarak kuadratnya adalah s² (empat kali) dan 2s² (dua kali). Belah ketupat punya 4 sisi sama tetapi diagonalnya tidak sama (bukan 2s²); persegi panjang punya 2+2 sisi sama. `kecil > 0` menolak titik yang berimpit. Kunci ini dibuat sendiri (TUBAY tidak menyertakan jawaban).",
        syntax: ['list-init', 'list-index', 'for-range', 'if-elif'],
        lineNotes: [
          { line: [1, 9], note: 'Kerangka: judul, ide algoritma (jarak kuadrat), KAMUS.', syntax: 'program-template' },
          { line: [10, 11], note: 'Dua array paralel untuk koordinat x dan y: titik ke-i = (X[i], Y[i]).', syntax: 'list-init' },
          { line: [12, 14], note: 'Setiap titik dibaca dua kali `int(input())`: x dulu lalu y, sesuai format masukan.', syntax: 'input' },
          { line: [15, 16], note: '`D` menampung 6 jarak kuadrat (C(4,2) = 6 pasang); `idx` adalah penunjuk posisi isi.' },
          { line: [17, 20], note: 'Loop bersarang dengan `j` mulai `i + 1` agar tiap pasang dihitung sekali dan tidak ada pasangan titik dengan dirinya sendiri. `** 2` menghindari akar.', syntax: 'for-range' },
          { line: [21, 24], note: 'Pola nilai minimum: `kecil` mulai dari D[0] (elemen nyata, bukan 0) lalu dibandingkan dengan sisanya.' },
          { line: [25, 31], note: 'Satu pass menghitung berapa jarak yang sama dengan `kecil` (sisi) dan berapa yang sama dengan 2·kecil (diagonal). `elif` agar nilai `kecil` = 0 tidak terhitung dobel.', syntax: 'if-elif' },
          { line: [32, 35], note: 'Persegi: `kecil > 0` (titik tidak berimpit), tepat 4 sisi, tepat 2 diagonal. Ketiganya perlu: 4 sisi saja bisa belah ketupat.', syntax: 'relational-logical' },
        ],
        refs: [{ src: TB, page: 5 }],
        en: { stem: "There are 4 coordinate points on a Cartesian plane; determine whether the four points form a square!\n\n**Task (written by this site):** read the integer coordinates of four points: for each point, one line for x and then one line for y (8 lines in total; the order of the points is arbitrary, not necessarily going around the square in sequence). Display `Ya` (yes) if the four form a square (the sides do not have to be parallel to the axes), otherwise `Tidak` (no).\n\n*The input/output format is an assumption of this site; the source does not specify it.*" },
      }],
    },
    {
      id: 'tubay-4', archetype: 'program', title: '4. Anagram', en: { title: '4. Anagram' },
      source: { kind: 'tubay' as const, lang: 'id' as const, src: TB, label: '4. Anagram', pages: [6], official: false },
      figures: [{ src: TB, page: 6 }],
      parts: [{
        id: 'tubay-4a', kind: 'program', decks: ['D06'], topic: 'Array: search & marking', difficulty: 3,
        patterns: ['array-compare', 'search-flag', 'nested-loop'], misconceptions: ['init-in-loop', 'not-complete'],
        stem: "Diberikan dua array, tentukan apakah array pertama dapat direkonstruksi dengan elemen-elemen dari array kedua!\n\n**Tugas (disusun situs ini):** “direkonstruksi” berarti setiap elemen array pertama (A) bisa diambil dari array kedua (B) dengan setiap elemen B dipakai paling banyak sekali (jadi elemen kembar harus tersedia sebanyak yang dibutuhkan; urutan tidak penting). Masukan: N, lalu N bilangan A (satu per baris); M, lalu M bilangan B (satu per baris). Tampilkan `Ya` atau `Tidak`.\n\n*Format masukan/keluaran dan penafsiran “rekonstruksi” adalah asumsi situs ini; sumber tidak menetapkannya.*",
        reps: ['python'], match: 'lenient', mustUse: ['array'],
        solution: {
          python: r`# Program Rekonstruksi_Array
# Menentukan apakah array A dapat disusun dari elemen-elemen array B
# (setiap elemen B dipakai paling banyak satu kali).
# DECLARATIONS
# N, M, i, j : int
# A, B : array of int
# terpakai : array of boolean
# bisa, found : boolean
# ALGORITHM
N = int(input())
A = [0 for i in range(N)]
for i in range(N):
    A[i] = int(input())
M = int(input())
B = [0 for j in range(M)]
terpakai = [False for j in range(M)]
for j in range(M):
    B[j] = int(input())
bisa = True
for i in range(N):
    found = False
    j = 0
    while (j < M and not found):
        if (B[j] == A[i] and not terpakai[j]):
            terpakai[j] = True
            found = True
        else:
            j = j + 1
    if (not found):
        bisa = False
if (bisa):
    print("Ya")
else:
    print("Tidak")`,
        },
        tests: [
          { name: 'dapat, urutan beda', stdin: ['3', '1', '2', '3', '4', '3', '2', '1', '5'] },
          { name: 'kembar kurang', stdin: ['2', '1', '1', '2', '1', '2'], edge: 'A needs two 1s, B has only one' },
          { name: 'elemen A tak ada di B', stdin: ['2', '1', '3', '2', '1', '2'], edge: 'last element of A is not in B' },
          { name: 'one equal element', stdin: ['1', '5', '1', '5'], edge: 'N = M = 1' },
          { name: 'kembar tersedia', stdin: ['3', '2', '2', '3', '4', '2', '3', '2', '2'], edge: 'B has three 2s and two are used' },
          { name: 'A lebih panjang dari B', stdin: ['3', '1', '2', '3', '2', '1', '2'] },
        ],
        wrong: [
          { code: 'N = int(input())\nA = [0 for i in range(N)]\nfor i in range(N):\n    A[i] = int(input())\nM = int(input())\nB = [0 for j in range(M)]\nfor j in range(M):\n    B[j] = int(input())\nbisa = True\nfor i in range(N):\n    found = False\n    for j in range(M):\n        if (B[j] == A[i]):\n            found = True\n    if (not found):\n        bisa = False\nif (bisa):\n    print("Ya")\nelse:\n    print("Tidak")', msg: 'Hanya memeriksa apakah nilai ada di B (keanggotaan), tanpa menandai elemen B yang sudah dipakai. Elemen kembar di A butuh elemen kembar di B.', tag: 'not-complete' },
          { code: 'N = int(input())\nA = [0 for i in range(N)]\nfor i in range(N):\n    A[i] = int(input())\nM = int(input())\nB = [0 for j in range(M)]\nterpakai = [False for j in range(M)]\nfor j in range(M):\n    B[j] = int(input())\nbisa = True\nfound = False\nfor i in range(N):\n    j = 0\n    while (j < M and not found):\n        if (B[j] == A[i] and not terpakai[j]):\n            terpakai[j] = True\n            found = True\n        else:\n            j = j + 1\n    if (not found):\n        bisa = False\nif (bisa):\n    print("Ya")\nelse:\n    print("Tidak")', msg: '`found = False` harus di-reset untuk setiap elemen A (di dalam loop luar), kalau tidak elemen berikutnya dianggap sudah ditemukan.', tag: 'init-in-loop' },
        ],
        plan: 'baca A dan B; terpakai[j] ← salah untuk semua j; bisa ← benar; untuk tiap A[i]: found ← salah; cari j dengan B[j] = A[i] dan belum terpakai; bila ketemu tandai terpakai, bila tidak bisa ← salah; tampilkan hasil',
        hints: ['Dua elemen sama di A butuh dua elemen sama di B. Bagaimana mencatat elemen B yang sudah dipakai?', 'Untuk setiap elemen A lakukan pencarian dengan flag found di B yang belum terpakai; reset flag untuk tiap elemen A.'],
        work: ['Baca N, A, M, B; siapkan `terpakai` (semua False).', 'Untuk tiap A[i]: `found = False`, `j = 0`.', 'Cari B[j] == A[i] dan belum terpakai (while dengan found); bila ketemu tandai terpakai.', 'Bila ada A[i] yang tidak ketemu → `bisa = False`.', 'Cetak Ya/Tidak.'],
        explanation: "Ini serupa “surat tebusan” (ransom note): isi A harus tersedia dalam B dengan jumlah yang cukup. Penandaan `terpakai` memastikan satu elemen B tidak dipakai dua kali. Alternatif: array penghitung frekuensi. Kunci ini dibuat sendiri; sumber tidak memberikan format, jawaban, atau definisi rinci “rekonstruksi”.",
        syntax: ['list-init', 'list-index', 'for-range', 'while'],
        lineNotes: [
          { line: [1, 9], note: 'Kerangka: judul, spesifikasi, KAMUS (dua array of int dan satu array of boolean).', syntax: 'program-template' },
          { line: [10, 13], note: 'Baca banyak elemen lalu isi array A: `range(N)` agar indeks 0..N−1.', syntax: 'for-range' },
          { line: [14, 18], note: 'Array B dan array penanda `terpakai` berukuran sama dengan B (semua belum terpakai).' },
          { line: 19, note: '`bisa` benar sampai terbukti ada elemen A yang tidak tersedia. Diinisialisasi sebelum loop.' },
          { line: [20, 22], note: 'Untuk setiap A[i]: flag `found` **di-reset di dalam loop luar**, dan penunjuk `j` mulai dari 0.' },
          { line: [23, 28], note: 'Pencarian dengan flag: berhenti begitu ketemu. Syarat ketemu: nilai sama **dan** belum terpakai. `j` hanya naik di `else` agar tidak melewati elemen yang cocok.', syntax: 'while' },
          { line: [29, 30], note: 'Tidak ketemu → seluruh array A tidak dapat direkonstruksi.' },
          { line: [31, 34], note: 'Keputusan dibuat setelah semua elemen A diperiksa.' },
        ],
        refs: [{ src: TB, page: 6 }],
        en: { stem: "Given two arrays, determine whether the first array can be reconstructed with the elements of the second array!\n\n**Task (written by this site):** “reconstructed” means every element of the first array (A) can be taken from the second array (B), with each element of B used at most once (so duplicate elements must be available as many times as needed; the order does not matter). Input: N, then N numbers of A (one per line); M, then M numbers of B (one per line). Display `Ya` (yes) or `Tidak` (no).\n\n*The input/output format and the interpretation of “reconstruction” are assumptions of this site; the source does not specify them.*" },
      }],
    },
    {
      id: 'tubay-5', archetype: 'program', title: '5. Penentuan Jadwal', en: { title: '5. Scheduling' },
      source: { kind: 'tubay' as const, lang: 'id' as const, src: TB, label: '5. Penentuan Jadwal', pages: [7], official: false },
      figures: [{ src: TB, page: 7 }],
      parts: [{
        id: 'tubay-5a', kind: 'program', decks: ['D05'], topic: 'Branching & range overlap', difficulty: 2,
        patterns: ['if-else', 'max-min', 'nested-if'], misconceptions: ['not-complete', 'off-by-one'],
        stem: "Diberikan dua rentang hari, tentukan apakah kedua rentang tersebut beririsan, jika iya, sebutkan rentang yang beririsan.\n\n**Tugas (disusun situs ini):** baca empat bilangan bulat, masing-masing satu baris: awal1, akhir1 (rentang pertama), awal2, akhir2 (rentang kedua), dengan awal ≤ akhir; kedua ujung rentang ikut dihitung (rentang [3, 5] berisi hari 3, 4, 5). Bila beririsan tampilkan `Beririsan: a sampai b` (rentang irisan), selain itu `Tidak beririsan`. Rentang bisa diberikan dalam urutan apa pun.\n\n*Format masukan/keluaran adalah asumsi situs ini; sumber tidak menetapkannya.*",
        reps: ['python', 'pseudo'], match: 'lenient',
        solution: {
          python: r`# Program Irisan_Jadwal
# Menentukan apakah dua rentang hari [awal1, akhir1] dan [awal2, akhir2] beririsan,
# dan jika ya, menampilkan rentang irisannya. Kedua ujung ikut dihitung.
# DECLARATIONS
# awal1, akhir1, awal2, akhir2 : int
# mulai, selesai : int
# ALGORITHM
awal1 = int(input())
akhir1 = int(input())
awal2 = int(input())
akhir2 = int(input())
if (awal1 > awal2):
    mulai = awal1
else:
    mulai = awal2
if (akhir1 < akhir2):
    selesai = akhir1
else:
    selesai = akhir2
if (mulai <= selesai):
    print("Beririsan: " + str(mulai) + " sampai " + str(selesai))
else:
    print("Tidak beririsan")`,
          pseudo: r`Program Irisan_Jadwal
{ Menentukan irisan dua rentang hari; kedua ujung ikut dihitung }
KAMUS
  awal1, akhir1, awal2, akhir2, mulai, selesai : integer
ALGORITMA
  input(awal1)
  input(akhir1)
  input(awal2)
  input(akhir2)
  if (awal1 > awal2) then
    mulai ← awal1
  else
    mulai ← awal2
  if (akhir1 < akhir2) then
    selesai ← akhir1
  else
    selesai ← akhir2
  if (mulai <= selesai) then
    output("Beririsan: ", mulai, " sampai ", selesai)
  else
    output("Tidak beririsan")`,
        },
        tests: [
          { name: 'tumpang tindih', stdin: ['1', '5', '3', '8'] },
          { name: 'terpisah', stdin: ['1', '3', '4', '6'], edge: 'consecutive with no gap still do not overlap (day 3 and day 4 differ)' },
          { name: 'bersentuhan di satu hari', stdin: ['1', '3', '3', '5'], edge: 'irisan satu hari (3 sampai 3)' },
          { name: 'one range inside the other', stdin: ['1', '10', '3', '4'] },
          { name: 'rentang kedua lebih awal', stdin: ['10', '12', '1', '11'], edge: 'urutan terbalik' },
          { name: 'same one-day range', stdin: ['5', '5', '5', '5'], edge: 'awal = akhir' },
          { name: 'rentang kedua jauh setelahnya', stdin: ['1', '3', '5', '8'] },
        ],
        wrong: [
          { code: 'awal1 = int(input())\nakhir1 = int(input())\nawal2 = int(input())\nakhir2 = int(input())\nif (awal1 > awal2):\n    mulai = awal1\nelse:\n    mulai = awal2\nif (akhir1 < akhir2):\n    selesai = akhir1\nelse:\n    selesai = akhir2\nif (mulai < selesai):\n    print("Beririsan: " + str(mulai) + " sampai " + str(selesai))\nelse:\n    print("Tidak beririsan")', msg: 'Kedua ujung rentang ikut dihitung, jadi irisan satu hari (mulai = selesai) tetap beririsan: gunakan `<=`.', tag: 'off-by-one' },
          { code: 'awal1 = int(input())\nakhir1 = int(input())\nawal2 = int(input())\nakhir2 = int(input())\nmulai = awal2\nif (akhir1 < akhir2):\n    selesai = akhir1\nelse:\n    selesai = akhir2\nif (mulai <= selesai):\n    print("Beririsan: " + str(mulai) + " sampai " + str(selesai))\nelse:\n    print("Tidak beririsan")', msg: 'Mengasumsikan rentang kedua dimulai lebih akhir. Awal irisan adalah yang lebih besar dari kedua awal; akhir irisan yang lebih kecil dari kedua akhir.', tag: 'not-complete' },
        ],
        plan: 'baca 4 bilangan; mulai ← yang lebih besar dari awal1 dan awal2; selesai ← yang lebih kecil dari akhir1 dan akhir2; jika mulai ≤ selesai tampilkan irisan [mulai, selesai], selain itu tampilkan tidak beririsan',
        skeleton: 'awal1 = int(input())\nakhir1 = int(input())\nawal2 = int(input())\nakhir2 = int(input())\nif (awal1 ___ awal2):\n    mulai = awal1\nelse:\n    mulai = ___\nif (akhir1 ___ akhir2):\n    selesai = akhir1\nelse:\n    selesai = ___\nif (mulai ___ selesai):\n    print("Beririsan: " + str(mulai) + " sampai " + str(selesai))\nelse:\n    print("Tidak beririsan")',
        hints: ['Gambar dua garis bilangan. Di mana irisan dimulai dan di mana berakhir, tanpa peduli rentang mana yang lebih dulu?', 'Awal irisan = yang lebih besar dari kedua awal; akhir irisan = yang lebih kecil dari kedua akhir. Kapan irisan itu kosong?'],
        work: ['Baca 4 bilangan.', '`mulai` = yang lebih besar dari `awal1` dan `awal2`.', '`selesai` = yang lebih kecil dari `akhir1` dan `akhir2`.', 'Irisan ada bila `mulai <= selesai` (sama dengan: satu hari irisan).', 'Cetak irisan atau pesan tidak beririsan.'],
        explanation: "Irisan dua interval = [max(awal), min(akhir)], kosong bila max(awal) > min(akhir). Karena ujung ikut dihitung, kasus bersentuhan di satu hari (mis. [1,3] dan [3,5]) beririsan di hari 3. Dengan hari bulat, [1,3] dan [4,6] tidak beririsan. Kunci ini dibuat sendiri; sumber tidak memberikan format atau jawaban.",
        syntax: ['input', 'if-else', 'print-str', 'relational-logical'],
        lineNotes: [
          { line: [1, 7], note: 'Kerangka: judul, spesifikasi (ujung ikut dihitung), KAMUS.', syntax: 'program-template' },
          { line: [8, 11], note: 'Empat `int(input())` berurutan: awal1, akhir1, awal2, akhir2.', syntax: 'input' },
          { line: [12, 15], note: 'Awal irisan = **yang lebih besar** dari kedua awal (rentang yang mulai belakangan menentukan). Tanpa asumsi urutan rentang.', syntax: 'if-else' },
          { line: [16, 19], note: 'Akhir irisan = **yang lebih kecil** dari kedua akhir (rentang yang selesai lebih dulu).', syntax: 'if-else' },
          { line: [20, 21], note: 'Irisan tidak kosong bila `mulai <= selesai`. `<=` karena kedua ujung ikut dihitung (satu hari bersama tetap irisan). `str()` wajib untuk `+` dengan string.', syntax: 'print-str' },
          { line: [22, 23], note: 'Kasus kosong: `mulai > selesai`.' },
        ],
        pseudoNotes: [
          { line: [3, 4], note: 'KAMUS: semua bilangan bulat.' },
          { line: [6, 9], note: 'Membaca empat masukan.' },
          { line: [10, 17], note: 'Awal irisan = maksimum dari awal; akhir irisan = minimum dari akhir.' },
          { line: [18, 21], note: 'Irisan ada bila mulai ≤ selesai (ujung ikut).' },
        ],
        refs: [{ src: TB, page: 7 }],
        en: { stem: "Given two ranges of days, determine whether the two ranges overlap, and if so, state the overlapping range.\n\n**Task (written by this site):** read four integers, one per line: start1, end1 (the first range), start2, end2 (the second range), with start ≤ end; both ends of a range are counted (the range [3, 5] contains days 3, 4, 5). If they overlap, display `Beririsan: a sampai b` (the overlapping range; “Beririsan” = overlapping, “sampai” = to), otherwise `Tidak beririsan` (not overlapping). The ranges may be given in any order.\n\n*The input/output format is an assumption of this site; the source does not specify it.*" },
      }],
    },
  ],
  papers: [
    {
      id: 'latihan1', title: 'Latihan 1 (soal gaya Bebras)', kind: 'latihan' as const, lang: 'id' as const, minutes: 45,
      note: 'The source gives no answer key; every answer was computed and verified by us. Problem 5: options B and D are identical in the source. Problem 9: the key was derived from the network figure and is less certain.',
      noteId: 'Sumber tidak mencantumkan kunci; semua jawaban dihitung dan diverifikasi sendiri. Soal 5: opsi B dan D identik di sumber. Soal 9: kunci diturunkan dari gambar jaringan, kurang pasti.',
      problems: ['lat1-s1', 'lat1-s2', 'lat1-s3', 'lat1-s4', 'lat1-s5', 'lat1-s6', 'lat1-s7', 'lat1-s8', 'lat1-s9', 'lat1-s10'],
    },
    {
      id: 'latihan2', title: 'Latihan 2 (gaya UTS Bagian II)', kind: 'latihan' as const, lang: 'id' as const, minutes: 85,
      note: 'Rubrics follow the format and wording of the official UTS 2024 grading guide (the practice source has no rubric).',
      noteId: 'Rubrik ditulis dengan format dan kata-kata resmi Petunjuk Penilaian UTS 2024 (sumber latihan tidak menyertakan rubrik).',
      problems: ['lat2-s1', 'lat2-s2', 'lat2-s3', 'lat2-s4'],
    },
    {
      id: 'tubay', title: "Tutor Sebaya STEI'25", kind: 'tubay' as const, lang: 'id' as const, minutes: 60,
      note: 'Unofficial. The source has only five short definitions, with no input/output format and no key; the format and keys here were made by this site.',
      noteId: 'Tidak resmi. Sumber hanya berisi lima definisi singkat tanpa format masukan/keluaran dan tanpa kunci; format dan kunci di sini dibuat oleh situs ini.',
      problems: ['tubay-1', 'tubay-2', 'tubay-3', 'tubay-4', 'tubay-5'],
    },
  ],
}

/* ------------------------------ English mirror (Indonesian source items) ------------------------------ */

const KEY_NOTE_EN = 'Note: the source does not give an answer key; this answer was computed and verified by us.'

interface EnPatch { en?: Record<string, unknown>; lines?: string[]; pseudo?: string[]; wrong?: string[] }

const PROBLEM_EN: Record<string, { intro: string }> = {
  'lat2-s1': { intro: "Sofi is planning a special event for her friends and wants to order a large tray of special starters from her favourite food stall. The stall offers four kinds of starter: Pisang Goreng (fried banana), Risoles, Perkedel and Martabak Mini. Each kind has its own flavour and comes in three sizes: small, medium and large.\n\nPisang Goreng can be served with a sprinkle of powdered sugar or grated cheese. Risoles are wrapped in crispy breadcrumbs and filled with vegetables and minced meat. Perkedel is made of soft potato mixed with minced meat, flavoured with garlic. Martabak Mini can be filled with egg or minced beef, topped with spring onion.\n\nSofi has some special requirements for the tray so that it suits her guests. The tray must consist of **exactly six starters**, with **two starters of each size**: two small, two medium and two large. Sofi wants variety, so **each kind of starter may appear only once or twice on the tray**. In addition, **there must not be two starters of the same kind in the same size**; for example, if there are two Risoles, one must be small and the other large (or medium). Sofi does not really care about the sugar, cheese, filling or extra toppings." },
  'lat2-s2': { intro: "A neighbourhood association (RT) has taken the initiative to build a mini library for its residents. So far the RT has received the book donations listed below (table on the source page).\n\nIn the future more residents are expected to donate books. To make it easier for library users to find books, the books will be grouped hierarchically by certain criteria. After grouping, every book will be given a unique code that also reflects the hierarchy of its group. Help the library create a hierarchical grouping of the books it already owns, while also keeping in mind the possibility of new books in the future." },
  'lat2-s3': { intro: "Robot Rody is assigned to visit the homes of Eddie's friends, such as Pororo. To reach those places, Rody has to cross various types of terrain and move along its shape. To do this, Rody is equipped with the following commands.\n\n| Command | Meaning |\n|---|---|\n| `up` | Move up 1 step |\n| `down` | Move down 1 step |\n| `walk` | Walk forward 1 step |\n| `repeat n` *command* | Repeat the *command* n times. Assume n >= 0. If n = 0, the command is not executed at all. The *command* parameter of repeat consists of commands the robot can execute, and may contain more than one command. |\n\nFor example, to cross a terrain that is one block of height 1 (figure), moving from the left side to the right, Rody must perform the following sequence of commands (assume the shaded area cannot be passed through):\n\n```\nup\nwalk\ndown\n```\n\nThe shape of the terrain is determined by its height, given by a number n (n > 0). The figure shows examples for n = 1 (one block), n = 2 (three cells: heights 1, 2, 1) and n = 5 (nine cells: heights 1, 2, 3, 4, 5, 4, 3, 2, 1). Remember that other values of n are still possible." },
  'lat2-s4': { intro: "Mr Omar is planning a school trip to an amusement park. The park has different ticket prices for students (age 17 or younger) and adults. A student ticket costs Rp. 100,000 and an adult ticket costs Rp. 150,000. If the total ticket cost is more than Rp. 1,000,000, the park gives a 10% discount. The park also requires every student group to be accompanied by at least one adult.\n\nMr Omar has a list of the ages of all participants, but needs help computing the total ticket cost and checking whether there is at least one adult as a chaperone." },
}

const PATCH: Record<string, EnPatch> = {
  'lat1-s1a': { en: {
    why: ['Too low: a more profitable combination still exists.', 'This is the result if the logs go to 2 wheelbarrows, 3 of the remaining tyres become a tricycle and 1 becomes a wheel (1000 + 1500 + 100 = 2600 thousand): a tyre is wasted on a cheap wheel.', 'Correct: 2 wheelbarrows (1,000,000) + 2 bicycles (2,000,000).', 'Impossible: the highest value per tyre is only Rp 500,000 and there are only 6 tyres.'],
    hints: ['Compute the selling value per tyre for each item. Which item is the most "profitable" per tyre?', 'A bare wheel has a low value per tyre. The other three items have the same value per tyre; check the supply of iron rods and logs.'],
  } },
  'lat1-s2a': { en: {
    why: ['Too long compared with the minute-by-minute simulation.', 'Counter 2 only finishes at minute 13 because it takes 5 customers.', 'Correct: counter 2 finishes last, at minute 13.', '8 minutes is only when counter 3 finishes (a single customer), not everyone.'],
    hints: ['Simulate minute by minute: when does each customer arrive, which counter does he or she join, and when does that counter finish serving them?', 'Mind the order within one minute: a customer who has just been served leaves before the new customer joins.'],
    explanation: "Customers arrive in minutes 0–5 (2 per minute).\n\n| Minute | Arrivals | Joins |\n|---|---|---|\n| 0 | P1, P2 | counter 1 |\n| 1 | P3, P4 | counter 1 (now full: P1–P4) |\n| 2 | P5, P6 | P1 is done (minute 2) → P5 joins counter 1; P6 → new counter 2 (ready during minutes 2–3, served until minute 5) |\n| 3 | P7, P8 | counter 1 full → counter 2 |\n| 4 | P9, P10 | P2 is done (minute 4) → P9 joins counter 1; P10 → counter 2 (full: P6, P7, P8, P10) |\n| 5 | P11, P12 | P6 is done (minute 5) → P11 joins counter 2; P12: counters 1 and 2 are full → new counter 3 |\n\nFinishing times: counter 1: P1 2, P2 4, P3 6, P4 8, P5 10, P9 12. Counter 2: P6 5, P7 7, P8 9, P10 11, P11 13. Counter 3: P12 at minute 8. The last one finishes at minute **13** (C). " + KEY_NOTE_EN,
  } },
  'lat1-s3a': { en: {
    explanation: "Turn the map into a graph: tree = node, allowed jump = edge (row/column difference (0,±2), (±2,0) or (±1,±1)). Of the 31 trees, many are isolated or lie in small clusters; the largest cluster has only 5 trees. The longest path without repeating a tree (a simple path) is found by exhaustively exploring all possibilities; the best result is **5 trees**. " + KEY_NOTE_EN + " Computed with DFS over the transcription of the map above.",
    hints: ['Treat each tree as a node; two trees are connected if their offset is (0, ±2), (±2, 0) or (±1, ±1).', 'Many trees are cut off from the others. Find the connected clusters, then the longest path in each cluster without repeating a tree.'],
    labels: ['Number of trees'],
  } },
  'lat1-s4a': { en: {
    explanation: "Each friend's best rating: Andi ✓ (all films); Nani ✓ (films 2, 3, 6, 7); Niko ● (only film 4); Goldi ● (films 2, 3, 4, 6); Edi ✓ (films 1, 6, 7); Rosa ✓ (only film 5).\n\nThe number of friends whose rating must change for film f to become a favourite = the friends whose best rating is not at film f: film 1 → 4, film 2 → 3, film 3 → 3, film 4 → 3, film 5 → 4, **film 6 → 2** (Niko and Rosa), film 7 → 3. The minimum is **2**. " + KEY_NOTE_EN,
    hints: ['First find the best rating each friend uses (some friends have no ✓ at all).', 'For each film, count how many friends have NOT given that film their best rating. Take the smallest count.'],
    labels: ['Number of ratings'],
  } },
  'lat1-s5a': { en: {
    options: [
      'out(1) out(2) in(1) out(2) out(2) in(1) out(3)',
      'out(1) out(2) in(1) out(2) out(2) in(1) out(3) in(2) out(3) in(1)',
      'out(1) out(2) in(1) out(2) in(1) out(3) in(2) out(3) in(1)',
      'out(1) out(2) in(1) out(2) out(2) in(1) out(3) in(2) out(3) in(1)',
    ],
    why: ['Stops before train 3 enters: D1 only contains 1, 2.', 'Correct: D1 ends as 1, 2, 3. (The text of option B is exactly the same as D in the source file.)', 'Wrong: the second in(1) puts train 7 in, not 2; D1 = 1, 7, 3.', 'Correct: identical to B in the source file (probably a typo; both are correct).'],
    hints: ['Model: the main track works like a stack: a train that has just come out is leftmost, and in(X) takes the leftmost one.', 'Simulate each option from the initial state and record the contents of D1, D2, D3 and the main track after every move.'],
    explanation: "Simulation of option B/D (main track written left→right; a train that has just come out enters at the far left):\n\n| Move | Main track | D1 | D2 | D3 |\n|---|---|---|---|---|\n| start | – | 5 | 2 7 1 | 4 3 6 |\n| out(1) | 5 | – | 2 7 1 | 4 3 6 |\n| out(2) | 1 5 | – | 2 7 | 4 3 6 |\n| in(1) | 5 | 1 | 2 7 | 4 3 6 |\n| out(2) | 7 5 | 1 | 2 | 4 3 6 |\n| out(2) | 2 7 5 | 1 | – | 4 3 6 |\n| in(1) | 7 5 | 1 2 | – | 4 3 6 |\n| out(3) | 6 7 5 | 1 2 | – | 4 3 |\n| in(2) | 7 5 | 1 2 | 6 | 4 3 |\n| out(3) | 3 7 5 | 1 2 | 6 | 4 |\n| in(1) | 7 5 | **1 2 3** | 6 | 4 |\n\nOption A stops with D1 = 1 2; option C puts train 7 into D1. In the source file, options **B and D are identical** (probably a typo); both are correct. " + KEY_NOTE_EN,
  } },
  'lat1-s6a': { en: {
    explanation: "Total energy for target height h: E(h) = Σ width × |h − height|. The cost is a width-weighted sum of differences, so its minimum is at the weighted median (half of the total width 25 lies at heights ≤ h and half at heights ≥ h), and it always falls on one of the existing heights. Result: E(1) = 61, E(2) = 46, **E(3) = 39**, E(4) = 40, E(5) = 51. The minimum is **39** at h = 3. " + KEY_NOTE_EN + " The tower heights are read from the figure (heights: 7, 5, 3, 4, 2, 4, 6, 1, 2).",
    hints: ['The cost of tower i for target height h is width_i × |h − height_i|. Sum over all towers and find the best h.', 'This is a weighted median: the target height is the point where half of the total width is below and half is above.'],
    labels: ['Total energy'],
  } },
  'lat1-s7a': { en: {
    explanation: "Each round scans the list from the front; a box is unloaded when its number equals the number currently needed.\n\n| Round | Unloaded | Remaining |\n|---|---|---|\n| 1 | 1, 2 | 10 3 9 7 6 8 5 4 |\n| 2 | 3, 4 | 10 9 7 6 8 5 |\n| 3 | 5 | 10 9 7 6 8 |\n| 4 | 6 | 10 9 7 8 |\n| 5 | 7, 8 | 10 9 |\n| 6 | 9 | 10 |\n| 7 | 10 | – |\n\nSo **7** rounds. This equals the number of \"descents\" in position: every time number k+1 lies nearer the front than number k, a new round starts. " + KEY_NOTE_EN,
    hints: ['In one round the train passes once from front to back. Which boxes can be unloaded if the next needed number keeps increasing?', 'Start a new round whenever the next needed number has already been passed (its position is nearer the front).'],
    labels: ['Number of rounds'],
  } },
  'lat1-s8a': { en: {
    explanation: "Total seats 6 + 10 + 15 = 31, total members 3+4+5+4+2+3+6+5 = 32, so all 8 families is impossible; at most 7. Seven families is indeed possible: leave out A, then carriage 1 (6 seats/160 kg) = B + E (6 people, 120 kg), carriage 2 (10/200) = C + D (9 people, 190 kg), carriage 3 (15/300) = F + G + H (14 people, 300 kg). The maximum is **7** families. " + KEY_NOTE_EN + " Confirmed by exhaustive search over all family → carriage assignments (4^8 possibilities); none seats all 8 families.",
    hints: ['Total members is 32 but total seats is 31: at most 7 families if one small family is left behind. Try to decide which family stays.', 'Split per carriage: choose a set of families whose members ≤ the passenger capacity and whose luggage ≤ the luggage capacity.'],
    labels: ['Number of families'],
  } },
  'lat1-s9a': { en: {
    explanation: "Name the houses: source (wind turbine) → P; top-middle Q; left R; top-right S; middle-dark T; right U; bottom-right V; bottom-middle W; bottom-left-dark X. Cables: turbine–Q, Q–S, Q–R, Q–T, T–S, T–V, S–V, S–U, R–V, R–X, X–W, W–V (12 cables).\n\n1. The dark houses T and X are surrounded by neighbours that are lit. If any cable from T or X to a neighbour worked, T/X would be lit. So all five cables touching T and X (Q–T, T–S, T–V, R–X, X–W) are **certainly broken**: they need no inspection.\n2. The cables turbine–Q, S–U and W–V are the only route to a lit house (bridges) → **certainly working**.\n3. The remaining four cables form the cycle Q–S–V–R–Q (Q–S, S–V, V–R, R–Q). Houses S, V, R stay lit even if one cable of the cycle is broken, so their status cannot be deduced from the lamps: they must be inspected directly. To be sure that everything works, all four are inspected.\n\nAnswer: **4**. Note: the source gives no key and the network is only a picture; this key is derived from the reasoning above and should be treated as less certain.",
    hints: ['A dark house has no electricity: what does that mean for all cables touching that house, given that its neighbours are lit?', 'After crossing out the cables that are certainly broken, which cables certainly work (bridges: the only route to a lit house) and which have a status that cannot be deduced?'],
    labels: ['Number of connections'],
  } },
  'lat1-s10a': { en: {
    why: ['7 is the value of B2 in the last component, not B3 (the output).', 'Does not appear as the value of B3 in any component (B3: 1, 4, 9, 16).', 'Correct: (4,1,1) → (3,3,4) → (2,5,9) → (1,7,16) → output 16.', '62 cannot be obtained from any rule.'],
    explanation: "Start (B1, B2, B3) = (4, 1, 1).\n\n| Component | B1 | B2 | B3 |\n|---|---|---|---|\n| 1 (input) | 4 | 1 | 1 |\n| 2 | 3 | 3 | 4 |\n| 3 | 2 | 5 | 9 |\n| 4 | 1 | 7 | 16 |\n\nAt component 4, B1 = 1, so the machine's output = B3 = **16** (C). Pattern: B2 is an odd number and B3 is the sum of the first odd numbers = a square: output = n² (4² = 16; the example input 2 → 4). " + KEY_NOTE_EN,
    hints: ['Write the triple (B1, B2, B3) of each component in a table. Start from (4, 1, 1).', 'Stop as soon as B1 = 1 and output B3, not B2.'],
  } },
  'lat2-s1a': { en: {
    explanation: "This problem has no single answer. Example (table): Pisang Goreng – small & medium; Risoles – large; Perkedel – small & large; Martabak Mini – medium. Check: total 6; each size exactly 2 (small: PG, Perkedel; medium: PG, MM; large: Risoles, Perkedel); each kind 1 or 2 times, with different sizes.",
    hints: ['Write the three conditions as numbers: total, per size, per kind. A kind × size table helps.', 'No two starters of the same kind in the same size = each table cell has at most one tick. So it is enough to check rows (1 or 2 ticks) and columns (exactly 2 ticks).'],
  } },
  'lat2-s1b': { en: {
    stem: "Give a short, clear explanation showing your reasoning in choosing that combination.\n\n*Hint: Use the principles of computational thinking to solve this problem. Remember to apply abstraction by focusing on the important information, and decomposition to simplify the problem.*",
    answer: "Abstraction: the only important information is the kind of starter (4), the size (3) and the tray conditions; the sugar, fillings and flavours are ignored (Sofi does not care about them). Decomposition: state three constraints: (1) exactly six starters; (2) two starters for each size; (3) each kind appears 1 or 2 times, and if twice, the sizes must differ. In the kind × size table: exactly 6 ticks in distinct cells, every column has exactly 2 ticks, every row has 1 or 2 ticks. Then build one combination that satisfies all three and check them one by one. Many other answers are also correct.",
    keyPoints: ['Names the important information (kind, size, conditions) and what is ignored (toppings, fillings)', 'States the three constraints explicitly', 'Explains how the combination is built and checked'],
    explanation: 'See the alternative answer and the rubric (official UTS 2024 format, Problem 1b).',
  } },
  'lat2-s2a': { en: {
    hints: ['Which columns have values that repeat across books (suitable as a top level) and which are unique in every row (unsuitable, like Title)?', 'The subject of a book can be inferred from its Title (general knowledge): fiction, science, art, history. The next level: Year Published. Add a sequence number to make the code unique.'],
  } },
  'lat2-s2b': { en: {
    stem: 'Give a short, clear explanation of your reasoning in determining that classification.',
    answer: "Example: I chose the subject category as level 1 because users look for books by topic, its values repeat (many books per category) and it is easy to extend for new books. Level 2 is the year of publication because its values repeat and it makes the groups smaller. Title is not used as a level because its value differs for every book. Because two books can have the same category and year (e.g. FIK-2020), a sequence number is added to make the code unique. With this scheme, a new book only needs a category, a year and the next sequence number.",
    keyPoints: ['The reason for choosing the column/attribute of each level (values repeat, easier searching)', 'Why the unique column (Title) is not used', 'The need for a sequence number to make the code unique', 'The scheme still works for new books'],
    explanation: 'See the sample answer and the rubric (official UTS 2024 format, Problem 2b).',
  } },
  'lat2-s2c': { en: {
    stem: 'Based on that classification, give a unique code for every book (write it directly in the book code column of the table).',
    answer: "Following the model in part (a) (pattern CATEGORY-YEAR-NNN), the sequence number is counted per combination of category and year:\n\n1 FIK-2020-001; 2 FIK-2024-001; 3 FIK-2019-001; 4 FIK-2020-002; 5 FIK-2018-001; 6 SNS-2017-001; 7 SNS-2019-001; 8 SNS-2017-002; 9 SNS-2020-001; 10 SNS-2019-002; 11 SNS-2020-002; 12 SNI-2018-001; 13 SNI-2017-001; 14 SNI-2019-001; 15 SNI-2018-002; 16 SNI-2018-003; 17 SNI-2020-001; 18 SJR-2017-001; 19 SJR-2024-001; 20 SJR-2019-001.\n\nOther codes consistent with your own classification are also correct.",
    keyPoints: ['Every code is unique', 'Every code follows the same pattern and reflects the hierarchy', 'The codes match the classification in parts (a) and (b)'],
    explanation: 'The codes must be consistent with your pattern; check uniqueness and the same order of levels in every row.',
  } },
  'lat2-s3a': { en: {
    explanation: "Sample answer (any other answer that produces the same path is also correct):\n\n```\nrepeat n\n  up\n  walk\nrepeat n-1\n  down\n  walk\ndown\n```\n\nThe ascent is n times (up, walk); the descent is n−1 times (down, walk) and then one final `down`. Do not use `repeat n (down, walk)`: the robot would walk one extra step outside the terrain. For n = 1, `repeat n-1` does nothing because n−1 = 0 (n = 0 is allowed by the repeat rule).",
    hints: ['Draw the path for n = 1, 2, 3. Which part repeats? Look at the rising side and the falling side separately.', 'Rising side: (up, walk) n times until the top. Falling side: the top is already at cell n, so how many (down, walk) are left, and what is the last step?'],
    work: ['n = 1: `up walk down` (the example in the problem).', 'n = 2: `up walk up walk down walk down`.', 'Ascent pattern: `repeat n (up, walk)`, ending on the top cell.', 'Descent pattern: `repeat n-1 (down, walk)` passes the descending cells, then one last `down` to the ground on the right side.', 'Check n = 1: repeat 0 does not run → up walk down ✓.'],
  } },
  'lat2-s4a': { en: {
    explanation: "Sample total: adults = 21 and 18 (2 × 150,000 = 300,000), students = 8 × 100,000 = 800,000 → 1,100,000 > 1,000,000 → 10% discount → 990,000. Because the total is always a multiple of 50,000, 10% is always an integer, so `total - total // 10` is exact. The alternative `total * 0.9` gives `990000.0` (a float) and is best avoided; check whether the required format is an integer.\n\nTrap: the discount applies only if the total is *more than* 1,000,000 (ten 17-year-old students = 1,000,000, no discount); student = age ≤ 17.",
    hints: ['Which patterns are used? Filling an array (traversal), then summing with a condition and searching for the existence of something (a flag).', 'Two separate parts: (1) compute the total + discount after all ages are processed; (2) the flag `found` starts False before the loop and is only ever changed to True.'],
    work: ['Read the 10 ages into the array `umur` with the loop `for i in range(N)`.', 'Prepare `total = 0` and `found = False` before the loop.', 'Loop: age ≤ 17 → +100000; otherwise → +150000 and `found = True`.', 'After the loop: if `total > 1000000`, subtract 10% (`total - total // 10`, integer).', 'Print the total, then the message according to `found`.'],
    plan: 'N ← 10; read 10 ages into the array; total ← 0, found ← false; for each element: if age ≤ 17 add 100000, otherwise add 150000 and found ← true; if total > 1000000 subtract 10%; output the total; output the message according to found',
  },
    lines: [
      'Lecture-style program skeleton: title + specification, DECLARATIONS as comments `# name : type` (arrays with an index range), then ALGORITHM.',
      'The number of participants is fixed at 10, stored in `N` so there is no magic number in the loops.',
      'A 10-element array initialised to 0 with a list comprehension: the standard lecture form.',
      'Index traversal 0..N−1: `range(N)` stops at N−1, the last valid index. `int(input())` is required because `input()` returns a string.',
      '`total` and the flag `found` are initialised **before** the loop; inside the loop they would be reset on every iteration (only the last element would decide).',
      'A second loop processes the already filled array: it sums and searches for a chaperone at the same time.',
      'Student = age **≤ 17** (17 or younger): the boundary is inclusive, so `<=` not `<`.',
      'Otherwise adult: add 150000 and raise the flag `found`. The flag is never lowered again, so a single adult is enough to make it True.',
      'The discount is computed **after** all tickets are summed, and only if the total is *more than* 1,000,000 (`>` not `>=`). `total - total // 10` takes off 10% using integers.',
      '`str(total)` is required when using `+` with a string; without it a TypeError occurs.',
      'The message is chosen from the flag, not recomputed from the array.',
    ],
    pseudo: [
      'DECLARATIONS: a 10-element array indexed 0..9, plus the boolean flag `found`.',
      'Filling the array: `i traversal [0..N-1]` processes i = 0, 1, …, N−1 (the upper bound is included).',
      'Initialise `total` and `found` before the loop.',
      'Student (age ≤ 17) Rp 100,000; otherwise adult Rp 150,000 and `found ← true`.',
      '10% discount only if total > 1,000,000; `div` is integer division.',
      'Output: the total, then the message according to `found`.',
    ],
    wrong: [
      'The discount applies only if the total is *more than* Rp 1,000,000: use `>` not `>=`. A total of exactly 1,000,000 gets no discount.',
      'A student is age 17 or younger: the condition is `umur <= 17`. Age 17 must not be counted as an adult.',
      '`found = False` is inside the loop, so only the last element determines the result. Initialise the flag before the loop.',
    ] },
  'tubay-1a': { en: {
    explanation: "Example: 12 → digits 1 + 2 = 3, 12 mod 3 = 0 → Ya (yes). 13 → 1 + 3 = 4, 13 mod 4 = 1 → Tidak (no). This key was made by us (TUBAY includes no answers). In mathematics, ’Mpruy numbers are known as Harshad/Niven numbers. The program prints the Indonesian words Ya / Tidak.",
    hints: ['How do you take the last digit of a number? And how do you remove it?', 'Do not change N itself; you still need it for the divisibility check at the end.'],
    work: ['Read N; copy it to `sisa` so N stays intact.', 'Loop while `sisa > 0`: add `sisa % 10` to `jumlah`, then `sisa = sisa // 10`.', 'After the loop `jumlah` = the digit sum (≥ 1 because N > 0).', 'Compare `N % jumlah == 0` and print Ya/Tidak.'],
    plan: 'read N; copy it to sisa; jumlah ← 0; while sisa > 0: add the last digit (sisa mod 10) to jumlah, drop the last digit (sisa div 10); if N is divisible by jumlah output Ya, otherwise Tidak',
  },
    lines: [
      'Skeleton: title, specification (including the assumption N > 0), DECLARATIONS.',
      '`int(input())`: input is always a string and must be converted.',
      '`sisa` is a copy that gets "eroded" digit by digit. N is left intact because it is used again at the end.',
      '`jumlah` is initialised to 0 **before** the loop (accumulator).',
      '`sisa % 10` = the last digit; `sisa // 10` removes that digit. The loop stops when all digits are gone (`sisa` = 0), and `sisa` changes on every iteration so there is no infinite loop.',
      'A number is divisible by its digit sum if the remainder `N % jumlah` = 0. `jumlah` is not zero because N > 0.',
    ],
    pseudo: [
      'DECLARATIONS: all variables are integers.',
      'Copy N to `sisa` and initialise `jumlah`.',
      '`mod` = remainder (the last digit), `div` = integer division (removes the digit).',
      'Final decision: `N mod jumlah = 0` means divisible.',
    ],
    wrong: [
      'N is modified inside the loop, so in the end N = 0 and `0 % jumlah` is always 0. Copy N to another variable (`sisa`) to chop its digits.',
      'Only the last digit is used. Sum all the digits with a loop: `% 10` takes the last digit, `// 10` removes it.',
    ] },
  'tubay-2a': { en: {
    explanation: "It is enough to compare the first half with the reversed second half; the middle letter (odd length) need not be compared. This key was made by us (TUBAY includes no answers). The alternative `kata == kata[::-1]` works in Python but uses slicing, which is not taught in the lecture. The program prints the Indonesian phrases Palindrom / Bukan palindrom (\"Not a palindrome\").",
    hints: ['The i-th letter from the front must equal the i-th letter from the back. How many pairs need to be compared?', 'The index of the i-th letter from the back in a string of length N is N − 1 − i. Use a flag that starts True and can only become False.'],
    work: ['Read `kata` (the word) and store its length `N`.', 'Flag `palindrom = True` before the loop.', 'Loop `i` from 0 to `N//2 - 1` (half is enough): compare `kata[i]` with `kata[N-1-i]`.', 'If they differ, `palindrom = False` (never set it back to True).', 'Print the result from the flag.'],
    plan: 'read the word; N ← length of the word; palindrom ← true; for i from 0 to N div 2 − 1: if kata[i] ≠ kata[N−1−i] then palindrom ← false; output the result',
  },
    lines: [
      'Skeleton: title, specification, DECLARATIONS.',
      '`input()` is already a string, no conversion needed.',
      '`len(kata)` = the number of letters; valid indices are 0..N−1.',
      'The flag starts True: the word is assumed to be a palindrome until a differing pair is found. Initialised **before** the loop.',
      '`range(N // 2)` covers only the first half; symmetric pairs need not be repeated, and the middle letter is not compared with itself. For N = 1 the loop is empty → stays True.',
      'The partner from the back is `N - 1 - i` (not `N - i`: that is out of range). The flag is only ever lowered to False, never raised again.',
      'The decision is made after all pairs have been checked.',
    ],
    wrong: [
      'The flag is reset on every pair, so only the last pair decides (and a one-letter word is never True). Start from True and only lower it to False when a pair differs.',
      'The index of the partner from the back is `N - 1 - i`, not `N - i` (the last index is N-1; `kata[N]` is out of range).',
      'Only the first and last letters are compared. All symmetric pairs must be compared with a loop.',
    ] },
  'tubay-3a': { en: {
    explanation: "Using squared distances avoids square roots and rounding: for a square with side s, the six squared distances are s² (four times) and 2s² (twice). A rhombus has 4 equal sides but its diagonals are not equal (not 2s²); a rectangle has 2+2 equal sides. `kecil > 0` rejects coinciding points. This key was made by us (TUBAY includes no answers). The program prints the Indonesian words Ya / Tidak.",
    hints: ['A square has exactly two kinds of distance between points: the side (4 pairs) and the diagonal (2 pairs). What is the ratio of their squares?', 'Do not rely on the order of the points: compute the squared distance of all 6 pairs, store them in an array, then find the smallest and count how often it occurs.'],
    work: ['Read X[i], Y[i] for i = 0..3.', 'Two nested loops with `i < j` fill D[0..5] with squared distances (avoid square roots).', 'Find `kecil` (the smallest) with the minimum-value pattern (start from D[0]).', 'Count how many D equal `kecil` and how many equal `2*kecil`.', 'Ya if `kecil > 0`, 4 sides and 2 diagonals.'],
    plan: 'read 4 points into two arrays X, Y; compute the 6 squared distances between pairs (i<j) into array D; find the smallest; count how many times it occurs and how many equal 2× the smallest; it is a square if smallest > 0, it occurs 4 times and the other 2 are 2× the smallest',
  },
    lines: [
      'Skeleton: title, algorithm idea (squared distances), DECLARATIONS.',
      'Two parallel arrays for the x and y coordinates: point i = (X[i], Y[i]).',
      'Each point is read with two `int(input())` calls: x first then y, following the input format.',
      '`D` holds the 6 squared distances (C(4,2) = 6 pairs); `idx` is the fill position pointer.',
      'Nested loops with `j` starting at `i + 1` so every pair is computed once and no point is paired with itself. `** 2` avoids square roots.',
      'Minimum-value pattern: `kecil` starts from D[0] (a real element, not 0) and is then compared with the rest.',
      'One pass counts how many distances equal `kecil` (sides) and how many equal 2·kecil (diagonals). `elif` so that a `kecil` of 0 is not counted twice.',
      'Square: `kecil > 0` (points do not coincide), exactly 4 sides, exactly 2 diagonals. All three are needed: 4 equal sides alone could be a rhombus.',
    ],
    wrong: [
      'It assumes the points are in order around the square, but the input order is arbitrary. Compare all 6 distance pairs, not just consecutive ones.',
      'Four equal sides are not enough (a rhombus has them too). Also check that both diagonals are equal and equal to 2 times the squared side.',
    ] },
  'tubay-4a': { en: {
    explanation: "This is similar to the \"ransom note\" problem: the contents of A must be available in B in sufficient quantity. Marking `terpakai` (used) ensures one element of B is not used twice. An alternative is a frequency-counting array. This key was made by us; the source gives no format, answer or detailed definition of \"reconstruct\". The program prints the Indonesian words Ya / Tidak.",
    hints: ['Two equal elements in A need two equal elements in B. How do you record which elements of B have already been used?', 'For every element of A, search B (with a found flag) for an unused element; reset the flag for each element of A.'],
    work: ['Read N, A, M, B; prepare `terpakai` (all False).', 'For each A[i]: `found = False`, `j = 0`.', 'Search for B[j] == A[i] that is not yet used (while with found); when found, mark it used.', 'If some A[i] is not found → `bisa = False`.', 'Print Ya/Tidak.'],
    plan: 'read A and B; terpakai[j] ← false for all j; bisa ← true; for each A[i]: found ← false; search for j with B[j] = A[i] that is not yet used; if found mark it used, otherwise bisa ← false; output the result',
  },
    lines: [
      'Skeleton: title, specification, DECLARATIONS (two arrays of int and one array of boolean).',
      'Read the number of elements, then fill array A: `range(N)` gives indices 0..N−1.',
      'Array B and the marker array `terpakai`, the same size as B (nothing used yet).',
      '`bisa` stays true until some element of A is proven unavailable. Initialised before the loop.',
      'For each A[i]: the flag `found` is **reset inside the outer loop**, and the pointer `j` starts from 0.',
      'Search with a flag: stop as soon as a match is found. Match condition: equal value **and** not yet used. `j` only increases in the `else` so a matching element is not skipped.',
      'Not found → the whole array A cannot be reconstructed.',
      'The decision is made after all elements of A have been checked.',
    ],
    wrong: [
      'It only checks whether the value exists in B (membership), without marking the B elements already used. Duplicate elements in A need duplicate elements in B.',
      '`found = False` must be reset for every element of A (inside the outer loop); otherwise the next element is considered already found.',
    ] },
  'tubay-5a': { en: {
    explanation: "The intersection of two intervals = [max(start), min(end)], empty if max(start) > min(end). Because both ends are counted, the case touching on one day (e.g. [1,3] and [3,5]) overlaps on day 3. With whole days, [1,3] and [4,6] do not overlap. This key was made by us; the source gives no format or answer. The program prints the Indonesian phrases \"Beririsan: a sampai b\" (\"Overlap: a to b\") / \"Tidak beririsan\" (\"No overlap\").",
    hints: ['Draw two number lines. Where does the intersection start and where does it end, regardless of which range comes first?', 'Intersection start = the larger of the two starts; intersection end = the smaller of the two ends. When is that intersection empty?'],
    work: ['Read the 4 numbers.', '`mulai` (start) = the larger of `awal1` and `awal2`.', '`selesai` (end) = the smaller of `akhir1` and `akhir2`.', 'An intersection exists if `mulai <= selesai` (equal: a one-day intersection).', 'Print the intersection or the no-overlap message.'],
    plan: 'read 4 numbers; mulai ← the larger of awal1 and awal2; selesai ← the smaller of akhir1 and akhir2; if mulai ≤ selesai output the intersection [mulai, selesai], otherwise output that there is no overlap',
  },
    lines: [
      'Skeleton: title, specification (both ends counted), DECLARATIONS.',
      'Four consecutive `int(input())` calls: awal1, akhir1, awal2, akhir2 (start1, end1, start2, end2).',
      'Intersection start = **the larger** of the two starts (the range that starts later decides). No assumption about the order of the ranges.',
      'Intersection end = **the smaller** of the two ends (the range that finishes first).',
      'The intersection is non-empty if `mulai <= selesai`. `<=` because both ends are counted (a single shared day is still an intersection). `str()` is required for `+` with a string.',
      'Empty case: `mulai > selesai`.',
    ],
    pseudo: [
      'DECLARATIONS: all are integers.',
      'Reading the four inputs.',
      'Intersection start = the maximum of the starts; intersection end = the minimum of the ends.',
      'An intersection exists if mulai ≤ selesai (ends included).',
    ],
    wrong: [
      'Both ends of a range are counted, so a one-day intersection (mulai = selesai) still overlaps: use `<=`.',
      'It assumes the second range starts later. The intersection start is the larger of the two starts; the intersection end is the smaller of the two ends.',
    ] },
}

for (const p of bank.problems as any[]) {
  if (PROBLEM_EN[p.id]) p.en = { ...p.en, ...PROBLEM_EN[p.id] }
  for (const part of p.parts as any[]) {
    const x = PATCH[part.id]
    if (!x) continue
    if (x.en) part.en = { ...part.en, ...x.en }
    if (x.lines) (part.lineNotes as any[]).forEach((n, i) => { n.en = x.lines![i] })
    if (x.pseudo) (part.pseudoNotes as any[]).forEach((n, i) => { n.en = x.pseudo![i] })
    if (x.wrong) (part.wrong as any[]).forEach((w, i) => { w.msgEn = x.wrong![i] })
  }
}
