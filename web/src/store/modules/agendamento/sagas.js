import { all, takeLatest, call, put , select} from 'redux-saga/effects'
import api from '../../../services/api'
import consts from '../../../consts.js'
import types from './types'
import { updateAgendamento, resetAgendamento, updateAgendamentos, updateAgenda, updateColaboradores, updateForm } from './actions'
import moment from 'moment'
import util from '../../../services/util'
export function* addAgendamento (){ 
  const { form, agendamentos, components} = yield select(state => state.agendamento) 
  try{
    yield put(updateAgendamento({ form: { ...form, saving: true}}))

      const { data: res} = yield call(api.post, '/agendamento',{
        ...agendamentos,
        salaoId: consts.salaoId,
      })
      if (res.error){
        alert(res.message)
        return false
      }
      yield put(updateAgendamento({ 
        components: {
          ...components,
          drawer: false
        }
      }))
      yield put(resetAgendamento())
 }catch(err){
    yield put(updateAgendamento({ form: {...form, saving: false}}))
    alert(err.message)
 }
}
export function* filterAgendamento({start, end}){
  try {
    const {data: res} = yield call(api.post, '/agendamento/filter', {
      "salaoId": consts.salaoId,
      "periodo":{
        "inicio":start,
        "final": end
      },
    })
    if (res.error){
      alert(res.message)
      return false
    }
    yield put(updateAgendamento(res.agendamentos))
  } catch (err) {
    alert(err.message)
  }
}

export function* allClientes(){
  const { form } = yield select(state => state.agendamento)
  try {
  const {data: res} = yield call(api.get, `/salao/cliente/${consts.salaoId}`)
  yield put(updateAgendamentos({
    form: {
      ...form,
      filtering: false
    }
  }))
  if(res.error) {
    alert(res.message)
    return false
  }
  yield put(updateAgendamentos({
    clientes: res.clientes
  }))
} catch (err) {
  // eslint-disable-next-line no-unused-expressions
  alert(err.message)
}
}
export function* allServicos (){
  const { form } = yield select(state => state.agendamento)
  try {
    yield put(updateAgendamentos({
      form: {
        ...form,
        filtering: true
      }
    }))
    const {data: res} = yield call(
      api.get,
      `/servico/salao/${consts.salaoId}`
    )
    yield put(updateAgendamentos({
      form: {
        ...form,
        filtering: false
      }
    }))
    if(res.error) {

      alert(res.message)
      return false
    }
    yield put(updateAgendamentos({ servicos: res.servicos}))
  } catch (err) {
    yield put(updateAgendamentos({
      form: {
        ...form,
        filtering: false
      }
    }))
  }
}
export function* filterAgenda(){
  try {
    const { agendamento, agenda } = yield select((state) => state.agendamento)
    const finalStartDate =
      agenda.length === 0
        ? moment().format('YYYY-MM-DD')
        : Object.keys(agenda[0])[0]
    console.log('finalStartDate: ',finalStartDate)    
    const { data: res} = yield call(api.post, `/agendamento/dias-disponiveis`, {
      ...agendamento,
      data: finalStartDate
    })
    if (res.error){
     alert(res.message)
     console.log("if erro ",res.message)
     return false
   }
   yield put(updateAgenda(res.agenda))
   yield put(updateColaboradores(res.colaboradores))
   const {horariosDisponiveis, data, colaboradorId} = yield call(util.selectAgendamento, res.agenda)
   const finalDate = moment(`${data}T${horariosDisponiveis[0][0]}`).format();
   yield put(updateAgendamentos({ data: finalDate,  colaboradorId: colaboradorId}))
  } catch (err) {
    alert(err.message)
    console.log("catch erro", err.message)
  }
}

export function* saveAgendamento(){ 
  try{
    yield put(updateForm({saving: true}))

    const {agendamento} = yield select((state) => state.agendamento)
    const {data: res} = yield call(api.post,`/agendamento`, agendamento )
    if (res.error){
      alert(res.message)
      return false
    }
    
    alert('Agendamento realizado com sucesso')

    yield put(updateForm({saving: false}))
  } 
  catch(err){
    alert(err.message)
  }
}
export default all ([
  takeLatest(types.FILTER_AGENDAMENTO, filterAgendamento),
  takeLatest(types.ADD_AGENDAMENTO, addAgendamento),
  takeLatest(types.ALL_CLIENTES, allClientes),
  takeLatest(types.ALL_SERVICOS, allServicos),
  takeLatest(types.FILTER_AGENDA, filterAgenda),
  takeLatest(types.SAVE_AGENDAMENTO, saveAgendamento)
])
