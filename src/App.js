import './App.css';
import React from 'react';
import ShopItemFunc from './components/ShopItemFunc/ShopItemFunc';
import ShopItemClass from './components/ShopItemClass/ShopItemClass';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';

function App() {
  const itemFirst = {
    brand: 'Tiger of Sweden',
    title: 'Leonard coat',
    description: 'Minimalistic coat in cotton-blend',
    descriptionFull: 'Men\'s minimalistic overcoat in cotton-blend. Features a stand-up collar, concealed front closure and single back vent. Slim fit with clean, straight shape. Above-knee length.',
    price: 399,
    currency: '£',
  }
  
  const itemSecond = {
    brand: 'Raincoat from China',
    title: 'John coat',
    description: 'Made poorly, but it will be warm',
    descriptionFull: 'Men\'s minimalistic overcoat in cotton-blend. Features a stand-up collar, concealed front closure and single back vent. Slim fit with clean, straight shape. Above-knee length.',
    price: 1399,
    currency: '£',
  }

  return (
    <BrowserRouter>
      <div className="container">
        <div className="header">
          <NavLink to="/function" className="header__link">Functional component</NavLink>
          <NavLink to="/classes" className="header__link">Class component</NavLink>
        </div>
        <div className="background-element">
        </div>
        <div className="highlight-window">
          <div className='highlight-overlay'></div>
        </div>
        <div className="window">
          <Routes>
            <Route path="/function" element={
              <React.Fragment>
                <ShopItemFunc item={itemFirst} />
              </React.Fragment>
            } />
            <Route path="/classes" element={
              <React.Fragment>
                <ShopItemClass item={itemSecond} />
              </React.Fragment>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
