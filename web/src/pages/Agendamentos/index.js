/* eslint-disable array-callback-return */
import { Calendar, momentLocalizer } from 'react-big-calendar'
import React, { useEffect } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { filterAgendamentos, updateAgendamento, updateAgendamentos, allClientes, allServicos, filterAgenda, saveAgendamento } from '../../store/modules/agendamento/actions'
import { Drawer, Modal, Button, SelectPicker} from 'rsuite'
import RemindFillIcon from '@rsuite/icons/RemindFill'
import util from '../../util'
import utils from '../../services/util'
const localizer = momentLocalizer(moment)
const Agendamentos = () => {
  const dispatch = useDispatch()
  const { 
    agendamentos, 
    components,
    behavior, 
    form, 
    agendamento, 
    clientes, 
    servicos, 
    agenda,
    colaboradores } = useSelector((state)=> state.agendamento)
  console.log('agendamento',agendamento)
  console.log('agenda',agenda)
  console.log('colaboradores',colaboradores)
  console.log('agendamentos',agendamentos)
  console.log('clientes',clientes)
  console.log('servicos',servicos)
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
      const servico = servicos.filter ((s) => s._id === agendamento.servicoId)[0]
      const dataSelecionada = moment(agendamento.data).format('YYYY-MM-DD')
      const horaSelecionada = moment(agendamento.data).format('HH:mm')
      const {horariosDisponiveis, colaboradoresDia} = utils.selectAgendamento( agenda, dataSelecionada, agendamento.colaboradorId)
      console.log('servico',servico)
      console.log('agendamento.data',agendamento.data)
      console.log('dataSelecionada',dataSelecionada)
      console.log('horaSelecionada',horaSelecionada)
      console.log('horariosDisponiveis',horariosDisponiveis)
      console.log('colaboradoresDia',colaboradoresDia)
      var livres = []
      horariosDisponiveis.length >0 && horariosDisponiveis.map((horario) => {
      livres.push({ 
        label: horario[0],
        value:horario[0]
      })
    })
    var colaboradoresIdsDisponiveis =[]
    for(let colaboradorId of Object.keys(colaboradoresDia)) {
      let horarios = colaboradoresDia[colaboradorId].flat(2)
      if (horarios.includes(horaSelecionada)){
        colaboradoresIdsDisponiveis.push(colaboradorId)
      }
    }
  console.log("livres: ", livres)
  console.log("colaboradoresIdsDisponiveis: ", colaboradoresIdsDisponiveis)
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
    dispatch(saveAgendamento())
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
  const setAgendamentoData = (value, isTime=false) => {
    const {horariosDisponiveis} = utils.selectAgendamento(
      agenda,
      isTime ? dataSelecionada : value
    )
    let data = !isTime
      ? `${value}T${horariosDisponiveis[0][0]}`
      : `${dataSelecionada}T${value}`
      console.log('data selecionada',dataSelecionada)
      console.log('data',data)
    setAgendamento('data', data)
  }
  useEffect(() => {
    dispatch(filterAgendamentos(
       moment().weekday(0).format('YYYY-MM-DD'),
       moment().weekday(6).format('YYYY-MM-DD')
    ))
    dispatch(allClientes())
    dispatch(allServicos())
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
              disable={(form.disabled && behavior === 'create')}
              valueKey= 'value'
              value={clientes.value}
              onChange= {(value) => {setAgendamento('clienteId', value)}}
            />
          </div>          
          <div className="form-group col-12">
            <p>Servico</p>
            <SelectPicker
              size="lg"
              block
              data={servicos}
              value={servicos.value}
              onChange= {(s) => {
                setAgendamento('servicoId', s)
                dispatch(filterAgenda())
            }}
            />
          </div>
          <div className="form-group col-6">
            <p>Dia</p>
            <SelectPicker
              size='lg'
              block
              data={agenda}
              value={agenda.value}
              onChange={(agenda)=>{
                const date = moment(agenda.value).format('YYYY-MM-DD')
                const dateISO = moment(date).format('YYYY-MM-DD')
                console.log('dateISO',dateISO)
                setAgendamentoData(dateISO)
              }}
            />
          </div>          
          <div className="form-group col-6">
            <p>Horário </p>
            <SelectPicker
              size='lg'
              block
              data={livres}
              value={livres.value}
              onChange={(horario)=>{
                setAgendamentoData(horario, true)
              }}
            />
          </div>
          <div className="col-12">
            <p>Colaboradores disponíveis</p>
            <SelectPicker
              size="lg"
              block
              data={colaboradores}
              onChange={(e) => {setAgendamento('colaboradorId', e)
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