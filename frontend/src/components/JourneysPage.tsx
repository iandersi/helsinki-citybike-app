import React, {useEffect, useState} from "react";
import useJourney from "../hooks/useJourney";
import {Button} from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import { v4 as uuidv4 } from 'uuid';

export default function JourneysPage() {

    const [id, setId] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const {journeys, getJourneys, showSpinner} = useJourney();

    useEffect(()=> {
        if (id > 20) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
        getJourneys(id)
    }, [id]);

    function previousPage(){
        const journeysIdArray = journeys.map(journey => journey.id);
        const maxId = Math.max(...journeysIdArray);
        console.log(maxId);
        console.log(journeysIdArray.length);

    }

    function nextPage(){
        const journeysIdArray = journeys.map(journey => journey.id);
        const maxId = Math.max(...journeysIdArray);
        console.log(maxId);
        console.log(journeysIdArray.length);
        setId(maxId);
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
            {showSpinner && <LoadingSpinner/>}
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
                <Button variant="outline-dark" disabled={isButtonDisabled} onClick={()=> previousPage()}>Prev</Button>
                <Button variant="outline-dark" onClick={()=> nextPage()}>Next</Button>
            </div>
        </div>
    );
}