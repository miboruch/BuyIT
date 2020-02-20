import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/store';
import { theme } from '../style/theme';

const TestWrapperComponent = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default TestWrapperComponent;
