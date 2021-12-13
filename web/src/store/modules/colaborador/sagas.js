import { takeLatest, all, call, put, select } from 'redux-saga/effects'
import { updateColaborador, allColaboradores as allColaboradoresAction, resetColaborador } from './actions'
import types from './types'
import api from '../../../services/api'
import consts from '../../../consts'
export function* allColaboradores (){ 
  const { form } = yield select(state => state.Colaboradores)
  try {
    yield put(updateColaborador({
      form: {
        ...form,
        filtering: true
      }
    }))
    const {data: res} = yield call(api.get, `/colaborador/salao/${consts.salaoId}`)
    yield put(updateColaborador({
      form: {
        ...form,
        filtering: false
      }
    }))
    if(res.error) {
      alert(res.message)
      return false
    }
    yield put(updateColaborador({
      colaboradores: res.Colaboradores
    }))
  } catch (err) {
    // eslint-disable-next-line no-unused-expressions
    yield put(updateColaborador({
      form: {
        ...form,
        filtering: false
      }
    }))
    alert(err.message)
  }
}
export function* filterColaboradores (){ 
  const { form, colaborador } = yield select(state => state.Colaboradores)
  try {
    yield put(updateColaborador({
      form: {
        ...form,
        filtering: true
      }
    }))
    const {data: res} = yield call(
      api.post,
      `/colaborador/filter`,
      { filters: {
        email: colaborador.email,
        status: 'A'
      }}
      )
    yield put(updateColaborador({
      form: {
        ...form,
        filtering: false
      }
    }))
    if(res.error) {
      alert(res.message)
      return false
    }

    if (res.colaboradores.length > 0) {
      yield put(updateColaborador({
        colaborador: res.colaboradores[0],
        form: {
          ...form,
          filtering: false,
          disabled: true
        }
      }))
    }else{
      yield put(updateColaborador({
      form: {
        ...form,
        disabled: false
      }
    }))
    }
    yield put(updateColaborador({
      colaboradores: res.colaboradores
    }))
  } catch (err) {
    // eslint-disable-next-line no-unused-expressions
    yield put(updateColaborador({
      form: {
        ...form,
        filtering: false
      }
    }))
    alert(err.message)
  }
}
export function* addColaborador (){ 
  const { form, colaborador, components, behavior} = yield select(state => state.Colaboradores)
  try {
    yield put(updateColaborador({ form: {
        ...form,
        saving: true
      }
    }))
    let res = {}
    if ( behavior === 'create'){
      const response = yield call( api.post, `/colaborador`, { 
        ...colaborador,
        salaoId: consts.salaoId,
      })
        res = response.data
    } else {
      const response = yield call( api.put, `/colaborador/${colaborador._id}`, { 
        vinculo: colaborador.status,
        vinculoId: colaborador.vinculoId,
        especialidades: colaborador.especialidades
      })
      res = response.data
    }

      yield put(updateColaborador({ form: { ...form, saving: false }}))

      if(res.error) {

        alert(res.message)
        return false
      }
      yield put(allColaboradoresAction())
      yield put(updateColaborador({
        components: {
          ...components,
          drawer: false
        }
      }))

      yield put(resetColaborador())
    } catch (err) {

      yield put(updateColaborador({
        form: {
          ...form,
          saving: false
        }
      }))
    alert(err.message)
  }
}
export function* unlinkColaborador (){ 
  const { form, colaborador, components } = yield select(state => state.Colaboradores)
  try {
    yield put(updateColaborador({
      form: {
        ...form,
        saving: true
      }
    }))

    const {data: res} = yield call(
      api.delete,
      `/colaborador/vinculo/${colaborador.vinculoId}`,
       {
        colaborador,
        salaoId: consts.salaoId,
      }
      )

      yield put(updateColaborador({
        form: {
          ...form,
          saving: false
        },
        components: {
          ...components,
          confirmDelete: false
        }
      }))

      if(res.error) {

        alert(res.message)
        return false
      }
      yield put(allColaboradoresAction())
      yield put(updateColaborador({
        components: {
          ...components,
          drawer: false,
          confirmDelete: false
        }
      }))

      yield put(resetColaborador())
    } catch (err) {

      yield put(updateColaborador({
        form: {
          ...form,
          saving: false
        }
      }))
    alert(err.message)
  }
}

export function* allServicos (){
  const { form } = yield select(state => state.Colaboradores)
  try {
    yield put(updateColaborador({
      form: {
        ...form,
        filtering: true
      }
    }))
    const {data: res} = yield call(
      api.get,
      `/salao/servicos/${consts.salaoId}`
    )
    yield put(updateColaborador({
      form: {
        ...form,
        filtering: false
      }
    }))
    if(res.error) {

      alert(res.message)
      return false
    }
    yield put(updateColaborador({ servicos: res.servicos}))
    console.log(res)
  } catch (err) {
    yield put(updateColaborador({
      form: {
        ...form,
        filtering: false
      }
    }))
  }
}


export default all([
  takeLatest(types.ALL_COLABORADORES, allColaboradores),
  takeLatest(types.FILTER_COLABORADORES, filterColaboradores),
  takeLatest(types.ADD_COLABORADOR, addColaborador),
  takeLatest(types.UNLINK_COLABORADOR, unlinkColaborador),
  takeLatest(types.ALL_SERVICOS, allServicos)
])