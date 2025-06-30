import { format } from "@formkit/tempo"
import { SelectDinamico } from "../components/SelectDinamico";
import checkFormulario from "../utils/checkFormulario";
import crearTareaSupabase from "../utils/crearTareasSupabase";
import { useState } from "react";
import { Link, useNavigate } from 'react-router'

import { Button, Heading, Input, Portal, Select, Stack, createListCollection, Field, List, Icon, Group } from "@chakra-ui/react";
import { PiPencilLineBold } from "react-icons/pi";

const date = new Date()

export const AsignarTareas = () => {
    let navigate = useNavigate();

    const hoy = format(date, "YYYY-MM-DD", "en");
    const [clientes, setclientes] = useState([])

    const [formData, setformData] = useState({
        id_vendedor: 0,
        nombreCorreria: "",
        fechaLimite: "",
        estadoVisita: "NO VISITADO"
    })


    const handleClickCliente = (cliente) => {
        if (clientes.some(c => c.id === cliente.id)) {
            return
        }
        setclientes([...clientes, cliente])
    }

    const onChangeForm = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const formSupabase = checkFormulario(formData, clientes);
        if (!formSupabase) { return }

        const { error } = await crearTareaSupabase(formSupabase)

        if (!error) {
            setTimeout(() => {
                navigate("/")
            }, 300);
        }
    }
    const listVendedores = createListCollection({
        items: [
            { label: "JORGE", value: "1" },
            { label: "YESID", value: "2" },
            { label: "DANIEL", value: "3" },
        ],
    })


    return (
        <Stack m="5">
            <Group>

                <Icon size="lg"><PiPencilLineBold /></Icon>
                <Heading>Asignar Tareas</Heading>
            </Group>
            <form className="">

                <Select.Root collection={listVendedores} size="sm" width="320px"
                    name="id_vendedor"
                    onChange={onChangeForm}
                >

                    <Select.HiddenSelect />
                    <Select.Label>Select Vendedor</Select.Label>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Select Vendedor" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {listVendedores.items.map((nombre) => (
                                    <Select.Item item={nombre} key={nombre.value}>
                                        {nombre.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>


                <Field.Root>
                    <Field.Label>Correria</Field.Label>
                    <Input
                        type="text"
                        placeholder='Nombre Corria'
                        name="nombreCorreria"
                        onChange={onChangeForm}
                    />
                </Field.Root>
                <Field.Root>
                    <Field.Label>Fecha Limite</Field.Label>
                    <Input
                        type="date"
                        min={hoy}
                        name="fechaLimite"
                        onChange={onChangeForm}
                    />
                </Field.Root>


                <List.Root as="ol" p="10">
                    {clientes && clientes.map((item) => {
                        return (
                            <List.Item
                                key={item.id}
                            >
                                {item.name}
                            </List.Item>
                        )
                    })}
                </List.Root>

                <Stack gap={2}>
                    <Button
                        type="submit"
                        onClick={(event) => onSubmit(event)}
                        colorPalette="blue"
                    >Guardar</Button>

                    <Link to="/" >
                        <Button w="100%">
                            Cancelar
                        </Button>
                    </Link>
                </Stack>
            </form>

            <SelectDinamico agregarCliente={handleClickCliente}></SelectDinamico>
        </Stack>
    )
}
