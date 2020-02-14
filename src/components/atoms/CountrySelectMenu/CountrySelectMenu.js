import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { countries } from 'countries-list';

const countriesArray = Object.values(countries).map(item => item.name);

const StyledSelect = styled.select`
  width: 100%;
  height: 40px;
  background: transparent;
  border: none;
  border-bottom: ${({ colorTheme }) =>
    colorTheme === 'dark' ? '1px solid #fff' : '1px solid #000'};
  font-family: ${({ theme }) => theme.font.family.futura};
  font-size: 16px;
  color: ${({ colorTheme }) => (colorTheme === 'dark' ? '#fff' : '#000')};
`;

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.font.family.futura};
  color: ${({ colorTheme }) => (colorTheme === 'dark' ? '#fff' : '#000')}
  font-size: 13px;
`;

const CountrySelectMenu = ({ formFieldName, handleChange, colorTheme, defaultValue }) => {
  return (
    <>
      <StyledLabel colorTheme={colorTheme}>Country</StyledLabel>
      <StyledSelect
        name={formFieldName}
        onChange={handleChange}
        colorTheme={colorTheme}
        defaultValue={defaultValue}
      >
        {countriesArray.map(item => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </StyledSelect>
    </>
  );
};

CountrySelectMenu.propTypes = {
  formFieldName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  colorTheme: PropTypes.oneOf(['light', 'dark']),
  defaultValue: PropTypes.string
};

CountrySelectMenu.defaultProps = {
  defaultValue: 'Andorra'
};

export default CountrySelectMenu;
