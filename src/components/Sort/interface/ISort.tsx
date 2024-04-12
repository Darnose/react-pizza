export default interface ISort {
  name: string;
  sortBy: 'rating' | 'price' | 'title';
  order: 'asc' | 'desc';
}

export interface IFilterSlice {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortType: ISort;
}
