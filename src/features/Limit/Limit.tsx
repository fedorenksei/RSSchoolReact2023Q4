import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import { setLimit } from './limit-slice';
import { usePage } from '../../shared/hooks';

interface FormFields {
  limit: number;
}

export const Limit = () => {
  const limit = useSelector((state: RootState) => state.limit.value);
  const dispatch = useDispatch();
  const [, setPage] = usePage();

  const { register, handleSubmit } = useForm<FormFields>({
    mode: 'onChange',
    defaultValues: { limit },
  });

  const onSubmit: SubmitHandler<FormFields> = ({ limit }) => {
    dispatch(setLimit(limit));
    // TODO: get it out to a Redux thunk (?)
    setPage(1);
  };

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
      <input className="hidden" type="submit" />
    </form>
  );
};
