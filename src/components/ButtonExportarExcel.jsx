import React from 'react'
import { Button, Group } from '@chakra-ui/react';
import { RiFileExcel2Fill } from "react-icons/ri";


export const ButtonExportarExcel = ({ excel, clientes }) => {

    function exportarExcel(datos, clientes) {
        if (!datos) {
            console.log("vacio")
            return
        }
        // 1. Convertimos JSON a hoja de Excel
        const worksheet = XLSX.utils.json_to_sheet(datos, { raw: false });
        const worksheetclientes = XLSX.utils.json_to_sheet(clientes);

        // 2. Creamos un libro (workbook) y le añadimos la hoja
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "visitas");
        XLSX.utils.book_append_sheet(workbook, worksheetclientes, "clientes");

        // 3. Escribimos y descargamos el archivo
        XLSX.writeFile(workbook, "Reporte.xlsx");
    }

    return (
        <>
            <Group>

                <Button onClick={() => { exportarExcel(excel, clientes) }} colorPalette="teal">
                    <RiFileExcel2Fill />
                    Exportar
                </Button>
            </Group>
        </>
    )
}
