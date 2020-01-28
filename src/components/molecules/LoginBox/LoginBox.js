import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import FormLine from '../FormLine/FormLine';
import Button from '../../atoms/Button/Button';
import { userLogin } from '../../../actions/authenticationAction';
import { LoginSchema } from '../../../utils/schemaValidation';
import Spinner from '../../atoms/Spinner/Spinner';

const StyledWrapper = styled.div`
  width: 90%;
  height: 90vh;
  margin: auto;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 3rem;

  ${({ theme }) => theme.mq.standard} {
    width: 50%;
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
`;

const LoginBox = ({ userLogin, loginError, history, loading }) => {
  return (
    <StyledWrapper>
      {loading ? (
        <Spinner />
      ) : (
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={({ email, password }) => userLogin(email, password, history)}
          validationSchema={LoginSchema}
        >
          {({ handleChange, handleBlur, errors }) => (
            <StyledForm>
              <StyledParagraph>LOG IN</StyledParagraph>
              <FormLine
                labelText={errors.email ? errors.email : 'email'}
                onChange={handleChange}
                onBlur={handleBlur}
                inputType='text'
                name='email'
                colorTheme='light'
              />
              <FormLine
                labelText={errors.password ? errors.password : 'password'}
                onChange={handleChange}
                onBlur={handleBlur}
                inputType='password'
                name='password'
                colorTheme='light'
              />
              <Button buttonTheme='dark' text='Log in' type='submit' />
              <StyledErrorParagraph>
                {loginError ? 'Invalid email or password' : null}
              </StyledErrorParagraph>
            </StyledForm>
          )}
        </Formik>
      )}
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { loginError, loading } }) => {
  return { loginError, loading };
};

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (email, password, history) => dispatch(userLogin(email, password, history))
  };
};

LoginBox.propTypes = {
  loginError: PropTypes.string,
  userLogin: PropTypes.func.isRequired
};

const LoginBoxWithRouter = withRouter(LoginBox);

export default connect(mapStateToProps, mapDispatchToProps)(LoginBoxWithRouter);
