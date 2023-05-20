import React, {useEffect, useState} from "react";
import {Button, Form, Table} from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import {v4 as uuidv4} from 'uuid';
import useStation from "../hooks/useStation";
import StationDataModal from "./StationDataModal";
import useStationData from "../hooks/useStationData";

export default function StationsPage() {

    const [showModal, setShowModal] = useState(false);
    const [stationId, setStationId] = useState<number>();
    const {
        stations,
        getStations,
        showSpinner,
        getAllStations,
        allStations,
        filteredStation,
        getFilteredStation,
        setFilteredStation
    } = useStation();
    const {stationData, getStationData, showStationDataSpinner} = useStationData();

    console.log(filteredStation);

    useEffect(() => {
        getStations(1);
        getAllStations();
    }, []);

    const handleCloseModal = () => setShowModal(false);

    function handleShowModal(stationId: number) {
        getStationData(stationId);
        setShowModal(true);
    }

    function filterStations() {
        if (!stationId) return;
        getFilteredStation(stationId);
    }


    return (
        <div className="station-tab--container">
            <div className="station-tab--form-select">
                <div>
                    <Form.Select value={stationId} onChange={(e) => setStationId(parseInt(e.target.value))}
                                 aria-label="Default select example">
                        <option>Choose station</option>
                        {allStations?.map(station => <option key={station.station_id}
                                                             value={station.station_id}>{station.name_eng}</option>)}
                    </Form.Select>
                    <Button onClick={() => filterStations()}>Confirm</Button>
                    <Button onClick={() => setFilteredStation(undefined)}>Clear</Button>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Station Id</th>
                    <th>Name (fi)</th>
                    <th>Name (swe)</th>
                    <th>Name (en)</th>
                    <th>Address (fi)</th>
                    <th>Address (swe)</th>
                    <th>City (fi)</th>
                    <th>City (swe)</th>
                    <th>Operator</th>
                    <th>Capacity</th>
                    <th>Location</th>
                </tr>
                </thead>
                <tbody>
                {!showSpinner && filteredStation &&
                    <tr onClick={() => handleShowModal(filteredStation?.station_id)}>
                        <td>{filteredStation.station_id}</td>
                        <td>{filteredStation.name_fin}</td>
                        <td>{filteredStation.name_swe}</td>
                        <td>{filteredStation.name_eng}</td>
                        <td>{filteredStation.address_fin}</td>
                        <td>{filteredStation.address_swe}</td>
                        <td>{filteredStation.city_fin}</td>
                        <td>{filteredStation.city_swe}</td>
                        <td>{filteredStation.operator}</td>
                        <td>{filteredStation.capacity}</td>
                        <td><a
                            href={`https://www.google.com/maps/place/${filteredStation.coordinate_y},${filteredStation.coordinate_x}`}
                            target={'_blank'}>Show on map</a></td>
                    </tr>
                }
                {!showSpinner && !filteredStation && stations.content.map(station => (
                    <tr onClick={() => handleShowModal(station.station_id)} key={uuidv4()}>
                        <td>{station.station_id}</td>
                        <td>{station.name_fin}</td>
                        <td>{station.name_swe}</td>
                        <td>{station.name_eng}</td>
                        <td>{station.address_fin}</td>
                        <td>{station.address_swe}</td>
                        <td>{station.city_fin}</td>
                        <td>{station.city_swe}</td>
                        <td>{station.operator}</td>
                        <td>{station.capacity}</td>
                        <td><a
                            href={`https://www.google.com/maps/place/${station.coordinate_y},${station.coordinate_x}`}
                            target={'_blank'}>Show on map</a></td>
                    </tr>
                ))}
                </tbody>
            </Table>
            {showSpinner && <div className="station-tab--loading-spinner"><LoadingSpinner/></div>}
            {!showSpinner && !filteredStation && <div className="station-tab--buttons">
                <Button variant="outline-dark" disabled={!stations.prev}
                        onClick={() => getStations(stations.prevPageId)}>Prev</Button>
                <Button variant="outline-dark" disabled={!stations.next}
                        onClick={() => getStations(stations.nextPageId)}>Next</Button>
            </div>}
            <StationDataModal showModal={showModal} handleClose={handleCloseModal} stationData={stationData}
                              showStationDataSpinner={showStationDataSpinner}/>
        </div>
    );
}