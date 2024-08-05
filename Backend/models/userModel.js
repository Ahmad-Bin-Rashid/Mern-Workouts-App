
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

// static signup method
userSchema.statics.signup = async function(username, email, password){
    
    // validation
    if (!username || !email || !password) {
        throw Error('All fields must be filled!!')
    }

    if (!validator.isEmail(email)) {
        throw Error('Invalid Email!!')
    }

    if (!validator.isAlphanumeric(username)) {
        throw Error('Username should contain alphabets or numbers!!')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong!!')
    }

    const checkEmail = await this.findOne({ email })

    if (checkEmail) {
        throw Error('Email already exists!!')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ username, email, password: hash })

    return user
}

module.exports = mongoose.model('User', userSchema)