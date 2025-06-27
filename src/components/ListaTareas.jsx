import React, { useEffect, useState } from 'react'
import { useTareas } from '../hooks/useTareas'
import { CardTarea } from './CardTarea';
import { useFiltroClientes } from '../hooks/useFiltroClientes';
import useOdoo from '../hooks/useOdoo';

export const ListaTareas = () => {

    const [nombresClientes, setnombresClientes] = useState([])
    const [cargando, setcargando] = useState(true)

    const [peticion, setpeticion] = useState({
        modelo: "res.partner",
        filtro: [["id", "in", ""]],
        columna: ["id", "name", "vat"]
    })

    const { tareas } = useTareas();

    const { clientes } = useFiltroClientes(tareas)//extraer solo los ids de las tareas para poder llamar nombre API ODOO

    useEffect(() => {
        clientes && setpeticion({ ...peticion, filtro: [["id", "in", clientes]] });

        const nuevaPeticion = { ...peticion, filtro: [["id", "in", clientes]] }
        peticionOdoo(nuevaPeticion)
    }, [clientes])



    const peticionOdoo = async (datosPeticion) => {
        const datos = await useOdoo(datosPeticion)
        setnombresClientes(datos)
        setcargando(false)
    }
    
    return (
        <section className='ListaTareas'>
            {cargando && <div className='Cargando alert alert-primary'><div className="spinner-border" role="status"></div>Cargando...</div>}

            {
                tareas && nombresClientes.length > 0 ? tareas.map((tarea) => {
                    const datosCliente = nombresClientes.find(cliente => cliente.id == tarea.id_cliente)

                    return <CardTarea tarea={tarea} key={tarea.id} cliente={datosCliente} />
                }) : null
            }

        </section>
    )
}
