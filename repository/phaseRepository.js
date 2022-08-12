const {Showroom , User}  = require('../models')

const findPhaseByID = async id => await Showroom.findOne({where : {id}})

module.exports = {findPhaseByID}