import React from 'react';
import styled from 'styled-components';
import OrderSummary from '../components/templates/OrderSummary/OrderSummary';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.backgroundLight};
  padding: 0 2rem;
  overflow: hidden;
`;

const OrderPage = () => {
  return (
    <StyledWrapper>
      <OrderSummary />
    </StyledWrapper>
  );
};

export default OrderPage;
