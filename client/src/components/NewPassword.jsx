import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import axios from '../api/axios';


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8}$/;
const URL = '/password/verifypassword'
export default function CreateNewPassword() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  let token;
  useEffect(() => {
    const searchPrams = new URLSearchParams(location.search);
    token = searchPrams.get(token);
  }, [location.search, token]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  }
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!PWD_REGEX.test(password)) {
      alert("Password must contain at least 8 characters.")
      return;
    }
    if (!(password === confirmPassword)) {
      alert("Check the Password & Confirm Password.")
      return;
    }
    try {
      const response = await axios.post(URL,
        JSON.stringify(token, password), {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
      );
      console.log("Response: ", response?.data?.message);
      if (response.status === 200) {
        navigate('/successfully-change-password');
      }
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response.");
      } else if (err.response?.status === 401) {
        alert("Invalid Token");
      } else {
        alert("Something Went Wrong.");
        console.error("Error: ", err);
      }
    }
  }
  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="flex flex-col justify-center items-center h-screen">
          <p className="font-extrabold text-3xl">CREATE NEW PASSWORD</p>
          <input type={showPassword ? 'text' : 'password'} placeholder='Enter The New Password' value={password} onChange={e => setPassword(e.target.value)} className='sm:w-64 sm:mb-1 w-56 mb-6 mt-6 p-1 pl-3 border-2 border-black rounded-md font-normal text-base' required /><button onClick={handleTogglePassword}>{showPassword ? <AiFillEyeInvisible className='sm:translate-custom-lg translate-custom-sm' /> : <AiFillEye className='sm:translate-custom-lg translate-custom-sm' />}</button>

          <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Enter The Confirm Password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className='sm:w-64 sm:mb-1 w-56 mb-6 mt-6 p-1 pl-3 border-2 border-black rounded-md font-normal text-base' required /><button onClick={handleToggleConfirmPassword}>{showConfirmPassword ? <AiFillEyeInvisible className='sm:translate-custom-lg translate-custom-sm' /> : <AiFillEye className='sm:translate-custom-lg translate-custom-sm' />}</button>

          <button className="sm:w-64 w-56 px-1 mt-2 font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700">CREATE PASSWORD</button>
        </div>
      </form>
    </>
  )
}
