import { combineReducers } from "redux";
import agendamento from "./modules/agendamento/reducer";
import Clientes from "./modules/cliente/reducer";
import Colaboradores from "./modules/colaborador/reducer"

export default combineReducers({
  agendamento,
  Clientes,
  Colaboradores
})