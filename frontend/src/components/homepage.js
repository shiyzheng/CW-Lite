import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Question from './question'
import Answer from './answer'

function Homepage({ loggedIn, username, navigate }) {
  const [questions, setQuestions] = useState([])
  const logout = async () => {
    try {
      await axios.post('/account/logout')
      navigate('/')
    } catch (e) {
      console.log(e)
      alert('error occurred during logout')
    }
  }
  useEffect(() => {
    const getQuestions = async () => {
      const { data } = await axios.get('/api/questions')
      setQuestions(data)
    }
    const interval = setInterval(() => {
      getQuestions()
    }, 2000)
    return () => clearInterval(interval)
  }, [])
  return (
    <>
      <div>
        <h1><b>Campuswire Lite</b></h1>
      </div>
      {loggedIn && (
      <>
        Hi&nbsp;
        <b>{username}</b>
        <br />
        <Question />
        <button type="button" className="btn btn-danger" onClick={() => logout()}> Logout </button>
      </>
      )}
      {loggedIn && questions.map(q => (
        <div className="card w-50" key={q._id}>
          <div className="card-body">
            <p className="card-text">
              <b>
                Question:&nbsp;
                {q.questionText}
              </b>
            </p>
            <p className="card-text">
              Asked by&nbsp;
              <b>{q.author}</b>
            </p>
            <p className="card-text">
              Answer:&nbsp;
              {q.answer}
            </p>
            <Answer _id={q._id} />
          </div>
        </div>
      )).reverse()}
      {!loggedIn && <button type="button" className="btn btn-primary" onClick={() => navigate('/login')}> Login to submit and answer questions! </button>}
      {!loggedIn && questions.map(q => (
        <div className="card w-50" key={q._id}>
          <div className="card-body">
            <p className="card-text">
              <b>
                Question:&nbsp;
                {q.questionText}
              </b>
            </p>
            <p className="card-text">
              Asked by&nbsp;
              <b>{q.author}</b>
            </p>
            <p className="card-text">
              Answer:&nbsp;
              {q.answer}
            </p>
          </div>
        </div>
      )).reverse()}
    </>
  )
}

export default Homepage
