import React from 'react';  
import Addproduct from './Product/Addproduct';  
// import Studentlist from './Product/Studentlist'; 
import ProductList from './Product/ProductList';
// import EditStudent from './Product/Editstudent';  
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';  
import './App.css';  
function App() {  
  return (  
    <Router>  
      <div className="container">  
        <nav className="navbar navbar-expand-lg navheader">  
          <div className="collapse navbar-collapse" >  
            <ul className="navbar-nav mr-auto">  
              <li className="nav-item">  
                <Link to={'/Addproduct'} className="nav-link">Addproduct</Link>  
              </li>  
              <li className="nav-item">  
                <Link to={'/ProductList'} className="nav-link">Product List</Link>  
              </li>  
            </ul>  
          </div>  
        </nav> <br />  
        <Routes>  
          <Route exact path='/Addproduct' element={<Addproduct/>} />    
          <Route path='/ProductList' element={<ProductList/>} />  
        </Routes>  
      </div>  
    </Router>  
  );  
}  

export default App;  
