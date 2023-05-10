import {Modal} from "react-bootstrap";
import {useState} from "react";
import Button from "react-bootstrap/Button";

type StationDataModalProps = {
    showModal: boolean,
    handleClose: ()=> void
}

export default function StationDataModal({showModal, handleClose}: StationDataModalProps) {

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Station Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Station Address: Teststreet 1 A1, 00500 Helsinki, Finland</div>
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