import express from "express";
const mariadb = require('mariadb');
import * as dotenv from 'dotenv';
import {StationDetails} from "./data/StationDetails";
import {getJourneysPage} from "./db/getJourneysPage";
import {getStationsPage} from "./db/getStationsPage";
import {getStationByStationId} from "./db/getStationById";
import {getDeparturesAndReturnsCount} from "./db/getDeparturesAndReturnsCount";
import {getAllStations} from "./db/getAllStations";
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

app.get('/station', async (req, res) => {
  if (!req.query.id) return res.status(400).send([]);
  const idString = req.query.id.toString();
  const idNumber = parseInt(idString);
  const station = await getStationByStationId(idNumber, pool);
  res.send(station);
})

app.get('/stations', async (req, res) => {
  if (!req.query.id) return res.status(400).send([]);
  const idString = req.query.id.toString();
  const idNumber = parseInt(idString);
  const stations = await getStationsPage(idNumber, pool);
  res.send(stations);
});

app.get('/stations/data', async (req, res) => {
  if (!req.query.stationId) return res.status(400).send([]);
  const stationIdString = req.query.stationId.toString();
  const stationIdNumber = parseInt(stationIdString);
  const stationData = await getStationByStationId(stationIdNumber, pool);
  const departureAndReturnData = await getDeparturesAndReturnsCount(stationIdNumber, pool);
  if (!departureAndReturnData) return res.status(400).send([{}]);
  res.send({station: stationData, departureCount: departureAndReturnData[0], returnCount: departureAndReturnData[1]} as StationDetails);
});

app.get('/stations/id', async (req, res) => {
  const stationsArray = await getAllStations(pool);
  res.send(stationsArray);
});

app.get('/journeys', async (req, res) => {
  if (!req.query.id) return res.status(400).send([]);
  const idString = req.query.id.toString();
  const departureStationIdString = req.query.departureStationId?.toString();
  const returnStationIdString = req.query.returnStationId?.toString();
  const idNumber = parseInt(idString);
  if (departureStationIdString && returnStationIdString) {
    const departureStationIdNumber = parseInt(departureStationIdString);
    const returnStationNumber = parseInt(returnStationIdString);
    const journeys = await getJourneysPage(idNumber, pool, departureStationIdNumber, returnStationNumber);
    res.send(journeys);
  } else {
    const journeys = await getJourneysPage(idNumber, pool);
    res.send(journeys);
  }
});


app.listen(8080, ()=> {
  console.log('listening to port 8080');
});

