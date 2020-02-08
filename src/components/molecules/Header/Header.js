import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Hamburger from '../../atoms/Hamburger/Hamburger';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { ReactSVG } from 'react-svg';
import { connect } from 'react-redux';
import cartIcon from '../../../assets/icons/cart-icon.svg';
import searchIcon from '../../../assets/icons/search.svg';
import { useScrollPosition } from '../../../utils/customHooks';
import { menuToggle, cartToggle, searchToggle } from '../../../actions/sliderBoxesAction';

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
  right: ${({ search }) => (search ? '50px' : '1rem')};
  left: auto;

  ${({ theme }) => theme.mq.standard} {
      right: ${({ search }) => (search ? '65px' : '1rem')};
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

const Header = ({
  backgroundTheme,
  search,
  cart,
  menuToggle,
  cartToggle,
  searchToggle,
  isMenuOpen,
  isCartOpen,
  isSearchOpen
}) => {
  const isOnTop = useScrollPosition();

  const isSearchOrCartOpen = isSearchOpen || isCartOpen || backgroundTheme === 'light';
  return (
    <StyledHeader isOnTop={isOnTop}>
      <Hamburger
        isOpen={isMenuOpen}
        toggleMenu={menuToggle}
        hamburgerTheme={isSearchOrCartOpen ? 'dark' : 'light'}
      />
      <StyledParagraph colorTheme={backgroundTheme}>
        buy<StyledSpan colorTheme={backgroundTheme}>IT</StyledSpan>
      </StyledParagraph>
      {search ? (
        <StyledSearchButton onClick={searchToggle} isOpen={isSearchOpen}>
          <StyledIcon src={searchIcon} iconTheme={isSearchOrCartOpen ? 'dark' : 'light'} />
        </StyledSearchButton>
      ) : null}
      <StyledCartButton
        onClick={cartToggle}
        isOpen={isCartOpen}
        search={search}
        cartItemsCounter={
          localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')).length
            : cart.length
        }
      >
        <StyledIcon src={cartIcon} iconTheme={isSearchOrCartOpen ? 'dark' : 'light'} />
      </StyledCartButton>
    </StyledHeader>
  );
};

Header.propTypes = {
  backgroundTheme: PropTypes.oneOf(['light', 'dark']),
  search: PropTypes.bool,
  cart: PropTypes.array,
  menuToggle: PropTypes.func,
  cartToggle: PropTypes.func,
  searchToggle: PropTypes.func,
  isCartOpen: PropTypes.bool,
  isMenuOpen: PropTypes.bool,
  isSearchOpen: PropTypes.bool
};

const mapStateToProps = ({
  cartReducer: { cart },
  sliderBoxesReducer: { isMenuOpen, isCartOpen, isSearchOpen }
}) => {
  return { cart, isMenuOpen, isCartOpen, isSearchOpen };
};

const mapDispatchToProps = dispatch => {
  return {
    menuToggle: () => dispatch(menuToggle()),
    cartToggle: () => dispatch(cartToggle()),
    searchToggle: () => dispatch(searchToggle())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
