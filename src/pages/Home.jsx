import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = ({ searchValue }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности(по возрастанию)',
    sortBy: 'rating',
    order: 'asc',
  });

  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}&` : '';
    const sort = sortType.sortBy;

    fetch(
      `https://65f55849f54db27bc022f046.mockapi.io/items?${category}&sortBy=${sort}&order=${sortType.order}&search=${searchValue}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setData(arr);
        setIsLoading(false);
      });
  }, [categoryId, sortType, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} setCategoryId={setCategoryId} categories={categories} />
        <Sort sortType={sortType} setSortType={setSortType} />
      </div>
      <h2 className="content__title">{categories[categoryId]} пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : data.map((data) => <PizzaBlock key={data.id} {...data} />)}
      </div>
    </div>
  );
};

export default Home;
