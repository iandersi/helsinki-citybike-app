import React, {useEffect, useState} from "react";
import {Accordion, Button, Form, Offcanvas} from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import useStation from "../hooks/useStation";
import useStationData from "../hooks/useStationData";
import {CircleMarker, MapContainer, Popup, TileLayer} from "react-leaflet";
import {LeafletEventHandlerFnMap} from "leaflet";

export default function StationsPage() {


    const [showOffcanvas, setShowOffcanvas] = useState(true);
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
    const {stationData, getStationData} = useStationData();

    const markerEventHandlers = {
        click(event) {
            const clickedStation = allStations?.find((station) => parseFloat(station.coordinate_y) === event.latlng.lat && parseFloat(station.coordinate_x) === event.latlng.lng);
            if (!clickedStation) return;
            getStationData(clickedStation.station_id);
        }
    } as LeafletEventHandlerFnMap;

    useEffect(() => {
        getStationsPage(1);
        getAllStations();
    }, []);

    function filterStations() {
        if (!stationId) return;
        getFilteredStation(stationId);
    }


    return (
        <div className="station-tab--container">
            <div className="map-page-container">
                <MapContainer center={[60.1699, 24.9384]} zoom={13}>
                    <TileLayer
                        attribution={`©<a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>`}
                        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {allStations?.map(station => (
                        <CircleMarker key={`circle-marker-station-${station.station_id}`}
                                      eventHandlers={markerEventHandlers}
                                      center={[parseFloat(station.coordinate_y), parseFloat(station.coordinate_x)]}>
                            <Popup>
                                <div className="bold">{station.name_eng}</div>
                                <div>{station.address_fin}</div>
                                {stationData?.station.station_id === station.station_id &&
                                    <>
                                        <div>Total departures: {stationData?.departureCount}</div>
                                        <div>Total returns: {stationData?.returnCount}</div>
                                    </>
                                }
                            </Popup>
                        </CircleMarker>
                    ))}

                    <Offcanvas show={showOffcanvas} backdrop={false}>
                        <Offcanvas.Header>
                            <Offcanvas.Title>Stations</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <div className="station-tab--form-select">
                                <div>
                                    <Form.Select value={stationId}
                                                 onChange={(e) => setStationId(parseInt(e.target.value))}
                                                 aria-label="Default select example">
                                        <option>Choose station</option>
                                        {allStations?.map(station => <option
                                            key={`station-option-${station.station_id}`}
                                            value={station.station_id}>{station.name_eng}</option>)}
                                    </Form.Select>
                                    <Button onClick={() => filterStations()}>Confirm</Button>
                                    <Button onClick={() => setFilteredStation(undefined)}>Clear</Button>
                                </div>
                            </div>

                            {showSpinner && <div className="station-tab--loading-spinner"><LoadingSpinner/></div>}

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
                                                <div className="accordion-body-text-bold">Station Id</div>
                                                {filteredStation.station_id}
                                            </div>
                                            <div>
                                                <div className="accordion-body-text-bold">Name</div>
                                                {filteredStation.name_eng}
                                            </div>
                                            <div>
                                                <div className="accordion-body-text-bold">Address</div>
                                                {filteredStation.address_fin}
                                            </div>
                                            <div>
                                                <div className="accordion-body-text-bold">City</div>
                                                {filteredStation.city_fin}
                                            </div>
                                            <div>
                                                <div className="accordion-body-text-bold">Operator</div>
                                                {filteredStation.operator}
                                            </div>
                                            <div>
                                                <div className="accordion-body-text-bold">Capacity</div>
                                                {filteredStation.capacity}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            }

                            {!showSpinner && !filteredStation && <div className="station-tab--buttons">
                                <Button variant="outline-dark" disabled={!stations.prev}
                                        onClick={() => getStationsPage(stations.prevPageId)}>Prev</Button>
                                <Button variant="outline-dark" disabled={!stations.next}
                                        onClick={() => getStationsPage(stations.nextPageId)}>Next</Button>
                            </div>}
                        </Offcanvas.Body>
                    </Offcanvas>
                </MapContainer>
            </div>
        </div>
    );
}