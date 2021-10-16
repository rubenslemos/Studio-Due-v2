const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const pagarme = require('../services/pagarme')
const Cliente = require('../models/cliente')
const salaoCliente = require('../models/relationship/salaoCliente')
router.post('/', async(req, res) => {
    const db = mongoose.connection
    const session = await db.startSession()
    session.startTransaction()
    try {
        const { cliente, salaoId } = req.body
        let novoCliente = null
            //verificar existência do Cliente
        const existentCliente = await Cliente.findOne({
                $or: [
                    { email: cliente.email },
                    { telefone: cliente.telefone }
                ]
            })
            //caso o Cliente for inexistente, cadastre-o
        if (!existentCliente) {
            const _id = mongoose.Types.ObjectId()
                //criar Pagador
            const pagarmePagador = await pagarme('/customers', {
                external_id: _id,
                name: cliente.nome,
                type: cliente.documento.tipo == 'cpf' ? 'individual' : 'corporation',
                country: cliente.endereco.pais,
                email: cliente.email,
                documents: [{
                    type: cliente.documento.tipo,
                    number: cliente.documento.numero
                }],
                phone_numbers: [cliente.telefone],
                birthday: cliente.nascimento
            })
            if (pagarmePagador.error) {
                throw pagarmePagador
            }
            //criar Cliente
            novoCliente = await new Cliente({
                _id: _id,
                ...cliente,
                pagadorId: pagarmePagador.data.id
            }).save({ session })
        }
        //relacionamento
        const pagadorId = existentCliente ? existentCliente.id : novoCliente.id
            //verificar relacionamento entree Salão e Cliente
        const relacionamentoExistente = await salaoCliente.findOne({
                salaoId,
                clienteId: pagadorId,
                status: { $ne: 'E' }
            })
            //se nao houver a relação
        if (!relacionamentoExistente) {
            await new salaoCliente({
                salaoId,
                clienteId: pagadorId,
                status: 'A'
            }).save({ session })
        }
        // se houver a relação
        if (existentCliente) {
            const relacionamentoExistente = await salaoCliente.findOneAndUpdate({
                salaoId,
                clienteId: pagadorId,
            }, { status: 'A' }, { session })
        }
        await session.commitTransaction()
        session.endSession()
        if (existentCliente && relacionamentoExistente) {
            res.json({ error: true, message: 'Cliente já Cadastrado' })
        } else {
            res.json({ message: 'Cliente cadastrado com Sucesso' })
        }
        //Apagar vinculos de serviços
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        res.json({ error: true, message: err.message })
    }
})
router.post('/filter', async(req, res) => {
    try {
        const clientes = await Cliente.find(req.body.filters)
        res.json({ clientes })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
router.get('/salao/:salaoId', async(req, res) => {
    try {
        const { salaoId } = req.params
            //recuperar vinculos
        const salaoClientes = await salaoCliente.find({
                salaoId,
                status: { $ne: 'E' }
            })
            .populate({ path: 'clienteId', select: '-senha -recipientId' })
            .select('clienteId dataCadastro status')
        res.json({
            Clientes: salaoClientes.map((vinculo) => ({
                ...vinculo.clienteId._doc,
                vinculoId: vinculo._id,
                dataCadastro: vinculo.dataCadastro
            }))
        })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
router.delete('/vinculo/:id', async(req, res) => {
    try {
        await salaoCliente.findByIdAndUpdate(
            req.params.id, { status: 'E' }
        )
        res.json({ Vinculo: "Deletado Com Sucesso" })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
module.exports = router