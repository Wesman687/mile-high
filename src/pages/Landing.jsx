import React from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Landing.css";
import Product from "../products/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AttentionSeeker, Bounce, Fade, Flip, Hinge, JackInTheBox, Roll, Rotate } from 'react-awesome-reveal'


const Landing = ({flowerArray, loading}) => {
  return (
    <div className="landing__container">
         {loading ? <div className="login-spinner"><FontAwesomeIcon icon="fas fa-spinner"></FontAwesomeIcon></div> : 
         <div className="products">
              
              
              {flowerArray.map((flower, index) => (
                <Roll key={index} delay={index*300}>
                  <Fade  delay={index*400}>
                  <AttentionSeeker effect='tada' delay={flowerArray.length * 400 + 400} duration={'2000'}>
                <Product item={flower} index={index} key={index}/>  
                </AttentionSeeker>
                </Fade>
                </Roll>              
              ))}  
                          
                       
          </div>}
    </div>
  );
};

export default Landing;
