import { useNavigate } from "react-router"
import "./CardTarea.css"

import { Text } from "@chakra-ui/react";

export const CardTarea = ({ tarea, cliente }) => {
    const navigate = useNavigate();

    const onClick = (id) => {
        navigate(`/FormTarea?tarea=${id}&cliente=${cliente.name}&estado=${tarea.estadoVisita}&idCliente=${tarea.id_cliente}`)
    }

    return (
        <>
            <article className="CardTarea" onClick={() => onClick(tarea.id)}>

                <div className="CardInfo">
                    <p className="CardCliente">{cliente.name}</p>
                    <p className="CardCorreria">{tarea.nombreCorreria}</p>
                    <p className="CardFecha">{tarea.fechaLimite}</p>
                </div>

                <div className="CardEstado">
                    {tarea.estadoVisita == "VISITADO" ? <div style={{ backgroundColor: "#81C781", width: 25, height: 25, borderRadius: "25px" }}></div> : null}
                    {tarea.estadoVisita == "NO VISITADO" ? <div style={{ backgroundColor: "#E05244", width: 25, height: 25, borderRadius: "25px" }}></div> : null}
                    {tarea.estadoVisita == "REAGENDADO" ? <div style={{ backgroundColor: "#EDA750", width: 25, height: 25, borderRadius: "25px" }}></div> : null}
                    <p>{tarea.estadoVisita}</p>
                </div>
            </article>
            <div className="CardTa">
            <Text>DAVID SABOGAL</Text>
            </div>

        </>
    )
}
