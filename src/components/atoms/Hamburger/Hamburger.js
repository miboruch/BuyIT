import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledHamburger = styled.button`
  cursor: pointer;
  width: 50px;
  height: 50px;
  background: transparent;
  border: none;
  z-index: 899;
  position: absolute;
  top: 50%;
  left: 2rem;
  transform: translateY(-50%);
  padding: 0;

  :focus {
    outline: none;
  }
`;

const InnerHamburger = styled.div`
  position: relative;
  background: ${({ hamburgerTheme }) => (hamburgerTheme === 'dark' ? '#000' : '#fff')};
  width: 26px;
  height: 1px;
  transition: all 0.5s ease;

  ${({ isOpen }) =>
    isOpen &&
    css`
      background: transparent;
    `}

  ${({ theme }) => theme.mq.mobileL} {
    width: 32px;
  }

  &::before,
  &::after {
    content: '';
    width: 26px;
    height: 1px;
    position: absolute;
    background: ${({ hamburgerTheme }) => (hamburgerTheme === 'dark' ? '#000' : '#fff')};
    left: 0;
    transition: all 0.5s ease;

    ${({ isOpen }) =>
      isOpen &&
      css`
        background: #fff;
      `}

    ${({ theme }) => theme.mq.mobileL} {
      width: 32px;
    }
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

const Hamburger = ({ isOpen, toggleMenu, hamburgerTheme }) => {
  return (
    <StyledHamburger isOpen={isOpen} onClick={() => toggleMenu()}>
      <InnerHamburger isOpen={isOpen} hamburgerTheme={hamburgerTheme} />
    </StyledHamburger>
  );
};

Hamburger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func,
  hamburgerTheme: PropTypes.oneOf(['dark', 'light'])
};

export default Hamburger;
