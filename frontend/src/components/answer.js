import React, { useState } from 'react'
import axios from 'axios'

function Answer(_id) {
  const [answer, setAnswer] = useState('')
  const answerQ = async () => {
    try {
      await axios.post('/api/questions/answer', { _id, answer })
    } catch (e) {
      console.log(e)
      alert('error occurred answering question')
    }
  }
  return (
    <>
      New Answer:&nbsp;
      <input onChange={e => setAnswer(e.target.value)} />
      &nbsp;
      <button type="button" className="btn btn-success" onClick={() => answerQ()}> Submit Answer </button>
    </>
  )
}

export default Answer
