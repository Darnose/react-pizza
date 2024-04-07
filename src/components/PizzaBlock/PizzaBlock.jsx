import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItem, selectCartItem } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import styles from './sass/PizzaBlock.module.scss';

function PizzaBlock({ id, title, price, imageUrl, sizes, types }) {
  const dispatch = useDispatch();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const cartItem = useSelector(selectCartItem(id));
  const typeNames = ['тонкое', 'традиционное'];

  const countPizza = cartItem ? cartItem.count : 0;

  const pushItems = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className={styles.pizza_block_wrapper}>
      <div className={styles.pizza_block}>
        <Link to={`/pizza/${id}`}>
          <img className={styles.pizza_block__image} src={imageUrl} alt="Pizza" />
        </Link>
        <h4 className={styles.pizza_block__title}>{title}</h4>
        <div className={styles.pizza_block__selector}>
          <ul>
            {types.map((typeId) => (
              <li
                key={typeId}
                onClick={() => setActiveType(typeId)}
                className={activeType === typeId ? styles.active : ''}>
                {typeNames[typeId]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => setActiveSize(index)}
                className={activeSize === index ? styles.active : ''}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.pizza_block__bottom}>
          <div className={styles.pizza_block__price}>от {price} ₽</div>
          <button onClick={pushItems} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            {countPizza > 0 && <i>{countPizza}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
