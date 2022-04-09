import React, { useState } from 'react'
import axios from 'axios'

function Question() {
  const [questionText, setQuestionText] = useState('')
  const postQuestion = async () => {
    try {
      await axios.post('/api/questions/add', { questionText })
    } catch (e) {
      console.log(e)
      alert('error occurred posting question')
    }
  }
  return (
    <>
      <button type="button" className="btn btn-primary mr-1" data-toggle="modal" data-target="#exampleModal">
        Ask a Question
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">New Question</h5>
            </div>
            <div className="modal-body">
              Question:&nbsp;
              <input onChange={e => setQuestionText(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-warning" onClick={() => postQuestion()} data-dismiss="modal">Post</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Question
