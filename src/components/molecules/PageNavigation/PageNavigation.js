import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { fetchAllProducts } from '../../../actions/productAction';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NavigationWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 250px;
  padding-bottom: 2rem;
`;

const StyledParagraph = styled(Paragraph)`
  font-size: 16px;
`;

const StyledLinkPrevious = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  color: ${({ hide }) => (hide ? 'yellow' : '#fff')};
  font-size: 16px;
  padding: 0 2rem;
  display: ${({ hide }) => (hide ? 'none' : 'block')};
`;

const StyledLinkNext = styled(StyledLinkPrevious)`
  left: auto;
  right: 0;
`;

const PageNavigation = ({ pageNumber, totalProductsCounter, category, getAllProducts }) => {
  const [prevPage, setPrevPage] = useState(parseInt(pageNumber));
  const hidePrevious = parseInt(pageNumber) - 1 <= 0;
  const hideNext = parseInt(pageNumber) + 1 > Math.ceil(totalProductsCounter / 10);

  if (prevPage !== parseInt(pageNumber)) {
    getAllProducts(category, parseInt(pageNumber));
    setPrevPage(parseInt(pageNumber));
  }

  return (
    <StyledWrapper>
      <NavigationWrapper>
        <StyledLinkPrevious to={`/products/${category}?page=${pageNumber - 1}`} hide={hidePrevious}>
          PREV
        </StyledLinkPrevious>
        <StyledParagraph>
          {pageNumber} / {Math.ceil(totalProductsCounter / 10)}
        </StyledParagraph>
        <StyledLinkNext to={`/products/${category}?page=${++pageNumber}`} hide={hideNext}>
          NEXT
        </StyledLinkNext>
      </NavigationWrapper>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ productReducer: { totalProductsCounter } }) => {
  return { totalProductsCounter };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: (category, page) => dispatch(fetchAllProducts(category, page))
  };
};

PageNavigation.propTypes = {
  pageNumber: PropTypes.any.isRequired,
  totalProductsCounter: PropTypes.number,
  category: PropTypes.string.isRequired,
  getAllProducts: PropTypes.func
};

const PageNavigationWithRouter = withRouter(PageNavigation);

export default connect(mapStateToProps, mapDispatchToProps)(PageNavigationWithRouter);
