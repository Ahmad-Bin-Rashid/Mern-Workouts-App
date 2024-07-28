const User = require("../models/userModel");
const mongoose = require('mongoose')

// get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 })

    if (!users) {
        return res.status(404).json({ error: 'No users avaiable!' })
    }
    res.status(200).json(users)
}

// get a single user
const getUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID!' })
    }

    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ error: 'No such user!' })
    }

    res.status(200).json(user)
}


// to log in the user
const loginUser = async (req, res) => {
    res.json({mssg: 'User login'})
}


// to create new user
const signupUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        const user = await User.signup(username, email, password)
        res.status(200).json({email, user})
    } 
    catch (error) {
        res.status(400).json({error: error.message})
    }

}

// delete the user
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID!' })
    }

    const user = await User.findOneAndDelete({ _id: id })

    if (!user) {
        return res.status(404).json({ error: 'Unable to delete User!' })
    }

    res.status(200).json(user)
}


module.exports = { getUsers, getUser, loginUser, signupUser, deleteUser }