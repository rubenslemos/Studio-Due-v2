const express = require('express')
const router = express.Router()
const _ = require('lodash')
const Horario = require('../models/horario')
const colaboradorServico = require('../models/relationship/colaboradorServico')
router.post('/', async(req, res) => {
    try {
        const horario = await new Horario(req.body).save()
        res.json({ horario })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
router.get('/salao/:salaoId', async(req, res) => {
    try {
        const { salaoId } = req.params
        const horarios = await Horario.find({
            salaoId
        })
        res.json({ horarios })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
router.put('/:horarioId', async(req, res) => {
    try {
        const { horarioId } = req.params
        const horario = req.body
        await Horario.findByIdAndUpdate(horarioId, horario)
        res.json({ horario })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
router.delete('/:horarioId', async(req, res) => {
    try {
        const { horarioId } = req.params
        const horario = req.body
        await Horario.findByIdAndDelete(horarioId)
        res.json({ horario })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
router.post('/colaboradores', async(req, res) => {
    try {
        const colaboradores = await colaboradorServico.find({
            servicoId: { $in: req.body.servicos },
            status: 'A'
        }).populate('colaboradorId', 'nome').select('colaboradorId -_id')
        const listaColaboradores = _.uniqBy( colaboradores, (c) => 
            c.colaboradorId._id.toString())
            .map((c) => ({
                label: c.colaboradorId.nome,
                value: c.colaboradorId._id
            }))
            console.log(listaColaboradores)
        res.json({
            colaboradores: listaColaboradores
        })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
module.exports = router