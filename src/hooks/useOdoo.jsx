export default async function useOdoo(peticion) {
    const respuesta = await fetch("https://sabogal.top:/apiOdoo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(peticion)
    })
    const datos = await respuesta.json()
    // console.log(datos)
    return datos
}

//formato de la peticion ODOO

// modelo: "res.partner",
// filtro: [["name", "ilike", ""]],
// columna: ["id", "name", "vat"]
