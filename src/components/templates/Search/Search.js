import React, { useEffect, useState } from 'react';
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

const AutocompleteBox = styled.div`
  width: 200px;
  max-height: 300px;
  overflow-y: scroll;
  background: #282c34;
  display: flex;
  flex-direction: column;
  border: none;
  position: absolute;
  z-index: 900;
  left: 0;
  bottom: 0;
  visibility: ${({ isContent }) => (isContent ? 'visible' : 'hidden')};
  opacity: ${({ isContent }) => (isContent ? 1 : 0)};
  transform: translateY(100%);
  transition: opacity 0.5s ease, visibility 0.5s ease;
`;

const FormLineWrapper = styled.div`
  position: relative;
`;

const StyledOptionButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  color: #fff;
  font-family: ${({ theme }) => theme.font.family.futura};
  background: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background-color: #181011;
    cursor: pointer;
  }
`;

const Search = ({ searchProductByQuery, isSearchOpen, searchToggle, products }) => {
  const result = products.map(item => item.name);

  const [isContent, setContent] = useState(false);
  const [isAccepted, setAccepted] = useState(false);

  useEffect(() => {
    setAccepted(false);
  }, [isSearchOpen]);

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
            {({ handleChange, handleBlur, errors, values, setFieldValue }) => {
              setContent(!!values.query);
              return (
                <StyledForm autoComplete='off'>
                  <StyledHeading>SEARCH</StyledHeading>
                  <FormLineWrapper>
                    <FormLine
                      labelText={errors.query ? errors.query : 'name'}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      colorTheme='light'
                      inputType='text'
                      name='query'
                      value={values.query}
                      autocomplete='off'
                    />
                    <AutocompleteBox isContent={isContent && !isAccepted}>
                      {result
                        .filter(item => item.includes(values.query))
                        .map((item, index) => (
                          <StyledOptionButton
                            key={index}
                            onClick={() => {
                              setFieldValue('query', item);
                              setAccepted(true);
                            }}
                          >
                            {item}
                          </StyledOptionButton>
                        ))}
                    </AutocompleteBox>
                  </FormLineWrapper>
                  <ButtonWrapper>
                    <Button
                      buttonTheme='dark'
                      text='Search'
                      type='submit'
                      onClick={() => searchToggle()}
                    />
                  </ButtonWrapper>
                </StyledForm>
              );
            }}
          </Formik>
        </StyledContentWrapper>
      </StyledSearchWrapper>
    </>
  );
};

const mapStateToProps = ({
  sliderBoxesReducer: { isSearchOpen },
  productReducer: { products }
}) => {
  return { isSearchOpen, products };
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
  isSearchOpen: PropTypes.bool,
  products: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
