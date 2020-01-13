import React, { useContext } from 'react';
import styled from 'styled-components';
import Hamburger from '../../atoms/Hamburger/Hamburger';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { ReactSVG } from 'react-svg';
import cartIcon from '../../../assets/icons/cart-icon.svg';
import { MenuContext } from '../../../context/MenuContext';

const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
  background: transparent;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSpan = styled.span`
  color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #fff;
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: lighter;
  font-size: 24px;
`;

const StyledCartButton = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  top: 50%;
  right: 1rem;
  transform: translate(-50%, -50%);
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
`;
const StyledIcon = styled(ReactSVG)`
  fill: #fff;
`;

const Header = () => {
  const { isOpen, toggleMenu } = useContext(MenuContext);
  return (
    <StyledHeader>
      <Hamburger isOpen={isOpen} toggleMenu={toggleMenu} />
      <StyledParagraph>
        buy<StyledSpan>IT</StyledSpan>
      </StyledParagraph>
      <StyledCartButton>
        <StyledIcon src={cartIcon} />
      </StyledCartButton>
    </StyledHeader>
  );
};

export default Header;
