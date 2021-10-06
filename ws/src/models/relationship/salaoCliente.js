const mongoose = require('mongoose')
const Schema = mongoose.Schema
const salaoColaborador = new Schema({
    salaoId: {
        type: mongoose.Types.ObjectID,
        ref: 'Salao',
        required: true
    },
    clienteID: {
        type: mongoose.Types.ObjectID,
        ref: 'Cliente',
        required: true
    },
    status: {
        type: String,
        enum: ['A', 'I', 'E'],
        required: [true, 'Status Obrigatório'],
        default: 'A'
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    },
})
module.exports = mongoose.model('SalaoColaborador', salaoColaborador)