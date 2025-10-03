import { useEffect, useState } from "react"
import odooFetch from "../utils/odooFetch";

import { IoPerson } from "react-icons/io5";
import { Button, Group, Input, List, Stack } from "@chakra-ui/react";

export const SelectDinamico = ({ agregarCliente }) => {

    const [busqueda, setbusqueda] = useState("")

    const [listado, setlistado] = useState([])//listado dinamico del select
    const [clientes, setclientes] = useState([])//listado llamado de la API

    const [cargando, setcargando] = useState(false)
    //mostrar lista dinamica solo con los datos filtrados del input
    useEffect(() => {
        actualizarListado();
    }, [clientes])

    const cargarApi = async () => {
        if (busqueda.length < 2) {
            return
        }
        setcargando(true)
        let asignar = await odooFetch({
            modelo: "res.partner",
            filtro: [["name", "ilike", busqueda]],
            columna: ["id", "name", "vat"]
        })
        asignar = asignar.slice(0, 20)
        setclientes(asignar);
    }


    const actualizarListado = () => {
        if (busqueda == "") {
            setlistado([])
            return
        }
        setcargando(false)
        const filtrado = clientes.filter((item) => item.name.toLocaleLowerCase().includes(busqueda.toLocaleLowerCase()));
        setlistado(filtrado)
    }

    const onClickCliente = (nombre) => {
        agregarCliente(nombre)
        setbusqueda("")
    }

    return (
        <>
            <Group width={"100%"}>

                <Input
                    type="text"
                    placeholder="Buscar Cliente"
                    onChange={(e) => { setbusqueda(e.target.value) }}
                />
                {cargando ?
                    <Button onClick={cargarApi} loading>
                        Buscar
                    </Button>
                    :
                    <Button onClick={cargarApi}>
                        Buscar
                    </Button>
                }
            </Group>
            <List.Root m="5" cursor="pointer" variant={"plain"} gap={5}>

                {listado && listado.map((item) => {
                    return (
                        <List.Item
                            key={item.id}
                            onClick={() => onClickCliente(item)}
                        >
                            <List.Indicator asChild color="green.500">
                                <IoPerson  />
                            </List.Indicator>
                            {item.name}
                        </List.Item>
                    )
                })}
            </List.Root>
        </>
    )
}
