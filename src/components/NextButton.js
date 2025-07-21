import React from 'react'

export default function NextButton({dispatch , answer , index , questionsNumber}) {
  if (answer === null) return null;
  if (index < questionsNumber - 1) return (
    <button className="btn btn-ui" onClick={()=>{dispatch({type:"nextQuestion"})}}>Next</button>
  )

  if(index === questionsNumber - 1) return (
    <button className="btn btn-ui" onClick={()=>{dispatch({type:"finishQuiz"})}}>Finish</button>
  )
}
