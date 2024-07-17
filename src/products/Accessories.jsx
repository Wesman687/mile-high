import React from "react";
import "./Product.css";

const Accessories = ({array, index}) => {
    const handleDragStart = (e) => e.preventDefault()
  return (
    <div className="product item click" data-value={index}>
      <h1 className="product__title">{array.title}</h1>
      <figure className="img__wrapper">
      <img src={array.image} onDragStart={handleDragStart} role="presentation" alt="" className="product__image" />
      </figure>
      <div className="price__wrapper">
        <h2 className="product__price">{`$${array.price}`}</h2>
      </div>
    </div>

  );
};

export default Accessories;
