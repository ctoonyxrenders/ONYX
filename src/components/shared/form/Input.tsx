import React, { ChangeEvent } from 'react'

interface inputTypes {
  placeHolder: string,
  type: string,
  name: string,
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ placeHolder, type, name, value, onChange }: inputTypes) => {
  return (
    <input className='w-full h-[5vh] max-lg:h-[8vh] max-sm:h-[6vh] outline-none para border-b-2 border-white border-t-0 border-x-0 bg-[#114046] px-2'
      type={type}
      placeholder={placeHolder} required name={name} value={value} onChange={onChange} />
  );
};

export default Input
