import {Modal} from "react-bootstrap";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import {Station} from "../models/Station";

type StationDataModalProps = {
    showModal: boolean,
    handleClose: ()=> void,
    stationData: Station | undefined
}

export default function StationDataModal({showModal, handleClose, stationData}: StationDataModalProps) {

    if (!stationData) return <></>;
    console.log("got", stationData);

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>{stationData.name_fin} / {stationData.name_swe} / {stationData.name_eng}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{stationData.address_fin} / {stationData.address_swe}</div>
                    <div>10505 journeys started from this station</div>
                    <div>13565 journeys ended at this station</div>
                    <div>Link to map</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=> handleClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}