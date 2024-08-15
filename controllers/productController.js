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
    const id = req.params.id
    const product = await Product.findByIdAndUpdate(id, req.body, {
        runValidators:false,
        new: true
    })
    
    return res.status(200).json({
        message: 'Update product berhasil',
        data: product
    })
})

export const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id
    await Product.findByIdAndDelete(id)

    return res.status(200).json({
        message: 'Delete succesfully',
    })
})

export const fileUpload = asyncHandler(async (req, res) => {
    res.send('file upload product')
})