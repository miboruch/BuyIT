import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonWrapper = styled.button`
  cursor: pointer;
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  margin: 0 0.5rem;
  :focus {
    outline: none;
  }
`;

const InnerButton = styled.div`
  position: relative;
  ::before,
  ::after {
    content: '';
    width: 24px;
    height: 1px;
    background: ${({ buttonTheme }) => (buttonTheme === 'dark' ? '#000' : '#fff')}
    position: absolute;
    left: 0;
    transition: all 0.5s ease;
    top: 0;
  }
  ::before {
    transform: rotate(40deg);
  }
  ::after {
    transform: rotate(-40deg);
  }
`;

const CloseButton = ({ setBoxState, buttonTheme }) => {
  return (
    <ButtonWrapper type='button' onClick={() => setBoxState(false)}>
      <InnerButton buttonTheme={buttonTheme} />
    </ButtonWrapper>
  );
};

CloseButton.propTypes = {
  setBoxState: PropTypes.func.isRequired,
  buttonTheme: PropTypes.oneOf(['light', 'dark'])
};

CloseButton.defaultProps = {
  buttonTheme: 'dark'
};

export default CloseButton;
