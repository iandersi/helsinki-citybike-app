import {useState} from "react";
import axios from "axios";
import {JourneysPage} from "../models/JourneysPage";

export default function useJourney() {

    function getJourneys(id: number) {
        if (showSpinner) return;
        setShowSpinner(true);
        axios.get<JourneysPage>(`http://localhost:3000/journeys`, {
            params: {
                id: id
            }
        })
            .then(response => {
                console.log(response.data);
                setJourneys(response.data);

            }).catch(err => {
            console.log(err);
        }).finally(() => {
            setShowSpinner(false);
        })
    }

    const [showSpinner, setShowSpinner] = useState<boolean>();
    const [journeys, setJourneys] = useState<JourneysPage>({content: [], prev: false, next: true, prevPageId: 1, nextPageId: 20});

    return {journeys, getJourneys, showSpinner};
}
