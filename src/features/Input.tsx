import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const LS_ITEM_NAME = 'userSearchQuery';

interface Props {
  handleSearchTerm: (searchTerm: string) => void;
}

interface FormFields {
  searchTerm: string;
}

export const SearchInput = ({ handleSearchTerm }: Props) => {
  const { register, handleSubmit, setFocus, setValue } = useForm<FormFields>();

  useEffect(() => {
    setFocus('searchTerm');
    const searchTerm = localStorage.getItem(LS_ITEM_NAME);
    if (searchTerm) setValue('searchTerm', searchTerm);
    handleSearchTerm(searchTerm || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<FormFields> = ({ searchTerm }) => {
    const searchTermTrimmed = searchTerm.trim();
    handleSearchTerm(searchTermTrimmed);
    localStorage.setItem(LS_ITEM_NAME, searchTermTrimmed);
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
