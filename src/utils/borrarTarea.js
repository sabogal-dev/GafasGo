import { supabase } from "./supabase";


export default async function borrarTarea(id) {
    console.log(id)
    //return
    const { data, error } = await supabase
        .from('tarea')
        .delete()
        .eq('id', id);
    return { error }
}