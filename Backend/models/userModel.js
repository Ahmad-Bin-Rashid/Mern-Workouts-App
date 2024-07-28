
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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