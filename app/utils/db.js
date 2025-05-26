const mysql = require('mysql2/promise')

async function getDbConnection(){
 const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'myNews_platform'
});
  return connection
}

module.exports = getDbConnection;