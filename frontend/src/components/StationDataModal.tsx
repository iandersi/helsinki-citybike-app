import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import LoadingSpinner from "./LoadingSpinner";
import {StationDetails} from "../data/StationDetails";

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
                <Modal show={showModal} onHide={handleClose} centered>
                    <div className="station-data-modal--loading-spinner"><LoadingSpinner/></div>
                </Modal>
            }
            {!showStationDataSpinner &&
                <Modal show={showModal} onHide={handleClose} centered>
                    <Modal.Header>
                        <Modal.Title>{stationData.station.name_fin} / {stationData.station.name_swe} / {stationData.station.name_eng}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="station-data-modal--modal-body-content-header">Address:</div>
                        <div>{stationData.station.address_fin} / {stationData.station.address_swe}</div>
                        <div className="station-data-modal--modal-body-content-header">Statistics:</div>
                        <div>{stationData.departureCount} journeys started from this station</div>
                        <div>{stationData.returnCount} journeys ended at this station</div>
                        <div className="station-data-modal--modal-body-content-header">Location:</div>
                        <div><a href={`https://www.google.com/maps/place/${stationData.station.coordinate_y},${stationData.station.coordinate_x}`} target={'_blank'}>Show on map</a></div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => handleClose()} variant="secondary">Close</Button>
                    </Modal.Footer>
                </Modal>}
        </>
    );
}