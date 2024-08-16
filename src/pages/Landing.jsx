import React from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Landing.css";
import Product from "../products/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Landing = ({flowerArray, loading}) => {
  
  return (
    <div className="landing__container">
         {loading ? <div className="login-spinner"><FontAwesomeIcon icon="fas fa-spinner"></FontAwesomeIcon></div> : 
         <div className="products">
              
              
              {flowerArray.map((flower, index) => (
                <Product item={flower} index={index} key={index}/>                
              ))}  
                          
                       
          </div>}
    </div>
  );
};

export default Landing;
