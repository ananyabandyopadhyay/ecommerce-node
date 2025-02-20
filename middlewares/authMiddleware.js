const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authMiddleware = asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization) {
        const token = req?.headers?.authorization?.split(' ')[1]
        console.log("token========>", token);

        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                console.log("token===>", decoded);
                const findUser = await userModel.findById(decoded.id);
                req.user = findUser
                next()
            }
        }
        catch (error) {
            throw new Error("Not authorized")
        }
    } else {
        throw new Error("No auth token available")
    }

});

const isAdmin = asyncHandler(async (req, res, next) => {
    console.log("req.user.role===>", req.user.role);
    
    try{        
        if(req.user.role !== "admin"){
            throw new Error("not admin")
        } else {
            next()
        }
        
    } catch (err){
        throw new Error("not admin")
    }

});

module.exports = { authMiddleware, isAdmin }