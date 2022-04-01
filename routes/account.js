const express = require('express')

const User = require('../models/user')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.post('/signup', async (req, res, next) => {
  const { body } = req
  const { username, password } = body

  try {
    await User.create({ username, password })
    res.send('user creation was successful')
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.post('/login', async (req, res, next) => {
  const { body } = req
  const { username, password } = body

  try {
    const user = await User.findOne({ username })
    if (username === user.username && password === user.password) {
      req.session.username = username
      res.send('successful login')
    } else {
      res.send('failed')
    }
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  res.send('logged out')
})

module.exports = router
