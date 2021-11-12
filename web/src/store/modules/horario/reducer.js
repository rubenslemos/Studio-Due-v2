import produce from 'immer'
import types from './types'
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
  horarios:[],
  servicos:[],
  colaboradores:[],
  horario: {
    dias:[],
    inicio:'',
    fim:'',
    especialidades:[],
    colaboradores:[],
  }
}
function horario(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_HORARIO:{
      return produce(state, (draft) => {
        draft = {
          ...draft,
          ...action.payload
        }

        return draft
      })
    }
    case types.RESET_HORARIO:{
      return produce(state, (draft) => {
        draft.horario = INITIAL_STATE.horario
        return draft
      })
    }
    default: return state
  }
}
export default horario