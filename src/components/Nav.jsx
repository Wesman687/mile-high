import React, { useContext } from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ContextProvider, { Context } from "../context/ContextProvider";

const Nav = ({}) => {
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
          
          <li className="link login">Login</li>
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
