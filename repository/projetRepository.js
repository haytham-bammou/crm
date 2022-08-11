const {Projet , User}  = require('../models')

const findProjetByID = async id => await Projet.findOne({where : {id}})

module.exports = {findProjetByID}