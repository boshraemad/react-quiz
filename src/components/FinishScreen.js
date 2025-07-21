import React from 'react'

export default function FinishScreen({points , maxPoints , dispatch}) {
    const percentage =(points / maxPoints ) * 100;
  return (
   <>
     <p className="result">
        <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
    </p>
    <button className="btn btn-ui" onClick={()=>{dispatch({type:"restartQuiz"})}}>Restart</button>
   </>
  )
}
