import React, {useEffect} from "react";
import useStation from "../hooks/useStation";
import useStationData from "../hooks/useStationData";
import {CircleMarker, MapContainer, Popup, TileLayer} from "react-leaflet";
import {LeafletEventHandlerFnMap} from "leaflet";
import StationPageOffcanvas from "./StationPageOffcanvas";

export default function StationsPage() {

    const {
        getAllStations,
        allStations,
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
        getAllStations();
    }, []);


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
                    <StationPageOffcanvas/>
                </MapContainer>
            </div>
        </div>
    );
}