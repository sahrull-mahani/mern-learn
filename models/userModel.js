import mongoose, { mongo } from "mongoose"
import bcrypt from 'bcryptjs'
import validator from "validator"
const { Schema } = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name harus diisi!'],
        unique: [true, 'Username sudah digunakan!']
    },
    email: {
        type: String,
        required: [true, 'Email harus dimasukan!'],
        unique: [true, 'Email sudah terdaftar!'],
        validate: {
            validator: validator.isEmail,
            message: 'Masukan email yang valid! Contoh : foo@example.domain'
        }
    },
    password: {
        type: String,
        required: [true, 'Password harus dimasukan!'],
        minLength: [6, 'Minimal password harus 6 karakter!']
    },
    role: {
        type: String,
        enum: ['user', 'owner'],
        default: 'user'
    }
})

// Middleware
userSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function(reqBody) {
    return await bcrypt.compare(reqBody, this.password)
}

const User = mongoose.model('User', userSchema)

export default User