import React from 'react';
import { Route, Router } from 'react-router-dom';
import './App.css';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <Route
        component={PostListPage}
        path={(['/@:StringId'], '/')}
        exact
      ></Route>
      <Router component={LoginPage} path="/register" />
    </>
  );
}

export default App;
