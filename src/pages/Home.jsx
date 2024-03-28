import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { sortList } from '../components/Sort';

const Home = () => {
  const categories = ['Bce', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sortType, currentPage } = useSelector((state) => state.filterSlice);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchValue } = useContext(SearchContext);

  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  const onChangePage = (index) => {
    dispatch(setCurrentPage(index));
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    const category = categoryId > 0 ? `category=${categoryId}&` : '';

    axios
      .get(
        `https://65f55849f54db27bc022f046.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortType.sortBy}&order=${sortType.order}&search=${searchValue}`,
      )
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isMounted.current) {
      const QueryString = qs.stringify({
        sortBy: sortType.sortBy,
        categoryId,
        currentPage,
        order: sortType.order,
        name: sortType.name,
      });
      navigate(`?${QueryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage, navigate]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.name === params.name);

      dispatch(setFilters({ ...params, sort }));

      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
          categories={categories}
        />
        <Sort />
      </div>
      <h2 className="content__title">{categories[categoryId]} пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          : data.map((data) => <PizzaBlock key={data.id} {...data} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
