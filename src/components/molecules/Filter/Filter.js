import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { categories } from '../../../utils/constants';
import BackgroundWrapper from '../../atoms/BackgroundWrapper/BackgroundWrapper';
import { fetchAllProducts, updateCategory } from '../../../actions/productAction';
import { filterToggle, filterToggleFunction } from '../../../actions/sliderBoxesAction';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: #f1f1f1;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 1s ease;
  z-index: 1050 !important;
  display: flex;
  align-items: center;
  padding-left: 2rem;

  ${({ theme }) => theme.mq.standard} {
    width: 35%;
  }
`;

const StyledHeading = styled.h1`
  font-family: ${({ theme }) => theme.font.family.futura};
  letter-spacing: 2px;
  padding-bottom: 1rem;
  font-weight: lighter;
  font-size: 40px;
  color: #1d1d1d;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  z-index: 500;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const StyledParagraphTitle = styled(Paragraph)`
  color: #1d1d1d;
  font-family: ${({ theme }) => theme.font.family.avanti};
  letter-spacing: 2px;
  margin-bottom: 2rem;
`;

const StyledParagraph = styled(Paragraph)`
  color: #1d1d1d;
  cursor: pointer;
  padding: 0.5rem 0 0.5rem 2rem;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    border: 1px solid #1d1d1d;
    background-color: transparent;
    transform: translateY(-50%);
    transition: all 0.5s ease;
  }

  &:hover::before {
    background-color: #1d1d1d;
  }
`;

const Filter = ({
  getAllProducts,
  category,
  categoryUpdate,
  filterToggleFunction,
  isFilterOpen
}) => {
  return (
    <>
      <BackgroundWrapper isOpen={isFilterOpen} />
      <StyledWrapper isOpen={isFilterOpen}>
        <CloseButtonWrapper>
          <CloseButton setBoxState={filterToggleFunction} />
        </CloseButtonWrapper>
        <ContentWrapper>
          <StyledHeading>Filter</StyledHeading>
          <StyledParagraphTitle medium>By category:</StyledParagraphTitle>
          {categories.map(item => {
            return (
              <Link to={`/products/${item}?page=1`} key={item}>
                <StyledParagraph
                  onClick={() => {
                    categoryUpdate(item);
                    filterToggleFunction(false);
                    if (category !== item) {
                      getAllProducts(item, 1);
                    }
                  }}
                >
                  {item}
                </StyledParagraph>
              </Link>
            );
          })}
        </ContentWrapper>
      </StyledWrapper>
    </>
  );
};

const mapStateToProps = ({
  productReducer: { category },
  sliderBoxesReducer: { isFilterOpen }
}) => {
  return { category, isFilterOpen };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: (category, page) => dispatch(fetchAllProducts(category, page)),
    categoryUpdate: category => dispatch(updateCategory(category)),
    filterToggle: () => dispatch(filterToggle()),
    filterToggleFunction: bool => dispatch(filterToggleFunction(bool))
  };
};

Filter.propTypes = {
  getAllProducts: PropTypes.func,
  category: PropTypes.string,
  categoryUpdate: PropTypes.func,
  filterToggleFunction: PropTypes.func,
  isFilterOpen: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
