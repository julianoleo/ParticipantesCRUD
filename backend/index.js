require('dotenv/config')
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./src/routes/routes')
const morgan = require('morgan')
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(router)
app.use(morgan('dev'))
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })