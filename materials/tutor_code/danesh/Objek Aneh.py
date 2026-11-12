n = int(input("Masukkan banyak objek: "))
nilai = [int(input(f"Masukkan nilai objek ke-{i+1}: ")) for i in range(n)]

ans=10**12
panjang = n

rata=[]
l_arr=[]
r_arr=[]

# Cari selisih terkecil, rata-ratanya taro di variabel ans
for i in range(n-1, -1, -1):
	total=0
	for j in range(i, -1, -1):
		total += nilai[j]
		x = total/(i-j+1)
		print(x, j+1,i+1)
		if abs(x-15)<=abs(ans-15):
			ans=x
			rata += [x]
			l_arr +=[j+1]
			r_arr +=[i+1]

# Cari rentang terpendek dan terdepan (array rata udh disort dari akhir ke awal)
for i in range(len(rata)):
	if rata[i] == ans and r_arr[i]-l_arr[i]<=panjang:
		l=l_arr[i]
		r=r_arr[i]
		panjang=r-l+1

print(f"Kumpulan objek aneh adalah objek {(l) if l==r else f"{l} hingga {r}"} dengan nilai rata-rata {ans:.0f}.")

#INPUTAN"
"""
6
-51
38
32
-22
70
-20

5
35
31
-27
35
80

3
14
-20
48
"""
