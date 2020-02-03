import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';
import AuthContent from '../components/templates/AuthContent/AuthContent';
import Spinner from '../components/atoms/Spinner/Spinner';

const AuthPage = ({ token, getUserInfo, loading }) => {
  return (
    <MainTemplate backgroundTheme='light'>{loading ? <Spinner /> : <AuthContent />}</MainTemplate>
  );
};

const mapStateToProps = ({ authenticationReducer: { token, loading } }) => {
  return { token, loading };
};

export default connect(mapStateToProps)(AuthPage);
