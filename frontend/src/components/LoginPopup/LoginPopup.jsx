import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");
  return (
    <div className='login-popup'>
      <form className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=''
          />
        </div>
        <div className='login-popup-inputs'>
          {currentState === "Login" ? (
            <></>
          ) : (
            <input type='text' placeholder='Your full name' required />
          )}
          <input type='email' placeholder='Your email' required />
          <input type='password' placeholder='Your password' required />
        </div>
        <button>
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, i agree to terms and conditions</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click Heare</span>
          </p>
        ) : (
          <p>
            Already have account? <span onClick={() => setCurrentState('Login')}>Login heare</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
