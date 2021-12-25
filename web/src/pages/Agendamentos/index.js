/* eslint-disable array-callback-return */
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useEffect } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { filterAgendamentos, addAgendamento, updateAgendamento, updateAgendamentos, allClientes } from '../../store/modules/agendamento/actions'
import { Drawer, TagPicker, Modal, Button, DatePicker, SelectPicker} from 'rsuite'
import RemindFillIcon from '@rsuite/icons/RemindFill'
import util from '../../util'
const localizer = momentLocalizer(moment)
const Agendamentos = () => {
  const dispatch = useDispatch()
  const { agendamentos, components, behavior, form, agendamento, clientes } = useSelector((state)=> state.agendamento)
  console.log('agendamento',agendamento)
  console.log('agendamentos',agendamentos)
  console.log('clientes',clientes)
  const formatEventos = () => {
    let listaEventos = [] 
    agendamentos.length>0 && agendamentos.map((agendamento) => {
    listaEventos.push({   
      resource: { agendamento },
      title: `${agendamento.servicoId.titulo} - ${agendamento.clienteId.nome} - ${agendamento.colaboradorId.nome}`,
      start: moment(agendamento.data).toDate(),
      end: moment(agendamento.data)
        .add(
          util.hourToMinutes(
            moment(agendamento.servicoId.duracao).format('HH:mm')
          ),
          'minutes'
        )
        .toDate()
    })
    })
    return listaEventos
  }

  const setComponents = (component, state) => {
    dispatch(
      updateAgendamentos({
        components: { ...components, [component]: state },
      })
    )
  }
  const setAgendamento = (key, value) => {
    dispatch(updateAgendamentos({
      agendamento: {
        ...agendamento,
        [key]: value
      }
    }))
  }
  const setClienteId = (key, value) => {
    dispatch(
      updateAgendamentos({
        agendamento: {
          ...agendamento,
          clienteId: { ...agendamento.clienteId, [key]: value },
        },
      })
    );
  };
  const onHorarioClick = (horario) => {
    dispatch(
      updateAgendamento({
        agendamentos,
        behavior: 'create',
      })
    )
    setComponents('drawer', true)
  }
  const save = () => { 
    dispatch(addAgendamento())
  }
  const formatRange = (periodo) => {
    let finalRange = {}
    if (Array.isArray(periodo)) {
      finalRange = {
        start: moment(periodo[0]).format('YYYY-MM-DD'),
        end: moment(periodo[periodo.length-1]).format('YYYY-MM-DD')
      }
    }else{
      finalRange = {
        start: moment(periodo.start).format('YYYY-MM-DD'),
        end: moment(periodo.end).format('YYYY-MM-DD')
      }
    }
    return finalRange
  }

  useEffect(() => {
    dispatch(filterAgendamentos(
       moment().weekday(0).format('YYYY-MM-DD'),
       moment().weekday(6).format('YYYY-MM-DD')
    ))
    dispatch(allClientes())
  },[dispatch])
  return (
    <div className="col p-5 overflow-auto h-100">
     <Drawer 
      open={components.drawer} 
      onClose={() => setComponents('drawer', false)}
      size="sm"
      className="drawer" 
      >
        <Drawer.Body className="drawer">
          <h2>{behavior === 'create'  ? 'Cadastrar novo': 'Atualizar '} Agendamento</h2>
          <div className="row mt-3">
          <div className="form-group col-12">
            <p>Cliente</p>
            <SelectPicker
              size="lg"
              block
              data={clientes}
              disable={form.disabled && behavior === 'create'}
              value={agendamento.clienteId.nome}
              onChange= {(value) => {
                setClienteId('nome', value)
              }}
            />
          </div>          
          <div className="form-group col-12">
            <p>Servico</p>
            <TagPicker
              size="lg"
              block
              data={agendamentos}
              
              value={agendamentos?.clienteId?.nome}
              onChange= {(cliente) => setAgendamento('clienteId.nome', cliente)}
            />
          </div>
          <div className="form-group col-6">
            <p>Dia</p>
              <DatePicker
                block
                format="DD-MM-YYYY"
                hideMinutes={(min) => ![0, 30].includes(min)}
                onChange={(e) => {}}
              />
          </div>
          <div className="form-group col-6">
            <p>Horário</p>  
              <DatePicker
                block
                format="HH:mm"
                hideMinutes={(min) => ![0, 30].includes(min)}
                onChange={(e) => {

                }}
              />
          </div>          

              <div className="col-12">
              <p>Colaboradores disponíveis</p>
              <TagPicker
                size="lg"
                block

                onChange={(e) => {
                  
                }}
              />
            </div>
            <div className="form-group col-12">
              <p></p>
              <button
                className='button mx-auto save'
                loading={form.saving}
                onClick={() => save()}
              >
                {behavior === 'create' ? "Salvar" : "Atualizar"} Agendamento
              </button> 
            <p></p>
            {behavior ==='update' && (
            <button
            className="button mx-auto save"
            loading={form.saving}
            onClick={() => {
                setComponents('confirmDelete', true);
              }
            }
            >
            Remover horario
          </button>)}
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
      <Modal
        open={components.confirmDelete}
        onHide={() => setComponents('confirmDelete', false)}
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
            
            {'    '} &nbsp;Tem certeza que deseja excluir Horario?<br/> 
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ação Irreversível!         
        </Modal.Body>
        <Modal.Footer>
            <Button
              loading={form.saving}
              // onClick={() => remove()}
              color="red"
              appearance="primary"
              style={{
                fontFamily: 'Ubuntu',
                fontSize: 16,
                fontWeight: '500'
              }}
              >
              Excluir Horario
            </Button>
            <Button
              onClick={() => setComponents('confirmDelete', false)}
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
          <h2 className="mb-4 mt-0">Agendamento</h2>
            <div>
              <button 
                className="button"
                onClick={() =>{
                  dispatch(updateAgendamentos({                  
                    behavior: 'create',
                    components: {
                      ...components,
                      drawer: true
                    }}))
                }}
                >
                <span className="mdi mdi-calendar-multiple-check"> Novo Agendamento</span>
              </button>
            </div>
            </div>
          <Calendar
            localizer={localizer}
            onSelectEvent={e=> {
              onHorarioClick(e.resource)
            }}
            onRangeChange={(periodo) => {
              const {start, end} = formatRange(periodo)
              dispatch(filterAgendamentos(start, end))
            }}
            onSelectSlot={(slotInfo) =>{
              const { data} = slotInfo
              dispatch(
                updateAgendamento({
                  behavior: 'create',
                  horario: {
                    ...agendamentos,
                    data: [moment(data).toDate()]
                  }
                })
              )
              setComponents('drawer', true)
            }}
            events={formatEventos()}
            selectable
            popup
            defaultView="week"
            style={{ height: 700 }}
          />
        </div>
      </div>
    </div>
  )
}

export default Agendamentos