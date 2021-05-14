const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/ejemplo', {useNewUrlParser: true})

const db = mongoose.connection

db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const ejemploRouter = require('./routes/ejemplo')

app.use('/ejemplo', ejemploRouter)

app.listen(3000, () => console.log('Server started'))