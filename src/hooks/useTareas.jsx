import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'


export const useTareas = () => {

    const [tareas, setTareas] = useState()

    useEffect(() => {
        fetchTareas();
    }, [])

    const fetchTareas = async () => {
        let { data: tareas, error } = await supabase
            .from('tarea')
            .select('*')
            .in('estadoVisita', ['NO VISITADO', 'REAGENDADO'])
        setTareas(tareas)
    }

    return {
        tareas
    }
}

