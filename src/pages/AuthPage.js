import React from 'react';
import MainTemplate from '../components/templates/MainTemplate/MainTemplate';
import AuthContent from '../components/templates/AuthContent/AuthContent';

const AuthPage = () => {
  return (
    <MainTemplate backgroundTheme='light'>
      <AuthContent />
    </MainTemplate>
  );
};

export default AuthPage;
