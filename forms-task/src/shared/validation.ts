import { InferType, boolean, mixed, number, object, string } from 'yup';
import { Genders } from './data/types';

export const formSchema = object({
  name: string()
    .required('Please, enter your name')
    .matches(/^[A-Z].*/, {
      excludeEmptyString: true,
      message: 'Name should start with a capital letter',
    }),
  email: string()
    .required('Please, enter your email')
    .email('You entered an invalid email'),
  age: number()
    .transform((originalValue) => {
      const parsedValue = parseInt(originalValue, 10);
      if (isNaN(parsedValue) || originalValue === '') {
        return null;
      }
      return parsedValue;
    })
    .nullable()
    .required('Please, enter your age')
    .min(0, "You might be kidding, your age can't be a negative number!"),
  gender: string()
    .transform((v) => (v === '' ? undefined : v))
    .required('Please, pick an option (or decide not to choose)')
    .oneOf(Object.keys(Genders) as Array<'woman' | 'man' | 'not-responded'>),
  password: string()
    .required('Please, enter a password')
    .matches(/\d/, {
      excludeEmptyString: true,
      message: 'The password should contain at least one number',
    })
    .matches(/[A-Z]/, {
      excludeEmptyString: true,
      message: 'The password should contain at least one uppercase letter',
    })
    .matches(/[a-z]/, {
      excludeEmptyString: true,
      message: 'The password should contain at least one lowercase letter',
    })
    .matches(/[!?@#$%^&*]/, {
      excludeEmptyString: true,
      message:
        'The password should contain at least one special character from: !?@#$%^&*',
    }),
  confirmPassword: string()
    .required('Please, confirm the entered password')
    .test('passwords-match', 'Passwords must match', function (value) {
      return !value || this.parent.password === value;
    }),
  picture: mixed<FileList | File[]>()
    .transform((obj) => {
      if (obj instanceof File) {
        return [obj];
      } else return obj;
    })
    .test(
      'required',
      'Please, upload your picture',
      (fileList) =>
        fileList &&
        fileList.length > 0 &&
        fileList[0] instanceof File &&
        fileList[0].size > 0
    )
    .test(
      'has-size',
      'Not a valid image size, choose a file no bigger than a 1 MB',
      (fileList) => {
        if (!fileList || fileList.length === 0) return true;
        const fileObj = fileList[0];
        const bits = fileObj?.size || 0;
        return bits === 0 || (bits > 0 && bits < 1000000);
      }
    )
    .test(
      'has-valid-type',
      'Not a valid image type, choose a .jpg or .png file',
      (fileList) => {
        if (!fileList || fileList.length === 0) return true;
        const fileObj = fileList[0];
        const extension = fileObj?.name?.toLowerCase().split('.').pop();
        const bits = fileObj?.size || 0;
        return bits === 0 || ['jpg', 'png'].includes(extension || '');
      }
    )
    .required('Please, upload your picture'),
  country: string().required('Please, select your country'),
  acceptTAndC: boolean()
    .transform((v) => !!v)
    .isTrue('Please, accept our policy to move further')
    .required('Please, accept our policy to move further'),
});

export type FormValues = InferType<typeof formSchema>;
