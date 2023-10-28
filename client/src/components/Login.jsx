import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../context/Auth/userContext';
import axios from '../api/axios';

const LOG_IN_URL = "/auth";
export default function LogIn() {
    const { setAuth } = useContext(UserContext);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isChecked, setIsChecked] = useState(false)
    // const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(LOG_IN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );
            console.log(response?.data)
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, accessToken });
            setEmail("")
            setPassword("")
            setSuccess(true)
        } catch (error) {
            if (!error?.response) {
                console.error("No Server Response")
            } else if (error.response?.status === 400) {
                console.error('Missing Email or Password');
            } else if (error.response?.status === 401) {
                console.error('Unauthorize');
            } else {
                console.error('Login Failed');
            }
        }
    }
    return (
        <>{
            success ?
                <div>{alert("User Logged in Successfully.")}</div> :
                <>
                    <div className="font-serif mt-3">
                        <Link to="/signupmail" className="ml-4 text-3xl">←</Link>
                    </div>
                    <div className="flex justify-center items-center flex-col h-[90vh]">
                        <div className=" ml-0 mr-0 ">
                            <p className="text-2xl font-bold">LOG IN</p>
                        </div>
                        <form onSubmit={handleOnSubmit} className="contents">
                            <input type="email" placeholder='Enter The Email' value={email} onChange={(e) => setEmail(e.target.value)} className="sm:w-64 sm:mb-1 w-56 mb-6 mt-6 p-1 pl-3 font-normal text-base border-2 border-solid border-black rounded-md" required />
                            <input type={(isChecked ? "text" : "password")} placeholder='Enter The Password' value={password} onChange={(e) => setPassword(e.target.value)} className="sm:w-64 sm:mb-1 w-56 mb-6 mt-6 p-1 pl-3 font-normal text-base border-2 border-solid border-black rounded-md" required />
                            <label htmlFor="showPassword" className="mb-4"><input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /> Show Password</label>
                            <Link to="/resetpassword" className="text-xs font-medium text-blue-600 hover:text-blue-700">RESET PASSWORD</Link>
                            <div>
                                <button className="sm:w-64 w-56 pl-[2px] pr-[2px] mt-2 font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700">Log in</button>
                            </div>
                        </form>

                    </div>
                </>
        }
        </>
    )
}
