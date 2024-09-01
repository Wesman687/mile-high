import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import Login from "../authorization/Login";
import { useDispatch, useSelector } from "react-redux";
import Contact from "./Contact";
import { auth } from "../firebase/init";
import { signOutUser } from "../redux/userSlice";
import { signOut } from "firebase/auth";
import AccountSettings from "./AccountSettings";
import wholeSale from "../assetts/wholeSale.png";
import hemp from "../assetts/Hemp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { openLoginModal } from "../redux/modalSlice";
import { Fade, Slide } from "react-awesome-reveal";
const Nav = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  async function logOut() {
    await signOut(auth);
    dispatch(signOutUser());
  }
  function openMenu() {
    document.body.classList += " menu--open";
  }

  function closeMenu() {
    document.body.classList.remove("menu--open");
  }
  return (
    <div className="nav__container">
      <div className="nav__wrapper">
        <div className="logo__container">
          <Link to="/wholesale">
            <img src={wholeSale} alt="" className="wholesale" />
          </Link>
          <img src={hemp} alt="" className="logo" />
        </div>
        <div className="btn__menu" onClick={openMenu}>
          <FontAwesomeIcon icon="bars" />
        </div>
        <div className="menu__backdrop">
          <div className="men__border">
          <button className="btn__menu btn__menu--close" onClick={closeMenu}>
            <FontAwesomeIcon icon="times" />
          </button>
          
          <ul className="menu__links">
            <li className="menu__list">
              <Link to="/" className="menu__link" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <h1 className="menu__header">About</h1>
            <Link to="/wholesale">
                <p className="sb__link">WHOLESALE</p>
              </Link>
              <Link to="/aboutus">
                <p className="  sb__link">About Us</p>
              </Link>
              <Link to="/benefits">
                <p className="  sb__link">THCA Benefits</p>
              </Link>
              <Link to="/THCA">
                <p className=" sb__link">WHAT IS THCA?</p>
              </Link>
              <Link to="/shipstates">
                <p className="sb__link ">Ship States</p>
              </Link>              
              
              <Contact />
            <h1 className="menu__header">Account</h1>            

            {!user.email ? <>
                <p className="sb__link click" onClick={()=>dispatch(openLoginModal())}>Login</p>
              </>
              : (              
                <>
                  <AccountSettings />
                  <p className="sb__link click">Orders</p>
                  <p className="sb__link click" onClick={() => logOut()}>
                    Log Out
                  </p>
                </>              
            )}
          </ul>
          </div>
        </div>
        <div className="nav__links">
          <p onClick={() => navigate("/")} className="nav_link click">
            Home
          </p>
          
          <div className="about">
            <p className="nav_link">About</p>
            <div className="about_dropdown">
              <Link to="/wholesale">
                <p className="sb__link">WHOLESALE</p>
              </Link>
              <Link to="/aboutus">
                <p className="  sb__link">About Us</p>
              </Link>
              <Link to="/benefits">
                <p className="  sb__link">THCA Benefits</p>
              </Link>
              <Link to="/THCA">
                <p className=" sb__link">WHAT IS THCA?</p>
              </Link>
              <Link to="/shipstates">
                <p className="sb__link ">Ship States</p>
              </Link>
            </div>
          </div>
          <Contact />
          <div className="nav_link admin">
            {user.firstName ? (
              <p className="nav_link admin__link">{user.firstName}</p>
            ) : (
              <>
                <Login />
              </>
            )}

            {user.email && (
              <div className="admin_dropdown ">
                <>
                  <h1>Account</h1>
                  <AccountSettings />
                  <p className="sb__link">Orders</p>
                  <p className="sb__link " onClick={() => logOut()}>
                    Log Out
                  </p>
                </>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
