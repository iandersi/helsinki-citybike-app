import React, {useEffect, useState} from "react";
import useJourney from "../hooks/useJourney";
import {Button} from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";
import { v4 as uuidv4 } from 'uuid';
import useStation from "../hooks/useStation";
import StationDataModal from "./StationDataModal";
import useStationData from "../hooks/useStationData";

export default function StationsPage() {

    const [showModal, setShowModal] = useState(false);
    const [minAndMaxId, setMinAndMaxId] = useState({
        min: 1,
        max: 20
    });
    const {stations, getStations, showSpinner} = useStation();
    const {stationData, getStationData, showStationDataSpinner} = useStationData();
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    useEffect(()=> {
        if (minAndMaxId.min > 1 && minAndMaxId.max > 19) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
        getStations(minAndMaxId.min, minAndMaxId.max)
    }, [minAndMaxId]);

    const handleCloseModal = () => setShowModal(false);

    function handleShowModal(stationId: number){
        getStationData(stationId);
        setShowModal(true);
    }

    function previousPage(){
        setMinAndMaxId({...minAndMaxId, min: minAndMaxId.min - 20, max: minAndMaxId.max - 20});
    }

    function nextPage(){
        setMinAndMaxId({...minAndMaxId, min: minAndMaxId.min + 20, max: minAndMaxId.max + 20});
    }

    return (
        <div className="station-tab--container">
            <div className="station-tab--header">
                <div>Station Id</div>
                <div>Name (fi)</div>
                <div>Name (swe)</div>
                <div>Name (en)</div>
                <div>Address (fi)</div>
                <div>Address (swe)</div>
                <div>City (fi)</div>
                <div>City (swe)</div>
                <div>Operator</div>
                <div>Capacity</div>
                <div>Coordinate x</div>
                <div>Coordinate y</div>
            </div>
            {showSpinner && <LoadingSpinner/>}
            {!showSpinner && stations.map(station => (
                <div onClick={()=>handleShowModal(station.station_id)} key={uuidv4()} className="station-tab--station-list">
                    <div className="station-tab--station-data">{station.station_id}</div>
                    <div className="station-tab--station-data">{station.name_fin}</div>
                    <div className="station-tab--station-data">{station.name_swe}</div>
                    <div className="station-tab--station-data">{station.name_eng}</div>
                    <div className="station-tab--station-data">{station.address_fin}</div>
                    <div className="station-tab--station-data">{station.address_swe}</div>
                    <div className="station-tab--station-data">{station.city_fin}</div>
                    <div className="station-tab--station-data">{station.city_swe}</div>
                    <div className="station-tab--station-data">{station.operator}</div>
                    <div className="station-tab--station-data">{station.capacity}</div>
                    <div className="station-tab--station-data">{station.coordinate_x}</div>
                    <div className="station-tab--station-data">{station.coordinate_y}</div>
                </div>
            ))}
            <div className="station-tab--buttons">
                <Button variant="outline-dark" disabled={isButtonDisabled} onClick={()=> previousPage()}>Prev</Button>
                <Button variant="outline-dark" onClick={()=> nextPage()}>Next</Button>
            </div>
            <StationDataModal showModal={showModal} handleClose={handleCloseModal} stationData={stationData} showStationDataSpinner={showStationDataSpinner}/>
        </div>
    );
}