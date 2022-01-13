import types from "./types"
export function filterAgendamentos  (start, end)    { return { type: types.FILTER_AGENDAMENTO,start,end}}
export function updateAgendamento   (agendamentos)  { return { type: types.UPDATE_AGENDAMENTO,agendamentos}}
export function updateAgendamentos  (agendamento)   { return { type: types.UPDATE_AGENDAMENTOS,agendamento}}
export function addAgendamento      ()              { return { type: types.ADD_AGENDAMENTO}}
export function resetAgendamento    ()              { return { type: types.RESET_AGENDAMENTO}}
export function allClientes         ()              { return { type: types.ALL_CLIENTES}}
export function allServicos         ()              { return { type: types.ALL_SERVICOS}}
export function updateServicos      (servicos)      { return { type: types.UPDATE_SERVICOS, servicos}}
export function filterAgenda        ()              { return { type: types.FILTER_AGENDA}}
export function updateAgenda        (agenda)        { return { type: types.UPDATE_AGENDA, agenda}}
export function updateColaboradores(colaboradores)  { return { type: types.UPDATE_COLABORADORES, colaboradores}}
export function saveAgendamento    ()               { return { type: types.SAVE_AGENDAMENTO}}
export function updateForm         (form)           { return { type: types.UPDATE_FORM, form}}