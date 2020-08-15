import React from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { logout } from '../../modules/user';
import { useHistory } from 'react-router-dom';
/*
공통화를 위해 로그아웃 버튼을 따로 만듦
共通化のため、ログアウトボタンをベットに用意する
*/
const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };
  return <Button onClick={onLogout}>로그아웃</Button>;
};

export default LogoutButton;
