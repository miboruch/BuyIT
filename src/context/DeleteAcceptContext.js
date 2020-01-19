import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const DeleteAcceptContext = React.createContext({
  isBoxOpen: false,
  productId: null,
  productName: ''
});

const DeleteAcceptContextProvider = ({ children }) => {
  const [isBoxOpen, setBoxState] = useState(false);
  const [productId, setProductId] = useState(null);
  const [productName, setProductName] = useState('');

  return (
    <DeleteAcceptContext.Provider
      value={{
        isBoxOpen,
        setBoxState,
        productId,
        setProductId,
        productName,
        setProductName
      }}
    >
      {children}
    </DeleteAcceptContext.Provider>
  );
};

DeleteAcceptContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default DeleteAcceptContextProvider;
