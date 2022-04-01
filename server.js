const express = require('express')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')

const account = require('./routes/account')
const api = require('./routes/api')

const app = express()
const port = process.env.PORT || 3000

const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://syz:123@cluster0.wzm4x.mongodb.net/Cluster0?retryWrites=true&w=majority'
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.json())

app.use(cookieSession({
  name: 'session',
  keys: ['key'],
  maxAge: 24 * 60 * 60 * 1000,
}))

app.use('/account', account)
app.use('/api/questions', api)

// error handling
app.use((err, req, res, next) => {
  if (err) {
    console.log(err)
    res.send('an error has occurred')
  }
  next()
})

// Start listening for requests
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
  console.log('mongoDB is connected')
})
