import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import { updateCategory } from '../../../actions/productAction';

const StyledWrapper = styled.div`
  width: 100%;
`;

const StyledParagraph = styled(Paragraph)`
  font-weight: lighter;
  font-size: 40px;
`;

const ProductResultTemplate = ({ children, category, products, match, updateCategory }) => {
  console.log(products);
  useEffect(() => {
    updateCategory(match.params.category);
  }, [match]);
  return (
    <StyledWrapper>
      {products.length !== 0 ? (
        <StyledParagraph>shop/{category}</StyledParagraph>
      ) : (
        <StyledParagraph>loading...</StyledParagraph>
      )}

      {children}
    </StyledWrapper>
  );
};

const mapStateToProps = ({ productReducer: { category, products } }) => {
  return { category, products };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCategory: category => dispatch(updateCategory(category))
  };
};

ProductResultTemplate.propTypes = {
  children: PropTypes.node.isRequired,
  category: PropTypes.string
};

const ProductResultTemplateWithRouter = withRouter(ProductResultTemplate);

export default connect(mapStateToProps, mapDispatchToProps)(ProductResultTemplateWithRouter);
