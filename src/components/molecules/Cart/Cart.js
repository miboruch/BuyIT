import React from 'react';
import styled from 'styled-components';

const StyledCartWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.color.backgroundLight};
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
`;

const Cart = () => {
  return <div></div>;
};

export default Cart;
