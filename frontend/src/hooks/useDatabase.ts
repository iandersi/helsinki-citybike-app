import {useEffect, useState} from "react";
import axios from "axios";
import {Journey} from "../models/Journey";

export default function useDatabase(page: number) {

    useEffect(() => {
        getJourneys(page)
    }, []);

    function getJourneys(page: number) {
        if (showSpinner) return;
        setShowSpinner(true);
        axios.get<Journey[]>(`http://localhost:3000/journeys`, {
            params: {
                page: page
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
