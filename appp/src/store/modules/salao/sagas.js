<<<<<<< HEAD
 import {takeLatest, all, call, put, select} from 'redux-saga/effects'
 import api from '../../../services/api'
 import moment from 'moment'
 import consts from '../../../consts'
 import {updateSalao, updateServicos, updateAgenda, updateColaboradores, updateAgendamento} from './actions'
 import types from './types'
 import util from '../../../util'
 export function* getSalao(){ 
   try{
   
    const {data: res} = yield call(api.get,`/salao/${consts.salaoId}`)
    console.log(res)
    
    if (res.error){
      alert(res.message)
      return false
    }

    yield put(updateSalao(res.salao))
  } 
  catch(err){
    alert(err.message)
  }
 }

 export function* allServicos(){ 
   try{
    let res = {}
    const response = yield call(api.get,`/servico/salao/${consts.salaoId}` )
    res = response.data
    if (res.error){
      alert(res.message)
      return false
    }

    yield put(updateServicos(res.servicos))
  } 
  catch(err){
    alert(err.message)
  }
 }
 export function* filterAgenda(){ 
   try{
    const {agendamento, agenda} =yield select((state) => state.salao)
    
    const finalStartDate = 
      agenda.length === 0 
        ? moment().format('YYYY-MM-DD')
        : Object.keys(agenda[0])[0]
    
        console.tron.log('FinalStartDate: ',finalStartDate)
        console.tron.log('agenda: ',agenda)
    const {data: res} = yield call(api.post,'/agendamento/dias-disponiveis/',{
      ...agendamento,
      data: finalStartDate
    })
    if (res.error){
      alert(res.message)
      return false
    }
    const { horariosDisponiveis, data, colaboradorId } = yield call(util.selectAgendamento, res.agenda)
    yield put(updateAgenda(res.agenda))
    const finalDate = moment(`${data}T${horariosDisponiveis[0][0]}`).format()
    yield put(updateColaboradores(res.colaboradores))
    yield put(updateAgendamento('data', finalDate))
    yield put(updateAgendamento('colaboradorId', colaboradorId))
  } 
  catch(err){
    console.log(err.message)
  }
 }
 export default all ([
  takeLatest(types.GET_SALAO, getSalao),
  takeLatest(types.ALL_SERVICOS, allServicos),
  takeLatest(types.FILTER_AGENDA, filterAgenda)

])
=======
 import {takeLatest, all} from 'redux-saga/effects'

 export default all ([])
>>>>>>> parent of 2f146e3 (erro pra pegar infos do salao)
