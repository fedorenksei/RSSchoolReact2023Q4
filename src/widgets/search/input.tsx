import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const LS_ITEM_NAME = 'userSearchQuery';

interface Props {
  handleQuery: (query: string) => void;
}

interface FormFields {
  query: string;
}

export const SearchInput = ({ handleQuery }: Props) => {
  const { register, handleSubmit, setFocus, setValue } = useForm<FormFields>();

  useEffect(() => {
    setFocus('query');
    const query = localStorage.getItem(LS_ITEM_NAME);
    if (query) setValue('query', query);
    handleQuery(query || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<FormFields> = ({ query }) => {
    const queryTrimmed = query.trim();
    handleQuery(queryTrimmed);
    localStorage.setItem(LS_ITEM_NAME, queryTrimmed);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap items-center gap-3"
    >
      <input
        className="border p-2 px-4 rounded-full hover:border-violet-700"
        {...register('query')}
      />
      <button type="submit" className="hover:text-green-600 transition">
        Go!
      </button>
    </form>
  );
};
