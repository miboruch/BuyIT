import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter, useLocation } from 'react-router-dom';
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

const ProductWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: visible;
  position: relative;
`;

const ProductResult = ({ products, loading, categoryUpdate, match, getAllProducts, category }) => {
  useEffect(() => {
    categoryUpdate(match.params.category);
    console.log(category);
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
                      name={products[index].name}
                      image={products[index].image}
                      id={products[index]._id}
                      price={products[index].price}
                      userLogin={products[index].userLogin}
                      productUserID={products[index].userID}
                      key={products[index]._id}
                    />
                  ))}

                  {/*{products.map(item => (*/}
                  {/*  <SingleProductCart*/}
                  {/*    name={item.name}*/}
                  {/*    image={item.image}*/}
                  {/*    id={item._id}*/}
                  {/*    price={item.price}*/}
                  {/*    userLogin={item.userLogin}*/}
                  {/*    key={item._id}*/}
                  {/*  />*/}
                  {/*))}*/}
                </ProductWrapper>
              </ProductResultTemplate>
            </FilterContextProvider>
          </DeleteAcceptContextProvider>
        </>
      )}
    </MainTemplate>
  );
};

const mapStateToProps = ({ productReducer: { products, loading, category } }) => {
  return { products, loading, category };
};

const mapDispatchToProps = dispatch => {
  return {
    categoryUpdate: category => dispatch(updateCategory(category)),
    getAllProducts: category => dispatch(fetchAllProducts(category)),
    addToProducts: product => dispatch(addToProducts(product)),
    removeFromProducts: productId => dispatch(removeFromProducts(productId))
  };
};

ProductResult.propTypes = {
  products: PropTypes.array,
  loading: PropTypes.bool,
  match: PropTypes.object
};

const ProductResultWithRouter = withRouter(ProductResult);

export default connect(mapStateToProps, mapDispatchToProps)(ProductResultWithRouter);
