import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const CartContext = React.createContext({
  isCartOpen: false
});

const CartContextProvider = ({ children }) => {
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen: isCartOpen,
        toggleCart: toggleCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CartContextProvider;
