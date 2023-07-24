import { useQuery } from "@tanstack/react-query"
import { Popup, Marker, MapContainer, TileLayer, Tooltip } from "react-leaflet"
import { IDevice } from "../../models/Device"
import { getAllDevices } from "../../services/Device"
import { INewReadingSocket, SocketEvents, socket } from "../../components/socket"
import { useEffect, useRef, useState } from "react"

interface IMapProps {
    center: [number, number]
}

export default function Map(props: IMapProps) {
    const { data: devices, isError, refetch } = useQuery<Array<IDevice>>({ queryKey: ['devices'], queryFn: getAllDevices })

    const mapRef = useRef<L.Map>(null);

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onReadingEvent(data: INewReadingSocket) {
            refetch()
            if (mapRef.current)
                mapRef.current.setView([data.location.longitude, data.location.latitude])
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on(SocketEvents.reading, onReadingEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off(SocketEvents.reading, onReadingEvent);
        };
    }, []);

    useEffect(() => {
        if (mapRef.current)
            mapRef.current.setView(props.center)
    }, [props.center]);

    if (!devices || isError)
        return <></>

    return <MapContainer
        ref={mapRef}
        center={props.center}
        zoom={13}
        style={{ width: "100%", height: "100%" }}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
            devices.map(d => {
                if (d.lastLocation)
                    return <Marker key={"marker_device_" + d._id} position={[d.lastLocation?.longitude, d.lastLocation?.latitude]}>
                        <Popup>
                            <i><small>{d._id}</small></i>
                            <br />
                            <small>Last communication: {d.updatedAt.toString()}</small>
                        </Popup>
                        <Tooltip permanent>
                            <b>{d.type}</b>
                        </Tooltip>
                    </Marker>
                return <></>
            })
        }
    </MapContainer>
}