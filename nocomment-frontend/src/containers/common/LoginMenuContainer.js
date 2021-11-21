import React, { useState } from 'react';
import Button from '../../components/common/Button';
import palette from '../../lib/styles/palette';
import SideBar from '../../components/common/SideBar';

const LoginMenuContainer = ({ onLogout, user }) => {
  const [state, setState] = useState({
    top: 0,
    right: 500,
    opacity: 0.0,
  });
  const animate = ({ top, right, opacity }) => {
    setState(() => ({
      top: top,
      right: right,
      opacity: opacity,
    }));
  };
  return (
    <>
      <Button
        onClick={() => {
          animate({
            top: 0,
            right: 0,
            opacity: 0.8,
          });
        }}
        style={{
          overflow: 'hidden',
          color: 'white',

          backgroundColor: palette.gray[8],
          border: 'none',
          borderRadius: '4px',
        }}
      >
        메뉴
      </Button>
      <SideBar
        user={user}
        state={state}
        animate={animate}
        onLogout={onLogout}
      ></SideBar>
    </>
  );
};

export default LoginMenuContainer;
