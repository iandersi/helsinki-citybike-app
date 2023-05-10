import express from "express";
const mariadb = require('mariadb');
import * as dotenv from 'dotenv';
import {Journey} from "./Journey";
import {Station} from "./Station";
import {parse} from "dotenv";
import {StationDetails} from "./StationDetails";
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

async function getJourneysBetweenMinAndMaxId(idNumberMin: number, idNumberMax: number) {
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

async function getStationsBetweenMinAndMaxId(idNumberMin: number, idNumberMax: number) {
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

async function getStationById(stationId: number){
  console.log(stationId);
  let conn;
  try {
    conn = await pool.getConnection();
    const stationArray = await conn.query("SELECT * FROM stations WHERE station_id = ?", [stationId]) as Station[];
    console.log(stationArray);
    return stationArray[0];
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) await conn.end();
  }
}

async function getDeparturesAndReturnsCount(stationId: number) {
  let conn;
  try {
    conn = await pool.getConnection();
    const departures = await conn.query("SELECT COUNT(id) as departures_count FROM journeys WHERE departure_station_id = ?", [stationId]);
    const returns = await conn.query("SELECT COUNT(id) as returns_count FROM journeys WHERE return_station_id = ?", [stationId]);
    console.log("dep", departures, "ret", returns);
    const departureInt = Number(departures[0].departures_count);
    const returnsInt = Number(returns[0].returns_count)
    return [departureInt, returnsInt] as [number, number];
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
  const journeys = await getJourneysBetweenMinAndMaxId(idNumberMinForQuery, idNumberMaxForQuery);
  res.send(journeys);
})

app.get('/stations', async (req, res) => {
  if (!req.query.idNumberMin) return res.status(400).send([]);
  if (!req.query.idNumberMax) return res.status(400).send([]);
  const idNumberMin = req.query.idNumberMin.toString();
  const idNumberMax = req.query.idNumberMax.toString();
  const idNumberMinForQuery = parseInt(idNumberMin);
  const idNumberMaxForQuery = parseInt(idNumberMax);
  const stations = await getStationsBetweenMinAndMaxId(idNumberMinForQuery, idNumberMaxForQuery);
  res.send(stations);
})

app.get('/stations/data', async (req, res) => {
  if (!req.query.stationId) return res.status(400).send([]);
  const stationIdString = req.query.stationId.toString();
  const stationIdNumber = parseInt(stationIdString);
  const stationData = await getStationById(stationIdNumber);
  const departureAndReturnData = await getDeparturesAndReturnsCount(stationIdNumber);
  if (!departureAndReturnData) return res.status(400).send([]);
  res.send({station: stationData, departureCount: departureAndReturnData[0], returnCount: departureAndReturnData[1]} as StationDetails);
})

app.listen(8080, ()=> {
  console.log('listening to port 8080');
});

