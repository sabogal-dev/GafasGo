import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { InfoCliente } from '../components/InfoCliente'
import './FormularioTareas.css'
import marcarTareaVisitado from '../utils/marcarVisitado'

export const FormularioTarea = () => {
  let navigate = useNavigate();
  let [searchParams] = useSearchParams()

  const [envio, setenvio] = useState(false)
  const [errorEnvio, seterrorEnvio] = useState(false)


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

  const onSubmit = async (event) => {
    setenvio(true)
    event.preventDefault();
    if (formData.DetalleVisita == "" || formData.categoriaVisita == "") {
      console.log("fallo")
      setenvio(false);
      seterrorEnvio(true);
      return
    }
    const { error } = await marcarTareaVisitado(formData, idTarea)


    if (!error) {
      setenvio(false);
      seterrorEnvio(false)

      setTimeout(() => {
        navigate("/")
      }, 300);
    }


    else {
      setenvio(false);
      seterrorEnvio(true);
    }

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

              {/* <input type='file' className='form-control-file my-4' /> */}
              <div className='d-flex flex-column'>

                <button className='btn btn-primary mt-2 ' onClick={onSubmit}>Visitado</button>
                <Link to="/" className='btn btn-dark my-2'>Cancelar</Link>

              </div>

            </form>
          }
          {envio && <div className='Cargando alert alert-primary'><div className="spinner-border" role="status"></div>Cargando...</div>}
          {errorEnvio && <div className='Cargando alert alert-danger'>Error en el envio de los datos</div>}
        </section >
      </main>

      <section className='FormularioTarea mt-5 mx-3'>

        <InfoCliente idCliente={searchParams.get("idCliente")}></InfoCliente>

      </section>
    </>
  )
}
