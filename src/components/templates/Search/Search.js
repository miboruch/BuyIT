import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '../../atoms/Button/Button';
import { SearchContext } from '../../../context/SearchContext';
import { searchProductByQuery } from '../../../actions/productAction';
import FormLine from '../../molecules/FormLine/FormLine';
import { SearchSchema } from '../../../utils/schemaValidation';
import { Form, Formik } from 'formik';

const StyledSearchWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.color.backgroundLight};
  transform: translateY(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 0.5s ease-in-out;
  z-index: 900;
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

const Search = ({ searchProductByQuery }) => {
  const { isSearchOpen } = useContext(SearchContext);
  return (
    <StyledSearchWrapper isOpen={isSearchOpen}>
      <StyledContentWrapper>
        <Formik
          initialValues={{ query: '' }}
          onSubmit={({ query }) => searchProductByQuery(query.trim())}
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
                <Button buttonTheme='dark' text='Search' type='submit' />
              </ButtonWrapper>
            </StyledForm>
          )}
        </Formik>
      </StyledContentWrapper>
    </StyledSearchWrapper>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    searchProductByQuery: query => dispatch(searchProductByQuery(query))
  };
};

Search.propTypes = {
  searchProductByQuery: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Search);
