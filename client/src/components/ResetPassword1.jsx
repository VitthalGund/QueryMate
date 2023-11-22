import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/Auth/userContext';
import axios from '../api/axios';

const URL = '/password/forgotpassword'
function MailResetPassword() {
    // const {rmail,setRmail}=useContext(UserContext);
    const { setRmail } = useContext(UserContext);
    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        setRmail(email);
    }, [email, setRmail]);


    const handleOnClick = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(URL,
                JSON.stringify(email), {
                headers: { 'Content-type': 'application/json' },
                withCredentials: true
            }
            );
            console.log('Response: ', response?.data?.message)
            if (response.status === 200) {
                navigate('/check-inbox');
            }
        } catch (err) {
            console.error("Error: ", err);
        }
    }
    return (
        <>
            <div className="font-serif mt-3 bg-gray-50">
                <Link to="/loginwithgoogle" className="ml-4 text-3xl font-black">←</Link>
            </div>
            <div className="flex flex-col justify-center items-center h-[75vh] bg-gray-50">
                <h1 className="text-2xl font-bold">RESET PASSWORD</h1>
                <div className="mb-2">
                    <input type="email" placeholder='Enter The Email' value={email} onChange={(e) => setEmail(e.target.value)}
                        className="sm:w-64 sm:mb-1 w-56 mb-6 mt-6 p-1 pl-3 font-normal text-base border-2 border-solid border-black rounded-md" />
                </div>
                <div className="mb-2">
                    <p className="text-sm sm:text-base text-gray-900">Enter your Email address & we&apos;ll send you a link to reset your password & create a new one.</p>
                </div>
                <button className="sm:w-64 w-56 pl-[2px] pr-[2px] mt-2 font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={handleOnClick}>RESET PASSWORD</button>
            </div>
        </>
    )
}

export default MailResetPassword;
