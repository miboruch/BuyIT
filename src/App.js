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
import { socket } from './utils/constants';
import { reserveProduct, unreserveProduct } from './actions/productAction';

const App = ({
  category,
  getProducts,
  authenticationCheck,
  authLogout,
  addToProducts,
  removeFromProducts,
  products,
  reserveProduct,
  unreserveProduct,
  unreserveAll
}) => {
  useEffect(() => {
    // getProducts('all');
    authenticationCheck();
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

    socket.on('productReserved', ({ productId }) => {
      console.log(productId);
      reserveProduct(productId);
    });

    socket.on('productUnreserved', ({ productId }) => {
      console.log(productId);
      unreserveProduct(productId);
    });

    socket.on('unreserveAll', () => {
      unreserveAll();
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

const mapStateToProps = ({ productReducer: { category, products } }) => {
  return { category, products };
};

const mapDispatchToProps = dispatch => {
  return {
    getProducts: category => dispatch(fetchAllProducts(category)),
    authenticationCheck: () => dispatch(authenticationCheck()),
    authLogout: () => dispatch(authLogout()),
    addToProducts: product => dispatch(addToProducts(product)),
    removeFromProducts: productId => dispatch(removeFromProducts(productId)),
    reserveProduct: productId => dispatch(reserveProduct(productId)),
    unreserveProduct: productId => dispatch(unreserveProduct(productId)),
    unreserveAll: () => dispatch(unreserveAll())
  };
};

App.propTypes = {
  products: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
