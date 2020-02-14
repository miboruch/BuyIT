import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const WithOrderPrivateRoute = ({
  component: Component,
  cart,
  location,
  pathnameRedirect,
  ...rest
}) => {
  const userCart = JSON.parse(localStorage.getItem('cart')).length !== 0;
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

WithOrderPrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  cart: PropTypes.array,
  location: PropTypes.object,
  pathnameRedirect: PropTypes.string
};

export default connect(mapStateToProps)(WithOrderPrivateRoute);
