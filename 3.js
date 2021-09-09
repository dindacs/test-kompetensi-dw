drawImage = (n) => {

  let string = "";

  // loop luar
  for (let i = 0; i < n; i++) {

    // loop dalam
    for (let j = 0; j < n; j++) {
      // string += `* #`;

      if (j % 2 == 1) {
        string += `*`
      } else {
        string += `#`
      }

    }
    string += `<br/>`;
  }

  //cetak
  document.write(string);
}

drawImage(7)
