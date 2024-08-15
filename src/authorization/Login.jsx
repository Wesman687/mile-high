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
  signInWithPopup,
  getAuth,  
} from "firebase/auth";
import { State, City } from "country-state-city";
import { setUser } from "../redux/userSlice.js";
import { addDoc, collection, where, getDocs, query } from "firebase/firestore";
import Select from "react-select";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const Login = () => {
  const states = State.getAllStates();
  const cities = City.getAllCities();
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
  const [stateid, setStateid] = useState("")
  const [loading, setLoading] = useState(false);
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();
  let valueStates = [];
  let valueCities = [];
    const refinedStates = states.filter((states) => states.countryCode == "US");
    refinedStates.map((state) => {
      valueStates.push({
        value: state.name,
        label: state.name,
        stateid: state.isoCode,
      });
    });
  const filterCity = () => {
    const refinedCities = cities.filter(
      (cities) => cities.stateCode == stateid
    );
    refinedCities.map((cities) => {
      valueCities.push({ value: cities.name, label: cities.name });
    });
    return valueCities;
  };
  function loginGoogle() {
    
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true)
    let res
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      res = userCredentials.user;
    } catch (error) {
      alert(error.code.split('/')[1].split('-').join(" "))
      setLoading(false)
      return
    }
    
    
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
      stateid: stateid
    });
    setLoading(false)
  }
  const login = async (email, password) => {
    setLoading(true)
    try{
        await signInWithEmailAndPassword(auth, email, password)

    } catch (error) {
        alert(error.code.split('/')[1].split('-').join(" "))

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
          stateid: userInfo.stateid,
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
            
            <div className="">
                  <button
                    className="login__x"
                    onClick={() => dispatch(closeLoginModal())}
                  >
                    <FontAwesomeIcon icon="times" />
                  </button>
                </div>

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
                    <div className="select">
                        <Select
                          name="States"
                          isSearchable={true}
                          defaultInputValue={state}
                          options={valueStates}
                          classNamePrefix="react-select"
                          unstyled={true}
                          onChange={(e) => {
                            setStateid(e.stateid);
                            setState(e.value);
                            filterCity();
                          }}
                        ></Select>
                      </div>

                      <div className="select2">
                        <Select
                          name="Cities"
                          isSearchable={true}
                          defaultInputValue={city}
                          options={filterCity()}
                          classNamePrefix="react-select"
                          unstyled={true}
                          onChange={(e) => {
                            setCity(e.value);
                          }}
                        ></Select>
                      </div>
                  </>
                )}
                {signState === "Sign Up" ? (
                  <button className="submit" onClick={handleSignUp}>Sign Up</button>
                ) : (
                  <>
                  <button type="submit" className="submit" onClick={(e) => {
                    e.preventDefault()
                    login(email, password)
                    dispatch(closeLoginModal())
                    }}>
                    Sign In
                  </button>                  
              <button className="submit" onClick={loginGoogle}>Sign In With Google</button>
              </>
                )}
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
