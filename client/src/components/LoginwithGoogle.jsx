import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useGoogleLogin } from '@react-oauth/google';
import UserContext from '../context/Auth/userContext';
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

const LogSign = (props) => {
  const { auth, setAuth, setUserData, setPersist } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    const credentails = await axios.post("/auth/google", { googleAccessToken: accessToken });
    setUserData({
      username: credentails.data.username,
      email: credentails.data.email
    })
    setAuth({
      email: credentails.data.email,
      roles: credentails.data.roles,
      accessToken: credentails.data.accessToken
    });
    toast.success("Login Successfully!")
    navigate("/")
    setPersist(JSON.stringify(true));
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  // const login = useGoogleLogin({
  //   flow: 'auth-code',
  //   onSuccess: handleGoogleLoginSuccess
  // });

  useEffect(() => {
    if (auth) {
      navigate("/");
    }
  }, [auth, navigate])
  return (
    <>
      <div className="font-serif bg-slate-50">
        <Link to="/" className="ml-4 text-3xl">←</Link>
      </div>
      <div className="h-screen flex justify-center items-center font-serif text-center pl-10  bg-slate-50">
        <div className="font-serif text-center">
          <h1 className="font-semibold text-3xl font-staatliches text-center">{props.title}</h1>
          <div className="flex items-center w-80 h-64 flex-col justify-center">
            <button className="w-auto pl-5 pr-5 h-10 border border-gray-300 bg-white rounded-md font-bold flex items-center justify-center mb-7 text-sm hover:bg-slate-200"
              onClick={
                () => login()} >
              <img src="https://www.androidpolice.com/wp-content/uploads/2019/12/google-logo-hd.png" width="33" alt="Google Logo" />
              <span className='font-sans'>CONTINUE WITH GOOGLE</span>
            </button>
            <p><Link to="/signupmail" className="text-blue-500 font-staatliches">SIGN UP </Link> OR <Link to="/login" className="text-blue-500 font-staatliches"> LOGIN</Link></p>
          </div>
          <p className="text-xs text-gray-500 text-center">By signing up, I agree to the terms of service<span> and privacy policy.</span></p>
        </div>
      </div>
    </>
  );
}

export default LogSign;
