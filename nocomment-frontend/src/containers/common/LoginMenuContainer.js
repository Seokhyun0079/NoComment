import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { Motion, spring } from 'react-motion';
import { Link } from 'react-router-dom';

const LoginMenuContainer = ({ onLogout }) => {
  const [state, setState] = useState({
    height: 30,
    marginTop: 20,
  });
  const animate = ({ height, marginTop }) => {
    setState((state) => ({ height: height, marginTop: marginTop }));
  };
  return (
    <>
      <Motion
        style={{
          height: spring(state.height),
          marginTop: spring(state.marginTop),
        }}
      >
        {({ height, marginTop }) => (
          <div
            onMouseOver={() => {
              animate({
                height: 330,
                marginTop: 320,
              });
            }}
            onMouseOut={() => {
              animate({
                height: 30,
                marginTop: 20,
              });
            }}
            style={{
            height, 
            marginTop, 
            overflow: 'hidden', 
            marginBottom : 20
            } }
          >
            <Button>
              로그아웃
              <br></br>
              <br></br>
              <Link to="/write">회원정보수정</Link>
              <br></br>
              <Link to="/">내가 쓴 글</Link>
            </Button>
          </div>
        )}
      </Motion>
    </>
  );
};

export default LoginMenuContainer;
