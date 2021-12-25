import { all, takeLatest, call, put , select} from 'redux-saga/effects'
import api from '../../../services/api'
import consts from '../../../consts.js'
import types from './types'
import { updateAgendamento, resetAgendamento, updateAgendamentos } from './actions'

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
  console.log("RES",res)
  yield put(updateAgendamentos({
    clientes: res.cliente
  }))
} catch (err) {
  // eslint-disable-next-line no-unused-expressions
  alert(err.message)
}
}
export default all ([
  takeLatest(types.FILTER_AGENDAMENTO, filterAgendamento),
  takeLatest(types.ADD_AGENDAMENTO, addAgendamento),
  takeLatest(types.ALL_CLIENTES, allClientes)
])
