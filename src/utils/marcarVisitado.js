import { supabase } from "./supabase";


export default async function marcarTareaVisitado(bodyFetch, tarea) {
    const { data, error } = await supabase
        .from('tarea')
        .update(bodyFetch)
        .eq('id', tarea)
        .select()
}