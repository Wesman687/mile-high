import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing.jsx';
import ProductDisplay from './pages/ProductDisplay.jsx';
import { useContext, useEffect } from 'react';
import ContextProvider, { Context } from './context/ContextProvider.jsx'
import Cart from './components/Cart.jsx';
import ShipStates from './pages/ShipStates.jsx';
import THCA from './pages/THCA.jsx';
import Benefits from './pages/Benefits.jsx';
import AboutUs from './pages/AboutUs.jsx';
import WholeSale from './pages/WholeSale.jsx';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/init.js'
import Login from './authorization/Login.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { getArrays, flowerArray, numberOfItems } = useContext(Context)
  useEffect(()=> {
    getArrays()
    onAuthStateChanged(auth, async(user)=> { 
      
    })
  },[])
  
  return (
    <Router>
    <div className="App">      
      <Nav />
      
      <div className='components'>
      <Sidebar />
      
      <div className='main'>
      <div className='filler'></div>
      <Routes>
        <Route path='/' key="_index"  element={<Landing /> }/>
        <Route path='/product/:index' key="_index" element={<ProductDisplay flowerArray={flowerArray} />}/> 
        <Route path='/cart' element={<Cart />} />
        <Route path='/shipstates' element={<ShipStates />} />
        <Route path='/thca' element={<THCA />} />        
        <Route path='/benefits' element={<Benefits />} />        
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/wholesale' element={<WholeSale />} />
        <Route path='/login' element={<Login /> } />
      </Routes>
      </div>
      </div>
      
    </div>
    </Router>
  );
}

export default App;
