import express from "express";
const mariadb = require('mariadb');
import * as dotenv from 'dotenv';
import {Journey} from "./Journey";
import {Station} from "./Station";
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

async function journeyDatabaseQuery(idNumberMin: number, idNumberMax: number) {
  console.log(idNumberMin, idNumberMax);
  let conn;
  try {
    conn = await pool.getConnection();
    const journeyArray = await conn.query("SELECT * FROM journeys WHERE id BETWEEN ? AND ? ORDER BY id ASC", [idNumberMin, idNumberMax]) as Journey[];
    console.log(journeyArray);
    return journeyArray;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) await conn.end();
  }
}

async function stationDatabaseQuery(idNumberMin: number, idNumberMax: number) {
  console.log(idNumberMin, idNumberMax);
  let conn;
  try {
    conn = await pool.getConnection();
    const stationArray = await conn.query("SELECT * FROM stations WHERE station_id BETWEEN ? AND ? ORDER BY station_id ASC", [idNumberMin, idNumberMax]) as Station[];
    console.log(stationArray);
    return stationArray;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) await conn.end();
  }
}

app.get('/journeys', async (req, res)=> {
  if (!req.query.idNumberMin) return res.status(400).send([]);
  if (!req.query.idNumberMax) return res.status(400).send([]);
  const idNumberMin = req.query.idNumberMin.toString();
  const idNumberMax = req.query.idNumberMax.toString();
  const idNumberMinForQuery = parseInt(idNumberMin);
  const idNumberMaxForQuery = parseInt(idNumberMax);
  const journeys = await journeyDatabaseQuery(idNumberMinForQuery, idNumberMaxForQuery);
  res.send(journeys);
})

app.get('/stations', async (req, res) => {
  if (!req.query.idNumberMin) return res.status(400).send([]);
  if (!req.query.idNumberMax) return res.status(400).send([]);
  const idNumberMin = req.query.idNumberMin.toString();
  const idNumberMax = req.query.idNumberMax.toString();
  const idNumberMinForQuery = parseInt(idNumberMin);
  const idNumberMaxForQuery = parseInt(idNumberMax);
  const stations = await stationDatabaseQuery(idNumberMinForQuery, idNumberMaxForQuery);
  res.send(stations);
})

app.listen(8080, ()=> {
  console.log('listening to port 8080');
});

