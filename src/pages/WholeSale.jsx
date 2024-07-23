import React from "react";
import "./WholeSale.css";
import img from "../assetts/img2original.jpg";

const WholeSale = () => {
  return (
    <div className="landing__container wholesale__container">
      <div className="wholesale__wrapper">
        <img src={img} alt="" />
        <h1>WHOLESALE</h1>
        <p>
          Prices & Strains change regularly. Contact us through Email or phone
          for Wholesale pricing.
        </p>
        <p>303-993-0458 (or) Milehighhempco@gmail.com</p>
      </div>
    </div>
  );
};
export default WholeSale;
