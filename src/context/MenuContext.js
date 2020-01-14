import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const MenuContext = React.createContext({
  isMenuOpen: false,
  isCartOpen: false,
  isSearchOpen: false
});

const MenuContextProvider = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  return (
    <MenuContext.Provider
      value={{
        isMenuOpen: isMenuOpen,
        toggleMenu: toggleMenu,
        setMenuState: setMenuOpen,
        isCartOpen: isCartOpen,
        toggleCart: toggleCart,
        isSearchOpen: isSearchOpen,
        toggleSearch: toggleSearch
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

MenuContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default MenuContextProvider;
