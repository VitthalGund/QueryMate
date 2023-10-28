import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useGoogleLogin } from '@react-oauth/google';
import UserContext from '../context/Auth/userContext';
import { useContext } from "react";

const LogSign = (props) => {
  const { setAuth } = useContext(UserContext);
  const navigate = useNavigate()

  async function handleGoogleLoginSuccess(tokenResponse) {

    const accessToken = tokenResponse.access_token;
    console.log(tokenResponse)
    const credentails = await axios.post("/auth/google", { googleAccessToken: accessToken });
    console.log(credentails);
    setAuth({
      email: credentails.data.email,
      password: credentails.data.password,
      roles: credentails.data.roles,
      accessToken: credentails.data.accessToken
    });
    navigate("/")
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  // const login = useGoogleLogin({
  //   flow: 'auth-code',
  //   onSuccess: handleGoogleLoginSuccess
  // });

  return (
    <>
      <div className="bg-white h-screen flex justify-center items-center font-serif">
        <div className="font-serif">
          <div className="flex-grow flex justify-center items-center">
            <h1 className="font-semibold text-4xl font-staatliches">{props.title}</h1>
          </div>
          <div className="flex items-center w-80 h-64 flex-col justify-center">
            <button className="w-80 h-10 border border-gray-300 bg-white rounded-md font-bold flex items-center justify-center mb-7 text-sm hover:bg-slate-200"
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
