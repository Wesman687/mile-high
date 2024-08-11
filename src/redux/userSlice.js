
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName: null,
  lastName: null,
    email: null,
    uid: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    phone: null,
    country: null,
    countryid: null,
    stateid: null,
    cityid: null

}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.email = action.payload.email
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
        state.uid = action.payload.uid
        state.address = action.payload.address
        state.state = action.payload.state
        state.zip = action.payload.zip
        state.city = action.payload.city
        state.phone = action.payload.phone
        state.country = action.payload.country
        state.countryid = action.payload.countryid
        state.stateid = action.payload.stateid
        state.cityid = action.payload.cityid
    },
    signOutUser : (state) =>{
      state.firstName = null
      state.lastName = null
      state.email = null
      state.uid = null
      state.address = null
      state.city = null
      state.state = null
      state.zip = null
      state.phone = null
      state.country = null
      state.countryid = null
      state.stateid = null
      state.cityid = null
    }
  }
});

export const { setUser, signOutUser } = userSlice.actions

export default userSlice.reducer