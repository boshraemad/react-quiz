import React from 'react'

export default function Options({question , dispatch , answer}) {

  const inAnswered = answer!==null;
  return (
   <>
    {question.options.map((option , index)=>
    <div className="options">
    <button disabled={inAnswered} className={`btn btn-option ${ index === answer ? "answer" : ""} ${ inAnswered ? question.correctOption === index ? "correct" : "wrong" : ""}`} onClick={()=>{dispatch({type:"newAnswer" , payload:index})}}>{option}</button>
    </div>)}
   </>
  )
}
