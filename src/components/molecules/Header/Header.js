import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
  -webkit-text-stroke-color: ${({ colorTheme }) => (colorTheme === 'light' ? '#000' : '#fff')};
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: lighter;
  font-size: 24px;
  color: ${({ colorTheme }) => (colorTheme === 'light' ? '#000' : '#fff')};
`;

const StyledCartButton = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 50%;
  right: 1rem;
  transform: translate(-50%, -50%);
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: ${({ isOpen }) => (isOpen ? 901 : 1)};

  &:focus {
    outline: none;
  }

  ${({ theme }) => theme.mq.mobileL} {
    width: 25px;
    height: 25px;
  }
`;

const StyledIcon = styled(ReactSVG)`
  fill: ${({ iconTheme }) => (iconTheme === 'dark' ? '#000' : '#fff')};
`;

const StyledSearchButton = styled(StyledCartButton)`
  right: 50px;
  z-index: ${({ isOpen }) => (isOpen ? 901 : 1)};

  ${({ theme }) => theme.mq.standard} {
    right: 70px;
  }
`;

const Header = ({ backgroundTheme, search }) => {
  const { isMenuOpen, toggleMenu } = useContext(MenuContext);
  const { isSearchOpen, toggleSearch } = useContext(SearchContext);
  const { isCartOpen, toggleCart } = useContext(CartContext);

  const isSearchOrCartOpen = isSearchOpen || isCartOpen || backgroundTheme === 'light';
  return (
    <StyledHeader>
      <Hamburger
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        hamburgerTheme={isSearchOrCartOpen ? 'dark' : 'light'}
      />
      <StyledParagraph colorTheme={backgroundTheme}>
        buy<StyledSpan colorTheme={backgroundTheme}>IT</StyledSpan>
      </StyledParagraph>
      <StyledCartButton onClick={toggleCart} isOpen={isCartOpen}>
        <StyledIcon src={cartIcon} iconTheme={isSearchOrCartOpen ? 'dark' : 'light'} />
      </StyledCartButton>
      {search ? (
        <StyledSearchButton onClick={toggleSearch} isOpen={isSearchOpen}>
          <StyledIcon src={searchIcon} iconTheme={isSearchOrCartOpen ? 'dark' : 'light'} />
        </StyledSearchButton>
      ) : null}
    </StyledHeader>
  );
};

Header.propTypes = {
  backgroundTheme: PropTypes.oneOf(['light', 'dark']),
  search: PropTypes.bool
};

export default Header;
