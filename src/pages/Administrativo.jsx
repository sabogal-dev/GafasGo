import React, { useState } from 'react'
import { Input, Select, Portal, createListCollection, Group, Field, Stack, Button } from '@chakra-ui/react'
import { addDay, format } from '@formkit/tempo'
import { TareasAdministrativo } from '../components/TareasAdministrativo'


import { Link } from 'react-router'

const perfiles = createListCollection({
  items: [
    { label: "JORGE", value: "1" },
    { label: "YESID", value: "2" },
    { label: "DANIEL", value: "3" },
    { label: "TODOS", value: "1,2,3" }
  ],
})


export const Administrativo = () => {

  const [filtros, setfiltros] = useState({
    usuario: "1,2,3",
    fecha: format(addDay(new Date(), -30), "YYYY-MM-DD", "en"),
    fechaFin: "",
    estados: ['NO VISITADO', 'REAGENDADO', 'VISITADO']
  })

  const onChange = (event) => {
    const { name, value } = event.target;
    setfiltros({
      ...filtros,
      [name]: value
    })
  }



  return (

    <Stack m={5}>
      <Group>
        <Link to="/">
          <Button>
            Volver
          </Button>
        </Link>
      </Group>

      <form >
        <Group>
          <Select.Root collection={perfiles} size="sm" width="320px" name='vendedor' onChange={onChange}>
            <Select.HiddenSelect />
            <Select.Label>Seleccion vendedor</Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText placeholder="Usuario" />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Portal>
              <Select.Positioner>
                <Select.Content>
                  {perfiles.items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>

          <Field.Root >
            <Field.Label>Fecha</Field.Label>
            <Input type='date' name='fecha' onChange={onChange}></Input>
          </Field.Root>
        </Group>
      </form>

      
      <TareasAdministrativo filtro={filtros}></TareasAdministrativo>
    </Stack>
  )
}
