bilangan = str(input("Masukkan bilangan: "))

jumlah_digit = 0

for i in range(len(bilangan)):
	jumlah_digit = jumlah_digit + int(bilangan[i])

if (int(bilangan) % jumlah_digit == 0):
	print(f"{bilangan} adalah 'mpruy")
else:
	print("Bukan mpruy")
