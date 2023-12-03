import { Genders } from '@/shared/data/types';

interface Props {
  label: keyof typeof Genders;
}

export const Gender = ({ label }: Props) => {
  const value = {
    woman: 'woman',
    man: 'man',
    'not-responded': null,
  }[label];
  return <span>{value}</span>;
};
