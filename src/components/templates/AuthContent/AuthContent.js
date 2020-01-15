import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.color.backgroundLight};
`;

const AuthContent = () => {
  return (
    <StyledWrapper>
      <p>asd</p>
    </StyledWrapper>
  );
};

export default AuthContent;
