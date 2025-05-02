const asyncHandler = require("express-async-handler");
const cartModel = require("../models/cartModel");
const productModel = require("../models/productModel");

const addToCart = asyncHandler(async(req, res)=> {
    console.log("user", req);
    const data = {
        userEmail: req.user.email,
        item: {
            sku:req.body.sku, 
            quantity:1
        }
    }
    const findCart = await cartModel.findOne({userEmail: req.user.email})
    if(findCart){
        console.log("findCart", findCart);
        
        throw new Error('Cart already exist');
    } else {
        const newProduct = await cartModel.create(data)
        res.status(201).json({
            status: 'success',
            data: newProduct
        })
    }
    
})

const updateCart = asyncHandler(async (req, res) => {
    const sku = req?.body?.sku;
    const userEmail = req.user.email;
  
    const findProduct = await productModel.findOne({ sku });
    if (!findProduct) {
      return res.status(404).json({ status: 'fail', message: 'Product not found' });
    }
  
    const findCart = await cartModel.findOne({ userEmail });
  
    let updatedItems = [];
  
    if (findCart && findCart.item?.length > 0) {
      const itemIndex = findCart.item.findIndex(item => item.sku === sku);
  
      if (itemIndex !== -1) {
        updatedItems = findCart.item.map(item => 
          item.sku === sku
            ? { sku: item.sku, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...findCart.item, { sku, quantity: 1 }];
      }
    } else {
      updatedItems = [{ sku, quantity: 1 }];
    }
  
    const updatedCart = await cartModel.findOneAndUpdate(
      { userEmail },
      { item: updatedItems },
      { new: true, upsert: true } 
    );
  
    res.status(201).json({
      status: 'success',
      data: updatedCart,
    });
  });
  

const removeItem = asyncHandler(async(req, res) => {
    const sku = req?.params.sku;
    const findCart = await cartModel.findOne({userEmail: req.user.email})
    if (!findCart) {
        return res.status(404).json({ 
            status: 'fail', 
            message: 'Cart not found' 
        });
    }

    const updatedItems = findCart.item
    .map(item => {
        if (item.sku === sku) {
            const newQty = item.quantity - 1;
            if (newQty > 0) {
                return { sku: item.sku, quantity: newQty };
            } else {
                return null; 
            }
        }
        return item;
    })
    .filter(Boolean);
    
    const updatedData = await cartModel.findOneAndUpdate(
        {userEmail: req.user.email}, 
        {item:updatedItems}, 
        {new:true}
    )
    res.status(201).json({
        status: 'success',
        data: updatedData
    })
})

const clearCart = asyncHandler(async(req, res)=> {
    await cartModel.deleteOne(
        {userEmail: req.user.email}
    )
    res.status(201).json({
        status: 'success'
    })
})

const getCartDetails = asyncHandler(async(req, res) => {
    const cartData = await cartModel.findOne({userEmail: req.user.email})
    res.status(201).json({
        status: 'success',
        data: cartData
    })
})

const getMiniCartdetails = asyncHandler(async(req, res) => {
    const cartData = await cartModel.findOne({userEmail: req.user.email})

    if(!cartData) {
      return res.status(404).json({ status: 'fail', message: 'Cart not found' });
    }

    if(cartData.item.length < 0){
        return res.status(201).json({
            status: 'success',
            data: cartData
        })
    }

    const details = cartData.item.map(async(item) => {
        const productDetails = await productModel.findOne({sku: item.sku})
        return {productDetails: productDetails, quantity: item.quantity}
    })

    const results = await Promise.all(details);


    console.log("details", results);
    

    res.status(201).json({
        status: 'success',
        data: results
    })
})

module.exports = {addToCart, updateCart, removeItem, clearCart, getCartDetails, getMiniCartdetails}
