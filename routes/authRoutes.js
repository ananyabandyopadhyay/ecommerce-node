const express = require('express');
const { createUser, getAllUser, loginUser, deleteUser, deleteAllUser, updateUserByEmail, getuser } = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', createUser);	
router.get('/getUser/:id', authMiddleware, isAdmin, getuser);
router.get('/getAllUser', getAllUser);
router.get('/login', loginUser);
router.delete('/delete', deleteUser);
router.delete('/deleteAllUser', deleteAllUser);
router.put('/updateUserByEmail/:email',authMiddleware, updateUserByEmail)

module.exports = router;