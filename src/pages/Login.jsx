import React, { useState } from 'react'
import { Input, Stack, Heading, Portal, Select, createListCollection, Field, Button, Alert } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

const perfiles = createListCollection({
    items: [
        { label: "JORGE", value: "1" },
        { label: "YESID", value: "2" },
        { label: "DANIEL", value: "3" },
        { label: "ADMIN", value: "4"}
    ],
})

const usuarios = [
    { usuario: 1, clave: "jorge" },
    { usuario: 2, clave: "yesid" },
    { usuario: 3, clave: "daniel" },
    { usuario: 4, clave: "codeoptikal" }
]

export const Login = () => {

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
            if (formData.password == usuarios[(formData.usuario) - 1].clave) {
                console.log("contraseña correcta");
                localStorage.setItem("user", formData.usuario)
                navigate("/")
            }
        }
        else {
            seterror(true)
        }
    }
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
