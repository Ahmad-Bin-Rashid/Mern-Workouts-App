const express = require('express')
const { getUsers, getUser, loginUser, signupUser, deleteUser } = require('../controllers/userController')

const router = express.Router()

// get all users
router.get('/admin', getUsers)

// get a single user
router.get('/:id', getUser)

// user Login
router.post('/login', loginUser)

// user Signup
router.post('/signup', signupUser)

// delete a user
router.delete('/:id', deleteUser)

module.exports = router