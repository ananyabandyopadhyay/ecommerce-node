const express = require("express");
const { authMiddleware, isOwner } = require("../middlewares/authMiddleware");
const { createCompany, updateCompany, deleteCompany } = require("../controller/companyCtrl");
const router = express.Router();

router.post('/createCompany', authMiddleware, isOwner, createCompany);	// owner can create company
router.put('/updateCompany/:name', authMiddleware, isOwner, updateCompany);	// owner can update company
router.delete('/deleteCompany/:name', authMiddleware, isOwner, deleteCompany);	// owner can delete company

module.exports = router;