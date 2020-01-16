import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ProductResultTemplate from '../components/templates/ProductResultTemplate/ProductResultTemplate';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';

const ProductResult = () => {
  return (
    <MainTemplate>
      <ProductResultTemplate></ProductResultTemplate>
    </MainTemplate>
  );
};

export default ProductResult;
