const express = require('express')
const { addPhase, getAllPhases, getPhaseById, updatePhase, deletePhase } = require('../controllers/phaseController')
const { auth, admin } = require('../middleware/authMiddleware')
const router = express.Router()

// admin routes tom manage phases 
router.route("/").post(auth , admin ,addPhase )
router.get('/all' , auth , admin , getAllPhases)
router.route("/:id").get(auth , admin ,getPhaseById ).put(auth,admin,updatePhase).delete(auth,admin,deletePhase)
module.exports = router