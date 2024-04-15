import { ICart } from '../components/Cart/interface/ICart';

export const calcTotalPrice = (items: ICart[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
