import React from "react";
import "./Product.css";
import { useNavigate } from "react-router-dom";

const Product = ({array, index}) => {
    const navigate = useNavigate()
    const handleDragStart = (e) => e.preventDefault()
  return (
    <div className="product item click" data-value={index} onClick={()=>navigate(`./product/${index}`)}>
      <h1 className="product__name">{array.name}</h1>
      <h1 className="product__title">{array.title}</h1>
      <figure className="img__wrapper">
      <img src={array.image} onDragStart={handleDragStart} role="presentation" alt="" className="product__image" />
      </figure>
      <div className="price__wrapper">
        <h2 className="product__price">{`$${array.price}`}</h2>
        <p className="product__grams">14 grams</p>
      </div>
    </div>

  );
};

export default Product;
