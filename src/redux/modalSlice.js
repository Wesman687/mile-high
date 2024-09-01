import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginModalOpen: false,
  contactModalOpen: false,
  settingModalOpen: false,
  cartModalOpen: false,
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
    openSettingModal: (state) => {
      state.settingModalOpen = true;
    },
    closeSettingModal: (state) => {
      state.settingModalOpen = false;
    },
    openCartModal: (state) => {
      state.cartModalOpen = true;
    },
    closeCartModal: (state) => {
      state.cartModalOpen = false;
    },
  },
});

export const {
  openLoginModal,
  closeLoginModal,
  openContactModal,
  closeContactModal,
  openSettingModal,
  closeSettingModal,
  openCartModal,
  closeCartModal
} = modalSlice.actions;

export default modalSlice.reducer;
