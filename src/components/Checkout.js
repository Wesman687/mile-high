import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
  } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useCallback, useContext } from 'react';
import { Context } from '../context/ContextProvider';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const Checkout = () => {
    const { cart } = useContext(Context)
    const fetchClientSecret = useCallback(() => {
        console.log(cart)
      // Create a Checkout Session
      return fetch("http://localhost:4000/create-checkout-session", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => data.clientSecret);
    }, []);
  
    const options = {fetchClientSecret};
  
    return (
      <div id="checkout">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={options}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    )
  }

  export default Checkout