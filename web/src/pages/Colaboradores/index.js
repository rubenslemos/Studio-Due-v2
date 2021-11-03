import Tabela from '../../components/Table'
import 'rsuite/dist/rsuite.css'
import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  allColaboradores, 
  updateColaborador, 
  filterColaboradores, 
  addColaborador, 
  resetColaborador,
  unlinkColaborador
} from '../../store/modules/colaborador/actions'
import { Drawer, Modal, Button } from 'rsuite'
import RemindFillIcon from '@rsuite/icons/RemindFill'
const Colaboradores = () => {
  
  const dispatch = useDispatch()
  const { colaborador, colaboradores, form, behavior, components } = useSelector((state) => state.Colaboradores)

  const setComponent = (component, state) => {
    dispatch(updateColaborador({
      components: {
        ...components,
        [component]: state
      }
    }))
  }
  const setColaborador = (key, value) => {
    dispatch(updateColaborador({
      colaborador: {
        colaborador,
        [key]: value
      }
    }))
  }
  const onRowClick = (colaborador) => {
    dispatch(
      updateColaborador({
        colaborador,
        behavior: 'update',
      })
      );
      setComponent('drawer', true);
    };
    const remove = () => {
      dispatch(unlinkColaborador())
    }
    const save = () => { 
      dispatch(addColaborador())
    }
    useEffect(() => {
      dispatch(allColaboradores())
    },[dispatch])
    console.log('colaborador: ', colaborador)
    console.log('Colaboradores: ', colaboradores)
    return (
    <div className="col p-5 overflow-auto h-100">
      <Drawer 
      open={components.drawer} 
      onClose={() => setComponent('drawer', false)}
      size="sm"
      className="drawer" 
      >
        <Drawer.Body className="drawer">
          <h2>{behavior === 'create'  ? 'Cadastrar novo': 'Atualizar dados do'} Colaborador</h2>
          <div className="row mt-3">
          <div className="form-group col-12 mb-3">
            <p>E-mail</p>
            <div class="input-group mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="E-mail do colaborador"
                  disabled={behavior !== 'create'}
                  onChange={(e) => {
                    setColaborador('email', e.target.value);
                  }}
                  value={colaborador.mail}
                  />
                {behavior === 'create' && (
                  <div class="input-group-append">
                    <button
                      className="button"
                      disabled={form.filtering}
                      onClick={() => {
                        dispatch(
                          filterColaboradores({
                            filters: { email: colaborador.email, status: 'A' },
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
                placeholder="Nome colaborador"
                value={colaborador.nome}
                onChange={(e) => setColaborador('nome', e.target.value)}
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
                placeholder="Telefone colaborador"
                value={colaborador.telefone}
                onChange={(e) => setColaborador('telefone', e.target.value)}
                />
            </div>
          </div>
          <div className="form-group col-6">
            <p>Data Nascimento</p>
            <div className="input-group">
              <input 
                type="text"
                onfocus="(this.type='date')"
                disabled={form.disabled}
                className="form-control"
                placeholder={moment(colaborador.dataNascimento).format('DD/MM/YYYY')}
                value={moment(colaborador.dataNascimento).format('DD/MM/YYYY')}
                onChange={(e) => setColaborador('dataNascimento', e.target.value)}
                />
            </div>
 	        </div>
          <div className="form-group col-6">
            <p>Sexo</p>
            <select
              disabled={form.disabled}
              className="form-control"
              value={colaborador.sexo}
              onChange={(e) => setColaborador('sexo', e.target.value)}
              >
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            </select>  
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
            {behavior === 'create' ? 'Salvar' : 'Remover'} colaborador
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
            
            {'    '} &nbsp;Tem certeza que deseja excluir Colaborador?<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ação Irreversível!         
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
              Excluir Colaborador
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
          <h2 className="mb-4 mt-0">Colaboradores</h2>
          <div>
            <button 
              className="button"
              onClick={() =>{
                dispatch(resetColaborador())
                dispatch(updateColaborador({
                  behavior: 'create'
                }))
                setComponent('drawer', true)}
              }
              >
              <span className="mdi mdi-account-plus-outline"> Novo Colaborador</span>
            </button>
          </div>
        </div>
        <Tabela
           loading={form.filtering}
           data={colaboradores}
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
               fixed: true,
              },
             { 
               label: 'E-mail',
               key: 'email',
              width: 300,
              fixed: true,
             },
             { 
              label: 'Telefone',
              key: 'telefone',
              width: 150,
              fixed: true,
            }
          ]}
          actions={(Colaboradores) => (
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

export default Colaboradores