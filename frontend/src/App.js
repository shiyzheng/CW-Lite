import React, { useState } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'
import axios from 'axios'

import Homepage from './components/homepage'
import Signup from './components/signup'
import Login from './components/login'

export const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const navigate = useNavigate()
  const checkUser = async () => {
    try {
      const user = await axios.get('/account/username')
      setLoggedIn(user)
      if (username !== user.data) {
        setUsername(user.data)
      }
    } catch (e) {
      console.log(e)
      alert('unexpected error occurred')
    }
  }
  checkUser()

  const element = useRoutes([{ path: '/', element: <Homepage loggedIn={loggedIn.data} username={username} navigate={navigate} /> },
    { path: '/signup', element: <Signup loggedIn={loggedIn.data} navigate={navigate} /> },
    { path: '/login', element: <Login loggedIn={loggedIn.data} navigate={navigate} /> },
  ])
  return element
}

export default App
