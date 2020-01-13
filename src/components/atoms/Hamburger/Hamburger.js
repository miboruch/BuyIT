import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledHamburger = styled.button`
  cursor: pointer;
  width: 50px;
  height: 50px;
  background: transparent;
  border: none;
  z-index: 901;
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  margin-left: 1rem;

  :focus {
    outline: none;
  }
`;

const InnerHamburger = styled.div`
  position: relative;
  background: #fff;
  width: 32px;
  height: 1px;

  ${({ isOpen }) =>
    isOpen &&
    css`
      background: transparent;
      transition: all 0.5s ease;
    `}
  &::before,
  &::after {
    content: '';
    width: 32px;
    height: 1px;
    position: absolute;
    background: #fff;
    left: 0;
    transition: all 0.5s ease;
  }
  ::before {
    top: ${({ isOpen }) => (isOpen ? '0' : '-4px')};
    transform: rotate(${({ isOpen }) => (isOpen ? '40deg' : '0deg')});
  }
  ::after {
    width: ${({ isOpen }) => (isOpen ? '32px' : '24px')};
    top: ${({ isOpen }) => (isOpen ? '0' : '4px')};
    transform: rotate(${({ isOpen }) => (isOpen ? '-40deg' : '0deg')});
  }
  ${StyledHamburger}:hover & {
    background: transparent;
    &::before {
      top: 0;
    }
    &::after {
      top: 0;
    }
  }
`;

const Hamburger = ({ isOpen, toggleMenu }) => {
  return (
    <StyledHamburger isOpen={isOpen} onClick={() => toggleMenu()}>
      <InnerHamburger isOpen={isOpen} />
    </StyledHamburger>
  );
};

Hamburger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func
};

export default Hamburger;
