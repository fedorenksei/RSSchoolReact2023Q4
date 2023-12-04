import { Genders } from '@/shared/data/types';

interface Props {
  label: keyof typeof Genders;
  addStyle?: string;
}

export const Gender = ({ label, addStyle = '' }: Props) => {
  const value = {
    woman: 'woman',
    man: 'man',
    'not-responded': null,
  }[label];
  return <span className={addStyle}>{value}</span>;
};
