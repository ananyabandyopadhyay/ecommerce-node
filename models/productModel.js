const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        require: true,
        type: String
    },
    sku: {
        require: true,
        type: String,
        unique: true
    },
    description: {
        require: false,
        type: String
    },
    price: {
        require:false,
        type: Number,
        default: 0
    },
    companyId: {
        require:true,
        type: String,
    }

})

module.exports = mongoose.model("Products", productSchema)