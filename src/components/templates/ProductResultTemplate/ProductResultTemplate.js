import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { updateCategory } from '../../../actions/productAction';
import Button from '../../atoms/Button/Button';
import DeleteAcceptBox from '../../molecules/DeleteAcceptBox/DeleteAcceptBox';
import Filter from '../../molecules/Filter/Filter';
import { filterToggle } from '../../../actions/sliderBoxesAction';

const StyledWrapper = styled.div`
  width: 90%;
  min-height: 100vh;
  margin: auto;
  overflow: visible;
  padding-bottom: 4rem;
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: lighter;
  font-size: 40px;
  width: 200px;
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
`;

const StyledHeading = styled.h1`
  width: 90%;
  margin: auto;
  text-align: center;
  font-family: ${({ theme }) => theme.font.family.futura};
  letter-spacing: 2px;
  font-weight: lighter;
  font-size: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ProductResultTemplate = ({ children, category, products, isLoggedIn, filterToggle }) => {
  return (
    <>
      <StyledWrapper>
        <ButtonWrapper>
          <Button text='Filter' onClick={() => filterToggle()} />
        </ButtonWrapper>
        <ButtonWrapper>
          <Link to={isLoggedIn ? '/addProduct' : '/my-account'}>
            <Button text={isLoggedIn ? 'add new product' : 'log in'} />
          </Link>
        </ButtonWrapper>
        {products.length !== 0 ? (
          <>
            <StyledParagraph>shop/{category}</StyledParagraph>
            {children}
          </>
        ) : (
          <StyledHeading>Products not found</StyledHeading>
        )}
      </StyledWrapper>
      <DeleteAcceptBox />
      <Filter />
    </>
  );
};

const mapStateToProps = ({
  productReducer: { category, products },
  authenticationReducer: { isLoggedIn, token }
}) => {
  return { category, products, isLoggedIn, token };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCategory: category => dispatch(updateCategory(category)),
    filterToggle: () => dispatch(filterToggle())
  };
};

ProductResultTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  category: PropTypes.string,
  products: PropTypes.array,
  match: PropTypes.object,
  updateCategory: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  filterToggle: PropTypes.func
};

const ProductResultTemplateWithRouter = withRouter(ProductResultTemplate);

export default connect(mapStateToProps, mapDispatchToProps)(ProductResultTemplateWithRouter);
