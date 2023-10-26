import { useQuery } from "@tanstack/react-query"
import { getAllDevices } from "../../services/Device"
import { IDevice } from "../../models/Device"
import { Col, ListGroup, Row } from "react-bootstrap"
import Map from "./Map"
import { useState } from "react"
import { filter } from 'lodash';

export function isOnline(updatedAt: Date | string) {
    return new Date(updatedAt) >= new Date(new Date().setSeconds(new Date().getSeconds() - 30));
}

/*function secondsAgo(date: Date | string) {
    return new Date(date).getMinutes() - new Date().getMinutes()
}*/

export default function Home() {
    const { data: devices, isError } = useQuery<Array<IDevice>>({ queryKey: ['devices'], queryFn: getAllDevices })

    const [center, setcenter] = useState<[number, number]>([0, 0])

    if (!devices || isError)
        return <>ERROR</>
    else
        return <>
            <Row style={{ height: "100vh" }}>
                <Col md={2} style={{ paddingTop: "1rem" }}>
                    <h4 style={{ color: "green" }}>Online</h4>
                    <ListGroup>
                        {
                            filter(devices, (d: IDevice) => isOnline(new Date(d.updatedAt))).map((d: IDevice) => <ListGroup.Item
                                className="hover"
                                onClick={() => { if (d.lastLocation) setcenter([d.lastLocation?.longitude, d.lastLocation?.latitude]) }}
                                key={"device_" + d._id}>
                                {d.tag}
                            </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                    <h5 style={{ color: "gray" }}>Offline</h5>
                    <ListGroup>
                        {
                            filter(devices, (d: IDevice) => !isOnline(d.updatedAt)).map((d: IDevice) => <ListGroup.Item
                                className="hover"
                                onClick={() => { if (d.lastLocation) setcenter([d.lastLocation?.longitude, d.lastLocation?.latitude]) }}
                                key={"device_" + d._id}
                                style={{ backgroundColor: "gray", borderColor: "gray" }}
                            >
                                {d.tag}
                            </ListGroup.Item>
                            )
                        }
                    </ListGroup>
                </Col>
                <Col>
                    <Map center={center} />
                </Col>
            </Row>
        </>
}