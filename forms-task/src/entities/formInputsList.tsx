import { FormFieldNames } from '@/shared/data/types';
import { ReactElement } from 'react';
import { GendersSelect } from './GendersSelect';
import { CountriesSelect } from './CountriesSelect';

export const formInputsList: { name: FormFieldNames; elem: ReactElement }[] = [
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
    elem: <GendersSelect name="gender" />,
  },
  { name: 'password', elem: <input type="password" name="password" /> },
  {
    name: 'confirmPassword',
    elem: <input type="password" name="confirmPassword" />,
  },
  {
    name: 'country',
    elem: <CountriesSelect name="country" />,
  },
  { name: 'picture', elem: <input type="file" /> },
  { name: 'acceptTAndC', elem: <input type="checkbox" /> },
];
