export interface ICart {
  id: string;
  title: string;
  price: number;
  type: string;
  size: number;
  imageUrl: string;
  count: number;
}

export interface ICartSlice {
  totalPrice: number;
  items: ICart[];
}
