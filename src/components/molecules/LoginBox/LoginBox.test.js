import React from 'react';
import { render } from '@testing-library/react';
import { LoginBox } from './LoginBox';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../style/theme';
import store from '../../../store/store';

const LoginComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <LoginBox store={store} />
    </ThemeProvider>
  );
};

describe('Login Box', () => {
  it('form has email and password fields', () => {
    const { getByTestId } = render(LoginComponent());
    expect(getByTestId('login-form')).toHaveFormValues({
      email: '',
      password: ''
    });
  });
});
