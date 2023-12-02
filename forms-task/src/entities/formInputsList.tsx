import { FormFieldNames } from '@/shared/data/types';
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
