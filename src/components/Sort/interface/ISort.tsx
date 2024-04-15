export interface ISort {
  name: string;
  sortBy: SortByEnum;
  order: 'asc' | 'desc';
}

export enum SortByEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export interface IFilterSlice {
  searchValue?: string;
  categoryId: number;
  currentPage: number;
  sortType: ISort;
}
