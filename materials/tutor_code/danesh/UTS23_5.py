# Soal 5

for i in range(5):
	k = str(input("Kelompok ekonomi: "))
	j = int(input("Jumlah penggunaan (kWh): "))

	if j>1000:
		ans=j*250
		x=10
	elif j>500:
		ans=j*200
		x=5
	elif j>250:
		ans=j*150
		x=5
	else:
		ans=j*100
		x=0

	if k=="rendah":
		subsidi=ans*x/100
		ans-=subsidi
		print(int(ans))
	elif k=="sedang":
		subsidi = (ans/10 if x==10 else 0)
		ans-=subsidi
		print(int(ans))
	else:
		print(int(ans))

#INPUTAN
"""
rendah
250
rendah
900
sedang
900
sedang
2000
tinggi
2000

"""
