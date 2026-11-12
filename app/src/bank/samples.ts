// Reference samples: one item per question kind, used by the views while they are being built and by
// build/verify.ts as a self-test. Transcription agents: copy the SHAPE from here, not the content.
// (ids start with "sample-"; remove this file from the default pools once real items exist)
import type { BankFile } from '../types'

const r = String.raw

export const bank: BankFile = {
  problems: [
    {
      id: 'sample-mcq', archetype: 'mcq-multi', title: 'Contoh pengerjaan (Bagian I)',
      source: { kind: 'uts' as const, lang: 'id' as const, src: 'UTS2025_attempt_scan', label: 'Contoh pengerjaan', pages: [1], official: true, year: 2025 },
      parts: [{
        id: 'sample-mcq-1', kind: 'mcq-multi', decks: ['D11'], topic: 'Generative AI',
        stem: '*Tools* yang termasuk *generative* AI adalah:',
        options: ['GPT-4', 'Scratch', 'MS Word', 'Copilot'],
        correct: [true, false, false, true],
        why: ['Model bahasa generatif.', 'Lingkungan pemrograman visual, bukan AI generatif.', 'Pengolah kata (tanpa fitur AI bawaan dalam konteks soal).', 'Asisten berbasis model generatif.'],
        explanation: 'GPT-4 dan Copilot menghasilkan konten baru (teks/kode); Scratch dan MS Word bukan *generative AI*.',
        refs: [{ src: 'UTS2025_attempt_scan', page: 1 }],
        en: { stem: 'Tools that count as *generative* AI:', options: ['GPT-4', 'Scratch', 'MS Word', 'Copilot'], explanation: 'GPT-4 and Copilot generate new content (text/code); Scratch and MS Word are not *generative AI*.', why: ['A generative language model.', 'A visual programming environment, not generative AI.', 'A word processor.', 'An assistant built on a generative model.'] },
      }],
    },
    {
      id: 'sample-prog', archetype: 'program', title: 'Jumlah 1 sampai N',
      source: { kind: 'slide' as const, lang: 'id' as const, src: 'D05_Conditionals_Repetition', label: 'Contoh 1', pages: [38], official: true },
      parts: [{
        id: 'sample-prog-1', kind: 'program', decks: ['D05'], topic: 'For loop', patterns: ['for-count', 'accumulate-sum'], misconceptions: ['off-by-one', 'init-in-loop'],
        stem: 'Tuliskan program yang menerima masukan bilangan bulat N (N > 0), lalu menampilkan 1, 2, …, N (satu per baris) dan terakhir jumlah 1 + 2 + … + N.',
        reps: ['python', 'pseudo', 'flow'], match: 'lenient',
        solution: {
          python: r`# Program AddingUp_Numbers
# Menghitung 1+2+...+N dan menampilkan hasilnya. Asumsi: N > 0
# DECLARATIONS
# N : int
# i, sum : int
# ALGORITHM
N = int(input())          # initialization
sum = 0                   # initialization
for i in range(1, N+1):
    print(i)              # action
    sum = sum + i         # action
print(sum)                # Termination`,
          pseudo: r`Program AddingUp_Numbers
{ Menghitung 1+2+...+N. Asumsi: N > 0 }
KAMUS
  N, i, sum : integer
ALGORITMA
  input(N)
  sum ← 0
  i traversal [1..N]
    output(i)
    sum ← sum + i
  output(sum)`,
        },
        tests: [{ stdin: ['5'] }, { stdin: ['1'], edge: 'N = 1' }, { stdin: ['10'] }],
        wrong: [
          { code: 'N = int(input())\nsum = 0\nfor i in range(1, N):\n    print(i)\n    sum = sum + i\nprint(sum)', msg: '`range(1, N)` berhenti di N−1: batas atas `range` tidak ikut. Gunakan `range(1, N+1)`.', msgEn: '`range(1, N)` stops at N−1: the upper bound of `range` is excluded. Use `range(1, N+1)`.', tag: 'off-by-one' },
          { code: 'N = int(input())\nfor i in range(1, N+1):\n    sum = 0\n    print(i)\n    sum = sum + i\nprint(sum)', msg: '`sum = 0` ada di dalam loop, jadi jumlah di-reset setiap iterasi. Inisialisasi sebelum loop.', msgEn: '`sum = 0` is inside the loop, so the sum is reset on every iteration. Initialize it before the loop.', tag: 'init-in-loop' },
        ],
        plan: 'baca N; sum ← 0; untuk i dari 1 sampai N: tampilkan i, tambahkan i ke sum; tampilkan sum',
        skeleton: 'N = int(input())\nsum = ___\nfor i in range(___, ___):\n    print(i)\n    sum = ___\nprint(sum)',
        hints: ['Pola apa ini? Akumulasi jumlah dengan perulangan yang banyaknya diketahui.', 'Ingat batas atas `range(a, b)` tidak ikut diproses.'],
        syntax: ['program-template', 'input', 'for-range'],
        lineNotes: [
          { line: [1, 6], note: 'Kerangka program gaya kuliah: judul + spesifikasi, KAMUS (DECLARATIONS) sebagai komentar `# nama : tipe`, lalu ALGORITMA. Di ujian tulis, bagian ini ikut dinilai.', en: 'Lecture-style program skeleton: title + specification, DECLARATIONS as `# name : type` comments, then ALGORITHM. In the written exam this part is graded too.', syntax: 'program-template' },
          { line: 7, note: '`input()` selalu menghasilkan string, jadi dibungkus `int(...)` agar N bisa dipakai di `range`.', en: '`input()` always returns a string, so it is wrapped in `int(...)` so N can be used in `range`.', syntax: 'input' },
          { line: 8, note: 'Akumulator diinisialisasi **sebelum** loop. Kalau di dalam loop, nilainya ter-reset tiap iterasi.', en: 'The accumulator is initialized **before** the loop. Inside the loop, its value would be reset on every iteration.' },
          { line: 9, note: '`range(1, N+1)` menghasilkan 1, 2, …, N: batas atas tidak ikut, jadi ditulis N+1.', en: '`range(1, N+1)` produces 1, 2, …, N: the upper bound is excluded, so N+1 is written.', syntax: 'for-range' },
          { line: [10, 11], note: 'Badan loop (menjorok 4 spasi): cetak i, lalu tambahkan i ke sum.', en: 'Loop body (indented 4 spaces): print i, then add i to sum.', syntax: 'indentation' },
          { line: 12, note: 'Tidak menjorok, jadi dijalankan sekali setelah loop selesai (Termination).', en: 'Not indented, so it runs once after the loop finishes (Termination).' },
        ],
        explanation: 'Inisialisasi `sum = 0` sebelum loop, `for i in range(1, N+1)` agar N ikut, cetak `i` dan akumulasikan di dalam loop, cetak `sum` setelah loop.',
        refs: [{ src: 'D05_Conditionals_Repetition', page: 38 }],
        en: {
          stem: 'Write a program that reads an integer N (N > 0), then prints 1, 2, …, N (one per line) and finally the sum 1 + 2 + … + N.',
          explanation: 'Initialize `sum = 0` before the loop, use `for i in range(1, N+1)` so that N is included, print `i` and accumulate it inside the loop, and print `sum` after the loop.',
          hints: ['Which pattern is this? Accumulating a sum with a loop whose number of iterations is known.', 'Remember that the upper bound of `range(a, b)` is not processed.'],
          plan: 'read N; sum ← 0; for i from 1 to N: print i, add i to sum; print sum',
        },
      }],
    },
    {
      id: 'sample-trace', archetype: 'trace', title: 'Nilai maksimum array',
      source: { kind: 'slide' as const, lang: 'id' as const, src: 'D06_Array', label: 'Mencari nilai ekstrim', pages: [28], official: true },
      parts: [{
        id: 'sample-trace-1', kind: 'trace', decks: ['D06'], topic: 'Max/min array', patterns: ['max-min'], ask: 'table', watch: ['i', 'max'],
        stem: 'Telusuri program berikut. Isilah tabel nilai `i` dan `max` setiap kali berubah, lalu tuliskan keluarannya.',
        code: r`T = [1, 3, 5, 8, -12, 90, 3, 5]
N = 8
max = T[0]
for i in range(1, N):
    if (T[i] > max):
        max = T[i]
print("Largest element = " + str(max))`,
        syntax: ['list-init', 'list-index', 'for-range', 'print-str'],
        lineNotes: [
          { line: 1, note: 'Array (list) 8 elemen, indeks 0 sampai 7.', en: 'An array (list) of 8 elements, indices 0 to 7.', syntax: 'list-init' },
          { line: 3, note: '`max` dimulai dari elemen pertama, **bukan 0**: kalau semua elemen negatif, 0 akan salah jadi maksimum.', en: '`max` starts from the first element, **not 0**: if all elements are negative, 0 would wrongly become the maximum.' },
          { line: 4, note: 'Mulai dari indeks 1 karena indeks 0 sudah dipakai sebagai nilai awal; `range(1, N)` berhenti di N−1 = 7, indeks terakhir.', en: 'Start from index 1 because index 0 is already used as the initial value; `range(1, N)` stops at N−1 = 7, the last index.', syntax: 'for-range' },
          { line: [5, 6], note: 'Bandingkan dengan maksimum sementara; ganti bila lebih besar.', en: 'Compare with the current maximum; replace it if larger.' },
          { line: 7, note: '`str(max)` wajib: `+` antara string dan int menghasilkan TypeError.', en: '`str(max)` is required: `+` between a string and an int raises a TypeError.', syntax: 'print-str' },
        ],
        explanation: '`max` mulai dari `T[0]` = 1, lalu diperbarui di i = 1, 2, 3 dan 5. Keluaran: `Largest element = 90`.',
        refs: [{ src: 'D06_Array', page: 28 }],
        en: {
          stem: 'Trace the following program. Fill in the table of values of `i` and `max` each time they change, then write the output.',
          explanation: '`max` starts from `T[0]` = 1, then is updated at i = 1, 2, 3 and 5. Output: `Largest element = 90`.',
        },
      }],
    },
    {
      id: 'sample-robot', archetype: 'robot', title: 'Petualangan Robot Rody',
      source: { kind: 'guide' as const, lang: 'id' as const, src: 'UTS2024_PetunjukPenilaian_BagII', label: 'Soal 3', pages: [5, 6], official: true, year: 2024 },
      paperWeight: 0.15,
      parts: [{
        id: 'sample-robot-1', kind: 'robot', decks: ['D02'], topic: 'Robot repeat', dialect: 'rody', param: 'n', nValues: [1, 2, 3, 4, 5],
        en: {
          stem: 'Given a value n with n > 0 that states the depth of the *terrain*, write the commands Rody must execute to cross the *terrain* from its left side to its right side.',
          explanation: 'Go down n steps (walk, down) n times, one walk at the bottom, then go up n times (up, walk).',
          hints: ['Draw the path for n = 1, 2, 3. Which part repeats n times?'],
        },
        stem: 'Jika diberikan nilai n dengan n > 0 yang menyatakan kedalaman *terrain*, tuliskan perintah yang harus dilakukan Rody untuk melewati *terrain* dari sisi kiri ke sisi kanannya.',
        solution: 'repeat n\n  walk\n  down\nwalk\nrepeat n\n  up\n  walk',
        rubric: [
          { score: 4, desc: 'Urutan langkah dapat digunakan untuk menggambarkan bentuk dengan tepat sesuai instruksi', descEn: 'The sequence of steps correctly draws the shape as instructed' },
          { score: 3.5, desc: 'Ada kesalahan kecil yang menyebabkan solusi tidak sempurna', descEn: 'A minor error makes the solution imperfect' },
          { score: 3, desc: 'Urutan langkah kurang, tapi secara umum masih menghasilkan bentuk yang diharapkan; ada perintah yang seharusnya bisa diulang (repeat) tapi dituliskan berjajar, namun hasil eksekusi benar', descEn: 'The sequence of steps is lacking, but it still generally produces the expected shape; some commands that could have been repeated (repeat) are written out one after another, but the execution result is correct' },
          { score: 2, desc: 'Hanya sebagian urutan langkah menghasilkan sebagian bentuk yang diharapkan', descEn: 'Only part of the sequence of steps produces part of the expected shape' },
        ],
        hints: ['Gambar jalurnya untuk n = 1, 2, 3. Bagian mana yang berulang sebanyak n kali?'],
        explanation: 'Turun n anak tangga (walk, down) sebanyak n kali, satu walk di dasar, lalu naik n kali (up, walk).',
        refs: [{ src: 'UTS2024_PetunjukPenilaian_BagII', page: 6 }],
      }],
    },
    {
      id: 'sample-constraint', archetype: 'constraint', title: 'Koleksi Buku',
      source: { kind: 'guide' as const, lang: 'id' as const, src: 'UTS2024_PetunjukPenilaian_BagII', label: 'Soal 1', pages: [1, 2, 3], official: true, year: 2024 },
      paperWeight: 0.2,
      en: { intro: 'The collection must contain exactly six books: two pocket books, two hardcovers, two e-books. Each genre (Fiction, Art, History, Science) may appear only once or twice; if twice, the formats must differ.' },
      intro: 'Koleksi harus berjumlah tepat enam buku: dua buku saku, dua hardcover, dua e-book. Setiap genre (Fiksi, Seni, Sejarah, Sains) hanya boleh muncul satu atau dua kali; jika dua kali, kemasannya harus berbeda.',
      parts: [
        {
          id: 'sample-constraint-a', kind: 'constraint', label: 'a', weight: 0.4, decks: ['D01'], topic: 'Constraint', shape: 'grid',
          entities: ['Fiksi', 'Seni', 'Sejarah', 'Sains'], slots: ['Buku saku', 'Hardcover', 'E-book'],
          en: { stem: 'Determine a recommended book collection that meets the conditions (tick the genre × format cells).', explanation: 'In table form: exactly 6 ticks, exactly 2 in each column, and 1 or 2 in each row (different cells automatically mean different formats).' },
          stem: 'Tentukan koleksi buku rekomendasi yang memenuhi syarat (centang sel genre × kemasan).',
          check: r`def check(ans):
    cells = {(r, c) for r, c in ans}
    errs = []
    if len(cells) != 6: errs.append([f"Harus tepat 6 buku (sekarang {len(cells)}).", f"Must be exactly 6 books (now {len(cells)})."])
    for c in range(3):
        n = sum(1 for r, cc in cells if cc == c)
        if n != 2: errs.append([f"Kemasan kolom {c+1} harus tepat 2 buku (sekarang {n}).", f"Format column {c+1} must have exactly 2 books (now {n})."])
    for r in range(4):
        n = sum(1 for rr, c in cells if rr == r)
        if n not in (1, 2): errs.append([f"Genre baris {r+1} harus muncul 1 atau 2 kali (sekarang {n}).", f"Genre row {r+1} must appear 1 or 2 times (now {n})."])
    return errs`,
          solution: [[0, 0], [0, 1], [1, 2], [2, 0], [2, 2], [3, 1]],
          rubric: [
            { score: 4, desc: 'Kombinasi yang diberikan tepat memenuhi semua constraint', descEn: 'The given combination satisfies all constraints' },
            { score: 3, desc: 'Kombinasi memenuhi hanya dua constraint', descEn: 'The combination satisfies only two constraints' },
            { score: 2, desc: 'Kombinasi memenuhi hanya salah satu constraint', descEn: 'The combination satisfies only one constraint' },
            { score: 1, desc: 'Tidak memenuhi constraint, tapi masih ada aspek yang benar', descEn: 'Does not satisfy the constraints, but some aspect is still correct' },
            { score: 0, desc: 'Tidak mengerjakan atau jawaban sama sekali salah', descEn: 'Not attempted, or the answer is entirely wrong' },
          ],
          explanation: 'Dalam bentuk tabel: tepat 6 centang, tiap kolom tepat 2, tiap baris 1 atau 2 (sel berbeda otomatis berarti kemasan berbeda).',
        },
        {
          id: 'sample-constraint-b', kind: 'open', label: 'b', weight: 0.6, decks: ['D01'], topic: 'Constraint',
          en: {
            stem: 'Give a short and clear explanation showing your reasoning in determining the collection.',
            answer: 'Abstraction: only the genre, format and conditions matter (author/year are ignored). Decomposition: formulate the three constraints (exactly 6 books; 2 per format; each genre 1–2 times with different formats), then build a combination that satisfies all of them.',
            keyPoints: ['States the important information (genre, format, conditions) and what is ignored', 'Formulates all three constraints explicitly', 'Explains how to build the combination from the constraints'],
            explanation: 'See the alternative answer and the official rubric.',
          },
          stem: 'Berikan penjelasan yang singkat dan jelas yang menunjukkan penalaran Anda dalam menentukan koleksi tersebut.',
          answer: 'Abstraksi: yang penting hanya genre, kemasan, dan syarat (penulis/tahun diabaikan). Dekomposisi: rumuskan tiga constraint (tepat 6 buku; 2 per kemasan; tiap genre 1–2 kali dengan kemasan berbeda), lalu susun kombinasi yang memenuhi semuanya.',
          rubric: [
            { score: 4, desc: 'Penjelasan mengandung aspek abstraksi (menentukan hal penting) dan dekomposisi (merumuskan constraints)', descEn: 'The explanation contains both abstraction (identifying what matters) and decomposition (formulating the constraints)' },
            { score: 3, desc: 'Mengandung abstraksi dan dekomposisi, tetapi ada satu kesalahan', descEn: 'Contains abstraction and decomposition, but with one error' },
            { score: 2, desc: 'Penjelasan benar hanya untuk salah satu aspek (dekomposisi/abstraksi)', descEn: 'The explanation is correct for only one aspect (decomposition/abstraction)' },
            { score: 1, desc: 'Penjelasan tidak tepat, tetapi masih ada hal benar', descEn: 'The explanation is not accurate, but something is still correct' },
            { score: 0, desc: 'Tidak menjawab atau jawaban sama sekali salah', descEn: 'Not answered, or the answer is entirely wrong' },
          ],
          keyPoints: ['Menyebut informasi penting (genre, kemasan, syarat) dan yang diabaikan', 'Merumuskan ketiga constraint secara eksplisit', 'Menjelaskan cara menyusun kombinasi dari constraint'],
          explanation: 'Lihat jawaban alternatif dan rubrik resmi.',
        },
      ],
    },
  ],
  flashcards: [
    { id: 'sample-fc-1', decks: ['D05'], topic: 'For loop', front: 'Template `for` untuk memproses i = 1..N?', back: '`for i in range(1, N+1):` (batas atas `range` tidak ikut, jadi tulis N+1)',
      en: { front: 'The `for` template to process i = 1..N?', back: '`for i in range(1, N+1):` (the upper bound of `range` is excluded, so write N+1)' } },
  ],
}
