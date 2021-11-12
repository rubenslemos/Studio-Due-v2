import { Calendar, momentLocalizer } from 'react-big-calendar'
import React, { useEffect } from 'react'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHorario, allHorarios, allServicos,resetHorario, updateHorario, filterColaboradores } from '../../store/modules/horario/actions'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import 'moment/locale/pt-br'
import { Drawer, TagPicker, Checkbox} from 'rsuite'
import TimePicker from 'rc-time-picker'
import 'rc-time-picker/assets/index.css'
moment.locale('pt-br')

const localizer = momentLocalizer(moment)

const Horarios = () => {
  
  const dispatch = useDispatch()
  const { horarios, horario, servicos, components, behavior, form, colaboradores } = useSelector((state)=> state.Horarios)
  // horario.inicio = moment(horario.inicio).toDate()
  // horario.fim = moment(horario.fim).toDate()
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
  const setHorario = (key, value) => {
    dispatch( updateHorario({ horario: { ...horario, [key]: value }}))
  }
  const formatEventos = horarios.map((horario, index)=> horario.dias.map((dia) => ({
    title: `${horario.especialidades.length} serviço(s) e
    ${horario.colaboradores.length} colabs`,
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
  }))).flat()
  
  console.log('Horarios: ',horarios)
  console.log('Horario: ',horario)
  console.log('Serviços: ',servicos)
  console.log('Colaboradores: ',colaboradores)
  
  const save = () => { 
    dispatch(addHorario())
  }
  useEffect(() => {
   dispatch(allHorarios())
   dispatch(allServicos())
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
            <TimePicker
              placeholder={horario.inicio === "" || null ? `Inicio` : horario.inicio}
              defaultValue={horario.inicio}
              showSecond={false}
              minuteStep={30}
              onChange={(e) => setHorario('inicio', e)}
              inputIcon={<small className="mdi mdi-alarm-check ms-2"/>}
              className="d-flex justify-content-center align-items-center"
            />
          </div>
          <div className="form-group col-6">
            <p>Horário Final</p>  
            <TimePicker
              className="d-flex justify-content-center align-items-center"
              placeholder={horario.fim === "" || null ? "Final" : horario.fim}
              defaultValue={horario.fim}
              showSecond={false}
              minuteStep={30}
              onChange={(e) => setHorario('fim', e)}
              // className="mdi mdi-alarm-check"
              inputIcon={<small className="mdi mdi-alarm-check ms-2"/>}
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
                disabled={horario.colaboradores.length}
                checked={horario.colaboradores.length}
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
              if (behavior === 'create') {
                save();
              } else {
                setComponents('confirmDelete', true);
              }
            }}
            >
            Remover horario
          </button>)}
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
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
                localizer={localizer}
                date={diasSemanaData[moment().day()]}
                toolbar={false}
                popup
                selectable={true}
                events={formatEventos}
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