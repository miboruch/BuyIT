import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { Link } from 'react-router-dom';
import { animated } from 'react-spring';
import { ReactSVG } from 'react-svg';
import deleteIcon from '../../../assets/icons/delete.svg';
import { removeProduct } from '../../../actions/productAction';

// const StyledLinkWrapper = styled(Link)`
//   width: 48%;
//   margin-bottom: 2rem;
//   overflow: visible;
//
//   ${({ theme }) => theme.mq.tablet} {
//     display: none;
//   }
// `;

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
`;

const StyledCover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 10px;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.4s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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

const OpenProduct = styled(Paragraph)`
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
    bottom: -2px;
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

const SingleProductCart = ({
  image,
  name,
  price,
  id,
  userLogin,
  style,
  userID,
  productUserID,
  token,
  removeProduct
}) => {
  return (
    <StyledWrapper>
      {userID === productUserID ? (
        <StyledIcon src={deleteIcon} onClick={() => removeProduct(token, id)} />
      ) : null}
      {/*<StyledCover>Details</StyledCover>*/}
      {image ? <StyledImage src={image} /> : <p>no image</p>}
      <StyledNameParagraph medium>{name}</StyledNameParagraph>
      <StyledPrice>{price}$</StyledPrice>
      <StyledUserName>User: {userLogin}</StyledUserName>
      <Link to={`/product/${id}`} style={style}>
        <OpenProduct small>Open product</OpenProduct>
      </Link>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { userID, token } }) => {
  return { userID, token };
};

const mapDispatchToProps = dispatch => {
  return {
    removeProduct: (token, productID) => dispatch(removeProduct(token, productID))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductCart);
