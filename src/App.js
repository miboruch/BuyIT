import React, { useEffect } from 'react';
import { socket } from './utils/constants';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage';

const App = () => {
  useEffect(() => {
    socket.on('userLogged', ({ token }) => {
      console.log('NEW USER LOGGED IN');
    });
  }, []);

  return (
    <Router>
      <Layout backgroundTheme='dark'>
        <>
          <Switch>
            <Route path={'/'} exact component={LandingPage} />
          </Switch>
        </>
      </Layout>
    </Router>
  );
};

export default App;
