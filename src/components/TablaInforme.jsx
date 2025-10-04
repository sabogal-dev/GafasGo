import React from 'react'
import { Table, Badge } from "@chakra-ui/react"
import { format } from '@formkit/tempo'
import { ButtonExportarExcel } from './ButtonExportarExcel'

const vendedores = ["JORGE", "YESID", "SANTIAGO"]
export const TablaInforme = ({ tareas, clientes }) => {


    const tareaExcel = tareas.map(item => {

        const fechalimitecorregida = format(item.fechaLimite, "YYYY-MM-DD")
        const fechavisitacorregida = format(item.fechaLimite, "YYYY-MM-DD")

        return {
            ...item,
            fechaLimite: fechalimitecorregida, // formato YYYY-MM-DD
            fechaVisita: fechavisitacorregida
        };
    });


    return (
        <>
            <ButtonExportarExcel excel={tareaExcel} clientes={clientes}></ButtonExportarExcel>
            <Table.Root showColumnBorder variant="outline">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>vendedor</Table.ColumnHeader>
                        <Table.ColumnHeader>Cliente</Table.ColumnHeader>
                        <Table.ColumnHeader>Ciudad</Table.ColumnHeader>
                        <Table.ColumnHeader>Visitado</Table.ColumnHeader>
                        <Table.ColumnHeader>Fecha limite</Table.ColumnHeader>
                        <Table.ColumnHeader>Estado</Table.ColumnHeader>
                        <Table.ColumnHeader>Nombre correria</Table.ColumnHeader>
                        <Table.ColumnHeader>Categoria Visita</Table.ColumnHeader>
                        <Table.ColumnHeader>Detalle</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tareas && tareas.map((tarea) => {
                        let dataCliente = clientes.find(cliente => cliente.id == tarea.id_cliente)
                        if (!dataCliente) {
                            dataCliente = { name: "Cliente no encontrado en base de datos", city: "" }
                        }
                        return (
                            <Table.Row key={tarea.id}>
                                <Table.Cell>{vendedores[tarea.id_vendedor - 1]}</Table.Cell>
                                <Table.Cell>{dataCliente.name}</Table.Cell>
                                <Table.Cell>{dataCliente.city}</Table.Cell>
                                <Table.Cell>{tarea.fechaVisita && format(tarea.fechaVisita.replace(" ", "T").replace("+00", "+00:00"), "MMMM-DD")}</Table.Cell>
                                <Table.Cell>{format(tarea.fechaLimite, "MMMM-DD")}</Table.Cell>
                                <Table.Cell> {tarea.estadoVisita != "VISITADO" ? <Badge colorPalette="red">{tarea.estadoVisita}</Badge> : <Badge colorPalette="green">{tarea.estadoVisita}</Badge>}</Table.Cell>
                                <Table.Cell>{tarea.nombreCorreria}</Table.Cell>
                                <Table.Cell>{tarea.categoriaVisita}</Table.Cell>
                                <Table.Cell>{tarea.DetalleVisita}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table.Root>
        </>
    )
}
