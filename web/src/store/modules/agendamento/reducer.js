import types from './types'
import produce from 'immer'
import consts from '../../../consts'
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
  agendamento:{
    clienteId: {
      nome: ''
    },
    salaoId: consts.salaoId,
    servicoId:{
      titulo:'',
      duracao: ''
    },
    colaboradorId:{
      nome: ''
    },
    data: '',
    valor: '',
    comissao: '',
    transactionId: '',
    dataCadastro: ''
  },
  agendamentos: [],
  clientes:[]
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
    default: return state
  }
}
export default agendamento