const express = require('express')

const Question = require('../models/question')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.find()
    res.json(questions)
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { body } = req
  const { questionText } = body
  const { session } = req
  const { username } = session
  try {
    await Question.create({ questionText, author: username })
    res.send('question creation was successful')
  } catch (e) {
    console.log(e)
    next(e)
  }
})

router.post('/answer', isAuthenticated, async (req, res, next) => {
  const { body } = req
  const { _id, answer } = body
  try {
    await Question.updateOne({ _id }, { answer })
    res.send('question answer was successful')
  } catch (e) {
    console.log(e)
    next(e)
  }
})

module.exports = router
