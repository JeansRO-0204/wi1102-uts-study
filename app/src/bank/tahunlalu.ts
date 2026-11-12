import type { BankFile, Problem, PageRef } from '../types'
const r = String.raw

const SRC = 'UTS_CT_TahunLalu'
const pg = (page: number): PageRef => ({ src: SRC, page })
const source = (label: string, pages: number[]) => ({ kind: 'tahunlalu' as const, lang: 'id' as const, src: SRC, label, pages, official: true })

const problems: Problem[] = [
  {
    id: 'ctl-bunga', archetype: 'constraint', source: source('ANN - Posisi Bunga', [1]),
    title: 'ANN - Posisi Bunga',
    intro: 'Ibu Bebras menanam bunga Matahari, Mawar, dan Lili putih di 9 petak (3×3). Aturan: tidak boleh ada bunga yang sama jenisnya dalam satu baris, dan tidak boleh ada bunga yang sama jenisnya dalam satu kolom.',
    figures: ['fig/ctl/h01.jpg'], minutes: 3,
    en: { title: 'ANN - Flower Positions' },
    parts: [{
      id: 'ctl-bunga-a', kind: 'mcq', decks: ['D01'], topic: 'Constraint (rows/columns)', misconceptions: ['constraint-missed'],
      stem: 'Dari keempat kemungkinan penanaman (A, B, C, D) pada gambar, tentukan mana yang paling sesuai dengan aturan Ibu.',
      options: ['A', 'B', 'C', 'D'], answer: [2],
      why: [
        'Baris pertama: Mawar, Matahari, Mawar. Mawar muncul dua kali dalam satu baris.',
        'Kolom pertama berisi Lili putih, Matahari, Lili putih. Lili muncul dua kali dalam satu kolom.',
        'Setiap baris dan setiap kolom berisi tepat satu Mawar, satu Matahari, dan satu Lili (kotak latin).',
        'Baris kedua: Lili, Mawar, Lili. Lili muncul dua kali dalam satu baris.',
      ],
      explanation: 'Jawaban: **C**. Periksa tiap pilihan dengan memindai baris lalu kolom: pilihan yang valid harus memuat tiga jenis bunga berbeda di setiap baris dan setiap kolom. Strategi menyusun: isi baris pertama, lalu tiap sel berikutnya pilih jenis yang belum ada di kolomnya (dan barisnya); jika terjadi pelanggaran, tukar posisi bunga sebelumnya.',
      hints: ['Periksa setiap pilihan satu per satu: cari satu baris atau satu kolom yang memuat jenis bunga yang sama dua kali.', 'Pilihan yang benar tidak punya pelanggaran di semua 3 baris dan 3 kolom.'],
      en: { stem: 'Of the four planting layouts (A-D) in the figure, which best satisfies Mother\'s rule: no two flowers of the same kind in any row or column?' },
    }],
  },
  {
    id: 'ctl-rtr1', archetype: 'constraint', source: source('RTR - #1', [2, 3]),
    title: 'RTR - #1 Barisan Siswa',
    intro: 'Siswa SD bernama Adi, Boni, Ceria, Dian, dan Eko ditunjuk menjadi tim lomba baris-berbaris. Masing-masing siswa memiliki ketinggian yang berbeda. Mereka berbaris berurutan menghadap arah yang sama. Setiap siswa menghitung berapa banyak siswa yang lebih tinggi darinya di depannya dan di belakangnya. Hasilnya:\n\n| Nama Siswa | Lebih tinggi di depan | Lebih tinggi di belakang |\n|---|---|---|\n| Adi | 1 | 2 |\n| Boni | 3 | 1 |\n| Ceria | 1 | 0 |\n| Dian | 0 | 0 |\n| Eko | 2 | 0 |',
    minutes: 4,
    parts: [{
      id: 'ctl-rtr1-a', kind: 'mcq', decks: ['D01'], topic: 'Constraint (ordering)', misconceptions: ['constraint-missed'],
      stem: 'Bagaimana urutan mereka berbaris dari depan ke belakang?',
      options: ['Dian, Ceria, Adi, Boni, Eko', 'Dian, Adi, Ceria, Boni, Eko', 'Adi, Ceria, Dian, Eko, Boni', 'Dian, Adi, Eko, Boni, Ceria'],
      answer: [1],
      why: [
        'Adi di posisi ke-3 akan punya Dian dan Ceria (keduanya lebih tinggi) di depannya, padahal Adi hanya menghitung 1 di depan.',
        'Dian(5) Adi(2) Ceria(4) Boni(1) Eko(3): semua hitungan depan/belakang cocok dengan tabel.',
        'Adi di posisi pertama tidak mungkin: ia menghitung 1 siswa lebih tinggi di depannya.',
        'Eko di posisi ke-3 harus lebih tinggi dari Adi (Adi menghitung 2 lebih tinggi di belakang), sehingga Eko hanya punya 1 lebih tinggi di depan (Dian), padahal ia menghitung 2.',
      ],
      explanation: 'Jawaban: **B** (Dian, Adi, Ceria, Boni, Eko). Dian tidak punya siapa pun yang lebih tinggi di depan maupun di belakang, jadi Dian paling tinggi dan berada paling depan. Boni menghitung 3 di depan dan 1 di belakang dari total 5 orang, jadi Boni di posisi ke-4 dan paling pendek. Adi menghitung 2 lebih tinggi di belakangnya (Ceria dan Eko) dan Boni lebih pendek, sehingga Adi di posisi ke-2. Eko tidak punya yang lebih tinggi di belakangnya, jadi Eko di belakang Ceria, posisi terakhir. Tinggi: Dian 5, Ceria 4, Eko 3, Adi 2, Boni 1.',
      hints: ['Siapa yang tidak punya siapa pun lebih tinggi, baik di depan maupun di belakang?', 'Total 5 orang: jumlah lebih tinggi di depan + di belakang membantu menentukan posisi Boni.'],
      work: ['Dian (0, 0): paling tinggi dan posisi 1.', 'Boni (3, 1): 3 orang di depannya, 1 di belakang, posisi 4, paling pendek.', 'Adi (1, 2): hanya Dian di depan yang lebih tinggi, Ceria dan Eko di belakangnya lebih tinggi, posisi 2.', 'Eko tidak punya yang lebih tinggi di belakang, jadi di belakang Ceria: posisi 5.'],
      en: { stem: 'In what order do they line up, from front to back?' },
    }],
  },
  {
    id: 'ctl-rtr2', archetype: 'concept', source: source('RTR - #2', [3, 4]),
    title: 'RTR - #2 Botol Minyak Atsiri',
    intro: 'Kumi menghasilkan 37 liter minyak atsiri dan ingin mengemasnya dengan botol sesedikit mungkin. Ia punya botol berukuran 1, 2, 4, 8, 16, dan 32 liter.',
    minutes: 3,
    parts: [{
      id: 'ctl-rtr2-a', kind: 'mcq', decks: ['D01'], topic: 'Binary pattern / greedy', patterns: ['operators'],
      stem: 'Berapa jumlah paling sedikit botol yang digunakan Kumi untuk mengemas minyak atsiri tersebut?',
      options: ['1', '2', '3', '4'], answer: [2],
      why: ['Tidak ada botol 37 liter.', 'Tidak ada dua ukuran (boleh kembar) di antara 1, 2, 4, 8, 16, 32 yang berjumlah 37.', '32 + 4 + 1 = 37.', 'Ada solusi dengan 3 botol, jadi 4 bukan yang paling sedikit.'],
      explanation: 'Jawaban: **3 botol** (32 + 4 + 1 = 37). Tidak ada botol 37 liter dan tidak ada dua ukuran yang berjumlah 37, sehingga minimal 3. Secara biner 37 = 100101₂, yaitu tiga bit 1 (32, 4, 1): greedy dengan mengambil botol terbesar yang muat memberi jumlah botol minimum karena ukuran botol berupa pangkat dua.',
      hints: ['Ambil botol terbesar yang tidak melebihi sisa, lalu ulangi untuk sisanya.'],
      en: { stem: 'What is the smallest number of bottles Kumi needs to pack the oil?' },
    }],
  },
  {
    id: 'ctl-tebak-posisi', archetype: 'concept', source: source('ANN - Tebak Posisi', [4, 5]),
    title: 'ANN - Tebak Posisi',
    intro: 'Bobros menyimpan sebuah angka di antara 1 sampai 11 (keduanya termasuk). Bebras boleh menebak; jika tebakannya salah, ia boleh bertanya apakah angka yang dimaksud lebih besar atau lebih kecil dari tebakannya.',
    minutes: 3,
    parts: [{
      id: 'ctl-tebak-posisi-a', kind: 'short', decks: ['D01', 'D02'], topic: 'Binary search',
      stem: 'Jika angka yang disimpan Bobros adalah 9, berapa kali minimal Bebras harus menebak (salah) sebelum tebakannya benar, dengan menebak angka tengah setiap kali?',
      blanks: [{ label: 'Banyak tebakan salah', type: 'number', accept: ['1'], wrong: [{ match: '2', msg: 'Itu total tebakan (6, lalu 9). Kunci soal menghitung tebakan yang salah sebelum tebakan benar: hanya 1 (yaitu 6).' }] }],
      explanation: 'Jawaban kunci: **1 kali** (salah). Tebak angka tengah 6; salah, jawabannya "lebih besar". Sisa 7–11, tebak tengah 9: benar. Jadi satu tebakan salah sebelum tebakan yang benar (total 2 tebakan). Strategi membagi dua ini adalah binary search. Catatan: kalimat soal ambigu ("minimal"), karena menebak 9 langsung secara kebetulan butuh 0 salah; pembahasan sumber menghitung dengan strategi tengah-tengah.',
      hints: ['Tebak angka yang paling tengah di rentang, lalu persempit rentang setengahnya.'],
      en: { stem: 'If Bobros\'s number is 9, how many wrong guesses at minimum does Bebras make before guessing correctly, guessing the middle number each time?' },
    }],
  },
  {
    id: 'ctl-hrw1', archetype: 'trace', source: source('HRW - #1', [5, 6]),
    title: 'HRW - #1 Lompat Kotak',
    intro: 'Tatang bermain lompat kotak: 8 kotak berderet, tiap kotak berisi perintah arah dan jumlah perpindahan. L = kiri, R = kanan, 0 = tidak berpindah (contoh: 2L berpindah 2 kotak ke kiri, 3R 3 kotak ke kanan). Tatang menang jika berhasil mengunjungi seluruh kotak dengan mengikuti aturan pada kotak.\n\nSusunan kotak 1 sampai 8: `1R, 3R, 2L, 0, 3R, 1R, 3L, 2L`.',
    figures: ['fig/ctl/h06.jpg'], minutes: 3,
    parts: [{
      id: 'ctl-hrw1-a', kind: 'mcq', decks: ['D02'], topic: 'Following instructions', misconceptions: ['off-by-one'],
      stem: 'Agar Tatang menang, ia harus memulai dari kotak nomor:',
      options: ['1', '6', '5', '3', '8'], answer: [3],
      why: [
        'Dari 1: 1→2→5→8→6→7→4 (berhenti, 0); kotak 3 tidak dikunjungi.',
        'Dari 6: 6→7→4, berhenti. Hanya 3 kotak.',
        'Dari 5: 5→8→6→7→4, berhenti. Kotak 1, 2, 3 tidak dikunjungi.',
        'Dari 3: 3→1→2→5→8→6→7→4: kedelapan kotak terkunjungi tepat sekali.',
        'Dari 8: 8→6→7→4, berhenti.',
      ],
      explanation: 'Jawaban: **d. 3**. Simulasikan: 3 (2L) → 1 (1R) → 2 (3R) → 5 (3R) → 8 (2L) → 6 (1R) → 7 (3L) → 4 (0, berhenti). Delapan kotak semuanya dikunjungi. Karena kotak 4 berisi 0 (titik akhir), perjalanan pasti berakhir di 4; kotak 3 tidak bisa dicapai dari kotak mana pun, jadi harus jadi titik awal.',
      hints: ['Kotak mana yang tidak pernah menjadi tujuan lompatan dari kotak lain? Itu harus jadi kotak awal.'],
      work: ['Hitung tujuan setiap kotak: 1→2, 2→5, 3→1, 4→berhenti, 5→8, 6→7, 7→4, 8→6.', 'Kotak 3 tidak menjadi tujuan siapa pun, jadi mulai dari 3.', 'Urutan: 3,1,2,5,8,6,7,4 (semua 8 kotak).'],
      en: { stem: 'For Tatang to win, he must start from box number:' },
    }],
  },
  {
    id: 'ctl-hrw2', archetype: 'concept', source: source('HRW - #2', [6, 7]),
    title: 'HRW - #2 Armada Truk Tangki',
    intro: 'PT. SMJ punya truk tangki dengan kapasitas (harus terisi penuh saat memuat): Truk A 1.000 L (14 truk), Truk B 2.000 L (12 truk), Truk C 4.000 L (10 truk), Truk D 8.000 L (8 truk), Truk F 16.000 L (6 truk; di soal tertulis "Truk D" kedua kalinya, jelas salah ketik), dan Truk E 32.000 L (4 truk). Setiap truk dikemudikan satu pengemudi yang diupah per pengantaran, sehingga PT. SMJ ingin memakai pengemudi (truk) sesedikit mungkin.',
    minutes: 4,
    parts: [{
      id: 'ctl-hrw2-a', kind: 'mcq', decks: ['D01'], topic: 'Binary pattern / greedy', patterns: ['operators'],
      stem: 'Pelanggan di Bogor memesan 53.000 L. Tuliskan jenis truk apa saja yang harus diberangkatkan berikut jumlah armadanya!',
      options: ['4 unit E', '1 unit A, 1 unit C, 1 unit E, 1 unit F', '2 unit F', '3 unit A, 1 unit C, 3 unit E', '1 unit D, 1 unit E, 1 unit F'],
      answer: [1],
      why: [
        '4 × 32.000 = 128.000 L, jauh dari 53.000.',
        '1.000 + 4.000 + 32.000 + 16.000 = 53.000 L dengan 4 truk, jumlah minimum.',
        '2 × 16.000 = 32.000 L, kurang.',
        '3.000 + 4.000 + 96.000 = 103.000 L, melebihi.',
        '8.000 + 32.000 + 16.000 = 56.000 L, bukan 53.000.',
      ],
      explanation: 'Jawaban: **b**. 53.000 = 32.000 + 16.000 + 4.000 + 1.000 (biner 110101), jadi 1 truk E, 1 truk F, 1 truk C, dan 1 truk A: 4 truk. Karena kapasitas berupa pangkat dua dan tiap truk harus penuh, representasi biner memberi jumlah truk paling sedikit (tiap ukuran dipakai paling banyak sekali).',
      hints: ['Ubah 53 (ribu liter) ke bilangan biner; tiap bit 1 adalah satu truk.'],
      en: { stem: 'A customer in Bogor orders 53,000 L. Which truck types, and how many of each, must be dispatched?' },
    }],
  },
  {
    id: 'ctl-regu', archetype: 'concept', source: source('MUS - Perwakilan Regu', [8, 9]),
    title: 'MUS - Perwakilan Regu',
    intro: 'Pak Andi ingin memastikan setiap regu pramuka diwakili minimal 1 siswa yang hadir penjelasan, tanpa mengundang terlalu banyak siswa. Ia hanya tahu jumlah anggota tiap regu, bukan daftarnya. Contoh: untuk dua regu beranggota 2 dan 3, mengundang 4 siswa memastikan tiap regu terwakili. Ada 6 regu dengan anggota 5, 7, 6, 7, 8, dan 10 orang.',
    minutes: 4,
    parts: [{
      id: 'ctl-regu-a', kind: 'short', decks: ['D01'], topic: 'Worst case', 
      stem: 'Tentukan jumlah minimal siswa yang harus diundang Pak Andi untuk memastikan setiap regu pasti terwakili minimal 1 orang.',
      blanks: [{ label: 'Jumlah siswa', type: 'number', accept: ['39'], wrong: [{ match: '38', msg: 'Kasus terburuk: 38 siswa bisa saja semuanya berasal dari 5 regu terbesar. Tambahkan 1 lagi.' }, { match: '43', msg: 'Itu total semua siswa (5+7+6+7+8+10 = 43 mencakup regu terkecil utuh). Cukup 1 dari regu terkecil.' }] }],
      explanation: 'Jawaban: **39 siswa**. Kasus terburuk: semua undangan jatuh pada regu-regu terbesar. Agar regu terkecil (5 orang) pun terwakili, undang semua anggota 5 regu lainnya lalu 1 lagi: 7 + 6 + 7 + 8 + 10 + 1 = 39. Rumus: total − anggota regu terkecil + 1 = 43 − 5 + 1 = 39.',
      hints: ['Bayangkan kasus terburuk: undangan terpakai habis oleh regu yang besar.'],
      en: { stem: 'What is the minimum number of students Pak Andi must invite so that every squad is guaranteed at least one representative?' },
    }],
  },
  {
    id: 'ctl-tebak-angka', archetype: 'concept', source: source('MUS - Menebak Angka', [9]),
    title: 'MUS - Menebak Angka',
    intro: 'Andi memilih bilangan bulat antara 1 dan 100 (inklusif). Binti menebak; Andi menjawab benar, terlalu kecil, atau terlalu besar. Binti boleh menebak lagi sampai benar.',
    minutes: 3,
    parts: [{
      id: 'ctl-tebak-angka-a', kind: 'short', decks: ['D01', 'D02'], topic: 'Binary search',
      stem: 'Apabila Binti menggunakan strategi yang tepat, berapa kali jumlah maksimal tebakan yang benar-benar ia perlukan?',
      blanks: [{ label: 'Tebakan maksimal', type: 'number', accept: ['7'], wrong: [{ match: '6', msg: '2^6 = 64 < 100, belum cukup menutup 100 kemungkinan.' }, { match: '100', msg: 'Itu pencarian linear. Dengan membagi dua setiap kali jauh lebih sedikit.' }] }],
      explanation: 'Jawaban: **7 tebakan**. Dengan binary search tiap tebakan membagi dua kemungkinan; k tebakan menutup hingga 2^k − 1 bilangan (dengan jawaban benar/kecil/besar). Karena 2^6 = 64 < 100 ≤ 2^7 = 128, diperlukan paling banyak 7 tebakan.',
      hints: ['Tebak bilangan tengah; setiap tebakan menyingkirkan setengah kemungkinan.'],
      en: { stem: 'Using the best strategy, what is the maximum number of guesses Binti needs?' },
    }],
  },
  {
    id: 'ctl-lsh1', archetype: 'constraint', source: source('LSH - #1', [10]),
    title: 'LSH - #1 Rute Wisata Djogja',
    intro: 'Misyka menginap di The Phoenix Hotel (A) dan ingin mengunjungi empat tempat wisata (B, C, D, E) malam ini lalu kembali ke hotel, dengan total waktu tempuh tidak lebih dari 76 menit. Peta (waktu dalam menit): A–B 16, A–E 22, A–D 14, D–E 7, D–C 19, B–E 4, B–C 18, E–C 23. Tidak ada jalan langsung A–C maupun B–D.',
    figures: ['fig/ctl/h10.jpg'], minutes: 4,
    parts: [{
      id: 'ctl-lsh1-a', kind: 'mcq', decks: ['D01', 'D02'], topic: 'Shortest route / constraint', misconceptions: ['constraint-missed'],
      stem: 'Tentukan urutan perjalanan dari hotel menuju keempat tempat wisata dan kembali ke hotel dengan waktu tempuh tidak lebih dari 76 menit.',
      options: ['A-D-E-D-C-A', 'A-D-E-B-C-D-A', 'A-D-C-B-A', 'A-D-E-C-B-A'], answer: [1],
      why: [
        'Tidak ada jalan C–A langsung, rute tidak valid.',
        '14 + 7 + 4 + 18 + 19 + 14 = 76 menit dan B, C, D, E semuanya dikunjungi.',
        'Tidak mengunjungi E (dan 14 + 19 + 18 + 16 = 67).',
        '14 + 7 + 23 + 18 + 16 = 78 menit, melebihi 76.',
      ],
      explanation: 'Jawaban: **A-D-E-B-C-D-A** = 14 + 7 + 4 + 18 + 19 + 14 = 76 menit, memenuhi batas dan mengunjungi B, C, D, E. Pilihan 1 memakai jalan A–C yang tidak ada; pilihan 3 melewatkan E; pilihan 4 memakan 78 menit. Dua syarat yang harus dicek bersamaan: semua tempat dikunjungi, dan total ≤ 76.',
      hints: ['Untuk tiap pilihan cek dua hal: apakah semua jalan ada di peta, dan apakah B, C, D, E semua dikunjungi.', 'Jumlahkan waktu tiap ruas.'],
      en: { stem: 'Find the route from the hotel through all four sights and back, taking at most 76 minutes.' },
    }],
  },
  {
    id: 'ctl-lsh2', archetype: 'constraint', source: source('LSH - #2', [11, 12]),
    title: 'LSH - #2 Arkeolog dan Benda Berharga',
    intro: 'Seorang arkeolog menemukan 3 patung prajurit (masing-masing $1 juta, 2 kg), 2 tablet ($10 juta, 6 kg masing-masing), 1 topeng ($13 juta, 8 kg), dan 1 artefak ($7 juta, 3 kg). Kapasitas tas 10 kg. Pilih benda dengan nilai setinggi mungkin dan bobot tidak lebih dari 10 kg.',
    figures: ['fig/ctl/h11.jpg'], minutes: 3,
    parts: [{
      id: 'ctl-lsh2-a', kind: 'mcq', decks: ['D01'], topic: 'Knapsack / constraint', misconceptions: ['constraint-missed'],
      stem: 'Manakah pilihan benda dengan nilai tertinggi yang bobotnya tidak lebih dari 10 kg?',
      options: ['Topeng, Artefak', '3 Patung Prajurit, Artefak', 'Topeng, 1 Patung Prajurit', 'Artefak, 1 Tablet'], answer: [3],
      why: ['8 + 3 = 11 kg, melebihi kapasitas.', '6 + 3 = 9 kg, nilai $10 juta.', '8 + 2 = 10 kg, nilai $14 juta.', '3 + 6 = 9 kg, nilai $17 juta (tertinggi).'],
      explanation: 'Jawaban: **Artefak + 1 Tablet** (9 kg, $17 juta). Topeng + Artefak melanggar batas berat (11 kg). Di antara pilihan yang sah: $10 juta, $14 juta, $17 juta. Memilih benda termahal (topeng) tidak menghasilkan nilai tertinggi: ini pelajaran knapsack. Catatan: di PDF sumber, kunci "17 menit" yang tercetak setelah soal ini sebenarnya milik soal penyeberangan jembatan (lihat soal berikutnya); jawaban soal arkeolog dihitung sendiri.',
      hints: ['Hitung total bobot dan total nilai tiap pilihan; coret yang melebihi 10 kg.'],
      en: { stem: 'Which selection has the highest value while weighing no more than 10 kg?' },
    }],
  },
  {
    id: 'ctl-jembatan', archetype: 'concept',
    source: source('LSH - #2 (kunci)', [12]),
    title: 'Penyeberangan Jembatan dengan Senter (stem direkonstruksi)',
    intro: 'CATATAN: teks soal ini tidak tercetak di PDF; hanya kunci dan pembahasannya (hal. 12) yang ada. Stem di bawah direkonstruksi dari pembahasan: empat orang A, B, C, D menyeberangi jembatan sempit pada malam hari dengan satu senter; paling banyak dua orang menyeberang sekaligus (kecepatan ditentukan yang lebih lambat); senter harus dibawa kembali. A memerlukan 1 menit, B 2 menit, C 5 menit, D 10 menit.',
    minutes: 4,
    parts: [{
      id: 'ctl-jembatan-a', kind: 'short', decks: ['D02'], topic: 'Step optimisation',
      stem: 'Berapa waktu total paling singkat agar keempat orang menyeberang? (A = 1, B = 2, C = 5, D = 10 menit; direkonstruksi dari kunci.)',
      blanks: [{ label: 'Menit', type: 'number', accept: ['17'], wrong: [{ match: '19', msg: 'Itu strategi "yang tercepat mengantar semua" (2+1+5+1+10 = 19). Ada yang lebih baik: biarkan dua yang paling lambat menyeberang bersama.' }] }],
      explanation: 'Jawaban kunci: **17 menit**. A+B menyeberang (2), A kembali (1), C+D menyeberang (10), B kembali (2), A+B menyeberang (2): 2 + 1 + 10 + 2 + 2 = 17. Alternatif: A+B (2), B kembali (2), C+D (10), A kembali (1), A+B (2) = 17. Kunci: dua orang paling lambat menyeberang bersama agar waktu 10 menit hanya dibayar sekali. Telah diverifikasi dengan pencarian lengkap: 17 adalah minimum.',
      hints: ['Siapa yang sebaiknya membawa senter kembali?', 'Pasangkan dua orang paling lambat agar waktu mereka hanya dihitung sekali.'],
      en: { stem: 'What is the least total time for all four to cross? (A = 1, B = 2, C = 5, D = 10 minutes; reconstructed from the key.)' },
    }],
  },
  {
    id: 'ctl-timbangan', archetype: 'concept', source: source('MAA - Timbangan Rusak', [13, 14]),
    title: 'MAA - Timbangan Rusak',
    intro: 'Dona punya tiga kucing: Nero, Champagne, dan Magnum. Hasil penimbangan berpasangan: Nero + Champagne = 18 kg, Champagne + Magnum = 26 kg, Nero + Magnum = 20 kg. Timbangan lalu rusak sebelum ketiganya bisa ditimbang bersama.',
    minutes: 3,
    parts: [{
      id: 'ctl-timbangan-a', kind: 'short', decks: ['D01'], topic: 'Abstraction / equations',
      stem: 'Berapa berat ketiga kucing bila ditimbang bersama (Nero + Champagne + Magnum), tanpa timbangan?',
      blanks: [{ label: 'Berat (kg)', type: 'number', accept: ['32'], wrong: [{ match: '64', msg: '64 adalah jumlah ketiga pasangan, yang menghitung tiap kucing dua kali. Bagi dua.' }] }],
      explanation: 'Jawaban: **32 kg**. N + C = 18, C + M = 26, N + M = 20. Jumlahkan: 2N + 2C + 2M = 64, sehingga N + C + M = 32. Setiap kucing muncul tepat dua kali di jumlah ketiga pasangan, jadi cukup dibagi dua.',
      hints: ['Jumlahkan ketiga persamaan; berapa kali tiap kucing terhitung?'],
      en: { stem: 'What do all three cats weigh together?' },
    }],
  },
  {
    id: 'ctl-labirin', archetype: 'robot', source: source('KPR - Keluar dari Labirin', [14, 15, 16]),
    title: 'KPR - Keluar dari Labirin',
    intro: 'Mira memasuki labirin dari bawah (segitiga hitam) dan harus mencapai pintu keluar di atas (lingkaran merah). Segitiga menandakan arah hadap Mira. Mira hanya mengingat empat gerakan: **A** = berjalan satu langkah maju lalu menghadap ke kiri; **B** = satu langkah maju lalu menghadap ke kanan; **C** = dua langkah maju lalu menghadap ke kiri; **D** = dua langkah maju lalu menghadap ke kanan. Ia membentuk satu gerakan panjang dari empat gerakan tersebut (satu gerakan boleh diulang), dan urutan tertentu membawanya keluar dengan **dua kali perulangan** (blok loop 4 gerakan dijalankan 2 kali).',
    figures: ['fig/ctl/h15.jpg'], minutes: 4,
    parts: [{
      id: 'ctl-labirin-a', kind: 'mcq', decks: ['D02'], topic: 'Robot repeat', patterns: ['for-count'], misconceptions: ['repeat-count'],
      stem: 'Urutan gerakan manakah di bawah ini yang dapat membawa Mira keluar dari labirin dengan dua kali perulangan?',
      options: ['A, B, C, D', 'D, A, A, D', 'C, B, D, A', 'C, A, A, D'], answer: [1],
      explanation: 'Jawaban: **D, A, A, D**. Jalur pada gambar pembahasan (hal. 16): dari segitiga, D (2 langkah maju, hadap kanan), A (1 langkah, hadap kiri), A (1 langkah, hadap kiri), D (2 langkah, hadap kanan); lalu seluruh blok diulang sekali lagi sehingga Mira tiba di lingkaran merah. Blok loop menghemat penulisan: urutan 4 gerakan ditulis sekali dan diulang 2×.',
      hints: ['Mulai dari segitiga: gerakan pertama harus 2 langkah ke atas karena ada dinding di dekat awal.', 'Simulasikan satu putaran, lalu putaran kedua mulai dari posisi/arah akhir putaran pertama.'],
      en: { stem: 'Which sequence of moves takes Mira out of the maze when the 4-move block is repeated twice?' },
    }],
  },
  {
    id: 'ctl-arabot', archetype: 'constraint', source: source('KPR - Perjalanan Arabot', [17, 18]),
    title: 'KPR - Perjalanan Arabot',
    intro: 'Arabot berjalan dari titik awal (A, B, atau C) hingga stasiun pengisian batere (titik merah). Di setiap persimpangan (titik ungu) ia memilih jalur sesuai label arah pada jalur sebelumnya: L = belok kiri, R = belok kanan. Arabot tidak boleh mampir ke titik awal mana pun karena akan segera dimatikan. Enam label hilang (kotak 1–6).',
    figures: ['fig/ctl/h17.jpg'], minutes: 5,
    parts: [{
      id: 'ctl-arabot-a', kind: 'constraint', decks: ['D01', 'D02'], topic: 'Graphs / constraint', shape: 'assign',
      stem: 'Agar Arabot selalu tiba di titik merah (apa pun titik awalnya A, B, atau C), tentukan label (L atau R) dari kotak 1 hingga 6.',
      entities: ['1', '2', '3', '4', '5', '6'], slots: ['L', 'R'],
      check: r`def check(ans):
    exp = {'1': 'L', '2': 'R', '3': 'L', '4': 'R', '5': 'R', '6': 'L'}
    why = {
        '1': 'Kotak 1 dilalui dari B: agar tidak menuju C, harus L.',
        '2': 'Kotak 2 dilalui dari C: agar tidak menuju B, harus R.',
        '3': 'Kotak 3 dilalui dari B atau C: agar tidak menuju A, harus L.',
        '4': 'Kotak 4: jika L, Arabot berputar kembali dan tidak ke titik merah, jadi harus R.',
        '5': 'Kotak 5 dilalui dari A (karena kotak 3 = L): agar menuju titik merah harus R.',
        '6': 'Kotak 6 harus L agar Arabot dapat menuju titik merah (berpasangan dengan kotak 4 = R).',
    }
    why_en = {
        '1': 'Box 1 is passed from B: to avoid heading to C, it must be L.',
        '2': 'Box 2 is passed from C: to avoid heading to B, it must be R.',
        '3': 'Box 3 is passed from B or C: to avoid heading to A, it must be L.',
        '4': 'Box 4: if L, Arabot loops back and does not reach the red point, so it must be R.',
        '5': 'Box 5 is passed from A (because box 3 = L): to reach the red point it must be R.',
        '6': 'Box 6 must be L so that Arabot can reach the red point (paired with box 4 = R).',
    }
    msgs = []
    for k in ['1', '2', '3', '4', '5', '6']:
        v = ans.get(k)
        if v is None:
            msgs.append(['Kotak ' + k + ' belum diisi.', 'Box ' + k + ' is not filled in yet.'])
        elif v != exp[k]:
            msgs.append([why[k], why_en[k]])
    return msgs`,
      solution: { '1': 'L', '2': 'R', '3': 'L', '4': 'R', '5': 'R', '6': 'L' },
      explanation: 'Jawaban: **L, R, L, R, R, L**. Kotak 1 (dari B): L agar tidak ke C. Kotak 2 (dari C): R agar tidak ke B. Kotak 3 (dari B atau C): L agar tidak ke A. Kotak 4: R, karena L membuat Arabot berputar kembali tanpa mencapai titik merah; kotak 6 = L agar menuju titik merah. Kotak 5 dilalui dari A (karena kotak 3 = L) sehingga harus R. Kerangka berpikir: aktivitas berurutan dimodelkan sebagai graf (struktur data).',
      hints: ['Mulai dari kotak yang punya hanya satu penyebab (1, 2, 3): label harus menghindari titik awal lain.', 'Lalu telusuri dari A dan dari persimpangan terakhir menuju titik merah.'],
      en: { stem: 'So that Arabot always reaches the red station from A, B or C, give the labels (L or R) of boxes 1 to 6.' },
    }],
  },
  {
    id: 'ctl-mobil', archetype: 'concept', source: source('SWJ - Mobil yang hilang', [19, 20]),
    title: 'SWJ - Mobil yang hilang',
    intro: 'Sebuah mobil tanpa pengemudi kehabisan baterai di sebuah tempat parkir. Sensor di atap mengukur setiap objek di sekitarnya dengan dua nilai: sudut (0° = depan mobil, diukur 360°) dan jarak. Contoh: [(0,10),(90,5),(180,4)]. Mobil yang hilang mengirim hasil sensor [(0,5),(90,4),(180,5),(270,12)]. Peta tempat parkir memuat empat mobil: kuning, merah, biru, dan putih.',
    figures: ['fig/ctl/h19.jpg'], minutes: 4,
    parts: [{
      id: 'ctl-mobil-a', kind: 'mcq', decks: ['D01'], topic: 'Abstraction / pattern matching',
      stem: 'Mobil manakah yang hilang berdasarkan hasil sensor ini?',
      options: ['Kuning', 'Merah', 'Biru', 'Putih'], answer: [1],
      explanation: 'Jawaban kunci: **Mobil B (Merah)**. Pembahasan tidak tercetak di sumber; cara memeriksanya: untuk tiap mobil, putar sudut mengikuti arah hadapnya (0° depan, 90° kanan, 180° belakang, 270° kiri), lalu cocokkan jarak ke objek terdekat di setiap arah dengan (5, 4, 5, 12). Mobil merah menghadap kiri, objek depannya 5, objek di kanan 4, di belakang 5, dan di kiri jauh (12). Kunci diambil dari sumber; kecocokan jarak dibaca dari gambar.',
      hints: ['Perhatikan arah hadap tiap mobil: sudut 0° selalu searah hadap mobil.', 'Cari mobil yang punya objek dekat di depan, kanan, dan belakang, tetapi ruang kosong yang jauh di kirinya.'],
      en: { stem: 'Which car is the missing one, given this sensor reading?' },
    }],
  },
  {
    id: 'ctl-klub', archetype: 'concept', source: source('SWJ - Klub Berbagi Buku', [20, 21]),
    title: 'SWJ - Klub Berbagi Buku',
    intro: 'Tujuh siswa membentuk klub berbagi buku. Seorang siswa yang mendapat buku baru meminjamkannya hanya ke sahabatnya. Jika punya beberapa sahabat, sahabat paling muda yang belum pernah meminjam dipinjami lebih dulu. Jika semua sahabat sudah pernah meminjam, buku dikembalikan ke siswa yang meminjamkannya kepadanya. Diagram (nama dan umur): Ben 11, Tom 17, Ted 10, Bill 10, Kim 12, Anna 9, Sara 18. Persahabatan: Ben–Tom, Ben–Ted, Ben–Kim, Tom–Bill, Ted–Bill, Ted–Anna, Ted–Kim, Ted–Sara, Bill–Anna, Anna–Sara.',
    figures: ['fig/ctl/h21.jpg'], minutes: 5,
    parts: [{
      id: 'ctl-klub-a', kind: 'mcq', decks: ['D01', 'D02'], topic: 'Graph traversal (DFS)',
      stem: 'Ben selesai membaca sebuah buku baru dan ingin berbagi dengan semua anggota klub; selain Ben belum ada yang pernah membacanya. Siapa yang akan menjadi pembaca terakhir dari buku tersebut?',
      options: ['Bill', 'Sara', 'Tom', 'Kim'], answer: [3],
      why: ['Bill dipinjami sebelum Tom dan Sara.', 'Sara dipinjami sebelum Kim (Ted meminjamkan ke Kim hanya setelah kembali dari Anna).', 'Tom dipinjami lewat Bill sebelum Sara.', 'Kim adalah yang terakhir dipinjami.'],
      explanation: 'Jawaban: **Kim**. Telusuri (depth-first, sahabat termuda dulu): Ben → Ted (10, termuda di antara Tom 17, Ted 10, Kim 12) → Anna (9) → Bill (10) → Tom (17) → kembali ke Bill, Anna → Sara (18) → kembali ke Anna, Ted → Kim (12). Urutan pembaca: Ben, Ted, Anna, Bill, Tom, Sara, Kim. Pembaca terakhir: Kim. Ini adalah depth-first search pada graf.',
      hints: ['Simulasikan: tiap kali pilih sahabat termuda yang belum meminjam; bila tidak ada, kembali ke peminjam sebelumnya (backtrack).'],
      work: ['Ben → Ted (10).', 'Ted → Anna (9), Anna → Bill (10), Bill → Tom (17).', 'Tom tidak punya sahabat baru: kembali ke Bill, ke Anna.', 'Anna → Sara (18), lalu kembali ke Anna, Ted.', 'Ted → Kim (12): pembaca terakhir.'],
      en: { stem: 'Ben has finished a new book and shares it with all club members. Who will be the last reader?' },
    }],
  },
  {
    id: 'ctl-toples', archetype: 'concept', source: source('WAK - #1', [21, 22, 23]),
    title: 'WAK - #1 Toples Permen',
    intro: 'Ada empat toples dengan jumlah permen awal yang sama. Ali mengambil tepat 3 permen sekali ambil dari toples 1, Badu 5 dari toples 2, Cecep 7 dari toples 3, dan Dedi 9 dari toples 4. Suatu saat toples 1 bersisa 2, toples 2 bersisa 3, toples 3 bersisa 2, dan toples 4 bersisa kurang dari 9 butir (tidak diketahui).',
    minutes: 5,
    parts: [{
      id: 'ctl-toples-a', kind: 'short', decks: ['D01'], topic: 'Decomposition / patterns', patterns: ['operators'],
      stem: 'Berapa sisa permen pada toples nomor 4?',
      blanks: [{ label: 'Sisa permen', type: 'number', accept: ['5'], wrong: [{ match: '23', msg: '23 adalah jumlah permen awal. Soal menanyakan sisa di toples 4: 23 mod 9.' }] }],
      explanation: 'Jawaban: **5**. Jumlah permen awal N memenuhi N mod 3 = 2, N mod 5 = 3, N mod 7 = 2. Tulis barisan aritmetika mulai dari toples dengan langkah terbesar: toples 3: 2, 9, 16, 23; toples 2: 3, 8, 13, 18, 23; toples 1: 2, 5, 8, 11, 14, 17, 20, 23. Nilai yang sama di ketiga barisan: 23 (jumlah awal terkecil yang memenuhi; soal mengasumsikan toples 4 tersisa < 9). Sisa toples 4 = 23 mod 9 = 5. Dekomposisi: cari jumlah awal dulu; pattern recognition: seperti KPK dengan sisa; abstraksi: barisan aritmetika.',
      hints: ['Cari dulu berapa jumlah permen awal dari toples 1–3.', 'Jumlah awal N: N ≡ 2 (mod 3), N ≡ 3 (mod 5), N ≡ 2 (mod 7).'],
      en: { stem: 'How many candies are left in jar 4?' },
    }],
  },
  {
    id: 'ctl-cabai', archetype: 'concept', source: source('AAS - Memanen Cabai', [23, 24, 25]),
    title: 'AAS - Memanen Cabai',
    intro: 'Tanaman cabai ditata dalam kotak 5×5; angka tiap kotak adalah jumlah cabai:\n\n| 0 | 1 | 2 | 3 | 10 |\n|---|---|---|---|---|\n| 10 | 2 | 10 | 10 | 5 |\n| 5 | 3 | 6 | 5 | 0 |\n| 0 | 4 | 0 | 2 | 3 |\n| 20 | 5 | 1 | 0 | 0 |\n\nAgria mulai dari kotak mana pun di kolom paling kiri dan berhenti di kotak mana pun di kolom paling kanan. Ia hanya bisa bergerak ke kotak tepat di kanan atau tepat di bawah kotak saat ini.',
    figures: ['fig/ctl/h23.jpg'], minutes: 5,
    parts: [{
      id: 'ctl-cabai-a', kind: 'short', decks: ['D01', 'D02'], topic: 'Path optimisation (pruning)',
      stem: 'Berapa banyak jumlah cabai terbanyak yang bisa Agria petik?',
      blanks: [{ label: 'Jumlah cabai', type: 'number', accept: ['42'], wrong: [{ match: '41', msg: '41 adalah maksimum bila Agria memaksa mengambil tanaman 20 cabai. Ada jalur lain yang lebih baik.' }] }],
      explanation: 'Jawaban: **42**. Jalur terbaik: mulai dari 10 (baris 2, kolom 1), ke kanan melewati 2, 10, 10, turun ke 5 dan 2, lalu ke kanan ke 3: 10 + 2 + 10 + 10 + 5 + 2 + 3 = 42 (diverifikasi dengan pemrograman dinamis). Strategi serakah "kejar angka terbesar (20)" gagal: jalur yang melewati 20 maksimal 41. Memeriksa semua jalur sambil membuang yang pasti buruk adalah pruning.',
      hints: ['Mengambil tanaman 20 cabai belum tentu terbaik. Bandingkan beberapa jalur.', 'Untuk tiap kotak, nilai terbaik = isi kotak + max(terbaik dari kanan, terbaik dari bawah).'],
      en: { stem: 'What is the largest number of chillies Agria can pick?' },
    }],
  },
  {
    id: 'ctl-bakso', archetype: 'concept', source: source('AAS - Bisnis Bakso', [25, 26, 27, 28]),
    title: 'AAS - Bisnis Bakso',
    intro: 'Agria, Bogoria, dan Pertania membuka kedai bakso (biasa, spesial, nuklir), dan bekerja bersamaan (paralel) di tempat kerja masing-masing.\n\n| Pembuat | Bakso biasa | Bakso spesial | Bakso nuklir |\n|---|---|---|---|\n| Agria | 1 menit | 2 menit | 5 menit |\n| Bogoria | 2 menit | 2 menit | 3 menit |\n| Pertania | tidak bisa | tidak bisa | 2 menit |\n\nPesanan: 3 bakso biasa, 3 bakso spesial, dan 2 bakso nuklir.',
    minutes: 5,
    parts: [{
      id: 'ctl-bakso-a', kind: 'short', decks: ['D01', 'D02'], topic: 'Task allocation',
      stem: 'Berapa menit waktu minimal yang dibutuhkan untuk membuat seluruh pesanan tersebut?',
      blanks: [{ label: 'Menit', type: 'number', accept: ['5'], wrong: [{ match: '6', msg: '6 menit bila semua bakso spesial diberikan ke Bogoria. Bagikan satu ke Agria yang sudah selesai di menit ke-3.' }] }],
      explanation: 'Jawaban: **5 menit**. Karena ketiganya bekerja paralel, waktu total adalah waktu terlama. Alokasi: Agria 3 bakso biasa (3) + 1 bakso spesial (2) = 5 menit; Bogoria 2 bakso spesial = 4 menit; Pertania 2 bakso nuklir = 4 menit. Strategi: serahkan tiap jenis ke yang tercepat (biasa ke Agria, nuklir ke Pertania), lalu bagi bakso spesial ke orang dengan beban terkecil. Diverifikasi dengan pencarian lengkap: tidak ada alokasi yang lebih cepat dari 5 menit. Abstraksi: siapa dan benda apa tidak penting; yang penting alokasi pekerjaan.',
      hints: ['Karena kerja paralel, waktu total = waktu orang yang paling lama bekerja.', 'Berikan tiap jenis bakso ke yang paling cepat, lalu seimbangkan beban.'],
      work: ['Biasa ke Agria: 3 menit. Nuklir ke Pertania: 4 menit.', 'Spesial: Bogoria 2 buah (4 menit), 1 buah ke Agria yang sudah selesai di menit 3 (selesai menit 5).', 'Waktu total = max(5, 4, 4) = 5 menit.'],
      en: { stem: 'What is the minimum time in minutes to make the whole order?' },
    }],
  },
]

