import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const WrapperBackground = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 500;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.5s 0.65s ease, visibility 0.5s 0.65s ease;
`;

const BackgroundWrapper = ({ isOpen }) => {
  return <WrapperBackground isOpen={isOpen} />;
};

BackgroundWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

export default BackgroundWrapper;
