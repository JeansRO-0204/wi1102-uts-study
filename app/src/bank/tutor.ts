// Peer-tutor practice sets (STEI-K 2025, academic division; unofficial): Orkhan's Python set and "Objek Aneh".
// The tutors' own code was used only as a cross-check; every solution here was re-derived from the statements.
import type { BankFile, LineNote, SyntaxId } from '../types'

const r = String.raw
const ORK = 'Tutor_Orkhan'
const ANEH = 'Tutor_ObjekAneh'
const n = (line: number | [number, number], note: string, en: string, syntax?: SyntaxId): LineNote => (syntax ? { line, note, en, syntax } : { line, note, en })

export const bank: BankFile = {
  problems: [
    /* ============================================ ORKHAN ============================================ */
    {
      id: 'ork-p1', archetype: 'program', title: 'Problem 1 – Rotasi Password Kolam Lele', en: { title: 'Problem 1 – Catfish pond password rotation' },
      source: { kind: 'tubay' as const, lang: 'id' as const, src: ORK, label: 'Problem 1', pages: [2], official: false, year: 2025 },
      figures: [{ src: ORK, page: 2 }],
      parts: [{
        id: 'ork-p1a', kind: 'program', decks: ['D04', 'D06'], topic: 'I/O, operators, array index', difficulty: 2,
        patterns: ['sequence-io', 'operators', 'array-map'], misconceptions: ['off-by-one', 'index-range'],
        stem: "Anda merupakan mahasiswa prodi teknik peternakan lele. Suatu hari anda bertemu Mas Roy, seorang peternak lele veteran. Anda bertanya kepada Mas Roy: *Roy, cara antum jagain kolam lele gimana sih?* — *Kolamnya ane kunci, terus kasih password. Tapi ane ganti-ganti passwordnya tiap seminggu.*\n\nTerinspirasi dari Mas Roy, anda memasang gembok digital dengan password di peternakan kolam anda. Anda memiliki sebanyak 3 password, yang akan anda rotasikan setiap X hari, mulai dari password pertama sampai ketiga. Anggap mulai di hari ke-1.\n\nBuatlah program yang akan mengeluarkan password di hari ke-Y!\n\n**Note: Jangan gunakan if-else.**\n\nContoh (masukan setelah titik dua):\n```\nMasukkan password pertama : abcdef\nMasukkan password kedua : bumi300\nMasukkan password ketiga : passwordketiga\nMasukkan hari rotasi : 8\nIngin melihat password di hari ke ? : 27\nabcdef\n```\n```\nMasukkan password pertama : prajogo\nMasukkan password kedua : superman\nMasukkan password ketiga : pangestu\nMasukkan hari rotasi : 1\nIngin melihat password di hari ke ? : 32\nsuperman\n```\n*Catatan situs: urutan masukan = password 1, 2, 3, X, Y; teks permintaan (prompt) tidak ikut dinilai.*",
        reps: ['python', 'pseudo', 'flow'], match: 'lenient',
        solution: {
          python: r`# Program PasswordRotation
# Menampilkan password pada hari ke-Y dari 3 password yang dirotasi tiap X hari (tanpa if-else)
# DECLARATIONS
# P : array of str   { 3 elemen }
# X, Y, k, i : int
# ALGORITHM
P = ['' for i in range(3)]
for i in range(3):
    P[i] = input()
X = int(input())
Y = int(input())
k = ((Y - 1) // X) % 3
print(P[k])`,
          pseudo: r`Program PasswordRotation
{ Menampilkan password pada hari ke-Y dari 3 password yang dirotasi tiap X hari (tanpa if-else) }
KAMUS
  P : array [0..2] of string
  X, Y, k, i : integer
ALGORITMA
  i traversal [0..2]
    input(P[i])
  input(X)
  input(Y)
  k ← ((Y - 1) div X) mod 3
  output(P[k])`,
        },
        tests: [
          { name: 'sample 1', stdin: ['abcdef', 'bumi300', 'passwordketiga', '8', '27'] },
          { name: 'sample 2', stdin: ['boysboys', 'yellyell', 'forzasmansa', '25', '67'] },
          { name: 'sample 3', stdin: ['prajogo', 'superman', 'pangestu', '1', '32'] },
          { name: 'last day of the first period', stdin: ['satu', 'dua', 'tiga', '8', '8'], edge: 'Y = X: still password 1' },
          { name: 'first day of the second period', stdin: ['satu', 'dua', 'tiga', '8', '9'], edge: 'Y = X + 1: password 2' },
        ],
        wrong: [
          { code: "P = ['' for i in range(3)]\nfor i in range(3):\n    P[i] = input()\nX = int(input())\nY = int(input())\nk = (Y // X) % 3\nprint(P[k])", msg: 'Hari dihitung mulai dari 1, bukan 0. Pada Y = X password masih yang pertama, tetapi `Y // X` sudah 1. Gunakan `(Y - 1) // X`.', msgEn: 'Days are counted from 1, not 0. At Y = X the first password is still active, but `Y // X` is already 1. Use `(Y - 1) // X`.', tag: 'off-by-one' },
          { code: "P = ['' for i in range(3)]\nfor i in range(3):\n    P[i] = input()\nX = int(input())\nY = int(input())\nk = (Y - 1) // X\nprint(P[k])", msg: 'Setelah password ketiga, rotasi kembali ke password pertama. Indeks harus dibatasi dengan `% 3`, kalau tidak indeks keluar dari batas array.', msgEn: 'After the third password the rotation goes back to the first. The index must be wrapped with `% 3`, otherwise it goes out of the array bounds.', tag: 'index-range' },
        ],
        plan: 'baca tiga password ke array P; baca X dan Y; hitung banyak rotasi yang sudah terjadi = (Y-1) div X; indeks password aktif = banyak rotasi mod 3; tampilkan P[indeks]',
        skeleton: "P = ['' for i in range(3)]\nfor i in range(3):\n    P[i] = input()\nX = int(input())\nY = int(input())\nk = ((Y - ___) // ___) % ___\nprint(P[___])",
        hints: ['Tanpa if-else, pilih salah satu dari tiga nilai dengan *indeks*. Simpan ketiga password dalam array.', 'Hari ke-1 sampai ke-X memakai password 1. Berapa kali rotasi sudah terjadi pada hari ke-Y? Cobalah Y = X dan Y = X + 1.', 'Rotasi bergulir 1, 2, 3, 1, 2, 3, …: operator apa yang membuat bilangan "berputar" di dalam 0..2?'],
        work: ['Simpan tiga password di array `P` (indeks 0, 1, 2).', 'Hari 1..X → rotasi ke-0; hari X+1..2X → rotasi ke-1, dst. Jadi banyak rotasi pada hari Y adalah `(Y - 1) // X`.', 'Setelah password ketiga kembali ke yang pertama: indeks aktif `k = ((Y - 1) // X) % 3`.', 'Tampilkan `P[k]`. Tidak ada if-else sama sekali.'],
        explanation: "Kunci: *indeks array menggantikan if-else*. Rotasi ke-`t` (mulai dari 0) berlangsung pada hari `t*X + 1` sampai `(t+1)*X`, sehingga `t = (Y - 1) // X`. Karena hanya ada 3 password, indeks yang aktif adalah `t % 3`. Contoh 1: `(27-1)//8 = 3`, `3 % 3 = 0` → `abcdef`. Contoh 2: `(67-1)//25 = 2` → `forzasmansa`. Contoh 3: `(32-1)//1 = 31`, `31 % 3 = 1` → `superman`.\n\nCatatan: kode tutor memakai `(day_pass == 0 and pw1) or …`, yang bekerja tetapi gagal bila sebuah password berupa string kosong; versi array di atas lebih aman.",
        syntax: ['input', 'type-conversion', 'operators', 'list-index'],
        lineNotes: [
          n([1, 6], 'Kerangka program gaya kuliah: judul + spesifikasi, DECLARATIONS sebagai komentar, lalu ALGORITHM.', 'Lecture-style program skeleton: title + specification, DECLARATIONS as comments, then ALGORITHM.', 'program-template'),
          n(7, "Array 3 elemen `P` dibuat dengan pola `[0 for i in range(N)]` (di sini berisi string kosong). Ketiga password disimpan agar bisa dipilih lewat indeks, bukan lewat if-else.", 'The 3-element array `P` is created with the `[0 for i in range(N)]` pattern (here holding empty strings). The three passwords are stored so one can be picked by index instead of if-else.', 'list-init'),
          n([8, 9], '`input()` tanpa `int(...)`: password adalah string, jadi tidak dikonversi. Elemen ke-i diisi dari masukan ke-i.', '`input()` without `int(...)`: a password is a string, so it is not converted. Element i is filled from the i-th input line.', 'input'),
          n([10, 11], '`int(input())`: hari rotasi X dan hari Y adalah bilangan, sehingga harus dikonversi dari string.', '`int(input())`: the rotation length X and the day Y are numbers, so they must be converted from strings.', 'type-conversion'),
          n(12, '`(Y - 1) // X` = banyak rotasi yang sudah terjadi (hari dihitung mulai dari 1, maka `Y - 1`). `% 3` membuat indeks berputar 0, 1, 2, 0, … Jebakan: `Y // X` salah satu hari (pada Y = X).', '`(Y - 1) // X` = number of rotations already done (days start at 1, hence `Y - 1`). `% 3` makes the index cycle 0, 1, 2, 0, … Trap: `Y // X` is off by one day (at Y = X).', 'operators'),
          n(13, 'Mencetak password aktif lewat indeks `k`. Hasilnya tetap string.', 'Prints the active password through index `k`. The result is still a string.', 'print-str'),
        ],
        pseudoNotes: [
          n([3, 5], 'KAMUS: `P` array 3 string (indeks 0..2); X, Y, k, i integer.', 'KAMUS (declarations): `P` is an array of 3 strings (indices 0..2); X, Y, k, i are integers.'),
          n([7, 8], 'Traversal 0..2 mengisi P satu per satu.', 'A traversal over 0..2 fills P one element at a time.'),
          n([9, 10], 'Membaca X dan Y.', 'Reads X and Y.'),
          n(11, '`div` = pembagian bulat, `mod` = sisa bagi. Rumus sama dengan versi Python.', '`div` = integer division, `mod` = remainder. Same formula as the Python version.'),
          n(12, 'Menampilkan password pada indeks aktif.', 'Outputs the password at the active index.'),
        ],
        refs: [{ src: ORK, page: 2 }],
        en: {
          stem: "You are a student of catfish-farming engineering. One day you meet Mas Roy, a veteran catfish farmer. You ask him: *Roy, how do you guard your catfish pond?* — *I lock the pond and set a password. But I change the password every week.*\n\nInspired by Mas Roy, you install a digital lock with a password on your pond. You have 3 passwords that you rotate every X days, from the first password to the third. Assume you start on day 1.\n\nWrite a program that outputs the password on day Y!\n\n**Note: Do not use if-else.**\n\nExamples (input after the colon):\n```\nMasukkan password pertama : abcdef\nMasukkan password kedua : bumi300\nMasukkan password ketiga : passwordketiga\nMasukkan hari rotasi : 8\nIngin melihat password di hari ke ? : 27\nabcdef\n```\n```\nMasukkan password pertama : prajogo\nMasukkan password kedua : superman\nMasukkan password ketiga : pangestu\nMasukkan hari rotasi : 1\nIngin melihat password di hari ke ? : 32\nsuperman\n```\n*Site note: the input order is password 1, 2, 3, X, Y; the prompt texts are not graded.*",
          explanation: "Key idea: *an array index replaces if-else*. Rotation number `t` (counting from 0) is active on days `t*X + 1` to `(t+1)*X`, so `t = (Y - 1) // X`. Since there are only 3 passwords, the active index is `t % 3`. Example 1: `(27-1)//8 = 3`, `3 % 3 = 0` → `abcdef`. Example 2: `(67-1)//25 = 2` → `forzasmansa`. Example 3: `(32-1)//1 = 31`, `31 % 3 = 1` → `superman`.\n\nNote: the tutor's code uses `(day_pass == 0 and pw1) or …`, which works but breaks when a password is an empty string; the array version above is safer.",
          hints: ['Without if-else, pick one of three values by *index*. Store the three passwords in an array.', 'Days 1 to X use password 1. How many rotations have happened by day Y? Try Y = X and Y = X + 1.', 'The rotation cycles 1, 2, 3, 1, 2, 3, …: which operator makes a number "wrap around" inside 0..2?'],
          work: ['Store the three passwords in array `P` (indices 0, 1, 2).', 'Days 1..X → rotation 0; days X+1..2X → rotation 1, and so on. So the number of rotations on day Y is `(Y - 1) // X`.', 'After the third password it returns to the first: active index `k = ((Y - 1) // X) % 3`.', 'Print `P[k]`. There is no if-else at all.'],
          plan: 'read the three passwords into array P; read X and Y; rotations done = (Y-1) div X; active index = rotations mod 3; output P[index]',
        },
      }],
    },
    {
      id: 'ork-p2', archetype: 'program', title: 'Problem 2 – Bilangan Dua Pangkat', en: { title: 'Problem 2 – Powers of two' },
      source: { kind: 'tubay' as const, lang: 'id' as const, src: ORK, label: 'Problem 2', pages: [3], official: false, year: 2025 },
      figures: [{ src: ORK, page: 3 }],
      parts: [{
        id: 'ork-p2a', kind: 'program', decks: ['D05'], topic: 'Conditionals & loops: power of two', difficulty: 2,
        patterns: ['if-else', 'while-condition', 'operators'], misconceptions: ['not-complete'],
        stem: "Rara merupakan siswi di SMA Menengah Atas 5 Agartha. Pada hari senin, Rara mendapatkan materi dari guru matematikanya, Bu Siro, sebagai berikut:\n\n*Bilangan dua pangkat merupakan bilangan bulat yang dapat dinyatakan dalam bentuk 2^N. N merupakan bilangan bulat.*\n\nRara, sebagai siswi yang penasaran, ingin mengetahui apakah suatu bilangan dapat dibilang dua pangkat. Rara meminta tolong kepadamu untuk membuatkan program yang memenuhi keinginannya. \"Tolongin Rara dong!\", ucap Rara.\n\nContoh:\n```\nMasukkan bilangan yang ingin dicek: 4\nYa\n\nMasukkan bilangan yang ingin dicek: 5\nTidak\n\nMasukkan bilangan yang ingin dicek: 67\nTidak\n\nMasukkan bilangan yang ingin dicek: 128\nYa\n\nMasukkan bilangan yang ingin dicek: 32768\nYa\n```\n*Catatan situs: masukan satu bilangan bulat; N pada 2^N dianggap bilangan bulat tidak negatif, jadi 1 = 2^0 termasuk dua pangkat, sedangkan 0 dan bilangan negatif bukan.*",
        reps: ['python', 'pseudo', 'flow'], match: 'lenient',
        solution: {
          python: r`# Program PowerOfTwo
# Menentukan apakah bilangan bulat N berbentuk 2^k (k bulat, k >= 0)
# DECLARATIONS
# N, m : int
# ALGORITHM
N = int(input())
m = N
while (m > 1 and m % 2 == 0):
    m = m // 2
if (N >= 1 and m == 1):
    print("Ya")
else:
    print("Tidak")`,
          pseudo: r`Program PowerOfTwo
{ Menentukan apakah bilangan bulat N berbentuk 2^k (k bulat, k ≥ 0) }
KAMUS
  N, m : integer
ALGORITMA
  input(N)
  m ← N
  while (m > 1 and m mod 2 = 0) do
    m ← m div 2
  if (N ≥ 1 and m = 1) then
    output("Ya")
  else
    output("Tidak")`,
        },
        tests: [
          { name: '4', stdin: ['4'] },
          { name: '67', stdin: ['67'] },
          { name: '32768', stdin: ['32768'] },
          { name: '12', stdin: ['12'], edge: 'even but not a power of two' },
          { name: '1', stdin: ['1'], edge: '1 = 2^0' },
          { name: '0', stdin: ['0'], edge: 'zero is not a power of two' },
        ],
        wrong: [
          { code: 'N = int(input())\nif (N % 2 == 0):\n    print("Ya")\nelse:\n    print("Tidak")', msg: 'Bilangan genap belum tentu dua pangkat (misalnya 12 atau 6). Bagi terus dengan 2 selama habis dibagi; dua pangkat berakhir tepat di 1.', msgEn: 'An even number is not necessarily a power of two (e.g. 12 or 6). Keep dividing by 2 while it divides evenly; a power of two ends exactly at 1.', tag: 'not-complete' },
          { code: 'N = int(input())\nm = N\nwhile (m > 1 and m % 2 == 0):\n    m = m // 2\nif (N > 1 and m == 1):\n    print("Ya")\nelse:\n    print("Tidak")', msg: '1 = 2^0 adalah dua pangkat. Syarat `N > 1` membuangnya; gunakan `N >= 1`.', msgEn: '1 = 2^0 is a power of two. The condition `N > 1` rejects it; use `N >= 1`.', tag: 'off-by-one' },
        ],
        plan: 'baca N; m ← N; selama m > 1 dan m genap: m ← m div 2; jika N ≥ 1 dan m = 1 tampilkan Ya, selain itu Tidak',
        skeleton: 'N = int(input())\nm = ___\nwhile (m > ___ and m % ___ == 0):\n    m = m // ___\nif (N >= ___ and m == ___):\n    print("Ya")\nelse:\n    print("Tidak")',
        hints: ['Tulis 8, 16, 12 sebagai hasil kali faktor 2. Apa yang membedakan dua pangkat dari bilangan lain?', 'Bagi bilangan dengan 2 berulang kali selama masih habis dibagi 2. Apa nilai akhirnya jika bilangan itu dua pangkat?', 'Periksa juga 1, 0, dan bilangan negatif sebelum menyimpulkan.'],
        work: ['Salin N ke `m` supaya N tetap utuh untuk pengecekan akhir.', 'Selama `m > 1` dan `m` genap, `m = m // 2`. Pengulangan berhenti ketika m = 1 (dua pangkat) atau m ganjil > 1 (bukan).', 'Untuk N ≤ 0 loop tidak jalan dan `m` tidak sama dengan 1, tetapi tambahkan juga syarat `N >= 1` agar jelas.', 'Jika `N >= 1 and m == 1` cetak Ya, selain itu Tidak.'],
        explanation: "Bilangan dua pangkat hanya punya faktor prima 2, jadi membaginya dengan 2 berulang kali pasti berakhir di 1. Contoh 128 → 64 → … → 1 (Ya); 12 → 6 → 3 berhenti karena 3 ganjil (Tidak).\n\nCatatan: kode tutor memakai trik bitwise `angka & (angka-1) == 0`. Ada dua masalah: (1) di Python `==` lebih tinggi prioritasnya daripada `&`, jadi ekspresi itu dibaca `angka & ((angka-1) == 0)` dan hampir selalu salah (perlu kurung: `(angka & (angka-1)) == 0`); (2) program tutor mencetak `ya`/`bukan`, padahal soal meminta `Ya`/`Tidak`. Operator bitwise juga di luar materi WI1102; cara pembagian berulang di atas cukup.",
        syntax: ['input', 'while', 'if-else', 'operators'],
        lineNotes: [
          n([1, 5], 'Kerangka program: judul, spesifikasi, DECLARATIONS.', 'Program skeleton: title, specification, DECLARATIONS.', 'program-template'),
          n(6, '`int(input())`: konversi string ke bilangan.', '`int(input())`: converts the string to a number.', 'input'),
          n(7, 'Salinan `m` yang akan dibagi dua berulang kali. N dibiarkan utuh karena dipakai lagi di baris 10.', 'The copy `m` is halved repeatedly. N is left intact because it is used again on line 10.'),
          n([8, 9], 'Selama `m` masih lebih dari 1 dan genap, bagi dengan 2 (`//` pembagian bulat). `m` berubah tiap iterasi sehingga loop pasti berhenti. `m > 1` mencegah loop tak hingga untuk m = 0.', 'While `m` is still greater than 1 and even, halve it (`//` integer division). `m` changes every iteration so the loop must stop. `m > 1` prevents an infinite loop for m = 0.', 'while'),
          n(10, 'Dua pangkat berakhir tepat di 1. `N >= 1` menyingkirkan 0 dan bilangan negatif; 1 = 2^0 tetap dihitung Ya (jangan tulis `N > 1`).', 'A power of two ends exactly at 1. `N >= 1` rules out 0 and negatives; 1 = 2^0 still counts as Ya (do not write `N > 1`).', 'relational-logical'),
          n([11, 13], 'Keluaran sesuai soal: `Ya` atau `Tidak` (huruf besar di awal).', 'Output as specified: `Ya` or `Tidak` (capital first letter).', 'if-else'),
        ],
        pseudoNotes: [
          n([3, 4], 'KAMUS: N dan m integer.', 'KAMUS (declarations): N and m are integers.'),
          n(7, 'Salin N ke m; N dipertahankan untuk keputusan akhir.', 'Copy N into m; N is kept for the final decision.'),
          n([8, 9], '`mod` untuk cek genap, `div` untuk membagi dua. Kondisi `m > 1` mencegah loop tak hingga pada 0.', '`mod` tests evenness, `div` halves. The condition `m > 1` prevents an infinite loop on 0.'),
          n([10, 13], 'Dua pangkat ⇔ N ≥ 1 dan hasil akhir m = 1.', 'Power of two ⇔ N ≥ 1 and the final m = 1.'),
        ],
        refs: [{ src: ORK, page: 3 }],
        en: {
          stem: "Rara is a student at SMA Menengah Atas 5 Agartha. On Monday, Rara receives the following material from her maths teacher, Bu Siro:\n\n*A power of two is an integer that can be written as 2^N, where N is an integer.*\n\nRara, being curious, wants to know whether a given number counts as a power of two. She asks you to write a program that does this. \"Please help Rara!\", she says.\n\nExamples:\n```\nMasukkan bilangan yang ingin dicek: 4\nYa\n\nMasukkan bilangan yang ingin dicek: 5\nTidak\n\nMasukkan bilangan yang ingin dicek: 67\nTidak\n\nMasukkan bilangan yang ingin dicek: 128\nYa\n\nMasukkan bilangan yang ingin dicek: 32768\nYa\n```\n*Site note: the input is one integer; N in 2^N is taken as a non-negative integer, so 1 = 2^0 is a power of two, while 0 and negative numbers are not. Output is `Ya` (yes) / `Tidak` (no).*",
          explanation: "A power of two has no prime factor other than 2, so halving it repeatedly always ends at 1. Example: 128 → 64 → … → 1 (Ya); 12 → 6 → 3 stops because 3 is odd (Tidak).\n\nNote: the tutor's code uses the bitwise trick `angka & (angka-1) == 0`. It has two problems: (1) in Python `==` binds tighter than `&`, so the expression reads `angka & ((angka-1) == 0)` and is almost always wrong (it needs brackets: `(angka & (angka-1)) == 0`); (2) the tutor's program prints `ya`/`bukan`, while the statement asks for `Ya`/`Tidak`. Bitwise operators are also outside the WI1102 syllabus; repeated division is enough.",
          hints: ['Write 8, 16, 12 as products of 2s. What distinguishes a power of two from other numbers?', 'Divide the number by 2 repeatedly while it is still divisible by 2. What is the final value if it is a power of two?', 'Also check 1, 0 and negative numbers before concluding.'],
          work: ['Copy N into `m` so N stays intact for the final check.', 'While `m > 1` and `m` is even, `m = m // 2`. The loop stops when m = 1 (power of two) or m is odd and > 1 (not).', 'For N ≤ 0 the loop does not run and `m` is not 1, but add the `N >= 1` condition too to be explicit.', 'If `N >= 1 and m == 1` print Ya, otherwise Tidak.'],
          plan: 'read N; m ← N; while m > 1 and m is even: m ← m div 2; if N ≥ 1 and m = 1 output Ya, else Tidak',
        },
      }],
    },
    {
      id: 'ork-p3', archetype: 'program', title: 'Problem 3 – Bilangan Prima Ber', en: { title: 'Problem 3 – Ber and the prime numbers' },
      source: { kind: 'tubay' as const, lang: 'id' as const, src: ORK, label: 'Problem 3', pages: [4], official: false, year: 2025 },
      figures: [{ src: ORK, page: 4 }],
      parts: [{
        id: 'ork-p3a', kind: 'program', decks: ['D05', 'D10'], topic: 'Loops & function: prime test', difficulty: 3,
        patterns: ['while-condition', 'function-def-call', 'search-flag', 'nested-loop'], misconceptions: ['off-by-one', 'not-complete'],
        stem: "Adik anda yang bernama Ber baru saja mempelajari bilangan prima di sekolahnya. Ia sangat suka dengan bilangan prima. Setiap bangun tidur, ia selalu menulis bilangan-bilangan prima ke- tanggal, bulan, dan jam dia bangun (ex. Bilangan prima ke-26, 10, dan 21).\n\nSuatu pagi anda memergoki Ber menulis angka prima sesaat setelah dia bangun tidur. Anda melihat Ber menulis 69, yang mana bilangan tersebut bukan merupakan bilangan prima. Ber bersikukuh bahwa 69 merupakan bilangan prima, anda menjelaskan panjang lebar mengapa 69 bukan bilangan prima.\n\nAkhirnya, Ber meminta anda menulis program untuk mengetahui apakah suatu bilangan prima atau bukan. Bantu adik anda! \"Bantuin dong, nanti aku beliin bojot aa deh!\", ucap Ber.\n\nContoh:\n```\nMasukkan jumlah bilangan yang ingin dicek: 7\nBilangan ke-1: 2\nBilangan ke-2: 8\nBilangan ke-3: 9\nBilangan ke-4: 6\nBilangan ke-5: 71\nBilangan ke-6: 67\nBilangan ke-7: 93\nYa, Tidak, Tidak, Tidak, Ya, Ya, Tidak\n```\n*Catatan situs: masukan = jumlah bilangan lalu bilangan-bilangannya; keluaran satu baris `Ya`/`Tidak` dipisah koma dan spasi. Bilangan prima adalah bilangan bulat ≥ 2 yang hanya habis dibagi 1 dan dirinya sendiri; 1, 0 dan bilangan negatif bukan prima.*",
        reps: ['python', 'pseudo', 'flow'], match: 'lenient',
        solution: {
          python: r`# Program PrimeChecker
# Membaca N bilangan, lalu menampilkan "Ya"/"Tidak" (prima atau bukan) satu baris, dipisah ", "
# DECLARATIONS
# N, i, x : int
# hasil : str
# function IsPrime(n : int) -> bool
# ALGORITHM
def IsPrime(n):
    # Mengembalikan True bila n prima: n >= 2 dan tidak habis dibagi d untuk 2 <= d <= akar n
    prima = (n >= 2)
    d = 2
    while (d * d <= n and prima):
        if (n % d == 0):
            prima = False
        d = d + 1
    return prima

N = int(input())
hasil = ''
for i in range(1, N+1):
    x = int(input())
    if (i > 1):
        hasil = hasil + ', '
    if (IsPrime(x)):
        hasil = hasil + 'Ya'
    else:
        hasil = hasil + 'Tidak'
print(hasil)`,
          pseudo: r`Program PrimeChecker
{ Membaca N bilangan, lalu menampilkan Ya/Tidak (prima atau bukan) satu baris, dipisah koma }
KAMUS
  N, i, x : integer
  hasil : string
  function IsPrime (n : integer) → boolean

function IsPrime (n : integer) → boolean
  { True bila n prima: n ≥ 2 dan tidak habis dibagi d untuk 2 ≤ d ≤ akar n }
  LOCAL DECLARATIONS
    prima : boolean
    d : integer
  ALGORITHM
    prima ← (n ≥ 2)
    d ← 2
    while (d * d ≤ n and prima) do
      if (n mod d = 0) then
        prima ← false
      d ← d + 1
    → prima

ALGORITMA
  input(N)
  hasil ← ""
  i traversal [1..N]
    input(x)
    if (i > 1) then
      hasil ← hasil + ", "
    if (IsPrime(x)) then
      hasil ← hasil + "Ya"
    else
      hasil ← hasil + "Tidak"
  output(hasil)`,
        },
        tests: [
          { name: 'sample 1', stdin: ['7', '2', '8', '9', '6', '71', '67', '93'] },
          { name: 'sample 2', stdin: ['10', '90', '87', '55', '23', '21', '7', '99', '76', '88', '98729'] },
          { name: '1, 0, negative, 2', stdin: ['4', '1', '0', '-7', '2'], edge: '1, 0 and negatives are not prime; 2 is' },
          { name: 'perfect squares', stdin: ['3', '4', '25', '49'], edge: 'square of a prime: divisor equals sqrt(n)' },
          { name: 'single number', stdin: ['1', '97'], edge: 'N = 1' },
        ],
        wrong: [
          { code: 'def IsPrime(n):\n    prima = True\n    d = 2\n    while (d * d <= n and prima):\n        if (n % d == 0):\n            prima = False\n        d = d + 1\n    return prima\n\nN = int(input())\nhasil = ""\nfor i in range(1, N+1):\n    x = int(input())\n    if (i > 1):\n        hasil = hasil + ", "\n    if (IsPrime(x)):\n        hasil = hasil + "Ya"\n    else:\n        hasil = hasil + "Tidak"\nprint(hasil)', msg: 'Bilangan 1, 0, dan negatif bukan prima, tetapi tidak punya pembagi di loop sehingga dianggap prima. Awali dengan `prima = (n >= 2)`.', msgEn: '1, 0 and negatives are not prime, but they have no divisor in the loop so they are accepted as prime. Start with `prima = (n >= 2)`.', tag: 'not-complete' },
          { code: 'def IsPrime(n):\n    prima = (n >= 2)\n    d = 2\n    while (d * d < n and prima):\n        if (n % d == 0):\n            prima = False\n        d = d + 1\n    return prima\n\nN = int(input())\nhasil = ""\nfor i in range(1, N+1):\n    x = int(input())\n    if (i > 1):\n        hasil = hasil + ", "\n    if (IsPrime(x)):\n        hasil = hasil + "Ya"\n    else:\n        hasil = hasil + "Tidak"\nprint(hasil)', msg: 'Batas `d * d < n` melewatkan pembagi yang sama dengan akar n (mis. 4 = 2·2, 9 = 3·3, 25 = 5·5). Gunakan `d * d <= n`.', msgEn: 'The bound `d * d < n` skips the divisor equal to the square root of n (e.g. 4 = 2·2, 9 = 3·3, 25 = 5·5). Use `d * d <= n`.', tag: 'off-by-one' },
        ],
        plan: 'fungsi IsPrime(n): prima ← (n ≥ 2); d ← 2; selama d*d ≤ n dan masih prima: jika n habis dibagi d maka prima ← false; d ← d+1; kembalikan prima. Program utama: baca N; untuk i dari 1 sampai N: baca x, tambahkan pemisah ", " bila bukan yang pertama, tambahkan Ya atau Tidak; tampilkan hasil',
        skeleton: 'def IsPrime(n):\n    prima = (n >= ___)\n    d = ___\n    while (d * d ___ n and prima):\n        if (n % d == ___):\n            prima = ___\n        d = d + ___\n    return ___\n\nN = int(input())\nhasil = ""\nfor i in range(1, N+1):\n    x = int(input())\n    if (i > ___):\n        hasil = hasil + ", "\n    if (IsPrime(x)):\n        hasil = hasil + "Ya"\n    else:\n        hasil = hasil + "Tidak"\nprint(hasil)',
        hints: ['Pisahkan pekerjaan: satu fungsi yang menjawab "apakah n prima?" dan program utama yang membaca serta mencetak.', 'Bilangan n tidak prima bila punya pembagi d dengan 2 ≤ d ≤ n−1. Pola apa ini? (Flag pencarian.) Berhenti mencoba setelah d·d > n.', 'Perhatikan 1, 0, bilangan negatif dan kuadrat bilangan prima (4, 9, 25) sebagai kasus tepi. Pemisah ", " tidak boleh muncul di akhir.'],
        work: ['Fungsi `IsPrime(n)`: awalnya anggap prima jika `n >= 2`.', 'Coba pembagi `d = 2, 3, …` selama `d * d <= n` dan masih prima; bila `n % d == 0`, tandai bukan prima.', 'Kembalikan flag `prima` (return, bukan print).', 'Program utama: baca N; untuk tiap bilangan, tambahkan ", " sebelum elemen ke-2 dan seterusnya, lalu "Ya"/"Tidak" sesuai `IsPrime`.', 'Cetak string hasil satu kali di akhir.'],
        explanation: "Faktor n selalu berpasangan (d dan n/d), sehingga cukup menguji d sampai akar n: bila tidak ada pembagi sampai `d*d <= n`, n prima. Flag `prima` (pola pencarian) menghentikan loop begitu pembagi ditemukan. Pemisah ditambahkan *sebelum* setiap elemen kecuali yang pertama, sehingga tidak ada koma sisa di akhir.\n\nCatatan: kode tutor memakai optimasi 6k±1 (`i` dan `i+2`, `i += 6`) dan membuang koma akhir dengan `res[:-2]`; hasilnya benar, tetapi pembagian percobaan sederhana di atas sudah cukup untuk materi WI1102. Contoh 2 memuat 98729 yang juga prima (Ya).",
        syntax: ['def-function', 'return', 'while', 'if-else', 'for-range', 'call'],
        lineNotes: [
          n([1, 7], 'Kerangka: judul, spesifikasi, DECLARATIONS (termasuk tanda tangan fungsi `IsPrime`), ALGORITHM.', 'Skeleton: title, specification, DECLARATIONS (including the `IsPrime` signature), ALGORITHM.', 'program-template'),
          n(8, '`def IsPrime(n)`: fungsi dengan satu parameter yang akan **mengembalikan** True/False (bukan mencetak).', '`def IsPrime(n)`: a function with one parameter that will **return** True/False (not print).', 'def-function'),
          n(9, 'Komentar spesifikasi tepat di bawah `def`: apa yang dikembalikan dan kapan.', 'The specification comment right under `def`: what is returned and when.', 'comment'),
          n(10, 'Awalnya prima bila `n >= 2`. Ini langsung menyingkirkan 1, 0, dan bilangan negatif, yang tidak punya pembagi di loop sehingga akan lolos secara keliru.', 'Initially prime iff `n >= 2`. This immediately rules out 1, 0 and negatives, which have no divisor in the loop and would wrongly slip through.'),
          n(11, 'Pembagi percobaan pertama adalah 2.', 'The first trial divisor is 2.'),
          n([12, 15], 'Loop uji pembagi. `d * d <= n` (bukan `<`) agar d yang sama dengan akar n ikut diuji (4, 9, 25); `and prima` menghentikan loop begitu ditemukan pembagi. `d = d + 1` ada di luar `if` agar loop selalu maju.', 'Trial-division loop. `d * d <= n` (not `<`) so a d equal to the square root of n is tested (4, 9, 25); `and prima` stops the loop once a divisor is found. `d = d + 1` is outside the `if` so the loop always advances.', 'while'),
          n(16, '`return prima`: nilai dikembalikan ke pemanggil (pola *return*, bukan `print`).', '`return prima`: the value goes back to the caller (the *return* pattern, not `print`).', 'return'),
          n([18, 19], 'Program utama: baca N dan siapkan string hasil kosong.', 'Main program: read N and start with an empty result string.', 'input'),
          n(20, '`range(1, N+1)`: batas atas tidak ikut, jadi +1 agar bilangan ke-N ikut dibaca.', '`range(1, N+1)`: the upper bound is excluded, so +1 makes the N-th number included.', 'for-range'),
          n([22, 23], 'Pemisah ", " ditambahkan hanya sebelum elemen ke-2 dan seterusnya, sehingga tidak ada koma di akhir.', 'The separator ", " is added only before the 2nd element onward, so there is no trailing comma.'),
          n([24, 27], 'Memanggil fungsi di dalam kondisi `if`, lalu menyambung "Ya" atau "Tidak" (string disambung dengan `+`).', 'Calls the function inside the `if` condition, then appends "Ya" or "Tidak" (strings are joined with `+`).', 'call'),
          n(28, 'Seluruh keluaran dicetak sekali di akhir sebagai satu baris.', 'The whole output is printed once at the end as a single line.', 'print-str'),
        ],
        pseudoNotes: [
          n([3, 6], 'KAMUS program utama dan deklarasi fungsi `IsPrime`.', 'KAMUS of the main program and the declaration of function `IsPrime`.'),
          n([8, 13], 'Fungsi dengan KAMUS lokal (`prima`, `d`). Arti sama dengan versi Python.', 'A function with local declarations (`prima`, `d`). Same meaning as the Python version.'),
          n(14, 'Anggap prima bila n ≥ 2 (menyingkirkan 1, 0, negatif).', 'Assume prime when n ≥ 2 (rules out 1, 0, negatives).'),
          n([16, 19], 'Loop uji pembagi sampai d·d ≤ n; `mod` = sisa bagi.', 'Trial-division loop while d·d ≤ n; `mod` = remainder.'),
          n(20, '`→ prima` mengembalikan nilai fungsi.', '`→ prima` returns the function value.'),
          n([22, 33], 'Algoritma utama: baca N, bangun string hasil dengan pemisah, tampilkan satu kali.', 'Main algorithm: read N, build the result string with separators, output once.'),
        ],
        refs: [{ src: ORK, page: 4 }],
        en: {
          stem: "Your younger sibling Ber has just learned about prime numbers at school. He loves prime numbers. Every time he wakes up, he writes the prime numbers with the index of the date, the month and the hour he woke up (e.g. the 26th, 10th and 21st prime).\n\nOne morning you catch Ber writing a \"prime\" right after waking up. You see him write 69, which is not a prime number. Ber insists that 69 is prime; you explain at length why 69 is not prime.\n\nFinally Ber asks you to write a program that tells whether a number is prime or not. Help your sibling! \"Help me please, I'll buy you a bojot aa later!\", says Ber.\n\nExample:\n```\nMasukkan jumlah bilangan yang ingin dicek: 7\nBilangan ke-1: 2\nBilangan ke-2: 8\nBilangan ke-3: 9\nBilangan ke-4: 6\nBilangan ke-5: 71\nBilangan ke-6: 67\nBilangan ke-7: 93\nYa, Tidak, Tidak, Tidak, Ya, Ya, Tidak\n```\n*Site note: input = the count of numbers, then the numbers; output is one line of `Ya` (yes) / `Tidak` (no) separated by a comma and a space. A prime is an integer ≥ 2 divisible only by 1 and itself; 1, 0 and negatives are not prime.*",
          explanation: "Divisors of n come in pairs (d and n/d), so it is enough to test d up to the square root of n: if there is no divisor while `d*d <= n`, n is prime. The flag `prima` (search pattern) stops the loop as soon as a divisor is found. The separator is added *before* every element except the first, so there is no leftover comma at the end.\n\nNote: the tutor's code uses the 6k±1 optimisation (`i` and `i+2`, `i += 6`) and removes the trailing comma with `res[:-2]`; the result is correct, but the plain trial division above is enough for the WI1102 syllabus. Example 2 contains 98729, which is also prime (Ya).",
          hints: ['Separate the work: one function that answers "is n prime?" and a main program that reads and prints.', 'n is not prime if it has a divisor d with 2 ≤ d ≤ n−1. Which pattern is this? (A search flag.) Stop trying once d·d > n.', 'Watch the edge cases 1, 0, negatives and squares of primes (4, 9, 25). The ", " separator must not appear at the end.'],
          work: ['Function `IsPrime(n)`: start by assuming prime when `n >= 2`.', 'Try divisors `d = 2, 3, …` while `d * d <= n` and still prime; if `n % d == 0`, mark not prime.', 'Return the `prima` flag (return, not print).', 'Main program: read N; for each number add ", " before the 2nd element onward, then "Ya"/"Tidak" according to `IsPrime`.', 'Print the result string once at the end.'],
          plan: 'function IsPrime(n): prime ← (n ≥ 2); d ← 2; while d*d ≤ n and still prime: if n divisible by d then prime ← false; d ← d+1; return prime. Main: read N; for i from 1 to N: read x, add the separator ", " if not first, append Ya or Tidak; output the result',
        },
      }],
    },
    {
      id: 'ork-p4', archetype: 'program', title: 'Problem 4 – Pesta Bang Ling', en: { title: "Problem 4 – Bang Ling's party" },
      source: { kind: 'tubay' as const, lang: 'id' as const, src: ORK, label: 'Problem 4', pages: [5], official: false, year: 2025 },
      figures: [{ src: ORK, page: 5 }],
      parts: [{
        id: 'ork-p4a', kind: 'program', decks: ['D06'], topic: 'Array: index range of marked items', difficulty: 2,
        patterns: ['array-populate', 'for-count', 'string-processing'], misconceptions: ['off-by-one', 'index-range'],
        stem: "Seusai dibagikan nilai UTS, Bang Ling menyelenggarakan pesta besar-besaran, dalam rangka syukuran nilai UTS Pengantar Prinsip Keberlanjutannya yang 100. Ling mengundang sebanyak N teman, dan semua teman Ling datang ke pesta.\n\nLing merupakan orang yang sangat menyukai ketepatan waktu, sehingga teman-temannya yang datang setelah setengah dari total temannya akan ditandai. Uniknya, temannya yang terakhir tidak akan ditandai.\n\nLing yang sibuk mengatur pesta, meminta anda untuk membuat program yang mengotomatisasi penandaan temannya. Bantulah Ling! \"Bantuin.\", ucap Ling\n\n**Note:** Urutan teman yang memasuki pesta sesuai dengan urutan input.\n\nContoh:\n```\nMasukkan jumlah teman yang datang : 5\nMasukkan teman ke-1: Jang\nMasukkan teman ke-2: Jung\nMasukkan teman ke-3: Nos\nMasukkan teman ke-4: Nil\nMasukkan teman ke-5: Reb\nTeman yang ditandai: Nos, Nil\n```\n(Pada contoh kedua, N = 13 dengan teman A, B, …, M, yang ditandai adalah G, H, I, J, K, L.)\n\n*Catatan situs: pemisah nama pada keluaran diasumsikan koma + spasi (contoh di soal tidak konsisten antara `, ` dan `,`; penilaian tidak peka terhadap tanda baca). Bila tidak ada yang ditandai, hanya label yang dicetak.*",
        reps: ['python', 'pseudo', 'flow'], match: 'judge',
        judge: r`def judge(stdin, out, ref_out):
    import re
    def names(s):
        if ':' not in s:
            return None
        return re.findall(r'[^\s,]+', s.split(':', 1)[1])
    a = names(out)
    b = names(ref_out)
    if a is None:
        return 'The output must start with the label "Teman yang ditandai:" followed by the marked names.'
    if a != b:
        return 'The marked friends are wrong: they must be exactly the friends after half of N, without the last one, in arrival order.'
    return None`,
        solution: {
          python: r`# Program MarkFriends
# Membaca N nama teman (urutan kedatangan), lalu menampilkan nama yang datang setelah setengah dari N, kecuali teman terakhir
# DECLARATIONS
# N, i : int
# teman : array of str
# hasil : str
# ALGORITHM
N = int(input())
teman = ['' for i in range(N)]
for i in range(N):
    teman[i] = input()
hasil = ''
for i in range(N // 2, N - 1):
    if (i > N // 2):
        hasil = hasil + ', '
    hasil = hasil + teman[i]
print('Teman yang ditandai: ' + hasil)`,
          pseudo: r`Program MarkFriends
{ Membaca N nama teman (urutan kedatangan), lalu menampilkan yang datang setelah setengah dari N, kecuali yang terakhir }
KAMUS
  N, i : integer
  teman : array [0..N-1] of string
  hasil : string
ALGORITMA
  input(N)
  i traversal [0..N-1]
    input(teman[i])
  hasil ← ""
  i traversal [N div 2..N-2]
    if (i > N div 2) then
      hasil ← hasil + ", "
    hasil ← hasil + teman[i]
  output("Teman yang ditandai: " + hasil)`,
        },
        tests: [
          { name: 'sample 1 (N = 5)', stdin: ['5', 'Jang', 'Jung', 'Nos', 'Nil', 'Reb'] },
          { name: 'sample 2 (N = 13)', stdin: ['13', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'] },
          { name: 'N = 1', stdin: ['1', 'Solo'], edge: 'only the last friend: nobody marked' },
          { name: 'N = 2', stdin: ['2', 'Ana', 'Budi'], edge: 'nobody marked' },
          { name: 'N = 4 (even)', stdin: ['4', 'W', 'X', 'Y', 'Z'], edge: 'even N: half = 2, only the 3rd is marked' },
        ],
        wrong: [
          { code: "N = int(input())\nteman = ['' for i in range(N)]\nfor i in range(N):\n    teman[i] = input()\nhasil = ''\nfor i in range(N // 2, N):\n    if (i > N // 2):\n        hasil = hasil + ', '\n    hasil = hasil + teman[i]\nprint('Teman yang ditandai: ' + hasil)", msg: 'Teman yang terakhir tidak ditandai. `range(N // 2, N)` ikut memproses indeks N−1; berhenti di `N - 1`.', msgEn: 'The last friend is not marked. `range(N // 2, N)` also processes index N−1; stop at `N - 1`.', tag: 'off-by-one' },
          { code: "N = int(input())\nteman = ['' for i in range(N)]\nfor i in range(N):\n    teman[i] = input()\nhasil = ''\nfor i in range(N // 2 + 1, N - 1):\n    if (i > N // 2 + 1):\n        hasil = hasil + ', '\n    hasil = hasil + teman[i]\nprint('Teman yang ditandai: ' + hasil)", msg: 'Mulai satu indeks terlalu lambat. Untuk N = 5 teman ke-3 (indeks 2 = N // 2) sudah termasuk yang datang setelah setengah. Mulai dari indeks `N // 2`.', msgEn: 'Starting one index too late. For N = 5 the 3rd friend (index 2 = N // 2) already arrived after half. Start at index `N // 2`.', tag: 'off-by-one' },
        ],
        plan: 'baca N; simpan N nama ke array teman (indeks 0..N-1); hasil ← ""; untuk i dari N div 2 sampai N-2: tambahkan ", " bila bukan nama pertama yang ditandai, lalu tambahkan teman[i]; tampilkan label + hasil',
        skeleton: "N = int(input())\nteman = ['' for i in range(___)]\nfor i in range(___):\n    teman[i] = input()\nhasil = ''\nfor i in range(N // ___, N - ___):\n    if (i > N // ___):\n        hasil = hasil + ', '\n    hasil = hasil + teman[i]\nprint('Teman yang ditandai: ' + hasil)",
        hints: ['Uji N = 5 dan N = 13 dengan tangan: nomor berapa saja (1-based) yang ditandai, lalu ubah jadi indeks 0-based.', 'Bandingkan dengan N // 2 (pembagian bulat). Kedua contoh memberi indeks awal yang sama dengan rumus apa? Indeks akhir yang ditandai adalah N−2.', 'Untuk N = 1 atau 2 tidak ada yang ditandai: rentang `range(a, b)` yang kosong tidak menjalankan loop.'],
        work: ['Simpan semua nama ke array (urutan = urutan kedatangan).', 'N = 5: ditandai nomor 3–4 → indeks 2–3. N = 13: ditandai nomor 7–12 → indeks 6–11. Awal = `N // 2`, akhir terakhir = `N - 2`.', 'Loop `for i in range(N // 2, N - 1)` (batas atas tidak ikut).', 'Tambahkan ", " sebelum setiap nama kecuali yang pertama ditandai (`i > N // 2`).', 'Cetak label diikuti `hasil`.'],
        explanation: "Teman ke-k (1-based) datang \"setelah setengah\" bila k > N/2. Dengan indeks 0-based, indeks pertama yang ditandai adalah `N // 2` (N = 5 → 2, N = 13 → 6; indeks 2 = teman ke-3 > 2,5 dan indeks 6 = teman ke-7 > 6,5). Teman terakhir (indeks N−1) dikecualikan, sehingga rentang `range(N // 2, N - 1)`. Untuk N = 1 dan 2 rentang kosong.\n\nCatatan: kode tutor memakai *slicing* `teman[len(teman)//2 : -1]` dan `', '.join(...)` di dalam f-string dengan tanda kutip yang sama (hanya valid di Python 3.12+). Slicing/`join` tidak diajarkan di WI1102; versi di atas memakai loop dan indeks.",
        syntax: ['input', 'list-init', 'list-index', 'for-range', 'print-str'],
        lineNotes: [
          n([1, 7], 'Kerangka: judul, spesifikasi, DECLARATIONS, ALGORITHM.', 'Skeleton: title, specification, DECLARATIONS, ALGORITHM.', 'program-template'),
          n(8, '`int(input())`: jumlah teman N berupa bilangan.', '`int(input())`: the number of friends N is a number.', 'input'),
          n(9, 'Array `teman` berukuran N dengan pola `[… for i in range(N)]`; indeks 0..N−1.', 'Array `teman` of size N with the `[… for i in range(N)]` pattern; indices 0..N−1.', 'list-init'),
          n([10, 11], 'Mengisi array dari masukan; urutan input = urutan kedatangan. Nama tidak dikonversi (string).', 'Fills the array from the input; input order = arrival order. Names are not converted (strings).', 'list-index'),
          n(12, 'Akumulator string diinisialisasi sebelum loop.', 'The string accumulator is initialised before the loop.'),
          n(13, '`range(N // 2, N - 1)`: mulai dari indeks `N // 2` (pertama yang datang setelah setengah), berhenti sebelum `N - 1` (yang terakhir tidak ditandai). Untuk N = 1 atau 2 rentangnya kosong.', '`range(N // 2, N - 1)`: starts at index `N // 2` (first to arrive after half) and stops before `N - 1` (the last is not marked). For N = 1 or 2 the range is empty.', 'for-range'),
          n([14, 15], 'Pemisah hanya sebelum nama kedua yang ditandai dan seterusnya, agar tidak ada koma di awal/akhir.', 'The separator comes only before the second marked name onward, so there is no comma at the start/end.'),
          n(16, 'Menyambung nama ke `hasil` dengan `+` (keduanya string, tidak perlu `str()`).', 'Appends the name to `hasil` with `+` (both are strings, so no `str()` needed).'),
          n(17, 'Label + hasil dicetak sekali di akhir.', 'Label + result printed once at the end.', 'print-str'),
        ],
        pseudoNotes: [
          n([3, 6], 'KAMUS: N, i integer; `teman` array N string; `hasil` string.', 'KAMUS (declarations): N, i are integers; `teman` is an array of N strings; `hasil` is a string.'),
          n([8, 10], 'Membaca N lalu mengisi array dengan traversal 0..N−1.', 'Reads N then fills the array with a traversal 0..N−1.'),
          n([12, 15], 'Traversal dari `N div 2` sampai `N-2`: hanya yang ditandai. Pemisah dipasang sebelum elemen ke-2 dan seterusnya.', 'Traversal from `N div 2` to `N-2`: only the marked friends. The separator goes before the 2nd element onward.'),
          n(16, 'Mencetak label dan daftar nama.', 'Outputs the label and the name list.'),
        ],
        refs: [{ src: ORK, page: 5 }],
        en: {
          stem: "After the midterm (UTS) grades are handed out, Bang Ling throws a huge party to celebrate scoring 100 in his Introduction to Sustainability Principles midterm. Ling invites N friends, and all of them come to the party.\n\nLing loves punctuality, so friends who arrive after half of all his friends will be marked. Uniquely, the very last friend is not marked.\n\nBusy organising the party, Ling asks you to write a program that automates marking his friends. Help Ling! \"Help.\", says Ling\n\n**Note:** the order in which friends enter the party is the input order.\n\nExample:\n```\nMasukkan jumlah teman yang datang : 5\nMasukkan teman ke-1: Jang\nMasukkan teman ke-2: Jung\nMasukkan teman ke-3: Nos\nMasukkan teman ke-4: Nil\nMasukkan teman ke-5: Reb\nTeman yang ditandai: Nos, Nil\n```\n(In the second example, N = 13 with friends A, B, …, M; the marked ones are G, H, I, J, K, L.)\n\n*Site note: the name separator in the output is assumed to be comma + space (the statement's examples are inconsistent between `, ` and `,`; marking ignores punctuation). If nobody is marked, only the label is printed.*",
          explanation: "Friend k (1-based) arrives \"after half\" when k > N/2. With 0-based indices the first marked index is `N // 2` (N = 5 → 2, N = 13 → 6; index 2 = friend 3 > 2.5 and index 6 = friend 7 > 6.5). The last friend (index N−1) is excluded, so the range is `range(N // 2, N - 1)`. For N = 1 and 2 the range is empty.\n\nNote: the tutor's code uses *slicing* `teman[len(teman)//2 : -1]` and `', '.join(...)` inside an f-string that reuses the same quote character (only valid in Python 3.12+). Slicing/`join` are not taught in WI1102; the version above uses a loop and indices.",
          hints: ['Work N = 5 and N = 13 by hand: which numbers (1-based) are marked, then convert to 0-based indices.', 'Compare with N // 2 (integer division). Which formula gives the same start index in both examples? The last marked index is N−2.', 'For N = 1 or 2 nobody is marked: an empty `range(a, b)` does not run the loop.'],
          work: ['Store all names in an array (order = arrival order).', 'N = 5: marked 3–4 → indices 2–3. N = 13: marked 7–12 → indices 6–11. Start = `N // 2`, last = `N - 2`.', 'Loop `for i in range(N // 2, N - 1)` (upper bound excluded).', 'Add ", " before every name except the first marked one (`i > N // 2`).', 'Print the label followed by `hasil`.'],
          plan: 'read N; store N names in array teman (indices 0..N-1); hasil ← ""; for i from N div 2 to N-2: add ", " unless it is the first marked name, then add teman[i]; output label + hasil',
        },
      }],
    },
    {
      id: 'ork-p5', archetype: 'program', title: 'Problem 5 – Blackjack di Las Vegas', en: { title: 'Problem 5 – Blackjack in Las Vegas' },
      source: { kind: 'tubay' as const, lang: 'id' as const, src: ORK, label: 'Problem 5', pages: [6], official: false, year: 2025 },
      figures: [{ src: ORK, page: 6 }],
      parts: [{
        id: 'ork-p5a', kind: 'program', decks: ['D10', 'D06'], topic: 'Function with return: blackjack hand value', difficulty: 3,
        patterns: ['function-def-call', 'accumulate-sum', 'game-rules', 'array-compare'], misconceptions: ['return-vs-print', 'not-complete'],
        stem: "Selayaknya individu yang berkuliah di ITB, sudah pasti anda merasa jenuh akan semua hal yang dilemparkan oleh ITB, baik itu kuis, tubes, anggota kelompok yang main tinggal, UTS ataupun UAS. Oleh karena itu, anda terbang ke Las Vegas untuk melepas penat. Sesampainya di Las Vegas, anda bertemu dengan Tuan Suy di Grand Vegas Casino. Tuan Suy merupakan penjudi pemula yang sedang mempelajari aturan dari permainan blackjack. Aturan dari permainan tersebut adalah sebagai berikut:\n\n**Aturan Singkat:**\n- Pemain dibagikan dua kartu. Dealer dibagikan satu.\n- Pemain dapat meminta kartu lain (*hit*) sebanyak yang diinginkan. Jika jumlah kartunya melebihi 21, ia langsung kalah dalam ronde tersebut.\n- Dealer kemudian membagikan kartu tambahan sampai memenuhi 2 kondisi berikut:\n  1. Jumlah kartu dealer melebihi 21, yang berarti pemain memenangkan ronde tersebut.\n  2. Jumlah kartu dealer lebih besar atau sama dengan 17. Jika total kartu pemain lebih besar dari dealer, pemain menang. Jika tidak, dealer menang (bahkan jika seri).\n- Nilai kartu adalah sebagai berikut: As : 1/11 — Kartu Angka : sesuai dengan nilai angka — K, Q, J : 10.\n\nBuatlah program untuk menentukan hand mana yang lebih baik antara dua kondisi.\n\nContoh:\n```\nMasukkan jumlah kartu di hand 1: 5\nMasukkan kartu ke-1 di hand 1: K\nMasukkan kartu ke-2 di hand 1: 1\nMasukkan kartu ke-3 di hand 1: 3\nMasukkan kartu ke-4 di hand 1: 2\nMasukkan kartu ke-5 di hand 1: 4\nMasukkan jumlah kartu di hand 2: 3\nMasukkan kartu ke-1 di hand 2: J\nMasukkan kartu ke-2 di hand 2: 10\nMasukkan kartu ke-3 di hand 2: A\nHand yang lebih baik adalah hand 2!\n```\n**Tugas (asumsi situs; soal asli tidak merinci):** masukan = jumlah kartu hand 1, kartu-kartunya, jumlah kartu hand 2, kartu-kartunya (`A`, `K`, `Q`, `J`, atau angka). Nilai sebuah hand adalah total terbesar yang tidak melebihi 21 (As bernilai 1 atau 11 sesuka pemilik hand); hand yang melebihi 21 (*bust*) bernilai 0. Hand 1 lebih baik hanya jika nilainya *lebih besar* dari hand 2; selain itu (termasuk seri dan keduanya bust) hand 2, mengikuti aturan \"dealer menang bila seri\".",
        reps: ['python', 'pseudo', 'flow'], match: 'lenient',
        solution: {
          python: r`# Program Blackjack
# Membandingkan dua hand: nilai tertinggi yang tidak melebihi 21 menang; bust bernilai 0; seri dimenangkan hand 2
# DECLARATIONS
# jml1, jml2, i : int
# hand1, hand2 : array of str
# function HitungKartu(hand : array of str, n : int) -> int
# ALGORITHM
def HitungKartu(hand, n):
    # Mengembalikan nilai terbaik hand (As = 1 atau 11), atau 0 bila melebihi 21 (bust)
    total = 0
    ace = 0
    for i in range(n):
        if (hand[i] == 'K' or hand[i] == 'Q' or hand[i] == 'J'):
            total = total + 10
        elif (hand[i] == 'A'):
            total = total + 1
            ace = ace + 1
        else:
            total = total + int(hand[i])
    if (ace > 0 and total + 10 <= 21):
        total = total + 10
    if (total > 21):
        total = 0
    return total

jml1 = int(input())
hand1 = ['' for i in range(jml1)]
for i in range(jml1):
    hand1[i] = input()
jml2 = int(input())
hand2 = ['' for i in range(jml2)]
for i in range(jml2):
    hand2[i] = input()
if (HitungKartu(hand1, jml1) > HitungKartu(hand2, jml2)):
    print('Hand yang lebih baik adalah hand 1!')
else:
    print('Hand yang lebih baik adalah hand 2!')`,
          pseudo: r`Program Blackjack
{ Membandingkan dua hand: nilai tertinggi yang tidak melebihi 21 menang; bust bernilai 0; seri dimenangkan hand 2 }
KAMUS
  jml1, jml2, i : integer
  hand1 : array [0..jml1-1] of string
  hand2 : array [0..jml2-1] of string
  function HitungKartu (hand : array of string, n : integer) → integer

function HitungKartu (hand : array of string, n : integer) → integer
  { nilai terbaik hand (As = 1 atau 11), atau 0 bila melebihi 21 (bust) }
  LOCAL DECLARATIONS
    total, ace, i : integer
  ALGORITHM
    total ← 0
    ace ← 0
    i traversal [0..n-1]
      if (hand[i] = "K" or hand[i] = "Q" or hand[i] = "J") then
        total ← total + 10
      else
        if (hand[i] = "A") then
          total ← total + 1
          ace ← ace + 1
        else
          total ← total + int(hand[i])
    if (ace > 0 and total + 10 ≤ 21) then
      total ← total + 10
    if (total > 21) then
      total ← 0
    → total

ALGORITMA
  input(jml1)
  i traversal [0..jml1-1]
    input(hand1[i])
  input(jml2)
  i traversal [0..jml2-1]
    input(hand2[i])
  if (HitungKartu(hand1, jml1) > HitungKartu(hand2, jml2)) then
    output("Hand yang lebih baik adalah hand 1!")
  else
    output("Hand yang lebih baik adalah hand 2!")`,
        },
        tests: [
          { name: 'sample (20 vs 21)', stdin: ['5', 'K', '1', '3', '2', '4', '3', 'J', '10', 'A'] },
          { name: 'tie 20 vs 20', stdin: ['2', '10', 'K', '2', 'Q', 'J'], edge: 'tie goes to hand 2' },
          { name: 'two aces and a 9', stdin: ['3', 'A', 'A', '9', '2', '10', '10'], edge: 'A, A, 9 = 21 (one ace as 11, one as 1) beats 20' },
          { name: 'both bust', stdin: ['3', 'K', 'Q', 'J', '3', 'K', 'Q', '5'], edge: 'both over 21: both worth 0, hand 2' },
          { name: 'two aces and a 10', stdin: ['3', 'A', 'A', '10', '2', '5', '5'], edge: 'A, A, 10 = 12 (both aces as 1), not bust' },
        ],
        wrong: [
          { code: "def HitungKartu(hand, n):\n    total = 0\n    ace = 0\n    for i in range(n):\n        if (hand[i] == 'K' or hand[i] == 'Q' or hand[i] == 'J'):\n            total = total + 10\n        elif (hand[i] == 'A'):\n            ace = ace + 1\n        else:\n            total = total + int(hand[i])\n    for j in range(ace):\n        if (total + 11 <= 21):\n            total = total + 11\n        else:\n            total = total + 1\n    if (total > 21):\n        total = 0\n    return total\n\njml1 = int(input())\nhand1 = ['' for i in range(jml1)]\nfor i in range(jml1):\n    hand1[i] = input()\njml2 = int(input())\nhand2 = ['' for i in range(jml2)]\nfor i in range(jml2):\n    hand2[i] = input()\nif (HitungKartu(hand1, jml1) > HitungKartu(hand2, jml2)):\n    print('Hand yang lebih baik adalah hand 1!')\nelse:\n    print('Hand yang lebih baik adalah hand 2!')", msg: 'Setiap As dicoba sebagai 11 satu per satu tanpa memperhitungkan As berikutnya yang minimal bernilai 1. A, A, 10 menjadi 11 + 1 + 10 = 22 (bust), padahal 1 + 1 + 10 = 12. Hitung semua As sebagai 1, lalu naikkan paling banyak satu As menjadi 11 (+10) bila total + 10 ≤ 21.', msgEn: 'Each ace is tried as 11 one by one without accounting for the later aces being worth at least 1. A, A, 10 becomes 11 + 1 + 10 = 22 (bust) although 1 + 1 + 10 = 12. Count every ace as 1, then upgrade at most one ace to 11 (+10) if total + 10 ≤ 21.', tag: 'not-complete' },
          { code: "def HitungKartu(hand, n):\n    total = 0\n    for i in range(n):\n        if (hand[i] == 'K' or hand[i] == 'Q' or hand[i] == 'J'):\n            total = total + 10\n        elif (hand[i] == 'A'):\n            total = total + 1\n        else:\n            total = total + int(hand[i])\n    return total\n\njml1 = int(input())\nhand1 = ['' for i in range(jml1)]\nfor i in range(jml1):\n    hand1[i] = input()\njml2 = int(input())\nhand2 = ['' for i in range(jml2)]\nfor i in range(jml2):\n    hand2[i] = input()\nif (HitungKartu(hand1, jml1) > HitungKartu(hand2, jml2)):\n    print('Hand yang lebih baik adalah hand 1!')\nelse:\n    print('Hand yang lebih baik adalah hand 2!')", msg: 'Hand yang melebihi 21 (bust) harus dianggap kalah (nilai 0), dan As bisa bernilai 11. Program ini hanya menjumlah kartu sehingga hand bust bisa "menang" dan As selalu 1.', msgEn: 'A hand over 21 (bust) must count as a loss (value 0), and an ace can be worth 11. This program only sums the cards, so a bust hand can "win" and an ace is always 1.', tag: 'not-complete' },
          { code: "def HitungKartu(hand, n):\n    total = 0\n    ace = 0\n    for i in range(n):\n        if (hand[i] == 'K' or hand[i] == 'Q' or hand[i] == 'J'):\n            total = total + 10\n        elif (hand[i] == 'A'):\n            total = total + 1\n            ace = ace + 1\n        else:\n            total = total + int(hand[i])\n    if (ace > 0 and total + 10 <= 21):\n        total = total + 10\n    if (total > 21):\n        total = 0\n    return total\n\njml1 = int(input())\nhand1 = ['' for i in range(jml1)]\nfor i in range(jml1):\n    hand1[i] = input()\njml2 = int(input())\nhand2 = ['' for i in range(jml2)]\nfor i in range(jml2):\n    hand2[i] = input()\nif (HitungKartu(hand1, jml1) >= HitungKartu(hand2, jml2)):\n    print('Hand yang lebih baik adalah hand 1!')\nelse:\n    print('Hand yang lebih baik adalah hand 2!')", msg: 'Seri (dan keduanya bust) dimenangkan hand 2: "dealer menang bahkan jika seri". Gunakan `>` bukan `>=` agar hand 1 hanya menang bila nilainya benar-benar lebih besar.', msgEn: 'A tie (and both busting) goes to hand 2: "the dealer wins even on a tie". Use `>` not `>=` so that hand 1 wins only when its value is strictly greater.', tag: 'assign-vs-eq' },
        ],
        plan: 'fungsi HitungKartu(hand, n): total ← 0, ace ← 0; untuk tiap kartu: K/Q/J tambah 10; A tambah 1 dan ace ← ace+1; selain itu tambah nilai angkanya; jika ada As dan total+10 ≤ 21 maka total ← total+10; jika total > 21 maka total ← 0; kembalikan total. Utama: baca kedua hand; hand 1 menang hanya jika nilainya > nilai hand 2',
        skeleton: "def HitungKartu(hand, n):\n    total = 0\n    ace = 0\n    for i in range(n):\n        if (hand[i] == 'K' or hand[i] == 'Q' or hand[i] == 'J'):\n            total = total + ___\n        elif (hand[i] == 'A'):\n            total = total + ___\n            ace = ace + 1\n        else:\n            total = total + int(hand[i])\n    if (ace > 0 and total + ___ <= ___):\n        total = total + ___\n    if (total > ___):\n        total = ___\n    return total\n\njml1 = int(input())\nhand1 = ['' for i in range(jml1)]\nfor i in range(jml1):\n    hand1[i] = input()\njml2 = int(input())\nhand2 = ['' for i in range(jml2)]\nfor i in range(jml2):\n    hand2[i] = input()\nif (HitungKartu(hand1, jml1) ___ HitungKartu(hand2, jml2)):\n    print('Hand yang lebih baik adalah hand 1!')\nelse:\n    print('Hand yang lebih baik adalah hand 2!')",
        hints: ['Buat fungsi yang menghitung nilai satu hand dan *mengembalikan* angkanya; program utama hanya membandingkan dua nilai.', 'Kartu K/Q/J = 10, kartu angka = nilainya, As = 1 atau 11. Hitung dulu semua kartu dengan As = 1.', 'Hanya satu As yang mungkin bernilai 11 (dua As = 22 sudah bust). Kapan sebuah As boleh dinaikkan menjadi 11? Dan bagaimana mewakili hand yang bust?'],
        work: ['Jumlahkan semua kartu: K/Q/J → 10, angka → `int(...)`, As → 1 (sambil menghitung `ace`).', 'Jika ada As dan `total + 10 <= 21`, naikkan satu As menjadi 11 (`total + 10`).', 'Jika `total > 21` (bust) kembalikan 0; selain itu kembalikan `total`.', 'Utama: baca hand 1 dan hand 2 ke array, bandingkan `HitungKartu(hand1) > HitungKartu(hand2)`.', 'Cetak hand 1 bila lebih besar, selain itu hand 2 (seri → hand 2).'],
        explanation: "Contoh: hand 1 = K,1,3,2,4 → 10+1+3+2+4 = 20; hand 2 = J,10,A → 10+10+1 = 21 (As = 11 akan bust, jadi 1). 21 > 20 sehingga hand 2 lebih baik.\n\nStrategi nilai As yang benar: hitung semua As sebagai 1, lalu *paling banyak satu* As dapat dinaikkan menjadi 11 (tambah 10) bila hasilnya masih ≤ 21. Dua As bernilai 11 sekaligus = 22 selalu bust.\n\nCatatan: soal asli tidak merinci format masukan dan aturan seri; situs ini mengikuti kunci tutor (hand 1 menang hanya jika **strictly** lebih besar; bust = 0).\n\n**Bug pada kode tutor:** loop `for j in range(ace)` mencoba tiap As sebagai 11 tanpa memperhitungkan As berikutnya yang minimal bernilai 1. Hand `A, A, 10` dihitung 11 + 1 + 10 = 22 (bust → 0), padahal nilai terbaiknya 12. Versi di atas memperbaikinya.",
        syntax: ['def-function', 'return', 'list-index', 'for-range', 'if-elif', 'relational-logical', 'call'],
        lineNotes: [
          n([1, 7], 'Kerangka: judul, spesifikasi (aturan bust dan seri), DECLARATIONS termasuk tanda tangan fungsi.', 'Skeleton: title, specification (bust and tie rules), DECLARATIONS including the function signature.', 'program-template'),
          n(8, '`HitungKartu(hand, n)` menerima array dan banyaknya kartu, dan **mengembalikan** nilai hand.', '`HitungKartu(hand, n)` takes the array and the number of cards, and **returns** the hand value.', 'def-function'),
          n(9, 'Komentar spesifikasi di bawah `def`.', 'Specification comment under `def`.', 'comment'),
          n([10, 11], '`total` dan `ace` diinisialisasi sebelum loop (akumulator dan penghitung).', '`total` and `ace` are initialised before the loop (accumulator and counter).'),
          n([12, 13], 'Loop atas indeks 0..n−1. Kartu gambar K, Q, J dites dengan `or` (setiap perbandingan ditulis lengkap, bukan `hand[i] == "K" or "Q"`).', 'Loop over indices 0..n−1. The face cards K, Q, J are tested with `or` (each comparison written out in full, not `hand[i] == "K" or "Q"`).', 'relational-logical'),
          n(14, 'Kartu gambar bernilai 10.', 'Face cards are worth 10.'),
          n([15, 17], 'As dihitung 1 dulu dan dicatat dengan `ace`; keputusan 1 atau 11 ditunda sampai semua kartu terhitung.', 'An ace is counted as 1 first and recorded in `ace`; the decision between 1 and 11 is postponed until all cards are counted.', 'if-elif'),
          n([18, 19], 'Kartu angka dikonversi dengan `int(...)` karena masukan berupa string.', 'A number card is converted with `int(...)` because the input is a string.', 'type-conversion'),
          n([20, 21], 'Naikkan **satu** As menjadi 11 hanya bila total + 10 ≤ 21. Dua As sebagai 11 sama dengan 22, jadi tidak pernah perlu lebih dari satu.', 'Upgrade **one** ace to 11 only if total + 10 ≤ 21. Two aces as 11 equal 22, so more than one is never needed.'),
          n([22, 23], 'Bust (> 21) dinilai 0 sehingga selalu kalah dari hand yang tidak bust.', 'A bust (> 21) is valued 0 so it always loses to a hand that is not bust.'),
          n(24, '`return total`: mengembalikan nilai, bukan `print`.', '`return total`: returns the value, not `print`.', 'return'),
          n([26, 33], 'Membaca dua hand: banyak kartu, lalu array diisi dari masukan (pola yang sama dua kali).', 'Reads the two hands: the number of cards, then the array filled from input (the same pattern twice).', 'list-init'),
          n([34, 37], 'Hand 1 hanya menang bila nilainya **lebih besar** (`>`); seri dan keduanya bust jatuh ke hand 2. Fungsi dipanggil di dalam kondisi.', 'Hand 1 wins only if its value is **strictly greater** (`>`); a tie and both busting fall to hand 2. The function is called inside the condition.', 'call'),
        ],
        pseudoNotes: [
          n([3, 7], 'KAMUS: dua array hand dan deklarasi fungsi `HitungKartu`.', 'KAMUS (declarations): two hand arrays and the declaration of function `HitungKartu`.'),
          n([9, 13], 'Fungsi dengan KAMUS lokal; `total` dan `ace` diinisialisasi di awal ALGORITMA.', 'A function with local declarations; `total` and `ace` are initialised at the start of its ALGORITHM.'),
          n([16, 24], 'Setiap kartu: K/Q/J → 10; A → 1 dan `ace` bertambah; angka → `int(...)`.', 'Each card: K/Q/J → 10; A → 1 and `ace` increases; a number → `int(...)`.'),
          n([25, 28], 'Satu As naik ke 11 bila muat; bust → 0.', 'One ace goes up to 11 if it fits; bust → 0.'),
          n(29, '`→ total` mengembalikan nilai.', '`→ total` returns the value.'),
          n([31, 41], 'Algoritma utama: baca kedua hand, bandingkan nilainya dengan `>`.', 'Main algorithm: read both hands and compare their values with `>`.'),
        ],
        refs: [{ src: ORK, page: 6 }],
        en: {
          stem: "Like any student at ITB, you are surely fed up with everything ITB throws at you: quizzes, big assignments, group members who ghost you, midterms and finals. So you fly to Las Vegas to unwind. Arriving at the Grand Vegas Casino, you meet Mr. Suy, a beginner gambler who is learning the rules of blackjack. The rules are as follows:\n\n**Short rules:**\n- The player is dealt two cards. The dealer is dealt one.\n- The player may ask for another card (*hit*) as many times as they want. If the card total exceeds 21, they lose the round immediately.\n- The dealer then deals extra cards until one of these two conditions holds:\n  1. The dealer's total exceeds 21, meaning the player wins the round.\n  2. The dealer's total is at least 17. If the player's total is greater than the dealer's, the player wins. Otherwise the dealer wins (even on a tie).\n- Card values: Ace : 1/11 — Number cards : the number — K, Q, J : 10.\n\nWrite a program that determines which hand is better between the two scenarios.\n\nExample:\n```\nMasukkan jumlah kartu di hand 1: 5\nMasukkan kartu ke-1 di hand 1: K\nMasukkan kartu ke-2 di hand 1: 1\nMasukkan kartu ke-3 di hand 1: 3\nMasukkan kartu ke-4 di hand 1: 2\nMasukkan kartu ke-5 di hand 1: 4\nMasukkan jumlah kartu di hand 2: 3\nMasukkan kartu ke-1 di hand 2: J\nMasukkan kartu ke-2 di hand 2: 10\nMasukkan kartu ke-3 di hand 2: A\nHand yang lebih baik adalah hand 2!\n```\n**Task (site assumptions; the original is not specific):** input = number of cards in hand 1, its cards, number of cards in hand 2, its cards (`A`, `K`, `Q`, `J`, or a number). A hand's value is the highest total not exceeding 21 (an ace counts as 1 or 11, whichever the owner prefers); a hand over 21 (*bust*) is worth 0. Hand 1 is better only if its value is *strictly greater* than hand 2's; otherwise (including a tie and both busting) hand 2, following the rule \"the dealer wins even on a tie\". Output: `Hand yang lebih baik adalah hand 1!` / `… hand 2!` (\"The better hand is hand 1/2!\").",
          explanation: "Example: hand 1 = K,1,3,2,4 → 10+1+3+2+4 = 20; hand 2 = J,10,A → 10+10+1 = 21 (the ace as 11 would bust, so it is 1). 21 > 20, so hand 2 is better.\n\nCorrect ace strategy: count every ace as 1, then *at most one* ace can be upgraded to 11 (add 10) if the result is still ≤ 21. Two aces as 11 at once = 22 always busts.\n\nNote: the original statement does not specify the input format or the tie rule; this site follows the tutor's key (hand 1 wins only if **strictly** greater; bust = 0).\n\n**Bug in the tutor's code:** the loop `for j in range(ace)` tries each ace as 11 without accounting for the later aces being worth at least 1. The hand `A, A, 10` is computed as 11 + 1 + 10 = 22 (bust → 0) although its best value is 12. The version above fixes this.",
          hints: ['Write a function that computes the value of one hand and *returns* the number; the main program only compares two values.', 'K/Q/J = 10, number cards = their value, ace = 1 or 11. First count every card with ace = 1.', 'Only one ace can possibly be 11 (two aces = 22 already busts). When may an ace be upgraded to 11? And how do you represent a bust hand?'],
          work: ['Sum all cards: K/Q/J → 10, numbers → `int(...)`, ace → 1 (while counting `ace`).', 'If there is an ace and `total + 10 <= 21`, upgrade one ace to 11 (`total + 10`).', 'If `total > 21` (bust) return 0; otherwise return `total`.', 'Main: read hand 1 and hand 2 into arrays, compare `HitungKartu(hand1) > HitungKartu(hand2)`.', 'Print hand 1 if greater, otherwise hand 2 (tie → hand 2).'],
          plan: 'function HitungKartu(hand, n): total ← 0, ace ← 0; for each card: K/Q/J add 10; A add 1 and ace ← ace+1; otherwise add its number; if there is an ace and total+10 ≤ 21 then total ← total+10; if total > 21 then total ← 0; return total. Main: read both hands; hand 1 wins only if its value > hand 2\'s value',
        },
      }],
    },
    {
      id: 'ork-p6', archetype: 'program', title: 'Problem 6 – Piramida Tuan Tuy', en: { title: "Problem 6 – Mr. Tuy's pyramid" },
      source: { kind: 'tubay' as const, lang: 'id' as const, src: ORK, label: 'Problem 6', pages: [7], official: false, year: 2025 },
      figures: [{ src: ORK, page: 7 }],
      parts: [{
        id: 'ork-p6a', kind: 'program', decks: ['D10', 'D05'], topic: 'Procedure & nested loops: pyramid', difficulty: 3,
        patterns: ['procedure', 'nested-loop', 'string-processing', 'for-count'], misconceptions: ['return-vs-print', 'off-by-one', 'repeat-count'],
        stem: "Tuan Tuy memiliki seorang teman yang berasal dari Mesir, bernama Zubayr Al-Hadid. Zubayr sudah berada di Jatinangor selama 3 tahun, dan dia rindu suasana di kampung halamannya.\n\nSebagai teman yang baik, Tuan Tuy mencoba untuk menggambar piramida untuk temannya, tetapi ia tidak bisa menggambar dan ia merupakan orang yang sangat pemalas. *The catch is*, piramida yang ingin ia gambarkan diisi oleh angka N pada baris ke-N. *The catch is*, tiap angka yang sama dengan atau diatas 10 akan diganti dengan huruf X.\n\nTeringat bahwa ia memiliki teman yang bisa mengotomatisasi pekerjaan tersebut, ia menelepon anda. Bantulah Tuan Tuy membuat piramida! \"Plis bantuin gua, plis banget inimah.\", ucap Tuy.\n\n**Note:** Buatlah sebuah fungsi tanpa return (prosedur) untuk mengotomatisasi pekerjaan tersebut.\n\nContoh:\n```\nMasukkan tinggi piramida : 5\n    1\n   2 2\n  3 3 3\n 4 4 4 4\n5 5 5 5 5\n```\n```\nMasukkan tinggi piramida : 13\n            1\n           2 2\n          3 3 3\n         4 4 4 4\n        5 5 5 5 5\n       6 6 6 6 6 6\n      7 7 7 7 7 7 7\n     8 8 8 8 8 8 8 8\n    9 9 9 9 9 9 9 9 9\n   X X X X X X X X X X\n  X X X X X X X X X X X\n X X X X X X X X X X X X\nX X X X X X X X X X X X X\n```\n*Catatan situs: pada soal asli, teks \"sama dengan atau diatas\" terpotong; yang dimaksud: angka 10 ke atas diganti X (terlihat pada contoh). Kolom paling kiri baris terpanjang tidak berspasi; setiap baris ke-i diawali (tinggi − i) spasi dan i simbol dipisah satu spasi.*",
        reps: ['python', 'pseudo', 'flow'], match: 'exact', mustUse: ['procedure'],
        solution: {
          python: r`# Program Pyramid
# Menggambar piramida setinggi 'tinggi' baris: baris ke-i berisi i simbol (angka i, atau X bila i >= 10) dipisah spasi, rata tengah
# DECLARATIONS
# tinggi : int
# procedure Pyramid(tinggi : int)
# ALGORITHM
def Pyramid(tinggi):
    # Mencetak piramida setinggi 'tinggi' baris (prosedur: mencetak, tidak mengembalikan nilai)
    for i in range(1, tinggi + 1):
        if (i >= 10):
            simbol = 'X'
        else:
            simbol = str(i)
        baris = ' ' * (tinggi - i)
        for k in range(i):
            if (k > 0):
                baris = baris + ' '
            baris = baris + simbol
        print(baris)

tinggi = int(input())
Pyramid(tinggi)`,
          pseudo: r`Program Pyramid
{ Menggambar piramida setinggi tinggi baris: baris ke-i berisi i simbol (angka i, atau X bila i ≥ 10) dipisah spasi, rata tengah }
KAMUS
  tinggi : integer
  procedure Pyramid (tinggi : integer)

procedure Pyramid (tinggi : integer)
  { mencetak piramida setinggi tinggi baris (tidak mengembalikan nilai) }
  LOCAL DECLARATIONS
    i, j, k : integer
    simbol, baris : string
  ALGORITHM
    i traversal [1..tinggi]
      if (i ≥ 10) then
        simbol ← "X"
      else
        simbol ← str(i)
      baris ← ""
      j traversal [1..tinggi-i]
        baris ← baris + " "
      k traversal [1..i]
        if (k > 1) then
          baris ← baris + " "
        baris ← baris + simbol
      output(baris)

ALGORITMA
  input(tinggi)
  Pyramid(tinggi)`,
        },
        tests: [
          { name: 'height 5', stdin: ['5'] },
          { name: 'height 13', stdin: ['13'] },
          { name: 'height 1', stdin: ['1'], edge: 'single row, no indentation' },
          { name: 'height 9', stdin: ['9'], edge: 'no X yet' },
          { name: 'height 10', stdin: ['10'], edge: 'row 10 is the first X row' },
        ],
        wrong: [
          { code: "def Pyramid(tinggi):\n    for i in range(1, tinggi + 1):\n        if (i > 10):\n            simbol = 'X'\n        else:\n            simbol = str(i)\n        baris = ' ' * (tinggi - i)\n        for k in range(i):\n            if (k > 0):\n                baris = baris + ' '\n            baris = baris + simbol\n        print(baris)\n\ntinggi = int(input())\nPyramid(tinggi)", msg: 'Angka 10 ke atas diganti X, jadi syaratnya `i >= 10`. Dengan `i > 10` baris ke-10 masih tercetak angka 10.', msgEn: 'Numbers 10 and up are replaced by X, so the condition is `i >= 10`. With `i > 10` row 10 still prints the number 10.', tag: 'off-by-one' },
          { code: "def Pyramid(tinggi):\n    for i in range(1, tinggi + 1):\n        if (i >= 10):\n            simbol = 'X'\n        else:\n            simbol = str(i)\n        baris = ''\n        for k in range(i):\n            if (k > 0):\n                baris = baris + ' '\n            baris = baris + simbol\n        print(baris)\n\ntinggi = int(input())\nPyramid(tinggi)", msg: 'Piramida harus rata tengah: baris ke-i diawali (tinggi − i) spasi di kiri. Tanpa spasi awal, bentuknya menjadi segitiga rata kiri.', msgEn: 'The pyramid must be centred: row i starts with (tinggi − i) spaces on the left. Without the leading spaces it becomes a left-aligned triangle.', tag: 'indentation' },
        ],
        plan: 'prosedur Pyramid(tinggi): untuk i dari 1 sampai tinggi: simbol ← "X" bila i ≥ 10, selain itu str(i); baris ← (tinggi−i) spasi; ulangi i kali: tambahkan spasi pemisah bila bukan yang pertama, lalu simbol; cetak baris. Program utama: baca tinggi, panggil Pyramid',
        skeleton: "def Pyramid(tinggi):\n    for i in range(___, tinggi + 1):\n        if (i >= ___):\n            simbol = 'X'\n        else:\n            simbol = str(___)\n        baris = ' ' * (tinggi - ___)\n        for k in range(___):\n            if (k > 0):\n                baris = baris + ' '\n            baris = baris + ___\n        print(baris)\n\ntinggi = int(input())\nPyramid(tinggi)",
        hints: ['Prosedur = fungsi yang mencetak dan tidak memakai `return`. Pikirkan satu baris dulu: apa isinya pada baris ke-i?', 'Baris ke-i punya (tinggi − i) spasi di kiri, lalu i simbol dipisah satu spasi. Simbolnya angka i, atau X bila i ≥ 10.', 'Perhatikan spasi pemisah: ada i−1 spasi di antara i simbol, bukan i. Uji tinggi 9 dan 10 untuk batas X.'],
        work: ['Definisikan prosedur `Pyramid(tinggi)` yang hanya mencetak.', 'Loop baris `i` dari 1 sampai `tinggi` (`range(1, tinggi + 1)`).', 'Tentukan `simbol`: `X` bila `i >= 10`, selain itu `str(i)`.', 'Bangun baris: `(tinggi - i)` spasi, lalu `i` kali simbol dengan satu spasi di antara simbol.', 'Cetak baris; program utama membaca tinggi dan memanggil prosedur.'],
        explanation: "Tiap baris dibangun dalam dua bagian: spasi di kiri sebanyak (tinggi − i) agar piramida rata tengah, lalu i simbol dengan satu spasi di antaranya. Simbol adalah angka i untuk i < 10 dan huruf `X` untuk i ≥ 10 (agar tiap simbol selalu satu karakter dan bentuk tidak miring). Prosedur tidak memakai `return`: ia langsung `print` baris per baris.\n\nPembanding keluaran bersifat *exact* karena spasi menentukan bentuk piramida.\n\nCatatan: kode tutor benar. Ia memakai `' '.join(['X']*i)` untuk menyambung dengan spasi; versi di atas memakai loop dalam agar sesuai materi WI1102 (perkalian string `' ' * n` dipakai untuk spasi awal).",
        syntax: ['def-procedure', 'call', 'for-range', 'if-else', 'print-str'],
        lineNotes: [
          n([1, 6], 'Kerangka: judul, spesifikasi, DECLARATIONS (termasuk tanda tangan prosedur), ALGORITHM.', 'Skeleton: title, specification, DECLARATIONS (including the procedure signature), ALGORITHM.', 'program-template'),
          n(7, '`def Pyramid(tinggi)`: *prosedur*, yaitu subprogram yang melakukan aksi (mencetak) dan tidak mengembalikan nilai.', '`def Pyramid(tinggi)`: a *procedure*, i.e. a subprogram that performs an action (printing) and returns no value.', 'def-procedure'),
          n(8, 'Komentar spesifikasi di bawah `def`.', 'Specification comment under `def`.', 'comment'),
          n(9, '`range(1, tinggi + 1)`: baris 1..tinggi; batas atas tidak ikut, jadi +1.', '`range(1, tinggi + 1)`: rows 1..tinggi; the upper bound is excluded, so +1.', 'for-range'),
          n([10, 13], 'Simbol baris: `X` bila i ≥ 10 (`>=`, bukan `>`, karena baris 10 sudah X), selain itu `str(i)` agar bisa disambung ke string.', 'Row symbol: `X` if i ≥ 10 (`>=`, not `>`, because row 10 is already X), otherwise `str(i)` so it can be concatenated to a string.', 'if-else'),
          n(14, 'Spasi awal: `' + "' ' * (tinggi - i)" + '` menggeser baris ke kanan; makin ke bawah (i besar) makin sedikit spasi.', 'Leading spaces: `' + "' ' * (tinggi - i)" + '` shifts the row right; the lower the row (larger i), the fewer spaces.'),
          n([15, 18], 'Loop dalam menyambung i simbol. Spasi pemisah hanya sebelum simbol ke-2 dst. (`k > 0`), jadi ada i−1 spasi dan tidak ada spasi sisa di ujung baris.', 'The inner loop appends i symbols. The separating space is added only before the 2nd symbol onward (`k > 0`), so there are i−1 spaces and no trailing space.', 'for-range'),
          n(19, 'Baris dicetak di dalam prosedur (tidak ada `return`).', 'The row is printed inside the procedure (there is no `return`).', 'print-str'),
          n([21, 22], 'Program utama: baca tinggi, lalu *memanggil* prosedur sebagai pernyataan sendiri (tanpa menampung hasil).', 'Main program: read the height, then *call* the procedure as a statement on its own (no result stored).', 'call'),
        ],
        pseudoNotes: [
          n([3, 5], 'KAMUS: variabel tinggi dan deklarasi prosedur `Pyramid`.', 'KAMUS (declarations): the variable tinggi and the declaration of procedure `Pyramid`.'),
          n([7, 11], 'Prosedur dengan KAMUS lokal; tidak ada `→` (tidak mengembalikan nilai).', 'A procedure with local declarations; there is no `→` (nothing is returned).'),
          n([13, 17], 'Pilih simbol per baris: X untuk i ≥ 10, selain itu angka i sebagai string.', 'Choose the symbol per row: X for i ≥ 10, otherwise the number i as a string.'),
          n([18, 20], 'Spasi awal dibangun dengan traversal 1..tinggi−i.', 'The leading spaces are built with a traversal 1..tinggi−i.'),
          n([21, 25], 'i simbol dengan pemisah spasi sebelum simbol ke-2 dst., lalu baris ditampilkan.', 'i symbols with a space separator before the 2nd symbol onward, then the row is output.'),
          n([27, 29], 'Algoritma utama: baca tinggi dan panggil prosedur.', 'Main algorithm: read the height and call the procedure.'),
        ],
        refs: [{ src: ORK, page: 7 }],
        en: {
          stem: "Mr. Tuy has a friend from Egypt named Zubayr Al-Hadid. Zubayr has been in Jatinangor for 3 years and misses the atmosphere of his hometown.\n\nAs a good friend, Mr. Tuy tries to draw a pyramid for him, but he cannot draw and he is extremely lazy. *The catch is*, the pyramid he wants is filled with the number N on row N. *The catch is*, every number equal to or above 10 is replaced by the letter X.\n\nRemembering that he has a friend who can automate this, he calls you. Help Mr. Tuy make the pyramid! \"Please help me, seriously please.\", says Tuy.\n\n**Note:** write a function without a return (a procedure) to automate the job.\n\nExample:\n```\nMasukkan tinggi piramida : 5\n    1\n   2 2\n  3 3 3\n 4 4 4 4\n5 5 5 5 5\n```\n```\nMasukkan tinggi piramida : 13\n            1\n           2 2\n          3 3 3\n         4 4 4 4\n        5 5 5 5 5\n       6 6 6 6 6 6\n      7 7 7 7 7 7 7\n     8 8 8 8 8 8 8 8\n    9 9 9 9 9 9 9 9 9\n   X X X X X X X X X X\n  X X X X X X X X X X X\n X X X X X X X X X X X X\nX X X X X X X X X X X X X\n```\n*Site note: in the original the phrase \"equal to or above\" is cut off; what is meant is that the number 10 and above become X (visible in the example). The leftmost column of the longest row has no indentation; row i starts with (height − i) spaces and has i symbols separated by one space.*",
          explanation: "Each row is built in two parts: (height − i) spaces on the left so the pyramid is centred, then i symbols with one space between them. The symbol is the number i for i < 10 and the letter `X` for i ≥ 10 (so each symbol is always one character and the shape stays straight). A procedure uses no `return`: it simply `print`s row by row.\n\nOutput comparison is *exact* because spacing determines the shape.\n\nNote: the tutor's code is correct. It uses `' '.join(['X']*i)` to join with spaces; the version above uses an inner loop to stay within the WI1102 syllabus (string repetition `' ' * n` is used for the leading spaces).",
          hints: ['A procedure is a function that prints and uses no `return`. Think about a single row first: what does row i contain?', 'Row i has (height − i) spaces on the left, then i symbols separated by one space. The symbol is the number i, or X if i ≥ 10.', 'Mind the separator spaces: there are i−1 spaces between i symbols, not i. Test heights 9 and 10 for the X boundary.'],
          work: ['Define the procedure `Pyramid(tinggi)` that only prints.', 'Loop rows `i` from 1 to `tinggi` (`range(1, tinggi + 1)`).', 'Choose `simbol`: `X` if `i >= 10`, otherwise `str(i)`.', 'Build the row: `(tinggi - i)` spaces, then `i` copies of the symbol with one space between them.', 'Print the row; the main program reads the height and calls the procedure.'],
          plan: 'procedure Pyramid(tinggi): for i from 1 to tinggi: symbol ← "X" if i ≥ 10, otherwise str(i); row ← (tinggi−i) spaces; repeat i times: add a separator space unless first, then the symbol; print the row. Main: read tinggi, call Pyramid',
        },
      }],
    },

    /* ============================================ OBJEK ANEH ============================================ */
    {
      id: 'aneh-1', archetype: 'program', title: 'Objek Aneh', en: { title: 'Strange Objects' },
      source: { kind: 'tubay' as const, lang: 'id' as const, src: ANEH, label: 'Objek Aneh', pages: [1], official: false, year: 2025 },
      figures: [{ src: ANEH, page: 1 }],
      parts: [{
        id: 'aneh-1a', kind: 'program', decks: ['D06', 'D05'], topic: 'Nested loops: best contiguous range', difficulty: 3,
        patterns: ['nested-loop', 'max-min', 'accumulate-sum', 'array-populate'], misconceptions: ['sentinel-counted', 'index-range', 'init-in-loop'],
        stem: "Di suatu ruangan, terdapat sejumlah objek yang memiliki suhu yang berbeda-beda. Dalam ekspedisi kali ini, Revan memiliki tugas untuk menemukan sekumpulan objek yang aneh (bisa hanya 1 atau lebih). Sekumpulan objek dikatakan aneh jika rata-rata suhunya mendekati 15°C dan seluruhnya bersebelahan.\n- Jika ada dua atau lebih pilihan kumpulan objek, pilih kumpulan objek dengan banyak objek paling sedikit.\n- Jika banyaknya masih sama, pilih kumpulan objek paling awal (indeks paling kecil).\n\nBantulah Revan menentukan range objek tersebut dan suhu rata-ratanya.\n\nTest Case 1:\n```\nMasukkan banyak objek: 6\nMasukkan suhu objek 1: -51\nMasukkan suhu objek 2: 38\nMasukkan suhu objek 3: 32\nMasukkan suhu objek 4: -22\nMasukkan suhu objek 5: 70\nMasukkan suhu objek 6: -20\nKumpulan objek aneh adalah objek 3 hingga 6 dengan suhu rata-rata 15.\n```\nTest Case 2:\n```\nMasukkan banyak objek: 5\nMasukkan suhu objek 1: 35\nMasukkan suhu objek 2: 31\nMasukkan suhu objek 3: -27\nMasukkan suhu objek 4: 35\nMasukkan suhu objek 5: 80\nKumpulan objek aneh adalah objek 1 hingga 3 dengan suhu rata-rata 13.\n```\nTest Case 3:\n```\nMasukkan banyak objek: 3\nMasukkan suhu objek 1: 14\nMasukkan suhu objek 2: -20\nMasukkan suhu objek 3: 48\nKumpulan objek aneh adalah objek 1 dengan suhu rata-rata 14.\n```\n*Catatan situs: masukan = banyak objek lalu suhu tiap objek. \"Mendekati 15\" berarti selisih |rata-rata − 15| paling kecil. Soal tidak menetapkan pembulatan suhu rata-rata; contoh menampilkannya sebagai bilangan bulat, dan penilaian menerima selisih sampai 0,5.*",
        reps: ['python', 'pseudo', 'flow'], match: 'judge',
        judge: r`def judge(stdin, out, ref_out):
    import re
    pat = r'objek (\d+)(?: hingga (\d+))?.*?rata-rata (-?\d+(?:\.\d+)?)'
    a = re.search(pat, out)
    b = re.search(pat, ref_out)
    if not a:
        return 'The output does not follow the format: Kumpulan objek aneh adalah objek L hingga R dengan suhu rata-rata X.'
    if a.group(1) != b.group(1) or a.group(2) != b.group(2):
        return 'The chosen range of objects is wrong (check the tie-breaking: fewest objects, then the earliest start; a single object is printed as "objek L" without "hingga").'
    if abs(float(a.group(3)) - float(b.group(3))) > 0.5:
        return 'The printed average temperature is wrong.'
    return None`,
        solution: {
          python: r`# Program StrangeObjects
# Mencari kumpulan objek bersebelahan yang rata-rata suhunya paling dekat ke 15;
# seri: objek paling sedikit, lalu indeks paling awal
# DECLARATIONS
# N, i, panjang, awal, k, total : int
# dn, bestDn, bestLen, bestTotal, bl, br : int
# nilai : array of int
# ALGORITHM
N = int(input())
nilai = [0 for i in range(N)]
for i in range(N):
    nilai[i] = int(input())
bl = 0
br = 0
bestDn = 0
bestLen = 0
bestTotal = 0
for panjang in range(1, N + 1):
    for awal in range(0, N - panjang + 1):
        total = 0
        for k in range(awal, awal + panjang):
            total = total + nilai[k]
        dn = abs(total - 15 * panjang)
        if (bl == 0 or dn * bestLen < bestDn * panjang):
            bestDn = dn
            bestLen = panjang
            bestTotal = total
            bl = awal + 1
            br = awal + panjang
if (bl == br):
    print('Kumpulan objek aneh adalah objek ' + str(bl) + ' dengan suhu rata-rata ' + str(round(bestTotal / bestLen)) + '.')
else:
    print('Kumpulan objek aneh adalah objek ' + str(bl) + ' hingga ' + str(br) + ' dengan suhu rata-rata ' + str(round(bestTotal / bestLen)) + '.')`,
          pseudo: r`Program StrangeObjects
{ Mencari kumpulan objek bersebelahan yang rata-rata suhunya paling dekat ke 15; seri: objek paling sedikit, lalu indeks paling awal }
KAMUS
  N, i, panjang, awal, k, total : integer
  dn, bestDn, bestLen, bestTotal, bl, br : integer
  nilai : array [0..N-1] of integer
ALGORITMA
  input(N)
  i traversal [0..N-1]
    input(nilai[i])
  bl ← 0
  br ← 0
  bestDn ← 0
  bestLen ← 0
  bestTotal ← 0
  panjang traversal [1..N]
    awal traversal [0..N-panjang]
      total ← 0
      k traversal [awal..awal+panjang-1]
        total ← total + nilai[k]
      dn ← abs(total - 15 * panjang)
      if (bl = 0 or dn * bestLen < bestDn * panjang) then
        bestDn ← dn
        bestLen ← panjang
        bestTotal ← total
        bl ← awal + 1
        br ← awal + panjang
  if (bl = br) then
    output("Kumpulan objek aneh adalah objek " + str(bl) + " dengan suhu rata-rata " + str(round(bestTotal / bestLen)) + ".")
  else
    output("Kumpulan objek aneh adalah objek " + str(bl) + " hingga " + str(br) + " dengan suhu rata-rata " + str(round(bestTotal / bestLen)) + ".")`,
        },
        tests: [
          { name: 'sample 1', stdin: ['6', '-51', '38', '32', '-22', '70', '-20'] },
          { name: 'sample 2', stdin: ['5', '35', '31', '-27', '35', '80'], edge: 'tie: 1..3 and 2..4 are both 13, earliest wins' },
          { name: 'sample 3', stdin: ['3', '14', '-20', '48'], edge: 'single object: printed without "hingga"' },
          { name: 'fewest objects', stdin: ['3', '10', '20', '15'], edge: '1..2 and object 3 both average 15: the single object wins' },
          { name: 'tie on both sides of 15', stdin: ['3', '12', '100', '18'], edge: '12 and 18 are both 3 away from 15: earliest wins' },
          { name: 'N = 1', stdin: ['1', '100'], edge: 'only one object' },
        ],
        wrong: [
          { code: "N = int(input())\nnilai = [0 for i in range(N)]\nfor i in range(N):\n    nilai[i] = int(input())\nbl = 0\nbr = 0\nbestDn = 0\nbestLen = 0\nbestTotal = 0\nfor panjang in range(1, N + 1):\n    for awal in range(0, N - panjang + 1):\n        total = 0\n        for k in range(awal, awal + panjang):\n            total = total + nilai[k]\n        dn = abs(total - 15 * panjang)\n        if (bl == 0 or dn * bestLen <= bestDn * panjang):\n            bestDn = dn\n            bestLen = panjang\n            bestTotal = total\n            bl = awal + 1\n            br = awal + panjang\nif (bl == br):\n    print('Kumpulan objek aneh adalah objek ' + str(bl) + ' dengan suhu rata-rata ' + str(round(bestTotal / bestLen)) + '.')\nelse:\n    print('Kumpulan objek aneh adalah objek ' + str(bl) + ' hingga ' + str(br) + ' dengan suhu rata-rata ' + str(round(bestTotal / bestLen)) + '.')", msg: 'Perbandingan `<=` mengganti pilihan terbaik setiap kali selisihnya sama, sehingga kumpulan yang LEBIH AKHIR (atau lebih panjang) menang saat seri. Soal meminta yang paling sedikit objek, lalu yang paling awal: gunakan `<` (hanya ganti bila benar-benar lebih baik).', msgEn: 'The `<=` comparison replaces the best choice every time the difference is equal, so the LATER (or longer) range wins on a tie. The task wants the fewest objects, then the earliest: use `<` (replace only when strictly better).', tag: 'not-complete' },
          { code: "N = int(input())\nnilai = [0 for i in range(N)]\nfor i in range(N):\n    nilai[i] = int(input())\nbl = 0\nbr = 0\nbestDn = 0\nbestLen = 0\nbestTotal = 0\nfor awal in range(0, N):\n    for panjang in range(1, N - awal + 1):\n        total = 0\n        for k in range(awal, awal + panjang):\n            total = total + nilai[k]\n        dn = abs(total - 15 * panjang)\n        if (bl == 0 or dn * bestLen < bestDn * panjang):\n            bestDn = dn\n            bestLen = panjang\n            bestTotal = total\n            bl = awal + 1\n            br = awal + panjang\nif (bl == br):\n    print('Kumpulan objek aneh adalah objek ' + str(bl) + ' dengan suhu rata-rata ' + str(round(bestTotal / bestLen)) + '.')\nelse:\n    print('Kumpulan objek aneh adalah objek ' + str(bl) + ' hingga ' + str(br) + ' dengan suhu rata-rata ' + str(round(bestTotal / bestLen)) + '.')", msg: 'Urutan loop menentukan siapa yang menang saat seri. Dengan loop luar = awal, kumpulan awal yang lebih panjang bisa menang atas kumpulan lebih pendek yang datang kemudian. Karena yang diminta objek paling sedikit dahulu, loop luar harus panjang, loop dalam awal.', msgEn: 'The loop order decides who wins a tie. With the outer loop = start, a longer range starting earlier can beat a shorter range found later. Since the fewest objects comes first, the outer loop must be the length and the inner loop the start.', tag: 'not-complete' },
          { code: "N = int(input())\nnilai = [0 for i in range(N)]\nfor i in range(N):\n    nilai[i] = int(input())\nbl = 0\nbr = 0\nbestDn = 0\nbestLen = 0\nbestTotal = 0\nfor panjang in range(1, N + 1):\n    for awal in range(0, N - panjang + 1):\n        total = 0\n        for k in range(awal, awal + panjang):\n            total = total + nilai[k]\n        dn = abs(total - 15 * panjang)\n        if (bl == 0 or dn * bestLen < bestDn * panjang):\n            bestDn = dn\n            bestLen = panjang\n            bestTotal = total\n            bl = awal + 1\n            br = awal + panjang\nprint('Kumpulan objek aneh adalah objek ' + str(bl) + ' hingga ' + str(br) + ' dengan suhu rata-rata ' + str(round(bestTotal / bestLen)) + '.')", msg: 'Untuk satu objek, keluaran harus "objek L" tanpa "hingga R" (lihat Test Case 3). Tambahkan percabangan `if (bl == br)`.', msgEn: 'For a single object the output must be "objek L" without "hingga R" (see Test Case 3). Add an `if (bl == br)` branch.', tag: 'not-complete' },
        ],
        plan: 'baca N dan array nilai; best belum ada; untuk panjang dari 1 sampai N (terpendek dahulu): untuk awal dari 0 sampai N−panjang: hitung total elemen awal..awal+panjang−1; selisih = |total − 15·panjang| / panjang; jika belum ada best atau selisih lebih kecil dari best (tegas) maka simpan awal, panjang, total; cetak rentang (satu objek tanpa "hingga") dan rata-rata = total / panjang',
        skeleton: "N = int(input())\nnilai = [0 for i in range(N)]\nfor i in range(N):\n    nilai[i] = int(input())\nbl = 0\nbr = 0\nbestDn = 0\nbestLen = 0\nbestTotal = 0\nfor panjang in range(___, N + 1):\n    for awal in range(0, N - panjang + ___):\n        total = 0\n        for k in range(awal, awal + ___):\n            total = total + nilai[k]\n        dn = abs(total - ___ * panjang)\n        if (bl == 0 or dn * bestLen ___ bestDn * panjang):\n            bestDn = dn\n            bestLen = panjang\n            bestTotal = total\n            bl = awal + 1\n            br = awal + panjang\nif (bl == br):\n    print('Kumpulan objek aneh adalah objek ' + str(bl) + ' dengan suhu rata-rata ' + str(round(bestTotal / bestLen)) + '.')\nelse:\n    print('Kumpulan objek aneh adalah objek ' + str(bl) + ' hingga ' + str(br) + ' dengan suhu rata-rata ' + str(round(bestTotal / bestLen)) + '.')",
        hints: ['Kumpulan yang "bersebelahan" = potongan berurutan array: tentukan awal dan panjangnya. Berapa banyak kemungkinan, dan bagaimana menjumlahkan tiap potongan?', 'Cari yang selisih |rata-rata − 15| paling kecil (pola min). Urutan pencarian yang menjamin aturan seri: panjang dari terpendek, untuk tiap panjang awal dari terkecil, dan ganti pilihan hanya bila benar-benar lebih baik (`<`).', 'Menghindari desimal: |total/panjang − 15| = |total − 15·panjang| / panjang, jadi dua selisih dapat dibandingkan dengan perkalian silang tanpa pembagian.'],
        work: ['Baca N dan isi array `nilai`.', 'Loop luar `panjang` = 1..N, loop dalam `awal` = 0..N−panjang (semua potongan berurutan, terpendek lebih dahulu, awal terkecil lebih dahulu).', 'Hitung `total` potongan dengan loop ketiga, lalu `dn = |total − 15·panjang|`.', 'Bandingkan `dn/panjang` dengan terbaik sementara memakai perkalian silang: `dn * bestLen < bestDn * panjang` (tegas, agar seri tidak menggantikan). Simpan `bl`, `br`, total, panjang.', 'Cetak "objek bl hingga br" (atau "objek bl" bila bl = br) dan rata-rata `total / panjang` dibulatkan.'],
        explanation: "Ada N(N+1)/2 potongan berurutan; masing-masing diperiksa. Karena dicari yang rata-ratanya paling dekat ke 15, bandingkan |rata-rata − 15|. Aturan seri (paling sedikit objek, lalu indeks paling awal) otomatis terpenuhi bila potongan dienumerasi dengan panjang naik, lalu awal naik, dan pilihan hanya diganti jika *benar-benar* lebih baik (`<`). Contoh 2: potongan 1..3 dan 2..4 sama-sama rata-rata 13 (selisih 2), maka 1..3 yang paling awal menang.\n\nMenghindari kesalahan pembulatan desimal: |S/L − 15| = |S − 15L| / L, dan a/b < c/d ⇔ a·d < c·b (untuk penyebut positif), jadi perbandingan memakai bilangan bulat.\n\nSoal tidak menetapkan pembulatan rata-rata. Contoh hanya memuat rata-rata bulat; program ini mencetak pembulatan ke bilangan bulat terdekat.\n\n**Bug pada kode peer:** (1) masih ada `print(x, j+1, i+1)` sisa debug di dalam loop sehingga banyak baris tambahan tercetak; (2) hanya potongan yang rata-ratanya persis sama dengan `ans` terakhir yang dipertimbangkan, padahal dua rata-rata berbeda (misalnya 12 dan 18, sama-sama berjarak 3 dari 15) bisa seri, dan karena memakai `<=` yang terakhir ditemukan menimpa yang sebelumnya; (3) f-string bersarang dengan tanda kutip yang sama hanya valid di Python 3.12+. Hasil untuk ketiga Test Case di soal tetap benar.",
        syntax: ['input', 'list-init', 'list-index', 'for-range', 'if-else', 'operators', 'print-str'],
        lineNotes: [
          n([1, 8], 'Kerangka: judul, spesifikasi (termasuk aturan seri), DECLARATIONS, ALGORITHM.', 'Skeleton: title, specification (including the tie rules), DECLARATIONS, ALGORITHM.', 'program-template'),
          n([9, 12], 'Membaca N lalu mengisi array `nilai` (indeks 0..N−1) dengan `int(input())`.', 'Reads N then fills the array `nilai` (indices 0..N−1) with `int(input())`.', 'list-init'),
          n([13, 17], 'Variabel "terbaik sementara" diinisialisasi sebelum loop. `bl = 0` menandai belum ada kandidat, sehingga kandidat pertama selalu diterima (tidak perlu nilai sentinel besar).', 'The "best so far" variables are initialised before the loops. `bl = 0` marks that there is no candidate yet, so the first candidate is always accepted (no big sentinel value needed).'),
          n(18, 'Loop luar: `panjang` dari 1 sampai N (`N + 1` karena batas atas tidak ikut). Panjang naik menjamin kumpulan dengan objek paling sedikit dicek lebih dulu.', 'Outer loop: `panjang` from 1 to N (`N + 1` because the upper bound is excluded). Increasing length guarantees ranges with the fewest objects are checked first.', 'for-range'),
          n(19, 'Loop tengah: `awal` dari 0 sampai `N - panjang` (agar potongan tidak melewati ujung array). Awal naik menjamin yang paling awal dicek dulu.', 'Middle loop: `awal` from 0 to `N - panjang` (so the slice does not run past the end of the array). Increasing start guarantees the earliest is checked first.', 'for-range'),
          n([20, 22], '`total` di-reset ke 0 untuk setiap potongan (di dalam loop awal, bukan di luarnya), lalu loop dalam menjumlahkan `nilai[awal..awal+panjang-1]`.', '`total` is reset to 0 for every slice (inside the start loop, not outside it), then the inner loop sums `nilai[awal..awal+panjang-1]`.'),
          n(23, '`dn = |total − 15·panjang|` adalah selisih rata-rata ke 15 dikali panjang: |S/L − 15|·L. Bekerja dengan bilangan bulat, bebas galat pembulatan desimal.', '`dn = |total − 15·panjang|` is the distance of the average from 15 times the length: |S/L − 15|·L. It works with integers, free from decimal rounding errors.', 'operators'),
          n(24, 'Perbandingan silang `dn/panjang < bestDn/bestLen` ⇔ `dn*bestLen < bestDn*panjang`. Tanda `<` (bukan `<=`) membuat kandidat yang seri tidak menimpa yang lebih dahulu ditemukan (paling sedikit objek, lalu paling awal).', 'Cross comparison `dn/panjang < bestDn/bestLen` ⇔ `dn*bestLen < bestDn*panjang`. The `<` (not `<=`) keeps a tied candidate from overwriting the earlier one (fewest objects, then earliest).', 'if'),
          n([25, 29], 'Menyimpan kandidat terbaik: selisih, panjang, total, serta rentang 1-based `bl`..`br` (indeks soal mulai dari 1).', 'Stores the best candidate: difference, length, total, and the 1-based range `bl`..`br` (the task counts from 1).'),
          n([30, 33], 'Satu objek dicetak "objek L" tanpa "hingga"; lebih dari satu "objek L hingga R". Rata-rata = `bestTotal / bestLen` dibulatkan dengan `round`, dan `str()` wajib saat `+` dengan string.', 'A single object is printed as "objek L" without "hingga"; more than one as "objek L hingga R". Average = `bestTotal / bestLen` rounded with `round`, and `str()` is required when using `+` with strings.', 'print-str'),
        ],
        pseudoNotes: [
          n([3, 6], 'KAMUS: semua penghitung dan akumulator integer; `nilai` array N integer.', 'KAMUS (declarations): all counters and accumulators are integers; `nilai` is an array of N integers.'),
          n([8, 10], 'Membaca N dan mengisi array.', 'Reads N and fills the array.'),
          n([11, 15], 'Inisialisasi "terbaik sementara"; `bl = 0` berarti belum ada kandidat.', 'Initialisation of the "best so far"; `bl = 0` means no candidate yet.'),
          n([16, 20], 'Tiga traversal bersarang: panjang, awal, lalu penjumlahan potongan.', 'Three nested traversals: length, start, then the slice sum.'),
          n([21, 27], 'Selisih terskala `dn` dan perbandingan silang; hanya ganti jika benar-benar lebih baik (`<`).', 'The scaled difference `dn` and the cross comparison; replace only if strictly better (`<`).'),
          n([28, 31], 'Cetak satu objek tanpa "hingga", selain itu rentang L hingga R, beserta rata-rata.', 'Output one object without "hingga", otherwise the range L to R, together with the average.'),
        ],
        refs: [{ src: ANEH, page: 1 }],
        en: {
          stem: "In a room there are a number of objects with different temperatures. On this expedition, Revan's task is to find a group of strange objects (it can be just 1 or more). A group of objects is called strange if its average temperature is close to 15°C and all its objects are adjacent.\n- If there are two or more candidate groups, choose the group with the fewest objects.\n- If the number is still the same, choose the earliest group (smallest index).\n\nHelp Revan determine the range of objects and their average temperature.\n\nTest Case 1:\n```\nMasukkan banyak objek: 6\nMasukkan suhu objek 1: -51\nMasukkan suhu objek 2: 38\nMasukkan suhu objek 3: 32\nMasukkan suhu objek 4: -22\nMasukkan suhu objek 5: 70\nMasukkan suhu objek 6: -20\nKumpulan objek aneh adalah objek 3 hingga 6 dengan suhu rata-rata 15.\n```\nTest Case 2:\n```\nMasukkan banyak objek: 5\nMasukkan suhu objek 1: 35\nMasukkan suhu objek 2: 31\nMasukkan suhu objek 3: -27\nMasukkan suhu objek 4: 35\nMasukkan suhu objek 5: 80\nKumpulan objek aneh adalah objek 1 hingga 3 dengan suhu rata-rata 13.\n```\nTest Case 3:\n```\nMasukkan banyak objek: 3\nMasukkan suhu objek 1: 14\nMasukkan suhu objek 2: -20\nMasukkan suhu objek 3: 48\nKumpulan objek aneh adalah objek 1 dengan suhu rata-rata 14.\n```\n*Site note: input = the number of objects, then each object's temperature. \"Close to 15\" means the smallest |average − 15|. The statement does not specify how the average is rounded; the examples show it as an integer, and marking accepts a difference of up to 0.5. The output text means \"The strange group of objects is object L to R with average temperature X.\"*",
          explanation: "There are N(N+1)/2 contiguous slices; each is checked. Since we want the average closest to 15, compare |average − 15|. The tie rules (fewest objects, then earliest index) are satisfied automatically if slices are enumerated by increasing length, then increasing start, and the choice is replaced only when *strictly* better (`<`). Example 2: slices 1..3 and 2..4 both average 13 (distance 2), so the earliest, 1..3, wins.\n\nAvoiding decimal rounding errors: |S/L − 15| = |S − 15L| / L, and a/b < c/d ⇔ a·d < c·b (for positive denominators), so the comparison uses integers.\n\nThe statement does not fix the rounding of the average. The examples only contain whole averages; this program prints the average rounded to the nearest integer.\n\n**Bugs in the peer's code:** (1) a leftover debug `print(x, j+1, i+1)` inside the loop prints many extra lines; (2) only slices whose average equals exactly the final `ans` are considered, although two different averages (e.g. 12 and 18, both 3 away from 15) can tie, and because it uses `<=` the last one found overwrites the earlier ones; (3) a nested f-string reusing the same quote character is only valid in Python 3.12+. The result for the three Test Cases in the statement is still correct.",
          hints: ['"Adjacent" objects = a contiguous slice of the array: decide its start and its length. How many possibilities are there, and how do you sum each slice?', 'Look for the smallest |average − 15| (min pattern). A search order that guarantees the tie rules: lengths from shortest, for each length the start from smallest, and replace the choice only when strictly better (`<`).', 'To avoid decimals: |total/length − 15| = |total − 15·length| / length, so two differences can be compared by cross-multiplication with no division.'],
          work: ['Read N and fill the array `nilai`.', 'Outer loop `panjang` = 1..N, inner loop `awal` = 0..N−panjang (all contiguous slices, shortest first, smallest start first).', 'Compute the slice `total` with a third loop, then `dn = |total − 15·panjang|`.', 'Compare `dn/panjang` with the best so far by cross-multiplication: `dn * bestLen < bestDn * panjang` (strict, so a tie does not replace). Save `bl`, `br`, total, length.', 'Print "objek bl hingga br" (or "objek bl" if bl = br) and the average `total / panjang` rounded.'],
          plan: 'read N and the array; no best yet; for length from 1 to N (shortest first): for start from 0 to N−length: compute the total of elements start..start+length−1; distance = |total − 15·length| / length; if there is no best yet or the distance is strictly smaller than the best then save start, length, total; output the range (a single object without "hingga") and the average = total / length',
        },
      }],
    },
  ],
  papers: [
    {
      id: 'ork-set', title: "Tutor practice set – Orkhan: Python programming", year: 2025, date: '2025-11-26', minutes: 90, kind: 'tubay', lang: 'id',
      note: "Practice set written by a peer tutor (STEI-K 2025 academic division). It is unofficial: the problems were not made by the course team, the statements leave some I/O details open (the site adds explicit assumptions), and the answers were re-derived by this site. The tutor's own solutions had bugs (Problems 2, 5), noted in the explanations.",
      noteId: 'Latihan soal buatan tutor sebaya (divisi akademik STEI-K 2025). Tidak resmi: bukan dibuat tim mata kuliah, beberapa detail masukan/keluaran tidak dirinci (situs menambahkan asumsi eksplisit), dan jawaban disusun ulang oleh situs ini.',
      problems: ['ork-p1', 'ork-p2', 'ork-p3', 'ork-p4', 'ork-p5', 'ork-p6'],
    },
  ],
}
