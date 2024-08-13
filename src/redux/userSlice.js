
import { createSlice } from '@reduxjs/toolkit'
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase/init';

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
    stateid: null,
    orders: {
      id: null,
      cart: [],
      totalQuantity: 0,
      totalPrice: 0,
    }

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
        state.stateid = action.payload.stateid
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
      state.stateid = null
    },
    addOrder: async (state, action) => {
      const userRef = await query(
        collection(db, "user"),
        where("uid", "==", state.user.uid)
      );
      const data = await getDocs(userRef);
      const docRef = doc(db, "user", data.docs[0].id);
      const order = {
        cart: action.payload.cart.cart,
        totalQuantity: action.payload.cart.totalQuantity,
        totalPrice: action.payload.cart.totalPrice        
      }
      await updateDoc(docRef,{
        orders: arrayUnion(order)
      } );
    }
  }
});

export const { setUser, signOutUser, addOrder } = userSlice.actions

export default userSlice.reducer