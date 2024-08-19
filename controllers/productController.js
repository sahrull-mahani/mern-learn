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
    // Req query
    const queryObj = { ...req.query }

    // fungsi abaikan jika ada page atau limit
    const excludeField = ['page', 'limit', 'name']
    excludeField.forEach(element => delete queryObj[element])

    let query

    if (req.query.name) {
        query = Product.find({
            name: {$regex: req.query.name, $options: 'i'}
        })
    }else{
        query = Product.find(queryObj)
    }


    // Pagination
    const page = req.query.page * 1 || 1 // convert string to int
    const limit = req.query.limit * 1 || 30
    const skip = (page - 1) * limit

    query = query.skip(skip).limit(limit)

    const total = await Product.countDocuments(queryObj)
    if (req.query.page) {
        if (skip >= total) {
            res.status(404)
            throw new Error('This page doesn\'t exist!')
        }
    }

    const data = await query

    return res.status(200).json({
        message: 'Data ditemukan',
        data,
        total
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
        runValidators: false,
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
    const file = req.file

    if (!file) {
        res.status(400)
        throw new Error('Upload file not found!')
    }

    const imageFileName = file.filename
    const pathImageFile = `/uploads/${imageFileName}`

    res.status(201).json({
        message: 'Image upload file successfully',
        image: pathImageFile
    })
})