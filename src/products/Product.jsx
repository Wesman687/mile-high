import React from 'react'
import { flower, accessories } from '../assetts/Assets'
import './Product.css'

const Product = () => {
  return (
    <div className="products">
                <div className="product click">
                    <h1 className="product__title">{flower[0].title}</h1>
                    <img src={flower[0].image} alt="" className="product__image" />
                    <div className="price__wrapper">
                    <h2 className="product__price">{`$${flower[0].price}`}</h2>
                    <p product__grams>14 grams</p>
                    </div>                    
                     {flower[0].strain.map((flower)=>(
                        <p className="product__strain">
                        {flower}
                        </p>
                        ))}                  
                </div>
            </div>
  )
}

export default Product
