import React from 'react';
import Addproduct from './Product/Addproduct';
import Productlist from './Product/Productlist';
import Deleteproduct from './Product/Deleteproduct';
import Addbid from './Product/Addbid';
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
              <li className="nav-item">
                <Link to={'/Deleteproduct'} className="nav-link">Delete Product</Link>
              </li>
              <li className="nav-item">
                <Link to={'/AddBid'} className="nav-link">AddBid</Link>
              </li>
            </ul>
          </div>
        </nav> <br />
        <Routes>
          <Route exact path='/Addproduct' element={<Addproduct />} />
          <Route path='/ProductList' element={<Productlist />} />
          <Route path='/AddBid' element={<Addbid />} />
          <Route path='/Deleteproduct' element={<Deleteproduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;  
