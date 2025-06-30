import React from 'react'
import { ListaTareas } from '../components/ListaTareas'
import { Link } from 'react-router'


import { Heading, Button, Icon, Stack, Group } from '@chakra-ui/react'
import { FaListCheck } from "react-icons/fa6";


export const Principal = () => {
    return (
        <Stack m="5">
            <Link to="/Asignar">
                <Button w="100%">
                    Ir a Asignar
                </Button>
            </Link>
            <Group>
                <Icon size="lg"><FaListCheck /></Icon>
                <Heading>Lista de Pendientes</Heading>
            </Group>

            <ListaTareas ></ListaTareas>
        </Stack>
    )
}
