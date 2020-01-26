import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {
  addToProducts,
  removeFromProducts,
  fetchAllProducts,
  unreserveAll
} from './actions/productAction';
import './App.css';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ProductResult from './pages/ProductResult';
import { authenticationCheck, authLogout } from './actions/authenticationAction';
import { removeProduct, loadCartItems } from './actions/cartAction';
import { socket } from './utils/constants';
import { reserveProduct, unreserveProduct } from './actions/productAction';
import { isProductInLocalStorage } from './utils/functions';

const App = ({
  category,
  getProducts,
  authenticationCheck,
  authLogout,
  addToProducts,
  removeFromProducts,
  cart,
  reserveProduct,
  unreserveProduct,
  unreserveAll,
  removeFromCart,
  loadCartItems
}) => {
  useEffect(() => {
    // getProducts('all');
    authenticationCheck();
    loadCartItems();
  }, []);

  useEffect(() => {
    console.log(category);
  }, [category]);

  useEffect(() => {
    socket.on('productAdded', ({ addedProduct }) => {
      if ((category !== null && addedProduct.category === category) || category === 'all') {
        addToProducts(addedProduct);
      }
    });

    socket.on('productRemoved', ({ removedProductId }) => {
      removeFromProducts(removedProductId);
    });

    socket.on('productReserved', ({ updatedProduct }) => {
      reserveProduct(updatedProduct._id);
      console.log(updatedProduct);

      /* timeout for expire  */
      /* this one with cartAction or remove this and use in cart action and server */
      // setTimeout(() => {
      //   if (isProductInLocalStorage(updatedProduct)) {
      //     removeFromCart(updatedProduct);
      //     unreserveProduct(updatedProduct._id);
      //   }
      // }, 15 * 60 * 1000);
      /* changes item in products from TODO! reserved: false to reserved:true */
    });

    socket.on('productUnreserved', ({ updatedProduct }) => {
      console.log(updatedProduct);
      unreserveProduct(updatedProduct._id);
    });

    socket.on('productTimeout', ({ expiredProduct }) => {
      if (isProductInLocalStorage(expiredProduct)) {
        removeFromCart(expiredProduct);
        unreserveProduct(expiredProduct._id);
      }
    });
  }, []);

  return (
    <Router>
      <Layout backgroundTheme='dark'>
        <>
          <Switch>
            <Route path={'/'} exact component={LandingPage} />
            <Route path={'/my-account'} component={AuthPage} />
            <Route path={'/products/:category'} component={ProductResult} />
          </Switch>
        </>
      </Layout>
    </Router>
  );
};

const mapStateToProps = ({ productReducer: { category }, cartReducer: { cart } }) => {
  return { category, cart };
};

const mapDispatchToProps = dispatch => {
  return {
    getProducts: category => dispatch(fetchAllProducts(category)),
    authenticationCheck: () => dispatch(authenticationCheck()),
    authLogout: () => dispatch(authLogout()),
    addToProducts: product => dispatch(addToProducts(product)),
    removeFromProducts: productId => dispatch(removeFromProducts(productId)),
    removeFromCart: product => dispatch(removeProduct(product)),
    reserveProduct: productId => dispatch(reserveProduct(productId)),
    unreserveProduct: productId => dispatch(unreserveProduct(productId)),
    unreserveAll: () => dispatch(unreserveAll()),
    loadCartItems: () => dispatch(loadCartItems())
  };
};

App.propTypes = {
  products: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
