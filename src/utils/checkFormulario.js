
export default function checkFormulario(correria, clientes) {


    let formularioSupbase = []


    //verificarcion correria
    if (correria.id_vendedor == 0 || correria.fechaLimite == "") {
        console.log('faltan datos correria')
        return false
    }
    if (clientes.length == 0) {
        console.log('sin clientes')
        return false
    }

    clientes.forEach(cliente => {

        let tarea = { ...cliente };

        tarea.id_vendedor = correria.id_vendedor
        tarea.nombreCorreria = correria.nombreCorreria
        tarea.fechaLimite = correria.fechaLimite
        tarea.estadoVisita = "NO VISITADO"

        tarea.id_cliente = tarea.id
        delete tarea.id
        delete tarea.name
        delete tarea.vat
        

        formularioSupbase.push(tarea)
    });
    return formularioSupbase
}

