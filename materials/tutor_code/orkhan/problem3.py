totBil = int(input('Masukkan jumlah bilangan yang ingin dicek: '))
bilangans = [int(input(f'Masukkan bilangan ke-{i+1}: ')) for i in range(totBil)]
res = ""

for n in bilangans:
    # Kita anggap semua bilangan prima, lalu sisir yang mana yang tidak prima
    isPrime = True
    
    # Kalau bilangan <= 1, otomatis bukan bil. prima (1,0,-1,dst.)
    if n <= 1:
        isPrime = False
        
    # Kalau bilangan <=3, otomatis bil. prima karena kemungkinan bil. <=1 sudah dieliminasi,
    # Sehingga bilangan kemungkinan hanya (2,3), yang merupakan bilangan prima.
    elif n <= 3:
        isPrime = True
        
    # Jika bilangan dapat dibagi habis oleh 2 dan 3, maka dapat dipastikan ia bukan bil. prima,
    # Karena bil. prima hanya memiliki 2 faktor, 1 dan dirinya sendiri.
    elif (n % 2 == 0 or n % 3 == 0):
        isPrime = False
        
    # Jika bilangan tersebut diatas 3, dan tidak habis dibagi dengan 2 atau 3, maka kita cek apakah
    # Bilangan tersebut habis dibagi i dan i+2. Kenapa i dan i+2?
    else:
        i = 5
        # i mulai dari 5 karena dua bilangan prima sebelumnya telah dieliminasi
        
        # while i^2 <= n, atau dalam kata lain while sqrt(n) >= i, karena faktor pembagi dari suatu bilangan
        # hanya mentok sampai akar dari bilangan tersebut.
        while (i*i <= n):
            # Jika bilangan dapat dibagi habis dengan 6k-1 atau 6k+1, maka bilangan tersebut bukan prima
            if (n%i == 0 or n % (i+2) == 0):
                isPrime = False
                break
            
            # +6 untuk meningkatkan iterasi k, Cont. 5 = 6*1-1, jika +6 maka 11 = 6*2-1, 17 = 6*3-1, dst.
            i+= 6
            
    if isPrime:
        res += 'Ya, '
    else:
        res += 'Tidak, '
        
print(res[:-2]) 