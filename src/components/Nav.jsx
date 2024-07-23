import React, { useContext, useEffect, useState } from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Context } from "../context/ContextProvider";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout } from "../firebase/init";

const Nav = ({}) => {  
  const [signState, setSignState] = useState("Sign In")
  useEffect(() => {
    onAuthStateChanged(auth, async(user)=> {
      if (user) {
        setSignState("Sign Out")
      }
      else {
        setSignState("Sign In")
      }
    })
    
  }, [])
  function logoutNow(){
    logout()
    setSignState("Sign In")
  }
  console.log(signState)
  const { numberOfItems } = useContext(Context);
  const navigate = useNavigate();
  return (
    <div className="nav__container">
      <div className="logo__container">
        <h1 className="logo__text">MILE HIGH HEMP CO</h1>
      </div>

      <div className="nav__wrapper">
        <ul className="links">
          <li className="Shop link">Shop</li>
          <li onClick={() => navigate("/")} className="home link click">
            Home
          </li>         
          
          {signState === "Sign In" ? <Link to="/login"><li className="link login">Login</li></Link> : <li className="link logout click" onClick={()=>{logout()}}>Log out</li>}
          <li className="link contact">Contact Us</li>
        </ul>
        <Link to="/cart">
        <li className="nav__icon">
          <FontAwesomeIcon icon={faShoppingCart} className="shopping__cart" />
          {numberOfItems() > 0 && (
            <span className="cart__length">{numberOfItems()}</span>            
          )}
        </li>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
