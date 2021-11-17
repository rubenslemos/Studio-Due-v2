/* eslint-disable array-callback-return */
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useEffect } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { filterAgendamentos, addAgendamento, resetAgendamento, updateAgendamento } from '../../store/modules/agendamento/actions'
import { Drawer, TagPicker, Checkbox, Modal, Button, DatePicker} from 'rsuite'
import RemindFillIcon from '@rsuite/icons/RemindFill'
import util from '../../util'
const localizer = momentLocalizer(moment)
const Agendamentos = () => {
  const dispatch = useDispatch()
  const { agendamentos, components, behavior, form } = useSelector((state)=> state.agendamento)

  // const formatEventos =agendamentos.map((agendamento) => ({
  //   title: `Servico: ${agendamento.servicoId.titulo} - Cliente: ${agendamento.clienteId.nome} - Colaborador: ${agendamento.colaboradorId.nome}`,
  //   start: moment(agendamento.data).toDate(),
  //   end: moment(agendamento.data).add(
  //     util.hourToMinutes(
  //       moment(agendamento.servicoId.duracao).format('HH:mm')
  //     ), 'minutes'
  //   ).toDate()    
  // }))
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
    console.log('formatEventos', listaEventos)
    return listaEventos
  }
  console.log('Agendamentos', agendamentos)
  const setComponents = (component, state) => {
    dispatch(
      updateAgendamento({
        components: { ...components, [component]: state },
      })
    )
  }
  const setAgendamentos = (key, value) => {
    dispatch( updateAgendamento({ horario: { ...agendamentos, [key]: value }}))
  }
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
          <h2>{behavior === 'create'  ? 'Cadastrar novo': 'Atualizar '} Horario</h2>
          <div className="row mt-3">
            <div className="form-group col-12">

            </div>
            <div className="form-group col-6">

            </div>
            <div className="form-group col-6">

            </div>          
            <div className="col-12">

            </div>

            <div className="col-12">

            </div>
            <div className="form-group col-12">
              <p></p>
              <button
                className='button mx-auto save'
                loading={form.saving}
                onClick={() => save()}
              >
                {behavior === 'create' ? "Salvar" : "Atualizar"} Horario
              </button> 
              <p></p>
              {behavior ==='update' && (
              <button
                className="button mx-auto save"
                loading={form.saving}
                onClick={() => {
                  setComponents('confirmDelete', true);
                }}
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
                  dispatch(resetAgendamento())
                  dispatch(updateAgendamento({                  
                    behavior: 'create',
                    components: {
                      ...components
                  }}))
                  setComponents('drawer', true)
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