import React, { useContext } from 'react';
import styled from 'styled-components';
import { MenuContext } from '../../../context/MenuContext';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 1s ease;
  z-index: 500;
`;

const Menu = () => {
  const { isOpen } = useContext(MenuContext);
  console.log(isOpen);
  return (
    <StyledWrapper isOpen={isOpen}>
      <h1>hello</h1>
    </StyledWrapper>
  );
};

export default Menu;
