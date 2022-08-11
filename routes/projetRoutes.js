const express = require('express')
const { addProjet, getAllProjets, getProjetById, updateProjet, deleteProjet } = require('../controllers/projetController')
const { auth, admin } = require('../middleware/authMiddleware')
const router = express.Router()

// admin routes tom manage projets 
router.route("/").post(auth , admin ,addProjet )
router.get('/all' , auth , admin , getAllProjets)
router.route("/:id").get(auth , admin ,getProjetById ).put(auth,admin,updateProjet).delete(auth,admin,deleteProjet)
module.exports = router