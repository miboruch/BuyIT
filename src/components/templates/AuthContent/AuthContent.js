import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginBox from '../../molecules/LoginBox/LoginBox';
import RegisterBox from '../../molecules/RegisterBox/RegisterBox';
import Button from '../../atoms/Button/Button';
import { authLogout } from '../../../actions/authenticationAction';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import Spinner from '../../atoms/Spinner/Spinner';

const StyledWrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.color.backgroundLight};

  ${({ theme }) => theme.mq.standard} {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

const StyledTitleParagraph = styled(Paragraph)`
  font-size: 24px;
  color: #000;
`;

const AuthContent = ({
  isLoggedIn,
  userLogout,
  history,
  userInfo,
  token,
  loading
}) => {
  return (
    <StyledWrapper>
      <>
        {isLoggedIn ? (
          <>
            {/*<StyledTitleParagraph>User: {userInfo.login}</StyledTitleParagraph>*/}
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
      </>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { isLoggedIn, userInfo, token, loading } }) => {
  return { isLoggedIn, userInfo, token, loading };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(authLogout()),
  };
};

const AuthContentWithRouter = withRouter(AuthContent);

export default connect(mapStateToProps, mapDispatchToProps)(AuthContentWithRouter);
