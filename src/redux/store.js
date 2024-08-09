import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import { productsApi } from "./productsSlice";

export default configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice,
    cart: cartSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },

  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(productsApi.middleware),
});
