import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import ProductResultTemplate from '../components/templates/ProductResultTemplate/ProductResultTemplate';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';
import SingleProductCart from '../components/molecules/SingleProductCart/SingleProductCart';
import Spinner from '../components/atoms/Spinner/Spinner';
import { useTrail } from 'react-spring';
import DeleteAcceptContextProvider from '../context/DeleteAcceptContext';
import { fetchAllProducts, removeFromProducts, updateCategory } from '../actions/productAction';
import PageNavigation from '../components/molecules/PageNavigation/PageNavigation';

const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: visible;
  position: relative;
`;

const ProductResult = ({
  products,
  loading,
  categoryUpdate,
  match,
  getAllProducts,
  location
}) => {
  useEffect(() => {
    categoryUpdate(match.params.category);
    getAllProducts(match.params.category, queryString.parse(location.search).page);
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
          </DeleteAcceptContextProvider>
          <PageNavigation
            pageNumber={queryString.parse(location.search).page}
            category={match.params.category}
          />
        </>
      )}
    </MainTemplate>
  );
};

const mapStateToProps = ({ productReducer: { products, loading, totalProductsCounter } }) => {
  return { products, loading, totalProductsCounter };
};

const mapDispatchToProps = dispatch => {
  return {
    categoryUpdate: category => dispatch(updateCategory(category)),
    getAllProducts: (category, page) => dispatch(fetchAllProducts(category, page)),
    removeFromProducts: productId => dispatch(removeFromProducts(productId))
  };
};

ProductResult.propTypes = {
  products: PropTypes.array,
  loading: PropTypes.bool,
  match: PropTypes.object,
  categoryUpdate: PropTypes.func,
  getAllProducts: PropTypes.func,
  location: PropTypes.object,
  totalProductsCounter: PropTypes.number
};

const ProductResultWithRouter = withRouter(ProductResult);

export default connect(mapStateToProps, mapDispatchToProps)(ProductResultWithRouter);
