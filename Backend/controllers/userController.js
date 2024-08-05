const User = require("../models/userModel");
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

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

        //create a jwt token
        const token = createToken(user._id)

        res.status(200).json({username, email, token})
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

// https://www.bilibili.tv/en/video/2044237320?bstar_from=bstar-web.ugc-video-detail.related-recommend.all