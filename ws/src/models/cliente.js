const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cliente = new Schema({
    nome: {
        type: String,
        required: [true, 'Nome Obrigatório']
    },
    email: {
        type: String,
        required: [true, 'E-mail Obrigatório']
    },
    senha: {
        type: String,
        default: null
    },
    telefone: {
        type: [String],
        required: [true, 'Telefone Obrigatório']
    },
    foto: {
        type: String,
        required: [true, 'Foto Obrigatória']
    },
    status: {
        type: String,
        enum: ['A', 'I'],
        required: [true, 'Status Obrigatório'],
        default: 'A'
    },
    sexo: {
        type: String,
        enum: ['M', 'F'],
        required: [true, 'Sexo Obrigatório']
    },
    documento: {
        tipo: {
            type: String,
            enum: ['cpf', 'cnpj'],
            required: [true, 'Tipo Obrigatório']
        },
        numero: {
            type: String,
            required: [true, 'Número Obrigatório']
        }
    },
    endereco: {
        cidade: {
            type: String,
            required: [true, 'Cidade é Obrigatório'],
            default: 'Belo Horizonte'
        },
        estado: {
            type: String,
            required: [true, 'Estado é Obrigatório'],
            default: 'Minas Gerais'
        },
        cep: {
            type: String,
            required: [true, 'CEP Obrigatório']
        },
        numero: {
            type: String,
            required: [true, 'Número do imóvel é Obrigatório']
        },
        bairro: {
            type: String,
            required: [true, 'Bairro do imóvel é Obrigatório']
        },
        rua: {
            type: String,
            required: [true, 'Rua do imóvel é Obrigatório']
        },
        complemento: String,
        pais: {
            type: String,
            required: [true, 'País é Obrigatório'],
            default: 'Brasil'
        },
    },
    nascimento: {
        type: Date,
        required: [true, 'Data de Aniversário Obrigatória'],
        default: Date.now
    },
    pagadorId: {
        type: String
    },
    dataCadastro: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('Cliente', cliente)