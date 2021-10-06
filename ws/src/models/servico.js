const mongoose = require('mongoose')
const Schema = mongoose.Schema
const servico = new Schema({
    recipientId: {
        type: mongoose.Types.ObjectId,
        ref: 'Salao',
        required: true
    },
    titulo: {
        type: String,
        required: [true, 'Titulo Obrigatório']
    },
    preco: {
        type: Number,
        required: [true, 'Preço Obrigatório']
    },
    duracao: {
        type: Number, // tempo em minutos q dura o serviço
        required: [true, 'Duração é Obrigatório']
    },
    comissao: {
        type: Number, // % sobre o preço do serviço
        required: [true, 'Valor da comissão é Obrigatório']
    },
    recorrencia: {
        type: Number, //periodo em que o serviço precisará ser refeito em dias
        required: true
    },
    descricao: {
        type: String,
        required: [true, 'A descrição do serviço é Obrigatória']
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
mongoose.model('Servico', servico)
module.exports = {
    Servico: mongoose.model('Servico', servico)
}