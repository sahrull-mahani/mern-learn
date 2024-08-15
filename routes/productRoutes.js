import express from 'express'
import { protectedMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js'
import { cerateProduct, allProduct, detailProduct, updateProduct, deleteProduct, fileUpload } from '../controllers/productController.js'
import { upload } from '../utils/uploadFileHandler.js'

const router = express.Router()

// CRUD Product
// Create data
// POST /api/v1/product
// middleware only owner 
router.post('/', protectedMiddleware, adminMiddleware, cerateProduct)

// Read data
// GET /api/v1/product
router.get('/', allProduct)

// Read data
// GET /api/v1/product
router.get('/:id', detailProduct)

// Update data
// PUT /api/v1/product/:id
// middleware only owner 
router.put('/:id', protectedMiddleware, adminMiddleware, updateProduct)

// Delete data
// DELETE /api/v1/product/:id
// middleware only owner 
router.delete('/:id', protectedMiddleware, adminMiddleware, deleteProduct)

// File Upload data
// POST /api/v1/product/file-upload
// middleware only owner 
router.post('/file-upload', protectedMiddleware, adminMiddleware, upload.single('image'), fileUpload)

export default router