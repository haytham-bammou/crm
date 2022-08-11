const {Phase , User}  = require('../models')

const findPhaseByID = async id => await Phase.findOne({where : {id}})

module.exports = {findPhaseByID}