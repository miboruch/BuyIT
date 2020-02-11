import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FormLine from '../../molecules/FormLine/FormLine';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '../../atoms/Button/Button';
import { userUpdate } from '../../../actions/authenticationAction';
import { UpdateSchema } from '../../../utils/schemaValidation';
import { updateInputArrays } from '../../../utils/contentArrays';
import CountrySelectMenu from '../../atoms/CountrySelectMenu/CountrySelectMenu';

const StyledForm = styled(Form)`
  width: 90%;
  transition: 1s ease all;
`;

const EditTemplate = ({ userInfo, userUpdate, token, history }) => {
  return (
    <Formik
      initialValues={{
        name: userInfo.name,
        lastName: userInfo.lastName,
        address: userInfo.address,
        city: userInfo.city,
        country: userInfo.country
      }}
      onSubmit={({ name, lastName, address, city, country }) => {
        userUpdate(name, lastName, city, address, country, token);
        history.push('/my-account');
      }}
      validationSchema={UpdateSchema}
    >
      {({ handleChange, handleBlur, errors, values }) => {
        const updateInput = updateInputArrays(errors, values);
        return (
          <StyledForm>
            {updateInput.map(item => (
              <FormLine
                key={item.name}
                labelText={item.labelText}
                onChange={handleChange}
                onBlur={handleBlur}
                inputType='text'
                name={item.name}
                colorTheme='light'
                value={item.value}
              />
            ))}
            <CountrySelectMenu handleChange={handleChange} formFieldName='country' />
            <Button buttonTheme='dark' text='Save' type='submit' />
          </StyledForm>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = ({ authenticationReducer: { userInfo, token } }) => {
  return { userInfo, token };
};

const mapDispatchToProps = dispatch => {
  return {
    userUpdate: (name, lastName, city, address, country, token) =>
      dispatch(userUpdate(name, lastName, city, address, country, token))
  };
};

EditTemplate.propTypes = {
  userInfo: PropTypes.object,
  userUpdate: PropTypes.func,
  token: PropTypes.string,
  history: PropTypes.object
};

const EditTemplateWithRouter = withRouter(EditTemplate);

export default connect(mapStateToProps, mapDispatchToProps)(EditTemplateWithRouter);
