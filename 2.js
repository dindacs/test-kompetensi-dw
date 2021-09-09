nilaiTerkecil = (data) => {

  // hitung jumlah array
  jmlLength = angka.length;

  for (let i = 0; i < jmlLength - 1; i++) {
    let min = i;

    for (let j = i + 1; j < jmlLength; j++) {
      if (data[j] < data[min]) {
        min = j // cari nilai terkecil
      }
    }

    // ubah posisi
    let temp = data[min];
    data[min] = data[i];
    data[i] = temp;
  }
  return data;
}

angka = [20, 12, 35, 11, 17, 9, 58, 23, 69, 21];
let hasil = nilaiTerkecil(angka);
document.write(hasil);