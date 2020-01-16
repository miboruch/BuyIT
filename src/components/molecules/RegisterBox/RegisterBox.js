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

const StyledMiddleParagraph = styled(Paragraph)`
  margin: 2rem 0;
`;

const StyledForm = styled(Form)`
  width: 90%;
`;

const RegisterBox = ({ registerError, userRegister, history }) => {
  return (
    <StyledWrapper>
      <Formik
        initialValues={{
          login: '',
          email: '',
          password: '',
          name: '',
          lastName: '',
          address: '',
          city: ''
        }}
        onSubmit={({ login, email, password, name, lastName, city, address }) =>
          userRegister(login, email, password, name, lastName, city, address, history)
        }
        validationSchema={RegisterSchema}
      >
        {({ handleChange, handleBlur, errors }) => {
          /* Fix this - DRY */
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
              <Button buttonTheme='light' text='Register' type='submit' />
              <StyledErrorParagraph>
                {registerError ? 'Some data are invalid' : null}
              </StyledErrorParagraph>
            </StyledForm>
          );
        }}
      </Formik>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { registerError } }) => {
  return { registerError };
};

const mapDispatchToProps = dispatch => {
  return {
    userRegister: (login, email, password, name, lastName, city, address, history) =>
      dispatch(userRegister(login, email, password, name, lastName, city, address, history))
  };
};

RegisterBox.propTypes = {
  registerError: PropTypes.string,
  userRegister: PropTypes.func.isRequired
};

const RegisterBoxWithRouter = withRouter(RegisterBox);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterBoxWithRouter);
