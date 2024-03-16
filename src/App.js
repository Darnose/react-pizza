import React, { useEffect, useState } from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import './scss/app.scss';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://65f55849f54db27bc022f046.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => {
        setData(arr);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {data.map((data) => (
              <PizzaBlock key={data.id} {...data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
