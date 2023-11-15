import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchContext } from '../app/store/context';

interface FormFields {
  searchTerm: string;
}

export const SearchInput = () => {
  const {
    apiRequestParams: { searchTerm, setSearchTerm },
  } = useSearchContext();
  const { register, handleSubmit, setFocus } = useForm<FormFields>({
    defaultValues: { searchTerm },
  });

  useEffect(() => {
    setFocus('searchTerm');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<FormFields> = ({ searchTerm }) => {
    const searchTermTrimmed = searchTerm.trim();
    setSearchTerm(searchTermTrimmed);
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
