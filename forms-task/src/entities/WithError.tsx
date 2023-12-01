import { PropsWithChildren, useEffect, useRef } from 'react';

export const WithErrors = ({
  errors,
  children,
}: { errors: string[] | undefined } & PropsWithChildren) => {
  const prevErrors = useRef<string[] | undefined>();
  useEffect(() => {
    prevErrors.current = errors;
  }, [errors]);
  return (
    <div>
      {children}
      <div
        className={`grid transition-all overflow-hidden ${
          errors ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 text-red-400">
          {(errors || prevErrors.current)?.map((err) => <p key={err}>{err}</p>)}
        </div>
      </div>
    </div>
  );
};
