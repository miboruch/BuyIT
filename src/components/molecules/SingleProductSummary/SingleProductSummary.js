import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paragraph from '../../atoms/Paragraph/Paragraph';

const ProductSummary = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  //padding: 0 2rem;
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
  width: 90px;
`;

const StyledPriceParagraph = styled(Paragraph)`
  color: #000;
  font-size: 13px;
`;

const SingleProductSummary = ({ id, image, name, price }) => {
  return (
    <>
      <ProductSummary>
        {id ? (
          <Link to={`/product/${id}`}>
            <StyledImage src={image} />
          </Link>
        ) : (
          <StyledImage src={image} />
        )}
        <ProductTitle>{name}</ProductTitle>
        <StyledPriceParagraph>{price} $</StyledPriceParagraph>
      </ProductSummary>
    </>
  );
};

SingleProductSummary.propTypes = {
  id: PropTypes.any,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default SingleProductSummary;
