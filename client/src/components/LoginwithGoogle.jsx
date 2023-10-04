import React from 'react';
import {Link} from "react-router-dom";
const LogSign = (props) => {
  return (
    <>
    <div className="bg-white h-screen flex justify-center items-center font-serif">
      <div className="font-serif">
        <div className="flex-grow flex justify-center items-center">
          <h1 className="font-semibold text-4xl">{props.title}</h1>
        </div>
        <div className="flex items-center w-80 h-64 flex-col justify-center">
          <button className="w-80 h-10 border border-gray-300 bg-white rounded-3xl font-bold flex items-center justify-center mb-7 text-sm hover:bg-slate-200">
            <img src="https://www.androidpolice.com/wp-content/uploads/2019/12/google-logo-hd.png" width="33" alt="Google Logo" />
            <span>Continue with Google</span>
          </button>
          <p><Link to="/signupmail" className="text-blue-500">Sign Up </Link> or <Link to="/login" className="text-blue-500"> Login</Link></p>
        </div>
        <p className="text-xs text-gray-500 text-center">By signing up, I agree to the terms of service<span> and privacy policy.</span></p>
      </div>
    </div>
    </>
  );
}

export default LogSign;
