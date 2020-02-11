import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import Button from '../../atoms/Button/Button';
import { Form, Formik } from 'formik';
import { NotLoggedInOrderSchema } from '../../../utils/schemaValidation';
import { orderEditAddress } from '../../../utils/contentArrays';
import FormLine from '../FormLine/FormLine';
import { countries } from 'countries-list';
import CountrySelectMenu from '../../atoms/CountrySelectMenu/CountrySelectMenu';

const countriesArray = Object.values(countries).map(item => item.name);

const StyledWrapper = styled.div`
  width: 100%;
  padding-bottom: 2rem;
  position: relative;
`;

const StyledContentWrapper = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding-bottom: 2rem;
`;

const StyledTitleParagraph = styled.h1`
  font-size: 18px;
  color: #000;
  padding: 2rem 0;
`;

const StyledDataParagraph = styled(Paragraph)`
  color: #000;
  font-size: 15px;
`;

const StyledButtonWrapper = styled.div`
  margin-top: 1rem;
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

const LoggedInSummary = ({ userInfo }) => {
  const [isEditOpen, setEditOpen] = useState(false);
  return (
    <StyledWrapper>
      <Formik
        initialValues={{
          email: userInfo.email,
          name: userInfo.name,
          lastName: userInfo.lastName,
          address: userInfo.address,
          city: userInfo.city,
          country: userInfo.country
        }}
        onSubmit={({ email, name, lastName, city, address, country }) =>
          console.log(email, name, lastName, city, address, country)
        }
        validationSchema={NotLoggedInOrderSchema}
      >
        {({ handleChange, handleBlur, errors, values }) => {
          const orderInputData = orderEditAddress(errors);
          return (
            <StyledForm>
              <StyledContentWrapper>
                <StyledDataParagraph>Name: {values.name}</StyledDataParagraph>
                <StyledDataParagraph>Last name: {values.lastName}</StyledDataParagraph>
                <StyledDataParagraph>Email: {values.email}</StyledDataParagraph>
                <StyledDataParagraph>Address: {values.address}</StyledDataParagraph>
                <StyledDataParagraph>City: {values.city}</StyledDataParagraph>
                <StyledDataParagraph>Country: {values.country}</StyledDataParagraph>
              </StyledContentWrapper>
              <Button
                text='Edit shipping data'
                buttonTheme='dark'
                onClick={() => setEditOpen(!isEditOpen)}
              />
              {isEditOpen ? (
                <>
                  <StyledTitleParagraph>Edit</StyledTitleParagraph>
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
                </>
              ) : null}
              <StyledButtonWrapper>
                <Button buttonTheme='dark' text='Submit' type='submit' />
              </StyledButtonWrapper>
            </StyledForm>
          );
        }}
      </Formik>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { userInfo } }) => {
  return { userInfo };
};

LoggedInSummary.propTypes = {
  userInfo: PropTypes.object
};

export default connect(mapStateToProps)(LoggedInSummary);
