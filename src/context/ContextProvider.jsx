import React, { createContext, useState } from "react";
import { flower, accessories } from "../assetts/Assets";
export const Context = createContext();

const ContextProvider = (props) => {
  const [flowerArray, setFlower] = useState([]);
  const [accessoryArray, setAccessory] = useState([]);
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState([])

  const getArrays = () => {
    setLoading(true)
    setFlower(flower);
    setAccessory(accessories);
    setLoading(false)
  }
  function addToCart(item) {
    setCart([...cart, { ...item, quantity: 1 }]);
  }
  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item
      )
    );
  }
  const contextValue = {
    flowerArray, getArrays,
    accessoryArray, addToCart,
    cart, changeQuantity
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
