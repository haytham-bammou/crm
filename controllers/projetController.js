const {Projet } = require('../models')
const asyncHandler = require('express-async-handler')
const { findProjetByID } = require('../repository/projetRepository')
const { findOrganismeByID } = require('../repository/organismeRepository')

const addProjet = asyncHandler(async (req, res) => {
    const {nom , site , description,organismeId} = req.body 
    if(!nom || !site || !description) {
        res.status(400)
        throw new Error('please fill required fields')
    }
    const projetExist = await Projet.findOne({where : {nom}})
    if(projetExist) {
        res.status(400)
        throw new Error('projet already exists')
    }
    const organisme = await findOrganismeByID(organismeId) 
    if(! organisme){
        res.status(404)
        throw new Error('organisme not found')
    }
    const projetCreated = await Projet.create({...req.body})
    await organisme.addProjet(projetCreated)
    
    res.json(projetCreated)
})


const getAllProjets = asyncHandler(async (req, res) => {
    const projets = await Projet.findAll()
    res.json(projets)
})

const getProjetById = asyncHandler(async (req, res) => { 
    const projet = await findProjetByID(req.params.id)
    if(!projet) {
        res.status(404)
        throw new Error('Projet not found')
    }
    res.json(projet)
})

const updateProjet = asyncHandler(async (req, res) => {
    const projet = await findProjetByID(req.params.id)
    if(!projet) {
        res.status(404)
        throw new Error('Projet not found')
    }
    await projet.update({...req.body})
    res.json(projet)
})

const deleteProjet = asyncHandler(async (req , res) => {
    const projet = await findProjetByID(req.params.id)
    if(!projet) {
        res.status(404)
        throw new Error('Projet not found')
    }
    await projet.destroy()
    res.json({message : "projet deleted"})
})


module.exports = {addProjet , getAllProjets , getProjetById , updateProjet , deleteProjet}