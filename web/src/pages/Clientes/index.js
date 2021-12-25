import Tabela from '../../components/Table'
import 'rsuite/dist/rsuite.css'
import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  allClientes, 
  updateCliente, 
  filterClientes, 
  addCliente, 
  resetCliente,
  unlinkCliente
} from '../../store/modules/cliente/actions'
import { Drawer, Modal, Button, DatePicker } from 'rsuite'
import RemindFillIcon from '@rsuite/icons/RemindFill'
const Clientes = () => {
  
  const dispatch = useDispatch()
  const { clientes, cliente, form, behavior, components } = useSelector((state) => state.Clientes)
  
  const setComponent = (component, state) => {
    dispatch(updateCliente({
      components: {
        ...components,
        [component]: state
      }
    }))
  }

  const setCliente = (key, value) => {
    dispatch(updateCliente({
      cliente: {
        ...cliente,
        [key]: value
      }
    }))
  }
  const onRowClick = (cliente) => {
    dispatch(
      updateCliente({
        cliente,
        behavior: 'update',
      })
    );
    setComponent('drawer', true);
  };
  const remove = () => {
    dispatch(unlinkCliente())
  }
  const save = () => { 
    dispatch(addCliente())
  }
  useEffect(() => {
    dispatch(allClientes())
  },[dispatch])

  return (
    console.log("cliente: ", cliente),
    console.log("clientes: ", clientes),
    console.log("Clientes: ", Clientes),
    <div className="col p-5 overflow-auto h-100">
      <Drawer 
      open={components.drawer} 
      onClose={() => setComponent('drawer', false)}
      size="sm"
      className="drawer" 
      >
        <Drawer.Body className="drawer">
          <h2>{behavior === 'create'  ? 'Cadastrar novo': 'Atualizar dados do'} Cliente</h2>
          <div className="row mt-3">
          <div className="form-group col-12 mb-3">
            <p>E-mail</p>
            <div class="input-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="E-mail do cliente"
                  disabled={behavior !== 'create'}
                  onChange={(e) => {
                    setCliente('email', e.target.value);
                  }}
                  value={cliente.email}
                />
                {behavior === 'create' && (
                  <div class="input-group-append">
                    <button
                      className="button"
                      disabled={form.filtering}
                      onClick={() => {
                        dispatch(
                          filterClientes({
                            filters: { email: cliente.email, status: 'A' },
                          })
                        );
                      }}
                    >
                      Pesquisar
                    </button>
                  </div>
                )}
            </div>
          </div>
          <div className="form-group col-6">
          <p>Nome</p>
            <div className="input-group">
              <input 
                type="text" 
                disabled={form.disabled}
                className="form-control"
                placeholder="Nome cliente"
                value={cliente.nome}
                onChange={(e) => setCliente('nome', e.target.value)}
              />
            </div>
          </div>
          <div className="form-group col-6">
            <p>Telefone</p>
            <div className="input-group">
              <input 
                type="text" 
                disabled={form.disabled}
                className="form-control"
                placeholder="Telefone cliente"
                value={cliente.telefone}
                onChange={(e) => setCliente('telefone', e.target.value)}
              />
            </div>
          </div>
          <div className="form-group col-6">
            <p>Data Nascimento</p>
              <DatePicker 
                block
                size="lg"
                disabled={form.disabled}
                placeholder={cliente.nascimento === "" || null ? `Nascimento` : moment(cliente.nascimento).format("DD-MM-YYYY")}
                onChange={(e) => setCliente('nascimento', moment(e).format("YYYY-MM-DD"))}
              />

 	        </div>
          <div className="form-group col-6">
            <p>Sexo</p>
            <select
              disabled={form.disabled}
              className="form-control"
              value={cliente.sexo}
              onChange={(e) => setCliente('sexo', e.target.value)}
            >
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            </select>  
          </div>
          <div className="form-group col-6">
            <p>Tipo de Documento</p>
            <select
              disabled={form.disabled}
              className="form-control"
              value={cliente.documento.tipo}
              onChange={(e) => setCliente('documento',{
                ...cliente.documento,
                tipo: e.target.value})}
            >
            <option value="cpf">CPF</option>
            <option value="cnpj">CNPJ</option>
            </select>  
          </div>
          <div className="form-group col-6">
            <p>Numero</p>
            <div className="input-group">
              <input 
                type="text" 
                disabled={form.disabled}
                className="form-control"
                placeholder="Nº"
                value={cliente.documento.numero}
                onChange={(e) => setCliente('documento',{
                  ...cliente.documento,
                  numero: e.target.value})}
              />
            </div>
          </div>
            <div className="form-group col-9">
              <p className="">Rua/Av.</p>
              <input
                type="text"
                className="form-control"
                placeholder="Rua/Av."
                disabled={form.disabled}
                value={cliente.endereco.rua}
                onChange={(e) =>
                  setCliente('endereco', {
                    ...cliente.endereco,
                    rua: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-3">
              <p className="">Número</p>
              <input
                type="text"
                className="form-control"
                placeholder="Número"
                disabled={form.disabled}
                value={cliente.endereco.numero}
                onChange={(e) =>
                  setCliente('endereco', {
                    ...cliente.endereco,
                    numero: e.target.value,
                  })
                }
              />
            </div>
                  <div className="form-group col-4">
                    <p className="">Bairro</p>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Bairro"
                      disabled={form.disabled}
                      value={cliente.endereco.bairro}
                      onChange={(e) =>
                        setCliente('endereco', {
                          ...cliente.endereco,
                          bairro: e.target.value,
                        })
                      }
                    />
                  </div>
                   <div className="form-group col-5">
                    <p className="">Complemento</p>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="apto, bloco, ..."
                      disabled={form.disabled}
                      value={cliente.endereco.complemento}
                      onChange={(e) =>
                        setCliente('endereco', {
                          ...cliente.endereco,
                          complemento: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group col-3">
                      <p className="">CEP</p>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="00111222"
                        disabled={form.disabled}
                        value={cliente.endereco.cep}
                        onChange={(e) =>
                          setCliente('endereco', {
                            ...cliente.endereco,
                            cep: e.target.value,
                          })
                        }
                      />
                    </div>
            <div className="form-group col-4">
              <p className="">Estado</p>
              <input
                type="text"
                className="form-control"
                placeholder="Estado"
                disabled={form.disabled}
                value={cliente.endereco.estado}
                onChange={(e) =>
                  setCliente('endereco', {
                    ...cliente.endereco,
                    estado: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-8">
              <p className="">Cidade</p>
              <input
                type="text"
                className="form-control"
                placeholder="Cidade"
                disabled={form.disabled}
                value={cliente.endereco.cidade}
                onChange={(e) =>
                  setCliente('endereco', {
                    ...cliente.endereco,
                    cidade: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group col-12">
              <p></p>
            <button
            className="button mx-auto save"
            loading={form.saving}
            onClick={() => {
              if (behavior === 'create') {
                save();
              } else {
                setComponent('confirmDelete', true);
              }
            }}
          >
            {behavior === 'create' ? 'Salvar' : 'Remover'} cliente
          </button>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
      <Modal
        open={components.confirmDelete}
        onHide={() => setComponent('confirmDelete', false)}
        size="xs"
      >
        <Modal.Body
        style={{
          fontFamily: 'Ubuntu',
          fontSize: 16,
          fontWeight: '500'
        }}
        >
              <RemindFillIcon
              style={{
                color: '#d40000',
                fontSize: 25,
              }}
            />
            
            {'    '} &nbsp;Tem certeza que deseja excluir Cliente?<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ação Irreversível!         
        </Modal.Body>
        <Modal.Footer>
            <Button
              loading={form.saving}
              onClick={() => remove()}
              color="red"
              appearance="primary"
              style={{
                fontFamily: 'Ubuntu',
                fontSize: 16,
                fontWeight: '500'
              }}
            >
              Excluir Cliente
            </Button>
            <Button
              onClick={() => setComponent('confirmDelete', false)}
              appearance='subtle'
              style={{
                fontFamily: 'Ubuntu',
                fontSize: 16,
                fontWeight: '500'
              }}
            >
              Cancelar
            </Button>
        </Modal.Footer>
      </Modal>
    <div className="row">
      <div className="col-12">
        <div className="w-100 d-flex justify-content-between">
          <h2 className="mb-4 mt-0">Clientes</h2>
          <div>
            <button 
              className="button"
              onClick={() =>{
                dispatch(resetCliente())
                dispatch(updateCliente({
                  behavior: 'create'
                }))
                setComponent('drawer', true)}
              }
              >
              <span className="mdi mdi-account-plus-outline"> Novo Cliente</span>
            </button>
          </div>
        </div>
        <Tabela
           loading={form.filtering}
           data={clientes}
           config={[
             { 
              label: 'Data Cadastro',
              key: 'dataCadastro',
              width: 100,
              fixed: true,
              content: (item) => moment(item.dataCadastro).format('DD/MM/YYYY')
             },
             { 
              label: 'Status',
              key: 'status',
              width: 80,
              fixed: true,
              content: (item) => item.status === "A" ? "Ativo" : "Inativo"
             },
             { 
              label: 'Sexo',
              key: 'sexo',
              content: (item) => item.sexo === "M" ? "Masculino" : "Feminino",
              width: 100,
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
              label: 'Endereço',
              key: 'endereco',
              width: 300,
              fixed: true,
              content: (Clientes) => ("Rua: " + Clientes.endereco.rua + " nº: " + Clientes.endereco.numero +" " + Clientes.endereco.complemento)
             }
          ]}
          actions={(Clientes) => (
            <button 
              className="button"
            >
              Mais Informações
            </button>
          )}
          onRowClick={(c) => onRowClick(c)}
        />
      </div>
    </div>
  </div>
  )
}

export default Clientes