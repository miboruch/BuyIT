import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { fetchAllProducts } from './actions/productAction';
import './App.css';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import { authenticationCheck } from './actions/authenticationAction';

const App = ({ category, getProducts, authenticationCheck }) => {
  useEffect(() => {
    getProducts(category);
    authenticationCheck();
  }, []);

  return (
    <Router>
      <Layout backgroundTheme='dark'>
        <>
          <Switch>
            <Route path={'/'} exact component={LandingPage} />
            <Route path={'/my-account'} component={AuthPage} />
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
    authenticationCheck: () => dispatch(authenticationCheck())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
