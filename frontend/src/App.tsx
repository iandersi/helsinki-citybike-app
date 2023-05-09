import React, {useState} from 'react';
import './css/App.css';
import NavigationTabs from "./components/NavigationTabs";
import JourneysPage from "./components/JourneysPage";
import StationsPage from "./components/StationsPage";

function App() {

    const [pageToShow, setPageToShow] = useState({
        journeys: true,
        stations: false
    });

    return (
        <div className="App">
            <NavigationTabs setPageToShow={setPageToShow}/>
            {pageToShow.journeys && <JourneysPage/>}
            {pageToShow.stations && <StationsPage/>}
        </div>
    )
}

export default App;
