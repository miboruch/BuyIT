import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from '../../molecules/Header/Header';

const StyledWrapper = styled.div`
  color: #fff;
  width: 100%;
  min-height: 100vh;
  background: ${({ backgroundTheme, theme }) =>
    backgroundTheme === 'light' ? theme.color.backgroundLight : theme.color.backgroundDarkGradient};
`;

const MainTemplate = ({ children, backgroundTheme }) => {
  return (
    <StyledWrapper backgroundTheme={backgroundTheme}>
      <Header backgroundTheme={backgroundTheme} />
      {children}
    </StyledWrapper>
  );
};

MainTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundTheme: PropTypes.oneOfType(['light, dark'])
};

export default MainTemplate;
