const {Phase } = require('../models')
const asyncHandler = require('express-async-handler')
const { findPhaseByID } = require('../repository/phaseRepository')
const { findProjetByID } = require('../repository/projetRepository')

const addPhase = asyncHandler(async (req, res) => {
    const {nom , debut , fin,projetId} = req.body 
    if(!nom) {
        res.status(400)
        throw new Error('please fill required fields')
    }
    const phaseExist = await Phase.findOne({where : {nom}})
    if(phaseExist) {
        res.status(400)
        throw new Error('phase already exists')
    }
    const projet = await findProjetByID(projetId) 
    if(! projet){
        res.status(404)
        throw new Error('projet not found')
    }
    const phaseCreated = await Phase.create({...req.body})
    await projet.addPhase(phaseCreated)
    
    res.json(phaseCreated)
})


const getAllPhases = asyncHandler(async (req, res) => {
    const phases = await Phase.findAll()
    res.json(phases)
})

const getPhaseById = asyncHandler(async (req, res) => { 
    const phase = await findPhaseByID(req.params.id)
    if(!phase) {
        res.status(404)
        throw new Error('Phase not found')
    }
    console.log(phase);
    res.json(phase)
})

const updatePhase = asyncHandler(async (req, res) => {
    const phase = await findPhaseByID(req.params.id)
    if(!phase) {
        res.status(404)
        throw new Error('Phase not found')
    }
    await phase.update({...req.body})
    res.json(phase)
})

const deletePhase = asyncHandler(async (req , res) => {
    const phase = await findPhaseByID(req.params.id)
    if(!phase) {
        res.status(404)
        throw new Error('Phase not found')
    }
    await phase.destroy()
    res.json({message : "phase deleted"})
})


module.exports = {addPhase , getAllPhases , getPhaseById , updatePhase , deletePhase}