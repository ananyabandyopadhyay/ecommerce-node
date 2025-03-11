const asyncHandler = require("express-async-handler");
// const { findOne } = require("../models/userModel");
const productModel = require("../models/productModel");
const { findOne } = require("../models/userModel");

const createProduct = asyncHandler(async(req, res)=> {
    const sku = req.body.sku
    const findProduct = await productModel.findOne({sku : sku})
    
    if(findProduct){
        throw new Error('product already exists');
    } else {
        const data = {companyId: req.company._id ,...req.body}
        const newProduct = await productModel.create(data)
        res.status(201).json({
            status: 'success',
            data: newProduct
        })
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const sku = req.params.sku
    const data = {
        name: req?.body?.name,
        description: req?.body?.name,
        price: req?.body?.price,
    }
    const updatedProduct =  await productModel.findOneAndUpdate({sku: sku}, data, {new:true})
    if(updatedProduct && (req.user.role === "admin" || req.user.role === "owner" )) {
        res.status(201).json({
            status: 'success',
            data: updatedProduct
        })
    } else {
        throw new Error("something went wrong")
    }
})

const deleteProduct =  asyncHandler(async (req, res) => {
    const sku = req.params.sku
    const deletedProduct =  await productModel.findOneAndDelete({sku: sku})
    if(deletedProduct && (req.user.role === "admin" || req.user.role === "owner" )) {
        res.status(201).json({
            status: 'success',
            data: deletedProduct
        })
    } else {
        throw new Error("something went wrong")
    }
})

module.exports = {createProduct, updateProduct, deleteProduct}