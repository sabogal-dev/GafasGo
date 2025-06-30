import { useNavigate } from "react-router"
import "./CardTarea.css"
import { format } from "@formkit/tempo";
import { Text, Badge, Stack, Flex, Avatar, Group, Em } from "@chakra-ui/react";

export const CardTarea = ({ tarea, cliente }) => {
    const navigate = useNavigate();

    const onClick = (id) => {
        navigate(`/FormTarea?tarea=${id}&cliente=${cliente.name}&estado=${tarea.estadoVisita}&idCliente=${tarea.id_cliente}`)
    }

    return (
        <>
            <Stack
            _hover={{ bg: "blue.50" }}
            mb="2" 
            className="CardTarea" 
            onClick={() => onClick(tarea.id)}
            >

                <Flex justify="space-between">
                    <Group>

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
            </Stack>

        </>
    )
}
