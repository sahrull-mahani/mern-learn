import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import asyncHandler from '../middlewares/asyncMiddleware.js'

const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '6d'
    })
}

const createSendResToken = (user, statusCode, res) => {
    const token = signToken(user._id)

    const isDev = process.env.NODE_ENV === 'development' ? false : true

    const cookieOption = {
        expire: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        security: isDev
    }

    res.cookie('jwt', token, cookieOption)

    user.password = undefined

    res.status(statusCode).json({
        data: user
    })
}

export const registerUser = asyncHandler(async (req, res) => {
    const isOwner = (await User.countDocuments()) === 0 

    const role = isOwner ? 'owner' : 'user'

    const createUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role
    })

    createSendResToken(createUser, 201, res)
})