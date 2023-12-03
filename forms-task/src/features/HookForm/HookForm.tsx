import { WithErrors } from '@/entities/WithError';
import { formInputsList } from '@/entities/formInputsList';
import { formLabels } from '@/shared/data/formFields';
import { formSchema } from '@/shared/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { createElement } from 'react';
import { useForm } from 'react-hook-form';

export const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(formSchema, { abortEarly: false }),
    criteriaMode: 'all',
  });

  const onSubmit = () => {};

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

      <input type="submit" value="Submit" />
    </form>
  );
};
