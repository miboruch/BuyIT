import React from 'react';
import styled from 'styled-components';
import UserOrders from '../components/templates/UserOrders/UserOrders';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.backgroundLight};
  padding: 0 2rem;
  overflow: hidden;
`;

const UserOrdersPage = () => {
  return (
    <StyledWrapper>
      <UserOrders />
    </StyledWrapper>
  );
};

export default UserOrdersPage;
