import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectSort, setSortType } from '../../redux/slices/filterSlice';
import styles from './sass/Sort.module.scss';
import ISort from './interface/ISort';

export const sortList: ISort[] = [
  { name: 'популярности(по возрастанию)', sortBy: 'rating', order: 'asc' },
  { name: 'популярности(по убыванию)', sortBy: 'rating', order: 'desc' },
  { name: 'цене(от дешевых)', sortBy: 'price', order: 'asc' },
  { name: 'цене(от дорогих)', sortBy: 'price', order: 'desc' },
  { name: 'алфавиту(А - Я)', sortBy: 'title', order: 'asc' },
  { name: 'алфавиту(Я - А)', sortBy: 'title', order: 'desc' },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sortType = useSelector(selectSort);
  const sortRef = useRef<HTMLDivElement>(null);

  const [popup, setPopup] = useState(false);

  const handlePopup = (obj: ISort) => {
    dispatch(setSortType(obj));
    setPopup(false);
  };

  useEffect(() => {
    const handleClickOut = (e: MouseEvent) => {
      if (!e.composedPath().includes(sortRef.current!)) {
        setPopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOut);

    return () => document.body.removeEventListener('click', handleClickOut);
  }, []);

  return (
    <div ref={sortRef} className={styles.sort}>
      <div className={styles.sort__label}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setPopup(!popup)}>{sortType.name}</span>
      </div>
      {popup && (
        <div className={styles.sort__popup}>
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={index}
                onClick={() => handlePopup(obj)}
                className={sortType.name === obj.name ? styles.active : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
