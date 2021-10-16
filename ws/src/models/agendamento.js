const mongoose = require('mongoose')
const Schema = mongoose.Schema
const agendamento = new Schema({
    clienteId: {
        type: mongoose.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },
    salaoId: {
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: true
    },
    servicoId: {
        type: mongoose.Types.ObjectId,
        ref: 'Servico',
        required: true
    },
    colaboradorId: {
        type: mongoose.Types.ObjectId,
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