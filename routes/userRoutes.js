const express = require('express')
const { registerUser, saveRole, addRoleToUser, loginUser, getMe } = require('../controllers/userController')
const { auth, admin } = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/register', auth,admin , registerUser)
router.post('/saveRole' , auth , admin , saveRole)
router.post('/addRoleToUser' , auth , admin , addRoleToUser)
router.post('/login' , loginUser)
router.get('/me' , auth, getMe)
module.exports = router