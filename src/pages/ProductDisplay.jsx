import React, { useEffect, useState } from "react";
import "./ProductDisplay.css";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addCart, totalQuantity } from "../redux/cartSlice";

const ProductDisplay = ({flowerArray, loading}) => {
  const [amount, setAmount] = useState(1);
  const [option, setOption] = useState("Ounce");
  const [price, setPrice] = useState(0);
  const [basePrice, setBase] = useState(0);  
  const dispatch = useDispatch()
  const navigate = useNavigate();
  let id = useParams();
  id = id.index;
  const cart = useSelector((state)=> state.cart.cart)

  function increaseAmount() {
    setAmount(amount + 1);
    getPrice(option, amount + 1);
  }
  function decreaseAmount() {
    if (amount === 1) {
      setAmount(0);
      setPrice(0)
    } else if (amount > 0) {
      setAmount(amount - 1);
      getPrice(option, amount - 1);
    }
  }
  function productExistsOnCart() {
    return cart.find((product) => product.id === id);
  }
  function cartButton() {
    if (!price) {
      dispatch(addCart(
        id,
        amount,
        option,
        flowerArray[id.price]
      ));
    } else {
      dispatch(addCart({id, amount, option, price, basePrice }));
      dispatch(totalQuantity())
      navigate("/cart");
    }
  }
  function optionSet(event) {
    event.preventDefault();
    setOption(event.target.value);
    getPrice(event.target.value, amount);
  }
  function getPrice(value, quantity) {
    let itemPrice;
    let base;
    if (value === "Ounce") {
      itemPrice = +flowerArray[id].price * quantity;
      base = +flowerArray[id].price;
    } else if (value === "Half") {
      itemPrice = (+flowerArray[id].price / 2) * quantity;
      base = +flowerArray[id].price / 2;
    } else {
      itemPrice = (+flowerArray[id].price / 4) * quantity;
      base = +flowerArray[id].price / 4;
    }
    setPrice(itemPrice);
    setBase(base);
    return itemPrice;
  }
  useEffect(() => {
    getPrice("Ounce", 1);
  }, []);
  return (
    <div className="row">
      <div className="pd__container">
        {loading ? (
          <div className="login-spinner">
            <FontAwesomeIcon icon="fas fa-spinner"></FontAwesomeIcon>
          </div>
        ) : (
          <>
            {flowerArray.length > 0 && (
              <>
                <div className="pd__wrapper">
                  <img
                    src={flowerArray[id].image}
                    alt=""
                    className="pd__image"
                  />
                  <div className="pd__info">
                    <h1 className="pd__title">{flowerArray[id].title}</h1>
                    <select
                      defaultValue="Ounce"
                      className="pd__options"
                      name=""
                      id="size"
                      onChange={(event) => optionSet(event)}
                    >
                      <option value="">Choose Options</option>
                      <option value="Ounce" data-default>
                        Ounce
                      </option>
                      <option value="Half">Half Ounce</option>
                      <option value="Quarter">Quarter</option>
                    </select>
                      <span className="display__price">{`$${price}`}</span>
                   
                    <div className="amount">
                      <span className="amount__text">Quantity:</span>
                      <div className="amount__button">
                        <button
                          onClick={() => decreaseAmount()}
                          className="down click"
                        >
                          -
                        </button>
                        <form
                          type="number"
                          min={0}
                          max={99}
                          value={amount}
                          className="amount__field"
                        >
                          {amount}
                        </form>
                        <button
                          onClick={() => increaseAmount()}
                          className="up click"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {productExistsOnCart() ? (
                      <button
                        onClick={() => navigate("/cart")}
                        className="checkout click"
                      >
                        Go To Cart
                      </button>
                    ) : (
                      <button
                        className="checkout click"
                        onClick={() => cartButton()}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
                <h1 className="pd__desc">{flowerArray[id].desc}</h1>
              </>
            )}
            <div className="pd__thumb--window">
              {/*flower[id].thumb.map((curr, index) => (
              <figure className="thumb__figure" key={index}>
                <img src={curr} alt="" className="thumb__image" />
              </figure>
            ))*/}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDisplay;
