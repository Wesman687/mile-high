import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import Login from "../authorization/Login";
import { useDispatch, useSelector } from "react-redux";
import Contact from "./Contact";
import { auth } from "../firebase/init";
import { signOutUser } from "../redux/userSlice";
import { signOut } from "firebase/auth";
import AccountSettings from "./AccountSettings";
import  wholeSale  from '../assetts/wholeSale.png'
import  hemp  from '../assetts/Hemp.png'
const Nav = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  async function logOut() {
    await signOut(auth);
    dispatch(signOutUser());
  }
  console.log(user);
  return (
    <div className="nav__container">
      <div className="logo__container">
      <Link to="/wholesale">
      <img src={wholeSale} alt="" className="wholesale" />
      </Link>
        <img src={hemp} alt="" className="logo" />
        
      </div>

      <div className="nav__wrapper"></div>
      
      <p onClick={() => navigate("/")} className="home nav_link click">
        Home
      </p>
      <div className="about nav_link">
        <p>About</p>
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
          <div className="admin">
            <p className="admin__link admin">{user.firstName}</p>
          </div>
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
  );
};

export default Nav;
