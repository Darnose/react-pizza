import React from 'react';

export default interface ICategory {
  categoryId: number;
  onChangeCategory: React.MouseEventHandler;
  categories: string[];
}
