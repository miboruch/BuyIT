import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { Link } from 'react-router-dom';
import { animated } from 'react-spring';
import { ReactSVG } from 'react-svg';
import deleteIcon from '../../../assets/icons/delete.svg';

const StyledLink = styled(animated(Link))`
  width: 48%;
  margin-bottom: 2rem;
  overflow: visible;
`;

const StyledWrapper = styled.div`
  height: 300px;
  position: relative;
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

const SingleProductCart = ({ image, name, price, id, userLogin, style, userID, productUserID }) => {
  return (
    <StyledLink to={`/product/${id}`} style={style}>
      <StyledWrapper>
        {userID === productUserID ? <StyledIcon src={deleteIcon} /> : null}
        {/*<StyledCover>Details</StyledCover>*/}
        {image ? <StyledImage src={image} /> : <p>no image</p>}
        <StyledNameParagraph medium>{name}</StyledNameParagraph>
        <StyledPrice>{price}$</StyledPrice>
        <StyledUserName>User: {userLogin}</StyledUserName>
      </StyledWrapper>
    </StyledLink>
  );
};

const mapStateToProps = ({ authenticationReducer: { userID } }) => {
  return { userID };
};

export default connect(mapStateToProps)(SingleProductCart);
