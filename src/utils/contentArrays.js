export const landingPageContent = [
  'Look for any product you want, you can order without an account.',
  'You must have an account to add a new product to my database.',
  'If you click reserve, product will be reserved for you for 15 minutes.'
];

export const registerInputArray = errors => {
  return [
    {
      name: 'login',
      labelText: errors.login ? errors.login : 'login',
      inputType: 'text'
    },
    {
      name: 'email',
      labelText: errors.email ? errors.email : 'email',
      inputType: 'email'
    },
    {
      name: 'password',
      labelText: errors.password ? errors.password : 'password',
      inputType: 'password'
    },
    {
      name: 'name',
      labelText: errors.name ? errors.name : 'name',
      inputType: 'text'
    },
    {
      name: 'lastName',
      labelText: errors.lastName ? errors.lastName : 'last name',
      inputType: 'text'
    },
    {
      name: 'address',
      labelText: errors.address ? errors.address : 'address',
      inputType: 'text'
    },
    {
      name: 'city',
      labelText: errors.city ? errors.city : 'city',
      inputType: 'text'
    }
  ];
};

export const updateInputArrays = (errors, values) => {
  return [
    {
      name: 'name',
      labelText: errors.name ? errors.name : 'name',
      value: values.name
    },
    {
      name: 'lastName',
      labelText: errors.lastName ? errors.lastName : 'last name',
      value: values.lastName
    },
    {
      name: 'address',
      labelText: errors.address ? errors.address : 'address',
      value: values.address
    },
    {
      name: 'city',
      labelText: errors.city ? errors.city : 'city',
      value: values.city
    }
  ];
};

export const menuItems = isLogged => {
  return [
    {
      name: 'HOME',
      link: '/'
    },
    {
      name: 'PRODUCTS',
      link: '/products/all?page=1'
    },
    {
      name: 'ADD PRODUCT',
      link: '/addProduct'
    },
    {
      name: isLogged ? 'ACCOUNT' : 'SIGN IN',
      link: '/my-account'
    }
  ];
};
