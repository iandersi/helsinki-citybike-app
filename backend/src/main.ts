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

async function databaseQuery(pageNumber: number) {
  let conn;
  try {
    conn = await pool.getConnection();
    const journeyArray = await conn.query("SELECT * FROM journeys ORDER BY departure_date_time ASC LIMIT 3 OFFSET ?", [pageNumber]) as Journey[];
    console.log(journeyArray);
    return journeyArray;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) await conn.end();
  }
}

app.get('/journeys', async (req, res)=> {
  if (!req.query.page) return;
  const page = req.query.page.toString();
  if (!page) return;
  const pageNumber = parseInt(page);
  const departuresInMay = await databaseQuery(pageNumber);
  res.send(departuresInMay);
})

app.listen(8080, ()=> {
  console.log('listening to port 8080');
});

