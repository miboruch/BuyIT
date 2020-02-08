import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeProductFromCart } from '../../../actions/cartAction';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import Button from '../../atoms/Button/Button';
import { cartToggle } from '../../../actions/sliderBoxesAction';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;
  margin: 2rem 0;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
`;

const StyledHeading = styled.h1`
  font-size: 20px;
  color: #1d1d1d;
`;

const StyledPriceParagraph = styled(Paragraph)`
  font-size: 13px;
  color: #1d1d1d;
  padding: 1rem 0;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 2rem;

  ${({ theme }) => theme.mq.standard} {
    top: 50%;
    transform: translateY(-50%);
  }
`;

const StyledParagraph = styled(Paragraph)`
  color: #1d1d1d;
`;

const CartProduct = ({ product, removeFromCart, cartToggle }) => {
  const { name, price, _id: id, expire } = product;

  return (
    <StyledWrapper>
      <Link to={`/product/${id}`}>
        <StyledHeading title onClick={() => cartToggle()}>
          {name}
        </StyledHeading>
      </Link>
      <ButtonWrapper>
        <Button text='Remove product' buttonTheme='dark' onClick={() => removeFromCart(product)} />
      </ButtonWrapper>
      <StyledPriceParagraph>{price} USD</StyledPriceParagraph>
      <StyledParagraph small>
        Product will be removed from your cart at {new Date(expire).toLocaleTimeString()}
      </StyledParagraph>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ cartReducer: { cart } }) => {
  return { cart };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: product => dispatch(removeProductFromCart(product)),
    cartToggle: () => dispatch(cartToggle())
  };
};

CartProduct.propTypes = {
  product: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func,
  cartToggle: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
