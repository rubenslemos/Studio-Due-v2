const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const pagarme = require('../services/pagarme')
const moment = require('moment')
const _ = require('lodash')
const cliente = require('../models/cliente')
const colaborador = require('../models/colaborador')
const salao = require('../models/salao')
const servico = require('../models/servico')
const Agendamento = require('../models/agendamento')
const horario = require('../models/horario')
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
        const clientes = await cliente.findById(clienteId).select(
                'nome endereco pagadorId')
            //recuperar o salão
        const saloes = await salao.findById(salaoId)
            .select('recipientId')
            //recuperar o serviço
        const servicos = await servico.Servico.findById(servicoId)
            .select('preco titulo comissao')
            //recuperar o colaborador
        const colaboradores = await colaborador.findById(colaboradorId)
            .select('recipientId')
            //recuperar o Agendamento
        let agendamento = null
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
                card_number: "4111 1111 1111 1111",
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
            agendamento = await new Agendamento({
                ...req.body,
                transactionId: pagamento.data.id,
                comissao: servicos.comissao,
                valor: servicos.preco * 100
            }).save({ session })
        }
        await session.commitTransaction()
        session.endSession()
        if (existentAgendamento) {
            res.json({ error: true, message: 'Agendamento já Cadastrado', existentAgendamento })
        } else {
            res.json({ message: 'Agendamento cadastrado com Sucesso', agendamento })
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
        res.json({ 
            agendamentos,
            agendamento: agendamentos
        })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
router.post('/dias-disponiveis', async(req, res) => {
    try {
        const { data, salaoId, servicoId } = req.body
        const horarios = await horario.find({ salaoId })
        const servicos = await servico.Servico.findById(servicoId).select('duracao')
        let agenda = []
        let colaboradores = []
        let lastDay = moment(data)

        //Duracao do serviço
        const servicoMinutos = util.hourToMinutes(moment(servicos.duracao).format('HH:mm'))
        const servicoSlots = util.sliceMinutes(
            servicos.duracao,
            moment(servicos.duracao).add(servicoMinutos, 'minutes'),
            util.slotDuration
        ).length

        //Procurar horarios disponíveis até termos 7 datas válidas
        for (let i = 0; i <= 365 && agenda.length <= 7; i++) {
            const horarioVago = horarios.filter((Horario) => {
                    //Verificar dias da semana disponiveis
                    const diasSemanaDisponiveis = Horario.dias.includes(lastDay.day())
                        //verificar especialidades disponíveis
                    const servicosDisponiveis = Horario.especialidades.includes(servicoId)
                    return diasSemanaDisponiveis && servicosDisponiveis
                })
                /* Todos Colaboradores e horários disponiveis no dia
                formato da agenda
                [
                    { 
                        "dia":{
                            "colaborador":[
                                Horario1,
                                horario2,
                                horario3
                            ]
                        }
                    }
                ]
                */

            if (horarioVago.length > 0) {
                let todosHorariosDia = {}
                for (let espaco of horarioVago) {
                    for (let colaborador of espaco.colaboradores) {
                        let colaboradorId = colaborador._id
                        if (!todosHorariosDia[colaboradorId]) {
                            todosHorariosDia[colaboradorId] = []
                        }
                        /* 
                        Passar para o colaborador todos slots de horarios do dia
                        */
                        todosHorariosDia[colaboradorId] = [
                            ...todosHorariosDia[colaboradorId],
                            ...util.sliceMinutes(
                                util.mergeDateTime(lastDay, espaco.inicio),
                                util.mergeDateTime(lastDay, espaco.fim),
                                util.slotDuration
                            )
                        ]
                    }
                }
                // Slots de horarios indisponíveis de cada especialista no dia
                for (let colaboradorId of Object.keys(todosHorariosDia)) {
                    //recuperar agendamentos
                    const agendamentos = await Agendamento.find({
                            colaboradorId,
                            data: {
                                $gte: moment(lastDay).startOf('day'),
                                $lte: moment(lastDay).endOf('day')
                            }
                        }).select('-_id servicoId data').populate({ path: 'servicoId', select: 'duracao' })
                        // horarios agendados
                    let horariosOcupados = agendamentos.map((agendamento) => ({
                            inicio: moment(agendamento.data),
                            final: moment(agendamento.data).add(
                                util.hourToMinutes(
                                    moment(agendamento.servicoId.duracao).format('HH:mm')
                                ), 'minutes')
                        }))
                        // formatacao de exibicao de horarios ocupados
                    horariosOcupados = horariosOcupados.map((horarios) =>
                            util.sliceMinutes(horarios.inicio, horarios.final, util.slotDuration)
                        ).flat()
                        //remover os horarios ocupados
                        /* if (todosHorariosDia[colaboradorId] == undefined) {
                             continue
                         } else {*/
                    let horariosLivres = util.splitByValue(todosHorariosDia[colaboradorId].map((horarioLivre) => {
                            return horariosOcupados.includes(horarioLivre) ? 'Ocupado' : horarioLivre
                        }), 'Ocupado').filter((space) => space.length > 0)
                        //}
                        // Calcular se há horas suficiente pra agendar serviço
                    horariosLivres = horariosLivres.filter(
                            (horarios) => horarios.length >= servicoSlots
                        )
                        /*
                        Verificar se há slots de horarios suficientes
                        para agendamentos de serviços
                        */
                    horariosLivres = horariosLivres.map((slot) =>
                            slot.filter((horario, index) =>
                                slot.length - index >= servicoSlots)).flat()
                        //formatando horários de 2 em 2
                    horariosLivres = _.chunk(horariosLivres, 2)
                        //remover colaborador caso n tenha horário livre
                    if (horariosLivres.length == 0) {
                        todosHorariosDia = _.omit(todosHorariosDia, colaboradorId)
                    } else {
                        todosHorariosDia[colaboradorId] = horariosLivres
                    }
                }
                //verificar se há colaborador naquele dia
                const totalEspecialistas = Object.keys(todosHorariosDia).length
                if (totalEspecialistas > 0) {
                    colaboradores.push(Object.keys(todosHorariosDia))
                    agenda.push({
                        [lastDay.format('YYYY-MM-DD')]: todosHorariosDia
                    })
                }

            }
            lastDay = lastDay.add(1, 'day')
        }
        //recuperando dados dos colaboradores
        colaboradores = _.uniq(colaboradores.flat())
        colaboradores = await colaborador.find({
            _id: { $in: colaboradores }
        }).select('nome foto _id')
        colaboradores = colaboradores.map(c => ({
            ...c._doc,
            nome: c.nome.split(' ')[0]
        }))
        res.json({
            colaboradores,
            agenda: agenda
        })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
module.exports = router