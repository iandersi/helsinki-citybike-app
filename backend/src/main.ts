import express from "express";
const mariadb = require('mariadb');
import * as dotenv from 'dotenv';
import {Journey} from "./Journey";
import {Station} from "./Station";
import {StationDetails} from "./StationDetails";
import {Page} from "./Page";
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

async function getPage(idPrev: number, idNext: number){
  let conn;
  try {
    conn = await pool.getConnection();
    const journeysPrev = await conn.query("SELECT * FROM journeys WHERE id < ? ORDER BY id ASC LIMIT 21", [idPrev]) as Journey[];
    const journeysNext = await conn.query("SELECT * FROM journeys WHERE id > ? ORDER BY id ASC LIMIT 21", [idNext]) as Journey[];
    const isPrevPage = !!journeysPrev[20];
    const isNextPage = !!journeysNext[20];
    const journeys = journeysNext.slice(0, 20);
    console.log("prev", isPrevPage, "next", isNextPage);
    return {content: journeys, prev: isPrevPage, next: isNextPage} as Page;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) await conn.end();
  }
}

async function getJourneysById(id: number, direction: string){
  let conn;
  try {
    conn = await pool.getConnection();
    if (direction === 'default' || direction === 'next') {
      return await conn.query("SELECT * FROM journeys WHERE id > ? ORDER BY id ASC LIMIT 20", [id]) as Journey[];
    }

    if (direction === 'prev') {
      return await conn.query("SELECT * FROM journeys WHERE id < ? ORDER BY id ASC LIMIT 20", [id]) as Journey[];
    }

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
  if (!req.query.id) return res.status(400).send([]);
  if (!req.query.direction) return res.status(400).send([]);
  const idString = req.query.id.toString();
  const direction = req.query.direction.toString();
  const idNumber = parseInt(idString);
  const journeys = await getJourneysById(idNumber, direction);
  res.send(journeys);
});


app.get('/stations', async (req, res) => {
  if (!req.query.idNumberMin) return res.status(400).send([]);
  if (!req.query.idNumberMax) return res.status(400).send([]);
  const idNumberMin = req.query.idNumberMin.toString();
  const idNumberMax = req.query.idNumberMax.toString();
  const idNumberMinForQuery = parseInt(idNumberMin);
  const idNumberMaxForQuery = parseInt(idNumberMax);
  const stations = await getStationsBetweenMinAndMaxId(idNumberMinForQuery, idNumberMaxForQuery);
  res.send(stations);
});

app.get('/stations/data', async (req, res) => {
  if (!req.query.stationId) return res.status(400).send([]);
  const stationIdString = req.query.stationId.toString();
  const stationIdNumber = parseInt(stationIdString);
  const stationData = await getStationById(stationIdNumber);
  const departureAndReturnData = await getDeparturesAndReturnsCount(stationIdNumber);
  if (!departureAndReturnData) return res.status(400).send([]);
  res.send({station: stationData, departureCount: departureAndReturnData[0], returnCount: departureAndReturnData[1]} as StationDetails);
});

app.get('/test', async (req, res) => {
  if (!req.query.idMax) return res.status(400).send([]);
  if (!req.query.idMin) return res.status(400).send([]);
  const idMaxString = req.query.idMax.toString();
  const idMinString = req.query.idMin.toString();
  const idMaxNumber = parseInt(idMaxString);
  const idMinNumber = parseInt(idMinString);
  const test = await getPage(idMaxNumber, idMinNumber);
  res.send(test);
});


app.listen(8080, ()=> {
  console.log('listening to port 8080');
});

