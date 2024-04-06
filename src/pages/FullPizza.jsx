import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Skeleton from '../components/PizzaBlock/Skeleton';

const FullPizza = () => {
  const [pizza, setPizza] = useState({});
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
        <div className="pizza-block-wrapper">
          <div className="pizza-block">
            <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
            <h2 className="pizza-block__title">{pizza.title}</h2>
            <h4 className="pizza-block__price"> Цена: {pizza.price} ₽</h4>
            <h4 className="pizza-block__description">Состав: {pizza.description}.</h4>
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
