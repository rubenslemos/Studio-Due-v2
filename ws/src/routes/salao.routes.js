const express = require('express')
const router = express.Router()
const Salao = require('../models/salao')
const servicos = require('../models/servico')
const Horario = require('../models/horario')
const turf = require('@turf/turf')
const util = require('../util')
router.post('/', async(req, res) => {
    try {
        const Salao = await new Salao(req.body).save()
        res.json({ salao })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
router.get('/servicos/:salaoId', async(req, res) => {
    try {
        const { salaoId } = req.params
        const Servicos = await servicos.Servico.find({
            salaoId,
            status: 'A'
        }).select('_id titulo')
        res.json({
            servicos: Servicos.map(s => ({ label: s.titulo, value: s._id }))
        })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
router.get('/:id', async(req, res) => {
    try {
        const salao = await Salao.salao.findById(req.params.id).select(req.body.fields)
            //distancia
        const distance = turf.distance(turf.point(salao.geo.coordinates), turf.point([-19.9398078, -43.9299193])).toFixed(2)
        const horarios = await Horario.find({
            salaoId: req.params.id
        }).select('dias inicio fim')
        const isOpened = await util.isOpened(horarios)
        res.json({salao:{...salao._doc, distance, isOpened }})
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
module.exports = router