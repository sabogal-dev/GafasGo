import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

export const useTareaDatos = (idTarea) => {
    const [tarea, setTarea] = useState()

    useEffect(() => {
        fetchTareas(idTarea);
    }, [idTarea])

    const fetchTareas = async (idTarea) => {
        let { data: tarea, error } = await supabase
            .from('tarea')
            .select('*')
            .eq('id', idTarea)
        setTarea(tarea)
    }

    return {
        tarea
    }
}
