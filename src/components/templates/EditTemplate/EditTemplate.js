import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FormLine from '../../molecules/FormLine/FormLine';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import Button from '../../atoms/Button/Button';

const StyledForm = styled(Form)`
  width: 90%;
`;

const EditTemplate = ({ userInfo }) => {
  return (
    <Formik
      initialValues={{
        name: userInfo.name,
        lastName: userInfo.lastName,
        address: userInfo.address,
        city: userInfo.city
      }}
      onSubmit={data => {
        console.log(data);
      }}
    >
      {({ handleChange, handleBlur, errors, values }) => (
        <StyledForm>
          <FormLine
            labelText={errors.query ? errors.query : 'name'}
            onChange={handleChange}
            onBlur={handleBlur}
            inputType='text'
            name='query'
            colorTheme='light'
            value={values.query}
          />
          <Button buttonTheme='dark' text='Search' type='submit' onClick={() => toggleSearch()} />
        </StyledForm>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ authenticationReducer: { userInfo } }) => {
  return { userInfo };
};

EditTemplate.propTypes = {
  userInfo: PropTypes.object
};

export default connect(mapStateToProps)(EditTemplate);
