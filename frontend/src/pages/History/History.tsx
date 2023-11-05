import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { IReading } from "../../models/Reading";
import { getHistoryFromDevice } from "../../services/Reading";
import { useQuery } from "@tanstack/react-query";
import MapHistory from "./Map";

type Props = {}

function History({ }: Props) {
    let { tag } = useParams();
    const navigate = useNavigate();

    const { data: history, isError, refetch } = useQuery<Array<IReading>>({
        queryKey: ['reading', tag],
        queryFn: () => getHistoryFromDevice(tag || "")
    })

    if (!history || isError)
        return <></>

    return <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Button onClick={() => navigate("/")} style={{ position: "absolute", top: "1rem", left: "3rem", zIndex: 99999 }}>Voltar</Button>
        <MapHistory
            refetch={refetch}
            readings={history}
        />
    </div>
}

export default History