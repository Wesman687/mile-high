import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Landing.css";
import { accessories } from "../assetts/Assets";
import Product from "../products/Product";
import Accessories from "../products/Accessories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";





const Landing = ({flowerArray, loading}) => {
  
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
         {loading ? <div className="login-spinner"><FontAwesomeIcon icon="fas fa-spinner"></FontAwesomeIcon></div> : 
         <div className="products">
            
              
              {flowerArray.map((flower, index) => (
                <Product item={flower} index={index} key={index}/>                
              ))}  
                          
                       
          </div>}
        </div>
    </div>
  );
};

export default Landing;
