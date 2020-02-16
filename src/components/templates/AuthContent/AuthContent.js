import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import LoginBox from '../../molecules/LoginBox/LoginBox';
import RegisterBox from '../../molecules/RegisterBox/RegisterBox';
import Button from '../../atoms/Button/Button';
import { authLogout } from '../../../actions/authenticationAction';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import EditTemplate from '../EditTemplate/EditTemplate';
import Spinner from '../../atoms/Spinner/Spinner';
import Toggle from '../../../providers/Toggle';

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
  margin-top: 1rem;
`;

const AuthContent = ({ isLoggedIn, userLogout, history, userInfo, loading, allUserOrders }) => {
  return (
    <Toggle
      render={(isOpen, toggle) => (
        <StyledWrapper>
          {loading ? (
            <Spinner />
          ) : (
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
                      <Link to={'/user-products'}>
                        <StyledTitleParagraph>
                          Your products in database: {userInfo.products.length}
                        </StyledTitleParagraph>
                      </Link>
                      <Link to={'/orders/userOrders'}>
                        <StyledTitleParagraph>Orders: {allUserOrders.length}</StyledTitleParagraph>
                      </Link>
                      <StyledTitle title>Personal data:</StyledTitle>
                      {isOpen ? (
                        <EditTemplate />
                      ) : (
                        <>
                          <StyledTitleParagraph>name: {userInfo.name}</StyledTitleParagraph>
                          <StyledTitleParagraph>
                            last name: {userInfo.lastName}
                          </StyledTitleParagraph>
                          <StyledTitleParagraph>address: {userInfo.address}</StyledTitleParagraph>
                          <StyledTitleParagraph>city: {userInfo.city}</StyledTitleParagraph>
                          <StyledTitleParagraph>country: {userInfo.country}</StyledTitleParagraph>
                        </>
                      )}
                      <EditButtonWrapper>
                        <Button
                          text={isOpen ? 'close' : 'edit data'}
                          buttonTheme='dark'
                          onClick={() => toggle()}
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
          )}
        </StyledWrapper>
      )}
    />
  );
};

const mapStateToProps = ({
  authenticationReducer: { isLoggedIn, userInfo, token, loading },
  orderReducer: { allUserOrders }
}) => {
  return { isLoggedIn, userInfo, token, loading, allUserOrders };
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
  userLogout: PropTypes.func,
  loading: PropTypes.bool,
  isOpen: PropTypes.bool,
  toggleEdit: PropTypes.func,
  allUserOrders: PropTypes.array
};

const AuthContentWithRouter = withRouter(AuthContent);

export default connect(mapStateToProps, mapDispatchToProps)(AuthContentWithRouter);
