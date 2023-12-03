import { PropsWithChildren } from 'react';

export const Label = ({ children }: PropsWithChildren) => {
  return (
    <label className="flex flex-wrap gap-1 justify-between items-center">
      {children}
    </label>
  );
};
