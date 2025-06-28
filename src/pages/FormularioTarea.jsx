import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import './FormularioTareas.css'
import marcarTareaVisitado from '../utils/marcarVisitado'

export const FormularioTarea = () => {
  let [searchParams] = useSearchParams()

  const tarea = searchParams.get("tarea")
  const [idTarea, setidTarea] = useState()
  const [formData, setformData] = useState({
    estadoVisita: "VISITADO",
    fechaVisita: 0,
    DetalleVisita: "",
    categoriaVisita: ""
  })

  const onChangeForm = (e) => {
    const hoy = new Date()
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
      fechaVisita: hoy
    })
  }

  useEffect(() => {
    setidTarea(searchParams.get("tarea"))
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    marcarTareaVisitado(formData, tarea)
  }


  return (
    <>
      <main className='m-3'>
        <Link to="/" className='btn btn-dark mb-2'>Volver</Link>
        <section className='FormularioTarea'>

          <div className='d-flex justify-content-between'>
            <h3>{searchParams.get("cliente")}</h3>
            <p>25-junio</p>
          </div>
          <p>Correria cali junio</p>


          {searchParams.get("estado") !== "VISITADO" &&
            <form>

              <textarea name="DetalleVisita" id=""
                onChange={onChangeForm}
                className='form-control'
                placeholder='Detalles de la visita'
                rows={3}
              ></textarea>

              <select name="categoriaVisita" id="" className='form-select mt-2' onChange={onChangeForm}>
                <option value="">---tipo de visita---</option>
                <option value="Venta">Venta</option>
                <option value="Cobro">Cobro</option>
                <option value="Venta y Cobro">Venta y Cobro</option>
                <option value="Marketing">Marketing</option>
              </select>

              <input type='file' className='form-control-file my-4' />
              <div className='d-flex flex-column'>

                <button className='btn btn-primary mt-2 ' onClick={onSubmit}>Visitado</button>
                <Link to="/" className='btn btn-dark my-2'>Cancelar</Link>
              </div>

            </form>
          }
        </section >
      </main>

      <section className='FormularioTarea mt-5'>
        <h2 className='alert alert-success'>Informacion Util</h2>


        <table className="table">
          <thead>
            <tr>
              <th scope="col">Dato</th>
              <th scope="col">Detalle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Ultima visita</th>
              <td>15 enero 2025</td>
            </tr>
            <tr>
              <th scope="row">Ultimo Pedido</th>
              <td>$ 2.450.000</td>
            </tr>
            <tr>
              <th scope="row">Categoria</th>
              <td>Excelente</td>
            </tr>
            <tr>
              <th scope="row">Cartera</th>
              <td>$500.000</td>
            </tr>
          </tbody>
        </table>

        <h2 className='alert alert-warning'>Prevision Meta</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Marca</th>
              <th scope="col">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Code line</th>
              <td>15</td>
            </tr>
            <tr>
              <th scope="row">Code sport</th>
              <td>5</td>
            </tr>
            <tr>
              <th scope="row">Petite</th>
              <td>16</td>
            </tr>
            <tr>
              <th scope="row">Premium</th>
              <td>10</td>
            </tr>
            <tr>
              <th scope="row">Oh</th>
              <td>25</td>
            </tr>
            <tr>
              <th scope="row">Tonelly</th>
              <td>13</td>
            </tr>
            <tr>
              <th scope="row">forzanny</th>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  )
}
