import React, {useEffect, useState} from "react";
import useJourney from "../hooks/useJourney";
import {Button} from "react-bootstrap";
import LoadingButton from "./LoadingButton";
import { v4 as uuidv4 } from 'uuid';

export default function JourneysPage() {

    const [minAndMaxId, setMinAndMaxId] = useState({
        min: 1,
        max: 20
    });
    const {journeys, getJourneys, showSpinner} = useJourney(minAndMaxId.min, minAndMaxId.max);

    useEffect(()=> {
        getJourneys(minAndMaxId.min, minAndMaxId.max)
    }, [minAndMaxId]);

    function previousPage(){
        setMinAndMaxId({...minAndMaxId, min: minAndMaxId.min - 20, max: minAndMaxId.max - 20});
    }

    function nextPage(){
        setMinAndMaxId({...minAndMaxId, min: minAndMaxId.min + 20, max: minAndMaxId.max + 20});
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
                <Button variant="outline-dark" onClick={()=> previousPage()}>Prev</Button>
                <Button variant="outline-dark" onClick={()=> nextPage()}>Next</Button>
            </div>
        </div>
    );
}