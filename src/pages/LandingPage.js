import React from 'react';
import styled from 'styled-components';
import Button from '../components/atoms/Button/Button';
import background from '../assets/images/hero-min.jpg';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';

const StyledBackgroundImage = styled.div`
  width: 100%;
  height: 300px;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 50px;
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
`;

const LandingPage = () => {
  return (
    <MainTemplate>
      <StyledBackgroundImage />
      <p>hello</p>
      <Button text='Log in' />
    </MainTemplate>
  );
};

export default LandingPage;
