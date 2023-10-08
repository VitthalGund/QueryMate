import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function SignupPassword() {
  const [password, setPassword]=useState("")
  const [isValidPassword, setIsValidPassword]= useState(true)
  const handleOnSubmit=(e)=>{
    e.preventDefault()
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
      setIsValidPassword(false);
      return;
    }
  }
  const handleOnChange=(e)=>{
    setPassword(e.target.value)
    setIsValidPassword(true)
  }
  return (
    <>
      <div className="font-serif mt-3">
        <Link to="login" className="ml-4 text-3xl">←</Link>
      </div>
      <div className="flex flex-col justify-center items-center mt-12 font-serif">
        <p className="text-3xl font-semibold">Safety First</p>
        <div className="flex flex-col mt-24">
        <p className="text-2xl font-medium mb-2 pb-3">Set Your Password</p>
        <form onSubmit={handleOnSubmit} className="contents">
          <input type="password" placeholder='Enter The Password' value={password} onChange={handleOnChange} className="sm:w-64 sm:mb-1 w-56 mb-2 p-1 font-normal text-base outline-none border-b-2 border-solid border-black rounded-md" required />
          <button className="sm:w-64 w-56 pl-[2px] pr-[2px] mt-2 font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700">CONTINUE</button>
        </form>
      </div>
      </div>
    </>
  )
}
