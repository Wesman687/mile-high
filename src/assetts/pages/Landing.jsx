import React from 'react'
import './Landing.css'
import { flower, accessories } from '../Assets'
import Product from '../../products/Product'

const Landing = () => {
  return (
    <div className='landing__container'>
        <div className="popular__products">
            <h1 className="products__title shadoww">Popular Products</h1>
            <Product />
        </div>
      
    </div>
  )
}

export default Landing
