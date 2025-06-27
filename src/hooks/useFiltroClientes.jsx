import { useEffect, useState } from "react"

export const useFiltroClientes = (listaTareas) => {


  const [clientes, setclientes] = useState([])//listado de ids para llamado API

  let lista = [];//crear lista filtrada

  useEffect(() => {
    unicos();
  }, [listaTareas])

  const unicos = () => {
    listaTareas && listaTareas.forEach(element => {
      lista.push((element.id_cliente).toString())
    });

    setclientes(lista)//guardar lista filtrada a state CLIENTES para API
  }

  return { clientes }
}
