const asyncHandler = require("express-async-handler");
const companyModel = require("../models/companyModel");

const getCompany = asyncHandler(async (req, res, next) => {
    
    
    if(req.user.role === "owner"){
        const owner = req.user.firstName + ' ' + req.user.lastName
        const companyId = req.body.companyId
        const findCompanywithId = await companyModel.findOne({createdBy : owner, companyId : companyId})
        const findCompany = await companyModel.findOne({createdBy : owner})
        if(!findCompanywithId){
            throw new Error('Company can not found')
        }else if(findCompanywithId && findCompany){
            console.log("company1====>", findCompany);
            req.company = findCompany
            next()
        }
    } else if (req.user.role === "admin"){
        console.log("req.user.role", req.user.role);
        const companyId = req.body.companyId
        const findCompany = await companyModel.findOne({_id : companyId})
        if(findCompany){
            console.log("company2====>", findCompany);
            req.company = findCompany
            next()
        } 
    } else {
        throw new Error('Company can not found');
    }
})

module.exports = {getCompany}