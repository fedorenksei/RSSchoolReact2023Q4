import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { usePage } from '../../features/Pagination/hook';
import { useSearchProductsQuery } from '../../shared/external/rtk-query';
import { setData, setIsError, setIsLoading, setTotal } from './search-slice';

export const useSearchResults = () => {
  const dispatch = useDispatch();
  const [page] = usePage();
  const searchTerm = useSelector((state: RootState) => state.searchTerm.value);
  const limit = useSelector((state: RootState) => state.limit.value);
  const { data, refetch, isLoading, isFetching, isError } =
    useSearchProductsQuery({ searchTerm, limit, page });

  useEffect(() => {
    refetch();
  }, [searchTerm, page, limit, refetch]);

  useEffect(() => {
    dispatch(setData(data?.results || []));
    dispatch(setTotal(data?.total || 0));
  }, [data, dispatch]);

  useEffect(() => {
    dispatch(setIsLoading(isLoading || isFetching));
  }, [isLoading, isFetching, dispatch]);

  useEffect(() => {
    dispatch(setIsError(isError));
  }, [isError, dispatch]);
};
