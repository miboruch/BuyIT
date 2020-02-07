import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductResultTemplate from '../components/templates/ProductResultTemplate/ProductResultTemplate';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';
import SingleProductCart from '../components/molecules/SingleProductCart/SingleProductCart';
import Spinner from '../components/atoms/Spinner/Spinner';
import { useTrail } from 'react-spring';
import FilterContextProvider from '../context/FilterContext';
import DeleteAcceptContextProvider from '../context/DeleteAcceptContext';
import {
  addToProducts,
  fetchAllProducts,
  removeFromProducts,
  updateCategory
} from '../actions/productAction';
import { socket } from '../utils/constants';

const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: visible;
  position: relative;
`;

const ProductResult = ({ products, loading, categoryUpdate, match, getAllProducts }) => {
  useEffect(() => {
    categoryUpdate(match.params.category);
    getAllProducts(match.params.category);
  }, []);

  const productsTrail = useTrail(products.length, {
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
    delay: 700
  });

  return (
    <MainTemplate search>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <DeleteAcceptContextProvider>
            <FilterContextProvider>
              <ProductResultTemplate>
                <ProductWrapper>
                  {productsTrail.map((props, index) => (
                    <SingleProductCart
                      style={props}
                      product={products[index]}
                      key={products[index]._id}
                    />
                  ))}
                </ProductWrapper>
              </ProductResultTemplate>
            </FilterContextProvider>
          </DeleteAcceptContextProvider>
        </>
      )}
    </MainTemplate>
  );
};

const mapStateToProps = ({ productReducer: { products, loading } }) => {
  return { products, loading };
};

const mapDispatchToProps = dispatch => {
  return {
    categoryUpdate: category => dispatch(updateCategory(category)),
    getAllProducts: category => dispatch(fetchAllProducts(category)),
    removeFromProducts: productId => dispatch(removeFromProducts(productId))
  };
};

ProductResult.propTypes = {
  products: PropTypes.array,
  loading: PropTypes.bool,
  match: PropTypes.object,
  categoryUpdate: PropTypes.func,
  getAllProducts: PropTypes.func
};

const ProductResultWithRouter = withRouter(ProductResult);

export default connect(mapStateToProps, mapDispatchToProps)(ProductResultWithRouter);
