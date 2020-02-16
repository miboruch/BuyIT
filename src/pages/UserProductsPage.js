import React from 'react';
import styled from 'styled-components';
import UserProducts from '../components/templates/UserProducts/UserProducts';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.backgroundLight};
  padding: 0 2rem;
  overflow: hidden;
`;

const UserProductsPage = () => {
  return (
    <StyledWrapper>
      <UserProducts />
    </StyledWrapper>
  );
};

export default UserProductsPage;
