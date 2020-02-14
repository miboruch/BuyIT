import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CheckboxWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  margin: 3rem 0;
`;

const StyledInput = styled.input`
  width: 20px;
  height: 20px;
  background: transparent;
  border: 1px solid #282c34;
  margin-right: 1rem;
`;

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.font.family.futura};
  color: ${({ colorTheme }) => (colorTheme === 'dark' ? '#fff' : '#000')}
  font-size: 13px;
`;

const FormCheckbox = ({ name, onChange }) => {
  return (
    <CheckboxWrapper>
      <StyledInput type='checkbox' name={name} onChange={onChange} />
      <StyledLabel>I agree to the Terms, Conditions and the Privacy Policy</StyledLabel>
    </CheckboxWrapper>
  );
};

FormCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default FormCheckbox;
