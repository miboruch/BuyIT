import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const SearchContext = React.createContext({
  isSearchOpen: false
});

const SearchContextProvider = ({ children }) => {
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  return (
    <SearchContext.Provider
      value={{
        isSearchOpen: isSearchOpen,
        toggleSearch: toggleSearch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

SearchContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default SearchContextProvider;
