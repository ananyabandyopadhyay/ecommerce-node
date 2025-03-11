const mongoose = require('mongoose')

const comapnySchema = new mongoose.Schema({
    name: {
        type:String,
		required:true,
        unique: true,
    },
    description: {
        type:String,
		required:false,
    },
    createdBy:{
        type:String,
		required:true,
        unique: true,
    }
})

module.exports = mongoose.model("Company", comapnySchema)