import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import './Return.css'
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { addOrder } from "../redux/userSlice";

const Return = () => {
  const [status, setStatus] = useState(null);
  const cart = useSelector(state => state.cart)
  const [customerEmail, setCustomerEmail] = useState("");
  const dispatch = useDispatch()

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    console.log("return");
    fetch(`https://milehighserv.onrender.com/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    dispatch(clearCart())
    console.log("sending order", cart)
    dispatch(addOrder(cart))
    return (
      <div className="cart__container">
        <div className="cart__row">
          <div className="book__selected--top">
            <h2 className="cart__title">Cart</h2>
          </div>
          <div className="cart">
            <div className="cart__header">
              <div className="cart__type">Item</div>
              <div className="cart__amount"></div>
              <div className="cart__quantity">Size</div>
              <div className="cart__total">Price</div>
            </div>
            <div className="cart__body return__body">
              <h1 className="return__header">Checkout Complete!</h1>
              <p className="return__paragraph">
                We appreciate your business! A confirmation email will be sent
                to {customerEmail}. If you have any questions, please email{" "}
                <a href="mailto:orders@example.com">Milehighhempco@google.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default Return;
