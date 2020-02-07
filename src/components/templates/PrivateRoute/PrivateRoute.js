import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isLoggedIn, loading, ...rest }) => {
  console.log(isLoggedIn);
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/my-account', state: { from: props.location } }} />
        )
      }
    />
  );
};

const mapStateToProps = ({ authenticationReducer: { isLoggedIn, loading } }) => {
  return { isLoggedIn, loading };
};

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  isLoggedIn: PropTypes.bool
};

export default connect(mapStateToProps)(PrivateRoute);
