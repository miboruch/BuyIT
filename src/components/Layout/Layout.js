import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import SEO from '../SEO';
import { theme } from '../../style/theme';
import GlobalStyle from '../../style/GlobalStyle';

const StyledWrapper = styled.div`
  width: 100%;
`;

const Layout = ({ children }) => {
  return (
    <StyledWrapper>
      <SEO />
      <GlobalStyle />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyledWrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
