def hitungkartu(hand):
    # inisiasi total kartu dan banyaknya ace
    total = 0
    ace = 0
    
    # untuk setiap kartu di hand
    for i in hand:
        
        # jika kartu tersebut merupakan K,Q, atau J, maka total tambah 10
        if i in ['K','Q','J']: 
            total += 10
            
        # jika kartu merupakan ace, maka kita kesampingkan dulu, dan total ace ditambah 1
        elif i == 'A': 
            ace += 1
        
        # jika kartu merupakan angka biasa, maka kita ubah kartu tersebut jadi integer,
        # lalu tambahkan ke total
        else: 
            total += int(i)
    
    # kita hitung setiap ace yang sudah kita temukan
    for j in range(ace):
        # kalau misalnya memungkinkan untuk ace menjadi 11, maka ace jadi 11
        if total + 11 <= 21: 
            total += 11
        
        # jika tidak memungkinkan (total + 11 > 21), maka ace menjadi 1
        else: 
            total += 1  
            
    # jika total melebihi 21 (bust), maka kartu tersebut tidak valid karena kalah, return 0
    if total > 21: 
        return 0
    
    # jika valid, maka return total
    else: 
        return total
    
    
def bandingKartu(hand1, hand2):
    
    # call function hitungkartu()
    pointhand1 = hitungkartu(hand1)
    pointhand2 = hitungkartu(hand2)
    
    # return true jika hand1 lebih besar dari hand2, jika tidak maka false
    return True if pointhand1 > pointhand2 else False


jmlhand1 = int(input(f'Masukkan jumlah kartu di hand 1: '))
hand1 = [input(f'Masukkan kartu ke-{i+1} di hand 1: ') for i in range(jmlhand1)]
jmlhand2 = int(input(f'Masukkan jumlah kartu di hand 2: '))
hand2 = [input(f'Masukkan kartu ke-{i+1} di hand 2: ') for i in range(jmlhand2)]


# call the function
hand1lebihbesardarihand2 = bandingKartu(hand1, hand2)

if hand1lebihbesardarihand2:
    print('Hand yang lebih baik adalah hand 1!')
else:
    print('Hand yang lebih baik adalah hand 2!')