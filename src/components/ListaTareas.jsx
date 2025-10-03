import React, { useEffect, useState } from 'react'
import { useTareas } from '../hooks/useTareas'
import { CardTarea } from './CardTarea';
import { useFiltroClientes } from '../hooks/useFiltroClientes';
import odooFetch from '../utils/odooFetch';

import { Alert, VStack, Spinner, Text } from '@chakra-ui/react';
import { format } from '@formkit/tempo';

export const ListaTareas = () => {
    const usuario = parseInt(localStorage.getItem('user'))
    const estados = ['NO VISITADO', 'REAGENDADO'];
    const [fecha] = useState(format(new Date(), "YYYY-MM-DD", "en"));

    const [nombresClientes, setnombresClientes] = useState([]);
    const [cargando, setcargando] = useState(true);

    // 1) obtener tareas
    const { tareas } = useTareas({ usuario, fecha, estados });

    // 2) obtener ids de clientes a partir de tareas
    const { clientes } = useFiltroClientes(tareas);

    useEffect(() => {
        const fetchData = async () => {
            if (!clientes || clientes.length === 0) {
                setcargando(false);
                return;
            }

            setcargando(true);

            try {
                // 3) construir la petición con los ids de clientes
                const nuevaPeticion = {
                    modelo: "res.partner",
                    filtro: [["id", "in", clientes]],
                    columna: ["id", "name", "vat"]
                };

                // 4) esperar a que termine antes de actualizar estado
                const datos = await odooFetch(nuevaPeticion);
                setnombresClientes(datos);
            } catch (error) {
                console.error("Error en peticionOdoo:", error);
            } finally {
                setcargando(false);
            }
        };

        fetchData();
    }, [clientes]);

    return (
        <section>
            {cargando &&
                <VStack colorPalette="blue" p={4}>
                    <Spinner color="blue" />
                    <Text color="blue">Cargando...</Text>
                </VStack>
            }

            {tareas && nombresClientes.length > 0 ? (
                tareas.map((tarea) => {
                    const datosCliente = nombresClientes.find(
                        cliente => cliente.id == tarea.id_cliente
                    );
                    return <CardTarea tarea={tarea} key={tarea.id} cliente={datosCliente} />
                })
            ) : null}

            {tareas && tareas.length < 1 ? (
                <Alert.Root status="success">
                    <Alert.Indicator />
                    <Alert.Content>
                        <Alert.Title>Buen Trabajo!</Alert.Title>
                        <Alert.Description>
                            Felicitaciones, estás al día con tus tareas de clientes asignadas
                        </Alert.Description>
                    </Alert.Content>
                </Alert.Root>
            ) : <p></p>}
        </section>
    )
}

// import React, { useEffect, useState } from 'react'
// import { useTareas } from '../hooks/useTareas'
// import { CardTarea } from './CardTarea';
// import { useFiltroClientes } from '../hooks/useFiltroClientes';
// import odooFetch from '../utils/odooFetch';


// import { Alert, VStack, Spinner, Text } from '@chakra-ui/react';
// import { format } from '@formkit/tempo';

// export const ListaTareas = () => {

//     const usuario = parseInt(localStorage.getItem('user'))
//     const estados = ['NO VISITADO', 'REAGENDADO'];
//     const [fecha, setfecha] = useState(format(new Date(), "YYYY-MM-DD", "en"));
//     const [nombresClientes, setnombresClientes] = useState([]);
//     const [cargando, setcargando] = useState(true);

//     const [peticion, setpeticion] = useState({
//         modelo: "res.partner",
//         filtro: [["id", "in", ""]],
//         columna: ["id", "name", "vat"]
//     })

//     const { tareas } = useTareas({ usuario, fecha, estados });

//     const { clientes } = useFiltroClientes(tareas)//extraer solo los ids de las tareas para poder llamar nombre API ODOO

//     useEffect(() => {
//         clientes && setpeticion({ ...peticion, filtro: [["id", "in", clientes]] });

//         const nuevaPeticion = { ...peticion, filtro: [["id", "in", clientes]] }
//         peticionOdoo(nuevaPeticion)
//     }, [clientes])



//     const peticionOdoo = async (datosPeticion) => {
//         const datos = await odooFetch(datosPeticion)
//         setnombresClientes(datos)
//         setcargando(false)
//     }

//     return (
//         <section>
//             {cargando &&
//                 <VStack colorPalette="blue" p={4}>
//                     <Spinner color="blue" />
//                     <Text color="blue">Cargando...</Text>
//                 </VStack>
//             }

//             {
//                 tareas && nombresClientes.length > 0 ? tareas.map((tarea) => {
//                     const datosCliente = nombresClientes.find(cliente => cliente.id == tarea.id_cliente)
//                     return <CardTarea tarea={tarea} key={tarea.id} cliente={datosCliente} />
//                 }) : null
//             }

//             {
//                 tareas && tareas.length < 1 ?
//                     <Alert.Root status="success">
//                         <Alert.Indicator />
//                         <Alert.Content>
//                             <Alert.Title>Buen Trabajo!</Alert.Title>
//                             <Alert.Description>Felicitaciones, estas al dia con tus tareas de clientes asignadas</Alert.Description>
//                         </Alert.Content>
//                     </Alert.Root>
//                     : <p></p>
//             }
//         </section >
//     )
// }
