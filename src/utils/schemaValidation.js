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
    .required('City is required'),
  country: Yup.string()
});

export const UpdateSchema = Yup.object().shape({
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
    .required('City is required'),
  country: Yup.string()
});

export const NotLoggedInOrderSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
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
    .required('City is required'),
  country: Yup.string()
});

export const LoggedInOrderSchema = Yup.object().shape({
  address: Yup.string()
    .min(2, 'Address too short - 2 chars minimum')
    .required('Address is required'),
  city: Yup.string()
    .min(2, 'City name too short - 2 chars minimum')
    .required('City is required'),
  country: Yup.string()
});

export const AddProductSchema = Yup.object().shape({
  image: Yup.mixed().required('Image is required'),
  name: Yup.string()
    .min(2, 'Name too short - 2 chars minimum')
    .required('Name is required'),
  description: Yup.string()
    .min(6, 'Description too short - 6 chars minimum')
    .required('Description is required'),
  price: Yup.number()
    .required('Price is required')
    .typeError('Price must be a number')
    .positive('Price has to be positive'),
  category: Yup.string()
    .min(2, 'Category name too short - 2 chars minimum')
    .required('Category is required')
});

export const SearchSchema = Yup.object().shape({
  query: Yup.string()
    .required('This field is required')
    .min(2, 'Enter at least 2 chars')
});
