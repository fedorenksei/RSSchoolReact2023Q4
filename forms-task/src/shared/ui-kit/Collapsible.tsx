import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  isOpen: boolean;
}

export const Collapsible = ({ children, isOpen }: Props) => {
  return (
    <div
      className={`grid transition-all overflow-hidden ${
        isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
      }`}
    >
      <div className="min-h-0">{children}</div>
    </div>
  );
};
