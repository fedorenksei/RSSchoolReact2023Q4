import { FormFieldNames } from '@/shared/data/types';
import { useAppSelector } from '@/shared/hooks';
import { Collapsible } from '@/shared/ui-kit/Collapsible';
import { FormValues } from '@/shared/validation';
import clsx from 'clsx';
import {
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UseFormRegister } from 'react-hook-form';

const Option = ({
  onClick,
  children,
}: PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <div
      onClick={onClick}
      role="presentation"
      className={clsx(
        'p-1 cursor-pointer transition',
        'bg-slate-50 hover:bg-slate-100',
        'border border-t-0 box-border'
      )}
    >
      {children}
    </div>
  );
};

type Props = {
  name: FormFieldNames;
  register?: UseFormRegister<FormValues>;
};

export const CountriesSelect = (props: Props) => {
  const countriesList = useAppSelector((state) => state.countriesList.value);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleCountryChoice = (country: string) => {
    if (!inputRef.current) return;
    inputRef.current.value = country;
    setIsOpen(false);
  };

  const updateCountryList = useCallback(() => {
    setFilteredCountries(
      countriesList
        .filter((country) =>
          inputRef.current
            ? country.indexOf(inputRef.current?.value) > -1
            : true
        )
        .slice(0, 11)
    );
  }, [countriesList]);

  useEffect(() => {
    updateCountryList();
  }, [updateCountryList]);

  let input: ReactElement;
  if (props.register) {
    const { ref, ...rest } = props.register(props.name, {
      onChange: updateCountryList,
    });
    input = (
      <input
        className={clsx(
          'p-1 cursor-pointer transition hover:bg-slate-100',
          'border rounded-tr-md rounded-tl-md',
          !isOpen && 'rounded-br-md rounded-bl-md'
        )}
        onClick={() => setIsOpen((s) => !s)}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
    );
  } else {
    input = (
      <input
        ref={inputRef}
        onClick={() => setIsOpen((s) => !s)}
        onChange={updateCountryList}
        name={props.name}
        className={clsx(
          'p-1 cursor-pointer transition hover:bg-slate-100',
          'border rounded-tr-md rounded-tl-md',
          !isOpen && 'rounded-br-md rounded-bl-md'
        )}
      />
    );
  }

  return (
    <span className="relative">
      {input}
      <div className="absolute w-full top-full left-0 z-40">
        <Collapsible isOpen={isOpen}>
          {filteredCountries.map((country) => (
            <Option key={country} onClick={() => handleCountryChoice(country)}>
              {country}
            </Option>
          ))}
        </Collapsible>
      </div>
    </span>
  );
};
