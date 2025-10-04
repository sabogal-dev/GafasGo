import React, { useEffect, useState } from 'react'
import {
  Input,
  Select,
  Portal,
  createListCollection,
  Group,
  Field,
  Stack,
  Button,
  useBreakpointValue,
  Box,
} from '@chakra-ui/react'
import { addDay, format } from '@formkit/tempo'
import { TareasAdministrativo } from '../components/TareasAdministrativo'
import { Link } from 'react-router'
import getVendedores from '../utils/getVendedores'

// Chakra UI responsive styles documentation:
// - useBreakpointValue: https://chakra-ui.com/docs/hooks/use-breakpoint-value
// - Box: https://chakra-ui.com/docs/components/layout/box
// - Stack: https://chakra-ui.com/docs/components/layout/stack
// - Group: Custom or from Chakra UI (if not, replace with Flex/Box)
// - Select: https://chakra-ui.com/docs/components/select

export const Administrativo = () => {



  const [listavendedores, setlistavendedores] = useState([]);

  useEffect(() => {
    fetchVendedores();
  }, [])

  async function fetchVendedores() {
    const { vendedores, error } = await getVendedores();
    if (error) {
      console.log(error);
      return;
    }
    setlistavendedores(vendedores);
  }

  const [filtros, setfiltros] = useState({
    usuario: "1,2,3",
    fecha: format(addDay(new Date(), -30), "YYYY-MM-DD", "en"),
    fechaFin: format(addDay(new Date(), 60), "YYYY-MM-DD", "en"),
    estados: ['NO VISITADO', 'REAGENDADO', 'VISITADO']
  })

  // Responsive width for Select
  const selectWidth = useBreakpointValue({ base: "100%", sm: "320px" })

  const onChange = (event) => {
    const { name, value } = event.target
    setfiltros({
      ...filtros,
      [name]: value
    })
  }

  // crear lista de vendedores para el select
  const perfiles = createListCollection({
    items: listavendedores.map(v => ({
      label: v.nombre || v.name,
      value: v.id.toString()
    }))
  })

  return (
    <Stack m={5} spacing={6}>
      <Group>
        <Link to="/">
          <Button>
            Volver
          </Button>
        </Link>
      </Group>

      <form>
        <Group flexDirection={{ base: "column", md: "row" }} gap={4}>
          <Box width={selectWidth}>
            <Select.Root
              collection={perfiles}
              size="sm"
              width={selectWidth}
              name='vendedor'
              onChange={onChange}
            >
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
          </Box>

          <Field.Root>
            <Field.Label>Fecha</Field.Label>
            <Input type='date' name='fecha' onChange={onChange} />
          </Field.Root>
          <Field.Root>
            <Field.Label>Fecha Fin</Field.Label>
            <Input type='date' name='fechaFin' onChange={onChange} min={filtros.fecha} />
          </Field.Root>
        </Group>
      </form>

      <TareasAdministrativo filtro={filtros} />
    </Stack>
  )
}
