import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NotLoggedInOrderSchema } from '../../../utils/schemaValidation';
import { orderNotLoggedIn } from '../../../utils/contentArrays';
import FormLine from '../FormLine/FormLine';
import Button from '../../atoms/Button/Button';
import { Form, Formik } from 'formik';
import CountrySelectMenu from '../../atoms/CountrySelectMenu/CountrySelectMenu';
import {countriesArray} from "../../../utils/constants";

const StyledWrapper = styled.div`
  width: 100%;
  padding: 2rem;
`;

const StyledForm = styled(Form)`
  width: 100%;
  position: relative;
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
              <CountrySelectMenu handleChange={handleChange} formFieldName='country' />
              <Button buttonTheme='dark' text='Submit' type='submit' />
            </StyledForm>
          );
        }}
      </Formik>
    </StyledWrapper>
  );
};

export default NotLoggedInSummary;
