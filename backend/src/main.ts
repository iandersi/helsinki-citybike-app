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
    const journey = await conn.query("SELECT * FROM journeys WHERE return_station_id = 100");
    console.log(journey);
    return journey;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) await conn.end();
  }
}


app.get('/ping', (req, res)=> {
  console.log('pong');
  res.send('pong');
})

app.listen(8080, ()=> {
  console.log('listening to port 8080');
});

