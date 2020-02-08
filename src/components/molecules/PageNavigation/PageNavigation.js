import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { Link } from 'react-router-dom';

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NavigationWrapper = styled.div`
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
  color: #fff;
  font-size: 16px;
  padding: 0 2rem;
  display: ${({ shouldHide }) => (shouldHide ? 'none' : 'block')};
`;

const StyledLinkNext = styled(StyledLinkPrevious)`
  display: ${({ shouldHide }) => (shouldHide ? 'none' : 'block')};
`;

const PageNavigation = ({ pageNumber, totalProductsCounter, category }) => {
  const hidePrevious = pageNumber - 1 <= 0;
  const hideNext = pageNumber + 1 > Math.ceil(totalProductsCounter / 10);
  return (
    <StyledWrapper>
      <NavigationWrapper>
        <StyledLinkPrevious
          to={`/products/${category}/page=${pageNumber - 1}`}
          shouldHide={hidePrevious}
        >
          PREV
        </StyledLinkPrevious>
        <StyledParagraph>
          {pageNumber} / {Math.ceil(totalProductsCounter / 10)}
        </StyledParagraph>
        <StyledLinkNext to={`/products/${category}/page=${pageNumber + 1}`} shouldHide={hideNext}>
          NEXT
        </StyledLinkNext>
      </NavigationWrapper>
    </StyledWrapper>
  );
};

const mapStateToProps = ({ productReducer: { totalProductsCounter } }) => {
  return { totalProductsCounter };
};

PageNavigation.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  totalProductsCounter: PropTypes.number,
  category: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(PageNavigation);
