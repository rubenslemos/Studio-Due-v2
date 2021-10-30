import clientes from '../../clientes'
import { Table } from 'rsuite'
const {Column, HeaderCell, Cell} = Table
const Tabela = () => {
  return (
    <Table
    height={400}
    data={clientes}
    onRowClick={data => {
      console.log(data);
  }}>
  <Column width={70} align="center" fixed>
    <HeaderCell>Id</HeaderCell>
    <Cell dataKey="id" />
  </Column>
  <Column width={200} fixed>
    <HeaderCell>Nome</HeaderCell>
    <Cell dataKey="firstName" />
  </Column>
  <Column width={300}>
    <HeaderCell>Email</HeaderCell>
    <Cell dataKey="email" />
  </Column>
  <Column width={200}>
   <HeaderCell>City</HeaderCell>
   <Cell dataKey="city" />
  </Column>
  <Column width={200}>
   <HeaderCell>Street</HeaderCell>
   <Cell dataKey="street" />
  </Column>
  </Table>
  )
}
export default Tabela