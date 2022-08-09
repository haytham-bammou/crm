const {User , Role} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const { findUserById, getAllUsers, findRoleByNameOrId } = require('../repository/userRepositiry')

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
  res.json({id ,nom ,prenom ,email ,avatar ,adresse , roles : req.roles})
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

const fetchUser = asyncHandler( async (req, res) => {
    const id = req.params.id
    const user = await findUserById(id)
    if(!user) {
        res.status(404)
        throw new Error('User not found')
    }
    res.json(user)
}) 

const fetchAllUsers = asyncHandler(async (req, res) => res.json(await getAllUsers()))

const updateUser  = asyncHandler(async (req, res) =>{
    const user = await findUserById(req.params.id)
    if(!user) {
        res.status(404)
        throw new Error("User not found")
    }
    const role = await findRoleByNameOrId(req.body.role)
    const roles = req.body.role && role && user.Roles.filter(rl => rl.id !== role.id ).length !==0 ?  [...user.Roles , role] : user.Roles
    await user.update({...req.body , Roles:roles}) 
    res.json(user)
    
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await findUserById(req.params.id)
    if(!user) {
        res.status(404)
        throw new Error("user not found")
    }
    await user.destroy()
    res.json({message: 'User deleted successfully.'})
})

const deleteRole = asyncHandler(async (req , res) => {
    const role = await findRoleByNameOrId(req.params.id)
    if(!role){
        res.status(404)
        throw new Error("Role not found")
    }
    await role.destroy()
    res.json({message : 'role destroyed'})
})

const genToken = (id) => {
    return jwt.sign({id} , process.env.jwt_secret , {
        expiresIn : '30d'
    })
}


module.exports = {registerUser , saveRole ,deleteRole , addRoleToUser , loginUser , getMe , fetchUser , fetchAllUsers , updateUser , deleteUser}