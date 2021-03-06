import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { Motion, spring } from 'react-motion';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';

const LoginMenuContainer = ({ onLogout, user }) => {
  const [state, setState] = useState({
    height: 30,
    marginTop: 20,
    opacity: 1.0,
  });
  const animate = ({ height, marginTop, opacity }) => {
    setState(() => ({
      height: height,
      marginTop: marginTop,
      opacity: opacity,
    }));
  };
  return (
    <>
      <Motion
        style={{
          height: spring(state.height),
          marginTop: spring(state.marginTop),
          opacity: spring(state.opacity),
        }}
      >
        {({ height, marginTop, opacity }) => (
          <Button
            onMouseOver={() => {
              animate({
                height: 100,
                marginTop: 60,
                opacity: 1.0,
              });
            }}
            onMouseOut={() => {
              animate({
                height: 30,
                marginTop: 20,
                opacity: 1.0,
              });
            }}
            style={{
              height,
              marginTop,
              overflow: 'hidden',
              color: 'white',
              opacity,
              marginBottom: 20,
              backgroundColor: palette.gray[8],
              border: 'none',
              borderRadius: '4px',
            }}
          >
            <Link to="/" onClick={onLogout}>
              로그아웃
            </Link>
            <br></br>
            <br></br>
            <Link to="/myInfo">회원정보수정</Link>
            <br></br>
            <Link to={'/?stringId=' + user.stringId}>내가 쓴 글</Link>
          </Button>
        )}
      </Motion>
    </>
  );
};

export default LoginMenuContainer;
