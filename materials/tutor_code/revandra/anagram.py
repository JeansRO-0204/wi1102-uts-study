panjang_array = int(input("Panjang array: "))

a = [0 for i in range(panjang_array)]
b = [0 for i in range(panjang_array)]

for i in range(panjang_array):
	a[i] = int(input(f"A ke-{i + 1}: "))

for i in range(panjang_array):
	b[i] = int(input(f"B ke-{i + 1}: "))

angka_a = [0 for i in range(10)]
angka_b = [0 for i in range(10)]

for i in a:
	angka_a[i] = angka_a[i] + 1

for i in b:
	angka_b[i] = angka_b[i] + 1

if (angka_a == angka_b):
	print("B anagram dari A")
else:
	print("Bukan anagram")
