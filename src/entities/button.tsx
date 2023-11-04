import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  onClick: () => void;
  disabled?: boolean;
}

export const Button = ({ children, onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      className="grid place-items-center border rounded-md p-1 [&:not(:disabled)]:hover:border-violet-600 disabled:opacity-20"
      disabled={disabled}
    >
      {children}
    </button>
  );
};
