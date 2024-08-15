import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asycnHandler from '../middlewares/asyncMiddleware.js'

export const protectedMiddleware = asycnHandler(async (req, res, next) => {
    let token

    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Unauthorized, invalid token!')
        }
    } else {
        res.status(401)
        throw new Error('Unauthorized, token not found!')
    }
})

export const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'owner') {
        next()
    } else {
        res.status(401)
        throw new Error('You don\'t have access!')
    }
}