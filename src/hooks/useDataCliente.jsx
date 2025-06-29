import { useEffect, useState } from "react"
import odooFetch from "../utils/odooFetch"

export const useDataCliente = (idCliente) => {

    const [cargando, setcargando] = useState(true)

    const [dataCliente, setdataCliente] = useState({
        "ultima Visita": "",
        "ultimo Pedido": "",
        categoria: 0,
        cartera: ""
    })

    const fetchCliente = {
        modelo: "res.partner",
        filtro: [["id", "=", idCliente]],
        columna: ["id", "name", "vat", "category_id", "x_prevision_line", "x_prevision_sport", "x_prevision_petite", "x_prevision_premium", "x_prevision_oh", "x_prevision_tonelly", "x_prevision_forzanny"]
    }
    let fetchCategorias = {
        modelo: "res.partner.category",
        filtro: [],
        columna: ["id", "name"]
    }
    const fetchFacturas = {
        modelo: "account.move",
        filtro: [["partner_id", "=", parseInt(idCliente)], ["move_type", "=", "out_invoice"]],
        columna: ["id", "invoice_date", "name", "partner_id", "amount_residual"]
    }

    const peticionDatosOdoo = async () => {

        let carteraCliente = 0;

        const infoClienteOdoo = await odooFetch(fetchCliente)
        const categorias = await odooFetch(fetchCategorias)
        const facturas = await odooFetch(fetchFacturas)
        let ultimaFactura = ""

        //ultima factura
        if (facturas[0]) {
            ultimaFactura = facturas[0].invoice_date
        }
        else {
            ultimaFactura = "SIN DATOS"
        }
        //suma los valores de los saldos pendiente del cliente
        facturas && facturas.forEach(factura => {
            carteraCliente = carteraCliente + factura.amount_residual;
        });


        //busca la categoria del cliente en la base de datos de categorias
        let categoriaCliente = categorias.filter((categoria) => categoria.id == infoClienteOdoo[0].category_id[0])

        if (categoriaCliente.length > 0) {
            categoriaCliente = categoriaCliente[0].name;
        }
        else {
            categoriaCliente = "SIN CATEGORIA";
        }

        //asigna los valores extraidos a una respuesta filtrada con lo necesario
        setdataCliente({
            ...dataCliente,
            categoria: categoriaCliente,
            "ultimo Pedido": ultimaFactura,
            cartera: carteraCliente,
            "x_prevision_line": infoClienteOdoo[0].x_prevision_line,
            "x_prevision_sport": infoClienteOdoo[0].x_prevision_sport,
            "x_prevision_petite": infoClienteOdoo[0].x_prevision_petite,
            "x_prevision_premium": infoClienteOdoo[0].x_prevision_premium,
            "x_prevision_oh": infoClienteOdoo[0].x_prevision_oh,
            "x_prevision_tonelly": infoClienteOdoo[0].x_prevision_tonelly,
            "x_prevision_forzanny": infoClienteOdoo[0].x_prevision_forzanny
        })

        setcargando(false)
    }


    useEffect(() => {
        peticionDatosOdoo()
    }, [idCliente])

    return { dataCliente, cargando }
}
