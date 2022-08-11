const {Projet , Phase , Image}  = require('../models')

const findProjetByID = async id => await Projet.findOne({where : {id},include : [Phase , Image]})

module.exports = {findProjetByID}