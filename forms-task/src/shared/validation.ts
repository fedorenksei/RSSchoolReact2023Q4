import { mixed, object, string } from 'yup';

export const formSchema = object({
  name: string()
    .required('Please, enter your name')
    .matches(/^[A-Z].*/, 'Name should start with a capital letter'),
  email: string()
    .required('Please, enter your email')
    .email('You entered an invalid email'),
  age: string()
    .required('Please, enter your age')
    .min(0, "You might be kidding, your age can't be a negative number!"),
  gender: string().required('Please, pick an option (or decide not to choose)'),
  password: string()
    .required('Please, enter a password')
    .matches(/\d/, 'The password should contain at least one number')
    .matches(
      /[A-Z]/,
      'The password should contain at least one uppercase letter'
    )
    .matches(
      /[a-z]/,
      'The password should contain at least one lowercase letter'
    )
    .matches(
      /[!?@#$%^&*]/,
      'The password should contain at least one special character from: !?@#$%^&*'
    ),
  confirmPassword: string()
    .required('Please, confirm the entered password')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value;
    }),
  picture: mixed<{ size: number; name: string }>()
    .test(
      'has-size',
      'Please, upload your picture',
      (fileObj) => (fileObj?.size || 0) > 0
    )
    .test('has-valid-type', 'Not a valid image type', (fileObj) =>
      ['jpg', 'png'].includes(
        fileObj?.name.toLowerCase().split('.').pop() || ''
      )
    )

    .required('Please, upload your picture'),
  country: string().required('Please, select your country'),
  acceptTAndC: string().required('Please, accept our policy to move further'),
});
