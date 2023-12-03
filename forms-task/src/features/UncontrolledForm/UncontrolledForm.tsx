import { WithErrors } from '@/entities/WithError';
import { formInputsList } from '@/entities/formInputsList';
import { formLabels } from '@/shared/data/formFields';
import { FormFieldNames } from '@/shared/data/types';
import { useAppDispatch } from '@/shared/hooks';
import { setFormData } from '@/shared/store/formDataSlice';
import { Label } from '@/shared/ui-kit/Label';
import { toBase64 } from '@/shared/utils';
import { formSchema } from '@/shared/validation';
import { FormEventHandler, createElement, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';

export const UncontrolledForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isWaitingForFix, setIsWaitingForFix] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<FormFieldNames, string[]> | null>(
    null
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const dataFromHTML = Object.fromEntries(
      new FormData((e.target as HTMLFormElement) || undefined)
    );
    try {
      const dataFromYup = await formSchema.validate(dataFromHTML, {
        abortEarly: false,
      });
      setErrors(null);
      const data = {
        ...dataFromYup,
        ...{ picture: await toBase64(dataFromYup.picture[0]) },
      };
      dispatch(setFormData({ data, source: 'hook' }));
      setIsWaitingForFix(false);
      navigate('/');
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
      setIsWaitingForFix(true);
      setIsSubmitDisabled(true);
    }
  };

  const handleChange: FormEventHandler<HTMLFormElement> = async () => {
    if (!isWaitingForFix) return;
    const dataFromHTML = Object.fromEntries(
      new FormData(formRef.current || undefined)
    );
    try {
      await formSchema.validate(dataFromHTML, {
        abortEarly: false,
      });
      setIsSubmitDisabled(false);
    } catch (err) {
      setIsSubmitDisabled(true);
    }
  };

  return (
    <form
      ref={formRef}
      onChange={handleChange}
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
    >
      {formInputsList.map(({ name, elem }) => (
        <WithErrors
          key={`uncontrolled-form-input-group-${name}`}
          errors={errors?.[name] || []}
          fieldName={name}
        >
          <Label>
            {formLabels[name]}
            {createElement(elem.type, { ...elem.props, name })}
          </Label>
        </WithErrors>
      ))}

      <button type="submit" disabled={isSubmitDisabled}>
        Submit
      </button>
    </form>
  );
};
