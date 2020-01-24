import React, { useContext } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { CartContext } from '../../../context/CartContext';
import Button from '../../atoms/Button/Button';
import BackgroundWrapper from '../../atoms/BackgroundWrapper/BackgroundWrapper';
import PropTypes from 'prop-types';
import CartProduct from '../../molecules/CartProduct/CartProduct';
import CloseButton from '../../atoms/CloseButton/CloseButton';

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

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  z-index: 500;
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
  overflow: hidden;
`;

const ProductsWrapper = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
`;

const Cart = ({ cart }) => {
  const { isCartOpen, toggleCart } = useContext(CartContext);
  return (
    <>
      <BackgroundWrapper isOpen={isCartOpen} />
      <StyledCartWrapper isOpen={isCartOpen}>
        <CloseButtonWrapper>
          <CloseButton setBoxState={toggleCart} />
        </CloseButtonWrapper>
        <StyledHeading>Your cart</StyledHeading>
        <ProductsWrapper>
          {cart.map(item => (
            <CartProduct product={item} key={item._id} />
          ))}
        </ProductsWrapper>
        <ButtonWrapper>
          <Button text='Check all products' buttonTheme='dark' />
        </ButtonWrapper>
      </StyledCartWrapper>
    </>
  );
};

const mapStateToProps = ({ cartReducer: { cart } }) => {
  return { cart };
};

Cart.propTypes = {
  cart: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(Cart);
