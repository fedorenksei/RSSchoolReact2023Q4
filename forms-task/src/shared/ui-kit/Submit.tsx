import clsx from 'clsx';

export const Submit = ({ disabled }: { disabled: boolean }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={clsx(
        'p-2 self-center bg-slate-50 transition-colors rounded-sm',
        disabled ? 'text-slate-500' : 'cursor-pointer hover:bg-green-100'
      )}
    >
      Submit
    </button>
  );
};
