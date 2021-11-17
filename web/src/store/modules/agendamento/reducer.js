import types from './types'
import produce from 'immer'
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
  agendamento:{},
  agendamentos: []
}
function agendamento(state = INITIAL_STATE, action) {
  switch (action.type) {
    // eslint-disable-next-line no-lone-blocks
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
    default: return state
  }
}
export default agendamento