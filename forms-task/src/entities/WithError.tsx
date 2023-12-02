import { Collapsible } from '@/shared/ui-kit/Collapsible';
import { PropsWithChildren, useEffect, useRef } from 'react';

interface Props extends PropsWithChildren {
  errors: string[];
  fieldName: string;
}

export const WithErrors = ({ errors, children, fieldName }: Props) => {
  const prevErrors = useRef<string[]>([]);

  useEffect(() => {
    prevErrors.current = errors;
  }, [errors]);

  const allErrors = Array.from(new Set(errors.concat(prevErrors.current)));

  return (
    <div>
      {children}
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
