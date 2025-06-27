import { supabase } from "./supabase";


export default async function crearTareaSupabase(bodyFetch) {
    const { data, error } = await supabase
        .from('tarea')
        .insert(bodyFetch)
        .select()
}