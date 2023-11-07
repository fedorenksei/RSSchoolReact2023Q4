const LS_ITEM_NAME = 'userSearchQuery';

export const getSearchTermFromLS = () => {
  return localStorage.getItem(LS_ITEM_NAME) || '';
};

export const setSearchTermToLS = (searchTerm: string) => {
  localStorage.setItem(LS_ITEM_NAME, searchTerm);
};
