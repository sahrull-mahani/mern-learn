import mongoose, { mongo } from "mongoose"
import bcrypt from 'bcryptjs'
import validator from "validator"
const { Schema } = mongoose

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Nama produk harus dimasukan!'],
        unique: [true, 'Nama produk sudah terdaftar!']
    },
    price: {
        type: Number,
        required: [true, 'Harga harus dimasukan!'],
    },
    description: {
        type: String,
        required: [true, 'Deskripsi produk harus dimasukan!']
    },
    image: {
        type: String,
        default: null
    },
    category: {
        type: String,
        required: [true, 'Kategori prodak harus dimasukan!'],
        enum: ['sepatu', 'kemeja', 'baju', 'celana']
    },
    stock: {
        type: Number,
        default: 0
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product