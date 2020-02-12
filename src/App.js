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
import { removeProduct, loadCartItems, resetCart, clearCart } from './actions/cartAction';
import { socket } from './utils/constants';
import { reserveProduct, unreserveProduct } from './actions/productAction';
import { isProductInLocalStorage } from './utils/functions';
import ProductPage from './pages/ProductPage';
import AddProductPage from './pages/AddProductPage';
import PrivateRoute from './hoc/PrivateRoute/PrivateRoute';
import OrderPage from './pages/OrderPage';
import OrderPrivateRoute from './hoc/OrderPrivateRoute/OrderPrivateRoute';

const App = ({
  category,
  authenticationCheck,
  addToProducts,
  removeFromProducts,
  reserveProduct,
  unreserveProduct,
  removeFromCart,
  loadCartItems,
  cartReset,
  clearCart
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
      console.log('PRODUCT TIMEOUT');
      const [isInLocalStorage] = isProductInLocalStorage(expiredProduct);
      if (isInLocalStorage) {
        removeFromCart(expiredProduct);
        unreserveProduct(expiredProduct._id);
      }
    });

    socket.on('productOrdered', ({ orderedProduct }) => {
      console.log('product ordered');
      console.log(orderedProduct);
      cartReset();
      orderedProduct.map(item => {
        removeFromProducts(item._id);
      });
    });

    socket.on('resetCartFinish', ({ cart }) => {
      cart.map(item => {
        unreserveProduct(item._id);
      });

      clearCart();
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
            <PrivateRoute
              path={'/addProduct'}
              component={AddProductPage}
              pathnameRedirect={'/my-account'}
            />
            <OrderPrivateRoute
              path={'/order/information'}
              component={OrderPage}
              pathnameRedirect={'/products/all?page=1'}
            />
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
    loadCartItems: () => dispatch(loadCartItems()),
    cartReset: () => dispatch(resetCart()),
    clearCart: () => dispatch(clearCart())
  };
};

App.propTypes = {
  authenticationCheck: PropTypes.func,
  addToProducts: PropTypes.func,
  removeFromProducts: PropTypes.func,
  removeFromCart: PropTypes.func,
  reserveProduct: PropTypes.func,
  unreserveProduct: PropTypes.func,
  loadCartItems: PropTypes.func,
  cartReset: PropTypes.func,
  clearCart: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
