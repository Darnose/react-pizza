import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import NotFound from './pages/NotFound';
import { Loader } from './components/Loader/Loader';

import './styles/app.scss';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path=""
          element={
            <Suspense fallback={<Loader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="pizza/:pizzaId"
          element={
            <Suspense fallback={<Loader />}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<Loader />}>
              <Cart />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
