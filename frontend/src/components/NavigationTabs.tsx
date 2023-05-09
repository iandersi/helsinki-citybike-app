import React, {Dispatch} from "react";

type NavigationTabsProps = {
    setPageToShow: Dispatch<React.SetStateAction<{journeys: boolean, stations: boolean}>>
}

export default function NavigationTabs({setPageToShow}: NavigationTabsProps){

    function showPage(page: string){
        if (page === 'journeys') {
            setPageToShow({journeys: true, stations: false});
        }

        if (page === 'stations') {
            setPageToShow({journeys: false, stations: true});
        }
    }

    return (
        <div className="navigation--container">
            <div className="navigation--tab" onClick={()=>showPage('journeys')}>Journeys</div>
            <div className="navigation--tab" onClick={()=> showPage('stations')}>Stations</div>
            <div className="navigation--tab">Map</div>
        </div>
    );
}