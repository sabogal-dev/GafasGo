import React from 'react'
import { DonutChart } from './EstadisticaChart/DonutChart';
import { diffDays } from '@formkit/tempo';

import { Card, Badge, Stack } from '@chakra-ui/react';

/**
 * Estadisticas component displays summary statistics about tasks and visits.
 *
 * Ajustes gráficos de las Card para ser responsive:
 * - Utiliza la propiedad `w={['100%', 160]}` en las Card para que ocupen el 100% del ancho en pantallas pequeñas y 160px en pantallas más grandes.
 * - El componente `Stack` usa `direction={['column', 'row']}` para mostrar las Card en columna en dispositivos móviles y en fila en pantallas grandes.
 * - La propiedad `wrap="wrap"` permite que las Card se ajusten automáticamente en varias líneas si el espacio horizontal es insuficiente.
 * - El espaciado entre Card se controla con `spacing={5}` y el margen vertical con `my={3}`.
 * - Los estilos de alineación (`align="stretch"`, `alignItems="center"`, `justifyContent="center"`) aseguran que el contenido de las Card esté centrado y bien distribuido en cualquier tamaño de pantalla.
 *
 * @param {Object} props
 * @param {Array} props.tareas - Lista de tareas a mostrar en las estadísticas.
 * @param {Date|string} props.fecha - Fecha de referencia para el informe.
 */
export const Estadisticas = ({ tareas, fecha }) => {

    let visitados = 0;
    let reagendados = 0;
    tareas.forEach(tarea => {
        if (tarea.estadoVisita == "VISITADO") {
            visitados += 1;
        }
        else if (tarea.estadoVisita == "REAGENDADO") {
            reagendados += 1;
        }
    });
    return (
        <>
            <Stack
                direction={['column', 'row']}
                spacing={5}
                my={3}
                align="stretch"
                wrap="wrap"
            >
                <Card.Root variant="elevated" w={['100%', 160]} minH={120}>
                    <Card.Body display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Card.Title textAlign="center">{diffDays(new Date(), fecha) + 1} Dias</Card.Title>
                        <Card.Description textAlign="center">de Informe</Card.Description>
                    </Card.Body>
                </Card.Root>

                <Card.Root variant="elevated" w={['100%', 160]} minH={120}>
                    <Card.Body display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Card.Title textAlign="center">{visitados} Clientes </Card.Title>
                        <Card.Description textAlign="center">
                            Visitados  -  
                            <Badge colorPalette="green">
                                {tareas.length > 0 ? ((visitados / tareas.length) * 100).toFixed(2) : "0.00"}%
                            </Badge>
                        </Card.Description>
                    </Card.Body>
                </Card.Root>

                <Card.Root variant="elevated" w={['100%', 160]} minH={120}>
                    <Card.Body display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <Card.Title textAlign="center">{tareas.length} Tareas </Card.Title>
                        <Card.Description textAlign="center">asignadas</Card.Description>
                    </Card.Body>
                </Card.Root>

                <Card.Root variant="elevated" w={['100%', 300]}>
                    <Card.Body display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                        <DonutChart visitados={visitados} reagendados={reagendados} tareas={tareas.length}></DonutChart>
                    </Card.Body>
                </Card.Root>
            </Stack>
        </>
    )
}
