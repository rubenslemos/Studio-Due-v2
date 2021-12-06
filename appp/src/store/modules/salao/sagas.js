 import {takeLatest, all, call, put} from 'redux-saga/effects'
 import api from '../../../services/api'
 import consts from '../../../consts'
 import {updateSalao} from './actions'
 import types from './types'
 export function* getSalao(){ 
   try{
    let res = {}
    const response = yield call(api.get,`/salao/${consts.salaoId}` )
    res = response.data
    if (res.error){
      alert(res.message)
      return false
    }
    console.log("res", res)
    yield put(updateSalao({salao: res.salao}))
  } 
  catch(err){
    alert(err.message)
  }
 }
 export default all ([takeLatest(types.GET_SALAO, getSalao)])