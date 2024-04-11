export default interface IPagination {
  currentPage: number;
  onChangePage: (page: number) => void;
}
