import React, {useEffect, useState} from "react";
import useJourney from "../hooks/useJourney";
import {Button} from "react-bootstrap";
import LoadingButton from "./LoadingButton";
import { v4 as uuidv4 } from 'uuid';

export default function StationsPage() {

    return (
        <div className="station-tab--container">
            <div className="station-tab--header">
                <div>Station Id</div>
                <div>Name (fi)</div>
                <div>Name (swe)</div>
                <div>Name (en)</div>
                <div>Address (fi)</div>
                <div>Address (swe)</div>
                <div>City (fi)</div>
                <div>City (swe)</div>
                <div>Operator</div>
                <div>Capacity</div>
                <div>Coordinate x</div>
                <div>Coordinate y</div>
            </div>
            {/*{showSpinner && <LoadingButton/>}*/}
            {/*{!showSpinner && journeys.map(journey => (*/}
            {/*    <div key={uuidv4()} className="station-tab--station-list">*/}
            {/*        <div className="station-tab--station-data">{journey.departure_date_time}</div>*/}
            {/*        <div className="station-tab--station-data">{journey.return_date_time}</div>*/}
            {/*        <div className="station-tab--station-data">{journey.departure_station_id}</div>*/}
            {/*        <div className="station-tab--station-data">{journey.departure_station_name}</div>*/}
            {/*        <div className="station-tab--station-data">{journey.return_station_id}</div>*/}
            {/*        <div className="station-tab--station-data">{journey.return_station_name}</div>*/}
            {/*        <div className="station-tab--station-data">{journey.covered_distance_m}</div>*/}
            {/*        <div className="station-tab--station-data">{journey.duration_sec}</div>*/}
            {/*    </div>*/}
            {/*))}*/}
            {/*<div className="station-tab--buttons">*/}
            {/*    <Button variant="outline-dark" disabled={isButtonDisabled} onClick={()=> previousPage()}>Prev</Button>*/}
            {/*    <Button variant="outline-dark" onClick={()=> nextPage()}>Next</Button>*/}
            {/*</div>*/}
        </div>
    );
}