export const bank: BankFile = {
  problems,
  papers: [{
    id: 'ctl', title: 'UTS CT tahun lalu (kumpulan soal Bebras-style)', kind: 'tahunlalu' as const, lang: 'id' as const, minutes: 90,
    note: 'A collection of computational-thinking challenges (Bebras style); the Level/Status/Reviewer metadata is ignored. The "LSH - #2" problem in the PDF carries the key "17 minutes", which actually belongs to the bridge-and-flashlight problem whose text is not printed (reconstructed as ctl-jembatan). Some explanations are missing from the source and were rewritten.',
    noteId: 'Kumpulan tantangan berpikir komputasional (gaya Bebras); metadata Level/Status/Reviewer diabaikan. Soal "LSH - #2" di PDF memuat kunci "17 menit" yang sebenarnya milik soal jembatan-senter yang teks soalnya tidak tercetak (direkonstruksi sebagai ctl-jembatan). Beberapa pembahasan tidak ada di sumber dan ditulis ulang.',
    problems: problems.map(p => p.id),
  }],
}

/* ------------------------------ English mirror (Indonesian source items) ------------------------------ */

interface EnPatch { en?: Record<string, unknown>; bw?: string[][] }

const PROBLEM_EN: Record<string, { title?: string; intro: string }> = {
  'ctl-bunga': { intro: "Mother Bebras plants Sunflowers, Roses and White Lilies in 9 plots (3×3). The rule: no two flowers of the same kind in the same row, and no two flowers of the same kind in the same column." },
  'ctl-rtr1': { title: 'RTR - #1 Student Line-up', intro: "The primary-school students Adi, Boni, Ceria, Dian and Eko are chosen as a marching team. Every student has a different height. They line up one behind another facing the same direction. Each student counts how many students taller than himself or herself are in front and behind. The result:\n\n| Student | Taller in front | Taller behind |\n|---|---|---|\n| Adi | 1 | 2 |\n| Boni | 3 | 1 |\n| Ceria | 1 | 0 |\n| Dian | 0 | 0 |\n| Eko | 2 | 0 |" },
  'ctl-rtr2': { title: 'RTR - #2 Essential Oil Bottles', intro: "Kumi produces 37 litres of essential oil and wants to pack it in as few bottles as possible. She has bottles of 1, 2, 4, 8, 16 and 32 litres." },
  'ctl-tebak-posisi': { title: 'ANN - Guess the Position', intro: "Bobros keeps a number between 1 and 11 (both included). Bebras may make a guess; if the guess is wrong, he may ask whether the number is larger or smaller than the guess." },
  'ctl-hrw1': { title: 'HRW - #1 Box Hopping', intro: "Tatang plays box hopping: 8 boxes in a row, each box holding an instruction with a direction and a number of moves. L = left, R = right, 0 = do not move (example: 2L moves 2 boxes to the left, 3R 3 boxes to the right). Tatang wins if he manages to visit all the boxes by following the rules on the boxes.\n\nThe arrangement of boxes 1 to 8: `1R, 3R, 2L, 0, 3R, 1R, 3L, 2L`." },
  'ctl-hrw2': { title: 'HRW - #2 Tanker Truck Fleet', intro: "PT. SMJ has tanker trucks with these capacities (a truck must be filled completely when loading): Truck A 1,000 L (14 trucks), Truck B 2,000 L (12 trucks), Truck C 4,000 L (10 trucks), Truck D 8,000 L (8 trucks), Truck F 16,000 L (6 trucks; the problem prints \"Truck D\" a second time, clearly a typo), and Truck E 32,000 L (4 trucks). Each truck is driven by one driver who is paid per delivery, so PT. SMJ wants to use as few drivers (trucks) as possible." },
  'ctl-regu': { title: 'MUS - Squad Representatives', intro: "Pak Andi wants to make sure every scout squad is represented by at least 1 student attending an explanation session, without inviting too many students. He only knows the number of members in each squad, not the lists. Example: for two squads with 2 and 3 members, inviting 4 students guarantees each squad is represented. There are 6 squads with 5, 7, 6, 7, 8 and 10 members." },
  'ctl-tebak-angka': { title: 'MUS - Guessing the Number', intro: "Andi chooses an integer between 1 and 100 (inclusive). Binti guesses; Andi answers correct, too small or too large. Binti may keep guessing until she is right." },
  'ctl-lsh1': { title: 'LSH - #1 Yogyakarta Tour Route', intro: "Misyka stays at The Phoenix Hotel (A) and wants to visit four tourist spots (B, C, D, E) tonight and then return to the hotel, with a total travel time of no more than 76 minutes. The map (time in minutes): A–B 16, A–E 22, A–D 14, D–E 7, D–C 19, B–E 4, B–C 18, E–C 23. There is no direct road A–C or B–D." },
  'ctl-lsh2': { title: 'LSH - #2 The Archaeologist and the Valuables', intro: "An archaeologist finds 3 warrior statues ($1 million, 2 kg each), 2 tablets ($10 million, 6 kg each), 1 mask ($13 million, 8 kg) and 1 artefact ($7 million, 3 kg). The bag capacity is 10 kg. Choose items with the highest possible value and a weight of no more than 10 kg." },
  'ctl-jembatan': { title: 'Bridge Crossing with a Flashlight (stem reconstructed)', intro: "NOTE: the text of this problem is not printed in the PDF; only the key and its explanation (p. 12) exist. The stem below is reconstructed from the explanation: four people A, B, C, D cross a narrow bridge at night with one flashlight; at most two people cross at a time (the speed is that of the slower one); the flashlight must be brought back. A needs 1 minute, B 2 minutes, C 5 minutes, D 10 minutes." },
  'ctl-timbangan': { title: 'MAA - The Broken Scale', intro: "Dona has three cats: Nero, Champagne and Magnum. The pairwise weighings gave: Nero + Champagne = 18 kg, Champagne + Magnum = 26 kg, Nero + Magnum = 20 kg. Then the scale broke before all three could be weighed together." },
  'ctl-labirin': { title: 'KPR - Escaping the Maze', intro: "Mira enters a maze from the bottom (black triangle) and must reach the exit at the top (red circle). The triangle shows the direction Mira faces. Mira remembers only four moves: **A** = walk one step forward, then face left; **B** = one step forward, then face right; **C** = two steps forward, then face left; **D** = two steps forward, then face right. She forms one long move from these four moves (a move may be repeated), and a certain sequence takes her out with **two repetitions** (a loop block of 4 moves executed 2 times)." },
  'ctl-arabot': { title: "KPR - Arabot's Journey", intro: "Arabot walks from a starting point (A, B or C) to the battery charging station (the red point). At every junction (purple point) it chooses the path according to the direction label on the previous path: L = turn left, R = turn right. Arabot must not pass through any starting point because it would be switched off immediately. Six labels are missing (boxes 1–6)." },
  'ctl-mobil': { title: 'SWJ - The Missing Car', intro: "A driverless car runs out of battery in a car park. The sensor on its roof measures every object around it with two values: angle (0° = front of the car, measured over 360°) and distance. Example: [(0,10),(90,5),(180,4)]. The missing car sends the sensor reading [(0,5),(90,4),(180,5),(270,12)]. The car-park map contains four cars: yellow, red, blue and white." },
  'ctl-klub': { title: 'SWJ - The Book Sharing Club', intro: "Seven students form a book-sharing club. A student who gets a new book lends it only to his or her friends. If he or she has several friends, the youngest friend who has not yet borrowed it is lent to first. If all friends have already borrowed it, the book is returned to the student who lent it to him or her. Diagram (name and age): Ben 11, Tom 17, Ted 10, Bill 10, Kim 12, Anna 9, Sara 18. Friendships: Ben–Tom, Ben–Ted, Ben–Kim, Tom–Bill, Ted–Bill, Ted–Anna, Ted–Kim, Ted–Sara, Bill–Anna, Anna–Sara." },
  'ctl-toples': { title: 'WAK - #1 Candy Jars', intro: "There are four jars with the same initial number of candies. Ali takes exactly 3 candies at a time from jar 1, Badu 5 from jar 2, Cecep 7 from jar 3, and Dedi 9 from jar 4. At some moment jar 1 has 2 left, jar 2 has 3 left, jar 3 has 2 left, and jar 4 has fewer than 9 left (unknown)." },
  'ctl-cabai': { title: 'AAS - Harvesting Chillies', intro: "Chilli plants are arranged in a 5×5 grid; the number in each cell is the number of chillies:\n\n| 0 | 1 | 2 | 3 | 10 |\n|---|---|---|---|---|\n| 10 | 2 | 10 | 10 | 5 |\n| 5 | 3 | 6 | 5 | 0 |\n| 0 | 4 | 0 | 2 | 3 |\n| 20 | 5 | 1 | 0 | 0 |\n\nAgria starts from any cell in the leftmost column and stops at any cell in the rightmost column. She can only move to the cell directly to the right of or directly below the current cell." },
  'ctl-bakso': { title: 'AAS - The Meatball Business', intro: "Agria, Bogoria and Pertania open a meatball stall (regular, special, nuclear), and work at the same time (in parallel) at their own workstations.\n\n| Maker | Regular meatball | Special meatball | Nuclear meatball |\n|---|---|---|---|\n| Agria | 1 minute | 2 minutes | 5 minutes |\n| Bogoria | 2 minutes | 2 minutes | 3 minutes |\n| Pertania | cannot | cannot | 2 minutes |\n\nThe order: 3 regular meatballs, 3 special meatballs and 2 nuclear meatballs." },
}

