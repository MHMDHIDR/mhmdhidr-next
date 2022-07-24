const express = require('express')
const {
  registerUser,
  loginUser,
  getUser
} = require(`${__dirname}/../controllers/users.js`)
const { protect } = require(`${__dirname}/../middleware/authMiddleware.js`)
const router = express.Router()

router.post('/new', registerUser)
router.post('/login', loginUser)
router.get('/', protect, getUser)

module.exports = router
