import Tabela from '../../components/Table'
import 'rsuite/dist/rsuite.css'
import moment from 'moment'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RemindFillIcon from '@rsuite/icons/RemindFill'
import bancos from '../../data/bancos.json'
import vinculo from '../../data/vinculo.json'
import tipo from '../../data/TipoConta.json'
import { 
  allColaboradores, 
  updateColaborador, 
  filterColaboradores, 
  addColaborador, 
  resetColaborador,
  unlinkColaborador,
  allServicos
} from '../../store/modules/colaborador/actions'
import { 
  Drawer, 
  Modal, 
  Button, 
  TagPicker, 
  SelectPicker, 
  Checkbox, 
  Message
} from 'rsuite'
const Colaboradores = () => {
  
  const dispatch = useDispatch()
  const { colaborador, colaboradores, form, behavior, components, servicos } = useSelector((state) => state.Colaboradores)

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
        ...colaborador,
        [key]: value
      }
    }))
  }

  const setContaBancaria = (key, value) => {
    dispatch(
      updateColaborador({
        colaborador: {
          ...colaborador,
          contaBancaria: { ...colaborador.contaBancaria, [key]: value },
        },
      })
    );
  };
  console.log ("colaborador: ", colaborador)
  console.log ("colaboradores: ", colaboradores)
  console.log ("Servicos: ", servicos)

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
      dispatch(allServicos())
    },[dispatch])
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
                  class="form-control rounded-end"
                  placeholder={behavior === 'create' ? "E-mail do colaborador" : colaborador.email}
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
            <p>Telefone/WhatsApp</p>
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
          <div className="form-group col-3">
            <p>Vinculo</p>
            <SelectPicker
              block
              size='lg'
              disabled={form.disabled && behavior === 'create'}
              data={vinculo}
              value={colaborador.status}
              onChange={(status) => setColaborador('status', status)}
            />
          </div>
          <div className="form-group col-5">
            <p>Data Nascimento</p>
            <div className="input-group">
              <input 
                type={behavior === 'create' ? 'date' : 'text'} 
                disabled={form.disabled && behavior === 'create'}
                className="form-control"
                value={behavior !== 'create' ? moment(colaborador.dataNascimento).format('DD/MM/YYYY') : null}
                onChange={(e) => setColaborador('dataNascimento', e.target.value)}
              />
            </div>
 	        </div>
          <div className="form-group col-4">
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
          <div className="col-12">
            <p>Especialidades</p>
            <TagPicker
              size="lg"
              block
              data={servicos}
              disable={form.disabled && behavior === 'create'}
              value={colaborador.especialidades}
              onChange= {(especialidade) => setColaborador('especialidades', especialidade)}
            />
          </div>
          <Checkbox
                checked={colaborador.especialidades?.length === servicos.length}
                disabled={
                  (form.disabled && behavior === 'create') ||
                  colaborador.especialidades?.length === servicos.length
                }
                onChange={(v, checked) => {
                  if (checked) {
                    setColaborador(
                      'especialidades',
                      servicos.map((s) => s.value)
                    );
                  } else {
                    setColaborador('especialidades', []);
                  }
                }}
              >
                {' '}
                Selecionar Todas
              </Checkbox>
              <div className="form-group col-12">
              <Message
                showIcon
                closable
                type="info"
                header="Aten????o ao preencher as informa????es banc??rias do colaborador."
              />
              </div>
              <div className="form-group col-6">
              <p>Titular da Conta</p>
              <input
                type="text"
                className="form-control"
                placeholder='Titular da Conta'
                disabled={form.disabled}
                value={colaborador.contaBancaria.titular}
                onChange={(e) => setContaBancaria('titular', e.target.value)}
                />
            </div>
            <div className="form-group col-6">
              <p>CPF/CNPJ</p>
              <input
                className="form-control"
                type="text"
                placeholder='CPF/CNPJ do Titular'
                disabled={form.disabled}
                value={colaborador.contaBancaria.cpfCnpj}
                onChange={(e) => setContaBancaria('cpfCnpj', e.target.value)}
                />
            </div>
            <div className="form-group col-6">
              <p>Banco</p>
              <SelectPicker
                disabled={form.disabled && behavior === 'create'}
                value={colaborador.contaBancaria.Banco}
                block
                data={bancos}
                onChange={(value) => setContaBancaria('Banco', value)}
                size='lg'
                />
            </div>
            <div className="form-group col-6">
            <p>Tipo de Conta</p>
            <SelectPicker
              block
              size='lg'
              disabled={form.disabled}
              value={colaborador.contaBancaria.TipoConta}
              data={tipo}
              onChange={(e) => setContaBancaria('TipoConta', e)}
              />
            
          </div>
          <div className="form-group col-6">
              <p>Ag??ncia</p>
              <input
                type="text"
                className="form-control"
                placeholder='Ag??ncia bancaria'
                disabled={form.disabled}
                value={colaborador.contaBancaria.agencia}
                onChange={(e) => setContaBancaria('agencia', e.target.value)}
                />
            </div>
            <div className="form-group col-3">
              <p>Conta</p>
              <input
                type="text"
                className="form-control"
                placeholder='Conta'
                disabled={form.disabled}
                value={colaborador.contaBancaria.numero}
                onChange={(e) => setContaBancaria('numero', e.target.value)}
                />
            </div>            
            <div className="form-group col-3">
              <p>D??gito</p>
              <input
                type="text"
                className="form-control"
                placeholder='D??gito'
                disabled={form.disabled}
                value={colaborador.contaBancaria.dv}
                onChange={(e) => setContaBancaria('dv', e.target.value)}
                />
            </div>
            <div className="form-group col-12">
              <p></p>
              <button
                className='button mx-auto save'
                loading={form.saving}
                onClick={() => save()}
              >
                {behavior === 'create' ? "Salvar" : "Atualizar"} Colaborador
              </button> 
            <p></p>
            {behavior ==='update' && (
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
            Remover colaborador
          </button>)}
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
          fontSize: 15,
          fontWeight: '500'
        }}
        >
              <RemindFillIcon
              style={{
                color: '#d40000',
                fontSize: 25,
              }}
              />
            
            {'    '} &nbsp;Tem certeza que deseja excluir Colaborador?<br/> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; A????o Irrevers??vel!         
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
                  behavior: 'create',
                  components: {
                    ...components,
                    tab: 'dados-cadastrais',
                    drawer: true,
                  }
                }))
                //setComponents('tab', 'dados-cadastrais')
                //setComponent('drawer', true)}
              }}
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
            },
            { 
              label: 'Sexo',
              key: 'sexo',
              content: (colaboradores) => colaboradores.sexo === "M" ? "Masculino" : "Feminino",
              width: 100,
              fixed: true
           },
           {
            label: 'Especialidades',
            key: 'servicos'
           },
           { 
             label: 'Vinculo',
             key: 'status',
             width: 80,
             fixed: true,
             content: (e) => e.status === 'A' ? "Ativo" : "Inativo"
           },
             { 
               label: 'Data Cadastro',
               key: 'dataCadastro',
               width: 100,
               fixed: true,
               content: (colaboradores) => moment(colaboradores.dataCadastro).format('DD/MM/YYYY')
              }
          ]}
          actions={(Colaboradores) => (
            <button 
              className="button bt"
            >
              Mais Informa????es
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