const express = require('express');
const { createUser, getAllUser, loginUser, deleteUser, deleteAllUser, updateUserByEmail, getuser, blockUser, unblockUser, updateUser, getAccessToken, logoutUser } = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', createUser);	
router.get('/getUser', authMiddleware, getuser);
router.get('/getAllUser', getAllUser);
router.get('/login', loginUser);
router.get('/getAccessToken', getAccessToken);
router.delete('/delete', deleteUser); // todo: only admin can delete
router.delete('/deleteAllUser', deleteAllUser); // todo: only admin can delete
router.put('/update-user', authMiddleware, updateUser);
router.put('/updateUserByEmail',authMiddleware, updateUserByEmail)
router.put('/block-user/:email', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:email',authMiddleware, isAdmin, unblockUser);
router.put('/logout',authMiddleware, logoutUser);


module.exports = router;