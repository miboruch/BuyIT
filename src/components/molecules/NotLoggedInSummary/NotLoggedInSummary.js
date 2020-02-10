import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NotLoggedInOrderSchema } from '../../../utils/schemaValidation';
import { orderNotLoggedIn } from '../../../utils/contentArrays';
import FormLine from '../FormLine/FormLine';
import Button from '../../atoms/Button/Button';
import { Form, Formik } from 'formik';
import { countries } from 'countries-list';

const countriesArray = Object.values(countries).map(item => item.name);

const StyledWrapper = styled.div`
  width: 100%;
  padding: 2rem;
`;

const StyledForm = styled(Form)`
  width: 100%;
  position: relative;
`;

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
  margin-bottom: 3rem;
`;

const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.font.family.futura};
  color: rgba(0, 0, 0, 0.7);
  font-size: 13px;
`;

const NotLoggedInSummary = () => {
  return (
    <StyledWrapper>
      <Formik
        initialValues={{
          email: '',
          name: '',
          lastName: '',
          address: '',
          city: '',
          country: countriesArray[0]
        }}
        onSubmit={({ email, name, lastName, city, address, country }) =>
          console.log(email, name, lastName, city, address, country)
        }
        validationSchema={NotLoggedInOrderSchema}
      >
        {({ handleChange, handleBlur, errors }) => {
          const orderInputData = orderNotLoggedIn(errors);
          return (
            <StyledForm>
              {orderInputData.map(item => (
                <FormLine
                  labelText={item.labelText}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputType={item.inputType}
                  name={item.name}
                  key={item.name}
                  colorTheme='light'
                />
              ))}
              <StyledLabel>Country</StyledLabel>
              <StyledSelect name='country' onChange={handleChange}>
                {countriesArray.map(item => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </StyledSelect>
              <Button buttonTheme='dark' text='Submit' type='submit' />
            </StyledForm>
          );
        }}
      </Formik>
    </StyledWrapper>
  );
};

export default NotLoggedInSummary;
