import React, { useEffect } from 'react'
import { ListaTareas } from '../components/ListaTareas'
import { MenuLateral } from '../components/MenuLateral'
import { useNavigate } from 'react-router'

import { Heading, Icon, Stack, Group, } from '@chakra-ui/react'
import { FaListCheck } from "react-icons/fa6";

export const Principal = () => {

    const navigate = useNavigate();

    let usuario = JSON.parse(localStorage.getItem('user'));

    // verificar si el usuario tiene un role sino va a login
    const verificarUsuario = (user) => {
        if (user && user.role) {
            console.log("role del usuario: " + user.role)
        }
        else {
            navigate("/login");
        }
    }


    useEffect(() => {
        verificarUsuario(usuario)
    }, [])
    return (
        <Stack m="5">
            <Stack align="end">
                <MenuLateral usuario={usuario.role}></MenuLateral>
            </Stack>
            <Group>
                <Icon size="lg"><FaListCheck /></Icon>
                <Heading>Lista de Pendientes</Heading>
            </Group>

            <ListaTareas ></ListaTareas>
        </Stack>
    )
}
