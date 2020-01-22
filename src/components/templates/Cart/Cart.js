import React, { useContext } from 'react';
import styled from 'styled-components';
import { CartContext } from '../../../context/CartContext';
import Button from '../../atoms/Button/Button';
import BackgroundWrapper from '../../atoms/BackgroundWrapper/BackgroundWrapper';

const StyledCartWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.color.backgroundLight};
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '100%')});
  transition: transform 1s ease;
  z-index: 900;

  ${({ theme }) => theme.mq.standard} {
    width: 45%;
    right: 0;
    left: auto;
  }
`;

const StyledHeading = styled.h1`
  font-family: ${({ theme }) => theme.font.family.avanti};
  padding: 4rem 2rem;
  color: #1d1d1d;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Cart = () => {
  const { isCartOpen } = useContext(CartContext);
  return (
    <>
      <BackgroundWrapper isOpen={isCartOpen} />
      <StyledCartWrapper isOpen={isCartOpen}>
        <StyledHeading>Your cart</StyledHeading>
        <ButtonWrapper>
          <Button text='Check all products' buttonTheme='dark' />
        </ButtonWrapper>
      </StyledCartWrapper>
    </>
  );
};

export default Cart;
