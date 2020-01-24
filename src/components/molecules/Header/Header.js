import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Hamburger from '../../atoms/Hamburger/Hamburger';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { ReactSVG } from 'react-svg';
import { connect } from 'react-redux';
import cartIcon from '../../../assets/icons/cart-icon.svg';
import searchIcon from '../../../assets/icons/search.svg';
import { MenuContext } from '../../../context/MenuContext';
import { SearchContext } from '../../../context/SearchContext';
import { CartContext } from '../../../context/CartContext';
import { useScrollPosition } from '../../../utils/customHooks';

const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
  background-color: transparent;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.5s ease;
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

const StyledSearchButton = styled.button`
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

const StyledCartButton = styled(StyledSearchButton)`
  right: 50px;
  left: auto;

  ${({ theme }) => theme.mq.standard} {
    right: 65px;
  }
  
  &::before{
    content: '${({ cartItemsCounter }) => cartItemsCounter}';
    color: ${({ isOpen }) => (isOpen ? '#000' : '#fff')};
    font-weight: 500;
    position: absolute;
    font-size: 20px;
    font-family: ${({ theme }) => theme.font.family.futura};
    left: -20px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: ${({ cartItemsCounter }) => (cartItemsCounter !== 0 ? 'visible' : 'hidden')};
    opacity: ${({ cartItemsCounter }) => (cartItemsCounter !== 0 ? 1 : 0)};
    transition: opacity 0.5s ease, visibility 0.5s ease, color 0.5s ease;
  }
  
`;

const Header = ({ backgroundTheme, search, cart }) => {
  const { isMenuOpen, toggleMenu } = useContext(MenuContext);
  const { isSearchOpen, toggleSearch } = useContext(SearchContext);
  const { isCartOpen, toggleCart } = useContext(CartContext);

  const isOnTop = useScrollPosition();

  const isSearchOrCartOpen = isSearchOpen || isCartOpen || backgroundTheme === 'light';
  return (
    <StyledHeader isOnTop={isOnTop}>
      <Hamburger
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        hamburgerTheme={isSearchOrCartOpen ? 'dark' : 'light'}
      />
      <StyledParagraph colorTheme={backgroundTheme}>
        buy<StyledSpan colorTheme={backgroundTheme}>IT</StyledSpan>
      </StyledParagraph>
      {search ? (
        <StyledSearchButton onClick={toggleSearch} isOpen={isSearchOpen}>
          <StyledIcon src={searchIcon} iconTheme={isSearchOrCartOpen ? 'dark' : 'light'} />
        </StyledSearchButton>
      ) : null}
      <StyledCartButton onClick={toggleCart} isOpen={isCartOpen} cartItemsCounter={cart.length}>
        <StyledIcon src={cartIcon} iconTheme={isSearchOrCartOpen ? 'dark' : 'light'} />
      </StyledCartButton>
    </StyledHeader>
  );
};

Header.propTypes = {
  backgroundTheme: PropTypes.oneOf(['light', 'dark']),
  search: PropTypes.bool,
  cart: PropTypes.array
};

const mapStateToProps = ({ cartReducer: { cart } }) => {
  return { cart };
};

export default connect(mapStateToProps)(Header);
