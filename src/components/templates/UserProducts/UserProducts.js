import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BackArrow from '../../atoms/BackArrow/BackArrow';
import SingleProductSummary from '../../molecules/SingleProductSummary/SingleProductSummary';

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

const UserProducts = ({ userProducts }) => {
  return (
    <StyledWrapper>
      <Link to='/my-account'>
        <CloseButtonWrapper>
          <BackArrow />
        </CloseButtonWrapper>
      </Link>
      <StyledTitleParagraph>All user products</StyledTitleParagraph>
      {userProducts ? (
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
      ) : null}
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
