import React from 'react'

interface props {
  text: string,
  submitHandler: () => void,
  bgColor: string
}

const Button = ({text, submitHandler, bgColor}: props) => {
  return (
    <button onClick={submitHandler} className={`${bgColor} btn-pill border-[1.5px] px-[3vw] py-2  rounded-full max-lg:text-[5vw] text-[2vw]`}>
      {text}
    </button>
  )
}

export default Button
