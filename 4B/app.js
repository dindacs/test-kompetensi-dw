const http = require('http');
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const dbConn = require('./connection/db');
const uploadFile = require('./middlewares/uploadFile');
const pathFile = 'http://localhost:3000/uploads/';

const app = express();

app.use(express.json());

app.set('view engine', 'hbs');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.urlencoded({ extended: false }));

// display all
app.get('/', (req, res) => {
  const title = 'Data Prov';
  const query = `SELECT * FROM tb_provinsi ORDER BY id DESC`

  dbConn.getConnection((err, conn) => {
    if (err) throw err;
    conn.query(query, (err, results) => {
      if (err) throw err;

      const provinsies = [];

      for (let result of results) {
        provinsies.push({
          id: result.id,
          nama_prov: result.nama_prov,
          diresmikan: result.diresmikan,
          photo: pathFile + result.photo,
          pulau: result.pulau,
        });
      }

      res.render('index', {
        title,
        provinsies,
      });
    });

    conn.release();

  });
});

// ------------------------------

app.get('/provinsi', (req, res) => {
  const title = 'Data Prov';
  const query = `SELECT * FROM tb_provinsi ORDER BY id DESC`

  dbConn.getConnection((err, conn) => {
    if (err) throw err;
    conn.query(query, (err, results) => {
      if (err) throw err;

      const provinsies = [];

      for (let result of results) {
        provinsies.push({
          id: result.id,
          nama_prov: result.nama_prov,
          diresmikan: result.diresmikan,
          photo: pathFile + result.photo,
          pulau: result.pulau,
        });
      }

      res.render('provinsi', {
        title,
        provinsies,
      });
    });

    conn.release();

  });
});

app.get('/add-provinsi', (req, res) => {
  const title = 'Data Prov';
  res.render('add-provinsi', {
    title,
  });
});

// input provinsi
app.post('/add-provinsi', uploadFile('photo'), (req, res) => {
  const { namaProv, diResmikan, pulaunya } = req.body;
  const photo = req.file.filename;

  console.log(req.file.filename);

  const query = `INSERT INTO tb_provinsi (nama_prov, diresmikan, photo, pulau) VALUES ("${namaProv}","${diResmikan}","${photo}","${pulaunya}")`;

  dbConn.getConnection((err, conn) => {
    if (err) throw err;
    conn.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/provinsi');
      console.log(results);

    });

    conn.release();

  });
});

// edit provinsi
app.post('/edit-provinsi', uploadFile('photo'), (req, res) => {
  let { id, editName, diresmikan, oldPhoto, pulau } = req.body;

  let photo = oldPhoto.replace(pathFile, '');

  if (req.file) {
    photo = req.file.filename;
  }

  const query = `UPDATE tb_provinsi SET nama_prov = "${editName}", diresmikan = "${diresmikan}", photo = "${photo}", pulau = "${pulau}" WHERE tb_provinsi.id = "${id}"`;

  dbConn.getConnection((err, conn) => {
    if (err) throw err;
    conn.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/provinsi');

    });

    conn.release();

  });
});

// delete type
app.get('/delete-provinsi/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM tb_provinsi WHERE id = "${id}" `;

  dbConn.getConnection((err, conn) => {
    if (err) throw err;
    conn.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/provinsi');

    });

    conn.release();

  });
});

// ------------------------------

// display kabupaten
app.get('/kabupaten', (req, res) => {
  const title = 'Data Prov';
  const query = `SELECT * FROM tb_kabupaten
  INNER JOIN tb_provinsi ON tb_kabupaten.provinsi_id = tb_provinsi.id
  ORDER BY tb_kabupaten.id DESC`

  dbConn.getConnection((err, conn) => {
    if (err) throw err;
    conn.query(query, (err, results) => {
      if (err) throw err;

      const kabupatens = [];

      for (let result of results) {
        kabupatens.push({
          id: result.id,
          nama_kab: result.nama_kab,
          nama_prov: result.nama_prov,
          diresmikan: result.diresmikan,
          photo_kab: pathFile + result.photo_kab,
        });
      }

      res.render('kabupaten', {
        title,
        kabupatens,
      });
    });

    conn.release();

  });
});

app.get('/add-kabupaten', (req, res) => {
  const title = "Kabupaten"
  const query = `SELECT * FROM tb_provinsi ORDER BY id DESC`

  dbConn.getConnection((err, conn) => {
    if (err) throw err;
    conn.query(query, (err, results) => {
      if (err) throw err;

      const provinsies = [];

      for (let result of results) {
        provinsies.push({
          id: result.id,
          nama_prov: result.nama_prov,
        });
      }

      res.render('add-kabupaten', {
        title,
        provinsies,
      });
    });

    conn.release();

  });
});

// input kabupaten
app.post('/add-kabupaten', uploadFile('photo_kab'), (req, res) => {
  const title = 'Add Kabupaten'
  const { namaKab, provinsi, diResmikan } = req.body;
  const photo_kab = req.file.filename;
  console.log(photo_kab);

  const query = `INSERT INTO tb_kabupaten (nama_kab, provinsi_id, 	diresmikan, photo_kab) VALUES ("${namaKab}","${provinsi}","${diResmikan}","${photo_kab}")`;

  dbConn.getConnection((err, conn) => {
    if (err) throw err;
    conn.query(query, (err, results) => {
      if (err) throw err;

      res.render('add-kabupaten', {
        title,
      });

      res.redirect('/kabupaten');
      console.log(results);

    });

    conn.release();

  });
});

// edit kabupaten
app.post('/edit-kabupaten', (req, res) => {
  const { idType, editName } = req.body;

  const query = `UPDATE tb_kabupaten SET name = "${editName}" WHERE type_id = "${idType}"`;

  dbConn.getConnection((err, conn) => {
    if (err) throw err;
    conn.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/kabupaten');

    });

    conn.release();

  });
});

// delete kabupaten
app.get('/delete-kabupaten/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM tb_kabupaten WHERE id = "${id}" `;

  dbConn.getConnection((err, conn) => {
    if (err) throw err;
    conn.query(query, (err, results) => {
      if (err) throw err;

      res.redirect('/kabupaten');

    });

    conn.release();

  });
});

// ------------------------------
app.get('/detail/:id', (req, res) => {
  const title = 'Data Prov';

  const { id } = req.params;

  const query = `SELECT * FROM tb_provinsi WHERE id = "${id}"`;

  dbConn.getConnection((err, conn) => {
    if (err) throw err;
    conn.query(query, (err, results) => {
      if (err) throw err;

      const provinsiDetail = [];

      for (let result of results) {
        provinsiDetail.push({
          id: result.id,
          nama_prov: result.nama_prov,
          diresmikan: result.diresmikan,
          photo: pathFile + result.photo,
          pulau: result.pulau,
        });
      }

      res.render('detail', {
        title,
        provinsiDetail,
      });
    });

    conn.release();

  });
});


const port = 3000;
const server = http.createServer(app);
server.listen(port);
console.debug(`Server Oke ${port}`);