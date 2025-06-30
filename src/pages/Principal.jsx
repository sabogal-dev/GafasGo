import React from 'react'
import { ListaTareas } from '../components/ListaTareas'
import "./Principal.css"
import { Link } from 'react-router'


import { Heading, Button, Icon, Stack, Group } from '@chakra-ui/react'
import { FaListCheck } from "react-icons/fa6";


export const Principal = () => {
    return (
        <Stack m="5">
            <Button><Link to="/Asignar" className='btn btn-dark mb-3'>Ir a Asignar</Link></Button>
            <Group>
                <Icon size="lg"><FaListCheck /></Icon>
                <Heading>Lista de Pendientes</Heading>
            </Group>

            <ListaTareas ></ListaTareas>
        </Stack>
    )
}
