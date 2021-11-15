import React, { useState } from 'react';
import { Motion, spring } from 'react-motion';
import { Link } from 'react-router-dom';
const defaultRight = 500;
const pm = -1;
const SideBar = ({ onLogout, user, animate, state }) => {
  return (
    <Motion
      style={{
        top: spring(state.top),
        right: spring(state.right),
        opacity: spring(state.opacity),
      }}
    >
      {({ top, opacity, right }) => (
        <div
          style={{
            position: 'absolute',
            top: top,
            right: right,
            opacity: opacity,
            width: '20%',
            height: '100%',
            backgroundColor: 'black',
            color: 'white',
            padding: '20px 20px 20px 20px',
          }}
          onClick={() => {
            animate({
              top: 0,
              right: -500,
              opacity: 0.0,
            });
          }}
        >
          <hr></hr>
          <Link to="/" onClick={onLogout}>
            <h4>로그아웃</h4>
          </Link>
          <Link to="/myInfo">
            <h4>회원정보수정</h4>
          </Link>
          <Link to={'/?stringId=' + user.stringId}>
            <h4>작성글</h4>
          </Link>
          <hr></hr>
          <h4>새로운 컨텐츠를 기대해주세요</h4>
        </div>
      )}
    </Motion>
  );
};

export default SideBar;
