import React, { useEffect, useState } from "react";
import "./Login.css";
import {  auth, db, login, logout, signup } from '../firebase/init.js';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '@mui/material/Modal'
import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal, openLoginModal } from "../redux/modalSlice.js";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { setUser, signOutUser } from "../redux/userSlice.js";
import { addDoc, collection } from "firebase/firestore";


const Login = () => {
  const [signState, setSignState] = useState("Sign In")
  const [loginState, setLoginState] = useState("login")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")  
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")  
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const isOpen = useSelector(state => state.modals.loginModalOpen)
  const dispatch = useDispatch()
  async function handleSignUp(e) {
    e.stopPropagation()
    e.preventDefault()
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const res = userCredentials.user
    console.log(res, "res")
    const docRef = await addDoc(collection(db, "user"), {
      uid: res.uid,
      name: name,
      authProvider: "local",
      email: email,
      address: address,
      state: state,
      zip: zip,
      phone: phone
  })
  }
  useEffect(() => {    
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => { 
      if (!currentUser) {
        setLoginState("login")
        return
      }
      dispatch(setUser({
        name: currentUser.displayName,
        email: currentUser.email,
        uid: currentUser.uid,
      }))      
      setLoginState("logout")
    })

    return unsubscribe
  },[])
  async function logOut(){
    await signOut(auth)
    setSignState("login")
    dispatch(signOutUser()) 
  }
    
  return (
    <>
    {loginState === "login" ? <button onClick={() => dispatch(openLoginModal())} className="login__button">Log In</button> : <button onClick={() => logOut()} className="login__button">Log Out</button>}
    <Modal
    open={isOpen}
    onClose={() => dispatch(closeLoginModal())}
    className="login__modal"
    >
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
          {signState === "Sign Up" && (
            <>
          <input value={phone} onChange={(event) => {setPhone(event.target.value)} } type="phone" placeholder="Phone" />
          <input value={address} onChange={(event) => {setAddress(event.target.value)}} type="address" placeholder="Address" />
          <input value={zip} onChange={(event) => {setZip(event.target.value)}} type="zip" placeholder="Zip" />
          <input value={state} onChange={(event) => {setState(event.target.value)}} type="state" placeholder="State" />
          </>
          )}
          {signState === "Sign Up" ? <button onClick={handleSignUp}>Sign Up</button> : <button type="submit" onClick={()=>login(email, password)}>Sign In</button>}
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
    </Modal>
    </>
  );
};

export default Login