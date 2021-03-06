import React from 'react';
import { useSelector } from 'react-redux';
import Responsive from '../components/common/Responsive';
import MyInfoForm from '../containers/auth/MyInfoForm';
import HeaderContainer from '../containers/common/HeaderContainer';

const MyInfoPage = () => {
  const { user } = useSelector(({ user }) => ({ user: user.user }));
  return (
    <>
      <HeaderContainer />
      <Responsive>
        <MyInfoForm user={user}></MyInfoForm>
      </Responsive>
    </>
  );
};

export default MyInfoPage;
