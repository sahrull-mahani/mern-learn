import Product from '../models/productModel.js'
import asyncHandler from '../middlewares/asyncMiddleware.js'

export const cerateProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body)

    return res.status(201).json({
        message: 'berhasil tambah prodak',
        data: product
    })
})

export const allProduct = asyncHandler(async (req, res) => {
    const products = await Product.find()

    return res.status(200).json({
        message: `${products.length} Product Found`,
        data: products
    })
})

export const detailProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        res.status(404)
        throw new Error('Data tidak ditemukan!')
    }
    
    return res.status(200).json({
        message: `${product.name} Ditemukan`,
        data: product
    })
})

export const updateProduct = asyncHandler(async (req, res) => {
    res.send('udpate product')
})

export const deleteProduct = asyncHandler(async (req, res) => {
    res.send('delete product')
})

export const fileUpload = asyncHandler(async (req, res) => {
    res.send('file upload product')
})