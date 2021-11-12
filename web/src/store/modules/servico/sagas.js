import { takeLatest, all, call, put, select } from 'redux-saga/effects'
import { updateServico, allServicos as allServicosAction, resetServico } from './actions'
import types from './types'
import api from '../../../services/api'
import consts from '../../../consts'
export function* allServicos (){ 
  const { form } = yield select(state => state.Servicos)
  try {
    yield put(updateServico({
      form: {
        ...form,
        filtering: true
      }
    }))
    const {data: res} = yield call(api.get, `/servico/salao/${consts.salaoId}`)
    yield put(updateServico({
      form: {
        ...form,
        filtering: false
      }
    }))
    if(res.error) {
      alert(res.message)
      console.log(res.message)
      return false
    }
    yield put(updateServico({
      servicos: res.Servicos
    }))
  } catch (err) {
    // eslint-disable-next-line no-unused-expressions
    yield put(updateServico({
      form: {
        ...form,
        filtering: false
      }
    }))
    alert(err.message)
    console.log(err.message)
  }
}
export function* addServico (){ 
  const { form, servico, components, behavior} = yield select(state => state.Servicos)
  try {
    yield put(updateServico({ form: {...form, saving: true}}))
    
    const formData = new FormData()
    
    formData.append('servico', JSON.stringify(({ ...servico, recipientId: consts.salaoId})))
    formData.append('salaoId', consts.salaoId)
    servico.arquivo.map((a, i) => {
      formData.append(`arquivo`, a)
      return true
    })
    const {data: res} = yield call(api[behavior === 'create' ? "post" : "put"], 
      behavior === 'create' ? `/servico` : `/servico/${servico._id}`, formData)

    yield put(updateServico({ form: { ...form, saving: false }}))

      if(res.error) {

        alert(res.message)
        return false
      }
      yield put(allServicosAction())
      yield put(updateServico({
        components: {
          ...components,
          drawer: false
        }
      }))

      yield put(resetServico())
    } catch (err) {

      yield put(updateServico({
        form: {
          ...form,
          saving: false
        }
      }))
    alert(err.message)
  }
}
export function* removeServico (){ 
  const { form, servico, components } = yield select(state => state.Servicos)
  try {
    yield put(updateServico({
      form: {
        ...form,
        saving: true
      }
    }))
    let res = {}
    const response = yield call( api.delete, `/servico/${servico._id}`)
    res = response.data
      yield put(updateServico({ form: {...form, saving: false }}))

      if(res.error) {
        alert(res.message)
        return false
      }
      yield put(allServicosAction())
      yield put(updateServico({
        components: {
          ...components,
          drawer: false,
          confirmDelete: false
        }
      }))

    } catch (err) {

      yield put(updateServico({
        form: {
          ...form,
          saving: false
        }
      }))
    alert(err.message)
  }
}

export function* removeArquivo (payload){ 
  const { form } = yield select(state => state.Servicos)
  try {
    yield put(updateServico({ form: { ...form, saving: true }}))

    const {data: res} = yield call( api.post, `/servico/delete/`, {
      arquivo: payload.arquivo
    })

    yield put(updateServico({ form: {...form, saving: false }}))

    if(res.error) { 
      alert(res.message)
      return false
    }
    
  } catch (err) {
    yield put(updateServico({ form: { ...form, saving: false }}))
    alert(err.message)
  }
}

export default all([
  takeLatest(types.ALL_SERVICOS, allServicos),
  takeLatest(types.ADD_SERVICO, addServico),
  takeLatest(types.REMOVE_SERVICO, removeServico),
  takeLatest(types.REMOVE_ARQUIVO, removeArquivo)
])