import React, { useState } from "react";
import "./Product.css";
import { useNavigate } from "react-router-dom";

const Product = ({item, index}) => {
    const navigate = useNavigate()
    const handleDragStart = (e) => e.preventDefault()
    function isCrumble(){
      return item.name.search("Crumble") === 0
    }
    function isResin(){
      return item.name.search("Resin") === 0
    }
  return (
    <div className="product item click" onClick={()=>navigate(`./product/${index}`)}>
      <h1 className="product__name">{item.name}</h1>
      <h1 className="product__title">{item.title}</h1>
      <figure className="img__wrapper">
      <img src={item.image} onDragStart={handleDragStart} role="presentation" alt="" className="product__image" />
      </figure>
      <div className="price__wrapper">
        {(isResin() || isCrumble()) ?  
        <>        
        <h2 className="product__price">{isResin() ? '$30' : "20"}</h2>
        <p className="product__grams">2 grams</p>
        </> 
        : <>
         <h2 className="product__price">{`$${item.price / 4}`}</h2>
        <p className="product__grams">7 grams</p>
        </>}
      </div>
    </div>

  );
};

export default Product;
