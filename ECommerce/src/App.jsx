import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Products from './components/Products';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductDetail from './components/ProductDetail';
import Search from './components/Search';
import Cart from './components/Cart';
import { items } from './components/Data';

const App = () => {
  const [data, setData] = useState([...items])
  const [cart, setCart] = useState([]);
  return (
    <div>
      <Router>
      <Navbar cart={cart} setData={setData}/>
      <Routes>
        <Route path="/" element={<Products cart={cart} setCart={setCart} items={data}/>} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/search/:term' element={<Search />} />
        <Route path='/cart' element={<Cart  cart={cart} setCart={setCart} />} />
      </Routes>
      
      </Router>
    </div>
  )
}

export default App;
