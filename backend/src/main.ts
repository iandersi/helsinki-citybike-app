import express from "express";
const mariadb = require('mariadb');
import * as dotenv from 'dotenv';
import {Journey} from "./Journey";
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

async function databaseQuery(idNumberForQuery: number) {
  let conn;
  try {
    conn = await pool.getConnection();
    const journeyArray = await conn.query("SELECT * FROM journeys WHERE id BETWEEN 0 AND ? ORDER BY id ASC", [idNumberForQuery]) as Journey[];
    console.log(journeyArray);
    return journeyArray;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) await conn.end();
  }
}

app.get('/journeys', async (req, res)=> {
  if (!req.query.idNumber) return;
  const idNumberForQueryString = req.query.idNumber.toString();
  if (!idNumberForQueryString) return;
  const idNumberForQuery = parseInt(idNumberForQueryString);
  const journeys = await databaseQuery(idNumberForQuery);
  res.send(journeys);
})

app.listen(8080, ()=> {
  console.log('listening to port 8080');
});

