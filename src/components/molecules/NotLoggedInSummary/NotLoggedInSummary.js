import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NotLoggedInOrderSchema } from '../../../utils/schemaValidation';
import { orderNotLoggedIn } from '../../../utils/contentArrays';
import FormLine from '../FormLine/FormLine';
import Button from '../../atoms/Button/Button';
import { Form, Formik } from 'formik';
import CountrySelectMenu from '../../atoms/CountrySelectMenu/CountrySelectMenu';
import { countriesArray } from '../../../utils/constants';
import { createOrderWithoutAccount } from '../../../actions/orderAction';
import Spinner from '../../atoms/Spinner/Spinner';
import FormCheckbox from '../../atoms/FormCheckbox/FormCheckbox';

const StyledWrapper = styled.div`
  width: 100%;
  padding: 2rem;
`;

const StyledForm = styled(Form)`
  width: 100%;
  position: relative;

  ${({ theme }) => theme.mq.tablet} {
    width: 50%;
  }
`;

const NotLoggedInSummary = ({ cart, totalPrice, createOrder, loading, history }) => {
  return (
    <StyledWrapper>
      {loading ? (
        <Spinner />
      ) : (
        <Formik
          initialValues={{
            email: '',
            name: '',
            lastName: '',
            address: '',
            city: '',
            country: countriesArray[0],
            accept: false
          }}
          onSubmit={({ email, name, lastName, city, address, country }) => {
            createOrder(cart, totalPrice, name, lastName, email, address, city, country);
            history.push('/');
          }}
          validationSchema={NotLoggedInOrderSchema}
        >
          {({ handleChange, handleBlur, errors, values, setFieldValue }) => {
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
  );
};

const mapStateToProps = ({ orderReducer: { loading } }) => {
  return { loading };
};

const mapDispatchToProps = dispatch => {
  return {
    createOrder: (cart, totalPrice, name, lastName, email, address, city, country) =>
      dispatch(
        createOrderWithoutAccount(cart, totalPrice, name, lastName, email, address, city, country)
      )
  };
};

NotLoggedInSummary.propTypes = {
  cart: PropTypes.array.isRequired,
  totalPrice: PropTypes.number.isRequired,
  createOrder: PropTypes.func,
  loading: PropTypes.bool,
  history: PropTypes.object
};

const NotLoggedInSummaryWithRouter = withRouter(NotLoggedInSummary);

export default connect(mapStateToProps, mapDispatchToProps)(NotLoggedInSummaryWithRouter);
