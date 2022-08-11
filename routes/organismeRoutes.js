const express = require('express')
const { addOrganisme, getAllOrganismes, getOrganismeById, updateOrganisme, deleteOrganisme, getOrganismeEmployees } = require('../controllers/organismeController')
const { auth, admin } = require('../middleware/authMiddleware')
const router = express.Router()

// admin routes tom manage organismes 
router.route("/").post(auth , admin ,addOrganisme )
router.get('/all' , auth , admin , getAllOrganismes)
router.route("/:id").get(auth , admin ,getOrganismeById ).put(auth,admin,updateOrganisme).delete(auth,admin,deleteOrganisme)
router.get("/employees/:id" , auth , admin , getOrganismeEmployees)
module.exports = router