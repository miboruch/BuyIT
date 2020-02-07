import React, { useContext } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { CartContext } from '../../../context/CartContext';
import Button from '../../atoms/Button/Button';
import BackgroundWrapper from '../../atoms/BackgroundWrapper/BackgroundWrapper';
import PropTypes from 'prop-types';
import CartProduct from '../../molecules/CartProduct/CartProduct';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import Paragraph from '../../atoms/Paragraph/Paragraph';

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

const StyledTotalPrice = styled(Paragraph)`
  color: #000;
  font-size: 20px;
  position: absolute;
  right: 2rem;
  bottom: 100px;
  left: auto;
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
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
`;

const Cart = ({ cart, totalPrice }) => {
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
          {localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')).map(item => (
                <CartProduct product={item} key={item._id} />
              ))
            : cart.map(item => <CartProduct product={item} key={item._id} />)}
        </ProductsWrapper>
        <StyledTotalPrice>Total price: {totalPrice} $</StyledTotalPrice>
        <ButtonWrapper>
          <Button text='Check all products' buttonTheme='dark' />
        </ButtonWrapper>
      </StyledCartWrapper>
    </>
  );
};

const mapStateToProps = ({ cartReducer: { cart, totalPrice } }) => {
  return { cart, totalPrice };
};

Cart.propTypes = {
  cart: PropTypes.array.isRequired,
  totalPrice: PropTypes.number
};

export default connect(mapStateToProps)(Cart);
