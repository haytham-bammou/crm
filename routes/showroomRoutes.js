const express = require('express')
const { addShowroom, getAllShowrooms, getShowroomById, updateShowroom, deleteShowroom } = require('../controllers/showroomController')
const { auth, admin } = require('../middleware/authMiddleware')
const router = express.Router()

// admin routes tom manage showrooms 
router.route("/").post(auth , admin ,addShowroom )
router.get('/all' , auth , admin , getAllShowrooms)
router.route("/:id").get(auth , admin ,getShowroomById ).put(auth,admin,updateShowroom).delete(auth,admin,deleteShowroom)
module.exports = router