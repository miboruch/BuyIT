import React from 'react';
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import SEO from '../SEO';
import { theme } from '../../style/theme';
import GlobalStyle from '../../style/GlobalStyle';
import Menu from '../molecules/Menu/Menu';
import Cart from '../templates/Cart/Cart';
import Search from '../templates/Search/Search';
import DialogBox from '../atoms/DialogBox/DialogBox';

const Layout = ({ children }) => {
  return (
    <>
      <SEO />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <DialogBox />
        <Menu />
        <Cart />
        <Search />
        {children}
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundTheme: PropTypes.oneOf(['light', 'dark'])
};

export default Layout;
