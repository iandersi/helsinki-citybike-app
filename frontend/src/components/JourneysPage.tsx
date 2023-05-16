import React, {useEffect} from "react";
import useJourney from "../hooks/useJourney";
import {Button, Table} from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import {v4 as uuidv4} from 'uuid';
import {format} from 'date-fns'

export default function JourneysPage() {

    const {journeys, getJourneys, showSpinner} = useJourney();

    useEffect(() => {
        getJourneys(1);
    }, []);

    return (
        <div className="journey-tab--container">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Departure Date</th>
                    <th>Return Date</th>
                    <th>Departure Station Id</th>
                    <th>Departure Station Name</th>
                    <th>Return Station Id</th>
                    <th>Return Station Name</th>
                    <th>Covered Distance (km)</th>
                    <th>Duration (min)</th>
                </tr>
                </thead>
                <tbody>
                {!showSpinner && journeys.content.map(journey => (
                    <tr key={uuidv4()}>
                        <td>{format(new Date(journey.departure_date_time), 'dd.MM.yyyy')}</td>
                        <td>{format(new Date(journey.return_date_time), 'dd.MM.yyyy')}</td>
                        <td>{journey.departure_station_id}</td>
                        <td>{journey.departure_station_name}</td>
                        <td>{journey.return_station_id}</td>
                        <td>{journey.return_station_name}</td>
                        <td>{(journey.covered_distance_m / 1000).toFixed(1)}</td>
                        <td>{(journey.duration_sec / 60).toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {showSpinner && <LoadingSpinner/>}
            <div className="journey-tab--buttons">
                <Button variant="outline-dark" disabled={!journeys.prev}
                        onClick={() => getJourneys(journeys.prevPageId)}>Prev</Button>
                <Button variant="outline-dark" disabled={!journeys.next}
                        onClick={() => getJourneys(journeys.nextPageId)}>Next</Button>
            </div>
        </div>
    );
}