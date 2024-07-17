import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Landing from './assetts/pages/Landing';

function App() {
  return (
    <Router>
    <div className="App">      
      <Nav />
      <div className='components'>
      <Sidebar />
      <Routes>
        <Route path='/' key="_index"  element={<Landing /> }/>
      </Routes>
      </div>
      
    </div>
    </Router>
  );
}

export default App;
