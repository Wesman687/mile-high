
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: null,
    email: null,
    uid: null,
    photoUrl: null

}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.email = action.payload.email
        state.name = action.payload.name
        state.uid = action.payload.uid
    },
    signOutUser : (state) =>{
        state.name = null
        state.email = null
        state.uid = null
        state.photoUrl = null
    }
  }
});

export const { setUser, signOutUser } = userSlice.actions

export default userSlice.reducer