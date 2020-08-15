import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { useDispatch } from 'react-redux';
import { logout } from '../../modules/user';

const HeaderContainer = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
