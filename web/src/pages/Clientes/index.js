import Tabela from '../../components/Table'
import 'rsuite/dist/rsuite.css'
import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allClientes } from '../../store/modules/cliente/actions'
const Clientes = () => {
  
  const dispatch = useDispatch()
  const { clientes } = useSelector((state) => state.Clientes)
  console.log("Clientes", clientes)
  useEffect(() => {
    dispatch(allClientes())
  },[dispatch])
  return (
    <div className="col p-5 overflow-auto h-100">
    <div className="row">
      <div className="col-12">
        <div className="w-100 d-flex justify-content-between">
          <h2 className="mb-4 mt-0">Clientes</h2>
          <div>
            <button className="btn btn-primary">
              <span className="mdi mdi-account-plus-outline"> Novo Cliente</span>
            </button>
          </div>
        </div>
        <Tabela
           data={clientes}
           config={[
            { 
              label: 'Identificador',
              key: '_id',
              width: 250,
              fixed: true
             },
             { 
              label: 'Nome',
              key: 'nome',
              width: 150,
              fixed: true
             },
             { 
              label: 'E-mail',
              key: 'email',
              width: 300,
              fixed: true
             },
             { 
              label: 'Telefone',
              key: 'telefone',
              width: 150,
              fixed: true
             },
             { 
              label: 'Sexo',
              key: 'sexo',
              content: (item) => item.sexo === "M" ? "Masculino" : "Feminino",
              width: 150,
              fixed: true
             },
             { 
              label: 'Status',
              key: 'status',
              width: 150,
              fixed: true,
              content: (item) => item.status === "A" ? "Ativo" : "Inativo"
             },
             { 
              label: 'Data Cadastro',
              key: 'dataCadastro',
              width: 150,
              fixed: true,
              content: (item) => moment(item.dataCadastro).format('DD/MM/YYYY')
             }
          ]}
          actions={(Clientes) => (
            <button className="button">Mais Informações</button>
          )}
          onRowClick={(Clientes)=>{alert("Endereço: " + Clientes.endereco.rua + " " + Clientes.endereco.numero+ " CEP: " + Clientes.endereco.cep)}}
        />
      </div>
    </div>
  </div>
  )
}

export default Clientes