const {Projet , Phase}  = require('../models')

const findProjetByID = async id => await Projet.findOne({where : {id},include : Phase})

module.exports = {findProjetByID}