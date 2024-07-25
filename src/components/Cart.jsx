import React, { useState, useEffect, useContext } from "react";
import EmptyCart from "../assetts/empty_cart.svg";
import { Link } from "react-router-dom";
import { flower } from "../assetts/Assets";
import { Context } from "../context/ContextProvider";
import {loadStripe} from '@stripe/stripe-js'
import "./Cart.css";

const Cart = () => {
  const {  cart, removeItem, changeQuantity, flowerArray } = useContext(Context);
  const apiURL = ""
  const total = () => {
    let price = 0;
    cart.forEach((item) => {
      price += +(
        item.basePrice * item.quantity
      ).toFixed(2);
    });
    return price;
  };
  async function makePayment() {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY)
    const body = {
        products: cart
    }
    const headers={
        "Content-type":"application/json"
    }
    const response = await fetch(`${apiURL}/create-checkout-session`,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    })
    const session = await response.json
    const result = stripe.redirectToCheckout({
        sessionId:session.id
    })
  }
  return (
    <div className="cart__container">
      <div className="cart__row">
        <div className="book__selected--top">
          <h2 className="cart__title">Cart</h2>
        </div>
        <div className="cart">
          <div className="cart__header">
            <div className="cart__type">Item</div>
            <div className="cart__amount">Strain</div>
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
                        src={flower[items.id].image}
                        alt=""
                        className="cart__item--img"
                        
                      />
                      <span className="cart__item--title">{flowerArray[items.id].title} </span>
                    </div>
                    <div className="cart__quantity--box">
                      <input
                        type="number"
                        id={items.id}
                        min={1}
                        max={99}
                        value={items.quantity}
                        onChange={(event)=>changeQuantity(items.id, event.target.value)}
                        className="cart__input"
                      />
                      <button
                        className="cart__book--remove click"
                        onClick={() => removeItem(items.id)}
                      >
                        Remove
                      </button>
                    </div>
                    </div>

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
              <h2>You don't have any items in your cart!</h2>
              <Link to="/">
                <button className="btn cart__home">Home</button>
              </Link>
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="total">
            <div className="total__item total__sub-total">
              <span>Subtotal</span>
              <span>${total().toFixed(2)}</span>
            </div>
            <div className="total__item total__tax">
              <span>Tax</span>
              <span>${(total() * 0.1).toFixed(2)}</span>
            </div>
            <div className="total__item total__price">
              <span>Total</span>
              <span>${(total() + total() * 0.1).toFixed(2)}</span>
            </div>
            <form action="/create-checkout-session" method="POST">
            <button
              className="btn btn__checkout click"
            >
              Proceed to checkout
            </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
