# Soal 6

p = float(input("Pinjaman awal (Rp): "))
b = float(input("Bunga (%): "))
t = int(input("Lama pinjaman (hari): "))

for i in range(1,t+1):
	p+=p*b/100
	print(f"Hari {i}: Rp{p:.2f}")
	
print(f"Besar uang pinjaman saat jatuh tempo adalah Rp{p:.2f}")

#INPUTAN
"""
1000
10
10

"""
