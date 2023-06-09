import React, {Dispatch} from "react";
import bikeLogo from "../images/Helsinki_City_Bikes_logo.png";

type NavigationTabsProps = {
    setPageToShow: Dispatch<React.SetStateAction<{ journeys: boolean, stations: boolean }>>
}

export default function NavigationTabs({setPageToShow}: NavigationTabsProps) {

    function handleShowPage(page: string) {
        if (page === 'journeys') {
            setPageToShow({journeys: true, stations: false});
        }

        if (page === 'stations') {
            setPageToShow({journeys: false, stations: true});
        }
    }

    return (
        <div className="navigation--container">
            <img src={bikeLogo} alt="logo"/>
            <button className="navigation--tab" onClick={() => handleShowPage('journeys')}>Journeys</button>
            <button className="navigation--tab" onClick={() => handleShowPage('stations')}>Stations</button>
        </div>
    );
}