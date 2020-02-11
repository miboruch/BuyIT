import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import FormLine from '../FormLine/FormLine';
import Button from '../../atoms/Button/Button';
import { RegisterSchema } from '../../../utils/schemaValidation';
import { userRegister } from '../../../actions/authenticationAction';
import { registerInputArray } from '../../../utils/contentArrays';
import Spinner from '../../atoms/Spinner/Spinner';
import { countriesArray } from '../../../utils/constants';
import CountrySelectMenu from '../../atoms/CountrySelectMenu/CountrySelectMenu';

const StyledWrapper = styled.div`
  width: 90%;
  min-height: 90vh;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  margin: 4rem auto;
  padding: 3rem;

  ${({ theme }) => theme.mq.standard} {
    margin: 0 3rem;
    height: 90vh;
  }
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: lighter;
  font-size: 40px;
  margin-bottom: 5rem;
`;

const StyledErrorParagraph = styled(Paragraph)`
  color: tomato;
  font-size: 13px;
  margin-top: 2rem;
  transition: 0.5s ease all;
`;

const StyledForm = styled(Form)`
  width: 90%;
  position: relative;
`;

const RegisterBox = ({ registerError, userRegister, history, loading }) => {
  return (
    <StyledWrapper>
      {loading ? (
        <Spinner />
      ) : (
        <Formik
          initialValues={{
            email: '',
            password: '',
            name: '',
            lastName: '',
            address: '',
            city: '',
            country: countriesArray[0]
          }}
          onSubmit={({ email, password, name, lastName, city, address, country }) =>
            userRegister(email, password, name, lastName, city, address, country, history)
          }
          validationSchema={RegisterSchema}
        >
          {({ handleChange, handleBlur, errors }) => {
            const registerInputData = registerInputArray(errors);
            return (
              <StyledForm>
                <StyledParagraph>OR REGISTER</StyledParagraph>
                {registerInputData.map(item => (
                  <FormLine
                    labelText={item.labelText}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    inputType={item.inputType}
                    name={item.name}
                    key={item.name}
                  />
                ))}
                <CountrySelectMenu
                  handleChange={handleChange}
                  formFieldName='country'
                  colorTheme='dark'
                />
                <Button buttonTheme='light' text='Register' type='submit' />
                <StyledErrorParagraph>
                  {registerError ? 'Some data are invalid' : null}
                </StyledErrorParagraph>
              </StyledForm>
            );
          }}
        </Formik>
      )}
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { registerError, loading } }) => {
  return { registerError, loading };
};

const mapDispatchToProps = dispatch => {
  return {
    userRegister: (email, password, name, lastName, city, address, country, history) =>
      dispatch(userRegister(email, password, name, lastName, city, address, country, history))
  };
};

RegisterBox.propTypes = {
  registerError: PropTypes.string,
  userRegister: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  history: PropTypes.object
};

const RegisterBoxWithRouter = withRouter(RegisterBox);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterBoxWithRouter);
