import React from 'react';

import styles from './sass/Categories.module.scss';
import ICategory from './interface/ICategory';

export const categories = ['Bce', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

const Categories: React.FC<ICategory> = React.memo(({ categoryId, onChangeCategory }) => {
  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={categoryId === index ? styles.active : ''}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
