import React from 'react';
import Responsive from '../components/common/Responsive';
import MyInfoForm from '../containers/auth/MyInfoForm';
import HeaderContainer from '../containers/common/HeaderContainer';

const MyInfoPage = () => {
  return (
    <>
      <HeaderContainer />
      <Responsive
        style={{
          marginTop: '50px',
          background: 'white',
        }}
      >
        <MyInfoForm />
      </Responsive>
    </>
  );
};

export default MyInfoPage;
