import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  width: 160px;
  height: 45px;
  background: transparent;
  border: 1px solid #fff;
  color: #fff;
  letter-spacing: 2px;
  font-size: 12px;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
  cursor: pointer;

  &:hover {
    color: #000;
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
    background: #fff;
    transition: all 0.25s ease;
    z-index: -1;
  }

  &:hover::before {
    height: 100%;
    transition: all 0.25s ease;
  }
`;

const Button = ({ text, onClick }) => {
  return <StyledButton onClick={() => onClick}>{text}</StyledButton>;
};

Button.propTypes = {
  onClick: PropTypes.func
};

export default Button;
