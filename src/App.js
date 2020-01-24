import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { addToProducts, removeFromProducts, fetchAllProducts } from './actions/productAction';
import './App.css';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ProductResult from './pages/ProductResult';
import { authenticationCheck, authLogout } from './actions/authenticationAction';
import { socket } from './utils/constants';

const App = ({
  category,
  getProducts,
  authenticationCheck,
  authLogout,
  addToProducts,
  removeFromProducts,
  cart
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
      cart.map(item => (item._id === productId ? (item.reserved = true) : null));
    });
  });

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
    removeFromProducts: productId => dispatch(removeFromProducts(productId))
  };
};

App.propTypes = {
  cart: PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
