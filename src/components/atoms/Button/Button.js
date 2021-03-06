import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  width: 200px;
  height: 35px;
  background: transparent;
  border: ${({ buttonTheme }) => (buttonTheme === 'dark' ? '1px solid #000' : '1px solid #fff')};
  color: ${({ buttonTheme }) => (buttonTheme === 'dark' ? '#000' : '#fff')};
  letter-spacing: 2px;
  font-size: 12px;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
  cursor: pointer;
  font-family: ${({ theme }) => theme.font.family.avanti};

  &:hover {
    color: ${({ buttonTheme }) => (buttonTheme === 'dark' ? '#fff' : '#000')};
    transition: color 0.14s ease;
  }

  &:focus {
    outline: none;
  }

  &::before {
    position: absolute;
    content: '';
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: ${({ buttonTheme }) => (buttonTheme === 'dark' ? '#000' : '#fff')};
    transition: all 0.25s ease;
    z-index: -1;
  }

  &:hover::before {
    height: 100%;
    transition: all 0.25s ease;
  }

  :disabled {
    opacity: 0.5;
  }
`;

const Button = ({ text, onClick, buttonTheme, type = 'button', disabled }) => {
  return (
    <>
      {disabled ? (
        <StyledButton onClick={onClick} type={type} buttonTheme={buttonTheme} disabled>
          {text}
        </StyledButton>
      ) : (
        <StyledButton onClick={onClick} type={type} buttonTheme={buttonTheme}>
          {text}
        </StyledButton>
      )}
    </>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  buttonTheme: PropTypes.oneOf(['light', 'dark']),
  type: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button;
