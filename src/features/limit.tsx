import React, { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FormFields {
  limit: number;
}

interface Props {
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
}

export const Limit = ({ limit, setLimit }: Props) => {
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
