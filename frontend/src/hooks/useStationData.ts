import {useState} from "react";
import axios from "axios";
import {Station} from "../models/Station";

export default function useStationData() {

    function getStationData(stationId: number) {
        if (showSpinner) return;
        setShowSpinner(true);
        axios.get<Station>(`http://localhost:3000/stations/data`, {
            params: {
                stationId: stationId
            }
        })
            .then(response => {
                console.log(response.data);
                setStationData(response.data);

            }).catch(err => {
            console.log(err);
        }).finally(()=>{
            setShowSpinner(false);
        })
    }

    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [stationData, setStationData] = useState<Station>();

    return {stationData, getStationData, showSpinner};
}
