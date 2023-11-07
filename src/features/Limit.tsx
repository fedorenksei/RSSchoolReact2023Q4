import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSearchContext } from '../shared/hooks';

interface FormFields {
  limit: number;
}

export const Limit = () => {
  const {
    apiRequestParams: { limit, setLimit },
  } = useSearchContext();

  const { register, handleSubmit } = useForm<FormFields>({
    mode: 'onChange',
    defaultValues: { limit },
  });

  const onSubmit: SubmitHandler<FormFields> = ({ limit }) => setLimit(limit);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="flex gap-1">
        <p>Items per page:</p>
        <input
          type="number"
          min={1}
          max={100}
          {...register('limit')}
          className="border rounded-sm"
        />
      </label>
    </form>
  );
};
