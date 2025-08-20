import { useNavigate } from "react-router"
import "./CardTarea.css"
import { format } from "@formkit/tempo";
import { Text, Badge, Stack, Flex, Avatar, Group, Em, Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import borrarTarea from "../utils/borrarTarea.js";


export const CardTarea = ({ tarea, cliente }) => {
    const navigate = useNavigate();

    const usuario = localStorage.getItem("user")
    const onClick = (id) => {
        navigate(`/FormTarea?tarea=${id}&cliente=${cliente.name}&estado=${tarea.estadoVisita}&idCliente=${tarea.id_cliente}`)
    }

    const onBorrar = async (id) => {
        await borrarTarea(id)
        window.location.reload();
    }

    return (
        <>
            <Stack
                _hover={{ bg: "blue.50" }}
                mb="2"
                className="CardTarea"

            >

                <Flex justify="space-between"
                    onClick={() => onClick(tarea.id)}
                >
                    <Group

                    >

                        <Avatar.Root variant="subtle">
                            <Avatar.Fallback name={cliente.name} />
                        </Avatar.Root>

                        <Stack>
                            <Text textStyle="lg" fontWeight="medium">{cliente.name}</Text>
                            <Text textStyle="xs">correria : <Em>{tarea.nombreCorreria}</Em></Text>
                            <Group>
                                <Badge >{format(tarea.fechaLimite, "DD-MMMM")}</Badge>
                                <Badge colorPalette="red">{tarea.estadoVisita.toLowerCase()}</Badge>
                            </Group>
                        </Stack>
                    </Group>

                </Flex>
                {usuario == 4 ?
                    <Flex justify="end">
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <Button colorPalette="red" size="sm">
                                    Borrar
                                </Button>
                            </Dialog.Trigger>
                            <Portal>
                                <Dialog.Backdrop />
                                <Dialog.Positioner>
                                    <Dialog.Content>
                                        <Dialog.Header>
                                            <Dialog.Title>Eliminar Tarea</Dialog.Title>
                                        </Dialog.Header>
                                        <Dialog.Body>
                                            <p>
                                                Esto eliminara el registro de la base de datos y no podra ser recuperado ni reestablecido
                                            </p>
                                        </Dialog.Body>
                                        <Dialog.Footer>
                                            <Dialog.ActionTrigger asChild>
                                                <Button variant="outline">Cancelar</Button>
                                            </Dialog.ActionTrigger>
                                            <Button  onClick={() => { onBorrar(tarea.id) }} colorPalette="red">Borrar</Button>
                                        </Dialog.Footer>
                                        <Dialog.CloseTrigger asChild>
                                            <CloseButton size="sm" />
                                        </Dialog.CloseTrigger>
                                    </Dialog.Content>
                                </Dialog.Positioner>
                            </Portal>
                        </Dialog.Root>
                    </Flex>
                    : null
                }
            </Stack>

        </>
    )
}
