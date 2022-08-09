const {User , Role} = require('../models')

const findUserById = async (id) => {
    return await User.findOne({where : {id} , include : Role})
} 

const getAllUsers = async () => await User.findAll({include : Role})

const updateUser  = async user => await User.update(user , {where : {id: user.id}})

const findRoleByNameOrId = async role => {
    if(!role) return undefined
    const roleinDb = isNaN(role) ? await Role.findOne({where : {name: role}}) : await Role.findOne({where : {id: role}})
    return roleinDb
}

module.exports = {findUserById , getAllUsers , findRoleByNameOrId}