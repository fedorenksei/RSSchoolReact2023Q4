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
      {(errors || prevErrors.current)?.map((err) => (
        <div
          key={err}
          className={`grid transition-all overflow-hidden ${
            !(err in prevErrors) ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="min-h-0 text-red-400">
            <p>{err}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
