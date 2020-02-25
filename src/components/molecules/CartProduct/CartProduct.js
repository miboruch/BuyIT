import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import Button from '../../atoms/Button/Button';
import { removeProductFromCart } from '../../../actions/cartAction';
import { cartToggle } from '../../../actions/sliderBoxesAction';

const ButtonWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

const ProductSummary = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 2rem;
`;

const StyledImage = styled.img`
  width: 100px;
  height: 100px;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;

const ProductTitle = styled(Paragraph)`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  width: 120px;
  text-align: center;

  ${({ theme }) => theme.mq.tabletS} {
    width: auto;
  }
`;

const StyledPriceParagraph = styled(Paragraph)`
  color: #000;
  font-size: 13px;
`;

const StyledParagraph = styled(Paragraph)`
  color: #1d1d1d;
  text-align: left;
`;

const CartProduct = ({ product, removeFromCart, cartToggle }) => {
  const { image, name, price, _id: id, expire } = product;

  return (
    <>
      <ProductSummary>
        <Link to={`/product/${id}`} onClick={() => cartToggle()}>
          <StyledImage src={image} />
        </Link>
        <ProductTitle>{name}</ProductTitle>
        <StyledPriceParagraph>{price} $</StyledPriceParagraph>
      </ProductSummary>
      {expire ? (
        <StyledParagraph small='true'>
          Product will be removed from your cart at {new Date(expire).toLocaleTimeString()}
        </StyledParagraph>
      ) : null}
      <ButtonWrapper>
        <Button text='Remove product' buttonTheme='dark' onClick={() => removeFromCart(product)} />
      </ButtonWrapper>
    </>
  );
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

export default connect(null, mapDispatchToProps)(CartProduct);
