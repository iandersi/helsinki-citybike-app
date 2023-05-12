import {useState} from "react";
import axios from "axios";
import {Journey} from "../models/Journey";
import {Page} from "../models/Page";

export default function useJourney() {

    function getJourneys(id: number, direction: string) {
        if (showSpinner) return;
        setShowSpinner(true);
        axios.get<Journey[]>(`http://localhost:3000/journeys`, {
            params: {
                id: id,
                direction: direction
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

    function getJourneysTest(idMin: number, idMax: number) {
        if (showSpinner) return;
        setShowSpinner(true);
        axios.get<Page>(`http://localhost:3000/test`, {
            params: {
                idMin: idMin,
                idMax: idMax
            }
        })
            .then(response => {
                console.log(response.data);
                setJourneysTest(response.data);

            }).catch(err => {
            console.log(err);
        }).finally(() => {
            setShowSpinner(false);
        })
    }

    const [showSpinner, setShowSpinner] = useState<boolean>();
    const [journeys, setJourneys] = useState<Journey[]>([]);
    const [journeysTest, setJourneysTest] = useState<Page>({content: [], prev: false, next: true});

    return {journeys, getJourneys, showSpinner, journeysTest, getJourneysTest};
}
