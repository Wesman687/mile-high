import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    totalQuantity: 0,
    totalPrice: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,  
  reducers: {
    addCart: (state, action) => {
      state.cart = [
        ...state.cart,
        {
          id: action.payload.id,
          quantity: action.payload.amount,
          option: action.payload.option,
          price: action.payload.price,
          basePrice: action.payload.basePrice,
          name: action.payload.name,
          uid: action.payload.uid
        },
      ]      
      
    },
    clearCart: (state) => {
      state.cart = []
      state.totalQuantity = 0
      state.totalPrice = 0
    },
    changeQuantity: (state, action) => {
        console.log(action.payload)
      state.cart = state.cart.map((item) =>
        item.id === action.payload.id
          ? {
              ...item,
              quantity: +action.payload.quantity,
              price: action.payload.quantity * item.basePrice,
            }
          : item
      );
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((product) => product.id !== action.payload.id);
    },
    totalQuantity: (state) => {  
      let counter = 0
      state.cart.forEach(item => {
        counter += item.quantity
      })
      state.totalQuantity = counter
    },
    getPrice: (state) => {
        let price = 0;
        state.cart.forEach((item) => {
        price += +(item.basePrice * item.quantity).toFixed(2);
    });
    state.totalPrice = price
    }
  },
});

export const { removeItem, numOfItems, changeQuantity, addCart, totalQuantity, getPrice, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
