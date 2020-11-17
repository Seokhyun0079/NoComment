import React, { createRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Responsive from '../../components/common/Responsive';
import palette from '../../lib/styles/palette';

const CommentsViewerBlock = styled(Responsive)`
  padding-bottom: 3rem;
  margin-top: 4rem;
  `;
const CommentWriteBlock = styled(Responsive)`
border : 1px solid ${palette.gray[8]};
padding : 0 0 0 0;
`;


export const CommentContainer = () => {
  let canvas;
  let canvasRef = createRef();
  let pos = {
    drawble: false,
    X: -1,
    Y: -1
  };
  let ctx;
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext("2d");
    canvas.addEventListener("mousedown", initDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", finishDraw);
    canvas.addEventListener("mouseout", finishDraw);
  }, []);

  const initDraw = (event) => {
    ctx.beginPath();
    pos = { drawble: true, ...getPositon(event) }
    ctx.moveTo(pos.X, pos.Y);
  };
  const getPositon = (event) => {
    return { X: event.offsetX, Y: event.offsetY }
  }
  const draw = (event) => {
    if (pos.drawble) {
      pos = { ...pos, ...getPositon(event) };
      var circle = new Path2D();
      circle.moveTo(pos.X, pos.Y);
      circle.arc(pos.X, pos.Y, 7, 0, 2 * Math.PI);
      ctx.fill(circle);
    }
  }
  const finishDraw = (event) => {
    pos = { drawble: false, X: -1, Y: -1 }
  }
  return (
    <div style={{

      'height': 'auto',
      'marginBottom': '50px'
    }
    }>
      <CommentsViewerBlock>댓글창</CommentsViewerBlock>
      <CommentWriteBlock height="480px">
        <canvas ref={canvasRef} id="stockGraph" width="925px" height="480px">
          댓글판을 불러오는 데 실패했습니다.
        </canvas>
        <Button style={
          {
            'height': '480px',
            'float': 'right'
          }
        }
          onClick={
            () => {
              // let iamge = ctx.toDataURL('image/png');
              console.dir(canvasRef.current.toDataURL("image/png"));
            }
          }
        >댓글등록</Button>
      </CommentWriteBlock>
    </div >
  );
};

export default CommentContainer;
