# Soal 7 

n = int(input("N = "))

print("D1:")
D1 = [int(input()) for i in range(n)]
print("D2:")
D2 = [int(input()) for i in range(n)]

nama = ["TP", "TN", "FP", "FN"]
nilai = [0, 0, 0, 0]

for i in range(n):
	if D1[i] + D2[i] == 2:
		nilai[0]+=1
	elif D1[i] + D2[i] == -2:
		nilai[1]+=1
	elif D1[i] < D2[i]:
		nilai[2]+=1
	else:
		nilai[3]+=1

tot = 0

for i in range(4):
	print(f"{nama[i]} = {nilai[i]}")
	tot+=nilai[i]

ans = (nilai[0]+nilai[1])/tot
print("Akurasi =", ans)

#INPUTAN
"""
10
1
-1
-1
1
-1
1
1
-1
-1
1
1
-1
1
-1
1
-1
1
-1
-1
1

"""
