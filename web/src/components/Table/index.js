import { Table } from 'rsuite'
const {Column, HeaderCell, Cell} = Table
const Tabela = ({ data, config, actions, content, onRowClick}) => {
  return (
    <Table
    height={500}
    data={data}
    onRowClick={(item)=>onRowClick(item)}
    >
  {config.map(c => <Column flexGrow={!c.width ? 1 : 0} width={c.width} fixed= {c.fixed}>
    <HeaderCell>{c.label}</HeaderCell>
    {!c.content ? (<Cell dataKey={c.key} />) : (<Cell>{(item) => c.content(item)}</Cell>)}
  </Column>)}
  <Column width={150} fixed="right">
    <HeaderCell></HeaderCell>
    <Cell>
    {(item) => actions(item)}
    </Cell>
  </Column>
  </Table>
  )
}
export default Tabela