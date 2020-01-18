import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - 8 chars minimum')
    .required('Password is required')
});

export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  login: Yup.string()
    .min(2, 'Login too short - 2 chars minimum')
    .required('Login is required'),
  password: Yup.string()
    .min(8, 'Password is too short - 8 chars minimum')
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,25}$/,
      'Password must contain at least 1 number'
    ),
  name: Yup.string()
    .min(2, 'Name too short - 2 chars minimum')
    .required('Name is required'),
  lastName: Yup.string()
    .min(2, 'Last name too short - 2 chars minimum')
    .required('Last name is required'),
  address: Yup.string()
    .min(2, 'Address too short - 2 chars minimum')
    .required('Address is required'),
  city: Yup.string()
    .min(2, 'City name too short - 2 chars minimum')
    .required('City is required')
});

export const SearchSchema = Yup.object().shape({
  query: Yup.string()
    .required('This field is required')
    .min(2, 'Enter at least 2 chars')
});
