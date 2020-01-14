import React from 'react';
import PropTypes from 'prop-types';
import MenuContextProvider from './MenuContext';
import SearchContextProvider from './SearchContext';
import CartContextProvider from './CartContext';

const MainContext = ({ children }) => {
  return (
    <>
      <MenuContextProvider>
        <SearchContextProvider>
          <CartContextProvider>{children}</CartContextProvider>
        </SearchContextProvider>
      </MenuContextProvider>
    </>
  );
};

MainContext.propTypes = {
  children: PropTypes.node.isRequired
};

export default MainContext;
