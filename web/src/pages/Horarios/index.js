import { Calendar, momentLocalizer } from 'react-big-calendar'
import React, { useEffect } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHorario, allHorarios, allServicos,resetHorario, updateHorario, filterColaboradores, removeHorario } from '../../store/modules/horario/actions'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/pt-br'
import { Drawer, TagPicker, Checkbox, Modal, Button, DatePicker} from 'rsuite'
import RemindFillIcon from '@rsuite/icons/RemindFill'
import 'rc-time-picker/assets/index.css'
import colors from '../../data/colors.json';
moment.locale('pt-br')

const localizer = momentLocalizer(moment)

const Horarios = () => {
  
  const dispatch = useDispatch()
  const { horarios, horario, servicos, components, behavior, form, colaboradores } = useSelector((state)=> state.Horarios)

  const diasDaSemana = [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado',
  ]

  const diasSemanaData = [
    new Date(2021, 3, 11, 0, 0, 0, 0),
    new Date(2021, 3, 12, 0, 0, 0, 0),
    new Date(2021, 3, 13, 0, 0, 0, 0),
    new Date(2021, 3, 14, 0, 0, 0, 0),
    new Date(2021, 3, 15, 0, 0, 0, 0),
    new Date(2021, 3, 16, 0, 0, 0, 0),
    new Date(2021, 3, 17, 0, 0, 0, 0)
  ]

  const setComponents = (component, state) => {
    dispatch(
      updateHorario({
        components: { ...components, [component]: state },
      })
    )
  }
  
  const onHorarioClick = (horario) => {
    dispatch(
      updateHorario({
        horario,
        behavior: 'update',
      })
    )
    setComponents('drawer', true)
  }

  const setHorario = (key, value) => {
    dispatch( updateHorario({ horario: { ...horario, [key]: value }}))
  }
  const formatEventos = () => {
    let listaEventos = [];
    // eslint-disable-next-line array-callback-return
    horarios.map((horario, index) => {
      
      // eslint-disable-next-line array-callback-return
      horario.dias.map((dia) => {
        listaEventos.push({
          resource: {...horario, backgroundColor: colors[index]},
          title: `${horario.especialidades.length} espec. e ${horario.colaboradores.length} colab. disponíveis`,
          start: new Date(
            diasSemanaData[dia].setHours(
              parseInt(moment(horario.inicio).format('HH')),
              parseInt(moment(horario.inicio).format('mm'))
            )
          ),
          end: new Date(
            diasSemanaData[dia].setHours(
              parseInt(moment(horario.fim).format('HH')),
              parseInt(moment(horario.fim).format('mm'))
            )
          ),
        })
      })
    })

    return listaEventos;
  }
  
  console.log('Horarios: ',horarios)
  console.log('Horario: ',horario)
  console.log('Serviços: ',servicos)
  console.log('Colaboradores: ',colaboradores)
  
  const save = () => { 
    dispatch(addHorario())
  }

  const remove = () => {
    dispatch(removeHorario());
  };

  useEffect(() => {
   dispatch(allHorarios())
   dispatch(allServicos())
   dispatch(filterColaboradores())
  },[dispatch])

  useEffect(() => {
    dispatch(filterColaboradores());
  }, [dispatch, horario.especialidades]);

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
            <p>Dias da Semana</p>
            <TagPicker
              size='lg'
              block
              value={horario.dias}
              data={diasDaSemana.map((label, value) => ({ label, value}))}
              onChange={(value) => {
                setHorario('dias', value)
              }}
            />
            <Checkbox
            disabled={horario.dias.length === diasDaSemana.length}
            checked={horario.dias.length === diasDaSemana.length}
            onChange={(v, selected) => {
              setHorario('dias', diasDaSemana.map((label, value) => value))
            }}
            >
              {' '} Selecionar Todos
            </Checkbox>
          </div>
          <div className="form-group col-6">
            <p>Horário Inicial</p>
              <DatePicker
                block
                placeholder={horario.inicio === "" || null ? `Início` : moment(horario.inicio).format("HH:mm")}
                format="HH:mm"
                hideMinutes={(min) => ![0, 30].includes(min)}
                onChange={(e) => {
                  setHorario('fim', e);
                }}
              />
          </div>
          <div className="form-group col-6">
            <p>Horário Final</p>  
              <DatePicker
                block
                placeholder={horario.fim === "" || null ? `Fim` : moment(horario.fim).format("HH:mm")}
                format="HH:mm"
                hideMinutes={(min) => ![0, 30].includes(min)}
                onChange={(e) => {
                  setHorario('fim', e);
                }}
              />
          </div>          
          <div className="col-12">
            <p>Especialidades</p>
            <TagPicker
              size="lg"
              block
              data={servicos}
              disable={horario.especialidades.length === servicos.length}
              checked={horario.especialidades.length === servicos.length}
              value={horario.especialidades}
              onChange= {(especialidade) => setHorario('especialidades', especialidade)}
            />
          </div>
          <Checkbox
                checked={horario.especialidades?.length === servicos.length}
                disabled={horario.especialidades?.length === servicos.length}
                onChange={(v, checked) => {
                  if (checked) {
                    setHorario(
                      'especialidades',
                      servicos.map((s) => s.value)
                    );
                  } else {
                    setHorario('especialidades', []);
                  }
                }}
              >
                {' '}
                Selecionar Todas
              </Checkbox>
              <div className="col-12">
              <p>Colaboradores disponíveis</p>
              <TagPicker
                size="lg"
                block
                data={colaboradores}
                disabled={horario.especialidades.length === 0}
                value={horario.colaboradores}
                onChange={(e) => {
                  setHorario('colaboradores', e);
                }}
              />
              <Checkbox
                disabled={horario.colaboradores.length === servicos.length}
                checked={horario.colaboradores.length === servicos.length} 
                onChange={(v, selected) => {
                  if (selected) {
                    setHorario(
                      'colaboradores',
                      colaboradores.map((s) => s.value)
                    );
                  } else {
                    setHorario('colaboradores', []);
                  }
                }}
              >
                {' '}
                Selecionar Todos
              </Checkbox>
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
              onClick={() => remove()}
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
          <h2 className="mb-4 mt-0">Horarios</h2>
            <div>
              <button 
                className="button"
                onClick={() =>{
                  dispatch(resetHorario())
                  dispatch(updateHorario({                  
                    behavior: 'create',
                    components: {
                      ...components,
                      drawer: true,
                  }}))}}
                >
                <span className="mdi mdi-account-plus-outline"> Novo Horario</span>
              </button>
            </div>
            </div>
              <Calendar
                onSelectEvent={e=> {
                  onHorarioClick(e.resource)
                }}
                onSelectSlot={(slotInfo) =>{
                  const { start, end} = slotInfo
                  dispatch(
                    updateHorario({
                      behavior: 'create',
                      horario: {
                        ...horario,
                        dias: [moment(start).day()],
                        inicio: start, 
                        fim: end
                      }
                    })
                  )
                  setComponents('drawer', true)
                }}
                localizer={localizer}
                date={diasSemanaData[moment().day()]}
                toolbar={false}
                popup
                selectable={true}
                events={formatEventos()}
                eventPropGetter={(event, start, end, isSelected) => {
                  return {
                    style: {
                      backgroundColor: event.resource.backgroundColor,
                      borderColor: event.resource.backgroundColor,
                    },
                  }
                }}
                defaultView="week"
                style={{ height: 700, width: 1500 }}
                formats={{
                  dateFormat: 'dd',
                  dayFormat: (date, culture, localizer) => localizer.format(date, 'dddd', culture)
                }}
              />
      </div>
    </div>
  </div>
  )
}

export default Horarios