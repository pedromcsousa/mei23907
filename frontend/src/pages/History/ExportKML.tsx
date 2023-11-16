import { Button } from "react-bootstrap";
import { IReading } from "../../models/Reading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import tokml from "geojson-to-kml";

type Props = {
    tag: string;
    history: Array<IReading>
}

export default function ExportKML(props: Props) {
    const downloadFile = (kml: any) => {
        const fileData = kml;
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "user-info.kml";
        link.href = url;
        link.click();
    }

    function download() {
        const geoJSON = {
            type: "FeatureCollection",
            features: props.history.map(h => ({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [h.latitude, h.longitude]
                },
                properties: {
                    tag: h.device.tag,
                    type: h.device.type,
                    battery: h.battery || 0,
                    altitude: h.altitude || 0,
                    timestamp: h.createdAt
                }
            }))
        }
        console.log(geoJSON)
        downloadFile(tokml(geoJSON))
    }

    return <Button variant="outline-primary" onClick={download} style={{ position: "absolute", top: "1rem", left: "9.5rem", zIndex: 99999 }}>
        <FontAwesomeIcon icon={faFileDownload} />
    </Button>
}