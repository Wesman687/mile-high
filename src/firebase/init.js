import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
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


const login = async (email, password) => {
    try{
        await signInWithEmailAndPassword(auth, email, password)

    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))

    }
    
}


export { auth, db, login}