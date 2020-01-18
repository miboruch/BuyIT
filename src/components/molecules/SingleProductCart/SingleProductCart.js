import React from 'react';
import styled from 'styled-components';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { Link } from 'react-router-dom';
import {animated} from "react-spring";

const StyledLink = styled(animated(Link))`
  width: 48%;
  margin-bottom: 2rem;
`;

const StyledWrapper = styled.div`
  height: 300px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
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

const SingleProductCart = ({ image, name, price, id, userLogin, style }) => {
  return (
    <StyledLink to={`/product/${id}`} style={style}>
      <StyledWrapper>
        {image ? <StyledImage src={image} /> : <p>no image</p>}
        <StyledNameParagraph medium>{name}</StyledNameParagraph>
        <StyledPrice>{price}$</StyledPrice>
        <StyledUserName>User: {userLogin}</StyledUserName>
      </StyledWrapper>
    </StyledLink>
  );
};

export default SingleProductCart;
