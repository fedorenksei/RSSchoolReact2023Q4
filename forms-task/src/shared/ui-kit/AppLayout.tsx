import { PropsWithChildren } from 'react';

export const AppLayout = ({ children }: PropsWithChildren) => {
  return <div className="min-h-full p-10">{children}</div>;
};
