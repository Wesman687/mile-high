
import './Checkout.css'
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
  } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const Checkout = () => {
    const cart = useSelector((state) => state.cart.cart)
    const fetchClientSecret = useCallback(() => {
      // Create a Checkout Session
      return fetch("https://milehighserv.onrender.com/create-checkout-session", {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body:JSON.stringify({cart})
      })
        .then((res) => res.json())
        .then((data) => data.clientSecret);
    }, []);
  
    const options = {fetchClientSecret};
    console.log(options)
  
    return (
      <>
      <div className="cart__container">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
        </div>
      </>
    )
  }

  export default Checkout