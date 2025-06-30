import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { InfoCliente } from '../components/InfoCliente'
import marcarTareaVisitado from '../utils/marcarVisitado'
import { useTareaDatos } from '../hooks/useTareaDatos'


import { Textarea, Button, Badge, Stack, Heading, Group, Separator, Alert, Spinner, Text, VStack } from '@chakra-ui/react'

export const FormularioTarea = () => {

  //React router botones navegacion y parametro URL
  let navigate = useNavigate();
  let [searchParams] = useSearchParams()

  //estados para validacion de formulario
  const [envio, setenvio] = useState(false)
  const [errorEnvio, seterrorEnvio] = useState(false)

  //peticion fecha y nombre de correria
  const { tarea } = useTareaDatos(searchParams.get("tarea"));

  //datos formulario
  const [formData, setformData] = useState({
    estadoVisita: "VISITADO",
    fechaVisita: 0,
    DetalleVisita: "",
    categoriaVisita: ""
  })

  //llenado de formulario y actualizacion
  const onChangeForm = (e) => {
    const hoy = new Date()
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
      fechaVisita: hoy
    })
  }

  //validacion de formulario, estados de error y envio de formulario a supabase
  const onSubmit = async (event) => {
    setenvio(true)
    event.preventDefault();

    //validacion campos vacios
    if (formData.DetalleVisita == "" || formData.categoriaVisita == "") {
      console.log("fallo")
      setenvio(false);
      seterrorEnvio(true);
      return
    }

    //envio de formulario y verificacion de error en supabase
    const { error } = await marcarTareaVisitado(formData, searchParams.get("tarea"))

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
        <Link to="/">
          <Button w="100%">
            Volver
          </Button>
        </Link>
        <section>
          <Stack>
            <Group>
              <Heading>{searchParams.get("cliente")}</Heading>
              {tarea && <Badge >{tarea[0].fechaLimite}</Badge>}
            </Group>
            {tarea && <Badge colorPalette="green" mb="4">{tarea[0].nombreCorreria}</Badge>}
          </Stack>


          {searchParams.get("estado") !== "VISITADO" &&
            <form>
              <Stack>

                <Textarea name="DetalleVisita" id=""
                  onChange={onChangeForm}
                  placeholder='Detalles de la visita'
                  rows={3}
                ></Textarea>

                <select name="categoriaVisita" id="" onChange={onChangeForm}>
                  <option value="">---tipo de visita---</option>
                  <option value="Venta">Venta</option>
                  <option value="Cobro">Cobro</option>
                  <option value="Venta y Cobro">Venta y Cobro</option>
                  <option value="Marketing">Marketing</option>
                </select>

                {/* <input type='file' className='form-control-file my-4' /> */}

                <Stack>
                  <Button onClick={onSubmit} colorPalette="blue">Visitado</Button>
                  <Link to="/" >
                    <Button w="100%">
                      Cancelar
                    </Button>
                  </Link>
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

      <Separator my={100} />

      <section>

        <InfoCliente idCliente={searchParams.get("idCliente")}></InfoCliente>

      </section>
    </>
  )
}
