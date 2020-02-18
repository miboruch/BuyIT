import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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

const ResultWrapper = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const StyledIDParagraph = styled(Paragraph)`
  color: #282c34;
  margin-bottom: 1rem;
`;

const UserOrders = ({ allUserOrders }) => {
  return (
    <StyledWrapper>
      <Link to='/my-account'>
        <CloseButtonWrapper>
          <BackArrow />
        </CloseButtonWrapper>
      </Link>
      <StyledTitleParagraph>All user orders</StyledTitleParagraph>
      {allUserOrders.map(item => (
        <ResultWrapper key={item._id}>
          <StyledIDParagraph small>Order ID: {item._id}</StyledIDParagraph>
          <StyledIDParagraph small>
            Date: {new Date(item.createdDate).toLocaleString()}
          </StyledIDParagraph>
          {item.cart.map(item => {
            return (
              <SingleProductSummary
                image={item.image}
                price={item.price}
                name={item.name}
                key={item._id}
              />
            );
          })}
        </ResultWrapper>
      ))}
    </StyledWrapper>
  );
};

const mapStateToProps = ({ orderReducer: { allUserOrders } }) => {
  return { allUserOrders };
};

UserOrders.propTypes = {
  allUserOrders: PropTypes.array
};

export default connect(mapStateToProps)(UserOrders);
