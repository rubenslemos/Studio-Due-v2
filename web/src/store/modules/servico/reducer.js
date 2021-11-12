import produce from 'immer'
import types from './types'
import moment from 'moment'

const INITIAL_STATE = {
  behavior: 'create',
  components:{
    drawer: false,
    confirmDelete: false
  },
  form:{
    filtering: false,
    disabled: true,
    saving: false
  },
  servicos:[],
  servico: {
   recipientId: '',
   titulo: '',
   preco: '',
   duracao: moment('00:30', 'HH:mm').format(),
   comissao: '',
   recorrencia:'',
   descricao: '',
   status: 'A',
   arquivo:[]
  }
}
function servico(state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.UPDATE_SERVICO:{
      return produce(state, (draft) => {
        draft = {
          ...draft,
          ...action.servico
        }

        return draft
      })
    }
    case types.RESET_SERVICO:{
      return produce(state, (draft) => {
        draft.servico = INITIAL_STATE.servico
        return draft
      })
    }
    default: return state
  }
}
export default servico