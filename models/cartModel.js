const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    sku: {
        require: true,
        type: String
    },
    quantity: {
        require: false,
        type: Number
    }
});

const cartSchema = new mongoose.Schema({
    userEmail: {
        require: true,
        type: String
    },
    item: {
        require: true,
        type: [cartItemSchema],
    }
})

module.exports = mongoose.model("Cart", cartSchema)