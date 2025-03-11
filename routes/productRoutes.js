const express =require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { createProduct, updateProduct, deleteProduct } = require("../controller/productCtrl");
const { getCompany } = require("../middlewares/companyMiddleware");
const router = express.Router()

router.post('/createProduct', authMiddleware, getCompany, createProduct);	// admin can create with company id, owner can create without company id
router.put('/updateProduct/:sku', authMiddleware, updateProduct);	// admin can update with company id
router.delete('/deleteProduct/:sku', authMiddleware, deleteProduct);	// admin can delete with company id

module.exports = router;