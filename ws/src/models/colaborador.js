const mongoose = require('mongoose')
const Schema = mongoose.Schema
const colaborador = new Schema({
    nome: {
        type: String,
        required: [true, 'Nome Obrigatório']
    },
    telefone: {
        type: String,
        required: [true, 'Telefone Obrigatório']
    },
    foto: {
        type: String
    },
    senha: {
        type: String,
        default: null
    },
    email: {
        type: String
    },
    sexo: {
        type: String,
        enum: ['M', 'F'],
        required: [true, 'Sexo Obrigatório']
    },
    status: {
        type: String,
        enum: ['A', 'I'],
        required: [true, 'Status Obrigatório'],
        default: 'A'
    },
    dataNascimento: {
        type: Date, //YYYY-MM-DD,
        required: [true, 'Data de Nascimento Obrigatória']
    },
    contaBancaria: {
        titular: {
            type: String,
            required: [true, 'titular Obrigatório']
        },
        cpfCnpj: {
            type: String,
            required: [true, 'Documento Obrigatório']
        },
        Banco: {
            type: String,
            required: [true, 'Nome do banco Obrigatório']
        },
        TipoConta: {
            type: String,
            required: [true, 'Tipo de Conta Obrigatório']
        },
        agencia: {
            type: String,
            required: [true, 'Agência Obrigatória']
        },
        numero: {
            type: Number,
            required: [true, 'Número da Conta Obrigatório']
        },
        dv: {
            type: String,
            required: [true, 'Digito Verificador Obrigatório']
        }
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    },
    recipientId: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Colaborador', colaborador)