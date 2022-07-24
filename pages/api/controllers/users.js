const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const UserModel = require(`${__dirname}/../models/user-model.js`)

const registerUser = asyncHandler(async (req, res) => {
  const { userEmail, userPassword } = req.body

  if (!userEmail || !userPassword) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await UserModel.findOne({ userEmail })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(userPassword, salt)

  // Create user
  const user = await UserModel.create({
    userEmail,
    userPassword: hashedPassword
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      token: generateToken(user._id),
      userAdded: 1,
      message: 'User created successfully'
    })
  } else {
    res.status(400).json({
      userAdded: 0,
      message: 'User could not be created'
    })
    throw new Error('Invalid user data')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const { userEmail, userPassword } = req.body
  // Check for user by using his/her email
  const user = await UserModel.findOne({ userEmail })

  if (user && (await bcrypt.compare(userPassword, user.userPassword))) {
    res.status(200).json({
      _id: user.id,
      email: user.userEmail,
      token: generateToken(user._id),
      LoggedIn: 1
    })
  } else {
    // res.status(400).json({ message: 'Invalid email or password', LoggedIn: 0 })
    res.json({ message: 'Invalid email or password', LoggedIn: 0 })
  }
})

const getUser = asyncHandler(async (req, res) => {
  const { _id, userEmail } = await UserModel.findById(req.user.id)

  res.status(200).json({
    id: _id,
    email: userEmail
  })
})

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

module.exports = { registerUser, loginUser, getUser }
