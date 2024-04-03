import React, { useContext, useEffect, useRef } from 'react';
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
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const categories = ['Bce', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sortType, currentPage } = useSelector((state) => state.filterSlice);
  const { data, status } = useSelector((state) => state.pizzaSlice);
  const { searchValue } = useContext(SearchContext);

  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  const onChangePage = (index) => {
    dispatch(setCurrentPage(index));
  };

  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}&` : '';

    dispatch(fetchPizzas({ category, currentPage, sortType, searchValue }));
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
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);
  const pizzas = data.map((data) => <PizzaBlock key={data.id} {...data} />);

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
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
