import React, { useEffect, useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios'


const LoginPopup = ({ setShowLogin }) => {
  const {url,token, setToken} = useContext(StoreContext)

  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData(data=> ({...data, [name]:value}))
  };

  const onLogin = async(event) => {
    event.preventDefault()
    let newUrl = url;
    console.log(newUrl)
    if(currentState==="Login") {
      newUrl += "/api/user/login"
    } else {
      newUrl += "/api/user/register"
    }
    console.log("Request URL:", newUrl);

    const responce = await axios.post(newUrl, data)
    if(responce.data.success){
      setToken(responce.data.token)
      localStorage.setItem("token", responce.data.token)
      setShowLogin(false)
    } else {
      alert(responce.data.message)
    }
  } 


  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
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
            <input name="name" onChange={onChangeHandler} value={data.name} type='text' placeholder='Your full name' required />
          )}
          <input name="email" onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
          <input name="password" onChange={onChangeHandler} value={data.password} type='password' placeholder='Your password' required />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className='login-popup-condition'>
          <input type='checkbox' required />
          <p>By continuing, i agree to terms and conditions</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click Heare</span>
          </p>
        ) : (
          <p>
            Already have account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login heare</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
