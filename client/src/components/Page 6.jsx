import React, { useState } from 'react'

function ResetPassword() {
    const [email,setEmail] = useState("")
    return (
        <>
            <div className="font-serif mt-3">
                <Link to="login" className="ml-4 text-3xl font-black">←</Link>
            </div>
            <div className="flex flex-col justify-center items-center h-[75vh]">
            <h1 className="text-2xl font-bold">RESET PASSWORD</h1>
            <div className="mb-2">
                <input type="email" placeholder='Enter The Email' value={email} onChange={(e)=>setEmail(e.target.value)} className="sm:w-64 sm:mb-1 w-56 mb-6 mt-6 p-1 font-normal text-base outline-none border-b-2 border-solid border-black rounded-md" />
            </div>
            <div className="mb-2">
                <p className="sm:text-xs text-sm text-gray-900">Enter your Email address & we'll send you a link to reset your password & create a new one.</p>
            </div>
                <button className="sm:w-64 w-56 pl-[2px] pr-[2px] mt-2 font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700">RESET PASSWORD</button>
            </div>
        </>
    )
}

export default ResetPassword
