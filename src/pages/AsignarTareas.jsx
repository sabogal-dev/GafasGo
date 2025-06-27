import { format } from "@formkit/tempo"
import { SelectDinamico } from "../components/SelectDinamico";
import checkFormulario from "../utils/checkFormulario";
import crearTareaSupabase from "../utils/crearTareasSupabase";
import { useState } from "react";
import { Link } from 'react-router'

const date = new Date()

export const AsignarTareas = () => {

    const hoy = format(date, "YYYY-MM-DD", "en");
    const [clientes, setclientes] = useState([])

    const [formData, setformData] = useState({
        id_vendedor: 0,
        nombreCorreria: "",
        fechaLimite: "",
        estadoVisita: "NO VISITADO"
    })


    const handleClickCliente = (cliente) => {
        if (clientes.some(c => c.id === cliente.id)) {
            return
        }
        setclientes([...clientes, cliente])
    }

    const onChangeForm = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const formSupabase = checkFormulario(formData, clientes);
        if (!formSupabase) { return }
        crearTareaSupabase(formSupabase)
    }



    return (
        <div className="m-3 mb-5">
            <Link to="/" className='btn btn-dark mb-2'>Volver</Link>

            
            <h2>Asignar Tareas</h2>
            <form className="">

                <select
                    name="id_vendedor"
                    onChange={onChangeForm}
                    className="form-select"
                >
                    <option value="">--Vendedor--</option>
                    <option value={1}>JORGE</option>
                </select>

                <input
                    type="text"
                    placeholder='Nombre Corria'
                    name="nombreCorreria"
                    onChange={onChangeForm}
                    className="form-control"
                />

                <input
                    type="date"
                    min={hoy}
                    name="fechaLimite"
                    onChange={onChangeForm}
                    className="form-control"
                />
                <ul className="list-group list-group-numbered mt-3 mb-3">
                    {clientes && clientes.map((item) => {
                        return (
                            <li
                                key={item.id}
                                className="list-group-item fw-bold"
                            >
                                {item.name}
                            </li>
                        )
                    })}
                </ul>

                <div className="fixed-bottom d-flex flex-column">

                    <button
                        type="submit"
                        onClick={(event) => onSubmit(event)}
                        className="btn btn-primary mx-5 mb-3"
                    >Guardar</button>
                    <Link to="/" className='btn btn-dark mx-5 mb-3'>Cancelar</Link>
                </div>
            </form>

            <SelectDinamico agregarCliente={handleClickCliente}></SelectDinamico>
        </div>
    )
}
