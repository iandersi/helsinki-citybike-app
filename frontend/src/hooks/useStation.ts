import {useState} from "react";
import axios from "axios";
import {Station} from "../models/Station";

export default function useStation() {

    function getStations(idNumberMin: number, idNumberMax: number) {
        if (showSpinner) return;
        setShowSpinner(true);
        axios.get<Station[]>(`http://localhost:3000/stations`, {
            params: {
                idNumberMin: idNumberMin,
                idNumberMax: idNumberMax
            }
        })
            .then(response => {
                console.log(response.data);
                setStations(response.data);

            }).catch(err => {
            console.log(err);
        }).finally(()=>{
            setShowSpinner(false);
        })
    }

    const [showSpinner, setShowSpinner] = useState<boolean>();
    const [stations, setStations] = useState<Station[]>([]);

    return {stations, getStations, showSpinner};
}
