import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProductResultTemplate from '../components/templates/ProductResultTemplate/ProductResultTemplate';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';
import SingleProductCart from '../components/molecules/SingleProductCart/SingleProductCart';
import Spinner from '../components/atoms/Spinner/Spinner';

const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
`;

const ProductResult = ({ products }) => {
  return (
    <MainTemplate>
      {products ? (
        <ProductResultTemplate>
          <p>hello</p>
          <ProductWrapper>
            {products.map(item => (
              <SingleProductCart
                name={item.name}
                image={item.image}
                id={item._id}
                price={item.price}
                userLogin={item.userLogin}
                key={item._id}
              />
            ))}
          </ProductWrapper>
        </ProductResultTemplate>
      ) : (
        <Spinner />
      )}
    </MainTemplate>
  );
};

const mapStateToProps = ({ productReducer: { products } }) => {
  return { products };
};

ProductResult.propTypes = {
  products: PropTypes.array
};

export default connect(mapStateToProps)(ProductResult);
