import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../components/atoms/Button/Button';
import background from '../assets/images/hero-min.jpg';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';
import { landingPageContent } from '../utils/contentArrays';
import { updateCategory, fetchAllProducts } from '../actions/productAction';
import Footer from '../components/molecules/Footer/Footer';

const StyledWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.mq.standard} {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const StyledBackgroundImage = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 15px;
  position: relative;
  -webkit-box-shadow: 4px 21px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 4px 21px 14px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 4px 21px 14px 0px rgba(0, 0, 0, 0.75);

  &::before {
    content: 'My personal shopping experience';
    position: absolute;
    text-transform: uppercase;
    width: 60%;
    top: -12px;
    left: 2rem;
    font-size: 24px;
    color: #887878;
    font-weight: lighter;
    letter-spacing: 5px;
  }

  ${({ theme }) => theme.mq.mobileL} {
    height: 300px;
    margin-top: 20px;
  }

  ${({ theme }) => theme.mq.tabletS} {
    height: 400px;
    margin-top: 20px;
  }

  ${({ theme }) => theme.mq.standard} {
    width: 50%;
    height: 75vh;
    margin-top: 20px;
  }
`;

const ContentWrapper = styled.div`
  ${({ theme }) => theme.mq.standard} {
    width: 50%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  ${({ theme }) => theme.mq.mobileL} {
    margin-top: 4rem;
  }
`;

const StyledList = styled.ul`
  margin: 2rem auto;
  list-style-type: none;
  width: 80%;
  padding: 0;

  ${({ theme }) => theme.mq.standard} {
    text-align: center;
  }
`;

const StyledListItem = styled.li`
  letter-spacing: 2px;
  font-size: 13px;
  padding-top: 1rem;
  color: #878787;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -20px;
    width: 8px;
    height: 8px;
    border: 1px solid #ccc;
    border-radius: 50%;
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
`;

const LandingPage = ({ isLoggedIn, getAllProducts }) => {
  return (
    <MainTemplate>
      <StyledWrapper>
        <StyledBackgroundImage />
        <ContentWrapper>
          <ButtonWrapper>
            <Link to='/products/all?page=1'>
              <Button
                text='See all products'
                onClick={() => {
                  getAllProducts('all', 1);
                }}
              />
            </Link>
          </ButtonWrapper>
          <StyledList>
            {landingPageContent.map((item, index) => (
              <StyledListItem key={index}>{item}</StyledListItem>
            ))}
          </StyledList>
          <ButtonWrapper>
            <Link to='/my-account'>
              {isLoggedIn ? <Button text='Account' /> : <Button text='Log in' />}
            </Link>
          </ButtonWrapper>
        </ContentWrapper>
      </StyledWrapper>
      <FooterWrapper>
        <Footer footerTheme='light' />
      </FooterWrapper>
    </MainTemplate>
  );
};

const mapStateToProps = ({
  productReducer: { category, products },
  authenticationReducer: { isLoggedIn }
}) => {
  return { category, products, isLoggedIn };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCategory: category => dispatch(updateCategory(category)),
    getAllProducts: (category, page) => dispatch(fetchAllProducts(category, page))
  };
};

LandingPage.propTypes = {
  isLoggedIn: PropTypes.bool,
  getAllProducts: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
