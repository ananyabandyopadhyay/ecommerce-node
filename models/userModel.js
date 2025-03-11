const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcryptjs');
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
	firstName:{
		type:String,
		required:true,
	},
	lastName:{
		type:String,
		required:true,
	},
	email:{
		type:String,
		required:true,
		unique:true,
	},
	password:{
		type:String,
		required:true,
	},
	role:{
		type:String,
		required:false,
		default:"user"
	},
	address:{
		type:Array,
		require:false,
		default:[]
	},
	cart:{
		type:Array,
		require:false,
		default:[]
	},
	wishlist:{
		type:Array,
		require:false,
		default:[]
	},
	isBlocked:{
		type:Boolean,
		default:false
	},
	refreshToken: {
		type:String,
		default:""
	}
}, {timeStamps: true});

userSchema.pre("save", async function(next){
	if(!this.isModified("password")){
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.matchPassword = async function(enteredPassword){
	return await bcrypt.compare(enteredPassword, this.password);
}
//Export the model
module.exports = mongoose.model('Users', userSchema);