import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoginBox from '../../molecules/LoginBox/LoginBox';
import RegisterBox from '../../molecules/RegisterBox/RegisterBox';
import Button from '../../atoms/Button/Button';
import { authLogout } from '../../../actions/authenticationAction';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import EditTemplate from '../EditTemplate/EditTemplate';

const StyledWrapper = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.color.backgroundLight};

  ${({ theme }) => theme.mq.standard} {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
`;

const StyledContentWrapper = styled.div`
  padding: 2rem;
`;

const StyledTitleParagraph = styled(Paragraph)`
  color: #000;
  padding-bottom: 1rem;
`;

const StyledTitle = styled(Paragraph)`
  color: #000;
  font-size: 36px !important;
`;

const EditButtonWrapper = styled.div`
  margin-top: 1rem;
`;

const LogoutButtonWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
`;

const AuthContent = ({ isLoggedIn, userLogout, history, userInfo }) => {
  const [isEditOpen, setEditOpen] = useState(false);
  return (
    <StyledWrapper>
      <>
        {isLoggedIn ? (
          <>
            {userInfo ? (
              <StyledContentWrapper>
                <StyledTitle title>Your account: </StyledTitle>
                <StyledTitleParagraph>login: {userInfo.login}</StyledTitleParagraph>
                <StyledTitleParagraph>email: {userInfo.email}</StyledTitleParagraph>
                <StyledTitleParagraph>
                  created date: {new Date(userInfo.createdDate).toLocaleString()}
                </StyledTitleParagraph>
                <StyledTitleParagraph>
                  Your products in database: {userInfo.products.length}
                </StyledTitleParagraph>
                <StyledTitle title>Personal data:</StyledTitle>
                {isEditOpen ? (
                  <EditTemplate setEditOpen={setEditOpen} />
                ) : (
                  <>
                    <StyledTitleParagraph>name: {userInfo.name}</StyledTitleParagraph>
                    <StyledTitleParagraph>last name: {userInfo.lastName}</StyledTitleParagraph>
                    <StyledTitleParagraph>address: {userInfo.address}</StyledTitleParagraph>
                    <StyledTitleParagraph>city: {userInfo.city}</StyledTitleParagraph>
                    <StyledTitleParagraph>country: {userInfo.country}</StyledTitleParagraph>
                  </>
                )}
                <EditButtonWrapper>
                  <Button
                    text={isEditOpen ? 'close' : 'edit data'}
                    buttonTheme='dark'
                    onClick={() => setEditOpen(!isEditOpen)}
                  />
                </EditButtonWrapper>
                <LogoutButtonWrapper>
                  <Button
                    text='Logout'
                    onClick={() => {
                      userLogout();
                      history.push('/');
                    }}
                    buttonTheme='dark'
                  />
                </LogoutButtonWrapper>
              </StyledContentWrapper>
            ) : null}
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
    userLogout: () => dispatch(authLogout())
  };
};

AuthContent.propTypes = {
  isLoggedIn: PropTypes.bool,
  userInfo: PropTypes.object,
  history: PropTypes.object,
  userLogout: PropTypes.func
};

const AuthContentWithRouter = withRouter(AuthContent);

export default connect(mapStateToProps, mapDispatchToProps)(AuthContentWithRouter);
