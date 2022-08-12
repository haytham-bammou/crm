const express = require('express')
const { addProjet, getAllProjets, getProjetById, updateProjet,removeProjects, deleteProjet, getProjetShowrooms, getProjetPhases } = require('../controllers/projetController')
const { auth, admin } = require('../middleware/authMiddleware')
const router = express.Router()

// admin routes tom manage projets 
router.route("/").post(auth , admin ,addProjet )
router.get('/all' , auth , admin , getAllProjets)
router.delete('/listprojets',auth,admin,removeProjects)
router.route("/:id").get(auth , admin ,getProjetById ).put(auth,admin,updateProjet).delete(auth,admin,deleteProjet)
router.get('/showrooms/:id' , auth , admin , getProjetShowrooms)
router.get('/phases/:id' , auth , admin , getProjetPhases)

module.exports = router