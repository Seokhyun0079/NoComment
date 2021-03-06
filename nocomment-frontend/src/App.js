import React, { useEffect } from 'react';

import './App.css';
import PostListPage from './pages/PostListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthCodePage from './pages/AuthCodePage';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import WritePage from './pages/WritePage';
import PostPage from './pages/Postpage';
import MyInfoPage from './pages/MyInfoPage';
//App.js
function App() {
  let history = useHistory();
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  useEffect(() => {
    let { pathname } = history.location;
    if (user !== null) {
      let emailCheck;
      if (typeof user === 'string') {
        emailCheck = JSON.parse(user).emailCheck;
      } else {
        emailCheck = user.emailCheck;
      }
      if (!emailCheck) {
        history.push('/authCode');
      }
    }
    //로그인하지 않았거나 이미 이메일인증한 상태에서 이메일 인증 화면으로 접근 시 메인화면으로 이동함
    //ログインしてない、または、すでにメールアドレス認証を行った状態でメールアドレス認証画面に接近するとメイン画面に遷移する
    if (pathname === '/authCode' || pathname === '/myInfo') {
      if (user === null || user.emailCheck) history.push('/');
    }
  }, [history, user]);

  return (
    <>
      <Route component={PostListPage} path={['/@:stringId', '/']} exact />
      <Route component={LoginPage} path="/login" />
      <Route component={RegisterPage} path="/register" />
      <Route component={AuthCodePage} path="/authCode" />
      <Route component={WritePage} path="/write" />
      <Route component={PostPage} path="/@:stringId/:postId" />
      <Route component={MyInfoPage} path="/myInfo" />
    </>
  );
}

export default App;
