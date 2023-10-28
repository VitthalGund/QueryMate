import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../context/Auth/userContext';
import axios from '../api/axios';


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";
export default function SignupPassword() {
  const { userData } = useContext(UserContext);

  const errRef = useRef()
  const [password, setPassword] = useState("")
  const [isValidPassword, setIsValidPassword] = useState(true)
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setIsValidPassword(PWD_REGEX.test(password));
  }, [password])

  const handleOnSubmit = async (e) => {
    (isValidPassword) ? "" : alert("Password must contain atleast 8 characters");
    e.preventDefault();
    const uname = userData.username;
    const umail = userData.email;
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ uname, umail, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );
      console.log(response?.data)
      console.log(response?.accessToken)
      console.log(JSON.stringify(response))
      if (response.success === 200) {
        navigate('/loginwithgoogle');
      }
      setSuccess(true)
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg('Missing Username, Email or Password');
      } else {
        setErrMsg("Registration Failed")
      }
      errRef.current.focus();
    }

  }
  const handleOnChange = (e) => {
    setPassword(e.target.value)
  }
  return (
    <>
      {success ? (
        <div>
          {alert("User created Successfully")}
        </div>
      ) : (
        <>
          <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
          <div className="font-serif mt-3">
            <Link to="/signupmail" className="ml-4 text-3xl">←</Link>
          </div><div className="flex flex-col justify-center items-center mt-12 font-serif">
            <p className="text-3xl font-semibold">Safety First</p>
            <div className="flex flex-col mt-24">
              <p className="text-2xl font-medium mb-2 pb-3">Set Your Password</p>
              <form onSubmit={handleOnSubmit} className="contents">
                <input type="password" placeholder='Enter The Password' value={password} onChange={handleOnChange} className='sm:w-64 sm:mb-1 w-56 mb-6 mt-6 p-1 pl-3 font-normal text-base border-2 border-solid border-black rounded-md' required />
                <button className="sm:w-64 w-56 pl-[2px] pr-[2px] mt-2 font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700">CONTINUE</button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}
