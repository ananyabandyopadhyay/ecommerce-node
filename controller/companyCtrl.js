const asyncHandler = require("express-async-handler");
const company = require("../models/companyModel");
const user = require("../models/userModel");

const createCompany = asyncHandler(async (req, res) => {
    const owner = req.user.firstName + ' ' + req.user.lastName
    const name = req.body.name
    const findCompany = await company.findOne({ name: name });
    
    if(findCompany) {
    throw new Error('Company already exists'); // express-async-handler will catch this error
    } else {
        const companydata = {name: req.body.name,createdBy: owner }
        const newCompany = await company.create(companydata);
        res.status(201).json({
        status: 'success',
        data: {
            company: newCompany
        }
        });
    }
})

const updateCompany = asyncHandler(async (req, res) => {
    const owner = req.user.firstName + ' ' + req.user.lastName
    const name = req.params.name
    const findCompany = await company.findOne({ name: name });
    if(findCompany) {
        const companydata = {name: req?.body?.name,createdBy: owner, description: req?.body?.description }
        const newCompany = await company.findOneAndUpdate({ name: name }, companydata, {
            new: true
        });
        res.status(201).json({
        status: 'success',
        data: {
            company: newCompany
        }
        });
    } else {
        throw new Error('Company does not exists');
    }

})

const deleteCompany = asyncHandler( async (req, res) => {
    // const owner = req.user.firstName + ' ' + req.user.lastName
    const name = req.params.name
    const findCompany = await company.findOne({ name: name });
    if(findCompany) {
        // const companydata = {name: req?.body?.name,createdBy: owner, description: req?.body?.description }
        const newCompany = await company.findOneAndDelete({ name: name });
        res.status(201).json({
        status: 'success',
        data: {
            company: newCompany
        }
        });
    } else {
        throw new Error('Company does not exists');
    }
})

module.exports = {createCompany, updateCompany, deleteCompany}