const PATCH: Record<string, EnPatch> = {
  'ctl-bunga-a': { en: {
    options: ['A', 'B', 'C', 'D'],
    why: ['First row: Rose, Sunflower, Rose. Rose appears twice in one row.', 'The first column contains White Lily, Sunflower, White Lily. Lily appears twice in one column.', 'Every row and every column contains exactly one Rose, one Sunflower and one Lily (a Latin square).', 'Second row: Lily, Rose, Lily. Lily appears twice in one row.'],
    explanation: 'Answer: **C**. Check each option by scanning the rows and then the columns: a valid option must contain three different kinds of flower in every row and every column. Strategy for building one: fill the first row, then for each next cell choose a kind that is not yet in its column (and its row); if a violation occurs, swap the position of an earlier flower.',
    hints: ['Check each option one by one: look for a row or a column that contains the same kind of flower twice.', 'The correct option has no violation in any of the 3 rows and 3 columns.'],
  } },
  'ctl-rtr1-a': { en: {
    options: ['Dian, Ceria, Adi, Boni, Eko', 'Dian, Adi, Ceria, Boni, Eko', 'Adi, Ceria, Dian, Eko, Boni', 'Dian, Adi, Eko, Boni, Ceria'],
    why: ['Adi in 3rd position would have Dian and Ceria (both taller) in front of him, but Adi counts only 1 in front.', 'Dian(5) Adi(2) Ceria(4) Boni(1) Eko(3): all front/back counts match the table.', 'Adi cannot be first: he counts 1 taller student in front of him.', 'Eko in 3rd position must be taller than Adi (Adi counts 2 taller behind him), so Eko would have only 1 taller in front (Dian), but he counts 2.'],
    explanation: 'Answer: **B** (Dian, Adi, Ceria, Boni, Eko). Dian has nobody taller either in front or behind, so Dian is the tallest and stands at the very front. Boni counts 3 in front and 1 behind out of 5 people, so Boni is in 4th position and is the shortest. Adi counts 2 taller behind him (Ceria and Eko), and Boni is shorter, so Adi is in 2nd position. Eko has nobody taller behind him, so Eko is behind Ceria, in the last position. Heights: Dian 5, Ceria 4, Eko 3, Adi 2, Boni 1.',
    hints: ['Who has nobody taller, either in front or behind?', 'There are 5 people in total: the taller-in-front count + taller-behind count helps determine Boni\'s position.'],
    work: ['Dian (0, 0): the tallest, position 1.', 'Boni (3, 1): 3 people in front, 1 behind, position 4, the shortest.', 'Adi (1, 2): only Dian in front is taller, Ceria and Eko behind him are taller, position 2.', 'Eko has nobody taller behind him, so he is behind Ceria: position 5.'],
  } },
  'ctl-rtr2-a': { en: {
    options: ['1', '2', '3', '4'],
    why: ['There is no 37-litre bottle.', 'No two sizes (repeats allowed) among 1, 2, 4, 8, 16, 32 add up to 37.', '32 + 4 + 1 = 37.', 'A 3-bottle solution exists, so 4 is not the smallest.'],
    explanation: 'Answer: **3 bottles** (32 + 4 + 1 = 37). There is no 37-litre bottle and no two sizes add up to 37, so the minimum is 3. In binary 37 = 100101₂, which has three 1-bits (32, 4, 1): the greedy method of taking the largest bottle that fits gives the minimum number of bottles because the bottle sizes are powers of two.',
    hints: ['Take the largest bottle that does not exceed the remainder, then repeat for what is left.'],
  } },
  'ctl-tebak-posisi-a': { en: {
    explanation: 'Key answer: **1** (wrong guess). Guess the middle number 6; wrong, the answer is "larger". The remainder is 7–11, guess the middle, 9: correct. So there is one wrong guess before the correct one (2 guesses in total). This halving strategy is binary search. Note: the problem wording is ambiguous ("minimum"), because guessing 9 straight away by luck takes 0 wrong guesses; the source explanation counts using the middle-of-the-range strategy.',
    hints: ['Guess the middle number of the range, then narrow the range by half.'],
    labels: ['Number of wrong guesses'],
  }, bw: [['That is the total number of guesses (6, then 9). The key counts the wrong guesses before the correct one: only 1 (namely 6).']] },
  'ctl-hrw1-a': { en: {
    options: ['1', '6', '5', '3', '8'],
    why: ['From 1: 1→2→5→8→6→7→4 (stops, 0); box 3 is not visited.', 'From 6: 6→7→4, stops. Only 3 boxes.', 'From 5: 5→8→6→7→4, stops. Boxes 1, 2, 3 are not visited.', 'From 3: 3→1→2→5→8→6→7→4: all eight boxes are visited exactly once.', 'From 8: 8→6→7→4, stops.'],
    explanation: 'Answer: **d. 3**. Simulate: 3 (2L) → 1 (1R) → 2 (3R) → 5 (3R) → 8 (2L) → 6 (1R) → 7 (3L) → 4 (0, stop). All eight boxes are visited. Because box 4 contains 0 (the end point), the journey always ends at 4; box 3 cannot be reached from any box, so it has to be the starting point.',
    hints: ['Which box is never the destination of a jump from another box? That must be the starting box.'],
    work: ['Compute the destination of each box: 1→2, 2→5, 3→1, 4→stop, 5→8, 6→7, 7→4, 8→6.', 'Box 3 is nobody\'s destination, so start from 3.', 'Order: 3,1,2,5,8,6,7,4 (all 8 boxes).'],
  } },
  'ctl-hrw2-a': { en: {
    options: ['4 units of E', '1 unit of A, 1 unit of C, 1 unit of E, 1 unit of F', '2 units of F', '3 units of A, 1 unit of C, 3 units of E', '1 unit of D, 1 unit of E, 1 unit of F'],
    why: ['4 × 32,000 = 128,000 L, far from 53,000.', '1,000 + 4,000 + 32,000 + 16,000 = 53,000 L with 4 trucks, the minimum number.', '2 × 16,000 = 32,000 L, too little.', '3,000 + 4,000 + 96,000 = 103,000 L, too much.', '8,000 + 32,000 + 16,000 = 56,000 L, not 53,000.'],
    explanation: 'Answer: **b**. 53,000 = 32,000 + 16,000 + 4,000 + 1,000 (binary 110101), so 1 truck E, 1 truck F, 1 truck C and 1 truck A: 4 trucks. Because the capacities are powers of two and every truck must be full, the binary representation gives the fewest trucks (each size is used at most once).',
    hints: ['Convert 53 (thousand litres) to binary; every 1-bit is one truck.'],
  } },
  'ctl-regu-a': { en: {
    explanation: 'Answer: **39 students**. Worst case: all invitations fall on the largest squads. For even the smallest squad (5 members) to be represented, invite all members of the other 5 squads and then 1 more: 7 + 6 + 7 + 8 + 10 + 1 = 39. Formula: total − members of the smallest squad + 1 = 43 − 5 + 1 = 39.',
    hints: ['Imagine the worst case: the invitations are used up entirely by the big squads.'],
    labels: ['Number of students'],
  }, bw: [['Worst case: 38 students could all come from the 5 largest squads. Add 1 more.', 'That is the total of all students (5+7+6+7+8+10 = 43 includes the whole smallest squad). 1 from the smallest squad is enough.']] },
  'ctl-tebak-angka-a': { en: {
    explanation: 'Answer: **7 guesses**. With binary search every guess halves the possibilities; k guesses cover up to 2^k − 1 numbers (with the answers correct/smaller/larger). Because 2^6 = 64 < 100 ≤ 2^7 = 128, at most 7 guesses are needed.',
    hints: ['Guess the middle number; every guess eliminates half of the possibilities.'],
    labels: ['Maximum guesses'],
  }, bw: [['2^6 = 64 < 100, not enough to cover 100 possibilities.', 'That is linear search. Halving every time takes far fewer.']] },
  'ctl-lsh1-a': { en: {
    options: ['A-D-E-D-C-A', 'A-D-E-B-C-D-A', 'A-D-C-B-A', 'A-D-E-C-B-A'],
    why: ['There is no direct road C–A, so the route is invalid.', '14 + 7 + 4 + 18 + 19 + 14 = 76 minutes and B, C, D, E are all visited.', 'Does not visit E (and 14 + 19 + 18 + 16 = 67).', '14 + 7 + 23 + 18 + 16 = 78 minutes, over 76.'],
    explanation: 'Answer: **A-D-E-B-C-D-A** = 14 + 7 + 4 + 18 + 19 + 14 = 76 minutes, meeting the limit and visiting B, C, D, E. Option 1 uses the non-existent road A–C; option 3 skips E; option 4 takes 78 minutes. Two conditions must be checked together: all places are visited, and the total is ≤ 76.',
    hints: ['For each option check two things: do all roads exist on the map, and are B, C, D, E all visited?', 'Add up the time of each leg.'],
  } },
  'ctl-lsh2-a': { en: {
    options: ['Mask, Artefact', '3 Warrior Statues, Artefact', 'Mask, 1 Warrior Statue', 'Artefact, 1 Tablet'],
    why: ['8 + 3 = 11 kg, over the capacity.', '6 + 3 = 9 kg, value $10 million.', '8 + 2 = 10 kg, value $14 million.', '3 + 6 = 9 kg, value $17 million (the highest).'],
    explanation: 'Answer: **Artefact + 1 Tablet** (9 kg, $17 million). Mask + Artefact violates the weight limit (11 kg). Among the valid choices: $10 million, $14 million, $17 million. Choosing the most expensive item (the mask) does not give the highest value: this is the knapsack lesson. Note: in the source PDF, the key "17 minutes" printed after this problem actually belongs to the bridge-crossing problem (see the next problem); the archaeologist answer was computed by us.',
    hints: ['Compute the total weight and total value of each option; cross out those over 10 kg.'],
  } },
  'ctl-jembatan-a': { en: {
    explanation: 'Key answer: **17 minutes**. A+B cross (2), A returns (1), C+D cross (10), B returns (2), A+B cross (2): 2 + 1 + 10 + 2 + 2 = 17. Alternative: A+B (2), B returns (2), C+D (10), A returns (1), A+B (2) = 17. The key idea: the two slowest people cross together so the 10 minutes is paid only once. Verified by exhaustive search: 17 is the minimum.',
    hints: ['Who should bring the flashlight back?', 'Pair the two slowest people so that their time is counted only once.'],
    labels: ['Minutes'],
  }, bw: [['That is the "fastest person escorts everyone" strategy (2+1+5+1+10 = 19). There is a better one: let the two slowest cross together.']] },
  'ctl-timbangan-a': { en: {
    explanation: 'Answer: **32 kg**. N + C = 18, C + M = 26, N + M = 20. Add them up: 2N + 2C + 2M = 64, so N + C + M = 32. Every cat appears exactly twice in the sum of the three pairs, so it is enough to halve it.',
    hints: ['Add the three equations; how many times is each cat counted?'],
    labels: ['Weight (kg)'],
  }, bw: [['64 is the sum of the three pairs, which counts each cat twice. Halve it.']] },
  'ctl-labirin-a': { en: {
    options: ['A, B, C, D', 'D, A, A, D', 'C, B, D, A', 'C, A, A, D'],
    explanation: 'Answer: **D, A, A, D**. The path in the explanation figure (p. 16): from the triangle, D (2 steps forward, face right), A (1 step, face left), A (1 step, face left), D (2 steps, face right); then the whole block is repeated once more so that Mira arrives at the red circle. A loop block saves writing: the sequence of 4 moves is written once and repeated 2×.',
    hints: ['Start from the triangle: the first move must be 2 steps up because there is a wall near the start.', 'Simulate one round, then start the second round from the position/direction at the end of the first round.'],
  } },
  'ctl-arabot-a': { en: {
    explanation: 'Answer: **L, R, L, R, R, L**. Box 1 (from B): L so as not to go to C. Box 2 (from C): R so as not to go to B. Box 3 (from B or C): L so as not to go to A. Box 4: R, because L makes Arabot loop back without reaching the red point; box 6 = L so that it heads to the red point. Box 5 is passed from A (because box 3 = L) so it must be R. Framework of thinking: sequential activities are modelled as a graph (a data structure).',
    hints: ['Start with the boxes that have only one cause (1, 2, 3): the label must avoid the other starting points.', 'Then trace from A and from the last junction to the red point.'],
  } },
  'ctl-mobil-a': { en: {
    options: ['Yellow', 'Red', 'Blue', 'White'],
    explanation: 'Key answer: **Car B (Red)**. The explanation is not printed in the source; here is how to check it: for each car, rotate the angles according to the direction it faces (0° front, 90° right, 180° behind, 270° left), then match the distance to the nearest object in each direction with (5, 4, 5, 12). The red car faces left: the object in front is 5 away, the object on its right 4, behind 5, and on its left it is far (12). The key is taken from the source; the distance matching is read from the figure.',
    hints: ['Note the direction each car faces: angle 0° is always the direction the car faces.', 'Find the car that has a near object in front, to the right and behind, but a far empty space on its left.'],
  } },
  'ctl-klub-a': { en: {
    options: ['Bill', 'Sara', 'Tom', 'Kim'],
    why: ['Bill is lent the book before Tom and Sara.', 'Sara is lent the book before Kim (Ted lends to Kim only after it returns from Anna).', 'Tom is lent the book via Bill before Sara.', 'Kim is the last to be lent the book.'],
    explanation: 'Answer: **Kim**. Trace (depth-first, youngest friend first): Ben → Ted (10, the youngest among Tom 17, Ted 10, Kim 12) → Anna (9) → Bill (10) → Tom (17) → back to Bill, Anna → Sara (18) → back to Anna, Ted → Kim (12). Reading order: Ben, Ted, Anna, Bill, Tom, Sara, Kim. The last reader: Kim. This is depth-first search on a graph.',
    hints: ['Simulate: each time choose the youngest friend who has not yet borrowed it; if there is none, go back to the previous borrower (backtrack).'],
    work: ['Ben → Ted (10).', 'Ted → Anna (9), Anna → Bill (10), Bill → Tom (17).', 'Tom has no new friends: go back to Bill, then Anna.', 'Anna → Sara (18), then back to Anna, Ted.', 'Ted → Kim (12): the last reader.'],
  } },
  'ctl-toples-a': { en: {
    explanation: 'Answer: **5**. The initial number of candies N satisfies N mod 3 = 2, N mod 5 = 3, N mod 7 = 2. Write arithmetic sequences, starting from the jar with the largest step: jar 3: 2, 9, 16, 23; jar 2: 3, 8, 13, 18, 23; jar 1: 2, 5, 8, 11, 14, 17, 20, 23. The value common to all three sequences: 23 (the smallest initial number that fits; the problem assumes jar 4 has < 9 left). The remainder of jar 4 = 23 mod 9 = 5. Decomposition: find the initial number first; pattern recognition: like an LCM with remainders; abstraction: arithmetic sequences.',
    hints: ['First find the initial number of candies from jars 1–3.', 'Initial number N: N ≡ 2 (mod 3), N ≡ 3 (mod 5), N ≡ 2 (mod 7).'],
    labels: ['Candies left'],
  }, bw: [['23 is the initial number of candies. The question asks for the remainder in jar 4: 23 mod 9.']] },
  'ctl-cabai-a': { en: {
    explanation: 'Answer: **42**. The best path: start from 10 (row 2, column 1), go right through 2, 10, 10, go down to 5 and 2, then right to 3: 10 + 2 + 10 + 10 + 5 + 2 + 3 = 42 (verified by dynamic programming). The greedy strategy "chase the biggest number (20)" fails: a path through 20 yields at most 41. Examining all paths while discarding those that are certainly bad is pruning.',
    hints: ['Picking the 20-chilli plant is not necessarily best. Compare several paths.', 'For each cell, the best value = the cell\'s content + max(best from the right, best from below).'],
    labels: ['Number of chillies'],
  }, bw: [['41 is the maximum if Agria insists on taking the 20-chilli plant. Another path is better.']] },
  'ctl-bakso-a': { en: {
    explanation: 'Answer: **5 minutes**. Because all three work in parallel, the total time is the longest time. Allocation: Agria 3 regular meatballs (3) + 1 special meatball (2) = 5 minutes; Bogoria 2 special meatballs = 4 minutes; Pertania 2 nuclear meatballs = 4 minutes. Strategy: hand each kind to the fastest person (regular to Agria, nuclear to Pertania), then distribute the special meatballs to the person with the smallest load. Verified by exhaustive search: no allocation is faster than 5 minutes. Abstraction: who and what objects are not important; what matters is the allocation of work.',
    hints: ['Because the work is parallel, the total time = the time of the person who works longest.', 'Give each kind of meatball to the fastest person, then balance the load.'],
    work: ['Regular to Agria: 3 minutes. Nuclear to Pertania: 4 minutes.', 'Special: Bogoria 2 pieces (4 minutes), 1 piece to Agria who is already done at minute 3 (finishes at minute 5).', 'Total time = max(5, 4, 4) = 5 minutes.'],
    labels: ['Minutes'],
  }, bw: [['6 minutes if all special meatballs go to Bogoria. Give one to Agria, who is already done at minute 3.']] },
}

for (const p of problems as any[]) {
  if (PROBLEM_EN[p.id]) {
    const x = PROBLEM_EN[p.id]
    p.en = { ...p.en, intro: x.intro, ...(x.title && !p.en?.title ? { title: x.title } : {}) }
  }
  for (const part of p.parts as any[]) {
    const x = PATCH[part.id]
    if (!x) continue
    if (x.en) part.en = { ...part.en, ...x.en }
    if (x.bw) (part.blanks as any[]).forEach((b, i) => { (b.wrong as any[] | undefined)?.forEach((w, j) => { w.msgEn = x.bw![i][j] }) })
  }
}
