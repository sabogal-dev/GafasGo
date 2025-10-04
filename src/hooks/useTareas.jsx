import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'


export const useTareas = ({ usuario, fecha, estados }) => {

    const [tareas, setTareas] = useState()
    let userRole = usuario.role;
    let tareasDeVendedor = 1;
    if (userRole == "admin") {
        tareasDeVendedor = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16"; // todos los vendedores
    }
    else {
        tareasDeVendedor = usuario.id; // solo el vendedor logueado
    }
    useEffect(() => {
        fetchTareas();
    }, [])

    const fetchTareas = async () => {
        let { data: tareas, error } = await supabase
            .from('tarea')
            .select('*')
            .in('estadoVisita', estados)
            .filter('id_vendedor', 'in', `(${tareasDeVendedor})`)
            .gte('fechaLimite', fecha)
        setTareas(tareas)
    }

    return {
        tareas
    }
}

