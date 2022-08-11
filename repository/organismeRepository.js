const {Organisme , User}  = require('../models')

const findOrganismeByID = async id => await Organisme.findOne({where : {id} , include : User})

module.exports = {findOrganismeByID}