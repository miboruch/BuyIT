import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../atoms/Button/Button';
import { searchProductByQuery } from '../../../actions/productAction';
import FormLine from '../../molecules/FormLine/FormLine';
import { SearchSchema } from '../../../utils/schemaValidation';
import { Form, Formik } from 'formik';
import BackgroundWrapper from '../../atoms/BackgroundWrapper/BackgroundWrapper';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import { searchToggle } from '../../../actions/sliderBoxesAction';

const StyledSearchWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  background: ${({ theme }) => theme.color.backgroundLight};
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 1s ease;
  z-index: 900;

  ${({ theme }) => theme.mq.standard} {
    width: 35%;
  }
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  z-index: 500;
`;

const StyledContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 2rem;
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

const StyledForm = styled(Form)`
  width: 90%;
`;

const Search = ({ searchProductByQuery, isSearchOpen, searchToggle }) => {
  return (
    <>
      <BackgroundWrapper isOpen={isSearchOpen} />
      <StyledSearchWrapper isOpen={isSearchOpen}>
        <CloseButtonWrapper>
          <CloseButton setBoxState={searchToggle} />
        </CloseButtonWrapper>
        <StyledContentWrapper>
          <Formik
            initialValues={{ query: '' }}
            onSubmit={({ query }) => {
              searchProductByQuery(query.trim());
            }}
            validationSchema={SearchSchema}
          >
            {({ handleChange, handleBlur, errors }) => (
              <StyledForm>
                <StyledHeading>SEARCH</StyledHeading>
                <FormLine
                  labelText={errors.query ? errors.query : 'name'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  inputType='text'
                  name='query'
                  colorTheme='light'
                />
                <ButtonWrapper>
                  <Button
                    buttonTheme='dark'
                    text='Search'
                    type='submit'
                    onClick={() => searchToggle()}
                  />
                </ButtonWrapper>
              </StyledForm>
            )}
          </Formik>
        </StyledContentWrapper>
      </StyledSearchWrapper>
    </>
  );
};

const mapStateToProps = ({ sliderBoxesReducer: { isSearchOpen } }) => {
  return { isSearchOpen };
};

const mapDispatchToProps = dispatch => {
  return {
    searchProductByQuery: query => dispatch(searchProductByQuery(query)),
    searchToggle: () => dispatch(searchToggle())
  };
};

Search.propTypes = {
  searchProductByQuery: PropTypes.func.isRequired,
  searchToggle: PropTypes.func,
  isSearchOpen: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
