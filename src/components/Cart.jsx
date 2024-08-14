import EmptyCart from "../assetts/empty_cart.svg";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeQuantity,
  getPrice,
  removeItem,
  totalQuantity,
} from "../redux/cartSlice";
import { useEffect } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/init";
import { openLoginModal } from "../redux/modalSlice";

const Cart = ({ flowerArray, loading }) => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user);
  const wholeCart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function addOrder() {
    const userRef = await query(
      collection(db, "user"),
      where("uid", "==", user.uid)
    );
    const data = await getDocs(userRef);
    const docRef = doc(db, "user", data.docs[0].id);
    const order = {
      uid: user.uid,
      cart: cart,
      totalQuantity: wholeCart.totalQuantity,
      totalPrice: wholeCart.totalPrice,
    };

    const orderDoc = await addDoc(collection(db, "orders"), order);
  }
  function performCheckOut(e) {
    console.log(user);
    if (user.email) {
      e.preventDefault();
      addOrder();
      navigate("/checkout");
    } else {
      dispatch(openLoginModal());
    }
  }

  useEffect(() => {
    dispatch(getPrice());
  }, []);
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
          <div className="cart__body">
            {cart.map((items, index) => {
              return (
                <div className="cart__item--wrapper" key={index}>
                  <div className="cart__item">
                    <div className="box__title">
                      <div className="cart__img--title">
                        <img
                          src={flowerArray[items.id].image}
                          alt=""
                          className="cart__item--img"
                        />
                        <span className="cart__item--title">
                          {flowerArray[items.id].title}{" "}
                        </span>
                      </div>
                      <div className="cart__quantity--box">
                        <input
                          type="number"
                          id={items.id}
                          min={1}
                          max={99}
                          value={items.quantity}
                          onChange={(event) => {
                            dispatch(
                              changeQuantity({
                                id: items.id,
                                quantity: event.target.value,
                              })
                            );
                            dispatch(totalQuantity());
                            dispatch(getPrice());
                          }}
                          className="cart__input"
                        />
                        <button
                          className="cart__book--remove click"
                          onClick={() => {
                            dispatch(removeItem({ id: items.id }));
                            dispatch(totalQuantity());
                            dispatch(getPrice());
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="cart__strain"></div>
                    <div className="cart__size">{items.size}</div>
                    <div className="cart__book--price">{items.price}</div>
                  </div>

                  <div className="cart__total"></div>
                </div>
              );
            })}
          </div>
          {cart.length === 0 && (
            <div className="cart__empty">
              <img src={EmptyCart} alt="" className="cart__empty--img" />
              <h2 className="cart__text">
                You don't have any items in your cart!
              </h2>
              <button className="cart__home" onClick={() => navigate("/")}>
                Home
              </button>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="total">
            <div className="total__item total__sub-total">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="total__item total__tax">
              <span>Tax</span>
              <span>${(totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <div className="total__item total__price">
              <span>Total</span>
              <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
            </div>
            <button
              onClick={(e) => {
                performCheckOut(e);
              }}
              className="btn btn__checkout click"
            >
              Proceed to checkout
            </button>
              <button className="continue__shopping" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
