import React from 'react';

import './App.css';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthCodePage from './pages/AuthCodePage';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
//App.js
function App() {
  let history = useHistory();
  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  if (user !== null && !user.emailCheck) {
    history.push('/emailCheck');
  }
  return (
    <>
      <Route component={PostListPage} path={(['/@:stringId'], '/')} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={AuthCodePage} path="/emailCheck" />
    </>
  );
}

export default App;
