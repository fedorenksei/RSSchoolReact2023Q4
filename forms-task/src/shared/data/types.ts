export type FormFieldNames =
  | 'name'
  | 'age'
  | 'email'
  | 'password'
  | 'confirmPassword'
  | 'gender'
  | 'acceptTAndC'
  | 'country'
  | 'picture';

export type FormDataRedux = {
  name: string;
  email: string;
  age: number;
  password: string;
  gender: keyof typeof Genders;
  country: string;
  acceptTAndC: boolean;
  picture: string;
};

export type FormDataRecord = {
  data: FormDataRedux;
  source: 'uncontrolled' | 'hook';
};

export enum Genders {
  woman = 'Woman',
  man = 'Man',
  'not-responded' = 'Prefer not to respond',
}
