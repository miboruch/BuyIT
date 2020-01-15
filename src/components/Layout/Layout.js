import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import SEO from '../SEO';
import { theme } from '../../style/theme';
import GlobalStyle from '../../style/GlobalStyle';
import MainContext from '../../context/MainContext';
import Menu from '../molecules/Menu/Menu';
import Cart from '../templates/Cart/Cart';
import Search from '../templates/Search/Search';

const Layout = ({ children }) => {
  return (
    <>
      <SEO />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <MainContext>
          <Menu />
          <Cart />
          <Search />
          {children}
        </MainContext>
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundTheme: PropTypes.oneOfType(['light, dark'])
};

export default Layout;
