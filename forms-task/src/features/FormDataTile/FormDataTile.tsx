import { FormDataRecord, FormFieldNames } from '@/shared/data/types';
import { Gender } from './ui/Gender';

interface Props {
  record: FormDataRecord;
  newFields: FormFieldNames[];
}

export const FormDataTile = ({
  record: {
    source,
    data: { name, age, gender, email, picture, password, country },
  },
  newFields,
}: Props) => {
  const freshStyle = 'text-emerald-600';
  const getStyle = (name: FormFieldNames) =>
    newFields.includes(name) ? freshStyle : '';

  return (
    <div>
      <p className={getStyle('name')}>{name}</p>
      <p>
        <span className={getStyle('age')}>{age}</span>y.o.,{' '}
        <Gender label={gender} addStyle={getStyle('age')} />
      </p>
      <p className={getStyle('country')}>from {country}</p>
      <p className={getStyle('email')}>email: {email}</p>
      <p className={getStyle('password')}>password: {password}</p>
      <img src={picture} className="max-h-52 max-w-full object-contain" />
      <p>submitted via the {source} form</p>
    </div>
  );
};
