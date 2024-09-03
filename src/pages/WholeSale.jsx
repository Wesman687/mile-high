import React from "react";
import "./WholeSale.css";
import img from "../assetts/img2original.jpg";
import { useDispatch } from "react-redux";
import { openContactModal } from "../redux/modalSlice";
import { AttentionSeeker, Fade, Slide } from "react-awesome-reveal";


const WholeSale = () => {
  const dispatch = useDispatch()
  return (
    <div className="landing__container wholesale__container">
      <div className="wholesale__wrapper">
        <Slide direction="left">
          <AttentionSeeker effect="pulse" delay={1500}>
        <div className="slide__wholesale">
        <img className="wholesale__image" src={img} alt="" />
        </div>
        </AttentionSeeker>
        </Slide>
        <Fade cascade={true}>
        <h1>WHOLESALE</h1>
        <p>
          Prices & Strains change regularly. Contact us through Email or phone
          for Wholesale pricing.
        </p>
        <p>303-993-0458 (or) Milehighhempco@gmail.com</p>
        <p className="wholesale__contact">Competitive Pricing, <span className="wholesale__link" onClick={()=>dispatch(openContactModal())}>Contact Us</span> Today!</p>
        <h1>Call us Now! Guranteed Low Price</h1>
        </Fade>
      </div>
    </div>
  );
};
export default WholeSale;
