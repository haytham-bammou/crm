const {Showroom , User}  = require('../models')

const findShowroomByID = async id => await Showroom.findOne({where : {id}})

module.exports = {findShowroomByID}