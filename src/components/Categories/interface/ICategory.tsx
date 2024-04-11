export default interface ICategory {
  categoryId: number;
  onChangeCategory: (index: number) => void;
  categories: string[];
}
