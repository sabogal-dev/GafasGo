import React, { useEffect } from 'react'
import { ListaTareas } from '../components/ListaTareas'
import { MenuLateral } from '../components/MenuLateral'
import { Link, useNavigate } from 'react-router'

import { Heading, Button, Icon, Stack, Group, Avatar, Flex } from '@chakra-ui/react'
import { FaListCheck } from "react-icons/fa6";

export const Principal = () => {

    const navigate = useNavigate();

    let usuario = parseInt(localStorage.getItem('user'));

    const verificarUsuario = (user) => {
        if (user) {
            console.log(user)
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
                <MenuLateral usuario={usuario}></MenuLateral>
            </Stack>
            <Group>
                <Icon size="lg"><FaListCheck /></Icon>
                <Heading>Lista de Pendientes</Heading>
            </Group>

            <ListaTareas ></ListaTareas>
        </Stack>
    )
}
