import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

const rotate = keyframes`
0% { 
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const rotateReverse = keyframes`
  0% { 
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledSpinner = styled.div`
  display: block;
  position: relative;
  width: 150px;
  height: 150px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid transparent;
  border-top-color: #fff;
  animation: ${rotate} 1.7s linear infinite;
  z-index: 11;

  &:before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 1px solid transparent;
    border-top-color: #1d1d1d;
    animation: ${rotateReverse} 0.6s linear infinite;
  }

  &:after {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 1px solid transparent;
    border-top-color: #878787;
    animation: ${rotate} 1s linear infinite;
  }
`;

const Spinner = ({ id }) => (
  <SpinnerWrapper data-testid={id}>
    <StyledSpinner />
  </SpinnerWrapper>
);

Spinner.propTypes = {
  id: PropTypes.string
};

export default Spinner;
