# Soal 7 

n = int(input("Jumlah data: "))
kupon = [i for i in range(n)]

ID = [int(input(f"No identitas kupon ke-{i}: ")) for i in range(n)]

for t in range(4):
	x = int(input("X: "))
	y = int(input("Y: "))

	bb = x-y
	ba = x+y

	ada_win = False

	for i in range(n):
		if ID[i]>=bb and ID[i]<=ba:
			print(kupon[i], ID[i])
			ada_win = True
			
	if not ada_win:
		print("Tidak ada pemenang undian")

"""
5
9827
1944
5052
2011
1234
2000
100
1000
500
1000
50
1000
0

"""
