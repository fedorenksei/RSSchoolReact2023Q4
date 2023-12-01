import { WithErrors } from '@/entities/WithError';
import { formLabels } from '@/shared/data/formsFields';
import { FormFieldNames } from '@/shared/data/types';
import { formSchema } from '@/shared/validation';
import { FormEventHandler, ReactElement, cloneElement, useState } from 'react';
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
      console.log(data);
      const res = await formSchema.validate(data, {
        strict: true,
        abortEarly: false,
      });
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

  const elements: { name: FormFieldNames; elem: ReactElement }[] = [
    {
      name: 'name',
      elem: <input type="text" />,
    },
    {
      name: 'email',
      elem: <input type="text" />,
    },
    {
      name: 'age',
      elem: <input type="number" />,
    },
    {
      name: 'gender',
      elem: (
        <select>
          <option value="">-- Select an option --</option>
          {[
            { value: 'woman', text: 'Woman' },
            { value: 'man', text: 'Man' },
            { value: 'transgender', text: 'Transgender' },
            { value: 'non-binary', text: 'Non-binary/non-conforming' },
            { value: 'not-responded', text: 'Prefer not to respond' },
          ].map(({ value, text }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      ),
    },
    { name: 'password', elem: <input type="password" name="password" /> },
    {
      name: 'confirmPassword',
      elem: <input type="password" name="confirmPassword" />,
    },
    {
      name: 'country',
      elem: (
        <select>
          <option value="">-- Select an option --</option>
          <option value="Armenia">Armenia</option>
          <option value="USA">USA</option>
        </select>
      ),
    },
    { name: 'picture', elem: <input type="file" /> },
    { name: 'acceptTAndC', elem: <input type="checkbox" /> },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {elements.map(({ name, elem }) => (
        <WithErrors
          key={`uncontrolled-form-input-group-${name}`}
          errors={errors?.[name]}
        >
          <label>
            {formLabels[name]}
            {cloneElement(elem, { name })}
          </label>
        </WithErrors>
      ))}

      <input type="submit" value="Submit" />
    </form>
  );
};
