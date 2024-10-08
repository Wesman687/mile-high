import { initializeApp } from "firebase/app";
import {  getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';


const firebaseConfig = {
    apiKey: "AIzaSyBbtKyAO73mpsfeSBSBGKUae3MGj0KpleE",
    authDomain: "mile-high-3b367.firebaseapp.com",
    projectId: "mile-high-3b367",
    storageBucket: "mile-high-3b367.appspot.com",
    messagingSenderId: "941006578707",
    appId: "1:941006578707:web:f5fac1bf710139b50bcbe6"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app)
  const db = getFirestore(app)





export { auth, db }