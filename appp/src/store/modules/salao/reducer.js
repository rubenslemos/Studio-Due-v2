import types from './types'
import produce, {enableES5} from 'immer'
import consts from '../../../consts'
import _ from 'lodash'
const INITIAL_STATE = {
  salao: {},
  servicos: [],
  agenda: [],
  colaboradores: [],
  agendamento: {
    clienteId: consts.clienteId,
    salaoId: consts.salaoId,
    servicoId: null,
    colaboradorId: null,
    data: null
  },
  form:{
    inputFiltro: '',
    inputFiltroFoco: false,
    modalEspecialista: false,
    modalAgendamento: 0,
    agendamentoLoading: false
  }
}

function salao (state = INITIAL_STATE, action){
  switch (action.type){
    case types.UPDATE_SALAO: {
      enableES5()
      return produce(state, (draft) => {
        draft.salao = {...draft.salao, ...action.salao }
      })
    }   
    case types.UPDATE_SERVICOS: {
      enableES5()
      return produce(state, (draft) => {
        draft.servicos = action.servicos
      })
    }       
    case types.UPDATE_FORM: {
      enableES5()
      return produce(state, (draft) => {
        draft.form = {...state.form, ...action.form}
      })
    }
    case types.UPDATE_AGENDA: {
      enableES5()
      return produce(state, (draft) => {
        draft.agenda = [...state.agenda, ...action.agenda]
      })
    }
    case types.UPDATE_AGENDAMENTO: {
      enableES5()
      return produce(state, (draft) => {
        if (action.agendamento.servicoId){
          draft.form.modalAgendamento =2
        }
        draft.agendamento = {...state.agendamento, ...action.agendamento}
      })
    }
    case types.UPDATE_COLABORADORES: {
      enableES5()
      return produce(state, (draft) => {
        draft.colaboradores = _.uniq([
          ...draft.colaboradores,
          ...action.colaboradores,
        ])
      })
    }
    default:
      return state
  }
}
export default salao