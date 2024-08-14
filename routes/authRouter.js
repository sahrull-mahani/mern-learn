import express from 'express'
import { registerUser } from '../controllers/authController.js'

const router = express.Router()

// POST /api/v1/auth/register
router.post('/register', registerUser)

// POST /api/v1/auth/login
router.post('/login', (req, res) => {
    res.send('Login')
})

// GET /api/v1/auth/logout
router.get('/logout', (req, res) => {
    res.send('Logout')
})

// GET /api/v1/auth/getuser
router.get('/getuser', (req, res) => {
    res.send('Get Current User')
})

export default router