import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Landing.css";
import { flower, accessories } from "../Assets";
import Product from "../../products/Product";
import Accessories from "../../products/Accessories";
const Landing = () => {
    const responsive = {
        0: { 
            items: 1
        },
        1000: { 
            items: 2
        },
        1400: {
            items: 3, 
            itemsFit: 'contain'
        },
    };
  return (
    <div className="landing__container">
      <div className="popular__products">
        <h1 className="products__title shadoww">Popular Products</h1>
        <div className="carosuel">
          <div className="products">
            <AliceCarousel
              responsive={responsive}
              mouseTracking
              items={flower.map((flower, index) => (
                <Product array={flower} index={index} />
              ))}
            />
          </div>
        </div>
      </div>
      <div className="popular__products accessories">
        <h1 className="products__title accessories__title shadoww">Accessories</h1>
        <div className="carosuel accessories_carosuel">
          <div className="products accessories">
            <AliceCarousel
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
