export default interface IPizza {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: [size: number];
  types: [type: number];
  description?: string;
}
