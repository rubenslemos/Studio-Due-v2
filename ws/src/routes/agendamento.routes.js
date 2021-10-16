const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const pagarme = require('../services/pagarme')
const moment = require('moment')
const cliente = require('../models/cliente')
const colaborador = require('../models/colaborador')
const salao = require('../models/salao')
const servico = require('../models/servico')
const Agendamento = require('../models/agendamento')
const colaboradorServico = require('../models/relationship/colaboradorServico')
const salaoColaborador = require('../models/relationship/salaoColaborador')
const salaoCliente = require('../models/relationship/salaoCliente')
const util = require('../util')
const keys = require('../data/keys.json')
    //Criar agendamento
router.post('/', async(req, res) => {
    const db = mongoose.connection
    const session = await db.startSession()
    session.startTransaction()
    try {
        const { salaoId, clienteId, colaboradorId, servicoId } = req.body
            //recuperar o cliente
        const clientes = await cliente.findById(clienteId).select('nome endereco pagadorId')
            //recuperar o salão
        const saloes = await salao.findById(salaoId).select('recipientId')
            //recuperar o serviço
        const servicos = await servico.Servico.findById(servicoId).select('preco titulo comissao')
            //recuperar o colaborador
        const colaboradores = await colaborador.findById(colaboradorId).select('recipientId')
            //recuperar o Agendamento
        let novoAgendamento = null
            //verificar existência do agendamento
        const existentAgendamento = await Agendamento.findOne({
                $and: [
                    { salaoId: req.body.salaoId },
                    { colaboradorId: req.body.colaboradorId },
                    { data: req.body.data }
                ]
            })
            //Caso não exista
        if (!existentAgendamento) {

            //criando pagamento
            const precoFinal = util.toCents(servicos.preco) * 100
            const comissao = parseInt(precoFinal * (servicos.comissao / 100))
            const taxaSalao = precoFinal - keys.app_fee - comissao
            const taxaApp = keys.app_fee

            const pagamento = await pagarme('/transactions', {
                //preço total
                amount: precoFinal,
                //Dados do Cartão
                card_number: "4111111111111111",
                card_holder_name: "Morpheus Fishburne",
                card_expiration_date: "1123",
                card_cvv: "123",
                postback_url: "http://requestb.in/pkt7pgpk",
                //dados Cliente
                customer: {
                    id: clientes.pagadorId
                },
                // Dados endereço do cliente
                billing: {
                    name: clientes.nome,
                    address: {
                        country: clientes.endereco.pais,
                        state: clientes.endereco.estado,
                        city: clientes.endereco.cidade,
                        neighborhood: clientes.endereco.bairro,
                        street: clientes.endereco.rua,
                        street_number: clientes.endereco.numero,
                        zipcode: clientes.endereco.cep
                    }
                },
                //Servicos
                items: [{
                    id: servicoId,
                    title: servicos.titulo,
                    unit_price: precoFinal,
                    quantity: 1,
                    tangible: false
                }],
                split_rules: [
                    //Taxa do Salão
                    {
                        recipient_id: saloes.recipientId,
                        amount: taxaSalao
                    },
                    //Taxa do Colaborador
                    {
                        recipient_id: colaboradores.recipientId,
                        amount: comissao
                    },
                    //Taxa do app
                    {
                        recipient_id: keys.recipientId,
                        amount: taxaApp
                    }
                ]
            })

            if (pagamento.error) {
                throw pagamento
            }
            //criar Agendamento
            novoAgendamento = await new Agendamento({
                ...req.body,
                transactionId: pagamento.data.id,
                comissao: servicos.comissao,
                valor: servicos.preco * 100
            }).save({ session })
        }
        await session.commitTransaction()
        session.endSession()
        if (existentAgendamento) {
            res.json({ error: true, message: 'Agendamento já Cadastrado' })
        } else {
            res.json({ message: 'Agendamento cadastrado com Sucesso' })
        }
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        res.json({ error: true, message: err.message })
    }
})
router.post('/filter', async(req, res) => {
    try {
        const { periodo, salaoId } = req.body
        const agendamentos = await Agendamento.find({
            salaoId,
            data: {
                $gte: moment(periodo.inicio).startOf('day'),
                $lte: moment(periodo.final).endOf('day')
            }
        }).populate([
            { path: 'servicoId', select: '-_id titulo duracao' },
            { path: 'colaboradorId', select: '-_id nome' },
            { path: 'clienteId', select: '-_id nome' }
        ])
        res.json({ agendamentos })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
module.exports = router