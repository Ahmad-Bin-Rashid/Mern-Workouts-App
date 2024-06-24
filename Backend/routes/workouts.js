
const express = require('express')
const Workout = require('../models/workoutModel')
const {
    createWorkout,
} = require('../controllers/workoutController')
const router = express.Router()

// get all workouts
router.get('/', (req, res) => {
    res.json({mssg: 'get all workouts'})
})

// get a new workout
router.get('/:id', (req, res) => {
    res.json({mssg: 'get a single workout'})
})

// post a new workout
router.post('/', createWorkout)

// delete a workout
router.delete('/:id', (req, res) => {
    res.json({mssg: 'delete a workout'})
})

// update a workout
router.patch('/:id', (req, res) => {
    res.json({mssg: 'update a workout'})
})

module.exports = router