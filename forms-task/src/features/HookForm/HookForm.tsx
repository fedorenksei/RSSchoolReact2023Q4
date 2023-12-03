import { WithErrors } from '@/entities/WithError';
import { formInputsList } from '@/entities/formInputsList';
import { formLabels } from '@/shared/data/formFields';
import { useAppDispatch } from '@/shared/hooks';
import { setFormData } from '@/shared/store/formDataSlice';
import { toBase64 } from '@/shared/utils';
import { FormValues, formSchema } from '@/shared/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { createElement } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export const HookForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema, { abortEarly: false }),
    criteriaMode: 'all',
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    console.log('submit');
    const data = {
      ...formData,
      ...{ picture: await toBase64(formData.picture[0]) },
    };
    dispatch(setFormData({ data, source: 'hook' }));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      {formInputsList.map(({ name, elem }) => (
        <WithErrors
          key={`uncontrolled-form-input-group-${name}`}
          errors={Object.values(errors?.[name]?.types || {}).flat() as string[]}
          fieldName={name}
        >
          <label>
            {formLabels[name]}
            {createElement(elem.type, {
              ...elem.props,
              ...register(name),
            })}
          </label>
        </WithErrors>
      ))}

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};
