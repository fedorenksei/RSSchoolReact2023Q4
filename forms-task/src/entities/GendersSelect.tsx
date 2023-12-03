import { FormFieldNames, Genders } from '@/shared/data/types';
import { FormValues } from '@/shared/validation';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  name: FormFieldNames;
  register?: UseFormRegister<FormValues>;
};

export const GendersSelect = ({ name, register }: Props) => {
  const options = (
    <>
      <option value="">-- Select an option --</option>
      {(Object.keys(Genders) as (keyof typeof Genders)[]).map((key) => (
        <option key={key} value={key}>
          {Genders[key]}
        </option>
      ))}
    </>
  );

  if (register) {
    return <select {...register(name)}>{options}</select>;
  } else {
    return <select name={name}>{options}</select>;
  }
};
