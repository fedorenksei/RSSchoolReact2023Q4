import { FormDataRecord } from '@/shared/data/types';
import { Gender } from './ui/Gender';

interface Props {
  record: FormDataRecord;
}

export const FormDataTile = ({
  record: {
    source,
    data: { name, age, gender, email, picture, password, country },
  },
}: Props) => {
  return (
    <div>
      <p>{name}</p>
      <p>
        {age} y.o., <Gender label={gender} />
      </p>
      <p>from {country}</p>
      <p>email: {email}</p>
      <p>password: {password}</p>
      <img src={picture} className="max-h-52 max-w-full object-contain" />
      <p>submitted via the {source} form</p>
    </div>
  );
};
