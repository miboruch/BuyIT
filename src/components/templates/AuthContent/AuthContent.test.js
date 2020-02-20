import React from 'react';
import { render } from '@testing-library/react';
import { AuthContent } from './AuthContent';
import TestWrapperComponent from '../../../tests/TestWrapperComponent';

const AuthContentComponent = () => {
  return (
    <TestWrapperComponent>
      <AuthContent isLoggedIn={false} />
    </TestWrapperComponent>
  );
};

describe('Auth Content component', () => {
  it('renders log in component when user is not logged in', () => {
    const { getByTestId } = render(<AuthContentComponent isLoggedIn={false} />);
    expect(getByTestId('login-form')).toBeInTheDocument();
  });
});
