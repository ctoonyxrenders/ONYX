import React from 'react'

interface props {
  text: string,
  submitHandler: () => void,
  bgColor: string
}

const Button = ({text, submitHandler, bgColor}: props) => {
  return (
    <button onClick={submitHandler} className={`${bgColor} border-[1.5px] rounded-full w-[170px] p-2 py-3`}>
      {text}
    </button>
  )
}

export default Button
