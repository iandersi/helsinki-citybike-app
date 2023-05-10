import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import LoadingSpinner from "./LoadingSpinner";
import {StationDetails} from "../models/StationDetails";

type StationDataModalProps = {
    showModal: boolean,
    handleClose: () => void,
    stationData: StationDetails | undefined,
    showStationDataSpinner: boolean
}

export default function StationDataModal({showModal, handleClose, stationData, showStationDataSpinner}: StationDataModalProps) {

    if (!stationData) return <></>;

    return (
        <>
            {showStationDataSpinner &&
                <Modal show={showModal} onHide={handleClose}>
                    <LoadingSpinner/>
                </Modal>
            }
            {!showStationDataSpinner &&
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>{stationData.station.name_fin} / {stationData.station.name_swe} / {stationData.station.name_eng}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>{stationData.station.address_fin} / {stationData.station.address_swe}</div>
                        <div>10505 journeys started from this station</div>
                        <div>13565 journeys ended at this station</div>
                        <div>Link to map</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => handleClose()}>Close</Button>
                    </Modal.Footer>
                </Modal>}
        </>
    );
}