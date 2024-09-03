import React, { useEffect } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Landing.css";
import Product from "../products/Product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AttentionSeeker, Fade,  Roll } from 'react-awesome-reveal'
import { useDispatch, useSelector } from "react-redux";
import { openCartModal } from "../redux/modalSlice";


const Landing = ({flowerArray, loading}) => {
  const numberOfItems = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch()
  console.log(flowerArray)
  useEffect(()=>{
    if (numberOfItems > 0) {
      dispatch(openCartModal())
    }
  },[])
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
