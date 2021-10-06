const express = require('express')
const router = express.Router()
const salao = require('../models/salao')
const servicos = require('../models/servico')
router.post('/', async(req, res) => {
    try {
        const Salao = await new salao.Salao(req.body).save()
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
module.exports = router