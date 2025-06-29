import React, { useEffect, useState } from 'react'
import { useTareas } from '../hooks/useTareas'
import { CardTarea } from './CardTarea';
import { useFiltroClientes } from '../hooks/useFiltroClientes';
import odooFetch from '../utils/odooFetch';

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
        const datos = await odooFetch(datosPeticion)
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

            {tareas && tareas.length < 1 ?
                <div className="alert alert-success" role="alert">
                    <h4 className="alert-heading">Buen Trabajo!</h4>
                    <p>Felicitaciones, estas al dia con tus tareas de clientes asignadas</p>
                    
                    <p className="mb-0">Es todo por ahora...</p>
                </div>
                : <p></p>}
        </section>
    )
}
