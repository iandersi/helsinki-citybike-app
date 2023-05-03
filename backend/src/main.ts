import express from "express";
const mariadb = require('mariadb');
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

const pool = mariadb.createPool({
  host: process.env.MARIADB_HOST,
  user:process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  port: process.env.MARIADB_PORT,
  connectionLimit: 5
});

async function asyncFunction() {
  let conn;
  try {
    conn = await pool.getConnection();
    const journey = await conn.query('SELECT * FROM journeys WHERE departure_date_time LIKE "2021-05%" ORDER BY departure_date_time asc LIMIT 20');
    console.log(journey);
    return journey;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) await conn.end();
  }
}

app.get('/may', async (req, res)=> {
  const departuresInMay = await asyncFunction();
  res.send(departuresInMay);
})

app.listen(8080, ()=> {
  console.log('listening to port 8080');
});

