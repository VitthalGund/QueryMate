import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/Auth/userContext';
import axios from '../api/axios';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { toast } from 'react-toastify';

const REGISTER_URL = "/register";
export default function SignupPassword() {
  const { userData } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  // const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    if (!password) {
      toast.info("Enter the valid password")
      return
    }
    if (!confirmPassword) {
      toast.info("Hey make sure to confirm your password")
      return;
    }
    if (!(password === confirmPassword)) {
      toast.info("password and confirm password should be same!")
      return;
    }
    e.preventDefault();
    const uname = userData.username;
    const umail = userData.email;
    try {

      const response = await toast.promise(axios.post(REGISTER_URL,
        { username: uname, email: umail, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      ), {
        pending: 'Creating your account Successfully👌',
        success: 'Account Created Successfully👌',
        error: "Unable to create account"
      });
      console.log(response?.data)
      console.log(response?.accessToken)
      console.log(response)
      if (response.data.success) {
        //   toast.info("verification email is sent on the email address!");
        navigate('/');
        //   toast.info("verify your self!");
      }
      // setSuccess(true)
    } catch (error) {
      if (!error?.response) {
        toast.error("No Server Response");
      } else if (error.response?.status === 400) {
        toast.error('Missing Username, Email or Password');
      } else {
        toast.error("Registration Failed")
      }
    }

  }

  const handleClickShowPassword = () => {

    if (showPassword) {
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
  }


  const handleClickShowConfirmPassword = () => {

    if (showConfirmPassword) {
      setShowConfirmPassword(false)
    } else {
      setShowConfirmPassword(true)
    }
  }

  return (

    <>
      <div className="font-serif bg-slate-50">
        <Link to="/signupmail" className="ml-4 text-3xl">←</Link>
      </div>
      <div className="flex min-h-full flex-col justify-center items-center font-serif bg-slate-50">
        <p className="text-3xl font-semibold">Safety First</p>
        <div className="flex flex-col mt-10">
          <p className="text-2xl font-medium mb-2 pb-2 text-center">Set Your Password</p>
          <form onSubmit={handleOnSubmit} className="contents">
            <div className="password_2 block pt-6 relative">
              <label
                className="text-lg cursor-text left-0 -top-3 text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
              >Password</label>
              <div className="eye_div justify-center">
                <input
                  id='password'
                  name='password'
                  className="input block border py-3 peer bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-2 px-2 ring-sky-500 focus:ring-sky-600 focus:outline-none"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  minLength={8}
                />
                <div
                  id='password'
                  className="icon_button absolute right-4 top-14 cursor-pointer"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? (
                    <HiEye className="h-8 font-extralight" />
                  ) : (
                    <HiEyeOff className="h-8 font-extralight" />
                  )}
                </div>
              </div>
            </div>
            <div className="password_2 block pt-4 relative">
              <label
                className="text-lg cursor-text left-0 -top-3 text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
              >Confirm Password</label>
              <div className="eye_div justify-center">
                <input
                  id='passwordConfirm'
                  name='passwordConfirm'
                  className="input block border py-3 peer bg-transparent h-10 w-full rounded-lg text-black placeholder-transparent ring-2 px-2 ring-sky-500 focus:ring-sky-600 focus:outline-none"
                  type={showConfirmPassword ? "text" : "password"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  minLength={8}
                />
                <div
                  id='confirmPassword'
                  className="icon_button absolute right-4 top-12 cursor-pointer"
                  onClick={handleClickShowConfirmPassword}
                >
                  {showConfirmPassword ? (
                    <HiEye className="h-8 font-extralight" />
                  ) : (
                    <HiEyeOff className="h-8 font-extralight" />
                  )}
                </div>
              </div>
            </div>
            <button className="sm:w-64 w-full pr-[2px] pt-2 pb-2 mt-5 font-medium text-xl bg-blue-600 text-white rounded-md hover:bg-blue-700">CONTINUE</button>
          </form>
        </div>
      </div>
    </>

  )
}
