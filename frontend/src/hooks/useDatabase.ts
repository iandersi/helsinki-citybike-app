import {useEffect, useState} from "react";
import axios from "axios";
import {Journey} from "../models/Journey";

export default function useDatabase() {

    useEffect(() => {
        getJourneys()
    }, []);

    function getJourneys() {
        axios.get<Journey[]>(`http://localhost:3000/journeys`)
            .then(response => {
                console.log(response.data);
                setJourneys(response.data);
            })
    }

    const [journeys, setJourneys] = useState<Journey[]>([]);

    return {journeys, getJourneys};
}
