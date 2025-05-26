const getDbConnection = require("../utils/db")

async function testConnection() {
 let db;
 try {
  db = await getDbConnection();
  const [rows] = await db.query('SELECT NOW() AS now');
  console.log('database connected. server time is:', rows[0].now);
 } catch (error) {
  console.error('Failed to connect to database:', err.message);
 } finally{
  if (db) await db.end();
 }
}

testConnection();