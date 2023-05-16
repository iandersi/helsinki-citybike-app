import {useState} from "react";
import axios from "axios";
import {StationsPage} from "../data/StationsPage";
import {Station} from "../data/Station";

export default function useStation() {

    function getStations(id: number) {
        if (showSpinner) return;
        setShowSpinner(true);
        axios.get<StationsPage>(`http://localhost:3000/stations`, {
            params: {
                id: id
            }
        })
            .then(response => {
                console.log(response.data);
                setStations(response.data);

            }).catch(err => {
            console.log(err);
        }).finally(() => {
            setShowSpinner(false);
        })
    }

    function getAllStations(){
        axios.get<Station[]>(`http://localhost:3000/stations/id`)
            .then(response => {
                setAllStations(response.data);
            }).catch(err => {
            console.log(err);
        }).finally(() => {
            setShowSpinner(false);
        })
    }

    const [showSpinner, setShowSpinner] = useState<boolean>();
    const [allStations, setAllStations] = useState<Station[]>();
    const [stations, setStations] = useState<StationsPage>({
        content: [],
        prev: false,
        next: true,
        prevPageId: 1,
        nextPageId: 20
    });

    return {stations, getStations, showSpinner, getAllStations, allStations};
}
