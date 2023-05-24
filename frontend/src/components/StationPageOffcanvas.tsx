import React, {Dispatch, useEffect, useState} from "react";
import {Accordion, Button, Form, Offcanvas} from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import useStation from "../hooks/useStation";
import {useMap} from "react-leaflet";
import {Station} from "../data/Station";
import {LatLng} from "leaflet";

type StationPageOffcanvasType = {
    showOffcanvas: boolean,
    setShowOffcanvas: Dispatch<React.SetStateAction<boolean>>
}

export default function StationPageOffcanvas({showOffcanvas, setShowOffcanvas}: StationPageOffcanvasType) {

    const [stationId, setStationId] = useState<number>();
    const {
        stations,
        getStationsPage,
        showSpinner,
        getAllStations,
        allStations,
        filteredStation,
        getFilteredStation,
        setFilteredStation
    } = useStation();

    useEffect(() => {
        getStationsPage(1);
        getAllStations();
    }, []);

    const map = useMap();

    function stationClick(station: Station) {
        const latlng = new LatLng(parseFloat(station.coordinate_y), parseFloat(station.coordinate_x));
        setShowOffcanvas(false);
        closeAllPopups();
        map.setView(latlng, 20);
    }

    function closeAllPopups(){
        map.eachLayer(layer => {
            layer.closePopup();
        });
    }

    function filterStations() {
        if (!stationId) return;
        getFilteredStation(stationId);
    }

    return (
        <>
            <Offcanvas show={showOffcanvas} backdrop={false}>
                <Offcanvas.Header>
                    <Offcanvas.Title><h3>Stations</h3></Offcanvas.Title>
                    <div onClick={() => setShowOffcanvas(false)} className="offcanvas--close-button">Close</div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="offcanvas--form-select">
                        <div>
                            <Form.Select value={stationId}
                                         onChange={(e) => setStationId(parseInt(e.target.value))}
                                         aria-label="Default select example">
                                <option>Choose station</option>
                                {allStations?.map(station => <option
                                    key={`station-option-${station.station_id}`}
                                    value={station.station_id}>{station.name_eng}</option>)}
                            </Form.Select>
                            <Button onClick={() => filterStations()} variant="outline-dark">Confirm</Button>
                            <Button onClick={() => setFilteredStation(undefined)} variant="outline-dark">Clear</Button>
                        </div>
                    </div>

                    {showSpinner && <div className="offcanvas--loading-spinner"><LoadingSpinner/></div>}

                    {!showSpinner && !filteredStation && stations.content.map((station, index) => (
                        <Accordion key={`station-${station.station_id}`}>
                            <Accordion.Item eventKey={index.toString()}>
                                <Accordion.Header>{station.name_eng}</Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        <div className="bold">Station Id</div>
                                        {station.station_id}
                                    </div>
                                    <div>
                                        <div className="bold">Name</div>
                                        {station.name_eng}
                                    </div>
                                    <div>
                                        <div className="bold">Address</div>
                                        {station.address_fin}
                                    </div>
                                    <div>
                                        <div className="bold">City</div>
                                        {station.city_fin}
                                    </div>
                                    <div>
                                        <div className="bold">Operator</div>
                                        {station.operator}
                                    </div>
                                    <div>
                                        <div className="bold">Capacity</div>
                                        {station.capacity}
                                    </div>
                                    <div className="offcanvas--accordion-button">
                                        <Button onClick={() => stationClick(station)} variant="outline-dark">Show on
                                            map</Button>
                                    </div>

                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    ))}

                    {!showSpinner && filteredStation &&
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>{filteredStation.name_eng}</Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        <div className="bold">Station Id</div>
                                        {filteredStation.station_id}
                                    </div>
                                    <div>
                                        <div className="bold">Name</div>
                                        {filteredStation.name_eng}
                                    </div>
                                    <div>
                                        <div className="bold">Address</div>
                                        {filteredStation.address_fin}
                                    </div>
                                    <div>
                                        <div className="bold">City</div>
                                        {filteredStation.city_fin}
                                    </div>
                                    <div>
                                        <div className="bold">Operator</div>
                                        {filteredStation.operator}
                                    </div>
                                    <div>
                                        <div className="bold">Capacity</div>
                                        {filteredStation.capacity}
                                    </div>
                                    <div className="offcanvas--accordion-button">
                                        <Button onClick={() => stationClick(filteredStation)} variant="outline-dark">Show
                                            on map</Button>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    }

                    {!showSpinner && !filteredStation && <div className="offcanvas--buttons">
                        <Button variant="outline-dark" disabled={!stations.prev}
                                onClick={() => getStationsPage(stations.prevPageId)}>Prev</Button>
                        <Button variant="outline-dark" disabled={!stations.next}
                                onClick={() => getStationsPage(stations.nextPageId)}>Next</Button>
                    </div>}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}