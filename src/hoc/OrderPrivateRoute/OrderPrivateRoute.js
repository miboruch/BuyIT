import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const OrderPrivateRoute = ({ component: Component, cart, location, pathnameRedirect, ...rest }) => {
  const userCart = JSON.parse(localStorage.getItem('cart')).length !== 0;
  console.log(userCart);
  return (
    <Route
      {...rest}
      render={props =>
        userCart ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: pathnameRedirect, state: { from: location } }} />
        )
      }
    />
  );
};

const mapStateToProps = ({ cartReducer: { cart } }) => {
  return { cart };
};

OrderPrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  cart: PropTypes.array,
  location: PropTypes.object,
  pathnameRedirect: PropTypes.string
};

export default connect(mapStateToProps)(OrderPrivateRoute);
