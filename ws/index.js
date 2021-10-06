const express = require('express')
const app = express()
const morgan = require('morgan')
require('./database')
const router = require('./src/routes/salao.routes')
const routerServico = require('./src/routes/servico.routes')
const cors = require('cors')
const busboy = require('connect-busboy')
const busboyBodyParser = require('busboy-body-parser')
    //Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(busboy())
app.use(busboyBodyParser())
app.use(cors())
    //Variables
app.set('port', 8081)
    //rotas
app.use('/salao', router)
app.use('/servico', routerServico)

app.listen(app.get('port'), () => {
    console.log(`Server Iniciado na porta ${app.get('port')}`)
})