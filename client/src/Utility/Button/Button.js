import React from 'react'

function Button(props) {
  return (
    <div>
        <button onClick={props.event}>{props.name}</button>
    </div>
  )
}

export default Button