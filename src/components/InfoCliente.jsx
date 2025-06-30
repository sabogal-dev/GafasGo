import { useDataCliente } from '../hooks/useDataCliente'

import { VStack, Spinner, Text, Table, Stack, Alert } from '@chakra-ui/react'

export const InfoCliente = ({ idCliente }) => {

  const { dataCliente, cargando } = useDataCliente(idCliente)

  return (
    <>
      {cargando &&
        <VStack colorPalette="blue" p={4}>
          <Spinner color="blue" />
          <Text color="blue">Cargando...</Text>
        </VStack>
      }

      {!cargando && <Stack m="5">

        <Alert.Root status="success">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Informacion Util</Alert.Title>
          </Alert.Content>
        </Alert.Root>


        <Table.Root variant="outline" >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Dato</Table.ColumnHeader>
              <Table.ColumnHeader>Detalle</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Ultima visita</Table.Cell>
              <Table.Cell>{dataCliente["ultima Visita"]}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Ultimo Pedido</Table.Cell>
              <Table.Cell>{dataCliente["ultimo Pedido"]}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Categoria</Table.Cell>
              <Table.Cell>{dataCliente["categoria"]}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Cartera</Table.Cell>
              <Table.Cell>$ {dataCliente["cartera"].toLocaleString("es-ES")}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>

        <Alert.Root status="warning">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Prevision Meta</Alert.Title>
          </Alert.Content>
        </Alert.Root>
        <Table.Root variant="outline">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Marca</Table.ColumnHeader>
              <Table.ColumnHeader>cantidad</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Code line</Table.Cell>
              <Table.Cell>{dataCliente["x_prevision_line"]}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Code sport</Table.Cell>
              <Table.Cell>{dataCliente["x_prevision_sport"]}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Petite</Table.Cell>
              <Table.Cell>{dataCliente["x_prevision_petite"]}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Premium</Table.Cell>
              <Table.Cell>{dataCliente["x_prevision_premium"]}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Oh</Table.Cell>
              <Table.Cell>{dataCliente["x_prevision_oh"]}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Tonelly</Table.Cell>
              <Table.Cell>{dataCliente["x_prevision_tonelly"]}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>forzanny</Table.Cell>
              <Table.Cell>{dataCliente["x_prevision_forzanny"]}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Stack>}
    </>
  )
}
