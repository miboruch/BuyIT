import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { addToProducts, removeFromProducts } from './actions/productAction';
import './App.css';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ProductResult from './pages/ProductResult';
import { authenticationCheck } from './actions/authenticationAction';
import { removeProduct, loadCartItems } from './actions/cartAction';
import { socket } from './utils/constants';
import { reserveProduct, unreserveProduct } from './actions/productAction';
import { isProductInLocalStorage } from './utils/functions';
import ProductPage from './pages/ProductPage';
import AddProductPage from './pages/AddProductPage';
import PrivateRoute from './components/templates/PrivateRoute/PrivateRoute';

const App = ({
  category,
  authenticationCheck,
  addToProducts,
  removeFromProducts,
  reserveProduct,
  unreserveProduct,
  removeFromCart,
  loadCartItems
}) => {
  useEffect(() => {
    authenticationCheck();
    loadCartItems();
  }, []);

  useEffect(() => {
    socket.on('productAdded', ({ addedProduct }) => {
      console.log(category);
      if ((category !== null && addedProduct.category === category) || category === 'all') {
        addToProducts(addedProduct);
      }
    });
  });

  useEffect(() => {
    socket.on('productRemoved', ({ removedProductId }) => {
      removeFromProducts(removedProductId);
    });

    socket.on('productReserved', ({ updatedProduct }) => {
      reserveProduct(updatedProduct._id);
    });

    socket.on('productUnreserved', ({ updatedProduct }) => {
      unreserveProduct(updatedProduct._id);
    });

    socket.on('productTimeout', ({ expiredProduct }) => {
      const [isInLocalStorage] = isProductInLocalStorage(expiredProduct);
      if (isInLocalStorage) {
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
            <Route path={'/product/:id'} component={ProductPage} />
            <PrivateRoute path={'/addProduct'} component={AddProductPage} />
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
    authenticationCheck: () => dispatch(authenticationCheck()),
    addToProducts: product => dispatch(addToProducts(product)),
    removeFromProducts: productId => dispatch(removeFromProducts(productId)),
    removeFromCart: product => dispatch(removeProduct(product)),
    reserveProduct: productId => dispatch(reserveProduct(productId)),
    unreserveProduct: productId => dispatch(unreserveProduct(productId)),
    loadCartItems: () => dispatch(loadCartItems())
  };
};

App.propTypes = {
  authenticationCheck: PropTypes.func,
  addToProducts: PropTypes.func,
  removeFromProducts: PropTypes.func,
  removeFromCart: PropTypes.func,
  reserveProduct: PropTypes.func,
  unreserveProduct: PropTypes.func,
  loadCartItems: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
