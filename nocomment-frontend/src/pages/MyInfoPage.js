import React from 'react';
import Responsive from '../components/common/Responsive';
import MyInfoForm from '../containers/auth/MyInfoForm';
import HeaderContainer from '../containers/common/HeaderContainer';

const MyInfoPage = () => {
  return (
    <>
      <HeaderContainer />
      <Responsive>
        <MyInfoForm />
      </Responsive>
    </>
  );
};

export default MyInfoPage;
