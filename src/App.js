import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Landing from './assetts/pages/Landing';
import ProductDisplay from './assetts/pages/ProductDisplay';
import { useContext, useEffect } from 'react';
import { Context } from './context/ContextProvider.jsx'

function App() {
  const { getArrays, flowerArray } = useContext(Context)
  useEffect(()=> {
    getArrays()
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
      </Routes>
      </div>
      </div>
      
    </div>
    </Router>
  );
}

export default App;
