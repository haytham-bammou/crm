const express = require('express')
const { addOrganisme } = require('../controllers/organismeController')
const { registerUser, saveRole, addRoleToUser,fetchAllRoles, loginUser, getMe, fetchUser, fetchAllUsers, updateUser, deleteUser, deleteRole } = require('../controllers/userController')
const { auth, admin } = require('../middleware/authMiddleware')
const router = express.Router()

// admin routes to manage users and there roles
router.post('/register', auth , admin , registerUser)
router.post('/saveRole' , auth , admin , saveRole)
router.post('/addRoleToUser' , auth , admin , addRoleToUser)
router.post('/login' , loginUser)
router.get('/me' , auth, getMe)
router.get('/all' , auth , admin ,fetchAllUsers)
router.get('/roles/all' , auth , admin ,fetchAllRoles)
router.delete('/role/:id' , auth , admin ,deleteRole)
router.get('/:id' , auth , admin ,fetchUser)
router.put('/:id' , auth , admin ,updateUser)
router.delete('/:id' , auth , admin ,deleteUser)

// admin routes tom manage organismes 
router.post("/", auth , admin ,addOrganisme )

module.exports = router