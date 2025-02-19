const generateToken = require('../config/jwtToken');
const user = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const createUser = asyncHandler(async (req, res) => {
	  const email = req.body.email;
	  const findUser = await user.findOne({ email: email });
	  if(findUser) {
		throw new Error('User already exists'); // express-async-handler will catch this error
	  } else {
		  const newUser = await user.create(req.body);
		  res.status(201).json({
			status: 'success',
			data: {
			  user: newUser
			}
		  });
	  }
});

const getuser = asyncHandler(async (req, res) => {
	const {_id} = req.user
	
	try{
	const findUser = await user.findById(_id)	
		if(findUser){
			res.status(200).json({
				data: findUser,
				message: "Fetched successfully"
			})
		} else {
			throw new Error("User not found")
		}
	} catch (error){
		throw new Error(error)
	}
});

const getAllUser = async (req, res) => { // without using asyncHandler
try{
	const users = await user.find()
	if(users){
		res.status(200).json({
			status: 'success',
			data: {
				users
			}
		})
	}
} catch (error) {
	res.status(400).json({
		status: 'fail',
		message: error.message
	})	
	
}
}

const loginUser = asyncHandler(async (req, res) => { //asyncHandler will catch the error
	const { email, password } = req.body;
	const findUser = await user.findOne({ email: email });
	if(findUser && (await findUser.matchPassword(password))){
		res.status(200).json({
			status: 'success',
			data: {
				user: findUser,
				token: generateToken(findUser._id)
			}
		})
	} else {
		throw new Error('Invalid email or password');
	}
});

const deleteUser = asyncHandler(async (req, res) => {
	const { email } = req.body;
	const findUser = await user.findOne({
		email: email
	});
	if(findUser){		
		await findUser.deleteOne();
		res.status(200).json({
			status: 'success',
			message: 'User deleted successfully'
		})
	} else {
		throw new Error('User not found');
	}
});

const deleteAllUser = asyncHandler(async(req, res)=>{	
try {
	await user.deleteMany();
	res.status(200).json({
		status: 'success',
		message: 'All users deleted successfully'
	})
} catch(err){
	throw new Error(err);
}
});

const updateUserByEmail = asyncHandler(async (req, res)=> {
const email = req.user
try {
	const findUser = await user.findOneAndUpdate(email, 
		{
			firstName : req?.body?.firstName,
			lastName: req?.body?.lastName,
			email: req?.body?.email,
		},
		{
			new: true
		})
	if(!findUser) {
		throw new Error("User not found");
	} else {
		res.status(200).json({
			data: findUser,
			status: 'success',
			message: 'updated successfully'
		})
	}
} catch (error) {
	throw new Error(error);
}
});


module.exports = {
  createUser,
  getuser,
  getAllUser,
  loginUser,
  deleteUser,
  deleteAllUser,
  updateUserByEmail
}