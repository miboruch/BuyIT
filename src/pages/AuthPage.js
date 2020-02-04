import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';
import AuthContent from '../components/templates/AuthContent/AuthContent';
import Spinner from '../components/atoms/Spinner/Spinner';

const AuthPage = ({ loading }) => {
  return (
    <MainTemplate backgroundTheme='light'>{loading ? <Spinner /> : <AuthContent />}</MainTemplate>
  );
};

const mapStateToProps = ({ authenticationReducer: { loading } }) => {
  return { loading };
};

AuthPage.propTypes = {
  loading: PropTypes.bool
};

export default connect(mapStateToProps)(AuthPage);
