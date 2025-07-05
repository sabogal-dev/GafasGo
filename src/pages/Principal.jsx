import React, { useEffect } from 'react'
import { ListaTareas } from '../components/ListaTareas'
import { Link, useNavigate } from 'react-router'

import { Heading, Button, Icon, Stack, Group, Avatar, Flex } from '@chakra-ui/react'
import { FaListCheck } from "react-icons/fa6";

export const Principal = () => {

    const navigate = useNavigate();

    let usuario = localStorage.getItem('user');

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
            <Flex justify="space-between">

                <Link to="/Asignar">
                    <Button w="100%">
                        Ir a Asignar
                    </Button>
                </Link>

                <Link to="/login">
                    <Avatar.Root cursor="pointer">
                        <Avatar.Fallback />
                    </Avatar.Root>
                </Link>
            </Flex>
            <Group>
                <Icon size="lg"><FaListCheck /></Icon>
                <Heading>Lista de Pendientes</Heading>
            </Group>

            <ListaTareas ></ListaTareas>
        </Stack>
    )
}
