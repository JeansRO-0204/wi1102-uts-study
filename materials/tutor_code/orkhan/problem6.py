def pyramid(tinggi):
    # untuk i dari 1 sampai tinggi
    for i in range(1, tinggi+1):
        
        # kalau i lebih dari 10
        if i >= 10:
            # buat spasi sebanyak tinggi-iterasi ke berapa
            space = ' '*(tinggi-i)
            
            # buat array yang berisi 'X' sebanyak iterasi kali
            num = ['X']*i
            
            # tambahkan spasi di antara 'X' tersebut
            numLine = ' '.join(num)
        else:
            # buat spasi sebanyak tinggi-iterasi ke berapa
            space = ' '*(tinggi-i)
            
            # buat array yang berisi angka i sebanyak iterasi kali
            num = [str(i)]*i
            
            # tambahkan spasi di antara angka i tersebut
            numLine = ' '.join(num)
            
        # print spasi di kiri + angka yang sudah ditaruh spasi di antara angka tersebut
        print(space + numLine)
        

tinggi = int(input('Masukkan tinggi piramida : '))

# panggil fungsi piramida
pyramid(tinggi)