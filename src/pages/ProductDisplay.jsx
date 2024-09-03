import React, { useEffect, useState } from "react";
import "./ProductDisplay.css";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { addCart, totalQuantity } from "../redux/cartSlice";
import { Bounce, Fade, Slide } from "react-awesome-reveal";

const ProductDisplay = ({ flowerArray, loading }) => {
  const [amount, setAmount] = useState(1);
  const [option, setOption] = useState("Ounce");
  const [price, setPrice] = useState(0);
  const [imageDisplay, setImageDisplay] = useState("");
  const [lastImageDisplay, setLastImageDisplay] = useState('')
  const [basePrice, setBase] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let id = useParams();
  id = id.index;
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.cart);
  function isCrumble() {
    return flowerArray[id].name.search("Crumble") === 0;
  }
  function isResin() {
    return flowerArray[id].name.search("Resin") === 0;
  }
  function increaseAmount() {
    setAmount(amount + 1);
    getPrice(option, amount + 1);
  }
  function decreaseAmount() {
    if (amount === 1) {
      setAmount(0);
      setPrice(0);
    } else if (amount > 0) {
      setAmount(amount - 1);
      getPrice(option, amount - 1);
    }
  }
  function productExistsOnCart() {
    return cart.find((product) => product.id === id);
  }
  function cartButton() {
    if (user.uid) {
      dispatch(
        addCart({
          id: id,
          amount: amount,
          option: option,
          price: price,
          basePrice: basePrice,
          name: flowerArray[id].title,
          uid: user.uid,
        })
      );
    } else {
      dispatch(
        addCart({
          id: id,
          amount: amount,
          option: option,
          price: price,
          basePrice: basePrice,
          name: flowerArray[id].title,
          uid: "AX0e1T7UxYZYo5Iy4OLOK3qIDyb2",
        })
      );
    }
    dispatch(totalQuantity());
    navigate("/cart");
  }
  function optionSet(event) {
    event.preventDefault();
    setOption(event.target.value);
    getPrice(event.target.value, amount);
  }
  function getPrice(value, quantity) {
    let itemPrice;
    let base;
    if (flowerArray[id].category === "Resin/Crumble") {
      if (value === "Ounce") {
        itemPrice = +flowerArray[id].prices[2];
      } else if (value === "10 grams") {
        itemPrice = +flowerArray[id].prices[1];
      } else {
        itemPrice = +flowerArray[id].prices[0];
      }
      priceSet(itemPrice * quantity, itemPrice);
      return itemPrice;
    }
    if (value === "Ounce") {
      itemPrice = +flowerArray[id].prices[2];
      base = +flowerArray[id].prices[2];
    } else if (value === "Half") {
      itemPrice = +flowerArray[id].prices[1];
      base = +flowerArray[id].prices[1];
    } else {
      itemPrice = +flowerArray[id].prices[0];
      base = +flowerArray[id].prices[0];
    }
    priceSet(itemPrice * quantity, base);
    return itemPrice;
  }
  function priceSet(price, base) {
    setPrice(price);
    setBase(base);
  }
  useEffect(() => {
    getPrice("Ounce", 1);
    if (id) {
      setImageDisplay(flowerArray[id].images[0].link);
    }
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
                  <div className="info__wrapper">
                    <Slide triggerOnce={true} direction="left">
                      <Fade triggerOnce={true} delay={200} duration={4500}>
                        <div className="display__image--wrapper">
                          <img
                            src={imageDisplay}
                            alt=""
                            className="pd__image"
                          />
                          <div className=" display__slide--wrapper">
                            {flowerArray[id].images.map((item, index) => (
                              <div
                                className="display__image--slide"
                                key={index}
                                onClick={() => {
                                  setImageDisplay(item.link)
                                  setLastImageDisplay(imageDisplay)
                                }}
                                onMouseEnter={() =>{
                                  setLastImageDisplay(imageDisplay)
                                  setImageDisplay(item.link)}}
                                onMouseLeave={()=>setImageDisplay(lastImageDisplay)}
                              >
                                <img
                                alt=""
                                  src={item.link}
                                  className="slide__images"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </Fade>
                    </Slide>
                    <div className="pd__info">
                      <Fade triggerOnce={true} delay={1000} duration={5000}>
                        <h1 className="pd__title">{flowerArray[id].name}</h1>
                        {flowerArray[id].category === "Resin/Crumble" ? (
                          <select
                            defaultValue="Ounce"
                            className="pd__options"
                            name=""
                            id="size"
                            onChange={(event) => optionSet(event)}
                          >
                            <option value=""></option>
                            <option value="Ounce" data-default>
                              Ounce
                            </option>
                            <option value="10 grams">10 grams</option>
                            <option value="2 grams">2 grams</option>
                          </select>
                        ) : (
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
                        )}
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
                      </Fade>
                    </div>
                  </div>
                  <div className="desc__container">
                    <>
                      <Bounce triggerOnce={true} cascade={true} delay={1300} duration={2500}>
                        <Fade triggerOnce={true} delay={250}>
                          <h1 className="pd__desc">{flowerArray[id].desc}</h1>
                          {isResin() === true && (
                            <>
                              <Fade triggerOnce={true} cascade={true} delay={3800}>
                                <p className="pd__resin">
                                  Unlike other concentrates, Live Resin is made
                                  from freshly harvest ed hemp plants that
                                  haven't been cured or dried. This distinction
                                  is crucial because it maintains the rich
                                  terpene profile and peak cannabinoid content
                                  that often gets lost in the drying and curing
                                  process.
                                </p>
                                <p className="pd__resin">
                                  THCa Live Resin is prized not only for its
                                  potent effects but also for its ability to
                                  deliver a more powerful experience than
                                  concentrates derived from the cured plant
                                  material.
                                </p>
                              </Fade>
                            </>
                          )}

                          {isCrumble() === true && (
                            <>
                              <Fade triggerOnce={true} cascade={true} delay={3800}>
                                <h1 className="pd__crumble">
                                  How Long does crumble take to hit
                                </h1>
                                <p>
                                  Once you place the crumble on your dab rig and
                                  take the first toke, within a few seconds to a
                                  minute it will hit you.
                                </p>
                                <h1 className="pd__crumble">
                                  How to consume Crumble
                                </h1>
                                <p>
                                  The most common way to consume crumble is with
                                  a dab rig, but you could certainly vaporize
                                  it, or even ingest it in a food product if you
                                  wanted to.
                                </p>
                                <br />
                                <p>
                                  We find that our customers report back the
                                  best results and experience is dabbing it, but
                                  to each their own.
                                </p>
                              </Fade>
                            </>
                          )}
                        </Fade>
                      </Bounce>
                    </>
                  </div>
                </div>
              </>
            )}            
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDisplay;
