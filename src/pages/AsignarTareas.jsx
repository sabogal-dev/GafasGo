// ======================= Imports =======================
import { format } from "@formkit/tempo";
import { SelectDinamico } from "../components/SelectDinamico";
import checkFormulario from "../utils/checkFormulario";
import crearTareaSupabase from "../utils/crearTareasSupabase";
import getVendedores from "../utils/getVendedores";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router';
import {
    Button,
    Heading,
    Input,
    Portal,
    Select,
    Stack,
    createListCollection,
    Field,
    List,
    Icon,
    Group
} from "@chakra-ui/react";
import { PiPencilLineBold } from "react-icons/pi";

// ======================= Constantes =======================
const date = new Date();
const hoy = format(date, "YYYY-MM-DD", "en");

// ======================= Componente Principal =======================
export const AsignarTareas = () => {
    // ======================= Hooks =======================
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({
        id_vendedor: 0,
        nombreCorreria: "",
        fechaLimite: "",
        estadoVisita: "NO VISITADO"
    });
    const [listaVendedores, setListaVendedores] = useState([]);

    // ======================= Efectos =======================
    useEffect(() => {
        fetchVendedores();
    }, []);

    // ======================= Funciones =======================
    // Obtener vendedores
    async function fetchVendedores() {
        const { vendedores, error } = await getVendedores();
        if (error) {
            console.log(error);
            return;
        }
        setListaVendedores(vendedores);
    }

    // Manejar selección de cliente
    const handleClickCliente = (cliente) => {
        if (clientes.some(c => c.id === cliente.id)) return;
        setClientes([...clientes, cliente]);
    };

    // Manejar cambios en el formulario
    const onChangeForm = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Manejar envío del formulario
    const onSubmit = async (event) => {
        event.preventDefault();
        const formSupabase = checkFormulario(formData, clientes);
        if (!formSupabase) return;

        const { error } = await crearTareaSupabase(formSupabase);
        if (!error) {
            setTimeout(() => {
                navigate("/");
            }, 300);
        }
    };

    // ======================= Listas Dinámicas =======================
    const listVendedores = createListCollection({
        items: listaVendedores.map(v => ({
            label: v.nombre || v.name,
            value: v.id.toString()
        })),
    });

    // ======================= Renderizado =======================
    return (
        <Stack m="5" maxWidth={"375px"} height={"90vh"}>
            {/* ======= Header ======= */}
            <Group>
                <Link to="/">
                    <Button colorPalette={"red"}>Volver</Button>
                </Link>
                <Icon size="lg"><PiPencilLineBold /></Icon>
                <Heading>Asignar Tareas</Heading>
            </Group>

            {/* ======= Formulario ======= */}
            <form>
                {/* Select Vendedor */}
                <Select.Root
                    collection={listVendedores}
                    size="sm"
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
                                {listVendedores.items.map((vendedor) => (
                                    <Select.Item item={vendedor} key={vendedor.value}>
                                        {vendedor.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>

                {/* Input Correria */}
                <Field.Root>
                    <Field.Label>Correria</Field.Label>
                    <Input
                        type="text"
                        placeholder='Nombre Correria'
                        name="nombreCorreria"
                        onChange={onChangeForm}
                    />
                </Field.Root>

                {/* Input Fecha Limite */}
                <Field.Root>
                    <Field.Label>Fecha Limite</Field.Label>
                    <Input
                        type="date"
                        min={hoy}
                        name="fechaLimite"
                        onChange={onChangeForm}
                    />
                </Field.Root>

                {/* Lista de Clientes */}
                <List.Root as="ol" p="10">
                    {clientes && clientes.map((item) => (
                        <List.Item key={item.id}>
                            {item.nombre || item.name}
                        </List.Item>
                    ))}
                </List.Root>

                {/* Select Dinámico de Clientes */}
                <SelectDinamico agregarCliente={handleClickCliente} />

                {/* Botón Guardar */}
                <Stack
                    position={"fixed"}
                    bottom={0}
                    left={0}
                    width={"100%"}
                    gap={2}
                >
                    <Button
                        m={5}
                        type="button"
                        onClick={onSubmit}
                        colorPalette="blue"
                    >
                        Guardar
                    </Button>
                </Stack>
            </form>
        </Stack>
    );
};
