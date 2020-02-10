import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import BackArrow from '../../atoms/BackArrow/BackArrow';
import { Link } from 'react-router-dom';
import NotLoggedInSummary from '../../molecules/NotLoggedInSummary/NotLoggedInSummary';
import LoggedInSummary from '../../molecules/LoggedInSummary/LoggedInSummary';
import Spinner from '../../atoms/Spinner/Spinner';

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
  padding: 2rem 0;
`;

const ProductSummary = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
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

const StyledTotalParagraph = styled(Paragraph)`
  font-size: 13px;
  color: #1d1d1d;
  text-align: right;
`;

const TotalSummary = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  margin-top: 2rem;
  padding: 2rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const OrderSummary = ({ cart, totalPrice, isLoggedIn, loading }) => {
  return (
    <StyledWrapper>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Link to='/products/all?page=1'>
            <CloseButtonWrapper>
              <BackArrow />
            </CloseButtonWrapper>
          </Link>
          <StyledTitleParagraph>Order summary</StyledTitleParagraph>
          {cart.map(item => (
            <ProductSummary key={item._id}>
              <StyledImage src={item.image} />
              <ProductTitle>{item.name}</ProductTitle>
              <StyledPriceParagraph>{item.price} $</StyledPriceParagraph>
            </ProductSummary>
          ))}
          <TotalSummary>
            <StyledTotalParagraph>Products: {cart.length}</StyledTotalParagraph>
            <StyledTotalParagraph>
              Total: <strong>{totalPrice} $</strong>
            </StyledTotalParagraph>
          </TotalSummary>
          <StyledTitleParagraph>Shipping address</StyledTitleParagraph>
          {isLoggedIn ? <LoggedInSummary /> : <NotLoggedInSummary />}
        </>
      )}
    </StyledWrapper>
  );
};

const mapStateToProps = ({
  cartReducer: { cart, totalPrice },
  authenticationReducer: { isLoggedIn, loading }
}) => {
  return { cart, totalPrice, isLoggedIn, loading };
};

OrderSummary.propTypes = {
  cart: PropTypes.array,
  totalPrice: PropTypes.number,
  isLoggedIn: PropTypes.bool,
  loading: PropTypes.bool
};

export default connect(mapStateToProps)(OrderSummary);
