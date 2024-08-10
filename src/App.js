import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing.jsx';
import ProductDisplay from './pages/ProductDisplay.jsx';
import Cart from './components/Cart.jsx';
import ShipStates from './pages/ShipStates.jsx';
import THCA from './pages/THCA.jsx';
import Benefits from './pages/Benefits.jsx';
import AboutUs from './pages/AboutUs.jsx';
import WholeSale from './pages/WholeSale.jsx';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './components/Checkout.js';
import { useGetAllFlowersQuery } from './redux/productsSlice.js';
import Return from './components/Return.js';

function App() {  
  const { data, isLoading } = useGetAllFlowersQuery()
  return (
    <Router>
    <div className="App">      
      <Nav />
      
      <div className='components'>
      <Sidebar />
      
      <div className='main'>
      <div className='filler'></div>
      {data && <Routes>
        <Route path='/' key="_index"  element={<Landing  flowerArray={data.flowers} loading={isLoading} /> }/>
        <Route path='/product/:index' key="_index" element={<ProductDisplay flowerArray={data.flowers} loading={isLoading} />}/> 
        <Route path='/cart' element={<Cart flowerArray={data.flowers} loading={isLoading} />} />
        <Route path='/shipstates' element={<ShipStates />} />
        <Route path='/thca' element={<THCA />} />        
        <Route path='/benefits' element={<Benefits />} />        
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/wholesale' element={<WholeSale />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/return' element={<Return />} />
      </Routes>}
      </div>
      </div>
      
    </div>
    </Router>
  );
}

export default App;
