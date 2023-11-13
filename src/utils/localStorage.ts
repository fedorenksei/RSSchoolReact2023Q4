import { LS_ITEM_NAME } from '../shared/constants';

export const getSearchTermFromLS = () => {
  return localStorage.getItem(LS_ITEM_NAME) || '';
};

export const setSearchTermToLS = (searchTerm: string) => {
  localStorage.setItem(LS_ITEM_NAME, searchTerm);
};
