import React, { useContext } from 'react';
import styled from 'styled-components';
import Hamburger from '../../atoms/Hamburger/Hamburger';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { ReactSVG } from 'react-svg';
import cartIcon from '../../../assets/icons/cart-icon.svg';
import searchIcon from '../../../assets/icons/search.svg';
import { MenuContext } from '../../../context/MenuContext';
import { SearchContext } from '../../../context/SearchContext';
import { CartContext } from '../../../context/CartContext';

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

  &:focus {
    outline: none;
  }
`;

const StyledIcon = styled(ReactSVG)`
  fill: #fff;
`;

const StyledSearchButton = styled(StyledCartButton)`
  right: 50px;

  ${({ theme }) => theme.mq.standard} {
    right: 70px;
  }
`;

const Header = () => {
  const { isMenuOpen, toggleMenu } = useContext(MenuContext);
  const { isSearchOpen, toggleSearch } = useContext(SearchContext);
  const { isCartOpen, toggleCart } = useContext(CartContext);
  return (
    <StyledHeader>
      <Hamburger isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <StyledParagraph>
        buy<StyledSpan>IT</StyledSpan>
      </StyledParagraph>
      <StyledCartButton onClick={toggleCart}>
        <StyledIcon src={cartIcon} />
      </StyledCartButton>
      <StyledSearchButton onClick={toggleSearch}>
        <StyledIcon src={searchIcon} />
      </StyledSearchButton>
    </StyledHeader>
  );
};

export default Header;
