import { FormFieldNames, Genders } from '@/shared/data/types';
import { ReactElement } from 'react';

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
    elem: (
      <select>
        <option value="">-- Select an option --</option>
        {(Object.keys(Genders) as (keyof typeof Genders)[]).map((key) => (
          <option key={key} value={key}>
            {Genders[key]}
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
