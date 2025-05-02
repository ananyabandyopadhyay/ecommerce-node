const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// router.post('/order/checkout', authMiddleware, createOrder)
// router.get('/order/:id', authMiddleware, getOrderById)
// router.get('/orders', authMiddleware, getAllOrder)
// router.put('/order/:id/status', authMiddleware, isAdmin, updateOrder) //admin only

module.exports = router;
