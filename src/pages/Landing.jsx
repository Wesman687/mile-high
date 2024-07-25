import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Landing.css";
import { flower, accessories } from "../assetts/Assets";
import Product from "../products/Product";
import Accessories from "../products/Accessories";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Landing = () => {
  const { flowerArray, loading} = useContext(Context)
  return (
    <div className="landing__container">
      <div className="popular__products">
        <h1 className="products__title shadoww">Popular Products</h1>
        <div className="carosuel">
         {loading ? <div className="login-spinner"><FontAwesomeIcon icon="fas fa-spinner"></FontAwesomeIcon></div> : 
         <div className="products">
            <AliceCarousel
              mouseTracking
              items={flowerArray.map((flower, index) => (
                <Product array={flower} index={index} />
              ))}
            />
          </div>}
        </div>
      </div>
      <div className="popular__products accessories">
        <h1 className="products__title accessories__title shadoww">Accessories</h1>
        <div className="carosuel accessories_carosuel">
          <div className="products accessories">
            <AliceCarousel
              mouseTracking
              items={accessories.map((items, index) => (
                <Accessories array={items} index={index} />
              ))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
