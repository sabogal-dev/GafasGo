import { supabase } from "./supabase";

export default async function getVendedores() {
    let { data: vendedores, error } = await supabase
        .from('vendedor')
        .select('*')
    return { vendedores, error }
}