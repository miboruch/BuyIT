import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormLineWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 3rem;
`;

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.font.family.futura};
  position: absolute;
  top: 12px;
  left: 0;
  font-size: 13px;
  transition: transform 0.5s ease;
  transform-origin: left;
  color: ${({ colorTheme }) => (colorTheme === 'dark' ? '#777' : '#222')};
`;

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  background: transparent;
  border: none;
  border-bottom: ${({ colorTheme }) =>
    colorTheme === 'dark' ? '1px solid #777' : '1px solid #222'};
  font-family: ${({ theme }) => theme.font.family.futura};
  font-size: 16px;
  color: #222;

  &:focus {
    outline: none;
    border-bottom: 1px solid #8d8d8d;
  }
  &:focus ~ ${StyledLabel} {
    transform: scale(0.8) translateY(-20px);
  }
  &:valid ~ ${StyledLabel} {
    transform: scale(0.8) translateY(-20px);
  }
`;

const FormLine = ({
  labelText,
  onChange,
  onBlur,
  colorTheme = 'dark',
  inputType,
  name,
  id,
  ...rest
}) => {
  return (
    <FormLineWrapper>
      <StyledInput
        onChange={onChange}
        onBlur={onBlur}
        type={inputType}
        colorTheme={colorTheme}
        required
        name={name}
        {...rest}
        data-testid={id}
      />
      {labelText ? (
        <StyledLabel colorTheme={colorTheme} htmlFor={name}>
          {labelText}
        </StyledLabel>
      ) : null}
    </FormLineWrapper>
  );
};

FormLine.propTypes = {
  labelText: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  inputType: PropTypes.string,
  name: PropTypes.string,
  colorTheme: PropTypes.oneOf(['light', 'dark']),
  value: PropTypes.string,
  step: PropTypes.string,
  id: PropTypes.string
};

export default FormLine;
