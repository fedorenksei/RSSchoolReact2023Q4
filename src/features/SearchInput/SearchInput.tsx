import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { setSearchTermToLS } from '../../shared/external/localStorage';
import { usePage } from '../Pagination/hook';
import { setSearchTerm } from './search-term-slice';

interface FormFields {
  searchTerm: string;
}

export const SearchInput = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.searchTerm.value);
  const { register, handleSubmit, setFocus } = useForm<FormFields>({
    defaultValues: { searchTerm },
  });
  const [, setPage] = usePage();

  useEffect(() => {
    setFocus('searchTerm');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<FormFields> = ({ searchTerm }) => {
    const searchTermTrimmed = searchTerm.trim();
    dispatch(setSearchTerm(searchTermTrimmed));
    // TODO: get it out to a Redux thunk (?)
    setPage(1);
    setSearchTermToLS(searchTermTrimmed);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap items-center gap-3"
      autoComplete="off"
    >
      <input
        className="border p-2 px-4 rounded-full hover:border-violet-700"
        {...register('searchTerm')}
      />
      <button type="submit" className="hover:text-green-600 transition">
        Go!
      </button>
    </form>
  );
};
