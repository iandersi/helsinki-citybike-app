import React, {useEffect} from 'react';
import './css/App.css';
import axios from "axios";

function App() {

    useEffect(() => {
        testConn();
    }, [])

    function testConn() {
        axios.get('http://localhost:3000/may')
            .then(res => {
                console.log(res)
            }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="App">
            <div>Hello World</div>
        </div>
    )
}

export default App;
