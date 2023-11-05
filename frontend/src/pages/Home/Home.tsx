import { useQuery } from "@tanstack/react-query"
import { getAllDevices } from "../../services/Device"
import { IDevice } from "../../models/Device"
import Map from "./Map"
import { useEffect, useState } from "react"
import { SocketEvents, socket } from "../../components/socket"
import Status from "./Status"

export function isOnline(updatedAt: Date | string) {
    return new Date(updatedAt) >= new Date(new Date().setSeconds(new Date().getSeconds() - 30));
}

/*function secondsAgo(date: Date | string) {
    return new Date(date).getMinutes() - new Date().getMinutes()
}*/

export interface IDeviceExt extends IDevice {
    online: boolean;
}

export default function Home() {
    const { data: devices, isError, refetch } = useQuery<Array<IDevice>>({ queryKey: ['devices'], queryFn: getAllDevices })

    const [center, setcenter] = useState<[number, number]>([41.53678836934385, -8.627784648005294])

    const [devicesState, setDevicesState] = useState<Array<IDeviceExt>>()

    useEffect(() => {
        setDevicesState(devices?.map(d => ({
            ...d,
            online: isOnline(d.updatedAt)
        })));
    }, [devices])

    useEffect(() => {
        function onReadingEvent() {
            refetch()
        }

        socket.on(SocketEvents.reading, onReadingEvent);

        return () => {
            socket.off(SocketEvents.reading, onReadingEvent);
        };
    }, []);

    if (!devicesState || isError)
        return <>ERROR</>
    else
        return <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
            <Status devices={devicesState} setCenter={setcenter} />
            <Map center={center} />
        </div>
}