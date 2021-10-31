import { combineReducers } from "redux";
import agendamento from "./modules/agendamento/reducer";
import Clientes from "./modules/cliente/reducer";

export default combineReducers({
  agendamento,
  Clientes
})