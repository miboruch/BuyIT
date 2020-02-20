import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactSVG } from 'react-svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Hamburger from '../../atoms/Hamburger/Hamburger';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import cartIcon from '../../../assets/icons/cart-icon.svg';
import searchIcon from '../../../assets/icons/search.svg';
import userIcon from '../../../assets/icons/user.svg';
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

const IconWrapper = styled.section`
  height: 100%;
  position: absolute;
  top: 50%;
  right: 2rem;
  display: flex;
  padding-left: 2rem;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  transform: translateY(-50%);
`;

const StyledIconButton = styled.button`
  width: 20px;
  height: 20px;
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  margin-left: 1rem;

  &:focus {
    outline: none;
  }

  ${({ theme }) => theme.mq.mobileL} {
    width: 25px;
    height: 25px;
  }
`;

const StyledCartButton = styled(StyledIconButton)`
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

const StyledIcon = styled(ReactSVG)`
  fill: ${({ iconTheme }) => (iconTheme === 'dark' ? '#000' : '#fff')};
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
  isSearchOpen,
  isLoggedIn,
  history
}) => {
  const isSearchOrCartOpen = isSearchOpen || isCartOpen || backgroundTheme === 'light';
  return (
    <StyledHeader>
      <Hamburger
        isOpen={isMenuOpen}
        toggleMenu={menuToggle}
        hamburgerTheme={isSearchOrCartOpen ? 'dark' : 'light'}
      />
      <Link to='/'>
        <StyledParagraph colorTheme={backgroundTheme}>
          buy<StyledSpan colorTheme={backgroundTheme}>IT</StyledSpan>
        </StyledParagraph>
      </Link>
      <IconWrapper>
        {isLoggedIn ? (
          <StyledIconButton onClick={() => history.push('/my-account')}>
            <StyledIcon src={userIcon} iconTheme={isSearchOrCartOpen ? 'dark' : 'light'} />
          </StyledIconButton>
        ) : null}
        {search ? (
          <StyledIconButton onClick={searchToggle} isOpen={isSearchOpen}>
            <StyledIcon src={searchIcon} iconTheme={isSearchOrCartOpen ? 'dark' : 'light'} />
          </StyledIconButton>
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
      </IconWrapper>
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
  isSearchOpen: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  history: PropTypes.object
};

const mapStateToProps = ({
  authenticationReducer: { isLoggedIn },
  cartReducer: { cart },
  sliderBoxesReducer: { isMenuOpen, isCartOpen, isSearchOpen }
}) => {
  return { cart, isMenuOpen, isCartOpen, isSearchOpen, isLoggedIn };
};

const mapDispatchToProps = dispatch => {
  return {
    menuToggle: () => dispatch(menuToggle()),
    cartToggle: () => dispatch(cartToggle()),
    searchToggle: () => dispatch(searchToggle())
  };
};

const HeaderWithRouter = withRouter(Header);

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithRouter);
