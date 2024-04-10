export default interface IPizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  description?: string;
}
