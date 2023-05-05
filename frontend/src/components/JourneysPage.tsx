import React, {useState} from "react";
import useDatabase from "../hooks/useDatabase";
import {Button} from "react-bootstrap";
import LoadingButton from "./LoadingButton";
import { v4 as uuidv4 } from 'uuid';

export default function JourneysPage() {

    const [idNumberMin, setIdNumberMin] = useState<number>(1);
    const [currentIdNumber, setCurrentIdNumber] = useState<number>(20);
    const [idNumberMax, setIdNumberMax] = useState<number>(20);
    const {journeys, getJourneys, showSpinner} = useDatabase(currentIdNumber, idNumberMin, idNumberMax);
    console.log(currentIdNumber);

    function parameterForUseDatabase(prev?: boolean, next?: boolean){
        if (prev) {
            console.log('click prev');
        }
        if (next) {
            console.log('click next');
        }
    }




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
                <div key={uuidv4()} className="journey-tab--journey-list">
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
                <Button variant="outline-dark" onClick={()=> console.log("prev")}>Prev</Button>
                <Button variant="outline-dark" onClick={()=> parameterForUseDatabase(false, true)}>Next</Button>
            </div>
        </div>
    );
}