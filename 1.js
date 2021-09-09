hitungBarang = (barang, qty) => {

  let barangA = 4550;
  let barangB = 5330;
  let barangC = 8653;
  let diskon = 0;

  if (barang == "A") {
    if (qty > 13) {
      diskon = 231 * 13;
    }
    document.write(`Total harga barang : ${barangA * qty} <br>`);
    document.write(`Potongan : ${diskon} <br>`);
    document.write(`Total yang harus dibayar : ${(barangA * qty) - diskon} <br>`);
  }

  if (barang == "B") {
    if (qty > 7) {
      diskon = (23 * (barangB * qty) / 100);
    }
    document.write(`Total harga barang : ${barangB * qty} <br>`);
    document.write(`Potongan : ${diskon} <br>`);
    document.write(`Total yang harus dibayar : ${(barangB * qty) - diskon} <br>`);
  }

  if (barang == "C") {
    document.write(`Total harga barang : ${barangC * qty} <br>`);
    document.write(`Potongan : ${diskon} <br>`);
    document.write(`Total yang harus dibayar : ${(barangC * qty) - diskon} <br>`);
  }
}

hitungBarang('A', 778);