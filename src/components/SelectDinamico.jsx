import { useEffect, useState } from "react"
import useOdoo from "../hooks/useOdoo";


export const SelectDinamico = ({ agregarCliente }) => {

    const [busqueda, setbusqueda] = useState("")

    const [listado, setlistado] = useState([])//listado dinamico del select
    const [clientes, setclientes] = useState([])//listado llamado de la API

    const [peticion, setpeticion] = useState({
        modelo: "res.partner",
        filtro: [["name", "ilike", ""]],
        columna: ["id", "name", "vat"]
    })
    const onChange = (e) => {
        setbusqueda(e.target.value.toLocaleLowerCase());
    }

    //llamar la api para buscar clientes
    useEffect(() => {
        setpeticion({ ...peticion, filtro: [["name", "ilike", busqueda]] })
        cargarApi()
    }, [busqueda])

    //mostrar lista dinamica solo con los datos filtrados del input
    useEffect(() => {
        actualizarListado();
    }, [clientes])



    const cargarApi = async () => {
        let asignar = await useOdoo(peticion) 
        asignar = asignar.slice(0, 20)
        setclientes(asignar);
    }


    const actualizarListado = () => {
        if (busqueda == "") {
            setlistado([])
            return
        }
        const filtrado = clientes.filter((item) => item.name.toLocaleLowerCase().includes(busqueda));
        setlistado(filtrado)
    }

    const onClick = (nombre) => {
        agregarCliente(nombre)
        setbusqueda("")
    }

    return (
        <>
            <input
                type="text"
                placeholder="Buscar Cliente"
                onChange={(event) => onChange(event)}
                className="form-control fw-bold"
            />
            <ul className="list-group list-group-flush mt-3 pb-5">

                {listado && listado.map((item) => {
                    return (
                        <li
                            key={item.id}
                            onClick={() => onClick(item)}
                            className="list-group-item"
                        >
                            {item.name}
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
