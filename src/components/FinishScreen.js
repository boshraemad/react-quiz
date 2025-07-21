import React from 'react'

export default function FinishScreen({points , maxPoints}) {
    const percentage =(points / maxPoints ) * 100;
  return (
    <p className="result">
        <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
    </p>
  )
}
