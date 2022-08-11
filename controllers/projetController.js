const {Projet, Image } = require('../models')
const asyncHandler = require('express-async-handler')
const { findProjetByID } = require('../repository/projetRepository')
const { findOrganismeByID } = require('../repository/organismeRepository')

const addProjet = asyncHandler(async (req, res) => {
    const {nom , site , description,organismeId , images} = req.body 
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
    let image
    images.forEach(async image => {
        image = await Image.create({url : image.url})
        projetCreated.addImage(image)
    })
    await organisme.addProjet(projetCreated)
    
    res.json(projetCreated)
})


const getAllProjets = asyncHandler(async (req, res) => {
    const projets = await Projet.findAll({include : {Image}})
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
    let img
    req.body.images.forEach(async image => {
        img = await Image.create({url : image.url})
        await projet.addImage(img)
    })
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