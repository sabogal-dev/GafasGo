import { supabase } from "./supabase";


export default async function ultimaVisita(id) {
    const { data, error } = await supabase
        .from('tarea')
        .select("fechaVisita")
        .eq('id_cliente', id)
        .not('fechaVisita', 'is', null)
        .order('fechaVisita', { ascending: false })
        .limit(1)
    return { data: data?.[0] || null, error };
}