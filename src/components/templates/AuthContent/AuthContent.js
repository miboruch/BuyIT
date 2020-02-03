import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginBox from '../../molecules/LoginBox/LoginBox';
import RegisterBox from '../../molecules/RegisterBox/RegisterBox';
import Button from '../../atoms/Button/Button';
import { authLogout } from '../../../actions/authenticationAction';

const StyledWrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.color.backgroundLight};

  ${({ theme }) => theme.mq.standard} {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

const AuthContent = ({ isLoggedIn, userLogout, history }) => {
  return (
    <StyledWrapper>
      {isLoggedIn ? (
        <>
          <h1>hello</h1>
          <Button
            text='Logout'
            onClick={() => {
              userLogout();
              history.push('/');
            }}
            buttonTheme='dark'
          />
        </>
      ) : (
        <>
          <LoginBox />
          <RegisterBox />
        </>
      )}
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { isLoggedIn } }) => {
  return { isLoggedIn };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(authLogout())
  };
};

const AuthContentWithRouter = withRouter(AuthContent);

export default connect(mapStateToProps, mapDispatchToProps)(AuthContentWithRouter);
