import React, { useContext, useEffect, useState } from "react";
import "./ProductDisplay.css";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/ContextProvider";
import { flower } from "../assetts/Assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDisplay = () => {
  const [amount, setAmount] = useState(1);
  const [option, setOption] = useState("Ounce");
  const [price, setPrice] = useState(0);
  const [basePrice, setBase] = useState(0);
  const navigate = useNavigate();
  let id = useParams();
  id = id.index;
  const { loading, addToCart, cart, flowerArray } = useContext(Context);

  function increaseAmount() {
    setAmount(amount + 1);
    getPrice(option, amount + 1);
  }
  function decreaseAmount() {
    if (amount > 0) setAmount(amount - 1);
    getPrice(option, amount - 1);
  }
  function productExistsOnCart() {
    return cart.find((product) => product.id === id);
  }
  function cartButton() {
    if (!price) {
      addToCart(
        id,
        option,
        amount,
        flower[id].price * 4,
        flower[id.price]
      );
    } else {
      addToCart(id, option, amount, price, basePrice);
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
    if (value == "Ounce") {
      itemPrice = +flower[id].price * 4 * quantity;
      base = +flower[id].price * 4;
    } else if (value == "Half") {
      itemPrice = +flower[id].price * 2 * quantity;
      base = +flower[id].price * 2;
    } else {
      itemPrice = +flower[id].price * quantity;
      base = +flower[id].price;
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
      {loading ? (
        <div className="login-spinner">
          <FontAwesomeIcon icon="fas fa-spinner"></FontAwesomeIcon>
        </div>
      ) : (
        <div className="pd__container">
          <div className="picture__options">
            <div className="pd__wrapper">
              <img src={flowerArray[id].image} alt="" className="pd__image" />
              <div className="pd__info">
                <h1 className="pd__title">{flower[id].title}</h1>
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
                {price ? (
                  <span className="display__price">{`$${price}`}</span>
                ) : (
                  <span className="display__price">{`$${
                    flower[id].price * 4
                  }`}</span>
                )}
                <div className="amount">
                  <span className="amount__text">Quantity:</span>
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
                  <button onClick={() => increaseAmount()} className="up click">
                    +
                  </button>
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
            <h1 className="pd__desc">{flower[id].desc}</h1>
          </div>
          <div className="pd__thumb--window">
            {flower[id].thumb.map((curr, index) => (
              <figure className="thumb__figure" key={index}>
                <img src={curr} alt="" className="thumb__image" />
              </figure>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
