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
