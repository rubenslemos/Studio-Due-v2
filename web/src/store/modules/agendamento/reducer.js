import types from './types'
import produce from 'immer'
import consts from '../../../consts'
import _ from 'lodash'
const INITIAL_STATE = {
  behavior: 'create',
  components:{
    drawer: false,
    confirmDelete: false,
    view: 'week'
  },
  form:{
    filtering: false,
    disabled: true,
    saving: false
  },
  agendamentos: [],
  agendamento:{
    salaoId: consts.salaoId,
    clienteId: null,
    servicoId:null,
    colaboradorId:null,
    data:null
  },
  clientes:[],
  servicos:[],
  agenda:[],
  colaboradores:[]
}
function agendamento(state = INITIAL_STATE, action) {
  switch (action.type) {
    // eslint-disable-next-line no-lone-blocks
    case types.UPDATE_AGENDAMENTOS:{
      return produce(state, (draft) => {
        draft= {...draft, ...action.agendamento}
        return draft
      })
    }
    case types.UPDATE_AGENDAMENTO:{
      return produce(state, (draft) => {
        draft.agendamentos = action.agendamentos
        return draft
      })
    }
    case types.RESET_AGENDAMENTO: {
      return produce(state, (draft) => {
        draft.agendamentos = INITIAL_STATE.agendamentos
        return draft
      })
    } 
    case types.UPDATE_FORM: {
      return produce(state, (draft) => {
        draft.form = {...state.form, ...action.form};
      });
    }
    case types.UPDATE_COLABORADORES: {
      return produce(state, (draft) => {
        draft.colaboradores = _.uniq([
          ...state.colaboradores,
          ...action.colaboradores
        ])
      })
    }
    case types.UPDATE_AGENDA:{
      return produce(state, (draft) => {
        draft.agenda = [...state.agenda, ...action.agenda]
      })
    }    
    default: {
      return state
    }
  }
}
export default agendamento