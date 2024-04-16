import React, { useCallback, useEffect, useRef } from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/slice';
import { selectFilter } from '../redux/slices/filter/selectors';
import {
  PizzaBlock,
  Skeleton,
  Pagination,
  Categories,
  categories,
  Sort,
  sortList,
} from '../components/index';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';
import { selectPizzas } from '../redux/slices/pizza/selectors';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sortType, currentPage, searchValue } = useSelector(selectFilter);
  const { data, status } = useSelector(selectPizzas);

  const onChangeCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  const onChangePage = useCallback((index: number) => {
    dispatch(setCurrentPage(index));
  }, []);

  const getPizzas = () => {
    dispatch(fetchPizzas({ categoryId, currentPage, sortType, searchValue }));
  };

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const QueryString = qs.stringify({
  //       sortBy: sortType.sortBy,
  //       categoryId,
  //       currentPage,
  //       order: sortType.order,
  //       name: sortType.name,
  //     });
  //     navigate(`?${QueryString}`);
  //   }

  //   isMounted.current = true;
  // }, [categoryId, sortType, searchValue, currentPage, navigate]);

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const sort = sortList.find((obj) => obj.name === params.name);

  //     dispatch(setFilters({ ...params, sort }));

  //     isSearch.current = true;
  //   }
  // }, []);

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
        <Categories categoryId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">{categories[categoryId]} пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
