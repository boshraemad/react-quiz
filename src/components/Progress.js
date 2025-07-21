import React from 'react'

export default function Progress({questionsNumber , index , points , maxPoints , answer}) {
  return (
    <header className="progress">
        <progress max={questionsNumber} value={index + Number(answer !== null)}/>
        <p><strong>{index + 1} / {questionsNumber}</strong> questions</p>
        <p><strong>{points} / {maxPoints}</strong></p>
    </header>
  )
}
