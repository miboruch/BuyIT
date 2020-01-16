import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../components/atoms/Button/Button';
import background from '../assets/images/hero-min.jpg';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';

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

const LandingPage = () => {
  return (
    <MainTemplate>
      <StyledBackgroundImage />
      <ButtonWrapper>
        <Button text='See all products' />
      </ButtonWrapper>
      <StyledList>
        <StyledListItem>
          Look for any product you want, you can order without an account.
        </StyledListItem>
        <StyledListItem>
          You must have an account to add a new product to my database.
        </StyledListItem>
        <StyledListItem>
          If you click reserve, product will be reserved for you for 15 minutes.
        </StyledListItem>
      </StyledList>
      <ButtonWrapper>
        <Link to='/my-account'>
          <Button text='Log in' />
        </Link>
      </ButtonWrapper>
    </MainTemplate>
  );
};

export default LandingPage;
