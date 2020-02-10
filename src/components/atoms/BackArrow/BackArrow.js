import React from 'react';
import styled from 'styled-components';
import { ReactSVG } from 'react-svg';
import backIcon from '../../../assets/icons/next.svg';

const Icon = styled(ReactSVG)`
  width: 20px;
  height: 20px;
  fill: #000;
  transform: rotate(180deg);
  cursor: pointer;
  position: relative;

  &::after {
    content: 'GO BACK';
    color: #000;
    width: 100px;
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: auto;
    right: -20px;
    transform: translate(-50%, -50%) rotate(180deg);
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;
    width: 100px;
    height: 20px;
    background-color: ${({ theme }) => theme.color.backgroundLight};
    transform: translateY(-50%);
    z-index: 2;
    transition: width 0.5s ease;
  }

  &:hover::before {
    width: 0;
    transition: width 0.5s ease;
  }
`;

const BackArrow = () => {
  return <Icon src={backIcon} />;
};

export default BackArrow;
