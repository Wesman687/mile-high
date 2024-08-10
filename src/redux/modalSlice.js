import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginModalOpen: false,
  contactModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.loginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginModalOpen = false;
    },
    openContactModal: (state) => {
      state.contactModalOpen = true;
    },
    closeContactModal: (state) => {
      state.contactModalOpen = false;
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openContactModal,
  closeContactModal,
} = modalSlice.actions;

export default modalSlice.reducer;
