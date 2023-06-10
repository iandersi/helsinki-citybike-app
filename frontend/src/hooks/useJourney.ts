import {useState} from "react";
import axios from "axios";
import {JourneysPage} from "../data/JourneysPage";

export default function useJourney() {

    function getJourneys(id?: number, departureStationId?: number, returnStationId?: number) {
        if (showSpinner) return;
        setShowSpinner(true);
        axios.get<JourneysPage>(`http://localhost:3000/journeys`, {
            params: {
                id: id,
                departureStationId: departureStationId,
                returnStationId: returnStationId
            }
        }).then(response => {
            console.log(response.data);
            if (response.data.content.length === 0) setErrorMessage("No journeys found.");
            if (response.data.content.length > 0) setErrorMessage("");
            setJourneys(response.data);

        }).catch(err => {
            console.log("Error", err);
        }).finally(() => {
            setShowSpinner(false);
        })
    }

    const [showSpinner, setShowSpinner] = useState<boolean>();
    const [errorMessage, setErrorMessage] = useState("");
    const [journeys, setJourneys] = useState<JourneysPage>({
        content: [],
        prev: false,
        next: true,
        prevPageId: 1,
        nextPageId: 20
    });
    return {journeys, getJourneys, showSpinner, errorMessage};
}
