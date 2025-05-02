const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { addToCart, updateCart, removeItem, clearCart, getCartDetails, getMiniCartdetails } = require('../controller/cartCtrl');

const router = express.Router();

router.post('/cart/add', authMiddleware, addToCart)
router.put('/update', authMiddleware, updateCart)
router.delete('/remove/:sku', authMiddleware, removeItem)
router.delete('/clear', authMiddleware, clearCart)
router.get('/details', authMiddleware, getCartDetails)
router.get('/miniCartDetails', authMiddleware, getMiniCartdetails)

module.exports = router;
