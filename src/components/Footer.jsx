import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from 'react-redux'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
const Footer = () => {
    
  const numberOfItems = useSelector((state) => state.cart.totalQuantity);
  return (
    <>
      <Link to="/cart">
           
            <div className="footer__container">
                <div className="shopping_container">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="shopping__cart"
              />
            </div>            
            {numberOfItems > 0 && (
                <span className="cart__length">{numberOfItems}</span>
              )}
              </div>
          </Link>
        
    </>
  )
}

export default Footer
