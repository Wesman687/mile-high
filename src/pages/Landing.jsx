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
    const responsive = {
        850: { 
            items: 1,
            itemsFit: 'contain'
        },
        1000: { 
            items: 2,            
            itemsFit: 'contain'
        },
        1400: {
            items: 4, 
            itemsFit: 'contain'
        },
    };
  return (
    <div className="landing__container">
      <div className="popular__products">
        <h1 className="products__title shadoww">Popular Products</h1>
        <div className="carosuel">
         {loading ? <div className="login-spinner"><FontAwesomeIcon icon="fas fa-spinner"></FontAwesomeIcon></div> : 
         <div className="products">
            <AliceCarousel
            autoWidth={true}
            autoHeight={true}
            infinite={true}
            keyboardNavigation={true}
            paddingRight={12}
              responsive={responsive}
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
             autoWidth={true}
             autoHeight={true}
             infinite={true}
             keyboardNavigation={true}
             paddingRight={12}
               responsive={responsive}
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
