import React, {useEffect, useState} from "react";
import useJourney from "../hooks/useJourney";
import {Alert, Button, Form, Table} from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import {v4 as uuidv4} from 'uuid';
import {format} from 'date-fns'
import useStation from "../hooks/useStation";

export default function JourneysPage() {

    const {journeys, getJourneys, showSpinner, errorMessage} = useJourney();
    const [showAlertBox, setShowAlertBox] = useState(false);
    const [departureStationId, setDepartureStationId] = useState<number>();
    const [returnStationId, setReturnStationId] = useState<number>();
    const {allStations, getAllStations} = useStation();

    useEffect(() => {
        getJourneys(1);
        getAllStations();
    }, []);


    function getFilteredJourneys(id: number, departureStationId?: number, returnStationId?: number) {
        if (!departureStationId || !returnStationId) {
            setShowAlertBox(true);
            return;
        } else {
            setShowAlertBox(false);
            getJourneys(id, departureStationId, returnStationId);
        }
    }

    function clearFilteredJourneys() {
        if (!departureStationId || !returnStationId) {
            setShowAlertBox(false);
            return;
        }
        if (departureStationId && returnStationId) getJourneys(1);
        setDepartureStationId(0);
        setReturnStationId(0);
    }


    return (
        <div className="journey-tab--container">
            <div className="journey-tab--form-select">

                <div>
                    <Form.Select value={departureStationId}
                                 onChange={(e) => setDepartureStationId(parseInt(e.target.value))}
                                 aria-label="Default select example">
                        <option>Choose departure station</option>
                        {allStations?.map(station => <option key={station.station_id}
                                                             value={station.station_id}>{station.name_eng}</option>)}
                    </Form.Select>
                </div>

                <div>
                    <Form.Select value={returnStationId}
                                 onChange={(e) => setReturnStationId(parseInt(e.target.value))}
                                 aria-label="Default select example">
                        <option>Choose return station</option>
                        {allStations?.map(station => <option key={station.station_id}
                                                             value={station.station_id}>{station.name_eng}</option>)}
                    </Form.Select></div>

                <Button onClick={() => getFilteredJourneys(1, departureStationId, returnStationId)}
                        variant="outline-dark">Confirm</Button>
                <Button onClick={() => clearFilteredJourneys()} variant="outline-dark">Clear</Button>
            </div>
            {showAlertBox && <Alert variant="danger">Please select departure and return station!</Alert>}
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
            {showSpinner && <div className="journey-tab--loading-spinner"><LoadingSpinner/></div>}
            {errorMessage && <div className="journey-tab--no-journeys-found">{errorMessage}</div>}
            <div className="journey-tab--buttons">
                <Button variant="outline-dark" disabled={!journeys.prev}
                        onClick={() => getJourneys(journeys.prevPageId, departureStationId, returnStationId)}>Prev</Button>
                <Button variant="outline-dark" disabled={!journeys.next}
                        onClick={() => getJourneys(journeys.nextPageId, departureStationId, returnStationId)}>Next</Button>
            </div>
        </div>
    );
}