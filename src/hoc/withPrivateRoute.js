import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const WithPrivateRoute = ({
  component: Component,
  isLoggedIn,
  loading,
  location,
  pathnameRedirect,
  ...rest
}) => {
  const token = localStorage.getItem('token') || isLoggedIn;
  return (
    <Route
      {...rest}
      render={props =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: pathnameRedirect, state: { from: location } }} />
        )
      }
    />
  );
};

const mapStateToProps = ({ authenticationReducer: { isLoggedIn, loading } }) => {
  return { isLoggedIn, loading };
};

WithPrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  isLoggedIn: PropTypes.bool,
  loading: PropTypes.bool,
  location: PropTypes.object,
  pathnameRedirect: PropTypes.string
};

export default connect(mapStateToProps)(WithPrivateRoute);
