import React from 'react'
import { ListaTareas } from '../components/ListaTareas'
import "./Principal.css"
import { Link } from 'react-router'
export const Principal = () => {
    return (
        <div className='m-3'>
            <Link to="/Asignar" className='btn btn-dark mb-3'>Ir a Asignar</Link>
            <h2>Lista de Pendientes</h2>
            <ListaTareas ></ListaTareas>
        </div>
    )
}
