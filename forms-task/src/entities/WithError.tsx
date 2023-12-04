import { Collapsible } from '@/shared/ui-kit/Collapsible';
import clsx from 'clsx';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

interface Props extends PropsWithChildren {
  errors: string[];
  fieldName: string;
}

export const WithErrors = ({ errors, children, fieldName }: Props) => {
  const prevErrors = useRef<string[]>([]);
  const [isPasswordDirty, setIsPasswordDirty] = useState(false);

  useEffect(() => {
    prevErrors.current = errors;
    if (errors.length) setIsPasswordDirty(true);
  }, [errors]);

  const allErrors = Array.from(new Set(errors.concat(prevErrors.current)));

  const passwordWeakness = errors.filter(
    (err) => err.indexOf('enter') === -1
  ).length;

  return (
    <div>
      {children}
      {fieldName === 'password' &&
        errors.length === passwordWeakness &&
        isPasswordDirty && (
          <p
            className={clsx(
              {
                1: 'text-yellow-500',
                2: 'text-amber-600',
                3: 'text-orange-600',
                0: 'text-green-600',
              }[passwordWeakness]
            )}
          >
            Your password strength is {4 - passwordWeakness} of 4
          </p>
        )}
      <div className="text-red-400">
        <Collapsible isOpen={allErrors.length > 0}>
          {allErrors.map((err) => (
            <Collapsible
              key={`${fieldName}-${err}`}
              isOpen={errors.includes(err)}
            >
              <p>{err}</p>
            </Collapsible>
          ))}
        </Collapsible>
      </div>
    </div>
  );
};
