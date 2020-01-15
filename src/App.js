import React, { useEffect } from 'react';
import { socket } from './utils/constants';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { fetchAllProducts } from './actions/productAction';
import './App.css';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage';
import { userLogin } from './actions/authenticationAction';
import AuthPage from './pages/AuthPage';

const App = ({ category, getProducts, userLogin }) => {
  useEffect(() => {
    userLogin('asdw123@gmail.com', 'ffeqqdsawd');
    getProducts(category);
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
    userLogin: (email, password) => dispatch(userLogin(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
