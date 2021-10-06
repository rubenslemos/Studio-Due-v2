const mongoose = require('mongoose')
const Schema = mongoose.Schema
const salaoColaborador = new Schema({
    salaoId: {
        type: mongoose.Types.ObjectID,
        ref: 'Salao',
        required: true
    },
    colaboradores: [{
        type: mongoose.Types.ObjectID,
        ref: 'Colaborador',
        required: true
    }],
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