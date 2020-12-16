import React, { createRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Responsive from '../../components/common/Responsive';
import palette from '../../lib/styles/palette';
import { insert, initialize } from '../../modules/drawingComment'
const CommentsViewerBlock = styled(Responsive)`
  padding-bottom: 3rem;
  margin-top: 4rem;
  `;
const CommentWriteBlock = styled(Responsive)`
border : 1px solid ${palette.gray[8]};
padding : 0 0 0 0;
`;


export const CommentContainer = () => {
  const dispatch = useDispatch();
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
  const onSubmit = () => {
    let image = canvasRef.current.toDataURL("image/png");
    let blobBin = atob(image.split(',')[1]);   // base64 데이터 디코딩
    let array = [];
    for (let i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    let imageFile = new Blob([new Uint8Array(array)], { type: 'image/png' });   // Blob 생성
    let formdata = new FormData();   // formData 생성
    formdata.append("file", imageFile);   // file data 추가
    dispatch(
      insert(formdata)
    );
  }
  useEffect(() => {
    return () => {
      dispatch(initialize());
    }
  }, [dispatch]);
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
            onSubmit
          }
        >댓글등록</Button>
      </CommentWriteBlock>
    </div >
  );
};

export default CommentContainer;