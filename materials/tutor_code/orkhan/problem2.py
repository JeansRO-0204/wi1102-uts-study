angka = int(input('Masukkan bilangan yang ingin dicek : '))

# Gunakan operator bitwise '&'
# Membandingkan struktur bit kedua integer dan mereturn jika masing-masing bit yang dicompare bernilai 1
# Kenapa pakai operator bitwise? Karena bilangan genap hanya punya tepat 1 angka 1 dalam struktur binernya
# Cont. 8 = [1][0][0][0] --> Struktur biner (8*1 + 4*0 + 2*0 + 1*0)
# 8-1 = 7 = [0][1][1][1] --> Struktur biner (8*0 + 4*1 + 2*1 + 1*1)
# 8 & 7 --> [1][0][0][0] & [0][1][1][1] --> [0][0][0][0]
# Bilangan dua pangkat N akan selalu menghasilkan nol jika dilakukan operasi 'and' 
# dengan bilangan yang memiliki nilai N-1.

if angka > 0 and (angka & (angka-1) == 0):
    print('ya')
else:
    print('bukan')