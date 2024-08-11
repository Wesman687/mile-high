import React, { useEffect, useState } from "react";
import "./Login.css";
import { auth, db } from "../firebase/init.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal, openLoginModal } from "../redux/modalSlice.js";
import {  
  onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,  
} from "firebase/auth";
import { setUser } from "../redux/userSlice.js";
import { addDoc, collection, where, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [lastName, setLastName] = useState("")
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();
  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true)
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const res = userCredentials.user;
    dispatch(closeLoginModal());
    const docRef = await addDoc(collection(db, `user`), {
      uid: res.uid,
      firstName: firstName,
      lastName: lastName,
      authProvider: "local",
      email: email,
      city: city,
      address: address,
      state: state,
      zip: zip,
      phone: phone,
    });
    setLoading(false)
  }
  const login = async (email, password) => {
    setLoading(true)
    try{
        await signInWithEmailAndPassword(auth, email, password)

    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))

    }
    setLoading(false)
    
}
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        return;
      }
      const userRef = await query(collection(db, "user"), where('uid', '==', currentUser.uid))
      const data  = await getDocs(userRef)
      if (data.empty) {
        console.log("nothing", data.docs, currentUser.uid)
      }
      const userInfo = data.docs.map(doc => doc.data())[0]
      dispatch(
        setUser({
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          uid: userInfo.uid,
          city: userInfo.city,
          address: userInfo.address,
          state: userInfo.state,
          zip: userInfo.zip,
          phone: userInfo.phone,
        })
      );
    });

    return unsubscribe;
  }, []);  

  return (
    <>
      
        <p className="nav_link admin__link "
          onClick={() => dispatch(openLoginModal())}
        >
          Log In
        </p>
      
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="login__modal"
      >
        <div className="login__container">
        {loading ? (
          <div className="login-spinner">
            <FontAwesomeIcon icon="fas fa-spinner"></FontAwesomeIcon>
            <img src="" alt="" />
          </div>
        ) : (
          <div className="login">
            <img src="" className="login-logo" alt="" />

            <div className="login-form">
              <h1>{signState}</h1>
              <form>
                {signState === "Sign Up" ? (
                  <>
                  <input
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                    }}
                    type="text"
                    placeholder="First Name"
                  />
                  <input
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                    }}
                    type="text"
                    placeholder="Last Name"
                  />
                  </>
                ) : (
                  <></>
                )}

                <input
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  type="email"
                  placeholder="Email"
                />
                <input
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  type="password"
                  placeholder="Password"
                />
                {signState === "Sign Up" && (
                  <>
                    <input
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value);
                      }}
                      type="phone"
                      placeholder="Phone"
                    />
                    <input
                      value={address}
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                      type="address"
                      placeholder="Address"
                    />
                    <input
                      value={zip}
                      onChange={(event) => {
                        setZip(event.target.value);
                      }}
                      type="zip"
                      placeholder="Zip"
                    />
                    <input
                      value={city}
                      onChange={(event) => {
                        setCity(event.target.value);
                      }}
                      type="city"
                      placeholder="City"
                    />
                    <input
                      value={state}
                      onChange={(event) => {
                        setState(event.target.value);
                      }}
                      type="state"
                      placeholder="State"
                    />
                  </>
                )}
                {signState === "Sign Up" ? (
                  <button onClick={handleSignUp}>Sign Up</button>
                ) : (
                  <button type="submit" onClick={(e) => {
                    e.preventDefault()
                    login(email, password)
                    dispatch(closeLoginModal())
                    }}>
                    Sign In
                  </button>
                )}
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
                    New To Mile High?{" "}
                    <span
                      onClick={() => setSignState("Sign Up")}
                      className="switch-text"
                    >
                      Sign Up Now
                    </span>
                  </p>
                ) : (
                  <p>
                    Already have account?{" "}
                    <span
                      onClick={() => setSignState("Sign In")}
                      className="switch-text"
                    >
                      Sign In Now
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
          
        )}
        </div>
      </Modal>
    </>
  );
};

export default Login;
