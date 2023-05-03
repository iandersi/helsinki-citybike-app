import React from "react";
import useDatabase from "../hooks/useDatabase";

export default function JourneysPage(){
    const {journeys} = useDatabase();

    return (
        <div className="journey--container">
            {journeys.map(journey => (
                <div className="journey--wrapper">
                    <div className="journey--wrapper-data">{journey.departure_date_time}</div>
                    <div className="journey--wrapper-data">{journey.return_date_time}</div>
                    <div className="journey--wrapper-data">{journey.departure_station_id}</div>
                    <div className="journey--wrapper-data">{journey.departure_station_name}</div>
                    <div className="journey--wrapper-data">{journey.return_station_id}</div>
                    <div className="journey--wrapper-data">{journey.return_station_name}</div>
                    <div className="journey--wrapper-data">{journey.covered_distance_m}</div>
                    <div className="journey--wrapper-data">{journey.duration_sec}</div>
                </div>
            ))}
        </div>
    );
}