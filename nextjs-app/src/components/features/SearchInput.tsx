import { getQueryParams, getStringQueryParam } from '@/shared/utils';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormFields {
  searchTerm: string;
}

export const SearchInput = () => {
  const router = useRouter();
  const { register, handleSubmit, setFocus } = useForm<FormFields>({
    defaultValues: {
      searchTerm: getStringQueryParam('searchTerm', router) || '',
    },
  });

  useEffect(() => {
    setFocus('searchTerm');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit: SubmitHandler<FormFields> = ({ searchTerm }) => {
    const searchTermTrimmed = searchTerm.trim();
    const params = new URLSearchParams(getQueryParams(router));
    searchTermTrimmed
      ? params.set('searchTerm', searchTermTrimmed)
      : params.delete('searchTerm');
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  return (
    <form
      onClick={(e) => e.stopPropagation()}
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
