import React from 'react';
import { useState } from 'react';
import { Motion, spring } from 'react-motion';
import { withRouter } from 'react-router-dom';

const RefreshImage = ({ staticContext, ...rest }) => {
  return <img alt="" {...rest}></img>;
};

const RefreshButton = () => {
  /**
   * 애니메이션에 필요한 값을 초기화
   * アニメーションに必要な値を初期化
   */
  const [state, setState] = useState({
    width: 100,
    transform: 0,
    switch: 1,
  });
  /**
   * 애니메이션이 실행될 때 변화될 값을 설정하는 함수
   * アニメーションが実行される時にスタイルを変化させるファンソキョン
   */
  const animate = () => {
    setState((state) => ({
      width: state.width + 100 * state.switch,
      transform: state.transform + 720 * state.switch,
      switch: state.switch * -1,
    }));
  };
  return (
    <Motion
      style={{
        width: spring(state.width),
        transform: spring(state.transform),
      }}
    >
      {({ width, transform }) => (
        <div>
          <RefreshImage
            src="/refresh.png"
            style={{
              width: width,
              transform: `rotate( ${transform}deg )`,
            }}
            onMouseOver={() => {
              animate();
            }}
            onMouseOut={() => {
              animate();
            }}
          ></RefreshImage>
        </div>
      )}
    </Motion>
  );
};

export default withRouter(RefreshButton);
