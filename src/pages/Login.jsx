import React, { useState } from 'react'
import { Input, Stack, Heading, Portal, Select, createListCollection, Field, Button } from '@chakra-ui/react'


const perfiles = createListCollection({
    items: [
        { label: "JORGE", value: "1" },
        { label: "YESID", value: "2" },
        { label: "DANIEL", value: "3" },
    ],
})


export const Login = () => {


    const [formData, setformData] = useState({
        usuario: "",
        password: ""
    })

    const onChangeForm = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <Stack m="5">
                <Heading>Inicio de sesion</Heading>
                <form>
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

                    <Button>Iniciar Sesion</Button>
                </form>
            </Stack>
        </>
    )
}
