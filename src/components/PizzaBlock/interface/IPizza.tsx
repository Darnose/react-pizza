export interface IPizza {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  description?: string;
}

export interface IPizzaSlice {
  data: IPizza[];
  status: Status;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}
