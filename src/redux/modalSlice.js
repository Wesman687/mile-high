import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loginModalOpen: false

}

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openLoginModal: (state) => {
        state.loginModalOpen = true
    },
    closeLoginModal: (state) => {
        state.loginModalOpen = false
    }

  }
});

export const { openLoginModal, closeLoginModal } = modalSlice.actions

export default modalSlice.reducer