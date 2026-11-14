# WI1102 source corpus (page by page)


# SOURCE KU1102_LatihanSoal_2019 (older, 14 pages)


## [KU1102_LatihanSoal_2019 h1]

Latihan Soal


Tim Penyusun Materi Pengenalan Komputasi
Institut Teknologi Bandung © 2019

> (little or no text layer: read the page image app/public/pages/KU1102_LatihanSoal_2019/001.jpg)

## [KU1102_LatihanSoal_2019 h2]

Instruksi
• Untuk semua soal (jika memungkinkan), buatlah:
     • Flowchart / pseudocode (tergantung penekanan di kelas)
     • Kode program dengan bahasa pemrograman yang diajarkan di kelas




03/11/2022                       Pengenalan Komputasi                   3

## [KU1102_LatihanSoal_2019 h3]

Soal 1
• Buatlah program untuk menghitung sisi miring sebuah segitiga
  siku-siku dengan rumus Pythagoras.
• Program membaca input 2 buah bilangan riil, misalnya 𝑎 (alas
  segitiga) dan 𝑏 (tinggi segitiga) dan menuliskan ke layar hasil
  perhitungan sisi miring 𝑐 yang dihitung dengan rumus sbb.:
                             𝑐 = 𝑎2 + 𝑏2
• Asumsikan a > 0 dan b > 0.



03/11/2022                   Pengenalan Komputasi                   4

## [KU1102_LatihanSoal_2019 h4]

Soal 2
• Buatlah program yang membaca sebuah buah point 2 dimensi
  yang terdiri atas pasangan nilai (x,y). x dan y bertype integer.
• Jika P tidak terletak di sumbu x atau sumbu y atau di titik origin
  (0,0), maka tuliskan ke layar kuadran di mana P terletak
• Kuadran point (x, y) adalah sbb:
     • Jika x > 0 dan y > 0, maka kuadran = 1
     • Jika x < 0 dan y > 0, maka kuadran = 2
     • Jika x < 0 dan y < 0, maka kuadran = 3
     • Jika x > 0 dan y < 0, maka kuadran = 4
• Jika P terletak di sumbu x, atau sumbu y, atau di titik origin,
  tuliskan “Kuadran tidak bisa dihitung”
03/11/2022                          Pengenalan Komputasi               5

## [KU1102_LatihanSoal_2019 h5]

Soal 3
• Sebuah program menerima masukan suhu dalam derajat celcius,
  misalnya TC, dan sebuah kode konversi dalam huruf ‘F’, ‘R’, ‘K’ dan
  menuliskan ke layar konversi TC :
     • Jika kode konversi = ‘F’, maka TC dikonversi ke derajat fahrenheit dengan
       rumus = (9/5 * TC )+ 32
     • Jika kode konversi = ‘R’, maka TC dikonversi ke derajat reamur dengan
       rumus = 4/5 * TC
     • Jika kode konversi = ‘K’, maka TC dikonversi ke derajat kelvin dengan
       rumus = TC + 273
• Semua masukan diasumsikan valid, sehingga tidak perlu diperiksa.

03/11/2022                         Pengenalan Komputasi                            6

## [KU1102_LatihanSoal_2019 h6]

Soal 4
• Buatlah program yang menerima 3 buah integer, misalnya a, b, c, yang
  berbeda-beda dan menuliskan ke-3 integer terurut dari paling tinggi ke
  paling rendah
• Contoh input/output:
   a            b             c                       Keluaran
   3            4             -1                      3 2 -1
   4            10            11                      11 10 4
   35           -90           100                     -90 35 100

• Catatan: Harus menggunakan kondisional saja (tidak diperkenankan
  menggunakan array)

03/11/2022                     Pengenalan Komputasi                        7

## [KU1102_LatihanSoal_2019 h7]

Soal 5
• Hitunglah ada berapa banyak bilangan kelipatan X antara a s.d. b.
• X, a, b adalah input dari pengguna.
• Asumsikan:
     • X, a, b bertype integer positif.
     • a < b.
• Contoh:           X       a       b            Keluaran       Keterangan
                    3       1       5            1              {3}
                    2       3       15           5              {4,6,8,10,12}
                    2       6       10           0              {}


03/11/2022                               Pengenalan Komputasi                   8

## [KU1102_LatihanSoal_2019 h8]

Soal 6
• Diketahui sebuah array of integer TI dengan elemen sebanyak 100
  buah. Asumsikan bahwa sudah ada bagian program yang akan
  mengisi seluruh elemen TI dengan nilai-nilai integer (tidak perlu
  dibuat)
• Buatlah program yang memeriksa apakah seluruh elemen TI
  bernilai positif. Jika benar, tuliskan ke layar: “Semua elemen array
  positif”. Jika tidak, tuliskan ke layar “Tidak semua elemen array
  positif”.
• Petunjuk: Ada beberapa cara:
     • Menghitung berapa banyak yang positif dan bukan positif
     • Menggunakan algoritma searching

03/11/2022                        Pengenalan Komputasi                   9

## [KU1102_LatihanSoal_2019 h9]

Soal 7
• Diketahui sebuah array of integer TI dengan elemen sebanyak 100
  buah. Asumsikan bahwa sudah ada bagian program yang akan
  mengisi seluruh elemen TI dengan nilai-nilai integer (tidak perlu
  dibuat)
• Buatlah program yang menerima masukan sebuah pilihan angka 0,
  1, atau 2 dari pengguna (asumsikan pilihan selalu benar).
     • Pilihan 0 : Tuliskan nilai maksimum dan minimum dari elemen array
     • Pilihan 1 : Tuliskan nilai maksimum saja
     • Pilihan 2 : Tuliskan nilai minimum saja
• Petunjuk: pencarian nilai maksimum dan minimum harus
  dilakukan dalam 1 buah loop

03/11/2022                        Pengenalan Komputasi                     10

## [KU1102_LatihanSoal_2019 h10]

Soal 8a
• Diketahui sebuah array of integer T1 dan T2 dengan masing-
  masing elemen sebanyak 100 buah.
• Akan dilakukan pemeriksaan apakah T1 dan T2 adalah array yang
  sama atau tidak (lihat soal 8b).
• Pada program tersebut, buatlah sebuah prosedur/fungsi
  BacaArray yang digunakan untuk mengisi array of integer dengan
  elemen sebanyak 100 buah dengan masukan dari pengguna dan
  menyimpan hasil pembacaan di suatu array of integer.



03/11/2022                 Pengenalan Komputasi                11

## [KU1102_LatihanSoal_2019 h11]

Soal 8b
• Dari soal 7a, buatlah program utama yang:
     • Menerima masukan array T1 dan T2 dengan memanggil prosedur/fungsi
       BacaArray.
     • Memeriksa apakah T1 dan T2 adalah array yang sama. Kedua array
       disebut sama jika i, T1[i] = T2[i].
     • Jika kedua array sama, tuliskan pesan “Array sama”. Jika tidak, tuliskan
       pesan “Array tidak sama”.
• Cara untuk menentukan elemen yang sama:
     • Menghitung berapa banyak elemen kedua array yang sama.
     • Menggunakan algoritma searching


03/11/2022                         Pengenalan Komputasi                           12

## [KU1102_LatihanSoal_2019 h12]

Soal 9
• Buatlah program yang menerima masukan 2 buah matriks of
  integer, misalnya M1 (nilai efektif NBrs1 dan NKol1) dan M2 (nilai
  efektif NBrs2 dan NKol2). Asumsikan bagian program untuk
  mengisi kedua matriks sudah dibuat.
• Tentukan apakah kedua matriks adalah matriks yang sama atau
  tidak dan tuliskan hasilnya ke layar (format bebas).
• Matriks yang sama adalah matriks yang ukuran baris dan kolom
  efektifnya sama dan isi setiap elemen sama, yaitu: M1[i][j] =
  M2[i][j].


03/11/2022                   Pengenalan Komputasi                  13

## [KU1102_LatihanSoal_2019 h13]

Soal 10 (1)
• Buatlah program yang menerima masukan sebuah matriks of
  integer M dengan nilai efektif baris NBrs dan nilai efektif kolom
  NKol.
• Asumsikan bagian program untuk mengisi matriks sudah dibuat.
• Tentukan apakah matriks tersebut adalah matriks segitiga atas
  atau bukan.
• Matriks segitiga atas adalah matriks bujur sangkar (NBrs = NKol)
  dan memiliki nilai  0 pada semua elemen di bagian segitiga atas
  matriks. Contoh:

03/11/2022                   Pengenalan Komputasi                     14

## [KU1102_LatihanSoal_2019 h14]

Soal 10 (2)
             Contoh-1: Matriks segitiga atas                  Contoh-2: Bukan matriks segitiga
             dengan NBrs = NKol = 4                           atas karena yang bukan 0 di bawah
               1     2     3     4                                5   0     0    0
               0     5     6     7                                4   5     0    0
               0     0     8     9                                3   4     5    0
               0     0     0    10                                2   3     4    5

             Contoh-3: Bukan matriks segitiga                Contoh-4: Bukan matriks segitiga
             atas karena NBrs  NKol                         atas karena isi tidak tepat
               1     2     3     4    5                           1   2     3    0
               0     6     7     8    9                           0   5     4    7
               0     0    10    11    12                          0   0     8    9
               0     0     0    13    14                          0   0     0   10

03/11/2022                                     Pengenalan Komputasi                               15

# SOURCE UTS_KU1102_2018 (older, 6 pages)


## [UTS_KU1102_2018 h1]

UTS KU1072/Pengenalan Teknologi Informasi B                          NIM: _________________________________
Tanggal: 3 November 2018             Waktu: 120 menit               Nama: _________________________________
Halaman 1 dari 6                                                    Kelas: _________________________________


               UJIAN TENGAH SEMESTER
     KU1072/PENGENALAN TEKNOLOGI INFORMASI B
                    SEM. 1 2018/2019

HARI, TANGGAL             : SABTU, 3 NOVEMBER 2018
SIFAT UJIAN               : INDIVIDUAL DAN CLOSED BOOK
DURASI                    : 120 MENIT
BAHASA                    : PYTHON
FAK./SEK.                 : SITH (Rekayasa), STEI, FTSL (Kelas: 10)


BACALAH PETUNJUK INI SEBELUM UJIAN DIMULAI :

1.   JANGAN BUKA HALAMAN BERIKUTNYA SEBELUM UJIAN DIMULAI!
2.   Persiapan Ujian:
     a.   Di atas meja hanya ada alat tulis dan KTM serta KSM.
     b.   Ujian ini bersifat individual dan closed book.
3.   SETELAH UJIAN DIMULAI:
     a.  Cek apakah Anda sudah mendapatkan 6 lembar soal (termasuk lembar ini) yaitu dari halaman 1 s.d.
         6. Jika Anda tidak mendapatkan lembar yang benar, tukarkan kepada pengawas.
    b. Lembar soal adalah sekaligus lembar jawaban. Tidak disediakan lembar jawaban terpisah.
    c. Tuliskan NIM, Nama, dan Kelas, pada tiap lembar soal pada tempat di pojok kanan atas.
    d. Baca dulu semua soal berikut semua petunjuknya sebelum mengerjakan. Baca semua instruksi
         dengan sebaik-baiknya. Semua soal Algoritma dan Pemrograman dikerjakan dengan menggunakan
         Bahasa Python.
    e. Kerjakan dulu soal yang Anda anggap mudah.
    f. Tuliskan jawaban soal pada tempat-tempat yang disediakan sesuai instruksi soal. Jika Anda
         membutuhkan tambahan tempat untuk menjawab, gunakan halaman-halaman kosong yang ada
         pada lembar soal sesuai petunjuk dan jangan lupa menuliskan nomor soal dengan jelas. Jika Anda
         membutuhkan lembar corat-coret, gunakan juga halaman-halaman kosong yang tersisa pada pada
         lembar soal.
4. Tidak ada pertanyaan untuk semua soal. Buat asumsi sendiri jika ada soal yang menurut Anda tidak jelas
   dan tuliskan asumsi Anda bersama jawaban Anda.
5. Sebelum memulai ujian, tanda tanganilah pernyataan di bawah ini.

Dengan ini, saya menyatakan bahwa saya mengerjakan ujian ini secara jujur, tanpa bantuan yang tidak dibenarkan. Jika
nantinya terbukti bahwa pernyataan saya ini tidak benar, maka saya bersedia menerima semua konsekuensinya sesuai
aturan kuliah dan peraturan ITB.

Bandung, 3 November 2018




Nama:
NIM:

                        SELAMAT MENGERJAKAN. SEMOGA SUKSES. 

## [UTS_KU1102_2018 h2]

UTS KU1072/Pengenalan Teknologi Informasi B                         NIM: _________________________________
Tanggal: 3 November 2018             Waktu: 120 menit              Nama: _________________________________
Halaman 2 dari 6                                                   Kelas: _________________________________

Soal 1. Pengantar Berpikir Komputasional, Sistem Computing, dan Jaringan Komputer
[Bobot : 30%]
1.a. Jelaskan mengapa kemampuan berpikir komputasional menjadi salah satu skill yang penting di abad 21.

1.b. Untuk menyelesaikan tugas kuliah, dibutuhkan perangkat lunak yang berbayar yang cukup mahal. Kampus
     menyediakan perangkat lunak tersebut di laboratorium komputer, tetapi Anda harus berbagi dengan mahasiswa
     lain dan tidak dapat menggunakannya setiap saat. Anda tahu bahwa Anda dapat membeli versi bajakan dari
     perangkat lunak tersebut dengan cukup murah dan crack juga mudah didapatkan di internet. Apa yang akan Anda
     lakukan?

1.c. Suatu hari saat akan praktikum PTI, Anda menemukan komputer yang akan digunakan masih hidup dan pada
     browser, masih terlihat aplikasi media sosial terbuka. Anda mengenal pemilik akun yang sedang aktif pada
     aplikasi tersebut dan dia kebetulan adalah orang yang sangat tidak Anda sukai. Orang tersebut sering
     menggunakan akun media sosial ini untuk melakukan perundungan (cyber-bullying) kepada orang lain, termasuk
     Anda. Anda berpikir, jika Anda melakukan sesuatu pada akun tersebut, misalnya mengirimkan pesan yang tidak
     pantas, menghapus file dan gambar, dll., banyak orang yang akan merasa senang, bahkan berterima kasih pada
     Anda  Lagipula salah dia sendiri tidak log-out dengan baik dari aplikasi tersebut di komputer umum. Apa yang
     akan Anda lakukan?

Tuliskan jawaban soal 1 di bawah ini atau di halaman kosong di balik hlm. 2 secara singkat, padat, tapi dengan
argumen yang jelas. Gunakan Bahasa Indonesia yang baik dan benar. Jangan lupa memberikan nomor soal
dengan jelas.

## [UTS_KU1102_2018 h3]

UTS KU1072/Pengenalan Teknologi Informasi B                           NIM: _________________________________
Tanggal: 3 November 2018             Waktu: 120 menit                Nama: _________________________________
Halaman 3 dari 6                                                     Kelas: _________________________________

Soal 2. Algoritma dan Pemrograman - 1 [Bobot : 40%]
2.a. Buatlah program untuk menghitung sisi miring sebuah segitiga siku-siku dengan rumus Pythagoras. Program
     membaca input 2 buah bilangan riil, misalnya (alas segitiga) dan (tinggi segitiga) dan menuliskan ke layar
     hasil perhitungan sisi miring yang dihitung dengan rumus sbb.:              . Asumsikan a > 0 dan b > 0.
     Untuk menghitung       gunakan       dan untuk    gunakan           .

2.b. Kelas pertandingan seorang atlit pertandingan bela diri ditentukan berdasarkan berat badannya sbb:
           45 kg ≤ berat badan ≤ 50 kg : kelas A
           50 kg < berat badan ≤ 55 kg : kelas B
           55 kg < berat badan ≤ 60 kg : kelas C
           60 kg < berat badan ≤ 65 kg : kelas D
           65 kg < berat badan ≤ 70 kg : kelas E
           berat badan > 70 kg : kelas F
     Buatlah sebuah program yang menerima berat badan seorang atlit (bilangan bulat) dan menuliskan kelas
     pertandingan atlit yang bersangkutan. Jika berat badan atlit < 45 kg, tuliskan “Tidak memenuhi kualifikasi”.

2.c. Diketahui sebuah deret sebagai berikut:                                      . Buatlah program digunakan untuk
     menuliskan ke layar hasil      berdasarkan masukan nilai     (bilangan riil) dan (bilangan bulat) dari pengguna
     dengan menggunakan deret di atas. Asumsikan:                  dan       . Untuk menghitung , gunakan           .

Tuliskan jawaban soal 2.a, 2.b, dan 2.c di bawah ini atau di halaman kosong di balik hlm. 3 dan 4 (jangan lupa
memberikan nomor soal dengan jelas).

## [UTS_KU1102_2018 h4]

UTS KU1072/Pengenalan Teknologi Informasi B                        NIM: _________________________________
Tanggal: 3 November 2018             Waktu: 120 menit             Nama: _________________________________
Halaman 4 dari 6                                                  Kelas: _________________________________

2.d. Buatlah sebuah program yang menuliskan ke layar banyaknya bilangan yang merupakan bilangan bulat positif dan
     sekaligus genap dari sejumlah N buah bilangan yang tersimpan dalam array of integer T berukuran N. Tuliskan
     program Anda dalam template berikut. Baca instruksi yang tertera dalam komentar sebaik-baiknya.

# Program CountPosGenap
# Menghitung banyaknya bilangan positif dan genap dari sebuah array of integer

# KAMUS
# N : int
# T : array [0..N-1] of int – array of integer dengan indeks dari 0 s.d. N-1
# Tuliskan di bawah ini variabel lain yang diperlukan




# ALGORITMA
# Mendeklarasikan array dan mengisi array
N = int(input())
T = [0 for i in range(N)]
… # diasumsikan program untuk mengisi array T dengan sejumlah integer sudah ada,
  # tidak diminta dibuat

# Tuliskan di bawah ini: program untuk menghitung ada berapa banyak bilangan integer yang
# positif dan genap dalam array T dan menampilkan hasilnya ke layar

## [UTS_KU1102_2018 h5]

UTS KU1072/Pengenalan Teknologi Informasi B                           NIM: _________________________________
Tanggal: 3 November 2018             Waktu: 120 menit                Nama: _________________________________
Halaman 5 dari 6                                                     Kelas: _________________________________

Soal 3. Algoritma dan Pemrograman - 2 [Bobot : 30%]

3.a. Tinggi Rata-Rata Siswa
Kepala Sekolah sebuah SMA ingin mendapatkan rata-rata tinggi badan siswa di suatu kelas. Untuk itu, dia memanggil
semua siswa di kelas itu dan mengumpulkannya di ruang UKS untuk diukur tinggi badannya satu per satu. Karena tidak
tahu banyaknya siswa dalam kelas, Kepala Sekolah berniat menghitungnya sambil mengukur tinggi badan siswa. Tinggi
badan siswa diukur dalam satuan cm dan dengan pengamatan sekilas, bisa diketahui bahwa tidak ada siswa yang
tingginya kurang dari 100 cm atau lebih dari 200 cm.

Seorang guru membantu Kepala Sekolah mengukur tinggi badan dan mencatatnya. Guru ini agak ceroboh sehingga
sering memasukkan data yang salah. Data berat badan yang salah, yaitu kurang dari 100 cm atau lebih besar dari 200
cm, tidak digunakan untuk menghitung tinggi rata-rata.

Buatlah program yang membantu Kepala Sekolah untuk menghitung tinggi rata-rata siswa di kelas. Program menerima
input sejumlah bilangan bulat yang mewakili tinggi mahasiswa. Pembacaan input diakhiri dengan memasukkan nilai -
999 (tidak termasuk diproses). Selanjutnya program menuliskan tinggi rata-rata siswa di kelas berdasarkan data yang
diinputkan, tanpa memperhitungkan data yang salah input (yaitu jika nilai < 100 cm atau > 200 cm). Jika tidak ada data
yang bisa digunakan untuk menghitung tinggi rata-rata, tuliskan pesan “Tidak ada data”.

Perhatikan contoh input/output di bawah ini (jumlah angka di belakang koma bebas):
 Input                  Output                          Keterangan
 120                    138.3333
 145
 150
 -999
 120                    145.6667                         Nilai 78 dan 201 tidak dimasukkan dalam perhitungan karena
 78                                                      78 < 100 dan 201 > 200
 167
 150
 201
 -999
 -999                   Tidak ada data                   Pengguna langsung memasukkan -999 di awal
 78                     Tidak ada data                   Dari data yang dimasukkan tidak ada satu pun yang valid
 201
 -999

Tuliskan jawaban soal 3.a di bawah ini atau di halaman kosong di balik hlm. 5.

## [UTS_KU1102_2018 h6]

UTS KU1072/Pengenalan Teknologi Informasi B                          NIM: _________________________________
Tanggal: 3 November 2018             Waktu: 120 menit               Nama: _________________________________
Halaman 6 dari 6                                                    Kelas: _________________________________

3.b. Berat Badan Siswa
Di lain kesempatan, Kepala Sekolah ingin mendapatkan beberapa informasi terkait berat badan siswa karena beliau
sangat peduli dengan kesehatan siswa. Tapi sekarang Kepala Sekolah sudah tahu bahwa ada 50 siswa di kelas. Untuk
itu, dia menyiapkan daftar sejumlah 50 baris dan menyuruh seorang guru yang lain untuk mengukur dan mencatat berat
badan siswa. Kali ini guru yang membantu Kepala Sekolah sangat kompeten. Dia tidak pernah salah memasukkan data
berat badan siswa, yaitu berat seorang siswa pasti > 0 kg.

Buatlah program yang menerima masukan data berat badan 50 siswa (bilangan bulat, asumsikan masukan data berat
tidak ada yang salah) dan:
     tampilkan nilai berat badan yang terbesar dari seluruh data berat badan siswa.
     baca sebuah nilai X dari masukan pengguna dan:
     o     tuliskan berapa banyak siswa yang memiliki berat badan di atas X kg.
     o     tampilkan data berat badan yang di atas X kg (ditampilkan hanya jika banyaknya siswa dengan berat badan di
           atas X kg > 0).

Contoh interaksi input/output:
Untuk meringkas tampilan, tidak semua data masukan/keluaran ditampilkan. Yang dicetak tebal dan digaris bawah
adalah masukan dari pengguna.
Contoh-1                                                   Contoh-2
Masukkan data berat badan siswa =                            Masukkan data berat badan siswa =
56                                                           36
45                                                           44
67                                                           73
78                                                           78
56                                                           46
…                                                            …
89                                                           69
47                                                           47
65                                                           65
66                                                           66
55                                                           76
Berat badan terbesar = 89                                    Berat badan terbesar = 78
Masukkan berat badan = 70                                    Masukkan berat badan = 80
Banyaknya siswa dengan berat > 70 = 10                       Banyaknya siswa dengan berat > 80 = 0
Daftar berat badan > 70 =
78
…
89

Tuliskan jawaban soal 3.b di bawah ini atau di halaman kosong di balik hlm. 6.

# SOURCE UTS_KU1102_2019 (older, 8 pages)


## [UTS_KU1102_2019 h1]

UTS KU1102/Pengenalan Komputasi                                      NIM: _________________________________
Tanggal: 26 Oktober 2019                   Waktu: 120 menit         Nama: _________________________________
Halaman 1 dari 8                                                    Kelas: _________________________________


                       UJIAN TENGAH SEMESTER
                    KU1102/PENGENALAN KOMPUTASI
                             SEM. 1 2019/2020
                                    STREAM PEMROGRAMAN

HARI, TANGGAL             : SABTU, 26 OKTOBER 2019
SIFAT UJIAN               : INDIVIDUAL DAN CLOSED BOOK
DURASI                    : 120 MENIT
BAHASA                    : PYTHON
FAK./SEK. (Kelas)         : FITB (K6-K9), STEI (K14-K20, K69-K71),
                            FTSL (K21-K26), FTI (K29-K32, K72), SITH-S (K43-K44)


BACALAH PETUNJUK INI SEBELUM UJIAN DIMULAI :

1.   JANGAN BUKA HALAMAN BERIKUTNYA SEBELUM UJIAN DIMULAI!
2.   Persiapan Ujian:
     a.   Di atas meja hanya ada alat tulis dan KTM serta KSM.
     b.   Ujian ini bersifat individual dan closed book.
3.   SETELAH UJIAN DIMULAI:
     a.  Cek apakah Anda sudah mendapatkan 8 lembar soal yaitu dari halaman 1 s.d. 8 (termasuk lembar
         ini dan cheat sheet bahasa pemrograman di hlm. 8). Jika Anda tidak mendapatkan lembar yang
         benar, tukarkan kepada pengawas.
    b. Lembar soal adalah sekaligus lembar jawaban. Tidak disediakan lembar jawaban terpisah.
    c. Tuliskan NIM, Nama, dan Kelas, pada tiap lembar soal pada tempat di pojok kanan atas.
    d. Baca dulu semua soal berikut semua petunjuknya sebelum mengerjakan. Baca semua instruksi
         dengan sebaik-baiknya.
    e. Kerjakan dulu soal yang Anda anggap mudah.
    f. Tuliskan jawaban soal pada tempat-tempat yang disediakan sesuai instruksi soal. Jika Anda
         membutuhkan tambahan tempat untuk menjawab, gunakan halaman-halaman kosong yang ada
         pada lembar soal sesuai petunjuk dan jangan lupa menuliskan nomor soal dengan jelas.
    g. Jika Anda membutuhkan lembar corat-coret, gunakan juga halaman-halaman kosong yang tersisa
         pada pada lembar soal.
4. Tidak ada pertanyaan untuk semua soal. Buat asumsi sendiri jika ada soal yang menurut Anda tidak jelas
   dan tuliskan asumsi Anda bersama jawaban Anda.
5. Sebelum memulai ujian, tanda tanganilah pernyataan di bawah ini.

Dengan ini, saya menyatakan bahwa saya mengerjakan ujian ini secara jujur, tanpa bantuan yang tidak dibenarkan. Jika
nantinya terbukti bahwa pernyataan saya ini tidak benar, maka saya bersedia menerima semua konsekuensinya sesuai
aturan kuliah dan peraturan ITB.

Bandung, 26 Oktober 2019




Nama:
NIM:

                        SELAMAT MENGERJAKAN. SEMOGA SUKSES. ☺

## [UTS_KU1102_2019 h2]

UTS KU1102/Pengenalan Komputasi                                      NIM: _________________________________
Tanggal: 26 Oktober 2019                   Waktu: 120 menit         Nama: _________________________________
Halaman 2 dari 8                                                    Kelas: _________________________________

Soal 1. Computing System, Network, and Impact of Computing [Bobot : 25%]

Soal 1.A. Pilihan Ganda
Untuk pernyataan-pernyataan di bawah ini, berikan tanda silang (X) pada 1 (satu) saja pilihan jawaban yang
benar.

1. Peranti di bawah ini yang merupakan peranti             5. Perangkat utilitas digunakan untuk hal berikut,
   computing adalah:                                          kecuali:
   a. Elevator                                                a. Kompresi file sehingga memakan tempat yang
   b. Microwave ovens                                            lebih kecil
   c. Lemari pendingin                                        b. Melakukan manipulasi aritmatika dan lojik
   d. Smartphone                                                 terhadap data
                                                              c. Mengkopi file antar media penyimpanan
                                                              d. Memperbaiki file yang rusak

2. Di bawah ini yang bukan merupakan contoh hardware       6. Di bawah ini yang bukan contoh perangkat jaringan:
   adalah:                                                    a. Antivirus
   a. Motherboard                                             b. Network Interface Card (NIC)
   b. CPU                                                     c. Switch
   c. RAM                                                     d. Modem
   d. Operating System

3. Windows, Linux, dan MacOS adalah contoh dari:           7. Teknologi yang menghubungkan perangkat elektronik
   a. Operating system                                        ke internet sehingga dapat berkomunikasi dan bertukar
   b. Application                                             data disebut sebagai:
   c. Browser                                                 a. Internet
   d. Hardware                                                b. Artificial intelligence
                                                              c. Internet of things
                                                              d. Augmented reality

4. Operasi dasar yang dilakukan oleh CPU adalah:           8. Berikut adalah keuntungan internet, kecuali:
   a. Menerima input dari pengguna                            a. Mengurangi waktu untuk mengembangkan
   b. Memroses informasi                                         program komputer
   c. Menampilkan output                                      b. Saling berbagi sumber daya hardware komputer.
   d. Menyimpan data                                          c. Berbagi data dan perangkat lunak.
                                                              d. Berkomunikasi dan bekerja bersama.


Soal 1.B. Uraian
Tuliskan jawaban soal bagian B di bawah ini atau di halaman kosong di balik hlm. 2 secara singkat, padat, tapi
dengan jelas. Gunakan Bahasa Indonesia yang baik dan benar. Jangan lupa memberikan nomor soal dengan
jelas.

1. Jelaskan 1 (satu) contoh ancaman terhadap keamanan data Anda di media sosial dan jelaskan bagaimana
   mencegah/mengatasinya.

2. Jelaskan apa itu netiquette dan mengapa netiquette penting? Berikan 1 (satu) contoh penerapannya.

## [UTS_KU1102_2019 h3]

UTS KU1102/Pengenalan Komputasi                                     NIM: _________________________________
Tanggal: 26 Oktober 2019                  Waktu: 120 menit         Nama: _________________________________
Halaman 3 dari 8                                                   Kelas: _________________________________

Soal 2. Berpikir Komputasional [Bobot: 25%]

Soal 2.A. Pilihan Ganda
Untuk pernyataan-pernyataan di bawah ini, berikan tanda silang (X) pada 1 (satu) pilihan jawaban yang benar.

1. Manakah yang benar terkait konsep berpikir              3. Mengenali berbagai persamaan dan perbedaan
   komputasional?                                             karakteristik dari berbagai jenis data dapat
   a. Teknik berpikir komputasional terdiri atas              dikategorikan sebagai kegiatan berpikir komputasional
      dekomposisi, pengenalan pola, abstraksi, dan            sbb.
      penyusunan algoritma.                                   a. abstraksi
   b. Berpikir komputasional hanya berkaitan dengan           b. generalisasi
      pengembangan program atau aplikasi untuk                c. pengenalan pola
      komputer.                                               d. dekomposisi
   c. Berpikir komputasional melibatkan proses untuk
      memformulasi masalah dan mengekspresikan             4. Manakah yang bukan merupakan perintah control flow
      solusinya.                                              pada algoritma?
   d. Berpikir komputasional dapat dipelajari tanpa           a. Repetisi/pengulangan
      harus menggunakan mesin.                                b. Selection/pilihan
                                                              c. Perintah/instruksi
2. Salah satu proses dalam membuat emoticon smiley            d. Sequence/urutan
   adalah dengan menghilangkan semua fitur pada wajah
   kecuali mata dan mulut. Proses in disebut sebagai:
   a. abstraksi
   b. generalisasi
   c. pengenalan pola
   e. dekomposisi

5. Diberikan flowchart/pseudecode di bawah ini. Jika temperatur air adalah 800C, apa langkah berikutnya?
   a. Turn off the stove
   b. Increase the fire
   c. Boil water for 3 minutes
   d. Measure water temperature
   Flowchart:                                          Pseudocode:
           Start
                                                       Put the pan on the stove
                                                       Turn on the stove
      Put the pan on                                   Pour water on the pan
        the stove                                      Boil water for 3 minutes
                                                       Measure water temperature
        Turn on the                                    while Temperature more than 900C = No do
           stove                                            Boil water for 3 minutes
                                                            Measure water temperature
                                                       { Temperature more than 900C = Yes }
       Pour water to                                   Turn off the stove
         the pan

      Boil water for 3
          minutes

      Measure water
       temprature


     Is temperature      No
     more than 90oC?

              Yes
       Turn off the
          stove

            End

## [UTS_KU1102_2019 h4]

UTS KU1102/Pengenalan Komputasi                                      NIM: _________________________________
Tanggal: 26 Oktober 2019                   Waktu: 120 menit         Nama: _________________________________
Halaman 4 dari 8                                                    Kelas: _________________________________

6. Jika diberikan X = 6, apakah hasil dari algoritma (dalam flowchart/pseudocode) berikut.
   a. 6
   b. 15
   c. 21
   d. Tidak ada output

   Flowchart:                                                 Pseudocode:
            Start                                             i  0
                                                              Sum  0
                                                              input (X)
            i=0                                               while (i < X) do
          Sum = 0
                                                                  i  i + 1
                                                                  Sum  Sum + i
           Input X                                            { i >= X }
                                                              output (Sum)

            i<X         False

                True
                                Show
           i=i+1                Sum

        Sum = Sum + i           End.


7. Algoritma pada soal 6 merepresentasikan persoalan:
   a. Penjumlahan X dengan i.
   b. Penjumlahan X buah bilangan pertama dari 0.
   c. Penjumlahan i sebanyak X buah.
   d. Penjumlahan X sebanyak i kali.

8. Robot mini dapat menjalankan perintah berikut:
   • V - satu langkah maju
   • L (sudut) - rotasi ke sudut yang diberikan dalam kurung ke kiri,
   • R (sudut) - rotasi ke sudut yang diberikan di dalam kurung kanan

   Jika lebih dari satu perintah harus dieksekusi, perintah dapat dirangkai menggunakan operasi "+". Misalnya "V + L
   (20) + V + R (2)" berarti bahwa pertama-tama robot harus membuat langkah maju, lalu belok kiri 20 derajat, lalu
   buat langkah maju dan kemudian belok kanan 2 derajat.
   Untuk dapat mengulangi serangkaian perintah, dapat digunakan operasi "*". Misalnya "20 * (V)" berarti mengulangi
   20 kali tindakan, yang diberikan dalam tanda kurung setelah "*", yaitu untuk membuat langkah maju. Jadi contoh
   ini akan menghasilkan 20 langkah ke depan.
   Contoh lain: 180 * (V + L (1)) menggambar setengah lingkaran.
   Pada awalnya robot mini diposisikan pada titik A dan terlihat ke arah B.

   Manakah dari kombinasi perintah di bawah ini yang telah ditetapkan yang akan
   membawa robot mini dari A ke C sepanjang jalur melengkung seperti pada gambar di
   samping?

   a. 90 *(V+ L(1) +V+ R(1))
   b. 90 *(V+ L(1) ) + 90 * (V+ R(1))
   c. 90 *(V+ L(1) ) + R(30)+ 90 * (V+ R(1))
   d. L(90) + 90*(V+ L(1) ) + R(90)+ 90 * (V+ R(1))

## [UTS_KU1102_2019 h5]

UTS KU1102/Pengenalan Komputasi                                   NIM: _________________________________
Tanggal: 26 Oktober 2019                 Waktu: 120 menit        Nama: _________________________________
Halaman 5 dari 8                                                 Kelas: _________________________________

Soal 2.B. Uraian
Ladybug (kepik) adalah robot dan dapat dikendalikan oleh perintah-perintah ini:
    • Forward N - Kepik bergerak N langkah (N ≥ 1) maju ke arah yang dituju.
    • Left - Kepik menghadap ke kiri tanpa bergerak ke depan.
    • Right - Kepik menghadap ke kanan tanpa bergerak ke depan.
    • Repeat R (beberapa perintah) - Ladybug mengulangi perintah dalam tanda kurung R kali jika R≥1.
        Jika R<1, maka perintah dalam tanda kurung tidak dijalankan sama sekali.
Setiap gerakan maju dari Ladybug melukiskan sebuah trek (garis lurus) di lantai di mana ia bergerak.

1. Diberikan urutan perintah sebagai berikut kepada Ladybug (setiap perintah dipisahkan oleh koma):
        Repeat 2 (Forward 1, Right, Forward 1, Left), Repeat 2 (Forward 1, Right),
        Forward 2, Right, Forward 1, Left, Forward 1, Right, Forward 2, Right
   Gambarkan trek yang dilalui oleh Ladybug yang dimulai pada posisi yang ditampilkan pada gambar
   berikut (gambar jawaban Anda langsung pada gambar di bawah ini dengan cara menebalkan garis yang
   menjadi trek).




2. Diberikan X (bilangan bulat ≥ 1), tuliskan urutan perintah untuk membuat trek berbentuk piramida dengan
   ketinggian X dari posisi awal Ladybug (lihat contoh). Asumsikan selalu ada ruang yang cukup untuk menggambar
   piramida dari posisi mana pun. Perhatikan contoh-contoh berikut.

                        X=1               X=2                          X=5




   Tuliskan jawaban untuk soal 2 di bawah ini atau di halaman kosong di balik halaman 5.

## [UTS_KU1102_2019 h6]

UTS KU1102/Pengenalan Komputasi                                NIM: _________________________________
Tanggal: 26 Oktober 2019               Waktu: 120 menit       Nama: _________________________________
Halaman 6 dari 8                                              Kelas: _________________________________

Soal 3. Algoritma dan Pemrograman [Bobot: 50%]

Untuk soal 3.1 s.d. 3.4 di bawah ini:
a. Buatlah program dalam bahasa pemrograman Python sesuai dengan yang diajarkan di kelas.
b. Bonus: Buatlah flowchart/pseudocode untuk persoalan tersebut (pilih salah satu saja sesuai yang
   ditekankan di kelas). Flowchart/pseudocode. Anda boleh mengerjakan flowchart/pseudocode dulu
   sebelum mengerjakan program.

Tuliskan jawaban di sisa halaman 6 dan 7, atau di halaman kosong di balik halaman 6, 7, 8. Jangan
lupa menulis nomor soal dengan jelas.

Soal 3.1. Volume Bola
                                                                     4
Diketahui sebuah bola dengan jari-jari 𝑟. Volume bola adalah 𝑉𝑏𝑜𝑙𝑎 = 3 𝜋𝑟 3 . Buatlah program yang
menerima masukan jari-jari bola dan menampilkan volume bola. Untuk konstanta 𝜋, gunakan 3,1416).

Soal 3.2. Angka Armstrong
Angka Armstrong dari 3 (tiga) digit bilangan adalah bilangan bulat sehingga jumlah pangkat tiga dari
masing-masing digitnya sama dengan angka itu sendiri. Misalnya, 371 adalah angka Armstrong karena
33 + 73 + 13 = 371.
Buatlah program yang meminta user masukan bilangan bulat ratusan (3 digit), lalu menampilkan ke layar
apakah bilangan tersebut adalah bilangan Armstrong atau bukan.

Soal 3.3. Nilai Kuliah
Dosen ingin mengolah nilai kuliah yang dikuti oleh N orang mahasiswa (N > 0). Program tersebut menerima
masukan nama, nilai praktikum, nilai uts dan nilai uas sebanyak jumlah mahasiswa (setiap nilai dalam skala
0 s.d. 100). Untuk setiap mahasiswa, dihitung nilai akhir dengan rumus sbb:
nilai akhir = 0,2 * nilai praktikum + 0,4 * nilai uts + 0,4 * nilai uas
Selanjutnya, berdasarkan nilai akhir tersebut, ditentukan indeks akhir mata kuliah yang didapat oleh setiap
mahasiswa dengan aturan: A ≥ 85, 85 > AB ≥ 75, 75 > B ≥ 70, 70 > BC ≥ 60, 60 > C ≥ 50, 50 > D >= 40,
dan sisanya E.
Program kemudian mencetak nama, setiap komponen nilai, nilai akhir, dan indeks untuk tiap mahasiswa.
Berikut contoh tampilan outputnya (setiap detil nilai dipisahkan oleh spasi dan vertical bar, N = 2).

nama | praktikum | uts | uas | akhir | indeks
Udin | 50 | 50 | 50 | 50 | C
Asep | 90 | 70 | 70 | 80 | AB

## [UTS_KU1102_2019 h7]

UTS KU1102/Pengenalan Komputasi                                 NIM: _________________________________
Tanggal: 26 Oktober 2019               Waktu: 120 menit        Nama: _________________________________
Halaman 7 dari 8                                               Kelas: _________________________________

Soal 3.4. Deviasi Standar
Dalam statistik, deviasi standar adalah salah satu ukuran persebaran data. Deviasi standar untuk N buah
sampel data dihitung dengan `menggunakan rumus sbb.




Keterangan:    s = deviasi standar sampel
               N = banyaknya data sampel
               𝑥𝑖 = nilai data ke-i
               𝑥 = rata-rata nilai seluruh sampel data
               ∑𝑁𝑖=1 𝑃𝑖 adalah penjumlahan setiap nilai 𝑃𝑖 mulai dari 𝑖 = 1 s.d. 𝑖 = 𝑁


Suatu program menggunakan formula di atas untuk mengukur persebaran data tinggi mahasiswa di suatu
universitas. Digunakan sampel data mahasiswa 1 kelas yang terdiri atas 50 mahasiswa. Program menerima
masukan tinggi dari 50 mahasiswa (data tinggi adalah integer > 0) dan menyimpannya dalam suatu array of
integer. Selanjutnya, dituliskan ke layar deviasi standar dari tinggi mahasiswa yang dihitung berdasarkan
formula di atas.
Petunjuk: Sebelum memulai perhitungan deviasi standar, hitung terlebih dahulu rata-rata nilai seluruh
sampel data 𝑥.

## [UTS_KU1102_2019 h8]

UTS KU1102/Pengenalan Komputasi                                   NIM: _________________________________
Tanggal: 26 Oktober 2019               Waktu: 120 menit          Nama: _________________________________
Halaman 8 dari 8                                                 Kelas: _________________________________

Python Cheat Sheet

Struktur Program:                 Daftar Type Dasar:                 Perintah input:
# Program <Judul-Program>         int      (bilangan bulat)          <var> = <type>(input(<text>))
# Spesifikasi program             float    (bilangan riil)           Contoh:
# KAMUS                           bool     (true/false)              X = int(input("Nilai X = ")
…                                 char     (karakter/huruf)
                                  string   (kumpulan karakter)       Perintah output:
# Fungsi/prosedur                                                    print(...)
# Deklarasi sekaligus                                                # Contoh:
# realisasi                                                          print(str(X)+str(Y))
…                                                                    # Contoh:
                                                                     # str untuk mengubah nilai non-
# ALGORITMA                                                          # string menjadi string, + untuk
…                                                                    # menggabungkan 2 string


Analisis Kasus:
1 kasus        2 kasus komplementer             Banyak kasus
if (…):        if (…):                          if (…):
   …              …                                …
               else:                            elif (…):
                  …                                …
                                                else:
                                                   …

Pengulangan:
Pengulangan Berdasarkan Pencacah:                  Pengulangan Berdasarkan Kondisi Mengulang di Awal:
Inisialisasi-aksi                                  Inisialisasi-aksi
for i in range(i_awal,i_akhir):                    First-Element
   Aksi                                            while (kondisi-mengulang):
Terminasi                                             Aksi
# i adalah pencacah                                   Next-Element
# i_awal adalah nilai i pertama                    # kondisi-mengulang=false
# i_akhir adalah nilai i ketika keluar             Terminasi
# dari loop, nilai i yang terakhir
# diproses adalah i_akhir-1


Array:
Format Deklarasi:                                                Contoh Deklarasi:
<nama_array> = <init_val> for i in range(<N>)]                   TabInt = [0 for I in range(10)]
# <nama_array> adalah nama variabel array                        # Variabel array adalah TabInt
# <init_val> adalah nilai default elemen array                   # Nilai default elemen array = 0
# <N> adalah ukuran array                                        # Ukuran array = 10 elemen
# Indeks array dari 0 s.d. <N>-1                                 # Indeks array dari 0 s.d. 9
Cara Akses Elemen Array:
<nama_array>[<index>]
Contoh: TabInt[i]
Artinya adalah elemen TabInt yang ke i

Operasi penting:
    1) Untuk menghitung 𝑥 𝑦 , gunakan 𝑥 ∗∗ 𝑦
    2) Untuk menghitung √𝑥 , gunakan 𝑥 ∗∗ 0.5

# SOURCE UTS_KU1102_2021 (older, 6 pages)


## [UTS_KU1102_2021 h1]

UTS KU1102/Pengenalan Komputasi                    NIM: _________________________________
Tanggal: 26 Oktober 2019               Waktu: 120 menitNama: _________________________________
Halaman 1 dari 6                                   Kelas: _________________________________


                      UJIAN TENGAH SEMESTER
                   KU1102/PENGENALAN KOMPUTASI
                            SEM. 1 2021/2022
                                 STREAM PEMROGRAMAN

HARI, TANGGAL           : SABTU, 30 OKTOBER 2021
PUKUL                   : 08.00-09.40 (tambahan 10 menit untuk submit)
PLATFORM                : Google-Form
SIFAT UJIAN             : INDIVIDUAL DAN CLOSED BOOK
DURASI                  : 100 MENIT
BAHASA                  : PYTHON/MATLAB
FAK./SEK. (Kelas)       : FITB, FMIPA, FTTM, FTMD, FTSL, FTI, SITH, STEI

To be done: Translasi ke Bahasa Inggris untuk kelas internasional

## [UTS_KU1102_2021 h2]

UTS KU1102/Pengenalan Komputasi                    NIM: _________________________________
Tanggal: 26 Oktober 2019               Waktu: 120 menitNama: _________________________________
Halaman 2 dari 6                                   Kelas: _________________________________

Bagian A. Computing System, Network, and Impact of Computing (30 menit)

Untuk soal 1 s.d. 3, tuliskan jawaban secara singkat, padat, tapi dengan jelas. Gunakan Bahasa
Indonesia yang baik dan benar. Jangan lupa memberikan nomor soal dengan jelas.

Soal 1
Jelaskan apa yang disebut sebagai green computing dan jelaskan 2 (dua) contoh aplikasi dari green
computing.

Soal 2
Sebutkan 2 (dua) contoh software/perangkat lunak, baik yang tersedia online (berbentuk aplikasi web atau
mobile) maupun yang offline (aplikasi desktop) yang mendukung pelaksanaan kuliah online. Untuk masing-
masing contoh, jelaskan bagaimana perangkat lunak tersebut mendukung Anda dalam melaksanakan kuliah
online.

Soal 3
Sebutkan dan jelaskan 2 (dua) contoh ancaman terhadap privasi karena perkembangan teknologi computing
dan untuk masing-masing contoh, berikan 1 (satu) contoh tindakan yang dapat dilakukan oleh pribadi untuk
menghindari/mengatasinya.

## [UTS_KU1102_2021 h3]

UTS KU1102/Pengenalan Komputasi                    NIM: _________________________________
Tanggal: 26 Oktober 2019               Waktu: 120 menitNama: _________________________________
Halaman 3 dari 6                                   Kelas: _________________________________

Bagian B. Berpikir Komputasional (20 menit)

Soal 4
Robot mini menggambarkan jejak gerakan di atas media gambar. Untuk melakukannya, dia dapat
menjalankan perintah-perintah berikut.

● forward : maju 1 langkah
● turn L/R d : berputar/rotasi sebesar d derajat ke kiri jika L/R bernilai L, dan ke kanan jika L/R bernilai
  R. Asumsikan: L/R bernilai L dan R, sedangkan 0 <= d <= 360. Jika d = 0 atau 360, maka robot tidak
  berubah arah.
● repeat n (perintah): mengulang perintah sebanyak n kali. Asumsikan: n >= 0. Jika n = 0, maka
  perintah tidak dilakukan sama sekali.
● ifelse(ekspresi)(perintah-1)(perintah-2): jika ekspresi bernilai true, maka perintah-1
  dijalankan; jika ekspresi bernilai false, maka perintah-2 dijalankan.
  ekspresi adalah ekspresi boolean seperti yang dapat diajarkan di kelas (Anda boleh menggunakan cara
  penulisan di Python/Matlab, tergantung bahasa pemrograman yang diajarkan di kelas).




  A

Beberapa informasi tambahan:
   ● Asumsi: Di awal, robot berada di posisi A dan robot menghadap ke kanan/timur (lihat gambar di
       atas).
   ● Robot menerima rangkaian perintah yang dituliskan dalam urutan yang masing-masing dipisahkan
       sebuah koma (kecuali untuk perintah terakhir, lihat contoh di bawah). Rangkaian perintah dapat
       dituliskan menyamping, atau dapat juga dituliskan ke bawah, dan dapat juga dikombinasikan dengan
       spasi dan indentasi untuk memperjelas penulisan.
   ● Parameter perintah pada perintah repeat dan parameter perintah-1 dan perintah-2 pada
       perintah ifelse terdiri atas perintah-perintah yang bisa dijalankan oleh robot dan bisa terdiri atas
       lebih dari 1 perintah.

Contoh:
 No. Perintah                                   Arti                           Ilustrasi gerakan
 1    forward, turn L 45, forward,              Pertama-tama robot maju 1
       turn R 45
                                                langkah (ke kanan), lalu
                                                berputar ke kiri 45 derajat,
       Alternatif penulisan:
       forward,                                 lalu maju 1 langkah, dan
       turn L 45,                               selanjutnya berputar ke
       forward,                                 kanan 45 derajat.
       turn R 45
                                                                               Catatan: setiap segmen garis
                                                                               diasumsikan sebesar 1 satuan
                                                                               gerakan

## [UTS_KU1102_2021 h4]

UTS KU1102/Pengenalan Komputasi                    NIM: _________________________________
Tanggal: 26 Oktober 2019               Waktu: 120 menitNama: _________________________________
Halaman 4 dari 6                                   Kelas: _________________________________

 2       repeat 180 (forward, turn L 1)         Robot mengulang
                                                sebanyak 180 kali: maju 1
         Alternatif penulisan:                  langkah dan berputar 1
         repeat 180 (forward,
                     turn L 1)
                                                derajat ke kiri.
                                                Ini akan membuat robot
                                                menggambar setengah
                                                lingkaran.




Tugas Anda:
Diberikan x (bilangan bulat ≥ 1), tuliskan urutan perintah untuk membuat jejak robot dari posisi A ke
posisi terakhir untuk membentuk pola huruf S berulang seperti pada contoh-contoh di bawah. Asumsikan
selalu ada ruang yang cukup untuk menggambar piramida dari posisi mana pun. Harap diingat, di bawah ini
hanyalah gambar contoh. Silakan generalisasi, bagaimana pola gambar jika x bernilai lain.




Bagian C. Algoritma dan Pemrograman (30 menit)

Untuk soal 5 s.d. 7:
   ● Buatlah program dalam bahasa pemrograman sesuai dengan yang diajarkan di kelas.
   ● Bonus (hanya dinilai jika program dibuat, tidak perlu dibuat jika beresiko kehabisan waktu):
       Buatlah flowchart/pseudocode untuk persoalan tersebut (pilih salah satu saja sesuai yang
       ditekankan di kelas). Flowchart dapat digambar dengan menggunakan aplikasi gambar (draw.io, MS
       Word, Visio, dll) lalu di-save sebagai file, atau digambar di atas kertas, lalu di-scan/difoto (Hasil
       scan atau foto harus jelas; jika tidak jelas, dosen boleh tidak menilai). Attach file gambar pada
       tempat yang ditentukan.

Soal 5

## [UTS_KU1102_2021 h5]

UTS KU1102/Pengenalan Komputasi                    NIM: _________________________________
Tanggal: 26 Oktober 2019               Waktu: 120 menitNama: _________________________________
Halaman 5 dari 6                                   Kelas: _________________________________

Jika    NA = banyaknya SKS mata kuliah yang mendapat nilai A,
        NB = banyaknya SKS mata kuliah yang mendapat nilai B,
        NC = banyaknya SKS mata kuliah yang mendapat nilai C,
        ND = banyaknya SKS mata kuliah yang mendapat nilai D,
        NE = banyaknya SKS mata kuliah yang mendapat nilai E,

maka Nilai Rata-rata (NR) seorang mahasiswa dalam suatu semester dihitung sbb.

                                           𝑁𝐴 ∗ 4 + 𝑁𝐵 ∗ 3 + 𝑁𝐶 ∗ 2 + 𝑁𝐷
                                 𝑁𝑅 =
                                            𝑁𝐴 + 𝑁𝐵 + 𝑁𝐶 + 𝑁𝐷 + 𝑁𝐸

Buatlah program yang menerima masukan NA, NB, NC, ND, dan NE (seluruhnya bertype integer) serta
menampilkan NR ke layar. NR bertype float (jumlah angka di belakang koma bebas).

Soal 6
Salah satu sistem yang biasa digunakan untuk menentukan golongan darah manusia adalah sistem ABO.
Menurut sistem ABO, golongan darah manusia dikontrol oleh 3 macam alel, yaitu alel IA, IB, dan IO.

Seseorang mewarisi satu alel dari ayah dan satu alel dari ibu dan kombinasi dari alel warisan dari ayah dan
ibu menentukan golongan darahnya. Tabel berikut berisi kriteria pembentukan alel ganda pada anak
berdasarkan alel yang diwarisi dari kedua orang tuanya dan golongan darah anak berdasarkan alel gandanya.

                                                                                Anak
       Orang Tua-1                 Orang Tua-2
                                                                   Alel Ganda           Golongan Darah
                                           IA                         IAIA                    A
            IA                             IB                         IAIB                    AB
                                           IO                         IAIO                    A
                                           IB                         IBIB                     B
            IB
                                           IO                         IBIO                     B
            IO                             IO                         IOIO                    O

Buatlah program yang menerima masukan alel yang diwarisi dari ibu, misalnya Ix, dan alel yang diwarisi
dari ayah, misalnya Iy, dan menuliskan ke layar golongan darah anak berdasarkan informasi di atas.
Asumsikan masukan alel selalu benar seperti ketentuan di atas.

Contoh input/output:
                                 Input                                                Output
                 Ix                                     Iy                      Golongan Darah Anak
                 IA                                     IA                               A
                 IO                                     IB                               B
                 IB                                     IA                              AB
                 IO                                     IO                               O


Soal 7
Diketahui sebuah fungsi sebagai berikut:
                                                    𝑛

                                            𝑓 (𝑥) = ∑        𝑎𝑥 𝑖 + 𝑏
                                                    𝑖=1
Buatlah program digunakan untuk menuliskan ke layar hasil 𝑓(𝑥) berdasarkan masukan nilai 𝑎, 𝑏, dan 𝑥
(masing-masing bilangan riil) serta 𝑛 (bilangan bulat > 0) dari pengguna.
Petunjuk: Gunakan pengulangan.

## [UTS_KU1102_2021 h6]

UTS KU1102/Pengenalan Komputasi                    NIM: _________________________________
Tanggal: 26 Oktober 2019               Waktu: 120 menitNama: _________________________________
Halaman 6 dari 6                                   Kelas: _________________________________

Bagian D. Algoritma dan Pemrograman (20 menit)

Soal 8
Bilangan Euler yang dilambangkan dengan 𝑒 didefinisikan sebagai jumlah tak berhingga dari deret berikut
                                              1 1 1 1
                                     𝑒 = 1+     + + + + ⋯.
                                              1! 2! 3! 4!

Bilangan tersebut dapat digunakan untuk memperkirakan populasi penduduk atau organisme di suatu tempat.

Diketahui bahwa perkiraan populasi penduduk di suatu kota A pada tahun ke-𝑡 dimodelkan dengan persamaan
sbb.
                                             𝑃 (𝑡) = 𝑃0 𝑒 𝑘𝑡

dengan 𝑃0 = 1.2 (dalam juta) adalah jumlah penduduk pada tahun ke-0 dan 𝑘 = 0.015 adalah konstanta
pertumbuhan. Hampiran bilangan Euler 𝑒 didapatkan dengan menjumlahkan deret di atas sampai dengan suku
                                       1    1    1    1       1
ke-100, atau dengan kata lain: 𝑒 = 1 + 1! + 2! + 3! + 4! + ⋯ 100!

Tugas Anda:
a. Perhitungan hampiran bilangan Euler membutuhkan perhitungan faktorial bilangan. Buatlah
   flowchart/pseudocode (pilih salah satu sesuai yang ditekankan di kelas) untuk melakukan perhitungan
   faktorial terhadap n atau n!
   Nilai faktorial dihitung berdasarkan rumus sebagai berikut:
       1! = 1
       n! = 1*2*3*…*n
   Asumsikan:
       ● n >= 1 dan sudah diketahui nilainya (tidak perlu ditangani inputnya)
       ● Anda hanya perlu membuat proses perhitungan faktorial (tanpa penanganan input/output)
b. Tuliskan program yang menerima masukan banyaknya tahun, misalnya x (bilangan bulat > 0) dan
   menuliskan ke layar, perkiraan populasi penduduk kota A dari tahun ke-1 s.d. tahun ke-x (dalam juta)
   berdasarkan rumus di atas. Program ini harus mengandung perhitungan hampiran bilangan Euler dan juga
   perhitungan faktorial (yang sesuai dengan flowchart/pseudocode yang dituliskan pada butir a).

   Format keluaran:

   Perkiraan populasi penduduk kota A
   Tahun ke-1 : … juta
   Tahun ke-2 : … juta
   :
   :
   Tahun ke-x : … juta

   Catatan:
   Tidak boleh menggunakan array atau fungsi/prosedur

# SOURCE UTS_KU1102_2022 (older, 7 pages)


## [UTS_KU1102_2022 h1]

UTS KU1102/Pengenalan Komputasi                           NIM: _________________________________
Tanggal: 5 November 202 Waktu: 120 menit                 Nama: _________________________________
Halaman 1 dari 7                                         Kelas: _________________________________


                       UJIAN TENGAH SEMESTER
                    KU1102/PENGENALAN KOMPUTASI
                             SEM. 1 2022/2022
                                    STREAM PEMROGRAMAN

HARI, TANGGAL             : SABTU, 5 NOVEMBER 2022
PUKUL                     : 09.00 – 11.00 WIB
SIFAT UJIAN               : INDIVIDUAL DAN CLOSED BOOK
DURASI                    : 120 MENIT
FAK./SEK.                 : FITB, FMIPA, FTTM, FTMD, FTSL, FTI, SITH, STEI

BACALAH PETUNJUK INI SEBELUM UJIAN DIMULAI :

1. JANGAN BUKA HALAMAN BERIKUTNYA SEBELUM UJIAN DIMULAI!
2. Persiapan Ujian:
     a. Di atas meja hanya ada alat tulis dan identitas diri.
     b. Ujian ini bersifat individual dan closed book.
3. SETELAH UJIAN DIMULAI:
    a. Cek apakah Anda sudah mendapatkan 7 lembar soal yaitu dari halaman 1 s.d.7. Jika Anda tidak
        mendapatkan lembar yang benar, tukarkan kepada pengawas.
    b. Lembar soal adalah sekaligus lembar jawaban. Tidak disediakan lembar jawaban terpisah.
    c. Tuliskan NIM, Nama, dan Kelas, pada tiap lembar soal pada tempat di pojok kanan atas.
    d. Baca dulu semua soal berikut semua petunjuknya sebelum mengerjakan. Baca semua instruksi
        dengan sebaik-baiknya.
    e. Kerjakan dulu soal yang Anda anggap mudah.
    f. Tuliskan jawaban soal pada tempat-tempat yang disediakan sesuai instruksi soal. Jika Anda
        membutuhkan tambahan tempat untuk menjawab, gunakan halaman-halaman kosong yang ada pada
        lembar soal sesuai petunjuk dan jangan lupa menuliskan nomor soal dengan jelas. Jika Anda
        membutuhkan lembar corat-coret, gunakan juga halaman-halaman kosong yang tersisa pada pada
        lembar soal.
4. Tidak ada pertanyaan untuk semua soal. Buat asumsi sendiri jika ada soal yang menurut Anda
   tidak jelas dan tuliskan asumsi Anda bersama jawaban Anda.
5. Sebelum memulai ujian, tanda tanganilah pernyataan di bawah ini.

Dengan ini, saya menyatakan bahwa saya mengerjakan ujian ini secara jujur, tanpa bantuan yang tidak dibenarkan. Jika
nantinya terbukti bahwa pernyataan saya ini tidak benar, maka saya bersedia menerima semua konsekuensinya sesuai
aturan kuliah dan peraturan ITB.

Bandung, 5 November 2022




Nama:
NIM:

                       SELAMAT MENGERJAKAN. SEMOGA SUKSES. ☺

## [UTS_KU1102_2022 h2]

UTS KU1102/Pengenalan Komputasi                        NIM: _________________________________
Tanggal: 5 November 202 Waktu: 120 menit              Nama: _________________________________
Halaman 2 dari 7                                      Kelas: _________________________________

Bagian A. Computing System, Network, and Impact of Computing

Untuk soal 1 s.d. 3, tuliskan jawaban secara singkat, padat, tapi dengan jelas. Gunakan Bahasa
Indonesia yang baik dan benar. Jangan lupa memberikan nomor soal dengan jelas.

Soal 1
Kecanduan game adalah salah satu problem remaja masa kini. Sebutkan (minimal 3) cara atau kiat untuk
menghindari kecanduan game.


Soal 2
Dengan perkembangan teknologi dalam jaringan komputer, banyak aplikasi yang dikembangkan saat ini
berbasis web. Sebutkan dua aplikasi berbasis web yang bisa digunakan untuk mendukung kerja dalam
bidang keilmuan Fakultas/ Sekolah Anda, dan jelaskan dengan singkat bagaimana aplikasi tersebut
mendukung kerja.


Soal 3
Suatu hari saat akan praktikum Pengenalan Komputasi, Anda menemukan komputer yang akan digunakan
masih hidup dan pada browser, masih terlihat aplikasi media sosial terbuka. Anda mengenal pemilik akun
yang sedang aktif pada aplikasi tersebut dan dia kebetulan adalah orang yang sangat tidak Anda sukai. Orang
tersebut sering menggunakan akun media sosial ini untuk menyebarkan berita bohong (hoax). Anda berpikir,
jika Anda melakukan sesuatu pada akun tersebut, misalnya mengirimkan pesan yang tidak pantas,
menghapus file dan gambar, dan lain-lain., banyak orang yang akan merasa senang, bahkan berterima kasih
pada Anda ☺Lagipula salah dia sendiri tidak log-out dengan baik dari aplikasi tersebut di komputer umum.
Apa yang akan Anda lakukan?

Tuliskan jawaban soal Bagian A di bawah ini atau di halaman kosong di balik hlm. 2 secara singkat, padat, tapi
dengan argumen yang jelas. Gunakan Bahasa Indonesia yang baik dan benar. Jangan lupa memberikan nomor
soal dengan jelas.

## [UTS_KU1102_2022 h3]

UTS KU1102/Pengenalan Komputasi                       NIM: _________________________________
Tanggal: 5 November 202 Waktu: 120 menit             Nama: _________________________________
Halaman 3 dari 7                                     Kelas: _________________________________

Bagian B. Berpikir Komputasional & Algoritmik

Soal 4
Sebuah robot mini bergerak dari titik A menuju titik B pada lintasan yang telah disediakan. Berikut adalah
daftar perintah yang dapat dilakukan oleh robot.

 Perintah                      Arti
 Forward                       Maju 1 langkah
 TurnLeft d                    Berputar/rotasi sebesar d derajat ke kiri. Asumsi 0 <= d <= 360. Jika d = 0
                               atau 360, maka robot tidak berubah arah.
 TurnRight d                   Berputar/rotasi sebesar d derajat ke kanan. Asumsi 0 <= d <= 360. Jika d = 0
                               atau 360, maka robot tidak berubah arah.
 Repeat n (perintah)           Mengulang perintah sebanyak n kali. Asumsikan: n >= 0. Jika n = 0, maka
                               perintah tidak dilakukan sama sekali.




Beberapa informasi tambahan:
   ● Asumsi: Di awal, robot berada di posisi A dan robot menghadap ke kanan/timur (perhatikan
       gambar di atas).
   ● Lintasan yang dibentuk/dilewati oleh robot hanya boleh berada di dalam area denah saja.
   ● Jika robot harus melalui lintasan dengan penghalang/obstacle, maka robot harus melewatinya
       dengan membentuk lintasan parabolik.
   ● Robot menerima rangkaian perintah yang dituliskan dalam urutan yang masing-masing dipisahkan
       sebuah koma (kecuali untuk perintah terakhir, lihat contoh di bawah). Rangkaian perintah dapat
       dituliskan menyamping, atau dapat juga dituliskan ke bawah, dan dapat juga dikombinasikan dengan
       spasi dan indentasi untuk memperjelas penulisan.
   ● Parameter perintah pada perintah repeat terdiri atas perintah-perintah yang bisa dijalankan oleh
       robot dan bisa terdiri atas lebih dari 1 perintah.

Contoh:
 No. Perintah                                    Arti                           Ilustrasi gerakan
 1    forward, turn L 45, forward,               Pertama-tama robot maju 1
       turn R 45
                                                 langkah (ke kanan), lalu
                                                 berputar ke kiri 45 derajat,
       Alternatif penulisan:
       forward,                                  lalu maju 1 langkah, dan
       turn L 45,                                selanjutnya berputar ke
       forward,                                  kanan 45 derajat.
       turn R 45
                                                                                Catatan: setiap segmen garis
                                                                                diasumsikan sebesar 1 satuan
                                                                                gerakan

## [UTS_KU1102_2022 h4]

UTS KU1102/Pengenalan Komputasi                       NIM: _________________________________
Tanggal: 5 November 202 Waktu: 120 menit             Nama: _________________________________
Halaman 4 dari 7                                     Kelas: _________________________________

 2     repeat 180 (forward, turn L 1)           Robot mengulang
                                                sebanyak 180 kali: maju 1
       Alternatif penulisan:                    langkah dan berputar 1
       repeat 180 (forward,
                   turn L 1)
                                                derajat ke kiri.
                                                Ini akan membuat robot
                                                menggambar setengah
                                                lingkaran.




Tugas Anda:
   a. Gambarkan lintasan terpendek yang mungkin dilewati robot untuk begerak dari titik A ke B.
   b. Tuliskan urutan perintah untuk membuat lintasan robot pada soal (a)

Tuliskan jawaban Bagian B di bawah ini atau di halaman kosong di balik hlm. 3 dan 4 (jangan lupa
memberikan nomor soal dengan jelas).

## [UTS_KU1102_2022 h5]

UTS KU1102/Pengenalan Komputasi                          NIM: _________________________________
Tanggal: 5 November 202 Waktu: 120 menit                Nama: _________________________________
Halaman 5 dari 7                                        Kelas: _________________________________

Bagian C. Algoritma dan Pemrograman

Untuk soal Bagian C:
    ● Buatlah program dalam bahasa pemrograman sesuai dengan yang diajarkan di kelas.
    ● Bonus (hanya dinilai jika program dibuat, tidak perlu dibuat jika beresiko kehabisan waktu):
Buatlah flowchart/pseudocode untuk persoalan tersebut (pilih salah satu saja sesuai yang ditekankan di
kelas).

Soal 5
Spektrum optik adalah spektrum yang kontinyu sehingga tidak ada batas yang jelas antara satu warna dengan
warna yang lainnya. Meskipun demikian, manusia dapat memberikan batas kira-kira untuk warna-warna
spektrum yang berbeda-beda. Tabel berikut memberikan rentang panjang gelombang dari suatu warna yang
dilihat oleh mata manusia normal. Data disesuaikan untuk kepentingan soal.

 Warna     Panjang gelombang (dalam nm)
 Ungu      380 - 450
 Biru      451 - 495
 Hijau     496 - 570
 Kuning    571 - 590
 Jingga    591 - 620
 Merah     621 - 750

Buatlah sebuah program yang menerima masukan berupa panjang gelombang dalam nm (bertipe integer) dan
menuliskan ke layar warna sesuai dengan panjang gelombangnya sesuai dengan deskripsi di atas. Jika masukan di luar
rentang yang telah didefinisikan, dituliskan pesan kesalahan “Warna tidak terdefinisi”.

Contoh masukan dan keluaran:
 Masukan Panjang Gelombang              Keluaran
 495                               Biru
 250                               Warna tidak terdefinisi

Tuliskan jawaban Soal 5 di bawah ini atau di halaman kosong di balik hlm. 5 (jangan lupa memberikan nomor
soal dengan jelas).

## [UTS_KU1102_2022 h6]

UTS KU1102/Pengenalan Komputasi                       NIM: _________________________________
Tanggal: 5 November 202 Waktu: 120 menit             Nama: _________________________________
Halaman 6 dari 7                                     Kelas: _________________________________

Soal 6
Salah satu cara sederhana untuk memeriksa apakah sebuah bilangan bulat positif ( > 1 ) merupakan bilangan
prima atau bukan adalah dengan membagi bilangan tersebut dengan bilangan 1 hingga bilangan itu sendiri.
Jika bilangan tersebut habis dibagi dengan bilangan selain 1 dan bilangan itu sendiri, maka bilangan tersebut
bukan bilangan prima. Sebaliknya jika bilangan tersebut tidak habis dibagi dengan bilangan selain 1 dan
bilangan itu sendiri, maka termasuk bilangan prima.
Buatlah program yang menerima input sebuah bilangan bulat positif (misal n, dengan asumsi n > 1),
kemudian program memeriksa apakah bilang tersebut prima atau bukan dengan menggunakan pengulangan
pada program. Jika bilangan tersebut prima, maka ditampilkan ke layar bahwa bilangan tersebut prima; jika
bukan maka ditampilkan ke layar bahwa bilangan tersebut bukan prima. Format tampilan pada layar bebas.

Contoh masukan dan keluaran:
 Masukan                       Keluaran
 4          4 bukan bilangan prima
 2          2 adalah bilangan prima
 307        307 adalah bilangan prima

Tuliskan jawaban Soal 6 di bawah ini atau di halaman kosong di balik hlm. 6 (jangan lupa memberikan nomor
soal dengan jelas).

## [UTS_KU1102_2022 h7]

UTS KU1102/Pengenalan Komputasi                        NIM: _________________________________
Tanggal: 5 November 202 Waktu: 120 menit              Nama: _________________________________
Halaman 7 dari 7                                      Kelas: _________________________________

Soal 7
Terdapat dua buah array of integer D1 dan D2. Himpunan domain nilai pada tiap elemen D1 dan D2 adalah
{-1,1}. D1 adalah data hasil observasi, dan D2 adalah data hasil prediksi, dan keduanya memiliki jumlah
elemen yang sama. Buatlah program yang meminta masukan dari pengguna banyaknya elemen array berupa
bilangan bulat positif (misal N, asumsi N > 0), kemudian program akan meminta pengguna mengisi array D1
dan array D2 sejumlah N elemen, dengan setiap elemen pasti berisi -1 atau 1 (asumsi masukan pengguna
selalu benar). Indeks elemen array mulai dari 0 (nol). Program akan menghitung:
 a. TP: banyaknya elemen D1 indeks ke-i yang bernilai 1 dan banyaknya elemen D2 indeks ke-i yang juga
     bernilai 1 (D1[i] = D2[i] = 1)
 b. TN: banyaknya elemen D1 indeks ke-i yang bernilai -1 dan banyaknya elemen D2 indeks ke-i yang
     juga bernilai -1 (D1[i] = D2[i] = -1)
 c. FP: banyaknya elemen D1 indeks ke-i yang bernilai -1 dan banyaknya elemen D2 indeks ke-i yang
     bernilai 1 (D1[i] = -1 dan D2[i] = 1)
 d. FN: banyaknya elemen D1 indeks ke-i yang bernilai 1 dan banyaknya elemen D2 indeks ke-i yang
     bernilai -1 (D1[i] = 1 dan D2[i] = -1)
                                                     𝑇𝑇𝑇𝑇+𝑇𝑇𝑇𝑇
 e. Nilai akurasi dengan formula: 𝐴𝐴𝐴𝐴𝐴𝐴𝐴𝐴𝐴𝐴𝐴𝐴𝑖𝑖 =
                                               𝑇𝑇𝑇𝑇+𝑇𝑇𝑇𝑇+𝐹𝐹𝐹𝐹+𝐹𝐹𝐹𝐹

Program akan menampilkan nilai TP, TN, FP, FN, dan akurasi ke layar. Contoh masukan dan keluaran:
                      Masukan                                     Keluaran
 N = 10                                        TP = 3
 D1 = [1, -1, -1, 1, -1, 1, 1, -1, -1, 1]      TN = 3
 D2 = [1, -1, 1, -1, 1, -1, 1, -1, -1, 1]      FP = 2
                                               FN = 2
                                               Akurasi = 0.6


Catatan: elemen array yang dibandingkan antara D1 dan D2 selalu elemen dengan indeks yang sama.

Tuliskan jawaban Soal 7 di bawah ini atau di halaman kosong di balik hlm. 7 (jangan lupa memberikan nomor
soal dengan jelas).

# SOURCE UTS_KU1102_2023 (older, 6 pages)


## [UTS_KU1102_2023 h1]

                       UJIAN TENGAH SEMESTER
                    KU1102/PENGENALAN KOMPUTASI
                                      SEM. 1 2013/2024
                                 STREAM PEMROGRAMAN

HARI, TANGGAL​ : SABTU, 25 OKTOBER 2023
SIFAT UJIAN​   : INDIVIDUAL DAN CLOSED BOOK
DURASI​    ​   : 120 MENIT
BAHASA​    ​   : PYTHON
FAK./SEK.​ ​   : FITB, FMIPA, FTTM, FTMD, STEI

Bagian A. Computing System, Network, and Impact of Computing (25%)

Untuk soal 1 s.d. 3, tuliskan jawaban secara singkat, padat, tapi dengan jelas dan dengan argumen
yang jelas. Gunakan Bahasa Indonesia yang baik dan benar. Jangan lupa memberikan nomor soal
dengan jelas.

Soal 1
Jelaskan apa yang disebut green computing. Berikan 2 (dua) contoh perilaku kebiasaan yang mendukung
green computing yang dapat Anda lakukan sebagai mahasiswa.

Soal 2
Perkembangan teknologi jaringan komputer menyebabkan munculnya berbagai aplikasi baik yang
berbasis web (web application) maupun berbasis mobile (mobile application).
    a.​ Jelaskan perbedaan aplikasi web dan mobile dalam aspek cara pengaksesan aplikasi.
    b.​ Sebutkan masing-masing 1 (satu) contoh aplikasi web dan aplikasi mobile yang dapat digunakan
        untuk mendukung pelaksanaan kegiatan perkuliahan atau kegiatan mahasiswa dan jelaskan
        bagaimana bentuk dukungannya.

Soal 3
Saat ini ChatGPT sebagai implementasi Artificial Intelligence telah menjadi perangkat yang sering
digunakan, termasuk oleh mahasiswa, misalnya untuk memberikan jawaban atas pertanyaan untuk tugas
atau membuat tulisan tentang suatu topik tertentu. Jelaskan apakah batasan penggunaan ChatGPT yang
etis dalam konteks etika sebagai mahasiswa akademisi.

## [UTS_KU1102_2023 h2]

Bagian B. Berpikir Komputasional & Algoritmik (25%)

Soal 4
Robot Dorami mendapat tugas dari Doraemon menggambar bentuk-bentuk yang menarik di taman. Salah
satu bentuk yang harus dibuatnya adalah seperti yang di bawah ini. Doraemon akan memberikan sebuah
bilangan bulat N, dan Dorami harus membuat bentuk yang sesuai seperti contoh berikut. N > 0, jadi
Dorami bisa membuat bentuk-bentuk dengan pola yang sama yang lain, tidak hanya terbatas pada
contoh-contoh di bawah ini (pikirkan bagaimana pola untuk nilai N lain).




Tugas Anda: Jika diberikan sebuah N, tuliskan rangkaian perintah yang harus dilakukan Dorami untuk
membuat bentuk di atas.
Beberapa informasi tambahan yang harus diperhatikan:
   ●​ Asumsi: Di awal, Dorami menghadap ke kanan pada posisi a (seperti gambar di atas). Bentuk
       dibuat mulai posisi a ke posisi b.
   ●​ Rangkaian perintah dituliskan dalam urutan yang masing-masing dipisahkan sebuah koma
       (kecuali untuk perintah terakhir). Rangkaian perintah dapat dituliskan menyamping, dapat juga
       dituliskan ke bawah, dan dapat dikombinasikan dengan spasi dan indentasi untuk memperjelas
       penulisan. Lihat contoh di bawah.
   ●​ Parameter perintah pada perintah repeat terdiri atas perintah-perintah yang bisa dijalankan
       oleh robot dan bisa terdiri atas lebih dari 1 perintah.

## [UTS_KU1102_2023 h3]

Pembahasan Soal 4
 Repeat 3 (
       Repeat n-1 (Forward, TurnLeft 90, Forward, TurnRight 90),
       Forward,
       TurnRight 90
 )
 Repeat n-1 (Forward, TurnLeft 90, Forward, TurnRight 90),
 TurnLeft 90
Misal N = 2, maka langkahnya:
(FLFR FR) - (FLFR FR) - (FLFR FR) - (FLFR)
REPEAT 3 ( REPEAT N-1 (FLFR) FR)
REPEAT N-1 (FLFR) L
*ada banyak cara, ini hanya salah satunya

## [UTS_KU1102_2023 h4]

Bagian C. Algoritma dan Pemrograman (50% + bonus 10%)

Soal 5
Tuliskan program untuk menghitung dan mencetak tagihan listrik bulanan pelanggan sebuah
perusahaan listrik. Program menerima masukan kelompok ekonomi pelanggan (string) dan jumlah unit
penggunaan listrik (dalam KWH, bilangan bulat >= 0) yang ditagihkan untuk bulan tersebut dan
menampilkan total tagihan listrik yang harus dibayarkan pelanggan. Ada 3 (tiga) jenis kelompok ekonomi
pelanggan, yaitu rendah, sedang, tinggi. Tagihan listrik dihitung berdasarkan tabel biaya berikut:

    Jumlah unit penggunaan          Biaya per KWH (dalam Rp)               Subsidi (dalam %)
      listrik (dalam KWH)

            0 s.d. 250                           100                                0

           251 s.d. 500                          150                                5

          501 s.d. 1000                          200                                5

             > 1000                              250                               10

Subsidi adalah pengurangan yang diberikan terhadap total biaya tagihan yang diberikan sebesar x% dari
total tagihan tanpa subsidi. Kelompok ekonomi rendah mendapatkan subsidi pada setiap kelompok biaya
di atas, kelompok ekonomi sedang hanya mendapatkan subsidi untuk penggunaan listrik > 1000 KWH,
sedangkan kelompok ekonomi tinggi tidak mendapatkan subsidi apa pun.

Contoh input-output:
                              INPUT                                             OUTPUT

 Kelompok ekonomi                  Jumlah penggunaan (KWH)           Total Biaya Tagihan

 rendah                            250                               25000

 rendah                            900                               171000

 sedang                            900                               180000

 sedang                            2000                              450000

 tinggi                            2000                              500000

## [UTS_KU1102_2023 h5]

Soal 6
Sebuah perusahaan Fintech "Pilus Aja" (Pinjam Dulu Saja) menawarkan jasa peminjaman finansial
dengan "bunga ringan". Sebagai pemerhati pinjol (pinjaman online), Anda menemukan fakta bahwa
bunga yang ditawarkan bersifat compound interest atau bunga berbunga, per hari. Untuk melakukan
analisa pinjol itu, buatlah sebuah program yang digunakan untuk menghitung dan menampilkan berapa
besar uang pinjaman (dalam rupiah) yang harus dibayarkan pada saat jatuh tempo, dengan masukan
berupa pinjaman awal (dalam rupiah), bunga (dalam persen), dan lama pinjaman (dalam hari). Asumsikan
besaran uang, hari, dan bunga adalah bilangan riil positif.

Contoh: pinjaman awal = 1000 rupiah, bunga = 10% per hari, dan lama pinjaman = 10 hari, maka
Hari ke-1: bunga 10% dari 1000 rupiah = 100 rupiah, total pinjaman = 1100 rupiah
Hari ke-2: bunga 10% dari 1100 rupiah = 110 rupiah, total pinjaman = 1210 rupiah


Soal 7
Sebuah program digunakan untuk pengundian pemenang hadiah sebuah acara hiburan. Pertama-tama
disimpan dulu data kupon. Ditemukan ada sejumlah N kupon (N > 0) dan setiap kupon diberi nomor 0
s.d. N-1. Contoh N = 50 buah kupon, ada kupon nomor 0 s.d. 49. Dikarenakan kupon telah dibagikan ke
setiap orang, untuk setiap kupon disimpan nomor identitas pemiliknya. Contoh kupon no. 1 dimiliki orang
dengan nomor identitas 1234, kupon no. 10 dimiliki orang dengan nomor identitas 9827. Dipastikan
setiap kupon dimiliki oleh orang yang berbeda dan nomor identitas tidak terurut sesuai dengan urutan
nomor kupon.

Penarikan undian dilakukan dengan cara yang tidak biasa. Pembawa acara hiburan akan menyebutkan 2
(dua) buah angka, misalnya X dan Y, dan pemenang undian adalah semua orang dengan nomor identitas
dalam rentang X-Y s.d. X+Y. Selanjutnya ditampilkan pasangan nomor kupon dan nomor identitas setiap
orang yang memenangkan undian secara berderet ke bawah. Jika tidak ada pemenang undian, maka
diberikan pesan "Tidak ada pemenang undian".

Contoh data kupon: N = 5
 No Identitas       9827            1944             5052             2011             1234

 No Kupon           0               1                2                3                4


Contoh:
     X             Y                Pemenang Undian                            Keterangan

 2000         100          1 1944 3 2011                             X-Y = 1900; X+Y = 2100

 1000         500          4 1234                                    X-Y = 500; X+Y = 1500

 1000         50           Tidak ada pemenang undian                 X-Y = 950; X+Y = 1050

 1000         0            Tidak ada pemenang undian                 X-Y = 1000; X+Y = 1000

## [UTS_KU1102_2023 h6]

Buatlah program di atas. Program menerima masukan N kupon (asumsikan N > 0, tidak perlu diperiksa)
dan selanjutnya program menerima N buah data nomor identitas pemilik kupon (asumsikan
masing-masing adalah integer > 0). Program kemudian menerima masukan nilai X dan Y (asumsikan
masing-masing integer >= 0) dan selanjutnya menuliskan daftar kupon dan nomor identitas pemenang
undian seperti deskripsi di atas.

Petunjuk: daftar kupon dan nomor identitas pemilik disimpan sebagai array of integer dengan ukuran N.

Tuliskan jawaban Soal 7 di bawah ini atau di halaman kosong di balik hlm. 7.

# SOURCE UTS2024_PetunjukPenilaian_BagII (past, 12 pages)


## [UTS2024_PetunjukPenilaian_BagII h1]

UTS WI1102 Berpikir Komputasional – Sem 1 2024/2025                   NIM: …………………………………
Tgl. 16 November 2024                                                Nama: …………………………………
Hlm. 1 dari 12                                                       Kelas: …….……………………………


    PETUNJUK PENILAIAN UJIAN TENGAH SEMESTER
         WI1102 BERPIKIR KOMPUTASIONAL
                   SEM. 1 2023/2024
                     BAGIAN II
                 (FTSL, FTTM, STEI)
Penjelasan:

1. Untuk setiap soal disediakan: (1) Soal; (2) Alternatif jawaban; (3) Rubrik Penilaian; (4) Cara Penilaian.
2. Rubrik penilaian diberikan dalam indeks 0 s.d.4 dengan 0 adalah konversi dari nilai E dan 4 adalah
   konversi dari A.
3. Dalam bagian Cara Penilaian diberikan cara perhitungan nilai akhir untuk tiap soal (khususnya jika soal
   mengandung lebih dari 1 butir komponen soal).
4. Nilai Akhir UTS dihitung sbb:
   Nilai UTS = Nilai Soal 1 * 20% + Nilai Soal 2 * 20% + Nilai Soal 3 * 15% + Nilai Soal 4 * 15% +
                Nilai Soal 5 * 15% + Nilai Soal 6 * 15%


Soal 1 – Koleksi Buku

Sarah adalah seorang pustakawan yang sedang menyiapkan koleksi buku rekomendasi untuk sebuah acara
komunitas di perpustakaan. Koleksi tersebut akan terdiri dari empat genre utama: Fiksi, Seni, Sejarah, dan
Sains. Buku-buku pada setiap genre tersedia dalam tiga jenis kemasan: buku saku, hardcover, dan e-book.

Genre Fiksi mencakup novel-novel populer dengan berbagai tema seperti petualangan, romansa, dan misteri.
Genre Seni mencakup buku-buku tentang karya seni serta biografi para seniman. Buku dengan genre Sejarah
mencakup topik mulai dari sejarah kuno hingga modern, dan biasanya dilengkapi dengan ilustrasi. Buku-buku
Sains menjelaskan konsep-konsep ilmiah dan penemuan terbaru. Beberapa buku Sains populer hadir dalam
edisi khusus dengan ilustrasi warna.

Sarah memiliki beberapa syarat khusus untuk koleksi buku yang akan ditampilkannya. Koleksi tersebut harus
berjumlah tepat enam buku, dengan dua buku dari setiap jenis kemasan: dua buku saku, dua hardcover, dan
dua e-book. Untuk memastikan variasi, setiap genre hanya boleh muncul satu atau dua kali dalam koleksi.
Jika ada dua buku dari genre yang sama, jenis kemasannya harus berbeda. Misalnya, jika ada satu buku saku
fiksi, maka buku fiksi lainnya hanya boleh hardcover atau e-book. Sarah tidak mempermasalahkan penulis atau
tahun terbit, tetapi koleksi harus mencakup berbagai topik untuk menarik minat para pengunjung.

Tugas Anda:
a. Bantulah Sarah untuk menentukan koleksi buku rekomendasi yang memenuhi syarat yang diinginkannya.
   Cukup sebutkan daftar enam jenis buku dari koleksi yang Anda usulkan, misalnya “1) Fiksi – buku saku,
   2) Seni – hardcover, 3) ...”
b. Berikan penjelasan yang singkat dan jelas yang menunjukkan penalaran Anda dalam menentukan koleksi
   tersebut.

Petunjuk: Gunakan prinsip-prinsip berpikir komputasional untuk menyelesaikan masalah ini. Ingatlah untuk
menerapkan prinsip abstraksi dengan fokus pada informasi penting, dan dekomposisi untuk menyederhanakan
permasalahan.

Tuliskan jawaban soal 1 di bawah ini atau di halaman kosong di balik ini.

## [UTS2024_PetunjukPenilaian_BagII h2]

UTS WI1102 Berpikir Komputasional – Sem 1 2024/2025                   NIM: …………………………………
Tgl. 16 November 2024                                                Nama: …………………………………
Hlm. 2 dari 12                                                       Kelas: …….……………………………

Alternatif Jawaban:

Soal ini tidak memiliki jawaban tunggal. Ada banyak kemungkinan kombinasi benar yang memenuhi aturan
koleksi buku di atas. Prinsip utama dari soal ini adalah bagaimana mahasiswa mampu melakukan abstraksi,
yaitu menggunakan hanya informasi yang penting. Hal penting dari cerita kasus tsb adalah adanya genre buku,
kemasan buku, dan syarat-syarat yang harus dipenuhi dalam menyusun koleksi buku.

Dari informasi penting tersebut, mahasiswa harus mampu mendekomposisi dan merumuskan constraint yang
harus dipenuhi. Kemudian setelah merumuskan constraint tersebut, mahasiswa harus mampu menyusun satu
kemungkinan kombinasi hidangan yang memenuhi constraint tersebut.

Secara umum ada tiga constraint yang harus dipenuhi:
   1. Ada tepat enam buku dalam koleksi
   2. Ada dua genre dari setiap kemasan (kecil, sedang, besar)
   3. Setiap genre hanya boleh muncul satu atau dua kali dengan kemasan yang berbeda

Berikut ini beberapa contoh kombinasi koleksi buku yang benar, disajikan dalam bentuk tabel untuk
memudahkan pengecekan constraint.

(Tips: jika direpresentasikan dalam bentuk tabel, 3 contraint di atas dapat diterjemahkan sebagai berikut: di
tabel harus ada total tepat 6 checkmark di cell yang berbeda, tiap kolom harus ada tepat 2 checkmark, dan tiap
baris harus memiliki 1 atau 2 checkmark):

 Contoh kombinasi #1                                    Contoh kombinasi #2
                       Buku    Hardcover      E-                              Buku    Hardcover      E-
                       Saku                  Book                             Saku                  Book
  Fiksi                 ✔                     ✔          Fiksi                 ✔                     ✔
  Seni                  ✔                                Seni                             ✔
  Sejarah                          ✔           ✔         Sejarah                ✔
  Sains                            ✔                     Sains                            ✔          ✔

 Contoh kombinasi #3                                    Contoh kombinasi #4
                       Buku    Hardcover      E-                              Buku    Hardcover      E-
                       Saku                  Book                             Saku                  Book
  Fiksi                            ✔          ✔          Fiksi                 ✔                     ✔
  Seni                   ✔                               Seni                  ✔
  Sejarah                          ✔           ✔         Sejarah                          ✔          ✔
  Sains                  ✔                               Sains                            ✔

Rubrik Penilaian:

Soal 1.a.
 Nilai    Deskripsi                                                                                 Index
 4        Kombinasi yang diberikan tepat memenuhi semua constraint                                  A
 3        Kombinasi yang diberikan memenuhi hanya dua constraint, misalnya jumlahnya enam           B
          dan semua hidangan muncul maksimum 2 kali, tapi ukurannya untuk hidangan yang
          sama ada ukurannya yang sama
 2        Kombinasi yang diberikan memenuhi hanya salah satu constraint                             C
 1        Kombinasi yang diberikan tidak memenuhi constraint yang ditetapkan, tapi masih ada        D
          aspek yang benar.
 0        Tidak mengerjakan atau jawaban sama sekali salah.                                         E

## [UTS2024_PetunjukPenilaian_BagII h3]

UTS WI1102 Berpikir Komputasional – Sem 1 2024/2025                              NIM: …………………………………
Tgl. 16 November 2024                                                           Nama: …………………………………
Hlm. 3 dari 12                                                                  Kelas: …….……………………………

Soal 1.b.
 Nilai    Deskripsi                                                                                          Index
 4        Penjelasan mengandung aspek abstraksi (menentukan hal penting) dan dekomposisi                     A
          (merumuskan constraints) sesuai deskripsi jawaban di atas.
 3        Penjelasan mengandung aspek abstraksi dan dekomposisi sesuai deskripsi jawaban di                  B
          atas, tetapi ada satu buah kesalahan, misalnya: pada dekomposisi ada aturan tambahan
          yang ditetapkan (tidak sesuai dengan soal atau bukan hal penting) atau ada hal penting
          yang didefinisikan padahal tidak tepat atau tidak sesuai soal.
 2        Penjelasan yang benar hanya untuk salah satu aspek saja (dekomposisi/abstraksi).                   C
 1        Secara umum penjelasan untuk dekomposisi dan abstraksi tidak tepat, tetapi masih ada               D
          hal benar dalam statement jawaban.
 0        Tidak menjawab atau jawaban sama sekali salah.                                                     E

Cara Penilaian:
Nilai Soal 1 = Nilai Soal 1.a. * 40% + Nilai Soal 1.b * 60%


Soal 2 – Taman Botani

Sebuah taman botani sedang mengklasifikasikan koleksi tanamannya untuk memudahkan pengunjung dalam
mempelajari berbagai jenis tanaman. Saat ini, taman botani tersebut memiliki data tanaman sebagai berikut:
                                              Tahun              Tinggi
 No       Nama Tanaman        Asal Daerah     Ditemukan          Tanaman (cm)    Warna Daun   Kode Tanaman
      1   Anggrek Bulan       Jawa                        1859             45    Hijau
      2   Apel Ceri           Sumatera                    1870           1600    Hijau
      3   Kaktus Mini         Kalimantan                  1925             15    -
      4   Teratai Putih       Papua                       1900             25    Hijau Muda
      5   Mangga Bali         Bali                        1815           2400    Hijau
      6   Bambu Hitam         Sulawesi                    1905            300    Hijau Tua
      7   Pakis Hutan         Sumatera                    1800            120    Hijau
      8   Pohon Jati          Jawa                        1850           3500    Hijau Tua
      9   Anggrek Hitam       Kalimantan                  1880             55    Hijau Tua
  10      Pohon Cemara        Papua                       1920            800    Hijau
  11      Anggrek Merah       Bali                        1930             50    Hijau
  12      Apel Malang         Jawa                        1901           1650    Hijau
  13      Kaktus Berduri      Nusa Tenggara               1950             20    -
  14      Teratai Biru        Sumatera                    1915             30    Hijau Muda
  15      Melati Gambir       Jawa                        1830             35    Hijau
  16      Bambu Kuning        Kalimantan                  1885            250    Hijau
  17      Pakis Tanduk Rusa   Papua                       1805             90    Hijau
  18      Pohon Meranti       Sumatera                    1865           2600    Hijau Tua
  19      Mangga Kweni        Sulawesi                    1890           1700    Hijau Tua
  20      Pohon Beringin      Jawa                        1825           3800    Hijau

Taman botani ini berencana mengelompokkan tanaman-tanaman tersebut secara hierarkis berdasarkan kriteria
tertentu agar lebih mudah dikelola, dengan mempertimbangkan kemungkinan adanya tanaman baru di masa
yang akan datang. Pengelompokan tersebut juga akan mencakup pemberian kode unik untuk setiap tanaman,

## [UTS2024_PetunjukPenilaian_BagII h4]

UTS WI1102 Berpikir Komputasional – Sem 1 2024/2025            NIM: …………………………………
Tgl. 16 November 2024                                         Nama: …………………………………
Hlm. 4 dari 12                                                Kelas: …….……………………………
yang akan mencerminkan hierarki kelompok masing-masing tanaman. Bantulah taman botani ini membuat
pengelompokan hierarkis tanaman berdasarkan data yang sudah ada di atas, sembari tetap memperhatikan
kemungkinan tanaman baru yang akan ditambahkan di masa yang akan datang.

Tugas Anda:
a. Tuliskan sistem klasifikasi hierarkis yang Anda rancang.
b. Berikan penjelasan yang singkat dan jelas yang menjelaskan penalaran Anda dalam menentukan klasifikasi
   tersebut.
c. Berdasarkan klasifikasi tersebut, berikan kode unik untuk setiap tanaman (tuliskan langsung di kolom
   kode tanaman di atas).

Petunjuk: Anda dapat menggunakan pengetahuan umum untuk mengidentifikasi kesamaan karakter dari item-
item di atas dalam melakukan pengelompokan.

Tuliskan jawaban soal 2.a. dan 2.b. di bawah ini atau di halaman kosong di balik ini.

Alternatif Jawaban:
Soal ini tidak memiliki jawaban tunggal. Ada banyak kemungkinan sistem klasifikasi hirarkis yang bisa
digunakan. Hal penting yang harus dapat ditunjukkan mahasiswa adalah:
1. Identifikasi pola: bagaimana menemukan kesamaan pola untuk melakukan klasifikasi hirarkis. Misalnya,
    dibuat klasifikasi dua tingkat sebagai berikut:
         a. Tingkat 1: jenis tanaman. Mahasiswa bisa menemukan pola dari nama tanaman dan menentukan
              kodenya, misal: pohon berkayu (KAYU), tanaman bunga hias (HIAS), tanaman buah (BUAH),
              dan lainnya (LAIN)
         b. Tingkat 2: tahun ditemukan
2. Penalaran penentuan klasifikasi dan kode, misalnya
         a. Justifikasi penentuan klasifikasi, misal bagaimana penentuan klasifikasi dapat memudahkan
              pengunjung dan menunjukkan keunikan item yang diklasifikasikan
         b. Perlu diberikan no urut untuk membedakan tanaman yang, misalnya, memiliki jenis yang sama
              dan tahun ditemukan yang juga sama
         c. Cara penulisan kode sesuai dengan skema yang sudah ditetapkan, misalnya, tanaman no 1 di atas
              dapat diberi kode “HIAS-1859-001”
Penentuan pola klasifikasi juga dimungkinkan berdasarkan kesamaan atribut yang lain (misal asal daerah dan
klasifikasi tinggi), selama mahasiswa memberikan justifikasi yang masuk akal.

Rubrik Penilaian:
Soal 2.a.
 Nilai    Deskripsi                                                                               Index
 4        Sistem klasifikasi hierarkis benar (menunjukkan klasifikasi dan ada hierarki yang       A
          benar dan jelas terdefinisi)
 3        Sistem klasifikasi hierarkis secara umum benar, tetapi ada satu aspek yang salah.       B
 2        Memberikan klasifikasi berdasarkan satu kolom tertentu, tetapi tidak ada hierarki.      C
          Membuat klasifikasi yang hierarkis, tetapi berdasarkan kolom yang tidak tepat karena
          nilai-nilai kolomnya sangat berbeda satu sama lain sehingga kurang tepat untuk
          klasifikasi, misalnya tingkat 1 berdasarkan Judul Buku, tingkat 2 berdasarkan tahun
          terbit.
 1        Masih ada aspek yang tepat dari jawaban, tetapi secara umum jawaban tidak tepat.        D
 0        Tidak menjawab atau jawaban salah total.                                                E

## [UTS2024_PetunjukPenilaian_BagII h5]

UTS WI1102 Berpikir Komputasional – Sem 1 2024/2025                       NIM: …………………………………
Tgl. 16 November 2024                                                    Nama: …………………………………
Hlm. 5 dari 12                                                           Kelas: …….……………………………
Soal 2.b.
 Nilai     Deskripsi                                                                               Index
 4         Klasifikasi pada soal 2.a. minimum bernilai 3 dan penjelasan lengkap dan benar.         A
 3         Klasifikasi pada soal 2.a. minimum bernilai 3, penjelasan ada, tetapi ada kesalahan     B
           pada penjelasan.
 2         Klasifikasi pada soal 2.a. bernilai 1 atau 2, tetapi penjelasan tepat dan baik.         C
           Penjelasan tepat dan baik, tapi tidak sesuai dengan klasifikasi yang disebutkan di soal
           2.a atau soal 2.a. tidak menjawab.
 1         Penjelasan tidak lengkap, tetapi masih ada yang benar.                                  D
 0         Tidak menjawab atau jawaban sama sekali salah.                                          E

Soal 2.c.
 Nilai      Deskripsi                                                                              Index
 4          Kode yang diberikan seluruhnya benar, boleh ada kesalahan minor (karena kurang         A
            teliti) dan sesuai dengan pola yang ditetapkan pada soal 2.a dan 2.b
 3          Kode secara umum benar, tetapi sebagian kecil tidak mengikuti pola yang ditetapkan     B
            pada soal 2.a dan 2.b
 2          Kode yang diberikan mengikuti pola tertentu dengan benar, tapi tidak sesuai dengan     C
            pola klasifikasi hierarki pada soal 2.a dan 2.b
            Cara membuat kode, sebagian sesuai dengan pola pada soal 2.a dan 2.b tetapi sebagian
            lagi tidak.
 1          Masih ada bagian kode yang benar, tapi sebagian besar salah                            D
 0          Tidak menjawab atau jawaban salah total.                                               E

Cara Penilaian:
Nilai Soal 2 = Nilai Soal 2.a. * 30% + Nilai Soal 2.b * 40% + Nilai Soal 2.c * 30%



Soal 3 – Petualangan Robot Rody

Robot Rody ditugaskan untuk pergi ke rumah teman-teman Eddie, seperti Pororo. Untuk mencapai tempat-
tempat itu, Rody harus menempuh berbagai terrain (medan) dan bergerak mengikuti terrain ini. Untuk
melakukan hal tersebut, Rody dilengkapi dengan sejumlah perintah berikut.

 Perintah                 Arti
 up                       Bergerak ke atas 1 langkah
 down                     Bergerak ke bawah 1 langkah
 walk                     Berjalan ke depan 1 langkah
 repeat n                 Mengulang perintah sebanyak n kali. Asumsikan: n >= 0. Jika n = 0, maka
        perintah          perintah tidak dilakukan sama sekali.
                          Parameter perintah pada perintah repeat terdiri atas perintah-perintah yang
                          bisa dijalankan oleh robot dan bisa terdiri atas lebih dari 1 perintah.

                                        Misalnya untuk menempuh terrain di samping, untuk berpindah dari
                                        posisi kiri ke kanan, Rody harus melakukan urutan perintah berikut
       kiri                  kanan      (asumsi daerah berarsir tidak bisa dilewati Rody).
                                        walk
                                        down
                                        walk
                                        up
                                        walk

## [UTS2024_PetunjukPenilaian_BagII h6]

UTS WI1102 Berpikir Komputasional – Sem 1 2024/2025                NIM: …………………………………
Tgl. 16 November 2024                                             Nama: …………………………………
Hlm. 6 dari 12                                                    Kelas: …….……………………………
Bentuk terrain ditentukan oleh kedalaman terrain yang dinyatakan dengan bilangan n (n > 0). Berikut adalah
beberapa contoh terrain yang dibentuk oleh kedalamannya.




           n=1
                                   n=2


                                                                        n=4
Harap diingat, masih dimungkinkan nilai n yang lain.

Tugas Anda: Jika diberikan nilai n dengan n > 0 yang menyatakan kedalaman terrain yang harus ditempuh
Rody dalam perjalanannya, tuliskan perintah yang harus dilakukan Rody untuk melewati terrain dari sisi kiri
terrain ke sisi kanannya.

Rangkaian perintah dituliskan dalam urutan dituliskan ke bawah, dan dapat dikombinasikan dengan indentasi
untuk memperjelas penulisan. Lihat contoh di atas.

Tuliskan jawaban soal 3 di bawah ini atau di halaman kosong di balik ini.

Alternatif Jawaban:

repeat n
     walk
     down
walk
repeat n
     up
     walk

Rubrik Penilaian:
 Nilai    Deskripsi                                                                              Indeks
 4        Urutan langkah dapat digunakan untuk menggambarkan bentuk dengan tepat sesuai          A
          instruksi
 3,5      Ada kesalahan kecil yang menyebabkan solusi tidak sempurna                             AB
 3        Urutan langkah kurang, tapi secara umum masih akan menghasilkan bentuk yang            B
          diharapkan walaupun tidak sempurna,
          Ada perintah-perintah yang seharusnya bisa diulang (dengan perintah repeat) tapi
          dituliskan berjajar, namun hasil eksekusi benar.
 2        Hanya sebagian urutan langkah akan menghasilkan sebagian bentuk yang diharapkan.       C
          Termasuk jika tejadi sebuah kesalahan (walaupun hanya 1 langkah) yang menyebabkan
          bentuk tidak tergambar dengan benar, tetapi sebenarnya masih mengarah ke bentuk
          yang yang diharapkan.
 1        Hanya sebagian kecil dari urutan langkah menghasilkan bentuk yang benar.               D
 0        Salah total, atau tidak mengerjakan.                                                   E

Cara Penilaian: Nilai Soal 3 dinilai berdasarkan rubrik penilaian

## [UTS2024_PetunjukPenilaian_BagII h7]

UTS WI1102 Berpikir Komputasional – Sem 1 2024/2025                    NIM: …………………………………
Tgl. 16 November 2024                                                 Nama: …………………………………
Hlm. 7 dari 12                                                        Kelas: …….……………………………
Soal 4 – Data Suhu Udara

Agus adalah seorang pembawa acara prakiraan cuaca di sebuah stasiun televisi. Setiap hari, Agus memperoleh
data suhu harian (dalam celcius) di setiap kota dari sebuah stasiun cuaca. Dalam presentasi di acaranya, Agus
ingin menampilkan rerata suhu harian selama seminggu terakhir pada tiap kota. Agus juga ingin menyampaikan
kepada audiens nya, apakah tren suhu harian selama seminggu terakhir tersebut cenderung menaik atau
menurun.

Tren suhu harian dikatakan naik, jika dalam seminggu terakhir lebih banyak terjadi kenaikan suhu harian
ketimbang penurunan, dimana kenaikan dan penurunan ditentukan dengan cara membandingkan suhu harian
hari tertentu dengan hari sebelumnya. Jika jumlah kenaikan dan penurunan pada seminggu terakhir sama, maka
dikatakan tren suhu harian adalah stabil.

Berikut ini adalah contoh data suhu harian selama seminggu untuk kasus tren turun, naik, maupun stabil, beserta
rerata suhu hariannya.

                                   Contoh Tren            Contoh Tren NAIK            Contoh Tren STABIL
                                      TURUN
    Indeks                        Suhu    Naik/            Suhu      Naik/          Suhu          Naik/
     Array         Hari                   Turun                      Turun                        Turun
       0       H minus 6           25                       27                        28
       1       H minus 5           26       ­               27        stabil          28           stabil
       2       H minus 4           24       ¯               28          ­             29             ­
       3       H minus 3           23       ¯               31          ­             28             ¯
       4       H minus 2           22       ¯               29          ¯             26             ¯
       5       H minus 1           20       ¯               28          ¯             26           stabil
       6       Hari ini            23       ­               30          ­             28             ­
        Rerata suhu harian
                                  23.28                    28.57                    27.57
        seminggu terakhir:

Bantulah Agus menyelesaikan masalah ini. Tulislah sebuah program Python yang melakukan hal sebagai
berikut:
1. Menerima input dari pengguna berupa suhu harian selama 7 hari terakhir dan memasukkan ke dalam sebuah
    array of integer.
2. Menentukan tren suhu harian (naik, turun, atau stabil) dan menampilkan ke layar.
3. Menghitung rerata suhu harian dan menampilkan ke layar.

Contoh tampilan program:

Masukkan suhu hari-6: 25
Masukkan suhu hari-5: 26
Masukkan suhu hari-4: 24
Masukkan suhu hari-3: 23
Masukkan suhu hari-2: 22
Masukkan suhu hari-1: 20
Masukkan suhu hari-0: 23

Tren suhu harian TURUN
Rerata suhu harian 23.2857143

Tuliskan jawaban soal 4 di bawah ini atau di halaman kosong di balik ini.

## [UTS2024_PetunjukPenilaian_BagII h8]

UTS WI1102 Berpikir Komputasional – Sem 1 2024/2025                   NIM: …………………………………
Tgl. 16 November 2024                                                Nama: …………………………………
Hlm. 8 dari 12                                                       Kelas: …….……………………………

Alternatif Jawaban:
Berikut ini adalah contoh program yang benar untuk menentukan tren dan rerata suhu sebagaimana spesifikasi
di atas:

# Menerima input suhu harian selama 7 hari terakhir
suhu_harian = []
for i in range(7):
    suhu = int(input(f"Masukkan suhu hari-{6 - i}: "))
    suhu_harian.append(suhu)

# Menentukan tren suhu harian
naik = 0
turun = 0
for i in range(1, 7):
    if suhu_harian[i] > suhu_harian[i - 1]:
        naik += 1
    elif suhu_harian[i] < suhu_harian[i - 1]:
        turun += 1

if naik > turun:
    tren = "NAIK"
elif turun > naik:
    tren = "TURUN"
else:
    tren = "STABIL"

# Menghitung rerata suhu harian
rerata = sum(suhu_harian) / len(suhu_harian)

# Menampilkan hasil
print(f"Tren suhu harian {tren}")
print(f"Rerata suhu harian {rerata}")

Rubrik Penilaian:
 Nilai    Deskripsi                                                                             Indeks
 4        Program lengkap dan secara umum tepat, masih boleh ada kesalahan minor                A
 3,5      Program sebagian besar benar, tetapi ada 1 kesalahan minor pada program               AB
 3        Ada kesalahan pada sebagian kecil bagian program                                      B
 2        Secara umum hanya setengah bagian dari program yang tepat                             C
 1        Hanya ada sebagian kecil jawaban yang benar                                           D
 0        Tidak dikerjakan atau jawaban                                                         E

Cara Penilaian: Nilai Soal 4 dinilai berdasarkan rubrik penilaian.

## [UTS2024_PetunjukPenilaian_BagII h9]

UTS WI1102 Berpikir Komputasional – Sem 1 2024/2025                     NIM: …………………………………
Tgl. 16 November 2024                                                  Nama: …………………………………
Hlm. 9 dari 12                                                         Kelas: …….……………………………
Soal 5 – Membaca Flowchart
Alternatif solusi dituliskan dalam teks merah di dalam tempat jawaban.

                                                      Diketahui sebuah flowchart seperti di samping.

                                                      Tuliskan nilai akhir C1 dan C2 jika diberikan input N
                                                      dan pasangan nilai P1 dan P2 sebagai berikut.

                                                      Tuliskan jawaban pada kolom-kolom di tabel
                                                      berikut.

                                                        No.     N      P1     P2        C1           C2
                                                        a.      10      1      6        4            6
                                                                        2      5
                                                                        3      4
                                                                        4      3
                                                                        5      2
                                                                        6      1
                                                                        1      6
                                                                        2      5
                                                                        3      4
                                                                        4      3
                                                        b.       4      2      1         2            2
                                                                        2      1
                                                                        1      2
                                                                        1      2

                                                      c. Apa yang terjadi jika N diberikan nilai 0?
                                                         Jelaskan.

                                                             Tuliskan jawaban 5.c. di bawah ini.

                                                             Jika N = 0, maka setelah assignment i = 1, pada
                                                             pemeriksaan i > N didapatkan 1 > 0 à true
                                                             sehingga tidak akan masuk ke body loop dan
                                                             langsung output C1 = 0 dan C2 = 0




Rubrik Penilaian
Soal 5.a dan 5.b
 Nilai       Deskripsi                                        Indeks
 4           C1 dan C2 benar                                  A
 2           C1 atau C2 saja yang benar                       C
 0           Tidak ada jawaban benar                          E

## [UTS2024_PetunjukPenilaian_BagII h10]

UTS WI1102 Berpikir Komputasional – Sem 1 2024/2025                  NIM: …………………………………
Tgl. 16 November 2024                                               Nama: …………………………………
Hlm. 10 dari 12                                                     Kelas: …….……………………………

Soal 5.c.
 Nilai       Deskripsi                                                             Indeks
 4           Jawaban benar                                                         A
 3           Jawaban secara umum benar, tapi ada sebagian kecil aspek salah        B
 2           Hanya setengah jawaban benar                                          C
 1           Hanya sebagian kecil jawaban benar                                    D
 0           Tidak menjawab, atau tidak ada jawaban yang benar                     E

Cara Penilaian:
Nilai Soal 5 = Nilai Soal 5a * 30% + Nilai Soal 5.b * 30% + Nilai Soal 5.b * 40%


Soal 6 – Membaca Program Python

Sebuah biro konsultan pajak membuat sebuah program kalkulator pajak sederhana untuk membantu
pelanggannya menghitung pajak penghasilan (PPh) progresif. Program tersebut ditulis dengan bahasa Python
sebagai berikut:


 1    # input:
 2    # - pendapatan dalam setahun
 3    # - jumlah anak
 4    # - sumbangan wajib dalam setahun (misal zakat)
 5    pendapatan = ...       # ganti nilai input sesuai pertanyaan di bawah
 6    jumlah_anak = ...      # ganti nilai input sesuai pertanyaan di bawah
 7    sumbangan_wajib = ... # ganti nilai input sesuai pertanyaan di bawah
 8
 9    # pendapatan tidak kena pajak (ptkp) berdasarkan jumlah anak
 10   ptkp = [60, 70, 80, 90]
 11   if jumlah_anak > 3:
 12     jumlah_anak = 3
 13
 14   # tarif pajak progresif
 15   tarif = [0.1, 0.2, 0.3, 0.4]
 16   batas_bawah_tarif = [0, 60, 250, 1000]
 17
 18   # hitung pajak progresif berdasarkan pendapatan kena pajak (pkp)
 19
 20   pkp = pendapatan - sumbangan_wajib - ptkp[jumlah_anak]
 21   index_tarif = 0
 22   total_pajak = 0
 23   total_pkp_progresif = 0
 24
 25   while index_tarif < len(tarif) and pkp > batas_bawah_tarif[index_tarif]:
 26     if index_tarif == len(tarif)-1 or pkp < batas_bawah_tarif[index_tarif+1]:
 27       pkp_or_batas_atas = pkp
 28     else:
 29       pkp_or_batas_atas = batas_bawah_tarif[index_tarif+1]
 30
 31     pkp_progresif = pkp_or_batas_atas - batas_bawah_tarif[index_tarif]
 32     pajak_progresif = pkp_progresif * tarif[index_tarif]
 33     total_pajak = total_pajak + pajak_progresif
 34     index_tarif += 1
 35
 36   print("Pajak Penghasilan (PPh) = Rp. " + str(total_pajak) + " juta")



Sebutkan luaran program jika input program adalah sebagai berikut. Berikan penjelasan singkat mengapa
luarannya seperti yang Anda sebutkan.

## [UTS2024_PetunjukPenilaian_BagII h11]

UTS WI1102 Berpikir Komputasional – Sem 1 2024/2025                               NIM: …………………………………
Tgl. 16 November 2024                                                            Nama: …………………………………
Hlm. 11 dari 12                                                                  Kelas: …….……………………………
a. pendapatan = 80,   jumlah_anak = 3, sumbangan_wajib = 2
b. pendapatan = 300, jumlah_anak = 0, sumbangan_wajib = 10
c. pendapatan = 1100, jumlah_anak = 3, sumbangan_wajib = 30

Catatan:
- Untuk memudahkan perhitungan, semua nilai uang adalah dalam jutaan rupiah.
- Program sudah dipastikan berjalan dengan benar tanpa error.

Tuliskan jawaban soal 6 di bawah ini atau di halaman kosong di balik ini.

Jawaban:

Luaran program untuk setiap input program di atas adalah sebagai berikut:
  a.    Pajak Penghasilan (PPh) = Rp. 0 juta
  b.    Pajak Penghasilan (PPh) = Rp. 42.0 juta
  c.    Pajak Penghasilan (PPh) = Rp. 266.0 juta

Berikut ini adalah pejelasannya:

Pajak penghasilan PPh dihitung secara progresif dengan tarif yang berbeda-beda pada setiap rentang
penghasilan tertentu (biasa disebut sebagai bracket). Berdadarkan program di atas, berikut adalah tarif pajak
pada setiap bracket:

 Bracket                                    Tarif
 0jt <= penghasilan < 60jt                  10%
 60jt <= penghasilan < 250jt                20%
 250jt <= penghasilan < 1M                  30%
 1M <= penghasilan                          40%

Sebelum dihitung tarif pajaknya, perlu dihitung terlebih dahulu penghasilan kena pajak (pkp), yaitu
penghasilan – sumbangan wajib – penghasilan tidak kena pajak (ptkp, tergantung jumlah anak). Sehingga
untuk setiap 3 input di atas, pkp-nya adalah sebagai berikut:
       a. pendapatan = 80,   jumlah_anak = 3, sumbangan_wajib = 2
             pkp = 80 - 2 – 80 = -2 (dianggap 0, belum wajib pajak)
       b. pendapatan = 300, jumlah_anak = 0, sumbangan_wajib = 10
             pkp = 300 – 10 – 50 = 240
       c. pendapatan = 1100, jumlah_anak = 3, sumbangan_wajib = 30
             pkp = 1100 – 30 – 80 = 990

Dari pkp tersebut, dapat dihitung pajak sesuai dengan bracket-nya sebagai berikut:

 Bracket                        Tarif         a. PKP -2                b. PKP 240                   c. PKP 990
                                        pkp        pajak        pkp          pajak          pkp          pajak
                                        progresif progresif     progresif    progresif      progresif    progresif
 0jt <= penghasilan < 60jt       10%           0            0             60            6             60             6
 60jt <= penghasilan < 250jt     20%                                   180             36          190              38
 250jt <= penghasilan < 1M       30%                                                               740             222
 1M <= penghasilan               40%
                               TOTAL          0            0          240             42         1090            266

Catatan:
Meskipun mahasiswa tidak mengetahui logika pajak progresif di atas, mahasiswa dapat mengetahuinya
dengan memahami kode program yang diberikan.

## [UTS2024_PetunjukPenilaian_BagII h12]

UTS WI1102 Berpikir Komputasional – Sem 1 2024/2025                  NIM: …………………………………
Tgl. 16 November 2024                                               Nama: …………………………………
Hlm. 12 dari 12                                                     Kelas: …….……………………………
Rubrik Penilaian untuk soal 6.a, 6.b, dan 6.c
 Nilai      Deskripsi                                                                         Indeks
 4          Output program benar dan penjelasan tepat                                         A
 3          Output program benar, tetapi ada kesalahan pada bagian penjelasan                 B
 2          Output program benar, tapi tidak menjelaskan jawaban atau penjelasan salah total. C
 1          Masih ada bagian jawaban yang tepat, tapi sebagian besar salah.                   D
 0          Tidak dikerjakan atau jawaban salah total.                                        E

Cara Penilaian:
Nilai Soal 6 = (Nilai Soal 6.a + Nilai Soal 6.b + Nilai Soal 6.c) / 3

# SOURCE UTS2025_attempt_scan (past, 9 pages)


## [UTS2025_attempt_scan h1]



> (little or no text layer: read the page image app/public/pages/UTS2025_attempt_scan/001.jpg)

## [UTS2025_attempt_scan h2]



> (little or no text layer: read the page image app/public/pages/UTS2025_attempt_scan/002.jpg)

## [UTS2025_attempt_scan h3]



> (little or no text layer: read the page image app/public/pages/UTS2025_attempt_scan/003.jpg)

## [UTS2025_attempt_scan h4]



> (little or no text layer: read the page image app/public/pages/UTS2025_attempt_scan/004.jpg)

## [UTS2025_attempt_scan h5]



> (little or no text layer: read the page image app/public/pages/UTS2025_attempt_scan/005.jpg)

## [UTS2025_attempt_scan h6]



> (little or no text layer: read the page image app/public/pages/UTS2025_attempt_scan/006.jpg)

## [UTS2025_attempt_scan h7]



> (little or no text layer: read the page image app/public/pages/UTS2025_attempt_scan/007.jpg)

## [UTS2025_attempt_scan h8]



> (little or no text layer: read the page image app/public/pages/UTS2025_attempt_scan/008.jpg)

## [UTS2025_attempt_scan h9]



> (little or no text layer: read the page image app/public/pages/UTS2025_attempt_scan/009.jpg)

# SOURCE UTS_CT_TahunLalu (past, 28 pages)


## [UTS_CT_TahunLalu h1]

ANN - Posisi Bunga
Level :
STATUS APPROVAL :
REVIEWER :

Ibu Bebras sedang senang-senangnya menanam bunga. Di halaman ibu punya 9
petak lahan yang akan ditanaminya bunga Matahari, Mawar, dan Lili putih.
Ibu ingin nantinya tidak bosan memandang baris-baris dan kolom-kolom bunga
itu, untuk itulah ibu membuat aturan sebagai berikut: Tidak boleh ada bunga
yang sama jenisnya dalam satu baris, dan tidak boleh ada bunga yang sama
jenisnya dalam satu kolom. Bebras ingin menolong Ibu menanam bunga. Dari
keempat kemungkinan penanaman tersebut, bantulah Bebras menentukan mana yang
paling sesuai dengan aturan Ibu?



A                    B                 C                  D




Jawaban :

Jawaban yang benar adalah C


Pembahasan (ID)

Pada baris pertama, Bebras dapat memasukkan satu jenis bunga untuk satu sel.
Pada baris selanjutnya, setiap kali ingin memasukkan jenis bunga, lihat
jenis bunga pada satu kolom yang sama, apakah sudah terdapat jenis tersebut,
jika belum boleh dimasukkan, jika tidak ganti dengan jenis yang lain. Jika
pada saat mengisikan sel selanjutnya terjadi pelanggaran aturan, maka posisi
bunga yang sebelumnya harus ditukar dengan yang sekarang.




Aspek Berpikir Komputasional

## [UTS_CT_TahunLalu h2]

RTR - #1
Level :
STATUS APPROVAL :
REVIEWER :



Siswa SD bernama Adi, Boni, Ceria, Dian, dan Eko ditunjuk menjadi tim lomba
baris-berbaris di sekolah. Masing-masing siswa memiliki ketinggian yang
berbeda. Mereka akan berbaris secara berurutan menghadap arah yang sama.
Setiap siswa menemukan siswa lain yang lebih tinggi dari dirinya akan
menghitung berapa banyak siswa yang lebih tinggi di depannya dan di
belakangnya. Hasil perhitungan dari setiap siswa adalah sebagai berikut:

            Nama Siswa    Jumlah siswa yang lebih
                                  tinggi
                           Di depan         Di
                                         Belakang
            Adi          1             2
            Boni         3             1
            Ceria        1             0
            Dian         0             0
            Eko          2             0
Bagaimana urutan mereka berbaris dari depan ke belakang?

   A. Dian, Ceria, Adi, Boni, Eko
   B. Dian, Adi, Ceria, Boni, Eko
   C. Adi, Ceria, Dian, Eko, Boni
   D. Dian, Adi, Eko, Boni, Ceria


Jawaban :

Jawaban yang benar adalah B


Pembahasan (ID)

Karena setiap siswa kecuali Dian menghitung setidaknya satu siswa yang lebih
tinggi di depannya, untuk itu Dian menempati posisi pertama. Karena Dian juga
tidak menghitung siswa yang lebih tinggi di belakang, maka Dian adalah siswa
paling tinggi. Boni menghitung setidaknya ada tiga siswa yang lebih tinggi di
depannya dan ada satu siswa yang lebih tinggi di belakangnya dan hanya ada
lima siswa keseluruhan, maka dia berada di posisi ke empat. Hal ini juga
berarti Boni adalah siswa terpendek di antara siswa keseluruhan.

## [UTS_CT_TahunLalu h3]

Dian (5)                                       Boni (1)


Karena Adi menghitung dua siswa yang lebih tinggi di belakangnya (yaitu
Ceria dan Eko) dan Boni lebih pendek darinya, maka Adi berada di posisi
kedua.

Dian (5)          Adi (2)                      Boni (1)


Terakhir, karena Eko tidak ada siswa yang lebih tinggi di belakangnya, maka
dia berada di belakang Ceria dan berada di posisi terakhir.

Dian (5)          Adi (2)      Ceria (4)       Boni (1)       Eko (3)

Aspek Berpikir Komputasional




RTR - #2
Level :
STATUS APPROVAL :
REVIEWER :

Tantangan (ID)

Kumi memproduksi minyak atsiri dan menghasilkan sebanyak 37 liter. Ia ingin
mencoba menjualnya ke pasaran dengan kemasan botol. Ia memiliki beberapa botol
kosong dengan berbagai ukuran, namun ia ingin menggunakan botol sesedikit
mungkin untuk mengemas minyak atsiri yang akan dijualnya. Dia memiliki variasi
botol dengan ukuran 1 liter, 2 liter, 4 liter, 8 liter, 16 liter, dan 32
liter.

Berapa jumlah paling sedikit botol yang digunakan kumi untuk mengemas minyak
atsiri?
   A. 1
   B. 2
   C. 3
   D. 4


Jawaban :

3 Botol


Pembahasan (ID)

## [UTS_CT_TahunLalu h4]

Kumi sebaiknya menggunakan botol 32 liter, botol 4 liter, dan botol 1 liter.
Perhatikan bahwa ini ada botol dan 32 + 4 + 1 = 37. (3 Botol)

Tidak ada botol 37 liter jadi Kumi harus menggunakan lebih dari satu botol.
Kumi juga tidak dapat menemukan dua angka yang sama di antara ukuran 1, 2, 4,
8, 16, dan 32 yang berjumlah 37, sehingga dibutuhkan lebih dari dua ukuran
botol. Hal ini berarti bahwa tiga botol adalah yang jumlah botol paling sedikit
yang bisa digunakan Kumi.


Aspek Berpikir Komputasional




ANN - Tebak Posisi
Level :
STATUS APPROVAL :
REVIEWER :

Tantangangan (ID) :

Bebras sedang senang-senangnya main tebak-tebakan dengan adiknya, si Bobros.
Kali ini Bobros meminta Bebras menebak angka yang disimpan olehnya. Angka
tersebut adalah salah satu angka yang berada di antara 1 sampai 11 (1 dan 11
juga termasuk). Bebras boleh menebak, jika tebakannya salah, Bebras boleh
bertanya apakah angka yang dimaksud lebih besar atau lebih kecil dari angka
yang ditebaknya. Jika angka yang disimpan Bobros adalah angka 9, berapa kali
minimal Bebras harus menebak sebelum tebakannya benar?




Temukan berapa kali minimal Bebras menebak sebelum tebakannya benar?

English :


Jawaban :

## [UTS_CT_TahunLalu h5]

Jawaban yang benar adalah 1 kali.


Pembahasan (ID)

Bebras dapat menebak angka yang berada di tengah pada setiap kali menebak
untuk membagi angka-angka menjadi dua urutan. Tebakan pertama, apakah angka
tersebut adalah 6 ? karena 6 adalah angka yang berada di tengah urutan. Jika
salah, maka Bebras dapat mengajukan pertanyaan apakah angkanya lebih kecil
atau lebih besar dari 6?. Bobros akan menjawab angkanya lebih besar dari 6.
Dengan demikian Bebras tidak perlu menebak angka di bawah 6 karena sudah
pasti salah. Selanjutnya Bebras kembali membagi dua urutan yang lebih besar
dari 6 dan menebak angka 9, karena 9 berada di tengah. Kali ini tebakan
Bebras benar. Jadi dengan cara ini Bebras hanya membutuhkan satu kali salah
menebak sebelum bisa menebak angka 9.


Aspek Berpikir Komputasional




HRW - #1
Level :
STATUS APPROVAL :
REVIEWER :

Tantangangan (ID) :

Tatang adalah seorang anak yang gemar bermain permainan tradisional. Kali ini
ia mencoba bermain lompat kotak. Dalam permainan tersebut terdapat 8 kotak
yang tersusun secara berderet. Pada setiap kotak tertulis perintah yang
menyatakan arah dan jumlah perpindahan. Terdapat 3 arah perpindahan, yaitu:
kiri, kanan, atau tidak berpindah. Arah ke kiri disimbolkan dengan L, ke kanan
disimbolkan dengan R, dan tidak berpindah disimbolkan dengan 0. Jumlah
perpindahan dituliskan berdampingan dengan arah perpindahan.

Contoh:

   Berpindah ke kiri:
                      2L



   Berpindah ke kanan:

     3R

## [UTS_CT_TahunLalu h6]

    Tidak berpindah:
      0


Tatang dinyatakan menang jika berhasil mengunjungi seluruh kotak dengan
mengikuti aturan-aturan yang tertulis pada kotak.


Jika susunan kotak untuk sesi permainan Tatang adalah sebagai berikut:




    Maka agar Tatang menang, ia harus memulai dari kotak nomor:
      a. 1
      b. 6
      c. 5
      d. 3
      e. 8

English :


Jawaban :

D


Pembahasan (ID)


Aspek Berpikir Komputasional




HRW - #2
Level :
STATUS APPROVAL :
REVIEWER :

Tantangangan (ID) :

## [UTS_CT_TahunLalu h7]

PT. Segar Maju Jaya (SMJ) merupakan perusahaan penyedia air mineral alami bagi
depot-depot isi ulang air mineral di daerah Jabodetabek. Perusahaan tersebut
memiliki banyak pelanggan, sehingga untuk mengakomodasi permintaan yang sangat
banyak, mereka menyediakan cukup banyak armada truk tangki pengangkut air.
Truk-truk tersebut digunakan untuk mengangkut air dengan volume tertentu ke
pelanggan. Unit-unit truk yang dimiliki PT. SMJ memiliki jenis dan jumlah unit
yang juga beragam. Jenis-jenis unit truk tersebut adalah: Truk A: kapasitas
maksimum 1.000 L sebanyak 14 truk, Truk B: kapasitas maksimum 2.000 L sebanyak
12 truk, Truk C: kapasitas maksimum 4.000 L sebanyak 10 truk, Truk D: kapasitas
maksimum 8.000 L sebanyak 8 truk, Truk D: kapasitas maksimum 16.000 L sebanyak
6 truk, dan Truk E: kapasitas maksimum 32.000 L sebanyak 4 truk. Truk-truk
tersebut memiliki spesifikasi teknis yaitu ketika memuat air, seluruh volume
dalam tangki air truk tersebut harus terisi penuh. Ketika mengantarkan air,
setiap truk tersebut dikemudikan oleh seorang pengemudi yang diupah setiap
kali mengantarkan air ke pelanggan. PT. SMJ adalah perusahaan yang sangat
memperhatikan efisiensi. Mereka tidak ingin biaya untuk mengupah pengemudi
truk membengkak, sehingga sebisa mungkin mereka menggunakan jasa pengemudi
sesedikit mungkin ketika harus mengantar pesanan air.

Jika terdapat pelanggan di daerah Bogor yang memesan air sebanyak 53.000 L,
tuliskan jenis truk apa saja yang harus diberangkatkan berikut jumlah armada
truk tersebut!

      a. 4 unit E
      b. 1 unit A, 1 unit C, 1 unit E, 1 unit F
      c. 2 unit F
      d. 3 unit A, 1 unit C, 3 unit E
      e. 1 unit D, 1 unit E, 1 unit F


English :


Jawaban :

B


Pembahasan (ID)


Aspek Berpikir Komputasional

## [UTS_CT_TahunLalu h8]

MUS - Perwakilan Regu
Level :
STATUS APPROVAL :
REVIEWER :

Tantangangan (ID) :

Pak Andi adalah guru pembina pramuka di sekolahnya. Pada saat acara kemah
bersama, pak Andi ingin mengumpulkan siswa-siswanya untuk diberikan penjelasan
mengenai kegiatan lintas hutan yang dilaksanakan bersama. Setiap siswa
nantinya akan dibagi menjadi beberapa regu. Agar nanti tidak terjadi hal-hal
yang tidak diinginkan pada saat kegiatan lintas hutan, pak Andi ingin agar
minimal ada 1 orang siswa dari setiap regu yang bisa hadir mendengarkan
penjelasannya. Namun, pak Andi juga tidak ingin acara penjelasan tersebut
dihadiri terlalu banyak siswa, karena ditakutkan para siswa menjadi tidak
fokus mendengarkan penjelasan.


Sayangnya, pak Andi tidak bisa menemukan daftar anggota setiap regu, dan hanya
bisa melihat jumlah anggota masing-masing regu saja. Namun, pak Andi berpikir
bahwa, meskipun ia tidak tahu daftar anggota tiap regu, ia tetap dapat
memastikan bahwa setiap regu tetap terwakili, dengan cara memastikan jumlah
siswa yang diundang menghadiri penjelasan minimal sejumlah nilai tertentu.
Misalnya, jika hanya ada dua regu, dengan masing-masing jumlah siswanya adalah
2 dan 3, maka dengan mengundang 4 siswa, pak Andi yakin bahwa pasti setiap
regu akan terwakili oleh minimal 1 siswa.


Ternyata ada 6 regu yang mengikuti kemah, dengan jumlah anggota masing-masing
adalah: 5, 7, 6, 7, 8, dan 10 orang. Tentukan berapa jumlah minimal siswa yang
harus diundang pak Andi, untuk memastikan bahwa setiap regu pasti ada minimal
1 orang perwakilan.


English :


Jawaban :

39 Siswa


Pembahasan (ID)

Kasus terburuk adalah jika regu-regu dengan jumlah lebih besar semuanya
terpilih menjadi yang diundang. Dalam kasus tersebut, tinggal memastikan bahwa

## [UTS_CT_TahunLalu h9]

regu dengan jumlah anggota terkecil diwakili oleh 1 orang. Oleh karena itu
jawabannya adalah: 1 + 7 + 6 + 7 + 8 + 10 = 39 siswa.


Aspek Berpikir Komputasional




MUS - Menebak Angka
Level :
STATUS APPROVAL :
REVIEWER :

Tantangangan (ID) :


Andi dan Binti sedang bermain tebak-tebakan angka. Andi memilih sebuah angka
(bilangan bulat) antara 1 dan 100 (inklusif), dan Binti harus menebak angka
apa yang dipilih oleh Andi. Ketika Binti menebak dengan sebuah angka, Andi
harus memberi tahu Binti apakah tebakan Binti tersebut benar, atau lebih
kecil dari angka yang dipilihnya, atau lebih besar. Apabila tebakan Binti
belum benar, maka Binti diperbolehkan menebak lagi, sampai akhirnya ia mampu
menebak dengan benar angka yang dipilih Andi.

Apabila Binti menggunakan strategi yang tepat, berapa kali jumlah maksimal
tebakan yang benar-benar ia perlukan?


English :


Jawaban :

7 Kali tebakkan

Pembahasan (ID)

Jika Binti menggunakan strategi “binary search” maka ia memerlukan maksimal
                               6        7
hanya 7 kali tebakan, karena 2 < 100 < 2 .


Aspek Berpikir Komputasional

## [UTS_CT_TahunLalu h10]

LSH- #1
Level :
STATUS APPROVAL :
REVIEWER :

Tantangangan (ID) :


Misyka sedang berkunjung ke kota Djogja dan ia menginap di The Phoenix
Hotel. Esok hari, Misyka harus segera kembali ke kota asalnya. Sementara
itu, ada empat tempat wisata (B, C, D, E) yang ingin ia kunjungi malam ini.
Di bawah ini adalah peta hotel dan ke-empat tempat wisata yang ingin ia
kunjungi. Angka yang tertera pada peta menunjukkan waktu tempuh dalam satuan
menit. Bantulah Misyka untuk menentukan urutan perjalan dari hotel menuju
ke-empat tempat wisata dan kembali lagi ke hotel, sehingga waktu tempuh
perjalanan tidak lebih dari 76 menit




                                       B
                     16

                                           4
                          22
 A                                             E
            14
                                                                         C
                                                          23
                      D           7
                                               19


Pilihan Jawaban :
   ● A-D-E-D-C-A
   ● A-D-E-B-C-D-A
   ● A-D-C-B-A
   ● A-D-E-C-B-A

English :


Jawaban :

B.   A,D,E,B,C,D,A


Pembahasan (ID)

## [UTS_CT_TahunLalu h11]

Aspek Berpikir Komputasional




LSH - #2
Level :
STATUS APPROVAL :
REVIEWER :

Tantangangan (ID) :


Seorang arkeolog menemukan beberapa benda berharga peninggalan sejarah yang
tertimbun di dalam goa. Benda-benda tersebut adalah 3 patung prajurit, 2
tablet, 1 topeng dan 1 artefak. Ia ingin membawa benda-benda tersebut untuk
dilestarikan. Namun, ia harus memilih beberapa saja karena kapasitas tas
yang ia bawa adalah 10 kg. Sebelum memilih, ia memperkirakan bobot dan harga
benda-benda tersebut, seperti tertera pada gambar di bawah ini. Bantulah
sang arkeolog untuk memilih benda dengan nilai setinggi mungkin dan bobot
tidak lebih dari 10 kg.




                                          6kg     6kg




Pilihan Jawaban:

   ●   Topeng, Artefak
   ●   3 Patung Prajurit, Artefak
   ●   Topeng, 1 Patung Prajurit
   ●   Artefak, 1 Tablet


English :

## [UTS_CT_TahunLalu h12]

Jawaban :

Jawaban yang benar adalah 17 menit


Pembahasan (ID)

Pada permasalahan ini ditentukan waktu yang paling efektif dan penyeberangan
pertama adalah A dan B karena waktu yang dibutuhkan paling sedikit untuk
menyebrang. Dikarenakan A dan B harus berjalan bersama menggunakan lampu
senter maka A dan B membutuhkan waktu 2 Menit. A kembali membawa senter ke
sisi awal jembatan dengan waktu 1 menit, sedangkan B tinggal (Atau
sebaliknya A Tinggal dan B kembali). Setelah A sampai, berikutnya A
menyerahkan lampu senter kepada C dan D untuk menyebrang. C dan D
membutuhkan Waktu 10 menit. Setelah sampai pada sisi ujung jembatan, C dan D
Tinggal dan B akan kembali mengantarkan lampu senter dengan waktu 2 menit,
selanjutnya A dan B akan menyebrang bersama dengan waktu 2 menit.

Untuk rinciannya adalah sebagai berikut:

A+B menyebrang waktu yang dibutuhkan 2 Menit

A kembali membutuhkan waktu 1 Menit

C+D menyebrang dam membutuhkan waktu 10 menit

B Kembali membutuhkan waktu 2 menit

A+B menyebrang membutuhkan waktu 2 menit

2 + 1 + 10 + 2 + 2 = 17 Menit

Atau:

A+B menyebrang waktu yang dibutuhkan 2 Menit

B kembali membutuhkan waktu 2 Menit

C+D menyebrang dam membutuhkan waktu 10 menit

A Kembali membutuhkan waktu 1 menit

A+B menyebrang membutuhkan waktu 2 menit

2 + 2 + 10 + 1 + 2 = 17 Menit

Sehingga total waktu yang efisien adalah: 17 Menit



Aspek Berpikir Komputasional

## [UTS_CT_TahunLalu h13]

MAA - Timbangan Rusak
Level : Easy
STATUS APPROVAL :
REVIEWER :

Tantangan (ID)

Dona adalah seorang cat lovers, mempunyai 3 ekor kucing dan memberi nama
kucingnya yaitu Nero, Champagne , dan Magnum. Dona menimbang berat kucingnya
dan mencoba timbangan yang sudah lama tidak terpakai.Pada saat dona menimbang
Nero dan Champagne beratnya adalah 18 kg.




Dona menimbang berat Champagne dan Magnum adalah 26 kg.




Kemudian terakhir menimbang Nero dan Magnum beratnya adalah 20.




Pada Saat Dona ingin menimbang berat Nero, Champagne, dan Magnum secara bersama
tiba-tiba timbanganya Rusak.Bantu Dona untuk mendapatkan berat dari ketiga
kucing kesayangannya tersebut?

Temukan berat tanpa menggunakan timbangan dengan informasi yang diketahui
berasal dari berat timbangan masing-masing 2 kucing.


English :

## [UTS_CT_TahunLalu h14]

Jawaban :


Berat 3 kucing yang ditimbang bersama-sama adalah 32 Kg.


Pembahasan (ID)

Untuk menjawab pertanyaan ini sederhana dan cukup mudah. Misalkan 3 kucing
tersebut diberi inisial nama N untuk “Nero”, C untuk “Champagne”, dan M untuk
“Magnum”.

Masing-masing sudah diketahui berat dari 2 kucing yang ditimbang:

N + C = 18

C + M = 26

N + M = 20

Yang diinginkan adalah solusi dari N + C + M ?

Dari gambar didapatkan jika dilihat bersama-sama untuk penjumlahan kucing
tersebut jika di total kan masing masing akan mendapatkan berat 2 N + 2 C + 2
M = 64, kemudian sederhanakan menjadi:

2 (N + C + M) = 64

Didapatkan solusi N + C + M = 64/2 = 32.



Aspek Berpikir Komputasional




KPR - Keluar dari Labirin
Level :Easy
STATUS APPROVAL :
REVIEWER :

Tantangan (ID)

Mira perlu menemukan jalan untuk keluar dari sebuah labirin dan meminta anda
untuk memberikan
arahan. Dia memasuki labirin dari bawah (segitiga hitam) dan harus mencapai
pintu keluar pada bagian
atas (lingkaran merah besar). Segitiga hitam menandakan arah ke mana Mira
menghadap.

## [UTS_CT_TahunLalu h15]

Namun, Mira hanya dapat mengingat empat gerakan berikut:




Mira bisa membentuk sebuah gerakan panjang yang dibentuk dari empat gerakan
A, B, C, atau D. Satu
gerakan bisa diulang beberapa kali. Urutan gerakan tertentu ternyata dapat
membawa Mira keluar dari labirin dengan dua kali perulangan.

## [UTS_CT_TahunLalu h16]

Urutan gerakan manakah di bawah ini yang dapat membawa Mira keluar dari
labirin dengan dua kali perulangan?

Pilihan Jawaban:
o A,B,C,D
o D,A,A,D
o C,B,D,A
o C,A,A,D

English :

Jawaban :
Jawaban yang benar adalah D,A,A,D.

Pembahasan (ID)

Gerakan-gerakan berikut ini mengarah ke pintu keluar saat diulangi dua kali:




Aspek Berpikir Komputasional

Sebuah program terdiri dari rangkaian perintah-perintah dan kadangkala
beberapa rangkaian perintah perlu diulang.
Untuk membuat hal tersebut menjadi mudah, bahasa pemrograman menyediakan
instruksi khusus yang
didefinisikan atau disebut sebagai blok pengulangan (loop blocks). Rangkaian
perintah-perintah yang
dimasukan ke dalam sebuah blok pengulangan akan diulang sebanyak jumlah
pengulangan yang
ditentukan oleh pembuat program.
Dengan menggunakan instruksi khusus ini, pemrogram tidak perlu menulis
berulang-ulang bagian kode

## [UTS_CT_TahunLalu h17]

tertentu. Hal tersebut membuat kode menjadi lebih efisien dan lebih mudah
untuk dibaca atau
dimodifikasi.




KPR - Perjalanan Arabot
Level :Easy
STATUS APPROVAL :
REVIEWER :

Tantangan (ID)

Arabot adalah sebuah robot yang diharapkan akan berjalan dari titik awal (A,
B atau C) hingga stasiun
pengisian batere. Dalam perjalanannya Arabot menelusuri jalur-jalur
berdasarkan petunjuk arah berupa
label yang tertera pada jalur yang sedang dilaluinya untuk memilih jalur
berikutnya. Label arah bertuliskan
L atau R. Label L akan menginstruksikan Arabot untuk belok ke kiri pada
persimpangan berikut, sementara
label R menginstruksikan untuk belok ke kanan.




Gambar di atas adalah peta jalur-jalur tersebut. A, B, dan C adalah tiga
kemungkinan titik awal dari mana
Arabot akan memulai perjalanannya. Arabot dapat memulai dari A atau B atau
C. Selama perjalanannya
menuju stasiun pengisian, Arabot tidak boleh mampir di suatu titik awal
manapun karena jika demikian
maka Arabot akan segera dimatikan disitu.

## [UTS_CT_TahunLalu h18]

Tanda titik merah menyatakan stasiun tempat pengisian batere dan tanda titik
ungu menyatakan persimpangan jalur dimana Arabot akan memilih jalur sesuai
label yang tertera pada jalur sebelumnya.

Sayangnya, beberapa label ternyata sudah hilang dari peta. Keenam label yang
hilang tersebut pada
gambar ditunjukkan dengan kotak kosong dan diberi nomor 1 sampai dengan 6.

Agar Arabot selalu tiba di tanda titik merah, tentukan label (L atau R) dari
kotak 1 hingga 6 secara berurutan.

English :

Jawaban :
Jawaban yang benar adalah L, R, L, R, R, L.

Pembahasan (ID)

   -   Jalur 1 perlu menunjukkan arah yang dipilih saat Arabot berjalan dari
       titik B. Agar Arabot tidak menuju ke titik C, maka petunjuknya adalah
       “L”.
   -   Jalur 2 perlu menunjukkan arah yang dipilih saat Arabot berjalan dari
       titik C. Agar Arabot tidak menuju ke titik B, maka petunjuknya adalah
       “R”.
   -   Jalur 3 perlu menunjukkan arah yang dipilih saat Arabot berjalan dari
       titik B atau C. Agar tidak menuju ke titik A, maka petunjuknya adalah
       “L”
   -   Jalur 4 memiliki 2 pilihan (L atau R). Jika dipilih L, maka arabot akan
       berputar kembali dan tidak bisa menuju titik merah. Oleh karena itu,
       kita pilih jalur 4 = “R” dan jalur 6 = “L” agar arabot dapat menuju
       titik merah.
   -   Jalur 5 akan dilalui Arabot saat berjalan dari titik A (ingat bahwa
       jalur 3 = “L”). Oleh karena itu, petunjuk di jalur 5 perlu diset “R”
       agar dapat menuju ke titik merah.

Jawaban: L, R, L, R, R, L


Aspek Berpikir Komputasional

Sekumpulan aktivitas yang harus dikerjakan dengan urutan tertentu seringkali
dikode seperti di atas ("A" ke…, "B" ke…, dan "C" ke…), yang kemudian
ditransformasi ke struktur graf seperti pada gambar yang di bidang
informatika disebut sebagai struktur data.

## [UTS_CT_TahunLalu h19]

SWJ - Mobil yang hilang
Level :
STATUS APPROVAL :
REVIEWER :

Tantangan (ID)

Waduh! Sebuah mobil tanpa pengemudi tidak dapat kembali ke garasinya karena
terhenti di sebuah lokasi di kota sebab baterai-nya habis. Sebelum baterai
habis, berkat sensornya, mobil tersebut menemukan sebuah tempat parkir dan
mengirimkan posisi objek yang ada di sekitarnya. Setiap objek mempunyai 2
nilai, yaitu sudut dan jarak dari mobil. Sudut diukur 360° menggunakan
sensor di atas atap mobil. Sudut 0°adalah sisi depan mobil ( lihat gambar).




Pada contoh, hasil sensor adalah [(0,10),(90,5),(180,4)].

Sebuah mobil yang hilang mengirimkan hasil sensornya sebagai berikut: [(0,
5), (90, 4), (180, 5), (270, 12)]




Mobil manakah yang hilang berdasarkan hasil sensor ini?

## [UTS_CT_TahunLalu h20]

Pilihan Jawaban:



   A.       (Kuning)

   B.       (Merah)

   C.        (Biru)

   D.         (Putih)


English :

Jawaban :

Mobil B (Merah)

Pembahasan (ID)




Aspek Berpikir Komputasional

Kemampuan




SWJ - Klub Berbagi Buku
Level :
STATUS APPROVAL :
REVIEWER :

Tantangan (ID)

Ada tujuh (7) siswa yang gemar membaca buku dan mereka membentuk klub untuk
berbagi buku. Jika ada satu buku baru diperoleh (dan dibaca) seorang siswa,
kemudian ia akan meneruskan meminjamkan ke anggota klub lainnya dengan cara
berikut. Tidak setiap siswa menjadi sahabat siswa lainnya, maka seorang siswa
hanya meneruskan meminjamkan buku ke siswa yang bersahabat dengannya. Jika
seorang siswa mempunyai beberapa sahabat, maka sahabat yang paling muda yang
akan dipinjami terlebih dulu, yang belum pernah meminjam buku itu. Kalau semua
sahabatnya sudah pernah meminjamnya, maka ia akan mengembalikan ke siswa yang
sebelumnya meminjamkan buku itu kepadanya.

Diagram berikut menunjukkan tujuh siswa/i dan garis-garis menunjukkan hubungan
"sahabat" itu. Setiap simpul berisi informasi nama dan umur.

## [UTS_CT_TahunLalu h21]

Ben selesai membaca sebuah buku baru dan ingin berbagi dengan semua anggota
klub dan selain Ben belum ada yang pernah membacanya. Siapa yang akan menjadi
pembaca terakhir dari buku tersebut?




Pilihan Jawaban:

   ●    Bill
   ●   Sara
   ●   Tom
   ●   Kim


English :

Jawaban :

Kim

Pembahasan (ID)




Aspek Berpikir Komputasional

Kemampuan




WAK - #1
Level :
STATUS APPROVAL :
REVIEWER :

Tantangan (ID)

Ada empat toples masing-masing berisi sejumlah permen yang sama banyaknya.
Toples nomor 1 disediakan untuk si Ali, toples nomor 2 disediakan untuk si
Badu, toples nomor 3 disediakan untuk si Cecep, dan toples nomor 4 disediakan

## [UTS_CT_TahunLalu h22]

untuk si Dedi. Si Ali setiap kali selalu mengambil tepat 3 butir permen
sekaligus. Si Badu setiap kali selalu mengambil tepat 5 butir sekaligus. Si
Cecep setiap kali selalu mengambil tepat 7 butir permen sekaligus. Si Dedi
selalu mengambil tepat 9 butir permen sekaligus. Hingga suatu ketika toples
nomor 1 bersisa 2 butir permen, toples nomor 2 bersisa 3 butir permen dan
toples nomor 3 bersisa 2 butir permen. Sementara toples nomor 4, tidak jelas
bersisa berapa, yang pasti kurang dari 9 butir. Berapa sisa permen pada toples
nomor 4?

English :

Jawaban :

5 (lima)

Pembahasan (ID)


Dekomposisi:
- untuk mencari sisa permen pada toples 4 maka perlu diketahui dulu jumlah
permen semula
- untuk mendapatkan jumlah permen semula perlu dilakukan analisis terhadap
toples-toples lainnya

 Pattern recognition:
- dari analisis terhadap toples lainnya (toples 1, 2, dan 3) dapat dilihat
bahwa ini seperti mencari kelipatan persekutuan terkecil (KPK) hanya saja
ditambahkan dengan sisa pada masing-masing toples

 Abstraksi:
- untuk mendapatkan solusinya problem ini bisa diabstraksikan sebagai barisan
aritmetika dengan suku pertama adalah sisa permen dan selisih antar suku
adalah pengambilan permen

Algoritme:
- Untuk toples 1, 2, dan 3, tuliskan suku-suku barisan aritmetikanya dimulai
dari toples yang setiap kali pengambilan permen yang diambil paling banyak.

Toples 3: suku pertama = 2 (sisa permen), permen        yang   diambil   setiap
pengambilan 7
            jadi barisan aritmetikanya: 2, 9, 16, 23

Toples 2: suku pertama = 3 (sisa permen), permen yang          diambil   setiap
pengambilan 5
            jadi barisan aritmetikanya: 3, 8, 13, 18, 23

## [UTS_CT_TahunLalu h23]

Toples 1: suku pertama = 2 (sisa permen), permen yang diambil           setiap
pengambilan 3
            jadi barisan aritmetikanya: 2, 5, 8, 11, 14, 17, 20, 23

Jadi diperoleh jumlah permen semula adalah 23

Toples 4: permen yang diambil setiap pengambilan adalah 9
            jadi sisa permen toples 4 = 23 mod 9 = 5

Jadi sisa permen di toples 4 adalah 5 (lima)


Aspek Berpikir Komputasional

Kemampuan Dekomposisi, Pattern Recognition, Abstraksi, Algoritme




AAS - Memanen Cabai
Level :
STATUS APPROVAL :
REVIEWER :

Agria ingin memanen tanaman cabai di halaman rumahnya. Tanaman tersebut
ditata dalam bentuk kotak-kotak persegi seperti ilustrasi di bawah ini.
Angka pada setiap kotak mewakili jumlah cabai yang ada di masing-masing
tanaman.


       0              1              2               3             10

      10              2              10             10              5

       5              3              6               5              0

       0              4              0               2              3

      20              5              1               0              0


Agria tidak punya waktu banyak karena ia harus segera pergi ke kampus. Oleh
karena itu, ia tidak bisa memetik seluruh cabai tersebut. Ia hanya bisa
mulai dari kotak manapun di kolom paling kiri, dan berhenti di kotak manapun
di kolom paling kanan. Agria hanya bisa bergerak ke kotak di tepat setelah
kanannya atau bawahnya. Berikut adalah salah satu kemungkinan jalur yang
bisa diambil oleh Agria

## [UTS_CT_TahunLalu h24]

English :


Tantangan:
Berapa banyak jumlah cabai terbanyak yang bisa Agria petik?


Jawaban:

Jumlah terbanyak cabai yang dapat diambil adalah 42


Pembahasan

Yang dapat diambil lewat jalur berikut:




Salah satu strategi yang mungkin terpikirkan adalah untuk mencari tanaman
dengan cabai terbanyak (yaitu 20) dan memastikan tanaman tersebut dikunjungi
oleh Agria. Akan tetapi, tujuan soal ini adalah untuk membantah strategi
tersebut. Apabila tanaman dengan 20 cabai tersebut diambil oleh Agria,
jumlah cabai maksimum yang bisa diambil adalah sebanyak 41 cabai. Padahal,
dengan mengikuti jalur lain seperti yang ditampilkan pada jawaban, Agria
dapat mengambil sebanyak 42 cabai.
Salah satu strategi sederhana untuk menyelesaikan soal ini adalah dengan

## [UTS_CT_TahunLalu h25]

mengecek seluruh kemungkinan jalur yang dapat diambil. Akan tetapi, saat
Anda mencoba mengecek kemungkinan jalur tersebut, Anda secara sadar
mengabaikan beberapa jalur karena kemungkinan jalur tersebut tidak bisa
mendapatkan cabai yang banyak. Misalnya, jalur yang hanya bergerak di baris
pertama sampai ujung dan turun ke bawah. Proses mengeliminasi jalur yang
sudah pasti tidak mungkin menjadi jalur maksimal tersebut adalah salah satu
strategi dalam masalah pencarian jalur optimum seperti ini. Hal ini disebut
sebagai pruning.



Aspek Berpikir Komputasional:

Kemampuan: Decomposition (DE), Pattern Recognition (PR), Algorithms (AL)

Pada soal ini, kondisi tanaman di kebun telah diabstraksi dalam bentuk
matriks yang lebih sederhana. Masalah ini dapat didekomposisi menjadi
pengecekan banyaknya cabai yang bisa diambil di setiap kemungkinan jalur.
Pada saat mencari jalur tersebut, Anda dapat mengenali beberapa pola jalur
yang dapat dieliminasi dari pencarian karena sudah pasti tidak menjadi jalur
yang paling maksimum. Algoritme yang Anda susun dapat berupa pengecekan
jalur secara sistematis dengan mengeliminasi jalur atau kotak yang tidak
mungkin menjadi jalur yang paling menguntungkan.




AAS - Bisnis Bakso
Level :
STATUS APPROVAL :
REVIEWER :

Indonesia :

Agria, Bogoria, dan Pertania membuka kedai bakso yang menjual menu bakso
biasa, bakso spesial, dan bakso nuklir. Ketiganya memiliki spesialisasi
berbeda-beda dalam membuat bakso.

   ●   Agria mampu membuat bakso biasa dalam waktu 1 menit, bakso spesial
       dalam waktu 2 menit, dan bakso nuklir dalam waktu 5 menit.
   ●   Bogoria mampu membuat bakso biasa dalam waktu 2 menit, bakso spesial
       dalam waktu 2 menit, dan bakso nuklir dalam waktu 3 menit.
   ●   Pertania hanya mampu membuat bakso nuklir dalam waktu 2 menit. Sisanya
       ia tidak mampu buat.

## [UTS_CT_TahunLalu h26]

Kedai bakso mereka sangat lengkap sehingga ketiganya memiliki tempat kerja
masing-masing dan mampu bekerja secara bersamaan.

Suatu ketika, datang sekelompok mahasiswa yang baru saja mengerjakan ujian
berpikir komputasional. Mereka memesan 3 bakso biasa, 3 bakso spesial, dan 2
bakso nuklir.

English :




Tantangan:
Berapa menit waktu minimal yang dibutuhkan untuk membuat seluruh pesanan
tersebut?

Challenge

Jawaban:
Total waktu minimal yang dibutuhkan adalah lima menit.


Dengan daftar pengerjaan sebagai berikut:


Pembuat     Pesanan yang Dikerjakan

Agria       3 bakso biasa (3 menit) dan 1 bakso spesial (2 menit)

Bogoria     2 bakso spesial (4 menit)

Pertania    2 bakso nuklir (4 menit)


Penjelasan:
Pertama, setiap orang memiliki kecepatan yang berbeda-beda. Jika ditampilkan
dalam bentuk tabel, hasilnya adalah seperti ini:
Pembuat             Bakso Biasa         Bakso Spesial     Bakso Nuklir

Agria                       1                   2                   5

Bogoria                     2                   2                   3

Pertania                    -                   -                   2


Kedua, perlu diketahui bahwa ketiganya dapat bekerja secara bersamaan
(paralel) sehingga waktu yang dibutuhkan adalah waktu pengerjaan yang paling
lama dari ketiga orang tersebut. Misalnya, jika Agria selesai dalam waktu 5
menit sedangkan Bogoria dan pertania selesai dalam waktu 3 menit, maka waktu

## [UTS_CT_TahunLalu h27]

minimum untuk menyelesaikan seluruh pesanan tersebut adalah 5 menit.

Salah satu strategi yang dapat digunakan adalah dengan menyerahkan pesanan
ke orang yang paling cepat. Dengan observasi pada tabel di atas, Anda dapat
melihat bahwa Agria paling cepat mengerjakan bakso biasa sedangkan Pertania
paling cepat mengerjakan bakso nuklir.


Pembuat     Pesanan yang Dikerjakan                Total Waktu

Agria       3 bakso biasa                          3 menit

Bogoria

Pertania    2 bakso nuklir                         4 menit


Setelah itu, kita bisa alokasikan bakso spesial ke orang dengan total waktu
pekerjaan terkecil, yaitu Bogoria. Akan tetapi, kalau ketiga pesanan
tersebut diberikan pada Bogoria, maka total waktu yang dibutuhkan adalah 6
menit. Dengan mempertimbangkan bahwa pada menit ketiga Agria sudah selesai
membuat ketiga bakso biasa, kita bisa mengalokasikan 1 pesanan bakso spesial
kepada Agria. Akhirnya diperoleh alokasi pekerjaan seperti berikut:



Pembuat     Pesanan yang Dikerjakan                Total Waktu

Agria       3 bakso biasa dan 1 bakso spesial      3 + 2 menit

Bogoria     2 bakso spesial                        4 menit

Pertania    2 bakso nuklir                         4 menit


Terlihat bahwa waktu yang paling lama adalah Agria, yaitu selama 5 menit.
Dengan demikian, pada menit ke-5 seluruh pesanan telah selesai. Jangan lupa
memberi tips kepada Agria yang telah bekerja sangat keras.


Aspek Berpikir Komputasional:

Kemampuan: Abstraksi, Decomposition, Pattern Recognition, Algorithms

Pada level abstraksi, siapa dan objek apa yang dibuat tidaklah penting. Yang
terpenting adalah kita mencoba mengalokasikan suatu pekerjaan sedemikian
lupa pada suatu entitas yang mengerjakan pekerjaan tersebut. Hal ini adalah
salah satu contoh permasalahan alokasi tugas yang sering digunakan untuk
mengoptimasi kinerja suatu perusahaan manufaktur.

Saat melihat data, Anda akan menyadari bahwa setiap pembuat bakso memiliki

## [UTS_CT_TahunLalu h28]

spesialisasi yang berbeda. Karena tujuannya adalah meminimumkan waktu, maka
pikiran yang harus muncul adalah alokasikan suatu pekerjaan ke pembuat yang
paling cepat. Ini adalah ide utama dari langkah yang Anda lakukan untuk
menyelesaikan permasalahan ini.

# SOURCE D04_LatihanPython (practice, 6 pages)


## [D04_LatihanPython h1]

                                Latihan Python
                                                           1
                                      Minggu-4
                                         By: Maya Nabila




WI1102 Berpikir Komputasional

> (little or no text layer: read the page image app/public/pages/D04_LatihanPython/001.jpg)

## [D04_LatihanPython h2]

Perintah                                                               2

Untuk soal-soal berikut berlatihlah untuk membuat:
• Flowchart (sesuai ketentuan).
• Program Python yang bersesuaian dengan permasalahan yang diberikan
  (sesuai struktur pemograman).




WI1102 Berpikir Komputasional

## [D04_LatihanPython h3]

Soal 1: Beli kelereng                                                   3

vSebuah toko menjual kelereng. Tabel        Warna      Harga 1 butir (dalam
   di samping adalah tabel harga kelereng   kelereng   ratusan rupiah)
   berdasarkan warnanya.
vSeorang anak membeli kelereng
   sejumlah m kelereng merah, h kelereng    Merah      10
   hijau, dan k kelereng kuning.
   Asumsikan m >= 0, h >= 0, k >= 0.
                                            Hijau      15
vHitunglah berapa yang harus
   dibayarkan anak itu.
                                            Kuning     20

WI1102 Berpikir Komputasional

## [D04_LatihanPython h4]

Soal 2: Tagihan listrik                                                             4

Pak Dani menggunakan listrik di        Catatan konversi:
rumahnya dengan daya 1300 watt.        • 1 kWh = penggunaan daya 1000 watt selama 1 jam
Dalam sebulan, ia mencatat total       • Input: jumlah kWh per bulan
penggunaan listrik sebesar x kWh       • Output: total tagihan listrik
(kilowatt-jam). Biaya listrik
dikenakan sebesar Rp. 1.444,70 per
kWh.
Buatlah program untuk menghitung
total tagihan listrik Pak Dani dalam
sebulan.

WI1102 Berpikir Komputasional

## [D04_LatihanPython h5]

Soal 3: Konversi Waktu                                           5

Seseorang ingin menghitung total durasi dari beberapa kegiatan
yang berlangsung selama jam, menit, dan detik.
Buatlah program yang menerima masukan dalam satuan jam,
menit, dan detik, kemudian mengubahnya ke dalam total detik.

Contoh:
Input: 1 jam, 45 menit, 30 detik → Output: 6330 detik



WI1102 Berpikir Komputasional

## [D04_LatihanPython h6]

 Soal 4: Kasir sederhana                                                           6

Sebuah warung makan menyediakan tiga   Buatlah program kasir sederhana yang:
jenis menu:                            • Meminta jumlah pesanan untuk setiap menu
• Nasi Goreng – Rp 18.000              • Menghitung total harga pesanan
• Mie Goreng – Rp 15.000               • Meminta input uang pembayaran dari pembeli
• Es Teh Manis – Rp 5.000              • Menentukan apakah uang cukup atau tidak
                                       • Jika cukup, tampilkan kembaliannya
                                       • Jika tidak cukup, tampilkan jumlah
                                         kekurangannya

 WI1102 Berpikir Komputasional

# SOURCE D05_ExtraExercises (practice, 39 pages)


## [D05_ExtraExercises h1]

Conditionals & Repetitions
– Python
Extra Exercises

WI1102 Computational Thinking Teaching Team
Institut Teknologi Bandung © 2026

## [D05_ExtraExercises h2]

Conditionals


20/09/2026     WI1102/Computational Thinking   2

> (little or no text layer: read the page image app/public/pages/D05_ExtraExercises/002.jpg)

## [D05_ExtraExercises h3]

Exercises
• For the following exercises, practice creating:
     • Flowchart or Pseudocode (please choose, or determined by the class
       lecturer)
     • Corresponding Python program




20/09/2026                     WI1102/Computational Thinking                3

## [D05_ExtraExercises h4]

Exercise 1. Largest of Two Numbers
• Write a program that reads two integers, for example A and B, and
  writes down which of the two numbers is the largest.
• Cases:
     • If A > B, then the largest number = A
     • If A < B, then the largest number = B
     • If A = B, then the largest number is A or B (meaning the output will be the
       same as one of the 2 cases above)
• Are these 3 cases or only 2 cases?



20/09/2026                       WI1102/Computational Thinking                       4

## [D05_ExtraExercises h5]

Exercise 2. Form of Water
• Write a program that receives the temperature of water (in
  degrees Celsius) and prints the form of the water to the screen,
  whether it is “frozen”, “liquid”, or “steam”.
     • If the water temperature is <= 0 degrees, then print “frozen”
     • If the water temperature is > 0 and < 100 degrees, then print "liquid"
     • If the water temperature is >= 100, then print "steam"




20/09/2026                       WI1102/Computational Thinking                  5

## [D05_ExtraExercises h6]

Exercise 3. Total of Serial Resistance
• Write a program that accepts 3 resistances (R1, R2, R3) and
  produces a total resistance (RT) if connected in series.
                          RT = R1 + R2 + R3
• R1, R2, and R3 cannot be negative. If just one resistance is
  negative, then the total resistance cannot be calculated and the
  error message "Total resistance cannot be calculated" will appear
  on the screen.




20/09/2026                 WI1102/Computational Thinking              6

## [D05_ExtraExercises h7]

Exercise 4. Rank of 3 Numbers
• Given 3 integers that are read from the keyboard, for example A, B,
  C. Assume that these three numbers are different.
• Print on the screen the three numbers in order from largest to
  smallest.
• Example: A = 1, B = -1, C = 2
       Then it displays on the screen: 2 1 -1




20/09/2026                 WI1102/Computational Thinking            7

## [D05_ExtraExercises h8]

Exercise Alternative Solutions
For instructors only




20/09/2026             WI1102/Computational Thinking   8

> (little or no text layer: read the page image app/public/pages/D05_ExtraExercises/008.jpg)

## [D05_ExtraExercises h9]

Exercise 1. Largest of Two Numbers
• There are only 2 cases, the alternatives:
     • If A >= B, then the largest number is B
     • If A < B (complement of the case above), then the largest
       number = B




20/09/2026                   WI1102/Computational Thinking         9

## [D05_ExtraExercises h10]

Exercise 1. Pseudocode + Flowchart
Pseudocode                                                              start
                                                Flowchart

input(A, B)
                                                                      input(A,B)
if (A >= B) then
             output(A)
                                                              true                  false
else { A < B }                                                          A >= B
             output(B)

                                                         output (A)                output (B)



                                                                        end

20/09/2026               WI1102/Computational Thinking                                          10

## [D05_ExtraExercises h11]

Exercise 1:. Python
 # Program Max2Integer
 # Print the largest value of the input 2 integers

 # DECLARATIONS
 # A, B : int

 # ALGORITHM
 A = int(input())
 B = int(input())

 if (A >= B):
     print(A)
 else: # A < B
     print(B)




20/09/2026                      WI1102/Computational Thinking   11

## [D05_ExtraExercises h12]

Exercise 2. Pseudocode + Flowchart
                                                                                 start
Pseudocode                                                Flowchart

input(T) { T is water temperature }                                            input(T)
if (T <= 0) then
      output(“frozen”)                                             T<=0                       T >= 100
                                                                                   T
else if (T > 0 and T < 100) then
      output(“liquid”)                                                    T > 0 and T < 100

else { T >= 100 }                                           output             output                 output
                                                          (“frozen”)          (“liquid”)            (“steam”)
      output(“steam”)

                                                                                 end

20/09/2026                         WI1102/Computational Thinking                                         12

## [D05_ExtraExercises h13]

Exercise 2. Python
        # Program WaterForm
        # Print the form of water depending on the temperature input

        # DECLARATIONS
        # T : float

        # ALGORITHM
        T = float(input())

        if (T <= 0):
            print ("frozen")
        elif (T > 0 and T < 100):
            print ("liquid")
        else: # T >= 100
            print ("steam")



20/09/2026                          WI1102/Computational Thinking      13

## [D05_ExtraExercises h14]

Exercise 3. Total of Serial Resistance
• Cases:
     • If R1 >= 0 and R2 >= 0 and R3 >= 0, then calculate the total
       resistance using the formula: RT = R1 + R2 + R3
     • If not, namely R1 <= 0 or R2 < 0 or R3 < 0, then write the error
       message "Total resistance cannot be calculated"




20/09/2026                   WI1102/Computational Thinking                14

## [D05_ExtraExercises h15]

   Exercise 3. Pseudocode + Flowchart
Pseudocode                                                                                      start
                                                                       Flowchart
input (R1, R2, R3)
if (R1 >= 0) and (R2 >= 0) and (R3 >= 0) then                                             input(R1,R2,R3)
          output(R1+R2+R3)
else {R1 < 0 or R2 < 0 or R3 >= 0}
          output(“Total resistance cannot be calculated”)                          true      R1>=0 and      false
                                                                                             R2>=0 and
                                                                                             R3>=0

                                                                              output                     output (“Total
                                                                            (R1+R2+R3)                     resistance
                                                                                                           cannot be
                                                                                                          calculated”)


   20/09/2026                                   WI1102/Computational Thinking
                                                                                          end                       15

## [D05_ExtraExercises h16]

Exercise-3: Python
 # Program SerialResistance
 # Calculate total of serial resistance based on resistance R1, R2, R3

 # DECLARATIONS
 # R1, R2, R3 : float

 # ALGORITHM
 R1 = float(input()); R2 = float(input()); R3 = float(input())

 if ((R1 >= 0) and (R2 >= 0) and (R3 >= 0)):
     print (R1 + R2 + R3)
 else: # R1 < 0 atau R2 < 0 atau R3 < 0
     print("Total resistance cannot be calculated")




20/09/2026                      WI1102/Computational Thinking            16

## [D05_ExtraExercises h17]

Exercise 4. Rank of 3 Numbers (1)
Several alternative of solutions:
1. Enumeration of relationships between A, B, C  there are 6 cases:
     1. A > B > C → A B C
     2. A > C > B → A C B
     3. … (continue)
2. Determine the maximum value between 2 numbers, then
   determine the position relative to the 3rd number. Example:
     1. A > B, then A must be to the "left" of B. Just determine the position of C.
             1.   If B > C, then: A B C
             2.   If B < C, then C must be to the "left" of B, depending on C's position relative to A:
                  1.   If A > C, then: A C B
                  2.   If A < C, then: C A B
     2. A < B … (continue)


20/09/2026                                     WI1102/Computational Thinking                              17

## [D05_ExtraExercises h18]

Exercise-4: Rangking 3 bilangan (2)
Several alternative of solutions:
3. Find the largest value of A, B, C, then determine the position of
   the other 2 numbers
     1. A > B and A > C, then:
             1.   If B > C, then: A B C
             2.   If B < C, then: A C B
     2. B > A and B > C, maka:
             1.   If A > C, then: B A C
             2.   If A < C, then: B C A
     3. … ( continue )
4. … other alternatives??

20/09/2026                                WI1102/Computational Thinking   18

## [D05_ExtraExercises h19]

                          # Program Rank3Numbers
                          # Accepts input of 3 numbers: A, B, C
                          # Print all three numbers in descending order
                          # Assumptions A, B, C are different
Exercise-4:               # DECLARATIONS
Python                    # A, B, C : int

                          # ALGORITHM
                          A = int(input()); B = int(input()); C = int(input())

                          if (A > B) and (B > C):
                              print (A, " ", B, " ", C)                 # Alternative for expression:
 Alternative Solution 1   elif (A > C) and (C > B):                     if (A > B > C):
                              print (A, " ", C, " ", B)                     print (A, " ", B, " ", C)
                          elif (B > A) and (A > C):                     elif (A > C > B):
                              print (B, " ", A, " ", C)                     print (A, " ", C, " ", B)
                          elif (B > C) and (C > A):
                              print (B, " ", C, " ", A)                 elif (B > A > C):
                          elif (C > A) and (A > B):                         print (B, " ", A, " ", C)
                              print (C, " ", A, " ", B)                 elif (B > C > A):
                          else: # C > B > A                                 print (B, " ", C, " ", A)
                              print (C, " ", B, " ", A)                 elif (C > A > B):
                                                                            print (C, " ", A, " ", B)
                                                                        else: # C > B > A
    20/09/2026                          WI1102/Computational Thinking
                                                                            print (C, " ", B, " ",19 A)

## [D05_ExtraExercises h20]

Repetition/Looping


20/09/2026   WI1102/Computational Thinking   20

> (little or no text layer: read the page image app/public/pages/D05_ExtraExercises/020.jpg)

## [D05_ExtraExercises h21]

Exercise

• For all of the following exercises:
     • Practice creating Python programs with the best or required repetition
       notation
     • Also make a flowchart/pseudocode (depending on what is requested by
       the class lecturer)




20/09/2026                     WI1102/Computational Thinking                21

## [D05_ExtraExercises h22]

Exercise 1
• Create an program that reads a positive integer value, for example
  N, and adds (and displays) all multiples of 5 between 1 and 1. N.
• Example:

   No        Input N   Output     Note
   1         5         5          There is only 1 multiple of 5 between 1 and 5, namely 5
   2         26        75         Multiples of 5 between 1 and 26 are 5, 10, 15, 20, 25
                                  5+10+15+20+25 = 75
   3         4         0          There are no multiples of 5 between 1 and 14




20/09/2026                      WI1102/Computational Thinking                               22

## [D05_ExtraExercises h23]

Exercise 2
• Write a program that reads how many students are in the class, for
  example N (Assumption: N > 0, no need to check)
• Next, read the N characters that represent the grades of the
  WI1102 assignment. Possible assignment grades are: ‘A’, ‘B’, ‘C’, ‘D’,
  ‘E’, ‘F’. Assume the input value is always true.
• If a student gets a grade: A', 'B', 'C', or 'D', then the student is
  declared to have passed; whereas if you get an 'E' or 'F' then the
  student is declared not to have passed.
• Write on the screen how many students passed and how many did
  not pass.

20/09/2026                  WI1102/Computational Thinking              23

## [D05_ExtraExercises h24]

Exercise 2.   No   Input N           Input of WI1102 grades   Output

Examples      1    7                 A
                                     B
                                                              Pass = 6
                                                              Not pass = 1
                                     C
                                     A
                                     A
                                     E
                                     D
              2    5                 A                        Pass = 5
                                     B                        Not pass = 0
                                     B
                                     A
                                     A
              3    5                 E                        Pass = 0
                                     E                        Not pass = 5
                                     E
                                     E
                                     E

20/09/2026             WI1102/Computational Thinking                         24

## [D05_ExtraExercises h25]

Exercise 3                                No
                                          1
                                                    Input
                                                    7
                                                               Output
                                                               Even = 3
                                                                                   Note

                                                    8          Odd = 2
                                                    0
• Write a program to read a set                     9
  of positive integers. Data                        10
  reading is terminated if the                      -1
                                          2         4          Even = 3
  user enters a negative value.                     10         Odd = 0
• Next, print out how many                          6
  even and odd numbers there                        -111

  are.                                    3         5
                                                    17
                                                               Even = 0
                                                               Odd = 2
• 0 is an even number.                              -234
                                          4         -99        Even = 0            No positive numbers are
                                                                                   entered
                                                               Odd = 0
                                          All negative number input ends data reading


20/09/2026                WI1102/Computational Thinking                                          25

## [D05_ExtraExercises h26]

Exercise 4. Lagu Anak Ayam
• Do you still remember the song Anak Ayam??
   Anak ayam turunlah 5
   Mati satu tinggallah 4                                       Anak ayam turunlah N
   Mati satu tinggallah 3                                       Mati satu tinggallah N-1
   Mati satu tinggallah 2                                       Mati satu tinggallah N-2
   Mati satu tinggallah 1         generalization                ….
   Mati satu tinggal induknya                                   Mati satu tinggallah 1
                                                                Mati satu tinggal induknya
   Anak ayam turunlah 1
   Mati satu tinggal induknya



• Create a program that accept as input a positive integer, for example N
  (assuming N>0), and write the lyrics to the Anak Ayam song above

20/09/2026                      WI1102/Computational Thinking                                26

## [D05_ExtraExercises h27]

Exercise 5. Calculating the Area under the
curve
• To calculate the area of ​a curve formed by a formula, it can be done
  using an integral using a numerical approach.
• The numerical approach will cut the area at certain intervals, then
  calculate the area of ​each piece of the area using the trapezoid
  formula repeatedly.
• Write a program for the following problem.




20/09/2026                  WI1102/Computational Thinking             27

## [D05_ExtraExercises h28]

                                                     To calculate the area under the curve defined
                                                     by the function f(x) = x³ + x + 1 from x = 1 to x
                                                     = 4, we can divide the range into intervals
                                                     (e.g., 0.25). The smaller the interval, the more
                                                     detailed the result.
                                                     The total area is obtained by calculating the
                                                     area of ​all the trapezoids formed by these
                                                     intervals.

                                                     Task:
                                                     Write a program to calculate the area under the
                                                     curve defined by the function f(x) = x³ + x + 1
  Assumptions:                                       from x = a to x = b using a specified interval
  a < b; a ≥ 0; b > 0; delta > 0                     (delta), where a, b, and delta are user inputs.


20/09/2026                         WI1102/Computational Thinking                                 28

## [D05_ExtraExercises h29]

Exercise 6
• The BMKG (Badan Meteorologi, Klimatologi, dan Geofisika,
  Meteorology, Climatology, and Geophysics Agency) of Bandung
  City requires a program to calculate several basic statistics
  regarding air temperature in Bandung City over the course of a
  month, specifically:
     • Average temperature
     • Highest temperature
     • Lowest temperature
• Create a program that accepts the number of days in the month—
  denoted as N (where N can be 28, 29, 30, or 31; assume the input
  is valid)—then accepts the air temperatures from day 1 through
  day N of that month and outputs the aforementioned statistics.

20/09/2026                   WI1102/Computational Thinking           29

## [D05_ExtraExercises h30]

Exercise Alternative Solutions
For instructors only
Complete alternative solutions (Python, pseudocode, and flowchart) are provided only for
Exercise 1.
Alternative solutions in Python only are provided for Exercises 2 through 4.


20/09/2026                           WI1102/Computational Thinking                         30

## [D05_ExtraExercises h31]

                                                                     flowchart                       start
      Exercise 1
                                                                                                   input(N)
      Pseudocode+Flowchart                                                                         sum  0

                                                                              for
     The most appropriate loop is the                                                                i1
     for loop, because the range of                                                 fals
     values ​for the iteration is known                                             e               i <= N

     precisely—namely, from 1 to N.                                                                        true
                                                                                           fals      i mod
                                                                                           e         5=0
pseudocode
                                                                                                        true
input(N) { Initialization }
                                                                                              sum  sum + i
sum  0 { Initialization }
i traversal [1..N]
    { aksi }                                                                                       ii+1
    if (i mod 5 = 0) then {cek kelipatan 5}
        sum  sum + i                                                                             output(sum)
output(sum) { terminasi }

      20/09/2026                              WI1102/Computational Thinking                          end          31

## [D05_ExtraExercises h32]

               # Program SumKelipatan5
Exercise 1     # Menerima masukan N bilangan integer positif
               # dan menampilkan penjumlahan bilangan kelipatan 5 dari 1 s.d. N
Python
               # DECLARATIONS
               # N, i, sum : int

               # ALGORITHM
               # Masukan grade N
               N = int(input())

               # Menghitung penjumlahan bilangan kelipatan 5 antara 1 s.d. N
               sum = 0
               for i in range(1,N+1):
                   if (i % 5 == 0):
                       sum = sum + i

               # Terminasi
               print(sum)


  20/09/2026                   WI1102/Computational Thinking                   32

## [D05_ExtraExercises h33]

Exercise 2. Discussion
• The most appropriate loop is the for loop, as the range of
  values ​for the iteration is known precisely—specifically, from 1 to
  N.
• Using a while loop is less suitable because there is no possibility
  of an "empty" case.




20/09/2026                  WI1102/Computational Thinking                33

## [D05_ExtraExercises h34]

                # Program Tugas
                # Accepts N assignment grades (A through F) as input
Exercise 2      # and outputs the number of passing and not passing (failing) grades.

Python          # DECLARATIONS
                # N, i : int
                # grade : char
                # pass, notpass : int

                # ALGORITHM
                # Entry N
                N = int(input("Number of students = "))

                # Enter the scores and simultaneously calculate pass/not pass status.
                pass = 0; notpass = 0
                print("Enter each student's grade..")
                for i in range(1,N+1):
                    grade = input("Student-" + str(i) + " = ")
                    if (grade == 'A' or grade == 'B' or grade == 'C' or grade == 'D'):
                        pass = pass + 1
                    else: # grade == 'E' atau 'F'
                        notpass = notpass + 1

                # Termination
                print(“Pass = " + str(pass))
                print("Not pass = " + str(notpass))
   20/09/2026                      WI1102/Computational Thinking                        34

## [D05_ExtraExercises h35]

Exercise 3. Discussion
• The most appropriate loop to use is the while loop.
   • There is a possibility that the action is never performed at all (an empty
        case)—specifically, if the initial value entered by the user is negative.
• The for loop is unsuitable because the range of values ​is
  undefined.




20/09/2026                         WI1102/Computational Thinking                    35

## [D05_ExtraExercises h36]

Exercise 3     # Program EvenOdd
               # Accept a series of integers until the user enters a negative value,
Python         # then display the count of even and odd numbers.


               # DECLARATIONS
               # X, countEven, countOdd : int

               # ALGORITHM
               countEven = 0                             # Initialization
               countOdd = 0                              # Initialization

               X = int(input())                  # First-Elmt
               while (X >= 0):
                   # cek Odd atau Even
                   if (X % 2 == 0): # X is even
                       countEven = countEven + 1
                   else: # X is odd
                       countOdd = countOdd + 1
                   X = int(input())             # Next-Elmt

               # Terminasi
               print("Number of even numbers = " + str(countEven))
               print("Number of odd numbers = " + str(countOdd))


  20/09/2026                   WI1102/Computational Thinking                     36

## [D05_ExtraExercises h37]

Exercise 4. Discussion
• A loop is used to print the phrase “Mati satu tinggallah..."
• The loop prints the number of chicks, counting down from N-1 to
  1.
• If N = 1, the phrase “Mati satu tinggallah..." is never printed → an
  empty case.
    • for: the empty case must be prevented from entering the loop by using an
       if-else statement.
     • while: the safest option, as the empty case is handled by specifying the
       loop condition at the start.




20/09/2026                       WI1102/Computational Thinking                    37

## [D05_ExtraExercises h38]

Exercise 4:   # Program AnakAyam-1
              # Write Anak Ayam song based on input number of
Python        # chicks
              # Version using for
for
              # DECLARATIONS
              # N, i : int

              # ALGORITHM
              N = int(input("Enter the number of chicks = "))

              print("Anak ayam turunlah " + str(N))
              if (N > 1):
                  for i in range(N-1,0,-1):
                      print("Mati satu tinggallah " + str(i))

              print("Mati satu tinggal induknya")


20/09/2026             WI1102/Computational Thinking            38

## [D05_ExtraExercises h39]

              # Program AnakAyam-2
Exercise 4:   # Write Anak Ayam song based on input number of
              # chicks
Python        # Version using while

while         # DECLARATIONS
              # N, i : int

              # ALGORITHM
              N = int(input("Enter the number of chicks = "))

              print("Anak ayam turunlah " + str(N))
              i = N-1
              while (i >= 1):
                  print("Mati satu tinggallah " + str(i))
                  i-=1 # i=i-1
              # i < 1

              print("Mati satu tinggal induknya")

 20/09/2026              WI1102/Computational Thinking          39

# SOURCE D06_ArrayExercises (practice, 4 pages)


## [D06_ArrayExercises h1]

Array dan Pemrosesannya
        – PHYTON
    Tim Penyusun Materi WI1102 Berpikir Komputasional
            Institut Teknologi Bandung © 2025

## [D06_ArrayExercises h2]

                                                                           2




               LATIHAN          Untuk setiap soal latihan, buatlah:


                   (PR)         • flowchart;
                                • kode program dalam Python




WI1102/Berpikir Komputasional                                         10/6/25

## [D06_ArrayExercises h3]

                                                           3



             ØJudul: Mencari Huruf dalam Array
             • Soal:
               Sebuah array huruf dengan nama variable
               “alfabet” diisi berdasarkan masukan sebanyak N
               kali.
             • Kemudian lakukan input untuk mencari suatu huruf
               dalam array alfabet tersebut.
             • Buat program untuk mencari apakah huruf yang
               dimasukkan user ada di array atau tidak.
PR-1           Recc: Gunakan pencarian dengan while loop.
             • Jika huruf ada → tampilkan indeks
               kemunculannya.
             • Jika huruf tidak ada → tampilkan pesan bahwa
               huruf tidak termuat pada array.
             • Contoh array Panjang 7:
               alfabet = ['A','B','C','D','E','F','G’].
               Akan dicari huruf ”C”, maka keluar informasi
               bahwa huruf C pada array alfabet ada pada
               indeks ke-2.

 06/10/25   WI1102/Berpikir Komputasional

## [D06_ArrayExercises h4]

                                                                     4




             ØJudul: Mencari Mencari Nilai Ganjil
              Pertama
             ØSoal:
              Diberikan sebuah array nilai = [12, 24, 18,
              21, 36, 45,…].
             ØBuat program Python untuk mencari
PR-2          elemen pertama yang ganjil beserta
              indeksnya.
              Hasilnya “Angka ganjil pertama Adalah 21
              pada indeks ke-3”.
             ØJika tidak ada angka ganjil, cetak pesan
              bahwa tidak ada nilai ganjil.
             Ø Catt: Pada soal ini, silahkan definisikan array-nya
               sendiri dengan panjang 12.


 06/10/25   WI1102/Berpikir Komputasional

# SOURCE Latihan-1 (practice, 6 pages)


## [Latihan-1 h1]

1. Daur Ulang
Berang-berang tidak suka sampah. Mereka suka menggunakan barang-barang lama
yang sudah usang sebagai bahan untuk membuat barang baru yang bermanfaat. Ini       Roda:                    Sepeda:            Gerobak Dorong:     Sepeda Roda Tiga
disebut daur ulang. Berikut ini ditunjukkan bahan-bahan apa saja yang dibutuhkan   Rp 100.000              Rp 1000.000             Rp 500.000           Rp 1500.000
untuk membuat roda, sepeda, gerobak dorong, dan sepeda roda tiga.
                                                                                   Pertanyaan:
                                                                                   Dirga memiliki bahan-bahan berikut: 6 ban, 6 batang besi, dan 2 potong kayu. Berapa
                                                                                   uang paling banyak yang dapat diperolehnya dari mendaur ulang jika ia menjual
                                                                                   barang-barang yang dibuatnya?
  Ban    +      Batang Besi                             Roda




                                                                                   Pilihan Jawaban:
     2 Roda       +       Batang Besi                      Sepeda                  A) Rp 2500.000      B) Rp 2600.000      C) Rp 3000.000       D) Rp 4000.000


                                                                                                                        Tulis Satu Huruf Pilihan Jawaban:



  Ban     +    Batang Besi                      Gerobak Dorong

                                                                                   2. Konter Toko
                                                                                   Sebuah toko memiliki empat loket penagihan yang diberi nomor 1, 2, 3, 4. Setiap
                                                                                   loket dapat memiliki antrean maksimal 4 pelanggan, termasuk pelanggan yang
                                                                                   dilayani. Setiap loket dapat melayani satu pelanggan dalam satu waktu. Diperlukan
 Roda    +       Sepeda                      Sepeda Roda Tiga                      waktu 2 menit untuk melayani satu pelanggan. Awalnya, hanya loket 1 yang buka.

Dirga suka mendaur ulang dan suka menjual barang-barang yang dibuatnya. Barang-
barang tersebut dapat dijual di pasar dengan harga berikut:

## [Latihan-1 h2]

                                                                                        3. Lompatan si-Jack
                                                                                        Jack adalah seekor monyet yang tinggal di taman. Dari satu pohon, ia dapat
                                                                                        melompat ke pohon lain jika pohon tersebut berjarak dua sel secara horizontal atau
                                                                                        vertikal, atau satu sel secara diagonal, seperti yang ditunjukkan pada diagram.
                                                                                        Jack memainkan permainan di mana ia melompat ke sebanyak mungkin pohon yang
                                                                                        berbeda tanpa menyentuh tanah. Ia dapat memulai dari pohon mana pun yang ada di
                                                                                        taman.
                                                                                        Peta taman:



Ketika seorang pelanggan ingin membayar tagihan, ia bergabung dengan antrean
terakhir di loket pertama yang antreannya belum penuh. Ia pertama-tama mencoba
loket 1, lalu loket 2, dst.
Jika tidak ada ruang yang tersedia di salah satu loket yang saat ini buka, loket baru
dibuka dan pelanggan bergabung dengan antrean di sana. Namun, diperlukan waktu
1 menit untuk menyiapkan loket, jadi diperlukan waktu 3 menit untuk melayani
pelanggan pertama di loket yang baru dibuka.
Setiap pelanggan berikutnya akan dilayani dalam waktu 2 menit seperti biasa. Pada
waktu tertentu, jika ada pelanggan yang meninggalkan antrean setelah dilayani dan
pelanggan baru yang ingin bergabung dalam antrean, Anda dapat mengasumsikan
bahwa pelanggan yang dilayani akan meninggalkan antrean terlebih dahulu dan
membuat ruang kosong di antrean mereka tempat pelanggan baru dapat bergabung.

Pertanyaan:
12 pelanggan datang ke loket, dua orang setiap menit (dua pelanggan datang pada         Pertanyaan:
awalnya, dua lagi setelah 1 menit, dst.). Berapa lama waktu yang dibutuhkan untuk       Berapa jumlah pohon berbeda terbanyak yang dapat ia kunjungi dalam sehari?
melayani mereka semua?
                                                                                                              Tulis Sebuah Bilangan Bulat sebagai Jawaban:
Pilihan Jawaban
A) 12 menit   B) 11 menit      C) 13 menit    D) 8 menit
                                     Tulis Satu Huruf Pilihan Jawaban:

## [Latihan-1 h3]

                                                                                     Yono dapat melakukan gerakan berikut:
4. Film Favorit
                                                                                     • out(X) : memindahkan kereta paling kanan di depo X ke luar dan ke dalam jalur
Sekelompok teman harus memilih salah satu dari tujuh film yang akan ditonton.                   utama, sejauh yang dapat ditempuh.
Setiap teman memberi peringkat pada setiap film seperti yang ditunjukkan.            • in(X) : memindahkan kereta paling kiri di jalur utama ke dalam dan ke dalam
                                                                                                depo X, sejauh yang dapat ditempuh.
           1          2          3           4          5         6           7
                                                                                     Tidak boleh ada lebih dari 3 kereta di jalur utama atau di depo pada saat yang
 Andi                                                                                bersamaan.
 Nani

 Niko

 Goldi

 Edi

 Rosa



Peringkat dari yang terbaik hingga yang terburuk adalah:          ,   ,   .
Sebuah film disebut "film favorit", jika semua teman memberikan peringkat terbaik
mereka. Misalnya Film 1 bukan film favorit karena Niko memberikan peringkat
terbaiknya pada Film 4.
                                                                                     Pertanyaan:
Pertanyaan:
                                                                                     Rangkaian gerakan mana yang diakhiri dengan kereta bernomor 1, 2, 3 dari kiri ke
Berapa jumlah peringkat terkecil yang perlu diubah sehingga akan ada film favorit?   kanan di D1?

                       Tulis Sebuah Bilangan Bulat sebagai Jawaban:                  Pilihan Jawab:
                                                                                          A) out(1) out(2) in(1) out(2) out(2) in(1) out(3)
                                                                                          B) out(1) out(2) in(1) out(2) out(2) in(1) out(3) in(2) out(3) in(1)
                                                                                          C) out(1) out(2) in(1) out(2) in(1) out(3) in(2) out(3) in(1)
                                                                                          D) out(1) out(2) in(1) out(2) out(2) in(1) out(3) in(2) out(3) in(1)
5. Kereta Api
                                                                                                                               Tulis Satu Huruf Pilihan Jawaban:
Yono memiliki 7 kereta mainan (bernomor 1 hingga 7) dan 3 depo mainan, D1, D2,
dan D3.
Saat ini kereta diparkir di depo yang ditunjukkan di bawah ini.

## [Latihan-1 h4]

6. Menara Balok                                                                         7. Bongkar Muat
Sam, si berang-berang kecil, sedang bermain dengan balok mainannya. Setiap balok        Kereta barang memiliki gerbong, masing-masing dengan kotak bernomor. Satu derek
memiliki tinggi yang sama, tetapi berbeda lebarnya. Dia membangun sembilan menara       digunakan untuk membongkar muatan. Derek berada pada posisi tetap. Untuk
yang indah, masing-masing dibuat dengan balok dengan lebar yang sama.                   membongkar muatan, kotak harus diposisikan tepat di bawah derek.
                                                                                        Kotak-kotak harus dibongkar secara berurutan mulai dari 1. Kereta hanya dapat
                                                                                        bergerak maju. Kereta berada di jalur melingkar, sehingga dapat berputar di jalur
                                                                                        tersebut dan kembali sehingga lebih banyak kotak dapat dibongkar oleh derek.




Untuk mengubah ketinggian menara, Sam dapat menambahkan balok yang bentuknya
sama ke balok paling atas suatu menara (tidak harus dari balok yang ada di tumpukan-
tumpukan tersebut), atau menghilangkan satu atau beberapa balok yang paling atas
pada suatu menara. Perlu diperhatikan bahwa, energi untuk mengubah ketinggian
menara sebanding dengan lebar dan jumlah balok. Misalnya: menghilangkan 2 balok
dari menara dengan lebar 1 harganya 2 × 1 = 2 unit energi; dan menambahkan 4 balok
ke menara dengan lebar 3 biaya 4 × 3 = 12 unit energi. Sam ingin semua menara
memiliki ketinggian yang sama, dan dia ingin menghabiskan total energi yang sesedikit   Dalam contoh di atas, kotak-kotak harus dibongkar dalam urutan 1, 2, 3, 4.
mungkin.                                                                                Putaran 1: Kereta melewati kotak 4, membongkar kotak 1, melewati kotak 3, dan
                                                                                                   membongkar kotak 2.
Pertanyaan:
                                                                                        Putaran 2: Kereta melewati kotak 4, membongkar kotak 3.
Berapa total energi yang minimum untuk mendapatkan menara yang tingginya sama?
Asumsikan Sam memiliki tak hingga banyaknya persediaan balok untuk setiap ukuran.       Putaran 3: Kereta membongkar kotak terakhir, kotak 4.

                       Tulis Sebuah Bilangan Bulat sebagai Jawaban:                     Pertanyaan:
                                                                                        Berapa kali kereta berikut harus datang ke derek untuk membongkar semua kotak?
                                                                                        (Kotak-kotak harus dibongkar dalam urutan: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.)




                                                                                                               Tulis Sebuah Bilangan Bulat sebagai Jawaban:

## [Latihan-1 h5]

                                                                                       Tantangan:
8. Bepergian Naik Kereta Api                                                           Berapa keluarga paling banyak dapat bepergian dengan pengaturan gerbong di atas?
Delapan keluarga bebras ingin bepergian dengan kereta api. Berikut ini adalah daftar
keluarga-keluarga itu (A sampai H) dengan jumlah anggota keluarga dan berat bagasi                             Tulis Sebuah Bilangan Bulat sebagai Jawaban:
yang dibawanya.
 Keluarga;      Jumlah Anggota        Berat Bagasi
 Avsec (A)      3                     50
 Bizjak (B)     4                     80
 Cerar (C)      5                     110                                              9. Deteksi Kesalahan
 Dolenc (D)     4                     80
 Erjavec (E)    2                     40                                               Di Kota Bebras, listrik dihasilkan oleh kincir angin di perbukitan dan disalurkan ke
 Furlan (F)     3                     70                                               rumah-rumah melalui jaringan berikut:
 Gabric (G)     6                     130
 Hacin (H)      5                     100

Perusahaan Kereta Api mempunyai gerbong-gerbong dengan aneka kapasitas
penumpang dan kapasitas bagasi. Gerbong-gerbong dengan kapasitas penumpang dan
bagasi adalah sebagai pada gambar berikut (jumlah penumpang dan kapasitas bagasi
yang dapat diangkut dituliskan pada papan di kereta api)




                                                                                       Namun, beberapa sambungan rusak: dua rumah yang lampunya mati tidak lagi
                                                                                       memiliki listrik! Semua rumah lainnya memilikinya. Listrik dapat disalurkan dari
                                                                                       rumah ke rumah ke segala arah.
Ke-8 keluarga Bebras ini selalu bepergian dengan aturan:
                                                                                       Pertanyaan:
● setiap bebras harus duduk di satu kursi
● seluruh anggota satu keluarga harus bepergian dalam gerbong yang sama,               Setidaknya berapa banyak sambungan antar rumah yang perlu mereka periksa untuk
● bagasi harus dibawa dalam gerbong yang sama dengan bebras pemiliknya, dan            mengetahui dan memastikan bahwa semua sambungan lainnya berfungsi?
● berat bagasinya yang diangkut gerbong tidak boleh lebih dari kapasitas bagasi
    gerbong tersebut.                                                                                          Tulis Sebuah Bilangan Bulat sebagai Jawaban:

## [Latihan-1 h6]

10. Mesin Matematika
Bebras si berang-berang menciptakan Mesin Matematika. Mesin itu menerima sebuah
bilangan sebagai input, dan menghasilkan bilangan lain sebagai output.
Di dalam mesin ada komponen-komponen. Setiap komponen bekerja dengan cara
yang sama. Setiap komponen menerima 3 bilangan sebagai input: B1, B2, dan B3.
Komponen memproses input sebagai berikut:
 • Jika B1 bernilai 1, maka langsung B3 dijadikan output untuk mesin dan selesai.
 • Jika B1 bukan 1:
   o Kurangi B1 dengan 1 dan hasilnya menjadi B1 yang baru.
   o Tambahkan B2 dengan 2, dan hasilnya menjadi B2 yang baru.
   o Tambahkan B2 yang baru di atas, pada B3, dan hasilnya menjadi B3 yang baru.
   o Teruskan B1 baru, B2 baru, B3 baru menjadi input untuk komponen
     berikutnya yang akan memproses dengan aturan yang sama.

Mesin Matematika menerima satu bilangan bulat sebagai input, bilangan itu menjadi
B1 untuk komponen pertama. Sementara, B2 dan B3 untuk komponen pertama ini 1.
Gambar berikut menunjukkan bagaimana Mesin Matematika memproses input
bernilai 2. Kemudian nilai ini mengakibatkan dua komponen bekerja dan komponen
kedua memberikan output 4 yang kemudian menjadi output Mesin Matematika.




Tantangan:
Mesin Matematika memproses input bernilai 4. Berapa output yang dihasilkan?

Pilihan Jawaban:
A) 7      B) 10       C) 16   D) 62
                                      Tulis Satu Huruf Pilihan Jawaban:

# SOURCE Latihan-2 (practice, 4 pages)


## [Latihan-2 h1]

Soal 1 – Hidangan Pembuka

Sofi sedang merencanakan acara special untuk teman-temannya dan ingin memesan nampan besar berisi
hidangan pembuka spesial dari warung makanan favoritnya. Warung tersebut menawarkan empat jenis
hidangan pembuka: Pisang Goreng, Risoles, Perkedel, dan Martabak Mini. Setiap jenis hidangan
memiliki cita rasa unik dan tersedia dalam tiga ukuran: kecil, sedang, dan besar.

Pisang Goreng bisa disajikan dengan pilihan taburan gula halus atau parutan keju. Risoles dibalut dengan
tepung yang renyah dan diisi dengan sayuran serta daging cincang. Perkedel dibuat dari kentang yang
lembut dengan campuran daging cincang, beraroma bawang putih. Martabak Mini memiliki isian bisa
berupa telur atau daging sapi cincang, ditambah taburan daun bawang.

Sofi memiliki beberapa syarat khusus untuk nampan hidangan pembuka yang diinginkannya agar pas untuk
para tamunya. Nampan tersebut harus terdiri dari tepat enam hidangan pembuka, dengan dua hidangan
dari setiap ukuran: dua ukuran kecil, dua ukuran sedang, dan dua ukuran besar. Sofi menginginkan variasi,
sehingga setiap jenis hidangan hanya boleh muncul sekali atau dua kali dalam nampan. Selain itu,
tidak boleh ada dua hidangan dari jenis yang sama dalam ukuran yang sama, misalnya, jika ada dua
Risoles, satu harus berukuran kecil dan yang lain besar (atau sedang). Sofi tidak terlalu mempermasalahkan
taburan gula, keju, isian, atau taburan tambahan.

Tugas Anda:
a. Bantulah Sofi untuk menentukan kombinasi enam hidangan pembuka yang memenuhi syarat nampan
   yang diinginkannya. Cukup sebutkan kombinasi enam hidangan yang Anda usulkan, misalnya “1)
   Pisang goreng – kecil, 2) Risoles – sedang, 3) ...”
b. Berikan penjelasan yang singkat dan jelas yang menunjukkan penalaran Anda dalam menentukan
   kombinasi tersebut.

Petunjuk: Gunakan prinsip-prinsip berpikir komputasional untuk menyelesaikan masalah ini. Ingatlah
untuk menerapkan prinsip abstraksi dengan fokus pada informasi penting, dan dekomposisi untuk
menyederhanakan permasalahan.

## [Latihan-2 h2]

Soal 2 – Perpustakaan Mini

Sebuah Rukun Tetangga (RT) berinisiatif untuk membangun sebuah perpustakaan mini untuk warganya.
Sejauh ini RT tersebut telah menerima sumbangan buku-buku sebagai berikut.
                                                                                    Tahun    Jml.   Warna
 No                    Judul                   Penulis             Penerbit                                  Kode Buku
                                                                                    Terbit   Hal.   Sampul
 1     Bunga di Balik Senja                  Taufik Wijaya   Penerbit Merah Putih   2020     210    Merah
 2     Misteri Pulau Terlarang               Budi Santoso    Pustaka Utama          2024     205    Oranye
 3     Saat Cinta Berbisik                   Taufik Wijaya   Sastra Sejati          2019     270    Ungu
 4     Peti Misterius di Bawah Tangga        Budi Santoso    Pustaka Utama          2020     180    Merah
 5     Kisah Laskar Bintang                  Dewi Lara       Sastra Sejati          2018     150    Ungu
 6     Fisika Sederhana                      R. Ambarwati    Matahari Pustaka       2017     160    Oranye
 7     Biologi Ekosistem Tropis              A. Suryawan     Pustaka Cemerlang      2019     140    Merah
 8     Kimia Lingkungan & Solusinya          A. Suryawan     Matahari Pustaka       2017     310    Hijau
 9     Astronomi untuk Pemula                Bambang P.      Pustaka Cemerlang      2020     190    Ungu
 10    Pengantar Berpikir Komputasional      M. Rian         Matahari Pustaka       2019     175    Oranye
 11    Ekologi dan Keberlanjutan             A. Suryawan     Ilmu Nusantara         2020     340    Merah
 12    Inovasi Seni dan Teknologi            R. Ambarwati    Pustaka Cemerlang      2018     360    Merah
 13    Musik Tradisional Jawa                Diah Lestari    Harmoni Publishing     2017     320    Oranye
 14    Fotografi Modern Indonesia            Rizky Fauzan    Pustaka Cemerlang      2019     210    Ungu
 15    Teater Kontemporer                    S. Nugraha      Harmoni Publishing     2018     250    Merah
 16    Tekstil Tradisional Indonesia         Diah Lestari    Ilmu Nusantara         2018     280    Oranye
 17    Sejarah Seni Kriya Sunda              Diah Lestari    Harmoni Publishing     2020     390    Hijau
 18    Kerajaan-Kerajaan Maritim Nusantara   Agus S.         Ilmu Nusantara         2017     420    Hijau
       Linimasa Perjuangan Rakyat
 19                                          Abdullah S.     Pustaka Cemerlang      2024     435    Oranye
       Palestina
 20    Detik-Detik Kemerdekaan Indonesia     Bambang P.      Ilmu Nusantara         2019     410    Oranye


Di masa yang akan datang, diharapkan akan semakin banyak warga yang menyumbangkan buku. Untuk
memudahkan para pengguna perpustakaan mencari buku, buku-buku tersebut akan dikelompokkan
berdasarkan kriteria-kriteria tertentu secara hierarkis. Setelah dikelompokkan, setiap buku akan diberikan
kode unik yang juga mencerminkan hierarki kelompok buku tersebut. Bantulah perpustakaan ini untuk
membuat pengelompokan hierarkis buku berdasarkan buku-buku yang sudah dimiliki di atas, sembari tetap
memperhatikan kemungkinan buku baru di masa yang akan datang.

Tugas Anda:
a. Tuliskan sistem klasifikasi hierarkis yang Anda rancang.
b. Berikan penjelasan yang singkat dan jelas yang menjelaskan penalaran Anda dalam menentukan
   klasifikasi tersebut.
c. Berdasarkan klasifikasi tersebut, berikan kode unik untuk setiap buku (tuliskan langsung di kolom
   kode buku di atas).

Petunjuk: Anda dapat menggunakan pengetahuan umum untuk mengidentifikasi kesamaan karakter dari
item-item di atas dalam melakukan pengelompokan.

## [Latihan-2 h3]

Soal 3 – Petualangan Robot Rody

Robot Rody ditugaskan untuk pergi ke rumah teman-teman Eddie, seperti Pororo. Untuk mencapai tempat-
tempat itu, Rody harus menempuh berbagai terrain (medan) dan bergerak mengikuti terrain ini. Untuk
melakukan hal tersebut, Rody dilengkapi dengan sejumlah perintah berikut.

 Perintah                  Arti
 up                        Bergerak ke atas 1 langkah
 down                      Bergerak ke bawah 1 langkah
 walk                      Berjalan ke depan 1 langkah
 repeat n                  Mengulang perintah sebanyak n kali. Asumsikan: n >= 0. Jika n = 0, maka
        perintah           perintah tidak dilakukan sama sekali.
                           Parameter perintah pada perintah repeat terdiri atas perintah-perintah yang
                           bisa dijalankan oleh robot dan bisa terdiri atas lebih dari 1 perintah.

                              Misalnya untuk menempuh terrain di samping, untuk berpindah dari posisi
                              kiri ke kanan, Rody harus melakukan urutan perintah berikut (asumsi daerah
                              berarsir tidak bisa dilewati Rody).

                              up
                              walk
       kiri        kanan      down

Bentuk terrain ditentukan oleh ketinggian terrain yang dinyatakan dengan bilangan n (n > 0). Berikut adalah
beberapa contoh terrain yang dibentuk oleh ketinggiannya.




                  n=1             n=2                                 n=5

Harap diingat, masih dimungkinkan nilai n yang lain.

Tugas Anda: Jika diberikan nilai n dengan n > 0 yang menyatakan ketinggian terrain yang harus ditempuh
Rody dalam perjalanannya, tuliskan perintah yang harus dilakukan Rody untuk melewati terrain (asumsi
terrain tidak bisa ditembus) dari sisi kiri terrain ke sisi kanannya.

Rangkaian perintah dituliskan dalam urutan dituliskan ke bawah, dan dapat dikombinasikan dengan
indentasi untuk memperjelas penulisan. Lihat contoh di atas.

## [Latihan-2 h4]

Soal 4 – Tiket Taman Hiburan

Pak Omar sedang merencanakan perjalanan sekolah ke sebuah taman hiburan. Taman hiburan tersebut
memiliki harga tiket yang berbeda untuk siswa (umur 17 atau lebih muda) dan dewasa. Harga tiket siswa
adalah Rp. 100.000, sedangkan harga tiket dewasa adalah Rp. 150.000. Jika total biaya tiket lebih dari Rp.
1.000.000, pengelola taman hiburan tersebut akan memberikan potongan harga sebesar 10%. Pengelola
taman hiburan juga memiliki ketentuan bahwa setiap rombongan siswa harus didampingi minimal satu
orang dewasa.

Pak Omar memiliki daftar umur semua peserta, tapi perlu bantuan untuk menghitung berapa total biaya
tiket dan untuk memeriksa apakah ada minimal satu orang dewasa sebagai pendamping.

Bantulah Pak Omar dalam merencanakan perjalanan ke taman hiburan tersebut. Tulislah sebuah program
Python yang melakukan hal-hal berikut:
1. Menerima input umur peserta dari pengguna dan memasukkan ke sebuah array (list) of integer. Untuk
   menyederhanakan, peserta selalu berjumlah 10.
2. Menghitung dan menampilkan total biaya tiket.
3. Melakukan pemeriksaan apakah ada minimal satu orang peserta dewasa. Jika ada, tampilkan pesan
   “Ada pendamping orang dewasa”. Jika tidak ada, tampilkan “Tidak ada pendamping orang dewasa”.

Contoh tampilan program:

Masukkan umur peserta ke-1: 12
Masukkan umur peserta ke-2: 21
Masukkan umur peserta ke-3: 10
Masukkan umur peserta ke-4: 18
Masukkan umur peserta ke-5: 13
Masukkan umur peserta ke-6: 9
Masukkan umur peserta ke-7: 11
Masukkan umur peserta ke-8: 15
Masukkan umur peserta ke-9: 10
Masukkan umur peserta ke-10: 12

Total biaya tiket: Rp. 990000
Ada pendamping orang dewasa

# SOURCE Mock_AcadsFTI25 (practice, 8 pages)


## [Mock_AcadsFTI25 h1]

        Mock Up UTS
WI1102 Berpikir Komputasional
       Disusun Oleh: Acads FTI 25

> (little or no text layer: read the page image app/public/pages/Mock_AcadsFTI25/001.jpg)

## [Mock_AcadsFTI25 h2]

Mock Up UTS Berpikir Komputasional ​       ​      Nama:​ ​       ​      NIM:



Bagian A: Pilihan Ganda
Materi: Dampak Komputasi
  1.​ Berikut ini yang termasuk ke dalam netiquette and messaging etiquette adalah,
      kecuali:
          a.​ Keep it short
          b.​ Keep your cool
          c.​ Assume you are anonymous
          d.​ Say what you mean

   2.​ Perhatikan gambar berikut:




       Gambar berikut merupakan salah satu dampak dari automation yang disebut…
         a.​ Humanless factory
         b.​ AI factory
         c.​ Dark factory
         d.​ 24-hour factory

   3.​ Negara dengan software piracy rate tertinggi adalah…
          a.​ Libya
          b.​ Sri Lanka
          c.​ Venezuela
          d.​ Bolivia

   4.​ Fungsi utama dari HAKI (Hak atas Kekayaan Intelektual) adalah
          a.​ Melindungi simbol, gambar, suara, warna, dan bau
          b.​ Melindungi buku, lagu, penampilan panggung, lukisan, foto, dan film
          c.​ Melindungi rahasia-rahasia perdagangan
          d.​ Hasil aktivitas intelektual dalam bidang seni, sains, dan industri

   5.​ Undang-undang yang membahas tentang kebebasan untuk berbicara di media sosial
       dengan bertanggung jawab adalah…
          a.​ UU ITE No. 22 tahun 2012
          b.​ UU ITE No. 11 tahun 2008

## [Mock_AcadsFTI25 h3]

Mock Up UTS Berpikir Komputasional ​        ​       Nama:​ ​     ​      NIM:

          c.​ UU ITE No. 33 tahun 2019
          d.​ UU ITE No. 01 tahun 2021

   6.​ Berikut pernyataan yang tepat antara proprietary software dan free software adalah…
          a.​ Proprietary software tidak gratis digunakan dan tidak bebas dimodifikasi,
              sedangkan free software gratis digunakan namun tidak bebas dimodifikasi
          b.​ Proprietary software gratis digunakan namun tidak bebas dimodifikasi,
              sedangkan free software tidak gratis digunakan dan tidak bebas dimodifikasi
          c.​ Proprietary software gratis digunakan namun tidak bebas dimodifikasi,
              sedangkan free software gratis digunakan dan bebas dimodifikasi
          d.​ Proprietary dan free software bebas dimodifikasi dan gratis digunakan

   7.​ Perhatikan terms serta definisnya berikut:
       A. Social               1. Berpura-pura menjadi orang lain dan melakukan
       engineering             tindakan-tindakan yang bersifat mengganggu

       B. Spoofing             2. Mendapatkan cara-cara penipuan untuk mendapatkan
                               informasi yang bersifat sensitif dari orang lain

       C. Phishing             3. Mendapatkan informasi penting dengan berpura-pura
                               menjadi suatu pihak yang terpercaya secara online

      Pasangan yang tepat adalah:
         a.​ A1, B2, C3
         b.​ A2, B3, C1
         c.​ A2, B1, C3
         d.​ A3, B1, C2

   8.​ Berikut ini yang merupakan jenis virus yang menyerang dengan menginstruksikan
       pengguna untuk meng-klik tautan dan menyerang dokumen JPEG, JPG, dan dokumen
       sejenis, bernama…
           a.​ Iloveyou
           b.​ Ransomware
           c.​ Code Red
           d.​ CryptoLocker

   9.​ Bentuk gerakan politik, yang umumnya dilakukan menjelang pemilu, dengan
       menggunakan teknologi untuk membentuk opini publik disebut dengan…
          a.​ Gerrymandering
          b.​ Grassroot movement
          c.​ Serangan fajar

## [Mock_AcadsFTI25 h4]

Mock Up UTS Berpikir Komputasional ​         ​       Nama:​ ​       ​       NIM:

          d.​ Black campaign

   10.​“Computational intelligence is the study of the design of intelligence agents”, definisi
       diatas merupakan definisi AI melalui pendekatan…
           a.​ Thinking humanly
           b.​ Acting humanly
           c.​ Thinking rationally
           d.​ Acting rationally

   11.​Konsep dari firewall sebagai teknologi keamanan komputer adalah dengan…
          a.​ Mendeteksi potensi kebocoran keamanan
          b.​ Memantau dan menyimpan transaksi komputer sehingga dapat diketahui jejak
              aktivitasnya
          c.​ Bentuk transmisi data dalam bentuk acak untuk mengamankan dalam proses
              pengiriman
          d.​ Menjaga akses tidak terautorisasi terhadap jaringan internal

   12.​Perhatikan gambar berikut




      Gambar diatas merupakan pemanfaatan AI yang disebut sebagai…
        a.​ Traffic pattern
        b.​ Path finding
        c.​ Fastest route determination
        d.​ Time estimation

   13.​Berikut ini salah satu cara menghindari kecanduan dan kekerasan di media sosial
       adalah…
          a.​ Membicarakan masalah secara langsung dan tidak di sosial media

## [Mock_AcadsFTI25 h5]

Mock Up UTS Berpikir Komputasional ​        ​      Nama:​ ​       ​       NIM:

          b.​ Memutus hubungan dengan keluarga dan teman
          c.​ Menghabiskan 25 jam per minggu untuk media digital
          d.​ Mengurangi kegiatan-kegiatan sosial seperti unit kegiatan, himpunan, club,
              dan sebagainya

   14.​Berdasarkan sejarah AI, salah satu hal yang terjadi ketika periode The First Burst
       adalah…
          a.​ Munculnya sistem bernama XCON yang dibuat oleh Carnegie Mellon
              University
          b.​ Deep blue milik IBM yang bisa mengalahkan manusia dalam pertandingan
              catur
          c.​ Berkembangnya Apple Siri, Google Driverless, dan Alpha Go
          d.​ Munculnya robot humanoid biasa yang dapat memainkan musik

   15.​Bentuk pemanfaatan OpenAI pada Dota 2 adalah sebagai…
          a.​ Platform untuk mengotomatisasi pembuatan item dan script cheat dalam Dota
              2 supaya pemain bisa menang lebih mudah
          b.​ Penyedia server publik bagi pemain Dota 2 supaya dapat bermain secara
              bersama dengan algoritma AI
          c.​ Bot yang dilatih melalui reinforcement learning untuk bermain Dota 2 yang
              mampu menghadapi dan bahkan mengalahkan pemain manusia
          d.​ Editor peta (map editor) alternatif agar komunitas dapat membuat peta baru
              untuk Dota 2

## [Mock_AcadsFTI25 h6]

Mock Up UTS Berpikir Komputasional ​          ​   Nama:​ ​     ​      NIM:



Bagian B: Esai
Materi: Berpikir Komputasional termasuk pemrograman Python
  1.​ Buatlah kode pemrograman Python untuk membantu Rafa menentukan luas sebuah
      kamar kos berbentuk trapesium sama sisi dengan diketahui panjang sisi sejajar!

   2.​ Buatlah kode pemrograman Python untuk menampilkan angka 1 hingga 50 dan juga
       menghitung hasil penjumlahan angka dari 1 hingga 50 (1+2+3+.....+49+50)!

   3.​ Tentukan output dari program Python berikut:
       numbers = list(range(1, 11))
       total = 0
       count = 0
       for n in numbers:
          total += n
          count += 1
       b = total / count
       print(b)

   4.​ Tentukan output dari program berikut apabila user memasukkan angka 9!
       n = int(input("Enter the number: "))

       r=0
       k=1
       count = 1

       while count < n:
         a=r+k
         r=k
         k=a
         count += 1

       print(k)

   5.​ Buatlah flowchart berdasarkan deskripsi berikut:
               Kepala Sekolah sebuah SMA ingin mendapatkan rata-rata tinggi badan siswa
       di suatu kelas. Untuk itu, dia memanggil semua siswa di kelas itu dan
       mengumpulkannya di ruang UKS untuk diukur tinggi badannya satu per satu. Karena
       tidak tahu banyaknya siswa dalam kelas, Kepala Sekolah berniat menghitungnya
       sambil mengukur tinggi badan siswa. Tinggi badan siswa diukur dalam satuan cm dan
       dengan pengamatan sekilas, bisa diketahui bahwa tidak ada siswa yang tingginya
       kurang dari 100 cm atau lebih dari 200 cm.

## [Mock_AcadsFTI25 h7]

           Seorang guru membantu Kepala Sekolah mengukur tinggi badan dan
   mencatatnya. Guru ini agak ceroboh sehingga sering memasukkan data yang salah.
   Data berat badan yang salah, yaitu kurang dari 100 cm atau lebih besar dari 200 cm,
   tidak digunakan untuk menghitung tinggi rata-rata.

           Buatlah flowchart yang membantu Kepala Sekolah sebagai panduan untuk
   menghitung tinggi rata-rata siswa di kelas, dimana diketahui input adalah sejumlah
   bilangan bulat yang mewakili tinggi mahasiswa. Pembacaan input diakhiri dengan
   memasukkan nilai -999 (tidak termasuk diproses). Selanjutnya hasil merupakan tinggi
   rata-rata siswa di kelas berdasarkan data yang diinputkan, tanpa memperhitungkan
   data yang salah input (yaitu jika nilai < 100 cm atau > 200 cm). Jika tidak ada data
   yang bisa digunakan untuk menghitung tinggi rata-rata, buat pesan “Tidak ada data”.


6.​ Jelaskan mengapa kemampuan berpikir komputasional merupakan skill yang penting
    utamanya di abad 21!​

## [Mock_AcadsFTI25 h8]

Jawaban Soal Pilihan Ganda:
   1.​ C
   2.​ C
   3.​ B
   4.​ D
   5.​ B
   6.​ A
   7.​ C
   8.​ A
   9.​ D
   10.​D
   11.​D
   12.​A
   13.​A
   14.​D
   15.​C

# SOURCE Mock_Gemini (practice, 5 pages)


## [Mock_Gemini h1]

             MOCK UP UJIAN TENGAH SEMESTER (UTS)
                          WI1102 BERPIKIR KOMPUTASIONAL



BAGIAN A: Pilihan Ganda
Materi: Dampak Komputasi (Computing Impacts) *dari PPT

  1. Sebuah sekolah ingin menerapkan metode pembelajaran di mana siswa belajar melalui
     video game sejarah yang interaktif. Konsep ini dikenal sebagai...

      a. Digital Classroom
      b. Gamification / Edutainment
      c. Remote Learning
      d. Social Engineering

  2. Analisislah dampak otomatisasi industri berikut. Manakah pernyataan yang paling tepat
     menggambarkan pergeseran tren tenaga kerja akibat Artificial Intelligence?

      a. Jumlah pekerjaan meningkat karena mesin membutuhkan lebih banyak operator ma-
         nual.
      b. Pekerjaan rutin dan repetitif berkurang, namun permintaan untuk skill analisis dan
         kreatif meningkat.
      c. Semua pekerjaan manusia akan digantikan oleh robot dalam 5 tahun ke depan.
      d. Industri akan kembali ke metode manual karena biaya AI terlalu mahal.

  3. Seseorang menggunakan foto dan data pribadi orang lain untuk membuat akun media
     sosial palsu dan melakukan penipuan. Tindakan kriminal ini dikategorikan sebagai...

      a. Cyberbullying
      b. Identity Theft (Pencurian Identitas)
      c. Digital Divide
      d. Plagiarisme

  4. Menurut UU ITE dan etika siber, apa langkah pertama yang harus dilakukan jika Anda
     menemukan berita yang provokatif dan belum jelas kebenarannya di grup WhatsApp
     keluarga?

      a. Langsung meneruskannya (forward) ke grup lain agar orang waspada.
      b. Membiarkannya saja agar tidak terjadi konflik.
      c. Melakukan verifikasi kebenaran (fact-checking) sebelum memutuskan untuk memba-
         gikan atau meluruskannya.
      d. Menyimpannya sebagai arsip pribadi.




                                            1

## [Mock_Gemini h2]

 5. Dalam konteks Generative AI (seperti ChatGPT atau Midjourney), isu etika apa yang
    paling sering diperdebatkan terkait hak cipta?

      a. AI tidak bisa bekerja tanpa listrik.
      b. AI menggunakan data karya seniman/penulis asli sebagai data latih tanpa izin atau
         kompensasi.
      c. Hasil karya AI selalu lebih jelek daripada manusia.
      d. AI akan mengambil alih dunia militer.

 6. Apa fungsi utama dari Netiquette dalam komunikasi digital?

      a. Sebagai hukum formal yang mengikat secara pidana.
      b. Sebagai panduan tata krama tidak tertulis untuk menjaga kenyamanan dan kesopan-
         an di ruang digital.
      c. Untuk meningkatkan kecepatan koneksi internet.
      d. Untuk membatasi kebebasan berpendapat secara total.

 7. Teknologi Smart Grid dalam sistem tenaga listrik merupakan contoh penerapan komputasi
    untuk...

      a. Mengganti semua kabel listrik dengan nirkabel.
      b. Mengelola distribusi daya secara efisien dan otomatis berdasarkan data real-time.
      c. Menurunkan tegangan listrik secara permanen.
      d. Menghapus kebutuhan akan pembangkit listrik.

 8. Manakah yang bukan merupakan karakteristik dari Computational Thinking?

      a. Mampu memecah masalah besar menjadi bagian-bagian kecil.
      b. Mampu berpikir seperti komputer (biner 0 dan 1) secara harfiah.
      c. Mampu mengenali pola dari masalah yang pernah diselesaikan sebelumnya.
      d. Mampu mengabstraksi detail yang tidak perlu.

 9. Dalam pendekatan AI, mesin yang dirancang untuk bertindak sebaik mungkin untuk men-
    capai tujuan tertentu (optimalisasi hasil) dikategorikan sebagai...

      a. Thinking Humanly
      b. Acting Humanly
      c. Thinking Rationally
      d. Acting Rationally

10. Salah satu dampak negatif dari algoritma media sosial yang terlalu personal (personalized
    feed) adalah terciptanya Echo Chamber. Apa maksudnya?

      a. Pengguna hanya terpapar pada informasi yang membenarkan opini mereka sendiri,
         sehingga menutup pandangan terhadap perspektif lain.
      b. Pengguna mendengar suara gema saat memutar video.
      c. Pengguna mendapatkan terlalu banyak iklan.
      d. Pengguna kehilangan data pribadi mereka.




                                                2

## [Mock_Gemini h3]

11. Praktik Grooming di internet biasanya menargetkan korban yang...

     a. Memiliki keamanan siber yang kuat.
     b. Berusia muda atau dalam kondisi rentan secara emosional.
     c. Tidak memiliki akun media sosial.
     d. Menggunakan perangkat lunak bajakan.

12. Dalam bidang Geofisika, komputasi digunakan untuk memproses data Remote Sensing.
    Apa tujuannya?

     a. Membuat peta manual dengan tangan.
     b. Memantau perubahan lingkungan, cuaca, dan potensi bencana dari jarak jauh meng-
        gunakan data satelit/sensor.
     c. Mengontrol pergerakan lempeng bumi.
     d. Mengirim astronaut ke bulan.

13. Undang-Undang No. 27 Tahun 2022 di Indonesia secara spesifik mengatur tentang...

     a. Hak Cipta Digital.
     b. Transaksi E-Commerce.
     c. Pelindungan Data Pribadi (PDP).
     d. Kejahatan Perbankan.

14. Apa yang dimaksud dengan Algorithmic Bias (Bias Algoritma)?

     a. Algoritma yang berjalan sangat lambat.
     b. Kesalahan sistematis dalam sistem komputer yang menciptakan hasil yang tidak adil
        bagi kelompok orang tertentu (misal: ras atau gender).
     c. Algoritma yang hanya bisa memproses angka genap.
     d. Bias tegangan pada rangkaian listrik komputer.

15. Manakah contoh penerapan Internet of Things (IoT) di rumah tangga?

     a. Menggunakan Excel untuk mencatat keuangan.
     b. Kulkas pintar yang bisa mendeteksi stok makanan habis dan mengirim notifikasi ke
        HP pemiliknya.
     c. Bermain game offline di PC.
     d. Menonton TV melalui antena analog.




                                            3

## [Mock_Gemini h4]

BAGIAN B: Esai
Materi: Berpikir Komputasional dan Pemrograman Python

  1. (Analisis Studi Kasus CT) Bayangkan Anda diminta merancang sistem ”Lampu Lalu
     Lintas Cerdas” di sebuah persimpangan empat arah yang sering macet. Lampu tidak lagi
     sekadar menggunakan timer tetap (merah 60 detik, hijau 30 detik), tetapi harus adaptif.

        • Gunakan Dekomposisi untuk memecah masalah ini menjadi 3 sub-komponen utama.
        • Gunakan Abstraksi untuk menentukan data apa saja yang penting diambil oleh sensor
          (misal: kamera/sensor berat) dan data apa yang harus diabaikan agar sistem efisien.

  2. (Desain Algoritma & Flowchart) Buatlah Flowchart untuk sistem ATM Sederhana dengan
     logika sebagai berikut:

      (a) Pengguna memasukkan PIN. Jika salah, beri kesempatan ulang maksimal 3 kali total.
          Jika 3 kali salah, kartu diblokir dan selesai.
      (b) Jika PIN benar, tampilkan menu: (1) Cek Saldo, (2) Tarik Tunai, (3) Keluar.
       (c) Pada menu Tarik Tunai: Cek apakah saldo mencukupi? Jika ya, kurangi saldo dan
           keluarkan uang. Jika tidak, tampilkan ”Saldo Tidak Cukup”.

      *Gambarkan alur percabangan (decision) dan pengulangan (looping) dengan jelas.*

  3. (Analisis Kode & Debugging) Perhatikan potongan kode Python berikut yang bertujuan
     menghitung rata-rata dari sekumpulan nilai yang diinput pengguna. Kode ini memiliki
     dua kesalahan logika/runtime (bukan sekadar *syntax error*). Temukan kesalahannya,
     jelaskan penyebabnya, dan tuliskan perbaikannya!
  1   jumlah_data = input (" Masukkan jumlah data: ")
  2   total = 0
  3
  4   for i in range ( jumlah_data ):
  5       nilai = input (" Masukkan nilai ke -" + str(i+1) + ": ")
  6       total = total + nilai
  7

  8   rata_rata = total / jumlah_data
  9   print ("Rata -rata adalah : " + rata_rata )


  4. (Coding: Logika Kondisional Bertingkat) Buatlah program Python untuk menghitung
     Biaya Parkir Progresif di sebuah mall dengan aturan:

        • Biaya 1 jam pertama: Rp 5.000.
        • Biaya jam berikutnya (jam ke-2 s.d jam ke-5): Rp 3.000 per jam.
        • Biaya jam ke-6 dan seterusnya: Rp 2.000 per jam.
        • Jika total parkir lebih dari 12 jam, dikenakan denda tambahan Rp 50.000.
        • Maksimal biaya parkir per hari (sebelum denda) adalah Rp 100.000.

      Input: Durasi parkir (integer jam). Output: Total biaya.




                                              4

## [Mock_Gemini h5]

5. (Coding: Nested Loop & Pattern) Buatlah program Python yang menerima input bilangan
   ganjil N (misal N = 5). Program harus mencetak pola Jam Pasir (Hourglass) menggunakan
   karakter bintang ‘*‘.
  Contoh jika Input N = 5:

  *****
   ***
    *
   ***
  *****

  *Gunakan nested loop (for di dalam for).*

6. (Coding: Array & Logika Pencarian) Anda memiliki sebuah array yang berisi daftar harga
   barang di keranjang belanja:
   harga = [15000, 50000, 2500, 50000, 30000, 15000, 10000]
   Buatlah sebuah fungsi bernama AnalisisBelanja(arr) yang mengembalikan dua infor-
   masi:

   (a) Harga barang termahal (jika ada kembar, ambil salah satu).
   (b) Barang termahal kedua (Second Largest). Hati-hati jika angka termahal muncul dua
       kali, barang termahal kedua haruslah angka yang lebih kecil dari barang termahal
       utama.

  *Dilarang menggunakan fungsi built-in seperti sort(), max(), atau set(). Gunakan
  algoritma iterasi manual.*




                                          5

# SOURCE Mock_Pengkom (practice, 10 pages)


## [Mock_Pengkom h1]



> (little or no text layer: read the page image app/public/pages/Mock_Pengkom/001.jpg)

## [Mock_Pengkom h2]

            Ujian Tengah Semester
        Pengenalan Komputasi - Stream
                Pemrograman

                        Tanggal: April 27, 2024


Instruksi:

1. Kerjakan soal dengan jujur dan teliti.
2. Gunakan Bahasa Indonesia yang baik dan benar.
3. Waktu pengerjaan 120 menit.




                                     2

## [Mock_Pengkom h3]

UTS Pengenalan Komputasi - Stream Pemrograman          Nama:                    NIM:


Bagian A: Pilihan Ganda (Non-coding)
Petunjuk: Pilihlah satu jawaban yang paling tepat.

  1. Perangkat yang termasuk dalam kategori computing device adalah ...

      (a) Lampu
      (b) Kulkas
      (c) Smartphone
      (d) AC

  2. Perangkat lunak yang berfungsi sebagai antarmuka antara pengguna dan perangkat
     keras adalah ...

      (a) Word processor
      (b) Web browser
      (c) Sistem operasi
      (d) Spreadsheet

  3. Berikut ini yang bukan merupakan contoh input device adalah ...

      (a) Keyboard
      (b) Mouse
      (c) Scanner
      (d) Monitor

  4. Perangkat keras yang bertugas melakukan operasi aritmatika dan logika adalah ...

      (a) Hard disk
      (b) RAM
      (c) CPU
      (d) Motherboard

  5. Software yang dirancang untuk merusak sistem komputer disebut ...

      (a) Malware
      (b) Firmware
      (c) Freeware
      (d) Shareware

  6. Protokol yang digunakan untuk mengakses website adalah ...

      (a) HTTP
      (b) FTP
      (c) SMTP
      (d) TCP/IP

                                    Halaman 3

## [Mock_Pengkom h4]

UTS Pengenalan Komputasi - Stream Pemrograman           Nama:                   NIM:


  7. Jaringan komputer yang cakupannya terbatas pada area geografis yang kecil disebut
     ...

      (a) LAN
     (b) MAN
      (c) WAN
     (d) Internet

  8. Berikut ini yang merupakan ancaman terhadap privasi di dunia digital adalah ...

      (a) Phishing
     (b) Spam
      (c) Cyberbullying
     (d) Semua jawaban benar

  9. Green computing adalah ...

      (a) Konsep penggunaan teknologi komputasi yang ramah lingkungan
     (b) Penggunaan komputer untuk mempelajari lingkungan
      (c) Penggunaan komputer untuk bertani
     (d) Software untuk mengelola limbah

 10. Hak cipta termasuk dalam kategori ...

      (a) HAKI
     (b) HAM
      (c) UU ITE
     (d) Hak Paten

 11. Perangkat lunak yang kode sumbernya terbuka dan dapat dimodifikasi disebut ...

      (a) Proprietary software
     (b) Freeware
      (c) Open-source software
     (d) Shareware

 12. Berikut ini yang bukan merupakan contoh output device adalah ...

      (a) Monitor
     (b) Printer
      (c) Speaker
     (d) Keyboard

 13. Cybersecurity adalah ...

      (a) Keamanan dalam berselancar di dunia maya

                                     Halaman 4

## [Mock_Pengkom h5]

UTS Pengenalan Komputasi - Stream Pemrograman           Nama:                     NIM:


     (b) Perlindungan sistem komputer dan jaringan dari serangan digital
      (c) Software antivirus
     (d) Firewall

 14. Berikut ini yang bukan merupakan pilar berpikir komputasional adalah ...

     (a) Dekomposisi
     (b) Abstraksi
      (c) Pengenalan pola
     (d) Pemrograman

 15. Membagi masalah besar menjadi sub-masalah yang lebih kecil disebut ...

     (a) Abstraksi
     (b) Dekomposisi
      (c) Algoritma
     (d) Generalisasi

 16. Mengidentifikasi persamaan karakteristik dari berbagai masalah disebut ...

     (a) Abstraksi
     (b) Dekomposisi
      (c) Algoritma
     (d) Pengenalan pola

 17. Menyederhanakan suatu masalah dengan menghilangkan detail yang tidak penting
     disebut ...

     (a) Abstraksi
     (b) Dekomposisi
      (c) Algoritma
     (d) Generalisasi

 18. Menemukan solusi umum yang dapat diterapkan pada berbagai masalah sejenis
     disebut ...

     (a) Abstraksi
     (b) Dekomposisi
      (c) Algoritma
     (d) Generalisasi

 19. Rangkaian instruksi langkah-demi-langkah untuk menyelesaikan suatu masalah dise-
     but ...

     (a) Abstraksi
     (b) Dekomposisi

                                     Halaman 5

## [Mock_Pengkom h6]

UTS Pengenalan Komputasi - Stream Pemrograman        Nama:               NIM:


      (c) Algoritma
     (d) Generalisasi

 20. Flowchart adalah ...

      (a) Representasi grafis dari suatu algoritma
     (b) Bahasa pemrograman
      (c) Sistem operasi
     (d) Software aplikasi

 21. Pseudocode adalah ...

      (a) Representasi teks dari suatu algoritma
     (b) Bahasa pemrograman
      (c) Sistem operasi
     (d) Software aplikasi

 22. Sequence dalam algoritma berarti ...

      (a) Pengulangan instruksi
     (b) Pemilihan instruksi
      (c) Urutan instruksi
     (d) Pengelompokkan instruksi

 23. Selection dalam algoritma berarti ...

      (a) Pengulangan instruksi
     (b) Pemilihan instruksi
      (c) Urutan instruksi
     (d) Pengelompokkan instruksi

 24. Iteration dalam algoritma berarti ...

      (a) Pengulangan instruksi
     (b) Pemilihan instruksi
      (c) Urutan instruksi
     (d) Pengelompokkan instruksi

 25. Struktur data yang menyimpan sekumpulan elemen dengan tipe data yang sama
     adalah ...

      (a) Array
     (b) List
      (c) Tuple
     (d) Dictionary


                                      Halaman 6

## [Mock_Pengkom h7]

UTS Pengenalan Komputasi - Stream Pemrograman            Nama:        NIM:


 26. Setiap elemen dalam array diakses menggunakan ...

      (a) Nama variabel
     (b) Indeks
      (c) Tipe data
     (d) Nilai elemen

 27. Nested loop adalah ...

      (a) Loop di dalam loop
     (b) Loop yang berulang sebanyak 2 kali
      (c) Loop yang tidak pernah berhenti
     (d) Loop yang menggunakan array

 28. Proses pencarian suatu elemen dalam array disebut ...

      (a) Sorting
     (b) Searching
      (c) Indexing
     (d) Looping

 29. Proses mengurutkan elemen dalam array disebut ...

      (a) Sorting
     (b) Searching
      (c) Indexing
     (d) Looping

 30. Function dalam pemrograman adalah ...

      (a) Blok kode yang dapat digunakan kembali
     (b) Variabel
      (c) Tipe data
     (d) Loop

 31. Procedure dalam pemrograman adalah ...

      (a) Blok kode yang dapat digunakan kembali
     (b) Variabel
      (c) Tipe data
     (d) Loop

 32. Berikut ini yang bukan merupakan bahasa pemrograman adalah ...

      (a) Python
     (b) HTML

                                     Halaman 7

## [Mock_Pengkom h8]

UTS Pengenalan Komputasi - Stream Pemrograman        Nama:                   NIM:


      (c) Java
      (d) C++

 33. Interpreter adalah ...

      (a) Software yang menerjemahkan kode program baris demi baris
      (b) Software yang menerjemahkan seluruh kode program sekaligus
      (c) Bahasa pemrograman
      (d) Sistem operasi

 34. Compiler adalah ...

      (a) Software yang menerjemahkan kode program baris demi baris
      (b) Software yang menerjemahkan seluruh kode program sekaligus
      (c) Bahasa pemrograman
      (d) Sistem operasi

 35. Paradigma pemrograman yang berfokus pada objek dan interaksinya disebut ...

      (a) Pemrograman prosedural
      (b) Pemrograman berorientasi objek
      (c) Pemrograman fungsional
      (d) Pemrograman logika

 36. Paradigma pemrograman yang berfokus pada fungsi dan komposisinya disebut ...

      (a) Pemrograman prosedural
      (b) Pemrograman berorientasi objek
      (c) Pemrograman fungsional
      (d) Pemrograman logika

 37. Pemrograman yang menggunakan representasi visual untuk membangun program
     disebut ...

      (a) Pemrograman visual
      (b) Pemrograman prosedural
      (c) Pemrograman berorientasi objek
      (d) Pemrograman fungsional

 38. Software yang dirancang untuk mengolah angka dan melakukan perhitungan dise-
     but ...

      (a) Word processor
      (b) Spreadsheet
      (c) Database
      (d) Presentation software

                                   Halaman 8

## [Mock_Pengkom h9]

UTS Pengenalan Komputasi - Stream Pemrograman          Nama:                      NIM:


 39. Software yang dirancang untuk mengelola dan mengorganisir data disebut ...

     (a) Word processor
     (b) Spreadsheet
     (c) Database
     (d) Presentation software

 40. Software yang dirancang untuk membuat presentasi visual disebut ...

     (a) Word processor
     (b) Spreadsheet
     (c) Database
     (d) Presentation software




                                    Halaman 9

## [Mock_Pengkom h10]

UTS Pengenalan Komputasi - Stream Pemrograman            Nama:                  NIM:


Bagian B: Isian Singkat
Petunjuk: Jawablah pertanyaan berikut dengan singkat dan jelas.

  1. Sebutkan 3 (tiga) tipe data dasar dalam Python dan berikan masing-masing 1 (satu)
     contoh.
  2. Sebutkan 2 (dua) jenis operator dalam Python dan berikan masing-masing 1 (satu)
     contoh.
  3. Jelaskan fungsi dari perintah ‘input()‘ dan ‘print()‘ dalam Python.
  4. Tuliskan sintaks percabangan ‘if-else‘ dalam Python.
  5. Tuliskan sintaks perulangan ‘for‘ dalam Python.
  6. Tuliskan sintaks perulangan ‘while‘ dalam Python.
  7. Jelaskan perbedaan antara compiler dan interpreter.
  8. Sebutkan 2 (dua) paradigma pemrograman selain pemrograman prosedural.
  9. Tuliskan kode program Python untuk menghitung luas persegi panjang dengan
     panjang 5 cm dan lebar 3 cm.
 10. Tuliskan kode program Python untuk menentukan apakah suatu bilangan genap
     atau ganjil.


Bagian C: Essay
Petunjuk: Kerjakan soal berikut dengan menuliskan kode program Python yang lengkap
dan benar.

  1. Buatlah program untuk menghitung luas lingkaran dengan jari-jari yang diinput
     oleh pengguna.
       • Gunakan nilai pi = 3.14159.
       • Tampilkan luas lingkaran ke layar.
  2. Buatlah program untuk menentukan bilangan terbesar dari 3 (tiga) bilangan yang
     diinput oleh pengguna.
  3. Buatlah program untuk menghitung faktorial dari suatu bilangan yang diinput oleh
     pengguna.
  4. Buatlah program untuk mencetak deret Fibonacci hingga suku ke-n, dengan n
     diinput oleh pengguna.
  5. Buatlah program untuk mencari suatu bilangan dalam array yang diinput oleh
     pengguna.
       • Jika bilangan ditemukan, tampilkan indeksnya.
       • Jika tidak ditemukan, tampilkan pesan ”Bilangan tidak ditemukan”.


                                     Halaman 10

# SOURCE TUBAY_STEI25 (practice, 7 pages)


## [TUBAY_STEI25 h1]

Tutor Sebaya STEI’25
    Revandra Z. M.
   November 28, 2025




           1

> (little or no text layer: read the page image app/public/pages/TUBAY_STEI25/001.jpg)

## [TUBAY_STEI25 h2]

Terima kasih kepada Tim Materi Berpikir Komputasional 2025/2026.




                                        2

> (little or no text layer: read the page image app/public/pages/TUBAY_STEI25/002.jpg)

## [TUBAY_STEI25 h3]

1    ’Mpruy
Suatu bilangan disebut ”’Mpruy” jika bilangan tersebut habis dibagi jumlah dari digit-digit
bilangan itu sendiri!




                                            3

## [TUBAY_STEI25 h4]

2    Palindrom
Diberikan suatu kata, tentukan apakah kata tersebut merupakan palindrom!




                                            4

> (little or no text layer: read the page image app/public/pages/TUBAY_STEI25/004.jpg)

## [TUBAY_STEI25 h5]

3    Empat Titik
Terdapat 4 titik koordinat pada suatu bidang kartesius, tentukan apakah keempat titik tersebut
membentuk suatu persegi!




                                              5

## [TUBAY_STEI25 h6]

4    Anagram
Diberikan dua array, tentukan apakah array pertama dapat direkonstruksi dengan elemen-elemen
dari array kedua!




                                             6

## [TUBAY_STEI25 h7]

5    Penentuan Jadwal
Diberikan dua rentang hari, tentukan apakah kedua rentang tersebut beririsan, jika iya, sebutkan
rentang yang beririsan.




                                               7

# SOURCE Tutor_ObjekAneh (practice, 1 pages)


## [Tutor_ObjekAneh h1]

                                      Objek Aneh

Di suatu ruangan, terdapat sejumlah objek yang memiliki suhu yang berbeda-beda. Dalam
ekspedisi kali ini, Revan memiliki tugas untuk menemukan sekumpulan objek yang aneh (bisa
hanya 1 atau lebih). Sekumpulan objek dikatakan aneh jika rata-rata suhunya mendekati 15°C
dan seluruhnya bersebelahan.
   -​ Jika ada dua atau lebih pilihan kumpulan objek, pilih kumpulan objek dengan banyak
       objek paling sedikit.
   -​ Jika banyaknya masih sama, pilih kumpulan objek paling awal (indeks paling kecil).
Bantulah Revan menentukan range objek tersebut dan suhu rata-ratanya

Test Case 1
 Masukkan banyak objek: 6
 Masukkan suhu objek 1: -51
 Masukkan suhu objek 2: 38
 Masukkan suhu objek 3: 32
 Masukkan suhu objek 4: -22
 Masukkan suhu objek 5: 70
 Masukkan suhu objek 6: -20
 Kumpulan objek aneh adalah objek 3 hingga 6 dengan suhu rata-rata 15.


Test Case 2
 Masukkan banyak objek: 5
 Masukkan suhu objek 1: 35
 Masukkan suhu objek 2: 31
 Masukkan suhu objek 3: -27
 Masukkan suhu objek 4: 35
 Masukkan suhu objek 5: 80
 Kumpulan objek aneh adalah objek 1 hingga 3 dengan suhu rata-rata 13.


Test Case 3
 Masukkan banyak objek: 3
 Masukkan suhu objek 1: 14
 Masukkan suhu objek 2: -20
 Masukkan suhu objek 3: 48
 Kumpulan objek aneh adalah objek 1 dengan suhu rata-rata 14.

# SOURCE Tutor_Orkhan (practice, 7 pages)


## [Tutor_Orkhan h1]

Latihan Soal UTS Berpikir Komputasional                               Orkhan/STEIK’25


 Latihan Soal UTS Berpikir Komputasional
                            Bab Pemrograman Python
                                   26 November 2025


Intro
Halo, ini soal-soal pemrograman python yang aku buat untuk latihan UTS.
Soal-soal ini terinspirasi dari soal-soal TLX, Kaggle, dan modul berkom.
Buat ngerjain soal-soal ini, aku saranin untuk pikirin dulu algonya gimana, bikin pseudo-
code / flowchart (opsional), terus baru coding solusinya.

Rincian fokus materi per soal:
  1. Input/Output, Operator.
  2. Percabangan (Conditionals).
  3. Looping (Perulangan).
  4. Array / List.
  5. Function with returns (Fungsi).
  6. Void function (Prosedur).




                       Semangat dan selamat mengerjakan soal!




                          ”Eh berkom gaboleh pake append?”
                                 - Maba ITB 2025




                                           1

## [Tutor_Orkhan h2]

Latihan Soal UTS Berpikir Komputasional                            Orkhan/STEIK’25


Problem 1
Anda merupakan mahasiswa prodi teknik peternakan lele. Suatu hari anda bertemu Mas
Roy, seorang peternak lele veteran. Anda bertanya kepada Mas Roy:
Roy, cara antum jagain kolam lele gimana sih?
Kolamnya ane kunci, terus kasih password. Tapi ane ganti-ganti passwordnya tiap se-
minggu.
Terinspirasi dari Mas Roy, anda memasang gembok digital dengan password di peternakan
kolam anda. Anda memiliki sebanyak 3 password, yang akan anda rotasikan setiap X hari,
mulai dari password pertama sampai ketiga. Anggap mulai di hari ke-1.
Buatlah program yang akan mengeluarkan password di hari ke-Y !.
Note: Jangan gunakan if-else.

Test Case

 Masukkan password pertama : abcdef
 Masukkan password kedua : bumi300
 Masukkan password ketiga : passwordketiga
 Masukkan hari rotasi : 8
 Ingin melihat password di hari ke ? : 27
 abcdef


 Masukkan password pertama : boysboys
 Masukkan password kedua : yellyell
 Masukkan password ketiga : forzasmansa
 Masukkan hari rotasi : 25
 Ingin melihat password di hari ke ? : 67
 forzasmansa


 Masukkan password pertama : prajogo
 Masukkan password kedua : superman
 Masukkan password ketiga : pangestu
 Masukkan hari rotasi : 1
 Ingin melihat password di hari ke ? :          32
 superman




                                          2

## [Tutor_Orkhan h3]

Latihan Soal UTS Berpikir Komputasional                           Orkhan/STEIK’25


Problem 2
Rara merupakan siswi di SMA Menengah Atas 5 Agartha. Pada hari senin, Rara menda-
patkan materi dari guru matematikanya, Bu Siro, sebagai berikut :
Bilangan dua pangkat merupakan bilangan bulat yang dapat dinyatakan dalam bentuk
2N . N merupakan bilangan bulat.
Rara, sebagai siswi yang penasaran, ingin mengetahui apakah suatu bilangan dapat di-
bilang dua pangkat. Rara meminta tolong kepadamu untuk membuatkan program yang
memenuhi keinginannya.
“Tolongin Rara dong!”, ucap Rara.

Test Case

 Masukkan bilangan yang ingin dicek:          4
 Ya


 Masukkan bilangan yang ingin dicek:          5
 Tidak


 Masukkan bilangan yang ingin dicek:          67
 Tidak


 Masukkan bilangan yang ingin dicek:          128
 Ya


 Masukkan bilangan yang ingin dicek:          32768
 Ya




                                          3

## [Tutor_Orkhan h4]

Latihan Soal UTS Berpikir Komputasional                            Orkhan/STEIK’25


Problem 3
Adik anda yang bernama Ber baru saja mempelajari bilangan prima di sekolahnya. Ia
sangat suka dengan bilangan prima. Setiap bangun tidur, ia selalu menulis bilangan-
bilangan prima ke- tanggal, bulan, dan jam dia bangun. (ex. Bilangan prima ke-26, 10,
dan 21).
Suatu pagi anda memergoki Ber menulis angka prima sesaat setelah dia bangun tidur.
Anda melihat Ber menulis 69, yang mana bilangan tersebut bukan merupakan bilangan
prima. Ber bersikukuh bahwa 69 merupakan bilangan prima, anda menjelaskan panjang
lebar mengapa 69 bukan bilangan prima.
Akhirnya, Ber meminta anda menulis program untuk mengetahui apakah suatu bilangan
prima atau bukan. Bantu adik anda!
“Bantuin dong, nanti aku beliin bojot aa deh!”, ucap Ber.

Test Case

 Masukkan jumlah bilangan yang ingin dicek:         7
 Bilangan ke-1: 2
 Bilangan ke-2: 8
 Bilangan ke-3: 9
 Bilangan ke-4: 6
 Bilangan ke-5: 71
 Bilangan ke-6: 67
 Bilangan ke-7: 93
 Ya, Tidak, Tidak, Tidak, Ya, Ya, Tidak


 Masukkan jumlah bilangan yang ingin dicek: 10
 Bilangan ke-1: 90
 Bilangan ke-2: 87
 Bilangan ke-3: 55
 Bilangan ke-4: 23
 Bilangan ke-5: 21
 Bilangan ke-6: 7
 Bilangan ke-7: 99
 Bilangan ke-8: 76
 Bilangan ke-9: 88
 Bilangan ke-10: 98729
 Tidak, Tidak, Tidak, Ya, Tidak, Ya, Tidak, Tidak, Tidak, Ya




                                          4

## [Tutor_Orkhan h5]

Latihan Soal UTS Berpikir Komputasional                            Orkhan/STEIK’25


Problem 4
Seusai dibagikan nilai UTS, Bang Ling menyelenggarakan pesta besar-besaran, dalam
rangka syukuran nilai UTS Pengantar Prinsip Keberlanjutannya yang 100. Ling meng-
undang sebanyak N teman, dan semua teman Ling datang ke pesta.
Ling merupakan orang yang sangat menyukai ketepatan waktu, sehingga teman-temannya
yang datang setelah setengah dari total temannya akan ditandai. Uniknya, temannya yang
terakhir tidak akan ditandai.
Ling yang sibuk mengatur pesta, meminta anda untuk membuat program yang mengoto-
matisasi penandaan temannya. Bantulah Ling!
“Bantuin.”, ucap Ling
Note: Urutan teman yang memasuki pesta sesuai dengan urutan input.

Test Case

 Masukkan jumlah teman yang datang :          5
 Masukkan teman ke-1: Jang
 Masukkan teman ke-2: Jung
 Masukkan teman ke-3: Nos
 Masukkan teman ke-4: Nil
 Masukkan teman ke-5: Reb
 Teman yang ditandai: Nos, Nil


 Masukkan jumlah teman yang datang :          13
 Masukkan teman ke-1: A
 Masukkan teman ke-2: B
 Masukkan teman ke-3: C
 Masukkan teman ke-4: D
 Masukkan teman ke-5: E
 Masukkan teman ke-6: F
 Masukkan teman ke-7: G
 Masukkan teman ke-8: H
 Masukkan teman ke-9: I
 Masukkan teman ke-10: J
 Masukkan teman ke-11: K
 Masukkan teman ke-12: L
 Masukkan teman ke-13: M

 Teman yang ditandai:     G,H,I,J,K,L




                                          5

## [Tutor_Orkhan h6]

Latihan Soal UTS Berpikir Komputasional                              Orkhan/STEIK’25


Problem 5
Selayaknya individu yang berkuliah di ITB, sudah pasti anda merasa jenuh akan semua
hal yang dilemparkan oleh ITB, baik itu kuis, tubes, anggota kelompok yang main tinggal,
UTS ataupun UAS. Oleh karena itu, anda terbang ke Las Vegas untuk melepas penat.
Sesampainya di Las Vegas, anda bertemu dengan Tuan Suy di Grand Vegas Casino.
Tuan Suy merupakan penjudi pemula yang sedang mempelajari aturan dari permainan
blackjack. Aturan dari permainan tersebut adalah sebagai berikut:
Aturan Singkat:
   • Pemain dibagikan dua kartu. Dealer dibagikan satu
   • Pemain dapat meminta kartu lain (hit) sebanyak yang diinginkan. Jika jumlah
     kartunya melebihi 21, ia langsung kalah dalam ronde tersebut..
   • Dealer kemudian membagikan kartu tambahan sampai memenuhi 2 kondisi berikut:
     1. Jumlah kartu dealer melebihi 21, yang berarti pemain memenangkan ronde ter-
     sebut.
     2. Jumlah kartu dealer lebih besar atau sama dengan 17. Jika total kartu pemain
     lebih besar dari dealer, pemain menang. Jika tidak, dealer menang (bahkan jika
     seri).
   • Nilai kartu adalah sebagai berikut :
   • As : 1/11 — Kartu Angka : Sesuai dengan Nilai Angka — K,Q,J : 10
Buatlah program untuk menentukan hand mana yang lebih baik antara dua kondisi.

Test Case

 Masukkan jumlah kartu di hand 1: 5
 Masukkan kartu ke-1 di hand 1: K
 Masukkan kartu ke-2 di hand 1: 1
 Masukkan kartu ke-3 di hand 1: 3
 Masukkan kartu ke-4 di hand 1: 2
 Masukkan kartu ke-5 di hand 1: 4
 Masukkan jumlah kartu di hand 2: 3
 Masukkan kartu ke-1 di hand 2: J
 Masukkan kartu ke-2 di hand 2: 10
 Masukkan kartu ke-3 di hand 2: A
 Hand yang lebih baik adalah hand 2!




                                            6

## [Tutor_Orkhan h7]

Latihan Soal UTS Berpikir Komputasional                              Orkhan/STEIK’25


Problem 6
Tuan Tuy memiliki seorang teman yang berasal dari Mesir, bernama Zubayr Al-Hadid.
Zubayr sudah berada di Jatinangor selama 3 tahun, dan dia rindu suasana di kampung
halamannya.
Sebagai teman yang baik, Tuan Tuy mencoba untuk menggambar piramida untuk teman-
nya, tetapi ia tidak bisa menggambar dan ia merupakan orang yang sangat pemalas. The
catch is, piramida yang ingin ia gambarkan diisi oleh angka N pada baris ke-N. The catch
is, tiap angka yang sama dengan atau diatas akan diganti dengan huruf X.
Teringat bahwa ia memiliki teman yang bisa mengotomatisasi pekerjaan tersebut, ia me-
nelepon anda. Bantulah Tuan Tuy membuat piramida!
“Plis bantuin gua, plis banget inimah.”, ucap Tuy.
Note: Buatlah sebuah fungsi tanpa return (prosedur) untuk mengotomatisasi pekerjaan
tersebut.

Test Case

 Masukkan tinggi piramida :       5
     1
    2 2
   3 3 3
  4 4 4 4
 5 5 5 5 5


 Masukkan tinggi piramida :       13
             1
            2 2
           3 3 3
          4 4 4 4
         5 5 5 5 5
        6 6 6 6 6 6
       7 7 7 7 7 7 7
      8 8 8 8 8 8 8 8
     9 9 9 9 9 9 9 9 9
    X X X X X X X X X X
   X X X X X X X X X X X
  X X X X X X X X X X X X
 X X X X X X X X X X X X X




                                           7






# SOURCE D00_CourseIntro (slides, 14 pages)


## [D00_CourseIntro h1]

PENGANTAR KULIAH
WI1102 BERPIKIR
KOMPUTASIONAL
TIM PENYUSUN MATERI WI1102 BERPIKIR KOMPUTASIONAL
INSTITUT TEKNOLOGI BANDUNG © 2024

## [D00_CourseIntro h2]

                  • Beban: 2 SKS = 90 jam dalam 1 semester
                  • Jadwal pertemuan tatap muka: Senin, pukul
                     13.00-14.50

WI1102 BERPIKIR   • Ruang: Gedung Utama – U.313
KOMPUTASIONAL     • Pengajar:
KELAS 35                ▪ 1. Tricya Esterina Widagdo, S.T., M.Sc.
                        ▪ 2. Dr. Maya Nabila, S.Si., M.Si.




01/09/2025        WI1102/BERPIKIR KOMPUTASIONAL                     2

## [D00_CourseIntro h3]

                    1. Mahasiswa memahami konsep dan
                    mampu mempraktekkan proses berpikir
                    komputasional yang tepat dan terarah
                    untuk pemecahan masalah.
CAPAIAN
PEMBELAJARAN
MATA KULIAH         2. Mahasiswa mampu mendayagunakan
                    teknik berpikir komputasional untuk
                    menganalisis permasalahan baru, dan
                    menghasilkan solusi atas permasalahan
                    tersebut.

               WI1102/BERPIKIR KOMPUTASIONAL    01/09/2025   3

## [D00_CourseIntro h4]

BAHAN KAJIAN



                  1                         2                            3
  Konsep dasar                  Transformasi solusi             Dampak dan tren
  computational thinking        computational thinking          computing pada domain
  (abstraksi, algoritma,        ke kakas komputasi              fakultas/sekolah
  dekomposisi,                  • Di kelas ini akan diajarkan
  pengenalan pola)                dengan menggunakan
                                  bahasa pemrograman Python



WI1102/BERPIKIR KOMPUTASIONAL                                            01/09/2025     4

## [D00_CourseIntro h5]

RENCANA PEMBELAJARAN
 Minggu                              Topik             Materi
1                Konsep dasar computational thinking   Konsep dasar computational thinking
2                                                      Algorithmic Thinking
3                                                      Latihan
4                Transformasi solusi computational     Python: Struktur dasar program
5                thinking ke kakas komputasi           Python: Analisis Kasus dan Pengulangan
6                                                      Python: Array
7-9                                                    Projek I
10                                                     Python: Subprogram
11               Dampak dan tren computing pada domain fakultas/sekolah
12-14            Transformasi solusi computational     Projek II
                 thinking ke kakas komputasi


     WI1102/BERPIKIR KOMPUTASIONAL                                                           01/09/2025   5

## [D00_CourseIntro h6]

                                BAHASA PEMROGRAMAN

• Python
      • Bahasa programming tingkat tinggi dan cukup populer, di-release oleh Guido
         van Rossum pada tahun 1991
      • Download/akses:
          • https://www.python.org/downloads/
          • Google Colab: https://colab.research.google.com/



WI1102/BERPIKIR KOMPUTASIONAL                                          01/09/2025    6

## [D00_CourseIntro h7]

  PUSTAKA
• David D. Riley, Kenny A. Hunt: “Computational Thinking for the Modern Problem Solver”, CRC Press,
  2014
• Buku-buku dan online resources mengenai Python a.l.:
    • Eric Matthes, “Python Crash Course, 3rd Edition: A Hands-On, Project-Based Introduction to Programming”, No
       Starch Press, 2016
    • Paul Barry, “Head-First Python, 2nd edition”, O’Reilly, 2016
    • Python 3.13.7 documentation: https://docs.python.org/3/
• Buku-buku dan online sources mengenai Scratch a.l.:
    • Majed Marji, “Learn to Program with Scratch: A Visual Introduction to Programming with Games, Art, Science,
       and Math”, No Starch Press, 2014
    • Jane Chisholm, “Coding for Beginners: Using Scratch”, Usborne, 2015
    • Scratch Documentation Booklet: https://ctrlshift.mste.illinois.edu/files/2015/08/ScratchDocBooklet.pdf
  WI1102/BERPIKIR KOMPUTASIONAL                                                                 01/09/2025     7

## [D00_CourseIntro h8]

AKSES MATERIAL KULIAH

• Edunex, course WI1102 Computational Thinking [WI1102-1]
   Institut Teknologi Bandung (itb.ac.id)
     • Semua mahasiswa yang terdaftar di kelas WI1102-30 di web akademik otomati ter-
         enrole di course ini pada Edunex


• Komunikasi kelas menggunakan MS Teams WI1102-1 Berpikir Komputasional
   K35
    • Team code: s1fozgm
WI1102/BERPIKIR KOMPUTASIONAL                                             01/09/2025    8

## [D00_CourseIntro h9]

PENILAIAN

• Ujian Tengah Semester
• Kuis/Latihan soal/Tugas mingguan
• Projek I
• Projek II

• Untuk dapat nilai yang bagus, harus memiliki nilai di semua komponen.
• Jika terbukti melakukan kecurangan akademik, akan mendapatkan nilai E secara
   otomatis
WI1102/BERPIKIR KOMPUTASIONAL                                       01/09/2025   9

## [D00_CourseIntro h10]

KOMPONEN PENILAIAN DAN BOBOT
Komponen Penilaian                Materi                                                   Bobot
Ujian Tengah Semester             Konsep berpikir komputasional                            35%
(UTS)                             Transformasi konsep computationa
Projek I                          Penerapan konsep computational thinking pada persoalan   25%
                                  yang ditentukan dengan memanfaatkan tools yang
                                  ditentukan
Projek II                         Penerapan konsep computational thinkin pada persoalan    25%
                                  baru dengan memfaatkan tools yang ditentukan
Kuis                              Dampak dan tren computing pada domain                    5%
                                  fakultas/sekolah
Praktikum                         Keterampilan menggunakan tools                           10%
Tugas Kelas                                                                                2.5%



  WI1102/BERPIKIR KOMPUTASIONAL                                                            01/09/2025   10

## [D00_CourseIntro h11]

ATURAN PERKULIAHAN

• Untuk mendapatkan nilai A, harus memiliki nilai di semua komponen
• Susulan UTS diberikan hanya untuk kasus emergency dengan pemberitahuan sebelumnya kepada dosen kelas
   dan melampirkan menggunakan surat keterangan yang sah (surat keterangan sakit dari dokter, surat
   undangan kegiatan, surat dari wali/orang tua untuk musibah, dll.)
• Susulan Praktikum diberikan maksimum hanya untuk 1 praktikum
• Tidak ada susulan untuk Projek dan komponen lain

• Jika terbukti melakukan kecurangan akademik, akan mendapatkan nilai E secara otomatis di perkuliahan
   ini
         • Baca Peraturan Rektor ITB No. 708/IT1.A/PER/2022 tentang Pelanggaran Peraturan Akademik dan Kemahasiswaan ITB
WI1102/BERPIKIR KOMPUTASIONAL                                                                             01/09/2025       11

## [D00_CourseIntro h12]

WI1102/BERPIKIR KOMPUTASIONAL   01/09/2025   12

> (little or no text layer: read the page image app/public/pages/D00_CourseIntro/012.jpg)

## [D00_CourseIntro h13]

WI1102/BERPIKIR KOMPUTASIONAL   01/09/2025   13

> (little or no text layer: read the page image app/public/pages/D00_CourseIntro/013.jpg)

## [D00_CourseIntro h14]

                                Semangat menempuh
                                 hidup baru sebagai
                                  mahasiswa ITB!!!


WI1102/BERPIKIR KOMPUTASIONAL                         01/09/2025   14

> (little or no text layer: read the page image app/public/pages/D00_CourseIntro/014.jpg)

# SOURCE D01_ComputationalThinking (slides, 27 pages)


## [D01_ComputationalThinking h1]

Basic Concepts
Computational Thinking

Introduction to Computational Thinking Course WI1102 teaching team.
Institut Teknologi Bandung © 2025

## [D01_ComputationalThinking h2]

Objectives
• Students are able to explain the basic concepts of computational
  thinking for problem solving: problem decomposition, abstraction,
  pattern recognition, and algorithmic thinking.
• Students are able to use the basic concepts of problem
  decomposition, abstraction, and pattern recognition to identify
  and explain a problem.




24/08/2026                WI1102/Berpikir Komputasional           2

## [D01_ComputationalThinking h3]

Computing is Everywhere
                               Computing in Religion Study
                                      Search engine on sacred texts, multimedia for learning sacred texts,
                                      find chapters and verses related to daily concepts, classification of
                                      prophetic narrations, etc.

                               Computing in History Study
                                       Information retrieval on historical documents, digitizing hand-written
                                       historical documents, augmented and virtual reality tour at historical
                                       places, etc.

                               Computing in Military and Intelligence
                                       Encryption for securing confidential communication, military
                                       inventory management, computer simulation for military training,
                                       object recognition, open source intelligence, etc.

                               Computing in Politics
                                       Vote counting system, decision support systems, digital campaign,
                                       e-government services, etc.
 Mention any domain where
 computing is not useful.

24/08/2026                  WI1102/Berpikir Komputasional                                                       3

## [D01_ComputationalThinking h4]

Data – Information – Knowledge – Wisdom




                                                https://www.i-scoop.eu/big-data-action-
                                                value-context/dikw-model/

24/08/2026      WI1102/Berpikir Komputasional                               4

> (little or no text layer: read the page image app/public/pages/D01_ComputationalThinking/004.jpg)

## [D01_ComputationalThinking h5]

What is Computational Thinking
Computational thinking is the thought processes involved in
formulating a problem and expressing its solution(s) in such a way
that a computer —human or machine— can effectively carry out.

                                    “Human computers”??
                                    • Humans can compute
                                    • People can learn computational
                                      thinking without a machine




http://socialissues.cs.toronto.edu/index.html%3Fp=279.html

24/08/2026                                  WI1102/Berpikir Komputasional   5

## [D01_ComputationalThinking h6]

Why Do I Need Computational Thinking?
• Computational thinking: Digital age skills for everyone
     • http://youtu.be/VFcUgSYyRPg




24/08/2026                   WI1102/Berpikir Komputasional   6

## [D01_ComputationalThinking h7]

      4 Pillars of
      Computational
      Thinking




https://www.computationalthinkers.com/product/computationalthinking/

        24/08/2026            WI1102/Berpikir Komputasional            7

> (little or no text layer: read the page image app/public/pages/D01_ComputationalThinking/007.jpg)

## [D01_ComputationalThinking h8]

Problem Decomposition
Solving a problem by dividing the problem into smaller sub-
problems, then solving these smaller problems separately.




24/08/2026                WI1102/Berpikir Komputasional       8

## [D01_ComputationalThinking h9]

         Divide and
          Conquer
          Strategy




              https://www.khanacademy.org/computing/computer-
              science/algorithms/merge-sort/a/divide-and-conquer-algorithms
24/08/2026                                                         WI1102/Berpikir Komputasional   9

> (little or no text layer: read the page image app/public/pages/D01_ComputationalThinking/009.jpg)

## [D01_ComputationalThinking h10]

Example of Problem Decomposition (1)
Decomposition of Scientific Article Writing
      1. Main idea
          1. Sub-poin idea 1
                  1.   Sub poin 1.1
                  2.   Sub poin 1.1
             2.   Sub-poin idea 1
                  1.   Sub poin 1.2
                  2.   Sub poin 1.2
                       1. Sub poin 1.2.2
                       2. …
     2. Main Idea
             1.   …


24/08/2026                                 WI1102/Berpikir Komputasional   10

## [D01_ComputationalThinking h11]

Example of Problem Decomposition (2)
Functional decomposition of a car, from the driver's perspective

                        Car

 Steering     Brake   Ligthing      Power
                                                          …
 System      System   System        System

         …       …            …            …




24/08/2026                        WI1102/Berpikir Komputasional    11

## [D01_ComputationalThinking h12]

Example of Problem Decomposition
Classroom Decomposition
• Look at the classroom you are currently in.
• Note all the (inanimate) objects in the room.

Challenge:
Discuss the appropriate decomposition to describe the overall condition of the
room.

Instructions:
• Decomposition can be done based on different aspects, for example: based on
  the types of objects present, based on their functions, etc.
• Decomposition can be done in stages.
24/08/2026                      WI1102/Berpikir Komputasional                    12

## [D01_ComputationalThinking h13]

Problem Decomposition Exercise
Academic Information System Decomposition
A brief description of an academic information system is given below:
Before the semester begins, all students are required to register for courses by completing a
Study Plan Form (FRS), which must be approved by their academic advisor. Students may make
changes to their Study Plan (PRS) no later than four weeks after the semester begins, which
must also be approved by their academic advisor. At the beginning of each semester, students
are also required to pay tuition fees through a designated bank account, which will be
automatically recorded by the system. After tuition fees are paid, students can print their
Student Study Card (KSM) as proof of course enrollment for that semester. Academic advisors,
Heads of Study Programs, and administrative staff can also monitor the status of course
enrollment and the status of KSM printing.

Challenge:
Discuss the decomposition of the modules (and their functions) that need to be developed to
implement this academic information system.
Instructions:
Decomposition can be performed using various perspectives, for example, based on the type of
user, the functions performed, the time at which the functions are executed, etc.
24/08/2026                           WI1102/Berpikir Komputasional                          13

## [D01_ComputationalThinking h14]

Pattern Recognition
Recognizing similarities/differences in the characteristics of various
problems/phenomena that are different but related.




24/08/2026                 WI1102/Berpikir Komputasional             14

## [D01_ComputationalThinking h15]

Pattern Recognition Example (1)
Find matching socks




24/08/2026            WI1102/Berpikir Komputasional   15

> (little or no text layer: read the page image app/public/pages/D01_ComputationalThinking/015.jpg)

## [D01_ComputationalThinking h16]

Pattern Recognition Example (2)
Sequential Pattern Mining
Given a set of data containing a list of sequential events/activities.
For example, from:
   • transaction records on an e-commerce platform
   • patient medical records, etc.

We can obtain sequences of events that represent patterns believed to occur
frequently, for example:
    • Customers who purchase a smartphone will usually also purchase a
      screen protector and/or casing within the next three days.
    • For a particular type of disease, what treatment patterns are commonly
      used and offer a better probability of recovery?
24/08/2026                       WI1102/Berpikir Komputasional                 16

## [D01_ComputationalThinking h17]

Pattern Recognition Exercise (1)
String Pattern
Some examples of international telephone numbers are given below:
   +62-811-234567                +62 (817) 123-456
   +1-888-300400                  +1888300400
   +44 (800) 987654               0065 7788 9900
   0043-6543210                  +966-200-300

Challenge:
Develop a list of rules that declare any string to be an international telephone number with the
correct pattern.
For example:
1.   International telephone numbers can only contain numbers, +, -, (, ), and spaces.
2.   …

24/08/2026                             WI1102/Berpikir Komputasional                           17

## [D01_ComputationalThinking h18]

Pattern Recognition Exercise (2)
The Bebras Cipher
The colorful image was encoded by a program using the Bebras Cipher. The
code can be seen on the right side of the following image, consisting of a string
of letters. Unfortunately, the code for the third line is missing.




Challenge:
Which string of letters is the code for the missing third line?

Source: Bebras Indonesia (www.bebras.or.id). Kode Soal: I-2012-XXX-011-Sandi Bebras
24/08/2026                                  WI1102/Berpikir Komputasional             18

## [D01_ComputationalThinking h19]

Pattern Recognition Exercise (3)
Similarities in Characteristics
Discuss in groups with four friends
around you:

Find seven characteristics that
everyone in your group shares,
except: age, gender, study
program/school/faculty.



24/08/2026                 WI1102/Berpikir Komputasional   19

## [D01_ComputationalThinking h20]

Abstraction and Generalization
Eliminating unimportant parts of a problem (abstraction) to obtain
a general solution to solving similar problems (generalization).




24/08/2026                WI1102/Berpikir Komputasional              20

## [D01_ComputationalThinking h21]

Abstraction Example
Abstraction Information

The information that appears on a map corresponds to the map level.




 Map abstraction                  Map abstraction                         Map abstraction at Jawa Barat level
  at ITB level                    at Bandung level                      (What happens if all street names appear
                                                                                    at this level?)
24/08/2026                              WI1102/Berpikir Komputasional                                     21

## [D01_ComputationalThinking h22]

Example of data abstraction
Data abstraction of students

Depending on the scope of the information system used, student data can
have different attribute details.

                                      • NIM, Name
                                      • IPK, Courses taken, courses passed
                        Students
                         System       • Parents' names, number of siblings, home address, residential address


                                      • NIM, Name
                        Academic      • IPK, Courses taken, courses passed
                         System




                                      • NIM, Name
                      Other General
                         System


24/08/2026                                    WI1102/Berpikir Komputasional                                     22

## [D01_ComputationalThinking h23]

Abstraction Example - Generalization
Turtle Graphics (Generalization Procedure)
• The procedure for drawing arbitrary 2D vector
  graphics can be generalized using a turtle robot.
• The turtle robot has three attributes: position,
  direction, and pen. The turtle pen also has three
  attributes: on/off, color, and width.
• This turtle robot can receive three simple
  commands: move forward, rotate, and change
  pen attributes.
• Question: What attributes/commands must be
  added to the turtle robot to be able to draw
  arbitrary 3D graphics?
https://en.wikipedia.org/wiki/Turtle_graphics


24/08/2026                                  WI1102/Berpikir Komputasional   23

## [D01_ComputationalThinking h24]

Abstraction Exercise - Generalization
City Traveling Robot
A robot operates in a city. It travels along roads from one point
to another, following instructions.
At each intersection, there are loops (detours), and the robot
will turn counterclockwise, then take a specific sequence of
detours according to the given instructions.
The instructions are in the form of numbers indicating the
sequence of detours. For example, the instructions "4 1 2" will
be followed by the robot as follows:
On the first turn, take the 4th detour.
On the second turn, take the 1st detour.
On the third detour, take the 2nd detour.

                                                                                    Generalization Note:
Challenge:                                                                          Navigation from any point to any other
If the robot is initially at A, which instructions will lead it to C?               point is simply done by providing a series of
                                                                                    numbers!
Source: Bebras Indonesia (www.bebras.or.id). Kode Soal: I-2017-Sl-02
24/08/2026                                          WI1102/Berpikir Komputasional                                          24

## [D01_ComputationalThinking h25]

Generalization and Pattern Recognition Exercises
Smiling Face Recognition
Beaver has invented a tool for detecting smiling faces
using a camera. The tool works in two steps:                                           1
Transform a photo of a face into a smiley face, with two
dots and a line indicating the position of the eyes and
mouth.                                                                                 2
Detect whether the face is smiling by matching the image
from step 1 with a pattern consisting of red lines and
green dots. A face is detected as smiling if and only if the
image touches all the green dots and none of the red
lines.

Challenge:                                                                         1   2   3   4   5
Which of the following images from the results of stage
1 are detected as smiling faces?

Source: Bebras Indonesia (www.bebras.or.id). Kode Soal: I-2017-DE-02               6   7   8   9   10
24/08/2026                                         WI1102/Berpikir Komputasional                   25

## [D01_ComputationalThinking h26]

Generalization and Pattern Recognition Exercises

Smiling Face Recognition Answer

                                                                               Moral of the story:
                                                                               • Smiling face pattern recognition is simply
     1            2             3            4             5                     based on the position of the eyes and the
                                                                                 shape of the mouth (abstraction).
                                                                               • A smiling face can be inferred using criteria
                                                                                 based on the established red line
                                                                                 boundaries (generalization).
     6            7             8             9           10
Images with an x ​mark qualify as smiley faces.


Source: Bebras Indonesia (www.bebras.or.id). Jawaban Kode Soal: I-2017-DE-02
24/08/2026                                        WI1102/Berpikir Komputasional                                         26

## [D01_ComputationalThinking h27]

All-in-one Exercise
• Problem Statement: All WI1102 students must arrive in class and complete all
  homework/obligations before leaving.
• Decomposition (do individually):
Decompose the problem above into small steps that you typically take, from waking up
to sitting in class.
• Pattern Recognition (discuss in groups of 3):
Look for similarities and differences in the small individual steps to create small steps
for solving the problem together.
• Abstraction and Generalization (discuss in groups of 3 x 2):
- Combine the problem-solving steps from both groups.
- Abstraction: Remove steps that are deemed unnecessary (e.g., too specific or
unimportant).
- Generalization: Formulate general problem-solving steps that can/need to be carried
out by all WI1102 students to solve the problem.

24/08/2026                         WI1102/Berpikir Komputasional                       27

# SOURCE D02_AlgorithmicThinking (slides, 28 pages)


## [D02_AlgorithmicThinking h1]

Algorithmic Thinking


TimPenyusun MateriWI1102Berpikir Komputasional
Institut TeknologiBandung © 2024

> (little or no text layer: read the page image app/public/pages/D02_AlgorithmicThinking/001.jpg)

## [D02_AlgorithmicThinking h2]

Objectives
• Students able to explain concept algorithm as technique
  computational thinking in solve problem
• Students able to explain concept algorithm(sequential control,
  selection, repetition, dan control abstraction) to decompose
  algorithmic to solve simple problem
• Students able to translate concept into simple algorithm in
  conceptual tool (flow chart/activity diagram/pseudocode)




08/09/2025                 WI1102 Berpikir Komputasional           2

## [D02_AlgorithmicThinking h3]

User – Software – Hardware




08/09/2025      WI1102 Berpikir Komputasional   3

> (little or no text layer: read the page image app/public/pages/D02_AlgorithmicThinking/003.jpg)

## [D02_AlgorithmicThinking h4]

Software
• Software allows users to communicate a problem to the computer
  and the computer provides its solution to the user.
• Without software, a computer is just a dumb machine!



             Software = program + data + documentation



08/09/2025                  WI1102 Berpikir Komputasional          4

## [D02_AlgorithmicThinking h5]

Problem Solving with Programming

 •   Programming: is a form of problem-solving where both the
     problem and its solution are represented in a format that can be
     processed by a computer.
 •   In general, it consists of the following steps:
      1.     Understanding the problem
      2.     Formulating a plan to solve the problem → algorithm
      3.     Developing a solution based on the plan → computer program
      4.     Evaluating the solution



08/09/2025                        WI1102 Berpikir Komputasional
                                                                  5       5

## [D02_AlgorithmicThinking h6]

From Problem to Program
• Based on the understanding of the
  problem, the programmer
  compiles a list of problems and
  decomposes them into sub-                                                problem
  problems.
• Each sub-problem has the
  potential to become a program
  module.                                                 subproblem-
                                                               1
                                                                                         subproblem-
                                                                                              2
• In this course, program modules
  will be arranged as subprograms.
• Top down design: Start from the                subproblem-      subproblem-    subproblem-     subproblem-
  big problem, then detail it until it               1.1              1.2            2.1             2.2
  finally becomes step-by-step
  solutions for the sub-problems →
  algorithm.
08/09/2025                       WI1102 Berpikir Komputasional                                          6

## [D02_AlgorithmicThinking h7]

From Ideas to Algorithm
• Algorithm: a set of step-by-step procedures to solve a [sub]
  problem.
• Can be written using text or diagrams:
     • Pseudocode → text; a cross between human language and programming
       language
     • Flowchart → diagram
• Algorithms are built using control structures:
     • Sequence: steps executed in order
     • Conditional (branching): choice of steps
     • Repetition/loop: repeating steps

08/09/2025                      WI1102 Berpikir Komputasional          •7

## [D02_AlgorithmicThinking h8]

Example-1: Exiting the Maze
Mira needs to find her way out of a         However, Mira can only remember the following four moves:
maze and asks you to give her
directions. She enters the maze from
the bottom (black triangle) and must
reach the exit at the top (large red
circle).




                                            Mira can compose a long movement made up of the four moves A,
                                            B, C, or D. A move can be repeated several times. This sequence of
                                            moves can bring Mira out of the maze with two repetitions.

Challenge:
Which sequence of moves, when repeated twice by Mira, will get her to the exit?
                                                      Source: Bebras Indonesia (www.bebras.or.id). Problem Code: I-2017-CH-01A
08/09/2025                                WI1102 Computational Thinking                                               8

## [D02_AlgorithmicThinking h9]

Example-2: Book sharing club
There are seven (7) students who love reading and they form a club to share books. When a student
obtains a new book (and has read it), they will then lend it to other club members as follows. Not every
student is friends with every other student, so a student only lends the book to those who are friends with
them. If a student has multiple friends, the youngest friend who has not yet borrowed the book will
receive it first. If all of their friends have already borrowed it, then they return the book to the student
who previously lent it to them.
The diagram on the side shows the seven students, and the
lines indicate ‘friend’ relationships. Each node contains the
name and age

Challenge:
Ben has finished reading a new book and wants to share it with
all club members, and apart from Ben, no one has read it yet.
Who will be the last person to read the book?


Source: BebrasIndonesia (www.bebras.or.id). Problem Code: I-2017-IR-07

08/09/2025                                  WI1102 Berpikir Komputasional                                  9

## [D02_AlgorithmicThinking h10]

Example-3:
Cooking potatoes for dinner
• “For dinner, a number of potatoes must be peeled and cooked.”
• “Initial state: a bag of potatoes is available in the kitchen.”
     • “It is unclear whether the potatoes are sufficient or not.”
• “Final state: a potato-based dish is available and ready to be
  served for dinner.”




08/09/2025                        WI1102 Berpikir Komputasional      10

## [D02_AlgorithmicThinking h11]

Cooking potatoes for dinner
             Potatoes
             available?                                                       What to
                               Ye                                             cook?
                               s
                                     Peel Potatoes
                          No
                                             Fried?                              Soup?
                                                                    Boiled?




              Buy Potatoes?


08/09/2025                          WI1102 Berpikir Komputasional                        11

## [D02_AlgorithmicThinking h12]

Cooking potatoes for dinner-
Pseudocode
             if potatoes_available? = no then
                  Buy_potatoes
             { At this point potatoes available }
             Peel_potatoes
             if cooking_selection = fries then
                  Fry_potatoes
             else if cooking_selection = boiled then
                  Boild_potatoes
             else{cooking_selection = soup }
                  Make_soup


08/09/2025                     WI1102 Berpikir Komputasional   12

## [D02_AlgorithmicThinking h13]

Cooking potatoes for dinner -
Flowchart
                  Start


               Potatoes        No
               Kentang
               available                             Beli
                                                     Buy Kentang
                                                          potatoes
               Tersedia
                   ?
                  ?
              Yes

              Peel Potatoes
                                                        Fry potatoes
                              fried

                                                        Boil potatoes   Finish
                What to               boiled
                cook?
                                                         Make soup
                               soup
 08/09/2025                           WI1102 Berpikir Komputasional              13

## [D02_AlgorithmicThinking h14]

Example-4:
Fixing wall clock
• Initial state: The wall clock does not show the correct time.
• Final state: The wall clock shows the correct time.
• If the hands do not move, replace the battery.
• If they move, the battery is still alive; simply adjust the positions
  of the clock hands.




08/09/2025                   WI1102 Berpikir Komputasional                14

## [D02_AlgorithmicThinking h15]

Fixing wall clock: Flowchart-1
             start



       Clock hand    Yes   Fix clock hand to the
        moved?                correct position

                No
                                                                   What’s wrong
   Change batteris
                                                                    with this
                                                                    solution?
         Finish


08/09/2025                         WI1102 Berpikir Komputasional                  15

## [D02_AlgorithmicThinking h16]

Fixing wall clock: Flowchart-2
             start



         Clock        Yes
                            Fix clock hand to the
         hand
                               correct position
        moved?
                                                                     What if after two
                 No
                                                                     days, the clock
  Change batteries                                                  return to incorrect
                                                                         position?
         Finish


08/09/2025                          WI1102 Berpikir Komputasional                         16

## [D02_AlgorithmicThinking h17]

Fixing wall clock: Flowchart-3
               start




             Clock hand    Yes          Fix clock hand to
              moved?                   the correct position

                  No
                                                Clock
             Change
                                               pointing
             batteries                                           Check after 2 days
                                               correct
                          No
                                                time?
                                                     Yes
              Finish


08/09/2025                       WI1102 Berpikir Komputasional                        17

## [D02_AlgorithmicThinking h18]

Fixing wall clock: Pseudocode
             Refer to Flowchart-3

             if clockhand_moved? = no then
                  Change_batteries
             { At this point clock should moved }
             repeat
             Fix_position_clock_hand
             Check_after_two_days
                  if clock_hand_incorrect? = no then
             Change_batteries
             until (clock_hand_correct? = yes)


08/09/2025                     WI1102 Berpikir Komputasional   18

## [D02_AlgorithmicThinking h19]

Example-5
Which photo do you want?
2014-JP-03

Johnny has 8 photos. He would like to give one of them to Bella. He asks her some questions to
find out which photo she wants:
“Do you want a photo with a beach umbrella?” “Yes.”
“Do you want a photo where I have something on my head?” “No.”
“Do you want a photo where you can see the sea?” “Yes.”
Which photo should Johnny give to Bella?(Source: Bebras Challenge)




08/09/2025                           WI1102 Berpikir Komputasional                               19

## [D02_AlgorithmicThinking h20]

                  start
                                    Which photo do you want? –
         Get first photo
                                                     Flowchart
No
          Any umbrella?

                                                    No
                  Yes                                                                  Yes
                                                                                                  Print photo
Yes
            Something
                                                 All photo checked?          Ye
            over head?               Photo                                        Correct photo
                                                  Or correct photo           s
                                    found?                                           found?                              finish
          No                                           found?

 No                                                                                      No
                              Yes
          can see ocean?
                                                                                                  Photo not found



           Check next
            photo? Y
                          a
     08/09/2025                              WI1102 Berpikir Komputasional                                          20

## [D02_AlgorithmicThinking h21]

                         Take_first_photo
Which photo do           repeat
you want? –                 if anay_umbrella? =yes then
                                if something_on_head? =no then
Pseudocode                       if can_see_ocean? =yes then
                                      photo_found
                                 else
                                      check_next_photo
                              else
                                  check_next_photo
                            else
                                  check_next_photo
                         until(all_photos_had_been_checked) or
                         (correct_photo_found)

                         if(correct_photo_found)then
                             print_photo
                         else
                             photo_not_found
08/09/2025       WI1102 Berpikir Komputasional                   21

## [D02_AlgorithmicThinking h22]

Example-6: Invitation Pickups
Patra lives in the village of Beaveral. He wants to invite his friends to celebrate his birthday.
However, he only invites friends who live no more than 20 km from his house so they won’t get
home too late. The distances to his friends’ houses are shown as numbers on the map below.

Challenge:
For invited friends whose homes are more than
17 km away, transportation will be provided.
Determine which friends Patra will invite and
which ones will be picked up.
Additional challenge:
Write the steps you used to obtain the solution in
the form of a flowchart/pseudocode. Can you
generalize these algorithmic steps so they can be
used on other maps?



Source: Bebras Indonesia (www.bebras.or.id). Problem Code: I-2017-IR-07
08/09/2025                                   WI1102 Computational Thinking                      22

## [D02_AlgorithmicThinking h23]

Introduction to Programming
Language

08/09/2025   WI1102 Berpikir Komputasional   23

> (little or no text layer: read the page image app/public/pages/D02_AlgorithmicThinking/023.jpg)

## [D02_AlgorithmicThinking h24]

From Algorithm to Program
• Programmers convert algorithms into computer program code
  using a programming language.
• The process of writing program code from an algorithm is called
  coding. The resulting file is called source code.
• Each statement in the algorithm is translated in detail into
  program code.
• A compiler/interpreter then translates the program code in a
  given programming language into a form the computer can
  understand.

08/09/2025                WI1102 Computational Thinking             24

## [D02_AlgorithmicThinking h25]

Programming Languages
• Every computer processes instructions in machine language
     • numeric codes used to perform basic operations such as: adding and
       subtracting numbers, comparing numbers, moving numbers, and
       repeating instructions.
     • Programmers use high-level programming languages to write program
       code (e.g., C/C++, Python, MATLAB, Scratch, etc.).




08/09/2025                     WI1102 Computational Thinking                25

## [D02_AlgorithmicThinking h26]

Compiler vs Interpreter
• Compiler: reads the entire program code at once and translates it into
  code understood by the computer. Examples: C/C++, Pascal, Fortran
                    pre-processing                                   processing
      Source Code                            Object Code                           Machine


     • Example: C/C++, Pascal, Fortran
• Interpreter: read line of code one by one
                    pre-processing          Intermediate             processing
      Source Code                                                                 Interpreter
                                                Code

     • Example: MATLAB, Python

08/09/2025                           WI1102 Berpikir Komputasional                              26

## [D02_AlgorithmicThinking h27]

Programming Paradigm
• A programming paradigm is a viewpoint for solving problems
  with computer programs.
     • Example paradigms: procedural (imperative), object-oriented,
       declarative, etc.
• Procedural (imperative) paradigm: a program is based on
  structuring information in memory and manipulating the stored
  information.


                  Program =Algoritma+Data Structure


08/09/2025                      WI1102 Berpikir Komputasional         27

## [D02_AlgorithmicThinking h28]

Programming Languages
• There are THOUSANDS of programming languages in the world
  today—including procedural languages.
• It is impossible to learn all of them in a single course.
• Therefore, what we teach is “learning to program” through
  computational thinking and the procedural programming
  paradigm.
• Some well-known languages: C/C++, Python, MATLAB, Scratch,
  etc.


08/09/2025               WI1102 Berpikir Komputasional         28

# SOURCE D04_BasicStructure (slides, 54 pages)


## [D04_BasicStructure h1]

Basic Structure of a
Procedural Program – Python

WI1102 Computational Thinking Teaching Team
Institut Teknologi Bandung © 2026

## [D04_BasicStructure h2]

Objectives
Students will be able to:
• Explain the basic structure of a procedural program
• Explain data abstraction and basic data types
• Explain the meaning of and use variables and constants
• Explain and use:
     • assignment and input/output statements
     • expressions and operations related to data types
     • sequential actions
   correctly within a procedural program
• Create small programs using the Python language
12/09/2026                      WI1102/Computational Thinking   2

## [D04_BasicStructure h3]

Python
• A high-level programming language released by Guido van Rossum in
  1991.
• Supports various programming paradigms; however, we will discuss
  only the procedural paradigm.
• Interpreters are available for a wide range of operating systems.
     • Uses indentation to define program blocks.
     • Case-sensitive: distinguishes between uppercase and lowercase letters.
• Python is a strongly and dynamically typed programming language.
     • Strongly typed: A variable's data type is determined by its initial assigned value,
       and subsequent operations must adhere to that type.
     • Dynamically typed: A variable's data type can be changed


12/09/2026                          WI1102/Computational Thinking                        3

## [D04_BasicStructure h4]

Basic Structure of A Procedural Program
 Program <ProgramTitle>
 { Program specification statements }
 DECLARATIONS
 { Declarations of types, variables, constants, functions and
 procedures }
 ALGORITHM
 { Algorithmic steps for problem solving }


This

12/09/2026                  WI1102/Computational Thinking       4

## [D04_BasicStructure h5]

Basic Structure of A Procedural Program
in Python
  # Program <ProgramTitle>
  # Program specifications

  # DECLARATIONS
  # Written inside comments
  # Declarations of types, variables, constants, functions and procedures

  # ALGORITHM
  # Algorithmic steps for problem solving




12/09/2026                       WI1102/Computational Thinking              5

## [D04_BasicStructure h6]

My First Program
• Write a program to print
  “Hello, World!” to the screen.                       # Program HelloWorld
                                                       # Print Hello, World! to the screen

                                                       # DECLARATIONS
                                                       # not needed yet

             print is a command                        # ALGORITHM
              to print text to the                     print('Hello, World!')
               screen/monitor




12/09/2026                           WI1102/Computational Thinking                           6

## [D04_BasicStructure h7]

Input – Proses – Output

             Input         Proses                           Output
             input (A)                                      output (A)   pseudocode
                          A ← A + B
             input (B)                                      output (B)


Python
     A = int(input(‘’))                                     print(A)
     B = int(input(‘’))   A = A + B
                                                            print(B)


12/09/2026                  WI1102/Computational Thinking                      7

## [D04_BasicStructure h8]

                                                                              Start
Flowcharts
  • A flowchart is a visual representation of an
    algorithm or process that uses standardized                               Input
    symbols connected by arrows to show the flow
    of execution.
  • Important symbols:                                                       Process
        Start          End


         Process             Input/output                     Flow
                                                                            Output
                                   Option
             Options
                                Option flow
                                                                               End
12/09/2026                                  WI1102/Computational Thinking              8

## [D04_BasicStructure h9]

Pseudocode
• Pseudocode adalah deskripsi algoritma yang menggunakan bahasa
  sehari-hari, namun disusun agar menyerupai bahasa pemrograman
  yang disederhanakan *)
• Anggaplah pseudocode sebagai draf kasar untuk program Anda.
     • Pseudocode membantu kita merancang logika program sebelum
       mengimplementasikannya dalam bahasa pemrograman tertentu.
• Sering kali lebih dipilih daripada flowchart untuk perancangan
  program ketika Anda perlu menulis logika berbasis teks yang mendetail
  dengan cepat, menangani struktur bersarang yang kompleks, atau
  mengedit langkah-langkah yang menyerupai kode dengan mudah tanpa
  harus mengelola bentuk-bentuk grafis.
• Di kelas ini, kita akan menggunakan adaptasi notasi algoritmik yang
  dikembangkan oleh Inggriani Liem **) untuk menulis pseudocode.
*) https://www.codecademy.com/article/pseudocode-and-flowchart-complete-beginners-guide
**) Inggriani Liem: Draft Diktat Dasar Pemrograman (Bagian Pemrograman Prosedural), Edisi April 2007
12/09/2026                                         WI1102/Computational Thinking                       9

## [D04_BasicStructure h10]

Pseudocode
• Pseudocode is a description of an algorithm using everyday wording,
  but molded to appear similar to a simplified programming language *)
• Think of pseudocode as a rough draft for your program.
     • Pseudocode helps us outline our program’s logic before implementing it in a
       specific programming language
• Often preferred over flowcharts for program design when you need to
  write detailed, text-based logic quickly, handle complex nested
  structures, or easily edit code-like steps without managing graphical
  shapes
• In this course, we will use adaptations of algorithmic notation
  developed by Inggriani Liem **) to write the pseudocodes
*) https://www.codecademy.com/article/pseudocode-and-flowchart-complete-beginners-guide
**) Inggriani Liem: Draft Diktat Dasar Pemrograman (Bagian Pemrograman Prosedural), Edisi April 2007
12/09/2026                                         WI1102/Computational Thinking                       10

## [D04_BasicStructure h11]

                                                           Mulai
Basic Structure of A Program
                          PSEUDOCODE                     input(A)
Program Test                                             input(B)
{ Calculate A + B }
DECLARATIONS
{ Deklarasi variable }                                   AA+B
   A, B : integer
ALGORITHM
  input(A)                                               output(A)
  input(B)                                               output(B)
  AA+B
  output(A)
                                                                     FLOWCHART
  output(B)                                                Selesai

12/09/2026               WI1102/Computational Thinking                    11

## [D04_BasicStructure h12]

Example of # Program Test                                                        Program title and
                                                                               specification, written
Program in # Specification: Calculate value of A and B                           inside comments

Python     # DECLARATIONS
                                                                                 DECLARATIONS:
                # A : int
                                                                                  Declarations of
                # B : int
                                                                                 variable A dan B

                # ALGORITHM
                A = int(input())          # input
                B = int(input())
                                                                                      ALGORITHM:
                A = A + B                 # process                                      Input,
                                                                                        Process,
                print(A)                  # output                                      Output
                print(B)

               The program code is inline with both pseudocode and flowchart from previous slide


  12/09/2026                      WI1102/Computational Thinking                                12

## [D04_BasicStructure h13]

Comments
• In programming, a comment is a part of the program that is not
  executed.
     • This section is used solely to provide explanations for a step or formula, or
       simply to add a note
• In Python, comments are usually written on a per-line basis,
  starting with #
• Example:
       # This is a comment


12/09/2026                       WI1102/Computational Thinking                    13

## [D04_BasicStructure h14]

Data

12/09/2026   WI1102/Computational Thinking   14

> (little or no text layer: read the page image app/public/pages/D04_BasicStructure/014.jpg)

## [D04_BasicStructure h15]

Data Abstraction
                                 90                    our ability to interpret
                                                      data within the context
                                                          of the problem


             Water
             temperature?

                                     Speed of a
                  Body weight?        moving
                                      vehicle?

12/09/2026                   WI1102/Computational Thinking                        15

## [D04_BasicStructure h16]

Data Abstraction Problem
                                                                    our ability to
                Water                                            understand context
             temperature?         Body weight?                   and represent it in
                                                                   another form.

                                                            Speed of
                                                            moving
                            90                              vehicle?

              derajat
              Celcius                           Km/jam
                        Kilogram
12/09/2026                       WI1102/Computational Thinking                         16

## [D04_BasicStructure h17]

Value of Data
• Each data has a set of values allowed for it, for examples:
     • Age of a person must be a positive integer (integer > 0)
     • Name of a person must be made of a sequence of letters (may contain
       numbers)
• Data may have range of values
     • Age of a person is between 1 and 100 (assuming a person’s age cannot be
       more than 100 years)
     • The length of the name of person is between 1 and 50 (assuming no
       names longer than 50 letters)



12/09/2026                      WI1102/Computational Thinking                17

## [D04_BasicStructure h18]

DECLARATIONS
• The DECLARATIONS part of a program is used to declare “names”
  used within the program: names of data types, variables,
  constants, functions & procedure
• Variable names represent the data used in the program.
• Each variable has a set of values allowed for it → called the data
  type
• Examples of data types:
     • Integer: set of negative, 0, and positive integers
     • Boolean: comprises of only two values: true, false


12/09/2026                       WI1102/Computational Thinking     18

## [D04_BasicStructure h19]

Basic/Primitive Data Types
• Basic/primitive data types are provided by programming language
    Python    Values
    Bool      Boolean values: True; False
    Numbers   Numeric values. Types of numeric values:
              • int : [signed] integer (+/-). Examples: 1; -144; 999; 0
              • float : floating point (real). Examples: 3.14; 4.01E+1
              • complex numbers → will not be used in this class
    Char      Character: a single letter, marked by single quote.
              Examples: ‘A’; ‘#’; ‘b’
    String    Set/sequence of characters/letters, marked by single or double quotes.
              Examples: ‘xcxcx’



12/09/2026                         WI1102/Computational Thinking                       19

## [D04_BasicStructure h20]

Examples of variables and their data types
• Age           → Integer, examples: 25; 44; 35
• City          → String, examples: “Jakarta”; “Bandung”
• Name          → String, examples: “Budi”; “Ali”
• Temperature   → Integer atau float, examples: 37.5; 100
• Area          → Integer atau float, examples: 400; 43.5
• Body Weight   → Integer atau float, examples: 60.5; 75
• Student No.   → Integer atau string?, example: 15812001


12/09/2026             WI1102/Computational Thinking        20

## [D04_BasicStructure h21]

Variable (1)
• A variable is a named component of a program code, used to store a
  value within a declared data type
• Represents data of something in the real world that want to be
  processed in the program
• Examples:
     • weight: represents the weight of a student in kg, data type: integer
     • sum_weight : represents the sum of the weight of all students, data type: integer
     • mark: represents course mark of student, data type: positive floating point/real
       number
• How to use a variable in a program:
     • Declare the variable: name and data type (in the DECLARATIONS part)
     • Value initialization and manipulation (in the ALGORITHM part)

12/09/2026                         WI1102/Computational Thinking                       21

## [D04_BasicStructure h22]

Variable (2)                              Python
                                          # DECLARATIONS
• Example of the                          # i : int
  declaration and                         # A : int
  initialization of a
  variable                                # ALGORITHM
     • In Python, write the               ...
       declaration of the data
       type of a variable                 i = 100
       within                             A = i * 50
       DECLARATIONS part                  ....
       (in comments) →
       serves as important
       documentation for
       programmers

12/09/2026                       WI1102/Computational Thinking   22

## [D04_BasicStructure h23]

Create a Correct and Good Variable Names
• The name of a variable must be started with a letter and then followed
  with combination of letters and numbers. No other characters allowed
  except for underscore (_)
     • Should not be separated with space(s)
• Make a name that can be understood properly and unambiguous,
  preferably simple and short
     • For example: sum is commonly used to represent the result of number
       summarization, therefore must be of numeric data types (integer/real). It will be
       confusing otherwise, the type String or Boolean for example.
• Python is a case sensitive language: upper and lowercase characters
  are treated as a different characters
     • Example: Weight and weight are two different names

12/09/2026                         WI1102/Computational Thinking                       23

## [D04_BasicStructure h24]

Assignment and Input/Output

12/09/2026   WI1102/Computational Thinking   24

> (little or no text layer: read the page image app/public/pages/D04_BasicStructure/024.jpg)

## [D04_BasicStructure h25]

Assigning Value of A Variable
• A known variable defined within a particular data types
  must be given a value to be used in a program
• Instruction to assign a value to a variable
     • Direct value assignment → assignment, using the operator =
             • Example:    A = 10
     • Provided via input device, using input instruction
             • examples:   A = input()




12/09/2026                          WI1102/Computational Thinking   25

## [D04_BasicStructure h26]

Assignment
• General format: <left-hand-side> = <right-hand-side>
• <left-hand-side> must be a variable
• <right-hand-side> can be a value/expression/other variable
  [which has been assigned a value]

Python
<left-hand-side> = <right-hand-side>
Examples:
i = 10                                                       The value of X is
Nama = “Maya”                                                assigned via an
X = i + 10                                                     expression

12/09/2026                   WI1102/Computational Thinking                       26

## [D04_BasicStructure h27]

Input
• Input: assignment of the value of a variable via input device, for example:
  keyboard (read user input)
• Command in Python: <var> = input(‘<prompt>’)
     • <var> is the variable
     • Replace <prompt> with a input instruction sentence that can be understood by the
       program user or leave it empty
     • The values entered via the device input must be of the same data type as the variable
• Examples:
        A = input()                                            # A must be a string
        B = input(‘Enter a number =')                          # B must be a string
        C = int(input())                                       # C must be an integer
        D = float(input('Masukkan angka ='))            # D must be a float/real number


                                 Type checking: ensuring the value entered is of
                                         the same type of the variable


12/09/2026                            WI1102/Computational Thinking                            27

## [D04_BasicStructure h28]

Type Conversion
 Several important type conversion functions in Python
     No.                            Function & Description
    1        int(x)
             Converts x into an integer
    2        float(x)
             Converts x into a floating point (real)
    3        str(x)
             Converts x into its string representation
    4        chr(x)
             Converts an integer x into a character
    5        ord(x)
             Converts a character Mengkonversi sebuah character x menjadi nilai
             integernya

12/09/2026                                  WI1102/Computational Thinking         28

## [D04_BasicStructure h29]

Output
• Output: write/print the value of a variable/constant/results of
  expression to the output device, for example: monitor/screen
• Command in Python: print
• Examples:
     print(A)                       # print the content of A to the screen
     print(‘Hello’)                 # print Hello to the screen
     print(A * 4)                   # print the result of A * 4
     print(“Hello World!” + str(a)) # print Hello World! <value of a>
                                              str(a) converts the value of variable A (can be a non-
                                              string variable into a string. + is a concatenation
                                              operator for strings.
12/09/2026                      WI1102/Computational Thinking                                      29

## [D04_BasicStructure h30]

                                                    # Program Exercise
                                                    # Exercise for data types and assignment

Exercise                                            # DECLARATIONS
                                                    # IA : int
                                                    # FA, FB : float
                                                    # SA, SB : string
• Determine for each line of the                    # BA : bool
                                                    # CA, CB : char
  following Python code (numbers
  are written within comments),                     # ALGORITHM
                                                    IA = 10          # (1)
  whether the assignment is correct                 FA = 3.45        # (2)
  or not.                                           FB = 4.567
                                                    FB = IA
                                                                     # (3)
                                                                     # (4)

• If it is not correct, provide                     SA = "ITBJAYA"   # (5)
  explanation.                                      SA = SB          # (6)

                                                    CA = 'C'         # (7)
                                                    CA = "MAJUTERUS" # (8)

                                                    BA = True        # (9)
                                                    BA = "#"         # (10)

12/09/2026                WI1102/Computational Thinking                              30

## [D04_BasicStructure h31]

Expressions

12/09/2026    WI1102/Computational Thinking   31

> (little or no text layer: read the page image app/public/pages/D04_BasicStructure/031.jpg)

## [D04_BasicStructure h32]

Expressions
• An expression is a combination of one or more variables, constants,
  operators, and functions that is meaningful according to the rules of a
  programming language and yields a value of a specific type.
• An operator is a standard function provided by a programming language
  to perform basic operations such as arithmetic, logical, and relational
  calculations.
• General structure of a [binary] expression:
                   <operand1> <operator> <operand2>
• The result of the operation depends on the data types of the operands.
• Operands can be values, variables, constants, or other expressions.
12/09/2026                   WI1102/Computational Thinking                 32

## [D04_BasicStructure h33]

Types of Expressions
• Types of expressions based on operator arity:
     • Binary expression: fundamentally an operation with two operands
             • Examples: A + 5
     • Unary expression: fundamentally an operation with one operand
             • Examples: not (found)
• Types of expressions based on the resulting data type:
     • Arithmetic expression: operands are numeric (int/float) and result in a
       numeric value
     • Relational expression: operands are numeric (int/float) and result in a
       boolean/logical value
     • Logical expression: operands are boolean/logical and result in a
       boolean/logical value

12/09/2026                             WI1102/Computational Thinking             33

## [D04_BasicStructure h34]

Basic Data Type Operators (1)
Arithmetic Operators
                                                                                     If a = 10 and b = 21, then:
Operator                           Description                            Operand Tyoe              Example
    +        Addition: adds the values ​of the two operands             int, float              a + b = 31
    -        Subtraction: subtracts the value of the right operand      int, float              a – b = -11
             from the value of the left operand.
    *        Multiplication: multiplies the values ​of the two          int, float              a * b = 210
             operands
    //       Integer division: If the operands are integers, the        int                     b // a = 2
             result of the operation is integer division.
    /        Real division: If the operands are floats, the result of   int, float              b / a = 2.1
             the operation is floating-point division.
    %        Modulo: the remainder of integer division                  int                     b%a=1
                                                                                                                21
    **       Exponentiation: raise the left operand to the power of int, float                  10 ** 21 = 10
12/09/2026
             the right operand.             WI1102/Computational Thinking                                            34

## [D04_BasicStructure h35]

Basic Data Type Operators (2)
Relational Operators
                                                                                                      If a = 10 and b = 21, then:
Operator                             Description                                    Operand Type                  Example
    ==       If the values ​of both operands are the same, it returns true        int, char, string, bool (a == b) menghasilkan false
             (does not apply to real numbers)
    !=       If the values ​of the two operands are not equal, it yields          int, float, char,       (a != b) menghasilkan true
             true.                                                                string, bool
     >       If the value of the left operand is greater than the right           int, float, char, string (a > b) menghasilkan false
             operand, it evaluates to true.
     <       If the value of the left operand is less than the right              int, float, char, string (a < b) menghasilkan true
             operand, it evaluates to true.
    >=       If the value of the left operand is greater than or equal to         int, float, char, string (a >= b) menghasilkan false
             the right operand, it evaluates to true.
    <=       If the value of the left operand is less than or equal to the        int, float, char, string (a <= b) menghasilkan true
             right operand, it evaluates to true.

12/09/2026                                        WI1102/Computational Thinking                                                 35

## [D04_BasicStructure h36]

Basic Data Type Operators (3)
Logical Operator

                                                                                  If a = true and b = false, then:
Operator                     Description                           Operand Type               Example
   and       AND: If both operands are true, the result boolean                   (a and b) equals to false
             is true.
    or       OR: If at least one of the two operands is           boolean         (a or b) equals to false
             true, the result is true.
   not       NOT: Invert the logical value of the                 boolean         not(a) equals to false
             operand.




12/09/2026                                 WI1102/Computational Thinking                                      36

## [D04_BasicStructure h37]

Basic Data Type Operators (4)
Assignment Operators

                                                                           If a = 10 and b = 21, then:
 Operator           Description            Type Operand                        Examples
   <op>=     <op> is + - * / %          int, float                a+=b; then a = 31
             Shortens operation                                   (equivalent to a = a + b)
             A = A <op> B                                         a*=b; then a = 210
             into                                                 (equivalent to a = a * b)
             A <op>= B




12/09/2026                        WI1102/Computational Thinking                                  37

## [D04_BasicStructure h38]

Sequential Actions

12/09/2026   WI1102/Computational Thinking   38

> (little or no text layer: read the page image app/public/pages/D04_BasicStructure/038.jpg)

## [D04_BasicStructure h39]

The ALGORITHM Part of A Program
• The part of a program in the form of algorithmic text containing
  instructions or action calls.
• Such algorithmic text can consist of:
     • Basic commands: Input/Output, assignment
     • Sequential commands
     • Case analysis/conditionals
     • Repetition... etc.
• In Python, each instruction is written on a separate line.
     • If more than one instruction is written on a single line, the instructions are
       separated by semicolons (;).
     • Examples: name = input(); print(name)

12/09/2026                        WI1102/Computational Thinking                    39

## [D04_BasicStructure h40]

Sequential Action
• Sequential action: a series of primitive instructions and/or actions to
  be carried out (executed) by a computer in the order in which they are
  written.
• Each action alters the state of the program.
     • Therefore, every sequential action must have a beginning and an end.
     • In other words, a program must start and, at some point, must end.
• Instructions are written in a specific sequence, line by line.
• Note that:
     • there are programs whose behavior changes if the order of instruction lines is
       altered,
     • while there are others whose behavior remains unchanged if the order of
       instruction lines is altered.

12/09/2026                         WI1102/Computational Thinking                        40

## [D04_BasicStructure h41]

The order of instructions does not change the execution
result…
 # Program Test            # Program Test
 # DECLARATIONS            # DECLARATIONS
 # i : int                 # i : int
 # x : float               # x : float

 # ALGORITHM               # ALGORITHM
 i = int(input())          x = 100.75                   The execution result
 x = 100.75                i = int(input())             remains unchanged,
                                                        even if the
                                                        instruction order is
 print(x)                  print(x)                     altered.
 print(i*2)                print(i*2)




12/09/2026              WI1102/Computational Thinking                  41

## [D04_BasicStructure h42]

The sequence of instructions changes the execution result…

 # Program Test            # Program Test
 # DECLARATIONS            # DECLARATIONS
 # i : int                 # i : int
 # x : float               # x : float

 # ALGORITHM               # ALGORITHM
 i = int(input())          i = int(input())             The execution
 x = 100.75                x = 100.75                   result changes
                                                        because the
                                                        order of
 print(x)                  print(i*2)                   instructions is
 print(i*2)                print(x)                     altered.




12/09/2026              WI1102/Computational Thinking                     42

## [D04_BasicStructure h43]

Program Block (1)
• A series of instructions executed sequentially is grouped into a
  program block.
• In Python, a program block is marked by increasing indentation.
• A program block may contain another program block nested
  within it (an inner block).
• If instructions belong to the same block, the indentation must be
  consistent; otherwise, an error will occur.



12/09/2026                 WI1102/Computational Thinking              43

## [D04_BasicStructure h44]

Program Block (2)                                  Examples:
                                                   • Line 7 to 13 are in 1 block (outer block)
a = int(input(“Enter a number = "))
if (a > 50):                                       • Line 9 to 10 are in 1 blok (inner block)
    print ("Hello World!")                         • Line 12 to 13 are in 1 blok (inner block)
    print ("bye")                   OK!
else: # a <= 50                                     1     # Program Test
                                                                                                Command if-then-
    print ("Hello Darling!")                        2
                                                    3     # DECLARATIONS
                                                                                                else… coming soon
    print ("bye bye")
                                                    4     # a : int
                                                    5
a = int(input("Enter a number = "))
                                                    6     # ALGORITHM
if (a > 50):
                                                    7     a = int(input("Enter a number = "))
    print ("Hello World!")          Error!          8     if (a > 50):
  print ("bye")
                                                    9         print ("Hello World!")
else: # a <= 50
                                                    10        print ("bye")
    print ("Hello Darling!")
                                                    11    else: # a <= 50
      print ("bye bye")
                                                    12        print ("Hello Darling!")
                                                    13        print ("bye bye")
                                                    14

  12/09/2026                         WI1102/Computational Thinking                                       44

## [D04_BasicStructure h45]

Example 1. Pak Pit’s Wheels
• Pak Pit, a bicycle repair shop owner, charges for each bicycle wheel
  he repairs based on the wheel's circumference.
• To do this, he measures the bicycle wheel's radius—the distance
  from the center of the wheel to its edge.
• Create a program that displays the calculated circumference of the
  circle based on the input radius value.
• The formula for calculating the circumference of a circle is: 2πr
     • r is the length of the radius.



12/09/2026                         WI1102/Computational Thinking    45

## [D04_BasicStructure h46]

Example 1. Pseudocode + Flowchart
                                                                           Start

                                                    Flowchart
 Pseudocode                                                              input(R)

 input(R)
 Circumference  2 * 3.14 * R
                                                                Circumference  2 * 3.14 * R
 output(Circumference)


                                                                  output(Circumference)



                                                                            End

12/09/2026                      WI1102/Computational Thinking                                  46

## [D04_BasicStructure h47]

Examples 1. Python
  # Program Circle_Circumference
  # Calculates the circumference of a circle based on the input radius

  # DECLARATIONS
  # R : float
  # Circumference : float

  # ALGORITHM
  R = float(input())

  Circumference = 2 * 3.14 * R

  print(Circumference)




12/09/2026                       WI1102/Computational Thinking           47

## [D04_BasicStructure h48]

Example 2. Average Height
• The teacher selects five students to join the school basketball
  team. He wants to determine their average height.
• Create a program to calculate the average height of the five
  students.
     • The program will accept height data for the five students as input.
     • Then, the program will display the average height of the five students.




12/09/2026                       WI1102/Computational Thinking                   48

## [D04_BasicStructure h49]

Example 2. Pseudocode + Flowchart
                                                Flowchart               Start



 Pseudocode                                                   input (t1, t2, t3, t4, t5)

 input(t1, t2, t3, t4, t5)
 avg  (t1+t2+t3+t4+t5)/5
                                                             avg  (t1+t2+t3+t4+t5)/5
 output(avg)


                                                                   output (avg)



                                                                        End

12/09/2026                   WI1102/Computational Thinking                                 49

## [D04_BasicStructure h50]

Examples 2. Python
 # Program AverageHeight
 # Accepts the heights of 5 students and calculates the average

 # DECLARATIONS
 # t1, t2, t3, t4, t5 : float
 # avg : float

 # ALGORITHM
 t1 = float(input())
 t2 = float(input())
 t3 = float(input())
 t4 = float(input())
 t5 = float(input())

 avg = (t1 + t2 + t3 + t4 + t5)/5

 print (avg)


12/09/2026                      WI1102/Computational Thinking     50

## [D04_BasicStructure h51]

More Exercises
• For the following problems, practice creating:
     • A flowchart or pseudocode (choose one, or follow the instructor's
       requirement)
     • The corresponding Python program




12/09/2026                      WI1102/Computational Thinking              51

## [D04_BasicStructure h52]

Exercise 1. Calculate Distance
• In physics, distance (s) can be calculated based on speed (v) and
  travel time (t) using the formula: s = v * t.
• Write a program to calculate distance (in meters) based on input
  for speed (in m/s) and time (in seconds).




12/09/2026                 WI1102/Computational Thinking              52

## [D04_BasicStructure h53]

Exercise 2. Triangular Banners
• Mrs. Tuti is a well-known entrepreneur in her city who produces
  *umbul-umbul* (decorative vertical banners). She creates banners
  in various shapes, including triangles.
• For each triangular banner, Mrs. Tuti sets the price based on its
  area. To calculate the area, she needs the banner's height and base.
• Create a program that accepts the height and base as input and
  calculates the area of ​the triangular banner.
• Triangle area formula: area = ½ * base * height


12/09/2026                 WI1102/Computational Thinking             53

## [D04_BasicStructure h54]

Exercise 3. The Marble Shop
• A shop sells marbles. The following table shows the prices of the
  marbles based on their color:
             Marble color   Price per marble (in hundred rupiah)
             Red            10
             Green          15
             Yellow         20


• A child buys m red marbles, h green marbles, and k yellow
  marbles. Assume m ≥ 0, h ≥ 0, and k ≥ 0.
• Calculate the total amount the child must pay.
12/09/2026                       WI1102/Computational Thinking        54

# SOURCE D05_Conditionals_Repetition (slides, 51 pages)


## [D05_Conditionals_Repetition h1]

Conditionals & Repetitions
- Python

WI1102 Computational Thinking Teaching Team
Institut Teknologi Bandung © 2026

## [D05_Conditionals_Repetition h2]

Conditionals

9/28/2026      WI1102/Computational Thinking   2

> (little or no text layer: read the page image app/public/pages/D05_Conditionals_Repetition/002.jpg)

## [D05_Conditionals_Repetition h3]

Objectives
• Students can explain the definition and types of conditionals.
• Students can correctly use conditionals notation.
• Students can apply various types of conditionals to solve simple
  problems.




9/28/2026                  WI1102/Computational Thinking             3

## [D05_Conditionals_Repetition h4]

Example 1. Selecting A Mango
• Conditionals can be applied to
  everyday life—for example,
  when selecting a mango.
• A ripe mango ready to eat is
  yellow.
• If it is not yellow, it is not ripe.




9/28/2026                       WI1102/Computational Thinking   4

## [D05_Conditionals_Repetition h5]

Flowchart                          Start
Selecting A Mango
                             Select Mango




                                  Is it
            yes                 yellow?                   no


              Ripe                                   Not ripe




                                 End
9/28/2026            WI1102/Computational Thinking              5

## [D05_Conditionals_Repetition h6]

Selecting A Mango - Pseudocode
Select Mango
if (Is it yellow? = true) then
     Ripe
else { Is it yellow? = false }
     Not Ripe




9/28/2026           WI1102/Computational Thinking   6

## [D05_Conditionals_Repetition h7]

Example 2. Preparing Potatoes for Dinner
• Every day, Mom prepares potatoes for dinner.
• Based on observation, there are days when Mom wears an apron
  while peeling potatoes, and other days when she doesn't.
     • It turns out that if Mom is wearing light-colored clothing, she wears an
       apron—fearing her clothes might look dirty.
     • If she isn't (i.e., wearing dark-colored clothing), she doesn't wear an
       apron.




9/28/2026                        WI1102/Computational Thinking                    7

## [D05_Conditionals_Repetition h8]

                               Case-1:
                               Yes




                 Condition: Is                                    Wear apron
                   the clothing
                 light-colored?
                                                                               Peel potatoes




                                  Case-2:
                                  No

            Potatoes are available
                                                                               Potatoes are peeled
9/28/2026                                   WI1102/Computational Thinking                            8

## [D05_Conditionals_Repetition h9]

Flowchart: Preparing Potatoes for Dinner
                                   Initial State:
                                   Potatoes are
                Start                available



            Check clothing                                              Final State:
                color                                                   Potatoes are
                                                                          peeled


                Is the       Yes
               clothing                Wear apron                 Peel Potatoes        End
            light-colored
                        No

9/28/2026                               WI1102/Computational Thinking                        9

## [D05_Conditionals_Repetition h10]

Preparing Potatoes for Dinner – Pseudocode
Check_clothing_color

if (Is_the_clothing_light_colored? = yes) then
        Wear_apron
{ else : Is_the_clothing_light_colored? = no, do nothing }

Peel_potatoes


9/28/2026                   WI1102/Computational Thinking    10

## [D05_Conditionals_Repetition h11]

Conditionals (1)
• Allows us to write the same code that produces different
  executions
• Often referred to as branching
     • Involves a choice (branching) from a single step to multiple possible steps
• Consists of:
     • Condition: an expression that evaluates to true or false
     • Action: a statement executed if the condition associated with that action
       is met



9/28/2026                        WI1102/Computational Thinking                     11

## [D05_Conditionals_Repetition h12]

Conditionals (2)
• Proper conditionals must satisfy two criteria:
     • COMPLETE: all conditions/cases are fully defined
     • DISJOINT: there is no overlap between conditions/cases
• Example: Given an integer, say A, determine whether the number
  is positive, negative, or zero.
     • There are three complete and disjoint cases:
            • A>0
            • A<0
            • A=0
     • No other cases can be defined, and the three cases do not overlap.


9/28/2026                        WI1102/Computational Thinking              12

## [D05_Conditionals_Repetition h13]

                                                               Pseudocode

General Syntax                                                 if ( condition ) then
                                                                   action-1
                                                               else { condition=false }
                                                                   action-2
 Python
 if ( condition ):                                             Flowchart
      action-1
 else: # condition = false
      action-2                                                      true                false
                                                                            condition



                If action-1 or action-2 consists
                of more than one instructions,                  action-1                 action-2
                 make sure the indentation is
                              neat


9/28/2026                      WI1102/Computational Thinking                                    13

## [D05_Conditionals_Repetition h14]

Types of Conditionals (in Python)
One Case                                Many Cases
if ( condition ):                        if (condition-1):
       action-1                                 action-1
                                         elif (condition-2):
# if condition=false                            action-2
# no action defined                      elif (...):
                                               # condition-3 ... dst
                                                ...
Two [Complementary] Cases                else: # condition-n
                                                action-n
if ( condition ):
     action-1
else: # condition=false                  Please adjust the pseudocodes and flowcharts,
                                         or check the following examples.
     action-2


9/28/2026                 WI1102/Computational Thinking                                  14

## [D05_Conditionals_Repetition h15]

Example 3. Is the integer positive?
[One Case]
• Given an integer, for example A, state whether the integer is
  positive or not.
• Condition: Is A > 0?
• Cases:
     • If yes, then: write “Positive”
     • If no, do nothing.




9/28/2026                          WI1102/Computational Thinking   15

## [D05_Conditionals_Repetition h16]

 Example 3. Pseudocode + Flowchart
                                                                     Start

                                                    Flowchart
Pseudocode
                                                                    input(A)
input(A)
if (A > 0) then
                                                             true
        output(“Positive”)                                           A>0
{ else: do nothing}
                                                     output              false
                                                   (“Positive”)



                                                                      End

 9/28/2026                   WI1102/Computational Thinking                       16

## [D05_Conditionals_Repetition h17]

Example 3. Python
 # Program Print_Positive
 # Input A; If A >= 0, print "positive"

 # DECLARATIONS
 # A : int

 # ALGORITHM
 A = int(input())

 if (A >= 0):
    print("positif")
 # else: tidak dilakukan apa pun




9/28/2026                    WI1102/Computational Thinking   17

## [D05_Conditionals_Repetition h18]

Example 4. Odd or Even?
[Two Complementary Cases]
• Write a program that accepts a positive integer input (assume the
  input is valid), for example N, and then determines whether the
  number is even or odd.
• N is an even number if N mod 2 = 0; if N mod 2 = 1, then N is an
  odd number.
• There are no other cases.
• Cases:
     • If N mod 2 = 0, print “even”.
     • Otherwise (N mod 2 = 1), print “odd”.


9/28/2026                       WI1102/Computational Thinking         18

## [D05_Conditionals_Repetition h19]

Example 4. Pseudocode + Flowchart
Pseudocode                                                            Start
                                                Flowchart

input(N)
                                                                    input(N)
if (N mod 2 = 0) then
        output(“even”)
                                                            true                  false
else { N mod 2 = 1 }                                                N mod 2 = 0
        output(“odd”)
                                                          output                  output
                                                         (“even”)                 (“odd”)


                                                                     End

9/28/2026                WI1102/Computational Thinking                                      19

## [D05_Conditionals_Repetition h20]

Example 4. Python
 # Program Odd_Even
 # Input N>0. If N is even, print "even"
 # If not, print "odd"

 # DECLARATIONS
 # N : int

 # ALGORITHM
 N = int(input()) # Assume: N > 0

 if (N % 2 == 0):
     print("even")
 else: # N % 2 == 1
     print("odd")




9/28/2026                    WI1102/Computational Thinking   20

## [D05_Conditionals_Repetition h21]

Example 5. Positive, Negative, or Zero?
• Write a program that accepts an integer input, for example N, and
  determines whether N is a positive integer, a negative integer, or
  zero.
• Cases:
     • If N > 0, print “positive”
     • If N < 0, print “negative”
     • If N = 0, print “zero”




9/28/2026                           WI1102/Computational Thinking      21

## [D05_Conditionals_Repetition h22]

Example 5. Pseudocode + Flowchart
                                                                      Start
Pseudocode                                       Flowchart
                                                                                  For many cases,
input(N)                                                            input(N)       this is the way
                                                                                     to express
if (N > 0) then                                                                      conditions

     output(”positive”)                                     N>0                  N=0
                                                                       N
else if (N < 0) then
     output(“negative”)                                       N<0

else { N = 0 }                                 output                output              output
                                             (“positive”)         (“negative”)          (“zero”)
      output(“zero”)

                                                                      End

9/28/2026                 WI1102/Computational Thinking                                     22

## [D05_Conditionals_Repetition h23]

Example 5. Python
 # Program Print_Number
 # Input N. Print whether N is positive, negative, or zero

 # DECLARATIONS
 # N : float

 # ALGORITHM
 N = int(input())

 if (N > 0):
     print("positive")
 elif (N < 0):
     print("negative")
 else: # N = 0
     print("zero")



9/28/2026                    WI1102/Computational Thinking   23

## [D05_Conditionals_Repetition h24]

Repetition/Loop

9/28/2026   WI1102/Computational Thinking   24

> (little or no text layer: read the page image app/public/pages/D05_Conditionals_Repetition/024.jpg)

## [D05_Conditionals_Repetition h25]

Objectives

• Students can explain the types of loops, their usage, and their
  constituent elements.
• Students can correctly use the appropriate loop notation.
• Students can effectively utilize the various types of loops to solve
  assigned simple problems.




9/28/2026                   WI1102/Computational Thinking                25

## [D05_Conditionals_Repetition h26]

Preparing Potatoes for Dinner

• Assumption: There is an unlimited supply of potatoes.
• One day, Mom peeled only four potatoes because only family
  members were having dinner.
• On another occasion, Mom invited 400 WI1102 students to her
  home for dinner, so she peeled 400 potatoes for everyone.
• On yet another occasion, Mom did not know how many people
  would be having dinner.
     • After peeling each potato, she checked whether the quantity was sufficient
       according to the number of arriving guests.

9/28/2026                       WI1102/Computational Thinking                  26

## [D05_Conditionals_Repetition h27]

                                                                     Peel 1 potato




      Do we have enough peeled potatoes?
      Number of potatoes = 4?
      Number of potatoes = 400?
      Number of potatoes = number of guests
      arriving

                                                                      Number of peeled
                                                                      potatoes is enough




9/28/2026                            WI1102/Computational Thinking                         27

## [D05_Conditionals_Repetition h28]

Print 1 and 2
• Write a program that prints the numbers 1 and 2 and then 1+2 to
  the screen
• Example output:
            1                       # ALGORITHM
            2                       print(1)
            3                       print(2)
                                    print(1+2)




9/28/2026                 WI1102/Computational Thinking             28

## [D05_Conditionals_Repetition h29]

Print 1 to 3
• Write a program that prints the numbers 1 to 3 and then 1+2+3 to
  the screen
• Example output:
                                # ALGORITHM
            1                   print(1)
            2                   print(2)
            3                   print(3)
            6                   print(1+2+3)




9/28/2026                 WI1102/Computational Thinking          29

## [D05_Conditionals_Repetition h30]

Print 1 to 10
• Write a program that prints the numbers 1 to 10 and then
  1+2+3+…+10 to the screen
• Example output: 1
                                                 # ALGORITHM
                   2
                                                 print(1)
                   3
                                                 print(2)
                   4
                                                 print(3)
                   5                             print(4)
                   6                             print(5)
                   7                             print(6)
                   8                             … #continue on your own!
                   9                             print(10)
                   10                            print(1+2+3+4+5+6+7+8+9+10)
                   55

9/28/2026                 WI1102/Computational Thinking                        30

## [D05_Conditionals_Repetition h31]

Print 1 to 100
• Write a program that prints the numbers 1 to 100 and then
  1+2+3+…+100 to the screen
• Example output:
    1                    # ALGORITHM
    2                    print(1)
    3                    print(2)
    4                    print(3)
    5                    print(4)
    6                    print(5)
    7                    print(6)
    8
                         … #continue on your own!!
    9
                         print(100)
    10
                         print(1+2+3+4+5+6+7+8+9+10+ … #continue!!)
    … // continue!!


9/28/2026                 WI1102/Computational Thinking               31

## [D05_Conditionals_Repetition h32]

How about…
You have to print and add up

  1 to 1000 ???
  1 to 10000 ???
  1 to 1000000 ???
  ….




9/28/2026                 WI1102/Computational Thinking   32

## [D05_Conditionals_Repetition h33]

Repetition: The Background

• Carrying out an instruction, even an action, repeatedly
     • Computer: has the same performance
     • Humans: have a tendency to make mistakes (because they are tired or
       bored)




9/28/2026                      WI1102/Computational Thinking                 33

## [D05_Conditionals_Repetition h34]

Repetition (Looping)

• Elements:
     • Repetition-condition: logical expression
     • Repetition-body: action that is repeated
• Types of repetition notation in Python:
     • Based on counter: for
     • Based on the repetition condition at the beginning: while




9/28/2026                       WI1102/Computational Thinking      34

## [D05_Conditionals_Repetition h35]

Example 1
• Write a program that accepts as input an integer for example N
  and writes the numbers 1, 2, 3, ... N and writes 1+2+3+...+N to the
  screen.
• Assume N > 0.                                     N = 10
• Examples:                            N=5          Output on screen:
                                                    1
                                               Output on screen:
                     N=1                       1                   2
                     Output on screen:         2                   3
                     1                         3                   4
                     1                         4                   5
                                               5                   6
                                               15                  7
                                                                   8
                                                                   9
                                                                   10
                                                                   55
9/28/2026                     WI1102/Computational Thinking             35

## [D05_Conditionals_Repetition h36]

Looping Based on Counter (for)
• Repetition is carried out based on the price range of an counter
  variable (in the previous example i)
     • The price range for processed counters is from hmin to hmax
• The counter must be a variable with a type that defines its
  successor and predecessor, for example: integer
• The action will be carried out as long as the counter value is still
  within the specified range
• The counter price is incremented each time the action is
  performed
     • For this reason, the final value of the range must be written hmax+1 (so
       that hmax is still processed)
9/28/2026                        WI1102/Computational Thinking                    36

## [D05_Conditionals_Repetition h37]

                                                                                      flowchart

Looping Based on Counter (for)
                                                                                    Initialization-action
Python
                                                                           for
Initialization-action                                                                    i  hmin
for i in range(hmin,hmax+1):
     action
Termination                                                                             i <= hmax

i is a counter variable (can be replaced by another variable)
hmin = value of i at the beginning of the loop; hmax = last i               false              true
value processed;
The value of i when exiting the loop is hmax+1                                             action
Every time it repeats, i is incremented (plus 1)

                                      Initialization-action                              ii+1
                                      i traversal [hmin..hmax]
                                         action
                    pseudocode        Termination                                      Termination

 9/28/2026                                 WI1102/Computational Thinking                                    37

## [D05_Conditionals_Repetition h38]

Example 1.
             # Program AddingUp_Numbers
for          # Calculate 1+2+3+...+N and print the result.
             # Assumption: N > 0

             # DECLARATIONS
             # N : int
             # i, sum : int

             # ALGORITHM
             N = int(input())               # initialization
             sum = 0                        # initialization

             for i in range(1,N+1):
                 print(i)        # action
                 sum = sum + i   # action

             print(sum)                     # Termination

9/28/2026           WI1102/Computational Thinking              38

## [D05_Conditionals_Repetition h39]

                                                                                     flowchart
Counting Backward
Python                                                                             Initialization-action

Initialization-action                                                     for
                                                                                       i  hmaks
for i in range(hmax,hmin-1,-1):
     action
Termination                                                                             I >= hmin
i is a counter variable (can be replaced by another variable)
hmax = value of i at the beginning of the loop; hmin = last i
                                                                           false              true
value processed;
The value of i when exiting the loop is hmin-1
Every time it repeats, i is decremented (minus 1)                                         action


                                     Initialization-action
                                     i traversal [hmax..hmin]                            ii-1
                                        action
                pseudocode           Termination
                                                                                      Termination

 9/28/2026                                WI1102/Computational Thinking                                    39

## [D05_Conditionals_Repetition h40]

Looping based on repetition-condition at the
beginning [while]
• actions are carried out as long as repetition-condition is still
  satisfied (true)
• This type of repetition has the potential to give rise to "empty"
  action (action never performed at all)
   • Because in the first test of the repetition-condition, it returns false, so it
        never visits and executes repetition-body and immediately exits the loop




9/28/2026                         WI1102/Computational Thinking                       40

## [D05_Conditionals_Repetition h41]

Based on repetition-condition at                                                 flowchart

the beginning
                                                                               Initialization-action
Python
Initialization-action                                                             First-Element
First-Element
while (repetition-condition):                                         while
    action                                                                          repetition-
    Next-Element                                                                     condition
# repetition-condition=false
                                                                       false
Termination                                                                               true

                                                                                      action
                           Initialization-action
              pseudocode
                           First-Element
                           while (repetition-condition) do                        Next-Element
                               action
                               Next-Element
                           { repetition-condition = false }
                                                                                   Termination
                           Termination
  9/28/2026                           WI1102/Computational Thinking                                    41

## [D05_Conditionals_Repetition h42]

              # Program AddUpNumbers
Example 1.    # Calculate 1+2+3+...+N. Assumption: N > 0
while         # DECLARATIONS
              # N : int
              # i, sum : int

              # ALGORITHM
              N = int(input())                       # initialization
              sum = 0                                # initialization
              i = 1                                  # First-Element
              while (i <= N):                        # repetition-condition
                    print(i)                         # action
                    sum = sum + i                    # action
                    i = i + 1                        # Next-Element
              # i > N
              print(sum)                             # Termination

  9/28/2026          WI1102/Computational Thinking                            42

## [D05_Conditionals_Repetition h43]

Example 2
• Write a program that accepts input of 10 integer numbers (from
  the keyboard) and prints to the screen the total number of the 10
  integers.
                   Input        Output on screen
• Example:
                   2               18
                   1
                   0
                   -9
                   7
                   13
                   2
                   2
                   1
                   -1

9/28/2026                  WI1102/Computational Thinking              43

## [D05_Conditionals_Repetition h44]

                                                                                 Start
Example 2. for
Pseudocode+Flowchart                                                            sum  0


                                                               for
                                                                                 i 1
pseudocode                                  flowchart
 Sum  0 { Initialization }                                          false        i <=
 i traversal [1..10]                                                               10
    input(X)      { action }                                                             true
    sum  sum + X { action }                                                    input(X)
 output(sum) { Termination }                                                 sum  sum + X


                                                                                ii+1



                                                                              output(sum)


                                                                                 End
9/28/2026                      WI1102/Computational Thinking                                    44

## [D05_Conditionals_Repetition h45]

Example 2.    # Program AddUp10Number
              # Accepts input of 10 integers and
for           # print the total number of the 10 integers
Python        # DECLARATIONS
              # N, i, sum : int

              # ALGORITHM
              sum = 0                               # initialization

              for i in range(1, 11):
                  N = int(input())                  # action
                  sum = sum + N                     # action

              print(sum)                            # termination

  9/28/2026         WI1102/Computational Thinking                   45

## [D05_Conditionals_Repetition h46]

Example 2. Discussions
• It is most appropriate to use “for”:
    • Because the number of times the action must be repeated is known for
        certain, namely 10x, meaning the range of counter prices for repetition is
        known for certain, namely from 1..10 (the last value of the counter when it
        exits the loop = 11)
• It is not appropriate to use “while” because there is no possibility
  of an "empty" case
    • “while” is more appropriate to use if there is a possibility that the action
        will never be carried out at all (empty case), in this case, the action will
        definitely be carried out, at least once.



9/28/2026                           WI1102/Computational Thinking                      46

## [D05_Conditionals_Repetition h47]

Example 3
• Write a program that reads a number
  of integer numbers from the keyboard
  until the user enters the number -999                  No     Input   Output
  (the number -999 does not include the                  1      -1      Number of numbers = 5
  processed number).                                            12      Total number = 17
• Print how many numbers were                                   -6      Average = 3.40
  entered, the total value, and the                             10
  average of all the numbers                                    2
                                                                -999
• If the first input says -999, then write               2      -999    No data is processed
  the message "No data processed"

• Hint: Use a while loop

9/28/2026                       WI1102/Computational Thinking                                   47

## [D05_Conditionals_Repetition h48]

Example 3. Pseudocode
 sum  0; count  0 { Initialization }

 input(X) { First-Elmt }
 { Looping using while-do }
 while (X ≠ -999) do
   sum  sum + X
   count  count + 1
   input(X)
 { X = -999 }

 { Termination }
 if (count > 0) then
    avg  sum/count
    output(count,sum,rata)
 else { count = 0 }
    output(“No data processed”)


9/28/2026                                WI1102/Computational Thinking   48

## [D05_Conditionals_Repetition h49]

   Start            sum  0; count  0


                          input(X)
                                                        Example 3. Flowchart
                                                while
            false
                         X ≠ -999

                               true
                                                                     action
                      sum  sum + X
                     count  count + 1

                          input(X)


                                     true           avg  sum/count
                    count > 0
                                                 output(count, sum, rata)
                                                                              End
                         false                         output(“No data
                                                         processed”)
       Termination
9/28/2026                                   WI1102/Computational Thinking           49

## [D05_Conditionals_Repetition h50]

             # Program AvgNumbers
             # Accepts input of an integer number until the user enters -999

Example 3.   # and displays the number of numbers, the total, and the average

             # DECLARATIONS
Python       # X, count, sum : int
             # avg : float

             # ALGORITHM
             sum = 0; count = 0           # initialization

             X = int(input())             # First-Elmt
             while (X != -999):
                 count = count + 1        # action
                 sum = sum + X
                 X = int(input())         # Next-Elmt
             # X = -999

             # Termination
             if (count > 0):
                 print(“Number of numbers = " + str(count))
                 print(“Total number = " + str(sum))
                 avg = sum/count
                 print(“Average = " + str(rata))
             else:
                 print (“No data processed")
 9/28/2026             WI1102/Computational Thinking                     50

## [D05_Conditionals_Repetition h51]

Example 3. Discussions

• Repetition using “while” is most appropriate because:
     • There is a possibility that the action is never carried out at all (empty
       case), namely if the X value that the user first enters is -999 (see Example
       2)
• “for” is not appropriate to use because it does not have a defined
  value range




9/28/2026                         WI1102/Computational Thinking                       51

# SOURCE D06_Array (slides, 34 pages)


## [D06_Array h1]

Array and Its Processing -
Python

WI1102 Computational Thinking Teaching Team
Institut Teknologi Bandung © 2026

## [D06_Array h2]

Objectives
• Students will be able to:
     • Explain the definition and purpose of arrays
     • Correctly use array definition and referencing notation
     • Perform sequential processing on arrays




28/09/2026                       WI1102 Computational Thinking   2

## [D06_Array h3]

Name Combination – 3 Names
• Write a program that accepts three names and then displays all
  combinations of name pairs.
• Example output:         # DECLARATIONS
                          # name1, name2, name3 : string
       Ali
       Budi               # ALGORITHM
       Caca               name1 = input()
       Ali - Budi         name2 = input()
       Ali - Caca         name3 = input()
       Budi - Caca
                          print(name1, " – ", name2)
                          print(name2, " - ", name3)
                          print(name3, " – ", name1)


28/09/2026                WI1102 Computational Thinking            3

## [D06_Array h4]

Name Combination – 10 Names
• Write a program that accepts 10 names and then displays all
  combinations of name pairs.
• Example output:      # DECLARATIONS
                       # name1,name2,name3,name4,name5 : string
                       # name6,name7,name8,name9,name10 : string
   Ali - Budi
   Ali - Caca          # ALGORITHM
                       name1 = input()
   …                   name2 = input()
                       name3 = input()
   Ina - Jaja          # … Continue on your own
                       name10 = input()
                       print(name1, " – ", name2)
                       print(name2, " – ", name3)
                       print(name3, " – ", name4)
                       # … Continue on your own
                       print(name10, " – ", name1)


28/09/2026                 WI1102 Computational Thinking           4

## [D06_Array h5]

What if…
You are asked to display all possible name-pair combinations from
…

100 names ???
1000 names ???
10000 names ???
1000000 names ???
….

28/09/2026                WI1102 Computational Thinking     5

## [D06_Array h6]

Array / Vector / Table

                NMin   NMin+1   NMin+2   NMin+3                   NMax-2   NMax-1   NMax



             Array                                         Elemen Array, dengan
                          index Array                      tipe homogen untuk
                                                           setiap elemen

• An array defines a collection (one or more) of elements of the same type.
• Each element is arranged sequentially (contiguously) and can be accessed
  using an index.
• In Python, there are several ways to declare an array; in this lecture, arrays
  are defined using the `list` collection type.

28/09/2026                               WI1102 Computational Thinking                     6

## [D06_Array h7]

Array Declaration in Python (1)
Method-1:
• Declaring an array variable while simultaneously defining its
  contents:
          <name-var> = [<val0>, <val1>, <val2>, … ,< valn-1>]
     • Declare an array named <name-var> of size n with elements <val0>,
       <val1>, <val2>, … ,< valn-1>
     • The element type depends on the assigned element value.
     • Elements are ordered by index from 0 to n-1.



28/09/2026                      WI1102 Computational Thinking              7

## [D06_Array h8]

Array Declaration in Python (2)
• Example-1:
  TabInt = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]

               9    8    7   6         5       4       3         2   1   0
               0    1    2   3         4       5        6        7   8   9



  An array named TabInt with elements of type integer and a size
  of 10 where the array element addresses (indices) range from
  index from index 0 to 9


28/09/2026                       WI1102 Computational Thinking               8

## [D06_Array h9]

Array Declaration in Python (3)
• If the values ​to be assigned to the array are not yet known, a
  uniform default value can be assigned initially.
     • Example: An array of integers—default element value = 0.
• Method-2: Declaring an array and filling it with default values:
       <name-var> = [<default-val> for i in range (<n>)]
     • Declare an array named <name-var> of size <n> with each element
       initialized to <default-val>. The variable i is used in the loop to assign the
       default value to each array element.
     • The element type depends on the value <default-val>
     • Elements are ordered by index from 0 to n-1.

28/09/2026                         WI1102 Computational Thinking                        9

## [D06_Array h10]

Array Declaration in Python (3)
• Example-2: Array of integer
  TabInt = [0 for i in range(10)]

              0   0    0   0         0       0       0         0   0   0
              0    1   2   3         4       5        6        7   8   9



  An array named TabInt with the size of 10 – each element is of
  type integer and initialized to the default value of 0 where each
  element is accessed using indices ranging from index 0 to 9


28/09/2026                     WI1102 Computational Thinking               10

## [D06_Array h11]

Array Declaration in Python (3)
• Example-3: Array of character
  TabChar = [‘*’ for i in range(10)]

               *   *   *   *         *       *        *        *   *   *
               0   1   2   3         4       5        6        7   8   9



  An array named TabChar with a size of 10 elements – each
  element is of type char and initialized to the default value *, where
  each element is accessed using indices ranging from index 0 to 9


28/09/2026                     WI1102 Computational Thinking               11

## [D06_Array h12]

Accessing Array Elements in Python
• How to access an element: <table_name>[<index>]
• Example:    TabInt = [1,2,4,-1,100,2,0,-1,3,9]

                     1    2    4    -1     100       2        0     -1   3   9
                     0    1    2     3       4       5        6     7    8   9

  print(TabInt[5])                 # prints: 2
  x = TabInt[1] + TabInt[6]        # x = 2 + 0 = 2
  TabInt[9] = 9                    # Element of index 9 becomes 9
  TabInt[10] ???                   # Out of range, undefined!!


• Note: Accessing elements with an index outside the defined range is
  not permitted.
     • In the example above, for instance: TabInt[10], TabInt[-1], etc.

28/09/2026                          WI1102 Computational Thinking                12

## [D06_Array h13]

                                                       Start

Array Processing
                                                    Populating
                                                      Array


                                                    Processing
                                                      Array


                                                   Output Array
                                                    Processing
                                                     Results


                                                       End
28/09/2026         WI1102 Computational Thinking                  13

## [D06_Array h14]

Sequential Processing on Arrays (1)
• Sequential processing of an array involves processing each array
  element—starting from the element at the lowest index and
  proceeding to the highest index —using a loop.
     • Each array element is accessed directly via its index.
     • The first element is the array element with the lowest index.
     • The next element is reached by moving to the successor index.
     • The termination condition is met when the index being processed is the
       highest previously defined index.
• The array is non-empty, meaning it contains at least one
  element.

28/09/2026                      WI1102 Computational Thinking                   14

## [D06_Array h15]

Sequential Processing on Arrays (2)
• Examples of sequential processing tasks on arrays:
     • Populating an array sequentially
     • Printing array elements
     • Calculating the average value of array elements
     • Multiplying array elements by a value
     • Finding the maximum/minimum value in an array
     • Finding the index where a value first appears in an array
     •…




28/09/2026                       WI1102 Computational Thinking     15

## [D06_Array h16]

   General Flowchart + Pseudocode
   Sequential Processing on Arrays
Flowchart:
                                                       Pseudocode:
              i  first-index
                                                         i traversal [first-index..last-index]
                                 loop                        { Process of i-th element }
      false
                i ≤ last-index                               ...

                        true

              Process of i-th
                 element



                  ii+1


   28/09/2026                           WI1102 Computational Thinking                            16

## [D06_Array h17]

Populating An Array (1)                               # Program PopulatingArray
                                                      # Populating an array with
                                                      # values ​
                                                               from the user
• Write a program that declares an
                                                      # DECLARATIONS
  array of 10 integers and populates it               # TabInt : array [0..9] of int
  with values ​read from the keyboard.                # i : int

                                                      # ALGORITHM
                                                      # Declare array TabInt and
                                                      # populate it with the default value 0
                                                      TabInt = [0 for i in range(10)]
• Be careful not to access elements
  outside the array's index bounds!                   # Populating an array with values ​
                                                                                        read
                                                      # from the keyboard
                                                      for i in range(0,10):
                                                          TabInt[i] = int(input())



28/09/2026                 WI1102 Computational Thinking                               17

## [D06_Array h18]

                                      Populating An Array (2):
                 Start
Flowchart:                            Flowchart + Pseudocode
                 i0
                                                      Pseudocode:
                               loop
      false
                 i < 10                                 i traversal [0..9]
                                                            input(TabInt[i])
                     true

           input (TabInt[i])


               ii+1


                   End


  28/09/2026                           WI1102 Computational Thinking           18

## [D06_Array h19]

                                                            # Program DisplayArray
Displaying the Contents                                     # Populates an array with values ​
                                                                                             from#
                                                            # the user and displays its contents

of an Array (1)                                             # to the screen

                                                            # DECLARATIONS
• Write a program that:                                     # TabInt : array [0..9] of int
                                                            # i : int
     • declares an array of 10 integers
     • populates it with values ​read from the              # ALGORITHM
                                                            # Declare array TabInt and initialize
       keyboard                                             # it with a default value of 0
     • displays the contents of the array on                TabInt = [0 for i in range(10)]
       the screen
                                                            # Populate the array by reading
                                                            # values from the keyboard
                                                            for i in range(0,10):
• Be careful not to access elements                             TabInt[i] = int(input())
  outside the array's index bounds!
                                                            # Print the array contents
                                                            for i in range(0,10):
                                                                print(TabInt[i])
28/09/2026                       WI1102 Computational Thinking                                19

## [D06_Array h20]

   Displaying the Contents of an Array(2)
Flowchart:
                                                     Pseudocode:
                i0
                                                       ... { Array populating part }
                                                       i traversal [0..9]
                               loop                        output(TabInt[i])
      false
                 i < 10

                     true

          output (TabInt[i])              Try writing the array-populating part yourself as an exercise.


                ii+1



   28/09/2026                         WI1102 Computational Thinking                                  20

## [D06_Array h21]

                                                      # Program AverageArray
                                                      # Calculates the average value of array elements


Calculating the Average (1)                           # DECLARATIONS
                                                      # TabInt : array [0..9] of int
                                                      # i, sum : int
                                                      # avg : float
• Write a program to calculate the                    # ALGORITHM
  average value of the elements in                    # Declare array TabInt and initialize it with
  an array.                                           # a default value of 0
                                                      TabInt = [0 for i in range(10)]

                                                      # Populate the array by reading values f
                                                                                             ​rom the
• Steps:                                              # keyboard
                                                      for i in range(0,10):
   • Declare an array (e.g., an array of                  TabInt[i] = int(input())
     integers with a size of 10).
   • Populate the array elements.                     # Sum the array elements
                                                      sum = 0
   • Sum all the array elements.                      for i in range(0,10):
   • Divide the sum by the number of                      sum = sum + TabInt[i]
     elements and display the result.                 # Calculate the average value and display it
                                                      avg = sum/10
                                                      print ("Nilai rata-rata = " + str(avg))
  28/09/2026                       WI1102 Computational Thinking                               21

## [D06_Array h22]

Calculating the Average (1)
Flowchart – Element summation part



                 sum  0                              Pseudocode – Element summation part
                   i0
                                                        ... { Array populating part }
                                                        sum  0
                                loop                    i traversal [0..9]
       false
                  i < 10                                    sum  sum + TabInt[i]
                                                        ...
                      true

        sum  sum + TabInt[i]
                                                        Try to write other parts yourself as an exercise.
                 ii+1



    28/09/2026                         WI1102 Computational Thinking                                        22

## [D06_Array h23]

Exercises
• For each practice problem, create a flowchart/pseudocode and
  Python program code.




28/09/2026                WI1102 Computational Thinking          23

## [D06_Array h24]

Exercise-1
• Write a program containing an                  Example:
  integer array of size 20, for example,         T = [4, 1, 3, 4, 5, 6, 8, 9, 12, 30, -1, 0, 4,
  T.
• Assume that the part of the program                -1, 3, 10, 14, 6, 7, 0]
  responsible for populating array T
  already exists.                                X=3
• Refer to the previous slide regarding
  array input from the keyboard.
• The program accepts an integer                 After all elements of T are multiplied
  input, for example, X.                         by X
• Next, the program multiplies all               T = [12, 3, 9, 12, 15, 18, 24, 27, 36, 90,
  elements of array T by X and prints                 -3, 0, 12, -3, 9, 30, 42, 18, 21, 0]
  the new elements of T to the screen.


28/09/2026                       WI1102 Computational Thinking                                    24

## [D06_Array h25]

Exercise-2
• Student grades are represented by the letters A, B, C, D, and E.
     • Although ITB uses the grades AB and BC, these are disregarded here to
       simplify the problem.
• A program receives grade data for 50 students in a class—using
  the letter grades mentioned above—and stores them in an array of
  characters.
• Determine how many students passed and how many did not. A
  student is considered to have passed if they received a grade of A,
  B, or C; otherwise, they did not pass.


28/09/2026                      WI1102 Computational Thinking                  25

## [D06_Array h26]

Finding Extreme Values ​(1)
(Minimum or Maximum)
• Finding the largest or smallest value among the elements of an array
• Given:
     • An array T of size N elements
     • Value X (of the same data type as the elements of T)
• Write a program to display the largest value among the elements of T
• Assumption: T is not empty (minimum 1 element, N > 0)
• Examples:
     • N = 10; T contains: [9, 12, 30, -1, 0, 4, -1, 3, 30, 14] → largest value = 30
     • N = 8; T contains: [1, 3, 5, 8, -12, 90, 3, 5] → largest value = 90


28/09/2026                            WI1102 Computational Thinking                    26

## [D06_Array h27]

Flowchart:
                     {Initialization: max is
                    set to the 0th element }
                                                                Finding Extreme
                          max  T[0]
                                                                Values (2)
                        { Loop from index 1 }
                                i1
                                                                               Pseudocode:

                                                                loop           ...
                  false                                                        { initialize max with 0-th element }
                                 i<N
                                                                               max  T[0]

                                   true                                        i traversal [1..N-1]
                                                                                  { replace max when T[i]>max }
                 true                           false                             if (T[i]>max) then
                             T[i] > max                                               max  T[i]

                                                                               ...
          { replace max }              { Next elmt array }
            max  T[i]                      ii+1


    28/09/2026                                          WI1102 Computational Thinking                                 27

## [D06_Array h28]

# Program MaxArray
# Find the largest element of an array

# DECLARATIONS
# N : int
# T : array [0..N-1] of int
# i : int
# max : int

# ALGORITHM
N = 10 # assign N with the size of T
# Assumption: array has been populated
# You still need to write it to test the program
                                                          Finding Extreme Values (3)
# Finding largest element
                                                          Python Program
max = T[0]   # init max with first elmt.

# Starting from 2-nd element
for i in range(1,N):
    # replace max if curr elmt > max
    if (T[i] > max):
        max = T[i]

# Print the largest element
print (“Largest element = " + str(max))
     28/09/2026                            WI1102 Computational Thinking         28

## [D06_Array h29]

Exercise-3
• Based on the previous example problem, create a program to find
  the smallest value among the elements of T.




28/09/2026                WI1102 Computational Thinking             29

## [D06_Array h30]

Searching (1)
Looking up the index of the first appearance of a value
• Searching is an important process in array processing, as it is
  frequently performed on datasets stored within arrays.
• Given:
     • An array T of size N elements
     • A value X (of the same data type as the elements of T)
• Write a program to output the first index in T where X is found.
• Assumption: The array is not empty (minimum 1 element, N > 0).
• Examples:
     • N = 10; T contains: [9, 12, 30, -1, 0, 4, -1, 3, 30, 14]; X = -1; X is first found at index
       3.
     • N = 8; T contains: [1, 3, 5, 8, -12, 90, 3, 5]; X = 0; X is not found in T.

28/09/2026                             WI1102 Computational Thinking                            30

## [D06_Array h31]

                              { Initialization }
                               found  false                      Searching (2)
Flowchart:                    { First Element}
                                    i0                                               Pseudocode:

                                                                    loop             ...
                     false        (i<N) and
                                (found=false)                                        i  0
                                                                                     found  false
                                        true                                         while (i<N) and (found=false) do
                                                                                        if (T[i] = X) then
                      false                         true                                      found  true
                                  T[i] = X                                              else { T[i]  X }
                                                                                              i  i + 1
                                                                                     { i>=N or found=true }
                { Next elmt array }              { X is found }
                     ii+1                      found  true                         ...




   28/09/2026                                        WI1102 Computational Thinking                                      31

## [D06_Array h32]

# Program SearchArray
# Find the index where X is first found in T
# DECLARATIONS
# N : int; size of T
# T : array [0..N-1] of int
# i, X : int
# found : bool; determining whether X has been found or not

# ALGORITHM
# Assumption: the input array has been created; N is defined.

# Reading the value being sought, which is X
X = int(input())

# Searching from the first element
i = 0
                                                                        Searching (3)
found = False # X is not yet found
while (i < N and found == False):
                                                                        Python Program
    if (T[i] == X):
        found = True   # X is found
    else:
        i = i + 1      # increment only when X is not found
# i = N or found = True

# Print result
if (found == True): # X is found in T
    print (str(X) + " is found at index " + str(i))
else: # found = false, X is not found
    print (str(X) + " is not found")
     28/09/2026                                WI1102 Computational Thinking             32

## [D06_Array h33]

Exercise-4
• Based on the previous example, create a program to find the last
  index where X is found in T.
• Hint: the search process is performed "backwards," i.e., from the
  index of the last element to the first element.
     • What modifications must be made to the previous ALGORITHM?




28/09/2026                    WI1102 Computational Thinking           33

## [D06_Array h34]

Exercise-5
• A vector v = (v0, v1, v2, v3, v4) is represented as an array of integers
  with 5 elements..
• Consider two vectors, each consisting of 5 elements, for example, V
  and U.
• Print the result of the addition of the two vectors.
• The addition of two vectors yields another vector, W, where the i-
  th element is: Wi = Vi + Ui
       W = U + V = (v0, v1, v2, v3, v4) + (u0, u1, u2, u3, u4)
               W = (v0+u0, v1+u1, v2+u2, v3+u3, v4+u4)

28/09/2026                   WI1102 Computational Thinking              34

# SOURCE D10_Subprogram (slides, 36 pages)


## [D10_Subprogram h1]

Subprogram - Python


WI1102 Computational Thinking Teaching Team
Institut Teknologi Bandung © 2026

> (little or no text layer: read the page image app/public/pages/D10_Subprogram/001.jpg)

## [D10_Subprogram h2]

Objectives
• Students will be able to:
     • Explain the structure of functions/procedures
     • Create algorithms for functions/procedures based on given definitions
     • Use/call functions/procedures within the main program




05/10/2026                      WI1102 Computational Thinking                  2

## [D10_Subprogram h3]

Repeated code
• As a program grows larger, the amount of repetitive code
  increases.
• It is highly inefficient to type the same or similar code repeatedly
  (even when using copy-paste).
• Furthermore, many problems involve formulas that are used
  repeatedly within a single program.
• What if there were a way to avoid typing such code over and over,
  while still being able to use it multiple times within the same
  program?

05/10/2026                  WI1102 Computational Thinking                3

## [D10_Subprogram h4]

Subprogram
• A set of instructions designed to perform a frequently used operation
  within a program
• Two types of subprograms:
     • Function: a mapping of a domain value (input) to a range (output)
             • The result of a function is expressed as an explicit data type
     • Procedure: a sequence of instructions with clearly defined initial and
       final states—similar to a general program, but within a smaller scope




05/10/2026                                 WI1102 Computational Thinking        4

## [D10_Subprogram h5]

Flowchart Symbols (General)
   Subprogram call within the main                                  Separate flowcharts for
         program algorithm                                        subprogram definition and
                        Start
                                                                         realization.

                                                                          Procedure/Function
                                                                           [(list-parameter-
                         ...                                                    formal)]


                    Subprogram call
              [(list-parameter-aktual)]
                                                                                 ...

                         ...
                                                                           return [(return-
                                                                               value)]
                        End
 05/10/2026                               WI1102 Computational Thinking                        5

## [D10_Subprogram h6]

Function

05/10/2026   WI1102 Computational Thinking   6

> (little or no text layer: read the page image app/public/pages/D10_Subprogram/006.jpg)

## [D10_Subprogram h7]

Function
                                                                    domain           range
• The concept of a function in programming is
  based on the mathematical concepts of
  mapping and functions.
• Function: an association (mapping) between
  two sets of values—the domain and the range.
     • Each element in the domain is mapped to exactly
       one element in the range.
• Example: f(X) = X²
     • A function to calculate the square of a number.
     • Domain: integers                                                      f:X→Y
     • Range: integers (zero or positive)

05/10/2026                          WI1102 Computational Thinking                        7

## [D10_Subprogram h8]

Functions in Programming
                 Initial state             Function                  Final state


• Programming a function essentially involves assembling the contents of
  a "black box":
     • Starting from an initial state—a set of values ​defined as the input (domain)—
     • it produces values ​defining the final state—a set of values ​defined as the output
       (range).
     • The programmers task is to determine the steps required to generate the final
       state based on the initial state.
• A function is defined as a distinct part of the program and is called
  within the main program.
05/10/2026                           WI1102 Computational Thinking                           8

## [D10_Subprogram h9]

Functions in Programming
                                Function flow of control:
# Program Test                  1) One line in the main program calls the function:
# Testing the Square function            B = Square(A) + 10         #A=5
                                1) The program switches to the code for the function
 # DECLARATIONS                    Square function, executing from the first line through
 # A : integer                     to the line that defines the functions result (return).
 # B : integer                     The input parameter is associated with the functions
                                   input parameter list.
  # Function Square
  def Square ( X ) :            def Square ( X ):                              def Square ( 5 ):
     # calculate square of X    # calculate square of X           Asosiasi     # calculate square of 5
     result = X * X                result = X * X                  input          result = 5 * 5
     return result                 return result                                  return result
                                                                               #result=25
                                2) The program exits the function, saving the calculated
 # MAIN PROGRAM ALGORITHM          result and returning to the point in the main program
 A=5                               where it left off; it then substitutes the calculated result
 B = Square (A) + 10               based on the functions output: B = 25 + 10 # B = 35
                                3) The program proceeds to the next instruction.

     05/10/2026                   WI1102 Computational Thinking                                      9

## [D10_Subprogram h10]

Example (1)
                                                # Program CircleArea
                                                # calculate area of ​a circle based on the radius
• Write a program that accepts
  a circles radius (a real                       # DECLARATIONS
                                                 # r, L : float
  number)—for example, r—as                      # Definition and Realization of Function Area
                                                 def Area ( r ):
  input and displays the circles                 # returns area of ​a circle based on the radius r
  area on the screen.                                return (3.14 * r * r )


                                                 # PROGRAM UTAMA
• The calculation of the circles                 r = float(input())
                                                 A = Area(r) # call Function Area
  area should be implemented                     print(A)
  as a function.


05/10/2026                  WI1102 Computational Thinking                                            10

## [D10_Subprogram h11]

Example (2)             Start



                      input(r)
• Flowchart                                        Function Area


                                                            Area (r)
              A         Area (r)



                                                      return (3.14 * r * r)
                    output(A)



                        End



05/10/2026         WI1102 Computational Thinking                              11

## [D10_Subprogram h12]

Uses of Functions
• Programs can be broken down into smaller sub-sections.
     • Each sub-section can be defined as a function that is simply called as a single line
       or expression within the main program.
• It enables code reuse rather than code rewriting.
     • If a specific task needs to be performed frequently within a program,
       implementing it as a function significantly simplifies the programming process.
     • Example: A square root (sqrt) function is useful for various types of problems—
       imagine having to write the code for it every single time.
• Each function can be tested independently, without relying on other
  parts of the program.
     • In Python: Functions can be tested directly in the interpreter (without needing to
       create the entire program first).
     • For large programs requiring multiple programmers, this approach facilitates the
       division of labor.

05/10/2026                          WI1102 Computational Thinking                         12

## [D10_Subprogram h13]

Phases in Function Using
                                                                 # Program Test
                                                                 # Mengetes Function Square
1. Defining a function                                            # DECLARATIONS
     • Defining the name, specifications, domain                  # A : integer
       (input), and range (output)                                # B : integer
                                                                   # Function Square
2. Implementing a function                                         def Square ( X ) :
     • Creating a program to produce output                           # calculate Square X
       based on input                                                 result = X * X
                                                                      return result
3. Using a function
     • Calling the function within the main
                                                                  # MAIN PROGRAM ALGORITHM
       program or another function                                A=5
                                                                  B = Square (A) + 10


05/10/2026                       WI1102 Computational Thinking                                13

## [D10_Subprogram h14]

Defining a Function
• Defining a function in a program involves specifying the following
  within the DECLARATIONS block:
     • The functions name and specification
     • The domain (set of input values): data type of input parameters
     • The range (set of output values): data type of the output
• Example: Function Square: f(x) = x²
     • Function name: Square (defined by the programmer)
     • Function specification: "returns the square of x"
     • Input data type: int
     • Output data type: int

05/10/2026                      WI1102 Computational Thinking            14

## [D10_Subprogram h15]

Defining Functions in Python
• The function name is defined after                        # Function definition
  the def keyword.                                          def <function_name> ( [<input_param>] ):
• The function specification is                                # function specification
  written as a comment below the                               ...
  function name.                                               return [output_value]

• The input data type is implicitly
  defined based on the data type of
  the input parameter.
                                                            Example: Function Square
     • If there is more than one parameter,
       each is separated by a comma (,).
                                                            # definition of Function Square
• The output data type is implicitly                        def Square ( X ):
  defined based on the data type of                            # returns the square of X
  the output value specified after the                         ...
  return statement.                                            return result



05/10/2026                            WI1102 Computational Thinking                                15

## [D10_Subprogram h16]

                                                                 # function definition

Implementing the function                                        def <function_name> ( [<input_param>] ):
                                                                    # function specification

                                                                       # LOCAL DECLARATIONS
                                                                       # local variables
• Constructing a program to return an
  output value based on an input value.                                # ALGORITHM
   • In principle, any type of instruction valid                       ... # instructions to return output_value
     within the program may be used.                                       # based on input_param
                                                                       return [<nilai_output>]
• LOCAL DECLARATIONS: allows for
  variable names defined only locally                          Example: Function Square
  within the function (inaccessible to the
  main program or other functions).                              # definition of Function Square
                                                                 def Square ( X ):
• ALGORITHM: the section of the                                     # returns the square of X
  program containing the functions code,
  which must include at least one return                               # LOCAL DECLARATIONS
  statement.                                                           # result : int

   • return: the command used to output the                            # ALGORITHM
     functions result.                                                 result = X * X
                                                                       return result
   05/10/2026                          WI1102 Computational Thinking                                     16

## [D10_Subprogram h17]

Example-1: Function Square (1)
                                                          Function Square
                                                       # function definition
• Mathematical definition: f(x) = x²
• How is this implemented in a                                Square
                                                       def <funct_name>            X
                                                                        ( [<input_param>] ):
  program?
                                                               returns the square of X
                                                             # specification_Function
     • Function name: Square (determined by
       the programmer)                                       # LOCAL DECLARATIONS
     • Function specification: returns the                   # local variable
                                                               result : int   names
       square of the input
     • Domain/input type: integer (defined                   # ALGORITHM
       by input parameter x)                                 ... # deretan instruksi untuk
     • Range/output type: integer (based on                      # returns
                                                             result = X * Xnilai_output
       the result type of x²)                                    # berdasarkan nilai input_param
     • Function implementation: x * x or x **
       2 (in Python)                                                result
                                                             return [nilai_output]


05/10/2026                        WI1102 Computational Thinking                              17

## [D10_Subprogram h18]

Example-1: Function Square (2)
• Alternative: no need for local declaration variables—use the
  expression directly in the return statement.
     • This is preferable for very short programs.
    # definition Function Square                             # definition Function Square
    def Square ( X ):                                        def Square ( X ):
       # returns the square of X                                # returns the square of X

        # LOCAL DECLARATIONS                                       # LOCAL DECLARATIONS
        # result : int
                                                                   # ALGORITHM
        # ALGORITHM
        result = X * X                                             return X * X
        return result

05/10/2026                         WI1102 Computational Thinking                            18

## [D10_Subprogram h19]

Example-2: Maximum of Two Integers
• Create a function that returns the
                                                      # Function
                                                        definitionMax2
                                                                   Function
  larger of two integers.
   • Function Name: Max2                              def <func_name>
                                                              Max2    (        A , B
                                                                        [<input_param>] ):
   • Function Specification: Given integers                 # specification_Function
                                                            # returns the largest integer
     A and B, return the larger of the two.                 # between A and B
   • Input Type: Two integers (A and B)                     # LOCAL DECLARATIONS
                                                            # max
                                                              local variable names
                                                                  : int
   • Output Type: Integer (the maximum of
     A and B is also an integer)                            # ALGORITHM
   • Function Implementation: use if-else                   ...(A
                                                            if  # >=
                                                                  deretan
                                                                     B): instruksi untuk
                                                                # returns
                                                               max = A     nilai_output
                                                                # # A
                                                            else: berdasarkan
                                                                        < B    nilai input_param
                                                               max = B

                                                            return max
                                                                   [nilai_output]

   05/10/2026                    WI1102 Computational Thinking                               19

## [D10_Subprogram h20]

Example-2: Nilai maksimum 2 integer (2)
• Alternative: no need to declare local variables
# Function Max2
def Max2 ( A, B ):
                                                           # Function Max2
   # returns the largest integer
                                                           def Max2 ( A, B ):
   # between A and B
                                                              # returns the largest integer
                                                              # between A and B
   # LOCAL DECLARATIONS
   # max : int
                                                               # LOCAL DECLARATIONS
   # ALGORITHM
                                                               # ALGORITHM
   if (A >= B):
                                                               if (A >= B):
       max = A
                                                                   return A
   else:   # A < B
                                                               else:   # A < B
       max = B
                                                                   return B
   return max

05/10/2026                         WI1102 Computational Thinking                              20

## [D10_Subprogram h21]

Exercise-1:
• Define and implement the function Max3 to calculate the
  maximum value of three numbers—for example, A, B, and C.
• Example: A = 1, B = -10, C = 5 → maximum = 5

• ALGORITHM:
     • A >= B and A >= C : maximum = A
     • B >= A and B >= C : maximum = B
     • C >= A and C >= B : maximum = C



05/10/2026                     WI1102 Computational Thinking   21

## [D10_Subprogram h22]

Using Function (1)
• A function is called within a main program instruction or within
  an instruction in another function as part of an expression.
• Conditions for calling a function:
     • The function name must match.
     • The number of input parameters must match, and the data types must
       correspond.
             • During the function call, a one-to-one association is established between each input
               parameter and the input value.
     • The result of the function call must match the functions output data type.
     • Calling a function as part of an expression means it is not a standalone
       instruction.

05/10/2026                                WI1102 Computational Thinking                               22

## [D10_Subprogram h23]

Using Function(2) - Example
                                                                # Program CalculateSquare
• The name must match: Square                                   # Accepts an integer input and
• The number of input parameters is the                         # displays the square of that value
  same, and the data types correspond.                          # on the screen
   • The Square function has an input parameter x,              # DECLARATIONS
     and the call to Square in the main program has
     one input, y; both x and y are of the integer type.        # y, result : int

• The result of the function call must match                    # Function Definition
  the functions output data type.                               def Square ( x ):
   • The return statement in the Square function                # returns the square of x
     returns integer data.                                      # ALGORITHM
   • In the main program call, Square(y) returns an                 return x*x
     integer, matching the variables type.
• Function call as part of an expression.                       # MAIN PROGRAM ALGORITHM
                                                                y = int(input("Enter a number = "))
   • Yes, Square acts as an expression, with its result         result = Square(y)
     stored in the variable result.                             print("The square of "+str(y)+" = "+str(result))

   05/10/2026                              WI1102 Computational Thinking                                23

## [D10_Subprogram h24]

Example-3: 10% of the Largest Integer
• Write a program that accepts two integers as input, for example, A
  and B. Display 10% of the larger value between the two on the
  screen.
• Example: A = 45       B = 50       largest = 50
                     displayed on screen = 5.0

• To find the largest value, create and use the function Max2
  discussed in Example-2.


05/10/2026                 WI1102 Computational Thinking           24

## [D10_Subprogram h25]

                     # Program 10percent_of_largest
Example-3:           # Accepts two integers as input
                     # Displays 10% of the larger of the two numbers
10% of the Largest   # DECLARATIONS
Integer              # A, B : int
                     # result : float

                     # Function Definition: Max2
                     def Max2 (A, B):
                     # returns the larger number between A and B
                     # ALGORITHM
                        if (A >= B):
                            return A
                        else: # A < B
                            return B

                     # MAIN PROGRAM ALGORITHM
                     A = int(input("Enter the first number = "))
                     B = int(input("Enter the second number = "))

                     result = 0.1 * Max2(A, B)

                     print ("10% of the largest number = " + str(result))

   05/10/2026           WI1102 Computational Thinking                       25

## [D10_Subprogram h26]

Exercise-2
• In addition to being called from the main program, a function can
  also be called from within another function.

• Define and implement a function named Max3 to calculate the
  maximum value among three numbers (e.g., A, B, and C).
• Example: A = 1, B = -10, C = 5 → maximum = 5
• Implement this function by creating and utilizing the function
  Max2 discussed in Example-2.


05/10/2026                 WI1102 Computational Thinking              26

## [D10_Subprogram h27]

Procedure

05/10/2026   WI1102 Computational Thinking   27

> (little or no text layer: read the page image app/public/pages/D10_Subprogram/027.jpg)

## [D10_Subprogram h28]

Procedure
• Procedure: a subprogram that
  groups instructions frequently used
  within a program.                                        # procedure definition
                                                           def <proc_name> ( [<input_param>] ):
     • It does not require input or output                    # procedure specification
       parameters.                                               # LOCAL DECLARATIONS
     • It can be viewed as a function that                       # local variable names
       does not return a value.                                  # ALGORITHM
• In Python, it is defined using a                               ... # procedure instructions
                                                                 return
  return statement without an
  expression or resulting value at the
  end of the function.
05/10/2026                       WI1102 Computational Thinking                                    28

## [D10_Subprogram h29]

Example-4: Hello Name
• Create a procedure named PrintName that accepts a string input
  representing a name and prints "Hello, " + the name to the screen.
• The procedure does not return a value.
             # procedure definition
             def PrintName (name):
                 # Print Hello + name to the screen

                 # ALGORITHM
                 print ("Hello, " + name + "!!")
                 return



05/10/2026                  WI1102 Computational Thinking              29

## [D10_Subprogram h30]

Procedure Call
• Since a procedure does not return a value, the way it is called in
  the main program or another function differs.
• A procedure is called as a standalone instruction, rather than as
  part of an expression.
• Input parameters are associated in the same way as in a standard
  function.




05/10/2026                 WI1102 Computational Thinking               30

## [D10_Subprogram h31]

Example-5:                               # program HelloName
                                         # Accepts an integer N > 0 and a string name
Hello Name v2                            # and prints "Hello" + name, N times

                                         # DECLARATIONS
Write a program that accepts             # i, N : int

an integer greater than 0 (e.g.,         # name : string

N) and a string (e.g., name) as #defDefinition of Procedure PrintName
                                      PrintName (name):
input, then prints "Hello,       # Prints "Hello" + name to the screen
name!" to the screen N times. # ALGORITHM
                                     print ("Hello, " + name + "!")
                                             return

                                         # MAIN PROGRAM ALGORITHM
                                         name = input("Enter name = ")
                                         N = int(input("How many times to repeat? "))

                                         for i in range(N):
                                            PrintName(name)


05/10/2026                      WI1102 Computational Thinking                           31

## [D10_Subprogram h32]

Python Standard Functions
• Python offers a vast array of built-in functions that are ready to use,
  eliminating the need to write the code yourself.
• These standard functions are defined within libraries.
     • A commonly used standard library is math.
• Functions defined in the math library include:
     • sqrt – calculates the square root of a number
     • sin – calculates the sine
     • cos – calculates the cosine
     • pow – calculates the power of a number
     • etc.
• To use the math library, add the following instruction at the beginning of the
  program: from math import *
     • For more information: https://docs.python.org/3/library/math.html


05/10/2026                            WI1102 Computational Thinking                32

## [D10_Subprogram h33]

Example-6: Square Root
• Write a program that        # Program Square_Root_Calculation
  accepts a real              # Accepts a real number as input
                              # Outputs the square root of that number
  number (float)—for
  example, N—as               from math import *
  input and returns
  the square root of          # DECLARATIONS
  that number.                # N : float

• Example:                    # ALGORITHM
                              N = float(input("Enter a number = "))
     • N = 4; sqrt(N) = 2.0   print("Square root of " + str(N) + " = " + str(sqrt(N)))
     • N = 12; sqrt(N) =
       3.464…


05/10/2026                     WI1102 Computational Thinking                    33

## [D10_Subprogram h34]

Exercise-3
• Create a function named Distance that accepts the inputs v
  (velocity in m/s, real number) and t (travel time in s, real number)
  and returns the distance traveled s using the formula: s = v * t.
• Assume that t ≥ 0 and s ≥ 0.

• Next, create a main program that utilizes the function Distance
  (you are free to decide the flow of the main program).



05/10/2026                 WI1102 Computational Thinking             34

## [D10_Subprogram h35]

Exercise-4
• Do you remember the program for finding the maximum value in
  an array?
• Create a function named MaxArray that takes an array of integers
  (e.g., T) and the arrays length (e.g., N) as input, and returns the
  largest value stored in the array. Assume N > 0.
• Example: T = [5, 4, 3, 2, 1]; N = 5
     • The maximum value is 5.




05/10/2026                       WI1102 Computational Thinking      35

## [D10_Subprogram h36]

Exercise-5
• One task in array processing is printing all array elements to the
  screen.
• Create a procedure named PrintArray that accepts an array of
  integers (e.g., T) of length N >= 0 as input and prints all array
  elements to the screen.
• Printing format: print each element at index i on a separate line in
  the format:        [i] <elemen>
• Example: T = [5, 4, 3, 2, 1]; N = 5         will print: [0] 5
                                                          [1] 4
                                                          [2] 3
                                                          [3] 2
                                                          [4] 1
• If N = 0, print: “Empty array”
05/10/2026                  WI1102 Computational Thinking            36

# SOURCE D11_ComputingImpact (slides, 62 pages)


## [D11_ComputingImpact h1]

Impacts and Trends of
Computing Technology

WI1102 Computational Thinking Teaching Team
Institut Teknologi Bandung © 2026

## [D11_ComputingImpact h2]

Objectives
• Students are able to explain the impacts and trends of computing
  technology from various perspectives, particularly those relevant
  to their own field of study.




29/10/2026                 WI1102/Computational Thinking              2

## [D11_ComputingImpact h3]

The Digital World
• Technological advancements, particularly in the field of
  computing, have brought about changes in how we live.
• Computers have become an essential tool in any profession; PCs—
  including laptops—are no longer merely office equipment, but
  also serve as devices for entertainment.
• The realm of the Internet—cyberspace—is a new world that
  anyone can enter, unconstrained by time or space. It is human
  beings who step into this virtual world.



29/10/2026               WI1102/Computational Thinking              4

## [D11_ComputingImpact h4]

The Digital World as a Source for Lifelong
Learning
• The digital world has become an inexhaustible source of learning.
  Educational materials are readily available and easily accessible.
• Reference resources—such as encyclopedias, dictionaries, atlases,
  and medical references—are accessible in digital formats via the
  Internet, smartphone applications, and CD/DVDs.
• The Internet offers blogs, forums, websites, and a wide array of
  media for learning anything, anywhere, thereby facilitating
  distance learning.
• Edutainment combines education with entertainment.

29/10/2026                 WI1102/Computational Thinking               5

## [D11_ComputingImpact h5]

Computing technology also has an impact on
the workplace
• Computing technology brings efficiency to various human tasks.
• Automation, driven by information technology (IT), unlocks a vast
  array of new job opportunities.
• Certain technologies also “unlock” human creativity.
     • AI (Artificial Intelligence) ??
• Globalization: creates a “worldwide workforce” and opens up
  markets on a global scale.
• At the same time: the use of computing technology may threaten
  jobs replaceable by machines

29/10/2026                         WI1102/Computational Thinking      6

## [D11_ComputingImpact h6]

Discussions
• Name examples of digital technology (computers, the internet,
  gadgets, etc.) that you find highly supportive of your activities as a
  student (studying, organizational involvement, etc.).

• Imagine if you did not have access to these technologies—how
  would you go about your activities?




29/10/2026                  WI1102/Computational Thinking                  7

## [D11_ComputingImpact h7]

Computing Technology in Daily
Lives

29/10/2026   WI1102/Computational Thinking   8

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/007.jpg)

## [D11_ComputingImpact h8]

Everyday life already depends on computing
technology…
• Many aspects of daily life have become highly dependent on
  computing technology:
     • Household/family needs: online shopping, delivery services, etc.
     • Entertainment: movies, games, video streaming, etc.
     • Transportation: booking taxi services, airline tickets, train tickets, etc.
     Identify and explain other examples.
• Some potential threats:
     • The risks of "addiction" and "violence"
     • Identity theft
     • Threats to privacy

29/10/2026                         WI1102/Computational Thinking                     9

## [D11_ComputingImpact h9]

WI1102/Computational Thinking

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/009.jpg)

## [D11_ComputingImpact h10]

WI1102/Computational Thinking

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/010.jpg)

## [D11_ComputingImpact h11]

Threats of Violence via the Internet
• Cyberbullying
     • Cyberbullying is a form of verbal or
       psychological abuse carried out through
       digital platforms, such as social media, instant
       messaging, or online forums.
• Grooming and Exploitation
     • Grooming is an attempt by a predator to build
       a relationship with a young or vulnerable
       individual via technology for the purpose of
       exploitation or abuse.
• Trolling, cyberstalking, doxxing
29/10/2026                        WI1102/Computational Thinking   12

## [D11_ComputingImpact h12]

Threats of Violence via the Internet
• The Spread of Visual Violence and
  Extreme Content
     • The distribution of violent content via the
       internet, such as videos of violence,
       extremism, or radical propaganda.
     • Cyberviolence is the use of computer
       systems to cause, facilitate, or threaten
       violence against individuals that results in,
       or is likely to result in, physical, sexual,
       psychological or economic harm or suffering
       and may include the exploitation of the
       individual’s circumstances, characteristics
       or vulnerabilities. https://www.coe.int/en/web/cyberviolence/cyberviolence-at-a-glance

29/10/2026                                       WI1102/Computational Thinking                  13

## [D11_ComputingImpact h13]

Internet Addiction
• Internet addiction is the excessive use of the
  internet to the point that it interferes with one's
  social life, work, and education.
• Adolescents are an age group particularly
  vulnerable to internet addiction; with up to 31.4%
  of adolescents in Indonesia suffer from it (2021
  data).
   https://www.cnnindonesia.com/gaya-hidup/20211002135419-255-702502/survei-193-persen-anak-indonesia-kecanduan-internet


• Some of the consequences include: a decline in
  interest in learning, mental and behavioral
  changes, emotional instability, hallucinations, and
  even severe mental disorders.
29/10/2026                                                WI1102/Computational Thinking                                    14

## [D11_ComputingImpact h14]

Gaming Addiction
• Gaming can be beneficial: it can reduce
  stress, enhance concentration and
  creativity, improve decision-making
  skills, and even generate income.
• Gaming addiction: an addiction to
  video games or online games that
  interferes with daily activities, work,
  and social relationships.
• According to a 2023 survey by the
  Indonesian Internet Service Providers
  Association (APJII), 42.23% of online
  gamers spend more than 4 hours a day                   https://www.youtube.com/watch?v=BicDbsfxtfA
  playing online games.

29/10/2026                   WI1102/Computational Thinking                                  16

## [D11_ComputingImpact h15]

Avoiding Addiction & Violence
• Pursue hobbies and interests unrelated to the internet; participate in social
  activities such as student organizations, associations, or clubs.
• Engage in more physical activities, such as play, sports, or recreation.
• Socialize with people in the real world rather than virtual friends.
• If you encounter a problem, discuss it in person.
• Maintain good relationships with family and friends.
• If you develop an addiction, talk about it with your parents, a teacher, or a
  doctor.
     • Avoid trying to find all the answers on your own via the internet.
• Limit the time spent using the internet on laptops and other gadgets.
• Delete unnecessary applications.
• Use filtering software (especially for children).

29/10/2026                             WI1102/Computational Thinking              17

## [D11_ComputingImpact h16]

Discussions
• How many hours a day do you spend on the following:
     • Accessing the internet
     • Playing online games
• What are the positive aspects of your daily habits regarding
  internet use and gaming?
• What are the negative aspects of your daily habits regarding
  internet use and gaming?




29/10/2026                      WI1102/Computational Thinking    18

## [D11_ComputingImpact h17]

Personal Data: All about You
• Identity theft has become a substantial
  criminal industry.
     • It can occur due to carelessness while online or a
       simple miscalculation.
     • Consequences include receiving large,
       unauthorized phone or internet bills, being
       threatened by strangers, or having one’s social
       media accounts used to spread slander or issue
       threats—which could even lead to arrest by the
       authorities, among other issues.
     • Resolving the repercussions of identity theft can
       take a very long time—potentially even years.
29/10/2026                       WI1102/Computational Thinking
                                                                 19   19

## [D11_ComputingImpact h18]

Protecting Yourself from Identity Theft
• Make your online purchases                 • Handle email and social media
  using a reputable credit card or             with care.
  electronic payment.                        • Don’t put your Social Security
• Scan your bills promptly.                    number on your checks.
• Get a separate credit card for             • Shred sensitive mail before you
  online transactions.                         recycle it.
• Make sure a secure Web site is             • Keep your wallet thin.
  managing your online                       • Copy your cards.
  transaction.
• Don’t disclose personal                    • Report identify theft promptly.
  information over the phone or
  chats.

29/10/2026                   WI1102/Computational Thinking                       20

## [D11_ComputingImpact h19]

Threats to Privacy
• Placing personal data online means it gets stored in a server database.
     • It can spread very easily across the internet.
     • Be aware of your rights regarding your data.
• E-commerce companies may use personal data for various purposes
  (such as advertising).
• Privacy is increasingly diminishing these days.
     • In the workplace, strict monitoring of employees can be carried out using
       computing technology.
     • Surveillance cameras are used in public spaces.
     • Information technology makes it possible to conduct surveillance or wiretapping
       on individuals, organizations, or even entire nations.

29/10/2026                          WI1102/Computational Thinking                    21

## [D11_ComputingImpact h20]

Your Privacy Rights
• Do not readily share or                 • Do not readily consent to the
  distribute your national ID               sharing of personal
  number (KTP), driver’s license            information.
  number, phone number, email             • THINK before you POST!
  address, mobile number, bank
  account number, or other                • Use technology to protect your
  sensitive data—whether your               personal rights.
  own or someone else’s.                  • If there is damaging
• Do not readily provide                    information about you, correct
  personal information.                     it!

29/10/2026                WI1102/Computational Thinking                  22

## [D11_ComputingImpact h21]

                                             Law No. 27 of 2022
                                             concerning
                                             Personal Data
                                             Protection



29/10/2026   WI1102/Computational Thinking                   23

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/021.jpg)

## [D11_ComputingImpact h22]

Discussions
• Look for the Privacy Policy of the social media application(s) you
  use.
• How is your personal data used by that social media application?
• Do you consider this acceptable?




29/10/2026                 WI1102/Computational Thinking               24

## [D11_ComputingImpact h23]

Computing Technology in Ethics,
Society, Politics, and Economics

29/10/2026   WI1102/Computational Thinking   25

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/023.jpg)

## [D11_ComputingImpact h24]

Norms, Ethics, and Regulations
• Norms and ethics: relate to morality and serve merely as "guidelines";
  your own conscience must play a role.
• Rules and regulations: these are more operational in nature, explicitly
  stating requirements, regulations, penalties, and sanctions. Rules are
  established to make communal life "comfortable," not to create
  difficulties.
• Violating norms or ethics should evoke a sense of "shame." Violating
  rules, however, results in punishment—a measure intended to ensure
  that members of the community are aware of the rules and refrain from
  breaking them.
• Look for resources on the Internet using a search engine by entering
  keywords such as "netiquette" or "net-ethics."
29/10/2026                  WI1102/Computational Thinking               26

## [D11_ComputingImpact h25]

Computer Ethics
• Know the rules and the law.
• Don’t assume that it’s okay if it’s legal.
• Think scenarios.
• When in doubt, talk it out.
• Make yourself proud.
• Remember the golden rule.
• Take the long view.
                                             https://infocompethics.game.blog/2018/08/20/why-is-it-
• Do your part.                              important-to-follow-computer-ethics/




27                                          30/10/2026                       WI1102/Computational Thinking

## [D11_ComputingImpact h26]

Netiquette and Messaging Etiquette
• Say what you mean; say it with          • Know your abbreviations.
  care.                                   • Keep your cool.
• Keep it short.                          • Don’t be a source of spam.
• Proofread your messages.                • Say no—and say nothing—to
• Don’t assume you are                      spam.
  anonymous.
• Learn the “nonverbal”
  language of the Net.


30/10/2026                WI1102/Computational Thinking   28             28

## [D11_ComputingImpact h27]

Freedom vs. Social Responsibility
• The internet provides the freedom to speak and express opinions,
  which can also be exploited for irresponsible purposes.
• The government has established regulations: Law No. 11/2008
  on Information and Electronic Transactions.
     • Law No. 19 of 2016 concerning Amendments to Law No. 11 of 2008 on
       Information and Electronic Transactions.
     • Law No. 1 of 2024 concerning the Second Amendment to Law No. 11 of
       2008 on Information and Electronic Transactions.
• We remain responsible for whatever we think, say, or write,
  whether online or offline.
• Ethics are moral principles or standards that serve as a guide for
  behavior, actions, and choices.

29/10/2026                     WI1102/Computational Thinking                29

## [D11_ComputingImpact h28]

Social Networking
• WhatsApp, Instagram, Facebook, X (formerly Twitter), … to name a
  few.
• They connect people across the globe, creating a world without
  the constraints of space or time.
• It is crucial to be fully aware of both their benefits and their
  drawbacks!
• While they can serve as tools for work-related communication,
  exercise caution regarding the information you share. Avoid
  disseminating information intended only for specific individuals or
  groups to everyone—make use of group features instead.
29/10/2026                 WI1102/Computational Thinking           30

## [D11_ComputingImpact h29]

Social Networking
• Be careful when writing status updates or tweets! Think before you hit
  "send"! Your posts can have an impact all around the world.
• Do not share content—whether text, images, videos, or otherwise—that
  involves SARA (issues related to ethnicity, religion, race, or societal
  groups), pornography, illegal material, or anything else that could cause
  public unrest. There has already been a case where an ITB student was
  suspended for sharing content related to SARA issues.
• Limit the amount of personal information you share in the public
  sphere.
     • Video: https://www.youtube.com/watch?v=M8dzxgYwhrI


29/10/2026                     WI1102/Computational Thinking             31

## [D11_ComputingImpact h30]

           Be careful on what you post online!
                                                Pasal 27
(3) Setiap Orang dengan sengaja dan tanpa hak mendistribusikan dan/atau mentransmisikan dan/atau
membuat dapat diaksesnya Informasi Elektronik dan/atau Dokumen Elektronik yang memiliki muatan
penghinaan dan/atau pencemaran nama baik.
                                                Pasal 28
(1) Setiap Orang dengan sengaja dan tanpa hak menyebarkan berita bohong dan menyesatkan yang
mengakibatkan kerugian konsumen dalam Transaksi Elektronik.
(2) Setiap Orang dengan sengaja dan tanpa hak menyebarkan informasi yang ditujukan untuk menimbulkan
rasa kebencian atau permusuhan individu dan/atau kelompok masyarakat tertentu berdasarkan atas
suku, agama, ras, dan antargolongan (SARA).

                                                  Pasal 45
(1) Setiap Orang yang memenuhi unsur sebagaimana dimaksud dalam Pasal 27 ayat (1), ayat (2), ayat (3), atau
ayat (4) dipidana dengan pidana penjara paling lama 6 (enam) tahun dan/atau denda paling banyak
Rp1.000.000.000,00 (satu miliar rupiah).
(2) Setiap Orang yang memenuhi unsur sebagaimana dimaksud dalam Pasal 28 ayat (1) atau ayat (2) dipidana
dengan pidana penjara paling lama 6 (enam) tahun dan/atau denda paling banyak Rp1.000.000.000,00 (satu
miliar rupiah).

    29/10/2026                               WI1102/Computational Thinking                                34

## [D11_ComputingImpact h31]

Where Computers Work
• Many jobs have been transformed by digital technology:
     • Entertainment
     • Publishing
     • Medicine
     • Airlines
     • Science




29/10/2026                WI1102/Computational Thinking
                                                          35   35

## [D11_ComputingImpact h32]

The Automated Factory
• Robots: used to perform specific manual tasks
     • Painting, welding, and repetitive assembly-line jobs
• Computers track inventory, time delivery of parts, control the
  quality of production, monitor wear and tear on machines, and
  schedule maintenance.
• Automation reduces the time that materials and machines sit idle
  and reduces waste in facilities, raw materials, and labor.




29/10/2026                       WI1102/Computational Thinking
                                                                 36   36

## [D11_ComputingImpact h33]

The Automated Office
• As factory jobs decline, office
  work plays a more important
  role in our economy.
• Modern offices, like modern
  factories, have been
  transformed by digital
  technology.




29/10/2026                   WI1102/Computational Thinking   37

## [D11_ComputingImpact h34]

Automation, Globalization, and Outsourcing
• Many analysts predicted that automation would lead to massive
  unemployment and economic disaster.
• Others said that computers would generate countless new job
  opportunities.
• Today, most people are accustomed to seeing computers where
  they work.
• Job automation is still an important issue for millions of workers
  whose jobs are threatened by machines.


29/10/2026                 WI1102/Computational Thinking               38

## [D11_ComputingImpact h35]

Discussions
• The current job market is increasingly global. Your competitors are
  not only from within the country but also from abroad.
• Do you view this as a threat, a challenge, or an opportunity?
• What is your approach to dealing with it?




29/10/2026                 WI1102/Computational Thinking           39

## [D11_ComputingImpact h36]

Discussions
• The development of digital technology has accelerated to such an
  extent that many human tasks can now be performed by
  machines—including AI—with far greater efficiency.
• In your view, how should humans approach this phenomenon?
  Should it be rejected because it threatens human employment, or
  should it be embraced as an inevitable part of the changing times?
  What steps should be taken?




29/10/2026                 WI1102/Computational Thinking           40

## [D11_ComputingImpact h37]

Artificial Intelligence (AI)

29/10/2026     WI1102/Computational Thinking   41

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/037.jpg)

## [D11_ComputingImpact h38]

What is Artificial Intelligence (AI)




             https://www.youtube.com/watch?v=4jmsHaJ7xEA
29/10/2026               WI1102/Computational Thinking     42

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/038.jpg)

## [D11_ComputingImpact h39]

   So.. What is AI? 8 Definitions, 4 Approaches

Thinking                                             Thinking
humanly                                              rationally



Acting                                               Acting
humanly                                              rationally


   29/10/2026        WI1102/Computational Thinking          43

## [D11_ComputingImpact h40]

                                             History of AI




                                              https://qbi.uq.edu.au/brain/intelligent-
                                              machines/history-artificial-intelligence



29/10/2026   WI1102/Computational Thinking                                  45

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/040.jpg)

## [D11_ComputingImpact h41]

This image is generated by Google Gemini based on the contents of https://aimetrixo.com/ai-development-timeline/

      29/10/2026                                          WI1102/Computational Thinking                            46

## [D11_ComputingImpact h42]

AI In Life: AI Assistant




29/10/2026     WI1102/Computational Thinking   47

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/042.jpg)

## [D11_ComputingImpact h43]

AI In Life: Biometric Verification
             Fingerprint verification                   Face verification




                                                         https://www.grab.com/sg/driver-2/selfieverification/



29/10/2026                              WI1102/Computational Thinking                                           48

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/043.jpg)

## [D11_ComputingImpact h44]

AI In Life: OpenAI untuk Dota 2




29/10/2026   WI1102/Computational Thinking   49

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/044.jpg)

## [D11_ComputingImpact h45]

      AI In Life: AI Alphastar StarCraft II




https://techcrunch.com/2019/01/24/starcraft-ii-playing-ai-alphastar-takes-out-pros-undefeated/
       29/10/2026                                                 WI1102/Computational Thinking   50
https://www.youtube.com/watch?v=PFMRDm_H9Sg

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/045.jpg)

## [D11_ComputingImpact h46]

AI In Life: Transform Your Face




             https://www.faceapp.com/
29/10/2026                              WI1102/Computational Thinking   51

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/046.jpg)

## [D11_ComputingImpact h47]

AI In Life: Recommender System




29/10/2026   WI1102/Computational Thinking   52

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/047.jpg)

## [D11_ComputingImpact h48]

 AI In Life: AI in Traffic




Path Finding / Direction
                              Traffic pattern
 29/10/2026                WI1102/Computational Thinking   53

## [D11_ComputingImpact h49]

AI In Life: Fraud Detection




29/10/2026   WI1102/Computational Thinking   54

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/049.jpg)

## [D11_ComputingImpact h50]

Self Driving Cars




                                               https://www.tesla.com/robotaxi

 29/10/2026    WI1102/Computational Thinking                               55

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/050.jpg)

## [D11_ComputingImpact h51]

Proteus: Amazon's first fully autonomous
warehouse robot




 https://fortune.com/2025/03/27/amazon-robotics-worker-safety-proteus-warehouse-upskilling/

29/10/2026                                      WI1102/Computational Thinking                 57

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/051.jpg)

## [D11_ComputingImpact h52]

AI for Health Care




                                                     https://hbr.org/2018/05/10-promising-ai-
                                                     applications-in-health-care

29/10/2026           WI1102/Computational Thinking                                        58

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/052.jpg)

## [D11_ComputingImpact h53]

AI for Manufacturing




                                                 https://www.forbes.com/sites/louiscolumbus/201
                                                 8/03/11/10-ways-machine-learning-is-
                                                 revolutionizing-manufacturing-in-
                                                 2018/#61e28f2523ac




29/10/2026       WI1102/Computational Thinking                                             59

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/053.jpg)

## [D11_ComputingImpact h54]

AI for Education




                                                   https://www.cognilytica.com/2019/03/28/infogra
                                                   phic-ai-in-education/




29/10/2026         WI1102/Computational Thinking                                                60

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/054.jpg)

## [D11_ComputingImpact h55]

 AI Adoption by Industry

Percentage of market players
who plan to adopt AI in next
two years across various
business verticals
(Infosys Survey, 2018)




https://existek.com/blog/ai-programming-and-ai-
programming-languages/
     29/10/2026                                   WI1102/Computational Thinking   61

## [D11_ComputingImpact h56]

Generative AI
• Generative artificial intelligence (generative AI, GenAI, or GAI) is
  a subset of artificial intelligence that uses generative models to
  produce text, images, videos, or other forms of data. These models
  often generate output in response to specific prompts.
• Generative AI systems learn the underlying patterns and structures
  of their training data, enabling them to create new data.
• Examples:
     • Text: GPT-3, GPT-4, GPT-4o, LaMDA, LLaMA, BLOOM, Gemini, Claude
     • Code: Github Copilot, Code T5, OpenAI Codex
     • Image: Imagen, DALL-E 3, Midjourney, Adobe Firefly, FLUX.1
     • Audio and Music: MusicLM and MusicGen

29/10/2026                    WI1102/Computational Thinking              62

## [D11_ComputingImpact h57]

Théâtre D'opéra Spatial, an image made using
generative artificial intelligence




                       AI generated images have become
                                   much more advanced.

    29/10/2026                            WI1102/Computational Thinking   63

## [D11_ComputingImpact h58]

                                    AI Dangers
                                   • Bias and Inaccuracies: AI systems may reinforce harmful biases
                                     and misinformation if their training data is flawed or biased.
                                   • Privacy Concerns: Extensive data collection by AI platforms can
                                     compromise personal privacy and lead to misuse of sensitive
                                     information.
                                   • Loss of Human Judgment: Over-reliance on AI might diminish
                                     our ability to make independent decisions and critically evaluate
                                     outcomes.
                                   • Deepfakes and Manipulation: AI can create convincing fake
                                     content that threatens truth, trust, and societal stability.
                                   • Loss of Human Control: Automation of critical decisions might
                                     reduce human oversight, creating potential for serious unintended
                                     consequences.
                                   • Employment Disruption: AI-driven automation could displace
                                     workers, exacerbating economic inequalities and social tensions.
                                   • Existential and Long-term Risks: Future advanced AI, such as
                                     AGI (Artificial General Intelligence), could become misaligned with
                                     human interests, posing significant existential threats.

https://www.jdsupra.com/legalnews/afraid-of-ai-learn-the-seven-cardinal-2026474/
29/10/2026                             WI1102/Computational Thinking                                  64

## [D11_ComputingImpact h59]

https://oecd.ai/en/incidents/2026-05-26-424e

 29/10/2026                            WI1102/Computational Thinking   65

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/059.jpg)

## [D11_ComputingImpact h60]

2026 onward: Agentic AI
• Agentic AI refers to autonomous systems that do not just generate text
  or answer questions, but independently perceive their environment,
  plan multi-step workflows, use tools or APIs, execute actions, and
  reflect on the results. (https://cloud.google.com/discover/what-is-
  agentic-ai)
• Real world examples (https://www.simpliaxis.com/resources/agentic-
  ai-examples)
     • PayPal: Uses autonomous agents for real-time fraud detection and transaction
       processing
     • Oxford University Hospital: Working with Microsoft, the hospital built agentic
       systems into clinical workflow support, coordinating administrative steps
       around patient care while leaving clinical judgment entirely to humans.
     • Siemens: Siemens introduced its Fuse EDA AI Agent in March 2026, a domain-
       scoped autonomous agent that plans and orchestrates multi-tool workflows
       across the entire design-to-sign-off pipeline.

29/10/2026                        WI1102/Computational Thinking                         66

## [D11_ComputingImpact h61]

Discussions
• Provide examples of how AI technology is used within the fields of
  study relevant to your faculty or school.
• Discuss the impact of using such technology across various
  dimensions, for instance:
    • Does it reduce the need for human labor?
    • What is its impact on the environment?
    • Does it lead to greater efficiency in systems or processes?
    •…
• How can Generative AI be utilized ethically within an academic
  context?


29/10/2026                 WI1102/Computational Thinking           67

## [D11_ComputingImpact h62]

                                Have fun studying!


WI1102/Computational Thinking                        29/10/2026   68

> (little or no text layer: read the page image app/public/pages/D11_ComputingImpact/062.jpg)
# SOURCE Module_Python (module, 25 pages)


## [Module_Python h1]

Computational Thinking Module - Python

      Computational Thinking Team 2026/2027




                        1

> (little or no text layer: read the page image app/public/pages/Module_Python/001.jpg)

## [Module_Python h2]

Notes


  1. This module is designed to guide Computational Thinking programming, then some
     materials may not exist because they are out of Computational Thinking scope.
  2. You may open this module while you are doing the module exercise in practical class.
  3. It is recommended to run all programs listed in this module in your computer, so you
     know the output of the programs.
  4. It is better to experimenting on the programs listed in this module to grasp better
     understanding about what your programs really do.
  5. You are strongly recommended to learn programming from other sources or materials
     and explore your programming language.




                                           2

## [Module_Python h3]

Contents
1   Module 1 - Basic Program Structure                                                              4
    1.1 Introduction . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    4
    1.2 Input and Output . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .      4
    1.3 Data Types . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    5
    1.4 Operator . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    5
        1.4.1 Arithmetic Operator . . . . . . . . . . . . . . . . . . . . . . . . . . . . .         5
        1.4.2 Assignment Operator . . . . . . . . . . . . . . . . . . . . . . . . . . . .           6
        1.4.3 Relational Operator . . . . . . . . . . . . . . . . . . . . . . . . . . . . .         6
        1.4.4 Logical Operator . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        6
    1.5 Module 1 Exercise . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .     7
        1.5.1 Practice Problem 1 Year 2025/2026 . . . . . . . . . . . . . . . . . . . . .           7
        1.5.2 Practice Problem 2 Year 2025/2026 . . . . . . . . . . . . . . . . . . . . .           7
        1.5.3 Practice Problem 3 Year 2025/2026 . . . . . . . . . . . . . . . . . . . . .           8
2   Module 2 - Conditional Statements                                                               10
    2.1 Control . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .   10
    2.2 Module 2 Exercise . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .     11
        2.2.1 Even-Odd Program . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .          11
        2.2.2 Practice Problem 1 Year 2022 . . . . . . . . . . . . . . . . . . . . . . . .          11
        2.2.3 Practice Problem 3 Year 2022 . . . . . . . . . . . . . . . . . . . . . . . .          12
3   Module 3 - Looping and Array                                                                    13
    3.1 Looping . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .     13
        3.1.1 While Loop . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        13
        3.1.2 For Loop . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .      13
    3.2 Nested Loop . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .     14
    3.3 Array . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .   14
        3.3.1 Array Declaration . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .         15
        3.3.2 Array and Variable . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        15
        3.3.3 String . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    15
    3.4 Module 3 Exercise . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .     17
        3.4.1 Smallest Power of 10 . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        17
        3.4.2 Number Triangle . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .         17
        3.4.3 Reverse . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .     17
        3.4.4 Anagram . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .       18
        3.4.5 Palindrome . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        18
        3.4.6 Practice Problem 1 Year 2021 . . . . . . . . . . . . . . . . . . . . . . . .          19
        3.4.7 Practice Problem 2 Year 2021 . . . . . . . . . . . . . . . . . . . . . . . .          19
        3.4.8 Practice Problem 3 Year 2021 . . . . . . . . . . . . . . . . . . . . . . . .          20
        3.4.9 Practice Problem 1 Year 2022 . . . . . . . . . . . . . . . . . . . . . . . .          20
        3.4.10 Practice Problem 2 Year 2022 . . . . . . . . . . . . . . . . . . . . . . . .         21
4   Module 4 - Function and Procedure                                                               22
    4.1 Function . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .    22
    4.2 Procedure . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .     23
    4.3 Module 4 Exercise . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .     24
        4.3.1 Quadratic Function . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .        24
        4.3.2 Pascal Triangle . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .       24
        4.3.3 Practice Problem 1 Year 2021 . . . . . . . . . . . . . . . . . . . . . . . .          24




                                                  3

## [Module_Python h4]

1     Module 1 - Basic Program Structure

1.1   Introduction

In this module, we use Python 3.9. You can download Python in https://www.python.org/
downloads/release/python-390/. Choose option ”Windows x86-64 executable installer”.

Some characteristics of this language:


    • Python is case-sensitive, which means caps and non-caps characters have different
      meaning.

    • Python is very sensitive to indentation and line separation. Wrong usage of indenta-
      tion may cause compilation failure.
    • Variables in Python are implicit and dynamic. Then, data type of a variable doesn’t
      need to be explicitly stated. But in this module, we still learn all data types.


1.2   Input and Output

In Python, program that print "Hello, World!" to screen :

print("Hello , World!")                     # (1)

print("This is", end="")                    # (2)
print(" my first program ")                 # (3)

print("Using","Comma")
#This will outputs "Using Comma"

print("Using"+"Plus")
# This will outputs " UsingPlus " which we call concatenation
# Be mindful that concatenation will only works on strings ,
# such you will need to convert other data types.

variable = "some value"
print(f"Using format : { variabel }")
# This will outputs "Using format : some value"
# { variable } will be replaced with the value of corresponding variable

# This is a comment

# Everything after hash symbol
# will be ignored by interpreter

’’’
Moreover , we may wrap out multiline comments
with three single -quote (’’’)
’’’



The section marked with number 1 writes "Hello, World!" to the screen. The syntax print
will automatically move the cursor to the next line after it has finished writing to the screen,


                                               4

## [Module_Python h5]

unless we add the end="" parameter. The program above will output "Hello, World!"
followed by "This is my first program" in the next line.

To read inputs, we need a container to store the data that is inputted. For example, below
is a program that receives input and rewrites the input entered.

S = input("Input some words: ")                                                    # 1
print("You inputted " + S)                                                         # 2

N = int(input("Input an integer : "))                            # 3
print("If your number added with 5, th result is " + str(N + 5)) # 4



In part number (1) and (3), the program reads the input from the user and the input is
entered into the variable S and N. Then, if you want the program to receive a number
(so it can be added / multiplied / other), we wrap input() with int(). Besides int, string
(collection of characters), Python can accept float (real number) data type, and many more.


1.3      Data Types

There are several types of data, but in Computational Thinking we will only use the follow-
ing data types:

   bool      Boolean         True or False
   int       Integer     all integer numbers
  float       Real         all real numbers
 string        Text    collection of characters

Example of use:

B = True               # Boolean
I = 123456789012       # Integer
R = 2.331973           # Real
S = "abc"              # Text
S = ’def ’



Pay attention to the S variable, you are free to use single quotes (’) or double quote (").


1.4      Operator

1.4.1    Arithmetic Operator

 Operator             Description                     Example
        +              Addition               2 + 3 evals to 5
        -            Substraction            1 - 8 evals to -7
        *            Multiplication          5 * 6 evals to 30
        /              Division             13 / 5 evals to 2.6
        //     Division (rounded down)       13 // 5 evals to 2
        %              Modulo                13 % 5 evals to 3



                                                  5

## [Module_Python h6]

1.4.2    Assignment Operator

 Operator            Description                                     Example
     =               Assignment                                        N = 5
     +=               Addition                             N += 5, N will be added by 5.
     -=              Substraction                       N -= 5, N will be substracted by 5.
     *=             Multiplication                      N *= 5, N will be multiplied by 5.
     /=                Division                           N /= 5, N will be divided by 5.
    //=       Division (Rounded Down)          N //= 5, N will be divided by 5 (then rounded down).
     %=                Modulo                             N %= 5, N will be modulo by 5.



1.4.3    Relational Operator

 Operator       Description        True Example      False Example
        ==        Equals              2 == 2            2 == 3
        !=      Not equals            3 != 2            3 != 3
        <        Less than             2 < 3             2 < 2
        >      Greater than            3 > 2             3 > 2
        <=     Less or equal          2 <= 2            1 <= 3
        >=    Greater or equal        6 >= 5            2 >= 4



1.4.4    Logical Operator

 Operator     Description         True Example            False Example
    and          And           (1 < 2)and (3 == 3)    (1 == 2)and (3 == 3)
     or           Or           (1 < 2)or (4 == 3)      (3 < 2)or (2 == 3)
    not        Negation            not (3 < 2)             not (1 > 2)




                                                6

## [Module_Python h7]

1.5     Module 1 Exercise

1.5.1   Practice Problem 1 Year 2025/2026

Ms. Sal is asked to look after an artist booth at a convention. A customer just arrived and paid
p rupiah for an item worth b rupiah. The customer pays with cash, and the booth owner
wants the change to be given using the largest possible denominations. Help Ms. Sal
calculate how many Rp50,000, Rp20,000, Rp10,000, Rp5,000, and Rp1,000 bills are needed
for the customer’s change!

Example 1
Input payment amount ( rupiah ): 180000
Input item price ( rupiah ): 151000
Ms. Sal needs to give 0 Rp50000 bill(s), 1 Rp20000 bill(s), 0 Rp10000
    bill(s), 1 Rp5000 bill(s), and 4 Rp1000 bill(s).



Example 2
Input payment amount ( rupiah ): 100000
Input item price ( rupiah ): 13000
Ms. Sal needs to give 1 Rp50000 bill(s), 1 Rp20000 bill(s), 1 Rp10000
    bill(s), 1 Rp5000 bill(s), and 2 Rp1000 bill(s).




1.5.2   Practice Problem 2 Year 2025/2026

Mr. Mik is watching a movie in a theater whose seats are neatly arranged in a rectangle.
The theater has n rows and m columns of seats. Seat numbers start from 1 at the leftmost
column of the first row, continuing to the right, then to the next row.

Example for n = 4 and m = 5:


                                     1    2   3     4     5
                                     6    7   8     9    10
                                    11   12   13    14   15
                                    16   17   18    19   20


Mr. Mik is curious to find the mirror seat of a given seat. A mirror seat is defined as the seat
whose position is reflected against the center point of the theater’s rectangle.

Given three integers n (number of seat rows), m (number of seat columns), and k (the seat
number chosen by Mr. Mik), determine the mirror seat number!

Hint:


   • Use the modulo operator ”%” to get the remainder of a division.
   • Use the ”//” operator to get the integer result of a division.

   • If-else is not allowed.


                                               7

## [Module_Python h8]

Assumption: The seat number chosen by Mr. Mik (k) is always valid, i.e., between 1 and
n × m.

Example 1
Input number of seat rows (n): 4
Input number of seat columns (m): 5
Input chosen seat number (k): 9
Mirror seat number : 12



Example 2
Input number of seat rows (n): 3
Input number of seat columns (m): 5
Input chosen seat number (k): 8
Mirror seat number : 8



Explanation of Example 2:
Since the theater has an odd number of rows and columns, the seat exactly at the center
(2, 3) is its own mirror.


1.5.3   Practice Problem 3 Year 2025/2026

Mr. Mik runs a very popular electric bike rental business on his campus. To keep customers
disciplined, Mr. Mik applies a late-return penalty system with the following rules:


   • Every full day of lateness incurs a penalty of Rp 800,000.
   • After the full days are accounted for, every remaining full hour incurs an additional
     penalty of Rp 25,000.
   • After the full days and hours are accounted for, every remaining 5 minutes incurs a
     penalty of Rp 1,000.
   • If the remaining minutes are less than 5, no additional penalty is charged.


Hint:

   • Use the modulo operator ”%” to get the remainder of a division.
   • Use the ”//” operator to get the integer result of a division.
   • If-else is not allowed.

Help Mr. Mik calculate the total penalty his customer has to pay!

Assumption: The lateness duration is always more than 0 minutes.

Example 1
Input lateness duration ( minutes ): 45
Total penalty to be paid: Rp 9000


                                              8

## [Module_Python h9]

Explanation of Example 1:
45 minutes of lateness = 45 / 5 x 1000 = Rp 9,000
Since it is less than 1 hour (60 minutes), there is no additional penalty.

Example 2
Input lateness duration ( minutes ): 75
Total penalty to be paid: Rp 28000




                                               9

## [Module_Python h10]

2     Module 2 - Conditional Statements

2.1   Control

In programming, we can control the flow of our program. Thus, our program can behave
depending on user input. Suppose we make a program that checks whether a positive
number:

print("Input value of N: ", end="")
N = int(input ())

if (N > 0):
    print(str(N) + " is positive number ")

# str(N) is used to convert N to string such that it can be concatenated .



Then, if we want to handle the non-positive number:

...
      if (N > 0):
          print(str(N) + " is positive number ")
      else: # N <= 0
          print(str(N) + " is not positive number ")
...



However, we know that sometimes numbers can be zero or negative, so we add:

...
      if (N > 0):
          print(str(N) + " is positive number ")
      elif (N < 0):
          print(str(N) + " is negative number ")
      else: # N == 0
          print(str(N) + " is zero")
...



Also notice that we can repeat the else. In addition, we can also put if in if.

...
      if (N >= 0):
          if (N > 0):
              print(str(N) + " is positive number ")
          else: # N == 0
              print(str(N) + " is zero")
      else: # N < 0
          print(str(N) + " is negative number ")
...




                                             10

## [Module_Python h11]

2.2     Module 2 Exercise

2.2.1   Even-Odd Program

With the program which determines positive and negative numbers above, modify it such
that if the number is positive will also tell whether it is odd or even.

Example 1
Input value of N: 20
20 is an even positive integer




2.2.2   Practice Problem 1 Year 2022

Mr. Riz is taking an exam consisting of 14 short-answer questions and 2 essay questions.
The exam lasts for 2 hours. During the first hour, he focused on solving only a few questions.
He is worried that he might not be able to complete all questions on time. Mr. Riz plans to
work on 1 remaining short-answer question for 10 minutes and 1 remaining essay question
for 20 minutes.

Determine if Mr. Riz manages to complete all questions on time.

Example 1
Enter the number of short - answer questions already completed : 12
Enter the number of essay questions already completed : 1
Mr. Riz will successfully complete all questions



Mr. Leo refers to a number as a ”Bravo” number if the sum of each of its digits is evenly
divisible by each of its digits. If a number does not meet this criterion, it is referred to as an
ordinary number, and a 4-digit number is provided. Determine the category of the number.

Hint: Use division and modulo to get the value of each digit.

Example 1
Enter a number : 4228
The number is a Bravo number .



Explanation for Example 1: The sum of each digit in the number 4228 is 4 + 2 + 2 + 8 = 16,
and 16 is evenly divisible by each of its digits, which are 2, 4, and 8, so it is called a ”Bravo”
number.

Example 2
Enter a number : 3425
The number is an ordinary number .




                                               11

## [Module_Python h12]

2.2.3   Practice Problem 3 Year 2022

A frog observed by Mr. Riz is on an x-axis. The frog jumps based on a simple pattern. The
first jump is a units to the right, the second jump is b units to the left, the third jump is a
units to the right, the fourth jump is b units to the left, and so on for k times. The number k
is obtained based on the frog’s initial position with the following rules:


   • If the frog is at an even coordinate, its k value is the frog’s ability to jump to the right
     (a) multiplied by the frog’s ability to jump to the left (b).

   • If the frog is at an odd coordinate, its k value is a × 2.
   • If the frog is at a negative coordinate, it returns to the first rule (a × b).
   • However, if the frog is at a negative coordinate that is a multiple of 3, its k value is
     b × 2.


Determine the current coordinate of the frog.

Example 1
Enter the coordinate : 0
Enter the length of jump to the right: 5
Enter the length of jump to the left: 1
Current coordinate is 13



Explanation for Example 1: Since 0 falls under the first rule, the frog will jump 5 times. The
calculation of the frog’s coordinate will be like this: 0 + 5 - 1 + 5 - 1 + 5 = 13

Example 2
Enter the coordinate : -3
Enter the length of jump to the right: 2
Enter the length of jump to the left: 5
Current coordinate is -18




                                                12

## [Module_Python h13]

3       Module 3 - Looping and Array

3.1     Looping

In programming, often we need looping to achieve a certain result. If this repetition is done
manually, the source size will become too large. For example, if we want to write ”Hello
World” on the screen 1000 times, then it will need at least 1000 statements. Using looping,
the problem can be completed using only a few lines of the program.

for i in range (1000) :
    print("Hello world")




3.1.1    While Loop

One of the syntax of looping that is often used is While-Do syntax. The program will check
a condition that is given beforehand run the statement inside it.

Here are the programs that accept a and b then write a, a + 1, a + 2, . . . , b − 1, b.

a = int(input ())
b = int(input ())
i = a
while (i <= b):
    print(i)
    i += 1



Notice that:


    1. While Loop Syntax is while (condition):
    2. While loop body will be executed until the condition is false.
    3. Body while loop is the code that is indented inside the loop.


3.1.2    For Loop

The second form of looping is the form For. This form is generally used if the number of
looping is known. However, for loops can also be made with a while-do loop.

Here are the programs that accept a and b then write a, a + 1, a + 2, . . . , b − 1, b.

a = int(input ())
b = int(input ())
for i in range(a, b+1):
    print(i)



Notice that


                                                 13

## [Module_Python h14]

  1. For Loop syntax is for variable in range(value):
  2. For loop body will be executed determined by the range given.
  3. For loop body is the code that is indented inside the loop.
  4. Variable value will change each time the loop is executed for the values in range.

range can be used with one, two, or three parameters. For more explanation, see this code:

range (10)               # 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
range (2, 5)             # 2, 3, 4
range (7, 2, -1)         # 7, 6, 5, 4, 3
range (2, 8, 2)          # 2, 4, 6




3.2   Nested Loop

Looping can also be nested. For example, the following program will output a square
pattern of asterisk.

n = int(input ())
for i in range(n):
    for j in range(n):
        print(’*’, end=’’) # Executed n * n times
    print () # Executed n times
# Always mindful of indentations in loops.



This also shows that code inside the body of a loop can be other code such as I/O, operations,
other loops. You can use while loop inside a for loop and vice versa.


3.3   Array

Arrays are variables with one name, but they contain many values. Access the values done
with an index.

Consider the following example:

 Indeks    0     1   2    3    4    5   6     7     8    9
   A       3    10   5    7   11   19   23   35    37   12

   • A[0] = 3
   • A[1] = 10
   • A[7] = 35


In the example above, we have a variable named A. The variable A has 10 values, where
these values can be accessed with an index. To access the x-index, use A[x]. And we can
consider the value of A[x] as a stand-alone variable. This concept is what we call arrays.
Also note that the index starts from 0.


                                              14

## [Module_Python h15]

3.3.1   Array Declaration

Because arrays are also a variable, the array also requires declarations like other variables.

Example of array declaration:


   • x = [0 for x in range(n)] create an array sized n with all contains zero.
   • x = [’*’for x in range(100)] create an array sized 100 with all contains ’*’.


In above example, the array A consists of A[0], A[1], A[2], . . . A[9]. Accessing index out of
bound will cause a runtime error. Therefore, declare the range of indices that will be used
appropriately.


3.3.2   Array and Variable

An array can be considered a variable, so that all types of operations in the variable also
apply to the array. For example, we have an array

arr = [0 for i in range(10)]

Then the array arr will be defined for index 0 to index 9. Then we can do the instruction

arr[2] = int(input())

Given 5 numbers we can do

arr [0] = int(input(’Input       value   index     0:   ’))
arr [1] = int(input(’Input       value   index     1:   ’))
arr [2] = int(input(’Input       value   index     2:   ’))
arr [3] = int(input(’Input       value   index     3:   ’))
arr [4] = int(input(’Input       value   index     4:   ’))



However, the input method is not efficient. It will be more efficient if we input using
looping.

for i in range (5):
    arr[i] = int(input(’Input value index ’ + str(i) + ’: ’))




3.3.3   String

In the first module, we have learned about string. String can be considered as an array of
characters. For example, the string s1

s1 = ’Hello’

can be considered as an array of characters H, e, l, l, o. Therefore, we can access the
character in the string using the index. For example, Hello[0] is H.



                                              15

## [Module_Python h16]

But, there is a difference between string and array of characters. String is immutable, while
array of characters is mutable. This means that we cannot change the value of the character
in the string. For example, we cannot do s1[1] = ’a’ as this will results into an error.

In contrast, if we have an array of characters, we can change the value of the character. For
example, if we define s2 as

s2 = [’H’, ’e’, ’l’, ’l’, ’o’]

then we can change the value of the character in the array. For example, we can do s2[1]
 = ’a’. This will change the value of the character in the array of characters to a that is
s2 = [’H’, ’a’, ’l’, ’l’, ’o’].




                                             16

## [Module_Python h17]

3.4     Module 3 Exercise

3.4.1   Smallest Power of 10

Create a program that receives an integer N and write the smallest integer 10x that is greater
or equal than N.

Example 1
Input N: 5
10



Example 1
Input N: 1234
10000



Which loop is more appropriate for this question?


3.4.2   Number Triangle

Create a program that receives an integer N and create a number triangle with a base of N
as in Example below.

Example 1
Input N: 5
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5



Which loop is more appropriate for this question?

From both of the above, what can we conclude about the characteristics of each loop?


3.4.3   Reverse

Create a program that accepts N integers and rewrite the integers in reverse.

Example
Input N: 5
5
2
1
6
3
Reversed :


                                             17

## [Module_Python h18]

3 6 1 2 5




3.4.4   Anagram

Given two arrays A and B. Create a program that will check whether B is an anagram of A
or not. Assume that each element of A and B will always a whole number [1,10].

Array B is an anagram of array A if the elements of A can be rearranged into array B.

Hint: make a frequency array, an array whose first element is how many 1s exist in the
array, second element is how many number 2s exist in the array, and so on.

Example 1
Input number of elements in A: 3
Input element A number 1: 8
Input element A number 2: 4
Input element A number 3: 3
Input number of elements in B: 3
Input element B number 1: 4
Input element B number 2: 8
Input element B number 3: 3
B is anagram of A



Example 2
Input number of elements in A: 2
Input element A number 1: 1
Input element A number 2: 4
Input number of elements in B: 2
Input element B number 1: 1
Input element B number 2: 5
B is not anagram of A




3.4.5   Palindrome

Create a program that accepts a string and write whether a string is palindrome or not.
Assume the string only consists of lowercase characters (a-z).

Example 1
Input string length : 3
Input string : eat
eat is not a palindrome



Example 2
Input string length : 3
Input string : mom
mom is a palindrome


                                            18

## [Module_Python h19]

Example 3
Input string length : 7
Input string : racecar
racecar is a palindrome




3.4.6   Practice Problem 1 Year 2021

Mr. Kil has several Lego pieces with dimensions 1 × 1 × 1. Mr. Kil is tasked with making as
few cubes as possible with the Lego pieces he has. The method is to make the largest cube
possible with the available Lego, then with the remaining Lego, repeat the same process
until there are no more Lego pieces left.

Determine how many cubes Mr. Kil can make.

Note: It is prohibited to use built-in functions to find the square root of a number. The use
of built-in functions to find the square root of a number will result in a score of 0 for this
problem.

Hint: Use a loop to find the nearest cubic value to the number of Lego pieces at any given
time.

Example 1
Enter the number of Lego pieces : 36
Mr. Kil can make 3 cubes.



Explanation for Example 1:
36 = 27 + 8 + 1

Example 2
Enter the number of Lego pieces : 11
Mr. Kil can make 4 cubes.



Explanation for Example 2:
11 = 8 + 1 + 1 + 1


3.4.7   Practice Problem 2 Year 2021

Given a two-variable inequality as follows.

                                  x       5y    p
                                 ( )2 + (    − 2 |x|)2 ≤ 120
                                  2        4
In this problem, Mr. Dip asks you to implement a heart shape using * with the help of the
given inequality on the range −30 ≤ x ≤ 30 and −15 ≤ y ≤ 15. Your answer is considered
correct if the heart shape is clearly visible and not inverted or slanted.

Notes: Use the abs(x) function to turn the value of x into a positive value.



                                              19

## [Module_Python h20]

Example 1
     *************           *************
   *****************       *****************
  ******************** ********************
 ********************* *********************
 *******************************************
 *******************************************
 *******************************************
 *******************************************
  *****************************************
   ***************************************
    *************************************
      *********************************
       *******************************
         ***************************
           ***********************
             *******************
               ***************
                   *********
                     *****
                      ***




3.4.8   Practice Problem 3 Year 2021

Create a program that accepts a natural number N > 1 and outputs its prime factors. The
result must be sorted from the smallest to the largest prime factors.

Example 1
Enter N: 110
The prime factors are 2, 5, 11.



Example 2
Enter N: 160
The prime factors are 2, 5.




3.4.9   Practice Problem 1 Year 2022

Mr. Leo is given a list consisting of N elements. Help Mr. Leo to determine the number of
sublist (a sublist is the result of selecting several consecutive indices in the list) that has an
even sum.

Test Case 1
Enter   the   value of N: 5
Enter   the   number for index     1: 1
Enter   the   number for index     2: 2
Enter   the   number for index     3: 3
Enter   the   number for index     4: 4



                                               20

## [Module_Python h21]

Enter the number for index 5: 5
There are 6 sublists with an even sum.



Explanation for Example 1:
The sublists with an even number of elements are [1, 2, 3], [1, 2, 3, 4], [2], [2, 3, 4, 5], [3, 4, 5],
and [4].


3.4.10   Practice Problem 2 Year 2022

Mr. Kil has an unsorted collection of numbers, determine how many sorted number groups
can be formed from the array. Data is always distinct (different values).

The input data is in the range of 1-1000.

Example 1
Enter the number of data: 5
Enter data for index 1: 2
Enter data for index 2: 1
Enter data for index 3: 3
Enter data for index 4: 6
Enter data for index 5: 5
The number of sorted number groups is 2.



Explanation for Example 1:
Ordered groups: [1,3] and [5,6]

Example 2
Enter the number of data: 6
Enter data for index 1: 7
Enter data for index 2: 12
Enter data for index 3: 35
Enter data for index 4: 6
Enter data for index 5: 10
Enter data for index 6: 9
The number of sorted number groups is 4.



Explanation for Example 2:
Ordered groups: [6,7], [9,10], [12,12], [35,35]




                                                  21

## [Module_Python h22]

4     Module 4 - Function and Procedure

4.1   Function

What is a function? Function is a part of a program that is capable of working certain
tasks or operations outside the main program. Function will return value according to the
algorithm given.

For example, the function to calculate squares is as follows:

def square (x):
    x2 = x * x
    return x



The above function is named square and returns the square value of x. That function accepts
a parameter named x.

For example, the following is a complete program that receives input and outputs square
of the input number.

def square (x):
    x2 = x * x
    return x2

n = int(input ())
n2 = square (n)
print(n2)



Notice in the example above, the variable in the main program is named n. But in the
function, the variable is named x. Even if the value of x changes, the value of n in the main
program will not change.

A function can also accept more than one parameter. In addition, functions can also do
things like ordinary programs, but cannot change variables in the main program. For
example, here is a function that calculates the value of ab .

def power(a, b):
    # assume b >= 0
    c = 1
    for i in range(b):
        c *= a
    return c



Note: You are not recommended to put arrays as function parameters, because there are
some things that have not been taught at Computational Thinking.




                                             22

## [Module_Python h23]

4.2   Procedure

The actual procedure is the same as the function, but there is no return value. As for
example, here is a program to write menus:

print("Menu:")
print("1. Burger ")
print("2. Fried Chicken ")
print("3. Instant Noodle ")
print("Enter your choice : ")
food_option = int(input ())

print("Menu:")
print("1. Avocado Juice")
print("2. Thai Tea")
print("3. Milk Tea")
print("Enter your choice : ")
beverage_option = int(input ())

print("Menu:")
print("1. Fried fries")
print("2. Kerupuk ")
print("3. Doughnut ")
print("Enter your choice : ")
additional_option = int(input ())



As written above, we need to write down the menu many times. We can summarize it to:

def write_menu (opt1 , opt2 , opt3):
    print("Menu:")
    print("1. " + str(opt1))
    print("2. " + str(opt2))
    print("3. " + str(opt3))
    print("Enter your choice : ")

tulis_menu (" Burger ", "Fried Chicken ", " Instant Noodle ")
food_option = int(input ())

tulis_menu (" Avocado uice", "Thai Tea", "Milk Tea")
beverage_option = int(input ())

tulis_menu ("Fried fries", " Kerupuk ", " Doughnut ")
additional_option = int(input ())




                                         23

## [Module_Python h24]

4.3     Module 4 Exercise

4.3.1   Quadratic Function

You have a function defined as:


                                         f (x) = x2 − 2x + 5

Create a program that will accept A and B, then writes f (A), f (A + 1), . . . , f (B)!

Note: You have to write a function in your program that accepts a parameter x and returns
the value of f (x).

Example
Input A: 3
Input B: 6
f(3) = 8
f(4) = 13
f(5) = 20
f(6) = 29




4.3.2   Pascal Triangle

Pascal triangle can be made using a matrix. Matrix will be initialized by filling all the
elements in the first row and the first column with 1. Then, every empty elements will be
defined as the sum of element from previous row (but the same column) and the sum of
element from previous column (but the same row). Make a program that accepts an integer
N and writes a pascal triangle of size N × N

Example
Input N: 4
1 1 1 1
1 2 3 4
1 3 6 10
1 4 10 20




4.3.3   Practice Problem 1 Year 2021

Mr. Ric and Mr. Dip often go to ITB together by motor vehicle. However, Mr. Ric feels
that alternating the schedule for paying for gasoline only disadvantages him. So Mr. Dip
proposed a way to divide the payment schedule. For every 2n , they will change the pattern
by swapping the order (complement) of the payment in the pattern 2(n−1) . Here is the
pattern proposed by Dip:




                                                 24

## [Module_Python h25]

 n     Pattern
 0       A
 1       AR
 2     ARRA
 3   ARRARAAR

As can be seen, the text in bold is the opposite of the non-bold part of a pattern. Mr. Ric
really likes this idea. Help Mr. Ric create a program to generate this pattern.

Use Functions or Procedures in solving this problem. Clue: The sequence is the addition
of complements from the previous sequence as shown in the example. Prepare an array of
characters with a size of 2 times the previous sequence.

Example 1
Enter character 1: A
Enter character 2: R
Enter the value of n: 2
The obtained pattern : ARRA



Example 2
Enter character 1: U
Enter character 2: W
Enter the value of n: 4
The obtained pattern : UWWUWUUWWUUWUWWU




                                            25
