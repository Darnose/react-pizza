import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { Skeleton } from '../components/index';
import styles from '../components/PizzaBlock/sass/PizzaBlock.module.scss';
import { IPizza } from '../components/PizzaBlock/interface/IPizza';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState({} as IPizza);
  const [loading, setLoading] = useState(true);

  const { pizzaId } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://65f55849f54db27bc022f046.mockapi.io/items/${pizzaId}`,
        );
        setPizza(data);
        setLoading(false);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  return (
    <div className="container">
      {loading ? (
        <Skeleton />
      ) : (
        <div className={styles.pizza_block_wrapper}>
          <div className={styles.pizza_block}>
            <img className={styles.pizza_block__image} src={pizza.imageUrl} alt="Pizza" />
            <h2 className={styles.pizza_block__title}>{pizza.title}</h2>
            <h4 className={styles.pizza_block__price}> Цена: {pizza.price} ₽</h4>
            <h4 className={styles.pizza_block__description}>Состав: {pizza.description}.</h4>
            <Link to="/">
              <button className="button button--outline button--add">
                <span>Назад</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullPizza;
