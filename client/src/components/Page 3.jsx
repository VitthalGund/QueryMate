import React,{useState} from 'react'
import { Link } from 'react-router-dom'
export default function SignEmail() {
    const [email, setEmail] = useState("")
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        if(!email){alert("Please Enter Your Mail")}
    }
    return (
        <>
            <header className="text-lg pl-2 font-medium text-blue-700 hover:text-blue-900 font-serif">
                <Link to="loginwithgoogle">Sign Up</Link>
            </header>
            <div className="flex flex-col justify-center items-center font-serif">
                <div className="mt-16 mb-12 pl-0 pr-0 pt-4 pb-4">
                    <p className="text-3xl font-semibold">Hello, User!</p>
                </div>
                <form onSubmit={handleOnSubmit}>
                    <div className=" w-52 pt-1 pb-6 pl-1 pr-1 mt-0 mb-0 ml-3 mr-3">
                        <p className="text-xl font-medium pt-4 pb-2">What's your Email?</p>
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-64 p-1 font-normal text-base outline-none border-b-2 border-solid border-black rounded-md" placeholder="Enter Your Email..." required />
                    </div>
                    <div className="m-2 pt-1 pb-1 pl-2 pr-2">
                        <button className="w-52 pl-[2px] pr-[2px] font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700">CONTINUE</button>
                    </div>
                </form>
            </div>
        </>
    )
}
