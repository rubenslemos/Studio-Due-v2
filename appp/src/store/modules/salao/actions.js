import types from './types';

export function getSalao() {return {type: types.GET_SALAO}}
export function updateSalao(salao){ return { type: types.UPDATE_SALAO, salao}}
export function allServicos(){ return { type: types.ALL_SERVICOS } }
export function updateServicos(servicos){ return { type: types.UPDATE_SERVICOS, servicos}}
export function updateForm(form){ return { type: types.UPDATE_FORM, form}}
export function updateAgendamento(agendamento){ return { type: types.UPDATE_AGENDAMENTO, agendamento}}
export function filterAgenda(){ return { type: types.FILTER_AGENDA}}
export function updateAgenda(agenda){ return { type: types.UPDATE_AGENDA, agenda}}
export function updateColaboradores(colaboradores){ return { type: types.UPDATE_COLABORADORES, colaboradores}}