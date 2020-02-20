import React from 'react';
import { render } from '@testing-library/react';
import { RegisterBox } from './RegisterBox';
import TestWrapperComponent from '../../../tests/TestWrapperComponent';

const RegisterComponent = isLoading => {
  return (
    <TestWrapperComponent>
      <RegisterBox loading={isLoading} />
    </TestWrapperComponent>
  );
};

describe('Register Box', () => {
  it('renders properly', () => {
    const { getByTestId } = render(RegisterComponent(false));
    expect(getByTestId('register-form')).toBeInTheDocument();
  });

  it('render spinner while loading', () => {
    const { getByTestId } = render(RegisterComponent(true));
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  it('input accepts only string', () => {
    const { getByTestId } = render(RegisterComponent(false));
    const input = getByTestId('name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });
});
