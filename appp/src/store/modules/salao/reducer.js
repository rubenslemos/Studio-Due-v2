import types from './types'
import produce, {enableES5} from 'immer'
import consts from '../../../consts'

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
        draft = {...draft.salao, ...action }
      })
    }
    default:
      console.log('salao: ', action)
      console.log("state: ",state)
      return state
  }
}
export default salao