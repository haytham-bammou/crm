const {User , Organisme} = require('../models')
const asyncHandler = require('express-async-handler')


 const addOrganisme = asyncHandler(async (req, res) => {
    const {nom , adress , telephone} = req.body 
    if(!nom || !adress || !telephone) {
        res.status(400)
        throw new Error('please fill required fields')
    }
    const organismeExist = await Organisme.findOne({nom})
    if(organismeExist) {
        res.status(400)
        throw new Error('organisme already exists')
    }
    const organismeCreated = await Organisme.create({...req.body})
    res.json(organismeCreated)
})

module.exports = {addOrganisme}