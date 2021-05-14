const mongoose = require('mongoose')
const { estudiante } = require('../routes/ejemplo')

const estudianteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Estudiante', estudianteSchema)