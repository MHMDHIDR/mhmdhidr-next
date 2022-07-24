const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const UserModel = require(`${__dirname}/../models/user-model.js`)

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await UserModel.findById(decoded.id).select('-userPassword')

      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({ message: 'Please authenticate.' })
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' })
    throw new Error('Not authorized, no token')
  }
})

module.exports = { protect }
