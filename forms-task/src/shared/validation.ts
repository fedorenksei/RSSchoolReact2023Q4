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
  picture: mixed<{ size: number; name: string }[]>()
    .test(
      'has-size',
      'Not a valid image size, choose a file no bigger than a 1 MB',
      (fileObj) => {
        const bits = fileObj?.[0]?.size || 0;
        return bits > 0 && bits < 1000000;
      }
    )
    .test(
      'has-valid-type',
      'Not a valid image type, choose a .jpg or .png file',
      (fileObj) => {
        const extension = fileObj?.[0]?.name?.toLowerCase().split('.').pop();
        return ['jpg', 'png'].includes(extension || '');
      }
    )
    .required('Please, upload your picture'),
  country: string().required('Please, select your country'),
  acceptTAndC: string().required('Please, accept our policy to move further'),
});
