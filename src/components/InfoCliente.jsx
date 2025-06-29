import { useDataCliente } from '../hooks/useDataCliente'

export const InfoCliente = ({ idCliente }) => {

  const { dataCliente, cargando } = useDataCliente(idCliente)

  return (
    <>
      {cargando && <div className='Cargando alert alert-primary'><div className="spinner-border" role="status"></div>Cargando...</div>}

      {!cargando && <>
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
              <td>{dataCliente["ultima Visita"]}</td>
            </tr>
            <tr>
              <th scope="row">Ultimo Pedido</th>
              <td>{dataCliente["ultimo Pedido"]}</td>
            </tr>
            <tr>
              <th scope="row">Categoria</th>
              <td>{dataCliente["categoria"]}</td>
            </tr>
            <tr>
              <th scope="row">Cartera</th>
              <td>$ {dataCliente["cartera"].toLocaleString("es-ES")}</td>
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
              <td>{dataCliente["x_prevision_line"]}</td>
            </tr>
            <tr>
              <th scope="row">Code sport</th>
              <td>{dataCliente["x_prevision_sport"]}</td>
            </tr>
            <tr>
              <th scope="row">Petite</th>
              <td>{dataCliente["x_prevision_petite"]}</td>
            </tr>
            <tr>
              <th scope="row">Premium</th>
              <td>{dataCliente["x_prevision_premium"]}</td>
            </tr>
            <tr>
              <th scope="row">Oh</th>
              <td>{dataCliente["x_prevision_oh"]}</td>
            </tr>
            <tr>
              <th scope="row">Tonelly</th>
              <td>{dataCliente["x_prevision_tonelly"]}</td>
            </tr>
            <tr>
              <th scope="row">forzanny</th>
              <td>{dataCliente["x_prevision_forzanny"]}</td>
            </tr>
          </tbody>
        </table>
      </>}
    </>
  )
}
