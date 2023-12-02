import { WithErrors } from '@/entities/WithError';
import { formInputsList } from '@/entities/formInputsList';
import { formLabels } from '@/shared/data/formFields';
import { FormFieldNames } from '@/shared/data/types';
import { formSchema } from '@/shared/validation';
import { FormEventHandler, createElement, useState } from 'react';
import { ValidationError } from 'yup';

export const UncontrolledForm = () => {
  const [errors, setErrors] = useState<Record<FormFieldNames, string[]> | null>(
    null
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData((e.target as HTMLFormElement) || undefined)
    );
    try {
      const res = await formSchema.validate(data, {
        strict: true,
        abortEarly: false,
      });
      setErrors(null);
      console.log(res);
    } catch (err) {
      if (!(err instanceof ValidationError)) return;
      const validationErrors: Record<string, string[]> = {};
      err.inner.forEach((error) => {
        if (error.path !== undefined) {
          validationErrors[error.path] = (
            validationErrors[error.path] || []
          ).concat(error.errors);
        }
      });
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {formInputsList.map(({ name, elem }) => (
        <WithErrors
          key={`uncontrolled-form-input-group-${name}`}
          errors={errors?.[name] || []}
          fieldName={name}
        >
          <label>
            {formLabels[name]}
            {createElement(elem.type, { ...elem.props, name })}
          </label>
        </WithErrors>
      ))}

      <input type="submit" value="Submit" />
    </form>
  );
};
