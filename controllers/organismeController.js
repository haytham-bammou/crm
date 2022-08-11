const {User , Organisme} = require('../models')
const asyncHandler = require('express-async-handler')
const { findOrganismeByID } = require('../repository/organismeRepository')


const addOrganisme = asyncHandler(async (req, res) => {
    const {nom , adress , telephone,logo} = req.body 
    if(!nom || !adress || !telephone) {
        res.status(400)
        throw new Error('please fill required fields')
    }
    const organismeExist = await Organisme.findOne({where : {nom}})
    if(organismeExist) {
        res.status(400)
        throw new Error('organisme already exists')
    }
    const organismeCreated = await Organisme.create({...req.body})
    res.json(organismeCreated)
})


const getAllOrganismes = asyncHandler(async (req, res) => {
    const organismes = await Organisme.findAll()
    res.json(organismes)
})


const getOrganismeById = asyncHandler(async (req, res) => { 
    const organisme = await findOrganismeByID(req.params.id)
    if(!organisme) {
        res.status(404)
        throw new Error('Organisme not found')
    }
    res.json(organisme)
})


const updateOrganisme = asyncHandler(async (req, res) => {
    const organisme = await findOrganismeByID(req.params.id)
    if(!organisme) {
        res.status(404)
        throw new Error('Organisme not found')
    }
    await organisme.update({...req.body})
    res.json(organisme)
})


const deleteOrganisme = asyncHandler(async (req , res) => {
    const organisme = await findOrganismeByID(req.params.id)
    if(!organisme) {
        res.status(404)
        throw new Error('Organisme not found')
    }
    await organisme.destroy()
    res.json({message : "organisme deleted"})
})

const getOrganismeEmployees = asyncHandler(async (req, res) => {
    const id = req.params.id
    const organisme = await Organisme.findOne({where : {id} , include : User})
    if(!organisme) {
        res.status(404)
        res.json({message : "Organisme not found"})
    }
    res.json(organisme.Users)
})

module.exports = {addOrganisme , getAllOrganismes , getOrganismeById , updateOrganisme , deleteOrganisme , getOrganismeEmployees}