def jarak(titik1, titik2):
	jarak_x = abs(titik2[0] - titik1[0])
	jarak_y = abs(titik2[1] - titik1[1])

	jarak_total = (jarak_x**2 + jarak_y**2)**0.5

	return jarak_total

x1 = int(input("x1: "))
y1 = int(input("y1: "))
p1 = (x1, y1)

x2 = int(input("x2: "))
y2 = int(input("y2: "))
p2 = (x2, y2)

x3 = int(input("x3: "))
y3 = int(input("y3: "))
p3 = (x3, y3)

x4 = int(input("x4: "))
y4 = int(input("y4: "))
p4 = (x4, y4)

seluruh_jarak_tiap_titik = [
	jarak(p1, p2),
	jarak(p1, p3),
	jarak(p1, p4),
	jarak(p2, p3),
	jarak(p2, p4),
	jarak(p3, p4),
]

sisi = min(seluruh_jarak_tiap_titik)
diagonal = max(seluruh_jarak_tiap_titik)

print(seluruh_jarak_tiap_titik)

jumlah_sisi = 0
for jarak in seluruh_jarak_tiap_titik:
	if (jarak == sisi):
		jumlah_sisi = jumlah_sisi + 1

jumlah_diagonal = 0
for jarak in seluruh_jarak_tiap_titik:
	if (jarak == diagonal):
		jumlah_diagonal = jumlah_diagonal + 1

if (jumlah_sisi == 4) and (jumlah_diagonal == 2):
	print("Kotak")
else:
	print("Bukan kotak")
