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
                        <div>{stationData.departureCount} journeys started from this station</div>
                        <div>{stationData.returnCount} journeys ended at this station</div>
                        <div><a href={`https://www.google.com/maps/place/${stationData.station.coordinate_y},${stationData.station.coordinate_x}`} target={'_blank'}>Show on map</a></div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => handleClose()}>Close</Button>
                    </Modal.Footer>
                </Modal>}
        </>
    );
}