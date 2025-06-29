import React from 'react'
import { ListaTareas } from '../components/ListaTareas'
import "./Principal.css"
import { Link } from 'react-router'


import { Heading } from '@chakra-ui/react'


export const Principal = () => {
    return (
        <div className='m-3'>
            <Link to="/Asignar" className='btn btn-dark mb-3'>Ir a Asignar</Link>
            <Heading>Lista de Pendientes</Heading>
            <ListaTareas ></ListaTareas>
        </div>
    )
}
