import React, {useState} from "react";
import useDatabase from "../hooks/useDatabase";
import {Button} from "react-bootstrap";
import LoadingButton from "./LoadingButton";

export default function JourneysPage() {

    const {journeys, getJourneys, showSpinner} = useDatabase(1);


    return (
        <div className="journey-tab--container">
            <div className="journey-tab--header">
                <div>Departure Date</div>
                <div>Return Date</div>
                <div>Departure Station Id</div>
                <div>Departure Station Name</div>
                <div>Return Station Id</div>
                <div>Return Station Name</div>
                <div>Covered Distance (m)</div>
                <div>Duration (sec)</div>
            </div>
            {showSpinner && <LoadingButton/>}
            {!showSpinner && journeys.map(journey => (
                <div className="journey-tab--journey-list">
                    <div className="journey-tab--journey-data">{journey.departure_date_time}</div>
                    <div className="journey-tab--journey-data">{journey.return_date_time}</div>
                    <div className="journey-tab--journey-data">{journey.departure_station_id}</div>
                    <div className="journey-tab--journey-data">{journey.departure_station_name}</div>
                    <div className="journey-tab--journey-data">{journey.return_station_id}</div>
                    <div className="journey-tab--journey-data">{journey.return_station_name}</div>
                    <div className="journey-tab--journey-data">{journey.covered_distance_m}</div>
                    <div className="journey-tab--journey-data">{journey.duration_sec}</div>
                </div>
            ))}
            <div className="journey-tab--buttons">
                <Button variant="outline-dark">Prev</Button>
                <Button variant="outline-dark">Next</Button>
            </div>
        </div>
    );
}