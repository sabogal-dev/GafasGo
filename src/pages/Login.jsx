import React, { useEffect, useState } from 'react'
import { Input, Stack, Heading, Portal, Select, createListCollection, Field, Button, Alert } from '@chakra-ui/react'
import { useNavigate } from 'react-router'
import getVendedores from '../utils/getVendedores'

export const Login = () => {

    const [listausuarios, setlistausuarios] = useState([])
    useEffect(() => {
        fetchVendedores();
    }, [])

    async function fetchVendedores() {
        const { vendedores, error } = await getVendedores();
        if (error) {
            console.log(error);
            return;
        }
        setlistausuarios(vendedores);
    }
    const navigate = useNavigate();

    const [formData, setformData] = useState({
        usuario: "",
        password: ""
    })

    const [error, seterror] = useState(false)

    const onChangeForm = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



    const onSubmit = () => {
        if (formData.usuario != "" && formData.password != "") {
            const usuarioSeleccionado = listausuarios.find(u => u.id == formData.usuario);
            if (usuarioSeleccionado && formData.password == usuarioSeleccionado.clave) {
                console.log("contraseña correcta");
                const usuarioParaStorage = {
                    id: usuarioSeleccionado.id,
                    nombre: usuarioSeleccionado.nombre,
                    role: usuarioSeleccionado.role,
                    whatsapp: usuarioSeleccionado.whatsapp,
                }
                localStorage.setItem("user", JSON.stringify(usuarioParaStorage));
                navigate("/")
            } else {
                seterror(true)
            }
        }
        else {
            seterror(true)
        }
    }

    const perfiles = createListCollection({
        items: listausuarios.map(v => ({
            label: v.nombre || v.name,
            value: v.id.toString()
        })),
    });


    return (
        <>
            <Stack m="5">
                <Heading>Inicio de sesion</Heading>
                <form action={() => { onSubmit() }}>
                    <Select.Root collection={perfiles} size="sm" width="320px" name='usuario' onChange={onChangeForm}>
                        <Select.HiddenSelect />
                        <Select.Label>Seleccion Usuario</Select.Label>
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder="Usuario" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                            <Select.Positioner>
                                <Select.Content>
                                    {perfiles.items.map((item) => (
                                        <Select.Item item={item} key={item.value}>
                                            {item.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                    <Field.Root>
                        <Field.Label>contraseña</Field.Label>
                        <Input type="password" placeholder='ingresar contraseña' name='password' onChange={onChangeForm}></Input>
                    </Field.Root>

                    <Button colorPalette="blue" mt={5} onClick={(event) => { onSubmit(event) }}>Iniciar Sesion</Button>
                </form>
                {error &&
                    <Alert.Root status="error" >
                        <Alert.Indicator />
                        <Alert.Title>usuario o contraseña incorrectos</Alert.Title>
                    </Alert.Root>
                }
            </Stack>
        </>
    )
}
