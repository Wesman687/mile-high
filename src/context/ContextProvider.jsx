import React, { createContext, useEffect, useState } from "react";
import { flower, accessories } from "../assetts/Assets";
export const Context = createContext();

const ContextProvider = (props) => {
  const [flowerArray, setFlower] = useState([]);
  const [accessoryArray, setAccessory] = useState([]);
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState([])
  
  useEffect(() => {
    
  }, [cart]);

  const getArrays = () => {
    setLoading(true)
    setFlower(flower);
    setAccessory(accessories);
    setLoading(false)
  }
  function addToCart(id, option, strain, amount, total, base) {
    setCart([...cart, { id, quantity: amount, size: option, type: strain, price: total, basePrice: base }]);
  }
  function changeQuantity(product, quantity) {

    setCart(
      cart.map((item) =>
        item.id === product
          ? {
              ...item,
              quantity: +quantity, price: quantity * item.basePrice,
            }
          : item
      )
    );
  }
  
  function numberOfItems() {
    let counter = 0;
    cart.forEach(item => {
      counter += item.quantity
    })
    return counter
  }
  function removeItem(item){
    setCart(cart.filter(product => product.id !== item))
    console.log('remove item', item)
  }
  const contextValue = {
    flowerArray, getArrays,
    accessoryArray, addToCart,
    cart, changeQuantity, removeItem, numberOfItems
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
