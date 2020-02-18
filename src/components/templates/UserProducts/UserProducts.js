import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BackArrow from '../../atoms/BackArrow/BackArrow';
import SingleProductSummary from '../../molecules/SingleProductSummary/SingleProductSummary';
import Paragraph from '../../atoms/Paragraph/Paragraph';

const StyledWrapper = styled.div`
  width: 100%;
  padding-top: 4rem;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
`;

const StyledTitleParagraph = styled.h1`
  font-size: 18px;
  color: #000;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const StyledSmallParagraph = styled(Paragraph)`
  color: #282c34;
  margin-bottom: 1rem;
`;

const NoProductsBox = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const StyledParagraph = styled(Paragraph)`
  font-family: Avanti;
  letter-spacing: 4px;
  font-size: 24px;
  color: #282c34;
  margin-bottom: 1rem;
`;

const UserProducts = ({ userProducts }) => {
  return (
    <StyledWrapper>
      <Link to='/my-account'>
        <CloseButtonWrapper>
          <BackArrow />
        </CloseButtonWrapper>
      </Link>
      <StyledTitleParagraph>All user products</StyledTitleParagraph>
      <StyledSmallParagraph small>Total: {userProducts.length}</StyledSmallParagraph>
      {userProducts.length !== 0 ? (
        <>
          {userProducts.map(item => (
            <SingleProductSummary
              id={item._id}
              image={item.image}
              price={item.price}
              name={item.name}
              key={item._id}
            />
          ))}
        </>
      ) : (
        <NoProductsBox>
          <StyledParagraph>You have no products in my database</StyledParagraph>
          <Link to='/my-account'>
            <StyledSmallParagraph small>GO BACK</StyledSmallParagraph>
          </Link>
        </NoProductsBox>
      )}
    </StyledWrapper>
  );
};

const mapStateToProps = ({ productReducer: { userProducts } }) => {
  return { userProducts };
};

UserProducts.propTypes = {
  userProducts: PropTypes.array
};

export default connect(mapStateToProps)(UserProducts);
