pw1 = input('Masukkan password pertama : ')
pw2 = input('Masukkan password kedua : ')
pw3 = input('Masukkan password ketiga : ')
rot = int(input('Masukkan hari rotasi : '))
day = int(input('Ingin melihat password di hari ke ? : '))

# Mengecek sudah di hari ke berapa, dan setelah rotasi ke berapa
# Cont. Rotasi 5 hari, ingin melihat hari ke 29
# Maka password sudah berganti sebanyak (29-1) // 5 == 5 kali (Karena mulai dari hari ke-1).
# Lalu jumlah rotasi kita modulo 3 untuk melihat password mana yang sedang in charge, hasilnya akan selalu <= 2
day_pass = ((day-1) // rot ) % 3

# cara 1
res = (day_pass == 0 and pw1) or (day_pass == 1 and pw2) or (day_pass == 2 and pw3)

# cara 2
# res = (day_pass == 0)*pw1 + (day_pass == 1)*pw2 + (day_pass == 2)*pw3


print(res)