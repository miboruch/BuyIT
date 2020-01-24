import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { Link } from 'react-router-dom';
import { animated } from 'react-spring';
import { socket } from '../../../utils/constants';
import { ReactSVG } from 'react-svg';
import deleteIcon from '../../../assets/icons/delete.svg';
import { removeProduct } from '../../../actions/productAction';
import { addProductToCart } from '../../../actions/cartAction';
import { DeleteAcceptContext } from '../../../context/DeleteAcceptContext';
import Button from '../../atoms/Button/Button';

const StyledWrapper = styled.div`
  position: relative;
  margin-bottom: 4rem;
  width: 100%;

  ${({ theme }) => theme.mq.tabletS} {
    width: 48%;
    margin-bottom: 2rem;
    overflow: visible;
    display: block;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border: 3px solid #000;
`;

const StyledIcon = styled(ReactSVG)`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 30px;
  height: 30px;
  z-index: 100;
  cursor: pointer;
  display: none;

  ${({ theme }) => theme.mq.tablet} {
    display: block;
  }
  //transform: translate(-50%, -50%);
`;

const StyledNameParagraph = styled(Paragraph)`
  font-weight: normal;
  font-size: 16px;
`;

const StyledPrice = styled(Paragraph)`
  font-weight: bold;
  font-size: 14px;
  padding: 1rem 0;
`;

const StyledUserName = styled(Paragraph)`
  font-size: 10px;
`;

const StyledLink = styled(Link)`
  width: 150px;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const OpenProduct = styled(Paragraph)`
  width: 150px;
  position: relative;
  padding: 1rem 0;
  font-weight: bold;
  letter-spacing: 4px;
  text-transform: uppercase;
  display: block;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 0;
    height: 2px;
    background: #fff;
    transition: all 1s cubic-bezier(0.66, 0.24, 0, 0.82);
  }
  &:hover::after {
    width: 150px;
  }
  // ${({ theme }) => theme.mq.standard} {
  //   display: block;
  // }
`;

const SingleProductCart = ({ style, userID, product, addProductToCart }) => {
  const { setBoxState, setProductId, setProductName } = useContext(DeleteAcceptContext);
  const { image, name, price, _id: id, userLogin, productUserID } = product;
  return (
    <>
      <StyledWrapper>
        {userID === productUserID ? (
          <StyledIcon
            src={deleteIcon}
            onClick={() => {
              setBoxState(true);
              setProductId(id);
              setProductName(name);
            }}
          />
        ) : null}
        {image ? <StyledImage src={image} /> : <p>no image</p>}
        <ContentWrapper>
          <StyledNameParagraph medium>{name}</StyledNameParagraph>
          <StyledPrice>{price}$</StyledPrice>
          <StyledUserName>User: {userLogin}</StyledUserName>
          <StyledLink to={`/product/${id}`} style={style}>
            <OpenProduct small>Open product</OpenProduct>
          </StyledLink>
          <Button text='add to cart' onClick={() => addProductToCart(socket, product)} />
        </ContentWrapper>
      </StyledWrapper>
    </>
  );
};

const mapStateToProps = ({ authenticationReducer: { userID, token } }) => {
  return { userID, token };
};

const mapDispatchToProps = dispatch => {
  return {
    removeProduct: (token, productID) => dispatch(removeProduct(token, productID)),
    addProductToCart: (socket, product) => dispatch(addProductToCart(socket, product))
  };
};

SingleProductCart.propTypes = {
  userID: PropTypes.string,
  product: PropTypes.object.isRequired,
  addProductToCart: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductCart);
