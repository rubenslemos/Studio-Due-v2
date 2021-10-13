const mongoose = require('mongoose')
const Schema = mongoose.Schema
const horario = new Schema({
    salaoId: [{
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: true
    }],
    especialidades: [{
        type: mongoose.Types.ObjectId,
        ref: 'Servico',
        required: true
    }],
    colaboradores: [{
        type: mongoose.Types.ObjectId,
        ref: 'Colaborador',
        required: true
    }],
    dias: {
        type: [Number],
        required: [true, 'Dia é Obrigatório']
    },
    inicio: {
        type: Date,
        required: [true, 'Horário de início do serviço é Obrigatório']
    },
    fim: {
        type: Date, // tempo em minutos q dura o serviço
        required: [true, 'Horário de termino do serviço é Obrigatório']
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    }
})
module.exports = mongoose.model('Horario', horario)