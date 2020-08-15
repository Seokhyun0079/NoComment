import React from 'react';
import AuthTemplate from '../components/auth/AuthTemplate';
import AuthCodeForm from '../containers/auth/AuthCodeForm';

const AuthCodePage = () => {
  return (
    <AuthTemplate>
      <AuthCodeForm />
    </AuthTemplate>
  );
};

export default AuthCodePage;
