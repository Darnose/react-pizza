import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    fetch(`https://65f55849f54db27bc022f046.mockapi.io/items?category=${categoryId}`)
      .then((res) => res.json())
      .then((arr) => {
        setData(arr);
        setIsLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={setCategoryId} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : data.map((data) => <PizzaBlock key={data.id} {...data} />)}
      </div>
    </div>
  );
};

export default Home;
