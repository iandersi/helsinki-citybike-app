import React from 'react';
import './css/App.css';
import NavigationTabs from "./components/NavigationTabs";
import JourneysPage from "./components/JourneysPage";

function App() {

    return (
        <div className="App">
            <NavigationTabs/>
            <JourneysPage/>
        </div>
    )
}

export default App;
