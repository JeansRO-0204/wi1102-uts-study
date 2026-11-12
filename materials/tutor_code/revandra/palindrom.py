kata = str(input("Masukkan kata: "))

palindrom = True

for i in range(len(kata)):
	if(kata[len(kata) - 1 - i] != kata[i]):
		palindrom = False

if palindrom:
	print(f"{kata} merupakan palindrom")
else:
	print("bukan palindrom")
