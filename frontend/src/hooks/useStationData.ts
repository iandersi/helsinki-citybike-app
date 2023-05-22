import {useState} from "react";
import axios from "axios"
import {StationDetails} from "../data/StationDetails";

export default function useStationData() {

    function getStationData(stationId: number) {
        axios.get<StationDetails>(`http://localhost:3000/stations/data`, {
            params: {
                stationId: stationId
            }
        })
            .then(response => {
                console.log(response.data);
                setStationData(response.data);

            }).catch(err => {
            console.log(err);
        })
    }

    const [stationData, setStationData] = useState<StationDetails>();

    return {stationData, getStationData};
}
