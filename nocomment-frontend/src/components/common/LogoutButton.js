import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../modules/user';
import { useHistory, Link } from 'react-router-dom';
import LoginMenuContainer from '../../containers/common/LoginMenuContainer';
/*
공통화를 위해 로그아웃 버튼을 따로 만듦
共通化のため、ログアウトボタンをベットに用意する
*/

const LogoutButton = ({ type }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return type === 'Link' ? (
    <Link to="/" onClick={onLogout}>
      로그아웃
    </Link>
  ) : (
    <LoginMenuContainer>
    </LoginMenuContainer>
  );
};

export default LogoutButton;
