import { takeLatest, all, call, put, select } from 'redux-saga/effects'
import { updateHorario, allHorarios as allHorariosAction, resetHorario } from './actions'
import types from './types'
import api from '../../../services/api'
import consts from '../../../consts'
export function* allHorarios (){ 
  const { form } = yield select(state => state.Horarios)
  try {
    yield put(updateHorario({ form: { ...form, filtering: true }}))
    const { data: res } = yield call(api.get, `/horario/salao/${consts.salaoId}`)
    yield put(updateHorario({ form: { ...form, filtering: false }}))
    if(res.error) {
      alert(res.message)
      return false
    }
    yield put(updateHorario({ horarios: res.horarios }))
  } catch (err) {
    yield put(updateHorario({ form: { ...form, filtering: false }}))
    alert(err.message)
  }
}
export function* filterColaboradores (){ 
  const { form, horario } = yield select(state => state.Horarios)
  try {
    yield put(updateHorario({
      form: {
        ...form,
        filtering: true
      }
    }))
    const {data: res} = yield call(api.post, `/horario/colaboradores`, { 
        servicos: horario.especialidades
    })
    yield put(updateHorario({ form: { ...form, filtering: false }}))
    if(res.error) {
      alert(res.message)
      return false
    }

    yield put(updateHorario({
        colaboradores: res.colaboradores
      }))
    } catch (err) {
    // eslint-disable-next-line no-unused-expressions
    yield put(updateHorario({
      form: {
        ...form,
        filtering: false
      }
    }))
    alert(err.message)
  }
}
export function* addHorario (){ 
  const { form, horario, components, behavior} = yield select(state => state.Horarios)
  try {
    yield put(updateHorario({ form: {
        ...form,
        saving: true
      }
    }))
    let res = {}
    if ( behavior === 'create'){
      const response = yield call( api.post, `/horario`, { 
        ...horario,
        salaoId: consts.salaoId,
      })
        res = response.data
    } else {
      const response = yield call( api.put, `/horario/${horario._id}`, { 
        vinculo: horario.status,
        vinculoId: horario.vinculoId,
        especialidades: horario.especialidades
      })
      res = response.data
    }

      yield put(updateHorario({ form: { ...form, saving: false }}))

      if(res.error) {

        alert(res.message)
        return false
      }
      yield put(allHorariosAction())
      yield put(updateHorario({
        components: {
          ...components,
          drawer: false
        }
      }))

      yield put(resetHorario())
    } catch (err) {

      yield put(updateHorario({
        form: {
          ...form,
          saving: false
        }
      }))
    alert(err.message)
  }
}
export function* removeHorario (){ 
  const { form, horario, components } = yield select(state => state.Horarios)
  try {
    yield put(updateHorario({ form: { ...form, saving: true }}))

    const {data: res} = yield call( api.delete,`/horario/${horario._id}`)

    yield put(updateHorario({ form: { ...form, saving: false}}))

      if(res.error) {
        alert(res.message)
        return false
      }
      yield put(allHorariosAction())
      yield put(updateHorario({
        components: {
          ...components,
          drawer: false,
          confirmDelete: false
        }
      }))

      yield put(resetHorario())
    } catch (err) {

      yield put(updateHorario({
        form: {
          ...form,
          saving: false
        }
      }))
    alert(err.message)
  }
}

export function* allServicos (){
  const { form } = yield select(state => state.Horarios)
  try {
    yield put(updateHorario({ form: { ...form, filtering: true }}))
    const {data: res} = yield call( api.get, `/salao/servicos/${consts.salaoId}`)
    yield put(updateHorario({ form: { ...form, filtering: false }}))
    if(res.error) {
      alert(res.message)
      return false
    }
    yield put(updateHorario({ servicos: res.servicos}))
  } catch (err) {
    yield put(updateHorario({ form: { ...form, filtering: false }}))
  }
}

export function* saveHorario() {
  const { horario, form, components } = yield select((state) => state.Horarios);

  try {
    yield put(updateHorario({ form: { ...form, saving: true } }));

    const { data: res } = yield call(
      api.put,
      `/horario/${horario._id}`,
      horario
    );
    yield put(updateHorario({ form: { ...form, saving: false } }));

    if (res.error) {
      // ALERT DO RSUITE
      alert(res.message)
      return false;
    }

    yield put(allHorariosAction());
    yield put(updateHorario({ components: { ...components, drawer: false } }));
    yield put(resetHorario());

    alert(res.message)
  } catch (err) {
    yield put(updateHorario({ form: { ...form, saving: false } }));
    alert(err.message)
  }
}

export default all([
  takeLatest(types.ALL_HORARIOS, allHorarios),
  takeLatest(types.FILTER_COLABORADORES, filterColaboradores),
  takeLatest(types.ADD_HORARIO, addHorario),
  takeLatest(types.REMOVE_HORARIO, removeHorario),
  takeLatest(types.SAVE_HORARIO, saveHorario),
  takeLatest(types.ALL_SERVICOS, allServicos)
])