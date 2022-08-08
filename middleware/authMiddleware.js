const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const {User , Role} = require('../models')

const auth = asyncHandler(async (req , res , next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token , process.env.jwt_secret)
            const {id ,nom ,prenom ,email ,avatar ,adresse, Roles} = await User.findOne({where : {id : decoded.id} , include : Role })
            req.user = {id ,nom ,prenom ,email ,avatar ,adresse}
            req.roles = Array.from(Roles).map(role => role.name)
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("not authorized")
        } 
    } else {
        res.status(401)
        throw new Error("not authorized no token")
    }
})

const admin = asyncHandler(async (req, res , next) => {
    if(req.roles.includes('ROLE_ADMIN')){
        next()
    } else {
        res.status(401)
        throw new Error('unauthorized action , admin only')
    }
})


module.exports = {auth , admin}