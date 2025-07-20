import React from 'react'

export default function StartScreen({questionsNumber}) {
  return (
    <div className="start">
        <h2>Welcome to the React Quiz</h2>
        <h3>{questionsNumber} questions to tesct your react mastery</h3>
        <button className="btn btn-ui">Let's start</button>
    </div>
  )
}
