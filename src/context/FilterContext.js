import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const FilterContext = React.createContext({
  isFilterOpen: false
});

const FilterContextProvider = ({ children }) => {
  const [isFilterOpen, setFilterState] = useState(false);

  const toggleFilter = () => {
    setFilterState(!isFilterOpen);
  };

  return (
    <FilterContext.Provider
      value={{
        isFilterOpen: isFilterOpen,
        setFilterState: setFilterState,
        toggleFilter: toggleFilter
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

FilterContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default FilterContextProvider;
