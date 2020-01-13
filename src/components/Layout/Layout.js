import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import SEO from '../SEO';
import { theme } from '../../style/theme';
import GlobalStyle from '../../style/GlobalStyle';
import Header from '../molecules/Header/Header';
import MenuContextProvider from '../../context/MenuContext';
import Menu from '../molecules/Menu/Menu';

const StyledWrapper = styled.div`
  color: #fff;
  width: 100%;
  min-height: 100vh;
  background: ${({ backgroundTheme, theme }) =>
    backgroundTheme === 'dark'
      ? theme.color.backgroundDarkGradient
      : theme.color.backgroundLight};
`;

const Layout = ({ children, backgroundTheme }) => {
  return (
    <>
      <SEO />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <MenuContextProvider>
          <StyledWrapper backgroundTheme={backgroundTheme}>
            <Menu />
            <Header />
            {children}
          </StyledWrapper>
        </MenuContextProvider>
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundTheme: PropTypes.oneOfType(['light, dark'])
};

export default Layout;
