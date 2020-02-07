import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ReactSVG } from 'react-svg';
import backIcon from '../assets/icons/next.svg';
import { Link, withRouter } from 'react-router-dom';
import { Form, Formik } from 'formik';
import FormLine from '../components/molecules/FormLine/FormLine';
import Button from '../components/atoms/Button/Button';
import { categories } from '../utils/constants';
import { AddProductSchema } from '../utils/schemaValidation';
import { addProduct } from '../actions/productAction';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.backgroundLight};
  padding: 2rem;
  position: relative;
  display: flex;
  align-items: center;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 3rem;
  left: 2rem;
`;

const StyledFormWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.mq.standard} {
    width: 50%;
  }
`;

const StyledHeading = styled.h1`
  font-family: ${({ theme }) => theme.font.family.futura};
  letter-spacing: 2px;
  font-weight: lighter;
  font-size: 40px;
  margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
  margin-top: 4rem;
`;

const StyledIcon = styled(ReactSVG)`
  width: 20px;
  height: 20px;
  fill: #000;
  transform: rotate(180deg);
  cursor: pointer;
  position: relative;

  &::after {
    content: 'GO BACK';
    color: #000;
    width: 100px;
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: auto;
    right: -20px;
    transform: translate(-50%, -50%) rotate(180deg);
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;
    width: 100px;
    height: 20px;
    background-color: ${({ theme }) => theme.color.backgroundLight};
    transform: translateY(-50%);
    z-index: 2;
    transition: width 0.5s ease;
  }

  &:hover::before {
    width: 0;
    transition: width 0.5s ease;
  }
`;

const StyledForm = styled(Form)`
  width: 90%;
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

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #000;
  font-family: ${({ theme }) => theme.font.family.futura};
  font-size: 16px;
  color: #000;

  &:focus {
    outline: none;
  }
`;

const AddProductPage = ({ addProduct, history, token }) => {
  return (
    <StyledWrapper>
      <Link to='/products/all'>
        <CloseButtonWrapper>
          <StyledIcon src={backIcon} />
        </CloseButtonWrapper>
      </Link>
      <StyledFormWrapper>
        <Formik
          initialValues={{
            image: null,
            name: '',
            description: '',
            price: null,
            category: categories[0]
          }}
          onSubmit={({ image, name, description, price, category }) => {
            addProduct(image, name, description, price, category, token);
            history.push('/products/all');
          }}
          validationSchema={AddProductSchema}
        >
          {({ handleChange, handleBlur, errors, setFieldValue }) => (
            <StyledForm>
              <StyledHeading>ADD NEW PRODUCT</StyledHeading>
              <StyledLabel>{errors.name ? errors.name : 'name'}</StyledLabel>
              <FormLine
                onChange={handleChange}
                onBlur={handleBlur}
                inputType='text'
                name='name'
                colorTheme='light'
              />
              <StyledLabel>{errors.description ? errors.description : 'description'}</StyledLabel>
              <StyledTextArea onChange={handleChange} onBlur={handleBlur} name='description' />
              <StyledLabel>{errors.price ? errors.price : 'price'}</StyledLabel>
              <FormLine
                onChange={handleChange}
                onBlur={handleBlur}
                inputType='number'
                step='0.01'
                name='price'
                colorTheme='light'
              />
              <StyledLabel>category</StyledLabel>
              <StyledSelect name='category' onChange={handleChange}>
                {categories.map(item => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </StyledSelect>
              <StyledLabel>{errors.image ? errors.image : 'image'}</StyledLabel>
              <FormLine
                onChange={event => {
                  setFieldValue('image', event.currentTarget.files[0]);
                }}
                onBlur={handleBlur}
                inputType='file'
                name='file'
                colorTheme='light'
              />
              <ButtonWrapper>
                <Button buttonTheme='dark' text='Add' type='submit' />
              </ButtonWrapper>
            </StyledForm>
          )}
        </Formik>
      </StyledFormWrapper>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ authenticationReducer: { token } }) => {
  return { token };
};

const mapDispatchToProps = dispatch => {
  return {
    addProduct: (image, name, description, price, category, token) =>
      dispatch(addProduct(image, name, description, price, category, token))
  };
};

AddProductPage.propTypes = {
  addProduct: PropTypes.func,
  token: PropTypes.string
};

const AddProductPageWithRouter = withRouter(AddProductPage);

export default connect(mapStateToProps, mapDispatchToProps)(AddProductPageWithRouter);
