import {useState} from "react";
import axios from "axios";
import {Journey} from "../models/Journey";

export default function useJourney() {

    function getJourneys(id: number) {
        if (showSpinner) return;
        setShowSpinner(true);
        axios.get<Journey[]>(`http://localhost:3000/journeys`, {
            params: {
                id: id
            }
        })
            .then(response => {
                console.log(response.data);
                setJourneys(response.data);

            }).catch(err => {
                console.log(err);
        }).finally(()=>{
            setShowSpinner(false);
        })
    }

    const [showSpinner, setShowSpinner] = useState<boolean>();
    const [journeys, setJourneys] = useState<Journey[]>([]);

    return {journeys, getJourneys, showSpinner};
}
