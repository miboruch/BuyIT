import React, { useEffect } from 'react';
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
  removeFromProducts
}) => {
  useEffect(() => {
    getProducts(category);
  }, [category]);

  useEffect(() => {
    authenticationCheck();
    // authLogout();

    socket.on('productAdded', ({ addedProduct }) => {
      addToProducts(addedProduct);
    });

    socket.on('productRemoved', ({ productId }) => {
      removeFromProducts(productId);
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

const mapStateToProps = ({ productReducer: { category } }) => {
  return { category };
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
