const express = require('express')
const router = express.Router()
const salao = require('../models/salao')
const servicos = require('../models/servico')
const turf = require('@turf/turf')
router.post('/', async(req, res) => {
    try {
        const Salao = await new salao(req.body).save()
        res.json({ Salao })
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
        const Salao = await salao.findById(req.params.id).select('capa nome endereco.cidade geo.coordinates')
            //distancia
        const distance = turf.distance(turf.point(Salao.geo.coordinates), turf.point([-19.9398078, -43.9299193]))
        res.json({ Salao, distance })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
module.exports = router