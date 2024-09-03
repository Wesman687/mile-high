import React from "react";
import "./Product.css";
import { useNavigate } from "react-router-dom";

const Product = ({item, index}) => {
    const navigate = useNavigate()
    const handleDragStart = (e) => e.preventDefault()
  return (
    <div className="product item click" onClick={()=>navigate(`./product/${index}`)}>
      <h1 className="product__name">{item.name}</h1>
      <h1 className="product__title">{item.title}</h1>
      <figure className="img__wrapper">
      <img src={item.images[0].link} onDragStart={handleDragStart} role="presentation" alt="" className="product__image" />
      </figure>
      <div className="price__wrapper">
        <h2 className="product__price">${item.prices[0]} - ${item.prices[2]}</h2>
      </div>
    </div>

  );
};

export default Product;
