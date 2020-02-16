import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import Button from '../../atoms/Button/Button';
import { Form, Formik } from 'formik';
import { LoggedInOrderSchema } from '../../../utils/schemaValidation';
import { orderEditAddress } from '../../../utils/contentArrays';
import FormLine from '../FormLine/FormLine';
import CountrySelectMenu from '../../atoms/CountrySelectMenu/CountrySelectMenu';
import { loggedInSummaryData } from '../../../utils/contentArrays';
import { createOrderWithAccount } from '../../../actions/orderAction';
import Spinner from '../../atoms/Spinner/Spinner';
import FormCheckbox from '../../atoms/FormCheckbox/FormCheckbox';
import Toggle from '../../../providers/Toggle';

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

const StyledForm = styled(Form)`
  width: 100%;
  position: relative;
`;

const LoggedInSummary = ({
  userInfo,
  cart,
  totalPrice,
  createOrder,
  loading,
  history
}) => {
  return (
    <Toggle
      render={(isOpen, toggle) => (
        <StyledWrapper>
          {loading ? (
            <Spinner />
          ) : (
            <Formik
              initialValues={{
                email: userInfo.email,
                name: userInfo.name,
                lastName: userInfo.lastName,
                address: userInfo.address,
                city: userInfo.city,
                country: userInfo.country,
                accept: false
              }}
              onSubmit={({ city, address, country }) => {
                createOrder(cart, totalPrice, userInfo._id, address, city, country);
                history.push('/');
              }}
              validationSchema={LoggedInOrderSchema}
            >
              {({ handleChange, handleBlur, errors, values, setFieldValue }) => {
                const orderInputData = orderEditAddress(errors);
                const loggedInData = loggedInSummaryData(values);
                return (
                  <StyledForm>
                    <StyledContentWrapper>
                      {loggedInData.map(item => (
                        <StyledDataParagraph key={item.titleName}>
                          {item.titleName}: {item.result}
                        </StyledDataParagraph>
                      ))}
                    </StyledContentWrapper>
                    <Button
                      text='Edit shipping data'
                      buttonTheme='dark'
                      onClick={() => toggle()}
                    />
                    {isOpen ? (
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
                            value={values[item.name]}
                            colorTheme='light'
                          />
                        ))}
                        <CountrySelectMenu
                          handleChange={handleChange}
                          formFieldName='country'
                          defaultValue={values.country}
                        />
                      </>
                    ) : null}
                    <FormCheckbox
                      onChange={event => {
                        if (event.target.checked) {
                          setFieldValue('accept', true);
                        } else {
                          setFieldValue('accept', false);
                        }
                      }}
                      name='accept'
                    />
                    {values.accept ? (
                      <Button buttonTheme='dark' text='Submit' type='submit' />
                    ) : (
                      <Button buttonTheme='dark' text='Submit' type='submit' disabled />
                    )}
                  </StyledForm>
                );
              }}
            </Formik>
          )}
        </StyledWrapper>
      )}
    />
  );
};

const mapStateToProps = ({ authenticationReducer: { userInfo }, orderReducer: { loading } }) => {
  return { userInfo, loading };
};

const mapDispatchToProps = dispatch => {
  return {
    createOrder: (cart, totalPrice, userID, address, city, country) =>
      dispatch(createOrderWithAccount(cart, totalPrice, userID, address, city, country))
  };
};

LoggedInSummary.propTypes = {
  userInfo: PropTypes.object,
  cart: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired,
  userID: PropTypes.string,
  createOrder: PropTypes.func,
  loading: PropTypes.bool,
  history: PropTypes.object,
  isOpen: PropTypes.bool,
  toggleEdit: PropTypes.func
};

const LoggedInSummaryWithRouter = withRouter(LoggedInSummary);

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInSummaryWithRouter);
