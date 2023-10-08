import React, { useState } from 'react'
import { Link } from 'react-router-dom';
export default function LogIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isChecked, setIsChecked] = useState(false)
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); 
    }
    const handleOnSubmit=(e)=>{
        e.preventDefault()
        if (!email || !password) {
            alert('Please enter both email and password.')
            return
        }
    }
    return (
        <>
            <div className="font-serif mt-3">
                <Link to="signuppassword" className="ml-4 text-3xl">←</Link>
            </div>
            <div className="flex justify-center items-center flex-col h-[90vh]">
                <div className=" ml-0 mr-0 ">
                    <p className="text-2xl font-bold">LOG IN</p>
                </div>
                <form onSubmit={handleOnSubmit} className="contents">
                    <input type="email" placeholder='Enter The Email' value={email} onChange={(e) => setEmail(e.target.value)} className="sm:w-64 sm:mb-1 w-56 mb-6 mt-6 p-1 font-normal text-base outline-none border-b-2 border-solid border-black rounded-md" required />
                    <input type={(isChecked ? "text" : "password")} placeholder='Enter The Password' value={password} onChange={(e) => setPassword(e.target.value)} className="sm:w-64 sm:mb-1 w-56 mb-6 mt-6 p-1 font-normal text-base outline-none border-b-2 border-solid border-black rounded-md" required />
                    <label for="showPassword" className="mb-4"><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /> Show Password</label>
                    <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700">RESET PASSWORD</a>
                    <div>
                        <button className="sm:w-64 w-56 pl-[2px] pr-[2px] mt-2 font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700">Log in</button>
                    </div>
                </form>

            </div>
        </>
    )
}
