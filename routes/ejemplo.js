const express = require('express')
const router = express.Router()
const Estudiante = require('../models/ejemplo')

//Get all
router.get('/', async (req, res) => {
    try {
        const estudiantes = await Estudiante.find()
        res.json(estudiantes)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Get one
router.get('/:id', getEstudiante, (req, res) => {
    res.json(res.estudiante)
})

//Create one
router.post('/', async (req, res) => {
    const estudiante = new Estudiante({
        name: req.body.name,
        grade: req.body.grade
    })

    try {
        const newEstudiante = await estudiante.save()
        res.status(201).json(newEstudiante)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

//Update one
router.patch('/:id', getEstudiante, async (req, res) => {
    if (req.body.name != null) {
        res.estudiante.name = req.body.name
    }
    if (req.body.grade != null) {
        res.estudiante.grade = req.body.grade
    }
    try {
        const updatedEstudiante = await res.estudiante.save()
        res.json(updatedEstudiante)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Delete one
router.delete('/:id', getEstudiante, async (req, res) => {
    try {
        await res.estudiante.remove()
        res.json({ message: 'Estudiante eliminado'} )
    } catch (err) {
        res.status(500).json( {message: 'Estudiante eliminado'} )
    }
})

//middleware
async function getEstudiante(req, res, next) {
    let estudiante
    try {
        estudiante = await Estudiante.findById(req.params.id)
        if (estudiante == null) {
            return res.status(404).json( {message: 'Estudiante no encontrado'} )
        }
    } catch (err) {
        return res.status(500).json( {message: err.message} )
    }

    res.estudiante = estudiante
    next()
}

module.exports = router