import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Login from "../authorization/Login";
import { useSelector } from "react-redux";
import Contact from "./Contact";

const Nav = ({}) => {
  const navigate = useNavigate();
  const numberOfItems = useSelector((state) => state.cart.totalQuantity)
  return (
    <div className="nav__container">
      <div className="logo__container">
        <h1 className="logo__text">MILE HIGH HEMP CO</h1>
      </div>

      <div className="nav__wrapper">
        <ul className="links">
          <li onClick={() => navigate("/")} className="home link click">
            Home
          </li>
          <Contact />
          <Login />

          <Link to="/cart">
            <li className="nav__icon">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="shopping__cart"
              />
              {numberOfItems > 0 && (
                <span className="cart__length">{numberOfItems}</span>
              )}
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
