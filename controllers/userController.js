const {User , Role} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const registerUser = asyncHandler(async (req, res) => {
    const {nom , prenom , email , avatar , adresse , password} = req.body
    if(!nom  || !prenom || !email || !password || !adresse) {
        res.status(400)
        throw new Error('Please add all fields')
    }
    const userExist = await User.findOne({where : { email} , include : Role})
    if(userExist){
        res.status(400)
        throw new Error('User already exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password , salt)
    const user = await User.create({
        nom , prenom , email , avatar , adresse , password : hashedPassword,
    })
    res.json({
        id : user.id,
        nom : user.nom,
        prenom : user.prenom,
        email : user.email,
        avatar : user.avatar,
        adresse : user.adresse,
        token : genToken(user.id)
    })

})


const saveRole = asyncHandler(async (req  , res) => {
    const {name} = req.body
    if(!name) {
        res.status(400)
        throw new Error('please give a role name')
    }
    const role = await Role.create({name})
    res.json(role)
})

const addRoleToUser = asyncHandler(async (req , res) => {
    const {userId , roleId} = req.body
    const role = await Role.findOne({where : {id : roleId}})
    const user = await User.findOne({where : {id: userId}})
    if(!role || !user) {
        res.status(404)
        throw new Error("Role or User not found")
    }else {
        await user.addRole(role)
        res.json({message: `role : ${role.name} added to user : ${user.nom}`})
    }

})

const getMe = asyncHandler(async (req  , res) => {
  const {id ,nom ,prenom ,email ,avatar ,adresse} = req.user  
  res.json({id ,nom ,prenom ,email ,avatar ,adresse})
})

const loginUser = asyncHandler(async (req , res) => {
    const {email , password } = req.body
    const user = await User.findOne({ where : {email} , include : Role })
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            id : user.id,
            nom : user.nom,
            prenom : user.prenom,
            email : user.email,
            avatar : user.avatar,
            adresse : user.adresse,
            roles : Array.from(user.Roles).map(role => role.name),
            token : genToken(user.id)
        })
    } else {
        res.status(404)
        throw new Error('Invalid credentials')
    }
})

const genToken = (id) => {
    return jwt.sign({id} , process.env.jwt_secret , {
        expiresIn : '30d'
    })
}


module.exports = {registerUser , saveRole , addRoleToUser , loginUser , getMe}