import { all } from 'redux-saga/effects'
import agendamento from './modules/agendamento/sagas'
import Clientes from './modules/cliente/sagas'
import Colaboradores from './modules/colaborador/sagas'
import Servicos from './modules/servico/sagas'
import Horarios from './modules/horario/sagas'

export default function* rootSaga(){
  return yield all([agendamento, Clientes, Colaboradores, Servicos, Horarios])
}