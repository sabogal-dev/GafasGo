import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'


export const useTareas = ({ usuario, fecha, estados }) => {

    const [tareas, setTareas] = useState()
    let user = usuario;
    if (user == 4) {
        user = "1,2,3"
    }
    useEffect(() => {
        fetchTareas();
    }, [])

    const fetchTareas = async () => {
        let { data: tareas, error } = await supabase
            .from('tarea')
            .select('*')
            .in('estadoVisita', estados)
            .filter('id_vendedor', 'in', `(${user})`)
            .gte('fechaLimite', fecha)
        setTareas(tareas)
    }

    return {
        tareas
    }
}

