const mongoose = require('mongoose')
const Schema = mongoose.Schema
const arquivo = new Schema({
    referenciaId: {
        type: Schema.Types.ObjectId,
        refPath: 'models'
    },
    model: {
        type: String,
        required: true,
        enum: ['Servico', 'Salao']
    },
    caminho: {
        type: String,
        required: true
    },
    dataCadastro: {
        type: Date,
        default: Date.now
    }
})
mongoose.model('Arquivo', arquivo)
module.exports = {
    Arquivo: mongoose.model('Arquivo', arquivo)
}