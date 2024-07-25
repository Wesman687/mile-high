import React, { createContext, useEffect, useState } from "react";
import { flower, accessories } from "../assetts/Assets";
import axios from "axios";



export const Context = createContext();


const ContextProvider = (props) => {
  const [flowerArray, setFlower] = useState([]);
  const [accessoryArray, setAccessory] = useState([]);
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState([])
  
  useEffect(() => {
    
  }, [cart]);

  const getArrays = async () => {
    setLoading(true)
    const response = await axios("https://milehighserv.onrender.com/api/flower/list")
    const data = response.data.flowers
    setFlower(data)
    setAccessory(accessories);
    setLoading(false)    
  }


  function addToCart(id, option,  amount, total, base) {
    setCart([...cart, { id, quantity: amount, size: option, price: total, basePrice: base }]);
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
    flowerArray, getArrays, loading,
    accessoryArray, addToCart,
    cart, changeQuantity, removeItem, numberOfItems
  };




  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
