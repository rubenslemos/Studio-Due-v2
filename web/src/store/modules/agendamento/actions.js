import types from "./types"
export function filterAgendamentos(start, end){
  return {
    type: types.FILTER_AGENDAMENTO,
    start, 
    end
  }
}

export function updateAgendamento(agendamentos){
  return {
    type: types.UPDATE_AGENDAMENTO, 
    agendamentos
  }
}
export function updateAgendamentos(agendamento){
  return {
    type: types.UPDATE_AGENDAMENTOS, 
    agendamento
  }
}

export function addAgendamento(){
  return {
    type: types.ADD_AGENDAMENTO
  }
}

export function resetAgendamento(){
  return {
    type: types.RESET_AGENDAMENTO
  }
}
export function allClientes(){ return { type: types.ALL_CLIENTES } }