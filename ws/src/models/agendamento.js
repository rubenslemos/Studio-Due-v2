const mongoose = require('mongoose')
const Schema = mongoose.Schema
const agendamento = new Schema({
    clienteID: {
        type: mongoose.Types.ObjectID,
        ref: 'Cliente',
        required: true
    },
    salaoId: {
        type: mongoose.Types.ObjectID,
        ref: 'Salao',
        required: true
    },
    servicoId: {
        type: mongoose.Types.ObjectID,
        ref: 'Servico',
        required: true
    },
    colaboradorId: {
        type: mongoose.Types.ObjectID,
        ref: 'Colaborador',
        required: true
    },
    data: {
        type: Date,
        required: [true, 'Data de agendamento é Obrigatória']
    },
    valor: {
        type: Number,
        required: [true, 'Valor Obrigatório']
    },
    comissao: {
        type: Number, // % sobre o preço do serviço
        required: [true, 'Valor da comissão é Obrigatório']
    },
    transactionId: {
        type: String,
        required: [true]
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model('Agendamento', agendamento)