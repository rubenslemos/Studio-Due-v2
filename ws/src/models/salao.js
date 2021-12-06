const mongoose = require('mongoose')
const Schema = mongoose.Schema
const salao = new Schema({
    nome: {
        type: String,
        required: [true, 'Nome Obrigatório']
    },
    foto: String,
    capa: String,
    email: {
        type: String,
        required: [true, 'E-mail Obrigatório']
    },
    senha: {
        type: String,
        default: null
    },
    telefone: String,
    endereco: {
        cidade: String,
        estado: String,
        cep: String,
        numero: Number,
        bairro: String,
        rua: String,
        complemento: String,
        pais: String,
    },
    geo: {
        tipo: String,
        coordinates: Array
    },
    recipientId: {
        type: String
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    }
})
mongoose.model('Salao', salao)
salao.index({ geo: '2dsphare' })
module.exports = {
    salao: mongoose.model('Salao', salao)
}