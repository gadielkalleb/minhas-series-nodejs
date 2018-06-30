const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

// 'mongodb://127.0.0.1:27017/' 
const mongo = process.env.MONGODB || 'mongodb://gadi:1Pieceluffy@ds117061.mlab.com:17061/minhas-series'

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// rotas
const pages = require('./routes/pages')
const series = require('./routes/series')

// process request body
app.use(bodyParser.urlencoded({ extended: true }))

// assets
app.use(express.static('public'))

// view engine - EJS
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.use('/', pages)
app.use('/series', series)

mongoose.connect(mongo).then(() => {
  app.listen(port, () => console.log('escutando app na porta ' + port+' acesse o link http://localhost:'+port))
}).catch(e => console.log(e))