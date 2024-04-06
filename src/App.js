import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import Layout from './layout/Layout';

import './scss/app.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="pizza/:pizzaId" element={<FullPizza />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
