const express = require('express')
const router = express.Router()
const Busboy = require('busboy')
const aws = require('../services/aws')
const salao = require('../models/salao')
const Arquivo = require('../models/arquivo')
const servicos = require('../models/servico')
    /*Rota recebe FormData*/
router.post('/', async(req, res) => {
    let busboy = new Busboy({ headers: req.headers })
    busboy.on('finish', async() => {
        try {
            const { salaoId, servico } = req.body
            let errors = []
            let arquivos = []

            if (req.files && Object.keys(req.files).length > 0) {
                for (let key of Object.keys(req.files)) {
                    const file = req.files[key]
                    const nameParts = file.name.split('.')
                    const filename = `${new Date().getTime()}.${nameParts[nameParts.length - 1]}`

                    const path = `servicos/${salaoId}/${filename}`
                    const response = await aws.uploadToS3(file, path)

                    if (response.error) {
                        errors.push({ error: true, message: response.message })
                    } else {
                        arquivos.push(path)
                    }
                }
            }
            if (errors.length > 0) {
                res.json(errors[0])
                return false
            }
            //criar serviço
            let jsonServico = JSON.parse(servico)
            const servicoCadastrado = await servicos.Servico(jsonServico).save()
                //criar arquivo
            arquivos = arquivos.map(arquivo => ({
                referenciaId: servicoCadastrado.id,
                model: 'Servico',
                caminho: arquivo
            }))

            await Arquivo.Arquivo.insertMany(arquivos)
            res.json({ servico: servicoCadastrado, arquivos })
        } catch (err) {
            res.json({ error: true, message: err.message })
        }
    })
    req.pipe(busboy)
})
router.put('/:id', async(req, res) => {
    let busboy = new Busboy({ headers: req.headers })
    busboy.on('finish', async() => {
        try {
            const { salaoId, servico } = req.body
            let errors = []
            let arquivos = []

            if (req.files && Object.keys(req.files).length > 0) {
                for (let key of Object.keys(req.files)) {
                    const file = req.files[key]
                    const nameParts = file.name.split('.')
                    const filename = `${new Date().getTime()}.${nameParts[nameParts.length - 1]}`

                    const path = `servicos/${salaoId}/${filename}`
                    const response = await aws.uploadToS3(file, path)
                    if (response.error) {
                        errors.push({ error: true, message: response.message })
                    } else {
                        arquivos.push(path)
                    }
                }
            }
            if (errors.length > 0) {
                res.json(errors[0])
                return false
            }
            //criar serviço
            const jsonServico = JSON.parse(servico)
            console.log("JSONServico: ", jsonServico)
            console.log("Params id: ", req.params.id)
            await servicos.Servico.findByIdAndUpdate(salaoId, jsonServico)
                //criar arquivo
            arquivos = arquivos.map(arquivo => ({
                referenciaId: req.params.id,
                model: 'Servico',
                caminho: arquivo
            }))

            await Arquivo.Arquivo.insertMany(arquivos)
            res.json({ error: false })
        } catch (err) {
            res.json({ error: true, message: err.message })
        }
    })
    req.pipe(busboy)
})
router.delete('/arquivo/:id', async(req, res) => {
    try {
        const { id } = req.params
        await AWS.deleteFileS3(id)
        await Arquivo.Arquivo.findOneAndDelete({ caminho: id })
        res.json({ error: false })
    } catch (err) {
        res.json({ error: true, message: err.message })
    }
})
module.exports = router