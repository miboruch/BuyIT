import React from 'react';
import styled from 'styled-components';
import LoginBox from '../../molecules/LoginBox/LoginBox';
import RegisterBox from '../../molecules/RegisterBox/RegisterBox';

const StyledWrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.color.backgroundLight};
`;

const AuthContent = () => {
  return (
    <StyledWrapper>
      <LoginBox />
      <RegisterBox />
    </StyledWrapper>
  );
};

export default AuthContent;
