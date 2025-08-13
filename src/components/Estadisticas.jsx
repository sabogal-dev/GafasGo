import React from 'react'
import { DonutChart } from './EstadisticaChart/DonutChart';
import { diffDays } from '@formkit/tempo';

import { Card, Group, Badge, TextareaPropsProvider } from '@chakra-ui/react';

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
            <Group my={3} gap={5}>

                <Card.Root variant="elevated" w={200}>
                    <Card.Body >
                        <Card.Title > {diffDays(new Date(), fecha) + 1} Dias</Card.Title>
                        <Card.Description>de Informe</Card.Description>
                    </Card.Body>
                </Card.Root>


                <Card.Root variant="elevated" w={200}>
                    <Card.Body >
                        <Card.Title >{visitados} Clientes </Card.Title>
                        <Card.Description>Visitados  -  <Badge colorPalette="green"> ({((visitados / tareas.length) * 100).toFixed(2)})%</Badge></Card.Description>
                    </Card.Body>
                </Card.Root>

                <Card.Root variant="elevated" w={200}>
                    <Card.Body >
                        <Card.Title >{tareas.length} Tareas </Card.Title>
                        <Card.Description>asignadas</Card.Description>
                    </Card.Body>
                </Card.Root>

                <Group>
                    <Card.Root variant="elevated" w={300}>
                        <Card.Body >
                            <DonutChart visitados={visitados} reagendados={reagendados} tareas={tareas.length}></DonutChart>
                        </Card.Body>
                    </Card.Root>
                </Group>
            </Group>
        </>
    )
}
