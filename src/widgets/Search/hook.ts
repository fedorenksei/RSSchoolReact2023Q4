import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { usePage } from '../../features/Pagination/hook';
import { useSearchProductsQuery } from '../../shared/external/rtk-query';
import { setIsError, setIsLoading } from './search-slice';

export const useSearchResults = () => {
  const dispatch = useDispatch();
  const [page] = usePage();
  const searchTerm = useSelector((state: RootState) => state.searchTerm.value);
  const limit = useSelector((state: RootState) => state.limit.value);
  const { data, isFetching, isError } = useSearchProductsQuery({
    searchTerm,
    limit,
    page,
  });

  useEffect(() => {
    dispatch(setIsLoading(isFetching));
  }, [isFetching, dispatch]);

  useEffect(() => {
    dispatch(setIsError(isError));
  }, [isError, dispatch]);

  return { data };
};
