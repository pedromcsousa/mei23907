import { useQuery } from "@tanstack/react-query"
import { getAllDevices } from "../../services/Device"
import { IDevice } from "../../models/Device"
import { Col, ListGroup, Row } from "react-bootstrap"
import Map from "./Map"
import { useState } from "react"

export default function Home() {
    const { data: devices, isError } = useQuery<Array<IDevice>>({ queryKey: ['devices'], queryFn: getAllDevices })

    const [center, setcenter] = useState<[number, number]>([0, 0])

    if (!devices || isError)
        return <></>
    else
        return <>
            <Row style={{ height: "100vh" }}>
                <Col md={2} style={{ paddingTop: "1rem" }}>
                    <ListGroup>
                        {
                            devices.map(d => <ListGroup.Item
                                className="hover"
                                onClick={() => { if (d.lastLocation) setcenter([d.lastLocation?.longitude, d.lastLocation?.latitude]) }}
                                key={"device_" + d._id}>
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