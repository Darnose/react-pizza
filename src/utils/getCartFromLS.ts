import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const getCart = localStorage.getItem('cart');
  const items = getCart ? JSON.parse(getCart) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
