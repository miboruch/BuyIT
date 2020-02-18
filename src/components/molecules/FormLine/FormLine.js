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
  color: ${({ colorTheme }) =>
    colorTheme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0,0,0,0.7)'};
  font-size: 13px;
  transition: transform 0.5s ease;
  transform-origin: left;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  background: transparent;
  border: none;
  border-bottom: ${({ colorTheme }) =>
    colorTheme === 'dark' ? '1px solid #fff' : '1px solid #000'};
  font-family: ${({ theme }) => theme.font.family.futura};
  font-size: 16px;
  color: ${({ colorTheme }) => (colorTheme === 'dark' ? '#fff' : '#000')};

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

const FormLine = ({ labelText, onChange, onBlur, colorTheme = 'dark', inputType, ...rest }) => {
  return (
    <FormLineWrapper>
      <StyledInput
        onChange={onChange}
        onBlur={onBlur}
        type={inputType}
        colorTheme={colorTheme}
        required
        {...rest}
      />
      {labelText ? <StyledLabel colorTheme={colorTheme}>{labelText}</StyledLabel> : null}
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
  step: PropTypes.string
};

export default FormLine;
