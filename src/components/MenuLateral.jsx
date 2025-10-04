import { Button, CloseButton, Drawer, Portal, Stack, Icon, Flex, Group } from "@chakra-ui/react"
import { Link } from "react-router"


import { IoMdCash } from "react-icons/io";
import { RiPencilFill, RiLoginBoxFill } from "react-icons/ri";
import { FaChartPie } from "react-icons/fa";



export const MenuLateral = ({ usuario }) => {

    return (
        <Drawer.Root>
            <Drawer.Trigger asChild>
                <Button variant="outline" size="sm">
                    Menu
                </Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Menu</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <Flex flexDirection="column" height="100%" justify="space-between">
                                <Stack>
                                    {usuario === "admin" &&
                                        <>
                                            <Group>
                                                <Link to="/Asignar">
                                                    <Button variant="ghost">
                                                        <RiPencilFill />
                                                        Ir a Asignar
                                                    </Button>
                                                </Link>
                                            </Group>
                                            <Group>
                                                <Link to="/admin">
                                                    <Button variant="ghost">
                                                        <FaChartPie />
                                                        Panel Administrativo
                                                    </Button>
                                                </Link>
                                            </Group>
                                        </>
                                    }
                                    <Group>
                                        <a href="https://sabogal.top/viaticosControl/">
                                            <Button variant="ghost">
                                                <Icon><IoMdCash /></Icon>
                                                Viaticos (Gastos)
                                            </Button>
                                        </a>
                                    </Group>
                                </Stack>
                                <Link to={"/Login"}>
                                    <Button variant="ghost" colorPalette="red">
                                        <Icon><RiLoginBoxFill /></Icon>
                                        Cerrar Sesion
                                    </Button>
                                </Link>
                            </Flex>
                        </Drawer.Body>
                        <Drawer.Footer>
                            <p>Desarrollador Sabogal emilio</p>
                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}
