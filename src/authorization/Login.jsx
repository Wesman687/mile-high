import React, { useState } from "react";
import "./Login.css";
import {  login, signup } from '../firebase/init.js';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Login = () => {
  const [signState, setSignState] = useState("Sign In")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")  
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
    
  const user_auth = async () => {
    setLoading(true)
    if(signState === "Sign In"){
      await login(email, password)
    }
    else {
       await signup(name, email, password)
    }
    setLoading(false)
    navigate('/')
  }
  return (
    <div className="landing__container login__container">
    {loading?<div className="login-spinner"><FontAwesomeIcon icon="fas fa-spinner"></FontAwesomeIcon><img src="" alt="" /></div>:
    <div className="login">
      <img src="" className="login-logo" alt="" />

      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" ? (
            <input value={name} onChange={(event) => {setName(event.target.value) }}type="text" placeholder="Your Name"  />
          ) : (
            <></>
          )}

          <input value={email} onChange={(event) => {setEmail(event.target.value)} } type="email" placeholder="Email" />
          <input value={password} onChange={(event) => {setPassword(event.target.value)}} type="password" placeholder="Password" />
          <button onClick={user_auth} type="submit" >{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>
              New To Mile High? <span onClick={()=> setSignState("Sign Up")} className="switch-text">Sign Up Now</span>
            </p>
          ) : (
            <p>
              Already have account?{" "}
              <span onClick={() => setSignState("Sign In")} className="switch-text">Sign In Now</span>
            </p>
          )}
        </div>
        </div>
      </div>}
    </div>
  );
};

export default Login