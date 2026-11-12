jumlah = int(input('Masukkan jumlah teman yang datang : '))
teman = [input(f'Masukkan teman ke-{i+1}: ') for i in range(jumlah)]

# Memasukkan teman yang ditandai ke dalam list baru (Dari jarak tengah sampai sebelum terakhir)
tandai = teman[len(teman)//2: -1]
# print
# fungsi join seperti semen yang dilapisi antara variabel yang bisa diiterasi
print(f'Teman yang ditandai : {', '.join(tandai)}')
