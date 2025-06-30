import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { InfoCliente } from '../components/InfoCliente'
import './FormularioTareas.css'
import marcarTareaVisitado from '../utils/marcarVisitado'

import { Textarea, Button, Badge, Stack, Heading, Group, Separator, Alert, Spinner, Text, VStack } from '@chakra-ui/react'
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
      <Stack m="5">
        <Button>
          <Link to="/">Volver</Link>
        </Button>
        <section className='FormularioTarea'>
          <Stack>
            <Group>
              <Heading>{searchParams.get("cliente")}</Heading>
              <Badge >25-junio</Badge>
            </Group>
            <Badge colorPalette="green" mb="4">Correria cali junio</Badge>
          </Stack>


          {searchParams.get("estado") !== "VISITADO" &&
            <form>
              <Stack>

                <Textarea name="DetalleVisita" id=""
                  onChange={onChangeForm}
                  className='form-control'
                  placeholder='Detalles de la visita'
                  rows={3}
                ></Textarea>

                <select name="categoriaVisita" id="" className='form-select mt-2' onChange={onChangeForm}>
                  <option value="">---tipo de visita---</option>
                  <option value="Venta">Venta</option>
                  <option value="Cobro">Cobro</option>
                  <option value="Venta y Cobro">Venta y Cobro</option>
                  <option value="Marketing">Marketing</option>
                </select>

                {/* <input type='file' className='form-control-file my-4' /> */}

                <Stack>
                  <Button onClick={onSubmit} colorPalette="blue">Visitado</Button>
                  <Button><Link to="/" >Cancelar</Link></Button>
                </Stack>
              </Stack>
            </form>
          }


          {envio &&
            <VStack colorPalette="blue" p={4}>
              <Spinner color="blue" />
              <Text color="blue">Cargando...</Text>
            </VStack>
          }

          {errorEnvio &&
            <Alert.Root status="error" mt={3}>
              <Alert.Indicator title="Faltan Datos" />
              <Alert.Content>
                <Alert.Title>Faltan Datos</Alert.Title>
                <Alert.Description>
                  El campo de decripcion de la visita o el motivo de la visita estan vacios.
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          }
        </section >
      </Stack>

      <Separator my={100}/>

      <section>

        <InfoCliente idCliente={searchParams.get("idCliente")}></InfoCliente>

      </section>
    </>
  )
}
