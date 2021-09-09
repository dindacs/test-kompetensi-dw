const mysql2 = require('mysql2');

const connectionPool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: 'dinda1313',
  database: 'db_provkab'
});

module.exports = connectionPool;