import { format } from '@formkit/tempo'
import React, { useEffect, useState } from 'react'
import { Alert, VStack, Spinner, Text } from '@chakra-ui/react'

import odooFetch from '../utils/odooFetch'
import { supabase } from '../utils/supabase'
import { TablaInforme } from './TablaInforme'
import { Estadisticas } from './Estadisticas'

export const TareasAdministrativo = ({ filtro }) => {

    const [tareas, setTareas] = useState("")
    const [dataCliente, setDataCliente] = useState("")


    useEffect(() => {

        const myfuntion = async () => {
            const { listaTareas, nombresClientes } = await fetchTareas(filtro)
            setTareas(listaTareas)
            setDataCliente(nombresClientes)
        }

        myfuntion()

    }, [filtro])



    return (
        <>
            {tareas &&
                <>
                    <Estadisticas tareas={tareas} fecha={filtro.fecha}></Estadisticas>
                    <TablaInforme tareas={tareas} clientes={dataCliente}></TablaInforme>
                </>
            }
        </>
    )
}


//funciones
const fetchTareas = async ({ vendedor = "1,2,3", fecha, estados }) => {
    let { data: tareas, error } = await supabase
        .from('tarea')
        .select('*')
        .in('estadoVisita', estados)
        .filter('id_vendedor', 'in', `(${vendedor})`)
        .gte('fechaLimite', fecha)
    const listaTareas = tareas;


    //filtrar IDs de clientes para llamar datos del cliente
    let lista = [];//crear lista filtrada

    listaTareas && listaTareas.forEach(element => {
        lista.push((element.id_cliente).toString())
    });

    const peticion = {
        modelo: "res.partner",
        filtro: [["id", "in", lista]],
        columna: ["id", "name", "vat", "city"]
    }

    const nombresClientes = await odooFetch(peticion)

    return { listaTareas, nombresClientes }
}